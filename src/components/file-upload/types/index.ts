import type { FileWithPreview } from "../hooks/use-file-upload";

// Re-export hook types
export type {
  FileMetadata,
  FileWithPreview,
  FileUploadOptions,
  FileUploadState,
  FileUploadActions,
} from "../hooks/use-file-upload";

// Component variant types
export type FileUploadVariant = "button" | "dropzone" | "preview" | "compact";
export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadRadius = "none" | "sm" | "md" | "lg" | "full";

// Configuration types
export interface FileUploadConfig {
  variant: FileUploadVariant;
  size: FileUploadSize;
  radius: FileUploadRadius;
  multiple: boolean;
  maxFiles: number;
  maxSize: number; // in bytes
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

// Component props
export interface FileUploadProps
  extends Omit<Partial<FileUploadConfig>, "labels"> {
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  onFilesAdded?: (files: FileWithPreview[]) => void;
  onError?: (errors: string[]) => void;
  initialFiles?: FileWithPreview[];
  labels?: Partial<FileUploadConfig["labels"]>;
}

// Config-driven renderer props
export interface FileUploadRendererProps {
  config: FileUploadConfig;
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  onFilesAdded?: (files: FileWithPreview[]) => void;
  onError?: (errors: string[]) => void;
  initialFiles?: FileWithPreview[];
}

// Preset configurations
export type FileUploadPreset =
  | "default"
  | "image-upload"
  | "document-upload"
  | "multi-file"
  | "compact";

// Theme configuration
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

// Validation rules
export interface ValidationRule {
  type: "maxSize" | "fileType" | "maxFiles" | "minFiles" | "custom";
  value?: string | number;
  message: string;
  validator?: (file: File, files: File[]) => boolean;
}

// Progress tracking
export interface UploadProgress {
  fileId: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

// File upload context
export interface FileUploadContextValue {
  config: FileUploadConfig;
  theme: FileUploadTheme;
  updateConfig: (config: Partial<FileUploadConfig>) => void;
  updateTheme: (theme: Partial<FileUploadTheme>) => void;
}
