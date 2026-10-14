import { copyFile } from 'node:fs/promises';

await copyFile('src/styles/generated/tokens.css', 'dist/tokens.css');
await copyFile('src/styles/generated/tailwind.css', 'dist/tailwind.css');
console.log('copied tokens.css and tailwind.css to dist');
