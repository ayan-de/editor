export const THEMES = ['light', 'vs-dark', 'hc-black'] as const;
export type Theme = (typeof THEMES)[number];
