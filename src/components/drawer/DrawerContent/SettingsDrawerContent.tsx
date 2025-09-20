import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
export default function SettingsDrawerContent() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-60">
      <Select value={theme} onValueChange={(val) => setTheme(val as any)}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Editor Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="vs-dark">Dark</SelectItem>
          <SelectItem value="hc-black">Black</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
