import * as THREE from "three";
import { useGLTF, useMask } from "@react-three/drei";
import { useShirtSectionTextures } from "@/lib/useTextures";
import { createMaterials } from "@/lib/material";
import { TextureKey } from "@/lib/textures";
import Masking from "./Masking";
import { useRef } from "react";
import useFirstAnimation from "@/lib/useFirstAnimation";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};
export function FirstSportModel() {
  const { nodes } = useGLTF(
    "/models/sport/SportStudio.glb"
  ) as unknown as GLTFResult;

  const stencil = useMask(1);

  const shirtRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const maskRef = useRef<THREE.Mesh>(null);

  const textures = useShirtSectionTextures("sport", "first");
  const mats = createMaterials(textures, stencil) as Record<
    TextureKey<"sport", "first">,
    THREE.MeshBasicMaterial
  >;
  useFirstAnimation(groupRef, shirtRef, maskRef);
  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Sport.geometry}
          material={mats.shirt}
          position={[0, 0.7, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh geometry={nodes.Environment.geometry} material={mats.env} />
        <mesh geometry={nodes.Ramp.geometry} material={mats.ramp} />
        <mesh
          geometry={nodes.SakteBoard.geometry}
          material={mats.skateboard}
          position={[0, -0.012, 0]}
        />
      </group>
    </group>
  );
}


