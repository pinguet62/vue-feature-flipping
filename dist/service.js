var enabledFeatures = [];
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
export function isEnabled(key, defaut) {
    if (defaut === void 0) { defaut = false; }
    return enabledFeatures === null ? defaut : enabledFeatures.includes(key);
}
export function setEnabledFeatures(features) {
    enabledFeatures = features;
}
//# sourceMappingURL=service.js.map