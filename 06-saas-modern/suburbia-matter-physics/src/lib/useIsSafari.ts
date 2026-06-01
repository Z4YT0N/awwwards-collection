"use client";

import { useLayoutEffect, useState } from "react";

export function useIsSafari(defaultValue = false) {
  const [isSafari, setIsSafari] = useState(defaultValue);

  useLayoutEffect(() => {
    setIsSafari(
      typeof window === "undefined"
        ? false
        : window.navigator.userAgent.includes("Safari") &&
            !window.navigator.userAgent.includes("Chrom") // "Chrome" or "Chromium",
    );
  }, []);

  return isSafari;
}
