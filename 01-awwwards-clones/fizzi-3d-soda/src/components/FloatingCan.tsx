"use client";

import { Float } from "@react-three/drei";
import { SodaCan, SodaCanProps } from "./SodaCan";
import { Children, forwardRef, ReactNode } from "react";
import { Group } from "three";
import { reference } from "three/webgpu";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  rotationIntensity?: number;
  floatSpeed?: number;
  floatingRange?: [number, number];
  floatIntensity?: number;
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = "blackCherry",
      rotationIntensity = 1.5,
      floatSpeed = 7  ,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}> {/* we can use this ref to maneuver the group */}
        <Float
          speed={floatSpeed} // Animation speed, defaults to 1
          rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
          floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={floatingRange} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
