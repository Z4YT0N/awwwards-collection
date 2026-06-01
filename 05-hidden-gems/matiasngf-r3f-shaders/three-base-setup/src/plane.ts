import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

export const ground = new Mesh( new PlaneGeometry( 100, 100 ), new MeshPhongMaterial( { color: 0xcccccc } ) );
ground.rotation.x = - Math.PI / 2;