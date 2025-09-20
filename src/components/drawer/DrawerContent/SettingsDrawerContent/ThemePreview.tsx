import React from 'react';
import { TWEAKCN_THEMES } from '@/types/tweakcn-themes';

interface ThemePreviewProps {
  themeId: keyof typeof TWEAKCN_THEMES;
  isDarkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemePreview({
  themeId,
  isDarkMode = false,
  size = 'sm',
}: ThemePreviewProps) {
  const theme = TWEAKCN_THEMES[themeId];
  if (!theme) return null;

  const variables = isDarkMode ? theme.darkMode : theme.lightMode;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorKeys = ['--primary', '--secondary', '--accent', '--background'];

  return (
    <div className="flex gap-1">
      {colorKeys.map((colorKey) => {
        const color = variables[colorKey as keyof typeof variables];
        return (
          <div
            key={colorKey}
            className={`${sizeClasses[size]} rounded-full border border-border`}
            style={{ backgroundColor: color }}
            title={`${colorKey}: ${color}`}
          />
        );
      })}
    </div>
  );
}
