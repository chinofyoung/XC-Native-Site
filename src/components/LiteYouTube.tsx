import { useState } from 'react'
import { Play } from 'lucide-react'
import type { Video } from '@/content/site'

export function LiteYouTube({ video }: { video: Video }) {
  const [active, setActive] = useState(false)
  const frame = 'relative aspect-video w-full overflow-hidden border border-border bg-surface'

  if (!video.id) {
    return (
      <div className={`${frame} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface to-background`}>
        <span className="font-label text-xs tracking-[0.2em] text-muted-foreground uppercase">Video coming soon</span>
        <span className="text-xs text-muted-foreground/70">{video.device}</span>
      </div>
    )
  }

  if (active) {
    return (
      <div className={frame}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
          title={`${video.device} gameplay video${video.title ? ` — ${video.title}` : ''}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play ${video.device} video${video.title ? ` — ${video.title}` : ''}`}
      className={`${frame} group flex items-center justify-center bg-gradient-to-br from-surface to-background hover:border-accent-cyan/60 focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none`}
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" aria-hidden="true" />
      <span className="cut-badge relative flex size-16 items-center justify-center bg-accent-cyan text-[#06201d] motion-safe:transition-transform motion-safe:group-hover:scale-105">
        <Play className="ml-0.5 size-7 fill-current" aria-hidden="true" />
      </span>
      <span className="absolute bottom-3 left-3 font-display text-sm font-semibold tracking-[0.06em] text-foreground uppercase">
        {video.device}
        {video.title ? ` · ${video.title}` : ''}
      </span>
      <span className="absolute right-3 bottom-3 border border-accent-cyan/50 bg-black/50 px-2 py-0.5 font-label text-[10px] tracking-[0.15em] text-accent-cyan uppercase">
        {video.fps}
      </span>
    </button>
  )
}
