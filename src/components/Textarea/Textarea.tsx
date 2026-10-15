import { clsx } from 'clsx';
import { forwardRef, useState, type TextareaHTMLAttributes } from 'react';
import control from '../internal/control.module.css';
import { FieldLabel, FieldMessages, useField, type FieldBaseProps } from '../internal/field';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBaseProps {
  /** Hides the label visually while keeping it for screen readers. Use sparingly. */
  hideLabel?: boolean;
  /** Shows a live character counter. Requires `maxLength`. */
  showCount?: boolean;
}

const lengthOf = (value: unknown) =>
  value === undefined || value === null ? 0 : String(value).length;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    error,
    hideLabel = false,
    showCount = false,
    id,
    required,
    className,
    rows = 4,
    maxLength,
    value,
    defaultValue,
    onChange,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const [uncontrolledLength, setUncontrolledLength] = useState(() => lengthOf(defaultValue));
  const counted = showCount && maxLength !== undefined;
  const length = value !== undefined ? lengthOf(value) : uncontrolledLength;

  const field = useField({ id, hint, error, describedBy });
  const counterId = counted ? `${field.controlId}-count` : undefined;
  const ariaDescribedBy = [field.ariaDescribedBy, counterId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={clsx(styles.field, className)}>
      <FieldLabel htmlFor={field.controlId} required={required} visuallyHidden={hideLabel}>
        {label}
      </FieldLabel>
      <textarea
        ref={ref}
        id={field.controlId}
        rows={rows}
        required={required}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setUncontrolledLength(event.target.value.length);
          onChange?.(event);
        }}
        aria-invalid={field.invalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={clsx(control.control, styles.textarea)}
        {...rest}
      />
      {(hint || error || counted) && (
        <div className={styles.footer}>
          <div className={styles.messages}>
            <FieldMessages
              hint={hint}
              hintId={field.hintId}
              error={error}
              errorId={field.errorId}
            />
          </div>
          {counted && (
            <span
              id={counterId}
              className={clsx(styles.counter, length >= maxLength && styles.counterFull)}
            >
              {length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
});
