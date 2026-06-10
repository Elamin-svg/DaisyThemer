import { useThemeStore } from '#/features/creator/store/themeStore';
import { SettingRange, SettingSection } from './Shared';

export default function SideBorder() {
    const border = useThemeStore((s) => s.cssTheme['border']);
    const setThemeProperty = useThemeStore((s) => s.setThemeProperty);

    return (
        <SettingSection>
            <SettingRange
                label="Border Width"
                value={parseInt(border) || 0}
                min={0} max={8} step={1} unit="px"
                onChange={(v) => setThemeProperty('border', v)}
            />
        </SettingSection>
    );
}
