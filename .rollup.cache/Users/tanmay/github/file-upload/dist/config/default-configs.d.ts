import type { FileUploadConfig, FileUploadPreset } from "../types";
/**
 * Base default configuration for file upload components
 */
export declare const DEFAULT_CONFIG: FileUploadConfig;
/**
 * Type for preset configurations that allows partial labels
 */
type PresetConfig = Omit<Partial<FileUploadConfig>, "labels"> & {
    labels?: Partial<FileUploadConfig["labels"]>;
};
/**
 * Preset configurations for common use cases
 */
export declare const PRESET_CONFIGS: Record<FileUploadPreset, PresetConfig>;
/**
 * Gets a configuration by merging preset with custom overrides
 */
export declare function getConfig(preset?: FileUploadPreset, overrides?: PresetConfig): FileUploadConfig;
/**
 * Validates a configuration object
 */
export declare function validateConfig(config: PresetConfig): string[];
/**
 * Example configurations for demonstration
 */
export declare const EXAMPLE_CONFIGS: {
    readonly basicUpload: {
        readonly variant: "button";
        readonly size: "md";
        readonly labels: {
            readonly button: "Upload File";
        };
    };
    readonly imageGallery: {
        readonly variant: "dropzone";
        readonly accept: "image/*";
        readonly multiple: true;
        readonly maxFiles: 20;
        readonly showPreview: true;
        readonly labels: {
            readonly dropzone: "Add photos to your gallery";
            readonly dragActive: "Drop photos here";
        };
    };
    readonly documentLibrary: {
        readonly variant: "dropzone";
        readonly accept: ".pdf,.doc,.docx";
        readonly multiple: true;
        readonly maxFiles: 50;
        readonly maxSize: number;
        readonly showPreview: false;
        readonly labels: {
            readonly dropzone: "Upload documents to your library";
            readonly maxFiles: "Up to 50 documents";
        };
    };
};
export {};
//# sourceMappingURL=default-configs.d.ts.map