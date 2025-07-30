import { type VariantProps } from "class-variance-authority";
/**
 * File upload container variants
 */
export declare const fileUploadVariants: (props?: ({
    variant?: "button" | "preview" | "dropzone" | "compact" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    radius?: "none" | "sm" | "md" | "lg" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * File preview variants
 */
export declare const filePreviewVariants: (props?: ({
    variant?: "grid" | "list" | "compact" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Error message variants
 */
export declare const errorVariants: (props?: ({
    variant?: "default" | "subtle" | "prominent" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Progress bar variants
 */
export declare const progressVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Icon variants
 */
export declare const iconVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    variant?: "success" | "error" | "default" | "primary" | "warning" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Button variants for file upload actions
 */
export declare const uploadButtonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "lg" | "default" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type FileUploadVariantProps = VariantProps<typeof fileUploadVariants>;
export type FilePreviewVariantProps = VariantProps<typeof filePreviewVariants>;
export type ErrorVariantProps = VariantProps<typeof errorVariants>;
export type ProgressVariantProps = VariantProps<typeof progressVariants>;
export type IconVariantProps = VariantProps<typeof iconVariants>;
export type UploadButtonVariantProps = VariantProps<typeof uploadButtonVariants>;
//# sourceMappingURL=file-upload-variants.d.ts.map