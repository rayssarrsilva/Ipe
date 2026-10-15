// Installs the packed library into a fresh React + Vite app and checks that a
// consumer can type-check (bundler and NodeNext resolution) and build with it.
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });
const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const dev = pkg.devDependencies;

const work = mkdtempSync(join(tmpdir(), 'ipe-smoke-'));
const tarball = execSync(`npm pack --silent --pack-destination ${work}`, { cwd: root })
  .toString()
  .trim()
  .split('\n')
  .pop();

const app = join(work, 'app');
mkdirSync(join(app, 'src'), { recursive: true });
writeFileSync(
  join(app, 'package.json'),
  JSON.stringify(
    {
      name: 'ipe-smoke-app',
      private: true,
      type: 'module',
      dependencies: {
        [pkg.name]: `file:${join(work, tarball)}`,
        react: dev.react,
        'react-dom': dev['react-dom'],
      },
      devDependencies: {
        '@types/react': dev['@types/react'],
        '@types/react-dom': dev['@types/react-dom'],
        '@vitejs/plugin-react': dev['@vitejs/plugin-react'],
        typescript: dev.typescript,
        vite: dev.vite,
      },
    },
    null,
    2,
  ),
);

writeFileSync(
  join(app, 'src', 'main.tsx'),
  `import '${pkg.name}/styles.css';
import { createRoot } from 'react-dom/client';
import { Badge, Button, Checkbox, Dialog, DialogContent, DialogTrigger, Input, Toaster, type ButtonProps } from '${pkg.name}';
import { lightTokens } from '${pkg.name}/tokens';

const size: ButtonProps['size'] = 'lg';

function App() {
  return (
    <Toaster>
      <Badge tone="success">{lightTokens.length} tokens</Badge>
      <Input label="Email" hint="We never share it." />
      <Checkbox label="I agree" />
      <Dialog>
        <DialogTrigger asChild>
          <Button size={size}>Open</Button>
        </DialogTrigger>
        <DialogContent title="Hello">Ipê works.</DialogContent>
      </Dialog>
    </Toaster>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
`,
);
writeFileSync(
  join(app, 'index.html'),
  '<div id="root"></div><script type="module" src="/src/main.tsx"></script>',
);
writeFileSync(
  join(app, 'vite.config.ts'),
  "import react from '@vitejs/plugin-react';\nimport { defineConfig } from 'vite';\nexport default defineConfig({ plugins: [react()] });\n",
);

const tsconfig = (moduleResolution, module) =>
  JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module,
      moduleResolution,
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      skipLibCheck: false,
      lib: ['ES2022', 'DOM'],
    },
    include: ['src'],
  });
writeFileSync(join(app, 'tsconfig.bundler.json'), tsconfig('Bundler', 'ESNext'));
writeFileSync(join(app, 'tsconfig.nodenext.json'), tsconfig('NodeNext', 'NodeNext'));
writeFileSync(join(app, 'src', 'css.d.ts'), "declare module '*.css';\n");

run('npm install --no-audit --no-fund --loglevel=error', app);
run('npx tsc -p tsconfig.bundler.json', app);
run('npx tsc -p tsconfig.nodenext.json', app);
run('npx vite build --logLevel warn', app);
console.log('\nSmoke test passed: a fresh React app can install, type-check and build with Ipê.');
