import { isEnabled } from './service'
import { parseParameter } from './utils'

/**
 * @param {(string|{key: string, default: boolean})} binding.value
 * @example
 * <div v-feature-flipping="'XXXXX'">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX' }">...</div>
 * <div v-feature-flipping="{ key: 'XXXXX', default: true }">...</div>
 */
export async function featureFlippingDirective (el, binding, vnode, oldVnode) {
  let [key, defaut] = parseParameter(binding.value)
  if (!isEnabled(key, defaut)) {
    await vnode.context.$nextTick()
    vnode.elm.remove()
  }
}
