# Landing page for the Xenoblade Chronicles X native port: design

## Intent

A public landing page for this fork (github.com/chinofyoung/MacNativeGames). It has two jobs, in this order:

1. **Teach people to port their own copy.** A visitor who owns Xenoblade Chronicles X: Definitive Edition leaves
   knowing exactly how to turn their own game dump and `prod.keys` into a native Mac app or iPhone/iPad build.
2. **Show it off.** Screenshots and performance videos on an M1 Mac and an iPhone 15 Pro Max. The videos are what
   make people believe it is worth trying.

Tips through Ko-fi (https://ko-fi.com/chinofyoungdev) are welcome but come second: a quiet "if this helped you".

## Goals

- Someone who has never seen the repo can follow the guide from "I have my XCI and prod.keys" to "the game is running",
  on Mac or on iPhone.
- It is obvious within a few seconds that the project is **in early testing and has bugs**.
- It is obvious that **you must own the game**: a copy you bought and keys dumped from your own Switch. The project does
  not promote piracy.
- Real screenshots, plus video of the game running on an M1 Mac and an iPhone 15 Pro Max.
- A clear Ko-fi link in the hero and in its own section near the end.

## Non-goals

- No downloads of builds, apps, IPAs, keys or game files. The page never hosts or links to any of them.
- No blog, no changelog feed, no CMS. Status is a hand-edited section.
- No analytics, accounts or comments.
- The page does not replace the README. Every deeper detail (developer `make` build, NSP edge cases, rewrite checks)
  links to the README or CHANGELOG on GitHub.

## Anti-goals (a failure even if the page works)

- Anything that reads like it helps someone get keys, firmware or game files, or that makes piracy look easy.
- Overclaiming: calling it finished, stable or "full game playable". Only claim what has been checked.
- Using Nintendo or Monolith Soft logos or official key art as branding, or anything that suggests the page is
  official. Only the project's own screenshots are used.
- Guide steps that disagree with the README.

## Constraints

- **Stack (the user's choice):** Vite, Tailwind CSS, shadcn. shadcn means React plus lucide-react icons. Use shadcn
  components where they fit (Button, Tabs, Card, Badge, Dialog for the lightbox, Accordion for FAQ/known issues).
- **Hosting (the user's choice):** GitHub Pages for this repo, so the site is served at
  `https://chinofyoung.github.io/MacNativeGames/`. Vite's `base` must be `/MacNativeGames/`.
- **Videos (the user's choice):** YouTube. Embed with `youtube-nocookie.com`, and load the iframe only when the visitor
  clicks the poster (a "lite" embed), so the page stays fast. The video IDs don't exist yet: keep them in one config
  constant, and show a "Video coming soon" poster when an ID is empty.
- **Ko-fi:** a plain link and button to `https://ko-fi.com/chinofyoungdev`. No Ko-fi widget script, so no third-party
  JS loads on page load.
- Static only: no server, no runtime API calls.
- Works at phone width (iPhone users are part of the audience) and in a dark theme.

## Facts the page states (from the user and the repo)

- It is **not an emulator**: the game's own ARM64 code runs directly on Apple silicon, Switch services are answered by
  a small host, NVN graphics are rebuilt on Metal, and shaders are translated to Metal. (README "What it is".)
- Supported game: Xenoblade Chronicles X: Definitive Edition, update **1.0.1 or 2.0.0**.
- **Mac:** tested on an M1 MacBook Air; runs at the game's own 30 fps.
- **iPhone:** the user runs it on an **iPhone 15 Pro Max at a smooth 30 fps, tested in the first area only**; nothing
  past it has been tested on iPhone. The page must say exactly that, and the iPhone/iPad build stays labeled
  experimental. The iPhone guide keeps the README's "play the Mac app first so its shaders are carried into the IPA"
  step. (Claude's call: the README's iOS section is updated in the same work to match: it runs on an iPhone 15 Pro
  Max in the first area; the rest is unchanged.)
- **Early testing:** reaches the title screen, character creation and gameplay in Primordia, first battle played,
  saves and Continue work, controller and keyboard work. Not yet checked: New Los Angeles, Skells, cutscenes, day-time
  lighting, water, most menus. Expect bugs.
- **Legal:** you must own the game; keys come from your own Switch; nothing is distributed; never share the built
  app or work folder; not affiliated with Nintendo or Monolith Soft; trademarks belong to Nintendo. (README "Legal".)
- **Credits:** MacNativeGames (ly05010419), d2r-mobile, Ryujinx, SPIRV-Cross, libopus, libvpx. MIT license.

## Page structure (layout "A", chosen by the user)

One long page, showcase first, guide below. A sticky top nav has anchors for Guide, Media and Status, a GitHub link
and a Ko-fi button.

1. **Hero.** A darkened full-width real screenshot (`xcx-stage4-battle.png`) behind it. An amber "Early testing:
   expect bugs" badge. Title: "Xenoblade Chronicles X, native on Apple silicon". Subtitle: your own copy, on your Mac
   and iPhone, no emulator. Buttons: **Start the guide** (anchor) and **Support on Ko-fi**. Small line: "Mac · iPhone ·
   30 fps · v1.0.1 / v2.0.0".
2. **Performance videos.** Two lite YouTube embeds side by side (stacked on mobile): "M1 MacBook Air" and
   "iPhone 15 Pro Max", each with a "30 fps" chip.
3. **Screenshot gallery.** A grid of a curated subset of `docs/screenshots/` (title, app launcher/continue, field
   gameplay, battle, character creation). Click to open a lightbox. Skip the before/after debugging captures.
4. **Bring your own game.** A highlighted card covering what you need (your own XCI or NSP, your `prod.keys`, the
   update 1.0.1 or 2.0.0) and the rules: we don't help obtain keys or files; never share the built app or work
   folder.
5. **Step-by-step guide** with **Mac** and **iPhone / iPad** tabs. Numbered steps, each with a short explanation, a
   copyable command block where there is one, and an optional screenshot slot.
   - *Mac:* (1) requirements: Apple silicon, macOS 26+, Xcode or its command line tools, ~16 GB free; (2)
     `brew install opus libvpx python@3.14`; (3) get the code with `git clone`; (4) **builder window**
     `python3 build_app.py --gui`: choose the game file, prod.keys, optional 2.0.0 update, then Build App; (5)
     alternatively, the one command `python3 build_app.py "<game>.xci" -k prod.keys [--update <2.0.0>.nsp]`; (6) play:
     the settings window, Play, first-start notes (RomFS check ~10 s, shader stutter early on); (7) controls table
     (keyboard plus controller).
   - *iPhone / iPad (experimental):* (1) requirements: everything from Mac, plus Xcode 26 with the iOS SDK,
     `brew install xcodegen cmake`, and an iPhone 14 or newer / A15+ iPad on iOS 26; (2) play the Mac app first so
     shaders get translated and carried into the IPA; (3) build the IPA from the window (pick "iPhone and iPad") or
     with `--platform ios`; (4) install from the window's "Install on my iPhone or iPad" section (cable, Trust, Apple
     ID / Personal Team; a free Apple ID re-signs every 7 days); (5) trust the developer under Settings › General ›
     VPN & Device Management and launch.
   - A footer line links to the full README for every option and troubleshooting.
6. **Status and known issues.** The stage table (0–5 with done / in progress) and an accordion of known issues and
   not-yet-checked areas, plus "Found a bug? Open an issue" linking to GitHub Issues.
7. **Support.** A short note ("This is a hobby project; tips help me keep testing") and a Ko-fi button.
8. **Footer.** Credits with links, MIT license, the trademark and no-affiliation disclaimer, and a GitHub link.

## Builder's calls (decided in brainstorming by Claude, not by the user)

- **Visual style:** a dark sci-fi look suited to the game: near-black navy background, cyan/teal accent, amber only for
  the early-testing warning. Headings in a geometric sans (e.g. "Space Grotesk"), body in Inter, both self-hosted
  through `@fontsource`. The user has not seen this style yet; show it before polishing.
- **Location:** `site/` at the repo root, a standalone Vite + React + TypeScript project with its own `package.json`.
  It doesn't touch `games/` or `build_app.py`.
- **Deploy:** `.github/workflows/pages.yml` builds `site/` on pushes to `main` that touch `site/**`, and deploys with
  `actions/deploy-pages`. Pages must be set to "GitHub Actions" in the repo settings, which the user does.
- **Content in data files:** steps, known issues, video IDs and the gallery list live in `site/src/content/*.ts` so
  updates don't touch components.
- **Screenshots (the user's decision):** a few curated screenshots are committed under `site/public/screenshots/`
  (copied, not symlinked, and converted to WebP). `docs/screenshots/` stays ignored. The README "Legal" section gets a
  short exception: the landing page in `site/` includes a few of the author's own screenshots to show the port, and
  still contains no game program, keys or game files.
- Single page, no router. Copy buttons on command blocks. Respect `prefers-reduced-motion`.

## Left to the builder

Exact copy wording within the facts above, spacing and typography details, the gallery subset, component breakdown,
and the WebP tooling.
