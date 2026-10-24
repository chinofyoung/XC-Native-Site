import { ExternalLink } from '@/components/ExternalLink'
import { ISSUES_URL, PLAYTHROUGH } from '@/content/site'
import { Section } from './Section'

export function Playthrough() {
  return (
    <Section id="playthrough" eyebrow={PLAYTHROUGH.eyebrow} title={PLAYTHROUGH.title}>
      <div className="max-w-3xl space-y-4 border-l-2 border-accent-cyan/40 pl-5 text-muted-foreground">
        {PLAYTHROUGH.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          <ExternalLink href={ISSUES_URL} className="text-accent-cyan underline-offset-4 hover:underline">
            {PLAYTHROUGH.cta} ↗
          </ExternalLink>
        </p>
      </div>
    </Section>
  )
}
