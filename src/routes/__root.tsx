import { QueryClient } from '@tanstack/react-query'
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, Link, defer } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import Header from '#/shared/ui/Header'
import appCss from '../styles.css?url'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react'


import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getUser } from '#/features/auth/api/auth'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      {
        title: 'DaisyThemer — Create & Browse DaisyUI Themes',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],

  }),
  component: RootComponent,
  errorComponent: ({ error }) => {
    return (
      <RootDocument>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 page-wrap text-center">
          <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-base-content/70">{error.message}</p>
          <Link to="/" className="btn btn-primary mt-4">Go Back Home</Link>
        </div>
      </RootDocument>
    );
  },
  notFoundComponent: () => {
    return (
      <RootDocument>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 page-wrap text-center">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-base-content/70 text-lg">The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary mt-4">Go Back Home</Link>
        </div>
      </RootDocument>
    );
  },
  loader: () => {
    const authPromise = getUser();
    return { authPromise: defer(authPromise) }
  }
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {

  return (

    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Instant Load: DM Sans */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
        {/* Deferred Load: Other Fonts */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600;700&amp;family=Merriweather:wght@300;400;700;900&amp;family=Outfit:wght@400;500;600;700&amp;family=Playfair+Display:wght@400;500;600;700&amp;family=Poppins:wght@300;400;500;600;700&amp;family=Roboto:wght@300;400;500;700&amp;family=Space+Grotesk:wght@400;500;600;700&amp;display=swap" />
        <script dangerouslySetInnerHTML={{
          __html: `
          var l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
          document.head.appendChild(l);
        `}} />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600;700&amp;family=Merriweather:wght@300;400;700;900&amp;family=Outfit:wght@400;500;600;700&amp;family=Playfair+Display:wght@400;500;600;700&amp;family=Poppins:wght@300;400;500;600;700&amp;family=Roboto:wght@300;400;500;700&amp;family=Space+Grotesk:wght@400;500;600;700&amp;display=swap" />
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className="font-sans min-h-screen w-screen antialiased overflow-x-hidden">

        <Header />

        {children}
        <div style={{
          backgroundColor: 'var(--color-base-100)',
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, var(--color-base-content) 0.72px, transparent 0.72px)',
          backgroundSize: '9px 9px',
        }} className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none   " />
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'alert shadow-lg flex items-center mb-2 w-full sm:w-[350px] !p-4',
              title: 'text-sm font-bold',
              description: 'text-sm opacity-90',
              actionButton: 'btn btn-sm btn-primary',
              cancelButton: 'btn btn-sm btn-ghost',
              success: 'alert-success',
              error: 'alert-error',
              warning: 'alert-warning',
              info: 'alert-info',
            },
          }}
        />

        <Scripts />
        {import.meta.env.DEV && <ReactQueryDevtools buttonPosition="bottom-left" />}

      </body>
    </html >
  )
}
