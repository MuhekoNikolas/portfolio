/*!
 * Tiny Link Checker plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 3.0.3-50
 */

!function() {
        "use strict";
        const e = Object.getPrototypeOf
          , t = (e,t,r)=>{
                var n;
                return !!r(e, t.prototype) || (null === (n = e.constructor) || void 0 === n ? void 0 : n.name) === t.name
        }
          , r = e=>r=>(e=>{
                const r = typeof e;
                return null === e ? "null" : "object" === r && Array.isArray(e) ? "array" : "object" === r && t(e, String, ((e,t)=>t.isPrototypeOf(e))) ? "string" : r
        }
        )(r) === e
          , n = e=>t=>typeof t === e
          , o = r("object")
          , s = r=>((r,n)=>o(r) && t(r, n, ((t,r)=>e(t) === r)))(r, Object)
          , a = r("array")
          , c = n("boolean")
          , u = (void 0,
        e=>undefined === e);
        const i = e=>!(e=>null == e)(e)
          , l = n("function");
        class p {
                constructor(e, t) {
                        this.tag = e,
                        this.value = t
                }
                static some(e) {
                        return new p(!0,e)
                }
                static none() {
                        return p.singletonNone
                }
                fold(e, t) {
                        return this.tag ? t(this.value) : e()
                }
                isSome() {
                        return this.tag
                }
                isNone() {
                        return !this.tag
                }
                map(e) {
                        return this.tag ? p.some(e(this.value)) : p.none()
                }
                bind(e) {
                        return this.tag ? e(this.value) : p.none()
                }
                exists(e) {
                        return this.tag && e(this.value)
                }
                forall(e) {
                        return !this.tag || e(this.value)
                }
                filter(e) {
                        return !this.tag || e(this.value) ? this : p.none()
                }
                getOr(e) {
                        return this.tag ? this.value : e
                }
                or(e) {
                        return this.tag ? this : e
                }
                getOrThunk(e) {
                        return this.tag ? this.value : e()
                }
                orThunk(e) {
                        return this.tag ? this : e()
                }
                getOrDie(e) {
                        if (this.tag)
                                return this.value;
                        throw new Error(null != e ? e : "Called getOrDie on None")
                }
                static from(e) {
                        return i(e) ? p.some(e) : p.none()
                }
                getOrNull() {
                        return this.tag ? this.value : null
                }
                getOrUndefined() {
                        return this.value
                }
                each(e) {
                        this.tag && e(this.value)
                }
                toArray() {
                        return this.tag ? [this.value] : []
                }
                toString() {
                        return this.tag ? `some(${this.value})` : "none()"
                }
        }
        p.singletonNone = new p(!1);
        const h = e=>parseInt(e, 10)
          , d = (e,t)=>{
                const r = e - t;
                return 0 === r ? 0 : r > 0 ? 1 : -1
        }
          , m = (e,t,r)=>({
                major: e,
                minor: t,
                patch: r
        })
          , g = e=>{
                const t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
                return t ? m(h(t[1]), h(t[2]), h(t[3])) : m(0, 0, 0)
        }
          , f = ()=>{}
          , k = (e,t)=>(...r)=>e(t.apply(null, r))
          , v = e=>()=>e
          , y = e=>e
          , w = e=>e()
          , b = v(!1)
          , T = v(!0)
          , x = e=>t=>t.options.get(e)
          , O = x("linkchecker_content_css")
          , E = x("linkchecker_service_url")
          , S = x("linkchecker_preprocess")
          , j = x("contextmenu")
          , A = (e,t)=>{
                let r;
                const n = (...n)=>{
                        clearTimeout(r),
                        r = setTimeout((function() {
                                e.apply(this, n)
                        }
                        ), t)
                }
                ;
                return n.stop = ()=>{
                        clearTimeout(r)
                }
                ,
                n
        }
          , R = Array.prototype.indexOf
          , _ = Array.prototype.push
          , C = (e,t)=>{
                const r = e.length
                  , n = new Array(r);
                for (let o = 0; o < r; o++) {
                        const r = e[o];
                        n[o] = t(r, o)
                }
                return n
        }
          , N = (e,t)=>{
                for (let r = 0, n = e.length; r < n; r++)
                        t(e[r], r)
        }
          , D = (e,t,r)=>(N(e, ((e,n)=>{
                r = t(r, e, n)
        }
        )),
        r)
          , M = e=>{
                const t = [];
                for (let r = 0, n = e.length; r < n; ++r) {
                        if (!a(e[r]))
                                throw new Error("Arr.flatten item " + r + " was not an array, input: " + e);
                        _.apply(t, e[r])
                }
                return t
        }
          , U = Object.keys
          , F = Object.hasOwnProperty
          , I = (e,t)=>{
                const r = U(e);
                for (let n = 0, o = r.length; n < o; n++) {
                        const o = r[n];
                        t(e[o], o)
                }
        }
          , J = (e,t)=>q(e, ((e,r)=>({
                k: r,
                v: t(e, r)
        })))
          , q = (e,t)=>{
                const r = {};
                return I(e, ((e,n)=>{
                        const o = t(e, n);
                        r[o.k] = o.v
                }
                )),
                r
        }
          , L = (e,t)=>{
                const r = [];
                return I(e, ((e,n)=>{
                        r.push(t(e, n))
                }
                )),
                r
        }
          , P = (e,t)=>V(e, t) ? p.from(e[t]) : p.none()
          , V = (e,t)=>F.call(e, t)
          , B = e=>{
                if (!a(e))
                        throw new Error("cases must be an array");
                if (0 === e.length)
                        throw new Error("there must be at least one case");
                const t = []
                  , r = {};
                return N(e, ((n,o)=>{
                        const s = U(n);
                        if (1 !== s.length)
                                throw new Error("one and only one name per case");
                        const c = s[0]
                          , u = n[c];
                        if (void 0 !== r[c])
                                throw new Error("duplicate key detected:" + c);
                        if ("cata" === c)
                                throw new Error("cannot have a case named cata (sorry)");
                        if (!a(u))
                                throw new Error("case arguments must be an array");
                        t.push(c),
                        r[c] = (...r)=>{
                                const n = r.length;
                                if (n !== u.length)
                                        throw new Error("Wrong number of arguments to case " + c + ". Expected " + u.length + " (" + u + "), got " + n);
                                return {
                                        fold: (...t)=>{
                                                if (t.length !== e.length)
                                                        throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                                                return t[o].apply(null, r)
                                        }
                                        ,
                                        match: e=>{
                                                const n = U(e);
                                                if (t.length !== n.length)
                                                        throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + n.join(","));
                                                if (!((e,t)=>{
                                                        for (let t = 0, o = e.length; t < o; ++t)
                                                                if (!0 !== (r = e[t],
                                                                ((e,t)=>((e,t)=>R.call(e, t))(e, t) > -1)(n, r)))
                                                                        return !1;
                                                        var r;
                                                        return !0
                                                }
                                                )(t))
                                                        throw new Error("Not all branches were specified when using match. Specified: " + n.join(", ") + "\nRequired: " + t.join(", "));
                                                return e[c].apply(null, r)
                                        }
                                        ,
                                        log: e=>{
                                                console.log(e, {
                                                        constructors: t,
                                                        constructor: c,
                                                        params: r
                                                })
                                        }
                                }
                        }
                }
                )),
                r
        }
          , $ = B([{
                invalid: ["invalidUrl"]
        }, {
                unknown: ["unknownUrl"]
        }, {
                valid: ["validUrl"]
        }])
          , H = (e,t,r,n)=>e.fold(t, r, n)
          , z = e=>/^https?:\/\//.test(e)
          , K = e=>(e=>0 === e.indexOf("mailto:"))(e) || (e=>"#" === e.charAt(0))(e)
          , W = tinymce.DOM
          , X = tinymce.util.Tools
          , Y = "data-mce-linkchecker-status"
          , G = "data-mce-linkchecker-focus"
          , Q = e=>{
                const t = W.select('a[href]:not([href=""])', e).filter((e=>W.isEditable(e)));
                return X.map(t, (e=>W.getAttrib(e, "href")))
        }
          , Z = (e,t)=>{
                W.setAttrib(e, Y, t),
                re(e) && W.setAttrib(e, "aria-invalid", !0)
        }
          , ee = (e,t)=>X.map(t, (t=>({
                url: e(W.getAttrib(t, "href")),
                elm: t
        })))
          , te = (e,t)=>X.grep(e, (e=>e.url === t))
          , re = e=>"invalid" === W.getAttrib(e, Y)
          , ne = e=>t=>{
                X.each(t, (t=>{
                        t.attr(e, null)
                }
                ))
        }
          , oe = e=>t=>{
                const r = t.trim()
                  , n = (e=>!z(e) && (e=>/^\w+:/.test(e))(e))(r) ? r : e.documentBaseURI.toAbsolute(r)
                  , o = (e=>e.replace(/ /g, "%20"))(0 === n.indexOf("//") ? window.location.protocol + n : n);
                return (e=>{
                        const t = document.createElement("a");
                        return t.href = e,
                        z(e) ? t.href : e
                }
                )(o)
        }
          , se = e=>()=>{
                e.execCommand("mceLink")
        }
          , ae = (e,t)=>()=>{
                (e=>{
                        const t = document.createElement("a");
                        t.target = "_blank",
                        t.href = e,
                        t.rel = "noreferrer noopener";
                        const r = document.createEvent("MouseEvents");
                        r.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                        t.dispatchEvent(r)
                }
                )(oe(e)(tinymce.DOM.getAttrib(t, "href")))
        }
          , ce = (e,t)=>()=>{
                e.undoManager.transact((()=>{
                        tinymce.DOM.remove(t, !0)
                }
                ))
        }
          , ue = (e,t)=>()=>{
                e.add(t.href),
                (e=>{
                        Z(e, "ignored")
                }
                )(t)
        }
          , ie = (e,t,r)=>[{
                text: "Ignore",
                onAction: ue(r, t)
        }]
          , le = tinymce.util.Tools
          , pe = (e,t)=>le.grep(e, (e=>!t.has(e)))
          , he = e=>t=>z(t) === e
          , de = (e,t,r,n,o)=>{
                const s = o.getBody();
                ((e,t,r,n,o)=>{
                        const s = le.grep(le.map(Q(o), r), he(!0));
                        e.checkMany(pe(s, t)).get((e=>{
                                e.fold(n.logError, (e=>((e,t,r)=>{
                                        const n = ee(t, W.select("a[href]", e));
                                        X.each(r, ((e,t)=>{
                                                X.each(te(n, t), (t=>{
                                                        H(e.result, (e=>{
                                                                Z(t.elm, "invalid")
                                                        }
                                                        ), (e=>{
                                                                Z(t.elm, "unknown")
                                                        }
                                                        ), (e=>{
                                                                Z(t.elm, "valid")
                                                        }
                                                        ))
                                                }
                                                ))
                                        }
                                        ))
                                }
                                )(o, r, e)))
                        }
                        ))
                }
                )(e, t, r, n, s),
                ((e,t,r,n,o)=>{
                        const s = le.grep(le.map(Q(o), r), he(!1));
                        var a;
                        ((e,t,r)=>{
                                const n = ee(t, W.select("a[href]", e));
                                X.each(r, (e=>{
                                        X.each(te(n, e), (e=>{
                                                Z(e.elm, "unknown")
                                        }
                                        ))
                                }
                                ))
                        }
                        )(o, r, pe((a = s,
                        le.grep(a, (e=>!K(e)))), t))
                }
                )(0, t, r, 0, s)
        }
          , me = (e,t,r,n,o)=>{
                const s = A(de, 500);
                var a;
                (a = e.serializer).addTempAttr(Y),
                a.addTempAttr(G),
                a.addAttributeFilter(Y, ne(Y)),
                a.addAttributeFilter(G, ne(Y)),
                e.dom.loadCSS(O(e)),
                e.on("change setContent undo redo", (()=>{
                        s(n, t, r, o, e)
                }
                )),
                de(n, t, r, o, e),
                ((e,t)=>{
                        e.ui.registry.addContextMenu("linkchecker", {
                                update: r=>{
                                        const n = e.dom.getParent(r, "a[href]");
                                        return i(n) && re(n) ? ((e,t,r)=>{
                                                const n = ((e,t)=>{
                                                        const r = [];
                                                        for (let t = 0, n = e.length; t < n; t++) {
                                                                const n = e[t];
                                                                "" !== n && r.push(n)
                                                        }
                                                        return r
                                                }
                                                )(j(e));
                                                if (0 !== n.length && -1 === n.indexOf("link")) {
                                                        const n = [{
                                                                text: "Remove link",
                                                                icon: "unlink",
                                                                onAction: ce(e, r)
                                                        }, {
                                                                text: "Open link",
                                                                icon: "new-tab",
                                                                onAction: ae(e, r)
                                                        }, {
                                                                type: "separator"
                                                        }];
                                                        return (e=>e.plugins.link ? [{
                                                                text: "Link...",
                                                                icon: "link",
                                                                onAction: se(e)
                                                        }] : [])(e).concat(n).concat(ie(0, r, t))
                                                }
                                                return ie(0, r, t)
                                        }
                                        )(e, t, n) : []
                                }
                        })
                }
                )(e, t)
        }
          , ge = (e,t)=>()=>({
                status: e,
                message: t
        })
          , fe = ge("invalid", "URL does not seem to be valid")
          , ke = ge("none", "")
          , ve = ge("valid", "The URL seems to be valid")
          , ye = e=>{
                const t = t=>t(e)
                  , r = v(e)
                  , n = ()=>o
                  , o = {
                        tag: !0,
                        inner: e,
                        fold: (t,r)=>r(e),
                        isValue: T,
                        isError: b,
                        map: t=>be.value(t(e)),
                        mapError: n,
                        bind: t,
                        exists: t,
                        forall: t,
                        getOr: r,
                        or: n,
                        getOrThunk: r,
                        orThunk: n,
                        getOrDie: r,
                        each: t=>{
                                t(e)
                        }
                        ,
                        toOptional: ()=>p.some(e)
                };
                return o
        }
          , we = e=>{
                const t = ()=>r
                  , r = {
                        tag: !1,
                        inner: e,
                        fold: (t,r)=>t(e),
                        isValue: b,
                        isError: T,
                        map: t,
                        mapError: t=>be.error(t(e)),
                        bind: t,
                        exists: b,
                        forall: T,
                        getOr: y,
                        or: y,
                        getOrThunk: w,
                        orThunk: w,
                        getOrDie: (n = String(e),
                        ()=>{
                                throw new Error(n)
                        }
                        ),
                        each: f,
                        toOptional: p.none
                };
                var n;
                return r
        }
          , be = {
                value: ye,
                error: we,
                fromOption: (e,t)=>e.fold((()=>we(t)), ye)
        };
        var Te;
        !function(e) {
                e[e.Error = 0] = "Error",
                e[e.Value = 1] = "Value"
        }(Te || (Te = {}));
        const xe = (e,t,r)=>e.stype === Te.Error ? t(e.serror) : r(e.svalue)
          , Oe = e=>({
                stype: Te.Value,
                svalue: e
        })
          , Ee = e=>({
                stype: Te.Error,
                serror: e
        })
          , Se = xe
          , je = e=>o(e) && U(e).length > 100 ? " removed due to size" : JSON.stringify(e, null, 2)
          , Ae = (e,t)=>Ee([{
                path: e,
                getErrorInfo: t
        }])
          , Re = e=>(...t)=>{
                if (0 === t.length)
                        throw new Error("Can't merge zero objects");
                const r = {};
                for (let n = 0; n < t.length; n++) {
                        const o = t[n];
                        for (const t in o)
                                V(o, t) && (r[t] = e(r[t], o[t]))
                }
                return r
        }
          , _e = Re(((e,t)=>s(e) && s(t) ? _e(e, t) : t))
          , Ce = (Re(((e,t)=>t)),
        e=>k(Ee, M)(e))
          , Ne = e=>{
                const t = (e=>{
                        const t = []
                          , r = [];
                        return N(e, (e=>{
                                xe(e, (e=>r.push(e)), (e=>t.push(e)))
                        }
                        )),
                        {
                                values: t,
                                errors: r
                        }
                }
                )(e);
                return t.errors.length > 0 ? Ce(t.errors) : Oe(t.values)
        }
          , De = (e,t,r)=>{
                switch (e.tag) {
                case "field":
                        return t(e.key, e.newKey, e.presence, e.prop);
                case "custom":
                        return r(e.newKey, e.instantiator)
                }
        }
          , Me = (Ue = Oe,
        {
                extract: (e,t)=>{
                        return r = Ue(t),
                        n = t=>((e,t)=>Ae(e, v(t)))(e, t),
                        r.stype === Te.Error ? n(r.serror) : r;
                        var r, n
                }
                ,
                toString: v("val")
        });
        var Ue;
        const Fe = (e,t,r,n)=>n(P(e, t).getOrThunk((()=>r(e))))
          , Ie = (e,t,r,n,o)=>{
                const s = e=>o.extract(t.concat([n]), e)
                  , a = e=>e.fold((()=>Oe(p.none())), (e=>{
                        const r = o.extract(t.concat([n]), e);
                        return s = r,
                        a = p.some,
                        s.stype === Te.Value ? {
                                stype: Te.Value,
                                svalue: a(s.svalue)
                        } : s;
                        var s, a
                }
                ));
                switch (e.tag) {
                case "required":
                        return ((e,t,r,n)=>P(t, r).fold((()=>((e,t,r)=>Ae(e, (()=>'Could not find valid *required* value for "' + t + '" in ' + je(r))))(e, r, t)), n))(t, r, n, s);
                case "defaultedThunk":
                        return Fe(r, n, e.process, s);
                case "option":
                        return ((e,t,r)=>r(P(e, t)))(r, n, a);
                case "defaultedOptionThunk":
                        return ((e,t,r,n)=>n(P(e, t).map((t=>!0 === t ? r(e) : t))))(r, n, e.process, a);
                case "mergeWithThunk":
                        return Fe(r, n, v({}), (t=>{
                                const n = _e(e.process(r), t);
                                return s(n)
                        }
                        ))
                }
        }
          , Je = e=>({
                extract: (t,r)=>((e,t,r)=>{
                        const n = {}
                          , o = [];
                        for (const s of r)
                                De(s, ((r,s,a,c)=>{
                                        const u = Ie(a, e, t, r, c);
                                        Se(u, (e=>{
                                                o.push(...e)
                                        }
                                        ), (e=>{
                                                n[s] = e
                                        }
                                        ))
                                }
                                ), ((e,r)=>{
                                        n[e] = r(t)
                                }
                                ));
                        return o.length > 0 ? Ee(o) : Oe(n)
                }
                )(t, r, e),
                toString: ()=>{
                        const t = C(e, (e=>De(e, ((e,t,r,n)=>e + " -> " + n.toString()), ((e,t)=>"state(" + e + ")"))));
                        return "obj{\n" + t.join("\n") + "}"
                }
        })
          , qe = k((e=>({
                extract: (t,r)=>{
                        const n = C(r, ((r,n)=>e.extract(t.concat(["[" + n + "]"]), r)));
                        return Ne(n)
                }
                ,
                toString: ()=>"array(" + e.toString() + ")"
        })), Je)
          , Le = (e,t,r)=>{
                return n = ((e,t,r)=>((e,t)=>e.stype === Te.Error ? {
                        stype: Te.Error,
                        serror: t(e.serror)
                } : e)(t.extract([e], r), (e=>({
                        input: r,
                        errors: e
                }))))(e, t, r),
                xe(n, be.error, be.value);
                var n
        }
          , Pe = (e,t,r)=>Le(e, t, r).fold((e=>{
                throw new Error(Ve(e))
        }
        ), y)
          , Ve = e=>"Errors: \n" + (e=>{
                const t = e.length > 10 ? e.slice(0, 10).concat([{
                        path: [],
                        getErrorInfo: v("... (only showing first ten failures)")
                }]) : e;
                return C(t, (e=>"Failed path: (" + e.path.join(" > ") + ")\n" + e.getErrorInfo()))
        }
        )(e.errors).join("\n") + "\n\nInput object: " + je(e.input)
          , Be = ()=>(new Date).getTime();
        var $e;
        !function(e) {
                e.JSON = "json",
                e.Blob = "blob",
                e.Text = "text",
                e.FormData = "formdata",
                e.MultipartFormData = "multipart/form-data"
        }($e || ($e = {}));
        const He = e=>{
                let t = p.none()
                  , r = [];
                const n = e=>{
                        o() ? s(e) : r.push(e)
                }
                  , o = ()=>t.isSome()
                  , s = e=>{
                        t.each((t=>{
                                setTimeout((()=>{
                                        e(t)
                                }
                                ), 0)
                        }
                        ))
                }
                ;
                return e((e=>{
                        o() || (t = p.some(e),
                        N(r, s),
                        r = [])
                }
                )),
                {
                        get: n,
                        map: e=>He((t=>{
                                n((r=>{
                                        t(e(r))
                                }
                                ))
                        }
                        )),
                        isReady: o
                }
        }
          , ze = {
                nu: He,
                pure: e=>He((t=>{
                        t(e)
                }
                ))
        }
          , Ke = e=>{
                setTimeout((()=>{
                        throw e
                }
                ), 0)
        }
          , We = e=>{
                const t = t=>{
                        e().then(t, Ke)
                }
                ;
                return {
                        map: t=>We((()=>e().then(t))),
                        bind: t=>We((()=>e().then((e=>t(e).toPromise())))),
                        anonBind: t=>We((()=>e().then((()=>t.toPromise())))),
                        toLazy: ()=>ze.nu(t),
                        toCached: ()=>{
                                let t = null;
                                return We((()=>(null === t && (t = e()),
                                t)))
                        }
                        ,
                        toPromise: e,
                        get: t
                }
        }
          , Xe = e=>We((()=>new Promise(e)))
          , Ye = e=>We((()=>Promise.resolve(e)))
          , Ge = e=>({
                ...e,
                toCached: ()=>Ge(e.toCached()),
                bindFuture: t=>Ge(e.bind((e=>e.fold((e=>Ye(be.error(e))), (e=>t(e)))))),
                bindResult: t=>Ge(e.map((e=>e.bind(t)))),
                mapResult: t=>Ge(e.map((e=>e.map(t)))),
                mapError: t=>Ge(e.map((e=>e.mapError(t)))),
                foldResult: (t,r)=>e.map((e=>e.fold(t, r))),
                withTimeout: (t,r)=>Ge(Xe((n=>{
                        let o = !1;
                        const s = setTimeout((()=>{
                                o = !0,
                                n(be.error(r()))
                        }
                        ), t);
                        e.get((e=>{
                                o || (clearTimeout(s),
                                n(e))
                        }
                        ))
                }
                )))
        })
          , Qe = e=>Ge(Xe(e))
          , Ze = e=>Ge(Ye(be.value(e)))
          , et = {
                nu: Qe,
                wrap: Ge,
                pure: Ze,
                value: Ze,
                error: e=>Ge(Ye(be.error(e))),
                fromResult: e=>Ge(Ye(e)),
                fromFuture: e=>Ge(e.map(be.value)),
                fromPromise: e=>Qe((t=>{
                        e.then((e=>{
                                t(be.value(e))
                        }
                        ), (e=>{
                                t(be.error(e))
                        }
                        ))
                }
                ))
        };
        "undefined" != typeof window ? window : Function("return this;")();
        const tt = e=>Xe((t=>{
                const r = new FileReader;
                r.onload = e=>{
                        const r = e.target ? e.target.result : "";
                        t(r)
                }
                ,
                r.readAsText(e)
        }
        ))
          , rt = e=>{
                try {
                        const t = JSON.parse(e);
                        return be.value(t)
                } catch (e) {
                        return be.error("Response was not JSON.")
                }
        }
          , nt = e=>Ye(e.response)
          , ot = e=>et.nu((t=>{
                const r = new XMLHttpRequest;
                var n;
                r.open(e.method, (n = e.url,
                p.from(e.query).map((e=>{
                        const t = L(e, ((e,t)=>encodeURIComponent(t) + "=" + encodeURIComponent(e)))
                          , r = ((e,t,r=0,n)=>{
                                const o = e.indexOf(t, r);
                                return -1 !== o && (!!u(n) || o + t.length <= n)
                        }
                        )(n, "?") ? "&" : "?";
                        return t.length > 0 ? n + r + t.join("&") : n
                }
                )).getOr(n)), !0);
                const o = (e=>{
                        const t = (r = e.body,
                        p.from(r).bind((e=>{
                                switch (e.type) {
                                case $e.JSON:
                                        return p.some("application/json");
                                case $e.FormData:
                                        return p.some("application/x-www-form-urlencoded; charset=UTF-8");
                                case $e.MultipartFormData:
                                        return p.none();
                                case $e.Text:
                                default:
                                        return p.some("text/plain")
                                }
                        }
                        )));
                        var r;
                        const n = !0 === e.credentials ? p.some(!0) : p.none()
                          , o = (e=>{
                                switch (e) {
                                case $e.Blob:
                                        return "application/octet-stream";
                                case $e.JSON:
                                        return "application/json, text/javascript";
                                case $e.Text:
                                        return "text/plain";
                                default:
                                        return ""
                                }
                        }
                        )(e.responseType) + ", */*; q=0.01"
                          , s = void 0 !== e.headers ? e.headers : {};
                        return {
                                contentType: t,
                                responseType: (e=>{
                                        switch (e) {
                                        case $e.JSON:
                                                return p.none();
                                        case $e.Blob:
                                                return p.some("blob");
                                        case $e.Text:
                                                return p.some("text");
                                        default:
                                                return p.none()
                                        }
                                }
                                )(e.responseType),
                                credentials: n,
                                accept: o,
                                headers: s,
                                progress: l(e.progress) ? p.some(e.progress) : p.none()
                        }
                }
                )(e);
                ((e,t)=>{
                        t.contentType.each((t=>e.setRequestHeader("Content-Type", t))),
                        e.setRequestHeader("Accept", t.accept),
                        t.credentials.each((t=>e.withCredentials = t)),
                        t.responseType.each((t=>e.responseType = t)),
                        t.progress.each((t=>e.upload.addEventListener("progress", (e=>t(e.loaded, e.total))))),
                        I(t.headers, ((t,r)=>e.setRequestHeader(r, t)))
                }
                )(r, o);
                const s = ()=>{
                        ((e,t,r)=>((e,t)=>{
                                switch (e) {
                                case $e.JSON:
                                        return rt(t.response).fold((()=>nt(t)), Ye);
                                case $e.Blob:
                                        return (e=>p.from(e.response).map(tt).getOr(Ye("no response content")))(t);
                                case $e.Text:
                                default:
                                        return nt(t)
                                }
                        }
                        )(t, r).map((t=>({
                                message: 0 === r.status ? "Unknown HTTP error (possible cross-domain request)" : `Could not load url ${e}: ${r.statusText}`,
                                status: r.status,
                                responseText: t
                        }))))(e.url, e.responseType, r).get((e=>t(be.error(e))))
                }
                ;
                var a;
                r.onerror = s,
                r.onload = ()=>{
                        var n, o;
                        0 !== r.status || (n = e.url,
                        o = "file:",
                        n.length >= 5 && n.substr(0, 5) === o) ? r.status < 100 || r.status >= 400 ? s() : ((e,t)=>{
                                const r = e=>et.error({
                                        message: e,
                                        status: t.status,
                                        responseText: t.responseText
                                });
                                switch (e) {
                                case $e.JSON:
                                        return rt(t.response).fold(r, et.pure);
                                case $e.Blob:
                                case $e.Text:
                                        return et.pure(t.response);
                                default:
                                        return r("unknown data type")
                                }
                        }
                        )(e.responseType, r).get(t) : s()
                }
                ,
                (a = e.body,
                p.from(a).map((e=>e.type === $e.JSON ? JSON.stringify(e.data) : e.type === $e.FormData || e.type === $e.MultipartFormData ? (e=>{
                        const t = new FormData;
                        return I(e, ((e,r)=>{
                                t.append(r, e)
                        }
                        )),
                        t
                }
                )(e.data) : e.data))).fold((()=>r.send()), (e=>{
                        r.send(e)
                }
                ))
        }
        ))
          , st = (e,t)=>{
                const r = -1 === e.indexOf("?") ? "?" : "&";
                return t ? e + r + "apiKey=" + encodeURIComponent(t) : e
        }
          , at = e=>P(e, "tiny-api-key").orThunk((()=>P(e, "tinymce-api-key"))).orThunk((()=>P(e, "textbox-api-key"))).getOrUndefined()
          , ct = e=>{
                const t = e.responseText;
                return o(t) ? t : e.message
        }
        ;
        B([{
                bothErrors: ["error1", "error2"]
        }, {
                firstError: ["error1", "value2"]
        }, {
                secondError: ["value1", "error2"]
        }, {
                bothValues: ["value1", "value2"]
        }]);
        const ut = v(Me)
          , it = (e,t,r,n)=>({
                tag: "field",
                key: e,
                newKey: t,
                presence: r,
                prop: n
        })
          , lt = [("url",
        it("url", "url", {
                tag: "required",
                process: {}
        }, ut())), ((e,t)=>it(e, e, {
                tag: "defaultedThunk",
                process: v(!1)
        }, ut()))("fresh")];
        const pt = Je(lt)
          , ht = Je([it("urls", "urls", {
                tag: "required",
                process: {}
        }, qe(lt))])
          , dt = (e,t,r)=>{
                const n = ((e,t=36e5)=>{
                        const r = {}
                          , n = (e,t,n)=>{
                                r[e] = {
                                        result: t,
                                        timestamp: n
                                }
                        }
                          , s = (e,r)=>e - r < t
                          , a = v(r);
                        return o(e) && (e=>{
                                const t = Be();
                                I(e, ((e,r)=>{
                                        s(t, e.timestamp) && n(r, e.result, e.timestamp)
                                }
                                ))
                        }
                        )(e),
                        {
                                set: n,
                                get: (e,t)=>p.from(r[t]).filter((t=>s(e, t.timestamp))).map((e=>e.result)),
                                dump: a
                        }
                }
                )(r)
                  , s = ((e,t,r=ct)=>{
                        const n = at(t);
                        return {
                                execute: o=>{
                                        const s = J(o, (e=>c(e) ? String(e) : e))
                                          , a = st((u = s,
                                        e.replace(/\$\{([^{}]*)\}/g, ((e,t)=>{
                                                const r = u[t];
                                                return (e=>{
                                                        const t = typeof e;
                                                        return "string" === t || "number" === t
                                                }
                                                )(r) ? r.toString() : e
                                        }
                                        ))), n);
                                        var u;
                                        const i = (l = {
                                                url: a,
                                                responseType: $e.JSON,
                                                credentials: !0,
                                                headers: t
                                        },
                                        ot({
                                                ...l,
                                                method: "get",
                                                body: {
                                                        type: $e.Text,
                                                        data: ""
                                                }
                                        })).mapError(r);
                                        var l;
                                        return et.wrap(i)
                                }
                                ,
                                cancelCurrent: f
                        }
                }
                )(e + "/1/check?url=${url}&fresh=${fresh}", t)
                  , a = ((e,t,r=ct)=>{
                        const n = at(t);
                        return {
                                execute: o=>{
                                        const s = (a = {
                                                url: st(e, n),
                                                body: (c = o,
                                                {
                                                        type: $e.JSON,
                                                        data: c
                                                }),
                                                responseType: $e.JSON,
                                                credentials: !0,
                                                headers: t
                                        },
                                        ot({
                                                ...a,
                                                method: "post"
                                        })).mapError(r);
                                        var a, c;
                                        return et.wrap(s)
                                }
                                ,
                                cancelCurrent: f
                        }
                }
                )(e + "/1/check", t)
                  , u = e=>{
                        return {
                                url: e.url,
                                result: (t = e.url,
                                r = e.result,
                                "VALID" === r ? $.valid(t) : "INVALID" === r ? $.invalid(t) : $.unknown(t))
                        };
                        var t, r
                }
                ;
                return {
                        checkOne: (e,t=!1)=>{
                                const r = Be()
                                  , o = ((t,r,n,o,a)=>(a ? p.none() : r.get(o, n)).fold((()=>((t,r)=>{
                                        const n = {
                                                url: encodeURIComponent(e),
                                                fresh: r
                                        }
                                          , o = Pe("ephox.link.service.one.ajax.service.get", pt, n);
                                        return s.execute(o)
                                }
                                )(0, a).mapResult((e=>(r.set(n, e, o),
                                e)))), (e=>et.pure(e))))(0, n, e, r, t);
                                return o.mapResult(u)
                        }
                        ,
                        checkMany: (e,t=!1)=>{
                                const r = Be();
                                return ((e,t,r,n,o,s)=>{
                                        const a = ((e,t,r,n,o)=>o ? {
                                                known: {},
                                                unknown: r
                                        } : D(r, ((r,o)=>{
                                                const s = n(o);
                                                return e(t, s).fold((()=>({
                                                        known: r.known,
                                                        unknown: r.unknown.concat([o])
                                                })), (e=>{
                                                        const t = ((e,t)=>((e,t)=>({
                                                                [e]: t
                                                        }))(e, t))(s, e);
                                                        return {
                                                                known: {
                                                                        ...r.known,
                                                                        ...t
                                                                },
                                                                unknown: r.unknown
                                                        }
                                                }
                                                ))
                                        }
                                        ), {
                                                known: {},
                                                unknown: []
                                        }))(t.get, o, r, n, s);
                                        return 0 === a.unknown.length ? et.value(a.known) : ((e,t,r,n,o,s)=>e(n, s).mapResult((e=>(I(e, ((e,r)=>{
                                                t.set(r, e, o)
                                        }
                                        )),
                                        {
                                                ...r,
                                                ...e
                                        }))))(e, t, a.known, a.unknown, o, s)
                                }
                                )(((e,t)=>{
                                        const r = Pe("ephox.link.service.many.ajax.service.post", ht, {
                                                urls: e
                                        });
                                        return a.execute(r).mapResult((e=>D(e.results, ((e,t)=>(e[t.url] = t,
                                        e)), {})))
                                }
                                ), n, e, (e=>e.url), r, t).mapResult((e=>J(e, u)))
                        }
                        ,
                        dumpCache: n.dump
                }
        }
          , mt = e=>{
                const t = (r = E(e),
                n = (e=>{
                        var t;
                        return null !== (t = e.options.get("api_key")) && void 0 !== t ? t : e.options.get("linkchecker_api_key")
                }
                )(e),
                dt(r, n ? {
                        "tinymce-api-key": n
                } : {}));
                var r, n;
                const o = t=>S(e)(t);
                return {
                        checkOne: e=>{
                                const r = o({
                                        url: e
                                });
                                return t.checkOne(r.url)
                        }
                        ,
                        checkMany: e=>((e,t,r)=>{
                                const n = ((e,t)=>D(e, ((e,r)=>{
                                        const n = {
                                                ...t({
                                                        url: r
                                                }),
                                                origUrl: r
                                        }
                                          , o = n.url;
                                        return {
                                                ...e,
                                                [o]: V(e, o) ? e[o].concat([n]) : [n]
                                        }
                                }
                                ), {}))(e, t);
                                return r(C(L(n, y), (e=>e[0]))).mapResult((e=>((e,t)=>{
                                        const r = {};
                                        return I(e, ((e,n)=>{
                                                const o = t[n];
                                                N(o, (t=>{
                                                        r[t.origUrl] = e
                                                }
                                                ))
                                        }
                                        )),
                                        r
                                }
                                )(e, n)))
                        }
                        )(e, o, (e=>t.checkMany(e)))
                }
        }
        ;
        tinymce.PluginManager.add("linkchecker", ((e,t)=>{
                if (((e,t)=>!!e && -1 === ((e,t)=>{
                        const r = d(e.major, t.major);
                        if (0 !== r)
                                return r;
                        const n = d(e.minor, t.minor);
                        if (0 !== n)
                                return n;
                        const o = d(e.patch, t.patch);
                        return 0 !== o ? o : 0
                }
                )((e=>g((e=>[e.majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))(e)))(e), g(t)))(tinymce, "6.0.0"))
                        return void console.error('The "linkchecker" plugin requires at least version 6.0.0 of TinyMCE.');
                const r = (e=>{
                        let t = 0;
                        return {
                                get: ()=>t,
                                set: e=>{
                                        t = e
                                }
                        }
                }
                )();
                ((e,t)=>{
                        const r = e.options.register;
                        r("linkchecker_content_css", {
                                processor: "string",
                                default: t + "/content.min.css"
                        }),
                        r("linkchecker_api_key", {
                                processor: "string"
                        }),
                        r("linkchecker_preprocess", {
                                processor: "function",
                                default: y
                        }),
                        r("linkchecker_service_url", {
                                processor: "string",
                                default: ""
                        })
                }
                )(e, t);
                const n = mt(e)
                  , o = (()=>{
                        const e = {};
                        return {
                                add: t=>{
                                        e[t] = !0
                                }
                                ,
                                has: t=>t in e
                        }
                }
                )()
                  , s = oe(e)
                  , a = ((e,t)=>({
                        logError: r=>{
                                const n = (e=>"string" == typeof e ? {
                                        message: e
                                } : e)(r);
                                ((e,t)=>{
                                        e.dispatch("LinkCheckerError", t)
                                }
                                )(e, n),
                                t.set(t.get() + 1),
                                t.get() < 5 && !e.removed && console.error(`Link checker error: ${n.message}`)
                        }
                }))(e, r);
                e.on("SkinLoaded", (()=>{
                        E(e).length > 0 ? (me(e, o, s, n, a),
                        ((e,t,r,n)=>{
                                e.options.isSet("file_picker_validator_handler") || e.options.set("file_picker_validator_handler", ((e,t,r)=>{
                                        const n = A(((e,t)=>(e,r)=>{
                                                t.checkOne(e).get((e=>{
                                                        e.fold((()=>{
                                                                r({
                                                                        status: "none",
                                                                        message: ""
                                                                })
                                                        }
                                                        ), (e=>{
                                                                H(e.result, (e=>{
                                                                        r(fe())
                                                                }
                                                                ), (e=>{
                                                                        r(ke())
                                                                }
                                                                ), (e=>{
                                                                        r(ve())
                                                                }
                                                                ))
                                                        }
                                                        ))
                                                }
                                                ))
                                        }
                                        )(0, r), 500);
                                        return (e,r)=>{
                                                const o = t(e.url);
                                                0 === e.url.length || !z(o) && K(o) ? r(ve()) : z(o) ? n(o, r) : r(ke())
                                        }
                                }
                                )(0, r, n))
                        }
                        )(e, 0, s, n)) : a.logError("You need to specify the linkchecker_service_url setting")
                }
                ))
        }
        ))
}();
