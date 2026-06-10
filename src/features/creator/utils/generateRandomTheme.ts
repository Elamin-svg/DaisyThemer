import type { CssTheme } from '#/shared/types/theme';
import { interpolate, oklch, type Oklch } from 'culori';



function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function randomChoice<T>(choices: T[]): T {
    return choices[Math.floor(Math.random() * choices.length)];
}


function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}


function toOklchString(color: Oklch): string {
    const l = color.l !== undefined ? color.l : 0;
    const c = color.c !== undefined ? color.c : 0;
    const h = color.h !== undefined ? color.h : 0;
    
    const safeL = clamp(l, 0, 1);
    const safeC = clamp(c, 0, 0.4);
    const safeH = h;
    return `oklch(${safeL.toFixed(3)} ${safeC.toFixed(3)} ${safeH.toFixed(1)})`;
}


function getContentColor(bgColor: Oklch): string {
    const bgL = bgColor.l !== undefined ? bgColor.l : 0;


    const isDarkContent = bgL > 0.5;

    const base: Oklch = isDarkContent
        ? { mode: 'oklch', l: 0.13, c: 0, h: 0 }
        : { mode: 'oklch', l: 0.97, c: 0, h: 0 };


    const mixer = interpolate([base, bgColor], 'oklch');
    const tinted = oklch(mixer(0.08)) as Oklch;
    return toOklchString(tinted);
}


function buildBackgroundScale(
    baseColor: Oklch,
    isDark: boolean
): [Oklch, Oklch, Oklch] {
    const l = baseColor.l !== undefined ? baseColor.l : 0;
    const c = baseColor.c !== undefined ? baseColor.c : 0;
    const h = baseColor.h !== undefined ? baseColor.h : 0;

    const step = isDark ? 0.04 : 0.025;


    const l1 = clamp(l, 0.06, 0.97);
    const l2 = clamp(isDark ? l + step : l - step, 0.05, 0.95);
    const l3 = clamp(isDark ? l + step * 2.5 : l - step * 2.2, 0.04, 0.92);


    const c2 = clamp(c * 0.85, 0, 0.08);
    const c3 = clamp(c * 0.65, 0, 0.06);

    return [
        { mode: 'oklch', l: l1, c, h },
        { mode: 'oklch', l: l2, c: c2, h },
        { mode: 'oklch', l: l3, c: c3, h },
    ];
}


function buildStatusColor(
    semanticHue: number,
    primaryHue: number,
    l: number,
    c: number
): Oklch {

    const hue = semanticHue + (primaryHue - semanticHue) * 0.12;
    return { mode: 'oklch', l, c, h: hue };
}




type Archetype =
    | 'saas'
    | 'neo-brutalist'
    | 'pastel'
    | 'earthy'
    | 'cyberpunk'
    | 'editorial'
    | 'luxury'
    | 'retro';

type ColorTemperature = 'warm' | 'cool' | 'neutral';

interface ArchetypeConfig {
    label: Archetype;
    forceDark?: boolean;
    forceLight?: boolean;
    temperatureBias: ColorTemperature;

    primaryL: [number, number];
    primaryC: [number, number];
    primaryHuePool: number[];

    secondaryLDelta: [number, number];
    secondaryCScale: [number, number];
    accentLDelta: [number, number];
    accentCScale: [number, number];

    statusC: [number, number];
    statusL: [number, number];

    radiusBox: string[];
    radiusField: string[];
    radiusSelector: string[];
    border: string[];
    depth: string[];
    noise: string[];

    bgChromaRange: [number, number];

    fonts: string[];
}

const ARCHETYPES: ArchetypeConfig[] = [
    {
        label: 'saas',
        temperatureBias: 'cool',
        primaryL: [0.50, 0.68],
        primaryC: [0.14, 0.22],
        primaryHuePool: [220, 230, 245, 255, 265, 210, 200],
        secondaryLDelta: [-0.06, 0.06],
        secondaryCScale: [0.75, 0.95],
        accentLDelta: [0.05, 0.15],
        accentCScale: [1.0, 1.3],
        statusC: [0.14, 0.20],
        statusL: [0.52, 0.60],
        radiusBox: ['0.75rem', '1rem', '1rem'],
        radiusField: ['0.5rem', '0.5rem', '0.625rem'],
        radiusSelector: ['0.375rem', '0.25rem'],
        border: ['1px'],
        depth: ['0', '1'],
        noise: ['0'],
        bgChromaRange: [0.005, 0.025],
        fonts: ['"Inter", sans-serif', '"Roboto", sans-serif', '"DM Sans", sans-serif'],
    },
    {
        label: 'neo-brutalist',
        temperatureBias: 'neutral',
        primaryL: [0.55, 0.78],
        primaryC: [0.22, 0.32],
        primaryHuePool: [50, 60, 30, 340, 20, 120, 200, 280],
        secondaryLDelta: [0.0, 0.1],
        secondaryCScale: [0.9, 1.1],
        accentLDelta: [-0.15, -0.05],
        accentCScale: [1.1, 1.4],
        statusC: [0.22, 0.30],
        statusL: [0.55, 0.65],
        radiusBox: ['0px'],
        radiusField: ['0px'],
        radiusSelector: ['0px'],
        border: ['2px', '3px'],
        depth: ['0'],
        noise: ['0'],
        bgChromaRange: [0.0, 0.012],
        fonts: ['"Space Grotesk", sans-serif', '"JetBrains Mono", monospace', '"Inter", sans-serif'],
    },
    {
        label: 'pastel',
        forceLight: true,
        temperatureBias: 'warm',
        primaryL: [0.72, 0.85],
        primaryC: [0.06, 0.13],
        primaryHuePool: [330, 350, 10, 30, 50, 200, 260, 310, 280],
        secondaryLDelta: [0.0, 0.06],
        secondaryCScale: [0.7, 1.0],
        accentLDelta: [-0.05, 0.05],
        accentCScale: [0.8, 1.1],
        statusC: [0.07, 0.12],
        statusL: [0.65, 0.72],
        radiusBox: ['1.5rem', '2rem', '1.75rem'],
        radiusField: ['1rem', '1.25rem'],
        radiusSelector: ['1rem'],
        border: ['0px', '1px'],
        depth: ['0'],
        noise: ['0'],
        bgChromaRange: [0.015, 0.04],
        fonts: ['"Poppins", sans-serif', '"Outfit", sans-serif', '"DM Sans", sans-serif'],
    },
    {
        label: 'earthy',
        temperatureBias: 'warm',
        primaryL: [0.42, 0.60],
        primaryC: [0.06, 0.13],
        primaryHuePool: [40, 55, 70, 85, 100, 30, 20],
        secondaryLDelta: [-0.08, 0.08],
        secondaryCScale: [0.6, 0.9],
        accentLDelta: [0.08, 0.18],
        accentCScale: [0.9, 1.1],
        statusC: [0.08, 0.14],
        statusL: [0.48, 0.58],
        radiusBox: ['0.5rem', '0.75rem'],
        radiusField: ['0.375rem', '0.5rem'],
        radiusSelector: ['0.25rem'],
        border: ['1px'],
        depth: ['0', '1'],
        noise: ['1'],
        bgChromaRange: [0.01, 0.035],
        fonts: ['"Merriweather", serif', '"DM Sans", sans-serif', '"Playfair Display", serif'],
    },
    {
        label: 'cyberpunk',
        forceDark: true,
        temperatureBias: 'cool',
        primaryL: [0.68, 0.80],
        primaryC: [0.24, 0.35],
        primaryHuePool: [320, 180, 140, 80, 290, 160, 200],
        secondaryLDelta: [0.0, 0.08],
        secondaryCScale: [0.85, 1.1],
        accentLDelta: [-0.08, 0.05],
        accentCScale: [1.0, 1.2],
        statusC: [0.22, 0.30],
        statusL: [0.65, 0.72],
        radiusBox: ['0px'],
        radiusField: ['0px'],
        radiusSelector: ['0px'],
        border: ['1px', '2px'],
        depth: ['0'],
        noise: ['0'],
        bgChromaRange: [0.02, 0.06],
        fonts: ['"Fira Code", monospace', '"JetBrains Mono", monospace', '"Space Grotesk", sans-serif'],
    },
    {
        label: 'editorial',
        temperatureBias: 'neutral',
        primaryL: [0.35, 0.55],
        primaryC: [0.04, 0.12],
        primaryHuePool: [0, 15, 210, 220, 30, 60, 350],
        secondaryLDelta: [0.06, 0.16],
        secondaryCScale: [0.5, 0.8],
        accentLDelta: [-0.18, -0.06],
        accentCScale: [1.1, 1.5],
        statusC: [0.12, 0.18],
        statusL: [0.50, 0.58],
        radiusBox: ['0.25rem', '0.375rem'],
        radiusField: ['0.25rem'],
        radiusSelector: ['0.125rem', '0.25rem'],
        border: ['1px'],
        depth: ['0'],
        noise: ['0'],
        bgChromaRange: [0.0, 0.015],
        fonts: ['"Playfair Display", serif', '"Merriweather", serif', '"Inter", sans-serif'],
    },
    {
        label: 'luxury',
        temperatureBias: 'warm',
        primaryL: [0.38, 0.52],
        primaryC: [0.04, 0.10],
        primaryHuePool: [40, 50, 30, 55, 45, 35, 280, 260],
        secondaryLDelta: [0.05, 0.12],
        secondaryCScale: [0.5, 0.75],
        accentLDelta: [0.15, 0.30],
        accentCScale: [0.7, 1.0],
        statusC: [0.08, 0.14],
        statusL: [0.46, 0.56],
        radiusBox: ['0.375rem', '0.5rem'],
        radiusField: ['0.25rem', '0.375rem'],
        radiusSelector: ['0.25rem'],
        border: ['1px'],
        depth: ['1'],
        noise: ['0'],
        bgChromaRange: [0.005, 0.02],
        fonts: ['"Outfit", sans-serif', '"Playfair Display", serif', '"DM Sans", sans-serif'],
    },
    {
        label: 'retro',
        temperatureBias: 'warm',
        primaryL: [0.55, 0.72],
        primaryC: [0.10, 0.20],
        primaryHuePool: [20, 35, 50, 340, 355, 150, 175, 190],
        secondaryLDelta: [-0.04, 0.08],
        secondaryCScale: [0.75, 1.0],
        accentLDelta: [0.0, 0.12],
        accentCScale: [1.0, 1.2],
        statusC: [0.10, 0.16],
        statusL: [0.55, 0.62],
        radiusBox: ['0.375rem', '0.5rem'],
        radiusField: ['0.375rem'],
        radiusSelector: ['0.25rem'],
        border: ['1px', '2px'],
        depth: ['0', '1'],
        noise: ['1', '0'],
        bgChromaRange: [0.01, 0.03],
        fonts: ['"Space Grotesk", sans-serif', '"Poppins", sans-serif', '"Outfit", sans-serif'],
    },
];




function pickHarmony(archetype: Archetype): [number, number] {
    const harmonyMap: Record<Archetype, [number, number][]> = {
        saas: [[220, 195], [30, 330]],
        'neo-brutalist': [[150, 210], [60, 300], [90, 270]],
        pastel: [[30, 60], [330, 300], [40, 20]],
        earthy: [[20, 40], [35, 70], [50, 25]],
        cyberpunk: [[150, 300], [60, 120], [270, 90]],
        editorial: [[0, 15], [180, 200], [10, 350]],
        luxury: [[20, 340], [15, 5], [30, 350]],
        retro: [[30, 60], [150, 300], [45, 225]],
    };

    const options = harmonyMap[archetype];
    return randomChoice(options);
}



export function generateRandomTheme(): CssTheme {

    const cfg = randomChoice(ARCHETYPES);
    const archetype = cfg.label;

    const isDark = cfg.forceDark
        ? true
        : cfg.forceLight
            ? false
            : Math.random() > 0.45;


    const primaryHue = randomChoice(cfg.primaryHuePool) + randomRange(-10, 10);
    const primaryL = randomRange(...cfg.primaryL);
    const primaryC = randomRange(...cfg.primaryC);
    const primary: Oklch = { mode: 'oklch', l: primaryL, c: primaryC, h: primaryHue };


    const [secondaryHueShift, accentHueShift] = pickHarmony(archetype);

    const secondaryHue = (primaryHue + secondaryHueShift + 360) % 360;
    const secondaryL = clamp(primaryL + randomRange(...cfg.secondaryLDelta), 0.2, 0.92);
    const secondaryC = clamp(primaryC * randomRange(...cfg.secondaryCScale), 0.02, 0.35);
    const secondary: Oklch = { mode: 'oklch', l: secondaryL, c: secondaryC, h: secondaryHue };

    const accentHue = (primaryHue + accentHueShift + 360) % 360;
    const accentL = clamp(primaryL + randomRange(...cfg.accentLDelta), 0.2, 0.92);
    const accentC = clamp(primaryC * randomRange(...cfg.accentCScale), 0.02, 0.38);
    const accent: Oklch = { mode: 'oklch', l: accentL, c: accentC, h: accentHue };


    const neutralHue = primaryHue;
    const neutralChroma = randomRange(0.008, 0.022);
    const neutralL = isDark
        ? clamp(primaryL * 0.55 + 0.08, 0.08, 0.35)
        : clamp(primaryL * 0.40 + 0.42, 0.45, 0.72);
    const neutral: Oklch = { mode: 'oklch', l: neutralL, c: neutralChroma, h: neutralHue };


    const bgChroma = randomRange(...cfg.bgChromaRange);
    const bgL = isDark
        ? randomRange(0.10, 0.17)
        : randomRange(0.95, 0.99);

    const bgHue =
        cfg.temperatureBias === 'warm'
            ? (primaryHue + randomRange(-10, 10) + 360) % 360
            : (primaryHue + 360) % 360;

    const bgBase: Oklch = { mode: 'oklch', l: bgL, c: bgChroma, h: bgHue };
    const [base100, base200, base300] = buildBackgroundScale(bgBase, isDark);


    const statusC = randomRange(...cfg.statusC);
    const statusL = randomRange(...cfg.statusL);


    const info = buildStatusColor(265, primaryHue, statusL, statusC);
    const success = buildStatusColor(145, primaryHue, statusL, statusC);
    const warning = buildStatusColor(88, primaryHue, clamp(statusL + 0.08, 0.55, 0.78), statusC);
    const error = buildStatusColor(24, primaryHue, statusL, statusC);


    const radiusBox = randomChoice(cfg.radiusBox);
    const radiusField = randomChoice(cfg.radiusField);
    const radiusSelector = randomChoice(cfg.radiusSelector);
    const border = randomChoice(cfg.border);
    const depth = randomChoice(cfg.depth);
    const noise = randomChoice(cfg.noise);


    const isCompact = archetype === 'editorial' || archetype === 'luxury';
    const sizeSelector = randomRange(
        isCompact ? 0.20 : 0.22,
        isCompact ? 0.24 : 0.28
    ).toFixed(2) + 'rem';
    const sizeField = randomRange(
        isCompact ? 0.24 : 0.26,
        isCompact ? 0.30 : 0.34
    ).toFixed(2) + 'rem';


    return {
        "primary": toOklchString(primary),
        "primary-content": getContentColor(primary),
        "secondary": toOklchString(secondary),
        "secondary-content": getContentColor(secondary),
        "accent": toOklchString(accent),
        "accent-content": getContentColor(accent),
        "neutral": toOklchString(neutral),
        "neutral-content": getContentColor(neutral),
        "info": toOklchString(info),
        "info-content": getContentColor(info),
        "success": toOklchString(success),
        "success-content": getContentColor(success),
        "warning": toOklchString(warning),
        "warning-content": getContentColor(warning),
        "error": toOklchString(error),
        "error-content": getContentColor(error),
        "base-100": toOklchString(base100),
        "base-200": toOklchString(base200),
        "base-300": toOklchString(base300),
        "base-content": getContentColor(base100),
        "radius-selector": radiusSelector,
        "radius-field": radiusField,
        "radius-box": radiusBox,
        "size-selector": sizeSelector,
        "size-field": sizeField,
        "border": border,
        "depth": depth,
        "noise": noise,
        "font": randomChoice(cfg.fonts),
        "color-scheme": isDark ? "dark" : "light",
        "default": "false",
        "prefersdark": isDark ? "true" : "false",
    };
}