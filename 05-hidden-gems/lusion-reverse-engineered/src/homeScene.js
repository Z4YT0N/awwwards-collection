import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import hdr from "../assets/hdri/quarry_01_1k.hdr";
import { AnimatedTube } from "./animatedTube";
import { debugGui } from "./debugGui";
import LoadingGroup from './loadingGroup';
import PhysicsSandbox from "./physicsSandbox";
import ProjectTiles from "./projectTiles";
import { updateCameraIntrisics } from "./utils/utils";
import VideoPanelShader from "./videoPanelShader";

class HomeScene {
    frustumSize = 10;    // value of 1 results in 1 world space unit equating to height of viewport
    clock = new THREE.Clock();

    constructor() {
        this.initThree();

        setTimeout(() => {
            this.initScene();
        }, 1);

        window.addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onWindowResized);

        if (import.meta.env.DEV) {
            this.initDebug();
            this.stats = new Stats();
            document.body.appendChild(this.stats.dom);
        }
    }

    initThree = () => {
        const canvas = document.getElementById("canvas");

        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas, stencil: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.animate);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.camera = new THREE.OrthographicCamera();
        this.camera.near = 0;
        this.camera.far = 1000;
        this.camera.position.z = 10;
        updateCameraIntrisics(this.camera, this.frustumSize);

        this.onScroll();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(window.getComputedStyle(document.body).backgroundColor);

        new RGBELoader().load(hdr, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.environment = texture;
        });
    }

    initScene = () => {
        this.loadingGroup = new LoadingGroup(this.camera, () => {
            this.scene.remove(this.loadingGroup);
            this.loadingGroup = undefined;
        });
        this.scene.add(this.loadingGroup);

        this.physicsSandbox = new PhysicsSandbox(this.camera);
        this.scene.add(this.physicsSandbox);

        this.animatedTube = new AnimatedTube(this.camera);
        this.scene.add(this.animatedTube);

        this.videoPanel = new VideoPanelShader(this.camera);
        this.scene.add(this.videoPanel);

        this.projectTiles = new ProjectTiles(this);
        this.scene.add(this.projectTiles);
    }

    onScroll = () => {
        // Move the threejs camera"s y position to make it appear to be scrolling with the page.
        this.camera.position.y = -window.scrollY / window.innerHeight * this.frustumSize;
    }

    setCameraFrustumSize = (frustumSize) => {
        this.frustumSize = frustumSize;
        updateCameraIntrisics(this.camera, this.frustumSize);
    }

    onWindowResized = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        updateCameraIntrisics(this.camera, this.frustumSize);

        this.physicsSandbox && this.physicsSandbox.resize();
        this.animatedTube && this.animatedTube.resize();
        this.videoPanel && this.videoPanel.resize();
        this.projectTiles && this.projectTiles.resize();
    }

    animate = () => {
        const dt = this.clock.getDelta();

        this.loadingGroup && this.loadingGroup.update(dt);
        this.physicsSandbox && this.physicsSandbox.update(dt);
        this.animatedTube && this.animatedTube.update(dt);
        this.videoPanel && this.videoPanel.update(dt);
        this.projectTiles && this.projectTiles.update(dt, this.renderer);

        this.renderer.render(this.scene, this.camera);
        this.stats && this.stats.update();
    }

    initDebug = () => {
        const folder = debugGui.addFolder("Scene");
        folder.add(this, "frustumSize", 0, 100).onChange(this.setCameraFrustumSize);
    }
}

new HomeScene();