import {createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import FeatureFlipping, {setEnabledFeatures} from '../../src'

describe('guard', () => {
    let localVue: typeof Vue
    let router: VueRouter
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(VueRouter)
        router = new VueRouter({
            routes: [
                {path: '/', name: 'index', component: {template: ''}},
                {path: '/undefined', name: 'undefined', component: {template: ''}},
                {path: '/simple', name: 'simple', component: {template: ''}, meta: {featureFlipping: {key: 'KEY'}}},
                {path: '/redirect/string', name: 'redirect_string', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', redirect: '/undefined'}}},
                {
                    path: '/redirect/Location',
                    name: 'redirect_Location',
                    component: {template: ''},
                    meta: {featureFlipping: {key: 'KEY', redirect: {name: 'undefined'}}}
                },
                {path: '/not', name: 'not', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', not: true}}},
                {path: '/default', name: 'default', component: {template: ''}, meta: {featureFlipping: {key: 'KEY', default: true}}},
            ],
        })

        localVue.use(FeatureFlipping) // define guard
    })

    it('"meta" not defined: should accept route', async () => {
        await router.push({name: 'undefined'})

        expect((router as any).history.current.path).toEqual('/undefined')
    })

    describe('"meta" defined: should test using "isEnabled()"', () => {
        it('When enabled: should accept route', async () => {
            setEnabledFeatures(['KEY'])

            await router.push({name: 'simple'})

            expect((router as any).history.current.path).toEqual('/simple')
        })

        it('When disabled: should redirect to "/"', async () => {
            setEnabledFeatures([])

            await expect(router.push({name: 'simple'})).rejects.toBeDefined()

            expect((router as any).history.current.path).toEqual('/')
        })
    })

    describe('Option "redirect" should define the target route', () => {
        it('By default should redirect to "/"', async () => {
            setEnabledFeatures([])

            await expect(router.push({name: 'simple'})).rejects.toBeDefined()

            expect((router as any).history.current.path).toEqual('/')
        })

        describe('Should support type "RedirectOption"', () => {
            it('"string"', async () => {
                setEnabledFeatures([])

                await expect(router.push({name: 'redirect_string'})).rejects.toBeDefined()

                expect((router as any).history.current.path).toEqual('/undefined')
            })

            it('"Location"', async () => {
                setEnabledFeatures([])

                await expect(router.push({name: 'redirect_Location'})).rejects.toBeDefined()

                expect((router as any).history.current.path).toEqual('/undefined')
            })
        })
    })

    describe('Option "not" should reverse result', () => {
        it('When enabled: should redirect to "/"', async () => {
            setEnabledFeatures(['KEY'])

            await expect(router.push({name: 'not'})).rejects.toBeDefined()

            expect((router as any).history.current.path).toEqual('/')
        })

        it('When disabled: should accept route', async () => {
            setEnabledFeatures([])

            await router.push({name: 'not'})

            expect((router as any).history.current.path).toEqual('/not')
        })
    })

    describe('Option "default" should be used when uninitialized', () => {
        it('When defined: should accept (or not) routing', async () => {
            setEnabledFeatures(null)

            await router.push({name: 'default'})

            expect((router as any).history.current.path).toEqual('/default')
        })

        it('When not defined: should redirect to "/"', async () => {
            setEnabledFeatures(null)

            await expect(router.push({name: 'simple'})).rejects.toBeDefined()

            expect((router as any).history.current.path).toEqual('/')
        })
    })
})
