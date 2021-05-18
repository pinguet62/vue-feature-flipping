const { createApp, nextTick } = Vue // import { createApp } from 'vue'
const { createRouter, createWebHistory } = VueRouter // import { createRouter, createWebHistory } from 'vue-router'
const { isEnabled, setEnabledFeatures } = VueFeatureFlipping // import { isEnabled, setEnabledFeatures } from 'vue-feature-flipping'
VueFeatureFlipping = VueFeatureFlipping.default // import VueFeatureFlipping from 'vue-feature-flipping'

// ===== Guard =====

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: {template: '<div>You are in "/"</div>'}},
    {path: '/simple', component: {template: '<div>You are in "/simple"</div>'}, meta: {featureFlipping: {key: 'FEAT'}}},
    {path: '/not', component: {template: '<div>You are in "/not"</div>'}, meta: {featureFlipping: {key: 'FEAT', not: true}}},
    {path: '/default', component: {template: '<div>You are in "/default"</div>'}, meta: {featureFlipping: {key: 'FEAT', default: true}}},
  ]
})

// ===== Demo =====

const App = {
  template: document.getElementById("template").outerHTML,
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
      nextTick(() => this.refresh = true)
    },
  },
}

// ===== App configuration =====

createApp(App)
  .use(router)
  .use(VueFeatureFlipping)
  .mount('#app')

// ===== Plugin configuration =====

setEnabledFeatures(['FEAT']) // initial state
