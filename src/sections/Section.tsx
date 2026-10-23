import type { ReactNode } from 'react'

type Props = { id: string; eyebrow: string; title: string; intro?: ReactNode; children: ReactNode }

export function Section({ id, eyebrow, title, intro, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 max-sm:scroll-mt-28 py-16 sm:py-24" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-display text-xs font-medium tracking-[0.2em] text-accent-cyan uppercase">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
