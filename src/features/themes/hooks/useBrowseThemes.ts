
import { getAllThemes } from "#/features/themes/api/getAllThemes";
import { useBrowseThemeFilterStore } from "#/features/themes/store/browseThemeStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { toast } from "sonner";

export const useBrowseThemesQuery = () => {
    const filters = useBrowseThemeFilterStore();
    const getAllThemesFn = useServerFn(getAllThemes)

    const query = useInfiniteQuery({
        queryFn: ({ pageParam }) => getAllThemesFn({ data: { search: filters.search, color: filters.color, isDarkMode: filters.isDarkMode, sortBy: filters.sortBy, pageParam } }),
        queryKey: ["themes", filters.search, filters.color, filters.isDarkMode, filters.sortBy],
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.length === 20 ? allPages.length : undefined;
        }
    });

    useEffect(() => {
        if (query.error) toast.error('Failed to load themes.');
    }, [query.error]);

    return query;
}



