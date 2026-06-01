import { useRef } from "react";

import { useEffect } from "react";
import { startGl } from "./gl";

function observeResize(
  container: HTMLDivElement,
  callback: (width: number, height: number) => void
) {
  const resizeCallback = () => {
    callback(container.clientWidth, container.clientHeight);
  };

  const resizeObserver = new ResizeObserver(resizeCallback);
  resizeObserver.observe(container);

  // Call once to set initial size
  resizeCallback();

  return () => {
    resizeObserver.disconnect();
  };
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = containerRef.current;
    if (!container) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const { stopGl, setSize } = startGl(gl);

    const cleanupResize = observeResize(container, (width, height) => {
      setSize(width, height, window.devicePixelRatio || 1);
    });

    return () => {
      cleanupResize();
      stopGl();
    };
  }, []);

  return (
    <>
      <div className="bg-black w-full min-h-lvh relative" ref={containerRef}>
        <canvas
          id="canvas"
          className="absolute top-0 left-0 w-full h-full"
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  );
}

export default App;
