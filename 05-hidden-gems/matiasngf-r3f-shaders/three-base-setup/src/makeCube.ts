import { Mesh, MeshPhongMaterial, MeshPhongMaterialParameters } from "three";

export function makeInstance(geometry: any, parameters: MeshPhongMaterialParameters, x: number) {
  const material = new MeshPhongMaterial(parameters);
  const cube = new Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = 1;
  return cube;
}