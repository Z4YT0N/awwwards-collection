import { useCallback, useEffect, useRef, useState } from 'react';
import '../../../css/preview-slider.css';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const stepDecimals = (step) => {
  const s = step.toString();
  const dot = s.indexOf('.');
  return dot === -1 ? 0 : s.length - dot - 1;
};
const roundToStep = (val, step, min) => {
  const raw = Math.round((val - min) / step) * step + min;
  const decimals = Math.max(stepDecimals(step), stepDecimals(min));
  return Number(raw.toFixed(decimals));
};

const PreviewSlider = ({
  title = '',
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  valueUnit = '',
  isDisabled = false,
  displayValue,
  onChange
}) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  const range = max - min;
  const percentage = range > 0 ? ((value - min) / range) * 100 : 0;
  const isActive = isDragging || (isHoverDevice && isHovering);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverDevice(mq.matches);
    const handleChange = (e) => setIsHoverDevice(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const computeValue = useCallback(
    (clientX) => {
      const track = trackRef.current;
      if (!track) return value;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * range;
      return clamp(roundToStep(raw, step, min), min, max);
    },
    [min, max, step, range, value]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (isDisabled) return;
      e.preventDefault();
      trackRef.current?.setPointerCapture(e.pointerId);
      setIsDragging(true);
      onChange?.(computeValue(e.clientX));
    },
    [computeValue, onChange, isDisabled]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      onChange?.(computeValue(e.clientX));
    },
    [isDragging, computeValue, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (isDisabled) return;
      let next;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          next = value + step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          next = value - step;
          break;
        case 'Home':
          next = min;
          break;
        case 'End':
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange?.(clamp(roundToStep(next, step, min), min, max));
    },
    [value, step, min, max, onChange, isDisabled]
  );

  const ticks = 9;
  const decimals = stepDecimals(step);
  const formattedValue = displayValue ? displayValue(value) : `${Number(value.toFixed(decimals))}${valueUnit}`;

  return (
    <div className="scrubber">
      <div
        className="scrubber-track"
        ref={trackRef}
        role="slider"
        aria-label={title}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        data-dragging={isDragging}
        data-disabled={isDisabled}
        data-active={isActive}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onKeyDown={handleKeyDown}
      >
        <div className="scrubber-fill" style={{ width: `${percentage}%` }} />

        <div className="scrubber-ticks">
          {Array.from({ length: ticks }, (_, i) => {
            const pos = ((i + 1) / (ticks + 1)) * 100;
            return <div className="scrubber-tick" key={i} style={{ left: `${pos}%` }} />;
          })}
        </div>

        <div className="scrubber-thumb-wrapper" style={{ left: `${percentage}%` }}>
          <div className="scrubber-thumb" />
        </div>

        <div className="scrubber-label">{title}</div>
        <div className="scrubber-value">{formattedValue}</div>
      </div>
    </div>
  );
};

export default PreviewSlider;
