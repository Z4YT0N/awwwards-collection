import { Mesh, MeshPhongMaterial, MeshPhysicalMaterial, Object3D, PerspectiveCamera, SphereGeometry, TextureLoader, Vector3 } from "three";

const moonGeometry = new SphereGeometry(0.3, 32, 32);

const textureLoader = new TextureLoader();
const moonMap = textureLoader.load('/textures/moon/2k_moon.jpg');
const moonMaterial = new MeshPhysicalMaterial({
  map: moonMap
});
export const moon = new Mesh(moonGeometry, moonMaterial);
moon.castShadow = true;
moon.receiveShadow = true;
export const moonOrbit = new Object3D();
moonOrbit.add(moon);

export const moonCamera = new PerspectiveCamera();
moon.add(moonCamera);
moonCamera.position.x = 5;
moonCamera.position.y = 2;
moonCamera.lookAt(new Vector3(0,0,0));