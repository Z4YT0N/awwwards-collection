import { DirectionalLight, Mesh, PerspectiveCamera, Scene, Vector3 } from 'three'
import { Engine, EngineScene } from '../../engine'
import { Earth } from '../../objects/earth';
import { SpaceAmbientLight } from '../../objects/space-ambient-light';
import { SunLight } from '../../objects/sun-light';

export class MenuScene extends EngineScene {
  earth: Mesh;
  sunLight: DirectionalLight;

  constructor() {
    super();
    
    // add objects
    this.add(SpaceAmbientLight());
    this.earth = Earth();
    this.add(this.earth);
    const sunLight = SunLight();
    this.sunLight = sunLight;
    this.sunLight.position.z = 10
    this.sunLight.position.x = 10
    this.sunLight.position.y = 3
    this.add(this.sunLight);
    this.add(this.sunLight.target);
  }

  onStart = () => {
    const InitialCamera = new PerspectiveCamera();
    InitialCamera.position.x = 1500
    InitialCamera.far = 7000
    InitialCamera.lookAt(new Vector3(0,0,0));
    this.setActiveCamera(InitialCamera);
  }

  public onUpdate = (time: number): void => {
    this.earth.rotation.y += 0.001;
  }

}