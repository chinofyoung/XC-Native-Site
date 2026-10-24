import { ExternalLink } from '@/components/ExternalLink'
import { GithubIcon } from '@/components/GithubIcon'
import { buttonVariants } from '@/components/ui/button'
import { SHADER_FORM_URL, SHARE_HIGHLIGHT as H } from '@/content/sharing'
import { cn } from '@/lib/utils'
import { Section } from './Section'

export function ShareShaders() {
  return (
    <Section id="share-shaders" eyebrow={H.eyebrow} title={H.title}>
      <ul className="max-w-2xl list-disc space-y-3 pl-5 text-muted-foreground marker:text-accent-cyan">
        {H.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={`${import.meta.env.BASE_URL}sharing-shaders/`}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-11 bg-accent-cyan px-5 text-base font-semibold text-background hover:bg-accent-cyan/85',
          )}
        >
          How sharing works
        </a>
        <ExternalLink
          href={SHADER_FORM_URL}
          className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'h-11 px-5 text-base')}
        >
          <GithubIcon className="size-4" />
          Share on GitHub
        </ExternalLink>
      </div>
    </Section>
  )
}
