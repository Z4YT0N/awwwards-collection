"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Cube } from "./Cube";

const Test = () => {
  return (
    <Canvas style={{ position: "fixed" }}>
      <OrbitControls />
      <mesh position={[-1, 0, 0]}>
        {/* geometry */}
        <boxGeometry />
        {/* material */}
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <mesh position={[1, 0, 0]} scale={2}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh> */}
      <Cube />
    </Canvas>
  );
};

export default Test;
