export interface Theme {
    name: string;
}

export interface ThemeColorMap {
    "primary": string;
    "primary-content": string;
    "secondary": string;
    "secondary-content": string;
    "accent": string;
    "accent-content": string;
    "neutral": string;
    "neutral-content": string;
    "info": string;
    "info-content": string;
    "success": string;
    "success-content": string;
    "warning": string;
    "warning-content": string;
    "error": string;
    "error-content": string;
    "base-100": string;
    "base-200": string;
    "base-300": string;
    "base-content": string;
}

type MapValues<T, R> = {
    [K in keyof T]: R;
};

export type ThemeColorGroup = {
    color: keyof ThemeColorMap;
    content: keyof ThemeColorMap;
};

export type ThemeColorMapNumbers = MapValues<ThemeColorMap, number>;


export type CssTheme = {
    "primary": string;
    "primary-content": string;
    "secondary": string;
    "secondary-content": string;
    "accent": string;
    "accent-content": string;
    "neutral": string;
    "neutral-content": string;
    "info": string;
    "info-content": string;
    "success": string;
    "success-content": string;
    "warning": string;
    "warning-content": string;
    "error": string;
    "error-content": string;
    "base-100": string;
    "base-200": string;
    "base-300": string;
    "base-content": string;
    "radius-selector": string;
    "radius-field": string;
    "radius-box": string;
    "size-selector": string;
    "size-field": string;
    "border": string;
    "depth": string;
    "noise": string;
    "color-scheme": string;
    "default": string;
    "prefersdark": string;
    "font"?: string;
}

