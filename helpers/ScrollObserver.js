import {flatten} from "https://cdn.jsdelivr.net/gh/JonasStumpf/js_helpers_utils@main/utils/functions.js";

/**
 * ScrollObserver
 * - Observer scroll
 * - add function to be called when scrolled
 * -- start: start of scrolling
 * -- mid: after start and before end of scrolling
 * -- end: end of scrolling
 * -- scroll: all of the above
 */
export default class ScrollObserver {
    defaultOptions = {
        root: window,
        delay: 250
    }

    #handlers = {
        "start": ()=>this.scrollHandler("start"),
        "mid": ()=>this.scrollHandler("mid"),
        "end": ()=>this.scrollHandler("end")
    }
    events = {
        "start": [],
        "mid": [],
        "end": [],
        "scroll": []
    }

    /**
     * constructs & inits ScrollObserver
     * @param {Object} options options
     * @param {Element, window} options.root root to listen for scroll events, default: window
     * @param {Number} options.delay flatten delay, delay for function calls (performance) 
     */
    constructor(options) {
        this.options = {...this.defaultOptions, ...options};
        this.eventHandler = flatten(this.#handlers, this.options.delay);
        this.setScrollPos();
        this.options.root.addEventListener("scroll", this.eventHandler);
        this.scrolling = false;
    }

    /**
     * destroys ScrollObserver
     * - remove scroll EventListener
     * - remove added functions
     */
    destroy() {
        this.options.root.removeEventListener("scroll", this.eventHandler);
        for (const funcs of Object.values(this.events)) {
            funcs = [];
        }
    }

    /**
     * called on scroll, executes functions
     * @param {String} e scroll state: start, mid, end
     */
    scrollHandler(e) {
        const scrollPos = this.getScrollPos();
        const eData = {
            position: scrollPos,
            direction: (scrollPos <= this.scrollPos) ? -1 : 1,
            state: e
        };
        for (const func of [...this.events[e], ...this.events.scroll]) {
            func(eData);
        }
        this.setScrollPos();
    }

    /**
     * sets scroll position
     */
    setScrollPos() {
        this.scrollPos = this.getScrollPos();
    }
    /**
     * @returns scroll position
     */
    getScrollPos() {
        return this.options.root.scrollY;
    }

    /**
     * add callback function
     * @param {String} eventName event name: start, mid, end, scroll
     * @param {Function} func function to add
     */
    on(eventName, func) {
        this.events[eventName].push(func);
    }
    /**
     * remove callback function
     * @param {String} eventName event name: start, mid, end, scroll
     * @param {Function} func function to remove
     */
    remove(eventName, func) {
        const index = this.events[eventName].indexOf(func);
        if (index > -1) this.events[eventName].splice(index, 1);
    }

}