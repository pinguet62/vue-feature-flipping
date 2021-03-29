import { NavigationGuard, RouteLocationRaw } from 'vue-router';
export declare type MetaGuard = {
    key: string;
    redirect?: RouteLocationRaw;
    default?: boolean;
    not?: boolean;
};
declare module 'vue-router' {
    interface RouteMeta {
        featureFlipping?: MetaGuard;
    }
}
export declare const featureFlippingGuard: NavigationGuard;
