import BrowseFilter from '#/features/themes/components/browse/Filter'
import { Grid } from '#/features/themes/components/browse/Grid'
import { getAllThemes } from '#/features/themes/api/getAllThemes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/browse')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Browse Themes — DaisyThemer' },
      { name: 'description', content: 'Explore and discover amazing DaisyUI themes created by the community.' }
    ]
  }),
  loader: ({ context }) => {
    context.queryClient.ensureInfiniteQueryData({
      queryKey: ["themes", "", undefined, "recent"],
      queryFn: ({ pageParam }) => getAllThemes({ data: { search: "", color: undefined, sortBy: "recent", pageParam } }),
      initialPageParam: 0
    })
  }
})




function RouteComponent() {


  return (
    <main className="page-wrap">
      <BrowseFilter />
      <Grid />
    </main>
  )
}
