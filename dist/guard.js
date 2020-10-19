import { isEnabled } from './service';
export function featureFlippingGuard(to, from, next) {
    if (to.meta.featureFlipping) {
        var _a = to.meta.featureFlipping, key = _a.key, _b = _a.redirect, redirect = _b === void 0 ? '/' : _b, defaut = _a.default, _c = _a.not, not = _c === void 0 ? false : _c;
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect);
        }
    }
    return next();
}
//# sourceMappingURL=guard.js.map