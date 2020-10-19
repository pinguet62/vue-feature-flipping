import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

export default {
  input: 'dist/index.js',
  output: {
    name: 'VueFeatureFlipping',
    exports: 'named',
  },
  plugins: [
    commonjs(),
    buble({transforms: {asyncAwait: false, forOf: false}}),
  ],
}
