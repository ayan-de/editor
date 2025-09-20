'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'vs-dark' | 'hc-black';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'vs-dark',
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load from localStorage on first render
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      return stored ?? 'vs-dark';
    }
    return 'vs-dark';
  });

  // Save to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
