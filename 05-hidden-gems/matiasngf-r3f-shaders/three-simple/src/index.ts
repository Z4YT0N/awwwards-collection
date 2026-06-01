import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { cube } from './cube';
import { line } from './lines';
import { Shiba } from './shiba';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ground } from './ground';

// scene
const scene = new Scene();

const shiba = new Shiba();
scene.add( shiba );
shiba.position.set(0, 1.7, 0.35);
scene.add( cube );
cube.position.set(0, 0.35, 0);
scene.add( line );
line.position.set(0, 1.5, 0);
scene.add( ground );

// renderer
const renderer = new WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// camera
const camera = new PerspectiveCamera();
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));
controls.update();

// render loop
const onAnimationFrameHandler = (timeStamp: number) => {
  line.rotation.x += 0.005;
  line.rotation.y += 0.01;
  line.rotation.z += 0.005;
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