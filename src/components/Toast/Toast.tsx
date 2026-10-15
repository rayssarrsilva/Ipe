import * as ToastPrimitive from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Button } from '../Button';
import { CloseIcon } from '../internal/icons';
import overlay from '../internal/overlay.module.css';
import styles from './Toast.module.css';

export type ToastTone = 'neutral' | 'success' | 'danger';

export interface ToastAction {
  label: string;
  /** Describes how to perform the action without the toast, for screen reader users. */
  altText: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Milliseconds before the toast hides. Defaults to the Toaster duration. */
  duration?: number;
  action?: ToastAction;
}

interface ToastItem extends ToastOptions {
  id: number;
  open: boolean;
}

type ToastFn = (options: ToastOptions) => void;

const ToastContext = createContext<ToastFn | null>(null);

/** Returns `toast()`, which shows a brief, non-blocking message. Must be used inside `<Toaster>`. */
export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error('useToast must be used inside <Toaster>.');
  return { toast };
}

export interface ToasterProps {
  children: ReactNode;
  /** Accessible label for each close button. */
  closeLabel?: string;
  /** Name of the notifications region, announced with the F8 hotkey. */
  label?: string;
  /** Default time in milliseconds before toasts hide. */
  duration?: number;
}

const EXIT_MS = 200;

/** Provides `useToast()` to its children and renders the notifications region. */
export function Toaster({
  children,
  closeLabel = 'Close',
  label = 'Notifications',
  duration = 5000,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const exitTimers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timers = exitTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const toast = useCallback<ToastFn>((options) => {
    nextId.current += 1;
    const id = nextId.current;
    setToasts((current) => [...current, { ...options, id, open: true }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.map((t) => (t.id === id ? { ...t, open: false } : t)));
    const timer = setTimeout(() => {
      exitTimers.current.delete(timer);
      setToasts((current) => current.filter((t) => t.id !== id));
    }, EXIT_MS);
    exitTimers.current.add(timer);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      <ToastPrimitive.Provider label={label} duration={duration} swipeDirection="right">
        {children}
        {toasts.map(({ id, open, title, description, tone = 'neutral', duration: own, action }) => (
          <ToastPrimitive.Root
            key={id}
            open={open}
            duration={own}
            type={tone === 'danger' ? 'foreground' : 'background'}
            onOpenChange={(isOpen) => {
              if (!isOpen) dismiss(id);
            }}
            className={clsx(overlay.surface, overlay.animated, styles.toast, styles[tone])}
          >
            <div className={styles.text}>
              <ToastPrimitive.Title className={styles.title}>{title}</ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className={styles.description}>
                  {description}
                </ToastPrimitive.Description>
              )}
            </div>
            {action && (
              <ToastPrimitive.Action altText={action.altText} asChild>
                <Button size="sm" variant="ghost" onClick={action.onClick}>
                  {action.label}
                </Button>
              </ToastPrimitive.Action>
            )}
            <ToastPrimitive.Close className={overlay.closeButton} aria-label={closeLabel}>
              <CloseIcon />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className={styles.viewport} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
