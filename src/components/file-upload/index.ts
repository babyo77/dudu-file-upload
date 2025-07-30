// Main exports for the file upload component library

// Import global styles
import "../../app/globals.css";

// Hooks
export { useFileUpload } from "./hooks/use-file-upload";

// Components
export { FileUpload } from "./components/file-upload";
export {
  FileUploadRenderer,
  FileUploadPresetRenderer,
  FileUploadJSONRenderer,
  useFileUploadConfig,
} from "./components/file-upload-renderer";
export { ProgressBar } from "./components/progress-bar";

// Variants and styling
export {
  fileUploadVariants,
  filePreviewVariants,
  errorVariants,
  uploadButtonVariants,
  iconVariants,
  progressVariants,
} from "./components/file-upload-variants";

// Configuration
export {
  DEFAULT_CONFIG,
  PRESET_CONFIGS,
  EXAMPLE_CONFIGS,
  getConfig,
  validateConfig,
} from "./config/default-configs";

// Types
export type {
  FileMetadata,
  FileWithPreview,
  FileUploadOptions,
  FileUploadState,
  FileUploadActions,
  FileUploadConfig,
  FileUploadProps,
  FileUploadRendererProps,
  FileUploadPreset,
  FileUploadVariant,
  FileUploadSize,
  FileUploadRadius,
  FileUploadTheme,
  ValidationRule,
  UploadProgress,
  FileUploadContextValue,
} from "./types";

// Utilities
export {
  formatBytes,
  validateFile,
  isImageFile,
  isDocumentFile,
  getFileIcon,
  createFilePreview,
  revokeFilePreview,
  generateFileId,
  mergeConfig,
  debounce,
  throttle,
} from "./utils";
