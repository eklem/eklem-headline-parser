import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
  // browser-friendly UMD build
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: './src/index.js',
    output: [
      { name: 'ehp', file: './dist/eklem-headline-parser.umd.js', format: 'umd', exports: 'named' },
      { file: './dist/eklem-headline-parser.cjs.js', format: 'cjs' },
      { file: './dist/eklem-headline-parser.esm.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },
  // Minified versions
  {
    input: './src/index.js',
    output: [
      { name: 'ehp', file: './dist/eklem-headline-parser.umd.min.js', format: 'umd', exports: 'named' },
      { file: './dist/eklem-headline-parser.cjs.min.js', format: 'cjs' },
      { file: './dist/eklem-headline-parser.esm.min.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser() // Minify
    ]
  }
]
