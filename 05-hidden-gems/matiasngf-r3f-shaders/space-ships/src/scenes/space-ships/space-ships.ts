import { CubeTextureLoader, DirectionalLight, Mesh, PerspectiveCamera, Scene, TextureLoader, Vector3, WebGLCubeRenderTarget, WebGLRenderTarget } from 'three'
import { Engine, EngineScene } from '../../engine'
import { Earth } from '../../objects/earth';
import { SpaceAmbientLight } from '../../objects/space-ambient-light';
import { SpaceShip } from '../../objects/space-ship';
import { SunLight } from '../../objects/sun-light';
import { BackgroundScene } from './background-scene';

export class SpaceShipsScene extends EngineScene {
  // earth: Mesh;
  sunLight: DirectionalLight;
  renderTargetBackground?: WebGLRenderTarget;
  backgroundScene?: BackgroundScene;
  playerShip?: SpaceShip;

  private shipRotation = 0.01

  constructor() {
    
    super();
    // add objects
    this.add(SpaceAmbientLight());
    const sunLight = SunLight();
    this.sunLight = sunLight;
    this.sunLight.position.z = -50
    this.sunLight.position.x = 200
    this.sunLight.position.y = 30
    this.add(this.sunLight);
    this.add(this.sunLight.target);
  }

  private addBackgroundScene = () => {
    if(!this.engine) {
      throw new Error("Engine not set");
    }
    const renderTargetBackground = new WebGLRenderTarget(this.engine.width, this.engine.height);
    this.renderTargetBackground = renderTargetBackground;
    this.backgroundScene = new BackgroundScene(this);
  }

  public onStart = () => {
    if(!this.engine) {
      throw new Error("Engine not set");
    }
    this.spawnPlayerShip();
    // this.spawnPlayerCamera();
    this.addBackgroundScene();
  }

  private spawnPlayerShip = () => {
    this.playerShip = new SpaceShip();
    this.add(this.playerShip);
    this.setActiveCamera(this.playerShip.camera);
  }

  private spawnPlayerCamera() {
    const camera = new PerspectiveCamera();
    camera.lookAt(new Vector3(0, 4, -5));
    camera.far = 7000
    this.setActiveCamera(camera);
  }

  public onWindowResize = (width: number, height: number) => {
    this.backgroundScene?.onResizeCamera();
  };

  public onUpdate = (time: number): void => {
    if(!this.started || !this.engine || this.ended) {
      return;
    }

    if(this.renderTargetBackground && this.backgroundScene) {
      this.backgroundScene.onUpdate();
      this.engine.renderer.setRenderTarget(this.renderTargetBackground);
      this.engine.renderer.render(this.backgroundScene, this.backgroundScene.activeCamera);
      this.background = this.renderTargetBackground.texture;
      this.engine.renderer.setRenderTarget(null);
    }

    // this.earth.rotation.y += 0.001;

    if(this.playerShip) {
      if(this.isCodePressed('ArrowUp')) {
        this.playerShip.rotateX(-this.shipRotation);
      }
      if(this.isCodePressed('ArrowDown')) {
        this.playerShip.rotateX(this.shipRotation);
      }
      if(this.isCodePressed('ArrowLeft')) {
        this.playerShip.rotateZ(this.shipRotation * 2);
      }
      if(this.isCodePressed('ArrowRight')) {
        this.playerShip.rotateZ(-this.shipRotation * 2);
      }
      if(this.isCodePressed('a')) {
        this.playerShip.rotateY(this.shipRotation);
      }
      if(this.isCodePressed('d')) {
        this.playerShip.rotateY(-this.shipRotation);
      }
      if(this.isCodePressed('w')) {
        this.playerShip.translateZ(-2);
      } else if(this.isCodePressed('s')) {
        this.playerShip.translateZ(-0.5);
      } else {
        this.playerShip.translateZ(-1);
      }
    }    

  }

}