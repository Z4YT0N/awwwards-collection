import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { debugGui } from "./debugGui";
import { elementToWorldRect, pageToWorldCoords } from "./utils/utils";

const TINT_COLOUR_START = new THREE.Color("#5b1473");
const TINT_COLOUR_END = new THREE.Color("#ffffff");
const PANEL_START_ID = "video-panel-start";
const PANEL_END_ID = "video-panel-end";

export class VideoPanelOld extends THREE.Group {
    mixer = null;
    action = null;
    animPlaybackPercent = 0;
    animClip;
    animDuration;

    // The scroll positions used to calculate t, a percentage used to play the panel animation
    scrollYAnimStart = window.innerHeight * 0.9;
    scrollYAnimEnd = window.innerHeight * 1.3;

    // Positions at t
    worldPosAtAnimStart;    // t = 0
    worldPosAtAnimEnd;      // t = 1

    prevScrollY = 0;
    scrollDelta = 1;    // 1 down, -1 up

    material;
    tintColour = TINT_COLOUR_START.clone();

    panelScene;

    constructor(camera) {
        super();

        this.initDebug();

        this.material = new THREE.MeshBasicMaterial({
            roughness: 0.1,
            metalness: 0,
            map: this.createVideoTexture(),
            side: THREE.FrontSide,
            color: this.tintColour
        });

        this.worldPosAtAnimStart = elementToWorldRect(PANEL_START_ID, camera).position;
        this.worldPosAtAnimEnd = elementToWorldRect(PANEL_END_ID, camera).position;

        // this.scale.setScalar(3);

        new GLTFLoader().load('../assets/panel-anim-bones.glb', (gltf) => {
            this.panelScene = gltf.scene;

            const panelMesh = this.panelScene.children[0].children[0];
            panelMesh.material = this.material;

            this.panelScene.position.copy(this.worldPosAtAnimStart)

            this.add(this.panelScene);

            // Set up the animation mixer
            this.mixer = new THREE.AnimationMixer(this.panelScene);

            this.animClip = gltf.animations[0];
            this.action = this.mixer.clipAction(this.animClip);
            this.action.play();

            this.animDuration = this.animClip.duration;
            this.onScroll();    // trigger scroll in case user refreshes mid scroll
        }, undefined, (error) => {
            console.error(error);
        });

        window.addEventListener("scroll", this.onScroll);
    }

    initDebug() {
        const folder = debugGui.addFolder("VideoPanel");
        folder.add(this, "animPlaybackPercent", 0, 1).onChange(v => this.playAnimation(v));
    }

    playAnimation(percent) {
        if (this.action) {
            const time = Math.min(percent * this.animDuration, this.animDuration);
            this.mixer.setTime(time);
        }
    }

    createVideoTexture() {
        const video = document.createElement('video');
        video.src = 'assets/pexels-2519660-uhd_3840_2160_24fps.mp4';
        video.loop = true;
        video.muted = true;
        video.play();

        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;

        return texture;
    }

    onScroll = (e) => {
        this.animPlaybackPercent = THREE.MathUtils.clamp(THREE.MathUtils.inverseLerp(this.scrollYAnimStart, this.scrollYAnimEnd, window.scrollY), 0, 0.99);

        const pos = new THREE.Vector3();
        pos.lerpVectors(this.worldPosAtAnimStart, this.worldPosAtAnimEnd, this.animPlaybackPercent);
        this.material.color = this.tintColour.lerpColors(TINT_COLOUR_START, TINT_COLOUR_END, this.animPlaybackPercent);

        this.playAnimation(this.animPlaybackPercent);

        this.panelScene.position.copy(pos);

        this.scrollDelta = (window.scrollY - this.prevScrollY);

        this.prevScrollY = window.scrollY;
    }

    update(dt) {
        // this.mixer && this.mixer.update(dt);
        if (this.animPlaybackPercent > 0.3 && this.animPlaybackPercent < 0.99) {
            let target = window.scrollY;
            if (this.scrollDelta >= 1) {
                target = this.scrollYAnimEnd;
            }
            else if (this.scrollDelta <= 1) {
                target = this.scrollYAnimStart;
            }

            const scrollY = THREE.MathUtils.lerp(window.scrollY, target, dt * 3);
            window.scrollTo({ top: scrollY, behavior: "instant" })
        }
    }
}

const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment Shader
const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    void main()	{
        float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
        float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
        gl_FragColor = vec4(vec3(min(x, y)), 1.);
    }
`;
