# XCX Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page, static landing site in `site/` that showcases the Xenoblade Chronicles X native port and walks owners of the game through building it for Mac and iPhone, deployed to GitHub Pages, with a Ko-fi tip link.

**Architecture:** A standalone Vite + React + TypeScript app in `site/`. All copy that changes (steps, issues, video IDs, gallery, links) lives in typed data files under `site/src/content/`. Sections are small components assembled in `App.tsx`. A GitHub Actions workflow builds `site/` and deploys it to Pages under the base path `/MacNativeGames/`.

**Tech Stack:** Vite 7, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (Button, Tabs, Card, Badge, Dialog, Accordion), lucide-react, `@fontsource/space-grotesk` + `@fontsource/inter`, Vitest + @testing-library/react + jsdom, `cwebp` (Homebrew, already installed) for images.

**Spec:** `docs/superpowers/specs/2026-10-23-landing-page-design.md`. Read it before any task.

## Global Constraints

- **No git state changes.** Never run commit, add, push, branch, stash, checkout, etc. The user commits. Read-only `git status` / `git diff` are fine. Every "Checkpoint" step below means: stop, report the changed files, and do not commit.
- Never save screenshots/PNGs in the repo root; ad-hoc screenshots go in `docs/screenshots/` (git-ignored).
- Package manager: `npm` (Node 22). All commands run from `site/` unless stated.
- Vite `base: '/MacNativeGames/'`. Every asset URL in code is built with `import.meta.env.BASE_URL`, never a leading `/`.
- Ko-fi: `https://ko-fi.com/chinofyoungdev`, plain link with `target="_blank" rel="noopener noreferrer"`. No Ko-fi script.
- Repo: `https://github.com/chinofyoung/MacNativeGames`. Original project: `https://github.com/ly05010419/MacNativeGames`.
- YouTube: `https://www.youtube-nocookie.com/embed/<id>?autoplay=1`, iframe created only after a click.
- No links to, or hosting of, builds, IPAs, apps, keys, firmware or game files.
- Claims are limited to the spec's "Facts the page states". In particular: Mac tested on M1 MacBook Air at 30 fps; iPhone 15 Pro Max at a smooth 30 fps **in the first area only, nothing past it tested on iPhone**; iPhone/iPad build is **experimental**; whole project is **early testing, expect bugs**.
- No Nintendo/Monolith logos or official key art; only the project's own screenshots.
- Theme: dark only. Background near-black navy (`#070b14`), surface `#0d1424`, accent cyan (`#22d3ee`), warning amber (`#f59e0b`) used only for the early-testing/experimental badges. Headings Space Grotesk, body Inter.
- Respect `prefers-reduced-motion` (no smooth-scroll or transitions when set).

## Review Focus

1. **Video ID not set yet** (all IDs start empty): card shows a "Video coming soon" poster, no iframe, nothing clickable that leads to a broken embed. Test in Task 3.
2. **Clipboard API missing or rejected** (Safari over http, permissions): the copy button must not throw; it shows "Copy failed" briefly and the command stays selectable. Test in Task 3.
3. **Phone width (375 px)**: long commands must scroll inside their code block, not widen the page. Test in Task 3 (class assertion) and visual check in Task 6.
4. **Served under `/MacNativeGames/`**: images and favicons resolve under the base path in the production build. Test in Task 2 (src helper) and verified in Task 6 with `vite preview`.
5. **Anchor links under the sticky nav**: `#guide`, `#media`, `#status` land with the heading visible (sections get `scroll-mt-20`). Test in Task 4 (ids exist, nav hrefs match).

---

### Task 1: Scaffold `site/` with theme, fonts and test setup

**Files:**
- Create: `site/` (Vite react-ts template), `site/vite.config.ts`, `site/vitest.setup.ts`, `site/src/index.css`, `site/src/App.tsx`, `site/src/App.test.tsx`, `site/components.json`, `site/src/components/ui/*` (from shadcn)
- Modify: `.gitignore` (root): add `.superpowers/` and `site/node_modules/`, `site/dist/`

**Interfaces:**
- Produces: `@/` path alias → `site/src`; `npm run dev|build|preview|test`; shadcn components importable from `@/components/ui/{button,tabs,card,badge,dialog,accordion}`; `cn()` from `@/lib/utils`; Tailwind theme tokens `bg-background`, `bg-surface`, `text-accent`, `text-warning`, `font-display`, `font-sans`.

- [ ] **Step 1:** From repo root, `npm create vite@latest site -- --template react-ts`, then in `site/`: `npm i` and `npm i -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/node` and `npm i lucide-react @fontsource/space-grotesk @fontsource/inter`.
- [ ] **Step 2:** Configure `vite.config.ts`: plugins `react()`, `tailwindcss()`; `base: '/MacNativeGames/'`; alias `@` → `./src`; `test: { environment: 'jsdom', setupFiles: './vitest.setup.ts', globals: true }`. Add `"test": "vitest run"` to package.json. Add `paths` for `@/*` in `tsconfig.json` and `tsconfig.app.json`.
- [ ] **Step 3:** Run `npx shadcn@latest init` (dark/neutral base), then `npx shadcn@latest add button tabs card badge dialog accordion`. In `src/index.css`, set the Global Constraints colors as the shadcn CSS variables (dark values on `:root`, no light theme), add `--color-surface`, `--color-accent-cyan`, `--color-warning`, `--font-display: "Space Grotesk"`, `--font-sans: "Inter"`, `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`. Import the fontsource weights 400/600/700 in `main.tsx`.
- [ ] **Step 4: Write failing test** `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'
test('renders the page title', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Xenoblade Chronicles X/i)
})
```

- [ ] **Step 5:** `npm test` → FAIL (template App has no such h1).
- [ ] **Step 6:** Replace `App.tsx` with a `<main>` holding a placeholder `<h1>Xenoblade Chronicles X, native on Apple silicon</h1>`; delete template assets (`App.css`, `src/assets/react.svg`, `public/vite.svg`). Set `index.html` `<title>` to "Xenoblade Chronicles X — native on Apple silicon", a meta description, `<html class="dark">`.
- [ ] **Step 7:** `npm test` → PASS; `npm run build` → succeeds, and `grep -c '/MacNativeGames/assets/' dist/index.html` prints ≥ 1.
- [ ] **Step 8:** Update root `.gitignore`. Checkpoint (no commit).

---

### Task 2: Content data and screenshots

**Files:**
- Create: `site/src/content/site.ts`, `site/src/content/guide.ts`, `site/src/content/status.ts`, `site/src/content/content.test.ts`, `site/src/lib/asset.ts`, `site/scripts/screenshots.sh`, `site/public/screenshots/*.webp`

**Interfaces:**
- Produces (exact exports):
  - `asset(path: string): string` in `lib/asset.ts` — returns `import.meta.env.BASE_URL + path` with no double slash.
  - `site.ts`: `KOFI_URL`, `REPO_URL`, `README_URL` (`${REPO_URL}#readme`), `ISSUES_URL` (`${REPO_URL}/issues`), `UPSTREAM_URL`; `type Video = { id: string; device: string; caption: string; fps: string }`; `VIDEOS: Video[]` (two entries, `id: ''`, devices "M1 MacBook Air" and "iPhone 15 Pro Max", iPhone caption must say "First area only"); `type Shot = { file: string; alt: string }`; `GALLERY: Shot[]`; `HERO_IMAGE = 'screenshots/xcx-stage4-battle.webp'`; `CREDITS: { name: string; url: string; note: string }[]`.
  - `guide.ts`: `type Step = { title: string; body: string; command?: string; note?: string }`; `MAC_STEPS: Step[]`, `IOS_STEPS: Step[]`; `CONTROLS: { key: string; switch: string }[]`.
  - `status.ts`: `STAGES: { n: number; goal: string; state: 'done' | 'in progress' }[]`; `KNOWN_ISSUES: { title: string; body: string }[]`; `WORKS: string[]`.

- [ ] **Step 1: Write failing tests** `content.test.ts`:

```ts
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { GALLERY, HERO_IMAGE, VIDEOS, KOFI_URL, CREDITS } from './site'
import { MAC_STEPS, IOS_STEPS } from './guide'
import { STAGES } from './status'
import { asset } from '@/lib/asset'

const pub = (p: string) => resolve(__dirname, '../../public', p)
test('every gallery image and the hero exist in public/', () => {
  for (const s of [...GALLERY.map(g => g.file), HERO_IMAGE]) expect(existsSync(pub(s))).toBe(true)
})
test('gallery has 4–6 shots, each with alt text', () => {
  expect(GALLERY.length).toBeGreaterThanOrEqual(4); expect(GALLERY.length).toBeLessThanOrEqual(6)
  GALLERY.forEach(g => expect(g.alt.length).toBeGreaterThan(10))
})
test('asset() prefixes the base path once', () => {
  expect(asset('screenshots/a.webp')).toBe('/MacNativeGames/screenshots/a.webp')
  expect(asset('/screenshots/a.webp')).toBe('/MacNativeGames/screenshots/a.webp')
})
test('ko-fi url', () => expect(KOFI_URL).toBe('https://ko-fi.com/chinofyoungdev'))
test('iPhone video is scoped to the first area', () => {
  expect(VIDEOS.find(v => v.device === 'iPhone 15 Pro Max')!.caption).toMatch(/first area/i)
})
test('guide commands never reference downloading keys or game files', () => {
  const text = JSON.stringify([MAC_STEPS, IOS_STEPS]).toLowerCase()
  for (const bad of ['download prod.keys', 'nsw2u', 'romsfun', '.ipa download']) expect(text).not.toContain(bad)
})
test('mac guide includes the builder window and brew line', () => {
  const cmds = MAC_STEPS.map(s => s.command ?? '')
  expect(cmds).toContain('python3 build_app.py --gui')
  expect(cmds).toContain('brew install opus libvpx python@3.14')
})
test('stages 0–5', () => expect(STAGES.map(s => s.n)).toEqual([0, 1, 2, 3, 4, 5]))
test('credits link https', () => CREDITS.forEach(c => expect(c.url).toMatch(/^https:\/\//)))
```

- [ ] **Step 2:** `npm test` → FAIL (modules missing).
- [ ] **Step 3:** Write `scripts/screenshots.sh`: for each name in a list, `cwebp -q 80 -resize 1920 0 ../docs/screenshots/<name>.png -o public/screenshots/<name>.webp`. Candidates: `xcx-stage4-battle`, `xcx-stage5-app-title`, `xcx-stage5-app-continue`, `xcx-stage4-avatar-gameplay-after`, `xcx-stage4-mfx-field-off`, `xcx-stage3-title`. Open each PNG first (Read tool) and drop any that shows an obvious rendering bug; keep 4–6. Run it.
- [ ] **Step 4:** Implement `lib/asset.ts` and the three content files. Copy for steps comes from `README.md` ("Requirements", "The window", "One command", "Play", "iPhone and iPad", "Controls") and the spec's Page structure §5; commands verbatim from the README. Mac step order and iOS step order exactly as in spec §5. iOS step 2 is "Play the Mac app first" (its shaders are carried into the IPA). The iOS install step states a free Apple ID re-signs every 7 days. `STAGES`/`KNOWN_ISSUES`/`WORKS` from README "Status" and "Known issues", with the iOS issue rewritten as: "iPhone / iPad: experimental. Runs at 30 fps on an iPhone 15 Pro Max in the first area; nothing past it is tested on iPhone." `CREDITS`: MacNativeGames, d2r-mobile, Ryujinx, SPIRV-Cross (URLs from README "Acknowledgements"; Ryujinx has none there, so link `${REPO_URL}/tree/main/vendor/ryujinx`).
- [ ] **Step 5:** `npm test` → PASS.
- [ ] **Step 6:** Checkpoint (no commit).

---

### Task 3: Reusable pieces — LiteYouTube, CodeBlock, Gallery lightbox

**Files:**
- Create: `site/src/components/LiteYouTube.tsx`, `site/src/components/CodeBlock.tsx`, `site/src/components/Gallery.tsx`, and a `*.test.tsx` beside each.

**Interfaces:**
- Consumes: `Video`, `Shot`, `asset()` from Task 2; shadcn `Dialog`, `Button`.
- Produces: `<LiteYouTube video={Video} />`, `<CodeBlock code={string} />`, `<Gallery shots={Shot[]} />`.

- [ ] **Step 1: Write failing tests.**

```tsx
// LiteYouTube.test.tsx
test('empty id shows coming soon and no button/iframe', () => {
  const { container } = render(<LiteYouTube video={{ id: '', device: 'M1 MacBook Air', caption: 'x', fps: '30 fps' }} />)
  expect(screen.getByText(/video coming soon/i)).toBeInTheDocument()
  expect(screen.queryByRole('button')).toBeNull()
  expect(container.querySelector('iframe')).toBeNull()
})
test('click loads nocookie iframe', async () => {
  const { container } = render(<LiteYouTube video={{ id: 'abc123', device: 'M1 MacBook Air', caption: 'x', fps: '30 fps' }} />)
  expect(container.querySelector('iframe')).toBeNull()
  await userEvent.click(screen.getByRole('button', { name: /play.*M1 MacBook Air/i }))
  expect(container.querySelector('iframe')!.src).toBe('https://www.youtube-nocookie.com/embed/abc123?autoplay=1')
})
// CodeBlock.test.tsx
test('copies the command', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.assign(navigator, { clipboard: { writeText } })
  render(<CodeBlock code="python3 build_app.py --gui" />)
  await userEvent.click(screen.getByRole('button', { name: /copy/i }))
  expect(writeText).toHaveBeenCalledWith('python3 build_app.py --gui')
  expect(await screen.findByText(/copied/i)).toBeInTheDocument()
})
test('clipboard failure does not throw', async () => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } })
  render(<CodeBlock code="x" />)
  await userEvent.click(screen.getByRole('button', { name: /copy/i }))
  expect(await screen.findByText(/copy failed/i)).toBeInTheDocument()
})
test('clipboard missing does not throw', async () => {
  Object.assign(navigator, { clipboard: undefined })
  render(<CodeBlock code="x" />)
  await userEvent.click(screen.getByRole('button', { name: /copy/i }))
  expect(await screen.findByText(/copy failed/i)).toBeInTheDocument()
})
test('long commands scroll inside the block', () => {
  const { container } = render(<CodeBlock code="x" />)
  expect(container.querySelector('pre')!.className).toMatch(/overflow-x-auto/)
})
// Gallery.test.tsx
test('opens a shot in a dialog', async () => {
  render(<Gallery shots={[{ file: 'screenshots/a.webp', alt: 'Battle in Primordia' }]} />)
  await userEvent.click(screen.getByRole('button', { name: /battle in primordia/i }))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(within(screen.getByRole('dialog')).getByRole('img')).toHaveAttribute('src', '/MacNativeGames/screenshots/a.webp')
})
```

- [ ] **Step 2:** `npm test` → the new tests FAIL.
- [ ] **Step 3:** Implement. LiteYouTube: 16:9 card; poster is a dark gradient with a lucide `Play` icon, the device name and an fps chip; the button's accessible name is `Play ${device} video`; the iframe has `title`, `allow="autoplay; encrypted-media; picture-in-picture"`, `allowFullScreen`. CodeBlock: `<pre className="overflow-x-auto …"><code>` with a small lucide `Copy`/`Check` button; status text resets after 2 s. Gallery: a responsive grid (1 column on mobile, 2 on sm, 3 on lg) of `<button>`s wrapping `<img loading="lazy">`, which open a shadcn `Dialog` with the full image and its alt as the caption.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Checkpoint (no commit).

---

### Task 4: Page sections and assembly

**Files:**
- Create in `site/src/sections/`: `Nav.tsx`, `Hero.tsx`, `Media.tsx` (videos + gallery), `BringYourOwn.tsx`, `Guide.tsx`, `Status.tsx`, `Support.tsx`, `Footer.tsx`; `site/src/sections/sections.test.tsx`
- Modify: `site/src/App.tsx` (render them in spec order), `site/src/App.test.tsx`

**Interfaces:**
- Consumes: everything from Tasks 2–3.
- Produces: section ids `media`, `guide`, `status`, `support` (all with `scroll-mt-20`).

- [ ] **Step 1: Write failing tests** `sections.test.tsx` (render `<App />`):

```tsx
test('early testing warning is in the hero', () =>
  expect(screen.getByText(/early testing/i)).toBeInTheDocument())
test('every ko-fi link is the right url and opens safely', () => {
  const links = screen.getAllByRole('link', { name: /ko-fi/i })
  expect(links.length).toBeGreaterThanOrEqual(2)
  links.forEach(l => { expect(l).toHaveAttribute('href', 'https://ko-fi.com/chinofyoungdev'); expect(l).toHaveAttribute('rel', expect.stringContaining('noopener')) })
})
test('nav anchors match section ids', () => {
  for (const id of ['media', 'guide', 'status']) {
    expect(document.getElementById(id)).not.toBeNull()
    expect(document.querySelector(`nav a[href="#${id}"]`)).not.toBeNull()
  }
})
test('bring-your-own states ownership and no sharing', () => {
  expect(screen.getByText(/copy you bought/i)).toBeInTheDocument()
  expect(screen.getByText(/never share the built app/i)).toBeInTheDocument()
})
test('guide switches to iPhone tab and shows experimental', async () => {
  await userEvent.click(screen.getByRole('tab', { name: /iphone/i }))
  expect(screen.getByText(/experimental/i)).toBeInTheDocument()
  expect(screen.getByText(/play the mac app first/i)).toBeInTheDocument()
})
test('footer has the no-affiliation disclaimer', () =>
  expect(screen.getByText(/not affiliated with.*nintendo/i)).toBeInTheDocument())
```

- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement each section per spec "Page structure" §1–8, reading copy from the content files. Nav: sticky, translucent `bg-background/80 backdrop-blur`, links Guide/Media/Status, GitHub icon link, Ko-fi button; on mobile the text links hide and only the icons and Ko-fi remain. Hero: `asset(HERO_IMAGE)` as an `<img>` with `object-cover` and a dark gradient overlay, the amber Badge "Early testing · expect bugs", h1, subtitle, "Start the guide" (`#guide`) and "Support on Ko-fi" buttons, and the small "Mac · iPhone · 30 fps · v1.0.1 / v2.0.0" line. Guide: shadcn Tabs "Mac" / "iPhone / iPad" with an amber "Experimental" badge on the iOS panel; numbered steps that use CodeBlock; a controls table on the Mac tab; a closing link to `README_URL`. Status: a stage list with done/in-progress badges, `WORKS` as a check list, `KNOWN_ISSUES` in an Accordion, and a "Found a bug? Open an issue" link to `ISSUES_URL`. Support: a short note and a Ko-fi button. Footer: credits, MIT, the disclaimer "Not affiliated with, endorsed by, or sponsored by Nintendo or Monolith Soft. Nintendo, Nintendo Switch and Xenoblade Chronicles are trademarks of Nintendo.", and a GitHub link.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → no TS errors.
- [ ] **Step 5:** Checkpoint (no commit).

---

### Task 5: Deploy workflow and README updates

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `README.md` (Legal section; the iPhone/iPad section's opening paragraph; the iOS line in "Known issues"); add a "Landing page" line near the top linking `https://chinofyoung.github.io/MacNativeGames/`

**Interfaces:** Consumes the `site/` npm scripts from Task 1.

- [ ] **Step 1:** Write `pages.yml`: `on: push` to `main` with `paths: ['site/**', '.github/workflows/pages.yml']`, plus `workflow_dispatch`; `permissions: { contents: read, pages: write, id-token: write }`; `concurrency: { group: pages, cancel-in-progress: true }`. Job `build`: `actions/checkout@v4`, `actions/setup-node@v4` (node 22, npm cache with `cache-dependency-path: site/package-lock.json`), `npm ci`, `npm test`, `npm run build` (working-directory `site`), `actions/upload-pages-artifact@v3` with path `site/dist`. Job `deploy` (needs build, environment `github-pages`): `actions/deploy-pages@v4`.
- [ ] **Step 2:** Verify YAML parses: `python3 -c "import yaml,sys;yaml.safe_load(open('.github/workflows/pages.yml'))"` → no output (use `ruby -ryaml -e 'YAML.load_file(".github/workflows/pages.yml")'` if PyYAML is missing).
- [ ] **Step 3:** README Legal: after "The repository contains no game content…" paragraph, add: "The one exception is the landing page in `site/`, which includes a few screenshots taken by the author to show the port. It holds no game program, keys or game files." README iOS: replace "The iOS app was built and its IPA checked, but it has not been run on a device." with "It runs at a smooth 30 fps on an iPhone 15 Pro Max in the first area; nothing past it has been tested on iPhone." Make the matching edit to the Known issues iOS bullet. Leave everything else in those sections unchanged.
- [ ] **Step 4:** `git diff README.md` (read-only) and confirm only those three edits plus the landing-page link changed.
- [ ] **Step 5:** Checkpoint (no commit).

---

### Task 6: Production build check and visual review

**Files:** none created in the repo except screenshots in `docs/screenshots/` (git-ignored).

- [ ] **Step 1:** In `site/`: `npm test && npm run build`, then `npm run preview -- --port 4173` in the background.
- [ ] **Step 2:** In the browser pane open `http://localhost:4173/MacNativeGames/`. Check: the hero image and gallery images load (no 404s in network requests), the anchors scroll with headings visible below the nav, the video cards show "Video coming soon", the Guide tabs switch, and copy buttons work.
- [ ] **Step 3:** Resize to 375×812 (mobile preset). Check that `document.documentElement.scrollWidth <= window.innerWidth` holds (no horizontal scroll), the nav fits, and the code blocks scroll internally. Reset to desktop afterwards.
- [ ] **Step 4:** Save desktop and mobile screenshots to `docs/screenshots/site-desktop.png` and `docs/screenshots/site-mobile.png`. Stop the preview server.
- [ ] **Step 5:** Checkpoint: report the results and screenshots to the user so they can review the visual style (the spec requires showing the style before polishing). No commit.
