import { Box, Flex, Text, Icon, Slider } from '@chakra-ui/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, SplitSquareHorizontal, Upload, Maximize, GripVertical, Play, Pause, Eye } from 'lucide-react';

const formatTime = seconds => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function Canvas({
  image,
  video,
  mediaType,
  canvasRef,
  viewMode,
  onViewModeChange,
  onMediaDrop,
  onMediaLoad,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  isExporting
}) {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [splitPosition, setSplitPosition] = useState(0.5);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isDragOver, setIsDragOver] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = mediaType === 'video' ? video : image;
    if (!media || !containerSize.width) return;

    const mediaWidth = media.width || media.videoWidth;
    const mediaHeight = media.height || media.videoHeight;

    const scaleX = (containerSize.width - 40) / mediaWidth;
    const scaleY = (containerSize.height - 40) / mediaHeight;
    const fitZoom = Math.min(scaleX, scaleY, 1);

    setZoom(fitZoom);
    setPan({ x: 0, y: 0 });
  }, [image, video, mediaType, containerSize]);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.min(Math.max(z * delta, 0.1), 10));
  }, []);

  const handleMouseDown = useCallback(
    e => {
      if (e.button === 1 || (e.button === 0 && spaceHeld)) {
        e.preventDefault();
        setIsPanning(true);
        setLastMouse({ x: e.clientX, y: e.clientY });
      }
    },
    [spaceHeld]
  );

  const handleMouseMove = useCallback(
    e => {
      if (isPanning) {
        setPan(p => ({
          x: p.x + (e.clientX - lastMouse.x),
          y: p.y + (e.clientY - lastMouse.y)
        }));
        setLastMouse({ x: e.clientX, y: e.clientY });
      }

      if (isDraggingSplit && canvasWrapperRef.current) {
        const rect = canvasWrapperRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        setSplitPosition(Math.max(0.05, Math.min(0.95, pos)));
      }
    },
    [isPanning, isDraggingSplit, lastMouse]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setIsDraggingSplit(false);
  }, []);

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

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleResetView = useCallback(() => {
    const media = mediaType === 'video' ? video : image;
    if (!media || !containerSize.width) return;

    const mediaWidth = media.width || media.videoWidth;
    const mediaHeight = media.height || media.videoHeight;

    const scaleX = (containerSize.width - 40) / mediaWidth;
    const scaleY = (containerSize.height - 40) / mediaHeight;
    setZoom(Math.min(scaleX, scaleY, 1));
    setPan({ x: 0, y: 0 });
  }, [image, video, mediaType, containerSize]);

  const handleDragOver = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!isExporting && e.dataTransfer.types.includes('Files')) {
        setIsDragOver(true);
      }
    },
    [isExporting]
  );

  const handleDragLeave = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (isExporting) return;

      const file = e.dataTransfer.files?.[0];
      if (file && (file.type.startsWith('image/') || file.type.startsWith('video/')) && onMediaDrop) {
        onMediaDrop(file);
      }
    },
    [onMediaDrop, isExporting]
  );

  const fileInputRef = useRef(null);
  const handleFileSelect = useCallback(
    e => {
      const file = e.target.files?.[0];
      if (file) {
        onMediaLoad(file, 'file');
      }
      e.target.value = '';
    },
    [onMediaLoad]
  );

  return (
    <Box
      ref={containerRef}
      position="relative"
      w="100%"
      h="100%"
      bg="var(--bg-body)"
      overflow="hidden"
      cursor={isPanning ? 'grabbing' : spaceHeld ? 'grab' : 'default'}
      onMouseDown={handleMouseDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(168, 85, 247, 0.15)"
          zIndex={100}
          align="center"
          justify="center"
          pointerEvents="none"
        >
          <Text fontSize="lg" fontWeight={600} color="#A855F7">
            Drop image or video here
          </Text>
        </Flex>
      )}

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.25}
        pointerEvents="none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-primary) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}
      />

      <Flex
        ref={canvasWrapperRef}
        position="absolute"
        top="50%"
        left="50%"
        transform={`translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`}
        transformOrigin="center"
        transition={isPanning ? 'none' : 'transform 0.1s ease-out'}
        style={{ background: 'none' }}
        display={image || video ? 'flex' : 'none'}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            borderRadius: '4px'
          }}
        />

        {viewMode === 'split' && image && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="hidden"
            borderRadius="4px"
            pointerEvents="none"
            style={{ background: 'none' }}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              h="100%"
              w="100%"
              style={{
                background: 'none',
                clipPath: `inset(0 ${(1 - splitPosition) * 100}% 0 0)`
              }}
            >
              <img
                src={image.src}
                alt="Original"
                draggable={false}
                onDragStart={e => e.preventDefault()}
                style={{
                  width: canvasRef.current?.width || image.width,
                  height: canvasRef.current?.height || image.height,
                  display: 'block',
                  background: 'none',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              />
            </Box>

            <Box
              position="absolute"
              top={0}
              bottom={0}
              left={`${splitPosition * 100}%`}
              transform="translateX(-50%)"
              w="2px"
              bg="white"
              boxShadow="0 0 8px rgba(0,0,0,0.5)"
              pointerEvents="auto"
              cursor="ew-resize"
              onMouseDown={e => {
                e.stopPropagation();
                setIsDraggingSplit(true);
              }}
              zIndex={10}
            />

            <Flex
              position="absolute"
              top="50%"
              left={`${splitPosition * 100}%`}
              transform="translate(-50%, -50%)"
              w="32px"
              h="32px"
              bg="white"
              borderRadius="50%"
              align="center"
              justify="center"
              cursor="ew-resize"
              pointerEvents="auto"
              boxShadow="0 2px 12px rgba(0,0,0,0.5)"
              zIndex={11}
              onMouseDown={e => {
                e.stopPropagation();
                setIsDraggingSplit(true);
              }}
              _hover={{ bg: '#f0f0f0' }}
              transition="background 0.15s"
            >
              <Icon as={GripVertical} boxSize={4} color="#000" />
            </Flex>

            <Box
              position="absolute"
              top={2}
              left={2}
              bg="rgba(0,0,0,0.7)"
              px={2}
              py={0.5}
              borderRadius="4px"
              pointerEvents="none"
            >
              <Text fontSize="10px" color="#fff" fontWeight={600}>
                ORIGINAL
              </Text>
            </Box>
            <Box
              position="absolute"
              top={2}
              right={2}
              bg="rgba(168, 85, 247, 0.8)"
              px={2}
              py={0.5}
              borderRadius="4px"
              pointerEvents="none"
            >
              <Text fontSize="10px" color="#fff" fontWeight={600}>
                EFFECT
              </Text>
            </Box>
          </Box>
        )}

        {viewMode === 'before-after' && image && (
          <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none">
            <img
              src={image.src}
              alt="Original"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0,
                transition: 'opacity 0.2s'
              }}
              className="before-image"
            />
          </Box>
        )}
      </Flex>

      {!image && !video && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          align="center"
          justify="center"
          direction="column"
          gap={1}
          as= "button"
          cursor="pointer"
          onClick={() => fileInputRef.current?.click()}
        >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/ogg"
              style={{ display: 'none' }}
            />
            <Box w="60px" h="60px" borderRadius="16px" display="flex" alignItems="center" justifyContent="center">
              <Icon as={Upload} boxSize={8} color="var(--border-primary)" />
            </Box>
            <Text fontSize="14px" color="var(--text-muted)" textAlign="center">
              Upload an image/video
              <br />
              to get started
            </Text>
        </Flex>
      )}

      <Flex
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        gap={1}
        bg="rgba(13, 7, 22, 0.9)"
        borderRadius="8px"
        border="1px solid var(--border-primary)"
        p={1}
        align="center"
      >
        {mediaType === 'video' && video && (
          <>
            <Flex
              as="button"
              align="center"
              justify="center"
              w={7}
              h={7}
              borderRadius="4px"
              cursor={isExporting ? 'not-allowed' : 'pointer'}
              bg="rgba(168, 85, 247, 0.2)"
              onClick={isExporting ? undefined : onPlayPause}
              transition="all 0.15s"
              _hover={{ bg: isExporting ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.4)' }}
              opacity={isExporting ? 0.5 : 1}
            >
              <Icon as={isPlaying ? Pause : Play} boxSize={4} color="var(--color-accent)" />
            </Flex>
            <Flex align="center" gap={2} px={2} minW="180px" opacity={isExporting ? 0.5 : 1}>
              <Text fontSize="10px" color="var(--text-muted)" fontFamily="mono" minW="32px">
                {formatTime(currentTime)}
              </Text>
              <Slider.Root
                value={[currentTime]}
                onValueChange={isExporting ? undefined : ({ value: v }) => onSeek(v[0])}
                min={0}
                max={duration || 1}
                step={0.1}
                flex={1}
                disabled={isExporting}
              >
                <Slider.Control css={{ cursor: isExporting ? 'not-allowed' : 'pointer' }}>
                  <Slider.Track bg="var(--bg-elevated)" h="4px" borderRadius="2px">
                    <Slider.Range bg="var(--color-primary)" />
                  </Slider.Track>
                  <Slider.Thumb
                    index={0}
                    boxSize={2.5}
                    bg="#fff"
                    borderRadius="full"
                    css={{ display: isExporting ? 'none' : 'block' }}
                  />
                </Slider.Control>
              </Slider.Root>
              <Text fontSize="10px" color="var(--text-muted)" fontFamily="mono" minW="32px">
                {formatTime(duration)}
              </Text>
            </Flex>
            <Box w="1px" h={5} bg="var(--border-primary)" mx={1} />
          </>
        )}
        <ControlButton icon={ZoomOut} onClick={() => setZoom(z => Math.max(z * 0.8, 0.1))} />
        <Flex align="center" justify="center" px={2} minW="50px">
          <Text fontSize="11px" color="var(--text-muted)" fontFamily="mono">
            {Math.round(zoom * 100)}%
          </Text>
        </Flex>
        <ControlButton icon={ZoomIn} onClick={() => setZoom(z => Math.min(z * 1.2, 10))} />
        <Box w="1px" h={5} bg="var(--border-primary)" mx={1} />
        <ControlButton icon={Maximize} onClick={handleResetView} />
        {mediaType !== 'video' && (
          <>
            <Box w="1px" h={5} bg="var(--border-primary)" mx={1} />
            <ControlButton icon={Eye} isActive={viewMode === 'preview'} onClick={() => onViewModeChange('preview')} />
            <ControlButton
              icon={SplitSquareHorizontal}
              isActive={viewMode === 'split'}
              onClick={() => onViewModeChange('split')}
            />
          </>
        )}
      </Flex>

      <Text
        position="absolute"
        bottom={4}
        right={4}
        fontSize="10px"
        color="var(--border-primary)"
        display={{ base: 'none', lg: 'block' }}
      >
        Scroll to zoom • Space + Drag to pan
      </Text>
    </Box>
  );
}

const ControlButton = ({ icon: IconComponent, onClick, isActive }) => (
  <Flex
    as="button"
    align="center"
    justify="center"
    w={7}
    h={7}
    borderRadius="4px"
    cursor="pointer"
    bg={isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent'}
    onClick={onClick}
    transition="all 0.15s"
    _hover={{ bg: isActive ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255,255,255,0.1)' }}
  >
    <Icon as={IconComponent} boxSize={4} color={isActive ? 'var(--color-accent)' : 'var(--text-muted)'} />
  </Flex>
);
