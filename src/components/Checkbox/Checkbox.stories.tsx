import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Checkbox } from './Checkbox';

const copy = {
  en: {
    label: 'Send me news from local makers',
    hint: 'One email a month. Unsubscribe anytime.',
    terms: 'I agree to the terms of use',
    termsError: 'You need to accept the terms to continue.',
    all: 'All categories',
    items: ['Ceramics', 'Textiles', 'Coffee'],
    disabled: 'Gift wrapping (unavailable)',
  },
  pt: {
    label: 'Quero receber novidades de produtores locais',
    hint: 'Um e-mail por mês. Cancele quando quiser.',
    terms: 'Concordo com os termos de uso',
    termsError: 'Você precisa aceitar os termos para continuar.',
    all: 'Todas as categorias',
    items: ['Cerâmica', 'Tecelagem', 'Café'],
    disabled: 'Embrulho para presente (indisponível)',
  },
};

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: '', disabled: false, required: false },
  parameters: {
    layout: 'padded',
    docs: {
      i18n: {
        en: 'Lets people pick one or more options, usually submitted with a form. Built on Radix UI, so it supports keyboard (Space), the **indeterminate** state (`aria-checked="mixed"`) and clicking the label.',
        pt: 'Permite escolher uma ou mais opções, normalmente enviadas com um formulário. Feito sobre o Radix UI, suporta teclado (Espaço), o estado **indeterminado** (`aria-checked="mixed"`) e clique no rótulo.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return <Checkbox {...args} label={args.label || t.label} hint={t.hint} />;
  },
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole('checkbox');
    await userEvent.click(box);
    await expect(box).toBeChecked();

    // WCAG 2.2 target size (2.5.8): the box alone must be at least 24x24 CSS px.
    const { width, height } = box.getBoundingClientRect();
    await expect(Math.min(width, height)).toBeGreaterThanOrEqual(24);
  },
};

export const States: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <Checkbox {...args} label={t.terms} error={t.termsError} required />
        <Checkbox {...args} label={t.disabled} disabled />
      </div>
    );
  },
};

function SelectAll({ locale }: { locale: unknown }) {
  const t = pick(copy, locale);
  const [selected, setSelected] = useState<string[]>([t.items[0]!]);
  const all = selected.length === t.items.length;
  const state = all ? true : selected.length > 0 ? 'indeterminate' : false;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox
        label={t.all}
        checked={state}
        onCheckedChange={() => setSelected(all ? [] : [...t.items])}
      />
      <div style={{ display: 'grid', gap: 12, paddingLeft: 34 }}>
        {t.items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selected.includes(item)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked ? [...current, item] : current.filter((value) => value !== item),
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export const Indeterminate: Story = {
  render: (_args, { globals }) => <SelectAll locale={globals.locale} />,
  play: async ({ canvasElement }) => {
    const [parent] = within(canvasElement).getAllByRole('checkbox');
    await expect(parent).toHaveAttribute('aria-checked', 'mixed');
    await userEvent.click(parent!);
    await expect(parent).toHaveAttribute('aria-checked', 'true');
  },
};
