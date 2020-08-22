
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Timer.svelte generated by Svelte v3.24.1 */
    const file = "src\\Timer.svelte";

    function create_fragment(ctx) {
    	let div;
    	let p;
    	let t0;
    	let t1_value = /*timeRemaining*/ ctx[0] / 1000 + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text("Time left: ");
    			t1 = text(t1_value);
    			t2 = text("s");
    			attr_dev(p, "class", "svelte-6iqcwd");
    			add_location(p, file, 49, 2, 1049);
    			attr_dev(div, "class", "svelte-6iqcwd");
    			add_location(div, file, 48, 0, 1040);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*timeRemaining*/ 1 && t1_value !== (t1_value = /*timeRemaining*/ ctx[0] / 1000 + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const tenSec = 10000;

    function instance($$self, $$props, $$invalidate) {
    	let { timeFromUser } = $$props;
    	let { incLevel } = $$props;

    	const resetTimer = () => {
    		return timeFromUser * 1000;
    	};

    	let timeRemaining = resetTimer();
    	const audio = new Audio("https://www.soundjay.com/button/beep-01a.mp3");
    	const oneMin = 60 * 1000;

    	const reduceTime = () => {
    		if (timeRemaining == oneMin) {
    			audio.play();
    		}

    		if (timeRemaining > 0 && timeRemaining < tenSec) {
    			audio.play();
    		}

    		if (timeRemaining === 0) {
    			incLevel();
    			$$invalidate(0, timeRemaining = resetTimer());
    			clearInterval(interval);
    			interval = setInterval(reduceTime, 1000);
    		}

    		$$invalidate(0, timeRemaining = Math.max(0, timeRemaining - 1000));
    	};

    	let interval = setInterval(reduceTime, 1000);
    	const writable_props = ["timeFromUser", "incLevel"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Timer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Timer", $$slots, []);

    	$$self.$$set = $$props => {
    		if ("timeFromUser" in $$props) $$invalidate(1, timeFromUser = $$props.timeFromUser);
    		if ("incLevel" in $$props) $$invalidate(2, incLevel = $$props.incLevel);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		timeFromUser,
    		incLevel,
    		resetTimer,
    		timeRemaining,
    		audio,
    		oneMin,
    		tenSec,
    		reduceTime,
    		interval
    	});

    	$$self.$inject_state = $$props => {
    		if ("timeFromUser" in $$props) $$invalidate(1, timeFromUser = $$props.timeFromUser);
    		if ("incLevel" in $$props) $$invalidate(2, incLevel = $$props.incLevel);
    		if ("timeRemaining" in $$props) $$invalidate(0, timeRemaining = $$props.timeRemaining);
    		if ("interval" in $$props) interval = $$props.interval;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [timeRemaining, timeFromUser, incLevel];
    }

    class Timer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { timeFromUser: 1, incLevel: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timer",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*timeFromUser*/ ctx[1] === undefined && !("timeFromUser" in props)) {
    			console.warn("<Timer> was created without expected prop 'timeFromUser'");
    		}

    		if (/*incLevel*/ ctx[2] === undefined && !("incLevel" in props)) {
    			console.warn("<Timer> was created without expected prop 'incLevel'");
    		}
    	}

    	get timeFromUser() {
    		throw new Error("<Timer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set timeFromUser(value) {
    		throw new Error("<Timer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get incLevel() {
    		throw new Error("<Timer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set incLevel(value) {
    		throw new Error("<Timer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\BlindsController\BlindViewer.svelte generated by Svelte v3.24.1 */

    const file$1 = "src\\BlindsController\\BlindViewer.svelte";

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let h30;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let div1;
    	let h31;
    	let t5;
    	let p1;
    	let t6;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Small Blind";
    			t1 = space();
    			p0 = element("p");
    			t2 = text(/*smallBlind*/ ctx[1]);
    			t3 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Big Blind";
    			t5 = space();
    			p1 = element("p");
    			t6 = text(/*bigBlind*/ ctx[0]);
    			add_location(h30, file$1, 21, 4, 370);
    			add_location(p0, file$1, 22, 4, 396);
    			attr_dev(div0, "class", "flexContainer svelte-1raedaf");
    			add_location(div0, file$1, 20, 2, 337);
    			add_location(h31, file$1, 25, 4, 462);
    			add_location(p1, file$1, 26, 4, 486);
    			attr_dev(div1, "class", "flexContainer svelte-1raedaf");
    			add_location(div1, file$1, 24, 2, 429);
    			attr_dev(div2, "class", "mainWrapper svelte-1raedaf");
    			add_location(div2, file$1, 19, 0, 308);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(p0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			append_dev(p1, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*smallBlind*/ 2) set_data_dev(t2, /*smallBlind*/ ctx[1]);
    			if (dirty & /*bigBlind*/ 1) set_data_dev(t6, /*bigBlind*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { bigBlind } = $$props;
    	let { smallBlind } = $$props;
    	const writable_props = ["bigBlind", "smallBlind"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BlindViewer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BlindViewer", $$slots, []);

    	$$self.$$set = $$props => {
    		if ("bigBlind" in $$props) $$invalidate(0, bigBlind = $$props.bigBlind);
    		if ("smallBlind" in $$props) $$invalidate(1, smallBlind = $$props.smallBlind);
    	};

    	$$self.$capture_state = () => ({ bigBlind, smallBlind });

    	$$self.$inject_state = $$props => {
    		if ("bigBlind" in $$props) $$invalidate(0, bigBlind = $$props.bigBlind);
    		if ("smallBlind" in $$props) $$invalidate(1, smallBlind = $$props.smallBlind);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [bigBlind, smallBlind];
    }

    class BlindViewer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { bigBlind: 0, smallBlind: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BlindViewer",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*bigBlind*/ ctx[0] === undefined && !("bigBlind" in props)) {
    			console.warn("<BlindViewer> was created without expected prop 'bigBlind'");
    		}

    		if (/*smallBlind*/ ctx[1] === undefined && !("smallBlind" in props)) {
    			console.warn("<BlindViewer> was created without expected prop 'smallBlind'");
    		}
    	}

    	get bigBlind() {
    		throw new Error("<BlindViewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bigBlind(value) {
    		throw new Error("<BlindViewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get smallBlind() {
    		throw new Error("<BlindViewer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set smallBlind(value) {
    		throw new Error("<BlindViewer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\BlindsController\BlindsController.svelte generated by Svelte v3.24.1 */
    const file$2 = "src\\BlindsController\\BlindsController.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let blindviewer;
    	let current;

    	blindviewer = new BlindViewer({
    			props: {
    				bigBlind,
    				smallBlind: /*smallBlind*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(blindviewer.$$.fragment);
    			add_location(div, file$2, 11, 0, 207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(blindviewer, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(blindviewer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(blindviewer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(blindviewer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { firstBigBlind } = $$props;
    	const smallBlind = firstBigBlind / 2;
    	const writable_props = ["firstBigBlind"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BlindsController> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BlindsController", $$slots, []);

    	$$self.$$set = $$props => {
    		if ("firstBigBlind" in $$props) $$invalidate(1, firstBigBlind = $$props.firstBigBlind);
    	};

    	$$self.$capture_state = () => ({
    		BlindViewer,
    		Timer,
    		firstBigBlind,
    		smallBlind
    	});

    	$$self.$inject_state = $$props => {
    		if ("firstBigBlind" in $$props) $$invalidate(1, firstBigBlind = $$props.firstBigBlind);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [smallBlind, firstBigBlind];
    }

    class BlindsController extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { firstBigBlind: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BlindsController",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*firstBigBlind*/ ctx[1] === undefined && !("firstBigBlind" in props)) {
    			console.warn("<BlindsController> was created without expected prop 'firstBigBlind'");
    		}
    	}

    	get firstBigBlind() {
    		throw new Error("<BlindsController>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set firstBigBlind(value) {
    		throw new Error("<BlindsController>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\BlindsController\NextBlind.svelte generated by Svelte v3.24.1 */

    const file$3 = "src\\BlindsController\\NextBlind.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text("(Next blind level is: ");
    			t1 = text(/*nextSmallBlind*/ ctx[1]);
    			t2 = text("/");
    			t3 = text(/*nextBigBlind*/ ctx[0]);
    			t4 = text(")");
    			attr_dev(p, "class", "svelte-1tsjd56");
    			add_location(p, file$3, 17, 6, 290);
    			attr_dev(div, "class", "mainWrapper svelte-1tsjd56");
    			add_location(div, file$3, 16, 0, 257);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*nextSmallBlind*/ 2) set_data_dev(t1, /*nextSmallBlind*/ ctx[1]);
    			if (dirty & /*nextBigBlind*/ 1) set_data_dev(t3, /*nextBigBlind*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { nextBigBlind } = $$props;
    	let { nextSmallBlind } = $$props;
    	const writable_props = ["nextBigBlind", "nextSmallBlind"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NextBlind> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("NextBlind", $$slots, []);

    	$$self.$$set = $$props => {
    		if ("nextBigBlind" in $$props) $$invalidate(0, nextBigBlind = $$props.nextBigBlind);
    		if ("nextSmallBlind" in $$props) $$invalidate(1, nextSmallBlind = $$props.nextSmallBlind);
    	};

    	$$self.$capture_state = () => ({ nextBigBlind, nextSmallBlind });

    	$$self.$inject_state = $$props => {
    		if ("nextBigBlind" in $$props) $$invalidate(0, nextBigBlind = $$props.nextBigBlind);
    		if ("nextSmallBlind" in $$props) $$invalidate(1, nextSmallBlind = $$props.nextSmallBlind);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nextBigBlind, nextSmallBlind];
    }

    class NextBlind extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { nextBigBlind: 0, nextSmallBlind: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NextBlind",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*nextBigBlind*/ ctx[0] === undefined && !("nextBigBlind" in props)) {
    			console.warn("<NextBlind> was created without expected prop 'nextBigBlind'");
    		}

    		if (/*nextSmallBlind*/ ctx[1] === undefined && !("nextSmallBlind" in props)) {
    			console.warn("<NextBlind> was created without expected prop 'nextSmallBlind'");
    		}
    	}

    	get nextBigBlind() {
    		throw new Error("<NextBlind>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextBigBlind(value) {
    		throw new Error("<NextBlind>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nextSmallBlind() {
    		throw new Error("<NextBlind>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextSmallBlind(value) {
    		throw new Error("<NextBlind>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var data = {
      timePerRound: 5,
      blinds: [10, 20, 30, 40, 50],
      beepSoundUrl: 'https://www.soundjay.com/button/beep-01a.mp3',
    };

    /* src\App.svelte generated by Svelte v3.24.1 */

    const { console: console_1 } = globals;
    const file$4 = "src\\App.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let timer;
    	let t2;
    	let blindviewer;
    	let t3;
    	let nextblind;
    	let current;

    	timer = new Timer({
    			props: {
    				timeFromUser: /*timeFromUser*/ ctx[0],
    				incLevel: /*incLevel*/ ctx[5]
    			},
    			$$inline: true
    		});

    	blindviewer = new BlindViewer({
    			props: {
    				bigBlind: /*bigBlind*/ ctx[1],
    				smallBlind: /*smallBlind*/ ctx[2]
    			},
    			$$inline: true
    		});

    	nextblind = new NextBlind({
    			props: {
    				nextBigBlind: /*nextBigBlind*/ ctx[3],
    				nextSmallBlind: /*nextSmallBlind*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Pokr2kr";
    			t1 = space();
    			create_component(timer.$$.fragment);
    			t2 = space();
    			create_component(blindviewer.$$.fragment);
    			t3 = space();
    			create_component(nextblind.$$.fragment);
    			attr_dev(h1, "class", "svelte-aym1cz");
    			add_location(h1, file$4, 63, 2, 1674);
    			attr_dev(main, "class", "svelte-aym1cz");
    			add_location(main, file$4, 62, 0, 1664);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(timer, main, null);
    			append_dev(main, t2);
    			mount_component(blindviewer, main, null);
    			append_dev(main, t3);
    			mount_component(nextblind, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const timer_changes = {};
    			if (dirty & /*timeFromUser*/ 1) timer_changes.timeFromUser = /*timeFromUser*/ ctx[0];
    			timer.$set(timer_changes);
    			const blindviewer_changes = {};
    			if (dirty & /*bigBlind*/ 2) blindviewer_changes.bigBlind = /*bigBlind*/ ctx[1];
    			if (dirty & /*smallBlind*/ 4) blindviewer_changes.smallBlind = /*smallBlind*/ ctx[2];
    			blindviewer.$set(blindviewer_changes);
    			const nextblind_changes = {};
    			if (dirty & /*nextBigBlind*/ 8) nextblind_changes.nextBigBlind = /*nextBigBlind*/ ctx[3];
    			if (dirty & /*nextSmallBlind*/ 16) nextblind_changes.nextSmallBlind = /*nextSmallBlind*/ ctx[4];
    			nextblind.$set(nextblind_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(timer.$$.fragment, local);
    			transition_in(blindviewer.$$.fragment, local);
    			transition_in(nextblind.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(timer.$$.fragment, local);
    			transition_out(blindviewer.$$.fragment, local);
    			transition_out(nextblind.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(timer);
    			destroy_component(blindviewer);
    			destroy_component(nextblind);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let timeFromUser = data.timePerRound;
    	let index = 0;
    	let bigBlind = data.blinds[index];
    	let smallBlind = bigBlind / 2;
    	let nextBigBlind = data.blinds[index + 1];
    	let nextSmallBlind = nextBigBlind / 2;

    	const incLevel = () => {
    		$$invalidate(6, index++, index);

    		if (index > data.blinds.length - 1) {
    			console.log(`Last blind reached, continuing on ${data.blinds[data.blinds.length - 1]} increments.`, "background:red");
    		}
    	};

    	console.log(data);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		getContext,
    		Timer,
    		BlindsController,
    		BlindViewer,
    		NextBlind,
    		data,
    		timeFromUser,
    		index,
    		bigBlind,
    		smallBlind,
    		nextBigBlind,
    		nextSmallBlind,
    		incLevel
    	});

    	$$self.$inject_state = $$props => {
    		if ("timeFromUser" in $$props) $$invalidate(0, timeFromUser = $$props.timeFromUser);
    		if ("index" in $$props) $$invalidate(6, index = $$props.index);
    		if ("bigBlind" in $$props) $$invalidate(1, bigBlind = $$props.bigBlind);
    		if ("smallBlind" in $$props) $$invalidate(2, smallBlind = $$props.smallBlind);
    		if ("nextBigBlind" in $$props) $$invalidate(3, nextBigBlind = $$props.nextBigBlind);
    		if ("nextSmallBlind" in $$props) $$invalidate(4, nextSmallBlind = $$props.nextSmallBlind);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*index, bigBlind, nextBigBlind*/ 74) {
    			// These react to index increment
    			 {
    				if (index > data.blinds.length - 1) {
    					$$invalidate(1, bigBlind += data.blinds[data.blinds.length - 1]);
    					$$invalidate(3, nextBigBlind += data.blinds[data.blinds.length - 1]);
    				} else {
    					$$invalidate(1, bigBlind = data.blinds[index]);

    					if (index > data.blinds.length - 2) {
    						$$invalidate(3, nextBigBlind += data.blinds[data.blinds.length - 1]);
    					} else {
    						$$invalidate(3, nextBigBlind = data.blinds[index + 1]);
    					}
    				}

    				$$invalidate(2, smallBlind = Math.round(bigBlind / 2));
    				$$invalidate(4, nextSmallBlind = Math.round(nextBigBlind / 2));
    				$$invalidate(0, timeFromUser = data.timePerRound);
    			}
    		}
    	};

    	return [timeFromUser, bigBlind, smallBlind, nextBigBlind, nextSmallBlind, incLevel];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
