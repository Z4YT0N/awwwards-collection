import { AxesHelper, BoxGeometry, DirectionalLight } from "three";
import { makeInstance } from "./makeCube";
import { ground } from "./plane";
import { setup } from "./setup";

// cubes
const geometry = new BoxGeometry(1, 1, 1);
const cubes = [
  makeInstance(geometry, {color: 0x44aa88},  0),
  makeInstance(geometry, {color: 0x8844aa}, -2),
  makeInstance(geometry, {color: 0xaa8844},  2),
];

// light
const color = 0xFFFFFF;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);

setup({
  withOrbitControls: true,
  onInit: ({ scene, camera }) => {
    const axesHelper = new AxesHelper( 5 );
    scene.add( axesHelper );
    camera.position.set(5,5,10);
    scene.add(light);
    cubes.forEach(cube => scene.add(cube));
    scene.add(ground);
  },
  onAnimationFrame: ({ timeStamp }) => {
    timeStamp *= 0.001;
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = timeStamp * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
  }
})