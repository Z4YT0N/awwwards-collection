import { Mesh, SphereGeometry } from "three";
import { EarthMaterial } from "../materials/earth";
import { Athmosphere } from "./athmosphere";

const verteces = Math.pow(2, 9);

export const Earth = new Mesh(
  new SphereGeometry(2, verteces, verteces),
  EarthMaterial
)

Earth.add(Athmosphere)