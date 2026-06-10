import { getUserSaved } from '#/features/themes/api/getUserSaved';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useUserSavedThemesQuery(tab: 'created' | 'liked') {
    const getUserSavedFn = useServerFn(getUserSaved);

    const query = useInfiniteQuery({
        queryFn: ({ pageParam }) => getUserSavedFn({ data: { type: tab, pageParam } }),
        queryKey: ["userSavedThemes", tab],
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage?.length === 20 ? allPages.length : undefined;
        }
    });

    useEffect(() => {
        if (query.error) toast.error('Failed to load your saved themes.');
    }, [query.error]);

    return query;
}
