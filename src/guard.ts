import { NavigationGuardNext, Route } from "vue-router";
import { isEnabled } from './service'

/**
 * @example
 * const router = new VueRouter({
 *     routes: [
 *         { path: '/test1', component: Test1Component, meta: { featureFlipping: { key: 'XXXXX' } } },
 *         { path: '/test2', component: Test2Component, meta: { featureFlipping: { key: 'XXXXX', redirect: '/error' } } },
 *         { path: '/test3', component: Test3Component, meta: { featureFlipping: { key: 'XXXXX', not: true } } },
 *         { path: '/test4', component: Test4Component, meta: { featureFlipping: { key: 'XXXXX', default: true } } },
 *     ]
 * })
 */
export async function featureFlippingGuard (to: Route, from: Route, next: NavigationGuardNext) {
  if (to.meta.featureFlipping) {
    let {key, redirect = '/', default: defaut, not} = to.meta.featureFlipping
    // @ts-ignore
    if (not ^ !isEnabled(key, defaut)) {
      return next(redirect)
    }
  }
  return next()
}
