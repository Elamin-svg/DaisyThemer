import { PreviewFrame } from '#/features/creator/components/preview/PreviewFrame';
import CreateSide from '#/features/creator/components/side/CreateSide';
import CreateTop from '#/features/creator/components/top/CreateTop';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/create')({
  component: CreateRoute,
  head: () => ({
    meta: [
      { title: 'Create Theme — DaisyThemer' },
      { name: 'description', content: 'Design your own custom DaisyUI theme with our intuitive editor.' }
    ]
  })
})

function CreateRoute() {
  const [mobileTab, setMobileTab] = useState<'customize' | 'preview'>('customize');

  return (
    <main className="page-wrap flex flex-col min-h-[calc(100vh-4rem)] gap-4 pt-4">

      <div className="flex lg:hidden bg-base-300 p-1 tabs tabs-box w-full">
        <button
          className={`flex-1  tab  ${mobileTab === 'customize' ? ' tab-active ' : ''}`}
          onClick={() => setMobileTab('customize')}
        >
          Customize
        </button>
        <button
          className={`flex-1 tab   ${mobileTab === 'preview' ? ' tab-active ' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          Preview
        </button>
      </div>

      <CreateTop />

      <div className="flex flex-1 gap-4 min-h-0">
        <div className={`w-full lg:w-80 shrink-0 lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] overflow-y-auto ${mobileTab === 'customize' ? 'block' : 'hidden lg:block'}`}>
          <CreateSide />
        </div>
        <div className={`flex-1 flex   flex-col min-w-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <PreviewFrame />
        </div>
      </div>
    </main>
  )
}
