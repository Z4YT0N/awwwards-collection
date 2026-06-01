import * as THREE from 'three';
import { NURBSCurve } from "three/examples/jsm/Addons.js";

export function createNurbsCurve(nurbsPoints, nurbsDegree = 3) {
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