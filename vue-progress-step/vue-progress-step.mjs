function vn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function ie(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = D(r) ? Cn(r) : ie(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else {
    if (D(e))
      return e;
    if (b(e))
      return e;
  }
}
const In = /;(?![^(]*\))/g, Dn = /:([^]+)/, Rn = /\/\*.*?\*\//gs;
function Cn(e) {
  const t = {};
  return e.replace(Rn, "").split(In).forEach((n) => {
    if (n) {
      const r = n.split(Dn);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Pe(e) {
  let t = "";
  if (D(e))
    t = e;
  else if (_(e))
    for (let n = 0; n < e.length; n++) {
      const r = Pe(e[n]);
      r && (t += r + " ");
    }
  else if (b(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const gt = (e) => D(e) ? e : e == null ? "" : _(e) || b(e) && (e.toString === At || !w(e.toString)) ? JSON.stringify(e, Pt, 2) : String(e), Pt = (e, t) => t && t.__v_isRef ? Pt(e, t.value) : Q(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : Mt(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : b(t) && !_(t) && !jt(t) ? String(t) : t, A = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Tn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Ze = () => {
}, $n = () => !1, Pn = /^on[^a-z]/, Mn = (e) => Pn.test(e), P = Object.assign, An = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Fn = Object.prototype.hasOwnProperty, N = (e, t) => Fn.call(e, t), _ = Array.isArray, Q = (e) => Me(e) === "[object Map]", Mt = (e) => Me(e) === "[object Set]", w = (e) => typeof e == "function", D = (e) => typeof e == "string", ke = (e) => typeof e == "symbol", b = (e) => e !== null && typeof e == "object", jn = (e) => b(e) && w(e.then) && w(e.catch), At = Object.prototype.toString, Me = (e) => At.call(e), Ft = (e) => Me(e).slice(8, -1), jt = (e) => Me(e) === "[object Object]", et = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, tt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, zn = /-(\w)/g, xe = tt((e) => e.replace(zn, (t, n) => n ? n.toUpperCase() : "")), fe = tt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Hn = tt((e) => e ? `on${fe(e)}` : ""), pe = (e, t) => !Object.is(e, t), Wn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Kn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let mt;
const Bn = () => mt || (mt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Et(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Un;
function Ln(e, t = Un) {
  t && t.active && t.effects.push(e);
}
const de = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, zt = (e) => (e.w & L) > 0, Ht = (e) => (e.n & L) > 0, Gn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= L;
}, Jn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      zt(s) && !Ht(s) ? s.delete(e) : t[n++] = s, s.w &= ~L, s.n &= ~L;
    }
    t.length = n;
  }
}, We = /* @__PURE__ */ new WeakMap();
let le = 0, L = 1;
const Ke = 30;
let V;
const X = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Be = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Wt {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ln(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = V, n = U;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = V, V = this, U = !0, L = 1 << ++le, le <= Ke ? Gn(this) : Nt(this), this.fn();
    } finally {
      le <= Ke && Jn(this), L = 1 << --le, V = this.parent, U = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    V === this ? this.deferStop = !0 : this.active && (Nt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Nt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let U = !0;
const Kt = [];
function nt() {
  Kt.push(U), U = !1;
}
function st() {
  const e = Kt.pop();
  U = e === void 0 ? !0 : e;
}
function C(e, t, n) {
  if (U && V) {
    let r = We.get(e);
    r || We.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = de());
    const o = process.env.NODE_ENV !== "production" ? { effect: V, target: e, type: t, key: n } : void 0;
    Ue(s, o);
  }
}
function Ue(e, t) {
  let n = !1;
  le <= Ke ? Ht(e) || (e.n |= L, n = !zt(e)) : n = !e.has(V), n && (e.add(V), V.deps.push(e), process.env.NODE_ENV !== "production" && V.onTrack && V.onTrack(Object.assign({ effect: V }, t)));
}
function G(e, t, n, r, s, o) {
  const i = We.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && _(e)) {
    const f = Kn(r);
    i.forEach((h, l) => {
      (l === "length" || l >= f) && c.push(h);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        _(e) ? et(n) && c.push(i.get("length")) : (c.push(i.get(X)), Q(e) && c.push(i.get(Be)));
        break;
      case "delete":
        _(e) || (c.push(i.get(X)), Q(e) && c.push(i.get(Be)));
        break;
      case "set":
        Q(e) && c.push(i.get(X));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: s, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? se(c[0], u) : se(c[0]));
  else {
    const f = [];
    for (const h of c)
      h && f.push(...h);
    process.env.NODE_ENV !== "production" ? se(de(f), u) : se(de(f));
  }
}
function se(e, t) {
  const n = _(e) ? e : [...e];
  for (const r of n)
    r.computed && wt(r, t);
  for (const r of n)
    r.computed || wt(r, t);
}
function wt(e, t) {
  (e !== V || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(P({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const qn = /* @__PURE__ */ vn("__proto__,__v_isRef,__isVue"), Bt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ke)
), Yn = /* @__PURE__ */ rt(), Qn = /* @__PURE__ */ rt(!0), Xn = /* @__PURE__ */ rt(!0, !0), bt = /* @__PURE__ */ Zn();
function Zn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        C(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      nt();
      const r = p(this)[t].apply(this, n);
      return st(), r;
    };
  }), e;
}
function rt(e = !1, t = !1) {
  return function(r, s, o) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && o === (e ? t ? qt : Jt : t ? hs : Gt).get(r))
      return r;
    const i = _(r);
    if (!e && i && N(bt, s))
      return Reflect.get(bt, s, o);
    const c = Reflect.get(r, s, o);
    return (ke(s) ? Bt.has(s) : qn(s)) || (e || C(r, "get", s), t) ? c : x(c) ? i && et(s) ? c : c.value : b(c) ? e ? Yt(c) : ct(c) : c;
  };
}
const kn = /* @__PURE__ */ es();
function es(e = !1) {
  return function(n, r, s, o) {
    let i = n[r];
    if (J(i) && x(i) && !x(s))
      return !1;
    if (!e && (!ve(s) && !J(s) && (i = p(i), s = p(s)), !_(n) && x(i) && !x(s)))
      return i.value = s, !0;
    const c = _(n) && et(r) ? Number(r) < n.length : N(n, r), u = Reflect.set(n, r, s, o);
    return n === p(o) && (c ? pe(s, i) && G(n, "set", r, s, i) : G(n, "add", r, s)), u;
  };
}
function ts(e, t) {
  const n = N(e, t), r = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && G(e, "delete", t, void 0, r), s;
}
function ns(e, t) {
  const n = Reflect.has(e, t);
  return (!ke(t) || !Bt.has(t)) && C(e, "has", t), n;
}
function ss(e) {
  return C(e, "iterate", _(e) ? "length" : X), Reflect.ownKeys(e);
}
const rs = {
  get: Yn,
  set: kn,
  deleteProperty: ts,
  has: ns,
  ownKeys: ss
}, Ut = {
  get: Qn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Et(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Et(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, os = /* @__PURE__ */ P({}, Ut, {
  get: Xn
}), ot = (e) => e, Ae = (e) => Reflect.getPrototypeOf(e);
function me(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (t !== o && C(s, "get", t), C(s, "get", o));
  const { has: i } = Ae(s), c = r ? ot : n ? ut : he;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function Ee(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (e !== s && C(r, "has", e), C(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Ne(e, t = !1) {
  return e = e.__v_raw, !t && C(p(e), "iterate", X), Reflect.get(e, "size", e);
}
function Ot(e) {
  e = p(e);
  const t = p(this);
  return Ae(t).has.call(t, e) || (t.add(e), G(t, "add", e, e)), this;
}
function yt(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: s } = Ae(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && Lt(n, r, e) : (e = p(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? pe(t, i) && G(n, "set", e, t, i) : G(n, "add", e, t), this;
}
function St(e) {
  const t = p(this), { has: n, get: r } = Ae(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Lt(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && G(t, "delete", e, void 0, o), i;
}
function Vt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Q(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && G(e, "clear", void 0, void 0, n), r;
}
function we(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), u = t ? ot : e ? ut : he;
    return !e && C(c, "iterate", X), i.forEach((f, h) => r.call(s, u(f), u(h), o));
  };
}
function be(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = Q(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, f = s[e](...r), h = n ? ot : t ? ut : he;
    return !t && C(o, "iterate", u ? Be : X), {
      next() {
        const { value: l, done: a } = f.next();
        return a ? { value: l, done: a } : {
          value: c ? [h(l[0]), h(l[1])] : h(l),
          done: a
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function H(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${fe(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function is() {
  const e = {
    get(o) {
      return me(this, o);
    },
    get size() {
      return Ne(this);
    },
    has: Ee,
    add: Ot,
    set: yt,
    delete: St,
    clear: Vt,
    forEach: we(!1, !1)
  }, t = {
    get(o) {
      return me(this, o, !1, !0);
    },
    get size() {
      return Ne(this);
    },
    has: Ee,
    add: Ot,
    set: yt,
    delete: St,
    clear: Vt,
    forEach: we(!1, !0)
  }, n = {
    get(o) {
      return me(this, o, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(o) {
      return Ee.call(this, o, !0);
    },
    add: H("add"),
    set: H("set"),
    delete: H("delete"),
    clear: H("clear"),
    forEach: we(!0, !1)
  }, r = {
    get(o) {
      return me(this, o, !0, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(o) {
      return Ee.call(this, o, !0);
    },
    add: H("add"),
    set: H("set"),
    delete: H("delete"),
    clear: H("clear"),
    forEach: we(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = be(o, !1, !1), n[o] = be(o, !0, !1), t[o] = be(o, !1, !0), r[o] = be(o, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [cs, ls, us, as] = /* @__PURE__ */ is();
function it(e, t) {
  const n = t ? e ? as : us : e ? ls : cs;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(N(n, s) && s in r ? n : r, s, o);
}
const fs = {
  get: /* @__PURE__ */ it(!1, !1)
}, ps = {
  get: /* @__PURE__ */ it(!0, !1)
}, ds = {
  get: /* @__PURE__ */ it(!0, !0)
};
function Lt(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = Ft(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Gt = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap();
function _s(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function gs(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _s(Ft(e));
}
function ct(e) {
  return J(e) ? e : lt(e, !1, rs, fs, Gt);
}
function Yt(e) {
  return lt(e, !0, Ut, ps, Jt);
}
function Oe(e) {
  return lt(e, !0, os, ds, qt);
}
function lt(e, t, n, r, s) {
  if (!b(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = gs(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function Z(e) {
  return J(e) ? Z(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function ve(e) {
  return !!(e && e.__v_isShallow);
}
function Le(e) {
  return Z(e) || J(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function ms(e) {
  return Wn(e, "__v_skip", !0), e;
}
const he = (e) => b(e) ? ct(e) : e, ut = (e) => b(e) ? Yt(e) : e;
function Qt(e) {
  U && V && (e = p(e), process.env.NODE_ENV !== "production" ? Ue(e.dep || (e.dep = de()), {
    target: e,
    type: "get",
    key: "value"
  }) : Ue(e.dep || (e.dep = de())));
}
function Xt(e, t) {
  e = p(e), e.dep && (process.env.NODE_ENV !== "production" ? se(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : se(e.dep));
}
function x(e) {
  return !!(e && e.__v_isRef === !0);
}
function Es(e) {
  return Ns(e, !1);
}
function Ns(e, t) {
  return x(e) ? e : new ws(e, t);
}
class ws {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : p(t), this._value = n ? t : he(t);
  }
  get value() {
    return Qt(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ve(t) || J(t);
    t = n ? t : p(t), pe(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : he(t), Xt(this, t));
  }
}
function y(e) {
  return x(e) ? e.value : e;
}
const bs = {
  get: (e, t, n) => y(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return x(s) && !x(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Os(e) {
  return Z(e) ? e : new Proxy(e, bs);
}
var Zt;
class ys {
  constructor(t, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Zt] = !1, this._dirty = !0, this.effect = new Wt(t, () => {
      this._dirty || (this._dirty = !0, Xt(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const t = p(this);
    return Qt(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Zt = "__v_isReadonly";
function Ss(e, t, n = !1) {
  let r, s;
  const o = w(e);
  o ? (r = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Ze) : (r = e.get, s = e.set);
  const i = new ys(r, s, o || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const k = [];
function Vs(e) {
  k.push(e);
}
function xs() {
  k.pop();
}
function g(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  nt();
  const n = k.length ? k[k.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = vs();
  if (r)
    ee(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: o }) => `at <${bn(n, o.type)}>`).join(`
`),
      s
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Is(s)), console.warn(...o);
  }
  st();
}
function vs() {
  let e = k[k.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Is(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Ds(n));
  }), t;
}
function Ds({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${bn(e.component, e.type, r)}`, o = ">" + n;
  return e.props ? [s, ...Rs(e.props), o] : [s + o];
}
function Rs(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...kt(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function kt(e, t, n) {
  return D(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = kt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const at = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function ee(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    en(o, t, n);
  }
  return s;
}
function Ie(e, t, n, r) {
  if (w(e)) {
    const o = ee(e, t, n, r);
    return o && jn(o) && o.catch((i) => {
      en(i, t, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < e.length; o++)
    s.push(Ie(e[o], t, n, r));
  return s;
}
function en(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? at[n] : n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let h = 0; h < f.length; h++)
          if (f[h](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      ee(u, null, 10, [e, i, c]);
      return;
    }
  }
  Cs(e, n, s, r);
}
function Cs(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = at[t];
    if (n && Vs(n), g(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && xs(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let De = !1, Ge = !1;
const T = [];
let K = 0;
const oe = [];
let M = null, W = 0;
const tn = /* @__PURE__ */ Promise.resolve();
let ft = null;
const Ts = 100;
function $s(e) {
  const t = ft || tn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ps(e) {
  let t = K + 1, n = T.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    _e(T[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function pt(e) {
  (!T.length || !T.includes(e, De && e.allowRecurse ? K + 1 : K)) && (e.id == null ? T.push(e) : T.splice(Ps(e.id), 0, e), nn());
}
function nn() {
  !De && !Ge && (Ge = !0, ft = tn.then(rn));
}
function sn(e) {
  _(e) ? oe.push(...e) : (!M || !M.includes(e, e.allowRecurse ? W + 1 : W)) && oe.push(e), nn();
}
function Ms(e) {
  if (oe.length) {
    const t = [...new Set(oe)];
    if (oe.length = 0, M) {
      M.push(...t);
      return;
    }
    for (M = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), M.sort((n, r) => _e(n) - _e(r)), W = 0; W < M.length; W++)
      process.env.NODE_ENV !== "production" && on(e, M[W]) || M[W]();
    M = null, W = 0;
  }
}
const _e = (e) => e.id == null ? 1 / 0 : e.id, As = (e, t) => {
  const n = _e(e) - _e(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function rn(e) {
  Ge = !1, De = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort(As);
  const t = process.env.NODE_ENV !== "production" ? (n) => on(e, n) : Ze;
  try {
    for (K = 0; K < T.length; K++) {
      const n = T[K];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        ee(n, null, 14);
      }
    }
  } finally {
    K = 0, T.length = 0, Ms(e), De = !1, ft = null, (T.length || oe.length) && rn(e);
  }
}
function on(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Ts) {
      const r = t.ownerInstance, s = r && _t(r.type);
      return g(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const ce = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Bn().__VUE_HMR_RUNTIME__ = {
  createRecord: je(Fs),
  rerender: je(js),
  reload: je(zs)
});
const Re = /* @__PURE__ */ new Map();
function Fs(e, t) {
  return Re.has(e) ? !1 : (Re.set(e, {
    initialDef: ue(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ue(e) {
  return On(e) ? e.__vccOpts : e;
}
function js(e, t) {
  const n = Re.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ue(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function zs(e, t) {
  const n = Re.get(e);
  if (!n)
    return;
  t = ue(t), xt(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = ue(s.type);
    ce.has(o) || (o !== n.initialDef && xt(o, t), ce.add(o)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (ce.add(o), s.ceReload(t.styles), ce.delete(o)) : s.parent ? pt(s.parent.update) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  sn(() => {
    for (const s of r)
      ce.delete(ue(s.type));
  });
}
function xt(e, t) {
  P(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function je(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let I = null, dt = null;
function Hs(e) {
  dt = e;
}
function Ws() {
  dt = null;
}
const Ks = (e) => e.__isSuspense;
function Bs(e, t) {
  t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : sn(e);
}
function Us(e, t) {
  return cn(e, null, process.env.NODE_ENV !== "production" ? Object.assign(Object.assign({}, t), { flush: "post" }) : { flush: "post" });
}
const ye = {};
function cn(e, t, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = A) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && g('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && g('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (d) => {
    g("Invalid watch source: ", d, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = F;
  let f, h = !1, l = !1;
  if (x(e) ? (f = () => e.value, h = ve(e)) : Z(e) ? (f = () => e, r = !0) : _(e) ? (l = !0, h = e.some((d) => Z(d) || ve(d)), f = () => e.map((d) => {
    if (x(d))
      return d.value;
    if (Z(d))
      return re(d);
    if (w(d))
      return ee(d, u, 2);
    process.env.NODE_ENV !== "production" && c(d);
  })) : w(e) ? t ? f = () => ee(e, u, 2) : f = () => {
    if (!(u && u.isUnmounted))
      return a && a(), Ie(e, u, 3, [m]);
  } : (f = Ze, process.env.NODE_ENV !== "production" && c(e)), t && r) {
    const d = f;
    f = () => re(d());
  }
  let a, m = (d) => {
    a = v.onStop = () => {
      ee(d, u, 4);
    };
  }, E = l ? new Array(e.length).fill(ye) : ye;
  const O = () => {
    if (!!v.active)
      if (t) {
        const d = v.run();
        (r || h || (l ? d.some((ge, xn) => pe(ge, E[xn])) : pe(d, E))) && (a && a(), Ie(t, u, 3, [
          d,
          E === ye ? void 0 : l && E[0] === ye ? [] : E,
          m
        ]), E = d);
      } else
        v.run();
  };
  O.allowRecurse = !!t;
  let R;
  s === "sync" ? R = O : s === "post" ? R = () => Ct(O, u && u.suspense) : (O.pre = !0, u && (O.id = u.uid), R = () => pt(O));
  const v = new Wt(f, R);
  return process.env.NODE_ENV !== "production" && (v.onTrack = o, v.onTrigger = i), t ? n ? O() : E = v.run() : s === "post" ? Ct(v.run.bind(v), u && u.suspense) : v.run(), () => {
    v.stop(), u && u.scope && An(u.scope.effects, v);
  };
}
function Ls(e, t, n) {
  const r = this.proxy, s = D(e) ? e.includes(".") ? Gs(r, e) : () => r[e] : e.bind(r, r);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = F;
  Ye(this);
  const c = cn(s, o.bind(r), n);
  return i ? Ye(i) : wn(), c;
}
function Gs(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function re(e, t) {
  if (!b(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), x(e))
    re(e.value, t);
  else if (_(e))
    for (let n = 0; n < e.length; n++)
      re(e[n], t);
  else if (Mt(e) || Q(e))
    e.forEach((n) => {
      re(n, t);
    });
  else if (jt(e))
    for (const n in e)
      re(e[n], t);
  return e;
}
function ln(e) {
  return w(e) ? { setup: e, name: e.name } : e;
}
const Js = (e) => !!e.type.__asyncLoader;
function qs(e, t, n = F, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      nt(), Ye(n);
      const c = Ie(t, n, e, i);
      return wn(), st(), c;
    });
    return r ? s.unshift(o) : s.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const s = Hn(at[e].replace(/ hook$/, ""));
    g(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const un = (e) => (t, n = F) => qs(e, (...r) => t(...r), n), an = un("m"), Ys = un("um"), Je = "components";
function Qs(e, t) {
  return Zs(Je, e, !0, t) || e;
}
const Xs = Symbol();
function Zs(e, t, n = !0, r = !1) {
  const s = F;
  if (s) {
    const o = s.type;
    if (e === Je) {
      const c = _t(o, !1);
      if (c && (c === t || c === xe(t) || c === fe(xe(t))))
        return o;
    }
    const i = vt(s[e] || o[e], t) || vt(s.appContext[e], t);
    if (!i && r)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === Je ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      g(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && g(`resolve${fe(e.slice(0, -1))} can only be used in render() or setup().`);
}
function vt(e, t) {
  return e && (e[t] || e[xe(t)] || e[fe(xe(t))]);
}
function ks(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (_(e) || D(e)) {
    s = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && g(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (b(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, c) => t(i, c, void 0, o && o[c]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let c = 0, u = i.length; c < u; c++) {
        const f = i[c];
        s[c] = t(e[f], f, c, o && o[c]);
      }
    }
  else
    s = [];
  return n && (n[r] = s), s;
}
function It(e, t, n = {}, r, s) {
  if (I.isCE || I.parent && Js(I.parent) && I.parent.isCE)
    return t !== "default" && (n.name = t), ne("slot", n, r && r());
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (g("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), o = () => []), o && o._c && (o._d = !1), z();
  const i = o && fn(o(n)), c = dn(te, {
    key: n.key || i && i.key || `_${t}`
  }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
  return !s && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function fn(e) {
  return e.some((t) => hn(t) ? !(t.type === Te || t.type === te && !fn(t.children)) : !0) ? e : null;
}
const qe = (e) => e ? gr(e) ? Er(e) || e.proxy : qe(e.parent) : null, ae = /* @__PURE__ */ P(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? Oe(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? Oe(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? Oe(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? Oe(e.refs) : e.refs,
  $parent: (e) => qe(e.parent),
  $root: (e) => qe(e.root),
  $emit: (e) => e.emit,
  $options: (e) => nr(e),
  $forceUpdate: (e) => e.f || (e.f = () => pt(e.update)),
  $nextTick: (e) => e.n || (e.n = $s.bind(e.proxy)),
  $watch: (e) => Ls.bind(e)
}), er = (e) => e === "_" || e === "$", ze = (e, t) => e !== A && !e.__isScriptSetup && N(e, t), tr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ze(r, t))
          return i[t] = 1, r[t];
        if (s !== A && N(s, t))
          return i[t] = 2, s[t];
        if ((f = e.propsOptions[0]) && N(f, t))
          return i[t] = 3, o[t];
        if (n !== A && N(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const h = ae[t];
    let l, a;
    if (h)
      return t === "$attrs" && (C(e, "get", t), process.env.NODE_ENV !== "production" && void 0), h(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== A && N(n, t))
      return i[t] = 4, n[t];
    if (a = u.config.globalProperties, N(a, t))
      return a[t];
    process.env.NODE_ENV !== "production" && I && (!D(t) || t.indexOf("__v") !== 0) && (s !== A && er(t[0]) && N(s, t) ? g(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === I && g(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return ze(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && N(s, t) ? (g(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== A && N(r, t) ? (r[t] = n, !0) : N(e.props, t) ? (process.env.NODE_ENV !== "production" && g(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && g(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== A && N(e, i) || ze(t, i) || (c = o[0]) && N(c, i) || N(r, i) || N(ae, i) || N(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (tr.ownKeys = (e) => (g("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function nr(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: s, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !s.length && !n && !r ? u = t : (u = {}, s.length && s.forEach((f) => Ce(u, f, i, !0)), Ce(u, t, i)), b(t) && o.set(t, u), u;
}
function Ce(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ce(e, o, n, !0), s && s.forEach((i) => Ce(e, i, n, !0));
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && g('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = sr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const sr = {
  data: Dt,
  props: q,
  emits: q,
  methods: q,
  computed: q,
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  components: q,
  directives: q,
  watch: or,
  provide: Dt,
  inject: rr
};
function Dt(e, t) {
  return t ? e ? function() {
    return P(w(e) ? e.call(this, this) : e, w(t) ? t.call(this, this) : t);
  } : t : e;
}
function rr(e, t) {
  return q(Rt(e), Rt(t));
}
function Rt(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function q(e, t) {
  return e ? P(P(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function or(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = P(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = S(e[r], t[r]);
  return n;
}
function ir() {
  return {
    app: null,
    config: {
      isNativeTag: $n,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Ct = Bs, cr = (e) => e.__isTeleport, te = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), lr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Te = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0), ur = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0), Se = [];
let $ = null;
function z(e = !1) {
  Se.push($ = e ? null : []);
}
function ar() {
  Se.pop(), $ = Se[Se.length - 1] || null;
}
function pn(e) {
  return e.dynamicChildren = $ || Tn, ar(), $ && $.push(e), e;
}
function Y(e, t, n, r, s, o) {
  return pn(B(e, t, n, r, s, o, !0));
}
function dn(e, t, n, r, s) {
  return pn(ne(e, t, n, r, s, !0));
}
function hn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const fr = (...e) => mn(...e), _n = "__vInternal", gn = ({ key: e }) => e != null ? e : null, Ve = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? D(e) || x(e) || w(e) ? { i: I, r: e, k: t, f: !!n } : e : null;
function B(e, t = null, n = null, r = 0, s = null, o = e === te ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && gn(t),
    ref: t && Ve(t),
    scopeId: dt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: I
  };
  return c ? (ht(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= D(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && g("VNode created with invalid key (NaN). VNode type:", u.type), !i && $ && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && $.push(u), u;
}
const ne = process.env.NODE_ENV !== "production" ? fr : mn;
function mn(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === Xs) && (process.env.NODE_ENV !== "production" && !e && g(`Invalid vnode type when creating vnode: ${e}.`), e = Te), hn(e)) {
    const c = $e(e, t, !0);
    return n && ht(c, n), !o && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag |= -2, c;
  }
  if (On(e) && (e = e.__vccOpts), t) {
    t = pr(t);
    let { class: c, style: u } = t;
    c && !D(c) && (t.class = Pe(c)), b(u) && (Le(u) && !_(u) && (u = P({}, u)), t.style = ie(u));
  }
  const i = D(e) ? 1 : Ks(e) ? 128 : cr(e) ? 64 : b(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Le(e) && (e = p(e), g("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), B(e, t, n, r, s, i, o, !0);
}
function pr(e) {
  return e ? Le(e) || _n in e ? P({}, e) : e : null;
}
function $e(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e, c = t ? Nn(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && gn(c),
    ref: t && t.ref ? n && s ? _(s) ? s.concat(Ve(t)) : [s, Ve(t)] : Ve(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && _(i) ? i.map(En) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== te ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $e(e.ssContent),
    ssFallback: e.ssFallback && $e(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function En(e) {
  const t = $e(e);
  return _(e.children) && (t.children = e.children.map(En)), t;
}
function dr(e = " ", t = 0) {
  return ne(lr, null, e, t);
}
function hr(e = "", t = !1) {
  return t ? (z(), dn(Te, null, e)) : ne(Te, null, e);
}
function ht(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (_(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ht(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(_n in t) ? t._ctx = I : s === 3 && I && (I.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    w(t) ? (t = { default: t, _ctx: I }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [dr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Nn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Pe([t.class, r.class]));
      else if (s === "style")
        t.style = ie([t.style, r.style]);
      else if (Mn(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(_(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
ir();
let F = null;
const _r = () => F || I, Ye = (e) => {
  F = e, e.scope.on();
}, wn = () => {
  F && F.scope.off(), F = null;
};
function gr(e) {
  return e.vnode.shapeFlag & 4;
}
let mr = !1;
function Er(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Os(ms(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ae)
          return ae[n](e);
      },
      has(t, n) {
        return n in t || n in ae;
      }
    }));
}
const Nr = /(?:^|[-_])(\w)/g, wr = (e) => e.replace(Nr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function _t(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function bn(e, t, n = !1) {
  let r = _t(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return r ? wr(r) : n ? "App" : "Anonymous";
}
function On(e) {
  return w(e) && "__vccOpts" in e;
}
const yn = (e, t) => Ss(e, t, mr);
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function He(e) {
  return !!(e && e.__v_isShallow);
}
function br() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, s = {
    header(l) {
      return b(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, h(l)],
        "<",
        c(l.value),
        ">"
      ] : Z(l) ? [
        "div",
        {},
        ["span", e, He(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, He(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const a = [];
    l.type.props && l.props && a.push(i("props", p(l.props))), l.setupState !== A && a.push(i("setup", l.setupState)), l.data !== A && a.push(i("data", p(l.data)));
    const m = u(l, "computed");
    m && a.push(i("computed", m));
    const E = u(l, "inject");
    return E && a.push(i("injected", E)), a.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), a;
  }
  function i(l, a) {
    return a = P({}, a), Object.keys(a).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(a).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          c(a[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, a = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : b(l) ? ["object", { object: a ? p(l) : l }] : ["span", n, String(l)];
  }
  function u(l, a) {
    const m = l.type;
    if (w(m))
      return;
    const E = {};
    for (const O in l.ctx)
      f(m, O, a) && (E[O] = l.ctx[O]);
    return E;
  }
  function f(l, a, m) {
    const E = l[m];
    if (_(E) && E.includes(a) || b(E) && a in E || l.extends && f(l.extends, a, m) || l.mixins && l.mixins.some((O) => f(O, a, m)))
      return !0;
  }
  function h(l) {
    return He(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
function Or(e) {
  const t = _r();
  if (!t) {
    process.env.NODE_ENV !== "production" && g("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (s = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((o) => Xe(o, s));
  }, r = () => {
    const s = e(t.proxy);
    Qe(t.subTree, s), n(s);
  };
  Us(r), an(() => {
    const s = new MutationObserver(r);
    s.observe(t.subTree.el.parentNode, { childList: !0 }), Ys(() => s.disconnect());
  });
}
function Qe(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      Qe(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Xe(e.el, t);
  else if (e.type === te)
    e.children.forEach((n) => Qe(n, t));
  else if (e.type === ur) {
    let { el: n, anchor: r } = e;
    for (; n && (Xe(n, t), n !== r); )
      n = n.nextSibling;
  }
}
function Xe(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t)
      n.setProperty(`--${r}`, t[r]);
  }
}
function yr() {
  br();
}
process.env.NODE_ENV !== "production" && yr();
function Sr(e, t) {
  const n = {};
  return yn(() => (e.forEach((s, o) => {
    n[s] = t[o];
  }), n)).value;
}
function Vr(e, t) {
  return yn(() => {
    let r = 0, s = !1;
    function o(i) {
      i.forEach((c) => {
        Array.isArray(c) && (r += Math.max(c[0].length, c[1].length), o(c[0]), s && t && t(), s = !0);
      });
    }
    return o(e.data), r;
  }).value;
}
function xr(e, t, n) {
  let r = 0;
  t ? r = e.stepWidth * t + (t - 1) * e.space : r = e.stepWidth;
  const s = n * 0.5;
  return {
    flexBasis: r,
    rectTop: -s,
    rectBot: -s - 12
  };
}
function j(e) {
  return e + "px";
}
function Tt(e, t) {
  return { [e]: typeof t == "number" ? t + "px" : t };
}
const vr = (e) => (Hs("data-v-4e76a117"), e = e(), Ws(), e), Ir = { class: "progress-step" }, Dr = {
  key: 0,
  class: "step-item_rect"
}, Rr = /* @__PURE__ */ vr(() => /* @__PURE__ */ B("div", { class: "step-item_line" }, null, -1)), Cr = { class: "step-item_head" }, Tr = {
  key: 0,
  class: "step-item_line"
}, $r = { class: "step-item_main" }, Pr = { class: "progress-step_title" }, Mr = { class: "progress-step_desc" }, Ar = {
  name: "progress-step"
}, Fr = /* @__PURE__ */ ln({
  ...Ar,
  props: {
    data: { default: () => [] },
    status: { default: () => ["pending", "processing", "completed"] },
    colors: { default: () => ["#d2d2d2", "#3a84fb", "#67d36f"] },
    size: { default: 25 },
    stepWidth: { default: 80 },
    space: { default: 20 }
  },
  setup(e, { expose: t }) {
    const n = e;
    Or((R) => ({
      11568421: y(j)(n.space),
      "1b456c13": y(j)(a),
      "217ebd3c": y(j)(h),
      a38d11f8: y(j)(y(i)),
      "5c9e6b63": y(j)(y(r)),
      e3865aba: y(j)(l),
      cb38c910: y(j)(y(c)),
      cb492574: y(j)(y(u)),
      "0f6b676c": y(j)(n.size)
    }));
    let r = 100;
    const s = "#d2d2d", o = Vr(n, () => {
      r += r;
    }), { flexBasis: i, rectTop: c, rectBot: u } = xr(n, o, r), f = Sr(n.status, n.colors), h = n.stepWidth + n.space, l = n.stepWidth - 10, a = r / 2 - 12, m = Tt("flex-basis", n.stepWidth), E = (R) => Tt("background-color", f[R.status] || s), O = (R) => R === n.data.length - 1;
    return t({
      reactHeight: r,
      parallelNodesLen: o
    }), (R, v) => {
      const Fe = Qs("progress-step", !0);
      return z(), Y("div", Ir, [
        (z(!0), Y(te, null, ks(n.data, (d, ge) => (z(), Y("div", {
          class: Pe([
            "progress-step_item",
            O(ge) && "is_last",
            Array.isArray(d) && "is_parallel"
          ]),
          style: ie(y(m))
        }, [
          Array.isArray(d) ? (z(), Y("div", Dr, [
            Rr,
            ne(Fe, {
              class: "step-item_rect_top",
              data: d[0]
            }, null, 8, ["data"]),
            ne(Fe, {
              class: "step-item_rect_bottom",
              data: d[1]
            }, null, 8, ["data"])
          ])) : (z(), Y(te, { key: 1 }, [
            B("div", Cr, [
              O(ge) ? hr("", !0) : (z(), Y("div", Tr)),
              It(R.$slots, "icon", {}, () => [
                B("div", {
                  class: "progress-step_icon",
                  style: ie(E(d))
                }, null, 4)
              ], !0)
            ]),
            B("div", $r, [
              B("div", Pr, gt(d.title), 1),
              It(R.$slots, "description", {}, () => [
                B("div", Mr, gt(d.description), 1)
              ], !0)
            ])
          ], 64))
        ], 6))), 256))
      ]);
    };
  }
});
const Sn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, Vn = /* @__PURE__ */ Sn(Fr, [["__scopeId", "data-v-4e76a117"]]), jr = {
  name: "vue-progress-step"
}, zr = /* @__PURE__ */ ln({
  ...jr,
  setup(e) {
    const t = Es(null), n = ct({
      height: "auto"
    });
    return an(() => {
      const { reactHeight: r, parallelNodesLen: s } = t.value;
      s && (n.height = r * 2.5 + "px");
    }), (r, s) => (z(), Y("div", {
      class: "progress-step_container",
      style: ie(n)
    }, [
      ne(Vn, Nn({
        ref_key: "progressStep",
        ref: t
      }, r.$attrs), null, 16)
    ], 4));
  }
});
const Hr = /* @__PURE__ */ Sn(zr, [["__scopeId", "data-v-52d836b0"]]);
let $t = !1;
const Wr = [Hr, Vn];
function Kr(e) {
  $t || (Wr.forEach((t) => {
    console.log("install .... ", t.name, t), e.component(t.name, t);
  }), $t = !0);
}
export {
  Kr as default
};
