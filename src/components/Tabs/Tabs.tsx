import * as TabsPrimitive from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import styles from './Tabs.module.css';

/** Groups related content into panels shown one at a time. Arrow keys move between tabs. */
export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...rest }, ref) {
  return <TabsPrimitive.List ref={ref} className={clsx(styles.list, className)} {...rest} />;
});

export const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...rest }, ref) {
  return <TabsPrimitive.Trigger ref={ref} className={clsx(styles.trigger, className)} {...rest} />;
});

export const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...rest }, ref) {
  return <TabsPrimitive.Content ref={ref} className={clsx(styles.content, className)} {...rest} />;
});
