# XC Native site

The landing page for the Xenoblade Chronicles X native Mac port, a Vite + React site:
<https://chinofyoung.github.io/XC-Native-Site/>

The tool it documents lives at <https://github.com/chinofyoung/XC-Native>.

## Commands

Run these from the repo root:

```sh
npm install
npm run dev
npm test
npm run build
```

## Editing

- Page copy lives in `src/content/*.ts`.
- YouTube video IDs go in `VIDEOS` in `src/content/site.ts`.
- Screenshots are regenerated with `scripts/screenshots.sh [source-dir]`. The source directory defaults to `../xcnative/docs/screenshots`.

## Deploying

The site deploys with GitHub Actions (`.github/workflows/pages.yml`) on every push to `main`, and can be run manually.
One-time setting: Settings › Pages › Source: GitHub Actions.

The screenshots in public/screenshots are the author's own captures of the port running; this repo holds no game program, keys or game files.
