declare module 'vue-feature-flipping' {
    import { VueConstructor } from 'vue';

    interface VueFeatureFlipping {
        (vue: VueConstructor, options?: {init?: (features: string[]) => void}): void
        setEnabledFeatures(features: string[]): void
        isEnabled(key: string, defaut?: boolean): boolean
    }
    const vueFeatureFlippingModule: VueFeatureFlipping;
    export = vueFeatureFlippingModule;
}
