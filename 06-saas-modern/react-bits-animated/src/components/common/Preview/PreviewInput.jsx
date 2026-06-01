import '../../../css/preview-slider.css';

const PreviewInput = ({
  title = '',
  value = '',
  placeholder = '',
  maxLength,
  isDisabled = false,
  onChange
}) => {
  const handleChange = (e) => onChange?.(e.target.value);

  return (
    <div className="scrubber">
      <div
        className="scrubber-track scrubber-track--input"
        data-disabled={isDisabled}
      >
        <span className="scrubber-label">{title}</span>
        <input
          className="scrubber-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={isDisabled}
          aria-label={title}
        />
      </div>
    </div>
  );
};

export default PreviewInput;
