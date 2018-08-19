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
        {path: '/', name: 'index', component: {template: ''}},
        {path: '/undefined', name: 'undefined', component: {template: ''}},
        {path: '/simple', name: 'simple', component: {template: ''}, meta: {featureFlipping: {key: 'KEY'}}},
        {path: '/redirect/string', name: 'redirect_string', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', redirect: '/undefined'}}},
        {path: '/redirect/Location', name: 'redirect_Location', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', redirect: {name: 'undefined'}}}},
        {path: '/not', name: 'not', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', not: true}}},
        {path: '/default', name: 'default', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', default: true}}},
      ],
    })

    localVue.use(FeatureFlipping) // define guard
  })

  it('"meta" not defined: should accept route', async () => {
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

  describe('Option "redirect" should define the target route', () => {
    it('By default should redirect to "/"', async () => {
      setEnabledFeatures([])

      router.push({name: 'simple'})
      await localVue.nextTick()

      expect(router.history.current.path).toEqual('/')
    })

    describe('Should support type "RedirectOption"', async () => {
      it('"string"', async () => {
        setEnabledFeatures([])

        router.push({name: 'redirect_string'})
        await localVue.nextTick()

        expect(router.history.current.path).toEqual('/undefined')
      })

      it('"Location"', async () => {
        setEnabledFeatures([])

        router.push({name: 'redirect_Location'})
        await localVue.nextTick()

        expect(router.history.current.path).toEqual('/undefined')
      })
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
