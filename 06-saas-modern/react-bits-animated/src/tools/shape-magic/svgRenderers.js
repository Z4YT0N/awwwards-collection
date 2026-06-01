export const getBridgePath = (r, rotation = 0) => {
  const k1 = 0.746;
  const k2 = 0.18;

  switch (rotation) {
    case 0:
      return `M 0 0 C 0 ${r * k1} ${r * k2} ${r} ${r} ${r} H 0 Z`;
    case 90:
      return `M 0 0 C 0 ${r * k1} ${-r * k2} ${r} ${-r} ${r} H 0 Z`;
    case 180:
      return `M 0 0 C 0 ${-r * k1} ${-r * k2} ${-r} ${-r} ${-r} H 0 Z`;
    case 270:
      return `M 0 0 C 0 ${-r * k1} ${r * k2} ${-r} ${r} ${-r} H 0 Z`;
    default:
      return `M 0 0 C 0 ${r * k1} ${r * k2} ${r} ${r} ${r} H 0 Z`;
  }
};

export const getRoundedRectPath = (x, y, w, h, corners) => {
  const { tl, tr, br, bl } = corners;

  const maxR = Math.min(w / 2, h / 2);
  const rtl = Math.min(tl, maxR);
  const rtr = Math.min(tr, maxR);
  const rbr = Math.min(br, maxR);
  const rbl = Math.min(bl, maxR);

  return `
    M ${x + rtl} ${y}
    L ${x + w - rtr} ${y}
    ${rtr > 0 ? `A ${rtr} ${rtr} 0 0 1 ${x + w} ${y + rtr}` : `L ${x + w} ${y}`}
    L ${x + w} ${y + h - rbr}
    ${rbr > 0 ? `A ${rbr} ${rbr} 0 0 1 ${x + w - rbr} ${y + h}` : `L ${x + w} ${y + h}`}
    L ${x + bl} ${y + h}
    ${rbl > 0 ? `A ${rbl} ${rbl} 0 0 1 ${x} ${y + h - rbl}` : `L ${x} ${y + h}`}
    L ${x} ${y + rtl}
    ${rtl > 0 ? `A ${rtl} ${rtl} 0 0 1 ${x + rtl} ${y}` : `L ${x} ${y}`}
    Z
  `
    .trim()
    .replace(/\s+/g, ' ');
};

export const generateMergedSVG = (shapes, bridges, cornerRadii, style, globalRadius) => {
  const padding = 10;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  shapes.forEach(s => {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x + s.w);
    maxY = Math.max(maxY, s.y + s.h);
  });

  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const offsetX = -minX + padding;
  const offsetY = -minY + padding;

  const shapePaths = shapes
    .map(s => {
      const corners = cornerRadii[s.id] || { tl: globalRadius, tr: globalRadius, br: globalRadius, bl: globalRadius };
      return `<path d="${getRoundedRectPath(s.x + offsetX, s.y + offsetY, s.w, s.h, corners)}" />`;
    })
    .join('\n    ');

  const bridgePaths = bridges
    .map(b => {
      const transform = `translate(${b.x + offsetX}, ${b.y + offsetY})`;
      return `<path d="${getBridgePath(b.r, b.rotation)}" transform="${transform}" />`;
    })
    .join('\n    ');

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <g fill="${style.fill}" stroke="${style.stroke}" stroke-width="${style.strokeWidth}">
    ${shapePaths}
    ${bridgePaths}
  </g>
</svg>`;
};

export const generateMergedClipPathSVG = (shapes, bridges, cornerRadii, style, globalRadius) => {
  const padding = 10;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  shapes.forEach(s => {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x + s.w);
    maxY = Math.max(maxY, s.y + s.h);
  });

  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const offsetX = -minX + padding;
  const offsetY = -minY + padding;

  const allPaths = [];

  shapes.forEach(s => {
    const corners = cornerRadii[s.id] || { tl: globalRadius, tr: globalRadius, br: globalRadius, bl: globalRadius };
    allPaths.push(getRoundedRectPath(s.x + offsetX, s.y + offsetY, s.w, s.h, corners));
  });

  bridges.forEach(b => {
    const path = getBridgePath(b.r, b.rotation);
    const translatedPath = translatePath(path, b.x + offsetX, b.y + offsetY);
    allPaths.push(translatedPath);
  });

  const combinedPath = allPaths.join(' ');

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="merged-shape-clip">
      <path d="${combinedPath}" fill-rule="nonzero" />
    </clipPath>
  </defs>
  
  <!-- The merged shape - use as mask for images/videos -->
  <path d="${combinedPath}" fill="${style.fill}" fill-rule="nonzero" />
  
  <!-- Example: Clipped content container -->
  <!-- <g clip-path="url(#merged-shape-clip)">
    <image href="your-image.jpg" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" />
  </g> -->
</svg>`;
};

export const generateCSSClipPath = (shapes, bridges, cornerRadii, globalRadius) => {
  const padding = 10;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  shapes.forEach(s => {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x + s.w);
    maxY = Math.max(maxY, s.y + s.h);
  });

  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const offsetX = -minX + padding;
  const offsetY = -minY + padding;

  const allPaths = [];

  shapes.forEach(s => {
    const corners = cornerRadii[s.id] || { tl: globalRadius, tr: globalRadius, br: globalRadius, bl: globalRadius };
    allPaths.push(getRoundedRectPath(s.x + offsetX, s.y + offsetY, s.w, s.h, corners));
  });

  bridges.forEach(b => {
    const path = getBridgePath(b.r, b.rotation);
    const translatedPath = translatePath(path, b.x + offsetX, b.y + offsetY);
    allPaths.push(translatedPath);
  });

  const combinedPath = allPaths.join(' ').replace(/\s+/g, ' ').trim();

  return `/* Container dimensions: ${Math.round(width)}px × ${Math.round(height)}px */
.clipped-element {
  clip-path: path('${combinedPath}');
  width: ${Math.round(width)}px;
  height: ${Math.round(height)}px;
}`;
};

const translatePath = (path, tx, ty) => {
  return path.replace(/(-?\d+\.?\d*)/g, (match, num, offset, str) => {
    const before = str.slice(0, offset);
    const lastCmd = before.match(/[MLHVCSQTAZ]/gi);
    if (!lastCmd) return match;

    const cmd = lastCmd[lastCmd.length - 1].toUpperCase();
    const numVal = parseFloat(num);

    const precedingPart = before.slice(before.lastIndexOf(cmd) + 1);
    const numbersBefore = precedingPart.match(/-?\d+\.?\d*/g) || [];
    const isXCoord = numbersBefore.length % 2 === 0;

    if (cmd === 'H') return String(numVal + tx);
    if (cmd === 'V') return String(numVal + ty);
    if (cmd === 'Z' || cmd === 'A') return match;

    return isXCoord ? String(numVal + tx) : String(numVal + ty);
  });
};

const computeNegativeSpaces = (shapes, bridges, globalRadius, minX, minY, maxX, maxY) => {
  const negativeSpaces = [];

  for (const bridge of bridges) {
    let cornerX = bridge.x;
    let cornerY;
    if (bridge.rotation === 0 || bridge.rotation === 90) {
      cornerY = bridge.y + bridge.r;
    } else {
      cornerY = bridge.y - bridge.r;
    }

    let nsLeft, nsTop, nsRight, nsBottom;

    switch (bridge.rotation) {
      case 0:
        nsLeft = cornerX;
        nsBottom = cornerY;
        nsTop = minY;
        nsRight = maxX;

        for (const s of shapes) {
          if (s.x < nsRight && s.x + s.w > nsLeft && s.y + s.h <= cornerY && s.y + s.h > nsTop) {
            nsTop = s.y + s.h;
          }
          if (s.y < cornerY && s.x >= cornerX && s.x < nsRight) {
            nsRight = s.x;
          }
        }
        break;

      case 90:
        nsRight = cornerX;
        nsBottom = cornerY;
        nsTop = minY;
        nsLeft = minX;

        for (const s of shapes) {
          if (s.x < nsRight && s.x + s.w > nsLeft && s.y + s.h <= cornerY && s.y + s.h > nsTop) {
            nsTop = s.y + s.h;
          }
          if (s.y < cornerY && s.x + s.w <= cornerX && s.x + s.w > nsLeft) {
            nsLeft = s.x + s.w;
          }
        }
        break;

      case 180:
        nsRight = cornerX;
        nsTop = cornerY;
        nsBottom = maxY;
        nsLeft = minX;

        for (const s of shapes) {
          if (s.x < nsRight && s.x + s.w > nsLeft && s.y >= cornerY && s.y < nsBottom) {
            nsBottom = s.y;
          }
          if (s.y + s.h > cornerY && s.x + s.w <= cornerX && s.x + s.w > nsLeft) {
            nsLeft = s.x + s.w;
          }
        }
        break;

      case 270:
        nsLeft = cornerX;
        nsTop = cornerY;
        nsBottom = maxY;
        nsRight = maxX;

        for (const s of shapes) {
          if (s.x < nsRight && s.x + s.w > nsLeft && s.y >= cornerY && s.y < nsBottom) {
            nsBottom = s.y;
          }
          if (s.y + s.h > cornerY && s.x >= cornerX && s.x < nsRight) {
            nsRight = s.x;
          }
        }
        break;

      default:
        continue;
    }

    const width = nsRight - nsLeft;
    const height = nsBottom - nsTop;

    if (width > 0 && height > 0) {
      const newNS = {
        id: `negative-${negativeSpaces.length}`,
        x: nsLeft,
        y: nsTop,
        w: width,
        h: height,
        rotation: bridge.rotation
      };

      let shouldAdd = true;
      for (const existing of negativeSpaces) {
        const overlapLeft = Math.max(newNS.x, existing.x);
        const overlapTop = Math.max(newNS.y, existing.y);
        const overlapRight = Math.min(newNS.x + newNS.w, existing.x + existing.w);
        const overlapBottom = Math.min(newNS.y + newNS.h, existing.y + existing.h);

        if (overlapLeft < overlapRight && overlapTop < overlapBottom) {
          if (newNS.x === existing.x && newNS.y === existing.y) {
            if (newNS.w > existing.w) {
              const existingOriginalBottom = existing.y + existing.h;
              existing.y = newNS.y + newNS.h;
              existing.h = existingOriginalBottom - existing.y;
            } else {
              newNS.y = existing.y + existing.h;
              newNS.h = nsBottom - newNS.y;
            }
          } else if (newNS.y < existing.y) {
            newNS.h = existing.y - newNS.y;
          } else if (newNS.x < existing.x) {
            newNS.w = existing.x - newNS.x;
          } else {
            shouldAdd = false;
          }

          if (newNS.w <= 0 || newNS.h <= 0) {
            shouldAdd = false;
          }
        }
      }

      for (let i = negativeSpaces.length - 1; i >= 0; i--) {
        if (negativeSpaces[i].w <= 0 || negativeSpaces[i].h <= 0) {
          negativeSpaces.splice(i, 1);
        }
      }

      if (shouldAdd && newNS.w > 0 && newNS.h > 0) {
        negativeSpaces.push(newNS);
      }
    }
  }

  return negativeSpaces;
};

export const generateReactComponent = (shapes, bridges, cornerRadii, style, globalRadius, name = 'MergedShape') => {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  shapes.forEach(s => {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x + s.w);
    maxY = Math.max(maxY, s.y + s.h);
  });

  const width = maxX - minX;
  const height = maxY - minY;

  const negativeSpaces = computeNegativeSpaces(shapes, bridges, globalRadius, minX, minY, maxX, maxY);

  const shapeElements = shapes
    .map((s, i) => {
      const corners = cornerRadii[s.id] || { tl: globalRadius, tr: globalRadius, br: globalRadius, bl: globalRadius };
      const left = s.x - minX;
      const top = s.y - minY;

      return `      {/* Shape ${i + 1} */}
      <div
        style={{
          position: 'absolute',
          left: ${left},
          top: ${top},
          width: ${s.w},
          height: ${s.h},
          backgroundColor: fill,
          borderRadius: '${corners.tl}px ${corners.tr}px ${corners.br}px ${corners.bl}px',
        }}
      >
        {/* Add content here */}
      </div>`;
    })
    .join('\n');

  const negativeSpaceElements = negativeSpaces
    .map((ns, i) => {
      const left = ns.x - minX;
      const top = ns.y - minY;

      return `      {/* Negative Space ${i + 1} - Content container for empty region */}
      <div
        style={{
          position: 'absolute',
          left: ${left},
          top: ${top},
          width: ${ns.w},
          height: ${ns.h},
          // Transparent container for content in negative space
        }}
      >
        {/* Add content here */}
      </div>`;
    })
    .join('\n');

  const bridgeElements = bridges
    .map((b, i) => {
      const left = b.x - minX;
      const top = b.y - minY;
      const size = b.r;

      let viewBox,
        offsetLeft = 0,
        offsetTop = 0;
      switch (b.rotation) {
        case 0:
          viewBox = `0 0 ${size} ${size}`;
          break;
        case 90:
          viewBox = `${-size} 0 ${size} ${size}`;
          offsetLeft = -size;
          break;
        case 180:
          viewBox = `${-size} ${-size} ${size} ${size}`;
          offsetLeft = -size;
          offsetTop = -size;
          break;
        case 270:
          viewBox = `0 ${-size} ${size} ${size}`;
          offsetTop = -size;
          break;
        default:
          viewBox = `0 0 ${size} ${size}`;
      }

      return `      {/* Bridge ${i + 1} */}
      <svg
        style={{
          position: 'absolute',
          left: ${left + offsetLeft},
          top: ${top + offsetTop},
          width: ${size},
          height: ${size},
          pointerEvents: 'none',
        }}
        viewBox="${viewBox}"
      >
        <path d="${getBridgePath(b.r, b.rotation)}" fill={fill} />
      </svg>`;
    })
    .join('\n');

  return `const ${name} = ({ fill = "${style.fill}", children, style: containerStyle, ...props }) => (
  <div
    style={{
      position: 'relative',
      width: ${width},
      height: ${height},
      ...containerStyle,
    }}
    {...props}
  >
${shapeElements}
${negativeSpaceElements}
${bridgeElements}
    {children}
  </div>
);

export default ${name};`;
};
