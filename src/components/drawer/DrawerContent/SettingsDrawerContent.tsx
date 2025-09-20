import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import { THEMES } from '@/types/theme';
export default function SettingsDrawerContent() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-60">
      <Select value={theme} onValueChange={(val) => setTheme(val as any)}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Editor Theme" />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
