import * as THREE from "three";
import { useTexture, useVideoTexture } from "@react-three/drei";
import {
  environmentPaths,
  SectionType,
  ShirtType,
  studioTextures,
  videoTextures,
} from "./textures";
import { useMemo } from "react";

export const useMainStudioTextures = () => {
  return useModifiedTextures(studioTextures.main, true);
};

export const useShirtSectionTextures = (
  shirtType: ShirtType,
  section: SectionType,
  setModifier = true
) => {
  const paths = studioTextures.shirts[shirtType][section];
  return useModifiedTextures(paths, setModifier);
};

export const useShirtEnvCube = (shirtType: ShirtType) => {
  const path = environmentPaths[shirtType];
  // return useCubeTexture(
  //   ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
  //   { path }
  // );
  const env = useMemo(() => {
    const tex = new THREE.CubeTextureLoader()
      .setPath(path)
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [path]);
  return env;
};

export const useShirtVideoTexture = (shirtType: ShirtType) => {
  const path = videoTextures[shirtType];
  return useVideoTexture(path);
};

function useModifiedTextures(
  paths: Record<string, string>,
  setModifier: boolean
) {
  const textures = useTexture(paths);
  if (setModifier)
    Object.values(textures).forEach((tex) => {
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  return textures;
}
