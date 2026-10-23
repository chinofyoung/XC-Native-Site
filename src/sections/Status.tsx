import { Check, CircleDot } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from '@/components/ExternalLink'
import { ISSUES_URL } from '@/content/site'
import { KNOWN_ISSUES, STAGES, WORKS } from '@/content/status'
import { cn } from '@/lib/utils'
import { Section } from './Section'

export function Status() {
  return (
    <Section
      id="status"
      eyebrow="Honest status"
      title="Early testing, with bugs"
      intro="This is an early-testing port. Here is what has been checked and what has not."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-surface p-6">
          <h3 className="text-lg font-semibold">Stages</h3>
          <ul className="mt-4 divide-y divide-white/5">
            {STAGES.map((s) => (
              <li key={s.n} className="flex items-start gap-3 py-3">
                <span className="w-14 shrink-0 font-display text-sm text-muted-foreground">Stage {s.n}</span>
                <span className="flex-1 text-sm">{s.goal}</span>
                <Badge variant={s.state === 'done' ? 'secondary' : 'outline'} className="shrink-0">
                  {s.state === 'done' ? <Check aria-hidden="true" /> : <CircleDot aria-hidden="true" />}
                  {s.state}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface p-6">
          <h3 className="text-lg font-semibold">What works</h3>
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

      <h3 className="mt-14 mb-4 text-lg font-semibold">Known issues and not yet checked</h3>
      <Accordion className="rounded-xl border border-white/10 bg-surface px-5">
        {KNOWN_ISSUES.map((k, i) => (
          <AccordionItem key={k.title} value={`issue-${i}`}>
            <AccordionTrigger className="py-4 text-base">{k.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{k.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ExternalLink href={ISSUES_URL} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10 px-4')}>
          Found a bug? Open an issue
        </ExternalLink>
      </div>
    </Section>
  )
}
