import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import overlay from '../internal/overlay.module.css';
import styles from './DropdownMenu.module.css';

/** A list of actions revealed by a button. Arrow keys, Home, End and typeahead work out of the box. */
export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;

export const DropdownMenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 8, align = 'start', ...rest }, ref) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={clsx(overlay.surface, overlay.animated, styles.content, className)}
        {...rest}
      />
    </MenuPrimitive.Portal>
  );
});

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** Marks a destructive action, such as delete. */
  tone?: 'default' | 'danger';
}

export const DropdownMenuItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, tone = 'default', ...rest }, ref) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      className={clsx(styles.item, tone === 'danger' && styles.danger, className)}
      {...rest}
    />
  );
});

export const DropdownMenuLabel = forwardRef<
  ComponentRef<typeof MenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...rest }, ref) {
  return <MenuPrimitive.Label ref={ref} className={clsx(styles.label, className)} {...rest} />;
});

export const DropdownMenuSeparator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <MenuPrimitive.Separator ref={ref} className={clsx(styles.separator, className)} {...rest} />
  );
});
