import { TWEAKCN_THEME_IDS } from './tweakcn-themes';

export const EDITOR_THEMES = ['light', 'vs-dark', 'hc-black'] as const;
export const THEMES = [...EDITOR_THEMES, ...TWEAKCN_THEME_IDS] as const;
export type Theme = (typeof THEMES)[number];
