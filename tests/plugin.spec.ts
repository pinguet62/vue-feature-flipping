import {createApp} from 'vue'
import FeatureFlipping from '../src'

describe('plugin', () => {
    it('Vue.use()', () => {
        const localVue = createApp({})
        localVue.use(FeatureFlipping)
    })
})
