'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

export default function Xterm() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      // Create terminal instance
      const terminal = new Terminal({
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
          selectionBackground: '#264f78',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#ffffff'
        },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
        cursorBlink: true,
        cursorStyle: 'bar',
        rows: 15,
        cols: 80
      });

      // Create fit addon
      const fit = new FitAddon();
      terminal.loadAddon(fit);

      // Open terminal in the ref element
      terminal.open(terminalRef.current);
      fit.fit();

      // Store references
      terminalInstance.current = terminal;
      fitAddon.current = fit;

      // Welcome message
      terminal.writeln('Welcome to the integrated terminal!');
      terminal.writeln('');
      terminal.write('$ ');

      // Handle user input (basic echo for now)
      terminal.onData((data) => {
        if (data === '\r') {
          terminal.write('\r\n$ ');
        } else if (data === '\u007f') { // Backspace
          terminal.write('\b \b');
        } else {
          terminal.write(data);
        }
      });

      // Handle resize
      const handleResize = () => {
        if (fitAddon.current) {
          fitAddon.current.fit();
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (terminalInstance.current) {
          terminalInstance.current.dispose();
        }
      };
    }
  }, []);

  return (
    <div className="h-full w-full bg-[#1e1e1e] border-t border-gray-700">
      <div className="h-8 bg-[#2d2d30] border-b border-gray-700 flex items-center px-3">
        <span className="text-sm text-gray-300 font-medium">Terminal</span>
      </div>
      <div 
        ref={terminalRef} 
        className="h-[calc(100%-2rem)] p-2"
      />
    </div>
  );
}
