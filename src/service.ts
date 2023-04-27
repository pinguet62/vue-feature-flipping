import {ref, watch} from 'vue';

const unknownFeatureState = ref<boolean>(false);

const enabledFeatures = ref<string[] | null>(null);

export function isEnabled(key: string, defaut?: boolean) {
    const keys = enabledFeatures.value
    const defaultValue = defaut === undefined ? unknownFeatureState.value : defaut;
    return keys === null ? defaultValue : keys.includes(key)
}

export function setUnknownFeatureState(value: boolean) {
    unknownFeatureState.value = value
}

export function setEnabledFeatures(features: string[] | null) {
    enabledFeatures.value = features
}

export function onFeaturesChanged(handler: () => void) {
    return watch([enabledFeatures, unknownFeatureState], (from, to) => {
        handler()
    })
}
