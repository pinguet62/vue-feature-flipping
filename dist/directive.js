import { isEnabled, onFeaturesChanged } from './service';
export const featureFlippingDirective = {
    mounted: (el, binding) => {
        switch (binding.arg) {
            case 'class':
                return renderClasses(el, binding);
            case 'style':
                return renderStyles(el, binding);
            default:
                return renderDOM(el, binding);
        }
    },
    beforeUnmount: (el) => {
        el.unWatch && el.unWatch();
    },
};
function renderDOM(el, binding) {
    const comment = el.ownerDocument.createComment(' ');
    const handleDirective = () => {
        const key = binding.value;
        const { default: defaut, not = false } = binding.modifiers;
        if (not !== !isEnabled(key, defaut)) { // hide
            if (el.parentElement) {
                el.parentElement.replaceChild(comment, el);
            }
        }
        else { // show
            if (comment.parentElement) {
                comment.parentElement.replaceChild(el, comment);
            }
        }
    };
    el.unWatch = onFeaturesChanged(() => handleDirective());
    handleDirective();
}
function renderClasses(el, binding) {
    const { key, value } = binding.value;
    const { default: defaut, not = false } = binding.modifiers;
    const originalClassName = el.className;
    const handleDirective = () => {
        if (not !== !isEnabled(key, defaut)) { // hide
            el.className = originalClassName;
        }
        else { // show
            el.className = originalClassName + ' ' + parseClasses(value).join(' ');
        }
    };
    el.unWatch = onFeaturesChanged(() => handleDirective());
    handleDirective();
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
function renderStyles(el, binding) {
    const { key, value } = binding.value;
    const { default: defaut, not = false } = binding.modifiers;
    const originalStyle = document.defaultView.getComputedStyle(el, "").cssText;
    const handleDirective = () => {
        if (not !== !isEnabled(key, defaut)) { // hide
            el.style.cssText = originalStyle;
        }
        else { // show
            el.style.cssText = originalStyle;
            for (const [styleName, styleValue] of Object.entries(parseStyles(value))) {
                el.style.setProperty(styleName, styleValue);
            }
        }
    };
    el.unWatch = onFeaturesChanged(() => handleDirective());
    handleDirective();
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