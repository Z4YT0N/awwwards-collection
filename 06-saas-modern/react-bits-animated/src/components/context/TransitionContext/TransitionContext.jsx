import { createContext, useState, useCallback, useRef } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const preloadedComponents = useRef(new Map());

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const preloadComponent = useCallback(async (subcategory, componentMap) => {
    if (!subcategory || preloadedComponents.current.has(subcategory)) {
      return preloadedComponents.current.get(subcategory);
    }

    try {
      const loader = componentMap[subcategory];

      if (loader) {
        const component = await loader();
        preloadedComponents.current.set(subcategory, component);
        return component;
      }
    } catch (error) {
      console.error('Failed to preload component:', error);
    }
    return null;
  }, []);

  const startTransition = useCallback(
    async (targetSubcategory, componentMap, onNavigate) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      setTransitionPhase('fade-out');

      const preloadPromise = preloadComponent(targetSubcategory, componentMap);
      await delay(250);

      setTransitionPhase('loading');

      const MAX_PRELOAD_WAIT = 500;
      await Promise.race([preloadPromise, delay(MAX_PRELOAD_WAIT)]);

      onNavigate();

      setTransitionPhase('fade-in');
      await delay(250);

      setTransitionPhase('idle');
      setIsTransitioning(false);
    },
    [isTransitioning, preloadComponent]
  );

  const value = {
    isTransitioning,
    transitionPhase,
    startTransition,
    preloadComponent,
    clearPreloadedComponents: useCallback(() => preloadedComponents.current.clear(), []),
    getPreloadedComponent: useCallback(subcategory => preloadedComponents.current.get(subcategory), [])
  };

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
};

export { TransitionContext };
