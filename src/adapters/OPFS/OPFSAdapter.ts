import { StorageAdapter, DirectoryItem } from './types';
import { OPFSError, OPFSNotSupportedError, retryOperation } from './opfs-utils';
import {
  initializeOPFS,
  isOPFSSupported,
  readFileFromOPFS,
  writeFileToOPFS,
  createFileInOPFS,
  createFolderInOPFS,
  listDirectoryInOPFS,
  deleteFromOPFS,
  getOPFSStorageInfo,
} from './opfs-operations';

/**
 * OPFS (Origin Private File System) Storage Adapter
 * Clean implementation focusing only on StorageAdapter interface
 */
export class OPFSAdapter implements StorageAdapter {
  private root: FileSystemDirectoryHandle | null = null;
  private initialized = false;

  constructor() {
    // Initialize OPFS on instantiation (async)
    this.init().catch((error) => {
      console.error('Failed to initialize OPFS:', error);
    });
  }

  /**
   * Initialize the OPFS root directory
   */
  private async init(): Promise<void> {
    if (this.initialized) return;

    try {
      if (!isOPFSSupported()) {
        throw new OPFSNotSupportedError();
      }

      this.root = await initializeOPFS();
      this.initialized = true;
    } catch (error) {
      if (error instanceof OPFSNotSupportedError) {
        throw error;
      }
      throw new OPFSError(
        'Failed to initialize Origin Private File System',
        'init'
      );
    }
  }

  /**
   * Ensure OPFS is initialized before operations
   */
  private async ensureInitialized(): Promise<FileSystemDirectoryHandle> {
    if (!this.initialized || !this.root) {
      await this.init();
    }
    return this.root!;
  }

  /**
   * Read file content from the specified path
   */
  async readFile(path: string): Promise<string> {
    return retryOperation(async () => {
      try {
        const root = await this.ensureInitialized();
        return await readFileFromOPFS(root, path);
      } catch (error) {
        if (error instanceof OPFSError) {
          throw error;
        }
        throw new OPFSError(`Failed to read file: ${error}`, 'readFile', path);
      }
    });
  }

  /**
   * Write content to a file at the specified path
   */
  async writeFile(path: string, content: string): Promise<void> {
    return retryOperation(async () => {
      try {
        const root = await this.ensureInitialized();
        await writeFileToOPFS(root, path, content);
      } catch (error) {
        if (error instanceof OPFSError) {
          throw error;
        }
        throw new OPFSError(
          `Failed to write file: ${error}`,
          'writeFile',
          path
        );
      }
    });
  }

  /**
   * Create a new file at the specified path
   */
  async createFile(path: string): Promise<void> {
    try {
      const root = await this.ensureInitialized();
      await createFileInOPFS(root, path);
    } catch (error) {
      throw new Error(`Failed to create file '${path}': ${error}`);
    }
  }

  /**
   * Create a new folder at the specified path
   */
  async createFolder(path: string): Promise<void> {
    try {
      const root = await this.ensureInitialized();
      await createFolderInOPFS(root, path);
    } catch (error) {
      throw new Error(`Failed to create folder '${path}': ${error}`);
    }
  }

  /**
   * List contents of a directory
   */
  async list(path: string): Promise<DirectoryItem[]> {
    try {
      const root = await this.ensureInitialized();
      return await listDirectoryInOPFS(root, path);
    } catch (error) {
      throw new Error(`Failed to list directory '${path}': ${error}`);
    }
  }

  /**
   * Delete a file or folder at the specified path
   */
  async delete(path: string): Promise<void> {
    try {
      const root = await this.ensureInitialized();
      await deleteFromOPFS(root, path);
    } catch (error) {
      throw new Error(`Failed to delete '${path}': ${error}`);
    }
  }

  /**
   * Check if OPFS is supported in the current browser
   */
  static isSupported(): boolean {
    return isOPFSSupported();
  }

  /**
   * Get storage usage information
   */
  async getStorageInfo(): Promise<{ usage: number; quota: number }> {
    try {
      return await getOPFSStorageInfo();
    } catch (error) {
      throw new Error(`Failed to get storage info: ${error}`);
    }
  }
}
