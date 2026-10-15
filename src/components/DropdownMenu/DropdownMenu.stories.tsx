import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

const copy = {
  en: {
    trigger: 'Manage listing',
    label: 'Listing',
    edit: 'Edit details',
    photos: 'Change photos',
    pause: 'Pause sales (soon)',
    delete: 'Delete listing',
  },
  pt: {
    trigger: 'Gerenciar anúncio',
    label: 'Anúncio',
    edit: 'Editar detalhes',
    photos: 'Trocar fotos',
    pause: 'Pausar vendas (em breve)',
    delete: 'Excluir anúncio',
  },
};

const modalA11yException = {
  // Reviewed: while a modal layer is open, Radix hides the rest of the page with
  // aria-hidden and traps focus inside the layer, so the hidden trigger can never
  // receive focus. axe still reports it, so this rule is disabled for open states.
  config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] },
};

const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuContent,
  parameters: {
    docs: {
      i18n: {
        en: 'A list of actions revealed by a button. Follows the WAI-ARIA menu pattern: **arrow keys**, **Home/End** and **typeahead** move between items, disabled items are skipped and **Escape** returns focus to the trigger. Use `tone="danger"` for destructive actions.',
        pt: 'Uma lista de ações revelada por um botão. Segue o padrão de menu da WAI-ARIA: **setas**, **Home/End** e **digitação** navegam entre os itens, itens desabilitados são pulados e **Esc** devolve o foco ao gatilho. Use `tone="danger"` para ações destrutivas.',
      },
    },
  },
} satisfies Meta<typeof DropdownMenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { a11y: modalA11yException },
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ minHeight: 280 }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">{t.trigger}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t.label}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>{t.edit}</DropdownMenuItem>
              <DropdownMenuItem>{t.photos}</DropdownMenuItem>
              <DropdownMenuItem disabled>{t.pause}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem tone="danger">{t.delete}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    const menu = await screen.findByRole('menu');
    await waitFor(() => expect(menu).toBeVisible());
    await userEvent.keyboard('{Tab}');
    await expect(menu).toContainElement(document.activeElement as HTMLElement);
  },
};
