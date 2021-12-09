import {ref, watch} from 'vue';

const enabledFeatures = ref<string[] | null>(null);

export function isEnabled(key: string, defaut = false) {
    const keys = enabledFeatures.value
    return keys === null ? defaut : keys.includes(key)
}

export function setEnabledFeatures(features: string[] | null) {
    enabledFeatures.value = features
}

export function onFeaturesChanged(handler: () => void) {
    return watch(enabledFeatures, (from, to) => {
        handler()
    })
}
