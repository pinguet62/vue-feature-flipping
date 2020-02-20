import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

export default {
  input: 'index.js',
  output: {
    name: 'VueFeatureFlipping',
    exports: 'named',
  },
  plugins: [
    commonjs(), // ES6
    buble({transforms: {asyncAwait: false, forOf: false}}), // polyfill
  ],
}
