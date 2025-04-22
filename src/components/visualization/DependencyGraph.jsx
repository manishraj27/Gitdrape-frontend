import PropTypes from 'prop-types'

function DependencyGraph({ dependencies }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Dependencies</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Dependencies</h4>
          {Object.entries(dependencies?.dependencies || {}).map(([key, value]) => (
            <div key={key} className="text-sm py-1">
              <span className="font-mono">{key}</span>: {value}
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-medium mb-2">Dev Dependencies</h4>
          {Object.entries(dependencies?.devDependencies || {}).map(([key, value]) => (
            <div key={key} className="text-sm py-1">
              <span className="font-mono">{key}</span>: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

DependencyGraph.propTypes = {
  dependencies: PropTypes.object
}

export default DependencyGraph