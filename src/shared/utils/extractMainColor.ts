import { oklch, parse } from 'culori';
import type { ThemeColorBucket } from '#/features/themes/constants/filters';
import type { DatabaseTheme } from '#/shared/types/db';

export function getColorBucket(colorString: string | undefined): ThemeColorBucket {
    if (!colorString) return 'Gray';

    let h = 0;
    let c = 0;
    let l = 0;

    // parse OKLCH string
    const oklchMatch = colorString.match(/oklch\(\s*([\d.%]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);

    if (oklchMatch) {
        const lStr = oklchMatch[1];
        l = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
        c = parseFloat(oklchMatch[2]);
        h = parseFloat(oklchMatch[3]);
    } else {
        try {
            // fallback parsing
            const color = parse(colorString);
            if (!color) return 'Gray';
            const o = oklch(color);
            if (!o) return 'Gray';
            l = o.l || 0;
            c = o.c || 0;
            h = o.h || 0;
        } catch (e) {
            return 'Gray'; // unparseable
        }
    }

    // check for grays
    if (c < 0.04) {
        if (l < 0.2) return 'Black';
        if (l > 0.9) return 'White';
        return 'Gray';
    }

    // normalize hue
    h = ((h % 360) + 360) % 360;

    // map hue to color
    if (h < 35) return 'Red';
    if (h < 80) return 'Orange';
    if (h < 115) return 'Yellow';
    if (h < 165) return 'Green';
    if (h < 215) return 'Teal';
    if (h < 275) return 'Blue';
    if (h < 320) return 'Purple';
    if (h < 350) return 'Pink';
    return 'Red'; // wraps to red
}

export function extractThemeColors(theme: { primary?: string, secondary?: string, accent?: string } | undefined): DatabaseTheme["colors"] {
    if (!theme) return [];

    const buckets = new Set<string>();

    if (theme.primary) {
        buckets.add(getColorBucket(theme.primary));
    }
    if (theme.secondary) {
        buckets.add(getColorBucket(theme.secondary));
    }
    if (theme.accent) {
        buckets.add(getColorBucket(theme.accent));
    }

    return Array.from(buckets).slice(0, 3) as DatabaseTheme["colors"]
}
