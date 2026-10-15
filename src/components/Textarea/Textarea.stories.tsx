import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Textarea } from './Textarea';

const copy = {
  en: {
    label: 'A note for the maker',
    hint: 'Say thanks or ask about the piece. Makers love hearing from you.',
    placeholder: 'This ceramic bowl is beautiful…',
    error: 'Write at least 10 characters.',
  },
  pt: {
    label: 'Um recado para quem fez',
    hint: 'Agradeça ou pergunte sobre a peça. Quem produz adora receber mensagens.',
    placeholder: 'Essa tigela de cerâmica é linda…',
    error: 'Escreva pelo menos 10 caracteres.',
  },
};

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: '', showCount: true, maxLength: 280, required: false, disabled: false },
  parameters: {
    layout: 'padded',
    docs: {
      i18n: {
        en: 'A multi-line text field with an optional **live character counter**. The counter is part of the field description, so screen reader users hear the limit too.',
        pt: 'Campo de texto com várias linhas e **contador de caracteres** opcional. O contador faz parte da descrição do campo, então quem usa leitor de tela também ouve o limite.',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Textarea {...args} label={args.label || t.label} hint={t.hint} placeholder={t.placeholder} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'Obrigada!');
    await expect(canvas.getByText('9/280')).toBeInTheDocument();
  },
};

export const WithError: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return <Textarea {...args} label={t.label} defaultValue="Oi" error={t.error} required />;
  },
};
