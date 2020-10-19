let enabledFeatures: string[] | null = []

export function isEnabled(key: string, defaut = false) {
    return enabledFeatures === null ? defaut : enabledFeatures.includes(key)
}

export function setEnabledFeatures(features: string[] | null) {
    enabledFeatures = features
}
