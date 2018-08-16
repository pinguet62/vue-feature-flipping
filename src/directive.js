import { isEnabled } from './service'

export async function featureFlippingDirective (el, binding, vnode) {
  switch (binding.arg) {
    case 'class':
      await renderClasses(el, binding)
      break
    case 'style':
      await renderStyles(el, binding)
      break
    default:
      await renderDOM(el, binding, vnode)
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
  let key = binding.value
  let {default: defaut, not = false} = binding.modifiers

  if (not ^ !isEnabled(key, defaut)) {
    await vnode.context.$nextTick()
    vnode.elm.remove()
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
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  if (not ^ isEnabled(key, defaut)) {
    el.className += ' ' + parseClasses(value).join(' ')
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
    return value.map(it => parseClasses(it))
      .reduce((acc, arr) => [...acc, ...arr], []) // Array.flat()
  } else if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, value]) => !!value)
      .map(([key,]) => key)
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
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  if (not ^ isEnabled(key, defaut)) {
    for (let [styleName, styleValue] of Object.entries(parseStyles(value))) {
      el.style.setProperty(styleName, styleValue)
    }
  }
}

/**
 * @param {Object.<string,string>|Array.<Object.<string,string>>} value
 * @return {Object.<string,string>}
 */
function parseStyles (value) {
  if (Array.isArray(value)) {
    return value.map(it => parseStyles(it))
      .reduce((it, merged) => Object.assign(merged, it), {}) // merge objects
  } else if (typeof value === 'object') {
    return value
  } else {
    throw new Error('Invalid parameter type')
  }
}
