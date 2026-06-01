import * as THREE from 'three';

import {
    Bone,
    CylinderGeometry,
    DoubleSide,
    Float32BufferAttribute,
    MeshPhongMaterial,
    Skeleton,
    SkeletonHelper,
    SkinnedMesh,
    Uint16BufferAttribute,
    Vector3
} from 'three';

import { CCDIKHelper, CCDIKSolver } from 'three/addons/animation/CCDIKSolver.js';
import { debugGui } from "./debugGui";

let gui, scene, camera, renderer, orbit, mesh, bones, skeletonHelper, ikSolver;
export default class IKTest extends THREE.Group {
    ikSolver;

    constructor() {
        super();
        this.init();
        this.initDebug();
    }

    init = () => {
        const segmentHeight = 1;
        const segmentCount = 3;
        const height = segmentHeight * segmentCount;
        const halfHeight = height * 0.5;

        const sizing = {
            segmentHeight,
            segmentCount,
            height,
            halfHeight
        };

        const geometry = createGeometry(sizing);
        const bones = createBones(sizing);
        mesh = createMesh(geometry, bones);

        skeletonHelper = new SkeletonHelper(mesh);
        skeletonHelper.material.linewidth = 2;

        const iks = [
            {
                target: 5,
                effector: 4,
                links: [{ index: 3 }, { index: 2 }, { index: 1 }]
            }
        ];
        this.ikSolver = new CCDIKSolver(mesh, iks);

        this.add(mesh);
        this.add(new CCDIKHelper(mesh, iks));
    }

    initDebug = () => {
        const scale = { value: 1 };
        mesh.skeleton.bones
            .filter((bone) => bone.name === 'target')
            .forEach(function (bone) {

                const folder = debugGui.addFolder(bone.name);

                const delta = 20;
                folder.add(bone.position, 'x', - delta + bone.position.x, delta + bone.position.x);
                folder.add(bone.position, 'y', - bone.position.y, bone.position.y);
                folder.add(bone.position, 'z', - delta + bone.position.z, delta + bone.position.z);

                folder.add(scale, "value", 0, 10).onChange(v => bone.scale.setScalar(v));

            });

        // gui.add(ikSolver, 'update').name('ikSolver.upd
    }

    update = (dt) => {
        if (this.ikSolver) {
            this.ikSolver.update();
            console.log("upd")
        }
    }
}


function createGeometry(sizing) {

    const geometry = new CylinderGeometry(
        2, // radiusTop
        2, // radiusBottom
        sizing.height, // height
        8, // radiusSegments
        sizing.segmentCount * 1, // heightSegments
        true // openEnded
    );

    const position = geometry.attributes.position;

    const vertex = new Vector3();

    const skinIndices = [];
    const skinWeights = [];

    for (let i = 0; i < position.count; i++) {

        vertex.fromBufferAttribute(position, i);

        const y = (vertex.y + sizing.halfHeight);

        const skinIndex = Math.floor(y / sizing.segmentHeight);
        const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

        skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
        skinWeights.push(1 - skinWeight, skinWeight, 0, 0);

    }

    geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndices, 4));
    geometry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));

    return geometry;

}


function createBones(sizing) {

    bones = [];

    // "root bone"
    const rootBone = new Bone();
    rootBone.name = 'root';
    rootBone.position.y = - sizing.halfHeight;
    bones.push(rootBone);

    //
    // "bone0", "bone1", "bone2", "bone3"
    //

    // "bone0"
    let prevBone = new Bone();
    prevBone.position.y = 0;
    rootBone.add(prevBone);
    bones.push(prevBone);

    // "bone1", "bone2", "bone3"
    for (let i = 1; i <= sizing.segmentCount; i++) {

        const bone = new Bone();
        bone.position.y = sizing.segmentHeight;
        bones.push(bone);
        bone.name = `bone${i}`;
        prevBone.add(bone);
        prevBone = bone;

    }

    // "target"
    const targetBone = new Bone();
    targetBone.name = 'target';
    targetBone.position.y = sizing.height + sizing.segmentHeight; // relative to parent: rootBone
    rootBone.add(targetBone);
    bones.push(targetBone);

    return bones;

}

function createMesh(geometry, bones) {

    const material = new MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: DoubleSide,
        flatShading: true,
        wireframe: true
    });

    const mesh = new SkinnedMesh(geometry, material);
    const skeleton = new Skeleton(bones);

    mesh.add(bones[0]);

    mesh.bind(skeleton);

    return mesh;
}
