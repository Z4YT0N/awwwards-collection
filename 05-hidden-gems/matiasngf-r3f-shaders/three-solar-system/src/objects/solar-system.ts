import { DirectionalLight, DirectionalLightShadow, Object3D, PerspectiveCamera, Vector3 } from "three";
import { earthOrbit } from "./earth";
import { sun } from "./sun";

export const solarSystem = new Object3D();
solarSystem.add(sun);
earthOrbit.position.x = 400;
solarSystem.add(earthOrbit);
earthOrbit.rotation.y = 3;

export const earthLightShadow = new DirectionalLight(0xffffff, 1);
earthLightShadow.castShadow = true;
earthLightShadow.position.set(0, 0, 0);
earthLightShadow.target.position.set(
  earthOrbit.position.x,
  earthOrbit.position.y,
  earthOrbit.position.z
);
earthLightShadow.shadow.camera.left = -1.5
earthLightShadow.shadow.camera.right = 1.5
earthLightShadow.shadow.camera.top = 1.5
earthLightShadow.shadow.camera.bottom = -1.5
earthLightShadow.shadow.camera.near = 350
earthLightShadow.shadow.camera.far = 450
solarSystem.add(earthLightShadow);
solarSystem.add(earthLightShadow.target);

export const solarSystemCamera = new PerspectiveCamera();
solarSystemCamera.position.x = 15;
solarSystemCamera.position.y = 15;
solarSystemCamera.position.z = 15 * 3;
solarSystemCamera.lookAt(new Vector3(0,0,0));