import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type FormEvent } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Input } from '../../components/Input';
import { Switch } from '../../components/Switch';
import { Textarea } from '../../components/Textarea';
import { pick } from '../../i18n/story-copy';

const copy = {
  en: {
    badge: 'Open call',
    title: 'Sell at the market',
    intro: 'Tell us about you and what you make. We read every application.',
    name: 'Your name',
    email: 'Email',
    emailHint: 'We will reply within 5 days.',
    emailError: 'Enter an email like name@example.com.',
    story: 'What do you make?',
    storyHint: 'Materials, where you work, what makes it yours.',
    count: (length: number, max: number) => `${length} of ${max} characters`,
    pickup: 'I can deliver in person',
    pickupHint: 'Buyers nearby will see a pickup option.',
    terms: 'I agree to the market guidelines',
    termsError: 'Please accept the guidelines.',
    submit: 'Send application',
    sent: 'Thank you! Your application is on its way.',
  },
  pt: {
    badge: 'Inscrições abertas',
    title: 'Venda na feira',
    intro: 'Conte quem você é e o que você faz. Lemos todas as inscrições.',
    name: 'Seu nome',
    email: 'E-mail',
    emailHint: 'Respondemos em até 5 dias.',
    emailError: 'Digite um e-mail como nome@exemplo.com.',
    story: 'O que você produz?',
    storyHint: 'Materiais, onde você trabalha, o que torna a peça sua.',
    count: (length: number, max: number) => `${length} de ${max} caracteres`,
    pickup: 'Posso entregar pessoalmente',
    pickupHint: 'Compradores por perto verão a opção de retirada.',
    terms: 'Concordo com as regras da feira',
    termsError: 'Aceite as regras para continuar.',
    submit: 'Enviar inscrição',
    sent: 'Obrigada! Sua inscrição está a caminho.',
  },
};

function MakerSignupForm({ locale }: { locale: unknown }) {
  const t = pick(copy, locale);
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);

  const emailInvalid = submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const termsInvalid = submitted && !accepted;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setSent(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && accepted);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      style={{
        display: 'grid',
        gap: 24,
        boxSizing: 'border-box',
        width: 'min(100%, 520px)',
        // Smaller padding on narrow screens keeps the card inside 320px (WCAG 1.4.10 Reflow).
        padding: 'clamp(20px, 6vw, 40px)',
        borderRadius: 24,
        background: 'var(--ipe-bg-surface)',
        boxShadow: 'var(--ipe-shadow-md)',
      }}
    >
      <header style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <Badge tone="accent">{t.badge}</Badge>
        <h2
          style={{
            margin: 0,
            font: 'var(--ipe-typography-heading-md)',
            fontFamily: 'Fraunces, Georgia, serif',
            color: 'var(--ipe-text-primary)',
          }}
        >
          {t.title}
        </h2>
        <p style={{ margin: 0, color: 'var(--ipe-text-secondary)' }}>{t.intro}</p>
      </header>

      <Input label={t.name} autoComplete="name" required />
      <Input
        label={t.email}
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        hint={t.emailHint}
        error={emailInvalid ? t.emailError : undefined}
      />
      <Textarea
        label={t.story}
        hint={t.storyHint}
        maxLength={280}
        showCount
        formatCount={t.count}
        rows={3}
      />
      <Switch label={t.pickup} hint={t.pickupHint} defaultChecked />
      <Checkbox
        label={t.terms}
        required
        checked={accepted}
        onCheckedChange={(checked) => setAccepted(checked === true)}
        error={termsInvalid ? t.termsError : undefined}
      />

      <Button type="submit" size="lg" fullWidth>
        {t.submit}
      </Button>
      <p role="status" style={{ margin: 0, color: 'var(--ipe-feedback-success)', minHeight: 24 }}>
        {sent ? t.sent : ''}
      </p>
    </form>
  );
}

const meta = {
  title: 'Patterns/Maker sign-up',
  parameters: {
    layout: 'centered',
    docs: {
      i18n: {
        en: 'A real form built only with Ipê components: validation on submit, errors linked to each field, and a status message announced to screen readers.',
        pt: 'Um formulário real feito só com componentes do Ipê: validação ao enviar, erros ligados a cada campo e uma mensagem de status anunciada para leitores de tela.',
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args, { globals }) => <MakerSignupForm locale={globals.locale} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submitting empty shows errors', async () => {
      await userEvent.click(canvas.getByRole('button'));
      await expect(canvas.getAllByRole('textbox')[1]).toHaveAttribute('aria-invalid', 'true');
      await expect(canvas.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    await step('Fixing the fields sends the form', async () => {
      await userEvent.type(canvas.getAllByRole('textbox')[1]!, 'rayssa@example.com');
      await userEvent.click(canvas.getByRole('checkbox'));
      await userEvent.click(canvas.getByRole('button'));
      await expect(canvas.getByRole('status')).not.toBeEmptyDOMElement();
    });
  },
};
