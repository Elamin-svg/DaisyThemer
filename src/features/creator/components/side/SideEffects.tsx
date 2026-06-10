import { useThemeStore } from '#/features/creator/store/themeStore';
import { SettingToggle, SettingSection } from './Shared';

export default function SideEffects() {
    const depth = useThemeStore((s) => s.cssTheme['depth']);
    const noise = useThemeStore((s) => s.cssTheme['noise']);
    const setThemeProperty = useThemeStore((s) => s.setThemeProperty);

    return (
        <SettingSection>
            <SettingToggle 
                label="Depth Effect" 
                description="3D depth on fields & selectors" 
                checked={depth === '1'} 
                onChange={(c) => setThemeProperty('depth', c ? '1' : '0')} 
            />
            <SettingToggle 
                label="Noise Effect" 
                description="Noise pattern on fields & selectors" 
                checked={noise === '1'} 
                onChange={(c) => setThemeProperty('noise', c ? '1' : '0')} 
            />
        </SettingSection>
    );
}
