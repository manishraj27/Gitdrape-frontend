import { useState } from 'react'
import PropTypes from 'prop-types'

function FileItem({ item, level = 0, onFileClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const indent = level * 20

  const getFileIcon = () => {
    if (item.type === 'directory') return '📁'
    const ext = item.name.split('.').pop()
    switch (ext) {
      case 'js': return '📄'
      case 'jsx': return '⚛️'
      case 'json': return '📦'
      case 'md': return '📝'
      case 'css': return '🎨'
      case 'html': return '🌐'
      default: return '📄'
    }
  }

  return (
    <div>
      <div 
        className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer select-none"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => {
          if (item.type === 'directory') {
            setIsOpen(!isOpen)
          } else {
            onFileClick(item)
          }
        }}
      >
        <span className="mr-2">
          {item.type === 'directory' ? (isOpen ? '📂' : '📁') : getFileIcon()}
        </span>
        <span className="font-mono text-sm">{item.name}</span>
      </div>
      
      {isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileItem 
              key={child.path} 
              item={child} 
              level={level + 1}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FileExplorer({ structure, onFileClick, copyableTree }) {
  const [showCopyFormat, setShowCopyFormat] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyableTree);
      alert('Tree structure copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Repository Structure</h3>
        <button
          onClick={() => setShowCopyFormat(!showCopyFormat)}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          {showCopyFormat ? 'Show Explorer' : 'Show Copy Format'}
        </button>
      </div>

      {showCopyFormat ? (
        <div className="p-4">
          <div className="flex justify-end mb-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto font-mono text-sm whitespace-pre">
            {copyableTree}
          </pre>
        </div>
      ) : (
        <div className="p-2 max-h-[600px] overflow-y-auto">
          {structure.children.map((item) => (
            <FileItem 
              key={item.path} 
              item={item} 
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

FileItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number,
  onFileClick: PropTypes.func.isRequired
}

FileExplorer.propTypes = {
  structure: PropTypes.object.isRequired,
  onFileClick: PropTypes.func.isRequired,
  copyableTree: PropTypes.string.isRequired
}

export default FileExplorer