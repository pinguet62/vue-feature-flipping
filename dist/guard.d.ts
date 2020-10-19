import { NavigationGuardNext, Route } from 'vue-router';
export declare type MetaGuard = {
    key: string;
    redirect?: string;
    default?: boolean;
    not?: boolean;
};
export declare function featureFlippingGuard(to: Route, from: Route, next: NavigationGuardNext): void;
