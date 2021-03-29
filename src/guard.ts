import {NavigationGuard, NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw} from 'vue-router'
import {isEnabled} from './service'

export type MetaGuard = { key: string, redirect?: RouteLocationRaw, default?: boolean, not?: boolean }

declare module 'vue-router' {
    interface RouteMeta {
        featureFlipping?: MetaGuard
    }
}

export const featureFlippingGuard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.featureFlipping) {
        const {key, redirect = '/', default: defaut, not = false} = to.meta.featureFlipping
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect)
        }
    }
    return next()
}
