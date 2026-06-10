import Hero from '#/shared/ui/landing/Hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      { title: 'DaisyThemer — The Ultimate DaisyUI Theme Generator' },
      { name: 'description', content: 'Create, edit, and discover beautiful DaisyUI themes. The ultimate theme generator and browser for Tailwind CSS.' }
    ]
  })
})

function App() {
  return (
    <>
      <main className="py-24 px-3 sm:px-6">
        <Hero />
      </main>
    </>
  )
}
