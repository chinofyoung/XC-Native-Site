import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { buttonVariants } from '@/components/ui/button'
import { SHADER_FORM_URL, SHARE_HIGHLIGHT as H } from '@/content/sharing'
import { cn } from '@/lib/utils'
import { Section } from './Section'

export function ShareShaders() {
  return (
    <Section id="share-shaders" eyebrow={H.eyebrow} title={H.title} accent="you meet">
      <ul className="max-w-2xl space-y-3 text-muted-foreground">
        {H.points.map((p) => (
          <li key={p} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-accent-cyan" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
        <a href={`${import.meta.env.BASE_URL}sharing-shaders/`} className={buttonVariants({ size: 'lg' })}>
          How sharing works
        </a>
        <ExternalLink href={SHADER_FORM_URL} className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
          <GithubIcon className="size-4" />
          Share on GitHub
        </ExternalLink>
      </div>
    </Section>
  )
}
