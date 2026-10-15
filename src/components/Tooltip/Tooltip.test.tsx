import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('appears on keyboard focus and describes its trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Saved to your favorites">
        <Button>Save</Button>
      </Tooltip>,
    );

    await user.tab();

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Saved to your favorites');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAccessibleDescription(
      'Saved to your favorites',
    );
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hint">
        <Button>Help</Button>
      </Tooltip>,
    );

    await user.tab();
    await screen.findByRole('tooltip');
    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('can be controlled', () => {
    render(
      <Tooltip content="Always visible" open>
        <Button>Info</Button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Always visible');
  });
});
