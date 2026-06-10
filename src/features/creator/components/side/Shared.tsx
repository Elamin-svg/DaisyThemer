import React from 'react';

export function SettingToggle({
    label,
    description,
    checked,
    onChange
}: {
    label: string,
    description?: string,
    checked: boolean,
    onChange: (val: boolean) => void
}) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className=" text-xs m-0">{label}</p>
                {description && <p className="text-xs opacity-70 mt-1 italic">{description}</p>}
            </div>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="toggle toggle-xs"
            />
        </div>
    );
}

export function SettingRange({
    label,
    value,
    min,
    max,
    step,
    onChange,
    unit = ""
}: {
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (val: string) => void,
    unit?: string
}) {
    return (
        <div>
            <p className=" text-xs m-0">{label}</p>
            <div className="flex gap-2 items-center mt-2">
                <input
                    type="range"
                    min={min} max={max} step={step}
                    value={value}
                    onChange={(e) => onChange(`${e.target.value}${unit}`)}
                    className="range range-xs"
                />
                <span className="w-12 text-right text-xs opacity-70">{value}{unit}</span>
            </div>
        </div>
    );
}

export function SettingSection({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`flex flex-col    ${className} gap-4 `}>{children}</div>;
}
