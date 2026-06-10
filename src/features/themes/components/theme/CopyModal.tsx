import { Dialog } from "#/shared/ui/Dialog";
import type { DatabaseTheme } from "#/shared/types/db";
import type { CssTheme } from "#/shared/types/theme";
import { CheckIcon, DocumentDuplicateIcon as CopyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { generatePluginCss } from "#/features/creator/utils/generatePluginCss";

export default function CopyModal({ isOpen, onClose, theme }: { isOpen: boolean, onClose: () => void, theme: DatabaseTheme }) {
    const [activeTab, setActiveTab] = useState<'theme' | 'overrides'>('theme');
    const [copied, setCopied] = useState(false);

    const parsedTheme = theme?.theme_code;

    const themeCss = parsedTheme ? generatePluginCss(theme.name, parsedTheme) : "";
    const overridesCss = theme?.overrides || "";

    const activeText = activeTab === 'theme' ? themeCss : overridesCss;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(activeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog isOpen={isOpen} className="max-w-3xl  " onClose={onClose} title="Copy Theme CSS" >
            <div className="flex flex-col gap-3">
                <div role="tablist" className="tabs tabs-sm   w-fit 0">
                    <button
                        role="tab"
                        className={`tab ${activeTab === 'theme' ? 'tab-active  bg-base-100 rounded-selector border border-base-300' : ''}`}
                        onClick={() => setActiveTab('theme')}
                    >
                        theme.css
                    </button>
                    <button
                        role="tab"
                        className={`tab ${activeTab === 'overrides' ? 'tab-active rounded-selector border bg-base-100 border-base-300 ' : ''}`}
                        onClick={() => setActiveTab('overrides')}
                    >
                        overrides.css
                    </button>
                </div>

                <div className="relative group">
                    <textarea
                        className="textarea min-h-96     textarea-bordered font-mono text-xs flex-1 w-full resize-none  focus:outline-none"
                        value={activeText}
                        readOnly
                        spellCheck={false}
                    />
                    <button
                        className="btn btn-sm btn-square absolute top-3 right-6 bg-base-100 opacity-50 group-hover:opacity-100 transition-opacity"
                        onClick={handleCopy}
                    >
                        {copied ? <CheckIcon className="size-4 " /> : <CopyIcon className="size-4" />}
                    </button>
                </div>

            </div>
        </Dialog>
    );
}
