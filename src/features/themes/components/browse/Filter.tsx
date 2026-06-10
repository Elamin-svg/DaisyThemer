import { COLORS } from "#/features/themes/constants/filters";
import { useBrowseThemeFilterStore } from "#/features/themes/store/browseThemeStore";
import { ChevronDownIcon as ChevronDown, BarsArrowUpIcon as Filter, MagnifyingGlassIcon as Search, XMarkIcon as X, MoonIcon as Moon, SunIcon as Sun } from "@heroicons/react/24/outline";
import { Dropdown, DropdownItem } from "#/shared/ui/Dropdown";
import { useEffect, useState } from "react";

export default function BrowseFilter() {
    const [searchValue, setSearchValue] = useState("");
    const { setSearch, color, setColor, isDarkMode, setIsDarkMode, sortBy, setSortBy } = useBrowseThemeFilterStore();

    const debounce = (func: () => void, wait: number) => {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, wait);
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(searchValue)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchValue])


    return <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Browse Themes</h1>

        <div className="flex gap-4 items-center mt-5 mb-3">
            <label className="input w-full">
                <Search className="w-5 h-5 opacity-50" />
                <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} type="search" placeholder="Search themes..." />
            </label>

        </div>
        <div className="flex pt-1 justify-between items-center gap-6 overflow-x-auto pb-2">
            <div className='flex gap-2  '>
                {COLORS.map((c) => {
                    const isActive = c.name === color;
                    return (
                        <button
                            key={c.name}
                            onClick={() => setColor(isActive ? undefined : c.name)}
                            className={`btn    btn-outline ${isActive ? ' bg-base-300!' : ''}`}
                        >
                            <span className={`size-3 rounded-selector ${c.class}`} />
                            {c.name}
                            {isActive && <X className="size-3.5" />}

                        </button>
                    )
                })}


            </div>


            <div className="flex gap-2 items-center">
                <Dropdown
                    align="bottom end"
                    trigger={
                        <div className="btn btn-outline min-w-50 justify-between bg-base-100">
                            <span className="flex items-center gap-2">
                                <Filter className="size-3.5" />
                                {sortBy === 'recent' ? 'Recently Added' : 'Most Likes'}
                            </span>
                            <ChevronDown className="size-4 opacity-50" />
                        </div>
                    }
                >
                    <DropdownItem
                        className={sortBy === 'recent' ? 'active' : ''}
                        onClick={() => setSortBy('recent')}
                    >
                        Recently Added
                    </DropdownItem>
                    <DropdownItem
                        className={sortBy === 'likes' ? 'active' : ''}
                        onClick={() => setSortBy('likes')}
                    >
                        Most Likes
                    </DropdownItem>
                </Dropdown>
                <div className="join">
                    <button
                        onClick={() => setIsDarkMode(isDarkMode === false ? undefined : false)}
                        className={`btn join-item btn-outline ${isDarkMode === false ? ' bg-base-300!' : ''}`}
                    >
                        <Sun className="size-4" />
                    </button>
                    <button
                        onClick={() => setIsDarkMode(isDarkMode === true ? undefined : true)}
                        className={`btn join-item btn-outline ${isDarkMode === true ? ' bg-base-300!' : ''}`}
                    >
                        <Moon className="size-4" />
                    </button>
                </div>


            </div>
        </div>
    </div>
}