import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import overlay from '../internal/overlay.module.css';
import styles from './Tooltip.module.css';

export interface TooltipProps extends Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'content' | 'children'
> {
  /** Short, non-essential text shown on hover and keyboard focus. */
  content: ReactNode;
  /** A single focusable element, such as a Button. */
  children: ReactElement;
  /** Milliseconds before the tooltip opens on hover. */
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A short hint for a focusable element. Never put essential information or
 * interactive content in a tooltip: touch users may never see it.
 */
export function Tooltip({
  content,
  children,
  delayDuration = 300,
  open,
  defaultOpen,
  onOpenChange,
  side = 'top',
  sideOffset = 8,
  className,
  ...rest
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className={clsx(overlay.animated, styles.content, className)}
            {...rest}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.arrow} width={12} height={6} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
