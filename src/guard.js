import { isEnabled } from './service'

/**
 * @example
 * const router = new VueRouter({
 *     routes: [
 *         { path: '/test', component: TestComponent, meta: { featureFlipping: 'XXXXX' } }
 *     ]
 * })
 */
export async function featureFlippingGuard (to, from, next) {
  if (to.meta.featureFlipping && !isEnabled(to.meta.featureFlipping)) {
    return next({path: '/'})
  }
  return next()
}
