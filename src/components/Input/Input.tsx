import { clsx } from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';
import control from '../internal/control.module.css';
import { FieldLabel, FieldMessages, useField, type FieldBaseProps } from '../internal/field';
import styles from './Input.module.css';

export type InputSize = 'md' | 'lg';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, FieldBaseProps {
  /** Hides the label visually while keeping it for screen readers. Use sparingly. */
  hideLabel?: boolean;
  /** Control height. `md` is 44px, `lg` is 52px. */
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    hideLabel = false,
    size = 'md',
    id,
    required,
    className,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const field = useField({ id, hint, error, describedBy });

  return (
    <div className={clsx(styles.field, className)}>
      <FieldLabel htmlFor={field.controlId} required={required} visuallyHidden={hideLabel}>
        {label}
      </FieldLabel>
      <input
        ref={ref}
        id={field.controlId}
        required={required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.ariaDescribedBy}
        className={clsx(control.control, styles.input, styles[size])}
        {...rest}
      />
      <FieldMessages hint={hint} hintId={field.hintId} error={error} errorId={field.errorId} />
    </div>
  );
});
