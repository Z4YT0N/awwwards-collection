/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ActiveRouteContext = createContext();

export const ActiveRouteProvider = ({ children }) => {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    const parts = location.pathname.split('/');
    if (parts.length >= 3 && parts[1] && parts[2]) {
      setCategory(parts[1]);
      setSubcategory(parts[2]);
    } else {
      setCategory(null);
      setSubcategory(null);
    }
  }, [location.pathname]);

  const value = useMemo(
    () => ({ category, subcategory, isCategoryRoute: !!(category && subcategory) }),
    [category, subcategory]
  );

  return <ActiveRouteContext.Provider value={value}>{children}</ActiveRouteContext.Provider>;
};
