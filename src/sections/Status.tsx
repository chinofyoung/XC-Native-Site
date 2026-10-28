import { ArrowRight, Check, CircleDot } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from '@/components/ExternalLink'
import { ISSUES_URL } from '@/content/site'
import { KNOWN_ISSUES, STAGES, WORKS } from '@/content/status'
import { cn } from '@/lib/utils'
import { Section } from './Section'

const panelTitle = 'font-display text-lg font-semibold tracking-[0.06em] uppercase'

export function Status() {
  return (
    <Section
      id="status"
      eyebrow="Honest status"
      title="Early testing, with bugs"
      accent="with bugs"
      intro="This is an early-testing port. Here is what has been checked and what has not."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cut-panel min-w-0 p-5 [--cut-bg:var(--deep)] sm:p-6">
          <h3 className={panelTitle}>Stages</h3>
          <ul className="mt-4 divide-y divide-border">
            {STAGES.map((s) => (
              <li key={s.n} className="flex items-start gap-3 py-3">
                <span className="w-[4.75rem] shrink-0 pt-0.5 font-label text-[10px] tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase">
                  Stage {s.n}
                </span>
                <span className="flex-1 text-sm">{s.goal}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    'shrink-0 tracking-[0.08em] uppercase',
                    s.state === 'done'
                      ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                      : 'border-warning/50 bg-warning/10 text-warning',
                  )}
                >
                  {s.state === 'done' ? <Check aria-hidden="true" /> : <CircleDot aria-hidden="true" />}
                  {s.state}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="cut-panel min-w-0 p-5 [--cut-bg:var(--deep)] sm:p-6">
          <h3 className={panelTitle}>What works</h3>
          <ul className="mt-4 space-y-3">
            {WORKS.map((w) => (
              <li key={w} className="flex gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" aria-hidden="true" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className={cn(panelTitle, 'mt-14 mb-2')}>Known issues and not yet checked</h3>
      <p className="mb-4 text-sm">
        <a
          href={`${import.meta.env.BASE_URL}fixes/`}
          className="inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4"
        >
          Fixed issues are listed on the Fixes page
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </p>
      <Accordion className="border-l-2 border-warning/60 bg-surface px-5">
        {KNOWN_ISSUES.map((k, i) => (
          <AccordionItem key={k.title} value={`issue-${i}`}>
            <AccordionTrigger className="py-4 text-base">{k.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{k.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ExternalLink href={ISSUES_URL} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
          Found a bug? Open an issue
        </ExternalLink>
      </div>
    </Section>
  )
}
