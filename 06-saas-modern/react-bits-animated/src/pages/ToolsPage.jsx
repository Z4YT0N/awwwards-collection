import { Box, Flex, Text, Icon, Portal } from '@chakra-ui/react';
import { ChevronDown, Info } from 'lucide-react';
import { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/landingnew/Navbar/Navbar';
import DotField from '../components/landingnew/Hero/DotField';
import { TOOLS as BASE_TOOLS } from '../constants/Tools';
import { colors } from '../constants/colors';
import '../tools/tools.css';
import '../css/tools-landing.css';
import Footer from '../components/landingnew/Footer/Footer';
import { FaArrowRight } from 'react-icons/fa6';

const BackgroundStudio = lazy(() => import('../tools/background-studio/BackgroundStudio'));
const ShapeMagic = lazy(() => import('../tools/shape-magic/ShapeMagic'));
const TextureLab = lazy(() => import('../tools/texture-lab/TextureLab'));

const TOOL_COMPONENTS = {
  'background-studio': BackgroundStudio,
  'shape-magic': ShapeMagic,
  'texture-lab': TextureLab
};

const TOOLS = BASE_TOOLS.map(tool => ({
  ...tool,
  component: TOOL_COMPONENTS[tool.id]
}));

const ToolDropdown = ({ selectedTool, onSelect, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);
  const infoRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const selected = TOOLS.find(t => t.id === selectedTool) || TOOLS[0];

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  useEffect(() => {
    if (tooltipVisible && infoRef.current) {
      const rect = infoRef.current.getBoundingClientRect();
      setTooltipPos({ top: rect.top, left: rect.right + 8 });
    }
  }, [tooltipVisible]);

  return (
    <Box position="relative" ref={dropdownRef}>
      {/* Animated rotating border */}
      <div className="tool-selector-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <Flex
          as="button"
          className="tool-selector-button"
          align="center"
          cursor="pointer"
          justify="space-between"
          w="100%"
        >
          <Flex align="center" gap={2.5}>
            <Flex
              align="center"
              justify="center"
              w={7}
              h={7}
              borderRadius="8px"
              bg={`linear-gradient(135deg, ${colors.primary} 0%, #7B4FFF 100%)`}
              boxShadow="0 2px 8px rgba(82, 39, 255, 0.4)"
            >
              <Icon as={selected.icon} boxSize={4} color="#fff" />
            </Flex>
            <Text fontSize="14px" fontWeight={700} color="#fff" letterSpacing="-0.01em">
              {selected.label}
            </Text>
          </Flex>
          <Flex align="center" gap={1.5}>
            <div
              ref={infoRef}
              className="info-tooltip-trigger"
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <Info size={14} color={colors.accent} />
            </div>
            <Flex align="center" justify="center" w={6} h={6} borderRadius="6px" bg={colors.bgHover}>
              <Icon
                as={ChevronDown}
                boxSize={3.5}
                color={colors.accent}
                transition="transform 0.2s"
                transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
              />
            </Flex>
          </Flex>
        </Flex>
      </div>

      <Box
        position="absolute"
        top="100%"
        left={0}
        right={0}
        mt={2}
        bg={colors.bgCard}
        border={`1px solid ${colors.borderPrimary}`}
        borderRadius="12px"
        overflow="hidden"
        opacity={isOpen ? 1 : 0}
        visibility={isOpen ? 'visible' : 'hidden'}
        transform={isOpen ? 'translateY(0)' : 'translateY(-8px)'}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        zIndex={100}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
      >
        {TOOLS.map(tool => (
          <Flex
            key={tool.id}
            as="button"
            onClick={() => {
              onSelect(tool.id);
              setIsOpen(false);
            }}
            align="center"
            gap={2.5}
            w="100%"
            px={3}
            py={2.5}
            bg={selectedTool === tool.id ? colors.bgElevated : 'transparent'}
            _hover={{ bg: colors.bgElevated }}
            transition="all 0.15s"
          >
            <Flex
              align="center"
              justify="center"
              w={6}
              h={6}
              borderRadius="8px"
              bg={selectedTool === tool.id ? `linear-gradient(135deg, ${colors.primary} 0%, #7B4FFF 100%)` : colors.bgHover}
              transition="all 0.15s"
            >
              <Icon as={tool.icon} boxSize={3.5} color={selectedTool === tool.id ? '#fff' : colors.accent} />
            </Flex>
            <Text fontSize="14px" fontWeight={selectedTool === tool.id ? 600 : 500} color="#fff">
              {tool.label}
            </Text>
            {!tool.component && (
              <Text fontSize="10px" color={colors.accentMuted} fontWeight={600} ml="auto">
                SOON
              </Text>
            )}
          </Flex>
        ))}
      </Box>

      {tooltipVisible && (
        <Portal>
          <Box
            position="fixed"
            top={`${tooltipPos.top}px`}
            left={`${tooltipPos.left}px`}
            bg={colors.bgElevated}
            border={`1px solid ${colors.borderPrimary}`}
            borderRadius="8px"
            p="8px 12px"
            w="220px"
            fontSize="12px"
            color={colors.accent}
            lineHeight={1.5}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
            zIndex={99999}
            pointerEvents="none"
          >
            {selected.description}
          </Box>
        </Portal>
      )}
    </Box>
  );
};

const ComingSoon = ({ label, toolSelector }) => (
  <Flex h="100%" w="100%" gap={4} direction={{ base: 'column', lg: 'row' }}>
    {/* Controls Panel - shown on desktop */}
    <Box w="280px" flexShrink={0} display={{ base: 'none', lg: 'flex' }} flexDirection="column">
      {toolSelector && <Box mb={4}>{toolSelector}</Box>}
      <Text fontSize="13px" color={colors.accentMuted}>
        Settings will appear here when the tool is ready.
      </Text>
    </Box>

    {/* Preview Area */}
    <Flex
      flex={1}
      align="center"
      justify="center"
      direction="column"
      gap={3}
      borderRadius={{ base: '12px', lg: '16px' }}
      border={`1px solid ${colors.borderPrimary}`}
      bg={colors.bgCard}
      minH={{ base: '200px', lg: 'auto' }}
    >
      <Text fontSize={{ base: '20px', md: '24px' }} fontWeight={700} color="#fff">
        {label}
      </Text>
      <Text fontSize="14px" color={colors.accentMuted}>
        Coming soon...
      </Text>
    </Flex>
  </Flex>
);

const ToolContent = ({ toolId, toolSelector, mobileToolSelector }) => {
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool?.component) {
    return (
      <ComingSoon label={tool?.label || 'Tool'} toolSelector={toolSelector} mobileToolSelector={mobileToolSelector} />
    );
  }

  const Component = tool.component;
  return (
    <Suspense
      fallback={
        <Flex w="100%" h="100%" align="center" justify="center">
          <Text color={colors.accentMuted}>Loading...</Text>
        </Flex>
      }
    >
      <Component toolSelector={toolSelector} mobileToolSelector={mobileToolSelector} />
    </Suspense>
  );
};

export default function ToolsPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    if (!toolId) {
      document.title = 'React Bits - Tools';
    } else {
      const tool = TOOLS.find(t => t.id === toolId);
      if (tool) {
        document.title = `React Bits - ${tool.label}`;
      }
    }
  }, [toolId]);

  if (!toolId) {
    return (
      <>
        <Navbar showDocs />
        <div className="tools-dotfield">
          <DotField sparkle waveAmplitude={5} dotRadius={2} />
        </div>
        <section className="tools-landing">
          <title>React Bits - Tools</title>

          <div className="tools-landing-header">
            <div className="tools-landing-header-left">
              <h1 className="tools-landing-title">Creative Tools</h1>
              <p className="tools-landing-subtitle">
                Free utilities to boost your creative workflow and help you get the most out of React Bits in your projects.
              </p>
            </div>
          </div>

          <div className="tools-landing-grid">
            {TOOLS.map(tool => {
              const IconComp = tool.icon;
              return (
                <Link to={`/tools/${tool.id}`} className="tools-landing-card" key={tool.id}>
                  <div className="tools-landing-card-banner">
                    <div className="tools-landing-card-banner-icon">
                      <IconComp size={32} />
                    </div>
                  </div>
                  <div className="tools-landing-card-body">
                    <div className="tools-landing-card-top">
                      <div className="tools-landing-card-title-row">
                        <h3 className="tools-landing-card-title">{tool.label}</h3>
                        {!tool.component && (
                          <span className="tools-landing-card-tag soon">Coming Soon</span>
                        )}
                      </div>
                      <p className="tools-landing-card-desc">{tool.description}</p>
                    </div>
                    <div className="tools-landing-card-cta">
                      <span>Open</span>
                      <FaArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <Footer />
      </>
    );
  }

  const handleToolSelect = id => {
    navigate(`/tools/${id}`);
  };

  const selectedTool = TOOLS.find(t => t.id === toolId)?.id || 'background-studio';

  return (
    <Box h="100vh" bg="#120F17" overflow="hidden">
      <Navbar showDocs />

      <Box
        px={{ base: 3, md: 6 }}
        pt={{ base: '80px', md: '80px' }}
        pb={{ base: 3, md: 6 }}
        h="100vh"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Mobile Tool Selector - shown at top on mobile */}
        <Box display={{ base: 'block', lg: 'none' }} mb={3} flexShrink={0}>
          <ToolDropdown
            selectedTool={selectedTool}
            onSelect={handleToolSelect}
            isOpen={isMobileDropdownOpen}
            setIsOpen={setIsMobileDropdownOpen}
          />
        </Box>

        {/* Tool content - full height, tool selector passed as prop */}
        <Box flex={1} overflow="hidden">
          <ToolContent
            toolId={selectedTool}
            toolSelector={
              <ToolDropdown
                selectedTool={selectedTool}
                onSelect={handleToolSelect}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
}
