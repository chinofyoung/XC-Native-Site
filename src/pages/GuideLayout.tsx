import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, CircleCheck, Clock, Lightbulb, ShieldAlert, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CodeBlock } from '@/components/CodeBlock'
import { ExternalLink } from '@/components/ExternalLink'
import { Rich } from '@/components/Rich'
import type { GuideCommand, GuideNote, GuidePage, GuideStep } from '@/content/guide'
import { cn } from '@/lib/utils'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

const ANCHOR = 'scroll-mt-20 max-sm:scroll-mt-28'
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
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{c.label}</p>
          <CodeBlock code={c.code} label={c.label} />
        </div>
      ))}
    </>
  )
}

function Expect({ text }: { text?: string }) {
  if (!text) return null
  return (
    <p className="flex gap-2 rounded-lg border border-accent-cyan/25 bg-accent-cyan/5 px-4 py-3 text-sm">
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
        'flex gap-3 rounded-lg border p-4 text-sm',
        warn ? 'border-warning/40 bg-warning/10' : 'border-white/10 bg-surface',
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
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-cyan/40 bg-accent-cyan/10 font-display text-sm font-semibold text-accent-cyan"
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 space-y-4">
        <h3 id={step.id} className={cn(ANCHOR, 'pt-1.5 text-xl font-semibold')}>
          <a href={`#${step.id}`} className="hover:text-accent-cyan">
            <span className="sr-only">Step {n}: </span>
            {step.title}
          </a>
        </h3>
        <Paras items={step.body} />
        {step.substeps && (
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground marker:font-semibold marker:text-accent-cyan">
            {step.substeps.map((s) => (
              <li key={s} className="pl-1">
                <Rich text={s} />
              </li>
            ))}
          </ol>
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
          <Accordion className="rounded-lg border border-white/10 bg-surface px-4">
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
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
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
      <header id="top" className="border-b border-white/10 pt-14 pb-10 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-display text-xs font-medium tracking-[0.2em] text-accent-cyan uppercase">{g.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{g.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{g.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="h-7 gap-1.5 border-warning/40 bg-warning/15 px-3 text-sm text-warning">
              <TriangleAlert aria-hidden="true" />
              Early testing · expect bugs
            </Badge>
            {g.experimental && (
              <Badge className="h-7 gap-1.5 border-warning/40 bg-warning/20 px-3 text-sm text-warning">
                <TriangleAlert aria-hidden="true" />
                Experimental
              </Badge>
            )}
          </div>
          {g.experimental && <p className="mt-4 text-sm text-foreground/90">{g.experimental}</p>}
          {g.time.map((t) => (
            <p key={t} className="mt-4 flex gap-2 text-sm text-muted-foreground">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
              <span>
                <strong className="font-semibold text-foreground">Time needed:</strong> {t}
              </span>
            </p>
          ))}
          <nav aria-label="Steps on this page" className="mt-8 rounded-xl border border-white/10 bg-surface p-5">
            <p className="text-sm font-semibold">On this page</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm marker:text-muted-foreground">
              {g.steps.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-accent-cyan underline-offset-4 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>
      <main>
        <Block id="before" title="Before you start">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-surface p-5">
              <h3 className="font-semibold">{g.checklist.title}</h3>
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
            <div className="rounded-xl border border-accent-cyan/30 bg-surface p-5">
              <h3 className="flex items-center gap-2 font-semibold">
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
          <ol className="space-y-12">
            {g.steps.map((s, i) => (
              <StepView key={s.id} step={s} n={i + 1} extra={s.extra ? extras?.[s.extra] : undefined} />
            ))}
          </ol>
        </Block>

        <Block id="troubleshooting" title="Troubleshooting">
          <p className="mb-6 text-muted-foreground">{g.troubleshooting.intro}</p>
          <Accordion>
            {g.troubleshooting.items.map((it) => (
              <AccordionItem key={it.q} value={it.q} className="border-white/10">
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
                  <span className="flex items-center gap-1 font-semibold text-foreground">
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
                'block h-full rounded-xl border border-white/10 bg-surface p-5 hover:border-accent-cyan/50 focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none'
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
