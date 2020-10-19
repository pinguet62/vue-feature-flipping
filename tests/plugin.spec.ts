import {createLocalVue} from '@vue/test-utils'
import FeatureFlipping from '../src'

describe('plugin', () => {
    it('Vue.use()', () => {
        const localVue = createLocalVue()
        localVue.use(FeatureFlipping)
    })
})
