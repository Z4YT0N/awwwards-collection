import { Box, Flex, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Settings, ChevronUp } from 'lucide-react';
import Controls from './Controls';
import Canvas from './Canvas';
import { createRenderer } from './renderer';
import { createInitialState, OVERLAY_TEXTURES } from './types';
import {
  loadImageFromFile,
  loadImageFromURL,
  loadVideoFromFile,
  loadVideoFromURL,
  copyCanvasToClipboard,
  copyDataURLToClipboard,
  exportCanvas,
  isClipboardImageSupported,
  generateProceduralTexture
} from './utils';
import { toaster } from '../../components/setup/toaster';

export default function TextureLab({ toolSelector }) {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const renderTimeoutRef = useRef(null);
  const videoRef = useRef(null);
  const videoAnimationRef = useRef(null);

  const [state, setState] = useState(createInitialState);
  const {
    image,
    video,
    mediaType,
    corsError,
    effects,
    seed,
    previewQuality,
    exportFormat,
    exportQuality,
    exportScale,
    viewMode,
    isPlaying,
    currentTime,
    duration,
    isExporting,
    exportProgress,
    exportStatus
  } = state;

  useEffect(() => {
    if (canvasRef.current && !rendererRef.current) {
      try {
        rendererRef.current = createRenderer(canvasRef.current);
      } catch (err) {
        console.error('Failed to create renderer:', err);
        toaster.create({
          title: 'Renderer Error',
          description: 'Failed to initialize graphics renderer.',
          type: 'error',
          duration: 5000
        });
      }
    }

    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, []);

  const renderPreview = useCallback(() => {
    if (!rendererRef.current) return;

    if (mediaType === 'video' && video) {
      rendererRef.current.updateVideoFrame(video);
      rendererRef.current.render(effects, seed, video.videoWidth, video.videoHeight);
      return;
    }

    if (!image) return;

    let targetWidth = image.width;
    let targetHeight = image.height;

    if (previewQuality === 'draft' && (image.width > 1000 || image.height > 1000)) {
      const scale = Math.min(1000 / image.width, 1000 / image.height);
      targetWidth = Math.round(image.width * scale);
      targetHeight = Math.round(image.height * scale);
    }

    rendererRef.current.render(effects, seed, targetWidth, targetHeight);
  }, [image, video, mediaType, effects, seed, previewQuality]);

  const rafRef = useRef(null);

  useEffect(() => {
    if (mediaType !== 'video' || !video || !isPlaying) {
      if (videoAnimationRef.current) {
        cancelAnimationFrame(videoAnimationRef.current);
        videoAnimationRef.current = null;
      }
      return;
    }

    const updateFrame = () => {
      if (!video.paused && !video.ended) {
        renderPreview();
        setState(s => ({ ...s, currentTime: video.currentTime }));
        videoAnimationRef.current = requestAnimationFrame(updateFrame);
      }
    };

    videoAnimationRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (videoAnimationRef.current) {
        cancelAnimationFrame(videoAnimationRef.current);
      }
    };
  }, [mediaType, video, isPlaying, renderPreview]);

  useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    if (previewQuality === 'draft') {
      rafRef.current = requestAnimationFrame(() => {
        renderPreview();
      });
    } else {
      renderTimeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(() => {
          renderPreview();
        });
      }, 150);
    }

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [renderPreview, previewQuality]);

  const lastOverlayParamsRef = useRef(null);

  useEffect(() => {
    const loadOverlayTextures = async () => {
      if (!rendererRef.current) return;

      const overlayEffect = effects.find(e => e.type === 'overlay' && e.enabled);
      if (!overlayEffect) {
        if (lastOverlayParamsRef.current !== null) {
          rendererRef.current.setOverlayTexture(null);
          lastOverlayParamsRef.current = null;
        }
        return;
      }

      const { texture, customTextureUrl } = overlayEffect.params;
      const paramsKey = `${texture}:${customTextureUrl || ''}`;

      if (lastOverlayParamsRef.current === paramsKey) {
        return;
      }
      lastOverlayParamsRef.current = paramsKey;

      if (texture === OVERLAY_TEXTURES.CUSTOM && customTextureUrl) {
        try {
          const result = await loadImageFromURL(customTextureUrl);
          rendererRef.current.setOverlayTexture(result.image);
          renderPreview();
        } catch {
          console.warn('Failed to load custom overlay texture');
        }
      } else if (texture !== OVERLAY_TEXTURES.CUSTOM) {
        const textureImg = await generateProceduralTexture(texture);
        rendererRef.current.setOverlayTexture(textureImg);
        renderPreview();
      }
    };

    loadOverlayTextures();
  }, [effects, renderPreview]);

  const handleImageLoad = useCallback(async (source, type) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current = null;
    }

    try {
      let result;

      if (type === 'file') {
        result = await loadImageFromFile(source);
      } else {
        result = await loadImageFromURL(source);
      }

      if (rendererRef.current) {
        rendererRef.current.setImage(result.image);
      }

      setState(s => ({
        ...s,
        image: result.image,
        imageUrl: result.url,
        video: null,
        videoUrl: null,
        mediaType: 'image',
        corsError: result.corsError,
        isPlaying: false,
        currentTime: 0,
        duration: 0
      }));

      if (result.corsError) {
        toaster.create({
          title: 'CORS Warning',
          description: 'Image loaded but export/copy disabled. Re-upload locally to enable.',
          type: 'warning',
          duration: 5000
        });
      }
    } catch (err) {
      toaster.create({
        title: 'Failed to load image',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
  }, []);

  const handleVideoLoad = useCallback(async (source, type) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }

    try {
      let result;

      if (type === 'file') {
        result = await loadVideoFromFile(source);
      } else {
        result = await loadVideoFromURL(source);
      }

      videoRef.current = result.video;

      if (rendererRef.current) {
        rendererRef.current.setImage(result.video);
        rendererRef.current.updateVideoFrame(result.video);
        rendererRef.current.render([], 0, result.video.videoWidth, result.video.videoHeight);
      }

      result.video.play();

      setState(s => ({
        ...s,
        image: null,
        imageUrl: null,
        video: result.video,
        videoUrl: result.url,
        mediaType: 'video',
        corsError: result.corsError,
        isPlaying: true,
        currentTime: 0,
        duration: result.duration
      }));

      if (result.corsError) {
        toaster.create({
          title: 'CORS Warning',
          description: 'Video loaded but export disabled. Re-upload locally to enable.',
          type: 'warning',
          duration: 5000
        });
      }
    } catch (err) {
      toaster.create({
        title: 'Failed to load video',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
  }, []);

  const handleMediaLoad = useCallback(
    async (source, type) => {
      if (type === 'file') {
        if (source.type.startsWith('video/')) {
          return handleVideoLoad(source, type);
        }
        return handleImageLoad(source, type);
      }

      const ext = source.split('?')[0].split('.').pop()?.toLowerCase();
      if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
        return handleVideoLoad(source, type);
      }
      return handleImageLoad(source, type);
    },
    [handleImageLoad, handleVideoLoad]
  );

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setState(s => ({ ...s, isPlaying: true }));
    } else {
      videoRef.current.pause();
      setState(s => ({ ...s, isPlaying: false }));
    }
  }, []);

  const handleSeek = useCallback(
    time => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = time;
      setState(s => ({ ...s, currentTime: time }));
      renderPreview();
    },
    [renderPreview]
  );

  const handleEffectsChange = useCallback(newEffects => {
    setState(s => ({ ...s, effects: newEffects }));
  }, []);

  const handleSeedChange = useCallback(newSeed => {
    setState(s => ({ ...s, seed: newSeed }));
  }, []);

  const handlePreviewQualityChange = useCallback(quality => {
    setState(s => ({ ...s, previewQuality: quality }));
  }, []);

  const handleExportFormatChange = useCallback(format => {
    setState(s => ({ ...s, exportFormat: format }));
  }, []);

  const handleExportQualityChange = useCallback(quality => {
    setState(s => ({ ...s, exportQuality: quality }));
  }, []);

  const handleExportScaleChange = useCallback(scale => {
    setState(s => ({ ...s, exportScale: scale }));
  }, []);

  const handleViewModeChange = useCallback(mode => {
    setState(s => ({ ...s, viewMode: mode }));
  }, []);

  const handleCopyToClipboard = useCallback(async () => {
    if (!canvasRef.current || corsError) return;
    if (mediaType === 'video') {
      toaster.create({
        title: 'Cannot copy video',
        description: 'Copy to clipboard only works for images. Use export for video.',
        type: 'warning',
        duration: 3000
      });
      return;
    }

    try {
      if (rendererRef.current && image) {
        rendererRef.current.render(effects, seed, image.width, image.height);
      }

      if (isClipboardImageSupported()) {
        await copyCanvasToClipboard(canvasRef.current);
        toaster.create({
          title: 'Copied to clipboard',
          type: 'success',
          duration: 2000
        });
      } else {
        await copyDataURLToClipboard(canvasRef.current);
        toaster.create({
          title: 'Copied as data URL',
          description: 'Image clipboard not supported in this browser.',
          type: 'info',
          duration: 3000
        });
      }

      renderPreview();
    } catch (err) {
      toaster.create({
        title: 'Copy failed',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
  }, [corsError, mediaType, image, effects, seed, renderPreview]);

  const handleVideoExport = useCallback(async () => {
    if (!canvasRef.current || !video || corsError || isExporting) return;

    setState(s => ({
      ...s,
      isExporting: true,
      exportProgress: 0,
      exportStatus: 'Preparing...'
    }));

    const wasPlaying = !video.paused;
    if (wasPlaying) {
      video.pause();
      setState(s => ({ ...s, isPlaying: false }));
    }

    const wasLooping = video.loop;
    video.loop = false;

    const currentVideo = video;
    const currentCanvas = canvasRef.current;
    const currentRenderer = rendererRef.current;

    let animationId = null;
    let mediaRecorder = null;

    try {
      const videoDuration = currentVideo.duration;

      currentVideo.currentTime = 0;
      await Promise.race([
        new Promise(resolve => {
          const onSeeked = () => {
            currentVideo.removeEventListener('seeked', onSeeked);
            resolve();
          };
          currentVideo.addEventListener('seeked', onSeeked);
        }),
        new Promise(resolve => setTimeout(resolve, 200))
      ]);

      if (currentVideo.currentTime > 0.1) {
        currentVideo.currentTime = 0;
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      currentRenderer.updateVideoFrame(currentVideo);
      currentRenderer.render(effects, seed, currentVideo.videoWidth, currentVideo.videoHeight);

      setState(s => ({ ...s, exportStatus: 'Recording...' }));

      const stream = currentCanvas.captureStream(60);
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 12000000
      });

      const chunks = [];
      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recordingDone = new Promise(resolve => {
        mediaRecorder.onstop = () => resolve(chunks);
      });

      mediaRecorder.start(100);
      await new Promise(resolve => setTimeout(resolve, 50));

      const renderLoop = () => {
        currentRenderer.updateVideoFrame(currentVideo);
        currentRenderer.render(effects, seed, currentVideo.videoWidth, currentVideo.videoHeight);

        const progress = Math.round((currentVideo.currentTime / videoDuration) * 100);
        setState(s => ({
          ...s,
          exportProgress: Math.min(progress, 100),
          exportStatus: 'Exporting...'
        }));

        if (!currentVideo.ended && !currentVideo.paused) {
          animationId = requestAnimationFrame(renderLoop);
        }
      };

      animationId = requestAnimationFrame(renderLoop);

      await currentVideo.play();

      await new Promise(resolve => {
        if (currentVideo.ended) {
          resolve();
          return;
        }
        currentVideo.addEventListener('ended', resolve, { once: true });
      });

      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      currentRenderer.updateVideoFrame(currentVideo);
      currentRenderer.render(effects, seed, currentVideo.videoWidth, currentVideo.videoHeight);

      await new Promise(resolve => setTimeout(resolve, 200));

      mediaRecorder.stop();

      const finalChunks = await recordingDone;

      const webmBlob = new Blob(finalChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(webmBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `texture-lab-${Date.now()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      currentVideo.loop = wasLooping;
      currentVideo.currentTime = 0;
      if (wasPlaying) {
        currentVideo.play();
        setState(s => ({ ...s, isPlaying: true }));
      }
      renderPreview();

      setState(s => ({ ...s, isExporting: false, exportProgress: 0, exportStatus: '' }));
      toaster.create({
        title: 'Video exported',
        description: `Saved as WebM (${(webmBlob.size / 1024 / 1024).toFixed(1)} MB)`,
        type: 'success',
        duration: 2000
      });
    } catch (err) {
      console.error('Video export error:', err);

      if (animationId) cancelAnimationFrame(animationId);
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }

      currentVideo.loop = wasLooping;
      currentVideo.pause();
      currentVideo.currentTime = 0;

      setState(s => ({ ...s, isExporting: false, exportProgress: 0, exportStatus: '' }));
      toaster.create({
        title: 'Video export failed',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
  }, [video, corsError, isExporting, effects, seed, renderPreview]);

  const handleExport = useCallback(async () => {
    if (!canvasRef.current || corsError) return;

    if (mediaType === 'video' && video) {
      return handleVideoExport();
    }

    if (!image) return;

    try {
      const exportWidth = Math.min(image.width * exportScale, 8192);
      const exportHeight = Math.min(image.height * exportScale, 8192);

      if (rendererRef.current) {
        rendererRef.current.render(effects, seed, exportWidth, exportHeight);
      }

      await exportCanvas(canvasRef.current, {
        format: exportFormat,
        quality: exportQuality,
        filename: `texture-lab-${Date.now()}`
      });

      toaster.create({
        title: 'Export complete',
        type: 'success',
        duration: 2000
      });

      renderPreview();
    } catch (err) {
      toaster.create({
        title: 'Export failed',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
  }, [
    image,
    video,
    mediaType,
    corsError,
    exportScale,
    exportFormat,
    exportQuality,
    effects,
    seed,
    renderPreview,
    handleVideoExport
  ]);

  const handleReset = useCallback(() => {
    setState(s => ({
      ...s,
      effects: [],
      seed: Math.floor(Math.random() * 100000),
      previewQuality: 'draft',
      viewMode: 'preview',
      exportFormat: 'png',
      exportQuality: 0.92,
      exportScale: 1
    }));
    if (rendererRef.current) {
      rendererRef.current.setOverlayTexture(null);
    }
  }, []);

  const handleClearMedia = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      if (videoRef.current.src) {
        URL.revokeObjectURL(videoRef.current.src);
      }
      videoRef.current.src = '';
      videoRef.current = null;
    }

    setState(s => ({
      ...s,
      image: null,
      imageUrl: null,
      video: null,
      videoUrl: null,
      mediaType: null,
      corsError: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0
    }));
    if (rendererRef.current) {
      rendererRef.current.setImage(null);
    }
  }, []);

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
          image={image}
          video={video}
          mediaType={mediaType}
          corsError={corsError}
          effects={effects}
          seed={seed}
          previewQuality={previewQuality}
          exportFormat={exportFormat}
          exportQuality={exportQuality}
          exportScale={exportScale}
          isExporting={isExporting}
          exportProgress={exportProgress}
          exportStatus={exportStatus}
          onMediaLoad={handleMediaLoad}
          onClearMedia={handleClearMedia}
          onEffectsChange={handleEffectsChange}
          onSeedChange={handleSeedChange}
          onPreviewQualityChange={handlePreviewQualityChange}
          onExportFormatChange={handleExportFormatChange}
          onExportQualityChange={handleExportQualityChange}
          onExportScaleChange={handleExportScaleChange}
          onCopyToClipboard={handleCopyToClipboard}
          onExport={handleExport}
          onReset={handleReset}
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
          image={image}
          video={video}
          mediaType={mediaType}
          canvasRef={canvasRef}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onMediaDrop={file => handleMediaLoad(file, 'file')}
          onMediaLoad={handleMediaLoad}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          isExporting={isExporting}
        />

        <Flex
          as="button"
          display={{ base: 'flex', lg: 'none' }}
          position="absolute"
          bottom={20}
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
          zIndex={10}
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
              <Text fontSize="16px" fontWeight={700} color="#fff">
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
                _hover={{ bg: 'var(--bg-elevated)' }}
              >
                <Icon as={ChevronUp} boxSize={5} color="var(--text-muted)" />
              </Flex>
            </Flex>

            <Box
              flex={1}
              overflowY="auto"
              px={4}
              py={4}
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              <Controls
                image={image}
                video={video}
                mediaType={mediaType}
                corsError={corsError}
                effects={effects}
                seed={seed}
                previewQuality={previewQuality}
                exportFormat={exportFormat}
                exportQuality={exportQuality}
                exportScale={exportScale}
                isExporting={isExporting}
                exportProgress={exportProgress}
                exportStatus={exportStatus}
                onMediaLoad={handleMediaLoad}
                onClearMedia={handleClearMedia}
                onEffectsChange={handleEffectsChange}
                onSeedChange={handleSeedChange}
                onPreviewQualityChange={handlePreviewQualityChange}
                onExportFormatChange={handleExportFormatChange}
                onExportQualityChange={handleExportQualityChange}
                onExportScaleChange={handleExportScaleChange}
                onCopyToClipboard={handleCopyToClipboard}
                onExport={handleExport}
                onReset={handleReset}
                toolSelector={toolSelector}
              />
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
}
