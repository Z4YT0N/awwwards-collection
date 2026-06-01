import { DirectionalLight } from "three";

export const SunLight = () => {
  const light = new DirectionalLight(0xffffff, 1);
  light.castShadow = true;
  return light;
}