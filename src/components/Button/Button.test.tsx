import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Button } from './Button';

describe('Button', () => {
  it('renders an accessible button with type="button" by default', () => {
    render(<Button>Plant a seed</Button>);
    const button = screen.getByRole('button', { name: 'Plant a seed' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies primary and md by default', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'primary', 'md');
  });

  it.each([
    ['secondary', 'sm'],
    ['ghost', 'lg'],
  ] as const)('applies the %s variant and %s size', (variant, size) => {
    render(
      <Button variant={variant} size={size}>
        Styled
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass(variant, size);
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is reachable with Tab and activates with Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('marks itself busy and blocks clicks while loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Sending
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Sending' });

    await user.click(button);

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the child element when asChild is set', () => {
    render(
      <Button asChild variant="secondary">
        <a href="/docs">Read the docs</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Read the docs' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveClass('button', 'secondary');
  });

  it('marks an asChild link as aria-disabled when disabled', () => {
    render(
      <Button asChild disabled>
        <a href="/docs">Read the docs</a>
      </Button>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('stretches when fullWidth is set and merges custom classes', () => {
    render(
      <Button fullWidth className="custom">
        Wide
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass('fullWidth', 'custom');
  });

  it('forwards its ref to the underlying button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost" loading>
          Loading
        </Button>
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
