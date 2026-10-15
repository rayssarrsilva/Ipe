import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('is labelled and toggles when the label is clicked', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    await user.click(screen.getByText('Accept terms'));

    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Newsletter" />);

    await user.tab();
    await user.keyboard(' ');

    expect(screen.getByRole('checkbox', { name: 'Newsletter' })).toBeChecked();
  });

  it('exposes the indeterminate state as mixed', () => {
    render(<Checkbox label="Select all" checked="indeterminate" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Locked" disabled />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeDisabled();
  });

  it('describes the hint and the error and marks itself invalid', () => {
    render(<Checkbox label="Terms" hint="Required to continue." error="Please accept." required />);
    const checkbox = screen.getByRole('checkbox', { name: 'Terms' });
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('Required to continue. Please accept.');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Mixed" checked="indeterminate" hint="Some items selected." />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
