import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { CREDITS, UPSTREAM } from '@/content/site'
import { Section } from './Section'

const OTHERS = CREDITS.filter((c) => c.url !== UPSTREAM.main.url && c.url !== UPSTREAM.root.url)
const license = 'border-ice/35 font-label text-[10px] tracking-[0.2em] text-ice/90'

export function Credits() {
  const { main, root } = UPSTREAM
  return (
    <Section id="credits" eyebrow={UPSTREAM.eyebrow} title={UPSTREAM.title} accent="MacNativeGames" intro={UPSTREAM.intro}>
      <div className="max-w-3xl space-y-4">
        <div className="cut-panel-2 p-6 [--cut:26px] sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-semibold tracking-[0.04em] uppercase sm:text-3xl">{main.name}</h3>
            <Badge variant="outline" className={license}>
              {main.license}
            </Badge>
          </div>
          <p className="mt-1 font-label text-[11px] tracking-[0.2em] text-accent-cyan uppercase">{main.by}</p>
          <p className="mt-4 text-ice/90">{main.description}</p>
          <ExternalLink href={main.url} className={buttonVariants({ variant: 'outline', size: 'lg', className: 'mt-6' })}>
            <GithubIcon className="size-4" />
            {main.cta}
            <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
        </div>

        <div className="cut-panel p-5 [--cut:16px] [--cut-bg:var(--deep)]">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-lg font-semibold tracking-[0.04em] uppercase">
              <ExternalLink href={root.url} className="text-accent-cyan underline-offset-4 hover:underline">
                {root.name}
              </ExternalLink>
            </h3>
            <Badge variant="outline" className={license}>
              {root.license}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{root.description}</p>
        </div>

        <h3 className="pt-6 font-label text-xs tracking-[0.3em] text-accent-cyan uppercase">{UPSTREAM.othersHeading}</h3>
        <ul className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          {OTHERS.map((c) => (
            <li key={c.name}>
              <ExternalLink href={c.url} className="font-medium text-accent-cyan underline-offset-4 hover:underline">
                {c.name}
              </ExternalLink>
              <span className="text-muted-foreground"> · {c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
