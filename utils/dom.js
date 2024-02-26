
/**
 * get DOMElement
 * @param {Element, String} el DOMElement or query string
 * @returns DOMElement or false
 */
export function getDOMElement(el) {
    if (el instanceof Element) return el;
    try {
        const domEl = document.querySelector(el);
        if (domEl instanceof Element) return domEl;
        else return false;
    } catch (error) {
        return false;
    }
}

/**
 * get DOMElements
 * @param {Array[Element, String], Element, String} els DOMElements or strings
 * @param {Boolean} unique get every element only once, default is true
 * @returns DOMElements or an empty Array
 */
export function getDOMElements(els, unique = true) {
    if (!els.forEach) {
        if (els instanceof Element) return [domEl];
        return document.querySelectorAll(els);
    }
    let domEls = [];
    for (const el of els) {
        if (!(el instanceof Element)) domEls = (unique) ? domEls.concat([...document.querySelectorAll(el)].filter((item)=>domEls.indexOf(item) === -1)) : domEls.concat([...document.querySelectorAll(el)]);
        else if (unique && domEls.indexOf(el) === -1) domEls.push(el);
    }
    return domEls;
}