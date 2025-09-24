import React from 'react';
import { DrawerItem } from '../types';
import { File, Folder } from 'lucide-react';
import { useFileSystemContext } from '@/contexts/FileSystemContext';

// Hook-based version that uses context
export function useExplorerHeaderOptions(): DrawerItem[] {
  const { showCreateDialog } = useFileSystemContext();

  return [
    {
      id: 'create-file',
      name: 'New File',
      icon: <File />,
      onClick: () => showCreateDialog('file'),
      tooltip: 'New File',
    },
    {
      id: 'create-folder',
      name: 'New Folder',
      icon: <Folder />,
      onClick: () => showCreateDialog('folder'),
      tooltip: 'New Folder',
    },
  ];
}
