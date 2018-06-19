import { createLocalVue } from '@vue/test-utils'
import FeatureFlipping from '..'

describe('plugin', () => {
  it('Vue.use()', () => {
    const localVue = createLocalVue()
    localVue.use(FeatureFlipping, {
      init (consumer) {
        consumer(['FF1', 'FF2', 'FF3'])
      },
    })
  })
})
