"use client";

import * as THREE from "three";
import type { Object3D, Object3DEventMap } from "three";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { RootState, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export function Dog() {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  const models = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl }: RootState): void => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(models.animations, models.scene);

  useEffect((): (() => void) => {
    const action = actions?.["Take 001"];
    if (action) {
      action.reset().play();
    }

    return (): void => {
      action?.stop();
    };
  }, [actions]);

  const [normalMap] = useTexture(["/models/assets/dog_normals.jpg"]).map(
    (texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    },
  );

  const [branchMap, branchNormalMap] = useTexture([
    "/models/assets/branches_diffuse.jpeg",
    "/models/assets/branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [
    mat1,
    mat2,
    mat3,
    mat4,
    mat5,
    mat6,
    mat7,
    mat8,
    mat9,
    mat10,
    mat11,
    mat12,
    mat13,
    mat14,
    mat15,
    mat16,
    mat17,
    mat18,
    mat19,
    mat20,
  ] = useTexture([
    "/models/assets/matcap/mat-1.png",
    "/models/assets/matcap/mat-2.png",
    "/models/assets/matcap/mat-3.png",
    "/models/assets/matcap/mat-4.png",
    "/models/assets/matcap/mat-5.png",
    "/models/assets/matcap/mat-6.png",
    "/models/assets/matcap/mat-7.png",
    "/models/assets/matcap/mat-8.png",
    "/models/assets/matcap/mat-9.png",
    "/models/assets/matcap/mat-10.png",
    "/models/assets/matcap/mat-11.png",
    "/models/assets/matcap/mat-12.png",
    "/models/assets/matcap/mat-13.png",
    "/models/assets/matcap/mat-14.png",
    "/models/assets/matcap/mat-15.png",
    "/models/assets/matcap/mat-16.png",
    "/models/assets/matcap/mat-17.png",
    "/models/assets/matcap/mat-18.png",
    "/models/assets/matcap/mat-19.png",
    "/models/assets/matcap/mat-20.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const material = useRef({
    uMatcap1: { value: mat19 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  function onBeforeCompile(shader: any): void {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `,
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;

  models.scene.traverse((child: Object3D<Object3DEventMap>): void => {
    if (!(child instanceof THREE.Mesh)) return;

    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogmodels = useRef(models);

  useGSAP((): void => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "+=1200 bottom",
        scrub: true,
      },
    });

    tl.to(dogmodels.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogmodels.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogmodels.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third",
      )
      .to(
        dogmodels.current.scene.position,
        {
          x: "-=0.5",
          z: "+=0.6",
          y: "-=0.05",
        },
        "third",
      );
  }, []);

  useEffect((): void => {
    document
      .querySelector(`.title[img-title="tomorrowland"`)
      ?.addEventListener("mouseenter", (): void => {
        material.current.uMatcap1.value = mat19;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: (): void => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="navy-pier"`)
      ?.addEventListener("mouseenter", (): void => {
        material.current.uMatcap1.value = mat8;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: (): void => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="chicago"]`)
      ?.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat9;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="pink"]`)
      ?.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat12;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="festival"]`)
      ?.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat10;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="man"]`)
      ?.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="royal"]`)
      ?.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat13;

        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document.querySelector(`.titles`)?.addEventListener("mouseleave", () => {
      material.current.uMatcap1.value = mat2;

      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });
  }, [mat19, mat2, mat8, mat9, mat13, mat12, mat10]);

  return (
    <>
      <primitive
        object={models.scene}
        scale={1.01}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 4.5, 0]}
      />
      <directionalLight intensity={10} color={0xffffff} position={[0, 5, 5]} />
    </>
  );
}
