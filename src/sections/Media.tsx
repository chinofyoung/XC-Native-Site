import { Gallery } from '@/components/Gallery'
import { LiteYouTube } from '@/components/LiteYouTube'
import { GALLERY, VIDEOS } from '@/content/site'
import { Section } from './Section'

export function Media() {
  return (
    <Section
      id="media"
      eyebrow="See it run"
      title="Running on real hardware"
      intro="Two videos from the iPhone 15 Pro Max build; a Mac video is on the way. Screenshots below are from the Mac."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {VIDEOS.map((v) => (
          <figure key={v.id || v.device} className="space-y-3">
            <LiteYouTube video={v} />
            <figcaption className="text-sm text-muted-foreground">{v.caption}</figcaption>
          </figure>
        ))}
      </div>
      <h3 className="mt-16 mb-6 text-xl font-semibold">Screenshots</h3>
      <Gallery shots={GALLERY} />
    </Section>
  )
}
