import { Camera, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { EmptyScene } from "./empty-scene";
import { EngineScene } from "./engine-scene";

export type CameraType = Camera | PerspectiveCamera | OrthographicCamera

export interface EngineOptions {
  document: Document;
}

export class Engine {
  public timeStamp: number = 0;
  public activeScene: EngineScene;
  public activeCamera: CameraType;
  public document: Document;
  public renderer: WebGLRenderer;
  public width: number = 1;
  public height: number = 1;

  constructor(options: EngineOptions) {
    this.activeScene = new EmptyScene(this);
    this.activeCamera = this.activeScene.activeCamera;
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.document = options.document;
  }

  private startScene = (scene: EngineScene) => {
    this.activeScene._endScene();
    scene._startScene(this);
    this.activeScene = scene;
    this.setCamera(scene.activeCamera);
  }

  public setCamera = (camera: Camera) => {
    this.activeCamera = camera;
    this.onWindowResize();
  }

  public setScene = (scene: EngineScene) => {
    this.startScene(scene);
  }

  public start = () => {
    if(this.timeStamp === 0) {
      this.render(0);
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
    } else {
      console.warn("Renderer already started");
    }
  }

  private onWindowResize = () => {
    const { innerHeight, innerWidth } = window;
    this.width = innerWidth;
    this.height = innerHeight;
    this.renderer.setSize(innerWidth, innerHeight);
    // this.composer.setSize(innerWidth, innerHeight);
    if(this.activeCamera instanceof PerspectiveCamera) {
      this.activeCamera.aspect = innerWidth / innerHeight;
      this.activeCamera.updateProjectionMatrix();
    }
    if(typeof this.activeScene._onWindowResize === 'function') {
      this.activeScene._onWindowResize();
    }
  }

  private render = (timeStamp: number) => {
    this.timeStamp = timeStamp;
    if(this.activeScene.onUpdate) {
      this.activeScene.onUpdate(timeStamp);
    }
    this.renderer.render(this.activeScene, this.activeCamera);
    window.requestAnimationFrame(this.render);
  }
}
