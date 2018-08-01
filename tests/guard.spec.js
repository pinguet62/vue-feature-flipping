import { createLocalVue } from '@vue/test-utils'
import { createSandbox } from 'sinon'
import VueRouter from 'vue-router'
import FeatureFlipping from '../src'
import * as service from '../src/service' // internal

describe('guard', () => {
  const sinon = createSandbox()
  afterEach(() => sinon.restore())

  let isEnabledFn
  beforeEach(() => isEnabledFn = sinon.stub(service, 'isEnabled'))

  let localVue
  let router
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter({
      routes: [
        {path: '/', name: 'index', component: {render: () => 'index'}},
        {path: '/stable', name: 'stable', component: {render: () => 'stable'}},
        {path: '/test', name: 'test', component: {render: () => 'test'}, meta: {featureFlipping: 'KEY'}},
        {path: '/complex', name: 'complex', component: {render: () => 'complex'}, meta: {featureFlipping: {key: 'KEY', default: true}}}
      ],
    })

    localVue.use(FeatureFlipping) // define guard
  })

  it('\'meta\' not defined: should accept route', async () => {
    router.push({name: 'stable'})
    await localVue.nextTick()

    expect(router.history.current.path).toEqual('/stable')
  })

  describe('\'meta\' defined: should test using "isEnabled()"', () => {
    it('\'enabled\': should accept route', async () => {
      isEnabledFn.withArgs('KEY').returns(true)

      router.push({name: 'test'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/test')
    })

    it('\'not enabled\': should redirect to "/"', async () => {
      isEnabledFn.withArgs('KEY').returns(false)

      router.push({name: 'test'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })

    it('Complex object "{key: string, default: boolean}"', async () => {
      let isEnabledSFn = isEnabledFn
        .withArgs('KEY', true) // see routes
        .returns(true)

      router.push({name: 'complex'})
      await localVue.nextTick()

      expect(isEnabledSFn.called).toEqual(true)
    })
  })
})
