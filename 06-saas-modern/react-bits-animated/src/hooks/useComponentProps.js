import { useQueryStates } from 'nuqs';
import { useCallback, useMemo, useRef } from 'react';

const isHexColor = value => typeof value === 'string' && /^#?[0-9a-fA-F]{3,8}$/.test(value);

const createParser = defaultValue => {
  if (typeof defaultValue === 'number') {
    return {
      parse: v => (v === null || v === '' ? null : Number(v)),
      serialize: v => String(v),
      eq: (a, b) => a === b
    };
  }
  if (typeof defaultValue === 'boolean') {
    return {
      parse: v => (v === null || v === '' ? null : v === 'true'),
      serialize: v => String(v),
      eq: (a, b) => a === b
    };
  }
  if (isHexColor(defaultValue)) {
    return {
      parse: v => (v === null || v === '' ? null : `#${v}`),
      serialize: v => v.replace(/^#/, ''),
      eq: (a, b) => a === b
    };
  }
  return {
    parse: v => (v === null || v === '' ? null : v),
    serialize: v => String(v),
    eq: (a, b) => a === b
  };
};

export function useComponentProps(defaultProps) {
  const defaultPropsRef = useRef(defaultProps);

  const parsers = useMemo(() => {
    const result = {};
    for (const [key, defaultValue] of Object.entries(defaultPropsRef.current)) {
      result[key] = createParser(defaultValue);
    }
    return result;
  }, []);

  const [queryState, setQueryState] = useQueryStates(parsers);

  const props = useMemo(() => {
    const merged = { ...defaultPropsRef.current };
    for (const [key, value] of Object.entries(queryState)) {
      if (value !== null) {
        merged[key] = value;
      }
    }
    return merged;
  }, [queryState]);

  const hasChanges = useMemo(() => {
    return Object.values(queryState).some(v => v !== null);
  }, [queryState]);

  const updateProp = useCallback(
    (name, value) => {
      const newValue = value === defaultPropsRef.current[name] ? null : value;
      setQueryState({ [name]: newValue });
    },
    [setQueryState]
  );

  const updateProps = useCallback(
    updates => {
      const newState = {};
      for (const [name, value] of Object.entries(updates)) {
        newState[name] = value === defaultPropsRef.current[name] ? null : value;
      }
      setQueryState(newState);
    },
    [setQueryState]
  );

  const resetProps = useCallback(() => {
    const resetState = {};
    for (const key of Object.keys(defaultPropsRef.current)) {
      resetState[key] = null;
    }
    setQueryState(resetState);
  }, [setQueryState]);

  const getShareUrl = useCallback(() => {
    return window.location.href;
  }, []);

  return {
    props,
    defaultProps: defaultPropsRef.current,
    updateProp,
    updateProps,
    resetProps,
    hasChanges,
    getShareUrl
  };
}

export default useComponentProps;
