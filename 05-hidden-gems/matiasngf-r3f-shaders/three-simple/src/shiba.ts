import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Shiba extends Group {
  constructor() {
    const loader = new GLTFLoader();
    super();
    this.name = 'shiba';
    loader.load('/models/shiba/shiba.gltf', (gltf) => {
      console.log(gltf);
      
      this.add(gltf.scene);
    })
  }
}