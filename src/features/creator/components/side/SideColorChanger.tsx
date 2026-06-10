import { useThemeStore } from "#/features/creator/store/themeStore";
import type { ThemeColorMap } from "#/shared/types/theme";
import { converter, formatHex, formatCss } from "culori";
import { useCallback, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const toOklch = converter("oklch");
const toHsl = converter("hsl");

const FORMATS = ["hex", "oklch", "hsl"];

export default function SideColorChanger({
    color,
}: {
    color: keyof ThemeColorMap
}) {
    const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);
    const colorValue = useThemeStore(useCallback((state) => state.cssTheme[color], [color]));
    const setThemeProperty = useThemeStore(useCallback((state) => state.setThemeProperty, []));
    const [inputValue, setInputValue] = useState("");


    const displayAsFormat = useCallback((format: string) => {
        const current = colorValue;
        switch (format) {
            case "oklch": {
                const parsed = toOklch(current);
                return parsed ? formatCss(parsed) : current;
            }
            case "hsl": {
                const parsed = toHsl(current);
                return parsed ? formatCss(parsed) : current;
            }
            case "hex":
                return formatHex(current) || current;
        }
        return current;
    }, [colorValue]);

    useEffect(() => {
        setInputValue(displayAsFormat(selectedFormat) || "");
    }, [selectedFormat, displayAsFormat]);

    const handleColorChange = (newColorString: string) => {
        const oklchObj = toOklch(newColorString);
        if (oklchObj) {
            // Format as standard oklch(L C H) compatible with CSS
            // L is typically 0-1, C is 0-0.4, H is 0-360
            const l = (oklchObj.l || 0).toFixed(4);
            const c = (oklchObj.c || 0).toFixed(4);
            const h = (oklchObj.h || 0).toFixed(2);
            setThemeProperty(color, `oklch(${l} ${c} ${h})`);
        }
    };


    return (
        <div className="dropdown w-full">
            <div
                tabIndex={0}
                role="button"
                className="flex w-full py-3 cursor-pointer mb-1 hover:bg-base-300 px-2 rounded-selector justify-between items-center gap-2"
            >
                <div className="flex items-center w-full  gap-2">
                    <span
                        className="size-4 mr-1 rounded-xs border border-base-content/20"
                        style={{ backgroundColor: colorValue }}
                    />
                    <span className="flex flex-col  w-full text-left">
                        <span className="capitalize text-xs font-semibold">{color}</span>
                        <span className="text-xs opacity-50 truncate ">{colorValue}</span>
                    </span>
                </div>
            </div>

            <div
                tabIndex={0}
                className="dropdown-content z-50 p-4 w-auto shadow-xl bg-base-100 rounded-box border border-base-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-2">
                    <HexColorPicker color={formatHex(colorValue)} onChange={handleColorChange} />
                    <div className="flex   mt-2 flex-col">
                        <div className="tabs flex  tabs-xs     ">
                            {FORMATS.map((format) => (
                                <button
                                    key={format}
                                    className={`tab ${selectedFormat === format ? "tab-active" : ""}`}
                                    onClick={() => setSelectedFormat(format)}
                                >
                                    {format.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <input
                            className="input   w-full mt-1 "
                            value={inputValue}
                            onChange={e => {
                                setInputValue(e.target.value);
                                handleColorChange(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}