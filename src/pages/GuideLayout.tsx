import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, CircleCheck, Clock, Lightbulb, ShieldAlert, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DISPLAY_HEADING, OutlinedTitle } from '@/components/Brand'
import { OnThisPage, PageHero } from '@/components/PageHero'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CodeBlock } from '@/components/CodeBlock'
import { ExternalLink } from '@/components/ExternalLink'
import { Rich } from '@/components/Rich'
import { asset } from '@/lib/asset'
import type { GuideCommand, GuideNote, GuidePage, GuideStep } from '@/content/guide'
import { cn } from '@/lib/utils'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

const ANCHOR = 'scroll-mt-20 max-sm:scroll-mt-28 max-lg:scroll-mt-28'
const linkCls = 'inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4'

function Paras({ items }: { items?: string[] }) {
  return (
    <>
      {items?.map((t) => (
        <p key={t} className="text-muted-foreground">
          <Rich text={t} />
        </p>
      ))}
    </>
  )
}

function Commands({ items }: { items?: GuideCommand[] }) {
  return (
    <>
      {items?.map((c) => (
        <div key={c.code} className="space-y-1.5">
          <p className="font-label text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{c.label}</p>
          <CodeBlock code={c.code} label={c.label} />
        </div>
      ))}
    </>
  )
}

function Expect({ text }: { text?: string }) {
  if (!text) return null
  return (
    <p className="flex gap-2 border-l-2 border-accent-cyan bg-accent-cyan/[0.06] px-4 py-3 text-sm">
      <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
      <span>
        <strong className="font-semibold text-foreground">You should see</strong>{' '}
        <span className="text-foreground/90">
          <Rich text={text} />
        </span>
      </span>
    </p>
  )
}

function Note({ note }: { note: GuideNote }) {
  const warn = note.kind === 'warning'
  const Icon = warn ? TriangleAlert : Lightbulb
  return (
    <div
      className={cn(
        'flex gap-3 border-l-2 p-4 text-sm',
        warn ? 'border-warning bg-warning/10' : 'border-steel bg-surface',
      )}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 size-4 shrink-0', warn ? 'text-warning' : 'text-accent-cyan')} />
      <p className="min-w-0 text-foreground/90">
        <span className="sr-only">{warn ? 'Warning: ' : 'Tip: '}</span>
        {note.title && <strong className="font-semibold text-foreground">{note.title} </strong>}
        <Rich text={note.text} />
      </p>
    </div>
  )
}

function StepView({ step, n, extra }: { step: GuideStep; n: number; extra?: ReactNode }) {
  return (
    <li className="flex gap-3 sm:gap-6">
      <span
        aria-hidden="true"
        className="cut-badge flex size-10 shrink-0 items-center justify-center bg-[#16303a] font-display text-lg font-black text-accent-cyan italic sm:size-12 sm:text-xl"
      >
        {String(n).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1 space-y-4">
        <h3 id={step.id} className={cn(ANCHOR, 'pt-1.5 text-xl font-semibold tracking-[0.03em] uppercase sm:pt-2.5 sm:text-2xl')}>
          <a href={`#${step.id}`} className="hover:text-accent-cyan">
            <span className="sr-only">Step {n}: </span>
            {step.title}
          </a>
        </h3>
        <Paras items={step.body} />
        {(step.substeps || step.image) && (
          <div className={cn(step.image && 'grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_16rem]')}>
            {step.substeps && (
              <ol className="list-decimal space-y-2 pl-5 text-muted-foreground marker:font-display marker:font-semibold marker:text-accent-cyan">
                {step.substeps.map((s) => (
                  <li key={s} className="pl-1">
                    <Rich text={s} />
                  </li>
                ))}
              </ol>
            )}
            {step.image && (
              <figure className="space-y-2">
                <img
                  src={asset(step.image.file)}
                  alt={step.image.alt}
                  loading="lazy"
                  className="w-full max-w-xs border border-border"
                />
                {step.image.caption && <figcaption className="text-sm text-muted-foreground">{step.image.caption}</figcaption>}
              </figure>
            )}
          </div>
        )}
        <Commands items={step.commands} />
        <Paras items={step.after} />
        <Expect text={step.expect} />
        {extra}
        {step.notes?.map((note) => <Note key={note.text} note={note} />)}
        {step.link && (
          <p className="text-sm">
            {step.link.url.startsWith('http') ? (
              <ExternalLink href={step.link.url} className={linkCls}>
                {step.link.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </ExternalLink>
            ) : (
              <a href={step.link.url} className={linkCls}>
                {step.link.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </p>
        )}
        {step.advanced && (
          <Accordion className="border-l-2 border-steel bg-surface px-4">
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm">{step.advanced.title}</AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <Paras items={step.advanced.body} />
                <Commands items={step.advanced.commands} />
                <Paras items={step.advanced.after} />
                <Expect text={step.advanced.expect} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </li>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(ANCHOR, 'py-12 sm:py-16')}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id={`${id}-title`} className={cn(DISPLAY_HEADING, 'text-[clamp(1.875rem,5vw,3rem)]')}>
          <OutlinedTitle text={title} />
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

type Props = {
  page: 'mac' | 'iphone'
  guide: GuidePage
  extras?: Record<string, ReactNode>
}

export function GuideLayout({ page, guide: g, extras }: Props) {
  return (
    <>
      <Nav page={page} />
      <PageHero eyebrow={g.eyebrow} title={g.title}>
        <p className="mt-5 max-w-2xl text-lg text-ice/85">{g.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge className="h-7 gap-1.5 border-warning/50 bg-warning/15 px-3 text-xs tracking-[0.12em] text-warning uppercase">
            <TriangleAlert aria-hidden="true" />
            Early testing · expect bugs
          </Badge>
          {g.experimental && (
            <Badge className="h-7 gap-1.5 border-warning/50 bg-warning/15 px-3 text-xs tracking-[0.12em] text-warning uppercase">
              <TriangleAlert aria-hidden="true" />
              Experimental
            </Badge>
          )}
        </div>
        {g.experimental && <p className="mt-4 max-w-2xl text-sm text-foreground/90">{g.experimental}</p>}
        {g.time.map((t) => (
          <p key={t} className="mt-4 flex max-w-2xl gap-2 text-sm text-muted-foreground">
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
            <span>
              <strong className="font-semibold text-foreground">Time needed:</strong> {t}
            </span>
          </p>
        ))}
        <OnThisPage label="Steps on this page" items={g.steps.map((s) => ({ href: `#${s.id}`, title: s.title }))} />
      </PageHero>
      <main>
        <Block id="before" title="Before you start">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="cut-panel p-5 [--cut-bg:var(--deep)] sm:p-6">
              <h3 className="font-display text-lg font-semibold tracking-[0.04em] uppercase">{g.checklist.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {g.checklist.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-muted-foreground">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                    <span>
                      <Rich text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cut-panel p-5 [--cut-bg:linear-gradient(135deg,#1a3a44,#0c1a1f)] sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-[0.04em] uppercase">
                <ShieldAlert aria-hidden="true" className="size-4 text-accent-cyan" />
                {g.byo.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {g.byo.items.map((it) => (
                  <li key={it}>
                    <Rich text={it} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>

        <Block id="steps" title="Step by step">
          <ol className="space-y-14">
            {g.steps.map((s, i) => (
              <StepView key={s.id} step={s} n={i + 1} extra={s.extra ? extras?.[s.extra] : undefined} />
            ))}
          </ol>
        </Block>

        <Block id="troubleshooting" title="Troubleshooting">
          <p className="mb-6 text-muted-foreground">{g.troubleshooting.intro}</p>
          <Accordion className="border-l-2 border-accent-cyan/50 bg-surface px-5">
            {g.troubleshooting.items.map((it) => (
              <AccordionItem key={it.q} value={it.q}>
                <AccordionTrigger className="text-base">{it.q}</AccordionTrigger>
                <AccordionContent className="space-y-3 text-muted-foreground">
                  {it.a.map((t) => (
                    <p key={t}>
                      <Rich text={t} />
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Block>

        <Block id="related" title="Next and related">
          <ul className="grid gap-4 sm:grid-cols-3">
            {g.related.map((r) => {
              const inner = (
                <>
                  <span className="flex items-center gap-1 font-display text-lg font-semibold tracking-[0.04em] text-foreground uppercase">
                    {r.title}
                    {r.external ? (
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-accent-cyan" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-accent-cyan" />
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">{r.body}</span>
                </>
              )
              const cls =
                'cut-panel block h-full p-5 [--cut:16px] [--cut-bg:var(--deep)] hover:[--cut-bg:#16303a] focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none motion-safe:transition-colors'
              return (
                <li key={r.href}>
                  {r.external ? (
                    <ExternalLink href={r.href} className={cls}>
                      {inner}
                    </ExternalLink>
                  ) : (
                    <a href={r.href} className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </Block>
      </main>
      <Footer />
    </>
  )
}
