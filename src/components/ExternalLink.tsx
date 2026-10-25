import type { ComponentProps } from 'react'
import { Coffee } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { KOFI_URL } from '@/content/site'
import { cn } from '@/lib/utils'

/** Plain external link: always opens in a new tab with noopener. */
export function ExternalLink(props: ComponentProps<'a'>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

type KofiProps = {
  label?: string
  className?: string
  /** Extra classes for the visible label, e.g. to hide it on small screens (it stays in the accessible name). */
  labelClassName?: string
  size?: 'default' | 'sm' | 'lg'
  variant?: 'filled' | 'outline'
}

/** The one Ko-fi button: a plain link, no widget script. Outline everywhere except the Support section. */
export function KofiButton({
  label = 'Support on Ko-fi',
  className,
  labelClassName,
  size = 'default',
  variant = 'filled',
}: KofiProps) {
  return (
    <ExternalLink
      href={KOFI_URL}
      className={cn(buttonVariants({ size, variant: variant === 'outline' ? 'outline' : 'default' }), className)}
    >
      <Coffee aria-hidden="true" />
      <span className={labelClassName}>{label}</span>
    </ExternalLink>
  )
}
