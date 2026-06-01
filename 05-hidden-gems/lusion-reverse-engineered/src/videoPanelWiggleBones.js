import * as THREE from 'three';
import { MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { WiggleBone } from "wiggle";
import { WiggleRigHelper } from "wiggle/helper";
import { debugGui } from "./debugGui";
import { createVideoTexture, elementToLocalRectPoints } from "./utils/utils";

const SPRING_STIFFNESS = 4000;
const SPRING_DAMPING = 30;
const PANEL_START_ID = "video-panel-start";
const PANEL_END_ID = "video-panel-end";

export default class VideoPanelWiggleBones extends THREE.Group {
  wiggleBones = [];
  animationPercent = 0;

  constructor(camera) {
    super();

    this.init(camera);
    this.initDebug();
  }

  init = async (camera) => {
    const material = new MeshStandardMaterial({ map: createVideoTexture("assets/pexels-2519660-uhd_3840_2160_24fps.mp4") });

    const gltf = await new GLTFLoader().loadAsync("../assets/panel-anim-wiggle-bones.glb");
    const mesh = gltf.scene.getObjectByName("Plane");
    const helper = new WiggleRigHelper({ skeleton: mesh.skeleton });

    mesh.material = material;

    this.add(gltf.scene);
    this.add(helper);

    this.rootL = gltf.scene.getObjectByName("RootL");
    this.rootR = gltf.scene.getObjectByName("RootR");

    for (let bone of mesh.skeleton.bones) {
      if (bone.parent.isBone) {
        this.wiggleBones.push(new WiggleBone(bone, { stiffness: SPRING_STIFFNESS, damping: SPRING_DAMPING }));
      }
    }

    const leftBones = []; 444
    this.getChildBones(this.rootL, leftBones);

    const localRectStart = elementToLocalRectPoints(PANEL_START_ID, this.rootL.parent, camera);
    const localRectEnd = elementToLocalRectPoints(PANEL_END_ID, this.rootL.parent, camera);

    this.curveL = new THREE.CubicBezierCurve3(
      localRectStart.tl,
      localRectStart.tl.clone().add(new THREE.Vector3(1, 0, 0)),
      localRectEnd.tl.clone().add(new THREE.Vector3(-1, 0, 0)),
      localRectEnd.tl.clone()
    );

    this.curveR = new THREE.CubicBezierCurve3(
      localRectStart.tr,
      localRectStart.tr.clone().add(new THREE.Vector3(1, 0, 0)),
      localRectEnd.tr.clone().add(new THREE.Vector3(-1, 0, 0)),
      localRectEnd.tr.clone()
    );
  }

  getChildBones(parent, bonesArray) {
    if (parent.children?.length) {
      bonesArray.push(parent.children[0]);
      this.getChildBones(parent.children[0], bonesArray);
    }
  }

  initDebug = () => {
    const folder = debugGui.addFolder("Wiggle Bones");
    folder.add(this, "animationPercent", 0, 1)
  }

  update = (dt) => {
    if (this.curveL && this.curveR) {
      this.curveL.getPointAt(this.animationPercent, this.rootL.position);
      this.curveR.getPointAt(this.animationPercent, this.rootR.position);
    }
    this.wiggleBones.forEach((wb) => wb.update());
  }
}