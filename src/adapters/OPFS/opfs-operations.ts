import { DirectoryItem } from './types';

/**
 * OPFS File System Operations Helper
 * Contains all the low-level file system operations used by the adapter
 */

/**
 * Parse a file path into directory parts and filename
 */
export function parsePath(path: string): {
  directories: string[];
  filename: string;
} {
  // Remove leading slash and resolve relative paths
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  if (!normalizedPath) {
    return { directories: [], filename: '' };
  }

  const parts = normalizedPath.split('/');
  const filename = parts.pop() || '';
  return { directories: parts.filter((part) => part.length > 0), filename };
}

/**
 * Navigate to a directory, creating intermediate directories if needed
 */
export async function navigateToDirectory(
  root: FileSystemDirectoryHandle,
  directories: string[],
  create: boolean = false
): Promise<FileSystemDirectoryHandle> {
  let currentDir = root;

  for (const dirName of directories) {
    try {
      currentDir = await currentDir.getDirectoryHandle(dirName, { create });
    } catch (error) {
      if (!create) {
        throw new Error(`Directory not found: ${directories.join('/')}`);
      }
      throw error;
    }
  }

  return currentDir;
}

/**
 * Check if a path exists and return its type
 */
export async function getPathInfo(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<{ exists: boolean; type?: 'file' | 'folder' }> {
  try {
    const { directories, filename } = parsePath(path);

    if (!filename) {
      // Root directory or directory path
      await navigateToDirectory(root, directories, false);
      return { exists: true, type: 'folder' };
    }

    const parentDir = await navigateToDirectory(root, directories, false);

    // Try to get as file first
    try {
      await parentDir.getFileHandle(filename);
      return { exists: true, type: 'file' };
    } catch {
      // Try to get as directory
      try {
        await parentDir.getDirectoryHandle(filename);
        return { exists: true, type: 'folder' };
      } catch {
        return { exists: false };
      }
    }
  } catch {
    return { exists: false };
  }
}

/**
 * Read file content from OPFS
 */
export async function readFileFromOPFS(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<string> {
  const { directories, filename } = parsePath(path);

  if (!filename) {
    throw new Error('Cannot read directory as file');
  }

  const parentDir = await navigateToDirectory(root, directories, false);
  const fileHandle = await parentDir.getFileHandle(filename);
  const file = await fileHandle.getFile();

  return await file.text();
}

/**
 * Write content to file in OPFS
 */
export async function writeFileToOPFS(
  root: FileSystemDirectoryHandle,
  path: string,
  content: string
): Promise<void> {
  const { directories, filename } = parsePath(path);

  if (!filename) {
    throw new Error('Cannot write to directory');
  }

  const parentDir = await navigateToDirectory(root, directories, true);
  const fileHandle = await parentDir.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();

  await writable.write(content);
  await writable.close();
}

/**
 * Create a file in OPFS
 */
export async function createFileInOPFS(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<void> {
  const pathInfo = await getPathInfo(root, path);

  if (pathInfo.exists) {
    if (pathInfo.type === 'file') {
      return; // File already exists, no need to create
    } else {
      throw new Error(
        `Cannot create file '${path}': directory with same name exists`
      );
    }
  }

  // Create the file with empty content
  await writeFileToOPFS(root, path, '');
}

/**
 * Create a folder in OPFS
 */
export async function createFolderInOPFS(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<void> {
  const { directories, filename } = parsePath(path);

  if (!filename) {
    // Creating root directory or it already exists
    await navigateToDirectory(root, directories, true);
    return;
  }

  const pathInfo = await getPathInfo(root, path);

  if (pathInfo.exists) {
    if (pathInfo.type === 'folder') {
      return; // Folder already exists
    } else {
      throw new Error(
        `Cannot create folder '${path}': file with same name exists`
      );
    }
  }

  const parentDir = await navigateToDirectory(root, directories, true);
  await parentDir.getDirectoryHandle(filename, { create: true });
}

/**
 * List directory contents in OPFS
 */
export async function listDirectoryInOPFS(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<DirectoryItem[]> {
  const { directories, filename } = parsePath(path);
  let targetDir: FileSystemDirectoryHandle;

  if (!filename) {
    // List root or directory
    targetDir = await navigateToDirectory(root, directories, false);
  } else {
    // Check if the filename is actually a directory
    const parentDir = await navigateToDirectory(root, directories, false);
    targetDir = await parentDir.getDirectoryHandle(filename);
  }

  const items: DirectoryItem[] = [];

  for await (const [name, handle] of targetDir.entries()) {
    const itemPath = path ? `${path}/${name}` : name;
    items.push({
      name,
      path: itemPath,
      type: handle.kind === 'file' ? 'file' : 'directory',
    });
  }

  // Sort items: directories first, then files, both alphabetically
  return items.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Delete a file or folder from OPFS
 */
export async function deleteFromOPFS(
  root: FileSystemDirectoryHandle,
  path: string
): Promise<void> {
  const { directories, filename } = parsePath(path);

  if (!filename) {
    throw new Error('Cannot delete root directory');
  }

  const parentDir = await navigateToDirectory(root, directories, false);

  // Check if it's a file or directory and remove accordingly
  const pathInfo = await getPathInfo(root, path);

  if (!pathInfo.exists) {
    return; // Already deleted or never existed
  }

  if (pathInfo.type === 'file') {
    await parentDir.removeEntry(filename);
  } else {
    // For directories, remove recursively
    await parentDir.removeEntry(filename, { recursive: true });
  }
}

/**
 * Get OPFS storage information
 */
export async function getOPFSStorageInfo(): Promise<{
  usage: number;
  quota: number;
}> {
  const estimate = await navigator.storage.estimate();
  return {
    usage: estimate.usage || 0,
    quota: estimate.quota || 0,
  };
}

/**
 * Initialize OPFS root directory
 */
export async function initializeOPFS(): Promise<FileSystemDirectoryHandle> {
  if (!('storage' in navigator && 'getDirectory' in navigator.storage)) {
    throw new Error(
      'Origin Private File System is not supported in this browser'
    );
  }

  return await navigator.storage.getDirectory();
}

/**
 * Check if OPFS is supported in the current browser
 */
export function isOPFSSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'storage' in navigator &&
    typeof navigator.storage === 'object' &&
    'getDirectory' in navigator.storage
  );
}
