import { ArrowRight, CircleCheck, Laptop, Smartphone, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { GUIDE_CARDS } from '@/content/guide'
import { cn } from '@/lib/utils'
import { Section } from './Section'

export function Guide() {
  const base = import.meta.env.BASE_URL
  return (
    <Section
      id="guide"
      eyebrow="Step by step"
      title="Build it from your own copy"
      intro="From your game file and prod.keys to the game running. Each guide walks you through it one step at a time, starting with how to open Terminal."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {GUIDE_CARDS.map((c) => {
          const Icon = c.key === 'mac' ? Laptop : Smartphone
          return (
            <li
              key={c.key}
              className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Icon aria-hidden="true" className="size-7 text-accent-cyan" />
                {c.experimental && (
                  <Badge className="h-6 gap-1.5 border-warning/40 bg-warning/20 text-warning">
                    <TriangleAlert aria-hidden="true" />
                    Experimental
                  </Badge>
                )}
              </div>
              <h3 id={`guide-${c.key}-title`} className="mt-5 text-2xl font-bold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{c.summary}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {c.facts.map((f) => (
                  <li key={f} className="flex gap-2 text-foreground/90">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={`${base}${c.path}`}
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-11 w-full bg-accent-cyan px-5 text-base font-semibold text-background hover:bg-accent-cyan/85 sm:w-auto',
                  )}
                >
                  {c.cta}
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
