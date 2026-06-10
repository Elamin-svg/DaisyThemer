import { useThemeStore } from "#/features/creator/store/themeStore";
import { SettingSection } from "./Shared";
import { GOOGLE_FONTS } from "#/features/creator/constants/fonts";

export default function SideFont() {
    const fontValue = useThemeStore((state) => state.cssTheme.font);
    const setThemeProperty = useThemeStore((state) => state.setThemeProperty);

    return (
        <SettingSection className="gap-3!">
            <div className="flex flex-col ">
                <p className=" text-xs">Font</p>
                <p className="text-xs opacity-70  
                 italic">Select primary font for the theme</p>            </div>
            <select
                className="select select-bordered w-full font-sans text-xs "
                value={fontValue || '"DM Sans", sans-serif'}
                onChange={(e) => setThemeProperty('font', e.target.value)}
            >
                {GOOGLE_FONTS.map(font => (
                    <option className="text-sm" key={font.name} value={font.value}>{font.name}</option>
                ))}
            </select>
        </SettingSection>
    )
}
