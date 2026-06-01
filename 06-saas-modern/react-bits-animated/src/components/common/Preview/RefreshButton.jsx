import { Button, Icon } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import { colors } from '../../../constants/colors';

const RefreshButton = ({ onClick }) => (
  <Button
    transition="background-color 0.3s ease"
    _active={{ bg: colors.bgHover }}
    _hover={{ bg: colors.bgHover }}
    bg={colors.bgElevated}
    position="absolute"
    onClick={onClick}
    border={`1px solid ${colors.borderSecondary}`}
    zIndex={2}
    color="white"
    rounded="10px"
    right={3}
    size="md"
    top={3}
    p={2}
  >
    <Icon as={FiRefreshCw} boxSize={4} />
  </Button>
);

export default RefreshButton;
