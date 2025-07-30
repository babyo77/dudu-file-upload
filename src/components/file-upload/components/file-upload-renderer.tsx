"use client";

import React from "react";
import { FileUpload } from "./file-upload";
import { getConfig } from "../config/default-configs";
import type {
  FileUploadRendererProps,
  FileUploadConfig,
  FileUploadPreset,
  FileWithPreview,
} from "../types";
import { validateConfig } from "../config/default-configs";

/**
 * Config-driven FileUpload renderer
 * Renders a FileUpload component based on a JSON configuration
 */
export const FileUploadRenderer: React.FC<FileUploadRendererProps> = ({
  config,
  className,
  onFilesChange,
  onFilesAdded,
  onError,
  initialFiles,
  ...props
}) => {
  // Validate configuration
  const configErrors = validateConfig(config);
  if (configErrors.length > 0) {
    console.warn("FileUpload configuration errors:", configErrors);
  }

  return (
    <FileUpload
      variant={config.variant}
      size={config.size}
      radius={config.radius}
      multiple={config.multiple}
      maxFiles={config.maxFiles}
      maxSize={config.maxSize}
      accept={config.accept}
      disabled={config.disabled}
      showPreview={config.showPreview}
      allowRemove={config.allowRemove}
      labels={config.labels}
      className={className}
      onFilesChange={onFilesChange}
      onFilesAdded={onFilesAdded}
      onError={onError}
      initialFiles={initialFiles}
      {...props}
    />
  );
};

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

export const FileUploadPresetRenderer: React.FC<
  FileUploadPresetRendererProps
> = ({ preset, overrides = {}, ...props }) => {
  const config = getConfig(preset, overrides);

  return <FileUploadRenderer config={config} {...props} />;
};

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

export const FileUploadJSONRenderer: React.FC<FileUploadJSONRendererProps> = ({
  configJSON,
  fallbackPreset = "default",
  onConfigError,
  ...props
}) => {
  const [config, setConfig] = React.useState<FileUploadConfig | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const parsedConfig = JSON.parse(configJSON) as Omit<
        Partial<FileUploadConfig>,
        "labels"
      > & {
        labels?: Partial<FileUploadConfig["labels"]>;
      };
      const fullConfig = getConfig("default", parsedConfig);

      // Validate the configuration
      const configErrors = validateConfig(parsedConfig);
      if (configErrors.length > 0) {
        const errorMessage = `Configuration errors: ${configErrors.join(", ")}`;
        setError(errorMessage);
        onConfigError?.(errorMessage);
        // Use fallback preset on error
        setConfig(getConfig(fallbackPreset));
      } else {
        setConfig(fullConfig);
        setError(null);
      }
    } catch (parseError) {
      const errorMessage = `Invalid JSON configuration: ${
        parseError instanceof Error ? parseError.message : "Unknown error"
      }`;
      setError(errorMessage);
      onConfigError?.(errorMessage);
      // Use fallback preset on error
      setConfig(getConfig(fallbackPreset));
    }
  }, [configJSON, fallbackPreset, onConfigError]);

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="text-sm text-destructive font-medium">
            Configuration Error
          </div>
          <div className="text-xs text-destructive/80 mt-1">{error}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Using fallback preset: {fallbackPreset}
          </div>
        </div>
      )}
      <FileUploadRenderer config={config} {...props} />
    </div>
  );
};

/**
 * Hook for managing file upload configuration
 */
export function useFileUploadConfig(initialConfig?: Partial<FileUploadConfig>) {
  const [config, setConfig] = React.useState<FileUploadConfig>(() =>
    getConfig("default", initialConfig)
  );

  const updateConfig = React.useCallback(
    (updates: Partial<FileUploadConfig>) => {
      setConfig((current) => getConfig("default", { ...current, ...updates }));
    },
    []
  );

  const resetConfig = React.useCallback(
    (preset: FileUploadPreset = "default") => {
      setConfig(getConfig(preset));
    },
    []
  );

  const exportConfig = React.useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfig = React.useCallback((configJSON: string) => {
    try {
      const parsedConfig = JSON.parse(configJSON) as Partial<FileUploadConfig>;
      const configErrors = validateConfig(parsedConfig);

      if (configErrors.length > 0) {
        throw new Error(`Configuration errors: ${configErrors.join(", ")}`);
      }

      setConfig(getConfig("default", parsedConfig));
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, []);

  return {
    config,
    updateConfig,
    resetConfig,
    exportConfig,
    importConfig,
  };
}
