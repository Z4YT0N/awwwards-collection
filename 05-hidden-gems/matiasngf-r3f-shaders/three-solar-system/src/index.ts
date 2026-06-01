import { AxesHelper, CameraHelper, DirectionalLightHelper } from "three";
import { OnAnimationFrame, setup } from "./setup";
import GUI from "lil-gui";
// Objects
import { ambientLight, centerLight } from "./objects/generalLights";
import { earthLightShadow, solarSystem, solarSystemCamera } from "./objects/solar-system";
import { sun } from "./objects/sun";
import { earth, earthCamera, earthOrbit } from "./objects/earth";
import { moon, moonCamera, moonOrbit } from "./objects/moon";
import { createOrbitControls } from "./utils/createOrbitControls";
import { makeAxisGrid } from "./utils/makeAxisGrid";
import { rotateMesh } from "./utils/rotateMesh";

setup({
  onInit: ({ scene, renderer, setCurrentCamera }) => {
    const gui = new GUI();
    const axesHelper = new AxesHelper( 5 );
    gui.add(axesHelper, 'visible').name('Global Axes');
    scene.add( axesHelper );
    scene.add(ambientLight);
    scene.add(solarSystem);

    const shadowHelper = new CameraHelper(earthLightShadow.shadow.camera);
    scene.add(shadowHelper);
    shadowHelper.visible = false;
    gui.add(shadowHelper, 'visible').name('Directional Light Helper');
    
    makeAxisGrid(gui, solarSystem, 'Solar System Orbit', 60);
    makeAxisGrid(gui, earthOrbit, 'Earth Orbit', 10);
    makeAxisGrid(gui, moonOrbit, 'Moon Orbit', 2);

    scene.add(solarSystemCamera)
    const [solarSystemCameraControls, solarSystemCameraControlsUpdate] = createOrbitControls(solarSystemCamera, renderer.domElement);
    const [earthCameraControls, earthCameraControlsUpdate] = createOrbitControls(earthCamera, renderer.domElement);
    const [moonCameraControls, moonCameraControlsUpdate] = createOrbitControls(moonCamera, renderer.domElement);

    const sceneCameras = {
      activeCamera: solarSystemCamera,
      activeCameraName: 'Solar system',
      cameras: {
        'Solar system': solarSystemCamera,
        Earth: earthCamera,
        Moon: moonCamera
      }
    }
    type SceneCameraNames = keyof typeof sceneCameras.cameras
    const cameraNames = Object.keys(sceneCameras.cameras) as SceneCameraNames[];
    const setSceneCamera = (cameraName: SceneCameraNames) => {
      sceneCameras.activeCamera = sceneCameras.cameras[cameraName];
      sceneCameras.activeCameraName = cameraName;
      setCurrentCamera(sceneCameras.activeCamera);
    }

    setSceneCamera('Earth')

    gui.add(sceneCameras, 'activeCameraName', cameraNames)
    .name('Camera')
    .onChange((cameraName: keyof typeof sceneCameras.cameras) => {
      setSceneCamera(cameraName);

      // Todo refactor scene cameras handlers, maybe create an OrbitalCamera class
      if (cameraName === 'Earth') {
        earthCameraControls.enabled = true;
        moonCameraControls.enabled = false;
        solarSystemCameraControls.enabled = false;
        earthCameraControlsUpdate();
      } else if (cameraName === 'Moon') {
        earthCameraControls.enabled = false;
        moonCameraControls.enabled = true;
        solarSystemCameraControls.enabled = false;
        moonCameraControlsUpdate();
      } else if (cameraName === 'Solar system') {
        earthCameraControls.enabled = false;
        moonCameraControls.enabled = false;
        solarSystemCameraControls.enabled = true;
        solarSystemCameraControlsUpdate();
      }
    });

    const onAnimationFrame: OnAnimationFrame = ({ timeStamp }) => {
      earthCameraControlsUpdate();
      moonCameraControlsUpdate();
      solarSystemCameraControlsUpdate();

      rotateMesh(solarSystem, 0.00001);
      rotateMesh(sun, 0.001);
      rotateMesh(earthOrbit, 0.0011);
      rotateMesh(earth, 0.001);
      rotateMesh(moonOrbit, 0.001);
      rotateMesh(moon, 0.001);
    }
    return onAnimationFrame;
  },
})