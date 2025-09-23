/**
 * OPFS Utility functions and error handling
 */

export class OPFSError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly path?: string
  ) {
    super(message);
    this.name = 'OPFSError';
  }
}

export class OPFSNotSupportedError extends OPFSError {
  constructor() {
    super(
      'Origin Private File System is not supported in this browser. Please use a modern browser that supports OPFS(eg CHROME).',
      'init'
    );
    this.name = 'OPFSNotSupportedError';
  }
}

/**
 * Check if OPFS is supported in the current environment
 */
export function isOPFSSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'storage' in navigator &&
    typeof navigator.storage === 'object' &&
    'getDirectory' in navigator.storage
  );
}

/**
 * Normalize a file path by removing leading slashes and resolving relative paths
 */
export function normalizePath(path: string): string {
  // Remove leading slash and resolve relative paths
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // Split into parts and resolve . and .. segments
  const parts = normalizedPath.split('/').filter((part) => part.length > 0);
  const resolvedParts: string[] = [];

  for (const part of parts) {
    if (part === '.') {
      continue; // Skip current directory references
    } else if (part === '..') {
      if (resolvedParts.length > 0) {
        resolvedParts.pop(); // Go up one directory
      }
    } else {
      resolvedParts.push(part);
    }
  }

  return resolvedParts.join('/');
}

/**
 * Validate a path to ensure it's safe for OPFS operations
 */
export function validatePath(path: string): void {
  if (!path || typeof path !== 'string') {
    throw new OPFSError('Path must be a non-empty string', 'validate', path);
  }

  // Check for invalid characters that might cause issues
  const invalidChars = /[<>:"|?*\x00-\x1f]/;
  if (invalidChars.test(path)) {
    throw new OPFSError('Path contains invalid characters', 'validate', path);
  }

  // Check for reserved names (Windows-specific, but good to avoid)
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
  const pathParts = path.split('/');
  for (const part of pathParts) {
    if (reservedNames.test(part)) {
      throw new OPFSError(
        `Path contains reserved name: ${part}`,
        'validate',
        path
      );
    }
  }
}

/**
 * Get parent directory path from a file path
 */
export function getParentPath(path: string): string {
  const normalizedPath = normalizePath(path);
  const lastSlashIndex = normalizedPath.lastIndexOf('/');

  if (lastSlashIndex === -1) {
    return ''; // Root directory
  }

  return normalizedPath.substring(0, lastSlashIndex);
}

/**
 * Get filename from a file path
 */
export function getFileName(path: string): string {
  const normalizedPath = normalizePath(path);
  const lastSlashIndex = normalizedPath.lastIndexOf('/');

  if (lastSlashIndex === -1) {
    return normalizedPath; // The path is just a filename
  }

  return normalizedPath.substring(lastSlashIndex + 1);
}

/**
 * Join path segments into a single path
 */
export function joinPaths(...segments: string[]): string {
  return segments
    .filter((segment) => segment && segment.length > 0)
    .map((segment) => normalizePath(segment))
    .join('/');
}

/**
 * Check if a path represents a directory (ends with /)
 */
export function isDirectoryPath(path: string): boolean {
  return path.endsWith('/');
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

/**
 * Retry an async operation with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 100;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
