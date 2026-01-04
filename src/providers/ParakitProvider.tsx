import { useEffect, useState } from "react";
import type { ParakitProviderProps } from "../context/ParakitContext";
import { ParakitContext } from "../context/ParakitContext";
import type { ParakitConfig } from "../types/index";

const defaultConfig: ParakitConfig = {
  sounds: true,
  soundVolume: 0.7,
  physics: { stiffness: 400, damping: 30, mass: 1 },
  reducedMotion: false,
};

export function ParakitProvider({
  children,
  config = {},
}: ParakitProviderProps) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const finalConfig: ParakitConfig = {
    ...defaultConfig,
    ...config,
    reducedMotion,
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <ParakitContext.Provider value={finalConfig}>
      {children}
    </ParakitContext.Provider>
  );
}
