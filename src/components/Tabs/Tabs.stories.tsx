import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { pick } from '../../i18n/story-copy';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const copy = {
  en: {
    label: 'Product details',
    story: 'Story',
    care: 'Care',
    shipping: 'Shipping',
    storyText:
      'Shaped by hand by Dona Lúcia in Cunha, São Paulo, from local clay and fired in a wood kiln.',
    careText: 'Hand wash with mild soap. Not suitable for the microwave.',
    shippingText: 'Wrapped in recycled paper and shipped within 3 business days.',
  },
  pt: {
    label: 'Detalhes do produto',
    story: 'História',
    care: 'Cuidados',
    shipping: 'Entrega',
    storyText:
      'Modelada à mão por Dona Lúcia em Cunha, São Paulo, com argila local e queimada em forno a lenha.',
    careText: 'Lave à mão com sabão neutro. Não vai ao micro-ondas.',
    shippingText: 'Embalada em papel reciclado e enviada em até 3 dias úteis.',
  },
};

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      i18n: {
        en: 'Splits related content into panels shown one at a time. Follows the WAI-ARIA tabs pattern: **arrow keys** move between tabs, **Home/End** jump to the ends, and each panel is labelled by its tab.',
        pt: 'Divide conteúdo relacionado em painéis exibidos um por vez. Segue o padrão de abas da WAI-ARIA: **setas** navegam entre as abas, **Home/End** vão para as pontas, e cada painel é rotulado pela sua aba.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args, { globals }) => {
    const t = pick(copy, globals.locale);
    return (
      <div style={{ maxWidth: 560 }}>
        <Tabs defaultValue="story">
          <TabsList aria-label={t.label}>
            <TabsTrigger value="story">{t.story}</TabsTrigger>
            <TabsTrigger value="care">{t.care}</TabsTrigger>
            <TabsTrigger value="shipping">{t.shipping}</TabsTrigger>
          </TabsList>
          <TabsContent value="story">{t.storyText}</TabsContent>
          <TabsContent value="care">{t.careText}</TabsContent>
          <TabsContent value="shipping">{t.shippingText}</TabsContent>
        </Tabs>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole('tab')[0]!);
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
  },
};
