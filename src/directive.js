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
 * @param {{key: string, value: string[]}) binding.value
 * @example
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 * <div v-feature-flipping:class.not="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 * <div v-feature-flipping:class.default="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 */
async function renderClasses (el, binding) {
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  if (not ^ isEnabled(key, defaut)) {
    el.className += ' ' + value.join(' ')
  }
}

/**
 * @param {{key: string, value: Object.<string, string>}) binding.value
 * @example
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style.not="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style.default="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 */
async function renderStyles (el, binding) {
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  if (not ^ isEnabled(key, defaut)) {
    for (let [styleName, styleValue] of Object.entries(value)) {
      el.style.setProperty(styleName, styleValue)
    }
  }
}
