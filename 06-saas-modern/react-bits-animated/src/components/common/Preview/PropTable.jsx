import './PropTable.css';

const PropTable = ({ data }) => (
  <div className="prop-table-section">
    <h2 className="demo-title-extra">Props</h2>

    {/* Desktop table */}
    <div className="prop-table-wrap">
      <table className="prop-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop, index) => (
            <tr key={index}>
              <td><code className="prop-code">{prop.name}</code></td>
              <td className="prop-type">{prop.type}</td>
              <td><code className="prop-code">{prop.default?.length ? prop.default : '—'}</code></td>
              <td className="prop-desc">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile cards */}
    <div className="prop-cards">
      {data.map((prop, index) => (
        <div className="prop-card" key={index}>
          <div className="prop-card-header">
            <code className="prop-code">{prop.name}</code>
            <span className="prop-card-type">{prop.type}</span>
          </div>
          <p className="prop-card-desc">{prop.description}</p>
          <div className="prop-card-default">
            <span className="prop-card-label">Default</span>
            <code className="prop-code">{prop.default?.length ? prop.default : '—'}</code>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PropTable;
