import React from "react";
import { type ProgressVariantProps } from "./file-upload-variants";
interface ProgressBarProps extends ProgressVariantProps {
    value: number;
    className?: string;
    showLabel?: boolean;
    status?: "pending" | "uploading" | "success" | "error";
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
export {};
//# sourceMappingURL=progress-bar.d.ts.map