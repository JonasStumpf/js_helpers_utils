
/**
 * Debounce, execute function on fast repeated calls only once
 * @param {Function} func function to debounce
 * @param {Number} delay debounce delay/wait time
 * @returns debounced function
 */
export function debounce(func, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {func.apply(this, arguments)}, delay);
    }
}

/**
 * Throttle, wait between function execution
 * @param {Function} func function to throttle
 * @param {Number} delay throttle delay/wait time 
 * @returns throttled function
 */
export function throttle(func, delay) {
    let waiting = false;
    return () => {
        if (waiting) return;
        waiting = true;
        func.apply(this, arguments);
        setTimeout(() => {waiting = false}, delay);
    }
}

/**
 * Combination of throttle and debounce
 * waits between function calls and calls function at the end
 * different functions can be called for the start, during the calls, and the end
 * @param {Function, Object} func function or Object with functions: {start, mid, end}
 * @param {Delay} delay flatten delay/wait time
 * @returns flattened function
 */
function flatten(func, delay) {
    let timeout;
    let waiting = false;
    const fallback = (func instanceof Function) ? func : null;
    const funcs = {
        start: func.start || fallback,
        mid: func.mid || fallback,
        end: func.end || fallback
    }
    return () => {
        if (!waiting) {
            if (!timeout) funcs.start?.apply(this, arguments);
            else funcs.mid?.apply(this, arguments);
            waiting = true;
            setTimeout(() => {waiting = false}, delay);
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null;
            funcs.end?.apply(this, arguments);
        }, delay);
    }
}