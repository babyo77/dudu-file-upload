"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils";
import { progressVariants, } from "./file-upload-variants";
export const ProgressBar = ({ value, size = "md", className, showLabel = false, status = "uploading", }) => {
    const getStatusColor = () => {
        switch (status) {
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-destructive";
            case "uploading":
                return "bg-primary";
            default:
                return "bg-muted-foreground";
        }
    };
    const clampedValue = Math.min(100, Math.max(0, value));
    return (_jsxs("div", { className: cn("w-full", className), children: [_jsx("div", { className: progressVariants({ size }), children: _jsx("div", { className: cn("h-full transition-all duration-300 ease-out rounded-full", getStatusColor()), style: { width: `${clampedValue}%` } }) }), showLabel && (_jsxs("div", { className: "flex justify-between items-center mt-1 text-xs text-muted-foreground", children: [_jsx("span", { className: "capitalize", children: status }), _jsxs("span", { children: [Math.round(clampedValue), "%"] })] }))] }));
};
