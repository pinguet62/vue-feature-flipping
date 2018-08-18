const isEnabled = VueFeatureFlipping.isEnabled // import { isEnabled } from 'vue-feature-flipping'
VueFeatureFlipping = VueFeatureFlipping.default // import VueFeatureFlipping from 'vue-feature-flipping'

let setFeatures // for external update

// ===== Plugin configuration =====

Vue.use(VueFeatureFlipping, {
  init (consumer) {
    consumer(['FEAT']) // initial state
    setFeatures = consumer // save to play with the lib
  },
})

// ===== Guard demo =====

const router = new VueRouter({
  routes: [
    {path: '/', component: {template: '<div>You are in "/"</div>'}},
    {path: '/simple', component: {template: '<div>You are in "/simple"</div>'}, meta: {featureFlipping: {key: 'FEAT'}}},
    {path: '/not', component: {template: '<div>You are in "/not"</div>'}, meta: {featureFlipping: {key: 'FEAT', not: true}}},
    {path: '/default', component: {template: '<div>You are in "/default"</div>'}, meta: {featureFlipping: {key: 'FEAT', default: true}}},
  ]
})

// ===== Demo =====

var vm = new Vue({
  el: '#app',
  router,
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
