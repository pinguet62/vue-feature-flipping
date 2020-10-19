import {NavigationGuardNext, Route} from 'vue-router'
import {isEnabled} from './service'

export type MetaGuard = { key: string, redirect?: string, default?: boolean, not?: boolean }

export function featureFlippingGuard(to: Route, from: Route, next: NavigationGuardNext) {
    if (to.meta.featureFlipping) {
        const {key, redirect = '/', default: defaut, not = false} = to.meta.featureFlipping as MetaGuard
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect)
        }
    }
    return next()
}
