import { isEnabled } from './service'
import { parseParameter } from './utils'

export async function featureFlippingDirective (el, binding, vnode, oldVnode) {
  switch (binding.arg) {
    case 'class':
      await renderClasses(el, binding, vnode, oldVnode)
      break
    default:
      await renderDOM(el, binding, vnode, oldVnode)
  }
}

/**
 * @param {(string|{key: string, default: boolean})} binding.value
 * @example
 * <div v-feature-flipping="'XXXXX'">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX' }">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX', default: true }">...</div>
 */
async function renderDOM (el, binding, vnode, oldVnode) {
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
async function renderClasses (el, binding, vnode, oldVnode) {
  let {key, value, default: defaut} = binding.value
  if (isEnabled(key, defaut)) {
    el.className += ' ' + value.join(' ')
  }
}
