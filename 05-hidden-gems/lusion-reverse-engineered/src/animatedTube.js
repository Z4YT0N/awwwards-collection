import * as THREE from 'three';
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { NURBSCurve } from "three/examples/jsm/Addons.js";
import nurbsJson from "../assets/nurbs-canxerian.json";
import { debugGui } from "./debugGui";

const DEBUG_NURB_LINE = false;

export class AnimatedTube extends THREE.Group {
    uniforms = {
        curveTexture: { value: null },
        stretchRatio: { value: 0 }
    }

    drawStartPercent = 0;
    radius = 0.11;
    /** @type THREE.Mesh */
    mesh = null;

    /** @type THREE.Camera */
    camera = null;

    startPosPageY;
    endPosPageY;

    targetDrawPercent = 0;

    constructor(camera) {
        super();

        this.camera = camera;

        this.startPosPageY = window.innerHeight * 0.6;
        this.endPosPageY = this.startPosPageY + window.innerHeight;

        this.mesh = this.createTubeMesh();
        this.add(this.mesh);

        const folder = debugGui.addFolder("AnimatedTube");
        folder.add(this, 'drawStartPercent', 0, 1).onChange(value => {
            this.uniforms.stretchRatio.value = value;
        });
        folder.add(this, 'radius', 0, 1).onChange(value => {
            this.setRadius(value);
        });

        this.position.y = -3;
        this.position.z = -1;
        window.addEventListener("scroll", e => this.onScroll());
        this.onScroll();
        this.resize();
    }

    onScroll(e) {
        const v = THREE.MathUtils.clamp(THREE.MathUtils.inverseLerp(this.startPosPageY, this.endPosPageY, window.scrollY), 0, 1);
        this.targetDrawPercent = v;
    }

    resize = () => {
        this.mesh.position.x = this.camera.left;
        this.mesh.position.y = this.camera.bottom * 1.5;
    }

    setRadius(value) {
        this.radius = value;
        this.remove(this.mesh);
        this.mesh = this.createTubeMesh();
        this.add(this.mesh);
    }

    // Adapted from https://codepen.io/prisoner849/pen/bGQNEwm
    createTubeMesh() {
        const curve = this.createNurbsCurve(4);

        if (DEBUG_NURB_LINE) {
            let lineCurve = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(50)),
                new THREE.LineBasicMaterial({ color: "red" })
            )
            this.add(lineCurve);
        }

        // datatexture
        let data = [];
        let wtt = (vArr) => {
            vArr.forEach(v => { data.push(v.x, v.y, v.z, 0) });
        }
        let texSize = 1024;
        let pData = curve.getSpacedPoints(texSize - 1);
        let ffData = curve.computeFrenetFrames(texSize - 1);
        wtt(pData);
        wtt(ffData.tangents);
        let dataTexture = new THREE.DataTexture(new Float32Array(data), texSize, 2, THREE.RGBAFormat, THREE.FloatType);
        dataTexture.needsUpdate = true;
        this.uniforms.curveTexture.value = dataTexture;

        let cylinderSegments = 1000;
        let radialSegments = 100;
        let tubeGeometry = mergeGeometries([
            new THREE.SphereGeometry(this.radius, radialSegments, radialSegments * 0.5, 0, Math.PI * 2, 0, Math.PI * 0.5).translate(0, 0.5, 0),
            new THREE.CylinderGeometry(this.radius, this.radius, 1, radialSegments, cylinderSegments, true),
            new THREE.SphereGeometry(this.radius, radialSegments, radialSegments * 0.5, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5).translate(0, -0.5, 0)
        ]).rotateZ(-Math.PI * 0.5).rotateY(Math.PI * 0.5);

        let tubeMaterial = new THREE.MeshStandardMaterial({
            color: "#6289de",
            onBeforeCompile: shader => {
                shader.uniforms.curveTexture = this.uniforms.curveTexture;
                shader.uniforms.stretchRatio = this.uniforms.stretchRatio;
                shader.vertexShader = `
                    uniform sampler2D curveTexture;
                    uniform float stretchRatio;
                    ${shader.vertexShader}
`.replace(
                    `#include <beginnormal_vertex>`,
                    `#include <beginnormal_vertex>

                    vec3 pos = position;

                    vec3 cpos = vec3(0.);
                    vec3 ctan = vec3(0.);

                    float a = clamp(pos.z + 0.5, 0., 1.) * stretchRatio;
                    if(pos.z < -0.5) {
                        cpos = vec3(texture(curveTexture, vec2(0., 0.25)));
                        ctan = vec3(texture(curveTexture, vec2(0., 0.75)));
                        pos.z += 0.5;
                    } 
                    else if(pos.z >= -0.5) {
                        cpos = vec3(texture(curveTexture, vec2(a, 0.25)));
                        ctan = vec3(texture(curveTexture, vec2(a, 0.75)));
                        pos.z = (pos.z > 0.5) ? (pos.z - 0.5) : 0.;
                    }
`).replace(
                        `#include <begin_vertex>`,
                        `#include <begin_vertex> 
                    transformed =  pos;
                    transformed += cpos;
`);
            }
        });
        const mesh = new THREE.Mesh(tubeGeometry.clone(), tubeMaterial);
        mesh.frustumCulled = false;

        return mesh;
    }

    createNurbsCurve(nurbsDegree = 3) {
        const nurbsPoints = nurbsJson[0].points.map((p) => new THREE.Vector4(p.x, p.y, p.z, p.weight));
        const nurbsKnots = [];

        for (let i = 0; i <= nurbsDegree; i++) {
            nurbsKnots.push(0);
        }

        for (let i = 0, j = nurbsPoints.length; i < j; i++) {
            const knot = (i + 1) / (j - nurbsDegree);
            nurbsKnots.push(THREE.MathUtils.clamp(knot, 0, 1));
        }

        const nurbsCurve = new NURBSCurve(nurbsDegree, nurbsKnots, nurbsPoints);
        return nurbsCurve;
    }

    update = (dt) => {
        this.uniforms.stretchRatio.value = THREE.MathUtils.lerp(this.uniforms.stretchRatio.value, this.targetDrawPercent, dt * 10);
    }
}