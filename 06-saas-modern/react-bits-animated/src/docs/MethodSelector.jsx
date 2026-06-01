const MethodSelector = ({ methods, selected, onSelect }) => (
  <div className="installation-methods">
    {methods.map(({ key, icon, label }) => (
      <div
        key={key}
        className={`installation-method ${selected === key ? 'method-active' : ''}`}
        onClick={() => onSelect(key)}
      >
        {icon}
        <h4 className="method-title">{label}</h4>
      </div>
    ))}
  </div>
);

export default MethodSelector;
