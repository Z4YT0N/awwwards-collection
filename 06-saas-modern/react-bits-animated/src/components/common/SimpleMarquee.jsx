import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const SimpleMarquee = ({
  children,
  className = '',
  direction = 'right',
  baseVelocity = 5,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,
  repeat = 4,
  draggable = true,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  dragAngle = 0,
  grabCursor = false,
  easing
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);

  // Only animate when visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
      rootMargin: '50px'
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollY } = useScroll({
    ...(scrollContainer && {
      container: scrollContainer
    })
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);
  const hoverFactorValue = useMotionValue(1);
  const defaultVelocity = useMotionValue(1);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);
  const velocityFactor = useTransform(useScrollVelocity ? smoothVelocity : defaultVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  const isHorizontal = direction === 'left' || direction === 'right';
  const actualBaseVelocity = direction === 'left' || direction === 'up' ? -baseVelocity : baseVelocity;
  const isHovered = useRef(false);
  const directionFactor = useRef(1);
  const x = useTransform(baseX, v => {
    const wrappedValue = wrap(0, -100, v);
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`;
  });
  const y = useTransform(baseY, v => {
    const wrappedValue = wrap(0, -100, v);
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`;
  });

  useAnimationFrame((t, delta) => {
    // Skip animation when not visible to save CPU
    if (!isVisible) return;

    if (isDragging.current && draggable) {
      if (isHorizontal) {
        baseX.set(baseX.get() + dragVelocity.current);
      } else {
        baseY.set(baseY.get() + dragVelocity.current);
      }

      dragVelocity.current *= 0.9;

      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0;
      }

      return;
    }

    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1);
    } else {
      hoverFactorValue.set(1);
    }

    let moveBy = directionFactor.current * actualBaseVelocity * (delta / 1000) * smoothHoverFactor.get();

    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (draggable) {
      moveBy += dragVelocity.current;

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current);
      }

      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay;
      } else if (!isDragging.current) {
        dragVelocity.current = 0;
      }
    }

    if (isHorizontal) {
      baseX.set(baseX.get() + moveBy);
    } else {
      baseY.set(baseY.get() + moveBy);
    }
  });

  const lastPointerPosition = useRef({ x: 0, y: 0 });

  const handlePointerDown = e => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);

    if (grabCursor) {
      e.currentTarget.style.cursor = 'grabbing';
    }

    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };

    dragVelocity.current = 0;
  };

  const handlePointerMove = e => {
    if (!draggable || !isDragging.current) return;

    const currentPosition = { x: e.clientX, y: e.clientY };
    const deltaX = currentPosition.x - lastPointerPosition.current.x;
    const deltaY = currentPosition.y - lastPointerPosition.current.y;
    const angleInRadians = (dragAngle * Math.PI) / 180;
    const directionX = Math.cos(angleInRadians);
    const directionY = Math.sin(angleInRadians);
    const projectedDelta = deltaX * directionX + deltaY * directionY;
    dragVelocity.current = projectedDelta * dragSensitivity;
    lastPointerPosition.current = currentPosition;
  };

  const handlePointerUp = e => {
    if (!draggable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);

    isDragging.current = false;
  };

  const baseClasses = `flex ${isHorizontal ? 'flex-row' : 'flex-col'} ${className}`;

  return (
    <motion.div
      ref={containerRef}
      className={baseClasses}
      onHoverStart={() => (isHovered.current = true)}
      onHoverEnd={() => (isHovered.current = false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {Array.from({ length: repeat }, (_, i) => i).map(i => (
        <motion.div
          key={i}
          className={`shrink-0 ${isHorizontal ? 'flex' : ''} ${draggable && grabCursor ? 'cursor-grab' : ''}`}
          style={isHorizontal ? { x } : { y }}
          aria-hidden={i > 0}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SimpleMarquee;
