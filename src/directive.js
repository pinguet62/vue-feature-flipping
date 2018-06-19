import { isEnabled } from './service'

/**
 * @example
 * <div v-feature-flipping="XXXXX">...</div>
 */
export async function featureFlippingDirective (el, binding, vnode, oldVnode) {
  if (!isEnabled(binding.value)) {
    await vnode.context.$nextTick()
    vnode.elm.remove()
  }
}
