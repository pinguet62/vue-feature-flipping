import { featureFlippingDirective } from './directive';
import { featureFlippingGuard } from './guard';
export function featureFlippingPluginInstall(vue) {
    vue.directive('feature-flipping', featureFlippingDirective);
    vue.mixin({ beforeRouteEnter: featureFlippingGuard });
}
//# sourceMappingURL=plugin.js.map