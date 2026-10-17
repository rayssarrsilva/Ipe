import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('is labelled and accepts typing', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole('textbox', { name: 'Message' });

    await user.type(textarea, 'Olá');

    expect(textarea).toHaveValue('Olá');
  });

  it('counts characters when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" maxLength={20} showCount defaultValue="Hi" />);
    expect(screen.getByText('2/20')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox'), ' there');

    expect(screen.getByText('8/20')).toBeInTheDocument();
  });

  it('counts characters when controlled', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('');
      return (
        <Textarea
          label="Note"
          maxLength={5}
          showCount
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }
    render(<Controlled />);

    await user.type(screen.getByRole('textbox'), 'abcdefg');

    expect(screen.getByRole('textbox')).toHaveValue('abcde');
    expect(screen.getByText('5/5')).toHaveClass('counterFull');
  });

  it('describes the hint, the error and the counter', () => {
    render(
      <Textarea label="Bio" hint="Keep it short." error="Too long." maxLength={10} showCount />,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInvalid();
    expect(textarea).toHaveAccessibleDescription('Keep it short. Too long. 0 of 10 characters');
  });

  it('announces the counter with context and lets you translate it', async () => {
    const user = userEvent.setup();
    render(
      <Textarea
        label="Sua história"
        maxLength={280}
        showCount
        formatCount={(length, max) => `${length} de ${max} caracteres`}
      />,
    );
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Cerâmica');

    // Regression for QA bug: screen readers used to hear only "8/280".
    expect(textarea).toHaveAccessibleDescription('8 de 280 caracteres');
    expect(screen.getByText('8/280')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not show a counter without maxLength', () => {
    render(<Textarea label="Notes" showCount />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <Textarea label="Message" hint="Max 280 characters." maxLength={280} showCount required />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
