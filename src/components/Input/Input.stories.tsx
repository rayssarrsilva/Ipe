import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Input } from './Input';

const copy = {
  en: {
    label: 'Email',
    placeholder: 'you@example.com',
    hint: 'We only use it to send your order updates.',
    error: 'Enter an email like name@example.com.',
    name: 'Full name',
    search: 'Search products',
    searchPlaceholder: 'Search the market…',
    disabled: 'Member since',
  },
  pt: {
    label: 'E-mail',
    placeholder: 'voce@exemplo.com',
    hint: 'Usamos só para enviar atualizações do seu pedido.',
    error: 'Digite um e-mail como nome@exemplo.com.',
    name: 'Nome completo',
    search: 'Buscar produtos',
    searchPlaceholder: 'Buscar na feira…',
    disabled: 'Membro desde',
  },
};

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: '', size: 'md', required: false, disabled: false, hideLabel: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
  parameters: {
    layout: 'padded',
    docs: {
      i18n: {
        en: 'A single-line text field. The **label is always required**: hints and errors are linked to the input with `aria-describedby`, and errors set `aria-invalid` and show an icon so meaning never depends on color alone.',
        pt: 'Campo de texto de uma linha. O **rótulo é sempre obrigatório**: dicas e erros são ligados ao campo com `aria-describedby`, e erros definem `aria-invalid` e mostram um ícone, para que o significado nunca dependa só da cor.',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}>{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Input {...args} label={args.label || t.label} placeholder={t.placeholder} hint={t.hint} />
    );
  },
};

export const WithError: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return <Input {...args} label={t.label} defaultValue="rayssa@" error={t.error} required />;
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const States: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        <Input {...args} label={t.name} required />
        <Input {...args} label={t.disabled} defaultValue="2026" disabled />
        <Input {...args} label={t.search} placeholder={t.searchPlaceholder} hideLabel size="lg" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getAllByRole('textbox')[0]!;
    await userEvent.type(name, 'Rayssa Roberta');
    await expect(name).toHaveValue('Rayssa Roberta');
  },
};
