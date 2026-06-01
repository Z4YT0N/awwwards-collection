import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export type SetCurrentCamera = (camera: PerspectiveCamera) => void;

export type OnAnimationFrame = (options: {timeStamp: number}) => void;
export type OnInit = (options: {
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  setCurrentCamera: SetCurrentCamera
}) => OnAnimationFrame | void;

export interface Options {
  onInit?: OnInit;
}

export const setup = ({
  onInit,
}: Options): void => {
    // scene
    const scene = new Scene();
    
    // renderer
    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    
    // camera
    const camera = new PerspectiveCamera();
    camera.position.set(0, 0, 10);
    camera.lookAt(new Vector3(0, 0, 0));

    let currentCamera: PerspectiveCamera = camera;

    // effects
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, currentCamera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new Vector2(10, 10), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);
    bloomPass.renderToScreen = false;
  
    const setCurrentCamera: SetCurrentCamera = (camera) => {
      currentCamera = camera;
      renderPass.camera = currentCamera;
      if(windowResizeHanlder) {
        windowResizeHanlder();
      }
    }
    
    // user defined init
    let onAnimationFrame: OnAnimationFrame | null = null;
    if (onInit) {
      const returnedInit = onInit({scene, camera, renderer, setCurrentCamera});
      if(returnedInit) {
        onAnimationFrame = returnedInit;
      }
    };
    
    // render loop
    const onAnimationFrameHandler = (timeStamp: number) => {
      onAnimationFrame && onAnimationFrame({timeStamp});
      // renderer.render(scene, currentCamera);
      composer.render();
      window.requestAnimationFrame(onAnimationFrameHandler);
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
    
    // resize
    const windowResizeHanlder = () => { 
      const { innerHeight, innerWidth } = window;
      renderer.setSize(innerWidth, innerHeight);
      composer.setSize(innerWidth, innerHeight);
      currentCamera.aspect = innerWidth / innerHeight;
      currentCamera.updateProjectionMatrix();
    };
    windowResizeHanlder();
    window.addEventListener('resize', windowResizeHanlder);
    
    // dom
    document.body.style.margin = '0';
    document.body.appendChild( renderer.domElement );
}