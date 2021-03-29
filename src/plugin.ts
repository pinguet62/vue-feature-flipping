import {App, Plugin} from 'vue'
import {featureFlippingDirective} from './directive'
import {featureFlippingGuard} from './guard'

export const featureFlippingPlugin: Plugin = {
    install(app: App) {
        app.directive('feature-flipping', featureFlippingDirective)
        app.mixin({beforeRouteEnter: featureFlippingGuard})
    }
}
