import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color role. The text itself must carry the meaning; color only reinforces it. */
  tone?: BadgeTone;
  /** Shows a small leading dot in the tone color. */
  dot?: boolean;
}

/** A short, non-interactive status label. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', dot = false, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={clsx(styles.badge, styles[tone], className)} {...rest}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
});
