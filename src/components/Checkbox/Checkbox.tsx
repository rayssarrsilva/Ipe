import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import choice from '../internal/choice.module.css';
import { FieldLabel, FieldMessages, useField, type FieldBaseProps } from '../internal/field';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends
    Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>,
    FieldBaseProps {}

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  function Checkbox(
    {
      label,
      hint,
      error,
      id,
      required,
      disabled,
      className,
      'aria-describedby': describedBy,
      ...rest
    },
    ref,
  ) {
    const field = useField({ id, hint, error, describedBy });

    return (
      <div className={clsx(choice.row, disabled && choice.disabled, className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={field.controlId}
          required={required}
          disabled={disabled}
          aria-invalid={field.invalid || undefined}
          aria-describedby={field.ariaDescribedBy}
          className={clsx(choice.control, styles.box)}
          {...rest}
        >
          <CheckboxPrimitive.Indicator className={styles.indicator}>
            <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M3.5 8.5l3 3 6-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg className={styles.dash} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div className={choice.text}>
          <FieldLabel htmlFor={field.controlId} required={required} className={choice.label}>
            {label}
          </FieldLabel>
          <FieldMessages hint={hint} hintId={field.hintId} error={error} errorId={field.errorId} />
        </div>
      </div>
    );
  },
);
