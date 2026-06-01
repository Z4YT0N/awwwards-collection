import { useMemo, useRef, useState } from "react"

import { useEffect } from "react"
import { startGl } from "./gl"
import { useControls } from "leva"

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace("#", ""), 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

function hexToVec3(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex)
  return [r / 255, g / 255, b / 255]
}

function observeResize(
  container: HTMLDivElement,
  callback: (width: number, height: number) => void
) {
  const resizeCallback = () => {
    callback(container.clientWidth, container.clientHeight)
  }

  const resizeObserver = new ResizeObserver(resizeCallback)
  resizeObserver.observe(container)

  // Call once to set initial size
  resizeCallback()

  return () => {
    resizeObserver.disconnect()
  }
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [{ renderer }, setElements] = useState<{
    canvas: HTMLCanvasElement | null
    container: HTMLDivElement | null
    renderer: ReturnType<typeof startGl> | null
  }>({
    canvas: null,
    container: null,
    renderer: null
  })

  const rendererRef = useRef<ReturnType<typeof startGl> | null>(null)
  rendererRef.current = renderer

  const defaultUniforms = useMemo(
    () => ({
      uColor: "#1ea0ce",
      uSize: 0.2
    }),
    []
  )

  useControls({
    uColor: {
      value: defaultUniforms.uColor,
      onChange: (value) => {
        rendererRef.current?.updateUniforms({
          uColor: hexToVec3(value)
        })
      }
    },
    uSize: {
      value: defaultUniforms.uSize,
      onChange: (value) => {
        rendererRef.current?.updateUniforms({
          uSize: value
        })
      }
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = containerRef.current
    if (!container) return

    const gl = canvas.getContext("webgl2")
    if (!gl) return

    const renderer = startGl(gl)

    const cleanupResize = observeResize(container, (width, height) => {
      renderer.setSize(width, height, window.devicePixelRatio || 1)
      renderer.updateUniforms({
        uAspect: width / height
      })
    })

    setElements({ canvas, container, renderer })

    // set initial uniforms
    renderer.updateUniforms({
      uColor: hexToVec3(defaultUniforms.uColor),
      uSize: defaultUniforms.uSize
    })

    return () => {
      cleanupResize()
      renderer.stopGl()
    }
  }, [defaultUniforms])

  return (
    <>
      <div className="relative min-h-lvh w-full bg-black" ref={containerRef}>
        <canvas
          id="canvas"
          className="absolute left-0 top-0 h-full w-full"
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  )
}

export default App
