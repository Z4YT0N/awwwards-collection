import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export const ground = new Mesh( new PlaneGeometry( 100, 100 ), new MeshStandardMaterial( { color: 0xcccccc } ) );
ground.receiveShadow = true;
ground.rotation.x = - Math.PI / 2;