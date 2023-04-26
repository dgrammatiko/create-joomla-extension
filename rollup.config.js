import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.mjs',
  output: {
		dir: 'dist',
		format: 'esm',
    // inlineDynamicImports: true,
    plugins: [terser()]
	},
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs({
      ignore: ['readable-stream'],
      dynamicRequireTargets: [
        'node_modules/restore-cursor/*.js',
      ]
    }),
    json()
  ],
  external: ['inquirer']
};
