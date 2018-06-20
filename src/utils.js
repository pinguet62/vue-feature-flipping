/**
 * @param {(string|{key: string, default: boolean})} obj
 * @return {[string, boolean]}
 * @example
 * parseParameter('XXXXX') // ['XXXXX', undefined]
 * parseParameter({ key: 'XXXXX' }) // ['XXXXX', undefined]
 * parseParameter({ key: 'XXXXX', default: true }) // ['XXXXX', true]
 */
export function parseParameter (obj) {
  if (typeof obj === 'string') {
    return [obj, undefined]
  } else if (obj instanceof Object) {
    return [obj.key, obj.default]
  } else {
    throw TypeError(`Unsupported parameter type: ${typeof obj}`)
  }
}
