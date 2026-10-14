import type { CSSProperties } from 'react';
import { coreTokens, darkTokens, lightTokens } from '../../tokens/generated/tokens';

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 20,
  margin: '24px 0 40px',
};
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
};

export function PrimitivePalette() {
  const colors = coreTokens.filter((t) => t.type === 'color');
  return (
    <div style={grid}>
      {colors.map((t) => (
        <figure key={t.name} style={{ margin: 0 }}>
          <div
            style={{
              height: 96,
              borderRadius: 16,
              background: `var(${t.cssVar})`,
              border: '1px solid var(--ipe-border-subtle)',
            }}
          />
          <figcaption style={{ marginTop: 10 }}>
            <strong style={{ display: 'block', fontSize: 14 }}>
              {t.name.replace('color.', '')}
            </strong>
            <span style={mono}>{String(t.value).toUpperCase()}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function SemanticTable() {
  return (
    <table
      style={{ width: '100%', borderCollapse: 'collapse', margin: '24px 0 40px', fontSize: 14 }}
    >
      <thead>
        <tr style={{ textAlign: 'left', background: 'transparent' }}>
          <th style={{ padding: 8 }}>Token</th>
          <th style={{ padding: 8 }}>CSS variable</th>
          <th style={{ padding: 8 }}>Light</th>
          <th style={{ padding: 8 }}>Dark</th>
        </tr>
      </thead>
      <tbody>
        {lightTokens.map((t, i) => {
          const dark = darkTokens[i];
          return (
            <tr
              key={t.name}
              style={{ borderTop: '1px solid var(--ipe-border-subtle)', background: 'transparent' }}
            >
              <td style={{ padding: 8 }}>{t.name}</td>
              <td style={{ padding: 8, ...mono }}>{t.cssVar}</td>
              <td style={{ padding: 8 }}>
                <Chip hex={String(t.value)} />
              </td>
              <td style={{ padding: 8 }}>{dark && <Chip hex={String(dark.value)} />}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Chip({ hex }: { hex: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: hex,
          border: '1px solid var(--ipe-border-subtle)',
        }}
      />
      <span style={mono}>{hex.toUpperCase()}</span>
    </span>
  );
}

const typeSamples = coreTokens.filter((t) => t.type === 'typography');

export function TypeScale() {
  return (
    <div style={{ margin: '24px 0 40px' }}>
      {typeSamples.map((t) => (
        <div
          key={t.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: 24,
            alignItems: 'baseline',
            padding: '16px 0',
            borderTop: '1px solid var(--ipe-border-subtle)',
          }}
        >
          <span style={mono}>{t.name.replace('typography.', '')}</span>
          <span
            style={{
              font: `var(${t.cssVar})`,
              fontFamily:
                t.name.includes('display') || t.name.includes('heading')
                  ? 'Fraunces, Georgia, serif'
                  : '"Instrument Sans", system-ui, sans-serif',
              textTransform: t.name.includes('caps') ? 'uppercase' : undefined,
              letterSpacing: t.name.includes('caps') ? '0.04em' : undefined,
            }}
          >
            O ipê floresce na seca
          </span>
        </div>
      ))}
    </div>
  );
}
