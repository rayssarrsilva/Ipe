import { clsx } from 'clsx';
import { useId, type ReactNode } from 'react';
import styles from './field.module.css';

export interface FieldBaseProps {
  /** Visible label. Always required so every control has an accessible name. */
  label: ReactNode;
  /** Supporting text shown below the control and linked with `aria-describedby`. */
  hint?: ReactNode;
  /** Error message. Marks the control as invalid and is announced with it. */
  error?: ReactNode;
}

interface UseFieldOptions {
  id?: string;
  hint?: ReactNode;
  error?: ReactNode;
  describedBy?: string;
  extraDescribedBy?: string;
}

export function useField({ id, hint, error, describedBy, extraDescribedBy }: UseFieldOptions) {
  const autoId = useId();
  const controlId = id ?? `ipe${autoId.replace(/:/g, '')}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const ariaDescribedBy =
    [describedBy, hintId, errorId, extraDescribedBy].filter(Boolean).join(' ') || undefined;

  return { controlId, hintId, errorId, ariaDescribedBy, invalid: Boolean(error) };
}

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  visuallyHidden?: boolean;
  className?: string;
}

export function FieldLabel({
  htmlFor,
  children,
  required,
  visuallyHidden,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(styles.label, visuallyHidden && styles.visuallyHidden, className)}
    >
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          {' *'}
        </span>
      )}
    </label>
  );
}

interface FieldMessagesProps {
  hint?: ReactNode;
  hintId?: string;
  error?: ReactNode;
  errorId?: string;
}

export function FieldMessages({ hint, hintId, error, errorId }: FieldMessagesProps) {
  if (!hint && !error) return null;
  return (
    <>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.25" r="0.9" fill="currentColor" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </>
  );
}
