import { ref, watch } from 'vue';
const enabledFeatures = ref(null);
export function isEnabled(key, defaut = false) {
    const keys = enabledFeatures.value;
    return keys === null ? defaut : keys.includes(key);
}
export function setEnabledFeatures(features) {
    enabledFeatures.value = features;
}
export function onFeaturesChanged(handler) {
    return watch(enabledFeatures, (from, to) => {
        handler();
    });
}
//# sourceMappingURL=service.js.map