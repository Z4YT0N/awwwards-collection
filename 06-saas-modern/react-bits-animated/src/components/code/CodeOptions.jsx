import { Children } from 'react';
import { Flex, Text, Icon, Box } from '@chakra-ui/react';
import { useOptions } from '../context/OptionsContext/useOptions';
import { TbMoodSad } from 'react-icons/tb';
import IconSelect from './IconSelect';
import { colors } from '../../constants/colors';

import jsIcon from '../../assets/icons/js.svg';
import tsIcon from '../../assets/icons/ts.svg';
import cssIcon from '../../assets/icons/css.svg';
import twIcon from '../../assets/icons/tw.svg';

export const CSS = ({ children }) => <>{children}</>;
export const Tailwind = ({ children }) => <>{children}</>;
export const TSCSS = ({ children }) => <>{children}</>;
export const TSTailwind = ({ children }) => <>{children}</>;

const LANG_ITEMS = ['JS', 'TS'];
const STYLE_ITEMS = ['CSS', 'TW'];
const ICON_MAP = { JS: jsIcon, TS: tsIcon, CSS: cssIcon, TW: twIcon };
const COLOR_MAP = { JS: '#F7DF1E', TS: '#3178C6', CSS: '#B497CF', TW: '#38BDF8' };
const LABEL_MAP = { JS: 'JavaScript', TS: 'TypeScript', CSS: 'CSS', TW: 'Tailwind' };

const UNSUPPORTED = (
  <Flex alignItems="center" gap={1} my={6} color={colors.textMuted}>
    <Text>Sorry, this combination is not supported</Text>
    <Icon as={TbMoodSad} />
  </Flex>
);

const CodeOptions = ({ children }) => {
  const { languagePreset, setLanguagePreset, stylePreset, setStylePreset } = useOptions();
  const currentLang = languagePreset || 'JS';

  const buckets = { JS: { css: null, tailwind: null }, TS: { css: null, tailwind: null } };
  Children.forEach(children, child => {
    if (!child) return;
    if (child.type === CSS) buckets.JS.css = child;
    if (child.type === Tailwind) buckets.JS.tailwind = child;
    if (child.type === TSCSS) buckets.TS.css = child;
    if (child.type === TSTailwind) buckets.TS.tailwind = child;
  });

  const renderContent = variant => {
    const node = currentLang === 'JS' ? buckets.JS[variant] : buckets.TS[variant];
    return node?.props?.children ? node : UNSUPPORTED;
  };

  const styleVariant = stylePreset === 'TW' ? 'tailwind' : 'css';

  return (
    <Box mt={0} w="100%">
      <Flex mb={2} w="100%" alignItems="center" gap={2}>
        <IconSelect
          collection={LANG_ITEMS}
          value={currentLang}
          onChange={setLanguagePreset}
          iconMap={ICON_MAP}
          labelMap={LABEL_MAP}
          colorMap={COLOR_MAP}
          width="150px"
        />
        <IconSelect
          collection={STYLE_ITEMS}
          value={stylePreset}
          onChange={setStylePreset}
          iconMap={ICON_MAP}
          labelMap={LABEL_MAP}
          colorMap={COLOR_MAP}
          width="135px"
        />
      </Flex>
      <Box>{renderContent(styleVariant)}</Box>
    </Box>
  );
};

export default CodeOptions;
