import { createContext, useContext, type ReactNode } from "react";

import { useDesign, type UseDesignResult } from "@/hooks/useDesign";

/**
 * Holds the active calculator theme (the current design plus the operations
 * that mutate it) and injects it into the tree via context, so components can
 * read and update the theme without prop drilling.
 */
const ThemeContext = createContext<UseDesignResult | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useDesign();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): UseDesignResult {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
}
