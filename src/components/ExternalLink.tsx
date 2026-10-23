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
  size?: 'default' | 'lg'
  variant?: 'filled' | 'outline'
}

/** The one Ko-fi button: a plain link, no widget script. */
export function KofiButton({ label = 'Support on Ko-fi', className, size = 'default', variant = 'filled' }: KofiProps) {
  return (
    <ExternalLink
      href={KOFI_URL}
      className={cn(
        buttonVariants({ size, variant: variant === 'outline' ? 'outline' : 'default' }),
        variant === 'filled' && 'bg-accent-cyan font-semibold text-background hover:bg-accent-cyan/85',
        size === 'lg' && 'h-11 px-5 text-base',
        className,
      )}
    >
      <Coffee aria-hidden="true" />
      {label}
    </ExternalLink>
  )
}
