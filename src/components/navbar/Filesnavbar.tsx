'use client';

import React from 'react';
import { FileNavbarProps } from './types';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FileNavbar({
  onToggleTerminal,
  isTerminalOpen,
}: FileNavbarProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between bg-muted border-b border-border h-8 w-full px-2 text-sm">
      <div className="flex items-center justify-center">
        <span className="text-muted-foreground text-xs">
          Files will be displayed here
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onToggleTerminal && (
          <Button
            onClick={onToggleTerminal}
            variant="ghost"
            size="sm"
            className={cn(
              'w-6 h-6 p-0',
              isTerminalOpen
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Toggle Terminal (Ctrl+`)"
          >
            <Terminal className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
