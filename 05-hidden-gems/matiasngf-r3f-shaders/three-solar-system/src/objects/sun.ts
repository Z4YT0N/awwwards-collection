import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from "three";

const sunGeometry = new SphereGeometry(5, 32, 32);

const textureLoader = new TextureLoader();
const sunmap = textureLoader.load('/textures/sun/2k_sun.jpg');

const sunMaterial = new MeshPhongMaterial({
  emissive: 0xffffff,
  emissiveMap: sunmap,
  emissiveIntensity: 8,
});
export const sun = new Mesh(sunGeometry, sunMaterial);
