import { NavigationGuardNext, Route } from "vue-router";
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
export declare function featureFlippingGuard(to: Route, from: Route, next: NavigationGuardNext): Promise<void>;
