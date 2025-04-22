import PropTypes from 'prop-types'

function TreeView({ treeString }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(treeString);
      alert('Tree structure copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Repository Structure for LLMs</h3>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy Structure
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded overflow-x-auto whitespace-pre font-mono text-sm">
        {treeString}
      </pre>
    </div>
  )
}

TreeView.propTypes = {
  treeString: PropTypes.string.isRequired
}

export default TreeView