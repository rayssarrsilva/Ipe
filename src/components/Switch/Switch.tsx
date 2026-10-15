import * as SwitchPrimitive from '@radix-ui/react-switch';
import { clsx } from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import choice from '../internal/choice.module.css';
import { FieldLabel, FieldMessages, useField } from '../internal/field';
import type { FieldBaseProps } from '../internal/field';
import styles from './Switch.module.css';

export interface SwitchProps
  extends
    Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'children'>,
    Omit<FieldBaseProps, 'error'> {}

/** An on/off setting that takes effect immediately. For choices submitted with a form, use Checkbox. */
export const Switch = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  function Switch(
    { label, hint, id, disabled, className, 'aria-describedby': describedBy, ...rest },
    ref,
  ) {
    const field = useField({ id, hint, describedBy });

    return (
      <div className={clsx(choice.row, disabled && choice.disabled, className)}>
        <SwitchPrimitive.Root
          ref={ref}
          id={field.controlId}
          disabled={disabled}
          aria-describedby={field.ariaDescribedBy}
          className={clsx(choice.control, styles.track)}
          {...rest}
        >
          <SwitchPrimitive.Thumb className={styles.thumb} />
        </SwitchPrimitive.Root>
        <div className={choice.text}>
          <FieldLabel htmlFor={field.controlId} className={choice.label}>
            {label}
          </FieldLabel>
          <FieldMessages hint={hint} hintId={field.hintId} />
        </div>
      </div>
    );
  },
);
