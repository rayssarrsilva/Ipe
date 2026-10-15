import type { Meta, StoryObj } from '@storybook/react-vite';
import { pick } from '../../i18n/story-copy';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const copy = {
  en: { button: 'Save for later', tip: 'Keeps this piece in your favorites' },
  pt: { button: 'Salvar para depois', tip: 'Guarda esta peça nos seus favoritos' },
};

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      i18n: {
        en: 'A short hint shown on **hover and keyboard focus**, linked to its trigger with `aria-describedby`. Never put essential information or interactive content in a tooltip: touch users may never see it.',
        pt: 'Uma dica curta exibida no **hover e no foco pelo teclado**, ligada ao gatilho com `aria-describedby`. Nunca coloque informação essencial ou conteúdo interativo num tooltip: quem usa toque pode nunca vê-lo.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: '', children: <span /> },
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ paddingTop: 48 }}>
        <Tooltip content={t.tip} defaultOpen>
          <Button variant="ghost">{t.button}</Button>
        </Tooltip>
      </div>
    );
  },
};
