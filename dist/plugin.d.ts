import { VueConstructor } from 'vue';
/**
 * @example
 * import Vue from 'vue'
 * import FeatureFlipping from './feature-flipping'
 * Vue.use(FeatureFlipping, {
 *     init: (consumer) => consumer(['FF1', 'FF2', 'FF3'])
 * })
 */
export declare function featureFlippingPluginInstall(vue: VueConstructor, options: any): void;
