import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axeViolations } from '../../test/axe';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

function Example() {
  return (
    <Tabs defaultValue="story">
      <TabsList aria-label="Product details">
        <TabsTrigger value="story">Story</TabsTrigger>
        <TabsTrigger value="care">Care</TabsTrigger>
        <TabsTrigger value="shipping" disabled>
          Shipping
        </TabsTrigger>
      </TabsList>
      <TabsContent value="story">Made by hand in Minas Gerais.</TabsContent>
      <TabsContent value="care">Hand wash only.</TabsContent>
      <TabsContent value="shipping">Ships in 3 days.</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows the default panel labelled by its tab', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Product details' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Story' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Story' })).toHaveTextContent('Made by hand');
  });

  it('switches panels on click', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('tab', { name: 'Care' }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Hand wash only.');
  });

  it('moves between tabs with the arrow keys and skips disabled ones', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole('tab', { name: 'Story' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Care' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Story' })).toHaveFocus();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Example />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
