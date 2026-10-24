import { Fragment } from 'react'

/** Renders `code` and **bold** spans in a copy string. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('`') ? (
          <code key={i} className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere]">
            {p.slice(1, -1)}
          </code>
        ) : p.startsWith('**') ? (
          <strong key={i} className="font-semibold text-foreground">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}
