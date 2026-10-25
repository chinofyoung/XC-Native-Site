import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { CodeBlock } from '@/components/CodeBlock'
import { ExternalLink } from '@/components/ExternalLink'
import { Rich } from '@/components/Rich'
import { GithubIcon } from '@/components/GithubIcon'
import { PageHero } from '@/components/PageHero'
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

function Steps({ items }: { items: { text: string; code?: string }[] }) {
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
      className={cn(buttonVariants({ size: 'lg' }), className)}
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
      <PageHero eyebrow="Help fill in the picture" title={S.title}>
        <p className="mt-5 max-w-2xl text-lg text-ice/85">{S.lead}</p>
        <aside aria-label="What leaves your machine" className="cut-panel mt-8 flex max-w-2xl gap-3 p-5 sm:p-6">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
          <div>
            <h2 className="font-display text-lg font-semibold tracking-[0.04em] uppercase">{S.reassurance.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{S.reassurance.body}</p>
          </div>
        </aside>
        <div className="mt-6">
          <ShareOnGithubButton />
        </div>
      </PageHero>
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
              <h3 className="font-display text-xl font-semibold tracking-[0.04em] uppercase">{how.mac.title}</h3>
              <Steps items={how.mac.steps} />
              {how.mac.after.map((t) => (
                <P key={t}>{t}</P>
              ))}
            </div>
            <div className="min-w-0 space-y-5">
              <h3 className="font-display text-xl font-semibold tracking-[0.04em] uppercase">{how.ios.title}</h3>
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
          <Accordion className="max-w-2xl border-l-2 border-accent-cyan/50 bg-surface px-5">
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
