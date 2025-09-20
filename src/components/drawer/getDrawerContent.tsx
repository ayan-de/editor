import React from 'react';
import ExplorerDrawerContent from './DrawerContent/ExplorerDrawerContent';
import SearchDrawerContent from './DrawerContent/SearchDrawerContent';
import GitDrawerContent from './DrawerContent/GitDrawerContent';
import SettingsDrawerContent from './DrawerContent/SettingsDrawerContent/SettingsDrawerContent';

export function getDrawerContent(activeItem: string): React.ReactNode {
  switch (activeItem) {
    case 'explorer':
      return <ExplorerDrawerContent />;
    // return <GitDrawerContent />;
    case 'search':
      return <SearchDrawerContent />;
    // return <GitDrawerContent />;
    case 'git':
      return <GitDrawerContent />;
    case 'settings':
      return <SettingsDrawerContent />;
    default:
      return null;
  }
}
