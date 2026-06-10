import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useUserSavedThemesQuery } from '#/features/themes/hooks/useUserSavedThemes'
import ThemeCard from '#/features/themes/components/theme/ThemeCard'
import { useInView } from 'react-intersection-observer'

export const Route = createFileRoute('/saved')({
  component: DashboardRoute,
  head: () => ({
    meta: [
      { title: 'My Themes — DaisyThemer' },
      { name: 'description', content: 'View your created and liked DaisyUI themes.' }
    ]
  })
})

function DashboardRoute() {
  const [activeTab, setActiveTab] = useState<'created' | 'liked'>('created')
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserSavedThemesQuery(activeTab)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const currentThemes = data?.pages.flat() || []

  return (
    <main className="page-wrap ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col    gap-6">
          <h1 className="text-3xl font-bold">My Themes</h1>
          <div role="tablist" className="tabs w-fit  shadow-xs    bg-base-300/60    tabs-box ">
            <button
              role="tab"
              className={`tab font-medium  ${activeTab === 'created' ? 'tab-active  ' : ''}`}
              onClick={() => setActiveTab('created')}
            >
              Created By Me
            </button>
            <button
              role="tab"
              className={`tab font-medium ${activeTab === 'liked' ? 'tab-active  ' : ''}`}
              onClick={() => setActiveTab('liked')}
            >
              Liked Themes
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className='min-h-96 flex items-center justify-center'>
            <span className="loading loading-ring loading-xl" />
          </div>
        ) : error ? (
          <div className='min-h-[50vh] flex items-center justify-center'>
            <p className="text-error">Failed to load themes. Please refresh and try again.</p>
          </div>
        ) : currentThemes?.length === 0 ? (
          <div className='min-h-[50vh] flex flex-col gap-4 items-center justify-center  border-base-300 rounded-box'>
            <p className="text-base-content/60 text-lg">
              {activeTab === 'created'
                ? "You haven't created any themes yet."
                : "You haven't liked any themes yet."}
            </p>
            <Link
              to={activeTab === 'created' ? '/create' : '/browse'}
              className="btn btn-primary"
            >
              {activeTab === 'created' ? 'Create a Theme' : 'Browse Themes'}
            </Link>
          </div>
        ) : (
          <div className='mt-2 gap-4 xl:gap-6 grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3'>
            {currentThemes?.map((theme) => (
              <ThemeCard theme={theme} key={theme.id} />
            ))}
            <div ref={ref} className="col-span-full h-20 flex items-center justify-center">
              {isFetchingNextPage && <span className="loading loading-ring loading-lg" />}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
