import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TabsFooter from './TabsFooter';

import { Tabs, Icon, Flex, Tooltip, Box, Menu, Portal } from '@chakra-ui/react';
import { FiCode, FiEye } from 'react-icons/fi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { RotateCcw, Clipboard, Check, MoreHorizontal, Palette } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { toggleSavedComponent, isComponentSaved } from '../../utils/favorites';
import { useComponentPropsContext } from '../../hooks/useComponentPropsContext';
import { useOptions } from '../context/OptionsContext/useOptions';
import { colors } from '../../constants/colors';
import PropTable from './Preview/PropTable';
import CodeExample, { injectPropsIntoCode } from '../code/CodeExample';
import OpenInStudioButton, { buildStudioUrl } from './Preview/OpenInStudioButton';

const TAB_STYLE_PROPS = {
  flex: '0 0 auto',
  border: `1px solid ${colors.borderSecondary}`,
  borderRadius: '10px',
  fontSize: '14px',
  h: 10,
  px: 4,
  color: '#ffffff',
  justifyContent: 'center',
  _hover: { bg: colors.bgHover },
  _selected: { bg: colors.bgElevated, color: colors.accent }
};

/**
 * Recursively searches React children for a component of the given type
 * and returns its props. Returns null if not found.
 */
function findChildProps(children, targetType) {
  let result = null;
  React.Children.forEach(children, child => {
    if (result || !child || !child.props) return;
    if (child.type === targetType) {
      result = child.props;
      return;
    }
    if (child.props.children) {
      result = findChildProps(child.props.children, targetType);
    }
  });
  return result;
}

function getActiveCode(codeObject, lang, style) {
  if (!codeObject) return { source: '', label: '', css: '' };

  if (lang === 'TS' && style === 'TW' && codeObject.tsTailwind)
    return { source: codeObject.tsTailwind, label: 'TypeScript + Tailwind', css: '' };
  if (lang === 'TS' && codeObject.tsCode)
    return { source: codeObject.tsCode, label: 'TypeScript + CSS', css: codeObject.css || '' };
  if (style === 'TW' && codeObject.tailwind)
    return { source: codeObject.tailwind, label: 'JavaScript + Tailwind', css: '' };

  return { source: codeObject.code || '', label: 'JavaScript + CSS', css: codeObject.css || '' };
}

function buildPrompt(componentName, codeObject, propData, lang, style) {
  const { source, label, css } = getActiveCode(codeObject, lang, style);
  const usage = codeObject.usage || '';
  const deps = codeObject.dependencies || '';

  let prompt = `## Integrate the <${componentName} /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ${componentName}
### Variant: ${label}
${deps ? `### Dependencies: ${deps}` : ''}

---

### Usage Example
\`\`\`jsx
${usage}
\`\`\`
`;

  if (propData && propData.length > 0) {
    prompt += `
### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propData.map(p => `| ${p.name} | ${p.type} | ${p.default || '—'} | ${p.description} |`).join('\n')}
`;
  }

  prompt += `
### Full Component Source
\`\`\`${lang === 'TS' ? 'tsx' : 'jsx'}
${source}
\`\`\`
`;

  if (css) {
    prompt += `
### Component CSS
\`\`\`css
${css}
\`\`\`
`;
  }

  prompt += `
### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
${css ? '3. Import the CSS file alongside the component.\n' : ''}${css ? '4' : '3'}. Import and render the component using the usage example above as a starting point.
${css ? '5' : '4'}. Adjust props as needed for the specific use case — refer to the props table for all available options.
`;

  return prompt;
}

const TabsLayout = ({ children, className }) => {
  const { category, subcategory } = useParams();
  const { hasChanges, resetProps, props: currentProps, defaultProps, demoOnlyProps, computedProps } = useComponentPropsContext();

  const { favoriteKey, componentName } = useMemo(() => {
    if (!category || !subcategory) return null;

    const toPascal = str =>
      str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    const categoryName = toPascal(category);
    const componentName = toPascal(subcategory);
    return { favoriteKey: `${categoryName}/${componentName}`, componentName };
  }, [category, subcategory]) || { favoriteKey: null, componentName: null };

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!favoriteKey) return;
    setIsSaved(isComponentSaved(favoriteKey));
  }, [favoriteKey]);

  const toggleFavorite = () => {
    if (!favoriteKey) return;
    const { saved } = toggleSavedComponent(favoriteKey);
    setIsSaved(saved);

    const nameEl = (
      <span>
        {' '}
        <span style={{ color: colors.accent, fontWeight: 700 }}>&lt;{componentName} /&gt;</span>
      </span>
    );

    if (saved) toast.success?.(<>Added {nameEl} to favorites</>) ?? toast(<>Added {nameEl} to favorites</>);
    else toast.error?.(<>Removed {nameEl} from favorites</>) ?? toast(<>Removed {nameEl} from favorites</>);
  };
  const contentMap = {
    PreviewTab: null,
    CodeTab: null
  };

  React.Children.forEach(children, child => {
    if (!child) return;
    if (child.type === PreviewTab) contentMap.PreviewTab = child;
    if (child.type === CodeTab) contentMap.CodeTab = child;
  });

  // Extract codeObject/componentName from CodeExample child and propData from PropTable child
  const codeExampleProps = contentMap.CodeTab
    ? findChildProps(contentMap.CodeTab.props.children, CodeExample)
    : null;
  const propTableProps = contentMap.PreviewTab
    ? findChildProps(contentMap.PreviewTab.props.children, PropTable)
    : null;
  const studioButtonProps = contentMap.PreviewTab
    ? findChildProps(contentMap.PreviewTab.props.children, OpenInStudioButton)
    : null;

  const navigate = useNavigate();
  const handleOpenStudio = useCallback(() => {
    if (!studioButtonProps) return;
    const { backgroundId, currentProps: sbCurrent = {}, defaultProps: sbDefault = {} } = studioButtonProps;
    navigate(buildStudioUrl(backgroundId, sbCurrent, sbDefault));
  }, [studioButtonProps, navigate]);

  const { languagePreset, stylePreset } = useOptions();
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = useCallback(() => {
    if (!codeExampleProps) return;
    const { codeObject, componentName: compName } = codeExampleProps;
    const mergedProps = { ...currentProps, ...computedProps };
    const dynamicUsage = codeObject.usage && compName
      ? injectPropsIntoCode(codeObject.usage, mergedProps, defaultProps || {}, compName, demoOnlyProps)
      : codeObject.usage;
    const promptCodeObject = { ...codeObject, usage: dynamicUsage };
    const prompt = buildPrompt(
      compName,
      promptCodeObject,
      propTableProps?.data || [],
      languagePreset,
      stylePreset
    );
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      toast.success('Prompt copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  }, [codeExampleProps, propTableProps, languagePreset, stylePreset, currentProps, defaultProps, demoOnlyProps, computedProps]);

  const showFavorite = favoriteKey && category !== 'get-started';
  const hasOverflowActions = hasChanges || showFavorite || Boolean(codeExampleProps) || Boolean(studioButtonProps);

  return (
    <Tabs.Root w="100%" variant="plain" lazyMount defaultValue="preview" className={className}>
      <Tabs.List w="100%">
        <Flex gap={2} justifyContent="space-between" alignItems="center" w="100%" wrap="nowrap">
          {/* Primary tabs */}
          <Flex gap={2} wrap="nowrap" flex={{ base: '1 1 0', md: '0 0 auto' }} minW="0">
            <Tabs.Trigger value="preview" {...TAB_STYLE_PROPS} flex={{ base: '1 1 0', md: '0 0 auto' }}>
              <Icon as={FiEye} /> Preview
            </Tabs.Trigger>

            <Tabs.Trigger value="code" {...TAB_STYLE_PROPS} flex={{ base: '1 1 0', md: '0 0 auto' }}>
              <Icon as={FiCode} /> Code
            </Tabs.Trigger>
          </Flex>

          {/* Desktop: full action buttons */}
          <Flex
            alignItems="center"
            gap={2}
            flexShrink={0}
            display={{ base: 'none', md: 'flex' }}
          >
            {hasChanges && (
              <Box
                as="button"
                aria-label="Reset to defaults"
                onClick={resetProps}
                display="flex"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                gap={2}
                {...TAB_STYLE_PROPS}
              >
                <RotateCcw size={16} color="#fff" /> Reset
              </Box>
            )}

            {showFavorite && (
              <Tooltip.Root openDelay={250} closeDelay={100} positioning={{ placement: 'left', gutter: 8 }}>
                <Tooltip.Trigger asChild>
                  <Box
                    as="button"
                    aria-label="Add to Favorites"
                    onClick={toggleFavorite}
                    aria-pressed={isSaved}
                    display="flex"
                    cursor="pointer"
                    alignItems="center"
                    gap={2}
                    {...TAB_STYLE_PROPS}
                    w={10}
                    bg={isSaved ? 'rgba(168, 85, 247, 0.15)' : undefined}
                    border={isSaved ? '1px solid rgba(168, 85, 247, 0.25)' : TAB_STYLE_PROPS.border}
                    _hover={isSaved ? { bg: 'rgba(168, 85, 247, 0.2)' } : TAB_STYLE_PROPS._hover}
                  >
                    <Icon as={isSaved ? RiHeartFill : RiHeartLine} color={isSaved ? '#c084fc' : '#fff'} boxSize={4} />
                  </Box>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content
                    bg={colors.bgBody}
                    border={`1px solid ${colors.borderPrimary}`}
                    color={colors.accent}
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="0"
                    px={4}
                    whiteSpace="nowrap"
                    h={10}
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    pointerEvents="none"
                  >
                    {isSaved ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            )}

            {codeExampleProps && (
              <Box
                as="button"
                aria-label="Copy AI prompt"
                onClick={handleCopyPrompt}
                display="flex"
                cursor="pointer"
                alignItems="center"
                gap={2}
                {...TAB_STYLE_PROPS}
              >
                {copied ? <Check size={14} color={colors.accent} /> : <Clipboard size={14} color="#fff" />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </Box>
            )}
          </Flex>

          {/* Mobile: overflow menu */}
          {hasOverflowActions && (
            <Box display={{ base: 'flex', md: 'none' }} flexShrink={0}>
              <Menu.Root
                positioning={{
                  placement: 'bottom-end',
                  gutter: 12,
                  offset: { mainAxis: 6, crossAxis: 0 },
                  flip: false,
                  overflowPadding: 0
                }}
              >
                <Menu.Trigger asChild>
                  <Box
                    as="button"
                    aria-label="More actions"
                    display="flex"
                    cursor="pointer"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    {...TAB_STYLE_PROPS}
                    w={10}
                    px={0}
                    position="relative"
                  >
                    <MoreHorizontal size={18} color="#fff" />
                    {(hasChanges || isSaved) && (
                      <Box
                        position="absolute"
                        top="6px"
                        right="6px"
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={colors.accent}
                      />
                    )}
                  </Box>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      bg={colors.bgBody}
                      border={`1px solid ${colors.borderPrimary}`}
                      borderRadius="10px"
                      p={1}
                      minW="180px"
                      boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
                      zIndex={1500}
                      transformOrigin="top right"
                    >
                      {hasChanges && (
                        <Menu.Item
                          value="reset"
                          onSelect={resetProps}
                          display="flex"
                          alignItems="center"
                          gap={3}
                          px={3}
                          py={2}
                          fontSize="14px"
                          color="#fff"
                          borderRadius="8px"
                          cursor="pointer"
                          _hover={{ bg: colors.bgHover }}
                        >
                          <RotateCcw size={16} color="#fff" /> Reset to defaults
                        </Menu.Item>
                      )}
                      {showFavorite && (
                        <Menu.Item
                          value="favorite"
                          onSelect={toggleFavorite}
                          display="flex"
                          alignItems="center"
                          gap={3}
                          px={3}
                          py={2}
                          fontSize="14px"
                          color="#fff"
                          borderRadius="8px"
                          cursor="pointer"
                          _hover={{ bg: colors.bgHover }}
                        >
                          <Icon
                            as={isSaved ? RiHeartFill : RiHeartLine}
                            color={isSaved ? '#c084fc' : '#fff'}
                            boxSize={4}
                          />
                          {isSaved ? 'Remove from favorites' : 'Add to favorites'}
                        </Menu.Item>
                      )}
                      {codeExampleProps && (
                        <Menu.Item
                          value="copy-prompt"
                          onSelect={handleCopyPrompt}
                          display="flex"
                          alignItems="center"
                          gap={3}
                          px={3}
                          py={2}
                          fontSize="14px"
                          color="#fff"
                          borderRadius="8px"
                          cursor="pointer"
                          _hover={{ bg: colors.bgHover }}
                        >
                          {copied ? (
                            <Check size={16} color={colors.accent} />
                          ) : (
                            <Clipboard size={16} color="#fff" />
                          )}
                          {copied ? 'Copied!' : 'Copy AI prompt'}
                        </Menu.Item>
                      )}
                      {studioButtonProps && (
                        <Menu.Item
                          value="open-studio"
                          onSelect={handleOpenStudio}
                          display="flex"
                          alignItems="center"
                          gap={3}
                          px={3}
                          py={2}
                          fontSize="14px"
                          color="#fff"
                          borderRadius="8px"
                          cursor="pointer"
                          _hover={{ bg: colors.bgHover }}
                        >
                          <Palette size={16} color="#fff" /> Open in BG Studio
                        </Menu.Item>
                      )}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
          )}
        </Flex>
      </Tabs.List>

      <Tabs.Content pt={0} value="preview">
        {contentMap.PreviewTab}
      </Tabs.Content>
      <Tabs.Content pt={0} value="code">
        {contentMap.CodeTab}
      </Tabs.Content>

      <TabsFooter />
    </Tabs.Root>
  );
};

export const PreviewTab = ({ children }) => <>{children}</>;
export const CodeTab = ({ children }) => <>{children}</>;

export { TabsLayout };
