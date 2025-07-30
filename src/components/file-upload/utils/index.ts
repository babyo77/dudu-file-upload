import type { ValidationRule } from "../types";
import { type ClassValue, clsx } from "clsx";

/**
 * Utility function for merging class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Validates a file against a set of validation rules
 */
export function validateFile(
  file: File,
  rules: ValidationRule[],
  allFiles: File[] = []
): string[] {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case "maxSize":
        if (typeof rule.value === "number" && file.size > rule.value) {
          errors.push(rule.message.replace("{size}", formatBytes(rule.value)));
        }
        break;
      case "fileType":
        if (typeof rule.value === "string") {
          const acceptedTypes = rule.value
            .split(",")
            .map((type: string) => type.trim());
          const fileType = file.type || "";
          const fileExtension = `.${file.name.split(".").pop()}`;

          const isAccepted = acceptedTypes.some((type: string) => {
            if (type.startsWith(".")) {
              return fileExtension.toLowerCase() === type.toLowerCase();
            }
            if (type.endsWith("/*")) {
              const baseType = type.split("/")[0];
              return fileType.startsWith(`${baseType}/`);
            }
            return fileType === type;
          });

          if (!isAccepted) {
            errors.push(rule.message);
          }
        }
        break;
      case "maxFiles":
        if (typeof rule.value === "number" && allFiles.length > rule.value) {
          errors.push(rule.message.replace("{count}", rule.value.toString()));
        }
        break;
      case "minFiles":
        if (typeof rule.value === "number" && allFiles.length < rule.value) {
          errors.push(rule.message.replace("{count}", rule.value.toString()));
        }
        break;
      case "custom":
        if (rule.validator && !rule.validator(file, allFiles)) {
          errors.push(rule.message);
        }
        break;
    }
  }

  return errors;
}

/**
 * Checks if a file is an image
 */
export function isImageFile(file: File | { type: string }): boolean {
  return file.type.startsWith("image/");
}

/**
 * Checks if a file is a document
 */
export function isDocumentFile(file: File | { type: string }): boolean {
  const documentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
  ];
  return documentTypes.includes(file.type);
}

/**
 * Gets the appropriate icon for a file type
 */
export function getFileIcon(
  file: File | { type: string; name: string }
): string {
  if (isImageFile(file)) {
    return "image";
  }

  if (isDocumentFile(file)) {
    return "file-text";
  }

  // Check by extension
  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "zip":
    case "rar":
    case "7z":
      return "archive";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "video";
    case "mp3":
    case "wav":
    case "flac":
      return "music";
    default:
      return "file";
  }
}

/**
 * Creates a preview URL for a file
 */
export function createFilePreview(file: File): string | undefined {
  if (isImageFile(file)) {
    return URL.createObjectURL(file);
  }
  return undefined;
}

/**
 * Cleans up a preview URL
 */
export function revokeFilePreview(url: string): void {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

/**
 * Generates a unique ID for a file
 */
export function generateFileId(file: File): string {
  return `${file.name}-${file.size}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

/**
 * Converts bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
}

/**
 * Merges two configuration objects deeply
 */
export function mergeConfig<T extends Record<string, unknown>>(
  defaultConfig: T,
  userConfig: Partial<T>
): T {
  const result = { ...defaultConfig };

  for (const key in userConfig) {
    if (userConfig[key] !== undefined) {
      const defaultValue = defaultConfig[key];
      const userValue = userConfig[key];

      if (
        typeof userValue === "object" &&
        userValue !== null &&
        !Array.isArray(userValue) &&
        typeof defaultValue === "object" &&
        defaultValue !== null &&
        !Array.isArray(defaultValue)
      ) {
        // Both values are objects, merge them recursively
        result[key] = mergeConfig(
          defaultValue as Record<string, unknown>,
          userValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        // Use user value directly
        result[key] = userValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
