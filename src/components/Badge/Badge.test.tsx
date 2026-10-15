import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its text with the neutral tone by default', () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText('Draft')).toHaveClass('badge', 'neutral');
  });

  it.each(['accent', 'success', 'danger', 'info'] as const)('applies the %s tone', (tone) => {
    render(<Badge tone={tone}>{tone}</Badge>);
    expect(screen.getByText(tone)).toHaveClass(tone);
  });

  it('hides the decorative dot from assistive technology', () => {
    const { container } = render(
      <Badge tone="success" dot>
        Live
      </Badge>,
    );
    expect(container.querySelector('.dot')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Live')).toHaveTextContent(/^Live$/);
  });

  it('forwards its ref and custom attributes', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge ref={ref} className="custom" title="Status">
        New
      </Badge>,
    );
    expect(ref.current).toHaveClass('custom');
    expect(ref.current).toHaveAttribute('title', 'Status');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <div>
        <Badge>Neutral</Badge>
        <Badge tone="accent">New</Badge>
        <Badge tone="danger" dot>
          Out of stock
        </Badge>
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
