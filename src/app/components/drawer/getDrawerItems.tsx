import React from 'react';
import { DrawerItem } from './types';
import explorerHeaderOptions from './DrawerHeaderOptions/ExplorerHeaderOptions';
import { searchHeaderOptions } from './DrawerHeaderOptions/SearchHeaderOptions';
import { gitHeaderOptions } from './DrawerHeaderOptions/GitHeaderOptions';

export function getDrawerItems(activeItem: string): DrawerItem[] {
  switch (activeItem) {
    case 'explorer':
      return explorerHeaderOptions;
    case 'search':
      return searchHeaderOptions;
    case 'git':
      return gitHeaderOptions;
    default:
      return [];
  }
}
