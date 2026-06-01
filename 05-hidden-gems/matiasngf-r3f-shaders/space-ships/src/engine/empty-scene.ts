import { PerspectiveCamera } from "three";
import { Engine } from "./engine";
import { EngineScene } from "./engine-scene";

export class EmptyScene extends EngineScene {
  constructor(engine: Engine) {
    const defaultCamera = new PerspectiveCamera()
    super();
  }
}