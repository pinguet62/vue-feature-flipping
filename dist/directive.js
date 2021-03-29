import { nextTick } from 'vue';
import { isEnabled } from './service';
export const featureFlippingDirective = (el, binding, vnode) => {
    switch (binding.arg) {
        case 'class':
            return renderClasses(el, binding);
        case 'style':
            return renderStyles(el, binding);
        default:
            return renderDOM(el, binding, vnode);
    }
};
async function renderDOM(el, binding, vnode) {
    const key = binding.value;
    const { default: defaut, not = false } = binding.modifiers;
    if (not !== !isEnabled(key, defaut)) {
        await nextTick();
        vnode.el && vnode.el.parentElement && vnode.el.parentElement.removeChild(vnode.el);
    }
}
function renderClasses(el, binding) {
    const { key, value } = binding.value;
    const { default: defaut, not = false } = binding.modifiers;
    if (not !== isEnabled(key, defaut)) {
        el.className += ' ' + parseClasses(value).join(' ');
    }
}
function parseClasses(value) {
    if (typeof value === 'string') {
        return [value];
    }
    else if (Array.isArray(value)) {
        return value.map(it => parseClasses(it))
            .reduce((acc, arr) => [...acc, ...arr], []); // Array.flat()
    }
    else if (typeof value === 'object') {
        return Object.entries(value)
            .filter(([, value]) => !!value)
            .map(([key,]) => key);
    }
    else {
        throw new Error('Invalid parameter type');
    }
}
async function renderStyles(el, binding) {
    const { key, value } = binding.value;
    const { default: defaut, not = false } = binding.modifiers;
    if (not !== isEnabled(key, defaut)) {
        for (const [styleName, styleValue] of Object.entries(parseStyles(value))) {
            el.style.setProperty(styleName, styleValue);
        }
    }
}
function parseStyles(value) {
    if (Array.isArray(value)) {
        return value.map(it => parseStyles(it))
            .reduce((it, merged) => Object.assign(merged, it), {}); // merge objects
    }
    else if (typeof value === 'object') {
        return value;
    }
    else {
        throw new Error('Invalid parameter type');
    }
}
//# sourceMappingURL=directive.js.map