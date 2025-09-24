import { DrawerItem } from '@/components/drawer/types';
import { useExplorerHeaderOptions } from '@/components/drawer/DrawerHeaderOptions/ExplorerHeaderOptions';
import { searchHeaderOptions } from '@/components/drawer/DrawerHeaderOptions/SearchHeaderOptions';
import { gitHeaderOptions } from '@/components/drawer/DrawerHeaderOptions/GitHeaderOptions';

export function useDrawerItems(activeItem: string): DrawerItem[] {
  const explorerOptions = useExplorerHeaderOptions();

  switch (activeItem) {
    case 'explorer':
      return explorerOptions;
    case 'search':
      return searchHeaderOptions;
    case 'git':
      return gitHeaderOptions;
    default:
      return [];
  }
}
