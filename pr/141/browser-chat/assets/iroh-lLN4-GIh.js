var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as A, P as V, __tla as __tla_0 } from "./index-BRmxmjk_.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-DQU1VGGw.wasm", import.meta.url).href, oe = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let o;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") o = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const a = atob(_);
        o = new Uint8Array(a.length);
        for (let b = 0; b < a.length; b++) o[b] = a.charCodeAt(b);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(o, e);
    } else {
      const _ = await fetch(n), o = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && o.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(_, e);
      else {
        const a = await _.arrayBuffer();
        t = await WebAssembly.instantiate(a, e);
      }
    }
    return t.instance.exports;
  };
  let c;
  function ce(e) {
    c = e;
  }
  let W = null;
  function E() {
    return (W === null || W.byteLength === 0) && (W = new Uint8Array(c.memory.buffer)), W;
  }
  let D = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  D.decode();
  const se = 2146435072;
  let G = 0;
  function ie(e, n) {
    return G += n, G >= se && (D = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), D.decode(), G = n), D.decode(E().subarray(e, e + n));
  }
  function w(e, n) {
    return e = e >>> 0, ie(e, n);
  }
  let k = new Array(128).fill(void 0);
  k.push(void 0, null, true, false);
  let O = k.length;
  function s(e) {
    O === k.length && k.push(k.length + 1);
    const n = O;
    return O = k[n], k[n] = e, n;
  }
  function r(e) {
    return k[e];
  }
  let h = 0;
  const L = new TextEncoder();
  "encodeInto" in L || (L.encodeInto = function(e, n) {
    const t = L.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  });
  function y(e, n, t) {
    if (t === void 0) {
      const u = L.encode(e), m = n(u.length, 1) >>> 0;
      return E().subarray(m, m + u.length).set(u), h = u.length, m;
    }
    let _ = e.length, o = n(_, 1) >>> 0;
    const a = E();
    let b = 0;
    for (; b < _; b++) {
      const u = e.charCodeAt(b);
      if (u > 127) break;
      a[o + b] = u;
    }
    if (b !== _) {
      b !== 0 && (e = e.slice(b)), o = t(o, _, _ = b + e.length * 3, 1) >>> 0;
      const u = E().subarray(o + b, o + _), m = L.encodeInto(e, u);
      b += m.written, o = t(o, _, b, 1) >>> 0;
    }
    return h = b, o;
  }
  let j = null;
  function d() {
    return (j === null || j.buffer.detached === true || j.buffer.detached === void 0 && j.buffer !== c.memory.buffer) && (j = new DataView(c.memory.buffer)), j;
  }
  function f(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      c.__wbindgen_export_2(s(t));
    }
  }
  function x(e) {
    return e == null;
  }
  function ae(e) {
    e < 132 || (k[e] = O, O = e);
  }
  function p(e) {
    const n = r(e);
    return ae(e), n;
  }
  function q(e, n) {
    e = e >>> 0;
    const t = d(), _ = [];
    for (let o = e; o < e + 4 * n; o += 4) _.push(p(t.getUint32(o, true)));
    return _;
  }
  function T(e, n) {
    return e = e >>> 0, E().subarray(e / 1, e / 1 + n);
  }
  function J(e) {
    const n = typeof e;
    if (n == "number" || n == "boolean" || e == null) return `${e}`;
    if (n == "string") return `"${e}"`;
    if (n == "symbol") {
      const o = e.description;
      return o == null ? "Symbol" : `Symbol(${o})`;
    }
    if (n == "function") {
      const o = e.name;
      return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
    }
    if (Array.isArray(e)) {
      const o = e.length;
      let a = "[";
      o > 0 && (a += J(e[0]));
      for (let b = 1; b < o; b++) a += ", " + J(e[b]);
      return a += "]", a;
    }
    const t = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let _;
    if (t && t.length > 1) _ = t[1];
    else return toString.call(e);
    if (_ == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
  }
  const $ = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => {
    c.__wbindgen_export_4.get(e.dtor)(e.a, e.b);
  });
  function C(e, n, t, _) {
    const o = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, a = (...b) => {
      o.cnt++;
      const u = o.a;
      o.a = 0;
      try {
        return _(u, o.b, ...b);
      } finally {
        --o.cnt === 0 ? (c.__wbindgen_export_4.get(o.dtor)(u, o.b), $.unregister(o)) : o.a = u;
      }
    };
    return a.original = o, $.register(a, o, o), a;
  }
  function be(e, n, t, _) {
    const o = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, a = (...b) => {
      o.cnt++;
      try {
        return _(o.a, o.b, ...b);
      } finally {
        --o.cnt === 0 && (c.__wbindgen_export_4.get(o.dtor)(o.a, o.b), o.a = 0, $.unregister(o));
      }
    };
    return a.original = o, $.register(a, o, o), a;
  }
  function de(e, n, t) {
    c.__wbindgen_export_5(e, n, s(t));
  }
  function fe(e, n, t) {
    c.__wbindgen_export_6(e, n, s(t));
  }
  function ue(e, n) {
    c.__wbindgen_export_7(e, n);
  }
  function ge(e, n) {
    c.__wbindgen_export_8(e, n);
  }
  function we(e, n) {
    c.__wbindgen_export_9(e, n);
  }
  function le(e, n) {
    c.__wbindgen_export_10(e, n);
  }
  function pe(e, n, t) {
    c.__wbindgen_export_11(e, n, s(t));
  }
  function he(e, n, t, _) {
    c.__wbindgen_export_12(e, n, s(t), s(_));
  }
  const ye = [
    "blob",
    "arraybuffer"
  ], me = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], xe = [
    "omit",
    "same-origin",
    "include"
  ], Se = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_channel_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(M.prototype);
      return t.__wbg_ptr = n, Q.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Q.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = c.channel_sender(this.__wbg_ptr);
      return N.__wrap(n);
    }
    get receiver() {
      const n = c.channel_receiver(this.__wbg_ptr);
      return p(n);
    }
    ticket(n) {
      let t, _;
      try {
        const I = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_ticket(I, this.__wbg_ptr, s(n));
        var o = d().getInt32(I + 4 * 0, true), a = d().getInt32(I + 4 * 1, true), b = d().getInt32(I + 4 * 2, true), u = d().getInt32(I + 4 * 3, true), m = o, g = a;
        if (u) throw m = 0, g = 0, p(b);
        return t = m, _ = g, w(m, g);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const a = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_id(a, this.__wbg_ptr);
        var _ = d().getInt32(a + 4 * 0, true), o = d().getInt32(a + 4 * 1, true);
        return n = _, t = o, w(_, o);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(n, t, 1);
      }
    }
    neighbors() {
      try {
        const o = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_neighbors(o, this.__wbg_ptr);
        var n = d().getInt32(o + 4 * 0, true), t = d().getInt32(o + 4 * 1, true), _ = q(n, t).slice();
        return c.__wbindgen_export_3(n, t * 4, 4), _;
      } finally {
        c.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  const X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_channelsender_free(e >>> 0, 1));
  class N {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(N.prototype);
      return t.__wbg_ptr = n, X.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, X.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = y(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = h, o = c.channelsender_broadcast(this.__wbg_ptr, t, _);
      return p(o);
    }
    set_nickame(n) {
      const t = y(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = h;
      c.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  Symbol.dispose && (N.prototype[Symbol.dispose] = N.prototype.free);
  const Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_chatnode_free(e >>> 0, 1));
  class F {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(F.prototype);
      return t.__wbg_ptr = n, Y.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Y.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_chatnode_free(n, 0);
    }
    static spawn() {
      const n = c.chatnode_spawn();
      return p(n);
    }
    endpoint_id() {
      let n, t;
      try {
        const a = c.__wbindgen_add_to_stack_pointer(-16);
        c.chatnode_endpoint_id(a, this.__wbg_ptr);
        var _ = d().getInt32(a + 4 * 0, true), o = d().getInt32(a + 4 * 1, true);
        return n = _, t = o, w(_, o);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(n, t, 1);
      }
    }
    create(n) {
      const t = y(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = h, o = c.chatnode_create(this.__wbg_ptr, t, _);
      return p(o);
    }
    join(n, t) {
      const _ = y(n, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h, a = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), b = h, u = c.chatnode_join(this.__wbg_ptr, _, o, a, b);
      return p(u);
    }
  }
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => c.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => c.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class U {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(U.prototype);
      return t.__wbg_ptr = n, K.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, K.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_intounderlyingsource_free(n, 0);
    }
    pull(n) {
      const t = c.intounderlyingsource_pull(this.__wbg_ptr, s(n));
      return p(t);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      c.intounderlyingsource_cancel(n);
    }
  }
  Symbol.dispose && (U.prototype[Symbol.dispose] = U.prototype.free);
  function ve(e, n) {
    const t = Error(w(e, n));
    return s(t);
  }
  function ke(e, n) {
    const t = String(r(n)), _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function Ie(e) {
    r(e).abort();
  }
  function Re(e, n) {
    r(e).abort(r(n));
  }
  function je() {
    return f(function(e, n, t, _) {
      r(e).addEventListener(w(n, t), r(_));
    }, arguments);
  }
  function Fe() {
    return f(function(e, n, t, _, o) {
      r(e).append(w(n, t), w(_, o));
    }, arguments);
  }
  function Te() {
    return f(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function Ce(e) {
    const n = r(e).body;
    return x(n) ? 0 : s(n);
  }
  function Ae(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Ee(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : s(n);
  }
  function Oe(e) {
    return r(e).byteLength;
  }
  function Le(e) {
    return r(e).byteOffset;
  }
  function Me() {
    return f(function(e, n) {
      const t = r(e).call(r(n));
      return s(t);
    }, arguments);
  }
  function Ne() {
    return f(function(e, n, t) {
      const _ = r(e).call(r(n), r(t));
      return s(_);
    }, arguments);
  }
  function Ue(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function qe(e, n) {
    const t = r(e).catch(r(n));
    return s(t);
  }
  function Be(e) {
    const n = M.__wrap(e);
    return s(n);
  }
  function ze(e) {
    const n = F.__wrap(e);
    return s(n);
  }
  function We(e) {
    const n = clearTimeout(p(e));
    return s(n);
  }
  function De() {
    return f(function(e, n) {
      r(e).clearTimeout(p(n));
    }, arguments);
  }
  function $e() {
    return f(function(e) {
      r(e).close();
    }, arguments);
  }
  function Pe() {
    return f(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ve() {
    return f(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ge(e) {
    return r(e).code;
  }
  function He(e) {
    return r(e).code;
  }
  function Je(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function Qe(e) {
    const n = r(e).data;
    return s(n);
  }
  function Xe(e, n) {
    var t = q(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.debug(...t);
  }
  function Ye(e) {
    return r(e).done;
  }
  function Ke() {
    return f(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function Ze(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(w(e, n));
    } finally {
      c.__wbindgen_export_3(t, _, 1);
    }
  }
  function en(e, n) {
    var t = q(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.error(...t);
  }
  function nn(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function tn(e, n) {
    const t = r(e).fetch(r(n));
    return s(t);
  }
  function _n() {
    return f(function(e, n) {
      globalThis.crypto.getRandomValues(T(e, n));
    }, arguments);
  }
  function rn() {
    return f(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function on() {
    return f(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function cn() {
    return f(function(e, n) {
      const t = Reflect.get(r(e), r(n));
      return s(t);
    }, arguments);
  }
  function sn(e) {
    const n = r(e).done;
    return x(n) ? 16777215 : n ? 1 : 0;
  }
  function an(e) {
    const n = r(e).value;
    return s(n);
  }
  function bn(e, n) {
    const t = r(e)[r(n)];
    return s(t);
  }
  function dn() {
    return f(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function fn(e) {
    const n = r(e).headers;
    return s(n);
  }
  function un(e) {
    let n;
    try {
      n = r(e) instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function gn(e) {
    let n;
    try {
      n = r(e) instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function wn(e) {
    let n;
    try {
      n = r(e) instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function ln(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function pn() {
    return s(Symbol.iterator);
  }
  function hn(e) {
    return r(e).length;
  }
  function yn(e, n) {
    var t = q(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.log(...t);
  }
  function mn(e, n) {
    const t = r(n).message, _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function xn(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function Sn() {
    const e = new Object();
    return s(e);
  }
  function vn() {
    const e = new Array();
    return s(e);
  }
  function kn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (a, b) => {
        const u = t.a;
        t.a = 0;
        try {
          return he(u, t.b, a, b);
        } finally {
          t.a = u;
        }
      };
      const o = new Promise(_);
      return s(o);
    } finally {
      t.a = t.b = 0;
    }
  }
  function In(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Rn() {
    return f(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function jn() {
    const e = new Error();
    return s(e);
  }
  function Fn(e, n) {
    const t = new Error(w(e, n));
    return s(t);
  }
  function Tn() {
    return f(function(e, n) {
      const t = new WebSocket(w(e, n));
      return s(t);
    }, arguments);
  }
  function Cn() {
    return f(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function An(e, n) {
    const t = new Uint8Array(T(e, n));
    return s(t);
  }
  function En(e, n) {
    const t = new Function(w(e, n));
    return s(t);
  }
  function On(e, n, t) {
    const _ = new Uint8Array(r(e), n >>> 0, t >>> 0);
    return s(_);
  }
  function Ln(e, n) {
    const t = new ReadableStream(U.__wrap(e), p(n));
    return s(t);
  }
  function Mn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Nn() {
    return f(function(e, n, t) {
      const _ = new Request(w(e, n), r(t));
      return s(_);
    }, arguments);
  }
  function Un() {
    return f(function(e, n, t) {
      const _ = new WebSocket(w(e, n), r(t));
      return s(_);
    }, arguments);
  }
  function qn(e) {
    const n = r(e).next;
    return s(n);
  }
  function Bn() {
    return f(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function zn(e) {
    const n = r(e).node;
    return s(n);
  }
  function Wn() {
    return Date.now();
  }
  function Dn(e) {
    return r(e).now();
  }
  function $n(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Pn(e) {
    const n = r(e).process;
    return s(n);
  }
  function Vn(e, n, t) {
    Uint8Array.prototype.set.call(T(e, n), r(t));
  }
  function Gn(e, n) {
    return r(e).push(r(n));
  }
  function Hn(e) {
    queueMicrotask(r(e));
  }
  function Jn(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function Qn() {
    return f(function(e, n) {
      r(e).randomFillSync(p(n));
    }, arguments);
  }
  function Xn(e) {
    const n = r(e).read();
    return s(n);
  }
  function Yn(e) {
    return r(e).readyState;
  }
  function Kn(e, n) {
    const t = r(n).reason, _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function Zn(e) {
    r(e).releaseLock();
  }
  function et() {
    return f(function(e, n, t, _) {
      r(e).removeEventListener(w(n, t), r(_));
    }, arguments);
  }
  function nt() {
    return f(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function tt(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function _t() {
    return f(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function rt() {
    return f(function(e, n, t) {
      r(e).send(T(n, t));
    }, arguments);
  }
  function ot() {
    return f(function(e, n, t) {
      r(e).send(w(n, t));
    }, arguments);
  }
  function ct() {
    return f(function(e, n, t) {
      const _ = r(e).setTimeout(p(n), t);
      return s(_);
    }, arguments);
  }
  function st(e, n) {
    const t = setTimeout(r(e), n);
    return s(t);
  }
  function it(e, n, t) {
    r(e).set(T(n, t));
  }
  function at(e, n, t) {
    r(e)[p(n)] = p(t);
  }
  function bt(e, n, t) {
    r(e)[n >>> 0] = p(t);
  }
  function dt(e, n) {
    r(e).binaryType = ye[n];
  }
  function ft(e, n) {
    r(e).body = r(n);
  }
  function ut(e, n) {
    r(e).cache = me[n];
  }
  function gt(e, n) {
    r(e).credentials = xe[n];
  }
  function wt(e, n) {
    r(e).handleEvent = r(n);
  }
  function lt(e, n) {
    r(e).headers = r(n);
  }
  function pt(e, n) {
    r(e).highWaterMark = n;
  }
  function ht(e, n, t) {
    r(e).method = w(n, t);
  }
  function yt(e, n) {
    r(e).mode = Se[n];
  }
  function mt(e, n) {
    r(e).onclose = r(n);
  }
  function xt(e, n) {
    r(e).onerror = r(n);
  }
  function St(e, n) {
    r(e).onmessage = r(n);
  }
  function vt(e, n) {
    r(e).onopen = r(n);
  }
  function kt(e, n) {
    r(e).signal = r(n);
  }
  function It(e) {
    const n = r(e).signal;
    return s(n);
  }
  function Rt(e, n) {
    const t = r(n).stack, _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function jt() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : s(e);
  }
  function Ft() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : s(e);
  }
  function Tt() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : s(e);
  }
  function Ct() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : s(e);
  }
  function At(e) {
    return r(e).status;
  }
  function Et() {
    return f(function(e) {
      const n = JSON.stringify(r(e));
      return s(n);
    }, arguments);
  }
  function Ot(e, n, t) {
    const _ = r(e).subarray(n >>> 0, t >>> 0);
    return s(_);
  }
  function Lt(e, n, t) {
    const _ = r(e).then(r(n), r(t));
    return s(_);
  }
  function Mt(e, n) {
    const t = r(e).then(r(n));
    return s(t);
  }
  function Nt(e, n) {
    const t = r(n).url, _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function Ut(e, n) {
    const t = r(n).url, _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function qt(e) {
    const n = r(e).value;
    return s(n);
  }
  function Bt(e) {
    const n = r(e).versions;
    return s(n);
  }
  function zt(e) {
    const n = r(e).view;
    return x(n) ? 0 : s(n);
  }
  function Wt(e, n) {
    var t = q(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.warn(...t);
  }
  function Dt(e) {
    return r(e).wasClean;
  }
  function $t(e) {
    const n = r(e), t = typeof n == "boolean" ? n : void 0;
    return x(t) ? 16777215 : t ? 1 : 0;
  }
  function Pt(e) {
    const n = r(e).original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function Vt(e, n) {
    const t = J(r(n)), _ = y(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = h;
    d().setInt32(e + 4 * 1, o, true), d().setInt32(e + 4 * 0, _, true);
  }
  function Gt(e, n) {
    return r(e) in r(n);
  }
  function Ht(e) {
    return typeof r(e) == "function";
  }
  function Jt(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function Qt(e) {
    return typeof r(e) == "string";
  }
  function Xt(e) {
    return r(e) === void 0;
  }
  function Yt(e, n) {
    return r(e) == r(n);
  }
  function Kt(e, n) {
    const t = r(n), _ = typeof t == "number" ? t : void 0;
    d().setFloat64(e + 8 * 1, x(_) ? 0 : _, true), d().setInt32(e + 4 * 0, !x(_), true);
  }
  function Zt(e, n) {
    const t = r(n), _ = typeof t == "string" ? t : void 0;
    var o = x(_) ? 0 : y(_, c.__wbindgen_export_0, c.__wbindgen_export_1), a = h;
    d().setInt32(e + 4 * 1, a, true), d().setInt32(e + 4 * 0, o, true);
  }
  function e_(e, n) {
    throw new Error(w(e, n));
  }
  function n_(e, n) {
    const t = w(e, n);
    return s(t);
  }
  function t_(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function __(e, n) {
    const t = C(e, n, 735, pe);
    return s(t);
  }
  function r_(e, n) {
    const t = be(e, n, 1565, le);
    return s(t);
  }
  function o_(e, n) {
    const t = C(e, n, 1693, fe);
    return s(t);
  }
  function c_(e, n) {
    const t = C(e, n, 2755, ue);
    return s(t);
  }
  function s_(e, n) {
    const t = T(e, n);
    return s(t);
  }
  function i_(e, n) {
    const t = C(e, n, 1556, we);
    return s(t);
  }
  function a_(e) {
    return s(e);
  }
  function b_(e, n) {
    const t = C(e, n, 2763, de);
    return s(t);
  }
  function d_(e, n) {
    const t = C(e, n, 1772, ge);
    return s(t);
  }
  function f_(e) {
    const n = r(e);
    return s(n);
  }
  function u_(e) {
    p(e);
  }
  URL = globalThis.URL;
  const i = await oe({
    "./chat_browser_bg.js": {
      __wbindgen_object_drop_ref: u_,
      __wbg_chatnode_new: ze,
      __wbg_channel_new: Be,
      __wbindgen_object_clone_ref: f_,
      __wbg_String_8f0eb39a4a4c2f66: ke,
      __wbg_getwithrefkey_1dc361bd10053bfe: bn,
      __wbg_set_3f1d0b984ed272ed: at,
      __wbg_new_8a6f238a6ece86ea: jn,
      __wbg_stack_0ed75d68575b0f3c: Rt,
      __wbg_error_7534b8e9a36f1ab4: Ze,
      __wbg_debug_55137df391ebfd29: Xe,
      __wbg_error_91947ba14c44e1c9: en,
      __wbg_log_e51ef223c244b133: yn,
      __wbg_warn_479b8bbb8337357b: Wt,
      __wbg_fetch_74a3e84ebd2c9a0e: nn,
      __wbg_setTimeout_7bb3429662ab1e70: st,
      __wbg_clearTimeout_7a42b49784aea641: We,
      __wbg_getReader_48e00749fe3f6089: on,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: Ln,
      __wbg_signal_da4d466ce86118b5: It,
      __wbg_new_66b9434b4e59b63e: Rn,
      __wbg_abort_67e1b49bf6614565: Ie,
      __wbg_abort_d830bf2e9aa6ec5b: Re,
      __wbg_instanceof_Blob_3db67efd3f1b960f: gn,
      __wbg_wasClean_ffb515fbcbcbdd3d: Dt,
      __wbg_code_177e3bed72688e58: Ge,
      __wbg_reason_97efd955be6394bd: Kn,
      __wbg_message_5481231e71ccaf7b: mn,
      __wbg_code_89056d52bf1a8bb0: He,
      __wbg_sethandleevent_504d6c0317f9f4e9: wt,
      __wbg_addEventListener_ae4c27d78f35f886: je,
      __wbg_removeEventListener_7d68951e6508eb3c: et,
      __wbg_new_f6e53210afea8e45: Cn,
      __wbg_append_72a3c0addd2bce38: Fe,
      __wbg_data_9ab529722bcc4e6c: Qe,
      __wbg_sethighwatermark_3d5961f834647d41: pt,
      __wbg_byobRequest_2c036bceca1e6037: Ee,
      __wbg_close_cccada6053ee3a65: Pe,
      __wbg_view_91cc97d57ab30530: zt,
      __wbg_respond_6c2c4e20ef85138e: _t,
      __wbg_close_d71a78219dc23e91: Ve,
      __wbg_enqueue_452bc2343d1c2ff9: Ke,
      __wbg_read_bc925c758aa4d897: Xn,
      __wbg_releaseLock_ff29b586502a8221: Zn,
      __wbg_cancel_8bb5b8f4906b658a: Ue,
      __wbg_getdone_f026246f6bbe58d3: sn,
      __wbg_getvalue_31e5a08f61e5aa42: an,
      __wbg_newwithstrandinit_b5d168a29a3fd85f: Nn,
      __wbg_setbody_c8460bdf44147df8: ft,
      __wbg_setcache_90ca4ad8a8ad40d3: ut,
      __wbg_setcredentials_9cd60d632c9d5dfc: gt,
      __wbg_setheaders_0052283e2f3503d1: lt,
      __wbg_setmethod_9b504d5b855b329c: ht,
      __wbg_setmode_a23e1a2ad8b512f8: yt,
      __wbg_setsignal_8c45ad1247a74809: kt,
      __wbg_instanceof_Response_50fde2cd696850bf: wn,
      __wbg_url_e5720dfacf77b05e: Ut,
      __wbg_status_3fea3036088621d6: At,
      __wbg_headers_29fec3c72865cd75: fn,
      __wbg_body_4851aa049324a851: Ce,
      __wbg_arrayBuffer_9c99b8e2809e8cbb: Te,
      __wbg_url_18b0690200329f32: Nt,
      __wbg_readyState_b0d20ca4531d3797: Yn,
      __wbg_setonopen_3e43af381c2901f8: vt,
      __wbg_setonerror_5d9bff045f909e89: xt,
      __wbg_setonclose_159c0332c2d91b09: mt,
      __wbg_setonmessage_5e486f326638a9da: St,
      __wbg_setbinaryType_37f3cd35d7775a47: dt,
      __wbg_new_e213f63d18b0de01: Tn,
      __wbg_newwithstrsequence_f7e2d4848dd49d98: Un,
      __wbg_close_6437264570d2d37f: $e,
      __wbg_send_bdda9fac7465e036: ot,
      __wbg_send_aa9cb445685f0fd0: rt,
      __wbg_fetch_87aed7f306ec6d63: tn,
      __wbg_crypto_574e78ad8b13b65f: Je,
      __wbg_process_dc0fbacc7c1c06f7: Pn,
      __wbg_versions_c01dfd4722a88165: Bt,
      __wbg_node_905d3e251edff8a2: zn,
      __wbg_require_60cc747a6bc5215a: nt,
      __wbg_msCrypto_a61aeb35a24c1329: xn,
      __wbg_getRandomValues_b8f5dbd5f3995a9e: rn,
      __wbg_randomFillSync_ac0988aba3254290: Qn,
      __wbg_setTimeout_282db1c50d4a7304: ct,
      __wbg_clearTimeout_cbe3107816206ed5: De,
      __wbg_queueMicrotask_25d0739ac89e8c88: Hn,
      __wbg_queueMicrotask_4488407636f5bf24: Jn,
      __wbg_performance_7a3ffd0b17f663ad: $n,
      __wbg_now_2c95c9de01293173: Dn,
      __wbg_next_5b3530e612fde77d: qn,
      __wbg_new_1f3a344cf3123716: vn,
      __wbg_set_90f6c0f7bd8c0415: bt,
      __wbg_push_330b2eb93e4e1212: Gn,
      __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd: un,
      __wbg_new_da9dc54c5db29dfa: Fn,
      __wbg_newnoargs_254190557c45b4ec: En,
      __wbg_call_13410aac570ffff7: Me,
      __wbg_call_a5400b25a865cfd8: Ne,
      __wbg_next_692e82279131b03c: Bn,
      __wbg_done_75ed0ee6dd243d9d: Ye,
      __wbg_value_dd9372230531eade: qt,
      __wbg_now_1e80617bcee43265: Wn,
      __wbg_new_19c25a3f2fa63a02: Sn,
      __wbg_get_458e874b43b18b25: cn,
      __wbg_has_b89e451f638123e3: dn,
      __wbg_stringify_b98c93d0a190446a: Et,
      __wbg_iterator_f370b34483c71a1c: pn,
      __wbg_new_2e3c58a15f39f5f9: kn,
      __wbg_resolve_4055c623acdd6a1b: tt,
      __wbg_catch_c80ecae90cb8ed4e: qe,
      __wbg_then_e22500defe16819f: Mt,
      __wbg_then_b33a773d723afa3e: Lt,
      __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184: Ft,
      __wbg_static_accessor_SELF_995b214ae681ff99: Tt,
      __wbg_static_accessor_WINDOW_cde3890479c675ea: Ct,
      __wbg_static_accessor_GLOBAL_8921f820c2ce3f12: jt,
      __wbg_prototypesetcall_3d4a26c1ed734349: Vn,
      __wbg_set_1353b2a5e96bc48c: it,
      __wbg_instanceof_Uint8Array_9a8378d955933db7: ln,
      __wbg_new_638ebfaedbf32a5e: In,
      __wbg_newwithlength_a167dcc7aaa3ba77: Mn,
      __wbg_newfromslice_074c56947bd43469: An,
      __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45: On,
      __wbg_buffer_8d40b1d762fb3c66: Ae,
      __wbg_subarray_70fd07feefe14294: Ot,
      __wbg_length_6bb7e81f9d7713e4: hn,
      __wbg_byteLength_331a6b5545834024: Oe,
      __wbg_byteOffset_49a5b5608000358b: Le,
      __wbg_getRandomValues_1c61fac11405ffdc: _n,
      __wbg_wbindgendebugstring_99ef257a3ddda34d: Vt,
      __wbg_Error_e17e777aac105295: ve,
      __wbg_wbindgenisundefined_c4b71d073b92f3c5: Xt,
      __wbg_wbindgenisobject_307a53c6bd97fbf8: Jt,
      __wbg_wbindgenisfunction_8cee7dce3725ae74: Ht,
      __wbg_wbindgenisstring_d4fa939789f003b0: Qt,
      __wbg_wbindgenin_d7a1ee10933d2d55: Gt,
      __wbg_wbindgennumberget_f74b4c7525ac05cb: Kt,
      __wbg_wbindgenbooleanget_3fe6f642c7d97746: $t,
      __wbg_wbindgenstringget_0f16a6ddddef376f: Zt,
      __wbg_wbindgenthrow_451ec1a8469d7eb6: e_,
      __wbg_wbindgencbdrop_eb10308566512b88: Pt,
      __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1: Yt,
      __wbindgen_cast_e1c34903082403c1: b_,
      __wbindgen_cast_cb9088102bce6b30: s_,
      __wbindgen_cast_84c6047cf3a3a26f: o_,
      __wbindgen_cast_4625c577ab2ec9ee: t_,
      __wbindgen_cast_c2c989a27a0562df: c_,
      __wbindgen_cast_fc4b8e9259f7cb57: d_,
      __wbindgen_cast_d1cc5ed77062331f: i_,
      __wbindgen_cast_835a3fca9ef01735: r_,
      __wbindgen_cast_d6cd19b81560fd6e: a_,
      __wbindgen_cast_4d0daddcc392ccc2: __,
      __wbindgen_cast_2241b6af4c4b2941: n_
    }
  }, re), g_ = i.memory, w_ = i.start, l_ = i.__wbg_chatnode_free, p_ = i.chatnode_spawn, h_ = i.chatnode_endpoint_id, y_ = i.chatnode_create, m_ = i.chatnode_join, x_ = i.__wbg_channel_free, S_ = i.channel_sender, v_ = i.channel_receiver, k_ = i.channel_ticket, I_ = i.channel_id, R_ = i.channel_neighbors, j_ = i.__wbg_channelsender_free, F_ = i.channelsender_broadcast, T_ = i.channelsender_set_nickame, C_ = i.__wbg_intounderlyingbytesource_free, A_ = i.intounderlyingbytesource_type, E_ = i.intounderlyingbytesource_autoAllocateChunkSize, O_ = i.intounderlyingbytesource_start, L_ = i.intounderlyingbytesource_pull, M_ = i.intounderlyingbytesource_cancel, N_ = i.__wbg_intounderlyingsource_free, U_ = i.intounderlyingsource_pull, q_ = i.intounderlyingsource_cancel, B_ = i.__wbg_intounderlyingsink_free, z_ = i.intounderlyingsink_write, W_ = i.intounderlyingsink_close, D_ = i.intounderlyingsink_abort, $_ = i.ring_core_0_17_14__bn_mul_mont, P_ = i.__wbindgen_export_0, V_ = i.__wbindgen_export_1, G_ = i.__wbindgen_export_2, H_ = i.__wbindgen_export_3, J_ = i.__wbindgen_export_4, Q_ = i.__wbindgen_add_to_stack_pointer, X_ = i.__wbindgen_export_5, Y_ = i.__wbindgen_export_6, K_ = i.__wbindgen_export_7, Z_ = i.__wbindgen_export_8, er = i.__wbindgen_export_9, nr = i.__wbindgen_export_10, tr = i.__wbindgen_export_11, _r = i.__wbindgen_export_12, ee = i.__wbindgen_start, rr = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: x_,
    __wbg_channelsender_free: j_,
    __wbg_chatnode_free: l_,
    __wbg_intounderlyingbytesource_free: C_,
    __wbg_intounderlyingsink_free: B_,
    __wbg_intounderlyingsource_free: N_,
    __wbindgen_add_to_stack_pointer: Q_,
    __wbindgen_export_0: P_,
    __wbindgen_export_1: V_,
    __wbindgen_export_10: nr,
    __wbindgen_export_11: tr,
    __wbindgen_export_12: _r,
    __wbindgen_export_2: G_,
    __wbindgen_export_3: H_,
    __wbindgen_export_4: J_,
    __wbindgen_export_5: X_,
    __wbindgen_export_6: Y_,
    __wbindgen_export_7: K_,
    __wbindgen_export_8: Z_,
    __wbindgen_export_9: er,
    __wbindgen_start: ee,
    channel_id: I_,
    channel_neighbors: R_,
    channel_receiver: v_,
    channel_sender: S_,
    channel_ticket: k_,
    channelsender_broadcast: F_,
    channelsender_set_nickame: T_,
    chatnode_create: y_,
    chatnode_endpoint_id: h_,
    chatnode_join: m_,
    chatnode_spawn: p_,
    intounderlyingbytesource_autoAllocateChunkSize: E_,
    intounderlyingbytesource_cancel: M_,
    intounderlyingbytesource_pull: L_,
    intounderlyingbytesource_start: O_,
    intounderlyingbytesource_type: A_,
    intounderlyingsink_abort: D_,
    intounderlyingsink_close: W_,
    intounderlyingsink_write: z_,
    intounderlyingsource_cancel: q_,
    intounderlyingsource_pull: U_,
    memory: g_,
    ring_core_0_17_14__bn_mul_mont: $_,
    start: w_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ce(rr);
  ee();
  ne = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      A.info("Spawning iroh node");
      const n = await F.spawn();
      return A.info(`Iroh node spawned. our endpoint id: ${n.endpoint_id()}`), new ne(n);
    }
    async createChannel(n) {
      const t = await this.chatNode.create(n);
      return this.joinInner(t, n);
    }
    async joinChannel(n, t) {
      const _ = await this.chatNode.join(n, t);
      return this.joinInner(_, t);
    }
    joinInner(n, t) {
      const _ = n.id();
      A.info(`joining channel ${_}`);
      const o = _.substring(5, 13);
      let a, b = new Promise((R) => {
        a = R;
      });
      const u = this.chatNode.endpoint_id(), m = {
        id: u,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: V.Myself
      }, g = {
        label: o,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: m,
        onClose: a
      };
      g.peers.set(u, m), this.channels.set(_, g);
      const I = async () => {
        const R = n.receiver.getReader();
        for (; ; ) {
          const { done: S, value: B } = await R.read();
          if (S) break;
          const l = B;
          if (console.debug("channel event", _.substring(0, 8), l), l.type === "messageReceived") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            g.peers.set(l.from, v);
            const z = {
              id: Z(g),
              sender: l.from,
              content: l.text
            };
            g.messages.push(z);
            const _e = H(g, z);
            for (const P of g.subscribers) P(_e);
            for (const P of g.peerSubscribers) P();
          } else if (l.type === "presence") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            g.peers.set(l.from, v);
            for (const z of g.peerSubscribers) z();
          } else if (l.type === "joined") {
            A.info(`joined channel ${_}`), g.neighbors += l.neighbors.length;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          } else if (l.type === "neighborUp") {
            g.neighbors += 1;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          } else if (l.type === "neighborDown") {
            g.neighbors -= 1;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          }
        }
      }, te = async () => {
        for (; ; ) {
          const R = /* @__PURE__ */ new Date();
          for (const S of g.peers.values()) {
            if (S.id === u) {
              S.lastSeen = R;
              continue;
            }
            const B = (R.getTime() - S.lastSeen.getTime()) / 1e3;
            B > 20 ? S.status = "offline" : B > 10 ? S.status = "away" : S.status = "online";
          }
          await new Promise((S) => setTimeout(S, 1e3));
        }
      };
      return Promise.race([
        b,
        I(),
        te()
      ]), {
        id: _,
        name: o
      };
    }
    getMyself(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return {
        ...t.myself
      };
    }
    getTicket(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.channel.ticket(t);
    }
    async closeChannel(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      t.onClose(), this.channels.delete(n);
    }
    async sendMessage(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      await _.channel.sender.broadcast(t);
      const a = {
        sender: this.chatNode.endpoint_id(),
        id: Z(_),
        content: t
      };
      _.messages.push(a);
      const b = H(_, a);
      for (const u of _.subscribers) u(b);
    }
    setNickname(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      console.log("state", _), A.info(`changing nickname from ${_.myself.name} to ${t}`), _.myself.name = t, _.channel.sender.set_nickame(t);
      for (const o of _.peerSubscribers) o();
    }
    getMessages(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.messages.map((o) => H(t, o));
    }
    getPeers(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return Array.from(t.peers.values());
    }
    subscribeToMessages(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.subscribers.push(t), () => {
        _.subscribers = _.subscribers.filter((o) => o != t);
      };
    }
    subscribeToNeighbors(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return t(_.neighbors), _.neighborSubscribers.push(t), () => {
        _.neighborSubscribers = _.neighborSubscribers.filter((o) => o != t);
      };
    }
    subscribeToPeers(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.peerSubscribers.push(t), () => {
        _.peerSubscribers = _.peerSubscribers.filter((o) => o != t);
      };
    }
  };
  function or(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function H(e, n) {
    return {
      ...n,
      nickname: or(e, n.sender)
    };
  }
  function Z(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  ne as IrohAPI,
  __tla
};
