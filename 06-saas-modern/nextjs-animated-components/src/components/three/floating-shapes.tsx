"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Floating sphere with distortion
function DistortedSphere({
  position = [0, 0, 0],
  color = "#8B5CF6",
  speed = 1,
  distort = 0.4,
  radius = 1,
}: {
  position?: [number, number, number];
  color?: string;
  speed?: number;
  distort?: number;
  radius?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Floating torus
function FloatingTorus({
  position = [0, 0, 0],
  color = "#EC4899",
  speed = 1,
}: {
  position?: [number, number, number];
  color?: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

// Floating icosahedron
function FloatingIcosahedron({
  position = [0, 0, 0],
  color = "#06B6D4",
  speed = 1,
  size = 1,
}: {
  position?: [number, number, number];
  color?: string;
  speed?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Particle field
function ParticleField({ count = 500, color = "#ffffff" }: { count?: number; color?: string }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

// Main floating shapes scene
interface FloatingShapesProps {
  className?: string;
  preset?: "minimal" | "vibrant" | "monochrome" | "neon";
}

export function FloatingShapes({ className, preset = "vibrant" }: FloatingShapesProps) {
  const presets = {
    minimal: {
      shapes: [
        { type: "sphere", position: [0, 0, 0] as [number, number, number], color: "#ffffff" },
      ],
      particles: true,
      particleColor: "#ffffff",
    },
    vibrant: {
      shapes: [
        { type: "sphere", position: [-2, 1, -2] as [number, number, number], color: "#8B5CF6" },
        { type: "torus", position: [2, -1, -1] as [number, number, number], color: "#EC4899" },
        { type: "icosahedron", position: [0, 2, -3] as [number, number, number], color: "#06B6D4" },
      ],
      particles: true,
      particleColor: "#8B5CF6",
    },
    monochrome: {
      shapes: [
        { type: "sphere", position: [-1.5, 0, -2] as [number, number, number], color: "#ffffff" },
        { type: "torus", position: [1.5, 0.5, -1] as [number, number, number], color: "#888888" },
      ],
      particles: true,
      particleColor: "#444444",
    },
    neon: {
      shapes: [
        { type: "sphere", position: [-2, 0, -2] as [number, number, number], color: "#00ff88" },
        { type: "torus", position: [2, 1, -1] as [number, number, number], color: "#ff0088" },
        { type: "icosahedron", position: [0, -1, -2] as [number, number, number], color: "#0088ff" },
      ],
      particles: true,
      particleColor: "#00ff88",
    },
  };

  const config = presets[preset];

  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />

        {config.shapes.map((shape, i) => {
          switch (shape.type) {
            case "sphere":
              return <DistortedSphere key={i} position={shape.position} color={shape.color} />;
            case "torus":
              return <FloatingTorus key={i} position={shape.position} color={shape.color} />;
            case "icosahedron":
              return <FloatingIcosahedron key={i} position={shape.position} color={shape.color} />;
            default:
              return null;
          }
        })}

        {config.particles && <ParticleField color={config.particleColor} />}

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export { DistortedSphere, FloatingTorus, FloatingIcosahedron, ParticleField };
