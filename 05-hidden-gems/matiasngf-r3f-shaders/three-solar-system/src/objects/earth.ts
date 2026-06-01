import { LinearMipMapLinearFilter, Mesh, MeshPhysicalMaterial, Object3D, PerspectiveCamera, SphereGeometry, TextureLoader, Vector3 } from "three";
import { moonOrbit } from "./moon";

const textureLoader = new TextureLoader();
const earthDaymap = textureLoader.load('/textures/earth/2k_earth_daymap.jpg');
earthDaymap.minFilter = LinearMipMapLinearFilter;
const earthSpecular = textureLoader.load('/textures/earth/2k_earth_specular_map.jpg');
const earthSpecularInverted = textureLoader.load('/textures/earth/2k_earth_specular_map_inverted.jpg');

const earthGeometry = new SphereGeometry(1, 32, 32);
const earthMaterial = new MeshPhysicalMaterial({
  map: earthDaymap,
  metalnessMap: earthSpecular,
  roughnessMap: earthSpecularInverted
});
export const earth = new Mesh(earthGeometry, earthMaterial);
earth.castShadow = true;
earth.receiveShadow = true;
export const earthOrbit = new Object3D();
earthOrbit.add(earth);
earthOrbit.add(moonOrbit);
moonOrbit.position.x = 10;
moonOrbit.position.z = -10;

export const earthCamera = new PerspectiveCamera();
earth.add(earthCamera);
earthCamera.position.x = 1;
earthCamera.position.y = -0.5;
earthCamera.position.z = 4;
earthCamera.lookAt(new Vector3(0,0,0));