import {isEnabled, setEnabledFeatures} from '../src'
import {onFeaturesChanged, setUnknownFeatureState} from "../src/service";
import {nextTick} from "vue";

describe('service', () => {
    it('Should return if the key is into enabled keys', () => {
        setEnabledFeatures(['KEY'])

        expect(isEnabled('KEY')).toEqual(true)
        expect(isEnabled('OTHER')).toEqual(false)
    })

    describe('Default value when not initialized', () => {
        beforeEach(() => setEnabledFeatures(null))

        it('Should return "default" value', () => {
            expect(isEnabled('KEY', true)).toEqual(true)
            expect(isEnabled('KEY', false)).toEqual(false)
        })

        it('Default "default" value is "false"', () => {
            expect(isEnabled('KEY')).toEqual(false)
        })
    })

    describe('Unknown flag should return unknownFeatureState value', () => {
        beforeEach(() => setEnabledFeatures(null))

        it('Should return "default" value', () => {
            setUnknownFeatureState(true)
            expect(isEnabled('KEY', true)).toEqual(true)
            expect(isEnabled('KEY', false)).toEqual(false)
        })

        it('Default "default" value is "true"', () => {
            setUnknownFeatureState(true)
            expect(isEnabled('KEY')).toEqual(true)
        })
    })

    describe('onFeaturesChanged', () => {
        it('Should call handler when features list updated', async () => {
            const handler = jest.fn()
            onFeaturesChanged(handler)

            await nextTick()
            expect(handler).toHaveBeenCalledTimes(0)

            setEnabledFeatures([])
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(1)

            setEnabledFeatures(['ADMIN', 'USER', 'GOD'])
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(2)

            setEnabledFeatures(null)
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(3)
        })

        it('Should call handler when unknownFeatureState updated', async () => {
            setUnknownFeatureState(false)
            const handler = jest.fn()
            onFeaturesChanged(handler)

            setUnknownFeatureState(false)
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(0)

            setUnknownFeatureState(true)
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(1)

            setUnknownFeatureState(false)
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(2)
        })

        it('Should return function to unsubscribe', async () => {
            const handler = jest.fn()
            const unsubscriber = onFeaturesChanged(handler)

            await nextTick()
            expect(handler).toHaveBeenCalledTimes(0)
            setEnabledFeatures([])
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(1)

            unsubscriber()

            setEnabledFeatures(['ADMIN', 'USER', 'GOD'])
            await nextTick()
            expect(handler).toHaveBeenCalledTimes(1)
        })
    })
})
