let enabledFeatures = []

/**
 * @param defaut The value to return when `false` if plugin not initialized (list is `null`)
 * @example
 * import { isEnabled } from 'vue-feature-flipping'
 * function sample() {
 *     if (isEnabled('XXXXX')) {
 *         console.log('...')
 *     }
 * }
 */
export function isEnabled (key: string, defaut = false) {
  return enabledFeatures === null ? defaut : enabledFeatures.includes(key)
}

export function setEnabledFeatures (features: string[]) {
  enabledFeatures = features
}
