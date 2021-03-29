import { isEnabled } from './service';
export const featureFlippingGuard = (to, from, next) => {
    if (to.meta.featureFlipping) {
        const { key, redirect = '/', default: defaut, not = false } = to.meta.featureFlipping;
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect);
        }
    }
    return next();
};
//# sourceMappingURL=guard.js.map