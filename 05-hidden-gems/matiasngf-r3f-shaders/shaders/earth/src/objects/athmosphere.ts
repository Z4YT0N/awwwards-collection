import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { AthmosphereMaterial } from "../materials/athmosphere";

const verteces = Math.pow(2, 9);

export const Athmosphere = new Mesh(
  new SphereGeometry(2.02, verteces, verteces),
  AthmosphereMaterial
)