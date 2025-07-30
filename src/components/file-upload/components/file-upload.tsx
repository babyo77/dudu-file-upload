"use client";

import React, { forwardRef } from "react";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { cn } from "../utils";
import { useFileUpload } from "../hooks/use-file-upload";
import {
  fileUploadVariants,
  filePreviewVariants,
  errorVariants,
  uploadButtonVariants,
  iconVariants,
} from "./file-upload-variants";
import { ProgressBar } from "./progress-bar";
import type { FileUploadProps } from "../types";
import { formatBytes, isImageFile } from "../utils";

/**
 * Main FileUpload component with variant support
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      variant = "dropzone",
      size = "md",
      radius = "md",
      multiple = false,
      maxFiles = 1,
      maxSize = 10 * 1024 * 1024,
      accept = "*",
      disabled = false,
      showPreview = true,
      showProgress = false,
      allowRemove = true,
      className,
      onFilesChange,
      onFilesAdded,
      onError,
      initialFiles = [],
      labels = {},
      ...props
    },
    ref
  ) => {
    const defaultLabels = {
      dropzone: "Drop files here or click to browse",
      button: "Choose Files",
      dragActive: "Drop files here or click to browse",
      remove: "Remove file",
      clear: "Clear all files",
      ...labels,
    };

    const [state, actions] = useFileUpload({
      multiple,
      maxFiles,
      maxSize,
      accept,
      initialFiles: initialFiles?.map((f) => ({
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
        onError?.(state.errors);
      }
    }, [state.errors, onError]);

    const renderButton = () => (
      <button
        type="button"
        onClick={actions.openFileDialog}
        disabled={disabled}
        className={cn(
          uploadButtonVariants({
            variant: "default",
            size: size === "md" ? "default" : size === "sm" ? "sm" : "lg",
          }),
          className
        )}
      >
        <Upload className={iconVariants({ size: "sm" })} />
        {defaultLabels.button}
      </button>
    );

    const renderDropzone = () => (
      <div
        onDragEnter={actions.handleDragEnter}
        onDragLeave={actions.handleDragLeave}
        onDragOver={actions.handleDragOver}
        onDrop={actions.handleDrop}
        onClick={actions.openFileDialog}
        data-dragging={state.isDragging || undefined}
        className={cn(
          fileUploadVariants({ variant, size, radius }),
          "data-[dragging=true]:bg-accent/50 data-[dragging=true]:border-primary transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload
            className={iconVariants({ size: size === "sm" ? "md" : "lg" })}
          />
          <div className="text-sm text-muted-foreground">
            {state.isDragging
              ? defaultLabels.dragActive
              : defaultLabels.dropzone}
          </div>
          {maxSize < Infinity && (
            <div className="text-xs text-muted-foreground">
              Max size: {formatBytes(maxSize)}
            </div>
          )}
        </div>
      </div>
    );

    const renderPreview = () => (
      <div
        className={cn(fileUploadVariants({ variant, size, radius }), className)}
      >
        {state.files.length > 0 ? (
          <div className="relative w-full h-full">
            {state.files[0].preview && isImageFile(state.files[0].file) ? (
              <img
                src={state.files[0].preview}
                alt="Preview"
                className={cn(
                  "w-full h-full object-cover",
                  radius === "full" && "rounded-full"
                )}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <File className={iconVariants({ size: "lg" })} />
              </div>
            )}
            {allowRemove && (
              <button
                type="button"
                onClick={() => actions.removeFile(state.files[0].id)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ) : (
          <div
            onClick={actions.openFileDialog}
            className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className={iconVariants({ size: "lg" })} />
          </div>
        )}
      </div>
    );

    const renderCompact = () => (
      <button
        type="button"
        onClick={actions.openFileDialog}
        disabled={disabled}
        className={cn(fileUploadVariants({ variant, size, radius }), className)}
      >
        <Upload className={iconVariants({ size: "sm" })} />
        <span className="ml-2">{defaultLabels.button}</span>
      </button>
    );

    const renderFileList = () => {
      if (!showPreview || state.files.length === 0) return null;

      return (
        <div className="mt-4 space-y-2">
          {state.files.map((fileWithPreview) => (
            <div
              key={fileWithPreview.id}
              className={filePreviewVariants({ variant: "list", size })}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {fileWithPreview.preview &&
                isImageFile(fileWithPreview.file) ? (
                  <img
                    src={fileWithPreview.preview}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <File className={iconVariants({ size: "md" })} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {fileWithPreview.file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(fileWithPreview.file.size)}
                  </div>
                  {showProgress && fileWithPreview.progress !== undefined && (
                    <div className="mt-2">
                      <ProgressBar
                        value={fileWithPreview.progress}
                        size="sm"
                        showLabel={true}
                        status={fileWithPreview.status}
                      />
                    </div>
                  )}
                </div>
              </div>
              {allowRemove && (
                <button
                  type="button"
                  onClick={() => actions.removeFile(fileWithPreview.id)}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>
      );
    };

    const renderErrors = () => {
      if (state.errors.length === 0) return null;

      return (
        <div className="mt-2 space-y-1">
          {state.errors.map((error, index) => (
            <div key={index} className={errorVariants({ variant: "default" })}>
              <AlertCircle className="w-4 h-4 inline mr-1" />
              {error}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div ref={ref} {...props}>
        <input {...actions.getInputProps()} className="hidden" />

        {variant === "button" && renderButton()}
        {variant === "dropzone" && renderDropzone()}
        {variant === "preview" && renderPreview()}
        {variant === "compact" && renderCompact()}

        {variant !== "preview" && renderFileList()}
        {renderErrors()}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
