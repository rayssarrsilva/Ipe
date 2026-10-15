import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Input } from './Input';

describe('Input', () => {
  it('is labelled by its visible label', () => {
    render(<Input label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('accepts typing', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    const input = screen.getByRole('textbox', { name: 'Name' });

    await user.type(input, 'Rayssa');

    expect(input).toHaveValue('Rayssa');
  });

  it('links the hint with aria-describedby', () => {
    render(<Input label="Email" hint="We never share it." />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('We never share it.');
  });

  it('marks itself invalid and describes the error', () => {
    render(<Input label="Email" hint="Use your work email." error="Enter a valid email." />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInvalid();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use your work email. Enter a valid email.');
  });

  it('keeps a custom aria-describedby', () => {
    render(
      <>
        <p id="extra">Extra context</p>
        <Input label="Code" hint="Six digits" aria-describedby="extra" />
      </>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Extra context Six digits');
  });

  it('marks required fields natively and hides the asterisk from screen readers', () => {
    render(<Input label="City" required />);
    expect(screen.getByRole('textbox', { name: 'City' })).toBeRequired();
  });

  it('keeps an accessible name when the label is visually hidden', () => {
    render(<Input label="Search" hideLabel />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses a provided id', () => {
    render(<Input label="Phone" id="phone" />);
    expect(screen.getByLabelText('Phone')).toHaveAttribute('id', 'phone');
  });

  it('applies the size class and forwards its ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} label="Large" size="lg" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveClass('lg');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Input label="Email" hint="We never share it." required />
        <Input label="Password" type="password" error="Too short." />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
