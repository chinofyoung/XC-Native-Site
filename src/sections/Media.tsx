import { Gamepad2, Hand } from 'lucide-react'
import { Gallery } from '@/components/Gallery'
import { LiteYouTube } from '@/components/LiteYouTube'
import { GALLERY, IOS_CONTROLS, VIDEOS, type Video } from '@/content/site'
import { Section } from './Section'

function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {videos.map((v) => (
        <figure key={v.id || v.device} className="space-y-3">
          <LiteYouTube video={v} />
          <figcaption className="text-sm text-muted-foreground">{v.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function Media() {
  const iphone = VIDEOS.filter((v) => v.device.startsWith('iPhone'))
  const other = VIDEOS.filter((v) => !v.device.startsWith('iPhone'))
  return (
    <Section
      id="media"
      eyebrow="See it run"
      title="Running on real hardware"
      intro="Two videos from the iPhone 15 Pro Max build; a Mac video is on the way. Screenshots below are from the Mac."
    >
      <VideoGrid videos={iphone} />
      <aside
        aria-label={IOS_CONTROLS.title}
        className="mt-8 rounded-xl border border-accent-cyan/30 bg-surface p-5 sm:p-6"
      >
        <h3 className="text-lg font-semibold">{IOS_CONTROLS.title}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3">
            <Hand aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
            <p className="text-sm text-muted-foreground">{IOS_CONTROLS.touch}</p>
          </div>
          <div className="flex gap-3">
            <Gamepad2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
            <p className="text-sm text-muted-foreground">{IOS_CONTROLS.gamepad}</p>
          </div>
        </div>
      </aside>
      {other.length > 0 && (
        <div className="mt-8">
          <VideoGrid videos={other} />
        </div>
      )}
      <h3 className="mt-16 mb-6 text-xl font-semibold">Screenshots</h3>
      <Gallery shots={GALLERY} />
    </Section>
  )
}
