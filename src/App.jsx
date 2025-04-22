import { useState } from 'react'
import axios from 'axios'
import './App.css'
import FileExplorer from './components/visualization/FileExplorer'

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [repoData, setRepoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)

  const parseGitHubUrl = (url) => {
    try {
      // Remove trailing slashes and .git
      url = url.trim().replace(/\.git$/, '').replace(/\/$/, '')
      
      // Handle different GitHub URL formats
      const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)(?:\/)?(?:tree\/([^/]+))?/
      const match = url.match(githubRegex)
      
      if (!match) {
        throw new Error('Invalid GitHub URL format')
      }

      return {
        owner: match[1],
        repo: match[2],
        branch: match[3] || 'main' // Default to 'main' if no branch specified
      }
    } catch (error) {
      throw new Error('Please enter a valid GitHub repository URL')
    }
  }

  const handleRepoAnalysis = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { owner, repo } = parseGitHubUrl(repoUrl)
      const response = await axios.get(`http://localhost:5000/api/repo-structure/${owner}/${repo}`)
      setRepoData(response.data)
    } catch (err) {
      setError(err.message || 'Failed to analyze repository. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileClick = async (file) => {
    setSelectedFile(file)
    try {
      const { owner, repo } = parseGitHubUrl(repoUrl)
      const response = await axios.get(
        `http://localhost:5000/api/repo-structure/${owner}/${repo}/content?path=${file.path}`
      )
      setFileContent(response.data)
    } catch (err) {
      setError('Failed to fetch file content')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">GitDrape</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleRepoAnalysis} className="space-y-4">
            <div>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Enter GitHub repository URL"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {loading ? 'Analyzing...' : 'Analyze Repository'}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-red-600">
              {error}
            </div>
          )}

          {repoData && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileExplorer 
                structure={repoData.organizedStructure}
                copyableTree={repoData.copyableTree} 
                onFileClick={handleFileClick}
              />
              
              {selectedFile && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    {selectedFile.name}
                  </h3>
                  <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
                    <code>{fileContent}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
