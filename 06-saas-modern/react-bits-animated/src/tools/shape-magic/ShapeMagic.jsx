import { Box, Flex, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Settings, ChevronUp } from 'lucide-react';
import Canvas from './Canvas';
import Controls from './Controls';
import { computeBridges, computeCornerRadii } from './computeBridges';
import { createInitialState, createShape } from './types';

const useHistory = initialState => {
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const current = history[historyIndex];

  const push = useCallback(
    newState => {
      setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
      setHistoryIndex(prev => prev + 1);
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  }, [historyIndex, history.length]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return { current, push, undo, redo, canUndo, canRedo };
};

export default function ShapeMagic({ toolSelector }) {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const canvasRef = useRef(null);

  const initialState = useMemo(() => createInitialState(), []);
  const { current: state, push: pushState, undo, redo } = useHistory(initialState);

  const [shapes, setShapes] = useState(state.shapes);
  const [selectedIds, setSelectedIds] = useState([]);
  const [style, setStyle] = useState(state.style);
  const [globalRadius, setGlobalRadius] = useState(state.globalRadius);
  const [showBridgeDebug, setShowBridgeDebug] = useState(false);

  const justPushedRef = useRef(false);

  const snapToGrid = true;
  const gridSize = 10;
  const tolerance = 1;

  useEffect(() => {
    if (justPushedRef.current) {
      justPushedRef.current = false;
      return;
    }
    setShapes(state.shapes);
    setStyle(state.style);
    setGlobalRadius(state.globalRadius);
  }, [state]);

  const bridges = useMemo(() => {
    return computeBridges(shapes, globalRadius, tolerance);
  }, [shapes, globalRadius, tolerance]);

  const cornerRadii = useMemo(() => {
    return computeCornerRadii(shapes, globalRadius, tolerance);
  }, [shapes, globalRadius, tolerance]);

  const saveToHistory = useCallback(
    (newShapes, newStyle, newRadius) => {
      justPushedRef.current = true;
      pushState({
        shapes: newShapes ?? shapes,
        style: newStyle ?? style,
        globalRadius: newRadius ?? globalRadius
      });
    },
    [pushState, shapes, style, globalRadius]
  );

  const handleAddShape = useCallback(() => {
    const newShape = createShape(100 + Math.random() * 200, 100 + Math.random() * 200, 120, 80);
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    setSelectedIds([newShape.id]);
    saveToHistory(newShapes);
  }, [shapes, saveToHistory]);

  const handleDeleteShapes = useCallback(() => {
    if (selectedIds.length === 0) return;
    const newShapes = shapes.filter(s => !selectedIds.includes(s.id));
    setShapes(newShapes);
    setSelectedIds([]);
    saveToHistory(newShapes);
  }, [shapes, selectedIds, saveToHistory]);

  const handleDuplicateShapes = useCallback(() => {
    if (selectedIds.length === 0) return;
    const duplicates = shapes
      .filter(s => selectedIds.includes(s.id))
      .map(s => ({
        ...s,
        id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        x: s.x + 20,
        y: s.y + 20
      }));
    const newShapes = [...shapes, ...duplicates];
    setShapes(newShapes);
    setSelectedIds(duplicates.map(s => s.id));
    saveToHistory(newShapes);
  }, [shapes, selectedIds, saveToHistory]);

  const handleShapeUpdate = useCallback((id, updates) => {
    setShapes(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const handleDragEnd = useCallback(() => {
    saveToHistory(shapes);
  }, [shapes, saveToHistory]);

  const handleAlignShapes = useCallback(
    alignment => {
      if (selectedIds.length < 2) return;

      const selected = shapes.filter(s => selectedIds.includes(s.id));
      const bounds = {
        minX: Math.min(...selected.map(s => s.x)),
        maxX: Math.max(...selected.map(s => s.x + s.w)),
        minY: Math.min(...selected.map(s => s.y)),
        maxY: Math.max(...selected.map(s => s.y + s.h))
      };

      const newShapes = shapes.map(s => {
        if (!selectedIds.includes(s.id)) return s;

        switch (alignment) {
          case 'left':
            return { ...s, x: bounds.minX };
          case 'right':
            return { ...s, x: bounds.maxX - s.w };
          case 'centerH':
            return { ...s, x: bounds.minX + (bounds.maxX - bounds.minX) / 2 - s.w / 2 };
          case 'top':
            return { ...s, y: bounds.minY };
          case 'bottom':
            return { ...s, y: bounds.maxY - s.h };
          case 'centerV':
            return { ...s, y: bounds.minY + (bounds.maxY - bounds.minY) / 2 - s.h / 2 };
          default:
            return s;
        }
      });
      setShapes(newShapes);
      saveToHistory(newShapes);
    },
    [shapes, selectedIds, saveToHistory]
  );

  const handleDistributeShapes = useCallback(
    direction => {
      if (selectedIds.length < 3) return;

      const selected = shapes
        .filter(s => selectedIds.includes(s.id))
        .sort((a, b) => (direction === 'horizontal' ? a.x - b.x : a.y - b.y));

      if (direction === 'horizontal') {
        const minX = selected[0].x;
        const maxX = selected[selected.length - 1].x + selected[selected.length - 1].w;
        const totalShapeWidth = selected.reduce((sum, s) => sum + s.w, 0);
        const totalGap = maxX - minX - totalShapeWidth;
        const gapBetween = totalGap / (selected.length - 1);

        let currentX = minX;
        const positions = {};
        selected.forEach(s => {
          positions[s.id] = currentX;
          currentX += s.w + gapBetween;
        });

        const newShapes = shapes.map(s => {
          if (positions[s.id] !== undefined) {
            return { ...s, x: positions[s.id] };
          }
          return s;
        });
        setShapes(newShapes);
        saveToHistory(newShapes);
      } else {
        const minY = selected[0].y;
        const maxY = selected[selected.length - 1].y + selected[selected.length - 1].h;
        const totalShapeHeight = selected.reduce((sum, s) => sum + s.h, 0);
        const totalGap = maxY - minY - totalShapeHeight;
        const gapBetween = totalGap / (selected.length - 1);

        let currentY = minY;
        const positions = {};
        selected.forEach(s => {
          positions[s.id] = currentY;
          currentY += s.h + gapBetween;
        });

        const newShapes = shapes.map(s => {
          if (positions[s.id] !== undefined) {
            return { ...s, y: positions[s.id] };
          }
          return s;
        });
        setShapes(newShapes);
        saveToHistory(newShapes);
      }
    },
    [shapes, selectedIds, saveToHistory]
  );

  const clipboardRef = useRef([]);

  const handleCopyShapes = useCallback(() => {
    if (selectedIds.length === 0) return;
    const copiedShapes = shapes.filter(s => selectedIds.includes(s.id)).map(s => ({ ...s }));
    clipboardRef.current = copiedShapes;
  }, [shapes, selectedIds]);

  const handlePasteShapes = useCallback(() => {
    if (clipboardRef.current.length === 0) return;

    const pastedShapes = clipboardRef.current.map(s => ({
      ...s,
      id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: s.x + 20,
      y: s.y + 20
    }));

    clipboardRef.current = pastedShapes.map(s => ({ ...s }));

    const newShapes = [...shapes, ...pastedShapes];
    setShapes(newShapes);
    setSelectedIds(pastedShapes.map(s => s.id));
    saveToHistory(newShapes);
  }, [shapes, saveToHistory]);

  const handleAltDragDuplicate = useCallback(
    shapeIds => {
      if (shapeIds.length === 0) return [];

      const duplicates = shapes
        .filter(s => shapeIds.includes(s.id))
        .map(s => ({
          ...s,
          id: `shape-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));

      const newShapes = [...shapes, ...duplicates];
      setShapes(newShapes);
      setSelectedIds(duplicates.map(s => s.id));

      return duplicates;
    },
    [shapes]
  );

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
        if (document.activeElement?.tagName !== 'INPUT') {
          e.preventDefault();
          handleDeleteShapes();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        handleDuplicateShapes();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        if (document.activeElement?.tagName !== 'INPUT' && selectedIds.length > 0) {
          e.preventDefault();
          handleCopyShapes();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        if (document.activeElement?.tagName !== 'INPUT' && clipboardRef.current.length > 0) {
          e.preventDefault();
          handlePasteShapes();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedIds, handleDeleteShapes, handleDuplicateShapes, handleCopyShapes, handlePasteShapes]);

  return (
    <Flex
      h="100%"
      w="100%"
      gap={{ base: 0, lg: 4 }}
      direction={{ base: 'column', lg: 'row' }}
      position="relative"
      overflow="hidden"
    >
      <Box
        w="280px"
        flexShrink={0}
        h="100%"
        overflow="hidden"
        display={{ base: 'none', lg: 'flex' }}
        flexDirection="column"
      >
        <Controls
          shapes={shapes}
          bridges={bridges}
          cornerRadii={cornerRadii}
          selectedIds={selectedIds}
          style={style}
          globalRadius={globalRadius}
          onAddShape={handleAddShape}
          onDeleteShapes={handleDeleteShapes}
          onDuplicateShapes={handleDuplicateShapes}
          onStyleChange={setStyle}
          onGlobalRadiusChange={setGlobalRadius}
          onShapeUpdate={handleShapeUpdate}
          onAlignShapes={handleAlignShapes}
          onDistributeShapes={handleDistributeShapes}
          toolSelector={toolSelector}
        />
      </Box>

      <Box
        flex={1}
        position="relative"
        borderRadius={{ base: '12px', lg: '16px' }}
        overflow="hidden"
        border="1px solid var(--border-primary)"
        bg="var(--bg-body)"
        maxWidth="1920px"
        margin="0 auto"
        width="100%"
        minH={{ base: '400px', lg: 'auto' }}
      >
        <Canvas
          ref={canvasRef}
          shapes={shapes}
          bridges={bridges}
          cornerRadii={cornerRadii}
          globalRadius={globalRadius}
          style={style}
          selectedIds={selectedIds}
          onShapeUpdate={handleShapeUpdate}
          onSelectionChange={setSelectedIds}
          onDragEnd={handleDragEnd}
          onAltDragDuplicate={handleAltDragDuplicate}
          snapToGrid={snapToGrid}
          gridSize={gridSize}
          showBridgeDebug={showBridgeDebug}
          onShowBridgeDebugChange={setShowBridgeDebug}
        />

        <Flex
          as="button"
          display={{ base: 'flex', lg: 'none' }}
          position="absolute"
          bottom={4}
          right={4}
          align="center"
          gap={2}
          bg="var(--color-primary)"
          px={4}
          py={2.5}
          borderRadius="12px"
          cursor="pointer"
          onClick={() => setMobileControlsOpen(true)}
          boxShadow="0 4px 20px rgba(168, 85, 247, 0.4)"
          _active={{ transform: 'scale(0.95)' }}
          transition="transform 0.1s"
        >
          <Icon as={Settings} boxSize={4} color="#fff" />
          <Text fontSize="13px" fontWeight={600} color="#fff">
            Controls
          </Text>
        </Flex>
      </Box>

      {isMobile && (
        <>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.6)"
            opacity={mobileControlsOpen ? 1 : 0}
            visibility={mobileControlsOpen ? 'visible' : 'hidden'}
            transition="all 0.3s"
            zIndex={999}
            onClick={() => setMobileControlsOpen(false)}
          />

          <Box
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            bg="var(--bg-card)"
            borderTop="1px solid var(--border-primary)"
            borderTopRadius="24px"
            transform={mobileControlsOpen ? 'translateY(0)' : 'translateY(100%)'}
            transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            zIndex={1000}
            maxH="85vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Flex justify="center" pt={3} pb={2} cursor="pointer" onClick={() => setMobileControlsOpen(false)}>
              <Box w="40px" h="4px" bg="var(--border-primary)" borderRadius="2px" />
            </Flex>

            <Flex align="center" justify="space-between" px={4} pb={3} borderBottom="1px solid var(--border-primary)">
              <Text fontSize="16px" fontWeight={700} color="var(--text-primary)">
                Controls
              </Text>
              <Flex
                as="button"
                align="center"
                justify="center"
                w={8}
                h={8}
                borderRadius="8px"
                bg="var(--bg-elevated)"
                cursor="pointer"
                onClick={() => setMobileControlsOpen(false)}
                _hover={{ bg: 'var(--bg-card)' }}
              >
                <Icon as={ChevronUp} boxSize={5} color="var(--text-muted)" />
              </Flex>
            </Flex>

            <Box flex={1} overflow="hidden" px={4} py={4}>
              <Controls
                shapes={shapes}
                bridges={bridges}
                cornerRadii={cornerRadii}
                selectedIds={selectedIds}
                style={style}
                globalRadius={globalRadius}
                onAddShape={handleAddShape}
                onDeleteShapes={handleDeleteShapes}
                onDuplicateShapes={handleDuplicateShapes}
                onStyleChange={setStyle}
                onGlobalRadiusChange={setGlobalRadius}
                onShapeUpdate={handleShapeUpdate}
                onAlignShapes={handleAlignShapes}
                onDistributeShapes={handleDistributeShapes}
                toolSelector={toolSelector}
              />
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
}
