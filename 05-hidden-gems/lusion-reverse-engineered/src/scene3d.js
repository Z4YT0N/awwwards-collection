import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { AnimatedTube } from './animatedTube';
import { debugGui } from './debugGui';
import PhysicsSandbox from './physicsSandbox';
import { VideoPanel } from './videoPanel';

const SCROLL_SCALE = 0.0285;

let renderer;
let stats;
let camera;
let scene;
let videoPanel;
let controls;
let physicsSandbox;

const clock = new THREE.Clock();

function init() {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onWindowResized);

    const canvas = document.getElementById("canvas");

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas, stencil: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    const frustum = frustumFromWindowWidth();
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(frustum * aspect / - 2, frustum * aspect / 2, frustum / 2, frustum / - 2, 0, 100);
    camera.position.z = 10;
    // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    // camera.position.z = 15;

    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);

    new RGBELoader().setPath('assets/').load('quarry_01_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.backgroundIntensity = 0;
    });

    const material = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0,
        map: createVideoTexture(),
    });

    // videoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.9, 16, 16), material);
    // scene.add(videoMesh);

    const light = new THREE.DirectionalLight(0xffffff, 0.1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    videoPanel = new VideoPanel(camera);
    scene.add(videoPanel);

    // const animatedLine = new AnimatedLine();
    // animatedLine.position.y = -20;
    // scene.add(animatedLine);

    const animatedTube = new AnimatedTube(camera);
    scene.add(animatedTube);

    physicsSandbox = new PhysicsSandbox(camera);
    scene.add(physicsSandbox);

    const debug = {
        cameraControls: false,
    };
    const folder = debugGui.addFolder("Scene");
    folder.add(debug, 'cameraControls').onChange(v => {
        if (v) {
            controls = new OrbitControls(camera, canvas);
        }
        else {
            controls = undefined;
        }
    })
}

function createVideoTexture() {
    const video = document.createElement('video');
    video.src = 'assets/pexels-milky-way-glowing-at-night-857136.mp4';
    video.loop = true;
    video.muted = true;
    video.play();

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

function frustumFromWindowWidth() {
    // Pick an arbitrary width and frustum. Every other window width will be based off this
    const calibrationWidth = 1280;
    const calibrationFrustum = 15;

    const scale = calibrationWidth / window.innerWidth;
    return calibrationFrustum * scale;
}

function onWindowResized() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    const frustum = frustumFromWindowWidth();
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = - frustum * aspect / 2;
    camera.right = frustum * aspect / 2;
    camera.top = frustum / 2;
    camera.bottom = - frustum / 2;
    camera.updateProjectionMatrix();

    console.log("New frustum: ", frustum);
}

function onScroll() {
    camera.position.y = -window.scrollY * SCROLL_SCALE;
}

function animate() {
    const dt = clock.getDelta();

    renderer.render(scene, camera);
    stats.update();

    videoPanel && videoPanel.update(dt);
    controls && controls.update();
    physicsSandbox && physicsSandbox.update(dt);
}

init();