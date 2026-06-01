import { useContext } from 'react';
import ComponentPropsContext from '../components/context/ComponentPropsContext';

/**
 * Hook to access component demo props from context.
 * Used by CodeExample to render usage with current prop values.
 */
export function useComponentPropsContext() {
  return useContext(ComponentPropsContext);
}

export default useComponentPropsContext;
