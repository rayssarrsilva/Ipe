import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('exposes the switch role and toggles on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Dark mode" onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });

    expect(toggle).toHaveAttribute('aria-checked', 'false');
    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with Space and Enter', async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    const toggle = screen.getByRole('switch');

    await user.tab();
    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<Switch label="Sounds" />);

    await user.click(screen.getByText('Sounds'));

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('describes the hint and respects disabled', () => {
    render(<Switch label="Beta" hint="May be unstable." disabled />);
    const toggle = screen.getByRole('switch', { name: 'Beta' });
    expect(toggle).toHaveAccessibleDescription('May be unstable.');
    expect(toggle).toBeDisabled();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Switch label="Off" />
        <Switch label="On" defaultChecked hint="Saved automatically." />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
