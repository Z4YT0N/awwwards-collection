import { Box, Flex } from '@chakra-ui/react';
import { colors } from '../../../constants/colors';
import '../../../css/skeleton.css';

const Bar = ({ h = '24px', mb = 4, maxW, mt, ...rest }) => (
  <Box
    height={h}
    bg={colors.bgCard}
    borderRadius="20px"
    mb={mb}
    mt={mt}
    className="skeleton-pulse"
    maxWidth={maxW}
    {...rest}
  />
);

const TabBar = ({ w }) => (
  <Box borderRadius="10px" maxWidth={w} flex="1" height="100%" bg={colors.bgCard} className="skeleton-pulse" />
);

export const SkeletonLoader = () => (
  <Box className="skeleton-loader">
    <Flex height="36px" borderRadius="md" mb={6} gap={2} maxWidth="300px">
      <TabBar w="92px" />
      <TabBar w="92px" />
      <TabBar w="80px" />
    </Flex>

    <Box className="skeleton-content">
      <Bar h="500px" mb={3} />
      <Bar maxW="200px" />
      <Bar maxW="300px" />
      <Bar maxW="230px" mb={12} />
      <Bar maxW="100px" />
      <Bar h="500px" mb={3} />
    </Box>
  </Box>
);

export const GetStartedLoader = () => (
  <Box className="skeleton-loader">
    <Box className="skeleton-content">
      <Bar mt={6} maxW="600px" />
      <Bar maxW="500px" />
      <Bar maxW="550px" mb={12} />
      <Bar maxW="500px" />
      <Bar maxW="400px" />
      <Bar h="60px" maxW="600px" />
      <Bar maxW="450px" />
      <Bar maxW="200px" mb={12} />

      <Bar mt={6} maxW="350px" />
      <Bar maxW="590px" />
      <Bar maxW="520px" mb={12} />
      <Bar h="100px" maxW="600px" mb={6} />

      <Bar mt={6} maxW="600px" />
      <Bar maxW="500px" />
      <Bar maxW="550px" mb={12} />
      <Bar maxW="500px" />
      <Bar maxW="400px" />
      <Bar h="60px" maxW="600px" />
      <Bar maxW="450px" />
      <Bar maxW="200px" mb={12} />

      <Bar mt={6} maxW="350px" />
      <Bar maxW="590px" />
      <Bar maxW="520px" mb={12} />
      <Bar h="100px" maxW="600px" mb={6} />

      <Flex height="36px" borderRadius="md" justifyContent="space-between" mb={6} gap={2}>
        <TabBar w="92px" />
      </Flex>
    </Box>
  </Box>
);
