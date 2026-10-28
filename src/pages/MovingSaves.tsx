import type { ReactNode } from 'react'
import { ArrowRight, CircleCheck, FlaskConical, ShieldCheck } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { OnThisPage, PageHero } from '@/components/PageHero'
import { Rich } from '@/components/Rich'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MAC_EXPORT_COMMAND, MAC_IMPORT_COMMAND, SAVES as S, type SaveStep } from '@/content/saves'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'
import { Section } from '@/sections/Section'

const P = ({ children }: { children: ReactNode }) => <p className="text-muted-foreground">{children}</p>

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-muted-foreground">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-accent-cyan" />
          <span className="min-w-0">
            <Rich text={b} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function Steps({ items }: { items: SaveStep[] }) {
  return (
    <ol className="space-y-4">
      {items.map((s, i) => (
        <li key={s.text} className="flex gap-3">
          <span className="cut-badge mt-0.5 flex size-8 shrink-0 items-center justify-center bg-[#16303a] font-display text-sm font-black text-accent-cyan italic">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1 space-y-3 text-muted-foreground">
            <p>
              <Rich text={s.text} />
            </p>
            {s.code && <CodeBlock code={s.code} label="Folder" />}
          </div>
        </li>
      ))}
    </ol>
  )
}

function Tested({ text }: { text: string }) {
  return (
    <p className="flex gap-2 border-l-2 border-steel bg-surface px-4 py-3 text-sm text-foreground/90">
      <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
      <span>{text}</span>
    </p>
  )
}

const ON_THIS_PAGE = [
  { href: '#what', title: S.what.title },
  { href: '#before', title: S.before.title },
  { href: '#how', title: S.how.title },
  { href: '#safe', title: S.safe.title },
  { href: '#undo', title: S.undo.title },
  { href: '#command-line', title: S.commandLine.title },
  { href: '#tested', title: S.tested.title },
  { href: '#questions', title: S.questions.title },
]

export function MovingSavesPage() {
  const { how, undo, questions } = S
  return (
    <>
      <Nav page="saves" />
      <PageHero eyebrow={S.eyebrow} title={S.title}>
        <p className="mt-5 max-w-2xl text-lg text-ice/85">{S.lead}</p>
        <aside aria-label="How the saves move" className="cut-panel mt-8 flex max-w-2xl gap-3 p-5 sm:p-6">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
          <div>
            <h2 className="font-display text-lg font-semibold tracking-[0.04em] uppercase">{S.reassurance.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{S.reassurance.body}</p>
          </div>
        </aside>
        <OnThisPage label="Sections on this page" items={ON_THIS_PAGE} />
      </PageHero>
      <main>
        <Section id="what" eyebrow="Part 1" title={S.what.title}>
          <div className="max-w-2xl space-y-4">
            {S.what.paragraphs.map((t) => (
              <P key={t}>
                <Rich text={t} />
              </P>
            ))}
            <Bullets items={S.what.bullets} />
          </div>
        </Section>

        <Section id="before" eyebrow="Part 2" title={S.before.title}>
          <div className="max-w-2xl space-y-6">
            <ul className="space-y-3">
              {S.before.items.map((it) => (
                <li key={it} className="flex gap-2.5 text-muted-foreground">
                  <CircleCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-cyan" />
                  <span>
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {S.before.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-0.5 text-accent-cyan underline underline-offset-4"
                >
                  {l.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </p>
          </div>
        </Section>

        <Section id="how" eyebrow="Part 3" title={how.title} intro={how.intro}>
          <div className="grid gap-12 lg:grid-cols-2">
            {how.flows.map((f) => (
              <div key={f.id} className="min-w-0 space-y-5">
                <h3
                  id={f.id}
                  className="scroll-mt-20 font-display text-xl font-semibold tracking-[0.04em] uppercase max-lg:scroll-mt-28"
                >
                  {f.title}
                </h3>
                <Steps items={f.steps} />
                <Tested text={f.tested} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="safe" eyebrow="Part 4" title={S.safe.title} intro={S.safe.intro}>
          <div className="max-w-2xl">
            <Bullets items={S.safe.bullets} />
          </div>
        </Section>

        <Section id="undo" eyebrow="Part 5" title={undo.title}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="min-w-0 space-y-5">
              <h3 className="font-display text-xl font-semibold tracking-[0.04em] uppercase">{undo.mac.title}</h3>
              <Steps items={undo.mac.steps} />
            </div>
            <div className="min-w-0 space-y-5">
              <h3 className="font-display text-xl font-semibold tracking-[0.04em] uppercase">{undo.ios.title}</h3>
              <P>
                <Rich text={undo.ios.text} />
              </P>
            </div>
          </div>
        </Section>

        <Section id="command-line" eyebrow="Part 6" title={S.commandLine.title}>
          <div className="max-w-2xl space-y-4">
            <P>{S.commandLine.intro}</P>
            <CodeBlock code={MAC_EXPORT_COMMAND} label="Export saves" />
            <CodeBlock code={MAC_IMPORT_COMMAND} label="Import saves" />
            <P>
              <Rich text={S.commandLine.after} />
            </P>
          </div>
        </Section>

        <Section id="tested" eyebrow="Part 7" title={S.tested.title}>
          <div className="max-w-2xl">
            <Bullets items={S.tested.items} />
          </div>
        </Section>

        <Section id="questions" eyebrow="Part 8" title={questions.title}>
          <Accordion className="max-w-2xl border-l-2 border-accent-cyan/50 bg-surface px-5">
            {questions.items.map((it) => (
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
        </Section>
      </main>
      <Footer />
    </>
  )
}
