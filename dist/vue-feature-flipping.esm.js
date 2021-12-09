var enabledFeatures = [];
function isEnabled(key, defaut) {
    if ( defaut === void 0 ) defaut = false;

    return enabledFeatures === null ? defaut : enabledFeatures.includes(key);
}
function setEnabledFeatures(features) {
    enabledFeatures = features;
}

var featureFlippingDirective = function (el, binding) {
    switch (binding.arg) {
        case 'class':
            return renderClasses(el, binding);
        case 'style':
            return renderStyles(el, binding);
        default:
            return renderDOM(el, binding);
    }
};
function renderDOM(el, binding) {
    var key = binding.value;
    var ref = binding.modifiers;
    var defaut = ref.default;
    var not = ref.not; if ( not === void 0 ) not = false;
    if (not !== !isEnabled(key, defaut)) {
        el.parentElement && el.parentElement.removeChild(el);
    }
}
function renderClasses(el, binding) {
    var ref = binding.value;
    var key = ref.key;
    var value = ref.value;
    var ref$1 = binding.modifiers;
    var defaut = ref$1.default;
    var not = ref$1.not; if ( not === void 0 ) not = false;
    if (not !== isEnabled(key, defaut)) {
        el.className += ' ' + parseClasses(value).join(' ');
    }
}
function parseClasses(value) {
    if (typeof value === 'string') {
        return [value];
    }
    else if (Array.isArray(value)) {
        return value.map(function (it) { return parseClasses(it); })
            .reduce(function (acc, arr) { return acc.concat( arr); }, []); // Array.flat()
    }
    else if (typeof value === 'object') {
        return Object.entries(value)
            .filter(function (ref) {
                var value = ref[1];

                return !!value;
        })
            .map(function (ref) {
                var key = ref[0];

                return key;
        });
    }
    else {
        throw new Error('Invalid parameter type');
    }
}
function renderStyles(el, binding) {
    var ref = binding.value;
    var key = ref.key;
    var value = ref.value;
    var ref$1 = binding.modifiers;
    var defaut = ref$1.default;
    var not = ref$1.not; if ( not === void 0 ) not = false;
    if (not !== isEnabled(key, defaut)) {
        for (var [styleName, styleValue] of Object.entries(parseStyles(value))) {
            el.style.setProperty(styleName, styleValue);
        }
    }
}
function parseStyles(value) {
    if (Array.isArray(value)) {
        return value.map(function (it) { return parseStyles(it); })
            .reduce(function (it, merged) { return Object.assign(merged, it); }, {}); // merge objects
    }
    else if (typeof value === 'object') {
        return value;
    }
    else {
        throw new Error('Invalid parameter type');
    }
}

var featureFlippingGuard = function (to, from, next) {
    if (to.meta.featureFlipping) {
        var ref = to.meta.featureFlipping;
        var key = ref.key;
        var redirect = ref.redirect; if ( redirect === void 0 ) redirect = '/';
        var defaut = ref.default;
        var not = ref.not; if ( not === void 0 ) not = false;
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect);
        }
    }
    return next();
};

var featureFlippingPlugin = {
    install: function install(app) {
        app.directive('feature-flipping', featureFlippingDirective);
        app.mixin({ beforeRouteEnter: featureFlippingGuard });
    }
};

export default featureFlippingPlugin;
export { isEnabled, setEnabledFeatures };
