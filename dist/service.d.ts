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
export declare function isEnabled(key: string, defaut?: boolean): boolean;
export declare function setEnabledFeatures(features: string[]): void;
