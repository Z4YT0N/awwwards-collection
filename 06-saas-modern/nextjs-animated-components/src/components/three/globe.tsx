"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Wireframe globe
function WireframeGlobe({
  color = "#8B5CF6",
  rotationSpeed = 0.001,
  radius = 2,
}: {
  color?: string;
  rotationSpeed?: number;
  radius?: number;
}) {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += rotationSpeed * 0.5;
    }
  });

  return (
    <group>
      {/* Main sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.95, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>

      {/* Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.5, 0.01, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.3, 0]}>
          <torusGeometry args={[radius * 1.7, 0.01, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Dotted globe with connection arcs
function DottedGlobe({
  color = "#8B5CF6",
  dotColor = "#ffffff",
  rotationSpeed = 0.001,
  radius = 2,
}: {
  color?: string;
  dotColor?: string;
  rotationSpeed?: number;
  radius?: number;
}) {
  const globeRef = useRef<THREE.Group>(null);

  // Generate dots on sphere surface
  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push([x, y, z]);
    }

    return positions;
  }, [radius]);

  // Generate arcs
  const arcs = useMemo(() => {
    const arcPositions: THREE.Vector3[][] = [];
    const arcCount = 5;

    for (let i = 0; i < arcCount; i++) {
      const start = dots[Math.floor(Math.random() * dots.length)];
      const end = dots[Math.floor(Math.random() * dots.length)];

      const points: THREE.Vector3[] = [];
      const segments = 50;

      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const x = start[0] * (1 - t) + end[0] * t;
        const y = start[1] * (1 - t) + end[1] * t;
        const z = start[2] * (1 - t) + end[2] * t;

        // Lift the arc above the surface
        const len = Math.sqrt(x * x + y * y + z * z);
        const lift = 1 + 0.3 * Math.sin(t * Math.PI);
        points.push(new THREE.Vector3((x / len) * radius * lift, (y / len) * radius * lift, (z / len) * radius * lift));
      }

      arcPositions.push(points);
    }

    return arcPositions;
  }, [dots, radius]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base sphere glow */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* Dots */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={dotColor} />
        </mesh>
      ))}

      {/* Arcs */}
      {arcs.map((points, i) => {
        const curve = new THREE.CatmullRomCurve3(points);
        return (
          <mesh key={`arc-${i}`}>
            <tubeGeometry args={[curve, 50, 0.01, 8, false]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// Globe component wrapper
interface GlobeProps {
  className?: string;
  variant?: "wireframe" | "dotted";
  color?: string;
  interactive?: boolean;
}

export function Globe({
  className,
  variant = "wireframe",
  color = "#8B5CF6",
  interactive = true,
}: GlobeProps) {
  return (
    <div className={cn("w-full h-full min-h-[400px]", className)}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        {variant === "wireframe" ? (
          <WireframeGlobe color={color} />
        ) : (
          <DottedGlobe color={color} />
        )}

        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
}

export { WireframeGlobe, DottedGlobe };
