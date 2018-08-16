import { createLocalVue, mount } from '@vue/test-utils'
import FeatureFlipping, { setEnabledFeatures } from '../src'

describe('directive', () => {
  let localVue
  beforeAll(() => {
    localVue = createLocalVue()

    localVue.use(FeatureFlipping) // define directive
  })

  describe('render', () => {
    /**
     * @param {string} directive
     * @param {boolean} shouldRender
     */
    async function runTestAndExpectation (directive, shouldRender) {
      const DOM = 'content'

      const vm = mount(
        {template: `<div><span ${directive}> ${DOM} </span></div>`},
        {localVue}
      )
      await localVue.nextTick()

      if (shouldRender) {
        expect(vm.html()).toContain(DOM)
      } else {
        expect(vm.html()).not.toContain(DOM)
      }
    }

    it('Should render DOM according to the "isEnabled" result', async () => {
      setEnabledFeatures(['ENABLED'])

      await runTestAndExpectation(`v-feature-flipping="'ENABLED'"`, true)
      await runTestAndExpectation(`v-feature-flipping="'DISABLED'"`, false)
    })

    it('Should reverse rendering when ".not" modifier', async () => {
      setEnabledFeatures(['ENABLED'])

      await runTestAndExpectation(`v-feature-flipping.not="'ENABLED'"`, false)
      await runTestAndExpectation(`v-feature-flipping.not="'DISABLED'"`, true)
    })

    it('Should render when ".default" modifier', async () => {
      setEnabledFeatures(null)

      await runTestAndExpectation(`v-feature-flipping="'ANY'"`, false)
      await runTestAndExpectation(`v-feature-flipping.default="'ANY'"`, true)
    })
  })

  describe('class', () => {
    async function runTest (directive) {
      const vm = mount(
        {template: `<div ${directive}></div>`},
        {localVue}
      )
      await localVue.nextTick()
      return vm
    }

    it('Should append class according to the "isEnabled" result', async () => {
      setEnabledFeatures(['ENABLED'])

      let vm1 = await runTest(`v-feature-flipping:class="{ key: 'ENABLED', value: 'XXXXX' }"`)
      expect(vm1.classes()).toContain('XXXXX')

      let vm2 = await runTest(`v-feature-flipping:class="{ key: 'DISABLED', value: ['XXXXX'] }"`)
      expect(vm2.classes()).not.toContain('XXXXX')
    })

    it('Should reverse rendering when ".not" modifier', async () => {
      setEnabledFeatures(['ENABLED'])

      let vm1 = await runTest(`v-feature-flipping:class.not="{ key: 'DISABLED', value: 'XXXXX' }"`)
      expect(vm1.classes()).toContain('XXXXX')

      let vm2 = await runTest(`v-feature-flipping:class.not="{ key: 'ENABLED', value: 'XXXXX' }"`)
      expect(vm2.classes()).not.toContain('XXXXX')
    })

    it('Should render when ".default" modifier', async () => {
      setEnabledFeatures(null)

      let vm1 = await runTest(`v-feature-flipping:class.default="{ key: 'ANY', value: 'XXXXX' }"`)
      expect(vm1.classes()).toContain('XXXXX')

      let vm2 = await runTest(`v-feature-flipping:class="{ key: 'ANY', value: 'XXXXX' }"`)
      expect(vm2.classes()).not.toContain('XXXXX')
    })

    it('Should support complex parameter ("v-bind:class" syntax)', async () => {
      setEnabledFeatures(['ENABLED'])

      // string
      let vm1 = await runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: 'XXXXX' }"`)
      expect(vm1.classes()).toContain('XXXXX')

      // string[]
      let vm2 = await runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: [ 'AAAAA', 'BBBBB' ] }"`)
      expect(vm2.classes()).toContain('AAAAA')
      expect(vm2.classes()).toContain('BBBBB')

      // Object.<string,boolean>
      let vm3 = await runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: { 'AAAAA': true, 'BBBBB': false } }"`)
      expect(vm3.classes()).toContain('AAAAA')
      expect(vm3.classes()).not.toContain('BBBBB')

      // Array.<string|string[]|Object.<string,boolean>>
      let vm4 = await runTest(`v-feature-flipping:class.default="{ key: 'ENABLED', value: [ 'AAAAA', ['BBBBB'], { 'CCCCC': true } ] }"`)
      expect(vm4.classes()).toContain('AAAAA')
      expect(vm4.classes()).toContain('BBBBB')
      expect(vm4.classes()).toContain('CCCCC')
    })
  })

  describe('style', () => {
    async function runTest (directive) {
      const vm = mount(
        {template: `<div ${directive}></div>`},
        {localVue}
      )
      await localVue.nextTick()
      return vm
    }

    it('Should append style according to the "isEnabled" result', async () => {
      setEnabledFeatures(['ENABLED'])

      let vm1 = await runTest(`v-feature-flipping:style="{ key: 'ENABLED', value: { color: 'green', margin: '5px' } }"`)
      expect(vm1.element.style.color).toBe('green')
      expect(vm1.element.style.margin).toBe('5px')

      let vm2 = await runTest(`v-feature-flipping:style="{ key: 'DISABLED', value: { display: 'none' } }"`)
      expect(vm2.element.style.display).not.toBe('none')
    })

    it('Should reverse rendering when ".not" modifier', async () => {
      setEnabledFeatures(['ENABLED'])

      let vm1 = await runTest(`v-feature-flipping:style.not="{ key: 'DISABLED', value: { color: 'green', margin: '5px' } }"`)
      expect(vm1.element.style.color).toBe('green')
      expect(vm1.element.style.margin).toBe('5px')

      let vm2 = await runTest(`v-feature-flipping:style.not="{ key: 'ENABLED', value: { display: 'none' } }"`)
      expect(vm2.element.style.display).not.toBe('none')
    })

    it('Should render when ".default" modifier', async () => {
      setEnabledFeatures(null)

      let vm1 = await runTest(`v-feature-flipping:style.default="{ key: 'ANY', value: { color: 'green', margin: '5px' } }"`)
      expect(vm1.element.style.color).toBe('green')
      expect(vm1.element.style.margin).toBe('5px')

      let vm2 = await runTest(`v-feature-flipping:style="{ key: 'ANY', value: { display: 'none' } }"`)
      expect(vm2.element.style.display).not.toBe('none')
    })
  })
})
