import {isEnabled, setEnabledFeatures} from '../src'

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
})
