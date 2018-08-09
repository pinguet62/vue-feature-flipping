import { isEnabled } from './service'

/**
 * @example
 * const router = new VueRouter({
 *     routes: [
 *         { path: '/test2', component: Test2Component, meta: { featureFlipping: { key: 'XXXXX' } } },
 *         { path: '/test3', component: Test3Component, meta: { featureFlipping: { key: 'XXXXX', not: true } } },
 *         { path: '/test3', component: Test3Component, meta: { featureFlipping: { key: 'XXXXX', default: true } } },
 *     ]
 * })
 */
export async function featureFlippingGuard (to, from, next) {
  if (to.meta.featureFlipping) {
    let {key, default: defaut, not} = to.meta.featureFlipping
    if (not ^ !isEnabled(key, defaut)) {
      return next({path: '/'})
    }
  }
  return next()
}
