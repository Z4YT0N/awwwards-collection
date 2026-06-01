import { createContext, useMemo } from 'react';

/**
 * Context for sharing component demo props between PreviewTab and CodeTab.
 * This enables the Code tab to display usage examples with the exact
 * prop values the user has configured in the demo.
 */
const ComponentPropsContext = createContext({
  props: {},
  defaultProps: {},
  hasChanges: false,
  resetProps: () => {},
  demoOnlyProps: [],
  computedProps: {}
});

/**
 * Provider component for sharing demo props with CodeExample.
 *
 * @example
 * <ComponentPropsProvider
 *   props={props}
 *   defaultProps={DEFAULT_PROPS}
 *   resetProps={resetProps}
 *   hasChanges={hasChanges}
 *   demoOnlyProps={['color1', 'color2', 'color3']}
 *   computedProps={{ colorStops: [color1, color2, color3] }}
 * >
 *   <TabsLayout>...</TabsLayout>
 * </ComponentPropsProvider>
 */
export function ComponentPropsProvider({
  children,
  props,
  defaultProps,
  resetProps,
  hasChanges,
  demoOnlyProps = [],
  computedProps = {}
}) {
  const value = useMemo(
    () => ({
      props,
      defaultProps,
      hasChanges,
      resetProps,
      demoOnlyProps,
      computedProps
    }),
    [props, defaultProps, hasChanges, resetProps, demoOnlyProps, computedProps]
  );

  return <ComponentPropsContext.Provider value={value}>{children}</ComponentPropsContext.Provider>;
}

export default ComponentPropsContext;
