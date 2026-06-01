import { Box } from '@chakra-ui/react';
import BackToTopButton from '../components/common/BackToTopButton';
import { componentMetadata } from '../constants/Information';
import ComponentList from '../components/common/ComponentList';

const IndexPage = () => {
  return (
    <Box>
      <title>{`React Bits - Component Index`}</title>
      <ComponentList title="Index" list={componentMetadata} hasFavoriteButton sorting="alphabetical" />
      <BackToTopButton />
    </Box>
  );
};

export default IndexPage;
