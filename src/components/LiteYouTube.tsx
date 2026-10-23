import { useState } from 'react'
import { Play } from 'lucide-react'
import type { Video } from '@/content/site'

export function LiteYouTube({ video }: { video: Video }) {
  const [active, setActive] = useState(false)
  const frame = 'relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-surface'

  if (!video.id) {
    return (
      <div className={`${frame} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface to-background`}>
        <span className="font-display text-sm text-muted-foreground">Video coming soon</span>
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
          title={`${video.device} gameplay video`}
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
      aria-label={`Play ${video.device} video`}
      className={`${frame} group flex items-center justify-center bg-gradient-to-br from-surface to-background focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:outline-none`}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-accent-cyan/15 text-accent-cyan ring-1 ring-accent-cyan/50 motion-safe:transition-transform motion-safe:group-hover:scale-110">
        <Play className="size-7 fill-current" aria-hidden="true" />
      </span>
      <span className="absolute bottom-3 left-3 font-display text-sm text-foreground">{video.device}</span>
      <span className="absolute right-3 bottom-3 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-foreground">
        {video.fps}
      </span>
    </button>
  )
}
