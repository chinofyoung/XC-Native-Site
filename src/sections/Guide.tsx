import type { ReactNode } from 'react'
import { ArrowUpRight, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/CodeBlock'
import { ExternalLink } from '@/components/ExternalLink'
import { CONTROLS, IOS_STEPS, MAC_STEPS, type Step } from '@/content/guide'
import { README_URL } from '@/content/site'
import { Section } from './Section'

function Steps({ steps, extra }: { steps: Step[]; extra?: Record<string, ReactNode> }) {
  return (
    <ol className="space-y-8">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4 sm:gap-6">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-cyan/40 bg-accent-cyan/10 font-display text-sm font-semibold text-accent-cyan"
          >
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 space-y-3">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-base text-muted-foreground">{s.body}</p>
            {s.link && (
              <p className="text-sm">
                <ExternalLink
                  href={s.link.url}
                  className="inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4"
                >
                  {s.link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ExternalLink>
              </p>
            )}
            {[s.command ?? []].flat().map((c) => (
              <CodeBlock key={c} code={c} label={s.title} />
            ))}
            {s.note && <p className="text-sm text-muted-foreground/80">{s.note}</p>}
            {extra?.[s.title]}
          </div>
        </li>
      ))}
    </ol>
  )
}

function ControlsTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-surface">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Keyboard controls</caption>
        <thead className="border-b border-white/10 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Key</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Switch control</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {CONTROLS.map((c) => (
            <tr key={c.key}>
              <th scope="row" className="px-4 py-2.5 font-mono text-xs font-medium whitespace-nowrap text-accent-cyan">
                {c.key}
              </th>
              <td className="px-4 py-2.5 text-foreground/90">{c.switch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Guide() {
  return (
    <Section
      id="guide"
      eyebrow="Step by step"
      title="Build it from your own copy"
      intro="From your game file and prod.keys to the game running. Pick your device."
    >
      <Tabs defaultValue="mac">
        <TabsList className="h-11! w-full sm:w-fit">
          <TabsTrigger value="mac" className="px-4 sm:flex-none">Mac</TabsTrigger>
          <TabsTrigger value="ios" className="px-4 sm:flex-none">iPhone / iPad</TabsTrigger>
        </TabsList>
        <TabsContent value="mac" className="pt-8">
          <Steps steps={MAC_STEPS} extra={{ Controls: <ControlsTable /> }} />
        </TabsContent>
        <TabsContent value="ios" className="pt-8">
          <div className="mb-8 flex items-center gap-3 rounded-lg border border-white/10 bg-surface p-4 text-sm">
            <Badge className="h-6 shrink-0 gap-1.5 border-warning/40 bg-warning/20 text-warning">
              <TriangleAlert aria-hidden="true" />
              Experimental
            </Badge>
            <span className="text-foreground/90">
              Tested only on an iPhone 15 Pro Max, in the first area (a smooth 30 fps there). Nothing past it has been tested on iPhone.
            </span>
          </div>
          <Steps steps={IOS_STEPS} />
        </TabsContent>
      </Tabs>
      <p className="mt-12 text-sm text-muted-foreground">
        Every option and the troubleshooting are in the{' '}
        <ExternalLink
          href={README_URL}
          className="inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4"
        >
          full README on GitHub
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </ExternalLink>
        .
      </p>
    </Section>
  )
}
