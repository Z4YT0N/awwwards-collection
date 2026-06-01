import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";

const size = 1;
const geometry = new BoxGeometry( size, size, size);
const material = new MeshStandardMaterial( { color: 0x0000ff } );
export const cube = new Mesh( geometry, material );
cube.castShadow = true;

cube.position.set(0, size/2, 0)