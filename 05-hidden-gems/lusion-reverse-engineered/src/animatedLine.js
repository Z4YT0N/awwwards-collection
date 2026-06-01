import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import nurbsJson from "../assets/nurbs-canxerian.json";
import { debugGui } from "./debugGui";
import { createNurbsCurve } from "./utils/nurbsUtils";

export default class AnimatedLine extends THREE.Group {
    lineWidth = 1;
    lineMat = null;
    /** @type Line2 */
    line = null;

    lineProgress = 1;

    constructor() {
        super();

        this.createLine();

        const folder = debugGui.addFolder("AnimatedLine");
        folder.add(this, "lineWidth", 1, 100).onChange(v => this.lineMat.linewidth = v);
        folder.add(this, "lineProgress", 0.01, 1).onChange(v => {
            this.createLine();
        });
    }

    createLine() {
        if (this.line) {
            this.remove(this.line);
        }

        const positions = [];
        const colors = [];

        const nurbsPoints = nurbsJson[0].points.map(p => new THREE.Vector3(p.x, p.y, p.z, p.weight));
        const nurbsCurvePoints = createNurbsCurve(nurbsPoints).getSpacedPoints(100);
        const nurbsCurvePointsCut = nurbsCurvePoints.slice(0, Math.floor(this.lineProgress * nurbsCurvePoints.length));
        const spline = createNurbsCurve(nurbsCurvePointsCut);

        const divisions = Math.round(12 * nurbsCurvePoints.length);
        const point = new THREE.Vector3();
        const color = new THREE.Color();

        for (let i = 0, l = divisions; i < l; i++) {

            const t = i / l;

            spline.getPoint(t, point);
            positions.push(point.x, point.y, point.z);

            color.setHSL(t, 1.0, 0.5, THREE.SRGBColorSpace);
            colors.push(color.r, color.g, color.b);
        }

        const geometry = new LineGeometry();
        geometry.setPositions(positions);
        geometry.setColors(colors);

        this.lineMat = new LineMaterial({

            color: 0xffffff,
            linewidth: this.lineWidth, // in world units with size attenuation, pixels otherwise
            vertexColors: true,

            dashed: false,
            alphaToCoverage: true,

        });

        this.line = new Line2(geometry, this.lineMat);
        this.line.computeLineDistances();
        this.line.scale.set(1, 1, 1);

        this.add(this.line);
    }
}