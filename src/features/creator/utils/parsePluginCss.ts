import type { CssTheme } from '#/shared/types/theme';

const parseCache = new Map<string, { themeName?: string, theme?: Partial<CssTheme> } | null>();

export function parsePluginCss(css: string): { themeName?: string, theme?: Partial<CssTheme> } | null {
    if (!css.includes('@plugin "daisyui/theme"')) return null;

    if (parseCache.has(css)) {
        return parseCache.get(css)!;
    }

    const theme: any = {};
    let themeName = undefined;

    const nameMatch = css.match(/name:\s*["']([^"']+)["']/);
    if (nameMatch) themeName = nameMatch[1];

    const defaultMatch = css.match(/default:\s*(true|false)/);
    if (defaultMatch) theme['default'] = defaultMatch[1];

    const prefersDarkMatch = css.match(/prefersdark:\s*(true|false)/);
    if (prefersDarkMatch) theme['prefersdark'] = prefersDarkMatch[1];

    const colorSchemeMatch = css.match(/color-scheme:\s*["']([^"']+)["']/);
    if (colorSchemeMatch) theme['color-scheme'] = colorSchemeMatch[1];

    const varRegex = /--([^:]+):\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(css)) !== null) {
        let key = match[1].trim();
        let value = match[2].trim();

        if (key.startsWith('color-')) {
            key = key.replace('color-', '');
        }
        theme[key] = value;
    }

    if (Object.keys(theme).length === 0) {
        parseCache.set(css, null);
        return null;
    }

    const result = { themeName, theme };
    parseCache.set(css, result);
    return result;
}
