import { createLocalVue } from '@vue/test-utils'
import { createSandbox } from 'sinon'
import VueRouter from 'vue-router'
import FeatureFlipping from '..'
import * as service from '../src/service' // internal

describe('guard', () => {
  const sinon = createSandbox()
  afterEach(() => sinon.restore())

  let localVue
  let router
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter({
      routes: [
        {path: '/', name: 'index', component: {render: () => 'index'}},
        {path: '/stable', name: 'stable', component: {render: () => 'stable'}},
        {path: '/test', name: 'test', component: {render: () => 'test'}, meta: {featureFlipping: 'KEY'}}
      ],
    })

    localVue.use(FeatureFlipping) // define guard
  })

  it('\'meta\' not defined: should accept route', async () => {
    router.push({name: 'stable'})
    await localVue.nextTick()

    expect(router.history.current.path).toEqual('/stable')
  })

  describe('\'meta\' defined: should test using \'isEnabled()\'', () => {
    it('\'enabled\': should accept route', async () => {
      sinon.stub(service, 'isEnabled').withArgs('KEY').returns(true)

      router.push({name: 'test'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/test')
    })

    it('\'not enabled\': should redirect to \'/\'', async () => {
      sinon.stub(service, 'isEnabled').withArgs('KEY').returns(false)

      router.push({name: 'test'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })
  })
})
