import { useThemeStore } from '#/features/creator/store/themeStore';
import { SettingToggle, SettingSection } from './Shared';

export default function SideOptions() {
    const isDefault = useThemeStore((s) => s.cssTheme['default']);
    const prefersdark = useThemeStore((s) => s.cssTheme['prefersdark']);
    const colorScheme = useThemeStore((s) => s.cssTheme['color-scheme']);
    const setThemeProperty = useThemeStore((s) => s.setThemeProperty);

    return (
        <SettingSection >
            <SettingToggle
                label="Default theme"
                checked={isDefault === 'true'}
                onChange={(c) => setThemeProperty('default', c ? 'true' : 'false')}
            />
            <SettingToggle
                label="Default dark theme"
                checked={prefersdark === 'true'}
                onChange={(c) => setThemeProperty('prefersdark', c ? 'true' : 'false')}
            />
            <SettingToggle
                label="Dark color scheme"
                checked={colorScheme === 'dark'}
                onChange={(c) => setThemeProperty('color-scheme', c ? 'dark' : 'light')}
            />
        </SettingSection>
    );
}
