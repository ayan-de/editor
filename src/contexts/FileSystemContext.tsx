import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useFileSystem } from '@/hooks/useFileSystem';

interface FileSystemContextType {
  files: any[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
  createFile: (path: string) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteItem: (path: string) => Promise<void>;
  showCreateDialog: (type: 'file' | 'folder') => void;
  isCreateDialogOpen: boolean;
  createDialogType: 'file' | 'folder' | null;
  closeCreateDialog: () => void;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(
  undefined
);

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const fileSystem = useFileSystem();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createDialogType, setCreateDialogType] = useState<
    'file' | 'folder' | null
  >(null);

  const showCreateDialog = (type: 'file' | 'folder') => {
    setCreateDialogType(type);
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setCreateDialogType(null);
  };

  return (
    <FileSystemContext.Provider
      value={{
        ...fileSystem,
        showCreateDialog,
        isCreateDialogOpen,
        createDialogType,
        closeCreateDialog,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystemContext() {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error(
      'useFileSystemContext must be used within a FileSystemProvider'
    );
  }
  return context;
}
