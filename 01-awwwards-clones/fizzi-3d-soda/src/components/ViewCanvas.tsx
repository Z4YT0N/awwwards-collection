"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Perf } from "r3f-perf";
import { Suspense } from "react";

import dynamic from "next/dynamic";

type Props = {};


const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  {ssr: false}
)

export default function ViewCanvas({}: Props) {
  return (
    <>
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{
        fov: 30,
      }}
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>

      {/* performance metrics */}
      {/* <Perf/> */}
      <ambientLight intensity={2} />
      <spotLight intensity={3} position={[1, 1, 1]} />
    </Canvas>
    <Loader/>
    </>
  );
}
