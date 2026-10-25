import { ArrowRight, TriangleAlert } from 'lucide-react'
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
      accent="your own copy"
      intro="From your game file and prod.keys to the game running. Each guide walks you through it one step at a time, starting with how to open Terminal."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {GUIDE_CARDS.map((c) => {
          const mac = c.key === 'mac'
          return (
            <li key={c.key} className="cut-panel-2 flex min-h-60 flex-col overflow-hidden p-6 [--cut:26px] sm:p-8 sm:[--cut:34px]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2.5 -bottom-10 font-display text-[clamp(120px,22vw,180px)] leading-none font-black text-accent-cyan/[0.12] italic select-none"
              >
                {mac ? 'MAC' : 'iOS'}
              </span>
              {c.experimental && (
                <Badge className="mb-4 h-6 gap-1.5 border-warning/50 bg-warning/15 font-label text-[10px] tracking-[0.2em] text-warning uppercase">
                  <TriangleAlert aria-hidden="true" />
                  Experimental
                </Badge>
              )}
              <h3
                id={`guide-${c.key}-title`}
                className="relative font-display text-2xl font-semibold tracking-[0.04em] uppercase sm:text-3xl"
              >
                {c.title}
              </h3>
              <p className="relative mt-3 max-w-[40ch] leading-relaxed text-muted-foreground">{c.summary}</p>
              <ul className="relative mt-5 flex flex-wrap gap-2.5">
                {c.facts.map((f) => (
                  <li
                    key={f}
                    className="border border-ice/35 px-2.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-ice/90 uppercase"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto pt-8">
                <a
                  href={`${base}${c.path}`}
                  className={cn(buttonVariants({ size: 'lg', variant: mac ? 'secondary' : 'default' }))}
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
