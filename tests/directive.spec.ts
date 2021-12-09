import {mount} from '@vue/test-utils'
import FeatureFlipping, {setEnabledFeatures} from '../src'

describe('directive', () => {
    describe('render', () => {
        function runTestAndExpectation(directive: string, shouldRender: boolean) {
            const DOM = 'content'

            const vm = mount(
                {template: `<div><span ${directive}> ${DOM} </span></div>`},
                {global: {plugins: [FeatureFlipping]}})

            if (shouldRender) {
                expect(vm.html()).toContain(DOM)
            } else {
                expect(vm.html()).not.toContain(DOM)
            }
        }

        it('Should render DOM according to the "isEnabled" result', () => {
            setEnabledFeatures(['ENABLED'])

            runTestAndExpectation(`v-feature-flipping="'ENABLED'"`, true)
            runTestAndExpectation(`v-feature-flipping="'DISABLED'"`, false)
        })

        it('Should reverse rendering when ".not" modifier', () => {
            setEnabledFeatures(['ENABLED'])

            runTestAndExpectation(`v-feature-flipping.not="'ENABLED'"`, false)
            runTestAndExpectation(`v-feature-flipping.not="'DISABLED'"`, true)
        })

        it('Should render when ".default" modifier', () => {
            setEnabledFeatures(null)

            runTestAndExpectation(`v-feature-flipping="'ANY'"`, false)
            runTestAndExpectation(`v-feature-flipping.default="'ANY'"`, true)
        })
    })

    describe('class', () => {
        function runTest(directive: string) {
            const vm = mount(
                {template: `<div ${directive}></div>`},
                {global: {plugins: [FeatureFlipping]}})
            return vm
        }

        it('Should append class according to the "isEnabled" result', () => {
            setEnabledFeatures(['ENABLED'])

            const vm1 = runTest(`v-feature-flipping:class="{ key: 'ENABLED', value: 'XXXXX' }"`)
            expect(vm1.classes()).toContain('XXXXX')

            const vm2 = runTest(`v-feature-flipping:class="{ key: 'DISABLED', value: ['XXXXX'] }"`)
            expect(vm2.classes()).not.toContain('XXXXX')
        })

        it('Should reverse rendering when ".not" modifier', () => {
            setEnabledFeatures(['ENABLED'])

            const vm1 = runTest(`v-feature-flipping:class.not="{ key: 'DISABLED', value: 'XXXXX' }"`)
            expect(vm1.classes()).toContain('XXXXX')

            const vm2 = runTest(`v-feature-flipping:class.not="{ key: 'ENABLED', value: 'XXXXX' }"`)
            expect(vm2.classes()).not.toContain('XXXXX')
        })

        it('Should render when ".default" modifier', () => {
            setEnabledFeatures(null)

            const vm1 = runTest(`v-feature-flipping:class.default="{ key: 'ANY', value: 'XXXXX' }"`)
            expect(vm1.classes()).toContain('XXXXX')

            const vm2 = runTest(`v-feature-flipping:class="{ key: 'ANY', value: 'XXXXX' }"`)
            expect(vm2.classes()).not.toContain('XXXXX')
        })

        it('Should support complex parameter ("v-bind:class" syntax)', () => {
            setEnabledFeatures(['ENABLED'])

            // string
            const vm1 = runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: 'XXXXX' }"`)
            expect(vm1.classes()).toContain('XXXXX')

            // string[]
            const vm2 = runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: [ 'AAAAA', 'BBBBB' ] }"`)
            expect(vm2.classes()).toContain('AAAAA')
            expect(vm2.classes()).toContain('BBBBB')

            // Object.<string,boolean>
            const vm3 = runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: { 'AAAAA': true, 'BBBBB': false } }"`)
            expect(vm3.classes()).toContain('AAAAA')
            expect(vm3.classes()).not.toContain('BBBBB')

            // Array.<string|string[]|Object.<string,boolean>>
            const vm4 = runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: [ 'AAAAA', ['BBBBB'], { 'CCCCC': true } ] }"`)
            expect(vm4.classes()).toContain('AAAAA')
            expect(vm4.classes()).toContain('BBBBB')
            expect(vm4.classes()).toContain('CCCCC')
        })
    })

    describe('style', () => {
        function runTest(directive: string) {
            const vm = mount(
                {template: `<div ${directive}></div>`},
                {global: {plugins: [FeatureFlipping]}})
            return vm
        }

        it('Should append style according to the "isEnabled" result', () => {
            setEnabledFeatures(['ENABLED'])

            const vm1 = runTest(`v-feature-flipping:style="{ key: 'ENABLED', value: { color: 'green', margin: '5px' } }"`)
            expect((vm1.element as HTMLDivElement).style.color).toBe('green')
            expect((vm1.element as HTMLDivElement).style.margin).toBe('5px')

            const vm2 = runTest(`v-feature-flipping:style="{ key: 'DISABLED', value: { display: 'none' } }"`)
            expect((vm2.element as HTMLDivElement).style.display).not.toBe('none')
        })

        it('Should reverse rendering when ".not" modifier', () => {
            setEnabledFeatures(['ENABLED'])

            const vm1 = runTest(`v-feature-flipping:style.not="{ key: 'DISABLED', value: { color: 'green', margin: '5px' } }"`)
            expect((vm1.element as HTMLDivElement).style.color).toBe('green')
            expect((vm1.element as HTMLDivElement).style.margin).toBe('5px')

            const vm2 = runTest(`v-feature-flipping:style.not="{ key: 'ENABLED', value: { display: 'none' } }"`)
            expect((vm2.element as HTMLDivElement).style.display).not.toBe('none')
        })

        it('Should render when ".default" modifier', () => {
            setEnabledFeatures(null)

            const vm1 = runTest(`v-feature-flipping:style.default="{ key: 'ANY', value: { color: 'green', margin: '5px' } }"`)
            expect((vm1.element as HTMLDivElement).style.color).toBe('green')
            expect((vm1.element as HTMLDivElement).style.margin).toBe('5px')

            const vm2 = runTest(`v-feature-flipping:style="{ key: 'ANY', value: { display: 'none' } }"`)
            expect((vm2.element as HTMLDivElement).style.display).not.toBe('none')
        })

        it('Should support complex parameter ("v-bind:style" syntax)', () => {
            setEnabledFeatures(['ENABLED'])

            // Object.<string,string>
            const vm1 = runTest(`v-feature-flipping:style="{ key: 'ENABLED', value: { color: 'green' } }"`)
            expect((vm1.element as HTMLDivElement).style.color).toBe('green')

            // Array.<Object.<string,string>>
            const vm2 = runTest(`v-feature-flipping:style="{ key: 'ENABLED', value: [{ color: 'green' }, { margin: '5px' }] }"`)
            expect((vm2.element as HTMLDivElement).style.color).toBe('green')
            expect((vm2.element as HTMLDivElement).style.margin).toBe('5px')
        })
    })
})
