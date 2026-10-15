import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Button } from '../Button';
import { Toaster, useToast } from './Toast';

const copy = {
  en: {
    added: 'Add to bag',
    addedTitle: 'Added to your bag',
    addedText: 'Handmade ceramic bowl · R$ 89',
    removed: 'Remove item',
    removedTitle: 'Item removed',
    undo: 'Undo',
    undoAlt: 'Add the item back from your history',
    info: 'Save draft',
    infoTitle: 'Draft saved',
    close: 'Close',
    region: 'Notifications',
  },
  pt: {
    added: 'Adicionar à sacola',
    addedTitle: 'Adicionado à sua sacola',
    addedText: 'Tigela de cerâmica feita à mão · R$ 89',
    removed: 'Remover item',
    removedTitle: 'Item removido',
    undo: 'Desfazer',
    undoAlt: 'Adicione o item de volta pelo seu histórico',
    info: 'Salvar rascunho',
    infoTitle: 'Rascunho salvo',
    close: 'Fechar',
    region: 'Notificações',
  },
};

function Demo({ locale }: { locale: unknown }) {
  const t = pick(copy, locale);
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        onClick={() => toast({ title: t.addedTitle, description: t.addedText, tone: 'success' })}
      >
        {t.added}
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: t.removedTitle,
            tone: 'danger',
            action: { label: t.undo, altText: t.undoAlt, onClick: () => {} },
          })
        }
      >
        {t.removed}
      </Button>
      <Button variant="ghost" onClick={() => toast({ title: t.infoTitle })}>
        {t.info}
      </Button>
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    docs: {
      i18n: {
        en: 'A brief, non-blocking message. Wrap your app in `<Toaster>` once and call `toast()` from the `useToast()` hook. Messages are **announced to screen readers** (politely, or assertively for `danger`), pause on hover and focus, and can be swiped away. Press **F8** to jump to the notifications.',
        pt: 'Uma mensagem breve que não bloqueia a tela. Envolva o app com `<Toaster>` uma vez e chame `toast()` pelo hook `useToast()`. As mensagens são **anunciadas para leitores de tela** (de forma educada, ou assertiva no `danger`), pausam no hover e no foco e podem ser arrastadas para fechar. Aperte **F8** para ir até as notificações.',
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Toaster closeLabel={t.close} label={t.region} duration={8000}>
        <Demo locale={globals.locale} />
      </Toaster>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getAllByRole('button')[0]!);
    await expect((await screen.findAllByRole('listitem')).length).toBeGreaterThan(0);
  },
};
