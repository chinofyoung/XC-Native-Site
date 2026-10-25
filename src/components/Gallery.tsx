import { useState } from 'react'
import type { Shot } from '@/content/site'
import { asset } from '@/lib/asset'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

export function Gallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<Shot | null>(null)

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((shot) => (
          <li key={shot.file}>
            <button
              type="button"
              onClick={() => setOpen(shot)}
              aria-label={shot.alt}
              className="block w-full overflow-hidden border border-border bg-surface hover:border-accent-cyan/60 focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none"
            >
              <img
                src={asset(shot.file)}
                alt=""
                loading="lazy"
                className="aspect-video w-full object-cover motion-safe:transition-transform motion-safe:hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-5xl">
          {open && (
            <>
              <DialogTitle className="sr-only">Screenshot</DialogTitle>
              <img src={asset(open.file)} alt={open.alt} className="max-h-[70vh] w-full object-contain" />
              <DialogDescription>{open.alt}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
