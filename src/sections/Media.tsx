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
          <figcaption className="border-l-2 border-accent-cyan/40 pl-3 text-sm text-muted-foreground">{v.caption}</figcaption>
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
      accent="real hardware"
      intro="Videos from the iPhone 15 Pro Max and the M1 MacBook Air builds. Screenshots below are from the Mac."
    >
      <VideoGrid videos={iphone} />
      <aside
        aria-label={IOS_CONTROLS.title}
        className="cut-panel relative mt-10 p-5 [--cut-bg:linear-gradient(135deg,#16303a,#0c1a1f)] sm:p-7"
      >
        <span aria-hidden="true" className="notch-down absolute -top-3.5 left-8" />
        <h3 className="font-display text-lg font-semibold tracking-[0.04em] uppercase sm:text-xl">{IOS_CONTROLS.title}</h3>
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
        <div className="mt-10">
          <VideoGrid videos={other} />
        </div>
      )}
      <h3 className="mt-16 mb-6 font-label text-xs tracking-[0.3em] text-accent-cyan uppercase">Screenshots</h3>
      <Gallery shots={GALLERY} />
    </Section>
  )
}
