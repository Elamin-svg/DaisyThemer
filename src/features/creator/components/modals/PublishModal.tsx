import { Dialog } from "#/shared/ui/Dialog";
import { useThemeStore } from "#/features/creator/store/themeStore";
import { useState, useEffect } from "react";
import { publishTheme } from "#/features/creator/api/publishTheme";

import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { uniqueNamesGenerator, adjectives, colors } from "unique-names-generator";

const MAX_NAME_LENGTH = 20;

function generateRandomThemeName(): string {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        separator: ' ',
        style: 'capital',
        length: 2,
    }).slice(0, MAX_NAME_LENGTH);
}

const AVAILABLE_TAGS = [
    "SaaS", "Minimal", "Corporate", "Cyberpunk", "Playful",
    "Elegant", "Modern", "Vibrant", "Retro", "Clean",
    "Dashboard", "E-commerce", "High Contrast", "Pastel",
    "Monochromatic", "Professional", "Startup", "Agency",
    "Brutalism", "Glassmorphism", "Neumorphism", "Blog",
    "Portfolio", "Gaming", "Web3", "Nature", "Neon"
];

export default function PublishModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { themeName, cssTheme, cssOverrides, setCssTheme } = useThemeStore();
    const [name, setName] = useState(themeName || generateRandomThemeName());
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);

    const nameExceedsLimit = name.length > MAX_NAME_LENGTH;

    useEffect(() => {
        if (isOpen) {
            setName(themeName || generateRandomThemeName());
        }
    }, [isOpen, themeName]);

    const publishThemeFn = useServerFn(publishTheme);
    const navigate = useNavigate();

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            if (selectedTags.length < 3) {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    };

    const handleColorSchemeChange = (isDark: boolean) => {
        setCssTheme({
            ...cssTheme,
            "color-scheme": isDark ? "dark" : "light"
        });
    };

    const handlePublish = async () => {
        if (!name.trim()) {
            toast.error("Please provide a name for your theme");
            return;
        }

        if (name.length > MAX_NAME_LENGTH) {
            toast.error(`Theme name must be ${MAX_NAME_LENGTH} characters or less`);
            return;
        }

        if (selectedTags.length < 1 || selectedTags.length > 3) {
            toast.error("Please select between 1 and 3 tags");
            return;
        }

        try {
            setIsPublishing(true);
            const result = await publishThemeFn({
                data: {
                    name: name.trim(),
                    theme_code: cssTheme as any,
                    css_overrides: cssOverrides,
                    isDarkMode: isDarkTheme,
                    tags: selectedTags
                }
            });

            if (result && result.id) {
                toast.success("Theme published successfully!");
                onClose();
                navigate({ to: `/theme/${result.id}` });
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to publish theme");
        } finally {
            setIsPublishing(false);
        }
    };

    const isDarkTheme = cssTheme["color-scheme"] === "dark";

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Publish Theme" className="max-w-md">
            <div className="flex flex-col gap-4">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Theme Name</span>
                        <span className={` tabular-nums ${nameExceedsLimit ? 'text-error' : 'opacity-50'}`}>
                            {name.length}/{MAX_NAME_LENGTH}
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="My Awesome Theme"
                        maxLength={MAX_NAME_LENGTH}
                        className={`input input-bordered w-full ${nameExceedsLimit ? 'input-error' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>



                <div>
                    <div className="label">
                        <span className=" ">Select 1 to 3 tags</span>
                        <span className=" opacity-50 tabular-nums  ">{selectedTags.length}/3</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {AVAILABLE_TAGS.map(tag => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`badge badge-md cursor-pointer   ${isSelected
                                        ? 'badge-neutral'
                                        : 'badge-outline border-base-300 hover:bg-base-300'
                                        }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Color Scheme</span>
                    </div>
                    <div className="flex gap-4 mt-1 ">
                        <label className="label cursor-pointer gap-2 justify-start">
                            <input
                                type="radio"
                                name="color-scheme"
                                className="radio radio-sm"
                                checked={!isDarkTheme}
                                onChange={() => handleColorSchemeChange(false)}
                            />
                            <span className="label-text">Light Mode</span>
                        </label>
                        <label className="label cursor-pointer gap-2 justify-start">
                            <input
                                type="radio"
                                name="color-scheme"
                                className="radio radio-sm"
                                checked={isDarkTheme}
                                onChange={() => handleColorSchemeChange(true)}
                            />
                            <span className="label-text">Dark Mode</span>
                        </label>
                    </div>
                </div>

                <div className="modal-action mt-6">
                    <button className="btn btn-ghost" onClick={onClose} disabled={isPublishing}>Cancel</button>
                    <button className="btn btn-primary" onClick={handlePublish} disabled={isPublishing || !name.trim() || nameExceedsLimit || selectedTags.length < 1 || selectedTags.length > 3}>
                        {isPublishing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}  Publish
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
