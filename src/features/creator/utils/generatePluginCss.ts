import type { CssTheme } from '#/shared/types/theme';

export function generatePluginCss(themeName: string | undefined, theme: Partial<CssTheme>): string {
    const colorVars = Object.entries(theme)
        .filter(([key]) => key.startsWith('base') || key.startsWith('primary') || key.startsWith('secondary') || key.startsWith('accent') || key.startsWith('neutral') || key.startsWith('info') || key.startsWith('success') || key.startsWith('warning') || key.startsWith('error'))
        .map(([key, value]) => `  --color-${key}: ${value};`);

    const otherVars = Object.entries(theme)
        .filter(([key]) => ['radius-box', 'radius-field', 'radius-selector', 'size-selector', 'size-field', 'border', 'depth', 'noise', 'font'].includes(key))
        .map(([key, value]) => `  --${key}: ${value};`);

    return `@plugin "daisyui/theme" {
  name: "${themeName || 'custom'}";
  default: ${theme.default === 'true'};
  prefersdark: ${theme.prefersdark === 'true'};
  color-scheme: "${theme['color-scheme'] || 'light'}";
${colorVars.join('\n')}
${otherVars.join('\n')}
}`;
}
