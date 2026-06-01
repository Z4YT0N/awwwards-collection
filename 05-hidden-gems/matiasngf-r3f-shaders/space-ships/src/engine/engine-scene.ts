import { Camera, PerspectiveCamera, Scene, Vector3 } from "three";
import { Engine } from "./engine";

export abstract class EngineScene extends Scene {
  
  activeCamera: Camera;
  engine?: Engine;
  onStart?: () => void;
  onUpdate?: (time: number) => void;
  onWindowResize?: (width: number, height: number) => void;

  public started: boolean = false;
  public ended: boolean = false;

  public pressedKeys: {[key: string]: boolean} = {};

  constructor() {
    super();
    const InitialCamera = new PerspectiveCamera();
    InitialCamera.position.x = 1
    InitialCamera.lookAt(new Vector3(0,0,0));
    this.activeCamera = InitialCamera;
  }

  setActiveCamera = (camera: Camera) => {
    this.activeCamera = camera;
    if(this.engine && !this.ended) {
      this.engine.setCamera(camera);
    }
  }

  public getEngine = () => {
    if(!this.engine) {
      throw new Error("Engine not set");
    }
    return this.engine as Engine;
  }

  public _startScene = (engine: Engine) => {
    this.started = true;
    this.engine = engine;
    document.onkeydown = (e) => {
      const code = e.key;
      this.pressedKeys[code] = true;
    }
    document.onkeyup = (e) => {
      const code = e.key;
      delete this.pressedKeys[code];
    }
    if(typeof this.onStart === 'function') {
      this.onStart();
    }
  }

  public isCodePressed = (code: string) => {
    return this.pressedKeys[code];
  }

  public _endScene = () => {
    this.ended = true;
  }

  public _onUpdate = (time: number) => {
    if( typeof this.onUpdate === 'function') {
      this.onUpdate(time);
    }
  }

  public _onWindowResize = () => {
    if( typeof this.onWindowResize === 'function') {
      this.onWindowResize(this.getEngine().width, this.getEngine().height);
    }

  }
}