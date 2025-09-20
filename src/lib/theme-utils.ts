import {
  TWEAKCN_THEMES,
  TweakCNThemeVariables,
  isTweakCNTheme,
  ExtendedTheme,
} from '@/types/tweakcn-themes';

/**
 * Apply CSS variables to the document root
 */
export function applyThemeVariables(variables: TweakCNThemeVariables): void {
  const root = document.documentElement;

  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Apply a TweakCN theme based on the current dark mode preference
 */
export function applyTweakCNTheme(themeId: keyof typeof TWEAKCN_THEMES): void {
  const theme = TWEAKCN_THEMES[themeId];
  if (!theme) {
    console.warn(`Theme ${themeId} not found`);
    return;
  }

  // Check if the system is in dark mode
  const isDarkMode =
    document.documentElement.classList.contains('dark') ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const variables = isDarkMode ? theme.darkMode : theme.lightMode;
  applyThemeVariables(variables);
}

/**
 * Remove all TweakCN theme variables from the document root
 */
export function clearTweakCNThemeVariables(): void {
  const root = document.documentElement;

  // Get a sample theme to know which variables to clear
  const sampleTheme = Object.values(TWEAKCN_THEMES)[0];
  if (sampleTheme) {
    Object.keys(sampleTheme.lightMode).forEach((property) => {
      root.style.removeProperty(property);
    });
  }
}

/**
 * Apply theme based on theme type (editor theme or TweakCN theme)
 */
export function applyTheme(theme: ExtendedTheme): void {
  if (isTweakCNTheme(theme)) {
    applyTweakCNTheme(theme);
  } else {
    // Clear TweakCN variables when switching to editor themes
    clearTweakCNThemeVariables();
  }
}

/**
 * Toggle between light and dark mode for TweakCN themes
 */
export function toggleTweakCNDarkMode(
  themeId: keyof typeof TWEAKCN_THEMES
): void {
  const theme = TWEAKCN_THEMES[themeId];
  if (!theme) return;

  // Toggle dark class on document element
  const root = document.documentElement;
  const isDarkMode = root.classList.contains('dark');

  if (isDarkMode) {
    root.classList.remove('dark');
    applyThemeVariables(theme.lightMode);
  } else {
    root.classList.add('dark');
    applyThemeVariables(theme.darkMode);
  }
}

/**
 * Set dark mode state and apply appropriate TweakCN theme variables
 */
export function setTweakCNDarkMode(
  themeId: keyof typeof TWEAKCN_THEMES,
  isDark: boolean
): void {
  const theme = TWEAKCN_THEMES[themeId];
  if (!theme) return;

  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
    applyThemeVariables(theme.darkMode);
  } else {
    root.classList.remove('dark');
    applyThemeVariables(theme.lightMode);
  }
}

/**
 * Get current dark mode state
 */
export function isDarkMode(): boolean {
  return (
    document.documentElement.classList.contains('dark') ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

/**
 * Initialize theme system with system preference detection
 */
export function initializeThemeSystem(): void {
  // Listen for system dark mode changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      // Only update if using a TweakCN theme
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme && isTweakCNTheme(currentTheme)) {
        applyTweakCNTheme(currentTheme);
      }
    });
  }
}
