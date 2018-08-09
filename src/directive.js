import { isEnabled } from './service'
import { parseParameter } from './utils'

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
 * @param {(string|{key: string, default: boolean})} binding.value
 * @example
 * <div v-feature-flipping="'XXXXX'">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX' }">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX', default: true }">...</div>
 */
async function renderDOM (el, binding, vnode) {
  let [key, defaut] = parseParameter(binding.value)
  if (!isEnabled(key, defaut)) {
    await vnode.context.$nextTick()
    vnode.elm.remove()
  }
}

/**
 * @param {{key: string, value: string[], default: boolean}) binding.value
 * @example
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', class2'], default: true }">...</div>
 */
async function renderClasses (el, binding) {
  let {key, value, default: defaut} = binding.value
  if (isEnabled(key, defaut)) {
    el.className += ' ' + value.join(' ')
  }
}

/**
 * @param {{key: string, value: Object.<string, string>, default: boolean}) binding.value
 * @example
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' }, default: true }">...</div>
 */
async function renderStyles (el, binding) {
  let {key, value, default: defaut} = binding.value
  if (isEnabled(key, defaut)) {
    for (let [styleName, styleValue] of Object.entries(value)) {
      el.style.setProperty(styleName, styleValue)
    }
  }
}
