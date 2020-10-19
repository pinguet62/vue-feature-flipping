import Vue from 'vue'
import {NavigationGuard} from 'vue-router'
import {featureFlippingDirective} from './directive'
import {featureFlippingGuard} from './guard'

// fix typing
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        beforeRouteEnter?: NavigationGuard<V>
    }
}

export function featureFlippingPluginInstall(vue: typeof Vue) {
    vue.directive('feature-flipping', featureFlippingDirective)
    vue.mixin({beforeRouteEnter: featureFlippingGuard})
}
