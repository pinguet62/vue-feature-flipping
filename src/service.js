let enabledFeatures = []

/**
 * @example
 * import { isEnabled } from 'vue-feature-flipping'
 * function sample() {
 *     if (isEnabled('XXXXX')) {
 *         console.log('...')
 *     }
 * }
 */
export function isEnabled (key) {
  return enabledFeatures.includes(key)
}

export function setEnabledFeatures (features) {
  enabledFeatures = features
}
