import { useThemeStore } from '#/features/creator/store/themeStore';
import { SettingSection } from './Shared';

function RadiusSelector({ label, description, value, onChange }: { label: string, description: string, value: string, onChange: (v: string) => void }) {
    const presets = ['0', '0.25rem', '0.5rem', '1rem', '1.5rem'];
    return (
        <div>
            <p className=" text-xs">{label}</p>
            <p className="text-xs opacity-70 mb-2 italic">{description}</p>
            <div className="flex gap-2 ">
                {presets.map(preset => {
                    // normalize '0px' or '0rem' to '0' for comparison if needed, but we'll stick to exact strings.
                    const isActive = value === preset || (value === '0px' && preset === '0');
                    return (
                        <button
                            key={preset}
                            onClick={() => onChange(preset)}
                            className={`relative cursor-pointer flex-1 h-11  rounded-lg border flex items-center duration-75 justify-center transition-colors bg-base-100  border-transparent`}
                        >
                            <div
                                className={`absolute top-2 right-2 bottom-2 left-2 border-t-2 border-r-2 ${isActive ? 'border-base-content/70   ' : 'border-base-content/20 hover:border-base-content/70'}`}
                                style={{ borderTopRightRadius: preset }}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default function SideRadius() {
    const radiusBox = useThemeStore((s) => s.cssTheme['radius-box']);
    const radiusField = useThemeStore((s) => s.cssTheme['radius-field']);
    const radiusSelector = useThemeStore((s) => s.cssTheme['radius-selector']);
    const setThemeProperty = useThemeStore((s) => s.setThemeProperty);

    return (
        <SettingSection className=''>
            <RadiusSelector
                label="Boxes"
                description="card, modal, alert"
                value={radiusBox}
                onChange={(v) => setThemeProperty('radius-box', v)}
            />
            <RadiusSelector
                label="Fields"
                description="button, input, select, tab"
                value={radiusField}
                onChange={(v) => setThemeProperty('radius-field', v)}
            />
            <RadiusSelector
                label="Selectors"
                description="checkbox, toggle, badge"
                value={radiusSelector}
                onChange={(v) => setThemeProperty('radius-selector', v)}
            />
        </SettingSection>
    );
}
