import { useRef, useEffect } from 'react';
import { LuArrowRight } from 'react-icons/lu';

const ORB_COUNT = 5;
const LINE_DIST = 120;

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const orbs = Array.from({ length: ORB_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 25 + 15,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const s = t * 0.001;

      // draw connecting lines
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x;
          const dy = orbs[i].y - orbs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
            ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // draw orbs
      for (const o of orbs) {
        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;

        const pulse = 0.6 + Math.sin(s + o.phase) * 0.4;
        const alpha = 0.06 * pulse;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, `rgba(168,85,247,${alpha * 2.5})`);
        grad.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef]);
}

const ProCard = () => {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return (
    <a href="https://pro.reactbits.dev" target="_blank" rel="noopener noreferrer" className="pro-card-link">
      <div className="pro-card">
        <canvas ref={canvasRef} className="pro-card-particles" />
        <div className="pro-card-glow" />
        <div className="pro-card-content">
          <span className="pro-card-badge">PRO</span>
          <h3 className="pro-card-title">Get React Bits Pro</h3>
          <p className="pro-card-desc">
            100+ components, 158+ blocks &amp; 8+ templates to ship memorable products faster.
          </p>
          <div className="pro-card-cta">
            <span>Explore Pro</span>
            <LuArrowRight size={14} />
          </div>
          <div className="pro-card-promo">
            <span className="pro-card-promo-text">
              30% off with code <code className="pro-card-promo-code">SPRING30</code>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProCard;
