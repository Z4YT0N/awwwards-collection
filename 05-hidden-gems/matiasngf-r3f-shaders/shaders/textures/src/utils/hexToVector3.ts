import { Vector3 } from "three";
import { hexToRgb } from "./hexToRgb";

export const hexToVector3 = (hex: string) => {
  const rgb = hexToRgb(hex);
  return new Vector3(rgb.r / 255, rgb.g / 255, rgb.b / 255);
}