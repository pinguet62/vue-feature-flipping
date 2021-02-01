var enabledFeatures = [];
function isEnabled(key, defaut) {
    if (defaut === void 0) { defaut = false; }
    return enabledFeatures === null ? defaut : enabledFeatures.includes(key);
}
function setEnabledFeatures(features) {
    enabledFeatures = features;
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) { throw t[1]; } return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) { throw new TypeError("Generator is already executing."); }
        while (_) { try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
            if (y = 0, t) { op = [op[0] & 2, t.value]; }
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) { _.ops.pop(); }
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; } }
        if (op[0] & 5) { throw op[1]; } return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    var arguments$1 = arguments;

    for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            { r[k] = a[j]; } }
    return r;
};
function featureFlippingDirective(el, binding, vnode) {
    switch (binding.arg) {
        case 'class':
            return renderClasses(el, binding);
        case 'style':
            return renderStyles(el, binding);
        default:
            return renderDOM(el, binding, vnode);
    }
}
function renderDOM(el, binding, vnode) {
    return __awaiter(this, void 0, void 0, function () {
        var key, _a, defaut, _b, not, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    key = binding.value;
                    _a = binding.modifiers, defaut = _a.default, _b = _a.not, not = _b === void 0 ? false : _b;
                    if (!(not !== !isEnabled(key, defaut))) { return [3 /*break*/, 3]; }
                    _c = vnode.context;
                    if (!_c) { return [3 /*break*/, 2]; }
                    return [4 /*yield*/, vnode.context.$nextTick()];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    vnode.elm && vnode.elm.parentElement && vnode.elm.parentElement.removeChild(vnode.elm);
                    _d.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderClasses(el, binding) {
    var _a = binding.value, key = _a.key, value = _a.value;
    var _b = binding.modifiers, defaut = _b.default, _c = _b.not, not = _c === void 0 ? false : _c;
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
            .reduce(function (acc, arr) { return __spreadArrays(acc, arr); }, []); // Array.flat()
    }
    else if (typeof value === 'object') {
        return Object.entries(value)
            .filter(function (_a) {
            var value = _a[1];
            return !!value;
        })
            .map(function (_a) {
            var key = _a[0];
            return key;
        });
    }
    else {
        throw new Error('Invalid parameter type');
    }
}
function renderStyles(el, binding) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, key, value, _b, defaut, _c, not, _i, _d, _e, styleName, styleValue;
        return __generator(this, function (_f) {
            _a = binding.value, key = _a.key, value = _a.value;
            _b = binding.modifiers, defaut = _b.default, _c = _b.not, not = _c === void 0 ? false : _c;
            if (not !== isEnabled(key, defaut)) {
                for (_i = 0, _d = Object.entries(parseStyles(value)); _i < _d.length; _i++) {
                    _e = _d[_i], styleName = _e[0], styleValue = _e[1];
                    el.style.setProperty(styleName, styleValue);
                }
            }
            return [2 /*return*/];
        });
    });
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

function featureFlippingGuard(to, from, next) {
    if (to.meta.featureFlipping) {
        var _a = to.meta.featureFlipping, key = _a.key, _b = _a.redirect, redirect = _b === void 0 ? '/' : _b, defaut = _a.default, _c = _a.not, not = _c === void 0 ? false : _c;
        if (not !== !isEnabled(key, defaut)) {
            return next(redirect);
        }
    }
    return next();
}

function featureFlippingPluginInstall(vue) {
    vue.directive('feature-flipping', featureFlippingDirective);
    vue.mixin({ beforeRouteEnter: featureFlippingGuard });
}

export default featureFlippingPluginInstall;
export { isEnabled, setEnabledFeatures };