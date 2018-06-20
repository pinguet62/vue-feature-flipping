import { isEnabled } from './service'
import { parseParameter } from './utils'

/**
 * @example
 * const router = new VueRouter({
 *     routes: [
 *         { path: '/test1', component: Test1Component, meta: { featureFlipping: 'XXXXX' } },
 *         { path: '/test2', component: Test2Component, meta: { featureFlipping: { key: 'XXXXX' } } },
 *         { path: '/test3', component: Test3Component, meta: { featureFlipping: { key: 'XXXXX', default: true } } },
 *     ]
 * })
 */
export async function featureFlippingGuard (to, from, next) {
  if (to.meta.featureFlipping) {
    let [key, defaut] = parseParameter(to.meta.featureFlipping)
    if (!isEnabled(key, defaut)) {
      return next({path: '/'})
    }
  }
  return next()
}
