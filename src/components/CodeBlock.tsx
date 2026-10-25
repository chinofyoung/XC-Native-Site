import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'copied' | 'failed'

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    let next: Status = 'copied'
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      next = 'failed'
    }
    setStatus(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <div className="relative border border-border border-l-2 border-l-accent-cyan bg-[#050c0e]">
      <pre tabIndex={0} aria-label={label ?? 'Command'} className="p-4 pr-28 font-mono text-sm whitespace-pre-wrap text-ice [overflow-wrap:anywhere]">
        <code>{code}</code>
      </pre>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <span role="status" className="text-[11px] tracking-[0.12em] text-accent-cyan uppercase">
          {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : ''}
        </span>
        <Button type="button" variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy command">
          {status === 'copied' ? <Check className="text-accent-cyan" /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}
