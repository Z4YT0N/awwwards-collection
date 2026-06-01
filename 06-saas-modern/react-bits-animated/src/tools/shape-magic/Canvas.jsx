import { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { Eye, EyeOff, Maximize2 } from 'lucide-react';
import { getBridgePath, getRoundedRectPath } from './svgRenderers';

const Canvas = forwardRef(
  (
    {
      shapes,
      bridges,
      cornerRadii,
      globalRadius,
      style,
      selectedIds,
      onShapeUpdate,
      onSelectionChange,
      onDragEnd,
      onAltDragDuplicate,
      snapToGrid,
      gridSize,
      showBridgeDebug = false,
      onShowBridgeDebugChange
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const hasCenteredRef = useRef(false);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const [spaceHeld, setSpaceHeld] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [draggedShape, setDraggedShape] = useState(null);
    const [resizeHandle, setResizeHandle] = useState(null);
    const [initialShapeStates, setInitialShapeStates] = useState(null);
    const [isAltDragging, setIsAltDragging] = useState(false);
    const altDragDuplicatedRef = useRef(false);

    const [marquee, setMarquee] = useState(null);
    const [marqueeStart, setMarqueeStart] = useState(null);

    const fitToView = useCallback(() => {
      if (shapes.length === 0) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const minX = Math.min(...shapes.map(s => s.x));
      const minY = Math.min(...shapes.map(s => s.y));
      const maxX = Math.max(...shapes.map(s => s.x + s.w));
      const maxY = Math.max(...shapes.map(s => s.y + s.h));

      const shapesWidth = maxX - minX;
      const shapesHeight = maxY - minY;
      const shapesCenterX = minX + shapesWidth / 2;
      const shapesCenterY = minY + shapesHeight / 2;

      const padding = 60;
      const availableWidth = rect.width - padding * 2;
      const availableHeight = rect.height - padding * 2;

      const scaleX = availableWidth / shapesWidth;
      const scaleY = availableHeight / shapesHeight;
      const newZoom = Math.min(scaleX, scaleY, 2);

      const containerCenterX = rect.width / 2;
      const containerCenterY = rect.height / 2;

      setZoom(newZoom);
      setPan({
        x: containerCenterX - shapesCenterX * newZoom,
        y: containerCenterY - shapesCenterY * newZoom
      });
    }, [shapes]);

    useImperativeHandle(
      ref,
      () => ({
        fitToView
      }),
      [fitToView]
    );

    useEffect(() => {
      if (hasCenteredRef.current || shapes.length === 0) return;

      const container = containerRef.current;
      if (!container) return;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const minX = Math.min(...shapes.map(s => s.x));
        const minY = Math.min(...shapes.map(s => s.y));
        const maxX = Math.max(...shapes.map(s => s.x + s.w));
        const maxY = Math.max(...shapes.map(s => s.y + s.h));

        const shapesWidth = maxX - minX;
        const shapesHeight = maxY - minY;
        const shapesCenterX = minX + shapesWidth / 2;
        const shapesCenterY = minY + shapesHeight / 2;

        const containerCenterX = rect.width / 2;
        const containerCenterY = rect.height / 2;

        setPan({
          x: containerCenterX - shapesCenterX,
          y: containerCenterY - shapesCenterY
        });

        hasCenteredRef.current = true;
      });
    }, [shapes]);

    const screenToCanvas = useCallback(
      (screenX, screenY) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        return {
          x: (screenX - rect.left - pan.x) / zoom,
          y: (screenY - rect.top - pan.y) / zoom
        };
      },
      [pan, zoom]
    );

    const snapValue = useCallback(
      value => {
        if (!snapToGrid) return value;
        return Math.round(value / gridSize) * gridSize;
      },
      [snapToGrid, gridSize]
    );

    useEffect(() => {
      const handleKeyDown = e => {
        if (e.code === 'Space' && !e.repeat && document.activeElement?.tagName !== 'INPUT') {
          e.preventDefault();
          setSpaceHeld(true);
        }
      };
      const handleKeyUp = e => {
        if (e.code === 'Space') {
          setSpaceHeld(false);
          setIsPanning(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);

    const handleWheel = useCallback(
      e => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(zoom * delta, 0.25), 4);

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
          const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

          setPan({ x: newPanX, y: newPanY });
        }

        setZoom(newZoom);
      },
      [zoom, pan]
    );

    const handleMouseDown = useCallback(
      e => {
        const canvasPos = screenToCanvas(e.clientX, e.clientY);

        if (spaceHeld) {
          setIsPanning(true);
          setDragStart({ x: e.clientX, y: e.clientY });
          return;
        }

        if (e.target.dataset.handle) {
          const shapeId = e.target.dataset.shapeId;
          const shape = shapes.find(s => s.id === shapeId);
          if (shape) {
            const states = {};
            const selected = selectedIds.includes(shapeId) ? selectedIds : [shapeId];
            selected.forEach(id => {
              const s = shapes.find(sh => sh.id === id);
              if (s) states[id] = { ...s };
            });

            setResizeHandle(e.target.dataset.handle);
            setDraggedShape(shape);
            setDragStart({ x: e.clientX, y: e.clientY });
            setInitialShapeStates(states);
            setIsDragging(true);
            return;
          }
        }

        const clickedShape = [...shapes]
          .reverse()
          .find(
            shape =>
              canvasPos.x >= shape.x &&
              canvasPos.x <= shape.x + shape.w &&
              canvasPos.y >= shape.y &&
              canvasPos.y <= shape.y + shape.h
          );

        if (clickedShape) {
          if (e.altKey && onAltDragDuplicate) {
            const shapesToDuplicate = selectedIds.includes(clickedShape.id) ? selectedIds : [clickedShape.id];
            altDragDuplicatedRef.current = false;
            setIsAltDragging(true);

            const states = {};
            shapesToDuplicate.forEach(id => {
              const s = shapes.find(sh => sh.id === id);
              if (s) states[id] = { ...s };
            });

            setDraggedShape(clickedShape);
            setDragStart({ x: e.clientX, y: e.clientY });
            setInitialShapeStates(states);
            setIsDragging(true);
            return;
          }

          if (e.shiftKey) {
            if (selectedIds.includes(clickedShape.id)) {
              onSelectionChange(selectedIds.filter(id => id !== clickedShape.id));
            } else {
              onSelectionChange([...selectedIds, clickedShape.id]);
            }
          } else if (!selectedIds.includes(clickedShape.id)) {
            onSelectionChange([clickedShape.id]);
          }

          const shapesToMove = selectedIds.includes(clickedShape.id) ? selectedIds : [clickedShape.id];
          const states = {};
          shapesToMove.forEach(id => {
            const s = shapes.find(sh => sh.id === id);
            if (s) states[id] = { ...s };
          });

          setDraggedShape(clickedShape);
          setDragStart({ x: e.clientX, y: e.clientY });
          setInitialShapeStates(states);
          setIsDragging(true);
        } else {
          if (e.button === 1) {
            setIsPanning(true);
            setDragStart({ x: e.clientX, y: e.clientY });
          } else {
            if (!e.shiftKey) {
              onSelectionChange([]);
            }
            setMarqueeStart(canvasPos);
            setMarquee({ x: canvasPos.x, y: canvasPos.y, w: 0, h: 0 });
          }
        }
      },
      [shapes, selectedIds, screenToCanvas, onSelectionChange, spaceHeld, onAltDragDuplicate]
    );

    const handleMouseMove = useCallback(
      e => {
        if (isPanning && dragStart) {
          const dx = e.clientX - dragStart.x;
          const dy = e.clientY - dragStart.y;
          setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
          setDragStart({ x: e.clientX, y: e.clientY });
          return;
        }

        if (marqueeStart && marquee) {
          const canvasPos = screenToCanvas(e.clientX, e.clientY);
          const x = Math.min(marqueeStart.x, canvasPos.x);
          const y = Math.min(marqueeStart.y, canvasPos.y);
          const w = Math.abs(canvasPos.x - marqueeStart.x);
          const h = Math.abs(canvasPos.y - marqueeStart.y);
          setMarquee({ x, y, w, h });
          return;
        }

        if (isDragging && draggedShape && dragStart && initialShapeStates) {
          const dx = (e.clientX - dragStart.x) / zoom;
          const dy = (e.clientY - dragStart.y) / zoom;

          if (isAltDragging && !altDragDuplicatedRef.current && onAltDragDuplicate) {
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
              const originalIds = Object.keys(initialShapeStates);
              const duplicates = onAltDragDuplicate(originalIds);

              if (duplicates && duplicates.length > 0) {
                const newStates = {};
                duplicates.forEach(dup => {
                  newStates[dup.id] = { ...dup };
                });
                setInitialShapeStates(newStates);
                setDraggedShape(duplicates[0]);
                altDragDuplicatedRef.current = true;

                duplicates.forEach(dup => {
                  onShapeUpdate(dup.id, {
                    x: snapValue(dup.x + dx),
                    y: snapValue(dup.y + dy)
                  });
                });
              }
            }
            return;
          }

          // After alt+drag duplication or normal drag - move the shapes
          if (resizeHandle) {
            const ids = Object.keys(initialShapeStates);

            if (ids.length === 1) {
              const id = ids[0];
              const initial = initialShapeStates[id];
              let newX = initial.x;
              let newY = initial.y;
              let newW = initial.w;
              let newH = initial.h;

              if (resizeHandle.includes('w')) {
                newX = snapValue(initial.x + dx);
                newW = initial.w - (newX - initial.x);
              }
              if (resizeHandle.includes('e')) {
                newW = snapValue(initial.w + dx);
              }
              if (resizeHandle.includes('n')) {
                newY = snapValue(initial.y + dy);
                newH = initial.h - (newY - initial.y);
              }
              if (resizeHandle.includes('s')) {
                newH = snapValue(initial.h + dy);
              }

              onShapeUpdate(id, {
                x: snapValue(newX),
                y: snapValue(newY),
                w: snapValue(Math.max(20, newW)),
                h: snapValue(Math.max(20, newH))
              });
            } else {
              const minX = Math.min(...ids.map(id => initialShapeStates[id].x));
              const minY = Math.min(...ids.map(id => initialShapeStates[id].y));
              const maxX = Math.max(...ids.map(id => initialShapeStates[id].x + initialShapeStates[id].w));
              const maxY = Math.max(...ids.map(id => initialShapeStates[id].y + initialShapeStates[id].h));
              const boxW = maxX - minX;
              const boxH = maxY - minY;

              let newMinX = minX,
                newMinY = minY,
                newMaxX = maxX,
                newMaxY = maxY;

              if (resizeHandle.includes('w')) newMinX = snapValue(minX + dx);
              if (resizeHandle.includes('e')) newMaxX = snapValue(maxX + dx);
              if (resizeHandle.includes('n')) newMinY = snapValue(minY + dy);
              if (resizeHandle.includes('s')) newMaxY = snapValue(maxY + dy);

              const newBoxW = Math.max(gridSize * 2, newMaxX - newMinX);
              const newBoxH = Math.max(gridSize * 2, newMaxY - newMinY);

              ids.forEach(id => {
                const initial = initialShapeStates[id];
                const relX = (initial.x - minX) / (boxW || 1);
                const relY = (initial.y - minY) / (boxH || 1);
                const relW = initial.w / (boxW || 1);
                const relH = initial.h / (boxH || 1);

                onShapeUpdate(id, {
                  x: snapValue(newMinX + relX * newBoxW),
                  y: snapValue(newMinY + relY * newBoxH),
                  w: snapValue(Math.max(gridSize * 2, relW * newBoxW)),
                  h: snapValue(Math.max(gridSize * 2, relH * newBoxH))
                });
              });
            }
          } else {
            Object.keys(initialShapeStates).forEach(id => {
              const initial = initialShapeStates[id];
              onShapeUpdate(id, {
                x: snapValue(initial.x + dx),
                y: snapValue(initial.y + dy)
              });
            });
          }
        }
      },
      [
        isPanning,
        isDragging,
        dragStart,
        draggedShape,
        initialShapeStates,
        zoom,
        resizeHandle,
        snapValue,
        onShapeUpdate,
        marqueeStart,
        marquee,
        screenToCanvas,
        gridSize,
        isAltDragging,
        onAltDragDuplicate
      ]
    );

    const handleMouseUp = useCallback(() => {
      if (marquee && marqueeStart) {
        const selected = shapes.filter(shape => {
          const shapeRight = shape.x + shape.w;
          const shapeBottom = shape.y + shape.h;
          const marqueeRight = marquee.x + marquee.w;
          const marqueeBottom = marquee.y + marquee.h;

          return !(
            shape.x > marqueeRight ||
            shapeRight < marquee.x ||
            shape.y > marqueeBottom ||
            shapeBottom < marquee.y
          );
        });

        if (selected.length > 0) {
          onSelectionChange(selected.map(s => s.id));
        }
      }

      if (isDragging && onDragEnd) {
        onDragEnd();
      }

      setIsDragging(false);
      setIsPanning(false);
      setDragStart(null);
      setDraggedShape(null);
      setResizeHandle(null);
      setInitialShapeStates(null);
      setMarquee(null);
      setMarqueeStart(null);
      setIsAltDragging(false);
      altDragDuplicatedRef.current = false;
    }, [marquee, marqueeStart, shapes, onSelectionChange, isDragging, onDragEnd]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    const renderResizeHandles = shape => {
      if (!selectedIds.includes(shape.id)) return null;

      const handleSize = 8 / zoom;
      const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

      return handles.map(handle => {
        let x, y;
        const half = handleSize / 2;

        switch (handle) {
          case 'nw':
            x = shape.x - half;
            y = shape.y - half;
            break;
          case 'n':
            x = shape.x + shape.w / 2 - half;
            y = shape.y - half;
            break;
          case 'ne':
            x = shape.x + shape.w - half;
            y = shape.y - half;
            break;
          case 'e':
            x = shape.x + shape.w - half;
            y = shape.y + shape.h / 2 - half;
            break;
          case 'se':
            x = shape.x + shape.w - half;
            y = shape.y + shape.h - half;
            break;
          case 's':
            x = shape.x + shape.w / 2 - half;
            y = shape.y + shape.h - half;
            break;
          case 'sw':
            x = shape.x - half;
            y = shape.y + shape.h - half;
            break;
          case 'w':
            x = shape.x - half;
            y = shape.y + shape.h / 2 - half;
            break;
        }

        return (
          <rect
            key={`${shape.id}-${handle}`}
            data-handle={handle}
            data-shape-id={shape.id}
            x={x}
            y={y}
            width={handleSize}
            height={handleSize}
            fill="#A855F7"
            stroke="#fff"
            strokeWidth={1 / zoom}
            style={{ cursor: `${handle}-resize` }}
          />
        );
      });
    };

    return (
      <Box
        ref={containerRef}
        position="relative"
        w="100%"
        h="100%"
        bg="var(--bg-body)"
        overflow="hidden"
        cursor={isPanning || spaceHeld ? 'grab' : 'default'}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        userSelect="none"
      >
        <Box
          position="absolute"
          left={0}
          top={0}
          right={0}
          bottom={0}
          opacity={0.5}
          style={{
            backgroundImage: `
            linear-gradient(var(--border-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)
          `,
            backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        />

        <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0 }}>
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {shapes.map(shape => {
              const isSelected = selectedIds.includes(shape.id);
              const corners = cornerRadii[shape.id] || {
                tl: globalRadius,
                tr: globalRadius,
                br: globalRadius,
                bl: globalRadius
              };

              return (
                <g key={shape.id}>
                  <path
                    d={getRoundedRectPath(shape.x, shape.y, shape.w, shape.h, corners)}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={style.strokeWidth}
                  />
                  {isSelected && (
                    <rect
                      x={shape.x - 2 / zoom}
                      y={shape.y - 2 / zoom}
                      width={shape.w + 4 / zoom}
                      height={shape.h + 4 / zoom}
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth={2 / zoom}
                      strokeDasharray={`${4 / zoom} ${2 / zoom}`}
                    />
                  )}
                </g>
              );
            })}

            {bridges.map(bridge => (
              <g key={bridge.id} transform={`translate(${bridge.x}, ${bridge.y})`}>
                <path d={getBridgePath(bridge.r, bridge.rotation)} fill={style.fill} />
                {showBridgeDebug && <circle cx={0} cy={0} r={3 / zoom} fill="#ff0" />}
              </g>
            ))}

            {shapes.map(shape => renderResizeHandles(shape))}

            {marquee && marquee.w > 0 && marquee.h > 0 && (
              <rect
                x={marquee.x}
                y={marquee.y}
                width={marquee.w}
                height={marquee.h}
                fill="rgba(168, 85, 247, 0.1)"
                stroke="#A855F7"
                strokeWidth={1 / zoom}
                strokeDasharray={`${4 / zoom} ${2 / zoom}`}
              />
            )}
          </g>
        </svg>

        <Flex position="absolute" bottom={4} left={4} gap={2}>
          <Flex
            as="button"
            align="center"
            gap={1.5}
            bg={showBridgeDebug ? 'rgba(168, 85, 247, 0.15)' : 'rgba(13, 7, 22, 0.9)'}
            border={showBridgeDebug ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
            borderRadius="6px"
            px={2.5}
            py={1.5}
            cursor="pointer"
            onClick={() => onShowBridgeDebugChange?.(!showBridgeDebug)}
            transition="all 0.15s"
            _hover={{ borderColor: 'var(--color-primary)' }}
          >
            <Icon as={showBridgeDebug ? Eye : EyeOff} boxSize={3.5} color="var(--text-muted)" />
            <Text fontSize="11px" color="var(--text-muted)" fontWeight={500}>
              Bridges
            </Text>
          </Flex>
          <Flex
            as="button"
            align="center"
            gap={1.5}
            bg="rgba(13, 7, 22, 0.9)"
            border="1px solid var(--border-primary)"
            borderRadius="6px"
            px={2.5}
            py={1.5}
            cursor="pointer"
            onClick={fitToView}
            transition="all 0.15s"
            _hover={{ borderColor: 'var(--color-primary)' }}
          >
            <Icon as={Maximize2} boxSize={3.5} color="var(--text-muted)" />
            <Text fontSize="11px" color="var(--text-muted)" fontWeight={500}>
              Fit
            </Text>
          </Flex>
        </Flex>

        <Box
          position="absolute"
          bottom={4}
          right={4}
          bg="rgba(13, 7, 22, 0.9)"
          border="1px solid var(--border-primary)"
          borderRadius="6px"
          px={3}
          py={1}
          fontSize="12px"
          color="var(--text-muted)"
          fontWeight={500}
        >
          {Math.round(zoom * 100)}%
        </Box>
      </Box>
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;
