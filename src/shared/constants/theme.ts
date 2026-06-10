import type { ThemeColorMap, ThemeColorGroup } from "#/shared/types/theme";

export const themeColorKeys = [
    "primary",
    "primary-content",
    "secondary",
    "secondary-content",
    "accent",
    "accent-content",
    "neutral",
    "neutral-content",
    "info",
    "info-content",
    "success",
    "success-content",
    "warning",
    "warning-content",
    "error",
    "error-content",
    "base-100",
    "base-200",
    "base-300",
    "base-content",
] as const satisfies readonly (keyof ThemeColorMap)[];


const themeGroups = {
    primary: {
        color: "primary",
        content: "primary-content",
    },
    secondary: {
        color: "secondary",
        content: "secondary-content",
    },
    accent: {
        color: "accent",
        content: "accent-content",
    },
    neutral: {
        color: "neutral",
        content: "neutral-content",
    },
    info: {
        color: "info",
        content: "info-content",
    },
    success: {
        color: "success",
        content: "success-content",
    },
    warning: {
        color: "warning",
        content: "warning-content",
    },
    error: {
        color: "error",
        content: "error-content",
    },
} satisfies Record<string, ThemeColorGroup>;