import { createLocalVue, mount } from '@vue/test-utils'
import { createSandbox } from 'sinon'
import FeatureFlipping from '..'
import * as service from '../src/service' // internal

describe('directive', () => {
  const sinon = createSandbox()
  afterEach(() => sinon.restore())

  let localVue
  beforeEach(() => {
    localVue = createLocalVue()

    localVue.use(FeatureFlipping) // define directive
  })

  it('Enabled: should render DOM', async () => {
    sinon.stub(service, 'isEnabled').withArgs('KEY').returns(true)

    const vm = mount(
      {template: `<div><span v-feature-flipping="'KEY'">content</span></div>`},
      {localVue}
    )
    await localVue.nextTick()

    expect(vm.html()).toContain('content')
  })

  it('Not enabled: should not render DOM', async () => {
    sinon.stub(service, 'isEnabled').withArgs('KEY').returns(false)

    const vm = mount(
      {template: `<div><span v-feature-flipping="'KEY'">content</span></div>`},
      {localVue}
    )
    await localVue.nextTick()

    expect(vm.html()).not.toContain('content')
  })
})
