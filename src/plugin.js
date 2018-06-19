import { setEnabledFeatures } from './service'

/**
 * @example
 * import Vue from 'vue'
 * import FeatureFlipping from './feature-flipping'
 * Vue.use(FeatureFlipping, {
 *     init: (consumer) => consumer(['FF1', 'FF2', 'FF3'])
 * })
 */
export function featureFlippingPluginInstall (vue, options) {
  options && options.init && options.init((it) => setEnabledFeatures(it))
}
