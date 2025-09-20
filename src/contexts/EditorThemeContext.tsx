'use client';

import { EDITOR_THEMES } from '@/types/theme';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type EditorTheme = (typeof EDITOR_THEMES)[number];

interface EditorThemeContextType {
  theme: EditorTheme;
  setTheme: (theme: EditorTheme) => void;
  availableThemes: typeof EDITOR_THEMES;
}

const EditorThemeContext = createContext<EditorThemeContextType>({
  theme: 'vs-dark',
  setTheme: () => {},
  availableThemes: EDITOR_THEMES,
});

interface EditorThemeProviderProps {
  children: ReactNode;
}

export function EditorThemeProvider({ children }: EditorThemeProviderProps) {
  const [theme, setTheme] = useState<EditorTheme>(() => {
    // Load from localStorage on first render
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('editor-theme') as EditorTheme | null;
      return stored && EDITOR_THEMES.includes(stored) ? stored : 'vs-dark';
    }
    return 'vs-dark';
  });

  // Save to localStorage whenever theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('editor-theme', theme);
      // Here you would apply the editor theme to Monaco Editor or other editor components
      // For now, we'll just log it
      console.log('Editor theme changed to:', theme);
    }
  }, [theme]);

  return (
    <EditorThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: EDITOR_THEMES,
      }}
    >
      {children}
    </EditorThemeContext.Provider>
  );
}

export function useEditorTheme() {
  const context = useContext(EditorThemeContext);
  if (!context) {
    throw new Error(
      'useEditorTheme must be used within an EditorThemeProvider'
    );
  }
  return context;
}

// Keep the old hook name for backward compatibility, but mark as deprecated
/**
 * @deprecated Use useEditorTheme instead. This will be removed in a future version.
 */
export function useTheme() {
  return useEditorTheme();
}
