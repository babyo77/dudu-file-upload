"use client";

import React from "react";
import { cn } from "../utils";
import {
  progressVariants,
  type ProgressVariantProps,
} from "./file-upload-variants";

interface ProgressBarProps extends ProgressVariantProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  status?: "pending" | "uploading" | "success" | "error";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = "md",
  className,
  showLabel = false,
  status = "uploading",
}) => {
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

  return (
    <div className={cn("w-full", className)}>
      <div className={progressVariants({ size })}>
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            getStatusColor()
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
          <span className="capitalize">{status}</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
    </div>
  );
};
