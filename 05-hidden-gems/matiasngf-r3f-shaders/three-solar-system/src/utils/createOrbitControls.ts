import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const createOrbitControls = (camera: PerspectiveCamera, domElement: HTMLElement): [OrbitControls, () => void] => {
  const fakeCamera = camera.clone();
  const cameraControls = new OrbitControls(fakeCamera, domElement);
  const update = () => {
    cameraControls.update();
    camera.position.copy(fakeCamera.position);
    camera.quaternion.copy(fakeCamera.quaternion);
  }
  cameraControls.enableDamping = true;
  cameraControls.enablePan = false;
  cameraControls.dampingFactor = 0.25;
  update();
  return [cameraControls, update];
}