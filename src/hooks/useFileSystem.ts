import { OPFSAdapter } from '@/adapters/OPFS/OPFSAdapter';
import { DirectoryItem } from '@/adapters/OPFS/types';
import { useCallback, useEffect, useState } from 'react';

interface UseFileSystemReturn {
  files: DirectoryItem[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
  createFile: (path: string) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteItem: (path: string) => Promise<void>;
}

export function useFileSystem(rootPath: string = ''): UseFileSystemReturn {
  const [files, setFiles] = useState<DirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adapter] = useState(() => new OPFSAdapter());

  const refreshFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await adapter.list(rootPath);
      setFiles(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [adapter, rootPath]);

  const createFile = useCallback(
    async (path: string) => {
      try {
        await adapter.createFile(path);
        await refreshFiles();
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to create file'
        );
      }
    },
    [adapter, refreshFiles]
  );

  const createFolder = useCallback(
    async (path: string) => {
      try {
        await adapter.createFolder(path);
        await refreshFiles();
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to create folder'
        );
      }
    },
    [adapter, refreshFiles]
  );

  const deleteItem = useCallback(
    async (path: string) => {
      try {
        await adapter.delete(path);
        await refreshFiles();
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to delete item'
        );
      }
    },
    [adapter, refreshFiles]
  );

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  return {
    files,
    loading,
    error,
    refreshFiles,
    createFile,
    createFolder,
    deleteItem,
  };
}
