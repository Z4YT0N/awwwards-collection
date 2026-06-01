import { RotateCcw } from 'lucide-react';
import { Tooltip, Box, Icon } from '@chakra-ui/react';
import { colors } from '../../../constants/colors';

/**
 * Reset button to restore demo props to default values.
 * Only visible when props have been changed from defaults.
 */
const ResetPropsButton = ({ onReset, hasChanges }) => {
  if (!hasChanges) return null;

  return (
    <Tooltip.Root openDelay={200} closeDelay={100} positioning={{ placement: 'top', gutter: 8 }}>
      <Tooltip.Trigger asChild>
        <Box
          as="button"
          aria-label="Reset to defaults"
          onClick={onReset}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          bg={colors.bgElevated}
          border={`1px solid ${colors.borderPrimary}`}
          borderRadius="10px"
          px={3}
          h={8}
          cursor="pointer"
          color="#fff"
          fontSize="xs"
          _hover={{ bg: colors.bgHover }}
          transition="all 0.2s"
        >
          <Icon as={RotateCcw} boxSize={3.5} />
          Reset
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
          borderRadius="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          pointerEvents="none"
        >
          Reset to default values
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};

export default ResetPropsButton;
