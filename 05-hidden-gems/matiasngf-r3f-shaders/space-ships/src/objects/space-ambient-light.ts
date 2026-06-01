import { AmbientLight } from "three";

export const SpaceAmbientLight = () => {
  const light = new AmbientLight(0xffffff, 0.05);
  return light;
}