import { useEffect, useRef, useState, memo } from 'react';
import * as THREE from 'three';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('webgl2'));
  } catch {
    return false;
  }
}

const frag = `
precision mediump float;
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform vec3 uColor;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform float uNoise;
uniform float uBandWidth;
uniform float uYOffset;
uniform float uFadeTop;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform int uIterations;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 uv = vUv;
  uv.y += uYOffset;
  vec2 p = uv * 2.0 - 1.0;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  float aspect = uCanvas.x / uCanvas.y;
  vec2 q = vec2(rp.x * aspect, rp.y);
  float invScale = 1.0 / max(uScale, 0.0001);
  q *= invScale;
  q /= 0.5 + 0.2 * dot(q, q);
  q += (uPointer - rp) * uMouseInfluence * 0.2;
  q += 0.2 * cos(t) - 7.56;

  for (int i = 0; i < 5; i++) {
    if (i >= uIterations) break;
    vec2 r = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q = q + (r - q) * uWarpStrength;
  }

  float m = length(q + sin(5.0 * q.y * uFrequency - 3.0 * t) * 0.25);

  float w = 1.0 - exp(-6.0 / exp(6.0 * m));
  w = pow(clamp(w, 0.0, 1.0), uBandWidth);
  w *= smoothstep(uFadeTop, 0.0, vUv.y);
  w *= uIntensity;

  vec3 col = uColor * w;
  col += (fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uNoise;
  col = clamp(col, 0.0, 1.0) * w;

  gl_FragColor = vec4(col, w);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const HeroBand = memo(function HeroBand({
  className = '',
  style,
  color = '#A855F7',
  rotation = 0,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 11,
  noise = 0.05,
  bandWidth = 1.4,
  yOffset = 0,
  fadeTop = 0.3,
  mouseInfluence = 0.3,
  iterations = 1,
  intensity = 1.0,
}) {
  const containerRef = useRef(null);
  const materialRef = useRef(null);
  const rafRef = useRef(null);
  const [supported] = useState(hasWebGL);
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const pointerCurrent = useRef(new THREE.Vector2(0, 0));
  const rectRef = useRef({ left: 0, top: 0, width: 1, height: 1 });

  useEffect(() => {
    if (!supported) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColor: { value: new THREE.Vector3(0.66, 0.33, 0.97) },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uNoise: { value: noise },
        uBandWidth: { value: bandWidth },
        uYOffset: { value: yOffset },
        uFadeTop: { value: fadeTop },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
      },
      premultipliedAlpha: true,
      transparent: true,
    });
    materialRef.current = material;

    scene.add(new THREE.Mesh(geometry, material));

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
      rectRef.current = container.getBoundingClientRect();
    };

    handleResize();

    let ro;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    const handlePointer = (e) => {
      const r = rectRef.current;
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointerTarget.current.set(x, y);
    };
    window.addEventListener('mousemove', handlePointer, { passive: true });

    const loop = () => {
      const dt = clock.getDelta();
      material.uniforms.uTime.value = clock.elapsedTime;

      const amt = Math.min(1, dt * 4);
      pointerCurrent.current.lerp(pointerTarget.current, amt);
      material.uniforms.uPointer.value.copy(pointerCurrent.current);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement?.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uBandWidth.value = bandWidth;
    material.uniforms.uYOffset.value = yOffset;
    material.uniforms.uFadeTop.value = fadeTop;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;

    const hex = color.replace('#', '').trim();
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    material.uniforms.uColor.value.set(r, g, b);

    const rad = (rotation * Math.PI) / 180;
    material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));
  }, [color, rotation, speed, scale, frequency, warpStrength, noise, bandWidth, yOffset, fadeTop, mouseInfluence, iterations, intensity]);

  if (!supported) return <div className={className} style={style} />;

  return <div ref={containerRef} className={className} style={style} />;
});

export default HeroBand;
