const isEnabled = VueFeatureFlipping.isEnabled // import { isEnabled } from 'vue-feature-flipping'
VueFeatureFlipping = VueFeatureFlipping.default // import VueFeatureFlipping from 'vue-feature-flipping'

let setFeatures // for external update

Vue.use(VueFeatureFlipping, {
  init (consumer) {
    consumer(['FEAT']) // initial state
    setFeatures = consumer // save to play with the lib
  },
})

var vm = new Vue({
  el: '#app',
  data () {
    return {
      featureEnabled: true,
      refresh: true,
    }
  },
  methods: {
    isEnabled,
    setFeatures (value) {
      setFeatures(value)

      // hack for refresh
      this.refresh = false
      Vue.nextTick(() => this.refresh = true)
    },
  },
})
