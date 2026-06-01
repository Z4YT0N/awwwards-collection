import GUI from "lil-gui";
import { Mesh, Object3D } from "three";
import { AxisGridHelper } from "./axis-grid-helper";

export const makeAxisGrid = (gui: GUI, node: Mesh | Object3D, label: string, units?: number) => {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, 'visible').name(label);
}