import type { ReactNode } from 'react'
import { ArrowRight, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { ExternalLink } from '@/components/ExternalLink'
import { PageHero } from '@/components/PageHero'
import { Rich } from '@/components/Rich'
import { Badge } from '@/components/ui/badge'
import { FIXES_PAGE as P, commitUrl, fixesByDate, getItText, type Fix } from '@/content/fixes'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="font-label text-[11px] tracking-[0.2em] text-accent-cyan uppercase sm:pt-1">{label}</dt>
      <dd className="min-w-0 text-muted-foreground">{children}</dd>
    </div>
  )
}

function FixEntry({ fix }: { fix: Fix }) {
  return (
    <article className="cut-panel min-w-0 p-5 [--cut-bg:var(--deep)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-[0.04em] uppercase">{fix.title}</h3>
        <Badge variant="outline" className="shrink-0 border-accent-cyan/40 bg-accent-cyan/10 tracking-[0.08em] text-accent-cyan uppercase">
          {fix.platform}
        </Badge>
      </div>
      <dl className="mt-5 space-y-4">
        <Row label="What was wrong">
          <Rich text={fix.wrong} />
        </Row>
        <Row label="What changed">
          <Rich text={fix.changed} />
        </Row>
        {fix.versions && <Row label="Game version">{fix.versions}</Row>}
        <Row label="Tested">
          <Rich text={fix.tested} />
        </Row>
        {fix.remaining && (
          <Row label="Still open">
            <Rich text={fix.remaining} />
          </Row>
        )}
        <Row label="Get it">{getItText(fix.platform)}</Row>
      </dl>
      <p className="mt-5 text-sm">
        <ExternalLink
          href={commitUrl(fix.commit)}
          className="inline-flex items-center gap-1 text-accent-cyan underline underline-offset-4"
        >
          Commit <code className="font-mono">{fix.commit}</code>
          <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
        </ExternalLink>
      </p>
    </article>
  )
}

export function FixesPage() {
  const base = import.meta.env.BASE_URL
  const groups = fixesByDate()
  return (
    <>
      <Nav page="fixes" />
      <PageHero eyebrow={P.eyebrow} title={P.title}>
        <p className="mt-5 max-w-2xl text-lg text-ice/85">{P.lead}</p>
        <p className="mt-3 text-sm">
          <a
            href={`${base}#status`}
            className="inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4"
          >
            {P.openIssues}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </PageHero>
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-4xl space-y-14">
        {groups.map((g) => (
          <section key={g.date} id={`d-${g.date}`} aria-labelledby={`d-${g.date}-title`} className="scroll-mt-20 max-lg:scroll-mt-28">
            <h2
              id={`d-${g.date}-title`}
              className="border-b border-border pb-3 font-display text-2xl font-semibold tracking-[0.06em] text-ice"
            >
              <time dateTime={g.date}>{g.date}</time>
            </h2>
            <div className="mt-6 space-y-6">
              {g.fixes.map((f) => (
                <FixEntry key={`${f.commit}-${f.title}`} fix={f} />
              ))}
            </div>
          </section>
        ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
