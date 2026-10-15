import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Button } from '../Button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './Dialog';

function Example(props: { description?: string; hideClose?: boolean; closeLabel?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent title="Remove item?" {...props}>
        <p>This cannot be undone.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('opens a labelled modal dialog and moves focus inside', async () => {
    const user = userEvent.setup();
    render(<Example description="The item leaves your bag." />);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = screen.getByRole('dialog', { name: 'Remove item?' });
    expect(dialog).toHaveAccessibleDescription('The item leaves your bag.');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Open' });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('keeps Tab focus trapped inside', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');

    for (let i = 0; i < 5; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('closes from the close button using a translatable label', async () => {
    const user = userEvent.setup();
    render(<Example closeLabel="Fechar" />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.click(screen.getByRole('button', { name: 'Fechar' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('can hide the close button', async () => {
    const user = userEvent.setup();
    render(<Example hideClose />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations when open', async () => {
    const user = userEvent.setup();
    render(<Example description="The item leaves your bag." />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
