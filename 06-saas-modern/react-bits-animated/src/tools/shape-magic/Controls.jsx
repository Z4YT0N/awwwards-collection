import { Box, Flex, Text, Icon, Input, Kbd } from '@chakra-ui/react';
import {
  Plus,
  Trash2,
  Copy,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignHorizontalSpaceAround,
  AlignVerticalSpaceAround,
  Code2,
  Download,
  Keyboard,
  Merge,
  ChevronUp,
  FileCode2,
  Image
} from 'lucide-react';
import { useState, useCallback } from 'react';
import {
  generateMergedSVG,
  generateMergedClipPathSVG,
  generateReactComponent,
  generateCSSClipPath
} from './svgRenderers';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

const ColorInput = ({ label, value, onChange }) => (
  <PreviewColorPickerCustom title={label} color={value} onChange={onChange} />
);

const NumberInput = ({ label, value, onChange, min, max, step = 1 }) => (
  <Flex align="center" gap={2} flex={1} minW={0}>
    <Text fontSize="12px" color="var(--text-muted)" minW="24px" flexShrink={0}>
      {label}
    </Text>
    <Input
      type="number"
      value={Math.round(value)}
      onChange={e => onChange(parseFloat(e.target.value) || 0)}
      min={min}
      max={max}
      step={step}
      size="sm"
      bg="var(--bg-elevated)"
      border="1px solid var(--border-primary)"
      borderRadius="6px"
      color="var(--text-primary)"
      fontSize="12px"
      px={2}
      h="32px"
      flex={1}
      minW={0}
      _focus={{ borderColor: 'var(--color-primary)', boxShadow: 'none' }}
    />
  </Flex>
);

const ToggleButton = ({ icon: IconComponent, label, isActive, onClick, disabled, flex }) => (
  <Flex
    as="button"
    type="button"
    align="center"
    justify="center"
    gap={1.5}
    px={2.5}
    py={1.5}
    flex={flex}
    bg={isActive ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-elevated)'}
    border={isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
    borderRadius="var(--radius-sm)"
    cursor={disabled ? 'not-allowed' : 'pointer'}
    opacity={disabled ? 0.5 : 1}
    onClick={disabled ? undefined : onClick}
    transition="all 0.15s"
    _hover={{ borderColor: disabled ? 'var(--border-primary)' : 'var(--color-primary)' }}
  >
    <Icon as={IconComponent} boxSize={3.5} color={isActive ? 'var(--color-primary)' : 'var(--text-muted)'} />
    {label && (
      <Text fontSize="11px" color={isActive ? 'var(--color-primary)' : 'var(--text-muted)'}>
        {label}
      </Text>
    )}
  </Flex>
);

const SectionHeader = ({ children }) => (
  <Text fontSize="11px" color="var(--text-muted)" fontWeight={600} mb={3} textTransform="uppercase" letterSpacing="0.5px">
    {children}
  </Text>
);

const StyledKbd = ({ children }) => (
  <Kbd
    bg="var(--bg-card)"
    borderColor="var(--border-primary)"
    color="var(--color-accent)"
    fontSize="11px"
    fontWeight={500}
    px={1.5}
    py={0.5}
    borderRadius="4px"
  >
    {children}
  </Kbd>
);

export default function Controls({
  shapes,
  bridges,
  cornerRadii,
  selectedIds,
  style,
  globalRadius,
  onAddShape,
  onDeleteShapes,
  onDuplicateShapes,
  onStyleChange,
  onGlobalRadiusChange,
  onShapeUpdate,
  onAlignShapes,
  onDistributeShapes,
  toolSelector,
  disabled = false
}) {
  const [copyStatus, setCopyStatus] = useState(null);
  const [shortcutsHovered, setShortcutsHovered] = useState(false);

  const selectedShape = shapes.find(s => s.id === selectedIds[0]);
  const hasMultiSelection = selectedIds.length > 1;

  const handleCopySVG = useCallback(() => {
    const svg = generateMergedSVG(shapes, bridges, cornerRadii || {}, style, globalRadius);
    navigator.clipboard.writeText(svg);
    setCopyStatus('svg');
    setTimeout(() => setCopyStatus(null), 2000);
  }, [shapes, bridges, cornerRadii, globalRadius, style]);

  const handleCopyReact = useCallback(() => {
    const code = generateReactComponent(shapes, bridges, cornerRadii || {}, style, globalRadius);
    navigator.clipboard.writeText(code);
    setCopyStatus('react');
    setTimeout(() => setCopyStatus(null), 2000);
  }, [shapes, bridges, cornerRadii, globalRadius, style]);

  const handleCopyMerged = useCallback(() => {
    const svg = generateMergedClipPathSVG(shapes, bridges, cornerRadii || {}, style, globalRadius);
    navigator.clipboard.writeText(svg);
    setCopyStatus('merged');
    setTimeout(() => setCopyStatus(null), 2000);
  }, [shapes, bridges, cornerRadii, globalRadius, style]);

  const handleDownloadSVG = useCallback(() => {
    const svg = generateMergedSVG(shapes, bridges, cornerRadii || {}, style, globalRadius);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'merged-shape.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [shapes, bridges, cornerRadii, globalRadius, style]);

  const handleCopyCSS = useCallback(() => {
    const css = generateCSSClipPath(shapes, bridges, cornerRadii || {}, globalRadius);
    navigator.clipboard.writeText(css);
    setCopyStatus('css');
    setTimeout(() => setCopyStatus(null), 2000);
  }, [shapes, bridges, cornerRadii, globalRadius]);

  const handleDownloadPNG = useCallback(() => {
    const svg = generateMergedSVG(shapes, bridges, cornerRadii || {}, style, globalRadius);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.onload = () => {
      const scale = 2; // 2x resolution
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(pngBlob => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const link = document.createElement('a');
        link.download = 'merged-shape.png';
        link.href = pngUrl;
        link.click();
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    };
    img.src = url;
  }, [shapes, bridges, cornerRadii, globalRadius, style]);

  const hasThreeOrMoreSelected = selectedIds.length >= 3;

  return (
    <Flex
      direction="column"
      h="100%"
      overflow="hidden"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      transition="opacity 0.2s"
    >
      {toolSelector && (
        <Box mb={4} flexShrink={0}>
          {toolSelector}
        </Box>
      )}

      <Box
        flex={1}
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        {/* Toolbar */}
        <SectionHeader>Tools</SectionHeader>
        <Flex gap={2} mb={4}>
          <ToggleButton icon={Plus} label="Add" onClick={onAddShape} flex={1} />
          <ToggleButton icon={Trash2} label="Delete" onClick={onDeleteShapes} isActive={false} flex={1} />
          <ToggleButton icon={Copy} label="Duplicate" onClick={onDuplicateShapes} flex={1} />
        </Flex>

        {hasMultiSelection && (
          <>
            <SectionHeader>Align</SectionHeader>
            <Flex gap={2} mb={4} flexWrap="wrap">
              <ToggleButton icon={AlignHorizontalJustifyStart} onClick={() => onAlignShapes('left')} />
              <ToggleButton icon={AlignHorizontalJustifyCenter} onClick={() => onAlignShapes('centerH')} />
              <ToggleButton icon={AlignHorizontalJustifyEnd} onClick={() => onAlignShapes('right')} />
              <ToggleButton icon={AlignVerticalJustifyStart} onClick={() => onAlignShapes('top')} />
              <ToggleButton icon={AlignVerticalJustifyCenter} onClick={() => onAlignShapes('centerV')} />
              <ToggleButton icon={AlignVerticalJustifyEnd} onClick={() => onAlignShapes('bottom')} />
            </Flex>
            {hasThreeOrMoreSelected && (
              <>
                <SectionHeader>Distribute</SectionHeader>
                <Flex gap={2} mb={4}>
                  <ToggleButton
                    icon={AlignHorizontalSpaceAround}
                    label="Horizontal"
                    onClick={() => onDistributeShapes('horizontal')}
                    flex={1}
                  />
                  <ToggleButton
                    icon={AlignVerticalSpaceAround}
                    label="Vertical"
                    onClick={() => onDistributeShapes('vertical')}
                    flex={1}
                  />
                </Flex>
              </>
            )}
          </>
        )}

        {selectedShape && !hasMultiSelection && (
          <>
            <SectionHeader>Selected Shape</SectionHeader>
            <Flex direction="column" gap={2} mb={4}>
              <Flex gap={2}>
                <NumberInput
                  label="X"
                  value={selectedShape.x}
                  onChange={v => onShapeUpdate(selectedShape.id, { x: v })}
                />
                <NumberInput
                  label="Y"
                  value={selectedShape.y}
                  onChange={v => onShapeUpdate(selectedShape.id, { y: v })}
                />
              </Flex>
              <Flex gap={2}>
                <NumberInput
                  label="W"
                  value={selectedShape.w}
                  onChange={v => onShapeUpdate(selectedShape.id, { w: Math.max(20, v) })}
                  min={20}
                />
                <NumberInput
                  label="H"
                  value={selectedShape.h}
                  onChange={v => onShapeUpdate(selectedShape.id, { h: Math.max(20, v) })}
                  min={20}
                />
              </Flex>
              <NumberInput
                label="Radius"
                value={selectedShape.r !== undefined ? selectedShape.r : globalRadius}
                onChange={v => onShapeUpdate(selectedShape.id, { r: v })}
                min={0}
              />
            </Flex>
          </>
        )}

        <SectionHeader>Style</SectionHeader>
        <Flex direction="column" gap={2} mb={4}>
          <ColorInput label="Fill" value={style.fill} onChange={v => onStyleChange({ ...style, fill: v })} />
        </Flex>

        <SectionHeader>Settings</SectionHeader>
        <Flex direction="column" gap={2} mb={4}>
          <NumberInput label="Radius" value={globalRadius} onChange={onGlobalRadiusChange} min={0} max={100} />
        </Flex>
      </Box>

      <Box
        bg="var(--bg-elevated)"
        border="1px solid var(--border-primary)"
        borderRadius="var(--radius-sm)"
        mb={4}
        flexShrink={0}
        overflow="hidden"
        onMouseEnter={() => setShortcutsHovered(true)}
        onMouseLeave={() => setShortcutsHovered(false)}
        transition="all 0.2s ease"
      >
        <Flex align="center" justify="space-between" gap={1.5} p={3} cursor="pointer">
          <Flex align="center" gap={1.5}>
            <Icon as={Keyboard} boxSize={3} color="var(--text-muted)" />
            <Text fontSize="10px" color="var(--text-muted)" fontWeight={600} textTransform="uppercase" letterSpacing="0.5px">
              Shortcuts
            </Text>
          </Flex>
          <Icon
            as={ChevronUp}
            boxSize={3}
            color="var(--text-muted)"
            transform={shortcutsHovered ? 'rotate(0deg)' : 'rotate(180deg)'}
            transition="transform 0.2s ease"
          />
        </Flex>
        <Box
          maxH={shortcutsHovered ? '200px' : '0px'}
          opacity={shortcutsHovered ? 1 : 0}
          overflow="hidden"
          transition="all 0.2s ease"
          px={3}
          pb={shortcutsHovered ? 3 : 0}
        >
          <Flex direction="column" gap={1.5}>
            <Flex justify="space-between" align="center">
              <Text fontSize="12px" color="var(--text-muted)">
                Undo
              </Text>
              <Flex gap={1}>
                <StyledKbd>⌘</StyledKbd>
                <StyledKbd>Z</StyledKbd>
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="12px" color="var(--text-muted)">
                Redo
              </Text>
              <Flex gap={1}>
                <StyledKbd>⌘</StyledKbd>
                <StyledKbd>⇧</StyledKbd>
                <StyledKbd>Z</StyledKbd>
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="12px" color="var(--text-muted)">
                Duplicate
              </Text>
              <Flex gap={1}>
                <StyledKbd>⌘</StyledKbd>
                <StyledKbd>D</StyledKbd>
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="12px" color="var(--text-muted)">
                Delete
              </Text>
              <StyledKbd>⌫</StyledKbd>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="12px" color="var(--text-muted)">
                Pan
              </Text>
              <Flex gap={1} align="center">
                <StyledKbd>Space+Drag</StyledKbd>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box pt={4} borderTop="1px solid var(--border-primary)" flexShrink={0}>
        <SectionHeader>Export</SectionHeader>
        <Flex direction="column" gap={2}>
          <Flex
            as="button"
            align="center"
            justify="center"
            gap={2}
            bg={copyStatus === 'merged' ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-elevated)'}
            border={copyStatus === 'merged' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
            borderRadius="var(--radius-sm)"
            py={2}
            cursor="pointer"
            onClick={handleCopyMerged}
            transition="all 0.15s"
            _hover={{ borderColor: 'var(--color-primary)' }}
          >
            <Icon as={Merge} boxSize={4} color="var(--text-muted)" />
            <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
              {copyStatus === 'merged' ? 'Copied!' : 'Merge & Copy (Mask-Ready)'}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Flex
              as="button"
              flex={1}
              align="center"
              justify="center"
              gap={2}
              bg={copyStatus === 'svg' ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-elevated)'}
              border={copyStatus === 'svg' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
              borderRadius="var(--radius-sm)"
              py={2}
              cursor="pointer"
              onClick={handleCopySVG}
              transition="all 0.15s"
              _hover={{ borderColor: 'var(--color-primary)' }}
            >
              <Icon as={Code2} boxSize={4} color="var(--text-muted)" />
              <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
                {copyStatus === 'svg' ? 'Copied!' : 'Copy SVG'}
              </Text>
            </Flex>
            <Flex
              as="button"
              flex={1}
              align="center"
              justify="center"
              gap={2}
              bg={copyStatus === 'react' ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-elevated)'}
              border={copyStatus === 'react' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
              borderRadius="var(--radius-sm)"
              py={2}
              cursor="pointer"
              onClick={handleCopyReact}
              transition="all 0.15s"
              _hover={{ borderColor: 'var(--color-primary)' }}
            >
              <Icon as={Code2} boxSize={4} color="var(--text-muted)" />
              <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
                {copyStatus === 'react' ? 'Copied!' : 'Copy React'}
              </Text>
            </Flex>
          </Flex>
          <Flex
            as="button"
            align="center"
            justify="center"
            gap={2}
            bg={copyStatus === 'css' ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-elevated)'}
            border={copyStatus === 'css' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
            borderRadius="var(--radius-sm)"
            py={2}
            cursor="pointer"
            onClick={handleCopyCSS}
            transition="all 0.15s"
            _hover={{ borderColor: 'var(--color-primary)' }}
          >
            <Icon as={FileCode2} boxSize={4} color="var(--text-muted)" />
            <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
              {copyStatus === 'css' ? 'Copied!' : 'Copy CSS clip-path'}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Flex
              as="button"
              flex={1}
              align="center"
              justify="center"
              gap={2}
              bg="var(--color-primary)"
              borderRadius="var(--radius-sm)"
              py={2.5}
              cursor="pointer"
              onClick={handleDownloadSVG}
              transition="all 0.15s"
              _hover={{ bg: '#b96dfa' }}
            >
              <Icon as={Download} boxSize={4} color="var(--text-primary)" />
              <Text fontSize="12px" color="var(--text-primary)" fontWeight={600}>
                Download SVG
              </Text>
            </Flex>
            <Flex
              as="button"
              flex={1}
              align="center"
              justify="center"
              gap={2}
              bg="var(--color-primary)"
              borderRadius="var(--radius-sm)"
              py={2.5}
              cursor="pointer"
              onClick={handleDownloadPNG}
              transition="all 0.15s"
              _hover={{ bg: '#b96dfa' }}
            >
              <Icon as={Image} boxSize={4} color="var(--text-primary)" />
              <Text fontSize="12px" color="var(--text-primary)" fontWeight={600}>
                Download PNG
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
