!function(a, c) {
    function h(a) {
        var c = Dt[a] = {};
        return ht.each(a.split(yt), function(a, h) {
            c[h] = !0
        }),
        c
    }
    function g(a, h, g) {
        if (g === c && 1 === a.nodeType) {
            var y = "data-" + h.replace(Ht, "-$1").toLowerCase();
            if (g = a.getAttribute(y),
            "string" == typeof g) {
                try {
                    g = "true" === g ? !0 : "false" === g ? !1 : "null" === g ? null : +g + "" === g ? +g : Lt.test(g) ? ht.parseJSON(g) : g
                } catch (e) {}
                ht.data(a, h, g)
            } else
                g = c
        }
        return g
    }
    function y(a) {
        var c;
        for (c in a)
            if (("data" !== c || !ht.isEmptyObject(a[c])) && "toJSON" !== c)
                return !1;
        return !0
    }
    function v() {
        return !1
    }
    function b() {
        return !0
    }
    function w(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }
    function T(a, c) {
        do
            a = a[c];
        while (a && 1 !== a.nodeType);return a
    }
    function N(a, c, h) {
        if (c = c || 0,
        ht.isFunction(c))
            return ht.grep(a, function(a, i) {
                var g = !!c.call(a, i, a);
                return g === h
            });
        if (c.nodeType)
            return ht.grep(a, function(a) {
                return a === c === h
            });
        if ("string" == typeof c) {
            var g = ht.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (Kt.test(c))
                return ht.filter(c, g, !h);
            c = ht.filter(c, g)
        }
        return ht.grep(a, function(a) {
            return ht.inArray(a, c) >= 0 === h
        })
    }
    function C(a) {
        var c = tn.split("|")
          , h = a.createDocumentFragment();
        if (h.createElement)
            for (; c.length; )
                h.createElement(c.pop());
        return h
    }
    function k(a, c) {
        return a.getElementsByTagName(c)[0] || a.appendChild(a.ownerDocument.createElement(c))
    }
    function E(a, c) {
        if (1 === c.nodeType && ht.hasData(a)) {
            var h, i, l, g = ht._data(a), y = ht._data(c, g), v = g.events;
            if (v) {
                delete y.handle,
                y.events = {};
                for (h in v)
                    for (i = 0,
                    l = v[h].length; l > i; i++)
                        ht.event.add(c, h, v[h][i])
            }
            y.data && (y.data = ht.extend({}, y.data))
        }
    }
    function S(a, c) {
        var h;
        1 === c.nodeType && (c.clearAttributes && c.clearAttributes(),
        c.mergeAttributes && c.mergeAttributes(a),
        h = c.nodeName.toLowerCase(),
        "object" === h ? (c.parentNode && (c.outerHTML = a.outerHTML),
        ht.support.html5Clone && a.innerHTML && !ht.trim(c.innerHTML) && (c.innerHTML = a.innerHTML)) : "input" === h && pn.test(a.type) ? (c.defaultChecked = c.checked = a.checked,
        c.value !== a.value && (c.value = a.value)) : "option" === h ? c.selected = a.defaultSelected : "input" === h || "textarea" === h ? c.defaultValue = a.defaultValue : "script" === h && c.text !== a.text && (c.text = a.text),
        c.removeAttribute(ht.expando))
    }
    function A(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }
    function j(a) {
        pn.test(a.type) && (a.defaultChecked = a.checked)
    }
    function D(a, c) {
        if (c in a)
            return c;
        for (var h = c.charAt(0).toUpperCase() + c.slice(1), g = c, i = Mn.length; i--; )
            if (c = Mn[i] + h,
            c in a)
                return c;
        return g
    }
    function L(a, c) {
        return a = c || a,
        "none" === ht.css(a, "display") || !ht.contains(a.ownerDocument, a)
    }
    function H(a, c) {
        for (var h, g, y = [], v = 0, b = a.length; b > v; v++)
            h = a[v],
            h.style && (y[v] = ht._data(h, "olddisplay"),
            c ? (y[v] || "none" !== h.style.display || (h.style.display = ""),
            "" === h.style.display && L(h) && (y[v] = ht._data(h, "olddisplay", _(h.nodeName)))) : (g = bn(h, "display"),
            y[v] || "none" === g || ht._data(h, "olddisplay", g)));
        for (v = 0; b > v; v++)
            h = a[v],
            h.style && (c && "none" !== h.style.display && "" !== h.style.display || (h.style.display = c ? y[v] || "" : "none"));
        return a
    }
    function F(a, c, h) {
        var g = Sn.exec(c);
        return g ? Math.max(0, g[1] - (h || 0)) + (g[2] || "px") : c
    }
    function M(a, c, h, g) {
        for (var i = h === (g ? "border" : "content") ? 4 : "width" === c ? 1 : 0, y = 0; 4 > i; i += 2)
            "margin" === h && (y += ht.css(a, h + Fn[i], !0)),
            g ? ("content" === h && (y -= parseFloat(bn(a, "padding" + Fn[i])) || 0),
            "margin" !== h && (y -= parseFloat(bn(a, "border" + Fn[i] + "Width")) || 0)) : (y += parseFloat(bn(a, "padding" + Fn[i])) || 0,
            "padding" !== h && (y += parseFloat(bn(a, "border" + Fn[i] + "Width")) || 0));
        return y
    }
    function O(a, c, h) {
        var g = "width" === c ? a.offsetWidth : a.offsetHeight
          , y = !0
          , v = ht.support.boxSizing && "border-box" === ht.css(a, "boxSizing");
        if (0 >= g || null == g) {
            if (g = bn(a, c),
            (0 > g || null == g) && (g = a.style[c]),
            An.test(g))
                return g;
            y = v && (ht.support.boxSizingReliable || g === a.style[c]),
            g = parseFloat(g) || 0
        }
        return g + M(a, c, h || (v ? "border" : "content"), y) + "px"
    }
    function _(a) {
        if (Dn[a])
            return Dn[a];
        var c = ht("<" + a + ">").appendTo(nt.body)
          , h = c.css("display");
        return c.remove(),
        ("none" === h || "" === h) && (xn = nt.body.appendChild(xn || ht.extend(nt.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })),
        wn && xn.createElement || (wn = (xn.contentWindow || xn.contentDocument).document,
        wn.write("<!doctype html><html><body>"),
        wn.close()),
        c = wn.body.appendChild(wn.createElement(a)),
        h = bn(c, "display"),
        nt.body.removeChild(xn)),
        Dn[a] = h,
        h
    }
    function B(a, c, h, g) {
        var y;
        if (ht.isArray(c))
            ht.each(c, function(i, c) {
                h || qn.test(a) ? g(a, c) : B(a + "[" + ("object" == typeof c ? i : "") + "]", c, h, g)
            });
        else if (h || "object" !== ht.type(c))
            g(a, c);
        else
            for (y in c)
                B(a + "[" + y + "]", c[y], h, g)
    }
    function W(a) {
        return function(c, h) {
            "string" != typeof c && (h = c,
            c = "*");
            var g, y, v, b = c.toLowerCase().split(yt), i = 0, w = b.length;
            if (ht.isFunction(h))
                for (; w > i; i++)
                    g = b[i],
                    v = /^\+/.test(g),
                    v && (g = g.substr(1) || "*"),
                    y = a[g] = a[g] || [],
                    y[v ? "unshift" : "push"](h)
        }
    }
    function P(a, h, g, y, v, b) {
        v = v || h.dataTypes[0],
        b = b || {},
        b[v] = !0;
        for (var w, T = a[v], i = 0, N = T ? T.length : 0, C = a === Kn; N > i && (C || !w); i++)
            w = T[i](h, g, y),
            "string" == typeof w && (!C || b[w] ? w = c : (h.dataTypes.unshift(w),
            w = P(a, h, g, y, w, b)));
        return !C && w || b["*"] || (w = P(a, h, g, y, "*", b)),
        w
    }
    function R(a, h) {
        var g, y, v = ht.ajaxSettings.flatOptions || {};
        for (g in h)
            h[g] !== c && ((v[g] ? a : y || (y = {}))[g] = h[g]);
        y && ht.extend(!0, a, y)
    }
    function $(s, a, h) {
        var g, y, v, b, w = s.contents, T = s.dataTypes, N = s.responseFields;
        for (y in N)
            y in h && (a[N[y]] = h[y]);
        for (; "*" === T[0]; )
            T.shift(),
            g === c && (g = s.mimeType || a.getResponseHeader("content-type"));
        if (g)
            for (y in w)
                if (w[y] && w[y].test(g)) {
                    T.unshift(y);
                    break
                }
        if (T[0]in h)
            v = T[0];
        else {
            for (y in h) {
                if (!T[0] || s.converters[y + " " + T[0]]) {
                    v = y;
                    break
                }
                b || (b = y)
            }
            v = v || b
        }
        return v ? (v !== T[0] && T.unshift(v),
        h[v]) : void 0
    }
    function I(s, a) {
        var c, h, g, y, v = s.dataTypes.slice(), b = v[0], w = {}, i = 0;
        if (s.dataFilter && (a = s.dataFilter(a, s.dataType)),
        v[1])
            for (c in s.converters)
                w[c.toLowerCase()] = s.converters[c];
        for (; g = v[++i]; )
            if ("*" !== g) {
                if ("*" !== b && b !== g) {
                    if (c = w[b + " " + g] || w["* " + g],
                    !c)
                        for (h in w)
                            if (y = h.split(" "),
                            y[1] === g && (c = w[b + " " + y[0]] || w["* " + y[0]])) {
                                c === !0 ? c = w[h] : w[h] !== !0 && (g = y[0],
                                v.splice(i--, 0, g));
                                break
                            }
                    if (c !== !0)
                        if (c && s["throws"])
                            a = c(a);
                        else
                            try {
                                a = c(a)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: c ? e : "No conversion from " + b + " to " + g
                                }
                            }
                }
                b = g
            }
        return {
            state: "success",
            data: a
        }
    }
    function z() {
        try {
            return new a.XMLHttpRequest
        } catch (e) {}
    }
    function X() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function U() {
        return setTimeout(function() {
            cr = c
        }, 0),
        cr = ht.now()
    }
    function Y(a, c) {
        ht.each(c, function(c, h) {
            for (var g = (mr[c] || []).concat(mr["*"]), y = 0, v = g.length; v > y; y++)
                if (g[y].call(a, c, h))
                    return
        })
    }
    function V(a, c, h) {
        var g, y = 0, v = gr.length, b = ht.Deferred().always(function() {
            delete w.elem
        }), w = function() {
            for (var c = cr || U(), h = Math.max(0, T.startTime + T.duration - c), g = h / T.duration || 0, y = 1 - g, v = 0, w = T.tweens.length; w > v; v++)
                T.tweens[v].run(y);
            return b.notifyWith(a, [T, y, h]),
            1 > y && w ? h : (b.resolveWith(a, [T]),
            !1)
        }, T = b.promise({
            elem: a,
            props: ht.extend({}, c),
            opts: ht.extend(!0, {
                specialEasing: {}
            }, h),
            originalProperties: c,
            originalOptions: h,
            startTime: cr || U(),
            duration: h.duration,
            tweens: [],
            createTween: function(c, h) {
                var g = ht.Tween(a, T.opts, c, h, T.opts.specialEasing[c] || T.opts.easing);
                return T.tweens.push(g),
                g
            },
            stop: function(c) {
                for (var h = 0, g = c ? T.tweens.length : 0; g > h; h++)
                    T.tweens[h].run(1);
                return c ? b.resolveWith(a, [T, c]) : b.rejectWith(a, [T, c]),
                this
            }
        }), N = T.props;
        for (J(N, T.opts.specialEasing); v > y; y++)
            if (g = gr[y].call(T, a, N, T.opts))
                return g;
        return Y(T, N),
        ht.isFunction(T.opts.start) && T.opts.start.call(a, T),
        ht.fx.timer(ht.extend(w, {
            anim: T,
            queue: T.opts.queue,
            elem: a
        })),
        T.progress(T.opts.progress).done(T.opts.done, T.opts.complete).fail(T.opts.fail).always(T.opts.always)
    }
    function J(a, c) {
        var h, g, y, v, b;
        for (h in a)
            if (g = ht.camelCase(h),
            y = c[g],
            v = a[h],
            ht.isArray(v) && (y = v[1],
            v = a[h] = v[0]),
            h !== g && (a[g] = v,
            delete a[h]),
            b = ht.cssHooks[g],
            b && "expand"in b) {
                v = b.expand(v),
                delete a[g];
                for (h in v)
                    h in a || (a[h] = v[h],
                    c[h] = y)
            } else
                c[g] = y
    }
    function G(a, c, h) {
        var g, y, v, b, w, T, N, C, k, E = this, S = a.style, A = {}, j = [], D = a.nodeType && L(a);
        h.queue || (C = ht._queueHooks(a, "fx"),
        null == C.unqueued && (C.unqueued = 0,
        k = C.empty.fire,
        C.empty.fire = function() {
            C.unqueued || k()
        }
        ),
        C.unqueued++,
        E.always(function() {
            E.always(function() {
                C.unqueued--,
                ht.queue(a, "fx").length || C.empty.fire()
            })
        })),
        1 === a.nodeType && ("height"in c || "width"in c) && (h.overflow = [S.overflow, S.overflowX, S.overflowY],
        "inline" === ht.css(a, "display") && "none" === ht.css(a, "float") && (ht.support.inlineBlockNeedsLayout && "inline" !== _(a.nodeName) ? S.zoom = 1 : S.display = "inline-block")),
        h.overflow && (S.overflow = "hidden",
        ht.support.shrinkWrapBlocks || E.done(function() {
            S.overflow = h.overflow[0],
            S.overflowX = h.overflow[1],
            S.overflowY = h.overflow[2]
        }));
        for (g in c)
            if (v = c[g],
            pr.exec(v)) {
                if (delete c[g],
                T = T || "toggle" === v,
                v === (D ? "hide" : "show"))
                    continue;
                j.push(g)
            }
        if (b = j.length) {
            w = ht._data(a, "fxshow") || ht._data(a, "fxshow", {}),
            "hidden"in w && (D = w.hidden),
            T && (w.hidden = !D),
            D ? ht(a).show() : E.done(function() {
                ht(a).hide()
            }),
            E.done(function() {
                var c;
                ht.removeData(a, "fxshow", !0);
                for (c in A)
                    ht.style(a, c, A[c])
            });
            for (g = 0; b > g; g++)
                y = j[g],
                N = E.createTween(y, D ? w[y] : 0),
                A[y] = w[y] || ht.style(a, y),
                y in w || (w[y] = N.start,
                D && (N.end = N.start,
                N.start = "width" === y || "height" === y ? 1 : 0))
        }
    }
    function Q(a, c, h, g, y) {
        return new Q.prototype.init(a,c,h,g,y)
    }
    function K(a, c) {
        var h, g = {
            height: a
        }, i = 0;
        for (c = c ? 1 : 0; 4 > i; i += 2 - c)
            h = Fn[i],
            g["margin" + h] = g["padding" + h] = a;
        return c && (g.opacity = g.width = a),
        g
    }
    function Z(a) {
        return ht.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var et, tt, nt = a.document, it = a.location, ot = a.navigator, at = a.jQuery, st = a.$, lt = Array.prototype.push, ut = Array.prototype.slice, ct = Array.prototype.indexOf, ft = Object.prototype.toString, pt = Object.prototype.hasOwnProperty, dt = String.prototype.trim, ht = function(a, c) {
        return new ht.fn.init(a,c,et)
    }, gt = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, mt = /\S/, yt = /\s+/, vt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, bt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, xt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, wt = /^[\],:{}\s]*$/, Tt = /(?:^|:|,)(?:\s*\[)+/g, Nt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Ct = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, kt = /^-ms-/, Et = /-([\da-z])/gi, St = function(a, c) {
        return (c + "").toUpperCase()
    }, At = function() {
        nt.addEventListener ? (nt.removeEventListener("DOMContentLoaded", At, !1),
        ht.ready()) : "complete" === nt.readyState && (nt.detachEvent("onreadystatechange", At),
        ht.ready())
    }, jt = {};
    ht.fn = ht.prototype = {
        constructor: ht,
        init: function(a, h, g) {
            var y, v, b;
            if (!a)
                return this;
            if (a.nodeType)
                return this.context = this[0] = a,
                this.length = 1,
                this;
            if ("string" == typeof a) {
                if (y = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : bt.exec(a),
                !y || !y[1] && h)
                    return !h || h.jquery ? (h || g).find(a) : this.constructor(h).find(a);
                if (y[1])
                    return h = h instanceof ht ? h[0] : h,
                    b = h && h.nodeType ? h.ownerDocument || h : nt,
                    a = ht.parseHTML(y[1], b, !0),
                    xt.test(y[1]) && ht.isPlainObject(h) && this.attr.call(a, h, !0),
                    ht.merge(this, a);
                if (v = nt.getElementById(y[2]),
                v && v.parentNode) {
                    if (v.id !== y[2])
                        return g.find(a);
                    this.length = 1,
                    this[0] = v
                }
                return this.context = nt,
                this.selector = a,
                this
            }
            return ht.isFunction(a) ? g.ready(a) : (a.selector !== c && (this.selector = a.selector,
            this.context = a.context),
            ht.makeArray(a, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return ut.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a, c, h) {
            var g = ht.merge(this.constructor(), a);
            return g.prevObject = this,
            g.context = this.context,
            "find" === c ? g.selector = this.selector + (this.selector ? " " : "") + h : c && (g.selector = this.selector + "." + c + "(" + h + ")"),
            g
        },
        each: function(a, c) {
            return ht.each(this, a, c)
        },
        ready: function(a) {
            return ht.ready.promise().done(a),
            this
        },
        eq: function(i) {
            return i = +i,
            -1 === i ? this.slice(i) : this.slice(i, i + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(ut.apply(this, arguments), "slice", ut.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(ht.map(this, function(c, i) {
                return a.call(c, i, c)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: lt,
        sort: [].sort,
        splice: [].splice
    },
    ht.fn.init.prototype = ht.fn,
    ht.extend = ht.fn.extend = function() {
        var a, h, g, y, v, b, w = arguments[0] || {}, i = 1, T = arguments.length, N = !1;
        for ("boolean" == typeof w && (N = w,
        w = arguments[1] || {},
        i = 2),
        "object" == typeof w || ht.isFunction(w) || (w = {}),
        T === i && (w = this,
        --i); T > i; i++)
            if (null != (a = arguments[i]))
                for (h in a)
                    g = w[h],
                    y = a[h],
                    w !== y && (N && y && (ht.isPlainObject(y) || (v = ht.isArray(y))) ? (v ? (v = !1,
                    b = g && ht.isArray(g) ? g : []) : b = g && ht.isPlainObject(g) ? g : {},
                    w[h] = ht.extend(N, b, y)) : y !== c && (w[h] = y));
        return w
    }
    ,
    ht.extend({
        noConflict: function(c) {
            return a.$ === ht && (a.$ = st),
            c && a.jQuery === ht && (a.jQuery = at),
            ht
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? ht.readyWait++ : ht.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--ht.readyWait : !ht.isReady) {
                if (!nt.body)
                    return setTimeout(ht.ready, 1);
                ht.isReady = !0,
                a !== !0 && --ht.readyWait > 0 || (tt.resolveWith(nt, [ht]),
                ht.fn.trigger && ht(nt).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === ht.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === ht.type(a)
        }
        ,
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? String(a) : jt[ft.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || "object" !== ht.type(a) || a.nodeType || ht.isWindow(a))
                return !1;
            try {
                if (a.constructor && !pt.call(a, "constructor") && !pt.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (e) {
                return !1
            }
            var h;
            for (h in a)
                ;
            return h === c || pt.call(a, h)
        },
        isEmptyObject: function(a) {
            var c;
            for (c in a)
                return !1;
            return !0
        },
        error: function(a) {
            throw new Error(a)
        },
        parseHTML: function(a, c, h) {
            var g;
            return a && "string" == typeof a ? ("boolean" == typeof c && (h = c,
            c = 0),
            c = c || nt,
            (g = xt.exec(a)) ? [c.createElement(g[1])] : (g = ht.buildFragment([a], c, h ? null : []),
            ht.merge([], (g.cacheable ? ht.clone(g.fragment) : g.fragment).childNodes))) : null
        },
        parseJSON: function(c) {
            return c && "string" == typeof c ? (c = ht.trim(c),
            a.JSON && a.JSON.parse ? a.JSON.parse(c) : wt.test(c.replace(Nt, "@").replace(Ct, "]").replace(Tt, "")) ? new Function("return " + c)() : void ht.error("Invalid JSON: " + c)) : null
        },
        parseXML: function(h) {
            var g, y;
            if (!h || "string" != typeof h)
                return null;
            try {
                a.DOMParser ? (y = new DOMParser,
                g = y.parseFromString(h, "text/xml")) : (g = new ActiveXObject("Microsoft.XMLDOM"),
                g.async = "false",
                g.loadXML(h))
            } catch (e) {
                g = c
            }
            return g && g.documentElement && !g.getElementsByTagName("parsererror").length || ht.error("Invalid XML: " + h),
            g
        },
        noop: function() {},
        globalEval: function(c) {
            c && mt.test(c) && (a.execScript || function(c) {
                a.eval.call(a, c)
            }
            )(c)
        },
        camelCase: function(a) {
            return a.replace(kt, "ms-").replace(Et, St)
        },
        nodeName: function(a, c) {
            return a.nodeName && a.nodeName.toLowerCase() === c.toLowerCase()
        },
        each: function(a, h, g) {
            var y, i = 0, v = a.length, b = v === c || ht.isFunction(a);
            if (g)
                if (b) {
                    for (y in a)
                        if (h.apply(a[y], g) === !1)
                            break
                } else
                    for (; v > i && h.apply(a[i++], g) !== !1; )
                        ;
            else if (b) {
                for (y in a)
                    if (h.call(a[y], y, a[y]) === !1)
                        break
            } else
                for (; v > i && h.call(a[i], i, a[i++]) !== !1; )
                    ;
            return a
        },
        trim: dt && !dt.call("﻿ ") ? function(a) {
            return null == a ? "" : dt.call(a)
        }
        : function(a) {
            return null == a ? "" : (a + "").replace(vt, "")
        }
        ,
        makeArray: function(a, c) {
            var h, g = c || [];
            return null != a && (h = ht.type(a),
            null == a.length || "string" === h || "function" === h || "regexp" === h || ht.isWindow(a) ? lt.call(g, a) : ht.merge(g, a)),
            g
        },
        inArray: function(a, c, i) {
            var h;
            if (c) {
                if (ct)
                    return ct.call(c, a, i);
                for (h = c.length,
                i = i ? 0 > i ? Math.max(0, h + i) : i : 0; h > i; i++)
                    if (i in c && c[i] === a)
                        return i
            }
            return -1
        },
        merge: function(a, h) {
            var l = h.length
              , i = a.length
              , g = 0;
            if ("number" == typeof l)
                for (; l > g; g++)
                    a[i++] = h[g];
            else
                for (; h[g] !== c; )
                    a[i++] = h[g++];
            return a.length = i,
            a
        },
        grep: function(a, c, h) {
            var g, y = [], i = 0, v = a.length;
            for (h = !!h; v > i; i++)
                g = !!c(a[i], i),
                h !== g && y.push(a[i]);
            return y
        },
        map: function(a, h, g) {
            var y, v, b = [], i = 0, w = a.length, T = a instanceof ht || w !== c && "number" == typeof w && (w > 0 && a[0] && a[w - 1] || 0 === w || ht.isArray(a));
            if (T)
                for (; w > i; i++)
                    y = h(a[i], i, g),
                    null != y && (b[b.length] = y);
            else
                for (v in a)
                    y = h(a[v], v, g),
                    null != y && (b[b.length] = y);
            return b.concat.apply([], b)
        },
        guid: 1,
        proxy: function(a, h) {
            var g, y, v;
            return "string" == typeof h && (g = a[h],
            h = a,
            a = g),
            ht.isFunction(a) ? (y = ut.call(arguments, 2),
            v = function() {
                return a.apply(h, y.concat(ut.call(arguments)))
            }
            ,
            v.guid = a.guid = a.guid || ht.guid++,
            v) : c
        },
        access: function(a, h, g, y, v, b, w) {
            var T, N = null == g, i = 0, C = a.length;
            if (g && "object" == typeof g) {
                for (i in g)
                    ht.access(a, h, i, g[i], 1, b, y);
                v = 1
            } else if (y !== c) {
                if (T = w === c && ht.isFunction(y),
                N && (T ? (T = h,
                h = function(a, c, h) {
                    return T.call(ht(a), h)
                }
                ) : (h.call(a, y),
                h = null)),
                h)
                    for (; C > i; i++)
                        h(a[i], g, T ? y.call(a[i], i, h(a[i], g)) : y, w);
                v = 1
            }
            return v ? a : N ? h.call(a) : C ? h(a[0], g) : b
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    ht.ready.promise = function(c) {
        if (!tt)
            if (tt = ht.Deferred(),
            "complete" === nt.readyState)
                setTimeout(ht.ready, 1);
            else if (nt.addEventListener)
                nt.addEventListener("DOMContentLoaded", At, !1),
                a.addEventListener("load", ht.ready, !1);
            else {
                nt.attachEvent("onreadystatechange", At),
                a.attachEvent("onload", ht.ready);
                var h = !1;
                try {
                    h = null == a.frameElement && nt.documentElement
                } catch (e) {}
                h && h.doScroll && !function g() {
                    if (!ht.isReady) {
                        try {
                            h.doScroll("left")
                        } catch (e) {
                            return setTimeout(g, 50)
                        }
                        ht.ready()
                    }
                }()
            }
        return tt.promise(c)
    }
    ,
    ht.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, a) {
        jt["[object " + a + "]"] = a.toLowerCase()
    }),
    et = ht(nt);
    var Dt = {};
    ht.Callbacks = function(a) {
        a = "string" == typeof a ? Dt[a] || h(a) : ht.extend({}, a);
        var g, y, v, b, w, T, N = [], C = !a.once && [], k = function(c) {
            for (g = a.memory && c,
            y = !0,
            T = b || 0,
            b = 0,
            w = N.length,
            v = !0; N && w > T; T++)
                if (N[T].apply(c[0], c[1]) === !1 && a.stopOnFalse) {
                    g = !1;
                    break
                }
            v = !1,
            N && (C ? C.length && k(C.shift()) : g ? N = [] : E.disable())
        }, E = {
            add: function() {
                if (N) {
                    var c = N.length;
                    !function h(c) {
                        ht.each(c, function(c, g) {
                            var y = ht.type(g);
                            "function" === y ? a.unique && E.has(g) || N.push(g) : g && g.length && "string" !== y && h(g)
                        })
                    }(arguments),
                    v ? w = N.length : g && (b = c,
                    k(g))
                }
                return this
            },
            remove: function() {
                return N && ht.each(arguments, function(a, c) {
                    for (var h; (h = ht.inArray(c, N, h)) > -1; )
                        N.splice(h, 1),
                        v && (w >= h && w--,
                        T >= h && T--)
                }),
                this
            },
            has: function(a) {
                return ht.inArray(a, N) > -1
            },
            empty: function() {
                return N = [],
                this
            },
            disable: function() {
                return N = C = g = c,
                this
            },
            disabled: function() {
                return !N
            },
            lock: function() {
                return C = c,
                g || E.disable(),
                this
            },
            locked: function() {
                return !C
            },
            fireWith: function(a, c) {
                return c = c || [],
                c = [a, c.slice ? c.slice() : c],
                !N || y && !C || (v ? C.push(c) : k(c)),
                this
            },
            fire: function() {
                return E.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!y
            }
        };
        return E
    }
    ,
    ht.extend({
        Deferred: function(a) {
            var c = [["resolve", "done", ht.Callbacks("once memory"), "resolved"], ["reject", "fail", ht.Callbacks("once memory"), "rejected"], ["notify", "progress", ht.Callbacks("memory")]]
              , h = "pending"
              , g = {
                state: function() {
                    return h
                },
                always: function() {
                    return y.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return ht.Deferred(function(h) {
                        ht.each(c, function(i, c) {
                            var g = c[0]
                              , v = a[i];
                            y[c[1]](ht.isFunction(v) ? function() {
                                var a = v.apply(this, arguments);
                                a && ht.isFunction(a.promise) ? a.promise().done(h.resolve).fail(h.reject).progress(h.notify) : h[g + "With"](this === y ? h : this, [a])
                            }
                            : h[g])
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? ht.extend(a, g) : g
                }
            }
              , y = {};
            return g.pipe = g.then,
            ht.each(c, function(i, a) {
                var v = a[2]
                  , b = a[3];
                g[a[1]] = v.add,
                b && v.add(function() {
                    h = b
                }, c[1 ^ i][2].disable, c[2][2].lock),
                y[a[0]] = v.fire,
                y[a[0] + "With"] = v.fireWith
            }),
            g.promise(y),
            a && a.call(y, y),
            y
        },
        when: function(a) {
            var c, h, g, i = 0, y = ut.call(arguments), v = y.length, b = 1 !== v || a && ht.isFunction(a.promise) ? v : 0, w = 1 === b ? a : ht.Deferred(), T = function(i, a, h) {
                return function(g) {
                    a[i] = this,
                    h[i] = arguments.length > 1 ? ut.call(arguments) : g,
                    h === c ? w.notifyWith(a, h) : --b || w.resolveWith(a, h)
                }
            };
            if (v > 1)
                for (c = new Array(v),
                h = new Array(v),
                g = new Array(v); v > i; i++)
                    y[i] && ht.isFunction(y[i].promise) ? y[i].promise().done(T(i, g, y)).fail(w.reject).progress(T(i, h, c)) : --b;
            return b || w.resolveWith(g, y),
            w.promise()
        }
    }),
    ht.support = function() {
        var c, h, g, y, v, b, w, T, i, N, C, k = nt.createElement("div");
        if (k.setAttribute("className", "t"),
        k.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        h = k.getElementsByTagName("*"),
        g = k.getElementsByTagName("a")[0],
        !h || !g || !h.length)
            return {};
        y = nt.createElement("select"),
        v = y.appendChild(nt.createElement("option")),
        b = k.getElementsByTagName("input")[0],
        g.style.cssText = "top:1px;float:left;opacity:.5",
        c = {
            leadingWhitespace: 3 === k.firstChild.nodeType,
            tbody: !k.getElementsByTagName("tbody").length,
            htmlSerialize: !!k.getElementsByTagName("link").length,
            style: /top/.test(g.getAttribute("style")),
            hrefNormalized: "/a" === g.getAttribute("href"),
            opacity: /^0.5/.test(g.style.opacity),
            cssFloat: !!g.style.cssFloat,
            checkOn: "on" === b.value,
            optSelected: v.selected,
            getSetAttribute: "t" !== k.className,
            enctype: !!nt.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== nt.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === nt.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        b.checked = !0,
        c.noCloneChecked = b.cloneNode(!0).checked,
        y.disabled = !0,
        c.optDisabled = !v.disabled;
        try {
            delete k.test
        } catch (e) {
            c.deleteExpando = !1
        }
        if (!k.addEventListener && k.attachEvent && k.fireEvent && (k.attachEvent("onclick", C = function() {
            c.noCloneEvent = !1
        }
        ),
        k.cloneNode(!0).fireEvent("onclick"),
        k.detachEvent("onclick", C)),
        b = nt.createElement("input"),
        b.value = "t",
        b.setAttribute("type", "radio"),
        c.radioValue = "t" === b.value,
        b.setAttribute("checked", "checked"),
        b.setAttribute("name", "t"),
        k.appendChild(b),
        w = nt.createDocumentFragment(),
        w.appendChild(k.lastChild),
        c.checkClone = w.cloneNode(!0).cloneNode(!0).lastChild.checked,
        c.appendChecked = b.checked,
        w.removeChild(b),
        w.appendChild(k),
        k.attachEvent)
            for (i in {
                submit: !0,
                change: !0,
                focusin: !0
            })
                T = "on" + i,
                N = T in k,
                N || (k.setAttribute(T, "return;"),
                N = "function" == typeof k[T]),
                c[i + "Bubbles"] = N;
        return ht(function() {
            var h, g, y, v, b = "padding:0;margin:0;border:0;display:block;overflow:hidden;", w = nt.getElementsByTagName("body")[0];
            w && (h = nt.createElement("div"),
            h.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            w.insertBefore(h, w.firstChild),
            g = nt.createElement("div"),
            h.appendChild(g),
            g.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            y = g.getElementsByTagName("td"),
            y[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            N = 0 === y[0].offsetHeight,
            y[0].style.display = "",
            y[1].style.display = "none",
            c.reliableHiddenOffsets = N && 0 === y[0].offsetHeight,
            g.innerHTML = "",
            g.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            c.boxSizing = 4 === g.offsetWidth,
            c.doesNotIncludeMarginInBodyOffset = 1 !== w.offsetTop,
            a.getComputedStyle && (c.pixelPosition = "1%" !== (a.getComputedStyle(g, null) || {}).top,
            c.boxSizingReliable = "4px" === (a.getComputedStyle(g, null) || {
                width: "4px"
            }).width,
            v = nt.createElement("div"),
            v.style.cssText = g.style.cssText = b,
            v.style.marginRight = v.style.width = "0",
            g.style.width = "1px",
            g.appendChild(v),
            c.reliableMarginRight = !parseFloat((a.getComputedStyle(v, null) || {}).marginRight)),
            "undefined" != typeof g.style.zoom && (g.innerHTML = "",
            g.style.cssText = b + "width:1px;padding:1px;display:inline;zoom:1",
            c.inlineBlockNeedsLayout = 3 === g.offsetWidth,
            g.style.display = "block",
            g.style.overflow = "visible",
            g.innerHTML = "<div></div>",
            g.firstChild.style.width = "5px",
            c.shrinkWrapBlocks = 3 !== g.offsetWidth,
            h.style.zoom = 1),
            w.removeChild(h),
            h = g = y = v = null)
        }),
        w.removeChild(k),
        h = g = y = v = b = w = k = null,
        c
    }();
    var Lt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , Ht = /([A-Z])/g;
    ht.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (ht.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? ht.cache[a[ht.expando]] : a[ht.expando],
            !!a && !y(a)
        },
        data: function(a, h, g, y) {
            if (ht.acceptData(a)) {
                var v, b, w = ht.expando, T = "string" == typeof h, N = a.nodeType, C = N ? ht.cache : a, k = N ? a[w] : a[w] && w;
                if (k && C[k] && (y || C[k].data) || !T || g !== c)
                    return k || (N ? a[w] = k = ht.deletedIds.pop() || ht.guid++ : k = w),
                    C[k] || (C[k] = {},
                    N || (C[k].toJSON = ht.noop)),
                    ("object" == typeof h || "function" == typeof h) && (y ? C[k] = ht.extend(C[k], h) : C[k].data = ht.extend(C[k].data, h)),
                    v = C[k],
                    y || (v.data || (v.data = {}),
                    v = v.data),
                    g !== c && (v[ht.camelCase(h)] = g),
                    T ? (b = v[h],
                    null == b && (b = v[ht.camelCase(h)])) : b = v,
                    b
            }
        },
        removeData: function(a, c, h) {
            if (ht.acceptData(a)) {
                var g, i, l, v = a.nodeType, b = v ? ht.cache : a, w = v ? a[ht.expando] : ht.expando;
                if (b[w]) {
                    if (c && (g = h ? b[w] : b[w].data)) {
                        ht.isArray(c) || (c in g ? c = [c] : (c = ht.camelCase(c),
                        c = c in g ? [c] : c.split(" ")));
                        for (i = 0,
                        l = c.length; l > i; i++)
                            delete g[c[i]];
                        if (!(h ? y : ht.isEmptyObject)(g))
                            return
                    }
                    (h || (delete b[w].data,
                    y(b[w]))) && (v ? ht.cleanData([a], !0) : ht.support.deleteExpando || b != b.window ? delete b[w] : b[w] = null)
                }
            }
        },
        _data: function(a, c, h) {
            return ht.data(a, c, h, !0)
        },
        acceptData: function(a) {
            var c = a.nodeName && ht.noData[a.nodeName.toLowerCase()];
            return !c || c !== !0 && a.getAttribute("classid") === c
        }
    }),
    ht.fn.extend({
        data: function(a, h) {
            var y, v, b, w, l, T = this[0], i = 0, N = null;
            if (a === c) {
                if (this.length && (N = ht.data(T),
                1 === T.nodeType && !ht._data(T, "parsedAttrs"))) {
                    for (b = T.attributes,
                    l = b.length; l > i; i++)
                        w = b[i].name,
                        w.indexOf("data-") || (w = ht.camelCase(w.substring(5)),
                        g(T, w, N[w]));
                    ht._data(T, "parsedAttrs", !0)
                }
                return N
            }
            return "object" == typeof a ? this.each(function() {
                ht.data(this, a)
            }) : (y = a.split(".", 2),
            y[1] = y[1] ? "." + y[1] : "",
            v = y[1] + "!",
            ht.access(this, function(h) {
                return h === c ? (N = this.triggerHandler("getData" + v, [y[0]]),
                N === c && T && (N = ht.data(T, a),
                N = g(T, a, N)),
                N === c && y[1] ? this.data(y[0]) : N) : (y[1] = h,
                void this.each(function() {
                    var c = ht(this);
                    c.triggerHandler("setData" + v, y),
                    ht.data(this, a, h),
                    c.triggerHandler("changeData" + v, y)
                }))
            }, null, h, arguments.length > 1, null, !1))
        },
        removeData: function(a) {
            return this.each(function() {
                ht.removeData(this, a)
            })
        }
    }),
    ht.extend({
        queue: function(a, c, h) {
            var g;
            return a ? (c = (c || "fx") + "queue",
            g = ht._data(a, c),
            h && (!g || ht.isArray(h) ? g = ht._data(a, c, ht.makeArray(h)) : g.push(h)),
            g || []) : void 0
        },
        dequeue: function(a, c) {
            c = c || "fx";
            var h = ht.queue(a, c)
              , g = h.length
              , y = h.shift()
              , v = ht._queueHooks(a, c)
              , b = function() {
                ht.dequeue(a, c)
            };
            "inprogress" === y && (y = h.shift(),
            g--),
            y && ("fx" === c && h.unshift("inprogress"),
            delete v.stop,
            y.call(a, b, v)),
            !g && v && v.empty.fire()
        },
        _queueHooks: function(a, c) {
            var h = c + "queueHooks";
            return ht._data(a, h) || ht._data(a, h, {
                empty: ht.Callbacks("once memory").add(function() {
                    ht.removeData(a, c + "queue", !0),
                    ht.removeData(a, h, !0)
                })
            })
        }
    }),
    ht.fn.extend({
        queue: function(a, h) {
            var g = 2;
            return "string" != typeof a && (h = a,
            a = "fx",
            g--),
            arguments.length < g ? ht.queue(this[0], a) : h === c ? this : this.each(function() {
                var c = ht.queue(this, a, h);
                ht._queueHooks(this, a),
                "fx" === a && "inprogress" !== c[0] && ht.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                ht.dequeue(this, a)
            })
        },
        delay: function(a, c) {
            return a = ht.fx ? ht.fx.speeds[a] || a : a,
            c = c || "fx",
            this.queue(c, function(c, h) {
                var g = setTimeout(c, a);
                h.stop = function() {
                    clearTimeout(g)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, h) {
            var g, y = 1, v = ht.Deferred(), b = this, i = this.length, w = function() {
                --y || v.resolveWith(b, [b])
            };
            for ("string" != typeof a && (h = a,
            a = c),
            a = a || "fx"; i--; )
                g = ht._data(b[i], a + "queueHooks"),
                g && g.empty && (y++,
                g.empty.add(w));
            return w(),
            v.promise(h)
        }
    });
    var Ft, Mt, Ot, _t = /[\t\r\n]/g, qt = /\r/g, Bt = /^(?:button|input)$/i, Wt = /^(?:button|input|object|select|textarea)$/i, Pt = /^a(?:rea|)$/i, Rt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, $t = ht.support.getSetAttribute;
    ht.fn.extend({
        attr: function(a, c) {
            return ht.access(this, ht.attr, a, c, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                ht.removeAttr(this, a)
            })
        },
        prop: function(a, c) {
            return ht.access(this, ht.prop, a, c, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = ht.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = c,
                    delete this[a]
                } catch (e) {}
            })
        },
        addClass: function(a) {
            var c, i, l, h, g, y, v;
            if (ht.isFunction(a))
                return this.each(function(c) {
                    ht(this).addClass(a.call(this, c, this.className))
                });
            if (a && "string" == typeof a)
                for (c = a.split(yt),
                i = 0,
                l = this.length; l > i; i++)
                    if (h = this[i],
                    1 === h.nodeType)
                        if (h.className || 1 !== c.length) {
                            for (g = " " + h.className + " ",
                            y = 0,
                            v = c.length; v > y; y++)
                                g.indexOf(" " + c[y] + " ") < 0 && (g += c[y] + " ");
                            h.className = ht.trim(g)
                        } else
                            h.className = a;
            return this
        },
        removeClass: function(a) {
            var h, g, y, v, b, i, l;
            if (ht.isFunction(a))
                return this.each(function(c) {
                    ht(this).removeClass(a.call(this, c, this.className))
                });
            if (a && "string" == typeof a || a === c)
                for (h = (a || "").split(yt),
                i = 0,
                l = this.length; l > i; i++)
                    if (y = this[i],
                    1 === y.nodeType && y.className) {
                        for (g = (" " + y.className + " ").replace(_t, " "),
                        v = 0,
                        b = h.length; b > v; v++)
                            for (; g.indexOf(" " + h[v] + " ") >= 0; )
                                g = g.replace(" " + h[v] + " ", " ");
                        y.className = a ? ht.trim(g) : ""
                    }
            return this
        },
        toggleClass: function(a, c) {
            var h = typeof a
              , g = "boolean" == typeof c;
            return this.each(ht.isFunction(a) ? function(i) {
                ht(this).toggleClass(a.call(this, i, this.className, c), c)
            }
            : function() {
                if ("string" === h)
                    for (var y, i = 0, v = ht(this), b = c, w = a.split(yt); y = w[i++]; )
                        b = g ? b : !v.hasClass(y),
                        v[b ? "addClass" : "removeClass"](y);
                else
                    ("undefined" === h || "boolean" === h) && (this.className && ht._data(this, "__className__", this.className),
                    this.className = this.className || a === !1 ? "" : ht._data(this, "__className__") || "")
            }
            )
        },
        hasClass: function(a) {
            for (var c = " " + a + " ", i = 0, l = this.length; l > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(_t, " ").indexOf(c) >= 0)
                    return !0;
            return !1
        },
        val: function(a) {
            var h, g, y, v = this[0];
            {
                if (arguments.length)
                    return y = ht.isFunction(a),
                    this.each(function(i) {
                        var g, v = ht(this);
                        1 === this.nodeType && (g = y ? a.call(this, i, v.val()) : a,
                        null == g ? g = "" : "number" == typeof g ? g += "" : ht.isArray(g) && (g = ht.map(g, function(a) {
                            return null == a ? "" : a + ""
                        })),
                        h = ht.valHooks[this.type] || ht.valHooks[this.nodeName.toLowerCase()],
                        h && "set"in h && h.set(this, g, "value") !== c || (this.value = g))
                    });
                if (v)
                    return h = ht.valHooks[v.type] || ht.valHooks[v.nodeName.toLowerCase()],
                    h && "get"in h && (g = h.get(v, "value")) !== c ? g : (g = v.value,
                    "string" == typeof g ? g.replace(qt, "") : null == g ? "" : g)
            }
        }
    }),
    ht.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var c = a.attributes.value;
                    return !c || c.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var c, h, g = a.options, y = a.selectedIndex, v = "select-one" === a.type || 0 > y, b = v ? null : [], w = v ? y + 1 : g.length, i = 0 > y ? w : v ? y : 0; w > i; i++)
                        if (h = g[i],
                        !(!h.selected && i !== y || (ht.support.optDisabled ? h.disabled : null !== h.getAttribute("disabled")) || h.parentNode.disabled && ht.nodeName(h.parentNode, "optgroup"))) {
                            if (c = ht(h).val(),
                            v)
                                return c;
                            b.push(c)
                        }
                    return b
                },
                set: function(a, c) {
                    var h = ht.makeArray(c);
                    return ht(a).find("option").each(function() {
                        this.selected = ht.inArray(ht(this).val(), h) >= 0
                    }),
                    h.length || (a.selectedIndex = -1),
                    h
                }
            }
        },
        attrFn: {},
        attr: function(a, h, g, y) {
            var v, b, w, T = a.nodeType;
            if (a && 3 !== T && 8 !== T && 2 !== T)
                return y && ht.isFunction(ht.fn[h]) ? ht(a)[h](g) : "undefined" == typeof a.getAttribute ? ht.prop(a, h, g) : (w = 1 !== T || !ht.isXMLDoc(a),
                w && (h = h.toLowerCase(),
                b = ht.attrHooks[h] || (Rt.test(h) ? Mt : Ft)),
                g !== c ? null === g ? void ht.removeAttr(a, h) : b && "set"in b && w && (v = b.set(a, g, h)) !== c ? v : (a.setAttribute(h, g + ""),
                g) : b && "get"in b && w && null !== (v = b.get(a, h)) ? v : (v = a.getAttribute(h),
                null === v ? c : v))
        },
        removeAttr: function(a, c) {
            var h, g, y, v, i = 0;
            if (c && 1 === a.nodeType)
                for (g = c.split(yt); i < g.length; i++)
                    y = g[i],
                    y && (h = ht.propFix[y] || y,
                    v = Rt.test(y),
                    v || ht.attr(a, y, ""),
                    a.removeAttribute($t ? y : h),
                    v && h in a && (a[h] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, c) {
                    if (Bt.test(a.nodeName) && a.parentNode)
                        ht.error("type property can't be changed");
                    else if (!ht.support.radioValue && "radio" === c && ht.nodeName(a, "input")) {
                        var h = a.value;
                        return a.setAttribute("type", c),
                        h && (a.value = h),
                        c
                    }
                }
            },
            value: {
                get: function(a, c) {
                    return Ft && ht.nodeName(a, "button") ? Ft.get(a, c) : c in a ? a.value : null
                },
                set: function(a, c, h) {
                    return Ft && ht.nodeName(a, "button") ? Ft.set(a, c, h) : void (a.value = c)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, h, g) {
            var y, v, b, w = a.nodeType;
            if (a && 3 !== w && 8 !== w && 2 !== w)
                return b = 1 !== w || !ht.isXMLDoc(a),
                b && (h = ht.propFix[h] || h,
                v = ht.propHooks[h]),
                g !== c ? v && "set"in v && (y = v.set(a, g, h)) !== c ? y : a[h] = g : v && "get"in v && null !== (y = v.get(a, h)) ? y : a[h]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var h = a.getAttributeNode("tabindex");
                    return h && h.specified ? parseInt(h.value, 10) : Wt.test(a.nodeName) || Pt.test(a.nodeName) && a.href ? 0 : c
                }
            }
        }
    }),
    Mt = {
        get: function(a, h) {
            var g, y = ht.prop(a, h);
            return y === !0 || "boolean" != typeof y && (g = a.getAttributeNode(h)) && g.nodeValue !== !1 ? h.toLowerCase() : c
        },
        set: function(a, c, h) {
            var g;
            return c === !1 ? ht.removeAttr(a, h) : (g = ht.propFix[h] || h,
            g in a && (a[g] = !0),
            a.setAttribute(h, h.toLowerCase())),
            h
        }
    },
    $t || (Ot = {
        name: !0,
        id: !0,
        coords: !0
    },
    Ft = ht.valHooks.button = {
        get: function(a, h) {
            var g;
            return g = a.getAttributeNode(h),
            g && (Ot[h] ? "" !== g.value : g.specified) ? g.value : c
        },
        set: function(a, c, h) {
            var g = a.getAttributeNode(h);
            return g || (g = nt.createAttribute(h),
            a.setAttributeNode(g)),
            g.value = c + ""
        }
    },
    ht.each(["width", "height"], function(i, a) {
        ht.attrHooks[a] = ht.extend(ht.attrHooks[a], {
            set: function(c, h) {
                return "" === h ? (c.setAttribute(a, "auto"),
                h) : void 0
            }
        })
    }),
    ht.attrHooks.contenteditable = {
        get: Ft.get,
        set: function(a, c, h) {
            "" === c && (c = "false"),
            Ft.set(a, c, h)
        }
    }),
    ht.support.hrefNormalized || ht.each(["href", "src", "width", "height"], function(i, a) {
        ht.attrHooks[a] = ht.extend(ht.attrHooks[a], {
            get: function(h) {
                var g = h.getAttribute(a, 2);
                return null === g ? c : g
            }
        })
    }),
    ht.support.style || (ht.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || c
        },
        set: function(a, c) {
            return a.style.cssText = c + ""
        }
    }),
    ht.support.optSelected || (ht.propHooks.selected = ht.extend(ht.propHooks.selected, {
        get: function(a) {
            var c = a.parentNode;
            return c && (c.selectedIndex,
            c.parentNode && c.parentNode.selectedIndex),
            null
        }
    })),
    ht.support.enctype || (ht.propFix.enctype = "encoding"),
    ht.support.checkOn || ht.each(["radio", "checkbox"], function() {
        ht.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }),
    ht.each(["radio", "checkbox"], function() {
        ht.valHooks[this] = ht.extend(ht.valHooks[this], {
            set: function(a, c) {
                return ht.isArray(c) ? a.checked = ht.inArray(ht(a).val(), c) >= 0 : void 0
            }
        })
    });
    var It = /^(?:textarea|input|select)$/i
      , zt = /^([^\.]*|)(?:\.(.+)|)$/
      , Xt = /(?:^|\s)hover(\.\S+|)\b/
      , Ut = /^key/
      , Yt = /^(?:mouse|contextmenu)|click/
      , Vt = /^(?:focusinfocus|focusoutblur)$/
      , Jt = function(a) {
        return ht.event.special.hover ? a : a.replace(Xt, "mouseenter$1 mouseleave$1")
    };
    ht.event = {
        add: function(a, h, g, y, v) {
            var b, w, T, t, N, C, k, E, S, A, j;
            if (3 !== a.nodeType && 8 !== a.nodeType && h && g && (b = ht._data(a))) {
                for (g.handler && (S = g,
                g = S.handler,
                v = S.selector),
                g.guid || (g.guid = ht.guid++),
                T = b.events,
                T || (b.events = T = {}),
                w = b.handle,
                w || (b.handle = w = function(e) {
                    return "undefined" == typeof ht || e && ht.event.triggered === e.type ? c : ht.event.dispatch.apply(w.elem, arguments)
                }
                ,
                w.elem = a),
                h = ht.trim(Jt(h)).split(" "),
                t = 0; t < h.length; t++)
                    N = zt.exec(h[t]) || [],
                    C = N[1],
                    k = (N[2] || "").split(".").sort(),
                    j = ht.event.special[C] || {},
                    C = (v ? j.delegateType : j.bindType) || C,
                    j = ht.event.special[C] || {},
                    E = ht.extend({
                        type: C,
                        origType: N[1],
                        data: y,
                        handler: g,
                        guid: g.guid,
                        selector: v,
                        needsContext: v && ht.expr.match.needsContext.test(v),
                        namespace: k.join(".")
                    }, S),
                    A = T[C],
                    A || (A = T[C] = [],
                    A.delegateCount = 0,
                    j.setup && j.setup.call(a, y, k, w) !== !1 || (a.addEventListener ? a.addEventListener(C, w, !1) : a.attachEvent && a.attachEvent("on" + C, w))),
                    j.add && (j.add.call(a, E),
                    E.handler.guid || (E.handler.guid = g.guid)),
                    v ? A.splice(A.delegateCount++, 0, E) : A.push(E),
                    ht.event.global[C] = !0;
                a = null
            }
        },
        global: {},
        remove: function(a, c, h, g, y) {
            var t, v, b, w, T, N, C, k, E, S, A, j = ht.hasData(a) && ht._data(a);
            if (j && (k = j.events)) {
                for (c = ht.trim(Jt(c || "")).split(" "),
                t = 0; t < c.length; t++)
                    if (v = zt.exec(c[t]) || [],
                    b = w = v[1],
                    T = v[2],
                    b) {
                        for (E = ht.event.special[b] || {},
                        b = (g ? E.delegateType : E.bindType) || b,
                        S = k[b] || [],
                        N = S.length,
                        T = T ? new RegExp("(^|\\.)" + T.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        C = 0; C < S.length; C++)
                            A = S[C],
                            !y && w !== A.origType || h && h.guid !== A.guid || T && !T.test(A.namespace) || g && g !== A.selector && ("**" !== g || !A.selector) || (S.splice(C--, 1),
                            A.selector && S.delegateCount--,
                            E.remove && E.remove.call(a, A));
                        0 === S.length && N !== S.length && (E.teardown && E.teardown.call(a, T, j.handle) !== !1 || ht.removeEvent(a, b, j.handle),
                        delete k[b])
                    } else
                        for (b in k)
                            ht.event.remove(a, b + c[t], h, g, !0);
                ht.isEmptyObject(k) && (delete j.handle,
                ht.removeData(a, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(h, g, y, v) {
            if (!y || 3 !== y.nodeType && 8 !== y.nodeType) {
                var b, w, i, T, N, C, k, E, S, A, j = h.type || h, D = [];
                if (!Vt.test(j + ht.event.triggered) && (j.indexOf("!") >= 0 && (j = j.slice(0, -1),
                w = !0),
                j.indexOf(".") >= 0 && (D = j.split("."),
                j = D.shift(),
                D.sort()),
                y && !ht.event.customEvent[j] || ht.event.global[j]))
                    if (h = "object" == typeof h ? h[ht.expando] ? h : new ht.Event(j,h) : new ht.Event(j),
                    h.type = j,
                    h.isTrigger = !0,
                    h.exclusive = w,
                    h.namespace = D.join("."),
                    h.namespace_re = h.namespace ? new RegExp("(^|\\.)" + D.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    C = j.indexOf(":") < 0 ? "on" + j : "",
                    y) {
                        if (h.result = c,
                        h.target || (h.target = y),
                        g = null != g ? ht.makeArray(g) : [],
                        g.unshift(h),
                        k = ht.event.special[j] || {},
                        !k.trigger || k.trigger.apply(y, g) !== !1) {
                            if (S = [[y, k.bindType || j]],
                            !v && !k.noBubble && !ht.isWindow(y)) {
                                for (A = k.delegateType || j,
                                T = Vt.test(A + j) ? y : y.parentNode,
                                N = y; T; T = T.parentNode)
                                    S.push([T, A]),
                                    N = T;
                                N === (y.ownerDocument || nt) && S.push([N.defaultView || N.parentWindow || a, A])
                            }
                            for (i = 0; i < S.length && !h.isPropagationStopped(); i++)
                                T = S[i][0],
                                h.type = S[i][1],
                                E = (ht._data(T, "events") || {})[h.type] && ht._data(T, "handle"),
                                E && E.apply(T, g),
                                E = C && T[C],
                                E && ht.acceptData(T) && E.apply && E.apply(T, g) === !1 && h.preventDefault();
                            return h.type = j,
                            v || h.isDefaultPrevented() || k._default && k._default.apply(y.ownerDocument, g) !== !1 || "click" === j && ht.nodeName(y, "a") || !ht.acceptData(y) || C && y[j] && ("focus" !== j && "blur" !== j || 0 !== h.target.offsetWidth) && !ht.isWindow(y) && (N = y[C],
                            N && (y[C] = null),
                            ht.event.triggered = j,
                            y[j](),
                            ht.event.triggered = c,
                            N && (y[C] = N)),
                            h.result
                        }
                    } else {
                        b = ht.cache;
                        for (i in b)
                            b[i].events && b[i].events[j] && ht.event.trigger(h, g, b[i].handle.elem, !0)
                    }
            }
        },
        dispatch: function(h) {
            h = ht.event.fix(h || a.event);
            var i, g, y, v, b, w, T, N, C, k = (ht._data(this, "events") || {})[h.type] || [], E = k.delegateCount, S = ut.call(arguments), A = !h.exclusive && !h.namespace, j = ht.event.special[h.type] || {}, D = [];
            if (S[0] = h,
            h.delegateTarget = this,
            !j.preDispatch || j.preDispatch.call(this, h) !== !1) {
                if (E && (!h.button || "click" !== h.type))
                    for (y = h.target; y != this; y = y.parentNode || this)
                        if (y.disabled !== !0 || "click" !== h.type) {
                            for (b = {},
                            T = [],
                            i = 0; E > i; i++)
                                N = k[i],
                                C = N.selector,
                                b[C] === c && (b[C] = N.needsContext ? ht(C, this).index(y) >= 0 : ht.find(C, this, null, [y]).length),
                                b[C] && T.push(N);
                            T.length && D.push({
                                elem: y,
                                matches: T
                            })
                        }
                for (k.length > E && D.push({
                    elem: this,
                    matches: k.slice(E)
                }),
                i = 0; i < D.length && !h.isPropagationStopped(); i++)
                    for (w = D[i],
                    h.currentTarget = w.elem,
                    g = 0; g < w.matches.length && !h.isImmediatePropagationStopped(); g++)
                        N = w.matches[g],
                        (A || !h.namespace && !N.namespace || h.namespace_re && h.namespace_re.test(N.namespace)) && (h.data = N.data,
                        h.handleObj = N,
                        v = ((ht.event.special[N.origType] || {}).handle || N.handler).apply(w.elem, S),
                        v !== c && (h.result = v,
                        v === !1 && (h.preventDefault(),
                        h.stopPropagation())));
                return j.postDispatch && j.postDispatch.call(this, h),
                h.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, c) {
                return null == a.which && (a.which = null != c.charCode ? c.charCode : c.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, h) {
                var g, y, v, b = h.button, w = h.fromElement;
                return null == a.pageX && null != h.clientX && (g = a.target.ownerDocument || nt,
                y = g.documentElement,
                v = g.body,
                a.pageX = h.clientX + (y && y.scrollLeft || v && v.scrollLeft || 0) - (y && y.clientLeft || v && v.clientLeft || 0),
                a.pageY = h.clientY + (y && y.scrollTop || v && v.scrollTop || 0) - (y && y.clientTop || v && v.clientTop || 0)),
                !a.relatedTarget && w && (a.relatedTarget = w === a.target ? h.toElement : w),
                a.which || b === c || (a.which = 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[ht.expando])
                return a;
            var i, c, h = a, g = ht.event.fixHooks[a.type] || {}, y = g.props ? this.props.concat(g.props) : this.props;
            for (a = ht.Event(h),
            i = y.length; i; )
                c = y[--i],
                a[c] = h[c];
            return a.target || (a.target = h.srcElement || nt),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            g.filter ? g.filter(a, h) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, c, h) {
                    ht.isWindow(this) && (this.onbeforeunload = h)
                },
                teardown: function(a, c) {
                    this.onbeforeunload === c && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, c, h, g) {
            var e = ht.extend(new ht.Event, h, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            g ? ht.event.trigger(e, null, c) : ht.event.dispatch.call(c, e),
            e.isDefaultPrevented() && h.preventDefault()
        }
    },
    ht.event.handle = ht.event.dispatch,
    ht.removeEvent = nt.removeEventListener ? function(a, c, h) {
        a.removeEventListener && a.removeEventListener(c, h, !1)
    }
    : function(a, c, h) {
        var g = "on" + c;
        a.detachEvent && ("undefined" == typeof a[g] && (a[g] = null),
        a.detachEvent(g, h))
    }
    ,
    ht.Event = function(a, c) {
        return this instanceof ht.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? b : v) : this.type = a,
        c && ht.extend(this, c),
        this.timeStamp = a && a.timeStamp || ht.now(),
        void (this[ht.expando] = !0)) : new ht.Event(a,c)
    }
    ,
    ht.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = b;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = b;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = b,
            this.stopPropagation()
        },
        isDefaultPrevented: v,
        isPropagationStopped: v,
        isImmediatePropagationStopped: v
    },
    ht.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, c) {
        ht.event.special[a] = {
            delegateType: c,
            bindType: c,
            handle: function(a) {
                {
                    var h, g = this, y = a.relatedTarget, v = a.handleObj;
                    v.selector
                }
                return (!y || y !== g && !ht.contains(g, y)) && (a.type = v.origType,
                h = v.handler.apply(this, arguments),
                a.type = c),
                h
            }
        }
    }),
    ht.support.submitBubbles || (ht.event.special.submit = {
        setup: function() {
            return ht.nodeName(this, "form") ? !1 : void ht.event.add(this, "click._submit keypress._submit", function(e) {
                var a = e.target
                  , h = ht.nodeName(a, "input") || ht.nodeName(a, "button") ? a.form : c;
                h && !ht._data(h, "_submit_attached") && (ht.event.add(h, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }),
                ht._data(h, "_submit_attached", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && ht.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return ht.nodeName(this, "form") ? !1 : void ht.event.remove(this, "._submit")
        }
    }),
    ht.support.changeBubbles || (ht.event.special.change = {
        setup: function() {
            return It.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ht.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }),
            ht.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1),
                ht.event.simulate("change", this, a, !0)
            })),
            !1) : void ht.event.add(this, "beforeactivate._change", function(e) {
                var a = e.target;
                It.test(a.nodeName) && !ht._data(a, "_change_attached") && (ht.event.add(a, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || ht.event.simulate("change", this.parentNode, a, !0)
                }),
                ht._data(a, "_change_attached", !0))
            })
        },
        handle: function(a) {
            var c = a.target;
            return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ht.event.remove(this, "._change"),
            !It.test(this.nodeName)
        }
    }),
    ht.support.focusinBubbles || ht.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, c) {
        var h = 0
          , g = function(a) {
            ht.event.simulate(c, a.target, ht.event.fix(a), !0)
        };
        ht.event.special[c] = {
            setup: function() {
                0 === h++ && nt.addEventListener(a, g, !0)
            },
            teardown: function() {
                0 === --h && nt.removeEventListener(a, g, !0)
            }
        }
    }),
    ht.fn.extend({
        on: function(a, h, g, y, b) {
            var w, T;
            if ("object" == typeof a) {
                "string" != typeof h && (g = g || h,
                h = c);
                for (T in a)
                    this.on(T, h, g, a[T], b);
                return this
            }
            if (null == g && null == y ? (y = h,
            g = h = c) : null == y && ("string" == typeof h ? (y = g,
            g = c) : (y = g,
            g = h,
            h = c)),
            y === !1)
                y = v;
            else if (!y)
                return this;
            return 1 === b && (w = y,
            y = function(a) {
                return ht().off(a),
                w.apply(this, arguments)
            }
            ,
            y.guid = w.guid || (w.guid = ht.guid++)),
            this.each(function() {
                ht.event.add(this, a, y, g, h)
            })
        },
        one: function(a, c, h, g) {
            return this.on(a, c, h, g, 1)
        },
        off: function(a, h, g) {
            var y, b;
            if (a && a.preventDefault && a.handleObj)
                return y = a.handleObj,
                ht(a.delegateTarget).off(y.namespace ? y.origType + "." + y.namespace : y.origType, y.selector, y.handler),
                this;
            if ("object" == typeof a) {
                for (b in a)
                    this.off(b, h, a[b]);
                return this
            }
            return (h === !1 || "function" == typeof h) && (g = h,
            h = c),
            g === !1 && (g = v),
            this.each(function() {
                ht.event.remove(this, a, g, h)
            })
        },
        bind: function(a, c, h) {
            return this.on(a, null, c, h)
        },
        unbind: function(a, c) {
            return this.off(a, null, c)
        },
        live: function(a, c, h) {
            return ht(this.context).on(a, this.selector, c, h),
            this
        },
        die: function(a, c) {
            return ht(this.context).off(a, this.selector || "**", c),
            this
        },
        delegate: function(a, c, h, g) {
            return this.on(c, a, h, g)
        },
        undelegate: function(a, c, h) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(c, a || "**", h)
        },
        trigger: function(a, c) {
            return this.each(function() {
                ht.event.trigger(a, c, this)
            })
        },
        triggerHandler: function(a, c) {
            return this[0] ? ht.event.trigger(a, c, this[0], !0) : void 0
        },
        toggle: function(a) {
            var c = arguments
              , h = a.guid || ht.guid++
              , i = 0
              , g = function(h) {
                var g = (ht._data(this, "lastToggle" + a.guid) || 0) % i;
                return ht._data(this, "lastToggle" + a.guid, g + 1),
                h.preventDefault(),
                c[g].apply(this, arguments) || !1
            };
            for (g.guid = h; i < c.length; )
                c[i++].guid = h;
            return this.click(g)
        },
        hover: function(a, c) {
            return this.mouseenter(a).mouseleave(c || a)
        }
    }),
    ht.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, a) {
        ht.fn[a] = function(c, h) {
            return null == h && (h = c,
            c = null),
            arguments.length > 0 ? this.on(a, null, c, h) : this.trigger(a)
        }
        ,
        Ut.test(a) && (ht.event.fixHooks[a] = ht.event.keyHooks),
        Yt.test(a) && (ht.event.fixHooks[a] = ht.event.mouseHooks)
    }),
    function(a, c) {
        function h(a, c, h, g) {
            h = h || [],
            c = c || U;
            var y, v, b, m, w = c.nodeType;
            if (!a || "string" != typeof a)
                return h;
            if (1 !== w && 9 !== w)
                return [];
            if (b = O(c),
            !b && !g && (y = vt.exec(a)))
                if (m = y[1]) {
                    if (9 === w) {
                        if (v = c.getElementById(m),
                        !v || !v.parentNode)
                            return h;
                        if (v.id === m)
                            return h.push(v),
                            h
                    } else if (c.ownerDocument && (v = c.ownerDocument.getElementById(m)) && _(c, v) && v.id === m)
                        return h.push(v),
                        h
                } else {
                    if (y[2])
                        return Q.apply(h, K.call(c.getElementsByTagName(a), 0)),
                        h;
                    if ((m = y[3]) && At && c.getElementsByClassName)
                        return Q.apply(h, K.call(c.getElementsByClassName(m), 0)),
                        h
                }
            return j(a.replace(dt, "$1"), c, h, g, b)
        }
        function g(a) {
            return function(c) {
                var h = c.nodeName.toLowerCase();
                return "input" === h && c.type === a
            }
        }
        function y(a) {
            return function(c) {
                var h = c.nodeName.toLowerCase();
                return ("input" === h || "button" === h) && c.type === a
            }
        }
        function v(a) {
            return et(function(c) {
                return c = +c,
                et(function(h, g) {
                    for (var y, v = a([], h.length, c), i = v.length; i--; )
                        h[y = v[i]] && (h[y] = !(g[y] = h[y]))
                })
            })
        }
        function b(a, c, h) {
            if (a === c)
                return h;
            for (var g = a.nextSibling; g; ) {
                if (g === c)
                    return -1;
                g = g.nextSibling
            }
            return 1
        }
        function w(a, c) {
            var g, y, v, b, w, T, N, C = it[z][a + " "];
            if (C)
                return c ? 0 : C.slice(0);
            for (w = a,
            T = [],
            N = F.preFilter; w; ) {
                (!g || (y = gt.exec(w))) && (y && (w = w.slice(y[0].length) || w),
                T.push(v = [])),
                g = !1,
                (y = mt.exec(w)) && (v.push(g = new X(y.shift())),
                w = w.slice(g.length),
                g.type = y[0].replace(dt, " "));
                for (b in F.filter)
                    !(y = Nt[b].exec(w)) || N[b] && !(y = N[b](y)) || (v.push(g = new X(y.shift())),
                    w = w.slice(g.length),
                    g.type = b,
                    g.matches = y);
                if (!g)
                    break
            }
            return c ? w.length : w ? h.error(a) : it(a, T).slice(0)
        }
        function T(a, c, h) {
            var g = c.dir
              , y = h && "parentNode" === c.dir
              , v = J++;
            return c.first ? function(c, h, v) {
                for (; c = c[g]; )
                    if (y || 1 === c.nodeType)
                        return a(c, h, v)
            }
            : function(c, h, b) {
                if (b) {
                    for (; c = c[g]; )
                        if ((y || 1 === c.nodeType) && a(c, h, b))
                            return c
                } else
                    for (var w, T = V + " " + v + " ", N = T + L; c = c[g]; )
                        if (y || 1 === c.nodeType) {
                            if ((w = c[z]) === N)
                                return c.sizset;
                            if ("string" == typeof w && 0 === w.indexOf(T)) {
                                if (c.sizset)
                                    return c
                            } else {
                                if (c[z] = N,
                                a(c, h, b))
                                    return c.sizset = !0,
                                    c;
                                c.sizset = !1
                            }
                        }
            }
        }
        function N(a) {
            return a.length > 1 ? function(c, h, g) {
                for (var i = a.length; i--; )
                    if (!a[i](c, h, g))
                        return !1;
                return !0
            }
            : a[0]
        }
        function C(a, c, h, g, y) {
            for (var v, b = [], i = 0, w = a.length, T = null != c; w > i; i++)
                (v = a[i]) && (!h || h(v, g, y)) && (b.push(v),
                T && c.push(i));
            return b
        }
        function k(a, c, h, g, y, v) {
            return g && !g[z] && (g = k(g)),
            y && !y[z] && (y = k(y, v)),
            et(function(v, b, w, T) {
                var N, i, k, E = [], S = [], j = b.length, D = v || A(c || "*", w.nodeType ? [w] : w, []), L = !a || !v && c ? D : C(D, E, a, w, T), H = h ? y || (v ? a : j || g) ? [] : b : L;
                if (h && h(L, H, w, T),
                g)
                    for (N = C(H, S),
                    g(N, [], w, T),
                    i = N.length; i--; )
                        (k = N[i]) && (H[S[i]] = !(L[S[i]] = k));
                if (v) {
                    if (y || a) {
                        if (y) {
                            for (N = [],
                            i = H.length; i--; )
                                (k = H[i]) && N.push(L[i] = k);
                            y(null, H = [], N, T)
                        }
                        for (i = H.length; i--; )
                            (k = H[i]) && (N = y ? Z.call(v, k) : E[i]) > -1 && (v[N] = !(b[N] = k))
                    }
                } else
                    H = C(H === b ? H.splice(j, H.length) : H),
                    y ? y(null, b, H, T) : Q.apply(b, H)
            })
        }
        function E(a) {
            for (var c, h, g, y = a.length, v = F.relative[a[0].type], b = v || F.relative[" "], i = v ? 1 : 0, w = T(function(a) {
                return a === c
            }, b, !0), C = T(function(a) {
                return Z.call(c, a) > -1
            }, b, !0), S = [function(a, h, g) {
                return !v && (g || h !== R) || ((c = h).nodeType ? w(a, h, g) : C(a, h, g))
            }
            ]; y > i; i++)
                if (h = F.relative[a[i].type])
                    S = [T(N(S), h)];
                else {
                    if (h = F.filter[a[i].type].apply(null, a[i].matches),
                    h[z]) {
                        for (g = ++i; y > g && !F.relative[a[g].type]; g++)
                            ;
                        return k(i > 1 && N(S), i > 1 && a.slice(0, i - 1).join("").replace(dt, "$1"), h, g > i && E(a.slice(i, g)), y > g && E(a = a.slice(g)), y > g && a.join(""))
                    }
                    S.push(h)
                }
            return N(S)
        }
        function S(a, c) {
            var g = c.length > 0
              , y = a.length > 0
              , v = function(b, w, T, N, k) {
                var E, S, A, j = [], D = 0, i = "0", H = b && [], M = null != k, O = R, _ = b || y && F.find.TAG("*", k && w.parentNode || w), B = V += null == O ? 1 : Math.E;
                for (M && (R = w !== U && w,
                L = v.el); null != (E = _[i]); i++) {
                    if (y && E) {
                        for (S = 0; A = a[S]; S++)
                            if (A(E, w, T)) {
                                N.push(E);
                                break
                            }
                        M && (V = B,
                        L = ++v.el)
                    }
                    g && ((E = !A && E) && D--,
                    b && H.push(E))
                }
                if (D += i,
                g && i !== D) {
                    for (S = 0; A = c[S]; S++)
                        A(H, j, w, T);
                    if (b) {
                        if (D > 0)
                            for (; i--; )
                                H[i] || j[i] || (j[i] = G.call(N));
                        j = C(j)
                    }
                    Q.apply(N, j),
                    M && !b && j.length > 0 && D + c.length > 1 && h.uniqueSort(N)
                }
                return M && (V = B,
                R = O),
                H
            };
            return v.el = 0,
            g ? et(v) : v
        }
        function A(a, c, g) {
            for (var i = 0, y = c.length; y > i; i++)
                h(a, c[i], g);
            return g
        }
        function j(a, c, h, g, y) {
            {
                var i, v, b, T, N, C = w(a);
                C.length
            }
            if (!g && 1 === C.length) {
                if (v = C[0] = C[0].slice(0),
                v.length > 2 && "ID" === (b = v[0]).type && 9 === c.nodeType && !y && F.relative[v[1].type]) {
                    if (c = F.find.ID(b.matches[0].replace(Tt, ""), c, y)[0],
                    !c)
                        return h;
                    a = a.slice(v.shift().length)
                }
                for (i = Nt.POS.test(a) ? -1 : v.length - 1; i >= 0 && (b = v[i],
                !F.relative[T = b.type]); i--)
                    if ((N = F.find[T]) && (g = N(b.matches[0].replace(Tt, ""), bt.test(v[0].type) && c.parentNode || c, y))) {
                        if (v.splice(i, 1),
                        a = g.length && v.join(""),
                        !a)
                            return Q.apply(h, K.call(g, 0)),
                            h;
                        break
                    }
            }
            return B(a, C)(g, c, y, h, bt.test(a)),
            h
        }
        function D() {}
        var L, H, F, M, O, _, B, W, P, R, $ = !0, I = "undefined", z = ("sizcache" + Math.random()).replace(".", ""), X = String, U = a.document, Y = U.documentElement, V = 0, J = 0, G = [].pop, Q = [].push, K = [].slice, Z = [].indexOf || function(a) {
            for (var i = 0, c = this.length; c > i; i++)
                if (this[i] === a)
                    return i;
            return -1
        }
        , et = function(a, c) {
            return a[z] = null == c || c,
            a
        }, tt = function() {
            var a = {}
              , c = [];
            return et(function(h, g) {
                return c.push(h) > F.cacheLength && delete a[c.shift()],
                a[h + " "] = g
            }, a)
        }, nt = tt(), it = tt(), ot = tt(), at = "[\\x20\\t\\r\\n\\f]", st = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", lt = st.replace("w", "w#"), ut = "([*^$|!~]?=)", ct = "\\[" + at + "*(" + st + ")" + at + "*(?:" + ut + at + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + lt + ")|)|)" + at + "*\\]", ft = ":(" + st + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + ct + ")|[^:]|\\\\.)*|.*))\\)|)", pt = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + at + "*((?:-\\d)?\\d*)" + at + "*\\)|)(?=[^-]|$)", dt = new RegExp("^" + at + "+|((?:^|[^\\\\])(?:\\\\.)*)" + at + "+$","g"), gt = new RegExp("^" + at + "*," + at + "*"), mt = new RegExp("^" + at + "*([\\x20\\t\\r\\n\\f>+~])" + at + "*"), yt = new RegExp(ft), vt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, bt = /[\x20\t\r\n\f]*[+~]/, xt = /h\d/i, wt = /input|select|textarea|button/i, Tt = /\\(?!\\)/g, Nt = {
            ID: new RegExp("^#(" + st + ")"),
            CLASS: new RegExp("^\\.(" + st + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + st + ")['\"]?\\]"),
            TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + ct),
            PSEUDO: new RegExp("^" + ft),
            POS: new RegExp(pt,"i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + at + "*(even|odd|(([+-]|)(\\d*)n|)" + at + "*(?:([+-]|)" + at + "*(\\d+)|))" + at + "*\\)|)","i"),
            needsContext: new RegExp("^" + at + "*[>+~]|" + pt,"i")
        }, Ct = function(a) {
            var c = U.createElement("div");
            try {
                return a(c)
            } catch (e) {
                return !1
            } finally {
                c = null
            }
        }, kt = Ct(function(a) {
            return a.appendChild(U.createComment("")),
            !a.getElementsByTagName("*").length
        }), Et = Ct(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            a.firstChild && typeof a.firstChild.getAttribute !== I && "#" === a.firstChild.getAttribute("href")
        }), St = Ct(function(a) {
            a.innerHTML = "<select></select>";
            var c = typeof a.lastChild.getAttribute("multiple");
            return "boolean" !== c && "string" !== c
        }), At = Ct(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e",
            2 === a.getElementsByClassName("e").length) : !1
        }), jt = Ct(function(a) {
            a.id = z + 0,
            a.innerHTML = "<a name='" + z + "'></a><div name='" + z + "'></div>",
            Y.insertBefore(a, Y.firstChild);
            var c = U.getElementsByName && U.getElementsByName(z).length === 2 + U.getElementsByName(z + 0).length;
            return H = !U.getElementById(z),
            Y.removeChild(a),
            c
        });
        try {
            K.call(Y.childNodes, 0)[0].nodeType
        } catch (e) {
            K = function(i) {
                for (var a, c = []; a = this[i]; i++)
                    c.push(a);
                return c
            }
        }
        h.matches = function(a, c) {
            return h(a, null, null, c)
        }
        ,
        h.matchesSelector = function(a, c) {
            return h(c, null, null, [a]).length > 0
        }
        ,
        M = h.getText = function(a) {
            var c, h = "", i = 0, g = a.nodeType;
            if (g) {
                if (1 === g || 9 === g || 11 === g) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        h += M(a)
                } else if (3 === g || 4 === g)
                    return a.nodeValue
            } else
                for (; c = a[i]; i++)
                    h += M(c);
            return h
        }
        ,
        O = h.isXML = function(a) {
            var c = a && (a.ownerDocument || a).documentElement;
            return c ? "HTML" !== c.nodeName : !1
        }
        ,
        _ = h.contains = Y.contains ? function(a, c) {
            var h = 9 === a.nodeType ? a.documentElement : a
              , g = c && c.parentNode;
            return a === g || !!(g && 1 === g.nodeType && h.contains && h.contains(g))
        }
        : Y.compareDocumentPosition ? function(a, c) {
            return c && !!(16 & a.compareDocumentPosition(c))
        }
        : function(a, c) {
            for (; c = c.parentNode; )
                if (c === a)
                    return !0;
            return !1
        }
        ,
        h.attr = function(a, c) {
            var h, g = O(a);
            return g || (c = c.toLowerCase()),
            (h = F.attrHandle[c]) ? h(a) : g || St ? a.getAttribute(c) : (h = a.getAttributeNode(c),
            h ? "boolean" == typeof a[c] ? a[c] ? c : null : h.specified ? h.value : null : null)
        }
        ,
        F = h.selectors = {
            cacheLength: 50,
            createPseudo: et,
            match: Nt,
            attrHandle: Et ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2)
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            find: {
                ID: H ? function(a, c, h) {
                    if (typeof c.getElementById !== I && !h) {
                        var m = c.getElementById(a);
                        return m && m.parentNode ? [m] : []
                    }
                }
                : function(a, h, g) {
                    if (typeof h.getElementById !== I && !g) {
                        var m = h.getElementById(a);
                        return m ? m.id === a || typeof m.getAttributeNode !== I && m.getAttributeNode("id").value === a ? [m] : c : []
                    }
                }
                ,
                TAG: kt ? function(a, c) {
                    return typeof c.getElementsByTagName !== I ? c.getElementsByTagName(a) : void 0
                }
                : function(a, c) {
                    var h = c.getElementsByTagName(a);
                    if ("*" === a) {
                        for (var g, y = [], i = 0; g = h[i]; i++)
                            1 === g.nodeType && y.push(g);
                        return y
                    }
                    return h
                }
                ,
                NAME: jt && function(a, c) {
                    return typeof c.getElementsByName !== I ? c.getElementsByName(name) : void 0
                }
                ,
                CLASS: At && function(a, c, h) {
                    return typeof c.getElementsByClassName === I || h ? void 0 : c.getElementsByClassName(a)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(Tt, ""),
                    a[3] = (a[4] || a[5] || "").replace(Tt, ""),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1] ? (a[2] || h.error(a[0]),
                    a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])),
                    a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && h.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var c, h;
                    return Nt.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[3] : (c = a[4]) && (yt.test(c) && (h = w(c, !0)) && (h = c.indexOf(")", c.length - h) - c.length) && (c = c.slice(0, h),
                    a[0] = a[0].slice(0, h)),
                    a[2] = c),
                    a.slice(0, 3))
                }
            },
            filter: {
                ID: H ? function(a) {
                    return a = a.replace(Tt, ""),
                    function(c) {
                        return c.getAttribute("id") === a
                    }
                }
                : function(a) {
                    return a = a.replace(Tt, ""),
                    function(c) {
                        var h = typeof c.getAttributeNode !== I && c.getAttributeNode("id");
                        return h && h.value === a
                    }
                }
                ,
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0
                    }
                    : (a = a.replace(Tt, "").toLowerCase(),
                    function(c) {
                        return c.nodeName && c.nodeName.toLowerCase() === a
                    }
                    )
                },
                CLASS: function(a) {
                    var c = nt[z][a + " "];
                    return c || (c = new RegExp("(^|" + at + ")" + a + "(" + at + "|$)")) && nt(a, function(a) {
                        return c.test(a.className || typeof a.getAttribute !== I && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, g) {
                    return function(y) {
                        var v = h.attr(y, a);
                        return null == v ? "!=" === c : c ? (v += "",
                        "=" === c ? v === g : "!=" === c ? v !== g : "^=" === c ? g && 0 === v.indexOf(g) : "*=" === c ? g && v.indexOf(g) > -1 : "$=" === c ? g && v.substr(v.length - g.length) === g : "~=" === c ? (" " + v + " ").indexOf(g) > -1 : "|=" === c ? v === g || v.substr(0, g.length + 1) === g + "-" : !1) : !0
                    }
                },
                CHILD: function(a, c, h, g) {
                    return "nth" === a ? function(a) {
                        var c, y, v = a.parentNode;
                        if (1 === h && 0 === g)
                            return !0;
                        if (v)
                            for (y = 0,
                            c = v.firstChild; c && (1 !== c.nodeType || (y++,
                            a !== c)); c = c.nextSibling)
                                ;
                        return y -= g,
                        y === h || y % h === 0 && y / h >= 0
                    }
                    : function(c) {
                        var h = c;
                        switch (a) {
                        case "only":
                        case "first":
                            for (; h = h.previousSibling; )
                                if (1 === h.nodeType)
                                    return !1;
                            if ("first" === a)
                                return !0;
                            h = c;
                        case "last":
                            for (; h = h.nextSibling; )
                                if (1 === h.nodeType)
                                    return !1;
                            return !0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var g, y = F.pseudos[a] || F.setFilters[a.toLowerCase()] || h.error("unsupported pseudo: " + a);
                    return y[z] ? y(c) : y.length > 1 ? (g = [a, a, "", c],
                    F.setFilters.hasOwnProperty(a.toLowerCase()) ? et(function(a, h) {
                        for (var g, v = y(a, c), i = v.length; i--; )
                            g = Z.call(a, v[i]),
                            a[g] = !(h[g] = v[i])
                    }) : function(a) {
                        return y(a, 0, g)
                    }
                    ) : y
                }
            },
            pseudos: {
                not: et(function(a) {
                    var c = []
                      , h = []
                      , g = B(a.replace(dt, "$1"));
                    return g[z] ? et(function(a, c, h, y) {
                        for (var v, b = g(a, null, y, []), i = a.length; i--; )
                            (v = b[i]) && (a[i] = !(c[i] = v))
                    }) : function(a, y, v) {
                        return c[0] = a,
                        g(c, null, v, h),
                        !h.pop()
                    }
                }),
                has: et(function(a) {
                    return function(c) {
                        return h(a, c).length > 0
                    }
                }),
                contains: et(function(a) {
                    return function(c) {
                        return (c.textContent || c.innerText || M(c)).indexOf(a) > -1
                    }
                }),
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var c = a.nodeName.toLowerCase();
                    return "input" === c && !!a.checked || "option" === c && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                parent: function(a) {
                    return !F.pseudos.empty(a)
                },
                empty: function(a) {
                    var c;
                    for (a = a.firstChild; a; ) {
                        if (a.nodeName > "@" || 3 === (c = a.nodeType) || 4 === c)
                            return !1;
                        a = a.nextSibling
                    }
                    return !0
                },
                header: function(a) {
                    return xt.test(a.nodeName)
                },
                text: function(a) {
                    var c, h;
                    return "input" === a.nodeName.toLowerCase() && "text" === (c = a.type) && (null == (h = a.getAttribute("type")) || h.toLowerCase() === c)
                },
                radio: g("radio"),
                checkbox: g("checkbox"),
                file: g("file"),
                password: g("password"),
                image: g("image"),
                submit: y("submit"),
                reset: y("reset"),
                button: function(a) {
                    var c = a.nodeName.toLowerCase();
                    return "input" === c && "button" === a.type || "button" === c
                },
                input: function(a) {
                    return wt.test(a.nodeName)
                },
                focus: function(a) {
                    var c = a.ownerDocument;
                    return a === c.activeElement && (!c.hasFocus || c.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement
                },
                first: v(function() {
                    return [0]
                }),
                last: v(function(a, c) {
                    return [c - 1]
                }),
                eq: v(function(a, c, h) {
                    return [0 > h ? h + c : h]
                }),
                even: v(function(a, c) {
                    for (var i = 0; c > i; i += 2)
                        a.push(i);
                    return a
                }),
                odd: v(function(a, c) {
                    for (var i = 1; c > i; i += 2)
                        a.push(i);
                    return a
                }),
                lt: v(function(a, c, h) {
                    for (var i = 0 > h ? h + c : h; --i >= 0; )
                        a.push(i);
                    return a
                }),
                gt: v(function(a, c, h) {
                    for (var i = 0 > h ? h + c : h; ++i < c; )
                        a.push(i);
                    return a
                })
            }
        },
        W = Y.compareDocumentPosition ? function(a, c) {
            return a === c ? (P = !0,
            0) : (a.compareDocumentPosition && c.compareDocumentPosition ? 4 & a.compareDocumentPosition(c) : a.compareDocumentPosition) ? -1 : 1
        }
        : function(a, c) {
            if (a === c)
                return P = !0,
                0;
            if (a.sourceIndex && c.sourceIndex)
                return a.sourceIndex - c.sourceIndex;
            var h, g, y = [], v = [], w = a.parentNode, T = c.parentNode, N = w;
            if (w === T)
                return b(a, c);
            if (!w)
                return -1;
            if (!T)
                return 1;
            for (; N; )
                y.unshift(N),
                N = N.parentNode;
            for (N = T; N; )
                v.unshift(N),
                N = N.parentNode;
            h = y.length,
            g = v.length;
            for (var i = 0; h > i && g > i; i++)
                if (y[i] !== v[i])
                    return b(y[i], v[i]);
            return i === h ? b(a, v[i], -1) : b(y[i], c, 1)
        }
        ,
        [0, 0].sort(W),
        $ = !P,
        h.uniqueSort = function(a) {
            var c, h = [], i = 1, g = 0;
            if (P = $,
            a.sort(W),
            P) {
                for (; c = a[i]; i++)
                    c === a[i - 1] && (g = h.push(i));
                for (; g--; )
                    a.splice(h[g], 1)
            }
            return a
        }
        ,
        h.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ,
        B = h.compile = function(a, c) {
            var i, h = [], g = [], y = ot[z][a + " "];
            if (!y) {
                for (c || (c = w(a)),
                i = c.length; i--; )
                    y = E(c[i]),
                    y[z] ? h.push(y) : g.push(y);
                y = ot(a, S(g, h))
            }
            return y
        }
        ,
        U.querySelectorAll && !function() {
            var a, c = j, g = /'|\\/g, y = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, v = [":focus"], b = [":active"], T = Y.matchesSelector || Y.mozMatchesSelector || Y.webkitMatchesSelector || Y.oMatchesSelector || Y.msMatchesSelector;
            Ct(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>",
                a.querySelectorAll("[selected]").length || v.push("\\[" + at + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                a.querySelectorAll(":checked").length || v.push(":checked")
            }),
            Ct(function(a) {
                a.innerHTML = "<p test=''></p>",
                a.querySelectorAll("[test^='']").length && v.push("[*^$]=" + at + "*(?:\"\"|'')"),
                a.innerHTML = "<input type='hidden'/>",
                a.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled")
            }),
            v = new RegExp(v.join("|")),
            j = function(a, h, y, b, T) {
                if (!b && !T && !v.test(a)) {
                    var N, i, C = !0, k = z, E = h, S = 9 === h.nodeType && a;
                    if (1 === h.nodeType && "object" !== h.nodeName.toLowerCase()) {
                        for (N = w(a),
                        (C = h.getAttribute("id")) ? k = C.replace(g, "\\$&") : h.setAttribute("id", k),
                        k = "[id='" + k + "'] ",
                        i = N.length; i--; )
                            N[i] = k + N[i].join("");
                        E = bt.test(a) && h.parentNode || h,
                        S = N.join(",")
                    }
                    if (S)
                        try {
                            return Q.apply(y, K.call(E.querySelectorAll(S), 0)),
                            y
                        } catch (A) {} finally {
                            C || h.removeAttribute("id")
                        }
                }
                return c(a, h, y, b, T)
            }
            ,
            T && (Ct(function(c) {
                a = T.call(c, "div");
                try {
                    T.call(c, "[test!='']:sizzle"),
                    b.push("!=", ft)
                } catch (e) {}
            }),
            b = new RegExp(b.join("|")),
            h.matchesSelector = function(c, g) {
                if (g = g.replace(y, "='$1']"),
                !O(c) && !b.test(g) && !v.test(g))
                    try {
                        var w = T.call(c, g);
                        if (w || a || c.document && 11 !== c.document.nodeType)
                            return w
                    } catch (e) {}
                return h(g, null, null, [c]).length > 0
            }
            )
        }(),
        F.pseudos.nth = F.pseudos.eq,
        F.filters = D.prototype = F.pseudos,
        F.setFilters = new D,
        h.attr = ht.attr,
        ht.find = h,
        ht.expr = h.selectors,
        ht.expr[":"] = ht.expr.pseudos,
        ht.unique = h.uniqueSort,
        ht.text = h.getText,
        ht.isXMLDoc = h.isXML,
        ht.contains = h.contains
    }(a);
    var Gt = /Until$/
      , Qt = /^(?:parents|prev(?:Until|All))/
      , Kt = /^.[^:#\[\.,]*$/
      , Zt = ht.expr.match.needsContext
      , en = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ht.fn.extend({
        find: function(a) {
            var i, l, c, n, r, h, g = this;
            if ("string" != typeof a)
                return ht(a).filter(function() {
                    for (i = 0,
                    l = g.length; l > i; i++)
                        if (ht.contains(g[i], this))
                            return !0
                });
            for (h = this.pushStack("", "find", a),
            i = 0,
            l = this.length; l > i; i++)
                if (c = h.length,
                ht.find(a, this[i], h),
                i > 0)
                    for (n = c; n < h.length; n++)
                        for (r = 0; c > r; r++)
                            if (h[r] === h[n]) {
                                h.splice(n--, 1);
                                break
                            }
            return h
        },
        has: function(a) {
            var i, c = ht(a, this), h = c.length;
            return this.filter(function() {
                for (i = 0; h > i; i++)
                    if (ht.contains(this, c[i]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(N(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(N(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? Zt.test(a) ? ht(a, this.context).index(this[0]) >= 0 : ht.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, c) {
            for (var h, i = 0, l = this.length, g = [], y = Zt.test(a) || "string" != typeof a ? ht(a, c || this.context) : 0; l > i; i++)
                for (h = this[i]; h && h.ownerDocument && h !== c && 11 !== h.nodeType; ) {
                    if (y ? y.index(h) > -1 : ht.find.matchesSelector(h, a)) {
                        g.push(h);
                        break
                    }
                    h = h.parentNode
                }
            return g = g.length > 1 ? ht.unique(g) : g,
            this.pushStack(g, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? ht.inArray(this[0], ht(a)) : ht.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, c) {
            var h = "string" == typeof a ? ht(a, c) : ht.makeArray(a && a.nodeType ? [a] : a)
              , g = ht.merge(this.get(), h);
            return this.pushStack(w(h[0]) || w(g[0]) ? g : ht.unique(g))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }),
    ht.fn.andSelf = ht.fn.addBack,
    ht.each({
        parent: function(a) {
            var c = a.parentNode;
            return c && 11 !== c.nodeType ? c : null
        },
        parents: function(a) {
            return ht.dir(a, "parentNode")
        },
        parentsUntil: function(a, i, c) {
            return ht.dir(a, "parentNode", c)
        },
        next: function(a) {
            return T(a, "nextSibling")
        },
        prev: function(a) {
            return T(a, "previousSibling")
        },
        nextAll: function(a) {
            return ht.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return ht.dir(a, "previousSibling")
        },
        nextUntil: function(a, i, c) {
            return ht.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, i, c) {
            return ht.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return ht.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return ht.sibling(a.firstChild)
        },
        contents: function(a) {
            return ht.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ht.merge([], a.childNodes)
        }
    }, function(a, c) {
        ht.fn[a] = function(h, g) {
            var y = ht.map(this, c, h);
            return Gt.test(a) || (g = h),
            g && "string" == typeof g && (y = ht.filter(g, y)),
            y = this.length > 1 && !en[a] ? ht.unique(y) : y,
            this.length > 1 && Qt.test(a) && (y = y.reverse()),
            this.pushStack(y, a, ut.call(arguments).join(","))
        }
    }),
    ht.extend({
        filter: function(a, c, h) {
            return h && (a = ":not(" + a + ")"),
            1 === c.length ? ht.find.matchesSelector(c[0], a) ? [c[0]] : [] : ht.find.matches(a, c)
        },
        dir: function(a, h, g) {
            for (var y = [], v = a[h]; v && 9 !== v.nodeType && (g === c || 1 !== v.nodeType || !ht(v).is(g)); )
                1 === v.nodeType && y.push(v),
                v = v[h];
            return y
        },
        sibling: function(n, a) {
            for (var r = []; n; n = n.nextSibling)
                1 === n.nodeType && n !== a && r.push(n);
            return r
        }
    });
    var tn = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , nn = / jQuery\d+="(?:null|\d+)"/g
      , rn = /^\s+/
      , on = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , an = /<([\w:]+)/
      , sn = /<tbody/i
      , ln = /<|&#?\w+;/
      , un = /<(?:script|style|link)/i
      , cn = /<(?:script|object|embed|option|style)/i
      , fn = new RegExp("<(?:" + tn + ")[\\s/>]","i")
      , pn = /^(?:checkbox|radio)$/
      , dn = /checked\s*(?:[^=]|=\s*.checked.)/i
      , hn = /\/(java|ecma)script/i
      , gn = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , mn = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , yn = C(nt)
      , vn = yn.appendChild(nt.createElement("div"));
    mn.optgroup = mn.option,
    mn.tbody = mn.tfoot = mn.colgroup = mn.caption = mn.thead,
    mn.th = mn.td,
    ht.support.htmlSerialize || (mn._default = [1, "X<div>", "</div>"]),
    ht.fn.extend({
        text: function(a) {
            return ht.access(this, function(a) {
                return a === c ? ht.text(this) : this.empty().append((this[0] && this[0].ownerDocument || nt).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (ht.isFunction(a))
                return this.each(function(i) {
                    ht(this).wrapAll(a.call(this, i))
                });
            if (this[0]) {
                var c = ht(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && c.insertBefore(this[0]),
                c.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(ht.isFunction(a) ? function(i) {
                ht(this).wrapInner(a.call(this, i))
            }
            : function() {
                var c = ht(this)
                  , h = c.contents();
                h.length ? h.wrapAll(a) : c.append(a)
            }
            )
        },
        wrap: function(a) {
            var c = ht.isFunction(a);
            return this.each(function(i) {
                ht(this).wrapAll(c ? a.call(this, i) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ht.nodeName(this, "body") || ht(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!w(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
            if (arguments.length) {
                var a = ht.clean(arguments);
                return this.pushStack(ht.merge(a, this), "before", this.selector)
            }
        },
        after: function() {
            if (!w(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
            if (arguments.length) {
                var a = ht.clean(arguments);
                return this.pushStack(ht.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, c) {
            for (var h, i = 0; null != (h = this[i]); i++)
                (!a || ht.filter(a, [h]).length) && (c || 1 !== h.nodeType || (ht.cleanData(h.getElementsByTagName("*")),
                ht.cleanData([h])),
                h.parentNode && h.parentNode.removeChild(h));
            return this
        },
        empty: function() {
            for (var a, i = 0; null != (a = this[i]); i++)
                for (1 === a.nodeType && ht.cleanData(a.getElementsByTagName("*")); a.firstChild; )
                    a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, c) {
            return a = null == a ? !1 : a,
            c = null == c ? a : c,
            this.map(function() {
                return ht.clone(this, a, c)
            })
        },
        html: function(a) {
            return ht.access(this, function(a) {
                var h = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (a === c)
                    return 1 === h.nodeType ? h.innerHTML.replace(nn, "") : c;
                if (!("string" != typeof a || un.test(a) || !ht.support.htmlSerialize && fn.test(a) || !ht.support.leadingWhitespace && rn.test(a) || mn[(an.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(on, "<$1></$2>");
                    try {
                        for (; l > i; i++)
                            h = this[i] || {},
                            1 === h.nodeType && (ht.cleanData(h.getElementsByTagName("*")),
                            h.innerHTML = a);
                        h = 0
                    } catch (e) {}
                }
                h && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            return w(this[0]) ? this.length ? this.pushStack(ht(ht.isFunction(a) ? a() : a), "replaceWith", a) : this : ht.isFunction(a) ? this.each(function(i) {
                var c = ht(this)
                  , h = c.html();
                c.replaceWith(a.call(this, i, h))
            }) : ("string" != typeof a && (a = ht(a).detach()),
            this.each(function() {
                var c = this.nextSibling
                  , h = this.parentNode;
                ht(this).remove(),
                c ? ht(c).before(a) : ht(h).append(a)
            }))
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, h, g) {
            a = [].concat.apply([], a);
            var y, v, b, w, i = 0, T = a[0], N = [], l = this.length;
            if (!ht.support.checkClone && l > 1 && "string" == typeof T && dn.test(T))
                return this.each(function() {
                    ht(this).domManip(a, h, g)
                });
            if (ht.isFunction(T))
                return this.each(function(i) {
                    var y = ht(this);
                    a[0] = T.call(this, i, h ? y.html() : c),
                    y.domManip(a, h, g)
                });
            if (this[0]) {
                if (y = ht.buildFragment(a, this, N),
                b = y.fragment,
                v = b.firstChild,
                1 === b.childNodes.length && (b = v),
                v)
                    for (h = h && ht.nodeName(v, "tr"),
                    w = y.cacheable || l - 1; l > i; i++)
                        g.call(h && ht.nodeName(this[i], "table") ? k(this[i], "tbody") : this[i], i === w ? b : ht.clone(b, !0, !0));
                b = v = null,
                N.length && ht.each(N, function(i, a) {
                    a.src ? ht.ajax ? ht.ajax({
                        url: a.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : ht.error("no ajax") : ht.globalEval((a.text || a.textContent || a.innerHTML || "").replace(gn, "")),
                    a.parentNode && a.parentNode.removeChild(a)
                })
            }
            return this
        }
    }),
    ht.buildFragment = function(a, h, g) {
        var y, v, b, w = a[0];
        return h = h || nt,
        h = !h.nodeType && h[0] || h,
        h = h.ownerDocument || h,
        !(1 === a.length && "string" == typeof w && w.length < 512 && h === nt && "<" === w.charAt(0)) || cn.test(w) || !ht.support.checkClone && dn.test(w) || !ht.support.html5Clone && fn.test(w) || (v = !0,
        y = ht.fragments[w],
        b = y !== c),
        y || (y = h.createDocumentFragment(),
        ht.clean(a, h, y, g),
        v && (ht.fragments[w] = b && y)),
        {
            fragment: y,
            cacheable: v
        }
    }
    ,
    ht.fragments = {},
    ht.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, c) {
        ht.fn[a] = function(h) {
            var g, i = 0, y = [], v = ht(h), l = v.length, b = 1 === this.length && this[0].parentNode;
            if ((null == b || b && 11 === b.nodeType && 1 === b.childNodes.length) && 1 === l)
                return v[c](this[0]),
                this;
            for (; l > i; i++)
                g = (i > 0 ? this.clone(!0) : this).get(),
                ht(v[i])[c](g),
                y = y.concat(g);
            return this.pushStack(y, a, v.selector)
        }
    }),
    ht.extend({
        clone: function(a, c, h) {
            var g, y, i, v;
            if (ht.support.html5Clone || ht.isXMLDoc(a) || !fn.test("<" + a.nodeName + ">") ? v = a.cloneNode(!0) : (vn.innerHTML = a.outerHTML,
            vn.removeChild(v = vn.firstChild)),
            !(ht.support.noCloneEvent && ht.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ht.isXMLDoc(a)))
                for (S(a, v),
                g = A(a),
                y = A(v),
                i = 0; g[i]; ++i)
                    y[i] && S(g[i], y[i]);
            if (c && (E(a, v),
            h))
                for (g = A(a),
                y = A(v),
                i = 0; g[i]; ++i)
                    E(g[i], y[i]);
            return g = y = null,
            v
        },
        clean: function(a, c, h, g) {
            var i, y, v, b, w, T, N, k, E, S, A, D = c === nt && yn, L = [];
            for (c && "undefined" != typeof c.createDocumentFragment || (c = nt),
            i = 0; null != (v = a[i]); i++)
                if ("number" == typeof v && (v += ""),
                v) {
                    if ("string" == typeof v)
                        if (ln.test(v)) {
                            for (D = D || C(c),
                            N = c.createElement("div"),
                            D.appendChild(N),
                            v = v.replace(on, "<$1></$2>"),
                            b = (an.exec(v) || ["", ""])[1].toLowerCase(),
                            w = mn[b] || mn._default,
                            T = w[0],
                            N.innerHTML = w[1] + v + w[2]; T--; )
                                N = N.lastChild;
                            if (!ht.support.tbody)
                                for (k = sn.test(v),
                                E = "table" !== b || k ? "<table>" !== w[1] || k ? [] : N.childNodes : N.firstChild && N.firstChild.childNodes,
                                y = E.length - 1; y >= 0; --y)
                                    ht.nodeName(E[y], "tbody") && !E[y].childNodes.length && E[y].parentNode.removeChild(E[y]);
                            !ht.support.leadingWhitespace && rn.test(v) && N.insertBefore(c.createTextNode(rn.exec(v)[0]), N.firstChild),
                            v = N.childNodes,
                            N.parentNode.removeChild(N)
                        } else
                            v = c.createTextNode(v);
                    v.nodeType ? L.push(v) : ht.merge(L, v)
                }
            if (N && (v = N = D = null),
            !ht.support.appendChecked)
                for (i = 0; null != (v = L[i]); i++)
                    ht.nodeName(v, "input") ? j(v) : "undefined" != typeof v.getElementsByTagName && ht.grep(v.getElementsByTagName("input"), j);
            if (h)
                for (S = function(a) {
                    return !a.type || hn.test(a.type) ? g ? g.push(a.parentNode ? a.parentNode.removeChild(a) : a) : h.appendChild(a) : void 0
                }
                ,
                i = 0; null != (v = L[i]); i++)
                    ht.nodeName(v, "script") && S(v) || (h.appendChild(v),
                    "undefined" != typeof v.getElementsByTagName && (A = ht.grep(ht.merge([], v.getElementsByTagName("script")), S),
                    L.splice.apply(L, [i + 1, 0].concat(A)),
                    i += A.length));
            return L
        },
        cleanData: function(a, c) {
            for (var h, g, y, v, i = 0, b = ht.expando, w = ht.cache, T = ht.support.deleteExpando, N = ht.event.special; null != (y = a[i]); i++)
                if ((c || ht.acceptData(y)) && (g = y[b],
                h = g && w[g])) {
                    if (h.events)
                        for (v in h.events)
                            N[v] ? ht.event.remove(y, v) : ht.removeEvent(y, v, h.handle);
                    w[g] && (delete w[g],
                    T ? delete y[b] : y.removeAttribute ? y.removeAttribute(b) : y[b] = null,
                    ht.deletedIds.push(g))
                }
        }
    }),
    function() {
        var a, c;
        ht.uaMatch = function(a) {
            a = a.toLowerCase();
            var c = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: c[1] || "",
                version: c[2] || "0"
            }
        }
        ,
        a = ht.uaMatch(ot.userAgent),
        c = {},
        a.browser && (c[a.browser] = !0,
        c.version = a.version),
        c.chrome ? c.webkit = !0 : c.webkit && (c.safari = !0),
        ht.browser = c,
        ht.sub = function() {
            function a(c, h) {
                return new a.fn.init(c,h)
            }
            ht.extend(!0, a, this),
            a.superclass = this,
            a.fn = a.prototype = this(),
            a.fn.constructor = a,
            a.sub = this.sub,
            a.fn.init = function(h, g) {
                return g && g instanceof ht && !(g instanceof a) && (g = a(g)),
                ht.fn.init.call(this, h, g, c)
            }
            ,
            a.fn.init.prototype = a.fn;
            var c = a(nt);
            return a
        }
    }();
    var bn, xn, wn, Tn = /alpha\([^)]*\)/i, Nn = /opacity=([^)]*)/, Cn = /^(top|right|bottom|left)$/, kn = /^(none|table(?!-c[ea]).+)/, En = /^margin/, Sn = new RegExp("^(" + gt + ")(.*)$","i"), An = new RegExp("^(" + gt + ")(?!px)[a-z%]+$","i"), jn = new RegExp("^([-+])=(" + gt + ")","i"), Dn = {
        BODY: "block"
    }, Ln = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Hn = {
        letterSpacing: 0,
        fontWeight: 400
    }, Fn = ["Top", "Right", "Bottom", "Left"], Mn = ["Webkit", "O", "Moz", "ms"], On = ht.fn.toggle;
    ht.fn.extend({
        css: function(a, h) {
            return ht.access(this, function(a, h, g) {
                return g !== c ? ht.style(a, h, g) : ht.css(a, h)
            }, a, h, arguments.length > 1)
        },
        show: function() {
            return H(this, !0)
        },
        hide: function() {
            return H(this)
        },
        toggle: function(a, c) {
            var h = "boolean" == typeof a;
            return ht.isFunction(a) && ht.isFunction(c) ? On.apply(this, arguments) : this.each(function() {
                (h ? a : L(this)) ? ht(this).show() : ht(this).hide()
            })
        }
    }),
    ht.extend({
        cssHooks: {
            opacity: {
                get: function(a, c) {
                    if (c) {
                        var h = bn(a, "opacity");
                        return "" === h ? "1" : h
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ht.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, h, g, y) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var v, b, w, T = ht.camelCase(h), N = a.style;
                if (h = ht.cssProps[T] || (ht.cssProps[T] = D(N, T)),
                w = ht.cssHooks[h] || ht.cssHooks[T],
                g === c)
                    return w && "get"in w && (v = w.get(a, !1, y)) !== c ? v : N[h];
                if (b = typeof g,
                "string" === b && (v = jn.exec(g)) && (g = (v[1] + 1) * v[2] + parseFloat(ht.css(a, h)),
                b = "number"),
                !(null == g || "number" === b && isNaN(g) || ("number" !== b || ht.cssNumber[T] || (g += "px"),
                w && "set"in w && (g = w.set(a, g, y)) === c)))
                    try {
                        N[h] = g
                    } catch (e) {}
            }
        },
        css: function(a, h, g, y) {
            var v, b, w, T = ht.camelCase(h);
            return h = ht.cssProps[T] || (ht.cssProps[T] = D(a.style, T)),
            w = ht.cssHooks[h] || ht.cssHooks[T],
            w && "get"in w && (v = w.get(a, !0, y)),
            v === c && (v = bn(a, h)),
            "normal" === v && h in Hn && (v = Hn[h]),
            g || y !== c ? (b = parseFloat(v),
            g || ht.isNumeric(b) ? b || 0 : v) : v
        },
        swap: function(a, c, h) {
            var g, y, v = {};
            for (y in c)
                v[y] = a.style[y],
                a.style[y] = c[y];
            g = h.call(a);
            for (y in c)
                a.style[y] = v[y];
            return g
        }
    }),
    a.getComputedStyle ? bn = function(c, h) {
        var g, y, v, b, w = a.getComputedStyle(c, null), T = c.style;
        return w && (g = w.getPropertyValue(h) || w[h],
        "" !== g || ht.contains(c.ownerDocument, c) || (g = ht.style(c, h)),
        An.test(g) && En.test(h) && (y = T.width,
        v = T.minWidth,
        b = T.maxWidth,
        T.minWidth = T.maxWidth = T.width = g,
        g = w.width,
        T.width = y,
        T.minWidth = v,
        T.maxWidth = b)),
        g
    }
    : nt.documentElement.currentStyle && (bn = function(a, c) {
        var h, g, y = a.currentStyle && a.currentStyle[c], v = a.style;
        return null == y && v && v[c] && (y = v[c]),
        An.test(y) && !Cn.test(c) && (h = v.left,
        g = a.runtimeStyle && a.runtimeStyle.left,
        g && (a.runtimeStyle.left = a.currentStyle.left),
        v.left = "fontSize" === c ? "1em" : y,
        y = v.pixelLeft + "px",
        v.left = h,
        g && (a.runtimeStyle.left = g)),
        "" === y ? "auto" : y
    }
    ),
    ht.each(["height", "width"], function(i, a) {
        ht.cssHooks[a] = {
            get: function(c, h, g) {
                return h ? 0 === c.offsetWidth && kn.test(bn(c, "display")) ? ht.swap(c, Ln, function() {
                    return O(c, a, g)
                }) : O(c, a, g) : void 0
            },
            set: function(c, h, g) {
                return F(c, h, g ? M(c, a, g, ht.support.boxSizing && "border-box" === ht.css(c, "boxSizing")) : 0)
            }
        }
    }),
    ht.support.opacity || (ht.cssHooks.opacity = {
        get: function(a, c) {
            return Nn.test((c && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
        },
        set: function(a, c) {
            var h = a.style
              , g = a.currentStyle
              , y = ht.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : ""
              , v = g && g.filter || h.filter || "";
            h.zoom = 1,
            c >= 1 && "" === ht.trim(v.replace(Tn, "")) && h.removeAttribute && (h.removeAttribute("filter"),
            g && !g.filter) || (h.filter = Tn.test(v) ? v.replace(Tn, y) : v + " " + y)
        }
    }),
    ht(function() {
        ht.support.reliableMarginRight || (ht.cssHooks.marginRight = {
            get: function(a, c) {
                return ht.swap(a, {
                    display: "inline-block"
                }, function() {
                    return c ? bn(a, "marginRight") : void 0
                })
            }
        }),
        !ht.support.pixelPosition && ht.fn.position && ht.each(["top", "left"], function(i, a) {
            ht.cssHooks[a] = {
                get: function(c, h) {
                    if (h) {
                        var g = bn(c, a);
                        return An.test(g) ? ht(c).position()[a] + "px" : g
                    }
                }
            }
        })
    }),
    ht.expr && ht.expr.filters && (ht.expr.filters.hidden = function(a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight || !ht.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || bn(a, "display"))
    }
    ,
    ht.expr.filters.visible = function(a) {
        return !ht.expr.filters.hidden(a)
    }
    ),
    ht.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, c) {
        ht.cssHooks[a + c] = {
            expand: function(h) {
                var i, g = "string" == typeof h ? h.split(" ") : [h], y = {};
                for (i = 0; 4 > i; i++)
                    y[a + Fn[i] + c] = g[i] || g[i - 2] || g[0];
                return y
            }
        },
        En.test(a) || (ht.cssHooks[a + c].set = F)
    });
    var _n = /%20/g
      , qn = /\[\]$/
      , Bn = /\r?\n/g
      , Wn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , Pn = /^(?:select|textarea)/i;
    ht.fn.extend({
        serialize: function() {
            return ht.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? ht.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Pn.test(this.nodeName) || Wn.test(this.type))
            }).map(function(i, a) {
                var c = ht(this).val();
                return null == c ? null : ht.isArray(c) ? ht.map(c, function(c) {
                    return {
                        name: a.name,
                        value: c.replace(Bn, "\r\n")
                    }
                }) : {
                    name: a.name,
                    value: c.replace(Bn, "\r\n")
                }
            }).get()
        }
    }),
    ht.param = function(a, h) {
        var g, s = [], y = function(a, c) {
            c = ht.isFunction(c) ? c() : null == c ? "" : c,
            s[s.length] = encodeURIComponent(a) + "=" + encodeURIComponent(c)
        };
        if (h === c && (h = ht.ajaxSettings && ht.ajaxSettings.traditional),
        ht.isArray(a) || a.jquery && !ht.isPlainObject(a))
            ht.each(a, function() {
                y(this.name, this.value)
            });
        else
            for (g in a)
                B(g, a[g], h, y);
        return s.join("&").replace(_n, "+")
    }
    ;
    var Rn, $n, In = /#.*$/, zn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Xn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Un = /^(?:GET|HEAD)$/, Yn = /^\/\//, Vn = /\?/, Jn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, Gn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Qn = ht.fn.load, Kn = {}, Zn = {}, er = ["*/"] + ["*"];
    try {
        $n = it.href
    } catch (e) {
        $n = nt.createElement("a"),
        $n.href = "",
        $n = $n.href
    }
    Rn = Gn.exec($n.toLowerCase()) || [],
    ht.fn.load = function(a, h, g) {
        if ("string" != typeof a && Qn)
            return Qn.apply(this, arguments);
        if (!this.length)
            return this;
        var y, v, b, w = this, T = a.indexOf(" ");
        return T >= 0 && (y = a.slice(T, a.length),
        a = a.slice(0, T)),
        ht.isFunction(h) ? (g = h,
        h = c) : h && "object" == typeof h && (v = "POST"),
        ht.ajax({
            url: a,
            type: v,
            dataType: "html",
            data: h,
            complete: function(a, c) {
                g && w.each(g, b || [a.responseText, c, a])
            }
        }).done(function(a) {
            b = arguments,
            w.html(y ? ht("<div>").append(a.replace(Jn, "")).find(y) : a)
        }),
        this
    }
    ,
    ht.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        ht.fn[o] = function(f) {
            return this.on(o, f)
        }
    }),
    ht.each(["get", "post"], function(i, a) {
        ht[a] = function(h, g, y, v) {
            return ht.isFunction(g) && (v = v || y,
            y = g,
            g = c),
            ht.ajax({
                type: a,
                url: h,
                data: g,
                success: y,
                dataType: v
            })
        }
    }),
    ht.extend({
        getScript: function(a, h) {
            return ht.get(a, c, h, "script")
        },
        getJSON: function(a, c, h) {
            return ht.get(a, c, h, "json")
        },
        ajaxSetup: function(a, c) {
            return c ? R(a, ht.ajaxSettings) : (c = a,
            a = ht.ajaxSettings),
            R(a, c),
            a
        },
        ajaxSettings: {
            url: $n,
            isLocal: Xn.test(Rn[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": er
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": ht.parseJSON,
                "text xml": ht.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: W(Kn),
        ajaxTransport: W(Zn),
        ajax: function(a, h) {
            function g(a, h, g, b) {
                var N, D, L, F, O, _ = h;
                2 !== H && (H = 2,
                T && clearTimeout(T),
                w = c,
                v = b || "",
                M.readyState = a > 0 ? 4 : 0,
                g && (F = $(s, M, g)),
                a >= 200 && 300 > a || 304 === a ? (s.ifModified && (O = M.getResponseHeader("Last-Modified"),
                O && (ht.lastModified[y] = O),
                O = M.getResponseHeader("Etag"),
                O && (ht.etag[y] = O)),
                304 === a ? (_ = "notmodified",
                N = !0) : (N = I(s, F),
                _ = N.state,
                D = N.data,
                L = N.error,
                N = !L)) : (L = _,
                (!_ || a) && (_ = "error",
                0 > a && (a = 0))),
                M.status = a,
                M.statusText = (h || _) + "",
                N ? S.resolveWith(k, [D, _, M]) : S.rejectWith(k, [M, _, L]),
                M.statusCode(j),
                j = c,
                C && E.trigger("ajax" + (N ? "Success" : "Error"), [M, s, N ? D : L]),
                A.fireWith(k, [M, _]),
                C && (E.trigger("ajaxComplete", [M, s]),
                --ht.active || ht.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (h = a,
            a = c),
            h = h || {};
            var y, v, b, w, T, N, C, i, s = ht.ajaxSetup({}, h), k = s.context || s, E = k !== s && (k.nodeType || k instanceof ht) ? ht(k) : ht.event, S = ht.Deferred(), A = ht.Callbacks("once memory"), j = s.statusCode || {}, D = {}, L = {}, H = 0, F = "canceled", M = {
                readyState: 0,
                setRequestHeader: function(a, c) {
                    if (!H) {
                        var h = a.toLowerCase();
                        a = L[h] = L[h] || a,
                        D[a] = c
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return 2 === H ? v : null
                },
                getResponseHeader: function(a) {
                    var h;
                    if (2 === H) {
                        if (!b)
                            for (b = {}; h = zn.exec(v); )
                                b[h[1].toLowerCase()] = h[2];
                        h = b[a.toLowerCase()]
                    }
                    return h === c ? null : h
                },
                overrideMimeType: function(a) {
                    return H || (s.mimeType = a),
                    this
                },
                abort: function(a) {
                    return a = a || F,
                    w && w.abort(a),
                    g(0, a),
                    this
                }
            };
            if (S.promise(M),
            M.success = M.done,
            M.error = M.fail,
            M.complete = A.add,
            M.statusCode = function(a) {
                if (a) {
                    var c;
                    if (2 > H)
                        for (c in a)
                            j[c] = [j[c], a[c]];
                    else
                        c = a[M.status],
                        M.always(c)
                }
                return this
            }
            ,
            s.url = ((a || s.url) + "").replace(In, "").replace(Yn, Rn[1] + "//"),
            s.dataTypes = ht.trim(s.dataType || "*").toLowerCase().split(yt),
            null == s.crossDomain && (N = Gn.exec(s.url.toLowerCase()),
            s.crossDomain = !(!N || N[1] === Rn[1] && N[2] === Rn[2] && (N[3] || ("http:" === N[1] ? 80 : 443)) == (Rn[3] || ("http:" === Rn[1] ? 80 : 443)))),
            s.data && s.processData && "string" != typeof s.data && (s.data = ht.param(s.data, s.traditional)),
            P(Kn, s, h, M),
            2 === H)
                return M;
            if (C = s.global,
            s.type = s.type.toUpperCase(),
            s.hasContent = !Un.test(s.type),
            C && 0 === ht.active++ && ht.event.trigger("ajaxStart"),
            !s.hasContent && (s.data && (s.url += (Vn.test(s.url) ? "&" : "?") + s.data,
            delete s.data),
            y = s.url,
            s.cache === !1)) {
                var ts = ht.now()
                  , O = s.url.replace(rts, "$1_=" + ts);
                s.url = O + (O === s.url ? (Vn.test(s.url) ? "&" : "?") + "_=" + ts : "")
            }
            (s.data && s.hasContent && s.contentType !== !1 || h.contentType) && M.setRequestHeader("Content-Type", s.contentType),
            s.ifModified && (y = y || s.url,
            ht.lastModified[y] && M.setRequestHeader("If-Modified-Since", ht.lastModified[y]),
            ht.etag[y] && M.setRequestHeader("If-None-Match", ht.etag[y])),
            M.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + er + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers)
                M.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(k, M, s) === !1 || 2 === H))
                return M.abort();
            F = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            })
                M[i](s[i]);
            if (w = P(Zn, s, h, M)) {
                M.readyState = 1,
                C && E.trigger("ajaxSend", [M, s]),
                s.async && s.timeout > 0 && (T = setTimeout(function() {
                    M.abort("timeout")
                }, s.timeout));
                try {
                    H = 1,
                    w.send(D, g)
                } catch (e) {
                    if (!(2 > H))
                        throw e;
                    g(-1, e)
                }
            } else
                g(-1, "No Transport");
            return M
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var tr = []
      , nr = /\?/
      , rr = /(=)\?(?=&|$)|\?\?/
      , ar = ht.now();
    ht.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = tr.pop() || ht.expando + "_" + ar++;
            return this[a] = !0,
            a
        }
    }),
    ht.ajaxPrefilter("json jsonp", function(s, h, g) {
        var y, v, b, w = s.data, T = s.url, N = s.jsonp !== !1, C = N && rr.test(T), k = N && !C && "string" == typeof w && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rr.test(w);
        return "jsonp" === s.dataTypes[0] || C || k ? (y = s.jsonpCallback = ht.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
        v = a[y],
        C ? s.url = T.replace(rr, "$1" + y) : k ? s.data = w.replace(rr, "$1" + y) : N && (s.url += (nr.test(T) ? "&" : "?") + s.jsonp + "=" + y),
        s.converters["script json"] = function() {
            return b || ht.error(y + " was not called"),
            b[0]
        }
        ,
        s.dataTypes[0] = "json",
        a[y] = function() {
            b = arguments
        }
        ,
        g.always(function() {
            a[y] = v,
            s[y] && (s.jsonpCallback = h.jsonpCallback,
            tr.push(y)),
            b && ht.isFunction(v) && v(b[0]),
            b = v = c
        }),
        "script") : void 0
    }),
    ht.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return ht.globalEval(a),
                a
            }
        }
    }),
    ht.ajaxPrefilter("script", function(s) {
        s.cache === c && (s.cache = !1),
        s.crossDomain && (s.type = "GET",
        s.global = !1)
    }),
    ht.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var a, h = nt.head || nt.getElementsByTagName("head")[0] || nt.documentElement;
            return {
                send: function(g, y) {
                    a = nt.createElement("script"),
                    a.async = "async",
                    s.scriptCharset && (a.charset = s.scriptCharset),
                    a.src = s.url,
                    a.onload = a.onreadystatechange = function(g, v) {
                        (v || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null,
                        h && a.parentNode && h.removeChild(a),
                        a = c,
                        v || y(200, "success"))
                    }
                    ,
                    h.insertBefore(a, h.firstChild)
                },
                abort: function() {
                    a && a.onload(0, 1)
                }
            }
        }
    });
    var sr, lr = a.ActiveXObject ? function() {
        for (var a in sr)
            sr[a](0, 1)
    }
    : !1, ur = 0;
    ht.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && z() || X()
    }
    : z,
    function(a) {
        ht.extend(ht.support, {
            ajax: !!a,
            cors: !!a && "withCredentials"in a
        })
    }(ht.ajaxSettings.xhr()),
    ht.support.ajax && ht.ajaxTransport(function(s) {
        if (!s.crossDomain || ht.support.cors) {
            var h;
            return {
                send: function(g, y) {
                    var v, i, b = s.xhr();
                    if (s.username ? b.open(s.type, s.url, s.async, s.username, s.password) : b.open(s.type, s.url, s.async),
                    s.xhrFields)
                        for (i in s.xhrFields)
                            b[i] = s.xhrFields[i];
                    s.mimeType && b.overrideMimeType && b.overrideMimeType(s.mimeType),
                    s.crossDomain || g["X-Requested-With"] || (g["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in g)
                            b.setRequestHeader(i, g[i])
                    } catch (w) {}
                    b.send(s.hasContent && s.data || null),
                    h = function(a, g) {
                        var w, T, N, C, k;
                        try {
                            if (h && (g || 4 === b.readyState))
                                if (h = c,
                                v && (b.onreadystatechange = ht.noop,
                                lr && delete sr[v]),
                                g)
                                    4 !== b.readyState && b.abort();
                                else {
                                    w = b.status,
                                    N = b.getAllResponseHeaders(),
                                    C = {},
                                    k = b.responseXML,
                                    k && k.documentElement && (C.xml = k);
                                    try {
                                        C.text = b.responseText
                                    } catch (e) {}
                                    try {
                                        T = b.statusText
                                    } catch (e) {
                                        T = ""
                                    }
                                    w || !s.isLocal || s.crossDomain ? 1223 === w && (w = 204) : w = C.text ? 200 : 404
                                }
                        } catch (E) {
                            g || y(-1, E)
                        }
                        C && y(w, T, C, N)
                    }
                    ,
                    s.async ? 4 === b.readyState ? setTimeout(h, 0) : (v = ++ur,
                    lr && (sr || (sr = {},
                    ht(a).unload(lr)),
                    sr[v] = h),
                    b.onreadystatechange = h) : h()
                },
                abort: function() {
                    h && h(0, 1)
                }
            }
        }
    });
    var cr, fr, pr = /^(?:toggle|show|hide)$/, dr = new RegExp("^(?:([-+])=|)(" + gt + ")([a-z%]*)$","i"), hr = /queueHooks$/, gr = [G], mr = {
        "*": [function(a, c) {
            var h, g, y = this.createTween(a, c), v = dr.exec(c), b = y.cur(), w = +b || 0, T = 1, N = 20;
            if (v) {
                if (h = +v[2],
                g = v[3] || (ht.cssNumber[a] ? "" : "px"),
                "px" !== g && w) {
                    w = ht.css(y.elem, a, !0) || h || 1;
                    do
                        T = T || ".5",
                        w /= T,
                        ht.style(y.elem, a, w + g);
                    while (T !== (T = y.cur() / b) && 1 !== T && --N)
                }
                y.unit = g,
                y.start = w,
                y.end = v[1] ? w + (v[1] + 1) * h : h
            }
            return y
        }
        ]
    };
    ht.Animation = ht.extend(V, {
        tweener: function(a, c) {
            ht.isFunction(a) ? (c = a,
            a = ["*"]) : a = a.split(" ");
            for (var h, g = 0, y = a.length; y > g; g++)
                h = a[g],
                mr[h] = mr[h] || [],
                mr[h].unshift(c)
        },
        prefilter: function(a, c) {
            c ? gr.unshift(a) : gr.push(a)
        }
    }),
    ht.Tween = Q,
    Q.prototype = {
        constructor: Q,
        init: function(a, c, h, g, y, v) {
            this.elem = a,
            this.prop = h,
            this.easing = y || "swing",
            this.options = c,
            this.start = this.now = this.cur(),
            this.end = g,
            this.unit = v || (ht.cssNumber[h] ? "" : "px")
        },
        cur: function() {
            var a = Q.propHooks[this.prop];
            return a && a.get ? a.get(this) : Q.propHooks._default.get(this)
        },
        run: function(a) {
            var c, h = Q.propHooks[this.prop];
            return this.pos = c = this.options.duration ? ht.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
            this.now = (this.end - this.start) * c + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            h && h.set ? h.set(this) : Q.propHooks._default.set(this),
            this
        }
    },
    Q.prototype.init.prototype = Q.prototype,
    Q.propHooks = {
        _default: {
            get: function(a) {
                var c;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (c = ht.css(a.elem, a.prop, !1, ""),
                c && "auto" !== c ? c : 0) : a.elem[a.prop]
            },
            set: function(a) {
                ht.fx.step[a.prop] ? ht.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ht.cssProps[a.prop]] || ht.cssHooks[a.prop]) ? ht.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    ht.each(["toggle", "show", "hide"], function(i, a) {
        var c = ht.fn[a];
        ht.fn[a] = function(h, g, y) {
            return null == h || "boolean" == typeof h || !i && ht.isFunction(h) && ht.isFunction(g) ? c.apply(this, arguments) : this.animate(K(a, !0), h, g, y)
        }
    }),
    ht.fn.extend({
        fadeTo: function(a, c, h, g) {
            return this.filter(L).css("opacity", 0).show().end().animate({
                opacity: c
            }, a, h, g)
        },
        animate: function(a, c, h, g) {
            var y = ht.isEmptyObject(a)
              , v = ht.speed(c, h, g)
              , b = function() {
                var c = V(this, ht.extend({}, a), v);
                y && c.stop(!0)
            };
            return y || v.queue === !1 ? this.each(b) : this.queue(v.queue, b)
        },
        stop: function(a, h, g) {
            var y = function(a) {
                var c = a.stop;
                delete a.stop,
                c(g)
            };
            return "string" != typeof a && (g = h,
            h = a,
            a = c),
            h && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var c = !0
                  , h = null != a && a + "queueHooks"
                  , v = ht.timers
                  , b = ht._data(this);
                if (h)
                    b[h] && b[h].stop && y(b[h]);
                else
                    for (h in b)
                        b[h] && b[h].stop && hr.test(h) && y(b[h]);
                for (h = v.length; h--; )
                    v[h].elem !== this || null != a && v[h].queue !== a || (v[h].anim.stop(g),
                    c = !1,
                    v.splice(h, 1));
                (c || !g) && ht.dequeue(this, a)
            })
        }
    }),
    ht.each({
        slideDown: K("show"),
        slideUp: K("hide"),
        slideToggle: K("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, c) {
        ht.fn[a] = function(a, h, g) {
            return this.animate(c, a, h, g)
        }
    }),
    ht.speed = function(a, c, h) {
        var g = a && "object" == typeof a ? ht.extend({}, a) : {
            complete: h || !h && c || ht.isFunction(a) && a,
            duration: a,
            easing: h && c || c && !ht.isFunction(c) && c
        };
        return g.duration = ht.fx.off ? 0 : "number" == typeof g.duration ? g.duration : g.duration in ht.fx.speeds ? ht.fx.speeds[g.duration] : ht.fx.speeds._default,
        (null == g.queue || g.queue === !0) && (g.queue = "fx"),
        g.old = g.complete,
        g.complete = function() {
            ht.isFunction(g.old) && g.old.call(this),
            g.queue && ht.dequeue(this, g.queue)
        }
        ,
        g
    }
    ,
    ht.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }
    },
    ht.timers = [],
    ht.fx = Q.prototype.init,
    ht.fx.tick = function() {
        var a, h = ht.timers, i = 0;
        for (cr = ht.now(); i < h.length; i++)
            a = h[i],
            a() || h[i] !== a || h.splice(i--, 1);
        h.length || ht.fx.stop(),
        cr = c
    }
    ,
    ht.fx.timer = function(a) {
        a() && ht.timers.push(a) && !fr && (fr = setInterval(ht.fx.tick, ht.fx.interval))
    }
    ,
    ht.fx.interval = 13,
    ht.fx.stop = function() {
        clearInterval(fr),
        fr = null
    }
    ,
    ht.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    ht.fx.step = {},
    ht.expr && ht.expr.filters && (ht.expr.filters.animated = function(a) {
        return ht.grep(ht.timers, function(c) {
            return a === c.elem
        }).length
    }
    );
    var yr = /^(?:body|html)$/i;
    ht.fn.offset = function(a) {
        if (arguments.length)
            return a === c ? this : this.each(function(i) {
                ht.offset.setOffset(this, a, i)
            });
        var h, g, y, v, b, w, T, N = {
            top: 0,
            left: 0
        }, C = this[0], k = C && C.ownerDocument;
        if (k)
            return (g = k.body) === C ? ht.offset.bodyOffset(C) : (h = k.documentElement,
            ht.contains(h, C) ? ("undefined" != typeof C.getBoundingClientRect && (N = C.getBoundingClientRect()),
            y = Z(k),
            v = h.clientTop || g.clientTop || 0,
            b = h.clientLeft || g.clientLeft || 0,
            w = y.pageYOffset || h.scrollTop,
            T = y.pageXOffset || h.scrollLeft,
            {
                top: N.top + w - v,
                left: N.left + T - b
            }) : N)
    }
    ,
    ht.offset = {
        bodyOffset: function(a) {
            var c = a.offsetTop
              , h = a.offsetLeft;
            return ht.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(ht.css(a, "marginTop")) || 0,
            h += parseFloat(ht.css(a, "marginLeft")) || 0),
            {
                top: c,
                left: h
            }
        },
        setOffset: function(a, c, i) {
            var h = ht.css(a, "position");
            "static" === h && (a.style.position = "relative");
            var g, y, v = ht(a), b = v.offset(), w = ht.css(a, "top"), T = ht.css(a, "left"), N = ("absolute" === h || "fixed" === h) && ht.inArray("auto", [w, T]) > -1, C = {}, k = {};
            N ? (k = v.position(),
            g = k.top,
            y = k.left) : (g = parseFloat(w) || 0,
            y = parseFloat(T) || 0),
            ht.isFunction(c) && (c = c.call(a, i, b)),
            null != c.top && (C.top = c.top - b.top + g),
            null != c.left && (C.left = c.left - b.left + y),
            "using"in c ? c.using.call(a, C) : v.css(C)
        }
    },
    ht.fn.extend({
        position: function() {
            if (this[0]) {
                var a = this[0]
                  , c = this.offsetParent()
                  , h = this.offset()
                  , g = yr.test(c[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : c.offset();
                return h.top -= parseFloat(ht.css(a, "marginTop")) || 0,
                h.left -= parseFloat(ht.css(a, "marginLeft")) || 0,
                g.top += parseFloat(ht.css(c[0], "borderTopWidth")) || 0,
                g.left += parseFloat(ht.css(c[0], "borderLeftWidth")) || 0,
                {
                    top: h.top - g.top,
                    left: h.left - g.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || nt.body; a && !yr.test(a.nodeName) && "static" === ht.css(a, "position"); )
                    a = a.offsetParent;
                return a || nt.body
            })
        }
    }),
    ht.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, h) {
        var g = /Y/.test(h);
        ht.fn[a] = function(y) {
            return ht.access(this, function(a, y, v) {
                var b = Z(a);
                return v === c ? b ? h in b ? b[h] : b.document.documentElement[y] : a[y] : void (b ? b.scrollTo(g ? ht(b).scrollLeft() : v, g ? v : ht(b).scrollTop()) : a[y] = v)
            }, a, y, arguments.length, null)
        }
    }),
    ht.each({
        Height: "height",
        Width: "width"
    }, function(a, h) {
        ht.each({
            padding: "inner" + a,
            content: h,
            "": "outer" + a
        }, function(g, y) {
            ht.fn[y] = function(y, v) {
                var b = arguments.length && (g || "boolean" != typeof y)
                  , w = g || (y === !0 || v === !0 ? "margin" : "border");
                return ht.access(this, function(h, g, y) {
                    var v;
                    return ht.isWindow(h) ? h.document.documentElement["client" + a] : 9 === h.nodeType ? (v = h.documentElement,
                    Math.max(h.body["scroll" + a], v["scroll" + a], h.body["offset" + a], v["offset" + a], v["client" + a])) : y === c ? ht.css(h, g, y, w) : ht.style(h, g, y, w)
                }, h, b ? y : c, b, null)
            }
        })
    }),
    a.jQuery = a.$ = ht,
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return ht
    })
}(window);
!function() {
    for (var a, c = function() {}, g = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], v = g.length, w = window.console = window.console || {}; v--; )
        a = g[v],
        w[a] || (w[a] = c);
    String.prototype.trim = function() {
        return this.replace(/^s+|s+$/g, "")
    }
}();
var Namespace = function(a) {
    var c = function(a) {
        return "object" == typeof a && a.sort ? a : new Array(a)
    }
      , g = function(c) {
        var g = arguments[1] || !1
          , v = a;
        if ("" != c)
            for (var w = c.split(Namespace.separator), i = 0, h = w.length; h > i; i++)
                v[w[i]] || (v[w[i]] = {}),
                v = v[w[i]];
        if (g)
            for (var N in g)
                v[N] = g[N];
        return v
    };
    return g.use = function(v, w) {
        for (var h = w ? a : {}, N = c(v), i = (arguments[1] || !1,
        0), y = N.length; y > i; i++) {
            v = N[i];
            var E = v.split(Namespace.separator)
              , b = E.pop()
              , j = g(E.join(Namespace.separator));
            if ("*" == b)
                for (var S in j)
                    h[S] = j[S];
            else
                j[b] && (h[b] = j[b])
        }
        return h
    }
    ,
    g
}(window);
$.ajaxSetup({
    cache: !0
}),
Namespace.separator = ".",
"undefined" != typeof console && (console.log = function() {}
);
