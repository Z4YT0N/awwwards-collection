import { AxesHelper, GridHelper, Material, Mesh, Object3D } from "three";

export class AxisGridHelper {
  grid: GridHelper;
  axes: AxesHelper;
  _visible: boolean;

  constructor(node: Mesh | Object3D, units = 10) {
    const axes = new AxesHelper();
    (axes.material as Material).depthTest = false;
    axes.renderOrder = 2;  // after the grid
    node.add(axes);
 
    const grid = new GridHelper(units, units);
    (grid.material as Material).depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);
 
    this.grid = grid;
    this.axes = axes;
    this._visible = false;
    this.grid.visible = this._visible;
    this.axes.visible = this._visible;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}