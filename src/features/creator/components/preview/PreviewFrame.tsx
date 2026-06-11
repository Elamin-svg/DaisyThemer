import { AnimatedTabs } from '#/shared/ui/AnimatedTabs';
import { useThemeStore } from '#/features/creator/store/themeStore';
import type { CssTheme } from '#/shared/types/theme';
import { CheckIcon as Check, XMarkIcon as X } from '@heroicons/react/24/outline';
import React, { Suspense, useEffect, useId, useMemo, useState } from 'react';

const ColorPalettePreview = React.lazy(() => import('#/features/creator/components/previews/ColorPalettePreview').then(m => ({ default: m.ColorPalettePreview })));
const ComponentVariantsPreview = React.lazy(() => import('#/features/creator/components/previews/ComponentVariantsPreview').then(m => ({ default: m.ComponentVariantsPreview })));
const ComponentsPreview = React.lazy(() => import('#/features/creator/components/previews/ComponentsPreview'));
const LoginPreview = React.lazy(() => import('#/features/creator/components/previews/LoginPreview').then(m => ({ default: m.LoginPreview })));
const PricingPreview = React.lazy(() => import('#/features/creator/components/previews/PricingPreview').then(m => ({ default: m.PricingPreview })));
const SettingsPreview = React.lazy(() => import('#/features/creator/components/previews/SettingsPreview').then(m => ({ default: m.SettingsPreview })));
const CssEditor = React.lazy(() => import('../editor/CssEditor'));

type Tab = 'components' | 'variants' | 'palette' | 'login' | 'pricing' | 'settings' | 'editor';

const NON_COLOR_KEYS = new Set(['radius-box', 'radius-field', 'radius-selector', 'size-selector', 'size-field', 'border', 'depth', 'noise']);
const SKIP_KEYS = new Set(['default', 'prefersdark', 'color-scheme', 'font']);

function buildInlineVars(theme: CssTheme): React.CSSProperties {
  const style: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    if (SKIP_KEYS.has(key)) continue;
    style[NON_COLOR_KEYS.has(key) ? `--${key}` : `--color-${key}`] = value;
  }
  return style as React.CSSProperties;
}

const TABS = [
  { id: 'components', label: 'Components' },
  { id: 'variants', label: 'Variants' },
  { id: 'palette', label: 'Palette' },
  { id: 'login', label: 'Login' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'settings', label: 'Settings' },
];

interface PreviewFrameProps {
  hideEditor?: boolean;
  creating?: boolean;
  theme?: CssTheme;
  overrides?: string;
  compiledOverrides?: string;
}

export const PreviewFrame = React.memo(function PreviewFrame({
  hideEditor = false,
  creating = true,
  theme,
  overrides,
  compiledOverrides,
}: PreviewFrameProps) {
  const [activeTab, setActiveTab] = useState<Tab>('components');

  const storeCssTheme = useThemeStore((s) => s.cssTheme);
  const storeCompiledOverrides = useThemeStore((s) => s.compiledCssOverrides);

  const cssTheme = theme ?? storeCssTheme;

  // compiled prop → store compiled (create) → raw prop (view)
  const cssOverrides = compiledOverrides?.length
    ? compiledOverrides
    : creating
      ? storeCompiledOverrides
      : (overrides || '');

  const scopeId = useId().replace(/:/g, '');

  // Inject compiled overrides scoped to the preview via CSS @scope
  useEffect(() => {
    const id = `preview-overrides-${scopeId}`;
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = cssOverrides.trim()
      ? `@scope ([data-theme="preview-custom"]) {\n${cssOverrides}\n}`
      : '';
    return () => { document.getElementById(id)?.remove(); };
  }, [cssOverrides, scopeId]);

  const inlineVars = useMemo(() => buildInlineVars(cssTheme), [cssTheme]);
  const fontFamily = cssTheme.font || '"DM Sans", sans-serif';

  const previewContent = useMemo(() => {
    let Content;
    if (activeTab === 'login') Content = LoginPreview;
    else if (activeTab === 'pricing') Content = PricingPreview;
    else if (activeTab === 'settings') Content = SettingsPreview;
    else if (activeTab === 'variants') Content = ComponentVariantsPreview;
    else if (activeTab === 'palette') Content = ColorPalettePreview;
    else Content = ComponentsPreview;

    return (
      <Suspense fallback={<div className="p-8 flex  text-center min-h-144 text-base-content/50">
        <span className="loading loading-spinner m-auto"></span></div>}>
        <Content />
      </Suspense>
    );
  }, [activeTab]);

  const tabsElement = (
    <>
      <div className="md:hidden flex-1 w-full">
        <select
          className="select select-bordered w-full"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as Tab)}
        >
          {TABS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          {!hideEditor && <option value="editor">overrides.css</option>}
        </select>
      </div>
      <div className="hidden md:block">
        <AnimatedTabs tabs={TABS} activeTab={activeTab} onChange={(id: Tab) => setActiveTab(id)} />
      </div>
    </>
  );

  return (
    <div className="w-full flex-1 flex flex-col min-h-0">
      {hideEditor && (
        <div className="mb-3 flex items-center justify-between overflow-x-auto gap-24">
          {tabsElement}
          <span className="text-sm hidden sm:flex gap-1.5 items-center text-base-content/50">
            {overrides?.length ? <><Check className="size-3" /> Includes Overrides</> : <><X className="size-3" /> Includes No Overrides</>}
          </span>
        </div>
      )}
      <div className={`w-full flex-1 border border-base-300  max-h-full  rounded-box  overflow-auto    ${!hideEditor ? "h-170!" : ""} flex flex-col`}>
        {!hideEditor && (
          <div className={`  bg-base-200 border-b border-base-300 px-4 py-2 flex justify-between items-center`}>
            {tabsElement}
            <button
              onClick={() => setActiveTab('editor')}
              className={`${activeTab === 'editor' ? 'text-base-content bg-base-300' : 'text-base-content/70 hover:text-base-content'} hidden md:flex relative rounded-full px-3 py-1.5 cursor-pointer text-sm font-medium transition items-center gap-1.5 ml-2`}
            >
              overrides.css
            </button>
          </div>
        )}
        {activeTab === 'editor' ? (
          <Suspense fallback={<div className="p-8 text-center text-base-content/50"><span className="loading loading-spinner"></span></div>}>
            <CssEditor />
          </Suspense>
        ) : (
          <section
            data-theme="preview-custom"
            style={{ ...inlineVars, fontFamily } as React.CSSProperties}
            className="w-full flex-1  overflow-y-auto"
          >
            {previewContent}
          </section>
        )}
      </div>
    </div >
  );
});
