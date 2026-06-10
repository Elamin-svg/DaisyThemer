import { useThemeStore } from '#/features/creator/store/themeStore';
import { SettingSection } from './Shared';

function SizeSelector({
    label,
    description,
    value,
    onChange,
    pixelValues
}: {
    label: string,
    description: string,
    value: string,
    onChange: (v: string) => void,
    pixelValues: number[]
}) {
    // value is like "0.25rem". We parse it.
    const remValue = parseFloat(value) || 0.25;
    // Base size in pixels (rem * 16)
    const pxValue = (remValue * 16).toFixed(1);

    const labels = ['XS', 'xs', 'MD', 'LG', 'XL'];
    const heights = ['h-4', 'h-6', 'h-8', 'h-10', 'h-12'];

    return (
        <div>
            <p className="font-semibold text-xs">{label}</p>
            <p className="text-xs opacity-70 mb-2 italic">{description}</p>

            <div className="bg-base-100 rounded-xl p-4 flex justify-between items-center border border-base-300">
                {/* Left side: Visualizer */}
                <div className="flex gap-2 items-end h-20">
                    {labels.map((lbl, idx) => (
                        <div key={lbl} className="flex flex-col items-center gap-1">
                            <div className={`w-1.5 bg-neutral rounded-full ${heights[idx]}`}></div>
                            <span className="text-[9px] font-bold text-base-content mt-1">{lbl}</span>
                            <span className="text-[9px] text-base-content/70">{pixelValues[idx]}</span>
                        </div>
                    ))}
                </div>

                {/* Right side: Controls */}
                <div className="flex flex-col items-center">
                    <p className="text-xs text-base-content/70 mb-1">{label} base size</p>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-base-content leading-none">{pxValue}</span>
                        <span className="text-[9px] text-base-content/70 mt-1 mb-3">Pixels</span>
                    </div>

                    <div className="w-24">
                        <input
                            type="range"
                            min="0.1" max="0.5" step="0.025"
                            value={remValue}
                            onChange={(e) => onChange(`${e.target.value}rem`)}
                            className="range range-neutral range-xs"
                        />
                        <div className="flex justify-between px-1 mt-1">
                            <span className="w-0.5 h-1 bg-base-300"></span>
                            <span className="w-0.5 h-1 bg-base-300"></span>
                            <span className="w-0.5 h-1.5 bg-base-content/50"></span>
                            <span className="w-0.5 h-1 bg-base-300"></span>
                            <span className="w-0.5 h-1 bg-base-300"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SideSizes() {
    const sizeField = useThemeStore((s) => s.cssTheme['size-field']);
    const sizeSelector = useThemeStore((s) => s.cssTheme['size-selector']);
    const setThemeProperty = useThemeStore((s) => s.setThemeProperty);

    return (
        <SettingSection>
            <SizeSelector
                label="Fields"
                description="button, input, select, tab"
                value={sizeField}
                onChange={(v) => setThemeProperty('size-field', v)}
                pixelValues={[24, 32, 40, 48, 56]}
            />
            <SizeSelector
                label="Selectors"
                description="checkbox, toggle, badge"
                value={sizeSelector}
                onChange={(v) => setThemeProperty('size-selector', v)}
                pixelValues={[16, 20, 24, 28, 32]}
            />
        </SettingSection>
    );
}
