const isEnabled = VueFeatureFlipping.isEnabled // import { isEnabled } from 'vue-feature-flipping'
const setEnabledFeatures = VueFeatureFlipping.setEnabledFeatures // import { setEnabledFeatures } from 'vue-feature-flipping'
VueFeatureFlipping = VueFeatureFlipping.default // import VueFeatureFlipping from 'vue-feature-flipping'

// ===== Plugin configuration =====

Vue.use(VueFeatureFlipping)
setEnabledFeatures(['FEAT']) // initial state

// ===== Guard =====

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
    setValue (value) {
      setEnabledFeatures(value)

      // hack for refresh
      this.refresh = false
      Vue.nextTick(() => this.refresh = true)
    },
  },
})
