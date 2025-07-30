import type { ValidationRule } from "../types";
import { type ClassValue } from "clsx";
/**
 * Utility function for merging class names
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Validates a file against a set of validation rules
 */
export declare function validateFile(file: File, rules: ValidationRule[], allFiles?: File[]): string[];
/**
 * Checks if a file is an image
 */
export declare function isImageFile(file: File | {
    type: string;
}): boolean;
/**
 * Checks if a file is a document
 */
export declare function isDocumentFile(file: File | {
    type: string;
}): boolean;
/**
 * Gets the appropriate icon for a file type
 */
export declare function getFileIcon(file: File | {
    type: string;
    name: string;
}): string;
/**
 * Creates a preview URL for a file
 */
export declare function createFilePreview(file: File): string | undefined;
/**
 * Cleans up a preview URL
 */
export declare function revokeFilePreview(url: string): void;
/**
 * Generates a unique ID for a file
 */
export declare function generateFileId(file: File): string;
/**
 * Converts bytes to human readable format
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Merges two configuration objects deeply
 */
export declare function mergeConfig<T extends Record<string, unknown>>(defaultConfig: T, userConfig: Partial<T>): T;
/**
 * Debounces a function
 */
export declare function debounce<T extends (...args: never[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttles a function
 */
export declare function throttle<T extends (...args: never[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void;
//# sourceMappingURL=index.d.ts.map