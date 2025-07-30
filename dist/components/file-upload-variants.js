"use client";
import { cva } from "class-variance-authority";
/**
 * File upload container variants
 */
export const fileUploadVariants = cva("relative inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            button: "rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
            dropzone: "border-2 border-dashed border-border hover:border-primary/50 bg-background rounded-lg p-6 text-center cursor-pointer transition-colors",
            preview: "border border-border rounded-lg overflow-hidden bg-background",
            compact: "rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        },
        size: {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-11 px-8",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        },
    },
    compoundVariants: [
        {
            variant: "dropzone",
            size: "sm",
            className: "min-h-24 p-4",
        },
        {
            variant: "dropzone",
            size: "md",
            className: "min-h-32 p-6",
        },
        {
            variant: "dropzone",
            size: "lg",
            className: "min-h-40 p-8",
        },
        {
            variant: "preview",
            size: "sm",
            className: "w-16 h-16",
        },
        {
            variant: "preview",
            size: "md",
            className: "w-24 h-24",
        },
        {
            variant: "preview",
            size: "lg",
            className: "w-32 h-32",
        },
        {
            variant: "compact",
            size: "sm",
            className: "h-8 px-2 text-xs",
        },
        {
            variant: "compact",
            size: "md",
            className: "h-9 px-3 text-sm",
        },
        {
            variant: "compact",
            size: "lg",
            className: "h-10 px-4",
        },
    ],
    defaultVariants: {
        variant: "dropzone",
        size: "md",
        radius: "md",
    },
});
/**
 * File preview variants
 */
export const filePreviewVariants = cva("relative overflow-hidden transition-all", {
    variants: {
        variant: {
            grid: "rounded-lg border border-border bg-background p-2",
            list: "flex items-center gap-3 rounded-md border border-border bg-background p-3",
            compact: "flex items-center gap-2 rounded border border-border bg-background p-2",
        },
        size: {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
        },
    },
    compoundVariants: [
        {
            variant: "grid",
            size: "sm",
            className: "w-20 h-20",
        },
        {
            variant: "grid",
            size: "md",
            className: "w-24 h-24",
        },
        {
            variant: "grid",
            size: "lg",
            className: "w-32 h-32",
        },
    ],
    defaultVariants: {
        variant: "grid",
        size: "md",
    },
});
/**
 * Error message variants
 */
export const errorVariants = cva("text-sm font-medium", {
    variants: {
        variant: {
            default: "text-destructive",
            subtle: "text-muted-foreground",
            prominent: "text-destructive bg-destructive/10 px-3 py-2 rounded-md",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
/**
 * Progress bar variants
 */
export const progressVariants = cva("w-full bg-secondary rounded-full overflow-hidden", {
    variants: {
        size: {
            sm: "h-1",
            md: "h-2",
            lg: "h-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
/**
 * Icon variants
 */
export const iconVariants = cva("flex-shrink-0", {
    variants: {
        size: {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
            xl: "w-8 h-8",
        },
        variant: {
            default: "text-muted-foreground",
            primary: "text-primary",
            success: "text-green-500",
            error: "text-destructive",
            warning: "text-yellow-500",
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});
/**
 * Button variants for file upload actions
 */
export const uploadButtonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
