import { AxesHelper, Camera, Group, PerspectiveCamera, PointLight, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class SpaceShip extends Group {
  camera: PerspectiveCamera;
  constructor() {
    const loader = new GLTFLoader();
    super();
    this.name = 'space-ship';
    loader.load('/models/space-ship/scene.gltf', (gltf) => {
      this.add(gltf.scene);
    });
    const axesHelper = new AxesHelper(100);
    // this.add(axesHelper);

    const externalCamera = new PerspectiveCamera();
    externalCamera.position.z = 15
    externalCamera.position.y = 5
    externalCamera.lookAt(new Vector3(0, 4, -5));
    externalCamera.far = 7000
    this.add(externalCamera);
    this.camera = externalCamera;

    const spaceLight = new PointLight(0xffffff, 0.2);
    this.camera.add(spaceLight);
    spaceLight.position.set(0, 0, 0);
  }

}