import type { ReactNode } from 'react'
import { DISPLAY_HEADING, Eyebrow, OutlinedTitle } from '@/components/Brand'
import { cn } from '@/lib/utils'

type Props = {
  id: string
  eyebrow: string
  title: string
  /** The tail of the title drawn in outline. Defaults to the last word(s). */
  accent?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, accent, intro, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 max-lg:scroll-mt-28 py-16 sm:py-24', className)}
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={`${id}-title`} className={cn(DISPLAY_HEADING, 'mt-3 text-[clamp(2rem,6vw,3.5rem)]')}>
          <OutlinedTitle text={title} accent={accent} />
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-muted-foreground">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
