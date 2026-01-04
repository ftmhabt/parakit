import { createContext, type ReactNode, useContext } from "react";
import type { ParakitConfig } from "../types/index";

export const ParakitContext = createContext<ParakitConfig | undefined>(
  undefined
);

export function useParakit(): ParakitConfig {
  const context = useContext<ParakitConfig | undefined>(ParakitContext);

  if (!context) {
    throw new Error("useParakit must be used within ParakitProvider");
  }

  return context;
}

export interface ParakitProviderProps {
  children: ReactNode;
  config?: Partial<ParakitConfig>;
}
