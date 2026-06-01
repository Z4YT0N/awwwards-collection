import { Mesh, SphereGeometry } from "three";
import { MetalCorroedMaterial } from "../materials/metal-corroded-heavy";

const verteces = Math.pow(2, 9);

export const MetalSphere = new Mesh(
  new SphereGeometry(2, verteces, verteces),
  MetalCorroedMaterial
)