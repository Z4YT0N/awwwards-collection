"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// =============================================================================
// Noise Gradient Shader Background
// =============================================================================

const noiseGradientVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const noiseGradientFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uNoiseScale;
  uniform float uSpeed;
  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * uSpeed;

    // Create layered noise
    float noise1 = snoise(uv * uNoiseScale + time * 0.5);
    float noise2 = snoise(uv * uNoiseScale * 2.0 - time * 0.3);
    float noise3 = snoise(uv * uNoiseScale * 4.0 + time * 0.2);

    float combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;
    combinedNoise = combinedNoise * 0.5 + 0.5;

    // Create gradient with three colors
    vec3 color;
    if (combinedNoise < 0.5) {
      color = mix(uColor1, uColor2, combinedNoise * 2.0);
    } else {
      color = mix(uColor2, uColor3, (combinedNoise - 0.5) * 2.0);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

function NoiseGradientMesh({
  color1,
  color2,
  color3,
  noiseScale,
  speed,
}: {
  color1: THREE.Color;
  color2: THREE.Color;
  color3: THREE.Color;
  noiseScale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uColor3: { value: color3 },
      uNoiseScale: { value: noiseScale },
      uSpeed: { value: speed },
    }),
    [color1, color2, color3, noiseScale, speed]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={noiseGradientFragmentShader}
      />
    </mesh>
  );
}

interface NoiseGradientBackgroundProps {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  noiseScale?: number;
  speed?: number;
}

export function NoiseGradientBackground({
  className,
  color1 = "#4f46e5",
  color2 = "#7c3aed",
  color3 = "#ec4899",
  noiseScale = 3,
  speed = 0.3,
}: NoiseGradientBackgroundProps) {
  const c1 = useMemo(() => new THREE.Color(color1), [color1]);
  const c2 = useMemo(() => new THREE.Color(color2), [color2]);
  const c3 = useMemo(() => new THREE.Color(color3), [color3]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <NoiseGradientMesh
          color1={c1}
          color2={c2}
          color3={c3}
          noiseScale={noiseScale}
          speed={speed}
        />
      </Canvas>
    </div>
  );
}

// =============================================================================
// Liquid Metal Shader Background
// =============================================================================

const liquidMetalFragmentShader = `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform float uReflectivity;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.3;

    // Create liquid distortion
    float noise = snoise(uv * 3.0 + time);
    float noise2 = snoise(uv * 5.0 - time * 0.5);

    // Calculate pseudo-normals for reflection
    float dx = snoise(vec2(uv.x + 0.01, uv.y) * 3.0 + time) - noise;
    float dy = snoise(vec2(uv.x, uv.y + 0.01) * 3.0 + time) - noise;

    vec3 normal = normalize(vec3(dx * 10.0, dy * 10.0, 1.0));

    // Fresnel-like effect
    float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);

    // Specular highlights
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 32.0);

    // Combine colors
    vec3 color = uBaseColor * (0.5 + 0.5 * noise);
    color += vec3(1.0) * specular * uReflectivity;
    color += vec3(0.8, 0.9, 1.0) * fresnel * 0.3;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function LiquidMetalMesh({
  baseColor,
  reflectivity,
}: {
  baseColor: THREE.Color;
  reflectivity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBaseColor: { value: baseColor },
      uReflectivity: { value: reflectivity },
    }),
    [baseColor, reflectivity]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={liquidMetalFragmentShader}
      />
    </mesh>
  );
}

interface LiquidMetalBackgroundProps {
  className?: string;
  color?: string;
  reflectivity?: number;
}

export function LiquidMetalBackground({
  className,
  color = "#1a1a2e",
  reflectivity = 0.8,
}: LiquidMetalBackgroundProps) {
  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <LiquidMetalMesh baseColor={baseColor} reflectivity={reflectivity} />
      </Canvas>
    </div>
  );
}

// =============================================================================
// Wave Distortion Shader Background
// =============================================================================

const waveDistortionFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.5;

    // Create wave distortion
    float wave1 = sin(uv.x * uWaveFrequency + time) * uWaveAmplitude;
    float wave2 = sin(uv.y * uWaveFrequency * 0.8 + time * 1.2) * uWaveAmplitude;
    float wave3 = sin((uv.x + uv.y) * uWaveFrequency * 0.5 + time * 0.8) * uWaveAmplitude;

    float combinedWave = (wave1 + wave2 + wave3) / 3.0;

    // Create gradient based on waves
    float gradient = uv.y + combinedWave;
    gradient = clamp(gradient, 0.0, 1.0);

    vec3 color = mix(uColor1, uColor2, gradient);

    // Add subtle highlights
    float highlight = pow(abs(sin(gradient * 10.0 + time)), 8.0) * 0.1;
    color += vec3(highlight);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function WaveDistortionMesh({
  color1,
  color2,
  waveFrequency,
  waveAmplitude,
}: {
  color1: THREE.Color;
  color2: THREE.Color;
  waveFrequency: number;
  waveAmplitude: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
    }),
    [color1, color2, waveFrequency, waveAmplitude]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={waveDistortionFragmentShader}
      />
    </mesh>
  );
}

interface WaveDistortionBackgroundProps {
  className?: string;
  color1?: string;
  color2?: string;
  waveFrequency?: number;
  waveAmplitude?: number;
}

export function WaveDistortionBackground({
  className,
  color1 = "#0f0f23",
  color2 = "#2d1b69",
  waveFrequency = 10,
  waveAmplitude = 0.1,
}: WaveDistortionBackgroundProps) {
  const c1 = useMemo(() => new THREE.Color(color1), [color1]);
  const c2 = useMemo(() => new THREE.Color(color2), [color2]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <WaveDistortionMesh
          color1={c1}
          color2={c2}
          waveFrequency={waveFrequency}
          waveAmplitude={waveAmplitude}
        />
      </Canvas>
    </div>
  );
}

// =============================================================================
// Plasma Shader Background
// =============================================================================

const plasmaFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float time = uTime * 0.5;

    // Create plasma pattern
    float v1 = sin(uv.x * 10.0 + time);
    float v2 = sin(10.0 * (uv.x * sin(time / 2.0) + uv.y * cos(time / 3.0)) + time);
    float v3 = sin(sqrt(100.0 * (pow(uv.x + 0.5 * sin(time / 5.0), 2.0) + pow(uv.y + 0.5 * cos(time / 3.0), 2.0)) + 1.0) + time);
    float v4 = sin(sqrt(pow(uv.x, 2.0) + pow(uv.y, 2.0)) * 10.0 + time);

    float plasma = (v1 + v2 + v3 + v4) / 4.0;
    plasma = plasma * 0.5 + 0.5;

    // Map to colors
    vec3 color;
    if (plasma < 0.33) {
      color = mix(uColor1, uColor2, plasma * 3.0);
    } else if (plasma < 0.66) {
      color = mix(uColor2, uColor3, (plasma - 0.33) * 3.0);
    } else {
      color = mix(uColor3, uColor1, (plasma - 0.66) * 3.0);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

function PlasmaMesh({
  color1,
  color2,
  color3,
}: {
  color1: THREE.Color;
  color2: THREE.Color;
  color3: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uColor3: { value: color3 },
    }),
    [color1, color2, color3]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={plasmaFragmentShader}
      />
    </mesh>
  );
}

interface PlasmaBackgroundProps {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

export function PlasmaBackground({
  className,
  color1 = "#ff006e",
  color2 = "#8338ec",
  color3 = "#3a86ff",
}: PlasmaBackgroundProps) {
  const c1 = useMemo(() => new THREE.Color(color1), [color1]);
  const c2 = useMemo(() => new THREE.Color(color2), [color2]);
  const c3 = useMemo(() => new THREE.Color(color3), [color3]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <PlasmaMesh color1={c1} color2={c2} color3={c3} />
      </Canvas>
    </div>
  );
}

// =============================================================================
// Organic Blob Shader Background
// =============================================================================

const organicBlobFragmentShader = `
  uniform float uTime;
  uniform vec3 uBlobColor;
  uniform vec3 uBackgroundColor;
  uniform float uBlobCount;
  varying vec2 vUv;

  float blob(vec2 uv, vec2 center, float radius, float softness) {
    float dist = length(uv - center);
    return smoothstep(radius + softness, radius - softness, dist);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float time = uTime * 0.3;

    float blobs = 0.0;

    // Create multiple organic blobs
    for (float i = 0.0; i < 5.0; i++) {
      float angle = i * 1.2566 + time * (0.5 + i * 0.1);
      float radius = 0.3 + sin(time + i) * 0.1;
      vec2 center = vec2(
        cos(angle) * (0.3 + sin(time * 0.5 + i) * 0.2),
        sin(angle) * (0.3 + cos(time * 0.7 + i) * 0.2)
      );
      blobs += blob(uv, center, radius, 0.3);
    }

    blobs = clamp(blobs, 0.0, 1.0);

    vec3 color = mix(uBackgroundColor, uBlobColor, blobs * 0.8);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function OrganicBlobMesh({
  blobColor,
  backgroundColor,
}: {
  blobColor: THREE.Color;
  backgroundColor: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBlobColor: { value: blobColor },
      uBackgroundColor: { value: backgroundColor },
    }),
    [blobColor, backgroundColor]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={organicBlobFragmentShader}
      />
    </mesh>
  );
}

interface OrganicBlobBackgroundProps {
  className?: string;
  blobColor?: string;
  backgroundColor?: string;
}

export function OrganicBlobBackground({
  className,
  blobColor = "#8b5cf6",
  backgroundColor = "#0f0f0f",
}: OrganicBlobBackgroundProps) {
  const blob = useMemo(() => new THREE.Color(blobColor), [blobColor]);
  const bg = useMemo(() => new THREE.Color(backgroundColor), [backgroundColor]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrganicBlobMesh blobColor={blob} backgroundColor={bg} />
      </Canvas>
    </div>
  );
}

// =============================================================================
// Glitch Shader Background
// =============================================================================

const glitchFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uIntensity;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime;

    // Random glitch offset
    float glitchLine = step(0.98, random(vec2(floor(uv.y * 50.0), floor(time * 10.0))));
    float glitchOffset = (random(vec2(floor(time * 20.0), 0.0)) - 0.5) * uIntensity * glitchLine;

    uv.x += glitchOffset;

    // Color separation (chromatic aberration on glitch)
    float rOffset = glitchLine * uIntensity * 0.02;
    float bOffset = -glitchLine * uIntensity * 0.02;

    // Base gradient
    float gradient = uv.y + sin(uv.x * 10.0 + time) * 0.05;

    vec3 color;
    color.r = mix(uColor1.r, uColor2.r, gradient + rOffset);
    color.g = mix(uColor1.g, uColor2.g, gradient);
    color.b = mix(uColor1.b, uColor2.b, gradient + bOffset);

    // Scanlines
    float scanline = sin(uv.y * 400.0) * 0.04;
    color -= scanline;

    // Noise overlay
    float noise = random(uv + time) * 0.05;
    color += noise;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GlitchMesh({
  color1,
  color2,
  intensity,
}: {
  color1: THREE.Color;
  color2: THREE.Color;
  intensity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uIntensity: { value: intensity },
    }),
    [color1, color2, intensity]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={noiseGradientVertexShader}
        fragmentShader={glitchFragmentShader}
      />
    </mesh>
  );
}

interface GlitchBackgroundProps {
  className?: string;
  color1?: string;
  color2?: string;
  intensity?: number;
}

export function GlitchBackground({
  className,
  color1 = "#0a0a0a",
  color2 = "#1a1a2e",
  intensity = 0.5,
}: GlitchBackgroundProps) {
  const c1 = useMemo(() => new THREE.Color(color1), [color1]);
  const c2 = useMemo(() => new THREE.Color(color2), [color2]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GlitchMesh color1={c1} color2={c2} intensity={intensity} />
      </Canvas>
    </div>
  );
}
