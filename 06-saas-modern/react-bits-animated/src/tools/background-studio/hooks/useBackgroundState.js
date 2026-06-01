import { useQueryState, parseAsJson, parseAsString } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { BACKGROUNDS, getBackgroundById, getDefaultProps } from '../backgrounds';

export function useBackgroundState() {
  const [backgroundId, setBackgroundId] = useQueryState('bg', parseAsString.withDefault('silk'));

  const [customProps, setCustomProps] = useQueryState('props', parseAsJson().withDefault({}));

  const background = useMemo(() => {
    return getBackgroundById(backgroundId) || BACKGROUNDS[0];
  }, [backgroundId]);

  const props = useMemo(() => {
    const defaults = getDefaultProps(background);
    return { ...defaults, ...customProps };
  }, [background, customProps]);

  const updateProp = useCallback(
    (name, value) => {
      setCustomProps(prev => {
        const next = { ...prev, [name]: value };
        const defaults = getDefaultProps(background);
        if (JSON.stringify(value) === JSON.stringify(defaults[name])) {
          delete next[name];
        }
        return Object.keys(next).length > 0 ? next : null;
      });
    },
    [background, setCustomProps]
  );

  const resetProps = useCallback(() => {
    setCustomProps(null);
  }, [setCustomProps]);

  const changeBackground = useCallback(
    id => {
      setBackgroundId(id);
      setCustomProps(null);
    },
    [setBackgroundId, setCustomProps]
  );

  const getShareUrl = useCallback(() => {
    return window.location.href;
  }, []);

  return {
    background,
    backgroundId,
    props,
    updateProp,
    resetProps,
    changeBackground,
    getShareUrl
  };
}
