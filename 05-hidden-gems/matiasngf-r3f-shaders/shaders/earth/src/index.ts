import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { guiData, sunRotationGui } from './gui';
import { addSky } from './materials/sky';
import { Earth } from './objects/earth';

// scene
const scene = new Scene();

scene.add(Earth);

// renderer
const renderer = new WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
renderer.shadowMap.enabled = true;
addSky(renderer, scene);

// camera
const camera = new PerspectiveCamera(30);
const distance = 2;
camera.position.set(distance * 5, distance * 0.5, distance * 3);
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// render loop
const onAnimationFrameHandler = (timeStamp: number) => {
  // update the time uniform of the shader
  // console.log(guiData.autoSunRotation);
  
  if(guiData.autoSunRotation) {
    let newRotation = guiData.sunRotation + 0.1;
    if(newRotation > 360) {
      newRotation -= 360
    }
    sunRotationGui.setValue(newRotation)
    
    // handleSunRotationChange(newRotation)
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = '0';
document.body.appendChild( renderer.domElement );