import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Code } from 'lucide-react';
import { useEditorTheme } from '@/contexts/EditorThemeContext';

interface EditorThemeSelectorProps {
  // No props needed - uses its own context
}

export function EditorThemeSelector({}: EditorThemeSelectorProps) {
  const { theme, setTheme, availableThemes } = useEditorTheme();

  const getDisplayName = (themeId: string) => {
    return themeId
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4" />
        <h3 className="text-sm font-medium">Editor Themes</h3>
      </div>

      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select editor theme" />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((themeId) => (
            <SelectItem key={themeId} value={themeId}>
              <div className="flex flex-col items-start">
                <span>{getDisplayName(themeId)}</span>
                {/* <span className="text-xs text-muted-foreground">
                  Classic editor theme
                </span> */}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Current theme indicator */}
      {/* <div className="text-xs text-muted-foreground px-2">
        Active: <span className="font-medium">{getDisplayName(theme)}</span>
      </div> */}
    </div>
  );
}
