import PropTypes from 'prop-types'

function RepoStructure({ repoData }) {
  const { structure, repoInfo } = repoData

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{repoInfo.name}</h2>
        <p className="text-gray-600">{repoInfo.description}</p>
        <div className="mt-2 flex gap-4">
          <span className="text-sm">⭐ {repoInfo.stargazers_count} stars</span>
          <span className="text-sm">🔀 {repoInfo.forks_count} forks</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Repository Structure</h3>
        <div className="border rounded-lg p-4">
          {structure.tree.map((item) => (
            <div key={item.path} className="py-1">
              <span className="font-mono text-sm">
                {item.type === 'tree' ? '📁' : '📄'} {item.path}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

RepoStructure.propTypes = {
  repoData: PropTypes.shape({
    structure: PropTypes.object.isRequired,
    repoInfo: PropTypes.object.isRequired
  }).isRequired
}

export default RepoStructure