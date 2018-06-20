import { createLocalVue, mount } from '@vue/test-utils'
import { createSandbox } from 'sinon'
import FeatureFlipping from '..'
import * as service from '../src/service' // internal

describe('directive', () => {
  const sinon = createSandbox()
  afterEach(() => sinon.restore())

  let isEnabledFn
  beforeEach(() => isEnabledFn = sinon.stub(service, 'isEnabled'))

  let localVue
  beforeAll(() => {
    localVue = createLocalVue()

    localVue.use(FeatureFlipping) // define directive
  })

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
    isEnabledFn.withArgs('ENABLED').returns(true)
    await runTestAndExpectation(`v-feature-flipping="'ENABLED'"`, true)

    isEnabledFn.withArgs('DISABLED').returns(false)
    await runTestAndExpectation(`v-feature-flipping="'DISABLED'"`, false)
  })

  it('Complex object "{key: string, default: boolean}"', async () => {
    for (let key of ['ENABLED', 'DISABLED']) {
      for (let defaut of [true, false]) {
        for (let display of [true, false]) {
          let isEnabledSFn = isEnabledFn.withArgs(key, defaut).returns(display)
          await runTestAndExpectation(`v-feature-flipping="{ key: '${key}', default: ${defaut.toString()} }"`, display)
          expect(isEnabledSFn.called).toEqual(true)
        }
      }
    }
  })
})
