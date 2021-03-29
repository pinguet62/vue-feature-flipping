import { featureFlippingDirective } from './directive';
import { featureFlippingGuard } from './guard';
export const featureFlippingPlugin = {
    install(app) {
        app.directive('feature-flipping', featureFlippingDirective);
        app.mixin({ beforeRouteEnter: featureFlippingGuard });
    }
};
//# sourceMappingURL=plugin.js.map