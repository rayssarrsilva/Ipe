import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Button } from './Button';

const copy = {
  en: {
    primary: 'Plant a seed',
    secondary: 'Water the garden',
    ghost: 'Maybe later',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    loading: 'Sending',
    disabled: 'Unavailable',
    link: 'Read the docs',
  },
  pt: {
    primary: 'Plantar uma semente',
    secondary: 'Regar o jardim',
    ghost: 'Talvez depois',
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
    loading: 'Enviando',
    disabled: 'Indisponível',
    link: 'Ler a documentação',
  },
};

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    asChild: { control: false },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      i18n: {
        en: 'Triggers an action. Use **one primary button per view** for the main action, `secondary` for supporting actions and `ghost` for low-emphasis ones.',
        pt: 'Dispara uma ação. Use **um botão primário por tela** para a ação principal, `secondary` para ações de apoio e `ghost` para as de baixa ênfase.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => (
    <Button {...args}>{args.children ?? pick(copy, globals.locale).primary}</Button>
  ),
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Variants: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button {...args} variant="primary">
          {t.primary}
        </Button>
        <Button {...args} variant="secondary">
          {t.secondary}
        </Button>
        <Button {...args} variant="ghost">
          {t.ghost}
        </Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button {...args} size="sm">
          {t.small}
        </Button>
        <Button {...args} size="md">
          {t.medium}
        </Button>
        <Button {...args} size="lg">
          {t.large}
        </Button>
      </div>
    );
  },
};

export const States: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Button {...args} loading>
          {t.loading}
        </Button>
        <Button {...args} disabled>
          {t.disabled}
        </Button>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const busy = canvas.getByRole('button', { busy: true });
    await expect(busy).toBeDisabled();
    await userEvent.click(busy, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const AsLink: Story = {
  render: (args, { globals }) => (
    <Button {...args} asChild variant="secondary">
      <a href="https://github.com/rayssarrsilva/ipe">{pick(copy, globals.locale).link}</a>
    </Button>
  ),
};
