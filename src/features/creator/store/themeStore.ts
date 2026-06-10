import type { CssTheme } from '#/shared/types/theme';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const LOCALSTORAGE_KEY = 'theme-builder-draft';

/** Only persist theme state to localStorage when on localhost (dev environment). */
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const DEFAULT_CSS_THEME: CssTheme = {
  "primary": "oklch(0.7946 0.0933 65.7)",
  "primary-content": "oklch(0.1 0.0933 65.7)",
  "secondary": "oklch(0.7946 0.0933 192.82)",
  "secondary-content": "oklch(0.1 0.0933 192.82)",
  "accent": "oklch(0.7946 0.0933 308.19)",
  "accent-content": "oklch(0.1 0.0933 308.19)",
  "neutral": "oklch(0.99 0.005 308.73)",
  "neutral-content": "#0f1110",
  "info": "oklch(0.7946 0.0933 241.96)",
  "info-content": "oklch(0.2 0.0933 241.96)",
  "success": "oklch(0.7946 0.0933 145.82)",
  "success-content": "oklch(0.2 0.0933 145.82)",
  "warning": "oklch(0.7946 0.0933 90.27)",
  "warning-content": "oklch(0.2 0.0933 90.27)",
  "error": "oklch(0.7946 0.0933 20.83)",
  "error-content": "oklch(0.2 0.0933 20.83)",
  "base-100": "oklch(0.16 0.005 308.73)",
  "base-200": "oklch(0.20 0.005 308.73)",
  "base-300": "oklch(0.28 0.005 308.73)",
  "base-content": "#f1f4f9",
  "radius-selector": "1rem",
  "radius-field": "1rem",
  "radius-box": "1rem",
  "size-selector": "0.25rem",
  "size-field": "0.25rem",
  "border": "1px",
  "depth": "0",
  "noise": "0",
  "color-scheme": "light",
  "default": "false",
  "prefersdark": "false",
  "font": '"DM Sans", sans-serif',
};

interface ThemeState {
  themeName: string;
  setThemeName: (name: string) => void;
  cssTheme: CssTheme;
  setCssTheme: (cssTheme: CssTheme) => void;
  setThemeProperty: (key: keyof CssTheme, value: string) => void;
  cssOverrides: string;
  setCssOverrides: (cssOverrides: string) => void;
  compiledCssOverrides: string;
  setCompiledCssOverrides: (compiledCssOverrides: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeName: '',
      setThemeName: (themeName) => set({ themeName }),
      cssTheme: DEFAULT_CSS_THEME,
      compiledCssOverrides: '',
      cssOverrides: '',
      setCssOverrides: (cssOverrides) => set({ cssOverrides }),
      setCssTheme: (cssTheme) => set({ cssTheme }),
      setThemeProperty: (key, value) => set((state) => ({ cssTheme: { ...state.cssTheme, [key]: value } })),
      setCompiledCssOverrides: (compiledCssOverrides) => set({ compiledCssOverrides }),
    }),
    {
      name: LOCALSTORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist the theme data fields; setters are not serialisable.
      partialize: (state) => ({
        themeName: state.themeName,
        cssTheme: state.cssTheme,
        cssOverrides: state.cssOverrides,
        compiledCssOverrides: state.compiledCssOverrides,
      }),
      // Skip hydration entirely on non-localhost environments.
      skipHydration: !isLocalhost,
    },
  ),
);
