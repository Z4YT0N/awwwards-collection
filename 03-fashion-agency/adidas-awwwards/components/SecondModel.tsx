import * as THREE from "three";
import { useGLTF, useMask } from "@react-three/drei";
import { ShirtType, TextureKey } from "@/lib/textures";
import { useShirtSectionTextures } from "@/lib/useTextures";
import { createMaterials } from "@/lib/material";
import { useGSAP } from "@gsap/react";
import { RefObject, useRef } from "react";
import gsap from "gsap";
import { shirtColors } from "@/lib/colors";
import { useMediaQuery } from "react-responsive";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};
export function SecondModel({ shirtType }: { shirtType: ShirtType }) {
  const { nodes } = useGLTF(
    "/models/ShirtScrolling.glb"
  ) as unknown as GLTFResult;
  const stencil = useMask(1, true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const textures = useShirtSectionTextures(shirtType, "second");
  const mats = createMaterials(textures, stencil) as Record<
    TextureKey<typeof shirtType, "second">,
    THREE.MeshBasicMaterial
  >;

  const marqueeText1Ref = useRef<THREE.Mesh>(null);
  const marqueeText1DupRef = useRef<THREE.Mesh>(null);
  const marqueeText2Ref = useRef<THREE.Mesh>(null);
  const marqueeText2DupRef = useRef<THREE.Mesh>(null);

  const groupRef = useRef<THREE.Group>(null);
  const textsRef = useRef<THREE.Group>(null);

  const getTextColor = () => shirtColors[shirtType]?.text ?? "black";
  const textsMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 1,
    ...stencil,
  });
  const marqueeMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 0,
    ...stencil,
  });
  const TOP_BOTTOM_TEXT_WIDTH = 5.7;
  const MIDDLE_TEXT_WIDTH = 6.2;
  const DURATION = 50;

  useGSAP(() => {
    if (!groupRef.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#second-section",
          start: "top top",
          end: "600% top",
          scrub: 1,
          pin: true,
          // markers: true,
        },
      })
      .to(groupRef.current.rotation, { x: 0, duration: 0.2 })
      .to(groupRef.current.position, { y: 0.7, duration: 0.8 }, "<")
      .to(groupRef.current.rotation, { y: -Math.PI * 2, duration: 0.8 }, "<")
      .to(groupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1 })
      .to(textsMaterial, { opacity: 0, duration: 0.05 }, "<")
      .to(marqueeMaterial, { opacity: 0.1, duration: 0.05 }, "<")
      .to(groupRef.current.position, { y: 0.7 })
      .add(animateTexts(textsRef).duration(0.5), 0);
  }, []);

  //marquee animation
  useGSAP(() => {
    if (
      !marqueeText1Ref.current ||
      !marqueeText1DupRef.current ||
      !marqueeText2Ref.current ||
      !marqueeText2DupRef.current
    )
      return;

    gsap.to(marqueeText1Ref.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });
    gsap.to(marqueeText1DupRef.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });
    gsap.to(marqueeText2Ref.current.position, {
      x: `+=${MIDDLE_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });
    gsap.to(marqueeText2DupRef.current.position, {
      x: `+=${MIDDLE_TEXT_WIDTH}`,
      duration: DURATION,
      ease: "none",
      repeat: -1,
    });
  });

  const animateTexts = (textsRef: RefObject<THREE.Group | null>) => {
    if (!textsRef.current) return gsap.timeline();
    const meshes = textsRef.current.children as THREE.Mesh[];

    const tl = gsap.timeline();
    meshes.forEach((mesh, i) => {
      tl.from(
        mesh.scale,
        { x: 0, y: 0, z: 0, duration: 1, ease: "circ.out" },
        i * 0.1
      );
      tl.from(
        mesh.position,
        { y: "+=0.04", duration: 1, ease: "back.out" },
        i * 0.1
      );
    });

    return tl;
  };
  return (
    <group
      ref={groupRef}
      dispose={null}
      scale={isMobile ? 1.5 : 2.2}
      rotation={[Math.PI / 8, Math.PI / 3, 0]}
      position-y={0.1}
    >
      <mesh geometry={nodes.Shirt.geometry} material={mats.shirt} />
      <mesh geometry={nodes.Sphere_ENV.geometry} material={mats.sphere} />

      <group ref={textsRef}>
        {Object.entries(nodes)
          .filter(([key]) => key.startsWith("Texts"))
          .map(([key, node]) => (
            <mesh
              key={key}
              geometry={node.geometry}
              material={textsMaterial}
              position={node.position}
            />
          ))}
      </group>
      <mesh
        ref={marqueeText1Ref}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText1DupRef}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[TOP_BOTTOM_TEXT_WIDTH, 0, 0]}
      />
      <mesh
        ref={marqueeText2Ref}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText2DupRef}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[-MIDDLE_TEXT_WIDTH, 0, 0]}
      />
    </group>
  );
}


