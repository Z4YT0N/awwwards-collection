import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Probe(props) {
  const { nodes, materials } = useGLTF("/probe-transformed.glb");
  const lightMaterial = materials.light.clone();
  lightMaterial.emissiveIntensity = 10;
  lightMaterial.emissive.set(props.color);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.423, 0.036, -0.084]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["cam_low_Material_#26_0_1"].geometry}
          material={materials.Material_26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["cam_low_Material_#26_0_2"].geometry}
          material={lightMaterial}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ball_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["d_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["inner_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.211, -0.033, 7.813]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Object018_Material_#26_0"].geometry}
        material={lightMaterial}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["shell_low_Material_#26_0"].geometry}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color="white"
          roughness={0.35}
          metalness={1}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/probe-transformed.glb");
