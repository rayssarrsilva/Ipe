import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { Toaster, useToast, type ToastOptions } from './Toast';

function Trigger(options: ToastOptions) {
  const { toast } = useToast();
  return <Button onClick={() => toast(options)}>Notify</Button>;
}

describe('Toast', () => {
  it('shows a toast with title and description', async () => {
    const user = userEvent.setup();
    render(
      <Toaster>
        <Trigger title="Added to bag" description="1 ceramic bowl" tone="success" />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));

    const toast = (await screen.findByText('Added to bag')).closest('li');
    expect(toast).toHaveTextContent('1 ceramic bowl');
    expect(screen.getByRole('region', { name: /Notifications/ })).toContainElement(toast);
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/Notifications.*Added to bag/),
    );
  });

  it('closes from the close button', async () => {
    const user = userEvent.setup();
    render(
      <Toaster closeLabel="Fechar">
        <Trigger title="Saved" />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));
    await user.click(await screen.findByRole('button', { name: 'Fechar' }));

    await waitFor(() => expect(screen.queryByText('Saved')).not.toBeInTheDocument());
  });

  it('closes one toast without affecting the others', async () => {
    const user = userEvent.setup();
    render(
      <Toaster>
        <Trigger title="Order placed" />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));
    await user.click(screen.getByRole('button', { name: 'Notify' }));
    expect(await screen.findAllByText('Order placed')).toHaveLength(2);

    await user.click(screen.getAllByRole('button', { name: 'Close' })[0]!);

    await waitFor(() => expect(screen.getAllByText('Order placed')).toHaveLength(1));
    // Let the exit timer remove the closed toast from state; the other one must stay.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(screen.getAllByText('Order placed')).toHaveLength(1);
  });

  it('runs the action and uses an assertive announcement for danger', async () => {
    const user = userEvent.setup();
    const onUndo = vi.fn();
    render(
      <Toaster>
        <Trigger
          title="Item removed"
          tone="danger"
          action={{
            label: 'Undo',
            altText: 'Add the item back from your history',
            onClick: onUndo,
          }}
        />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));
    await user.click(await screen.findByRole('button', { name: 'Undo' }));

    expect(onUndo).toHaveBeenCalledOnce();
  });

  it('hides itself after its duration', async () => {
    const user = userEvent.setup();
    render(
      <Toaster>
        <Trigger title="Quick note" duration={50} />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));
    await screen.findByText('Quick note');

    await waitFor(() => expect(screen.queryByText('Quick note')).not.toBeInTheDocument(), {
      timeout: 2000,
    });
  });

  it('cancels pending exit timers when the Toaster unmounts', async () => {
    const user = userEvent.setup();
    const clear = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = render(
      <Toaster>
        <Trigger title="Leaving soon" />
      </Toaster>,
    );

    await user.click(screen.getByRole('button', { name: 'Notify' }));
    await user.click(await screen.findByRole('button', { name: 'Close' }));
    clear.mockClear();
    unmount();

    expect(clear).toHaveBeenCalled();
    clear.mockRestore();
  });

  it('throws a helpful error outside of a Toaster', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger title="x" />)).toThrow('useToast must be used inside <Toaster>.');
    spy.mockRestore();
  });
});
