
export function ComponentVariantsPreview() {
    const componentGrid = {
        button: {
            element: 'button',
            icon: true,
            baseClass: 'btn',
            types: [''],
            colors: ['', 'btn-primary', 'btn-secondary', 'btn-accent', 'btn-info', 'btn-success', 'btn-warning', 'btn-error', 'btn-ghost'],
            sizes: ['btn-xl', 'btn-lg', 'btn-md', 'btn-sm', 'btn-xs'],
            label: 'Button',
        },
        badge: {
            element: 'button',
            icon: true,
            baseClass: 'badge',
            types: [''],
            colors: ['', 'badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success', 'badge-warning', 'badge-error'],
            sizes: ['badge-xl', 'badge-lg', 'badge-md', 'badge-sm', 'badge-xs'],
            label: 'Badge',
        },
        input: {
            element: 'input',
            icon: false,
            baseClass: 'input max-w-32',
            types: [''],
            colors: ['', 'input-primary', 'input-secondary', 'input-accent', 'input-info', 'input-success', 'input-warning', 'input-error'],
            sizes: ['input-xl', 'input-lg', 'input-md', 'input-sm', 'input-xs'],
            label: false,
            attributes: { type: 'text', placeholder: 'Input' },
        },
        toggle: {
            element: 'input',
            icon: false,
            baseClass: 'toggle',
            types: [''],
            colors: ['', 'toggle-primary', 'toggle-secondary', 'toggle-accent', 'toggle-info', 'toggle-success', 'toggle-warning', 'toggle-error'],
            sizes: ['toggle-xl', 'toggle-lg', 'toggle-md', 'toggle-sm', 'toggle-xs'],
            label: false,
            attributes: { type: 'checkbox', defaultChecked: true },
        },
        checkbox: {
            element: 'input',
            icon: false,
            baseClass: 'checkbox',
            types: [''],
            colors: ['', 'checkbox-primary', 'checkbox-secondary', 'checkbox-accent', 'checkbox-info', 'checkbox-success', 'checkbox-warning', 'checkbox-error'],
            sizes: ['checkbox-xl', 'checkbox-lg', 'checkbox-md', 'checkbox-sm', 'checkbox-xs'],
            label: false,
            attributes: { type: 'checkbox', defaultChecked: true },
        },
        radio: {
            element: 'input',
            icon: false,
            baseClass: 'radio',
            types: [''],
            colors: ['', 'radio-primary', 'radio-secondary', 'radio-accent', 'radio-info', 'radio-success', 'radio-warning', 'radio-error'],
            sizes: ['radio-xl', 'radio-lg', 'radio-md', 'radio-sm', 'radio-xs'],
            label: false,
            attributes: { type: 'radio', defaultChecked: true },
        },
    };

    const IconHeart = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
        </svg>
    );

    return (
        <div className="bg-base-100 text-base-content transition-colors duration-500 pt-6 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 gap-8">
                    {Object.entries(componentGrid).map(([key, config]) => (
                        <div key={key}>
                            <h5 className="text-lg font-semibold mb-6 text-base-content capitalize">{key}</h5>
                            {config.colors.map((color, colorIdx) => (
                                <div key={`${key}-color-${colorIdx}`}>
                                    {color && <h6 className="text-sm font-semibold mb-3 opacity-60">{color.replace('btn-', '').replace('badge-', '').replace('input-', '').replace('toggle-', '').replace('checkbox-', '').replace('radio-', '')}</h6>}
                                    <div className="flex flex-wrap gap-3 mb-6 items-center">
                                        {config.sizes.map((size) => (
                                            <div key={`${key}-${color}-${size}`}>
                                                {config.element === 'input' ? (
                                                    <input
                                                        className={`${config.baseClass} ${size} ${color}`.trim()}
                                                        {...(config as any).attributes}
                                                    />
                                                ) : (
                                                    <button className={`${config.baseClass} ${size} ${color}`.trim()}>
                                                        {config.icon && <IconHeart />}
                                                        {config.label}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
