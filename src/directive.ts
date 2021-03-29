import {VNode, nextTick} from 'vue'
import {Directive, DirectiveBinding} from '@vue/runtime-core'
import {isEnabled} from './service'

export const featureFlippingDirective: Directive = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
    switch (binding.arg) {
        case 'class':
            return renderClasses(el, binding)
        case 'style':
            return renderStyles(el, binding)
        default:
            return renderDOM(el, binding, vnode)
    }
}

type Modifiers = { default?: boolean, not?: boolean }

async function renderDOM(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const key = binding.value
    const {default: defaut, not = false} = binding.modifiers as Modifiers

    if (not !== !isEnabled(key, defaut)) {
        await nextTick()
        vnode.el && vnode.el.parentElement && vnode.el.parentElement.removeChild(vnode.el)
    }
}

function renderClasses(el: HTMLElement, binding: DirectiveBinding) {
    const {key, value} = binding.value as DirectiveClass
    const {default: defaut, not = false} = binding.modifiers as Modifiers

    if (not !== isEnabled(key, defaut)) {
        el.className += ' ' + parseClasses(value).join(' ')
    }
}

type DirectiveClass = { key: string, value: VueClass }
type VueClass = VueClassItem | VueClassItem[]
type VueClassItem = VueClassString | VueClassDictionary
type VueClassString = string
type VueClassDictionary = { [key: string]: boolean }

function parseClasses(value: VueClass): VueClassItem[] {
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

async function renderStyles(el: HTMLElement, binding: DirectiveBinding) {
    const {key, value} = binding.value as DirectiveStyle
    const {default: defaut, not = false} = binding.modifiers as Modifiers

    if (not !== isEnabled(key, defaut)) {
        for (const [styleName, styleValue] of Object.entries(parseStyles(value))) {
            el.style.setProperty(styleName, styleValue)
        }
    }
}

type DirectiveStyle = { key: string, value: VueStyle }
type VueStyle = VueStyleItem | VueStyleItem[]
type VueStyleItem = VueStyleString | VueStyleDictionary
type VueStyleString = string
type VueStyleDictionary = { [key: string]: any }

function parseStyles(value: VueStyle): VueStyleDictionary {
    if (Array.isArray(value)) {
        return value.map(it => parseStyles(it))
            .reduce((it, merged) => Object.assign(merged, it), {}) // merge objects
    } else if (typeof value === 'object') {
        return value
    } else {
        throw new Error('Invalid parameter type')
    }
}
