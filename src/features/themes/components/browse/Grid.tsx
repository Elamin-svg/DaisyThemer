
import { useBrowseThemesQuery } from "#/features/themes/hooks/useBrowseThemes";
import ThemeCard from "../theme/ThemeCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function Grid() {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useBrowseThemesQuery();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


    if (isLoading) {
        return <div className='min-h-96  flex   items-center  justify-center'>
            <span className=" loading loading-ring loading-xl" />
        </div>
    }

    const flatData = data?.pages.flat() || [];

    if (flatData.length == 0) {
        return <div className='min-h-96  flex   items-center  justify-center'>
            <p className="text-base-content/60">No themes found matching your criteria.</p>
        </div>
    }

    return <div className='mt-6 gap-4 xl:gap-6 grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3'>
        {flatData.map((theme) => (
            <ThemeCard theme={theme} key={theme.id} />
        ))}
        <div ref={ref} className="col-span-full h-20 flex items-center justify-center">
            {isFetchingNextPage && <span className="loading loading-ring loading-lg" />}
        </div>
    </div>
}
