import { Mesh, PerspectiveCamera, Scene, TextureLoader, WebGLCubeRenderTarget } from "three";
import { Earth } from "../../objects/earth";
import { SpaceAmbientLight } from "../../objects/space-ambient-light";
import { SpaceShipsScene } from "./space-ships";

export class BackgroundScene extends Scene {
  activeCamera: PerspectiveCamera;
  earth: Mesh;
  parentScene: SpaceShipsScene;

  constructor(parentScene: SpaceShipsScene) {
    super();
    this.parentScene = parentScene;
    this.activeCamera = new PerspectiveCamera();
    this.activeCamera.far = 100000;
    this.add(this.activeCamera);
    this.earth = Earth();
    this.add(this.earth);
    this.earth.position.x = -50;
    this.earth.position.y = -30;
    this.earth.position.z = -150;
    this.earth.rotation.y = 0;

    this.add(this.parentScene.sunLight.clone());
    this.add(SpaceAmbientLight());

    const loader = new TextureLoader();

    const texture = loader.load('/textures/2k_stars_milky_way.jpeg', () => {
      const rt = new WebGLCubeRenderTarget(texture.image.height);
      const engine = this.parentScene.getEngine();
      rt.fromEquirectangularTexture(engine.renderer, texture);
      this.background = rt.texture;
    });
  }

  onResizeCamera = () => {
    const engine = this.parentScene.getEngine();
    this.activeCamera.aspect = engine.width / engine.height;
    this.activeCamera.updateProjectionMatrix();
  }

  onUpdate() {
    this.parentScene.activeCamera.getWorldQuaternion(this.activeCamera.quaternion);
    this.earth.rotation.y += 0.0001;
  }

}