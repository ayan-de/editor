'use client';

import { TWEAKCN_THEMES, TWEAKCN_THEME_IDS } from '@/types/tweakcn-themes';
import {
  applyTweakCNTheme,
  setTweakCNDarkMode,
  clearTweakCNThemeVariables,
} from '@/lib/theme-utils';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type TweakCNThemeId = keyof typeof TWEAKCN_THEMES | null;

interface TweakCNThemeContextType {
  theme: TweakCNThemeId;
  setTheme: (theme: TweakCNThemeId) => void;
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;
  isActive: boolean;
  availableThemes: typeof TWEAKCN_THEMES;
}

const TweakCNThemeContext = createContext<TweakCNThemeContextType>({
  theme: null,
  setTheme: () => {},
  isDarkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
  isActive: false,
  availableThemes: TWEAKCN_THEMES,
});

interface TweakCNThemeProviderProps {
  children: ReactNode;
}

export function TweakCNThemeProvider({ children }: TweakCNThemeProviderProps) {
  const [theme, setTheme] = useState<TweakCNThemeId>(() => {
    // Load from localStorage on first render
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tweakcn-theme');
      return stored && stored in TWEAKCN_THEMES
        ? (stored as keyof typeof TWEAKCN_THEMES)
        : null;
    }
    return null;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('tweakcn-dark-mode');
      if (storedDarkMode !== null) {
        return storedDarkMode === 'true';
      }
      // Default to system preference
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  const isActive = theme !== null;

  // Apply theme whenever theme or dark mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme) {
        localStorage.setItem('tweakcn-theme', theme);
        setTweakCNDarkMode(theme, isDarkMode);
      } else {
        localStorage.removeItem('tweakcn-theme');
        clearTweakCNThemeVariables();
        // Remove dark class when no TweakCN theme is active
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isDarkMode]);

  // Save dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tweakcn-dark-mode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  // Listen for system dark mode changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if no explicit dark mode preference is stored and a TweakCN theme is active
        const storedDarkMode = localStorage.getItem('tweakcn-dark-mode');
        if (storedDarkMode === null && theme) {
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleSetTheme = (newTheme: TweakCNThemeId) => {
    setTheme(newTheme);
  };

  const handleSetDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <TweakCNThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        isDarkMode,
        setDarkMode: handleSetDarkMode,
        toggleDarkMode: handleToggleDarkMode,
        isActive,
        availableThemes: TWEAKCN_THEMES,
      }}
    >
      {children}
    </TweakCNThemeContext.Provider>
  );
}

export function useTweakCNTheme() {
  const context = useContext(TweakCNThemeContext);
  if (!context) {
    throw new Error(
      'useTweakCNTheme must be used within a TweakCNThemeProvider'
    );
  }
  return context;
}
