import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Sun } from 'lucide-react';
import { useTweakCNTheme } from '@/contexts/TweakCNThemeContext';
import { ThemePreview } from '../ThemePreview';

interface TweakCNThemeSelectorProps {
  // No props needed - uses its own context
}

export function TweakCNThemeSelector({}: TweakCNThemeSelectorProps) {
  const {
    theme,
    setTheme,
    isDarkMode,
    toggleDarkMode,
    isActive,
    availableThemes,
  } = useTweakCNTheme();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4" />
        <h3 className="text-sm font-medium">Themes</h3>
        {/* {isActive && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
            Active
          </span>
        )} */}
      </div>

      <Select
        value={isActive ? theme! : ''}
        onValueChange={(value) =>
          setTheme(value as keyof typeof availableThemes)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select TweakCN theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(availableThemes).map(([themeId, themeData]) => (
            <SelectItem key={themeId} value={themeId}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <span className="font-medium">{themeData.name}</span>
                  {/* <span className="text-xs text-muted-foreground">
                    {themeData.description}
                  </span> */}
                </div>
                {/* <div className="flex flex-col gap-1">
                  <ThemePreview
                    themeId={themeId as keyof typeof availableThemes}
                    isDarkMode={false}
                    size="sm"
                  />
                  <ThemePreview
                    themeId={themeId as keyof typeof availableThemes}
                    isDarkMode={true}
                    size="sm"
                  />
                </div> */}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Dark Mode Toggle for Active TweakCN Theme */}
      {/* {isActive && (
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="w-full justify-start"
          >
            {isDarkMode ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Switch to Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Switch to Dark Mode
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground px-2 space-y-1">
            <div>
              Active theme:{' '}
              <span className="font-medium">
                {availableThemes[theme!]?.name}
              </span>
            </div>
            <div>
              Mode:{' '}
              <span className="font-medium">
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
