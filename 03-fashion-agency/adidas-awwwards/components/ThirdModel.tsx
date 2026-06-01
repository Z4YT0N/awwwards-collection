import * as THREE from "three";

import { useCallback, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { MeshReflectorMaterial, Text, useMask } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import { shirtColors } from "@/lib/colors";
import { ShirtType, TextureKey } from "@/lib/textures";
import {
  useShirtEnvCube,
  useShirtSectionTextures,
  useShirtVideoTexture,
} from "@/lib/useTextures";
import Masking from "./Masking";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ThirdModel = ({ shirtType }: { shirtType: ShirtType }) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const stencil = useMask(1);
  const maskRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const textures = useShirtSectionTextures(shirtType, "third", false) as Record<
    TextureKey<typeof shirtType, "third">,
    THREE.Texture
  >;

  const envMap = useShirtEnvCube(shirtType);
  const video = useShirtVideoTexture(shirtType);
  console.log(envMap);
  useGSAP(() => {
    if (!groupRef.current || !maskRef.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#third-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      })
      .from(maskRef.current.position, { y: -3 })
      .from(maskRef.current.rotation, { z: -0.3 }, "<");
  });

  const getTextColor = () => shirtColors[shirtType]?.text ?? "black";
  const getWallColor = () => shirtColors[shirtType]?.wall ?? "white";

  const handleButtonClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    window.open("https://www.google.com", "_blank");
  }, []);
  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef}>
        <mesh
          scale={isMobile ? 0.06 : 0.1}
          rotation-y={-Math.PI / 6}
          position={isMobile ? [0, 0.45, 0] : [0.2, 0.65, 0]}
        >
          <planeGeometry args={[16, 9]} />
          <meshBasicMaterial map={video} {...stencil} />
        </mesh>
        <mesh position-y={0.2} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 3]} />
          <MeshReflectorMaterial
            envMap={envMap}
            normalMap={textures.normal}
            map={textures.overlay}
            blur={[300, 30]}
            resolution={1024}
            mixBlur={1}
            mixStrength={10}
            roughness={0.8}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            metalness={0}
            {...stencil}
          />
        </mesh>
        {/* wall */}
        <mesh position={[0, 5, -1.3]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial
            color={getWallColor()}
            map={textures.overlay}
            {...stencil}
          />
        </mesh>

        {/* HTML content in 3d */}
        <group
          position={isMobile ? [0, 0.9, 0] : [-0.8, 0.7, 0]}
          rotation={isMobile ? [0, -Math.PI / 9, 0] : [0, Math.PI / 9, 0]}
        >
          {/* 3D logo icon */}
          <mesh position={[0, 0.1, 0]}>
            <planeGeometry args={[0.5, 0.2]} />
            <meshBasicMaterial
              color={getTextColor()}
              map={textures.icon}
              transparent
              {...stencil}
            />
          </mesh>

          {/* button */}
          <group
            onClick={handleButtonClick}
            onPointerEnter={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={() => {
              document.body.style.cursor = "auto";
            }}
          >
            <mesh>
              <boxGeometry args={[0.5, 0.12, 0.02]} />
              <meshBasicMaterial color={getTextColor()} {...stencil} />
            </mesh>
            <Text
              fontSize={0.035}
              anchorX={"center"}
              anchorY={"middle"}
              position={[0, 0, 0.03]}
            >
              SHOP THE COLLECTION
              <meshBasicMaterial
                color={getTextColor() === "black" ? "white" : "black"}
                {...stencil}
              />
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default ThirdModel;
