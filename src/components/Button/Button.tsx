import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight of the action. `primary` is the single main action on a screen. */
  variant?: ButtonVariant;
  /** Height and padding. `md` meets the 44px touch-target guideline. */
  size?: ButtonSize;
  /** Stretches the button to fill its container. */
  fullWidth?: boolean;
  /** Shows a spinner, sets `aria-busy` and blocks interaction. */
  loading?: boolean;
  /** Renders the child element (e.g. a link) with button styles instead of a `<button>`. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    asChild = false,
    disabled,
    className,
    children,
    type,
    ...rest
  },
  ref,
) {
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  );

  if (asChild) {
    return (
      <Slot
        ref={ref}
        className={classes}
        aria-disabled={disabled || loading || undefined}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </button>
  );
});
