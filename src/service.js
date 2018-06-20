let enabledFeatures = []

/**
 * @param {string} key
 * @param {boolean} [defaut=false] The value to return when `false` if plugin not initialized (list is `null`)
 * @return {boolean} `true` or `false` if feature `key` is enabled (inside list of enabled features)
 * @example
 * import { isEnabled } from 'vue-feature-flipping'
 * function sample() {
 *     if (isEnabled('XXXXX')) {
 *         console.log('...')
 *     }
 * }
 */
export function isEnabled (key, defaut = false) {
  return enabledFeatures === null ? defaut : enabledFeatures.includes(key)
}

/**
 * @param {Array.string|null} features
 */
export function setEnabledFeatures (features) {
  enabledFeatures = features
}
