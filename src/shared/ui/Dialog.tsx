import { Dialog as HeadlessDialog, DialogPanel, DialogTitle, DialogBackdrop, DialogDescription } from '@headlessui/react'
import { cn } from '#/shared/utils/utils'

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[closed]:opacity-0 data-[enter]:duration-300! data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className={cn(
            "  bg-base-100 border relative w-full  border-base-300 p-6 rounded-box data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in",
            className
          )}
        >
          <button
            onClick={onClose}
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            aria-label="Close"
          >
            ✕
          </button>

          {title && <DialogTitle className="font-bold text-xl mb-4">{title}</DialogTitle>}

          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  )
}
