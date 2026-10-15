import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Switch } from './Switch';

const copy = {
  en: {
    label: 'Show only local makers',
    hint: 'Applies right away to the product list.',
    reduce: 'Reduce motion',
    beta: 'Try the new checkout (beta)',
  },
  pt: {
    label: 'Mostrar só produtores locais',
    hint: 'Aplica na hora à lista de produtos.',
    reduce: 'Reduzir animações',
    beta: 'Testar o novo checkout (beta)',
  },
};

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: '', disabled: false },
  parameters: {
    layout: 'padded',
    docs: {
      i18n: {
        en: 'An on/off setting that **takes effect immediately**, like a light switch. For choices that are submitted with a form, use Checkbox instead. Exposes `role="switch"` and works with Space and Enter.',
        pt: 'Uma configuração liga/desliga que **vale na hora**, como um interruptor. Para escolhas enviadas com um formulário, use o Checkbox. Expõe `role="switch"` e funciona com Espaço e Enter.',
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return <Switch {...args} label={args.label || t.label} hint={t.hint} />;
  },
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('switch');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  },
};

export const States: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <Switch {...args} label={t.reduce} defaultChecked />
        <Switch {...args} label={t.beta} disabled />
      </div>
    );
  },
};
