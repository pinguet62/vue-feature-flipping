let enabledFeatures = [];
export function isEnabled(key, defaut = false) {
    return enabledFeatures === null ? defaut : enabledFeatures.includes(key);
}
export function setEnabledFeatures(features) {
    enabledFeatures = features;
}
//# sourceMappingURL=service.js.map