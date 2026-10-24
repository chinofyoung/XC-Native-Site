import { Fragment, type ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { buttonVariants } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  FILL_SHADERS_COMMAND,
  IOS_FETCH_COMMAND,
  LIST_DEVICES,
  METAL_TOOLCHAIN_COMMAND,
  SHADER_FORM_URL,
  SHARING as S,
} from '@/content/sharing'
import { cn } from '@/lib/utils'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'
import { Section } from '@/sections/Section'

/** Renders `code` and **bold** spans in a copy string. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('`') ? (
          <code key={i} className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere]">
            {p.slice(1, -1)}
          </code>
        ) : p.startsWith('**') ? (
          <strong key={i} className="font-semibold text-foreground">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}

const P = ({ children }: { children: ReactNode }) => <p className="text-muted-foreground">{children}</p>

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-accent-cyan">
      {items.map((b) => (
        <li key={b}>
          <Rich text={b} />
        </li>
      ))}
    </ul>
  )
}

function Steps({ items }: { items: { text: string; code?: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((s, i) => (
        <li key={s.text} className="flex gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-cyan/15 font-display text-xs font-semibold text-accent-cyan">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 space-y-3 text-muted-foreground">
            <p>
              <Rich text={s.text} />
            </p>
            {s.code && <CodeBlock code={s.code} label="File path" />}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ShareOnGithubButton({ className }: { className?: string }) {
  return (
    <ExternalLink
      href={SHADER_FORM_URL}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'h-11 bg-accent-cyan px-5 text-base font-semibold text-background hover:bg-accent-cyan/85',
        className,
      )}
    >
      <GithubIcon className="size-4" />
      Share on GitHub
    </ExternalLink>
  )
}

export function SharingShadersPage() {
  const { how, questions } = S
  return (
    <>
      <Nav page="sharing" />
      <header id="top" className="pt-14 pb-4 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-display text-xs font-medium tracking-[0.2em] text-accent-cyan uppercase">Help fill in the picture</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{S.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{S.lead}</p>
          <aside
            aria-label="What leaves your machine"
            className="mt-8 flex max-w-2xl gap-3 rounded-xl border border-accent-cyan/30 bg-surface p-5"
          >
            <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
            <div>
              <h2 className="font-semibold">{S.reassurance.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{S.reassurance.body}</p>
            </div>
          </aside>
          <div className="mt-6">
            <ShareOnGithubButton />
          </div>
        </div>
      </header>
      <main>
        <Section id="what" eyebrow="Part 1" title={S.what.title}>
          <div className="max-w-2xl space-y-4">
            {S.what.paragraphs.map((t) => (
              <P key={t}>{t}</P>
            ))}
          </div>
        </Section>

        <Section id="data" eyebrow="Part 2" title={S.data.title}>
          <div className="max-w-2xl space-y-4">
            {S.data.paragraphs.map((t) => (
              <P key={t}>{t}</P>
            ))}
            <Bullets items={S.data.bullets} />
            <P>{S.data.after}</P>
          </div>
        </Section>

        <Section id="first-build" eyebrow="Part 3" title={S.build.title}>
          <div className="max-w-2xl space-y-4">
            {S.build.paragraphs.map((t) => (
              <P key={t}>
                <Rich text={t} />
              </P>
            ))}
            <Bullets items={S.build.bullets} />
          </div>
        </Section>

        <Section id="how" eyebrow="Part 4" title={how.title} intro={how.intro}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="min-w-0 space-y-5">
              <h3 className="text-xl font-semibold">{how.mac.title}</h3>
              <Steps items={how.mac.steps} />
              {how.mac.after.map((t) => (
                <P key={t}>{t}</P>
              ))}
            </div>
            <div className="min-w-0 space-y-5">
              <h3 className="text-xl font-semibold">{how.ios.title}</h3>
              <P>
                <Rich text={how.ios.intro} />
              </P>
              <Steps items={how.ios.steps} />
              <P>
                <Rich text={how.ios.overlay} />
              </P>
              <P>
                <Rich text={how.ios.fetchIntro} />
              </P>
              <CodeBlock code={LIST_DEVICES} label="List devices" />
              <CodeBlock code={IOS_FETCH_COMMAND} label="Build with the phone connected" />
              <P>
                <Rich text={how.ios.fetchAfter} />
              </P>
            </div>
          </div>
          <div className="mt-10">
            <ShareOnGithubButton />
          </div>
        </Section>

        <Section id="after" eyebrow="Part 5" title={S.after.title}>
          <div className="max-w-2xl space-y-4">
            <Steps items={S.after.steps.map((text) => ({ text }))} />
            <P>{S.after.note}</P>
          </div>
        </Section>

        <Section id="fix" eyebrow="Part 6" title={S.fix.title}>
          <div className="max-w-2xl space-y-4">
            <P>{S.fix.intro}</P>
            <CodeBlock code={FILL_SHADERS_COMMAND} label="Fill shaders on the phone" />
            <Bullets items={S.fix.bullets} />
            <P>{S.fix.after}</P>
            <CodeBlock code={METAL_TOOLCHAIN_COMMAND} label="Install the Metal Toolchain" />
          </div>
        </Section>

        <Section id="questions" eyebrow="Part 7" title={questions.title}>
          <Accordion className="max-w-2xl">
            {questions.items.map((it) => (
              <AccordionItem key={it.q} value={it.q}>
                <AccordionTrigger className="text-base">{it.q}</AccordionTrigger>
                <AccordionContent className="space-y-3 text-muted-foreground">
                  {it.a.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  {it.bullets && <Bullets items={it.bullets} />}
                  {it.afterBullets?.map((t) => (
                    <p key={t}>{t}</p>
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
