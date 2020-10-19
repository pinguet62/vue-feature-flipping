import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { isEnabled } from './service'
import {Dictionary} from "vue-router/types/router";

export async function featureFlippingDirective (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
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
 * @example
 * <div v-feature-flipping="'XXXXX'">...</div>
 * <div v-feature-flipping.not="'XXXXX'">...</div>
 * <div v-feature-flipping.default="'XXXXX'">...</div>
 */
async function renderDOM (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
  let key = binding.value
  let {default: defaut, not = false} = binding.modifiers

  // @ts-ignore
  if (not ^ !isEnabled(key, defaut)) {
    await vnode.context.$nextTick()
    // @ts-ignore
    vnode.elm.remove()
  }
}

/**
 * @example
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: 'class1' }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', class2'] }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: { class1: active1 } }">...</div>
 * <div v-feature-flipping:class="{ key: 'XXXXX', value: ['class1', ['class2'], { class3: active3 }] }">...</div>
 * <div v-feature-flipping:class.not="{ key: 'XXXXX', value: 'class1' }">...</div>
 * <div v-feature-flipping:class.default="{ key: 'XXXXX', value: 'class1' }">...</div>
 */
async function renderClasses (el: HTMLElement, binding: DirectiveBinding) {
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  // @ts-ignore
  if (not ^ isEnabled(key, defaut)) {
    el.className += ' ' + parseClasses(value).join(' ')
  }
}

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
 * @example
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style="{ key: 'XXXXX', value: [{ style1: 'value1' }, { style2: 'value2' }] }">...</div>
 * <div v-feature-flipping:style.not="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 * <div v-feature-flipping:style.default="{ key: 'XXXXX', value: { style1: 'value1', style2: 'value2' } }">...</div>
 */
async function renderStyles (el: HTMLElement, binding: DirectiveBinding) {
  let {key, value} = binding.value
  let {default: defaut, not = false} = binding.modifiers

  // @ts-ignore
  if (not ^ isEnabled(key, defaut)) {
    for (let [styleName, styleValue] of Object.entries(parseStyles(value))) {
      el.style.setProperty(styleName, styleValue)
    }
  }
}

function parseStyles (value: Dictionary<string> | Array<Dictionary<string>>): Dictionary<string> {
  if (Array.isArray(value)) {
    return value.map(it => parseStyles(it))
      .reduce((it, merged) => Object.assign(merged, it), {}) // merge objects
  } else if (typeof value === 'object') {
    return value
  } else {
    throw new Error('Invalid parameter type')
  }
}
