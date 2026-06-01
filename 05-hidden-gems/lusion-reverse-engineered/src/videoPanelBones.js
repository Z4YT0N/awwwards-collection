import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { debugGui } from "./debugGui";
import { createBevelledPlane, elementToLocalRectPoints, elementToWorldRect } from "./utils/utils";

const TINT_COLOUR_START = new THREE.Color("#94e0e6");
const TINT_COLOUR_END = new THREE.Color("#ffffff");
const PANEL_START_ID = "video-panel-start";
const PANEL_END_ID = "video-panel-end";
const AUTOSCROLL_ENABLED = true;

export default class VideoPanelBones extends THREE.Group {
    animPlaybackPercent = 0;

    // The scroll positions used to calculate t, a percentage used to play the panel animation
    scrollYAnimStart;
    scrollYAnimEnd;

    localRectStart;
    localRectEnd;

    prevScrollY = 0;
    scrollDelta = 1;    // 1 down, -1 up

    material;

    rectStartScene;
    rectEndMesh;

    boneTL;
    boneTR;
    boneBL;
    boneBR;

    curveTL;
    curveTR;
    curveBL;
    curveBR;

    debugCurveGroup = new THREE.Group();
    debugCurvesEnabled = true;

    constructor(camera) {
        super();

        // when element PANEL_START_ID appears in middle of screen
        const panelStartElement = document.getElementById(PANEL_START_ID);
        const panelEndElement = document.getElementById(PANEL_END_ID);
        this.scrollYAnimStart = panelStartElement.offsetTop - window.innerHeight * 0.5 + panelStartElement.offsetHeight * 0.5;
        this.scrollYAnimEnd = panelEndElement.offsetTop - window.innerHeight * 0.5 + panelEndElement.offsetHeight * 0.5;

        this.material = new THREE.MeshBasicMaterial({
            roughness: 0.1,
            metalness: 0,
            map: this.createVideoTexture(),
            side: THREE.FrontSide,
            color: TINT_COLOUR_START
        });

        this.initPanels(camera);
        this.initDebug();

        window.addEventListener("scroll", this.onScroll);
    }

    initPanels = async (camera) => {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync('../assets/panel-anim-bones-04.glb');

        this.rectStartScene = gltf.scene;

        const panelMesh = this.rectStartScene.children[0].children[0];
        panelMesh.material = this.material;

        this.rectStartScene.children[0].children.forEach(child => {
            if (child.type === "Bone") {
                if (child.name === "BoneTR") {
                    this.boneTR = child;
                }
                else if (child.name === "BoneTL") {
                    this.boneTL = child;
                }
                else if (child.name === "BoneBR") {
                    this.boneBR = child;
                }
                else if (child.name === "BoneBL") {
                    this.boneBL = child;
                }
            }
        });

        console.assert(this.boneBL);
        console.assert(this.boneBR);
        console.assert(this.boneTL);
        console.assert(this.boneTR);

        const parent = this.boneBL.parent;

        this.localRectStart = elementToLocalRectPoints(PANEL_START_ID, parent, camera);
        this.localRectEnd = elementToLocalRectPoints(PANEL_END_ID, parent, camera);

        this.curveTL = new THREE.CubicBezierCurve3(this.localRectStart.tl,
            this.localRectStart.tl.clone().add(new THREE.Vector3(1, 0, 0)),
            this.localRectEnd.tl.clone().add(new THREE.Vector3(-1, 0, 0)),
            this.localRectEnd.tl.clone()
        );

        this.curveTR = new THREE.CubicBezierCurve3(this.localRectStart.tr,
            this.localRectStart.tr.clone().add(new THREE.Vector3(2, 2, 0)),
            this.localRectEnd.tr.clone().add(new THREE.Vector3(0, 0, 0)),
            this.localRectEnd.tr.clone()
        );

        this.curveBL = new THREE.CubicBezierCurve3(this.localRectStart.bl,
            this.localRectStart.bl.clone().add(new THREE.Vector3(1, -8, 0)),
            this.localRectEnd.bl.clone().add(new THREE.Vector3(0, 0, 0)),
            this.localRectEnd.bl.clone()
        );

        this.curveBR = new THREE.CubicBezierCurve3(this.localRectStart.br,
            this.localRectStart.br.clone().add(new THREE.Vector3(10, 2, 0)),
            this.localRectEnd.br.clone().add(new THREE.Vector3(0, 0, 0)),
            this.localRectEnd.br.clone()
        );

        this.add(this.rectStartScene);

        const panelEnd = elementToWorldRect(PANEL_END_ID, camera);
        const geometry = createBevelledPlane(panelEnd.width, panelEnd.height, 0.3);
        this.rectEndMesh = new THREE.Mesh(geometry, this.material);
        this.rectEndMesh.position.copy(panelEnd.position);

        this.setDebugCurvedEnabled(this.debugCurvesEnabled);
        this.onScroll();    // trigger scroll in case user refreshes mid scroll
    }

    initDebug = () => {
        const folder = debugGui.addFolder("VideoPanel");
        folder.add(this, "animPlaybackPercent", 0, 1).onChange(v => this.playAnimation(v));
        folder.add(this, "debugCurvesEnabled").onChange(v => {
            this.setDebugCurvedEnabled(v);
        });
    }

    playAnimation() {
        if (!this.rectStartScene || !this.rectEndMesh) {
            return;
        }
        if (this.animPlaybackPercent === 1) {
            this.remove(this.rectStartScene);
            this.add(this.rectEndMesh);
        }
        else {
            this.remove(this.rectEndMesh);
            this.add(this.rectStartScene);

            const tl = this.curveTL.getPointAt(this.animPlaybackPercent);
            this.boneTL.position.copy(tl);

            const tr = this.curveTR.getPointAt(this.animPlaybackPercent);
            this.boneTR.position.copy(tr);

            const bl = this.curveBL.getPointAt(this.animPlaybackPercent);
            this.boneBL.position.copy(bl);

            const br = this.curveBR.getPointAt(this.animPlaybackPercent);
            this.boneBR.position.copy(br);
        }

        this.material.color.lerpColors(TINT_COLOUR_START, TINT_COLOUR_END, this.animPlaybackPercent);
    }

    createVideoTexture() {
        const video = document.createElement('video');
        video.src = 'assets/pexels-2519660-uhd_3840_2160_24fps.mp4';
        video.loop = true;
        video.muted = true;
        video.play();

        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;

        return texture;
    }

    setDebugCurvedEnabled = (enabled) => {
        const curves = [this.curveTR, this.curveTL, this.curveBL, this.curveBR];

        if (enabled) {
            if (this.debugCurveGroup.children.length === 0) {
                curves.forEach(curve => {
                    const points = curve.getPoints(50);
                    const pointsWorld = points.map(p => p.clone().applyMatrix4(this.boneBL.parent.matrixWorld));

                    const geometry = new THREE.BufferGeometry().setFromPoints(pointsWorld);
                    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
                    const curveObject = new THREE.Line(geometry, material);
                    this.debugCurveGroup.add(curveObject)
                });
            }
            this.add(this.debugCurveGroup);
        }
        else {
            this.remove(this.debugCurveGroup);
        }
    }

    onScroll = (e) => {
        this.animPlaybackPercent = THREE.MathUtils.clamp(THREE.MathUtils.inverseLerp(this.scrollYAnimStart, this.scrollYAnimEnd, window.scrollY), 0, 1);

        this.playAnimation()

        this.scrollDelta = (window.scrollY - this.prevScrollY);
        this.prevScrollY = window.scrollY;
    }

    update(dt) {
        if (!AUTOSCROLL_ENABLED) {
            return;
        }
        if (this.animPlaybackPercent > 0.1 && this.animPlaybackPercent < 1) {
            let target = window.scrollY;
            if (this.scrollDelta >= 1) {
                target = this.scrollYAnimEnd;
            }
            else if (this.scrollDelta <= 1) {
                target = this.scrollYAnimStart;
            }

            const scrollY = THREE.MathUtils.lerp(window.scrollY, target, dt * 3);
            window.scrollTo({ top: scrollY, behavior: "instant" });
        }
    }
}