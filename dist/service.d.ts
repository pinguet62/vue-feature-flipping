export declare function isEnabled(key: string, defaut?: boolean): boolean;
export declare function setEnabledFeatures(features: string[] | null): void;
export declare function onFeaturesChanged(handler: () => void): import("vue").WatchStopHandle;
