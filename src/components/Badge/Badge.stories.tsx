import type { Meta, StoryObj } from '@storybook/react-vite';
import { pick } from '../../i18n/story-copy';
import { Badge } from './Badge';

const copy = {
  en: {
    neutral: 'Handmade',
    accent: 'New',
    success: 'In stock',
    danger: 'Sold out',
    info: 'Ships in 3 days',
  },
  pt: {
    neutral: 'Feito à mão',
    accent: 'Novidade',
    success: 'Em estoque',
    danger: 'Esgotado',
    info: 'Envio em 3 dias',
  },
};

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { tone: 'neutral', dot: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'accent', 'success', 'danger', 'info'] },
  },
  parameters: {
    docs: {
      i18n: {
        en: 'A short, non-interactive status label. **The text carries the meaning** and the tone only reinforces it, so badges stay readable for color-blind users. Text always uses a high-contrast color.',
        pt: 'Um rótulo curto de status, sem interação. **O texto carrega o significado** e a cor só reforça, então o badge continua legível para pessoas daltônicas. O texto sempre usa uma cor de alto contraste.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args, { globals }) => {
    const t = pick(copy, globals.locale);
    return <Badge {...args}>{args.children ?? t[args.tone ?? 'neutral']}</Badge>;
  },
};

export const Tones: Story = {
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Badge>{t.neutral}</Badge>
        <Badge tone="accent">{t.accent}</Badge>
        <Badge tone="success" dot>
          {t.success}
        </Badge>
        <Badge tone="danger" dot>
          {t.danger}
        </Badge>
        <Badge tone="info" dot>
          {t.info}
        </Badge>
      </div>
    );
  },
};
