import '../../../css/preview-slider.css';

const PreviewColorPicker = ({ title = '', color = '#ffffff', setColor }) => {
  const handleColorChange = (e) => setColor?.(e.target.value);
  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= 7) setColor?.(val);
  };

  return (
    <div className="scrubber">
      <div className="scrubber-track scrubber-track--color">
        <span className="scrubber-label">{title}</span>
        <div className="scrubber-color-controls">
          <input
            className="scrubber-color-swatch"
            type="color"
            value={color}
            onChange={handleColorChange}
            aria-label={`${title} color`}
          />
          <input
            className="scrubber-color-text"
            type="text"
            value={color}
            onChange={handleTextChange}
            maxLength={7}
            aria-label={`${title} hex value`}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewColorPicker;
