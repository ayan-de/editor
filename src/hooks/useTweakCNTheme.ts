import { useTheme } from '@/contexts/ThemeContext';
import { isTweakCNTheme, TWEAKCN_THEMES } from '@/types/tweakcn-themes';

/**
 * Hook for managing TweakCN themes specifically
 */
export function useTweakCNTheme() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  const isTweakCN = isTweakCNTheme(theme);
  const currentTweakCNTheme = isTweakCN ? TWEAKCN_THEMES[theme] : null;

  return {
    // Current state
    theme,
    isTweakCNTheme: isTweakCN,
    currentTweakCNTheme,
    isDarkMode: isTweakCN ? isDarkMode : false,

    // Actions
    setTheme,
    toggleDarkMode: isTweakCN ? toggleDarkMode : () => {},

    // Available themes
    availableThemes: TWEAKCN_THEMES,

    // Utilities
    getThemeName: () => (isTweakCN ? currentTweakCNTheme?.name : theme),
    getThemeDescription: () =>
      isTweakCN ? currentTweakCNTheme?.description : `Editor theme: ${theme}`,
  };
}
