#!/bin/sh
# Converts the curated screenshots to WebP in public/screenshots.
# Usage: scripts/screenshots.sh [source-dir]
# The source PNGs live in the tool's local, git-ignored docs/screenshots folder.
set -e
cd "$(dirname "$0")/.."
SRC="${1:-../xcnative/docs/screenshots}"
mkdir -p public/screenshots
for name in \
  xcx-stage4-battle \
  xcx-stage5-app-title \
  xcx-stage5-app-continue \
  xcx-stage4-avatar-gameplay-after
do
  out="$name"
  [ "$name" = xcx-stage4-avatar-gameplay-after ] && out=xcx-field-gameplay
  cwebp -q 80 -resize 1920 0 "$SRC/$name.png" -o "public/screenshots/$out.webp"
done
