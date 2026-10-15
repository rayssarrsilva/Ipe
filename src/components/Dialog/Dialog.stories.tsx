import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Button } from '../Button';
import { Input } from '../Input';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from './Dialog';

const copy = {
  en: {
    open: 'Remove from bag',
    title: 'Remove this item?',
    description: 'The handmade ceramic bowl will leave your bag. You can add it again later.',
    cancel: 'Keep it',
    confirm: 'Remove',
    close: 'Close',
    formOpen: 'Edit shipping address',
    formTitle: 'Shipping address',
    street: 'Street and number',
    city: 'City',
    save: 'Save address',
  },
  pt: {
    open: 'Remover da sacola',
    title: 'Remover este item?',
    description:
      'A tigela de cerâmica feita à mão vai sair da sua sacola. Você pode adicionar de novo depois.',
    cancel: 'Manter',
    confirm: 'Remover',
    close: 'Fechar',
    formOpen: 'Editar endereço de entrega',
    formTitle: 'Endereço de entrega',
    street: 'Rua e número',
    city: 'Cidade',
    save: 'Salvar endereço',
  },
};

const modalA11yException = {
  // Reviewed: while a modal layer is open, Radix hides the rest of the page with
  // aria-hidden and traps focus inside the layer, so the hidden trigger can never
  // receive focus. axe still reports it, so this rule is disabled for open states.
  config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] },
};

const meta = {
  title: 'Components/Dialog',
  component: DialogContent,
  parameters: {
    docs: {
      i18n: {
        en: 'A modal window for decisions and short tasks. **Focus moves inside and stays trapped** until it closes, **Escape** closes it, and focus returns to the button that opened it. Every dialog requires a `title`; translate the close button with `closeLabel`.',
        pt: 'Uma janela modal para decisões e tarefas curtas. **O foco entra e fica preso** até ela fechar, **Esc** fecha, e o foco volta para o botão que a abriu. Todo dialog exige um `title`; traduza o botão de fechar com `closeLabel`.',
      },
    },
  },
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {
  args: { title: '' },
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">{t.open}</Button>
        </DialogTrigger>
        <DialogContent title={t.title} description={t.description} closeLabel={t.close} size="sm">
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">{t.cancel}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="secondary">{t.confirm}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(within(canvasElement).getByRole('button')).toHaveFocus();
  },
};

export const WithForm: Story = {
  args: { title: '' },
  parameters: { a11y: modalA11yException },
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>{t.formOpen}</Button>
        </DialogTrigger>
        <DialogContent title={t.formTitle} closeLabel={t.close}>
          <Input label={t.street} autoComplete="street-address" />
          <Input label={t.city} autoComplete="address-level2" />
          <DialogFooter>
            <DialogClose asChild>
              <Button>{t.save}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(dialog).toContainElement(document.activeElement as HTMLElement);
  },
};
