import React from "react";
import type { FileUploadRendererProps, FileUploadConfig, FileUploadPreset, FileWithPreview } from "../types";
/**
 * Config-driven FileUpload renderer
 * Renders a FileUpload component based on a JSON configuration
 */
export declare const FileUploadRenderer: React.FC<FileUploadRendererProps>;
/**
 * Preset-based FileUpload renderer
 * Renders a FileUpload component using a preset configuration with optional overrides
 */
export interface FileUploadPresetRendererProps {
    preset: FileUploadPreset;
    overrides?: Omit<Partial<FileUploadConfig>, "labels"> & {
        labels?: Partial<FileUploadConfig["labels"]>;
    };
    className?: string;
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (files: FileWithPreview[]) => void;
    onError?: (errors: string[]) => void;
    initialFiles?: FileWithPreview[];
}
export declare const FileUploadPresetRenderer: React.FC<FileUploadPresetRendererProps>;
/**
 * JSON-based FileUpload renderer
 * Renders a FileUpload component from a JSON string configuration
 */
export interface FileUploadJSONRendererProps {
    configJSON: string;
    fallbackPreset?: FileUploadPreset;
    className?: string;
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (files: FileWithPreview[]) => void;
    onError?: (errors: string[]) => void;
    onConfigError?: (error: string) => void;
    initialFiles?: FileWithPreview[];
}
export declare const FileUploadJSONRenderer: React.FC<FileUploadJSONRendererProps>;
/**
 * Hook for managing file upload configuration
 */
export declare function useFileUploadConfig(initialConfig?: Partial<FileUploadConfig>): {
    config: FileUploadConfig;
    updateConfig: (updates: Partial<FileUploadConfig>) => void;
    resetConfig: (preset?: FileUploadPreset) => void;
    exportConfig: () => string;
    importConfig: (configJSON: string) => {
        success: boolean;
        error: null;
    } | {
        success: boolean;
        error: string;
    };
};
//# sourceMappingURL=file-upload-renderer.d.ts.map