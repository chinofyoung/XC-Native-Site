import { ExternalLink } from '@/components/ExternalLink'
import { HERO, HERO_ART_URL, UPSTREAM, UPSTREAM_URL } from '@/content/site'
import { Nav } from './Nav'

// HERO_ART_URL is official art loaded from IGN, a placeholder until the project's
// own screenshot (HERO_IMAGE in content/site.ts) is swapped back in before main.
const ART_STYLE = {
  backgroundImage: `url('${HERO_ART_URL}')`,
  backgroundPosition: '50% 0',
  // wider than the box, so the art's own logo is cropped out
  backgroundSize: 'max(120%, 140vh) auto',
  backgroundRepeat: 'no-repeat',
}

export function Hero() {
  return (
    <header
      id="top"
      className="bg-slate-band relative isolate z-10 flex min-h-svh scroll-mt-20 flex-col overflow-hidden"
    >
      <div
        data-testid="hero-art"
        aria-hidden="true"
        style={ART_STYLE}
        className="absolute inset-0 -z-20 opacity-70 [mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)] sm:left-[22%] sm:opacity-100 sm:[mask-image:linear-gradient(90deg,transparent_0%,#000_32%)]"
      />
      {/* left and bottom fades keep body text readable over the art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,16,19,.92)_0%,rgba(8,16,19,.55)_38%,rgba(8,16,19,.1)_70%),linear-gradient(0deg,rgba(8,16,19,.9)_0%,transparent_40%)] max-sm:bg-[linear-gradient(0deg,rgba(8,16,19,.96)_0%,rgba(8,16,19,.72)_45%,rgba(8,16,19,.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_45%_at_72%_30%,rgba(63,227,210,.18),transparent_70%)] mix-blend-screen"
      />

      <Nav page="home" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-4 pt-32 pb-8 sm:px-6 sm:pt-28 lg:px-10 lg:pb-10">
        <div className="relative flex flex-1 flex-col justify-center py-6 lg:py-10">

          <div className="relative self-end text-right [text-shadow:0_2px_18px_rgba(0,0,0,.9),0_0_4px_rgba(0,0,0,.8)] lg:mr-[6%]">
            <p className="font-label text-[clamp(13px,2vw,30px)] tracking-[0.04em] text-ice">{HERO.spec}</p>
            <p className="mt-2 text-[11px] font-medium tracking-[0.3em] text-warning uppercase sm:text-xs">
              {HERO.platforms}
            </p>
          </div>

          <h1 className="relative mt-8 lg:mt-4 lg:pl-[10%]">
            <span className="sr-only">{HERO.title}</span>
            <span
              aria-hidden="true"
              className="block font-display text-[clamp(40px,12.4vw,168px)] leading-[0.85] font-black tracking-[-0.02em] whitespace-nowrap text-ice italic [--stroke:2px] [--stroke-color:var(--ice)] [text-shadow:0_10px_40px_rgba(0,0,0,.45)] sm:[--stroke:3px]"
            >
              XENOBLADE <span className="text-outline [text-shadow:none]">X</span>
            </span>
            <span
              aria-hidden="true"
              className="mt-4 block font-label text-[clamp(13px,2.2vw,32px)] font-normal tracking-[0.04em] text-ice uppercase sm:mt-6"
            >
              {HERO.sub}
            </span>
          </h1>

          <p className="relative mt-5 text-sm text-ice/85 lg:pl-[10%]">
            {UPSTREAM.heroPrefix}{' '}
            <ExternalLink
              href={UPSTREAM_URL}
              className="font-semibold text-accent-cyan underline-offset-4 hover:underline"
            >
              {UPSTREAM.main.name}
            </ExternalLink>{' '}
            by {UPSTREAM.author}
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_240px] lg:gap-[18px]">
          <span aria-hidden="true" className="notch-down absolute -top-3.5 left-[calc(25%+22px)] hidden lg:block" />
          {HERO.panels.map((p) => (
            <div key={p.title} className="cut-panel px-6 pt-5 pb-6 before:backdrop-blur-sm">
              <h2 className="font-display text-xl font-semibold tracking-[0.06em] uppercase sm:text-2xl">{p.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between gap-4 border border-ice/35 bg-panel p-5">
            <p className="text-center font-label text-lg tracking-[0.3em] whitespace-nowrap text-warning">
              <span aria-hidden="true">[ {HERO.early.label} ]</span>
              <span className="sr-only">{HERO.early.srText}</span>
            </p>
            <div aria-hidden="true" className="hazard-stripes h-10" />
            <p className="text-center text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{HERO.early.note}</p>
          </div>
          <span aria-hidden="true" className="notch-up absolute bottom-6 left-[calc(75%-30px)] hidden lg:block" />
        </div>
      </div>
    </header>
  )
}
