import type { FileWithPreview } from "../hooks/use-file-upload";
export type { FileMetadata, FileWithPreview, FileUploadOptions, FileUploadState, FileUploadActions, } from "../hooks/use-file-upload";
export type FileUploadVariant = "button" | "dropzone" | "preview" | "compact";
export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadRadius = "none" | "sm" | "md" | "lg" | "full";
export interface FileUploadConfig {
    variant: FileUploadVariant;
    size: FileUploadSize;
    radius: FileUploadRadius;
    multiple: boolean;
    maxFiles: number;
    maxSize: number;
    accept: string;
    disabled: boolean;
    showPreview: boolean;
    showProgress: boolean;
    allowRemove: boolean;
    labels: {
        dropzone: string;
        button: string;
        dragActive: string;
        maxFiles: string;
        maxSize: string;
        fileType: string;
        remove: string;
        clear: string;
    };
    icons: {
        upload: string;
        file: string;
        image: string;
        remove: string;
        error: string;
    };
    styles: {
        container: string;
        dropzone: string;
        button: string;
        preview: string;
        error: string;
    };
}
export interface FileUploadProps extends Omit<Partial<FileUploadConfig>, "labels"> {
    className?: string;
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (files: FileWithPreview[]) => void;
    onError?: (errors: string[]) => void;
    initialFiles?: FileWithPreview[];
    labels?: Partial<FileUploadConfig["labels"]>;
}
export interface FileUploadRendererProps {
    config: FileUploadConfig;
    className?: string;
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (files: FileWithPreview[]) => void;
    onError?: (errors: string[]) => void;
    initialFiles?: FileWithPreview[];
}
export type FileUploadPreset = "default" | "image-upload" | "document-upload" | "multi-file" | "compact";
export interface FileUploadTheme {
    colors: {
        primary: string;
        secondary: string;
        success: string;
        error: string;
        warning: string;
        background: string;
        foreground: string;
        border: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}
export interface ValidationRule {
    type: "maxSize" | "fileType" | "maxFiles" | "minFiles" | "custom";
    value?: string | number;
    message: string;
    validator?: (file: File, files: File[]) => boolean;
}
export interface UploadProgress {
    fileId: string;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    error?: string;
}
export interface FileUploadContextValue {
    config: FileUploadConfig;
    theme: FileUploadTheme;
    updateConfig: (config: Partial<FileUploadConfig>) => void;
    updateTheme: (theme: Partial<FileUploadTheme>) => void;
}
//# sourceMappingURL=index.d.ts.map