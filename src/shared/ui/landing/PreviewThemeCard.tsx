import type { PreviewTheme } from "#/features/creator/constants/previewThemes";
import { Link } from "@tanstack/react-router";

export default function PreviewThemeCard({ data }: { data: PreviewTheme }) {
    const parsedTheme = data.theme;
    return (
        <Link
            to="/theme/$themeId"
            params={{ themeId: data.id }}
            preload="intent"
            style={{
                backgroundColor: parsedTheme["base-100"],
                color: parsedTheme["base-content"],
                borderColor: parsedTheme["base-300"],
            }}
            className="min-w-74 hover:scale-110 duration-400 ease-in-out  my-1  transition-all cursor-pointer shrink-0 card border block shadow-sm hover:shadow-md  "
        >
            <div className="card-body  gap-6  h-fit   flex-row items-center   p-4">
                <div className="flex justify-end gap-2">
                    <div className="gap-1.5 flex">
                        {["primary", "secondary", "accent", "base-300"].map((color) => (
                            <div
                                key={color}
                                className="h-10 w-4 rounded-full border-transparent"
                                style={{ backgroundColor: parsedTheme[color as keyof typeof parsedTheme] as string }}
                            />
                        ))}
                    </div>
                </div>
                <h6
                    style={{
                        fontFamily: parsedTheme.font || '"DM Sans", sans-serif'
                    }}
                    className="text-left text-base font-semibold capitalize opacity-90 leading-tight"
                >
                    {data.name.replace('-', ' ')}
                </h6>
            </div>
        </Link>
    );
}
