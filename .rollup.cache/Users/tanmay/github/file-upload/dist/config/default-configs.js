/**
 * Base default configuration for file upload components
 */
export const DEFAULT_CONFIG = {
    variant: "dropzone",
    size: "md",
    radius: "md",
    multiple: false,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: "*",
    disabled: false,
    showPreview: true,
    showProgress: false,
    allowRemove: true,
    labels: {
        dropzone: "Drop files here or click to browse",
        button: "Choose Files",
        dragActive: "Drop files here",
        maxFiles: "Maximum {count} files allowed",
        maxSize: "File size must be less than {size}",
        fileType: "File type not supported",
        remove: "Remove file",
        clear: "Clear all files",
    },
    icons: {
        upload: "upload",
        file: "file",
        image: "image",
        remove: "x",
        error: "alert-circle",
    },
    styles: {
        container: "",
        dropzone: "",
        button: "",
        preview: "",
        error: "",
    },
};
/**
 * Preset configurations for common use cases
 */
export const PRESET_CONFIGS = {
    default: {},
    "image-upload": {
        variant: "dropzone",
        accept: "image/*",
        maxSize: 5 * 1024 * 1024, // 5MB
        showPreview: true,
        labels: {
            dropzone: "Drop images here or click to browse",
            button: "Choose Images",
            dragActive: "Drop images here",
            fileType: "Only image files are supported",
        },
    },
    "document-upload": {
        variant: "button",
        accept: ".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx",
        maxSize: 25 * 1024 * 1024, // 25MB
        multiple: true,
        maxFiles: 5,
        showPreview: false,
        labels: {
            dropzone: "Drop documents here or click to browse",
            button: "Choose Documents",
            dragActive: "Drop documents here",
            fileType: "Only document files are supported",
        },
    },
    "multi-file": {
        variant: "dropzone",
        multiple: true,
        maxFiles: 10,
        maxSize: 50 * 1024 * 1024, // 50MB
        showPreview: true,
        allowRemove: true,
        labels: {
            dropzone: "Drop multiple files here or click to browse",
            button: "Choose Multiple Files",
            dragActive: "Drop files here",
            maxFiles: "Maximum 10 files allowed",
        },
    },
    compact: {
        variant: "compact",
        size: "sm",
        showPreview: false,
        labels: {
            button: "Upload",
            dropzone: "Drop file",
        },
    },
};
/**
 * Gets a configuration by merging preset with custom overrides
 */
export function getConfig(preset = "default", overrides = {}) {
    const presetConfig = PRESET_CONFIGS[preset] || {};
    return Object.assign(Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG), presetConfig), overrides), { labels: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.labels), presetConfig.labels), overrides.labels), icons: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.icons), presetConfig.icons), overrides.icons), styles: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.styles), presetConfig.styles), overrides.styles) });
}
/**
 * Validates a configuration object
 */
export function validateConfig(config) {
    const errors = [];
    if (config.maxFiles !== undefined && config.maxFiles < 1) {
        errors.push("maxFiles must be at least 1");
    }
    if (config.maxSize !== undefined && config.maxSize < 1) {
        errors.push("maxSize must be at least 1 byte");
    }
    if (config.multiple === false &&
        config.maxFiles !== undefined &&
        config.maxFiles > 1) {
        errors.push("maxFiles cannot be greater than 1 when multiple is false");
    }
    return errors;
}
/**
 * Example configurations for demonstration
 */
export const EXAMPLE_CONFIGS = {
    basicUpload: {
        variant: "button",
        size: "md",
        labels: {
            button: "Upload File",
        },
    },
    imageGallery: {
        variant: "dropzone",
        accept: "image/*",
        multiple: true,
        maxFiles: 20,
        showPreview: true,
        labels: {
            dropzone: "Add photos to your gallery",
            dragActive: "Drop photos here",
        },
    },
    documentLibrary: {
        variant: "dropzone",
        accept: ".pdf,.doc,.docx",
        multiple: true,
        maxFiles: 50,
        maxSize: 10 * 1024 * 1024, // 10MB
        showPreview: false,
        labels: {
            dropzone: "Upload documents to your library",
            maxFiles: "Up to 50 documents",
        },
    },
};
//# sourceMappingURL=default-configs.js.map