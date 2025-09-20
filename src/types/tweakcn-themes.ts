// TweakCN Theme Types and Configuration

export interface TweakCNThemeVariables {
  // Base variables
  '--radius': string;
  '--background': string;
  '--foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  '--primary': string;
  '--primary-foreground': string;
  '--secondary': string;
  '--secondary-foreground': string;
  '--muted': string;
  '--muted-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
  '--destructive': string;
  '--destructive-foreground': string;
  '--border': string;
  '--input': string;
  '--ring': string;

  // Chart colors
  '--chart-1': string;
  '--chart-2': string;
  '--chart-3': string;
  '--chart-4': string;
  '--chart-5': string;

  // Sidebar colors
  '--sidebar': string;
  '--sidebar-foreground': string;
  '--sidebar-primary': string;
  '--sidebar-primary-foreground': string;
  '--sidebar-accent': string;
  '--sidebar-accent-foreground': string;
  '--sidebar-border': string;
  '--sidebar-ring': string;

  // Font families
  '--font-sans': string;
  '--font-serif': string;
  '--font-mono': string;

  // Shadow variables
  '--shadow-color': string;
  '--shadow-opacity': string;
  '--shadow-blur': string;
  '--shadow-spread': string;
  '--shadow-offset-x': string;
  '--shadow-offset-y': string;
  '--letter-spacing': string;
  '--spacing': string;
  '--shadow-2xs': string;
  '--shadow-xs': string;
  '--shadow-sm': string;
  '--shadow': string;
  '--shadow-md': string;
  '--shadow-lg': string;
  '--shadow-xl': string;
  '--shadow-2xl': string;
  '--tracking-normal': string;
}

export interface TweakCNTheme {
  id: string;
  name: string;
  description: string;
  lightMode: TweakCNThemeVariables;
  darkMode: TweakCNThemeVariables;
}

// Theme configurations
export const TWEAKCN_THEMES: Record<string, TweakCNTheme> = {
  'peach-blossom': {
    id: 'peach-blossom',
    name: 'Peach Blossom',
    description: 'A warm, elegant theme with peach and coral tones',
    lightMode: {
      '--radius': '0.5rem',
      '--background': 'oklch(0.9809 0.0025 228.7836)',
      '--foreground': 'oklch(0.3211 0 0)',
      '--card': 'oklch(1.0000 0 0)',
      '--card-foreground': 'oklch(0.3211 0 0)',
      '--popover': 'oklch(1.0000 0 0)',
      '--popover-foreground': 'oklch(0.3211 0 0)',
      '--primary': 'oklch(0.8677 0.0735 7.0855)',
      '--primary-foreground': 'oklch(0 0 0)',
      '--secondary': 'oklch(0.8148 0.0819 225.7537)',
      '--secondary-foreground': 'oklch(0 0 0)',
      '--muted': 'oklch(0.8828 0.0285 98.1033)',
      '--muted-foreground': 'oklch(0.5382 0 0)',
      '--accent': 'oklch(0.9680 0.2110 109.7692)',
      '--accent-foreground': 'oklch(0 0 0)',
      '--destructive': 'oklch(0.6368 0.2078 25.3313)',
      '--destructive-foreground': 'oklch(1.0000 0 0)',
      '--border': 'oklch(0.8699 0 0)',
      '--input': 'oklch(0.8699 0 0)',
      '--ring': 'oklch(0.8677 0.0735 7.0855)',
      '--chart-1': 'oklch(0.8677 0.0735 7.0855)',
      '--chart-2': 'oklch(0.8148 0.0819 225.7537)',
      '--chart-3': 'oklch(0.9680 0.2110 109.7692)',
      '--chart-4': 'oklch(0.8027 0.1355 349.2347)',
      '--chart-5': 'oklch(0.7395 0.2268 142.8504)',
      '--sidebar': 'oklch(0.9809 0.0025 228.7836)',
      '--sidebar-foreground': 'oklch(0.3211 0 0)',
      '--sidebar-primary': 'oklch(0.8677 0.0735 7.0855)',
      '--sidebar-primary-foreground': 'oklch(0 0 0)',
      '--sidebar-accent': 'oklch(0.9680 0.2110 109.7692)',
      '--sidebar-accent-foreground': 'oklch(0 0 0)',
      '--sidebar-border': 'oklch(0.8699 0 0)',
      '--sidebar-ring': 'oklch(0.8677 0.0735 7.0855)',
      '--font-sans': 'Poppins, sans-serif',
      '--font-serif':
        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      '--font-mono': 'Roboto Mono, monospace',
      '--shadow-color': 'oklch(0 0 0)',
      '--shadow-opacity': '0.1',
      '--shadow-blur': '3px',
      '--shadow-spread': '0px',
      '--shadow-offset-x': '0',
      '--shadow-offset-y': '1px',
      '--letter-spacing': '0em',
      '--spacing': '0.25rem',
      '--shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-sm':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-md':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-lg':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-xl':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',
      '--tracking-normal': '0em',
    },
    darkMode: {
      '--radius': '0.5rem',
      '--background': 'oklch(0.2303 0.0125 264.2926)',
      '--foreground': 'oklch(0.9219 0 0)',
      '--card': 'oklch(0.3210 0.0078 223.6661)',
      '--card-foreground': 'oklch(0.9219 0 0)',
      '--popover': 'oklch(0.3210 0.0078 223.6661)',
      '--popover-foreground': 'oklch(0.9219 0 0)',
      '--primary': 'oklch(0.8027 0.1355 349.2347)',
      '--primary-foreground': 'oklch(0 0 0)',
      '--secondary': 'oklch(0.7395 0.2268 142.8504)',
      '--secondary-foreground': 'oklch(0 0 0)',
      '--muted': 'oklch(0.3867 0 0)',
      '--muted-foreground': 'oklch(0.7155 0 0)',
      '--accent': 'oklch(0.8148 0.0819 225.7537)',
      '--accent-foreground': 'oklch(0 0 0)',
      '--destructive': 'oklch(0.6368 0.2078 25.3313)',
      '--destructive-foreground': 'oklch(1.0000 0 0)',
      '--border': 'oklch(0.3867 0 0)',
      '--input': 'oklch(0.3867 0 0)',
      '--ring': 'oklch(0.8027 0.1355 349.2347)',
      '--chart-1': 'oklch(0.8027 0.1355 349.2347)',
      '--chart-2': 'oklch(0.7395 0.2268 142.8504)',
      '--chart-3': 'oklch(0.8148 0.0819 225.7537)',
      '--chart-4': 'oklch(0.9680 0.2110 109.7692)',
      '--chart-5': 'oklch(0.8652 0.1768 90.3816)',
      '--sidebar': 'oklch(0.2303 0.0125 264.2926)',
      '--sidebar-foreground': 'oklch(0.9219 0 0)',
      '--sidebar-primary': 'oklch(0.8027 0.1355 349.2347)',
      '--sidebar-primary-foreground': 'oklch(0 0 0)',
      '--sidebar-accent': 'oklch(0.8148 0.0819 225.7537)',
      '--sidebar-accent-foreground': 'oklch(0 0 0)',
      '--sidebar-border': 'oklch(0.3867 0 0)',
      '--sidebar-ring': 'oklch(0.8027 0.1355 349.2347)',
      '--font-sans': 'Poppins, sans-serif',
      '--font-serif':
        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      '--font-mono': 'Roboto Mono, monospace',
      '--shadow-color': 'oklch(0 0 0)',
      '--shadow-opacity': '0.1',
      '--shadow-blur': '3px',
      '--shadow-spread': '0px',
      '--shadow-offset-x': '0',
      '--shadow-offset-y': '1px',
      '--letter-spacing': '0em',
      '--spacing': '0.25rem',
      '--shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-sm':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-md':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-lg':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-xl':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',
      '--tracking-normal': '0em',
    },
  },
  'candy-pink': {
    id: 'candy-pink',
    name: 'Candy Pink',
    description: 'A sweet and vibrant pink-themed color scheme',
    lightMode: {
      '--radius': '0.5rem',
      '--background': 'oklch(0.9754 0.0084 325.6414)',
      '--foreground': 'oklch(0.3257 0.1161 325.0372)',
      '--card': 'oklch(0.9754 0.0084 325.6414)',
      '--card-foreground': 'oklch(0.3257 0.1161 325.0372)',
      '--popover': 'oklch(1.0000 0 0)',
      '--popover-foreground': 'oklch(0.3257 0.1161 325.0372)',
      '--primary': 'oklch(0.5316 0.1409 355.1999)',
      '--primary-foreground': 'oklch(1.0000 0 0)',
      '--secondary': 'oklch(0.8696 0.0675 334.8991)',
      '--secondary-foreground': 'oklch(0.4448 0.1341 324.7991)',
      '--muted': 'oklch(0.9395 0.0260 331.5454)',
      '--muted-foreground': 'oklch(0.4924 0.1244 324.4523)',
      '--accent': 'oklch(0.8696 0.0675 334.8991)',
      '--accent-foreground': 'oklch(0.4448 0.1341 324.7991)',
      '--destructive': 'oklch(0.5248 0.1368 20.8317)',
      '--destructive-foreground': 'oklch(1.0000 0 0)',
      '--border': 'oklch(0.8568 0.0829 328.9110)',
      '--input': 'oklch(0.8517 0.0558 336.6002)',
      '--ring': 'oklch(0.5916 0.2180 0.5844)',
      '--chart-1': 'oklch(0.6038 0.2363 344.4657)',
      '--chart-2': 'oklch(0.4445 0.2251 300.6246)',
      '--chart-3': 'oklch(0.3790 0.0438 226.1538)',
      '--chart-4': 'oklch(0.8330 0.1185 88.3461)',
      '--chart-5': 'oklch(0.7843 0.1256 58.9964)',
      '--sidebar': 'oklch(0.9360 0.0288 320.5788)',
      '--sidebar-foreground': 'oklch(0.4948 0.1909 354.5435)',
      '--sidebar-primary': 'oklch(0.3963 0.0251 285.1962)',
      '--sidebar-primary-foreground': 'oklch(0.9668 0.0124 337.5228)',
      '--sidebar-accent': 'oklch(0.9789 0.0013 106.4235)',
      '--sidebar-accent-foreground': 'oklch(0.3963 0.0251 285.1962)',
      '--sidebar-border': 'oklch(0.9383 0.0026 48.7178)',
      '--sidebar-ring': 'oklch(0.5916 0.2180 0.5844)',
      '--font-sans':
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      '--font-serif':
        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      '--font-mono':
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      '--shadow-color': 'oklch(0 0 0)',
      '--shadow-opacity': '0.1',
      '--shadow-blur': '3px',
      '--shadow-spread': '0px',
      '--shadow-offset-x': '0',
      '--shadow-offset-y': '1px',
      '--letter-spacing': '0em',
      '--spacing': '0.25rem',
      '--shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-sm':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-md':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-lg':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-xl':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',
      '--tracking-normal': '0em',
    },
    darkMode: {
      '--radius': '0.5rem',
      '--background': 'oklch(0.2409 0.0201 307.5346)',
      '--foreground': 'oklch(0.8398 0.0387 309.5391)',
      '--card': 'oklch(0.2803 0.0232 307.5413)',
      '--card-foreground': 'oklch(0.8456 0.0302 341.4597)',
      '--popover': 'oklch(0.1548 0.0132 338.9015)',
      '--popover-foreground': 'oklch(0.9647 0.0091 341.8035)',
      '--primary': 'oklch(0.4607 0.1853 4.0994)',
      '--primary-foreground': 'oklch(0.8560 0.0618 346.3684)',
      '--secondary': 'oklch(0.3137 0.0306 310.0610)',
      '--secondary-foreground': 'oklch(0.8483 0.0382 307.9613)',
      '--muted': 'oklch(0.2634 0.0219 309.4748)',
      '--muted-foreground': 'oklch(0.7940 0.0372 307.1032)',
      '--accent': 'oklch(0.3649 0.0508 308.4911)',
      '--accent-foreground': 'oklch(0.9647 0.0091 341.8035)',
      '--destructive': 'oklch(0.2258 0.0524 12.6119)',
      '--destructive-foreground': 'oklch(1.0000 0 0)',
      '--border': 'oklch(0.3286 0.0154 343.4461)',
      '--input': 'oklch(0.3387 0.0195 332.8347)',
      '--ring': 'oklch(0.5916 0.2180 0.5844)',
      '--chart-1': 'oklch(0.5316 0.1409 355.1999)',
      '--chart-2': 'oklch(0.5633 0.1912 306.8561)',
      '--chart-3': 'oklch(0.7227 0.1502 60.5799)',
      '--chart-4': 'oklch(0.6193 0.2029 312.7422)',
      '--chart-5': 'oklch(0.6118 0.2093 6.1387)',
      '--sidebar': 'oklch(0.1893 0.0163 331.0475)',
      '--sidebar-foreground': 'oklch(0.8607 0.0293 343.6612)',
      '--sidebar-primary': 'oklch(0.4882 0.2172 264.3763)',
      '--sidebar-primary-foreground': 'oklch(1.0000 0 0)',
      '--sidebar-accent': 'oklch(0.2337 0.0261 338.1961)',
      '--sidebar-accent-foreground': 'oklch(0.9674 0.0013 286.3752)',
      '--sidebar-border': 'oklch(0 0 0)',
      '--sidebar-ring': 'oklch(0.5916 0.2180 0.5844)',
      '--font-sans':
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      '--font-serif':
        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      '--font-mono':
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      '--shadow-color': 'oklch(0 0 0)',
      '--shadow-opacity': '0.1',
      '--shadow-blur': '3px',
      '--shadow-spread': '0px',
      '--shadow-offset-x': '0',
      '--shadow-offset-y': '1px',
      '--letter-spacing': '0em',
      '--spacing': '0.25rem',
      '--shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      '--shadow-sm':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-md':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-lg':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-xl':
        '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      '--shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',
      '--tracking-normal': '0em',
    },
  },
};

// Available theme IDs for easy access
export const TWEAKCN_THEME_IDS = Object.keys(TWEAKCN_THEMES) as Array<
  keyof typeof TWEAKCN_THEMES
>;

// Extended theme type that includes both editor themes and TweakCN themes
export type ExtendedTheme =
  | 'light'
  | 'vs-dark'
  | 'hc-black'
  | keyof typeof TWEAKCN_THEMES;

// Check if a theme is a TweakCN theme
export function isTweakCNTheme(
  theme: string
): theme is keyof typeof TWEAKCN_THEMES {
  return theme in TWEAKCN_THEMES;
}
