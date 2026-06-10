import { create } from "zustand";

export type BrowseThemeFilter = {
    search?: string;
    color?: string;
    isDarkMode?: boolean;
    sortBy: 'recent' | 'likes';
    setSearch: (v: string) => void;
    setColor: (v: string | undefined) => void;
    setIsDarkMode: (v: boolean | undefined) => void;
    setSortBy: (v: 'recent' | 'likes') => void;
}

export const useBrowseThemeFilterStore = create<BrowseThemeFilter>((set) => ({
    search: "",
    color: undefined,
    isDarkMode: undefined,
    sortBy: 'recent',
    setSearch: (search: string) => set({ search }),
    setColor: (color: string | undefined) => set({ color }),
    setIsDarkMode: (isDarkMode: boolean | undefined) => set({ isDarkMode }),
    setSortBy: (sortBy: 'recent' | 'likes') => set({ sortBy }),
}))