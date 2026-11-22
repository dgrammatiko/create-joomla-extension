import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'index.mjs',
  platform: 'node',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].mjs',
    minify: true,
  },
});
