var enabledFeatures = [];

/**
 * @param {string} key
 * @param {boolean} [defaut=false] The value to return when `false` if plugin not initialized (list is `null`)
 * @return {boolean} `true` or `false` if feature `key` is enabled (inside list of enabled features)
 * @example
 * import { isEnabled } from 'vue-feature-flipping'
 * function sample() {
 *     if (isEnabled('XXXXX')) {
 *         console.log('...')
 *     }
 * }
 */
function isEnabled (key, defaut) {
  if ( defaut === void 0 ) defaut = false;

  return enabledFeatures === null ? defaut : enabledFeatures.includes(key)
}

/**
 * @param {Array.string|null} features
 */
function setEnabledFeatures (features) {
  enabledFeatures = features;
}

async function featureFlippingDirective (el, binding, vnode) {
  switch (binding.arg) {
    case 'class':
      await renderClasses(el, binding);
      break
    case 'style':
      await renderStyles(el, binding);
      break
    default:
      await renderDOM(el, binding, vnode);
  }
}

/**
 * @param {string} binding.value
 * @example
 * <div v-feature-flipping="'XXXXX'">...</div>
 * <div v-feature-flipping.not="'XXXXX'">...</div>
 * <div v-feature-flipping.default="'XXXXX'">...</div>
 */
async function renderDOM (el, binding, vnode) {
  var key = binding.value;
  var ref = binding.modifiers;
  var defaut = ref.default;
  var not = ref.not; if ( not === void 0 ) not = false;

  if (not ^ !isEnabled(key, defaut)) {
    await vnode.context.$nextTick();
    vnode.elm.remove();
  }
}

/**
 * @param {{key: string, value: *}) binding.value
 * @example
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: 'class1' }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: { class1: active1 } }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', ['class2'], { class3: active3 }] }">...</div>
 * <div v-feature-flipping:class.not="{ key: 'XXXXX', value: 'class1' }">...</div>
 * <div v-feature-flipping:class.default="{ key: 'XXXXX', value: 'class1' }">...</div>
 */
async function renderClasses (el, binding) {
  var ref = binding.value;
  var key = ref.key;
  var value = ref.value;
  var ref$1 = binding.modifiers;
  var defaut = ref$1.default;
  var not = ref$1.not; if ( not === void 0 ) not = false;

  if (not ^ isEnabled(key, defaut)) {
    el.className += ' ' + parseClasses(value).join(' ');
  }
}

/**
 * @param {string|string[]|Array.<string|string[]|Object.<string,boolean>>} value
 * @return {string[]}
 */
function parseClasses (value) {
  if (typeof value === 'string') {
    return [value]
  } else if (Array.isArray(value)) {
    return value.map(function (it) { return parseClasses(it); })
      .reduce(function (acc, arr) { return acc.concat( arr); }, []) // Array.flat()
  } else if (typeof value === 'object') {
    return Object.entries(value)
      .filter(function (ref) {
        var value = ref[1];

        return !!value;
    })
      .map(function (ref) {
        var key = ref[0];

        return key;
    })
  } else {
    throw new Error('Invalid parameter type')
  }
}

/**
 * @param {{key: string, value: Object.<string, string>}) binding.value
 * @example
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: [{ style1: 'value1' }, { style2: 'value2' }] }">...</div>
 * <div v-feature-flipping:style.not="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style.default="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 */
async function renderStyles (el, binding) {
  var ref = binding.value;
  var key = ref.key;
  var value = ref.value;
  var ref$1 = binding.modifiers;
  var defaut = ref$1.default;
  var not = ref$1.not; if ( not === void 0 ) not = false;

  if (not ^ isEnabled(key, defaut)) {
    for (var [styleName, styleValue] of Object.entries(parseStyles(value))) {
      el.style.setProperty(styleName, styleValue);
    }
  }
}

/**
 * @param {Object.<string,string>|Array.<Object.<string,string>>} value
 * @return {Object.<string,string>}
 */
function parseStyles (value) {
  if (Array.isArray(value)) {
    return value.map(function (it) { return parseStyles(it); })
      .reduce(function (it, merged) { return Object.assign(merged, it); }, {}) // merge objects
  } else if (typeof value === 'object') {
    return value
  } else {
    throw new Error('Invalid parameter type')
  }
}

/**
 * @example
 * const router = new VueRouter({
 *     routes: [
 *         { path: '/test1', component: Test1Component, meta: { featureFlipping: { key: 'XXXXX' } } },
 *         { path: '/test2', component: Test2Component, meta: { featureFlipping: { key: 'XXXXX', redirect: '/error' } } },
 *         { path: '/test3', component: Test3Component, meta: { featureFlipping: { key: 'XXXXX', not: true } } },
 *         { path: '/test4', component: Test4Component, meta: { featureFlipping: { key: 'XXXXX', default: true } } },
 *     ]
 * })
 */
async function featureFlippingGuard (to, from, next) {
  if (to.meta.featureFlipping) {
    var ref = to.meta.featureFlipping;
    var key = ref.key;
    var redirect = ref.redirect; if ( redirect === void 0 ) redirect = '/';
    var defaut = ref.default;
    var not = ref.not;
    if (not ^ !isEnabled(key, defaut)) {
      return next(redirect)
    }
  }
  return next()
}

/**
 * @example
 * import Vue from 'vue'
 * import FeatureFlipping from './feature-flipping'
 * Vue.use(FeatureFlipping, {
 *     init: (consumer) => consumer(['FF1', 'FF2', 'FF3'])
 * })
 */
function featureFlippingPluginInstall (vue, options) {
  options && options.init && options.init(function (it) { return setEnabledFeatures(it); });
  vue.directive('feature-flipping', featureFlippingDirective);
  vue.mixin({beforeRouteEnter: featureFlippingGuard});
}

export default featureFlippingPluginInstall;
export { isEnabled, setEnabledFeatures };
