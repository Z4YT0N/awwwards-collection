const getRadius = (shape, globalRadius) => {
  return shape.r !== undefined ? shape.r : globalRadius;
};

const approxEqual = (a, b, tol = 1) => Math.abs(a - b) <= tol;

export const computeCornerRadii = (shapes, globalRadius, tolerance = 1) => {
  const result = {};

  for (const shape of shapes) {
    const r = getRadius(shape, globalRadius);
    result[shape.id] = { tl: r, tr: r, br: r, bl: r };
  }

  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      const a = shapes[i];
      const b = shapes[j];

      const aL = a.x,
        aR = a.x + a.w,
        aT = a.y,
        aB = a.y + a.h;
      const bL = b.x,
        bR = b.x + b.w,
        bT = b.y,
        bB = b.y + b.h;

      if (approxEqual(aR, bL, tolerance)) {
        const overlapT = Math.max(aT, bT);
        const overlapB = Math.min(aB, bB);
        if (overlapB > overlapT) {
          if (aT >= overlapT - tolerance && aT <= overlapB + tolerance) result[a.id].tr = 0;
          if (aB >= overlapT - tolerance && aB <= overlapB + tolerance) result[a.id].br = 0;
          if (bT >= overlapT - tolerance && bT <= overlapB + tolerance) result[b.id].tl = 0;
          if (bB >= overlapT - tolerance && bB <= overlapB + tolerance) result[b.id].bl = 0;
        }
      }

      if (approxEqual(aL, bR, tolerance)) {
        const overlapT = Math.max(aT, bT);
        const overlapB = Math.min(aB, bB);
        if (overlapB > overlapT) {
          if (aT >= overlapT - tolerance && aT <= overlapB + tolerance) result[a.id].tl = 0;
          if (aB >= overlapT - tolerance && aB <= overlapB + tolerance) result[a.id].bl = 0;
          if (bT >= overlapT - tolerance && bT <= overlapB + tolerance) result[b.id].tr = 0;
          if (bB >= overlapT - tolerance && bB <= overlapB + tolerance) result[b.id].br = 0;
        }
      }

      if (approxEqual(aB, bT, tolerance)) {
        const overlapL = Math.max(aL, bL);
        const overlapR = Math.min(aR, bR);
        if (overlapR > overlapL) {
          if (aL >= overlapL - tolerance && aL <= overlapR + tolerance) result[a.id].bl = 0;
          if (aR >= overlapL - tolerance && aR <= overlapR + tolerance) result[a.id].br = 0;
          if (bL >= overlapL - tolerance && bL <= overlapR + tolerance) result[b.id].tl = 0;
          if (bR >= overlapL - tolerance && bR <= overlapR + tolerance) result[b.id].tr = 0;
        }
      }

      if (approxEqual(aT, bB, tolerance)) {
        const overlapL = Math.max(aL, bL);
        const overlapR = Math.min(aR, bR);
        if (overlapR > overlapL) {
          if (aL >= overlapL - tolerance && aL <= overlapR + tolerance) result[a.id].tl = 0;
          if (aR >= overlapL - tolerance && aR <= overlapR + tolerance) result[a.id].tr = 0;
          if (bL >= overlapL - tolerance && bL <= overlapR + tolerance) result[b.id].bl = 0;
          if (bR >= overlapL - tolerance && bR <= overlapR + tolerance) result[b.id].br = 0;
        }
      }
    }
  }

  return result;
};

export const computeBridges = (shapes, globalRadius, tolerance = 1) => {
  if (!shapes || shapes.length < 2) return [];

  const bridges = [];
  const bridgeSet = new Set();

  const addBridge = (x, y, r, rotation) => {
    let offsetY = 0;
    if (rotation === 0 || rotation === 90) {
      offsetY = -r;
    } else if (rotation === 180 || rotation === 270) {
      offsetY = r;
    }

    const finalX = x;
    const finalY = y + offsetY;
    const key = `${Math.round(finalX)},${Math.round(finalY)},${rotation}`;
    if (!bridgeSet.has(key)) {
      bridgeSet.add(key);
      bridges.push({ id: `bridge-${bridges.length}`, x: finalX, y: finalY, r, rotation });
    }
  };

  for (let i = 0; i < shapes.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (i === j) continue;

      const a = shapes[i];
      const b = shapes[j];
      const r = Math.min(getRadius(a, globalRadius), getRadius(b, globalRadius));

      const aL = a.x,
        aR = a.x + a.w,
        aT = a.y,
        aB = a.y + a.h;
      const bL = b.x,
        bR = b.x + b.w,
        bT = b.y,
        bB = b.y + b.h;

      if (approxEqual(aR, bL, tolerance) && aB > bT && aT < bB) {
        if (aT < bT - tolerance) {
          addBridge(aR, bT, r, 0);
        }

        if (aB > bB + tolerance) {
          addBridge(aR, bB, r, 270);
        }
      }

      if (approxEqual(aL, bR, tolerance) && aB > bT && aT < bB) {
        if (aT < bT - tolerance) {
          addBridge(aL, bT, r, 90);
        }

        if (aB > bB + tolerance) {
          addBridge(aL, bB, r, 180);
        }
      }

      if (approxEqual(aB, bT, tolerance) && aR > bL && aL < bR) {
        if (aL < bL - tolerance) {
          addBridge(bL, aB, r, 180);
        }

        if (aR > bR + tolerance) {
          addBridge(bR, aB, r, 270);
        }
      }

      if (approxEqual(aT, bB, tolerance) && aR > bL && aL < bR) {
        if (aL < bL - tolerance) {
          addBridge(bL, aT, r, 90);
        }

        if (aR > bR + tolerance) {
          addBridge(bR, aT, r, 0);
        }
      }
    }
  }

  return bridges;
};

export const computeBoundingBox = (shapes, padding = 0) => {
  if (!shapes || shapes.length === 0) {
    return { x: 0, y: 0, w: 100, h: 100 };
  }

  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  for (const shape of shapes) {
    minX = Math.min(minX, shape.x);
    minY = Math.min(minY, shape.y);
    maxX = Math.max(maxX, shape.x + shape.w);
    maxY = Math.max(maxY, shape.y + shape.h);
  }

  return {
    x: minX - padding,
    y: minY - padding,
    w: maxX - minX + padding * 2,
    h: maxY - minY + padding * 2
  };
};
