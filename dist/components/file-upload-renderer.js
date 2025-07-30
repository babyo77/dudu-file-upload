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
import React from "react";
import { FileUpload } from "./file-upload";
import { getConfig } from "../config/default-configs";
import { validateConfig } from "../config/default-configs";
/**
 * Config-driven FileUpload renderer
 * Renders a FileUpload component based on a JSON configuration
 */
export const FileUploadRenderer = (_a) => {
    var { config, className, onFilesChange, onFilesAdded, onError, initialFiles } = _a, props = __rest(_a, ["config", "className", "onFilesChange", "onFilesAdded", "onError", "initialFiles"]);
    // Validate configuration
    const configErrors = validateConfig(config);
    if (configErrors.length > 0) {
        console.warn("FileUpload configuration errors:", configErrors);
    }
    return (_jsx(FileUpload, Object.assign({ variant: config.variant, size: config.size, radius: config.radius, multiple: config.multiple, maxFiles: config.maxFiles, maxSize: config.maxSize, accept: config.accept, disabled: config.disabled, showPreview: config.showPreview, allowRemove: config.allowRemove, labels: config.labels, className: className, onFilesChange: onFilesChange, onFilesAdded: onFilesAdded, onError: onError, initialFiles: initialFiles }, props)));
};
export const FileUploadPresetRenderer = (_a) => {
    var { preset, overrides = {} } = _a, props = __rest(_a, ["preset", "overrides"]);
    const config = getConfig(preset, overrides);
    return _jsx(FileUploadRenderer, Object.assign({ config: config }, props));
};
export const FileUploadJSONRenderer = (_a) => {
    var { configJSON, fallbackPreset = "default", onConfigError } = _a, props = __rest(_a, ["configJSON", "fallbackPreset", "onConfigError"]);
    const [config, setConfig] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        try {
            const parsedConfig = JSON.parse(configJSON);
            const fullConfig = getConfig("default", parsedConfig);
            // Validate the configuration
            const configErrors = validateConfig(parsedConfig);
            if (configErrors.length > 0) {
                const errorMessage = `Configuration errors: ${configErrors.join(", ")}`;
                setError(errorMessage);
                onConfigError === null || onConfigError === void 0 ? void 0 : onConfigError(errorMessage);
                // Use fallback preset on error
                setConfig(getConfig(fallbackPreset));
            }
            else {
                setConfig(fullConfig);
                setError(null);
            }
        }
        catch (parseError) {
            const errorMessage = `Invalid JSON configuration: ${parseError instanceof Error ? parseError.message : "Unknown error"}`;
            setError(errorMessage);
            onConfigError === null || onConfigError === void 0 ? void 0 : onConfigError(errorMessage);
            // Use fallback preset on error
            setConfig(getConfig(fallbackPreset));
        }
    }, [configJSON, fallbackPreset, onConfigError]);
    if (!config) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { children: [error && (_jsxs("div", { className: "mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md", children: [_jsx("div", { className: "text-sm text-destructive font-medium", children: "Configuration Error" }), _jsx("div", { className: "text-xs text-destructive/80 mt-1", children: error }), _jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: ["Using fallback preset: ", fallbackPreset] })] })), _jsx(FileUploadRenderer, Object.assign({ config: config }, props))] }));
};
/**
 * Hook for managing file upload configuration
 */
export function useFileUploadConfig(initialConfig) {
    const [config, setConfig] = React.useState(() => getConfig("default", initialConfig));
    const updateConfig = React.useCallback((updates) => {
        setConfig((current) => getConfig("default", Object.assign(Object.assign({}, current), updates)));
    }, []);
    const resetConfig = React.useCallback((preset = "default") => {
        setConfig(getConfig(preset));
    }, []);
    const exportConfig = React.useCallback(() => {
        return JSON.stringify(config, null, 2);
    }, [config]);
    const importConfig = React.useCallback((configJSON) => {
        try {
            const parsedConfig = JSON.parse(configJSON);
            const configErrors = validateConfig(parsedConfig);
            if (configErrors.length > 0) {
                throw new Error(`Configuration errors: ${configErrors.join(", ")}`);
            }
            setConfig(getConfig("default", parsedConfig));
            return { success: true, error: null };
        }
        catch (error) {
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
