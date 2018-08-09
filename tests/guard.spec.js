import { createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import FeatureFlipping, { setEnabledFeatures } from '../src'

describe('guard', () => {
  let localVue
  let router
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter({
      routes: [
        {path: '/', name: 'index', component: {render: () => 'index'}},
        {path: '/undefined', name: 'undefined', component: {render: () => 'undefined'}},
        {path: '/simple', name: 'simple', component: {render: () => 'simple'}, meta: {featureFlipping: {key: 'KEY'}}},
        {path: '/not', name: 'not', component: {render: () => 'not'}, meta: {featureFlipping: {key: 'KEY', not: true}}},
        {path: '/default', name: 'default', component: {render: () => 'default'}, meta: {featureFlipping: {key: 'KEY', default: true}}},
      ],
    })

    localVue.use(FeatureFlipping) // define guard
  })

  it('\'meta\' not defined: should accept route', async () => {
    router.push({name: 'undefined'})
    await localVue.nextTick()

    expect(router.history.current.path).toEqual('/undefined')
  })

  describe('"meta" defined: should test using "isEnabled()"', () => {
    it('When enabled: should accept route', async () => {
      setEnabledFeatures(['KEY'])

      router.push({name: 'simple'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/simple')
    })

    it('When disabled: should redirect to "/"', async () => {
      setEnabledFeatures([])

      router.push({name: 'simple'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })
  })

  describe('Option "not" should reverse result', () => {
    it('When enabled: should redirect to "/"', async () => {
      setEnabledFeatures(['KEY'])

      router.push({name: 'not'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })

    it('When disabled: should accept route', async () => {
      setEnabledFeatures([])

      router.push({name: 'not'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/not')
    })
  })

  describe('Option "default" should be used when uninitialized', () => {
    it('When defined: should accept (or not) routing', async () => {
      setEnabledFeatures(null)

      router.push({name: 'default'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/default')
    })

    it('When not defined: should redirect to "/"', async () => {
      setEnabledFeatures(null)

      router.push({name: 'simple'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })
  })
})
