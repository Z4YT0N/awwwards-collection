import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

let renderer;
let camera;
let scene;
let stats;
let torusMaterial;

function init() {
    window.addEventListener('resize', onWindowResized);
    window.addEventListener('scroll', onScroll);

    const canvas = document.getElementById("canvas");

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    stats = new Stats();
    document.body.appendChild(stats.dom);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 75;

    scene = new THREE.Scene();

    new RGBELoader().setPath('assets/').load('quarry_01_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

    torusMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0
    });

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(8, 3, 128, 16), torusMaterial);
    torus.receiveShadow = true;
    torus.castShadow = true;
    scene.add(torus);


    const loader = new FontLoader();
    loader.load('assets/optimer_regular.typeface.json', function (response) {

        const font = response;

        const textGeo = new TextGeometry("text", {
            font: font,
            size: 20,
            depth: 4,
            curveSegments: 16,

            bevelThickness: 1,
            bevelSize: 2,
            bevelEnabled: true
        });

        const textMesh = new THREE.Mesh( textGeo, torusMaterial );
        scene.add(textMesh);

        textGeo.computeBoundingBox();
    });
}

function animate() {
    const card = document.getElementById("card");
    if (card) {
        card.style.transform = `skew(${targetVelocity * 100}deg)`;
    }
    targetVelocity = Math.max(0, targetVelocity - 0.005);

    renderer.render(scene, camera);
    stats.update();
}

let prevTimestamp = 0;
let prevScrollTop = 0;
let targetVelocity = 0;

function onScroll(e) {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    const currentTimestamp = e.timeStamp;

    const velocity = Math.abs(currentScrollTop - prevScrollTop) / (currentTimestamp - prevTimestamp);

    targetVelocity = THREE.MathUtils.inverseLerp(0, 10, velocity);

    prevScrollTop = currentScrollTop;
    prevTimestamp = currentTimestamp;
}

function onWindowResized() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

init();