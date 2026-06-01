export const DEFAULT_STYLE = {
  fill: '#ffffff',
  stroke: 'none',
  strokeWidth: 0
};

export const DEFAULT_GLOBAL_RADIUS = 32;
export const DEFAULT_TOLERANCE = 1;
export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 600;
export const DEFAULT_GRID_SIZE = 10;

export const createShape = (x = 100, y = 100, w = 120, h = 80) => ({
  id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  x,
  y,
  w,
  h,
  r: undefined
});

export const createInitialState = () => ({
  shapes: [
    { id: 'shape-1', x: 300, y: 150, w: 200, h: 280, r: undefined },
    { id: 'shape-2', x: 500, y: 220, w: 200, h: 140, r: undefined }
  ],
  style: { ...DEFAULT_STYLE },
  globalRadius: DEFAULT_GLOBAL_RADIUS,
  tolerance: DEFAULT_TOLERANCE,
  selectedIds: [],
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  snapToGrid: true,
  gridSize: DEFAULT_GRID_SIZE
});
