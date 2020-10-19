var enabledFeatures = [];
export function isEnabled(key, defaut) {
    if (defaut === void 0) { defaut = false; }
    return enabledFeatures === null ? defaut : enabledFeatures.includes(key);
}
export function setEnabledFeatures(features) {
    enabledFeatures = features;
}
//# sourceMappingURL=service.js.map