


/**
 * Check if item is an object
 * @param {*} item item to check
 * @returns boolean
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * deep merge 2 objects
 * @param {Object} target target Object, gets overridden
 * @param {Object} source source Object, fills target Object and overrides if necessary
 * @returns 
 */
export function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target)) Object.assign(output, { [key]: source[key] });
            else output[key] = mergeDeep(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
        });
    }
    return output;
}