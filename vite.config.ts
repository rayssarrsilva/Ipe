import { resolve } from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, type TestProjectInlineConfiguration } from 'vitest/config';

const configDir = resolve(import.meta.dirname, '.storybook');

// Lets sandboxes with a preinstalled Chromium reuse it; CI installs its own with Playwright.
const executablePath = process.env.PW_CHROMIUM_PATH;

/** Runs every story (render, play function and axe-core) in real Chromium for one theme. */
const storybookProject = (theme: 'light' | 'dark'): TestProjectInlineConfiguration => ({
  extends: true,
  plugins: [storybookTest({ configDir })],
  define: { __IPE_TEST_THEME__: JSON.stringify(theme) },
  test: {
    name: `storybook-${theme}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({ launchOptions: executablePath ? { executablePath } : {} }),
      instances: [{ browser: 'chromium' }],
    },
  },
});

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: 'ipe-[name]__[local]',
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        tokens: resolve(import.meta.dirname, 'src/tokens/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'ipe',
    },
    rollupOptions: {
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^@radix-ui\//, 'clsx'],
    },
    sourcemap: true,
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.tsx', '**/index.ts'],
      thresholds: { lines: 90, functions: 90, branches: 85, statements: 90 },
      reporter: ['text', 'html', 'lcov'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
          css: { modules: { classNameStrategy: 'non-scoped' } },
        },
      },
      storybookProject('light'),
      storybookProject('dark'),
    ],
  },
});
