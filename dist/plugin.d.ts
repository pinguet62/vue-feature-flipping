import Vue from 'vue';
import { NavigationGuard } from 'vue-router';
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        beforeRouteEnter?: NavigationGuard<V>;
    }
}
export declare function featureFlippingPluginInstall(vue: typeof Vue): void;
