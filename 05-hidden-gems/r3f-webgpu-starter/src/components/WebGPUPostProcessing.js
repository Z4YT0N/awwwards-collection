import * as THREE from "three/webgpu";
import {
  pass,
  mrt,
  output,
  transformedNormalView,
  metalness,
  blendColor,
  depth,
  emissive,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { ssr } from "three/addons/tsl/display/SSRNode.js";
import { smaa } from "three/addons/tsl/display/SMAANode.js";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export function WebGPUPostProcessing({
  strength = 2.5,
  radius = 0.5,
  quality = "default",
}) {
  const { gl: renderer, scene, camera, size } = useThree();
  const postProcessingRef = useRef(null);

  useEffect(() => {
    if (!renderer || !scene || !camera) return;

    // Create post-processing setup with specific filters
    const scenePass = pass(scene, camera, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    // Setup Multiple Render Targets (MRT)
    scenePass.setMRT(
      mrt({
        output: output,
        normal: transformedNormalView,
        metalness: metalness,
        emissive: emissive,
      })
    );

    // Get texture nodes
    const scenePassColor = scenePass.getTextureNode("output");
    const scenePassNormal = scenePass.getTextureNode("normal");
    const scenePassDepth = scenePass.getTextureNode("depth");
    const scenePassMetalness = scenePass.getTextureNode("metalness");
    const scenePassEmissive = scenePass.getTextureNode("emissive");

    // Create SSR pass
    const ssrPass = ssr(
      scenePassColor,
      scenePassDepth,
      scenePassNormal,
      scenePassMetalness,
      camera
    );
    ssrPass.resolutionScale = 0.65;
    ssrPass.maxDistance.value = 0.65;
    ssrPass.opacity.value = 0.85;
    ssrPass.thickness.value = 0.015;

    // Create bloom pass
    const bloomPass = bloom(scenePassEmissive, strength, radius, 0.6);

    // Blend SSR over beauty with SMAA
    const outputNode = smaa(blendColor(scenePassColor.add(bloomPass), ssrPass));

    // Setup post-processing
    const postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = outputNode;
    postProcessingRef.current = postProcessing;

    // Handle window resize

    if (postProcessingRef.current.setSize) {
      postProcessingRef.current.setSize(size.width, size.height);
      postProcessingRef.current.needsUpdate = true;
    }

    return () => {
      postProcessingRef.current = null;
    };
  }, [renderer, scene, camera, size, strength, radius, quality]);

  useFrame(({ gl, scene, camera }) => {
    if (postProcessingRef.current) {
      gl.clear();
      postProcessingRef.current.render();
    }
  }, 1);

  return null;
}
