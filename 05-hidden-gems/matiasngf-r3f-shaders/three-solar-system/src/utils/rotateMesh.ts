import { Mesh, Object3D } from "three";

export const rotateMesh = (node: Mesh | Object3D, speed: number) => {
  node.rotation.y += speed;
}