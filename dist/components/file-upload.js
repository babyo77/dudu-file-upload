"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { cn } from "../utils";
import { useFileUpload } from "../hooks/use-file-upload";
import { fileUploadVariants, filePreviewVariants, errorVariants, uploadButtonVariants, iconVariants, } from "./file-upload-variants";
import { ProgressBar } from "./progress-bar";
import { formatBytes, isImageFile } from "../utils";
/**
 * Main FileUpload component with variant support
 */
export const FileUpload = forwardRef((_a, ref) => {
    var { variant = "dropzone", size = "md", radius = "md", multiple = false, maxFiles = 1, maxSize = 10 * 1024 * 1024, accept = "*", disabled = false, showPreview = true, showProgress = false, allowRemove = true, className, onFilesChange, onFilesAdded, onError, initialFiles = [], labels = {} } = _a, props = __rest(_a, ["variant", "size", "radius", "multiple", "maxFiles", "maxSize", "accept", "disabled", "showPreview", "showProgress", "allowRemove", "className", "onFilesChange", "onFilesAdded", "onError", "initialFiles", "labels"]);
    const defaultLabels = Object.assign({ dropzone: "Drop files here or click to browse", button: "Choose Files", dragActive: "Drop files here or click to browse", remove: "Remove file", clear: "Clear all files" }, labels);
    const [state, actions] = useFileUpload({
        multiple,
        maxFiles,
        maxSize,
        accept,
        initialFiles: initialFiles === null || initialFiles === void 0 ? void 0 : initialFiles.map((f) => ({
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
            url: f.preview || "",
            id: f.id,
        })),
        onFilesChange,
        onFilesAdded,
    });
    React.useEffect(() => {
        if (state.errors.length > 0) {
            onError === null || onError === void 0 ? void 0 : onError(state.errors);
        }
    }, [state.errors, onError]);
    const renderButton = () => (_jsxs("button", { type: "button", onClick: actions.openFileDialog, disabled: disabled, className: cn(uploadButtonVariants({
            variant: "default",
            size: size === "md" ? "default" : size === "sm" ? "sm" : "lg",
        }), className), children: [_jsx(Upload, { className: iconVariants({ size: "sm" }) }), defaultLabels.button] }));
    const renderDropzone = () => (_jsx("div", { onDragEnter: actions.handleDragEnter, onDragLeave: actions.handleDragLeave, onDragOver: actions.handleDragOver, onDrop: actions.handleDrop, onClick: actions.openFileDialog, "data-dragging": state.isDragging || undefined, className: cn(fileUploadVariants({ variant, size, radius }), "data-[dragging=true]:bg-accent/50 data-[dragging=true]:border-primary transition-colors", disabled && "opacity-50 cursor-not-allowed", className), children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Upload, { className: iconVariants({ size: size === "sm" ? "md" : "lg" }) }), _jsx("div", { className: "text-sm text-muted-foreground", children: state.isDragging
                        ? defaultLabels.dragActive
                        : defaultLabels.dropzone }), maxSize < Infinity && (_jsxs("div", { className: "text-xs text-muted-foreground", children: ["Max size: ", formatBytes(maxSize)] }))] }) }));
    const renderPreview = () => (_jsx("div", { className: cn(fileUploadVariants({ variant, size, radius }), className), children: state.files.length > 0 ? (_jsxs("div", { className: "relative w-full h-full", children: [state.files[0].preview && isImageFile(state.files[0].file) ? (_jsx("img", { src: state.files[0].preview, alt: "Preview", className: cn("w-full h-full object-cover", radius === "full" && "rounded-full") })) : (_jsx("div", { className: "flex items-center justify-center w-full h-full bg-muted", children: _jsx(File, { className: iconVariants({ size: "lg" }) }) })), allowRemove && (_jsx("button", { type: "button", onClick: () => actions.removeFile(state.files[0].id), className: "absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90", children: _jsx(X, { className: "w-3 h-3" }) }))] })) : (_jsx("div", { onClick: actions.openFileDialog, className: "flex items-center justify-center w-full h-full cursor-pointer hover:bg-muted/50 transition-colors", children: _jsx(Upload, { className: iconVariants({ size: "lg" }) }) })) }));
    const renderCompact = () => (_jsxs("button", { type: "button", onClick: actions.openFileDialog, disabled: disabled, className: cn(fileUploadVariants({ variant, size, radius }), className), children: [_jsx(Upload, { className: iconVariants({ size: "sm" }) }), _jsx("span", { className: "ml-2", children: defaultLabels.button })] }));
    const renderFileList = () => {
        if (!showPreview || state.files.length === 0)
            return null;
        return (_jsx("div", { className: "mt-4 space-y-2", children: state.files.map((fileWithPreview) => (_jsxs("div", { className: filePreviewVariants({ variant: "list", size }), children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [fileWithPreview.preview &&
                                isImageFile(fileWithPreview.file) ? (_jsx("img", { src: fileWithPreview.preview, alt: "Preview", className: "w-10 h-10 object-cover rounded" })) : (_jsx(File, { className: iconVariants({ size: "md" }) })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium truncate", children: fileWithPreview.file.name }), _jsx("div", { className: "text-xs text-muted-foreground", children: formatBytes(fileWithPreview.file.size) }), showProgress && fileWithPreview.progress !== undefined && (_jsx("div", { className: "mt-2", children: _jsx(ProgressBar, { value: fileWithPreview.progress, size: "sm", showLabel: true, status: fileWithPreview.status }) }))] })] }), allowRemove && (_jsx("button", { type: "button", onClick: () => actions.removeFile(fileWithPreview.id), className: "p-1 hover:bg-destructive/10 rounded", children: _jsx(X, { className: "w-4 h-4 text-destructive" }) }))] }, fileWithPreview.id))) }));
    };
    const renderErrors = () => {
        if (state.errors.length === 0)
            return null;
        return (_jsx("div", { className: "mt-2 space-y-1", children: state.errors.map((error, index) => (_jsxs("div", { className: errorVariants({ variant: "default" }), children: [_jsx(AlertCircle, { className: "w-4 h-4 inline mr-1" }), error] }, index))) }));
    };
    return (_jsxs("div", Object.assign({ ref: ref }, props, { children: [_jsx("input", Object.assign({}, actions.getInputProps(), { className: "hidden" })), variant === "button" && renderButton(), variant === "dropzone" && renderDropzone(), variant === "preview" && renderPreview(), variant === "compact" && renderCompact(), variant !== "preview" && renderFileList(), renderErrors()] })));
});
FileUpload.displayName = "FileUpload";
