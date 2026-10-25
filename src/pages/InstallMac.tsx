import { CONTROLS, MAC_GUIDE } from '@/content/mac'
import { GuideLayout } from './GuideLayout'

function ControlsTable() {
  return (
    <div className="overflow-x-auto border border-border border-l-2 border-l-accent-cyan bg-surface">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Keyboard controls</caption>
        <thead className="border-b border-border font-label text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Key</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Switch control</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {CONTROLS.map((c) => (
            <tr key={c.key}>
              <th scope="row" className="px-4 py-2.5 font-mono text-xs font-medium whitespace-nowrap text-accent-cyan">
                {c.key}
              </th>
              <td className="px-4 py-2.5 text-foreground/90">{c.switch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InstallMacPage() {
  return <GuideLayout page="mac" guide={MAC_GUIDE} extras={{ controls: <ControlsTable /> }} />
}
