import React from 'react';

const colorGroup1 = [
    { name: 'Primary', class: 'bg-primary text-primary-content', variable: '--color-primary' },
    { name: 'Secondary', class: 'bg-secondary text-secondary-content', variable: '--color-secondary' },
    { name: 'Accent', class: 'bg-accent text-accent-content', variable: '--color-accent' },
    { name: 'Neutral', class: 'bg-neutral text-neutral-content', variable: '--color-neutral' },
];

const colorGroup2 = [
    { name: 'Base 100', class: 'bg-base-100 text-base-content', variable: '--color-base-100' },
    { name: 'Base 200', class: 'bg-base-200 text-base-content', variable: '--color-base-200' },
    { name: 'Base 300', class: 'bg-base-300 text-base-content', variable: '--color-base-300' },
];

const colorGroup3 = [
    { name: 'Info', class: 'bg-info text-info-content', variable: '--color-info' },
    { name: 'Success', class: 'bg-success text-success-content', variable: '--color-success' },
    { name: 'Warning', class: 'bg-warning text-warning-content', variable: '--color-warning' },
    { name: 'Error', class: 'bg-error text-error-content', variable: '--color-error' },
];

export function ColorPalettePreview() {
    return (
        <div className="bg-base-100 text-base-content transition-colors duration-500 pt-6 pb-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 rounded-2xl   lg:p-4">
                    {/* Color Group 1 */}
                    <div className="overflow-hidden rounded-lg  ">
                        <div className="grid grid-cols-1">
                            {colorGroup1.map((color) => (
                                <div key={color.name} className={`${color.class} group h-24 grid place-content-end gap-1 p-6 text-end border-base-content/10`}>
                                    <div className="font-title text-sm font-semibold tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                        {color.name}
                                    </div>
                                    <div className="font-mono text-[0.625rem] tracking-widest tabular-nums">
                                        {color.variable}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Group 2 */}
                    <div className="mt-4 overflow-hidden rounded-lg border-[0.5px] border-base-content/10">
                        <div className="grid xl:grid-cols-3">
                            {colorGroup2.map((color) => (
                                <div key={color.name} className={`${color.class} group h-36 grid place-content-end gap-1 p-6 text-end border-base-content/10`}>
                                    <div className="font-title text-sm font-semibold tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                        {color.name}
                                    </div>
                                    <div className="font-mono text-[0.625rem] tracking-widest tabular-nums">
                                        {color.variable}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Group 3 */}
                    <div className="mt-4 overflow-hidden rounded-lg border-[0.5px] border-base-content/10">
                        <div className="grid xl:grid-cols-4">
                            {colorGroup3.map((color) => (
                                <div key={color.name} className={`${color.class} group h-24 grid place-content-end gap-1 p-6 text-end border-base-content/10`}>
                                    <div className="font-title text-sm font-semibold tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                        {color.name}
                                    </div>
                                    <div className="font-mono text-[0.625rem] tracking-widest tabular-nums">
                                        {color.variable}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
