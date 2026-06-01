import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Options {
  onInit?: (options: {scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer}) => void;
  withOrbitControls?: boolean;
  onAnimationFrame?: (options: {scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, timeStamp: number}) => void;
}

export const setup = ({
  onInit,
  withOrbitControls,
  onAnimationFrame
}: Options): void => {
    // scene
    const scene = new Scene();
    
    // renderer
    const renderer = new WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x7ec0ee, 1);
    
    // camera
    const camera = new PerspectiveCamera();
    camera.lookAt(new Vector3(0,0,0));
    
    // user defined init
    if (onInit) onInit({scene, camera, renderer});
    if(withOrbitControls) {
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.update();
    }
    
    // render loop
    const onAnimationFrameHandler = (timeStamp: number) => {
      onAnimationFrame && onAnimationFrame({scene, camera, renderer, timeStamp});
      renderer.render(scene, camera);
      window.requestAnimationFrame(onAnimationFrameHandler);
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
    
    // resize
    const windowResizeHanlder = () => { 
      const { innerHeight, innerWidth } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    windowResizeHanlder();
    window.addEventListener('resize', windowResizeHanlder);
    
    // dom
    document.body.style.margin = '0';
    document.body.appendChild( renderer.domElement );
}