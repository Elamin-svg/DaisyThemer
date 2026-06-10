import { useState, useEffect } from "react";
import { useThemeStore } from "#/features/creator/store/themeStore";
import { generatePluginCss } from "#/features/creator/utils/generatePluginCss";
import { parsePluginCss } from "#/features/creator/utils/parsePluginCss";
import { Dialog } from "#/shared/ui/Dialog";

export default function CssModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const themeName = useThemeStore((state) => state.themeName);
    const setThemeName = useThemeStore((state) => state.setThemeName);
    const cssTheme = useThemeStore((state) => state.cssTheme);
    const setCssTheme = useThemeStore((state) => state.setCssTheme);

    const [modalCss, setModalCss] = useState("");

    // Only update modalCss when the modal is opened
    useEffect(() => {
        if (isOpen) {
            setModalCss(generatePluginCss(themeName, cssTheme));
        }

    }, [isOpen]);

    const handleCloseModal = () => {
        const parsed = parsePluginCss(modalCss);
        if (parsed) {
            if (parsed.themeName) setThemeName(parsed.themeName);
            if (parsed.theme) setCssTheme({ ...cssTheme, ...parsed.theme } as any);
        }
        onClose();
    };

    return (
        <Dialog isOpen={isOpen} className="max-w-xl" onClose={onClose} title="Theme CSS" >
            <div className="">
                <textarea
                    className="textarea min-h-96 textarea-bordered font-mono text-sm flex-1 w-full resize-none"
                    value={modalCss}
                    onChange={(e) => setModalCss(e.target.value)}
                    spellCheck={false}
                />
                <div className="modal-action mt-4">
                    <button className="btn btn-primary" onClick={handleCloseModal}>Save & Close</button>
                </div>
            </div>

        </Dialog>
    );
}
