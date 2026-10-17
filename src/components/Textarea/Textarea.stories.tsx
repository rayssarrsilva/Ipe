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
    count: (length: number, max: number) => `${length} of ${max} characters`,
  },
  pt: {
    label: 'Um recado para quem fez',
    hint: 'Agradeça ou pergunte sobre a peça. Quem produz adora receber mensagens.',
    placeholder: 'Essa tigela de cerâmica é linda…',
    error: 'Escreva pelo menos 10 caracteres.',
    count: (length: number, max: number) => `${length} de ${max} caracteres`,
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
        en: 'A multi-line text field with an optional **live character counter**. The counter is part of the field description, so screen reader users hear the limit too, as “9 of 280 characters”. Translate it with `formatCount`.',
        pt: 'Campo de texto com várias linhas e **contador de caracteres** opcional. O contador faz parte da descrição do campo, então quem usa leitor de tela também ouve o limite, como “9 de 280 caracteres”. Traduza com `formatCount`.',
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
      <Textarea
        {...args}
        label={args.label || t.label}
        hint={t.hint}
        placeholder={t.placeholder}
        formatCount={t.count}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'Obrigada!');
    await expect(canvas.getByText('9/280')).toBeInTheDocument();
    await expect(canvas.getByRole('textbox')).toHaveAccessibleDescription(
      /9 (of 280 characters|de 280 caracteres)$/,
    );
  },
};

export const WithError: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Textarea
        {...args}
        label={t.label}
        defaultValue="Oi"
        error={t.error}
        formatCount={t.count}
        required
      />
    );
  },
};
