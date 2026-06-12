import { useAuthModalStore } from "#/features/auth/store/authModalStore";
import { useThemeStore } from "#/features/creator/store/themeStore";
import { generateRandomTheme } from "#/features/creator/utils/generateRandomTheme";
import { ArrowPathIcon, ChevronDownIcon as ChevronDown, CodeBracketIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownItem } from "#/shared/ui/Dropdown";
import { useLoaderData } from "@tanstack/react-router";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";

const CssModal = React.lazy(() => import("../modals/CssModal"));
const PublishModal = React.lazy(() => import("../modals/PublishModal"));

export default function CreateTop() {
    const themeName = useThemeStore((state) => state.themeName);
    const setThemeName = useThemeStore((state) => state.setThemeName);
    const setCssTheme = useThemeStore((state) => state.setCssTheme);
    const cssTheme = useThemeStore((state) => state.cssTheme);
    const { openModal } = useAuthModalStore();
    const { authPromise } = useLoaderData({ from: "__root__" }) as any;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const handleRandomize = () => {
        try {
            setCssTheme(generateRandomTheme());
        } catch {
            toast.error('Failed to generate a random theme.');
        }
    };

    return (
        <>
            <div className="w-full bg-base-200 border border-base-300 rounded-box p-4 flex justify-between items-center shrink-0">
                {/* Desktop View */}
                <div className="hidden lg:flex w-full justify-between items-center">
                    <div className=" ">
                        <label className="input input-ghost text-sm  input-sm max-w-54  ">
                            <span className="text-base-content/70 font-medium">Name</span>
                            <input
                                className="grow"
                                placeholder='Theme name...'
                                value={themeName}
                                onChange={(e) => setThemeName(e.target.value)}
                            />
                            <PencilIcon className="size-4 mr-1" />
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-sm btn-outline" title="Randomize Colors" onClick={handleRandomize}>
                            <ArrowPathIcon className="size-3 mr-0.5" />
                            Random
                        </button>
                        <button className="btn btn-sm btn-outline" title="CSS" onClick={() => setIsModalOpen(true)}>
                            <CodeBracketIcon className="size-3 mr-0.5" />
                            CSS
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={async () => {
                            const auth = await authPromise;
                            if (!auth?.user) {
                                openModal('login');
                                return;
                            }
                            setIsPublishModalOpen(true);
                        }}>
                            Save Theme
                        </button>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="flex lg:hidden w-full justify-between items-center gap-2">
                    <div className="flex gap-2  items-center w-full min-w-0">
                        <div className="flex gap-1 shrink-0">
                            <span className="size-3 rounded-full" style={{ backgroundColor: cssTheme.primary }}></span>
                            <span className="size-3 rounded-full border border-base-content/10" style={{ backgroundColor: cssTheme["base-100"] }}></span>
                            <span className="size-3 rounded-full" style={{ backgroundColor: cssTheme.secondary }}></span>
                            <span className="size-3 rounded-full" style={{ backgroundColor: cssTheme.accent }}></span>
                        </div>
                        <span className="opacity-50 text-xs shrink-0">•</span>
                        <input
                            className="input input-ghost input-sm text-sm  w-full font-medium px-1 min-w-0"
                            placeholder='Theme name...'
                            value={themeName}
                            onChange={(e) => setThemeName(e.target.value)}
                        />
                    </div>
                    <Dropdown
                        align="bottom end"
                        className="shrink-0"
                        menuClassName="w-40"
                        trigger={
                            <div className="btn btn-outline btn-square">
                                <ChevronDown className="size-4 opacity-70" />
                            </div>
                        }
                    >
                        <DropdownItem onClick={handleRandomize}>
                            <ArrowPathIcon className="size-4" /> Random
                        </DropdownItem>
                        <DropdownItem onClick={() => setIsModalOpen(true)}>
                            <CodeBracketIcon className="size-4" /> CSS
                        </DropdownItem>
                        <DropdownItem 
                            className="text-primary font-medium" 
                            onClick={async () => {
                                const auth = await authPromise;
                                if (!auth?.user) {
                                    openModal('login');
                                    return;
                                }
                                setIsPublishModalOpen(true);
                            }}
                        >
                            Save Theme
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <Suspense fallback={null}>
                <CssModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
            </Suspense>
        </>
    );
}