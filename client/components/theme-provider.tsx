"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { useTheme } from "@/hooks/use-theme";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <NextThemesProvider defaultTheme={theme} {...props}>
      {children}
    </NextThemesProvider>
  );
}
