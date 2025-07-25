var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as W, __tla as __tla_0 } from "./index-S_SqfK4B.js";
let ee;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const _e = "" + new URL("chat_browser_bg-C0Kyx0l0.wasm", import.meta.url).href, re = async (e = {}, n) => {
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
  function oe(e) {
    c = e;
  }
  const k = new Array(128).fill(void 0);
  k.push(void 0, null, true, false);
  function r(e) {
    return k[e];
  }
  let p = 0, M = null;
  function F() {
    return (M === null || M.byteLength === 0) && (M = new Uint8Array(c.memory.buffer)), M;
  }
  const ce = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let q = new ce("utf-8");
  const se = typeof q.encodeInto == "function" ? function(e, n) {
    return q.encodeInto(e, n);
  } : function(e, n) {
    const t = q.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  };
  function m(e, n, t) {
    if (t === void 0) {
      const f = q.encode(e), y = n(f.length, 1) >>> 0;
      return F().subarray(y, y + f.length).set(f), p = f.length, y;
    }
    let _ = e.length, o = n(_, 1) >>> 0;
    const a = F();
    let b = 0;
    for (; b < _; b++) {
      const f = e.charCodeAt(b);
      if (f > 127) break;
      a[o + b] = f;
    }
    if (b !== _) {
      b !== 0 && (e = e.slice(b)), o = t(o, _, _ = b + e.length * 3, 1) >>> 0;
      const f = F().subarray(o + b, o + _), y = se(e, f);
      b += y.written, o = t(o, _, b, 1) >>> 0;
    }
    return p = b, o;
  }
  let T = null;
  function u() {
    return (T === null || T.buffer.detached === true || T.buffer.detached === void 0 && T.buffer !== c.memory.buffer) && (T = new DataView(c.memory.buffer)), T;
  }
  const ie = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let X = new ie("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  X.decode();
  function l(e, n) {
    return e = e >>> 0, X.decode(F().subarray(e, e + n));
  }
  let A = k.length;
  function s(e) {
    A === k.length && k.push(k.length + 1);
    const n = A;
    return A = k[n], k[n] = e, n;
  }
  function d(e, n) {
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
    e < 132 || (k[e] = A, A = e);
  }
  function w(e) {
    const n = r(e);
    return ae(e), n;
  }
  function j(e, n) {
    e = e >>> 0;
    const t = u(), _ = [];
    for (let o = e; o < e + 4 * n; o += 4) _.push(w(t.getUint32(o, true)));
    return _;
  }
  function Y(e, n) {
    return e = e >>> 0, F().subarray(e / 1, e / 1 + n);
  }
  const N = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => {
    c.__wbindgen_export_4.get(e.dtor)(e.a, e.b);
  });
  function E(e, n, t, _) {
    const o = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, a = (...b) => {
      o.cnt++;
      const f = o.a;
      o.a = 0;
      try {
        return _(f, o.b, ...b);
      } finally {
        --o.cnt === 0 ? (c.__wbindgen_export_4.get(o.dtor)(f, o.b), N.unregister(o)) : o.a = f;
      }
    };
    return a.original = o, N.register(a, o, o), a;
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
        --o.cnt === 0 && (c.__wbindgen_export_4.get(o.dtor)(o.a, o.b), o.a = 0, N.unregister(o));
      }
    };
    return a.original = o, N.register(a, o, o), a;
  }
  function D(e) {
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
      o > 0 && (a += D(e[0]));
      for (let b = 1; b < o; b++) a += ", " + D(e[b]);
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
  function ue(e, n, t) {
    c.__wbindgen_export_5(e, n, s(t));
  }
  function de(e, n) {
    c.__wbindgen_export_6(e, n);
  }
  function fe(e, n, t) {
    c.__wbindgen_export_7(e, n, s(t));
  }
  function ge(e, n) {
    c.__wbindgen_export_8(e, n);
  }
  function we(e, n) {
    c.__wbindgen_export_9(e, n);
  }
  function le(e, n, t) {
    c.__wbindgen_export_10(e, n, s(t));
  }
  function he(e, n, t, _) {
    c.__wbindgen_export_11(e, n, s(t), s(_));
  }
  const pe = [
    "blob",
    "arraybuffer"
  ], ye = [
    "omit",
    "same-origin",
    "include"
  ], me = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], G = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_channel_free(e >>> 0, 1));
  class $ {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create($.prototype);
      return t.__wbg_ptr = n, G.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, G.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = c.channel_sender(this.__wbg_ptr);
      return P.__wrap(n);
    }
    get receiver() {
      const n = c.channel_receiver(this.__wbg_ptr);
      return w(n);
    }
    ticket(n) {
      let t, _;
      try {
        const I = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_ticket(I, this.__wbg_ptr, s(n));
        var o = u().getInt32(I + 4 * 0, true), a = u().getInt32(I + 4 * 1, true), b = u().getInt32(I + 4 * 2, true), f = u().getInt32(I + 4 * 3, true), y = o, g = a;
        if (f) throw y = 0, g = 0, w(b);
        return t = y, _ = g, l(y, g);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const a = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_id(a, this.__wbg_ptr);
        var _ = u().getInt32(a + 4 * 0, true), o = u().getInt32(a + 4 * 1, true);
        return n = _, t = o, l(_, o);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(n, t, 1);
      }
    }
    neighbors() {
      try {
        const o = c.__wbindgen_add_to_stack_pointer(-16);
        c.channel_neighbors(o, this.__wbg_ptr);
        var n = u().getInt32(o + 4 * 0, true), t = u().getInt32(o + 4 * 1, true), _ = j(n, t).slice();
        return c.__wbindgen_export_3(n, t * 4, 4), _;
      } finally {
        c.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const H = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_channelsender_free(e >>> 0, 1));
  class P {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(P.prototype);
      return t.__wbg_ptr = n, H.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, H.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = m(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = p, o = c.channelsender_broadcast(this.__wbg_ptr, t, _);
      return w(o);
    }
    set_nickame(n) {
      const t = m(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = p;
      c.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  const J = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_chatnode_free(e >>> 0, 1));
  class z {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(z.prototype);
      return t.__wbg_ptr = n, J.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, J.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      c.__wbg_chatnode_free(n, 0);
    }
    static spawn() {
      const n = c.chatnode_spawn();
      return w(n);
    }
    node_id() {
      let n, t;
      try {
        const a = c.__wbindgen_add_to_stack_pointer(-16);
        c.chatnode_node_id(a, this.__wbg_ptr);
        var _ = u().getInt32(a + 4 * 0, true), o = u().getInt32(a + 4 * 1, true);
        return n = _, t = o, l(_, o);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_export_3(n, t, 1);
      }
    }
    remote_info() {
      try {
        const o = c.__wbindgen_add_to_stack_pointer(-16);
        c.chatnode_remote_info(o, this.__wbg_ptr);
        var n = u().getInt32(o + 4 * 0, true), t = u().getInt32(o + 4 * 1, true), _ = j(n, t).slice();
        return c.__wbindgen_export_3(n, t * 4, 4), _;
      } finally {
        c.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(n) {
      const t = m(n, c.__wbindgen_export_0, c.__wbindgen_export_1), _ = p, o = c.chatnode_create(this.__wbg_ptr, t, _);
      return w(o);
    }
    join(n, t) {
      const _ = m(n, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p, a = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), b = p, f = c.chatnode_join(this.__wbg_ptr, _, o, a, b);
      return w(f);
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => c.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => c.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => c.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class V {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(V.prototype);
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
      return w(t);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      c.intounderlyingsource_cancel(n);
    }
  }
  function xe(e, n) {
    const t = String(r(n)), _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function ve(e, n) {
    r(e).abort(r(n));
  }
  function Se(e) {
    r(e).abort();
  }
  function ke() {
    return d(function(e, n, t, _) {
      r(e).addEventListener(l(n, t), r(_));
    }, arguments);
  }
  function Ie() {
    return d(function(e, n, t, _, o) {
      r(e).append(l(n, t), l(_, o));
    }, arguments);
  }
  function Re() {
    return d(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function Te(e) {
    const n = r(e).body;
    return x(n) ? 0 : s(n);
  }
  function je(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Ce(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Fe(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : s(n);
  }
  function Ae(e) {
    return r(e).byteLength;
  }
  function Ee(e) {
    return r(e).byteOffset;
  }
  function Le() {
    return d(function(e, n) {
      const t = r(e).call(r(n));
      return s(t);
    }, arguments);
  }
  function Oe() {
    return d(function(e, n, t) {
      const _ = r(e).call(r(n), r(t));
      return s(_);
    }, arguments);
  }
  function Me(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function qe(e, n) {
    const t = r(e).catch(r(n));
    return s(t);
  }
  function Ne(e) {
    const n = $.__wrap(e);
    return s(n);
  }
  function ze(e) {
    const n = z.__wrap(e);
    return s(n);
  }
  function Ue() {
    return d(function(e, n) {
      r(e).clearTimeout(w(n));
    }, arguments);
  }
  function We(e) {
    const n = clearTimeout(w(e));
    return s(n);
  }
  function Be() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function De() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function $e() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function Pe(e) {
    return r(e).code;
  }
  function Ve(e) {
    return r(e).code;
  }
  function Ge(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function He(e) {
    const n = r(e).data;
    return s(n);
  }
  function Je(e, n) {
    var t = j(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.debug(...t);
  }
  function Ke(e) {
    return r(e).done;
  }
  function Qe() {
    return d(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function Xe(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(l(e, n));
    } finally {
      c.__wbindgen_export_3(t, _, 1);
    }
  }
  function Ye(e, n) {
    var t = j(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.error(...t);
  }
  function Ze(e, n) {
    const t = r(e).fetch(r(n));
    return s(t);
  }
  function en(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function nn() {
    return d(function(e, n) {
      globalThis.crypto.getRandomValues(Y(e, n));
    }, arguments);
  }
  function tn() {
    return d(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function _n() {
    return d(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function rn() {
    return d(function(e, n) {
      const t = Reflect.get(r(e), r(n));
      return s(t);
    }, arguments);
  }
  function on(e) {
    const n = r(e).done;
    return x(n) ? 16777215 : n ? 1 : 0;
  }
  function cn(e) {
    const n = r(e).value;
    return s(n);
  }
  function sn(e, n) {
    const t = r(e)[r(n)];
    return s(t);
  }
  function an() {
    return d(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function bn(e) {
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
  function dn(e) {
    let n;
    try {
      n = r(e) instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function fn(e) {
    let n;
    try {
      n = r(e) instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function gn(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function wn() {
    return s(Symbol.iterator);
  }
  function ln(e) {
    return r(e).length;
  }
  function hn(e, n) {
    var t = j(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.log(...t);
  }
  function pn(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function yn() {
    return d(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function mn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (a, b) => {
        const f = t.a;
        t.a = 0;
        try {
          return he(f, t.b, a, b);
        } finally {
          t.a = f;
        }
      };
      const o = new Promise(_);
      return s(o);
    } finally {
      t.a = t.b = 0;
    }
  }
  function xn() {
    const e = new Object();
    return s(e);
  }
  function vn() {
    return s(/* @__PURE__ */ new Map());
  }
  function Sn() {
    const e = new Array();
    return s(e);
  }
  function kn() {
    const e = new Error();
    return s(e);
  }
  function In() {
    return d(function(e, n) {
      const t = new WebSocket(l(e, n));
      return s(t);
    }, arguments);
  }
  function Rn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Tn(e, n) {
    const t = new Error(l(e, n));
    return s(t);
  }
  function jn() {
    return d(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function Cn(e, n) {
    const t = new Function(l(e, n));
    return s(t);
  }
  function Fn(e, n, t) {
    const _ = new Uint8Array(r(e), n >>> 0, t >>> 0);
    return s(_);
  }
  function An(e, n) {
    const t = new ReadableStream(V.__wrap(e), w(n));
    return s(t);
  }
  function En(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Ln() {
    return d(function(e, n, t) {
      const _ = new Request(l(e, n), r(t));
      return s(_);
    }, arguments);
  }
  function On() {
    return d(function(e, n, t) {
      const _ = new WebSocket(l(e, n), r(t));
      return s(_);
    }, arguments);
  }
  function Mn(e) {
    const n = r(e).next;
    return s(n);
  }
  function qn() {
    return d(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function Nn(e) {
    const n = r(e).node;
    return s(n);
  }
  function zn(e) {
    return r(e).now();
  }
  function Un() {
    return Date.now();
  }
  function Wn(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Bn(e) {
    const n = r(e).process;
    return s(n);
  }
  function Dn(e, n) {
    return r(e).push(r(n));
  }
  function $n(e) {
    queueMicrotask(r(e));
  }
  function Pn(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function Vn() {
    return d(function(e, n) {
      r(e).randomFillSync(w(n));
    }, arguments);
  }
  function Gn(e) {
    const n = r(e).read();
    return s(n);
  }
  function Hn(e) {
    return r(e).readyState;
  }
  function Jn(e, n) {
    const t = r(n).reason, _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function Kn(e) {
    r(e).releaseLock();
  }
  function Qn() {
    return d(function(e, n, t, _) {
      r(e).removeEventListener(l(n, t), r(_));
    }, arguments);
  }
  function Xn() {
    return d(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function Yn(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function Zn() {
    return d(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function et() {
    return d(function(e, n, t) {
      r(e).send(l(n, t));
    }, arguments);
  }
  function nt() {
    return d(function(e, n, t) {
      r(e).send(Y(n, t));
    }, arguments);
  }
  function tt(e, n) {
    const t = setTimeout(r(e), n);
    return s(t);
  }
  function _t() {
    return d(function(e, n, t) {
      const _ = r(e).setTimeout(w(n), t);
      return s(_);
    }, arguments);
  }
  function rt(e, n, t) {
    r(e)[n >>> 0] = w(t);
  }
  function ot(e, n, t) {
    r(e)[w(n)] = w(t);
  }
  function ct(e, n, t) {
    r(e).set(r(n), t >>> 0);
  }
  function st(e, n, t) {
    const _ = r(e).set(r(n), r(t));
    return s(_);
  }
  function it(e, n) {
    r(e).binaryType = pe[n];
  }
  function at(e, n) {
    r(e).body = r(n);
  }
  function bt(e, n) {
    r(e).credentials = ye[n];
  }
  function ut(e, n) {
    r(e).handleEvent = r(n);
  }
  function dt(e, n) {
    r(e).headers = r(n);
  }
  function ft(e, n) {
    r(e).highWaterMark = n;
  }
  function gt(e, n, t) {
    r(e).method = l(n, t);
  }
  function wt(e, n) {
    r(e).mode = me[n];
  }
  function lt(e, n) {
    r(e).onclose = r(n);
  }
  function ht(e, n) {
    r(e).onerror = r(n);
  }
  function pt(e, n) {
    r(e).onmessage = r(n);
  }
  function yt(e, n) {
    r(e).onopen = r(n);
  }
  function mt(e, n) {
    r(e).signal = r(n);
  }
  function xt(e) {
    const n = r(e).signal;
    return s(n);
  }
  function vt(e, n) {
    const t = r(n).stack, _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function St() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : s(e);
  }
  function kt() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : s(e);
  }
  function It() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : s(e);
  }
  function Rt() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : s(e);
  }
  function Tt(e) {
    return r(e).status;
  }
  function jt() {
    return d(function(e) {
      const n = JSON.stringify(r(e));
      return s(n);
    }, arguments);
  }
  function Ct(e, n, t) {
    const _ = r(e).subarray(n >>> 0, t >>> 0);
    return s(_);
  }
  function Ft(e, n) {
    const t = r(e).then(r(n));
    return s(t);
  }
  function At(e, n, t) {
    const _ = r(e).then(r(n), r(t));
    return s(_);
  }
  function Et(e, n) {
    const t = r(n).url, _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function Lt(e, n) {
    const t = r(n).url, _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function Ot(e) {
    const n = r(e).value;
    return s(n);
  }
  function Mt(e) {
    const n = r(e).versions;
    return s(n);
  }
  function qt(e) {
    const n = r(e).view;
    return x(n) ? 0 : s(n);
  }
  function Nt(e, n) {
    var t = j(e, n).slice();
    c.__wbindgen_export_3(e, n * 4, 4), console.warn(...t);
  }
  function zt(e) {
    return r(e).wasClean;
  }
  function Ut(e) {
    return +r(e);
  }
  function Wt(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function Bt(e) {
    const n = r(e);
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function Dt(e) {
    const n = w(e).original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function $t(e, n, t) {
    const _ = E(e, n, 2589, we);
    return s(_);
  }
  function Pt(e, n, t) {
    const _ = E(e, n, 2598, le);
    return s(_);
  }
  function Vt(e, n, t) {
    const _ = E(e, n, 712, ue);
    return s(_);
  }
  function Gt(e, n, t) {
    const _ = be(e, n, 1500, de);
    return s(_);
  }
  function Ht(e, n, t) {
    const _ = E(e, n, 1603, fe);
    return s(_);
  }
  function Jt(e, n, t) {
    const _ = E(e, n, 1682, ge);
    return s(_);
  }
  function Kt(e, n) {
    const t = D(r(n)), _ = m(t, c.__wbindgen_export_0, c.__wbindgen_export_1), o = p;
    u().setInt32(e + 4 * 1, o, true), u().setInt32(e + 4 * 0, _, true);
  }
  function Qt(e, n) {
    const t = new Error(l(e, n));
    return s(t);
  }
  function Xt(e, n) {
    return r(e) in r(n);
  }
  function Yt(e) {
    return typeof r(e) == "function";
  }
  function Zt(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function e_(e) {
    return typeof r(e) == "string";
  }
  function n_(e) {
    return r(e) === void 0;
  }
  function t_(e, n) {
    return r(e) == r(n);
  }
  function __() {
    const e = c.memory;
    return s(e);
  }
  function r_(e, n) {
    const t = r(n), _ = typeof t == "number" ? t : void 0;
    u().setFloat64(e + 8 * 1, x(_) ? 0 : _, true), u().setInt32(e + 4 * 0, !x(_), true);
  }
  function o_(e) {
    return s(e);
  }
  function c_(e) {
    const n = r(e);
    return s(n);
  }
  function s_(e) {
    w(e);
  }
  function i_(e, n) {
    const t = r(n), _ = typeof t == "string" ? t : void 0;
    var o = x(_) ? 0 : m(_, c.__wbindgen_export_0, c.__wbindgen_export_1), a = p;
    u().setInt32(e + 4 * 1, a, true), u().setInt32(e + 4 * 0, o, true);
  }
  function a_(e, n) {
    const t = l(e, n);
    return s(t);
  }
  function b_(e, n) {
    throw new Error(l(e, n));
  }
  URL = globalThis.URL;
  const i = await re({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Qt,
      __wbindgen_string_new: a_,
      __wbindgen_object_drop_ref: s_,
      __wbindgen_is_undefined: n_,
      __wbindgen_in: Xt,
      __wbindgen_boolean_get: Bt,
      __wbindgen_is_object: Zt,
      __wbindgen_as_number: Ut,
      __wbindgen_object_clone_ref: c_,
      __wbg_chatnode_new: ze,
      __wbg_channel_new: Ne,
      __wbindgen_jsval_loose_eq: t_,
      __wbindgen_number_get: r_,
      __wbindgen_string_get: i_,
      __wbg_String_8f0eb39a4a4c2f66: xe,
      __wbindgen_number_new: o_,
      __wbindgen_bigint_from_u64: Wt,
      __wbg_getwithrefkey_1dc361bd10053bfe: sn,
      __wbg_set_3f1d0b984ed272ed: ot,
      __wbg_new_8a6f238a6ece86ea: kn,
      __wbg_stack_0ed75d68575b0f3c: vt,
      __wbg_error_7534b8e9a36f1ab4: Xe,
      __wbindgen_cb_drop: Dt,
      __wbg_debug_55137df391ebfd29: Je,
      __wbg_error_91947ba14c44e1c9: Ye,
      __wbg_log_e51ef223c244b133: hn,
      __wbg_warn_479b8bbb8337357b: Nt,
      __wbg_getRandomValues_3c9c0d586e575a16: nn,
      __wbindgen_is_string: e_,
      __wbg_fetch_d36a73832f0a45e8: en,
      __wbg_setTimeout_2e707715f8cc9497: tt,
      __wbg_clearTimeout_86721db0036bea98: We,
      __wbg_getReader_48e00749fe3f6089: _n,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: An,
      __wbg_signal_aaf9ad74119f20a4: xt,
      __wbg_new_e25e5aab09ff45db: jn,
      __wbg_abort_775ef1d17fc65868: Se,
      __wbg_abort_410ec47a64ac6117: ve,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: dn,
      __wbg_wasClean_605b4fd66d44354a: zt,
      __wbg_code_f4ec1e6e2e1b0417: Ve,
      __wbg_reason_49f1cede8bcf23dd: Jn,
      __wbg_code_cfd8f6868bdaed9b: Pe,
      __wbg_sethandleevent_8454ae22cde5c602: ut,
      __wbg_addEventListener_834c7f05e9c3b98b: ke,
      __wbg_removeEventListener_709135c542708608: Qn,
      __wbg_new_018dcc2d6c8c2f6a: yn,
      __wbg_append_8c7dd8d641a5f01b: Ie,
      __wbg_data_432d9c3df2630942: He,
      __wbg_sethighwatermark_793c99c89830c8e9: ft,
      __wbg_byobRequest_77d9adf63337edfb: Fe,
      __wbg_close_5ce03e29be453811: $e,
      __wbg_view_fd8a56e8983f448d: qt,
      __wbg_respond_1f279fa9f8edcb1c: Zn,
      __wbg_close_304cc1fef3466669: De,
      __wbg_enqueue_bb16ba72f537dc9e: Qe,
      __wbg_read_a2434af1186cb56c: Gn,
      __wbg_releaseLock_091899af97991d2e: Kn,
      __wbg_cancel_8a308660caa6cadf: Me,
      __wbg_getdone_d47073731acd3e74: on,
      __wbg_getvalue_009dcd63692bee1f: cn,
      __wbg_newwithstrandinit_06c535e0a867c635: Ln,
      __wbg_setbody_5923b78a95eedf29: at,
      __wbg_setcredentials_c3a22f1cd105a2c6: bt,
      __wbg_setheaders_834c0bdb6a8949ad: dt,
      __wbg_setmethod_3c5280fe5d890842: gt,
      __wbg_setmode_5dc300b865044b65: wt,
      __wbg_setsignal_75b21ef3a81de905: mt,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: fn,
      __wbg_url_ae10c34ca209681d: Et,
      __wbg_status_f6360336ca686bf0: Tt,
      __wbg_headers_9cb51cfd2ac780a4: bn,
      __wbg_body_0b8fd1fe671660df: Te,
      __wbg_arrayBuffer_d1b44c4390db422f: Re,
      __wbg_url_ce9ab75bf9627ae4: Lt,
      __wbg_readyState_7ef6e63c349899ed: Hn,
      __wbg_setonopen_2da654e1f39745d5: yt,
      __wbg_setonerror_8639efe354b947cd: ht,
      __wbg_setonclose_14fc475a49d488fc: lt,
      __wbg_setonmessage_6eccab530a8fb4c7: pt,
      __wbg_setbinaryType_92fa1ffd873b327c: it,
      __wbg_new_92c54fc74574ef55: In,
      __wbg_newwithstrsequence_6e9d6479e1cf978d: On,
      __wbg_close_2893b7d056a0627d: Be,
      __wbg_send_0293179ba074ffb4: et,
      __wbg_send_fc0c204e8a1757f4: nt,
      __wbg_fetch_509096533071c657: Ze,
      __wbg_setTimeout_4eb823e8b72fbe79: _t,
      __wbg_clearTimeout_15dfc3d1dcb635c6: Ue,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: $n,
      __wbg_queueMicrotask_d3219def82552485: Pn,
      __wbindgen_is_function: Yt,
      __wbg_performance_7a3ffd0b17f663ad: Wn,
      __wbg_now_2c95c9de01293173: zn,
      __wbg_crypto_ed58b8e10a292839: Ge,
      __wbg_process_5c1d670bc53614b8: Bn,
      __wbg_versions_c71aa1626a93e0a1: Mt,
      __wbg_node_02999533c4ea02e3: Nn,
      __wbg_require_79b1e9274cde3c87: Xn,
      __wbg_msCrypto_0a36e2ec3a343d26: pn,
      __wbg_getRandomValues_bcb4912f16000dc4: tn,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Vn,
      __wbg_new_78feb108b6472713: Sn,
      __wbg_newnoargs_105ed471475aaf50: Cn,
      __wbg_new_5e0be73521bc8c17: vn,
      __wbg_next_25feadfc0913fea9: Mn,
      __wbg_value_cd1ffa7b1ab794f1: Ot,
      __wbg_iterator_9a24c88df860dc65: wn,
      __wbg_new_405e22f390576ce2: xn,
      __wbg_set_37837023f3d740e8: rt,
      __wbg_push_737cfc8c1432c2c6: Dn,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: un,
      __wbg_new_c68d7209be747379: Tn,
      __wbg_call_672a4d21634d4a24: Le,
      __wbg_call_7cccdd69e0791ae2: Oe,
      __wbg_set_8fc6bf8a5b1071d1: st,
      __wbg_next_6574e1a8a62d1055: qn,
      __wbg_done_769e5ede4b31c67b: Ke,
      __wbg_now_807e54c39636c349: Un,
      __wbg_get_67b2ba62fc30de12: rn,
      __wbg_has_a5ea9117f258a0ec: an,
      __wbg_buffer_609cc3eee51ed158: Ce,
      __wbg_stringify_f7ed6987935b4a24: jt,
      __wbg_new_23a2665fac83c611: mn,
      __wbg_resolve_4851785c9c5f573d: Yn,
      __wbg_catch_a6e601879b2610e9: qe,
      __wbg_then_44b73946d2fb3e7d: Ft,
      __wbg_then_48b406749878a531: At,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: kt,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: It,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: Rt,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: St,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: Fn,
      __wbg_new_a12002a7f91c75be: Rn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: gn,
      __wbg_newwithlength_a381634e90c276d4: En,
      __wbg_buffer_09165b52af8c5237: je,
      __wbg_subarray_aa9065fa9dc5df96: Ct,
      __wbg_length_a446193dc22c12f8: ln,
      __wbg_byteLength_e674b853d9c77e1d: Ae,
      __wbg_byteOffset_fd862df290ef848d: Ee,
      __wbg_set_65595bdd868b3009: ct,
      __wbindgen_debug_string: Kt,
      __wbindgen_throw: b_,
      __wbindgen_memory: __,
      __wbindgen_closure_wrapper3520: Vt,
      __wbindgen_closure_wrapper6498: Gt,
      __wbindgen_closure_wrapper6985: Ht,
      __wbindgen_closure_wrapper7774: Jt,
      __wbindgen_closure_wrapper13487: $t,
      __wbindgen_closure_wrapper13542: Pt
    }
  }, _e), u_ = i.memory, d_ = i.start, f_ = i.__wbg_chatnode_free, g_ = i.chatnode_spawn, w_ = i.chatnode_node_id, l_ = i.chatnode_remote_info, h_ = i.chatnode_create, p_ = i.chatnode_join, y_ = i.__wbg_channel_free, m_ = i.channel_sender, x_ = i.channel_receiver, v_ = i.channel_ticket, S_ = i.channel_id, k_ = i.channel_neighbors, I_ = i.__wbg_channelsender_free, R_ = i.channelsender_broadcast, T_ = i.channelsender_set_nickame, j_ = i.__wbg_intounderlyingbytesource_free, C_ = i.intounderlyingbytesource_type, F_ = i.intounderlyingbytesource_autoAllocateChunkSize, A_ = i.intounderlyingbytesource_start, E_ = i.intounderlyingbytesource_pull, L_ = i.intounderlyingbytesource_cancel, O_ = i.__wbg_intounderlyingsource_free, M_ = i.intounderlyingsource_pull, q_ = i.intounderlyingsource_cancel, N_ = i.__wbg_intounderlyingsink_free, z_ = i.intounderlyingsink_write, U_ = i.intounderlyingsink_close, W_ = i.intounderlyingsink_abort, B_ = i.ring_core_0_17_11__bn_mul_mont, D_ = i.__wbindgen_export_0, $_ = i.__wbindgen_export_1, P_ = i.__wbindgen_export_2, V_ = i.__wbindgen_export_3, G_ = i.__wbindgen_export_4, H_ = i.__wbindgen_add_to_stack_pointer, J_ = i.__wbindgen_export_5, K_ = i.__wbindgen_export_6, Q_ = i.__wbindgen_export_7, X_ = i.__wbindgen_export_8, Y_ = i.__wbindgen_export_9, Z_ = i.__wbindgen_export_10, er = i.__wbindgen_export_11, Z = i.__wbindgen_start, nr = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: y_,
    __wbg_channelsender_free: I_,
    __wbg_chatnode_free: f_,
    __wbg_intounderlyingbytesource_free: j_,
    __wbg_intounderlyingsink_free: N_,
    __wbg_intounderlyingsource_free: O_,
    __wbindgen_add_to_stack_pointer: H_,
    __wbindgen_export_0: D_,
    __wbindgen_export_1: $_,
    __wbindgen_export_10: Z_,
    __wbindgen_export_11: er,
    __wbindgen_export_2: P_,
    __wbindgen_export_3: V_,
    __wbindgen_export_4: G_,
    __wbindgen_export_5: J_,
    __wbindgen_export_6: K_,
    __wbindgen_export_7: Q_,
    __wbindgen_export_8: X_,
    __wbindgen_export_9: Y_,
    __wbindgen_start: Z,
    channel_id: S_,
    channel_neighbors: k_,
    channel_receiver: x_,
    channel_sender: m_,
    channel_ticket: v_,
    channelsender_broadcast: R_,
    channelsender_set_nickame: T_,
    chatnode_create: h_,
    chatnode_join: p_,
    chatnode_node_id: w_,
    chatnode_remote_info: l_,
    chatnode_spawn: g_,
    intounderlyingbytesource_autoAllocateChunkSize: F_,
    intounderlyingbytesource_cancel: L_,
    intounderlyingbytesource_pull: E_,
    intounderlyingbytesource_start: A_,
    intounderlyingbytesource_type: C_,
    intounderlyingsink_abort: W_,
    intounderlyingsink_close: U_,
    intounderlyingsink_write: z_,
    intounderlyingsource_cancel: q_,
    intounderlyingsource_pull: M_,
    memory: u_,
    ring_core_0_17_11__bn_mul_mont: B_,
    start: d_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  oe(nr);
  Z();
  ee = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      C.info("Spawning iroh node");
      const n = await z.spawn();
      return C.info(`Iroh node spawned. our node id: ${n.node_id()}`), new ee(n);
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
      C.info(`joining channel ${_}`);
      const o = _.substring(5, 13);
      let a, b = new Promise((R) => {
        a = R;
      });
      const f = this.chatNode.node_id(), y = {
        id: f,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: W.Myself
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
        myself: y,
        onClose: a
      };
      g.peers.set(f, y), this.channels.set(_, g);
      const I = async () => {
        const R = n.receiver.getReader();
        for (; ; ) {
          const { done: v, value: L } = await R.read();
          if (v) break;
          const h = L;
          if (console.debug("channel event", _.substring(0, 8), h), h.type === "messageReceived") {
            const S = {
              id: h.from,
              name: h.nickname,
              lastSeen: new Date(h.sentTimestamp / 1e3),
              status: "online",
              role: W.RemoteNode
            };
            g.peers.set(h.from, S);
            const O = {
              id: Q(g),
              sender: h.from,
              content: h.text
            };
            g.messages.push(O);
            const te = B(g, O);
            for (const U of g.subscribers) U(te);
            for (const U of g.peerSubscribers) U();
          } else if (h.type === "presence") {
            const S = {
              id: h.from,
              name: h.nickname,
              lastSeen: new Date(h.sentTimestamp / 1e3),
              status: "online",
              role: W.RemoteNode
            };
            g.peers.set(h.from, S);
            for (const O of g.peerSubscribers) O();
          } else if (h.type === "joined") {
            C.info(`joined channel ${_}`), g.neighbors += h.neighbors.length;
            for (const S of g.neighborSubscribers) S(g.neighbors);
          } else if (h.type === "neighborUp") {
            g.neighbors += 1;
            for (const S of g.neighborSubscribers) S(g.neighbors);
          } else if (h.type === "neighborDown") {
            g.neighbors -= 1;
            for (const S of g.neighborSubscribers) S(g.neighbors);
          }
        }
      }, ne = async () => {
        for (; ; ) {
          const R = /* @__PURE__ */ new Date();
          for (const v of g.peers.values()) {
            if (v.id === f) {
              v.lastSeen = R;
              continue;
            }
            const L = (R.getTime() - v.lastSeen.getTime()) / 1e3;
            L > 20 ? v.status = "offline" : L > 10 ? v.status = "away" : v.status = "online";
          }
          await new Promise((v) => setTimeout(v, 1e3));
        }
      };
      return Promise.race([
        b,
        I(),
        ne()
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
        sender: this.chatNode.node_id(),
        id: Q(_),
        content: t
      };
      _.messages.push(a);
      const b = B(_, a);
      for (const f of _.subscribers) f(b);
    }
    setNickname(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      console.log("state", _), C.info(`changing nickname from ${_.myself.name} to ${t}`), _.myself.name = t, _.channel.sender.set_nickame(t);
      for (const o of _.peerSubscribers) o();
    }
    getMessages(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.messages.map((o) => B(t, o));
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
  function tr(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function B(e, n) {
    return {
      ...n,
      nickname: tr(e, n.sender)
    };
  }
  function Q(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  ee as IrohAPI,
  __tla
};
