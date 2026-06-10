
import type { DatabaseTheme } from "#/shared/types/db";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link, useLoaderData } from "@tanstack/react-router";
import dayjs from "dayjs";
import React from "react";

const ThemeCard = React.memo(function ThemeCard({ theme }: { theme: DatabaseTheme }) {
    const parsedTheme = theme.theme_code;
    const [isHovering, setIsHovering] = React.useState(false);

    if (!parsedTheme) return null;

    return (
        <div className="motion-preset-fade-sm">
            <Link
                to="/theme/$themeId"
                params={{ themeId: theme.id }}
                preload="intent"
                style={{
                    backgroundColor: parsedTheme["base-100"],
                    color: parsedTheme["base-content"],
                    borderColor: parsedTheme["base-300"],
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`bg-linear-to-b card-sm relative   group cursor-pointer card border block`}
            >

                <div className="card-body h-44 flex-col  justify-between">
                    <div className="flex  justify-between gap-6">
                        <div className="gap-1 flex flex-wrap">
                            {theme.tags?.slice(0, 2).map((badge, i) => (
                                <span
                                    key={i}
                                    style={{ backgroundColor: parsedTheme["base-300"], color: parsedTheme["base-content"] }}
                                    className="badge badge-xs border-transparent opacity-85"
                                >
                                    {badge}
                                </span>
                            ))}
                            {theme.tags && theme.tags.length > 2 && (
                                <span
                                    style={{ backgroundColor: parsedTheme["base-300"], color: parsedTheme["base-content"] }}
                                    className="badge badge-xs border-transparent opacity-85 font-semibold"
                                >
                                    +{theme.tags.length - 2}
                                </span>
                            )}
                        </div>
                        <div className="gap-1 flex">
                            {["primary", "secondary", "accent", "base-300", "base-200"].map((color) => (
                                <div
                                    key={color}
                                    className="h-14 w-3 rounded-full border-transparent"
                                    style={{ backgroundColor: parsedTheme[color as keyof typeof parsedTheme] as string }}
                                />
                            ))}
                        </div>
                    </div>
                    <h6
                        style={{
                            color: isHovering ? parsedTheme['primary'] : parsedTheme['base-content'],
                            fontFamily: parsedTheme.font || '"DM Sans", sans-serif'
                        }}
                        className="text-center text-lg card-title mt-auto transition-all group-hover:text-xl"
                    // color transitions to primary on hover via group-hover utility; inline style sets base
                    >
                        {theme.name}
                    </h6>
                </div>
            </Link>
            <div className="flex items-center mt-2 px-2 text-sm justify-between gap-4">
                <div className="gap-2 flex items-center text-xs">
                    <p className="opacity-70">@{theme?.user_id?.name || "Anonymous"}</p>
                    <p className="opacity-50">{dayjs(theme.created_at).format('MMM DD, YYYY')}</p>
                </div>
                <span className="flex gap-1 items-center text-xs opacity-90">
                    {theme.likes}
                    <HeartIcon className={`size-4 ${theme.is_liked ? 'fill-red-400 text-red-400' : "text-base-content/60"}`} />
                </span>
            </div>
        </div>
    );
});

export default ThemeCard;