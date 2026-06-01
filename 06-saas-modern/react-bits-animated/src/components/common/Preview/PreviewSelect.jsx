import { useRef, useState, useEffect, useMemo } from 'react';
import '../../../css/preview-slider.css';

const PreviewSelect = ({
  title = '',
  options = [],
  value = '',
  isDisabled = false,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const labelMap = useMemo(
    () =>
      options.reduce((map, opt) => {
        map[opt.value] = opt.label;
        return map;
      }, {}),
    [options]
  );

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onClick);
    return () => document.removeEventListener('pointerdown', onClick);
  }, [open]);

  return (
    <div className="scrubber" ref={wrapRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="scrubber-track scrubber-track--select"
        aria-label={title}
        aria-disabled={isDisabled}
        data-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={() => !isDisabled && setOpen((o) => !o)}
      >
        <span className="scrubber-label">{title}</span>
        <span className="scrubber-select-right">
          <span className="scrubber-value">{labelMap[value] || value}</span>
          <svg className={`scrubber-caret${open ? ' scrubber-caret--open' : ''}`} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="scrubber-dropdown">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`scrubber-dropdown-item${opt.value === value ? ' scrubber-dropdown-item--active' : ''}`}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewSelect;
