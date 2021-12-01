import { Directive } from '@vue/runtime-core';
import { onFeaturesChanged } from './service';
declare type FeatureFlippingEl<T = HTMLElement> = T & {
    unWatch?: ReturnType<typeof onFeaturesChanged>;
};
export declare const featureFlippingDirective: Directive<FeatureFlippingEl>;
export {};
