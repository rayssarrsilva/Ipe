import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { CloseIcon } from '../internal/icons';
import overlay from '../internal/overlay.module.css';
import styles from './Dialog.module.css';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogContentProps extends Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  'title'
> {
  /** Heading announced when the dialog opens. Required for an accessible name. */
  title: ReactNode;
  /** Optional supporting text, linked as the dialog description. */
  description?: ReactNode;
  /** Accessible label for the close button. Translate it with the rest of your UI. */
  closeLabel?: string;
  /** Hides the close button for dialogs that must be answered with an action. */
  hideClose?: boolean;
  /** Maximum width: `sm` 400px, `md` 520px, `lg` 680px. */
  size?: DialogSize;
}

/** A modal window. Focus is trapped inside, Escape closes it and focus returns to the trigger. */
export const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    title,
    description,
    closeLabel = 'Close',
    hideClose = false,
    size = 'md',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={clsx(styles.overlay, overlay.fade)} />
      <DialogPrimitive.Content
        ref={ref}
        className={clsx(overlay.surface, overlay.animated, styles.content, styles[size], className)}
        {...(description ? {} : { 'aria-describedby': undefined })}
        {...rest}
      >
        <div className={styles.header}>
          <div className={styles.titles}>
            <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className={styles.description}>
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          {!hideClose && (
            <DialogPrimitive.Close className={overlay.closeButton} aria-label={closeLabel}>
              <CloseIcon />
            </DialogPrimitive.Close>
          )}
        </div>
        {children && <div className={styles.body}>{children}</div>}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

/** Right-aligned row for the dialog actions. */
export function DialogFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.footer, className)} {...rest} />;
}
