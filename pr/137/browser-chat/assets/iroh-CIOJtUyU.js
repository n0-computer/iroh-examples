var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-re6zWRoe.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-CRiWvHMa.wasm", import.meta.url).href, oe = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let o;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") o = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const b = atob(_);
        o = new Uint8Array(b.length);
        for (let a = 0; a < b.length; a++) o[a] = b.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(o, e);
    } else {
      const _ = await fetch(n), o = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && o.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(_, e);
      else {
        const b = await _.arrayBuffer();
        t = await WebAssembly.instantiate(b, e);
      }
    }
    return t.instance.exports;
  };
  let s;
  function ce(e) {
    s = e;
  }
  let z = null;
  function A() {
    return (z === null || z.byteLength === 0) && (z = new Uint8Array(s.memory.buffer)), z;
  }
  let D = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  D.decode();
  const se = 2146435072;
  let H = 0;
  function ie(e, n) {
    return H += n, H >= se && (D = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), D.decode(), H = n), D.decode(A().subarray(e, e + n));
  }
  function w(e, n) {
    return e = e >>> 0, ie(e, n);
  }
  let k = new Array(128).fill(void 0);
  k.push(void 0, null, true, false);
  let E = k.length;
  function c(e) {
    E === k.length && k.push(k.length + 1);
    const n = E;
    return E = k[n], k[n] = e, n;
  }
  function r(e) {
    return k[e];
  }
  let p = 0;
  const O = new TextEncoder();
  "encodeInto" in O || (O.encodeInto = function(e, n) {
    const t = O.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  });
  function m(e, n, t) {
    if (t === void 0) {
      const u = O.encode(e), y = n(u.length, 1) >>> 0;
      return A().subarray(y, y + u.length).set(u), p = u.length, y;
    }
    let _ = e.length, o = n(_, 1) >>> 0;
    const b = A();
    let a = 0;
    for (; a < _; a++) {
      const u = e.charCodeAt(a);
      if (u > 127) break;
      b[o + a] = u;
    }
    if (a !== _) {
      a !== 0 && (e = e.slice(a)), o = t(o, _, _ = a + e.length * 3, 1) >>> 0;
      const u = A().subarray(o + a, o + _), y = O.encodeInto(e, u);
      a += y.written, o = t(o, _, a, 1) >>> 0;
    }
    return p = a, o;
  }
  let j = null;
  function f() {
    return (j === null || j.buffer.detached === true || j.buffer.detached === void 0 && j.buffer !== s.memory.buffer) && (j = new DataView(s.memory.buffer)), j;
  }
  function d(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      s.__wbindgen_export_2(c(t));
    }
  }
  function x(e) {
    return e == null;
  }
  function be(e) {
    e < 132 || (k[e] = E, E = e);
  }
  function h(e) {
    const n = r(e);
    return be(e), n;
  }
  function B(e, n) {
    e = e >>> 0;
    const t = f(), _ = [];
    for (let o = e; o < e + 4 * n; o += 4) _.push(h(t.getUint32(o, true)));
    return _;
  }
  function T(e, n) {
    return e = e >>> 0, A().subarray(e / 1, e / 1 + n);
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
      let b = "[";
      o > 0 && (b += J(e[0]));
      for (let a = 1; a < o; a++) b += ", " + J(e[a]);
      return b += "]", b;
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
    s.__wbindgen_export_4.get(e.dtor)(e.a, e.b);
  });
  function U(e, n, t, _) {
    const o = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, b = (...a) => {
      o.cnt++;
      const u = o.a;
      o.a = 0;
      try {
        return _(u, o.b, ...a);
      } finally {
        --o.cnt === 0 ? (s.__wbindgen_export_4.get(o.dtor)(u, o.b), $.unregister(o)) : o.a = u;
      }
    };
    return b.original = o, $.register(b, o, o), b;
  }
  function ae(e, n, t, _) {
    const o = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, b = (...a) => {
      o.cnt++;
      try {
        return _(o.a, o.b, ...a);
      } finally {
        --o.cnt === 0 && (s.__wbindgen_export_4.get(o.dtor)(o.a, o.b), o.a = 0, $.unregister(o));
      }
    };
    return b.original = o, $.register(b, o, o), b;
  }
  function de(e, n, t) {
    s.__wbindgen_export_5(e, n, c(t));
  }
  function fe(e, n) {
    s.__wbindgen_export_6(e, n);
  }
  function ue(e, n, t) {
    s.__wbindgen_export_7(e, n, c(t));
  }
  function ge(e, n) {
    s.__wbindgen_export_8(e, n);
  }
  function we(e, n, t) {
    s.__wbindgen_export_9(e, n, c(t));
  }
  function le(e, n) {
    s.__wbindgen_export_10(e, n);
  }
  function he(e, n, t, _) {
    s.__wbindgen_export_11(e, n, c(t), c(_));
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
  ], X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_channel_free(e >>> 0, 1));
  class L {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(L.prototype);
      return t.__wbg_ptr = n, X.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, X.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      s.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = s.channel_sender(this.__wbg_ptr);
      return M.__wrap(n);
    }
    get receiver() {
      const n = s.channel_receiver(this.__wbg_ptr);
      return h(n);
    }
    ticket(n) {
      let t, _;
      try {
        const R = s.__wbindgen_add_to_stack_pointer(-16);
        s.channel_ticket(R, this.__wbg_ptr, c(n));
        var o = f().getInt32(R + 4 * 0, true), b = f().getInt32(R + 4 * 1, true), a = f().getInt32(R + 4 * 2, true), u = f().getInt32(R + 4 * 3, true), y = o, g = b;
        if (u) throw y = 0, g = 0, h(a);
        return t = y, _ = g, w(y, g);
      } finally {
        s.__wbindgen_add_to_stack_pointer(16), s.__wbindgen_export_3(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const b = s.__wbindgen_add_to_stack_pointer(-16);
        s.channel_id(b, this.__wbg_ptr);
        var _ = f().getInt32(b + 4 * 0, true), o = f().getInt32(b + 4 * 1, true);
        return n = _, t = o, w(_, o);
      } finally {
        s.__wbindgen_add_to_stack_pointer(16), s.__wbindgen_export_3(n, t, 1);
      }
    }
    neighbors() {
      try {
        const o = s.__wbindgen_add_to_stack_pointer(-16);
        s.channel_neighbors(o, this.__wbg_ptr);
        var n = f().getInt32(o + 4 * 0, true), t = f().getInt32(o + 4 * 1, true), _ = B(n, t).slice();
        return s.__wbindgen_export_3(n, t * 4, 4), _;
      } finally {
        s.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  Symbol.dispose && (L.prototype[Symbol.dispose] = L.prototype.free);
  const Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_channelsender_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(M.prototype);
      return t.__wbg_ptr = n, Y.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Y.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      s.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = m(n, s.__wbindgen_export_0, s.__wbindgen_export_1), _ = p, o = s.channelsender_broadcast(this.__wbg_ptr, t, _);
      return h(o);
    }
    set_nickame(n) {
      const t = m(n, s.__wbindgen_export_0, s.__wbindgen_export_1), _ = p;
      s.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  const K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_chatnode_free(e >>> 0, 1));
  class F {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(F.prototype);
      return t.__wbg_ptr = n, K.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, K.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      s.__wbg_chatnode_free(n, 0);
    }
    static spawn() {
      const n = s.chatnode_spawn();
      return h(n);
    }
    node_id() {
      let n, t;
      try {
        const b = s.__wbindgen_add_to_stack_pointer(-16);
        s.chatnode_node_id(b, this.__wbg_ptr);
        var _ = f().getInt32(b + 4 * 0, true), o = f().getInt32(b + 4 * 1, true);
        return n = _, t = o, w(_, o);
      } finally {
        s.__wbindgen_add_to_stack_pointer(16), s.__wbindgen_export_3(n, t, 1);
      }
    }
    create(n) {
      const t = m(n, s.__wbindgen_export_0, s.__wbindgen_export_1), _ = p, o = s.chatnode_create(this.__wbg_ptr, t, _);
      return h(o);
    }
    join(n, t) {
      const _ = m(n, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p, b = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), a = p, u = s.chatnode_join(this.__wbg_ptr, _, o, b, a);
      return h(u);
    }
  }
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => s.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => s.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class N {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(N.prototype);
      return t.__wbg_ptr = n, Q.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Q.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      s.__wbg_intounderlyingsource_free(n, 0);
    }
    pull(n) {
      const t = s.intounderlyingsource_pull(this.__wbg_ptr, c(n));
      return h(t);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      s.intounderlyingsource_cancel(n);
    }
  }
  Symbol.dispose && (N.prototype[Symbol.dispose] = N.prototype.free);
  function xe(e, n) {
    const t = Error(w(e, n));
    return c(t);
  }
  function Se(e, n) {
    const t = String(r(n)), _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function ve(e) {
    r(e).abort();
  }
  function ke(e, n) {
    r(e).abort(r(n));
  }
  function Re() {
    return d(function(e, n, t, _) {
      r(e).addEventListener(w(n, t), r(_));
    }, arguments);
  }
  function Ie() {
    return d(function(e, n, t, _, o) {
      r(e).append(w(n, t), w(_, o));
    }, arguments);
  }
  function je() {
    return d(function(e) {
      const n = r(e).arrayBuffer();
      return c(n);
    }, arguments);
  }
  function Fe(e) {
    const n = r(e).body;
    return x(n) ? 0 : c(n);
  }
  function Te(e) {
    const n = r(e).buffer;
    return c(n);
  }
  function Ce(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : c(n);
  }
  function Ae(e) {
    return r(e).byteLength;
  }
  function Ee(e) {
    return r(e).byteOffset;
  }
  function Oe() {
    return d(function(e, n) {
      const t = r(e).call(r(n));
      return c(t);
    }, arguments);
  }
  function Le() {
    return d(function(e, n, t) {
      const _ = r(e).call(r(n), r(t));
      return c(_);
    }, arguments);
  }
  function Me(e) {
    const n = r(e).cancel();
    return c(n);
  }
  function Ne(e, n) {
    const t = r(e).catch(r(n));
    return c(t);
  }
  function Be(e) {
    const n = L.__wrap(e);
    return c(n);
  }
  function Ue(e) {
    const n = F.__wrap(e);
    return c(n);
  }
  function qe() {
    return d(function(e, n) {
      r(e).clearTimeout(h(n));
    }, arguments);
  }
  function We(e) {
    const n = clearTimeout(h(e));
    return c(n);
  }
  function ze() {
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
  function He(e) {
    const n = r(e).crypto;
    return c(n);
  }
  function Ge(e) {
    const n = r(e).data;
    return c(n);
  }
  function Je(e, n) {
    var t = B(e, n).slice();
    s.__wbindgen_export_3(e, n * 4, 4), console.debug(...t);
  }
  function Xe(e) {
    return r(e).done;
  }
  function Ye() {
    return d(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function Ke(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(w(e, n));
    } finally {
      s.__wbindgen_export_3(t, _, 1);
    }
  }
  function Qe(e, n) {
    var t = B(e, n).slice();
    s.__wbindgen_export_3(e, n * 4, 4), console.error(...t);
  }
  function Ze(e, n) {
    const t = r(e).fetch(r(n));
    return c(t);
  }
  function en(e) {
    const n = fetch(r(e));
    return c(n);
  }
  function nn() {
    return d(function(e, n) {
      globalThis.crypto.getRandomValues(T(e, n));
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
      return c(n);
    }, arguments);
  }
  function rn() {
    return d(function(e, n) {
      const t = Reflect.get(r(e), r(n));
      return c(t);
    }, arguments);
  }
  function on(e) {
    const n = r(e).done;
    return x(n) ? 16777215 : n ? 1 : 0;
  }
  function cn(e) {
    const n = r(e).value;
    return c(n);
  }
  function sn(e, n) {
    const t = r(e)[r(n)];
    return c(t);
  }
  function bn() {
    return d(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function an(e) {
    const n = r(e).headers;
    return c(n);
  }
  function dn(e) {
    let n;
    try {
      n = r(e) instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function fn(e) {
    let n;
    try {
      n = r(e) instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function un(e) {
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
    return c(Symbol.iterator);
  }
  function ln(e) {
    return r(e).length;
  }
  function hn(e, n) {
    var t = B(e, n).slice();
    s.__wbindgen_export_3(e, n * 4, 4), console.log(...t);
  }
  function pn(e) {
    const n = r(e).msCrypto;
    return c(n);
  }
  function yn() {
    const e = new Object();
    return c(e);
  }
  function mn() {
    const e = new Array();
    return c(e);
  }
  function xn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (b, a) => {
        const u = t.a;
        t.a = 0;
        try {
          return he(u, t.b, b, a);
        } finally {
          t.a = u;
        }
      };
      const o = new Promise(_);
      return c(o);
    } finally {
      t.a = t.b = 0;
    }
  }
  function Sn(e) {
    const n = new Uint8Array(r(e));
    return c(n);
  }
  function vn() {
    return d(function() {
      const e = new AbortController();
      return c(e);
    }, arguments);
  }
  function kn() {
    const e = new Error();
    return c(e);
  }
  function Rn(e, n) {
    const t = new Error(w(e, n));
    return c(t);
  }
  function In() {
    return d(function(e, n) {
      const t = new WebSocket(w(e, n));
      return c(t);
    }, arguments);
  }
  function jn() {
    return d(function() {
      const e = new Headers();
      return c(e);
    }, arguments);
  }
  function Fn(e, n) {
    const t = new Uint8Array(T(e, n));
    return c(t);
  }
  function Tn(e, n) {
    const t = new Function(w(e, n));
    return c(t);
  }
  function Cn(e, n, t) {
    const _ = new Uint8Array(r(e), n >>> 0, t >>> 0);
    return c(_);
  }
  function An(e, n) {
    const t = new ReadableStream(N.__wrap(e), h(n));
    return c(t);
  }
  function En(e) {
    const n = new Uint8Array(e >>> 0);
    return c(n);
  }
  function On() {
    return d(function(e, n, t) {
      const _ = new Request(w(e, n), r(t));
      return c(_);
    }, arguments);
  }
  function Ln() {
    return d(function(e, n, t) {
      const _ = new WebSocket(w(e, n), r(t));
      return c(_);
    }, arguments);
  }
  function Mn(e) {
    const n = r(e).next;
    return c(n);
  }
  function Nn() {
    return d(function(e) {
      const n = r(e).next();
      return c(n);
    }, arguments);
  }
  function Bn(e) {
    const n = r(e).node;
    return c(n);
  }
  function Un() {
    return Date.now();
  }
  function qn(e) {
    return r(e).now();
  }
  function Wn(e) {
    const n = r(e).performance;
    return c(n);
  }
  function zn(e) {
    const n = r(e).process;
    return c(n);
  }
  function Dn(e, n, t) {
    Uint8Array.prototype.set.call(T(e, n), r(t));
  }
  function $n(e, n) {
    return r(e).push(r(n));
  }
  function Pn(e) {
    queueMicrotask(r(e));
  }
  function Vn(e) {
    const n = r(e).queueMicrotask;
    return c(n);
  }
  function Hn() {
    return d(function(e, n) {
      r(e).randomFillSync(h(n));
    }, arguments);
  }
  function Gn(e) {
    const n = r(e).read();
    return c(n);
  }
  function Jn(e) {
    return r(e).readyState;
  }
  function Xn(e, n) {
    const t = r(n).reason, _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function Yn(e) {
    r(e).releaseLock();
  }
  function Kn() {
    return d(function(e, n, t, _) {
      r(e).removeEventListener(w(n, t), r(_));
    }, arguments);
  }
  function Qn() {
    return d(function() {
      const e = module.require;
      return c(e);
    }, arguments);
  }
  function Zn(e) {
    const n = Promise.resolve(r(e));
    return c(n);
  }
  function et() {
    return d(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function nt() {
    return d(function(e, n, t) {
      r(e).send(T(n, t));
    }, arguments);
  }
  function tt() {
    return d(function(e, n, t) {
      r(e).send(w(n, t));
    }, arguments);
  }
  function _t(e, n) {
    const t = setTimeout(r(e), n);
    return c(t);
  }
  function rt() {
    return d(function(e, n, t) {
      const _ = r(e).setTimeout(h(n), t);
      return c(_);
    }, arguments);
  }
  function ot(e, n, t) {
    r(e).set(T(n, t));
  }
  function ct(e, n, t) {
    r(e)[h(n)] = h(t);
  }
  function st(e, n, t) {
    r(e)[n >>> 0] = h(t);
  }
  function it(e, n) {
    r(e).binaryType = pe[n];
  }
  function bt(e, n) {
    r(e).body = r(n);
  }
  function at(e, n) {
    r(e).credentials = ye[n];
  }
  function dt(e, n) {
    r(e).handleEvent = r(n);
  }
  function ft(e, n) {
    r(e).headers = r(n);
  }
  function ut(e, n) {
    r(e).highWaterMark = n;
  }
  function gt(e, n, t) {
    r(e).method = w(n, t);
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
    return c(n);
  }
  function St(e, n) {
    const t = r(n).stack, _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function vt() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : c(e);
  }
  function kt() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : c(e);
  }
  function Rt() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : c(e);
  }
  function It() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : c(e);
  }
  function jt(e) {
    return r(e).status;
  }
  function Ft() {
    return d(function(e) {
      const n = JSON.stringify(r(e));
      return c(n);
    }, arguments);
  }
  function Tt(e, n, t) {
    const _ = r(e).subarray(n >>> 0, t >>> 0);
    return c(_);
  }
  function Ct(e, n, t) {
    const _ = r(e).then(r(n), r(t));
    return c(_);
  }
  function At(e, n) {
    const t = r(e).then(r(n));
    return c(t);
  }
  function Et(e, n) {
    const t = r(n).url, _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function Ot(e, n) {
    const t = r(n).url, _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function Lt(e) {
    const n = r(e).value;
    return c(n);
  }
  function Mt(e) {
    const n = r(e).versions;
    return c(n);
  }
  function Nt(e) {
    const n = r(e).view;
    return x(n) ? 0 : c(n);
  }
  function Bt(e, n) {
    var t = B(e, n).slice();
    s.__wbindgen_export_3(e, n * 4, 4), console.warn(...t);
  }
  function Ut(e) {
    return r(e).wasClean;
  }
  function qt(e) {
    const n = r(e), t = typeof n == "boolean" ? n : void 0;
    return x(t) ? 16777215 : t ? 1 : 0;
  }
  function Wt(e) {
    const n = r(e).original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function zt(e, n) {
    const t = J(r(n)), _ = m(t, s.__wbindgen_export_0, s.__wbindgen_export_1), o = p;
    f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
  }
  function Dt(e, n) {
    return r(e) in r(n);
  }
  function $t(e) {
    return typeof r(e) == "function";
  }
  function Pt(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function Vt(e) {
    return typeof r(e) == "string";
  }
  function Ht(e) {
    return r(e) === void 0;
  }
  function Gt(e, n) {
    return r(e) == r(n);
  }
  function Jt(e, n) {
    const t = r(n), _ = typeof t == "number" ? t : void 0;
    f().setFloat64(e + 8 * 1, x(_) ? 0 : _, true), f().setInt32(e + 4 * 0, !x(_), true);
  }
  function Xt(e, n) {
    const t = r(n), _ = typeof t == "string" ? t : void 0;
    var o = x(_) ? 0 : m(_, s.__wbindgen_export_0, s.__wbindgen_export_1), b = p;
    f().setInt32(e + 4 * 1, b, true), f().setInt32(e + 4 * 0, o, true);
  }
  function Yt(e, n) {
    throw new Error(w(e, n));
  }
  function Kt(e, n) {
    const t = U(e, n, 1702, fe);
    return c(t);
  }
  function Qt(e, n) {
    const t = w(e, n);
    return c(t);
  }
  function Zt(e, n) {
    const t = U(e, n, 2625, ue);
    return c(t);
  }
  function e_(e) {
    const n = BigInt.asUintN(64, e);
    return c(n);
  }
  function n_(e, n) {
    const t = ae(e, n, 1510, le);
    return c(t);
  }
  function t_(e, n) {
    const t = U(e, n, 2617, ge);
    return c(t);
  }
  function __(e, n) {
    const t = U(e, n, 692, de);
    return c(t);
  }
  function r_(e, n) {
    const t = T(e, n);
    return c(t);
  }
  function o_(e) {
    return c(e);
  }
  function c_(e, n) {
    const t = U(e, n, 1623, we);
    return c(t);
  }
  function s_(e) {
    const n = r(e);
    return c(n);
  }
  function i_(e) {
    h(e);
  }
  URL = globalThis.URL;
  const i = await oe({
    "./chat_browser_bg.js": {
      __wbindgen_object_drop_ref: i_,
      __wbg_chatnode_new: Ue,
      __wbg_channel_new: Be,
      __wbindgen_object_clone_ref: s_,
      __wbg_String_8f0eb39a4a4c2f66: Se,
      __wbg_getwithrefkey_1dc361bd10053bfe: sn,
      __wbg_set_3f1d0b984ed272ed: ct,
      __wbg_new_8a6f238a6ece86ea: kn,
      __wbg_stack_0ed75d68575b0f3c: St,
      __wbg_error_7534b8e9a36f1ab4: Ke,
      __wbg_debug_55137df391ebfd29: Je,
      __wbg_error_91947ba14c44e1c9: Qe,
      __wbg_log_e51ef223c244b133: hn,
      __wbg_warn_479b8bbb8337357b: Bt,
      __wbg_fetch_d36a73832f0a45e8: en,
      __wbg_setTimeout_2e707715f8cc9497: _t,
      __wbg_clearTimeout_86721db0036bea98: We,
      __wbg_getReader_48e00749fe3f6089: _n,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: An,
      __wbg_signal_da4d466ce86118b5: xt,
      __wbg_new_66b9434b4e59b63e: vn,
      __wbg_abort_67e1b49bf6614565: ve,
      __wbg_abort_d830bf2e9aa6ec5b: ke,
      __wbg_instanceof_Blob_3db67efd3f1b960f: fn,
      __wbg_wasClean_ffb515fbcbcbdd3d: Ut,
      __wbg_code_177e3bed72688e58: Pe,
      __wbg_reason_97efd955be6394bd: Xn,
      __wbg_code_89056d52bf1a8bb0: Ve,
      __wbg_sethandleevent_504d6c0317f9f4e9: dt,
      __wbg_addEventListener_ae4c27d78f35f886: Re,
      __wbg_removeEventListener_7d68951e6508eb3c: Kn,
      __wbg_new_f6e53210afea8e45: jn,
      __wbg_append_72a3c0addd2bce38: Ie,
      __wbg_data_9ab529722bcc4e6c: Ge,
      __wbg_sethighwatermark_3d5961f834647d41: ut,
      __wbg_byobRequest_2c036bceca1e6037: Ce,
      __wbg_close_cccada6053ee3a65: De,
      __wbg_view_91cc97d57ab30530: Nt,
      __wbg_respond_6c2c4e20ef85138e: et,
      __wbg_close_d71a78219dc23e91: $e,
      __wbg_enqueue_452bc2343d1c2ff9: Ye,
      __wbg_read_bc925c758aa4d897: Gn,
      __wbg_releaseLock_ff29b586502a8221: Yn,
      __wbg_cancel_8bb5b8f4906b658a: Me,
      __wbg_getdone_f026246f6bbe58d3: on,
      __wbg_getvalue_31e5a08f61e5aa42: cn,
      __wbg_newwithstrandinit_b5d168a29a3fd85f: On,
      __wbg_setbody_c8460bdf44147df8: bt,
      __wbg_setcredentials_9cd60d632c9d5dfc: at,
      __wbg_setheaders_0052283e2f3503d1: ft,
      __wbg_setmethod_9b504d5b855b329c: gt,
      __wbg_setmode_a23e1a2ad8b512f8: wt,
      __wbg_setsignal_8c45ad1247a74809: mt,
      __wbg_instanceof_Response_50fde2cd696850bf: un,
      __wbg_url_e5720dfacf77b05e: Ot,
      __wbg_status_3fea3036088621d6: jt,
      __wbg_headers_29fec3c72865cd75: an,
      __wbg_body_4851aa049324a851: Fe,
      __wbg_arrayBuffer_9c99b8e2809e8cbb: je,
      __wbg_url_18b0690200329f32: Et,
      __wbg_readyState_b0d20ca4531d3797: Jn,
      __wbg_setonopen_3e43af381c2901f8: yt,
      __wbg_setonerror_5d9bff045f909e89: ht,
      __wbg_setonclose_159c0332c2d91b09: lt,
      __wbg_setonmessage_5e486f326638a9da: pt,
      __wbg_setbinaryType_37f3cd35d7775a47: it,
      __wbg_new_e213f63d18b0de01: In,
      __wbg_newwithstrsequence_f7e2d4848dd49d98: Ln,
      __wbg_close_6437264570d2d37f: ze,
      __wbg_send_bdda9fac7465e036: tt,
      __wbg_send_aa9cb445685f0fd0: nt,
      __wbg_fetch_87aed7f306ec6d63: Ze,
      __wbg_crypto_ed58b8e10a292839: He,
      __wbg_process_5c1d670bc53614b8: zn,
      __wbg_versions_c71aa1626a93e0a1: Mt,
      __wbg_node_02999533c4ea02e3: Bn,
      __wbg_require_79b1e9274cde3c87: Qn,
      __wbg_msCrypto_0a36e2ec3a343d26: pn,
      __wbg_getRandomValues_bcb4912f16000dc4: tn,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Hn,
      __wbg_setTimeout_4eb823e8b72fbe79: rt,
      __wbg_clearTimeout_15dfc3d1dcb635c6: qe,
      __wbg_queueMicrotask_25d0739ac89e8c88: Pn,
      __wbg_queueMicrotask_4488407636f5bf24: Vn,
      __wbg_performance_7a3ffd0b17f663ad: Wn,
      __wbg_now_2c95c9de01293173: qn,
      __wbg_next_5b3530e612fde77d: Mn,
      __wbg_new_1f3a344cf3123716: mn,
      __wbg_set_90f6c0f7bd8c0415: st,
      __wbg_push_330b2eb93e4e1212: $n,
      __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd: dn,
      __wbg_new_da9dc54c5db29dfa: Rn,
      __wbg_newnoargs_254190557c45b4ec: Tn,
      __wbg_call_13410aac570ffff7: Oe,
      __wbg_call_a5400b25a865cfd8: Le,
      __wbg_next_692e82279131b03c: Nn,
      __wbg_done_75ed0ee6dd243d9d: Xe,
      __wbg_value_dd9372230531eade: Lt,
      __wbg_now_1e80617bcee43265: Un,
      __wbg_new_19c25a3f2fa63a02: yn,
      __wbg_get_458e874b43b18b25: rn,
      __wbg_has_b89e451f638123e3: bn,
      __wbg_stringify_b98c93d0a190446a: Ft,
      __wbg_iterator_f370b34483c71a1c: wn,
      __wbg_new_2e3c58a15f39f5f9: xn,
      __wbg_resolve_4055c623acdd6a1b: Zn,
      __wbg_catch_c80ecae90cb8ed4e: Ne,
      __wbg_then_e22500defe16819f: At,
      __wbg_then_b33a773d723afa3e: Ct,
      __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184: kt,
      __wbg_static_accessor_SELF_995b214ae681ff99: Rt,
      __wbg_static_accessor_WINDOW_cde3890479c675ea: It,
      __wbg_static_accessor_GLOBAL_8921f820c2ce3f12: vt,
      __wbg_prototypesetcall_3d4a26c1ed734349: Dn,
      __wbg_set_1353b2a5e96bc48c: ot,
      __wbg_instanceof_Uint8Array_9a8378d955933db7: gn,
      __wbg_new_638ebfaedbf32a5e: Sn,
      __wbg_newwithlength_a167dcc7aaa3ba77: En,
      __wbg_newfromslice_074c56947bd43469: Fn,
      __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45: Cn,
      __wbg_buffer_8d40b1d762fb3c66: Te,
      __wbg_subarray_70fd07feefe14294: Tt,
      __wbg_length_6bb7e81f9d7713e4: ln,
      __wbg_byteLength_331a6b5545834024: Ae,
      __wbg_byteOffset_49a5b5608000358b: Ee,
      __wbg_getRandomValues_3c9c0d586e575a16: nn,
      __wbg_wbindgendebugstring_99ef257a3ddda34d: zt,
      __wbg_Error_e17e777aac105295: xe,
      __wbg_wbindgenisundefined_c4b71d073b92f3c5: Ht,
      __wbg_wbindgenisobject_307a53c6bd97fbf8: Pt,
      __wbg_wbindgenisfunction_8cee7dce3725ae74: $t,
      __wbg_wbindgenisstring_d4fa939789f003b0: Vt,
      __wbg_wbindgenin_d7a1ee10933d2d55: Dt,
      __wbg_wbindgennumberget_f74b4c7525ac05cb: Jt,
      __wbg_wbindgenbooleanget_3fe6f642c7d97746: qt,
      __wbg_wbindgenstringget_0f16a6ddddef376f: Xt,
      __wbg_wbindgenthrow_451ec1a8469d7eb6: Yt,
      __wbg_wbindgencbdrop_eb10308566512b88: Wt,
      __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1: Gt,
      __wbindgen_cast_c81f69ec434d9589: __,
      __wbindgen_cast_2241b6af4c4b2941: Qt,
      __wbindgen_cast_0ec9cbdb61be38e5: Kt,
      __wbindgen_cast_4625c577ab2ec9ee: e_,
      __wbindgen_cast_d6cd19b81560fd6e: o_,
      __wbindgen_cast_28f2eb5a4fc667f9: Zt,
      __wbindgen_cast_c1dc5f5e960feae7: t_,
      __wbindgen_cast_dffd7d4f8947c575: c_,
      __wbindgen_cast_cb9088102bce6b30: r_,
      __wbindgen_cast_5f4476aaed9b45d3: n_
    }
  }, re), b_ = i.memory, a_ = i.start, d_ = i.__wbg_chatnode_free, f_ = i.chatnode_spawn, u_ = i.chatnode_node_id, g_ = i.chatnode_create, w_ = i.chatnode_join, l_ = i.__wbg_channel_free, h_ = i.channel_sender, p_ = i.channel_receiver, y_ = i.channel_ticket, m_ = i.channel_id, x_ = i.channel_neighbors, S_ = i.__wbg_channelsender_free, v_ = i.channelsender_broadcast, k_ = i.channelsender_set_nickame, R_ = i.__wbg_intounderlyingbytesource_free, I_ = i.intounderlyingbytesource_type, j_ = i.intounderlyingbytesource_autoAllocateChunkSize, F_ = i.intounderlyingbytesource_start, T_ = i.intounderlyingbytesource_pull, C_ = i.intounderlyingbytesource_cancel, A_ = i.__wbg_intounderlyingsource_free, E_ = i.intounderlyingsource_pull, O_ = i.intounderlyingsource_cancel, L_ = i.__wbg_intounderlyingsink_free, M_ = i.intounderlyingsink_write, N_ = i.intounderlyingsink_close, B_ = i.intounderlyingsink_abort, U_ = i.ring_core_0_17_11__bn_mul_mont, q_ = i.__wbindgen_export_0, W_ = i.__wbindgen_export_1, z_ = i.__wbindgen_export_2, D_ = i.__wbindgen_export_3, $_ = i.__wbindgen_export_4, P_ = i.__wbindgen_add_to_stack_pointer, V_ = i.__wbindgen_export_5, H_ = i.__wbindgen_export_6, G_ = i.__wbindgen_export_7, J_ = i.__wbindgen_export_8, X_ = i.__wbindgen_export_9, Y_ = i.__wbindgen_export_10, K_ = i.__wbindgen_export_11, ee = i.__wbindgen_start, Q_ = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: l_,
    __wbg_channelsender_free: S_,
    __wbg_chatnode_free: d_,
    __wbg_intounderlyingbytesource_free: R_,
    __wbg_intounderlyingsink_free: L_,
    __wbg_intounderlyingsource_free: A_,
    __wbindgen_add_to_stack_pointer: P_,
    __wbindgen_export_0: q_,
    __wbindgen_export_1: W_,
    __wbindgen_export_10: Y_,
    __wbindgen_export_11: K_,
    __wbindgen_export_2: z_,
    __wbindgen_export_3: D_,
    __wbindgen_export_4: $_,
    __wbindgen_export_5: V_,
    __wbindgen_export_6: H_,
    __wbindgen_export_7: G_,
    __wbindgen_export_8: J_,
    __wbindgen_export_9: X_,
    __wbindgen_start: ee,
    channel_id: m_,
    channel_neighbors: x_,
    channel_receiver: p_,
    channel_sender: h_,
    channel_ticket: y_,
    channelsender_broadcast: v_,
    channelsender_set_nickame: k_,
    chatnode_create: g_,
    chatnode_join: w_,
    chatnode_node_id: u_,
    chatnode_spawn: f_,
    intounderlyingbytesource_autoAllocateChunkSize: j_,
    intounderlyingbytesource_cancel: C_,
    intounderlyingbytesource_pull: T_,
    intounderlyingbytesource_start: F_,
    intounderlyingbytesource_type: I_,
    intounderlyingsink_abort: B_,
    intounderlyingsink_close: N_,
    intounderlyingsink_write: M_,
    intounderlyingsource_cancel: O_,
    intounderlyingsource_pull: E_,
    memory: b_,
    ring_core_0_17_11__bn_mul_mont: U_,
    start: a_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ce(Q_);
  ee();
  ne = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      C.info("Spawning iroh node");
      const n = await F.spawn();
      return C.info(`Iroh node spawned. our node id: ${n.node_id()}`), new ne(n);
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
      let b, a = new Promise((I) => {
        b = I;
      });
      const u = this.chatNode.node_id(), y = {
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
        myself: y,
        onClose: b
      };
      g.peers.set(u, y), this.channels.set(_, g);
      const R = async () => {
        const I = n.receiver.getReader();
        for (; ; ) {
          const { done: S, value: q } = await I.read();
          if (S) break;
          const l = q;
          if (console.debug("channel event", _.substring(0, 8), l), l.type === "messageReceived") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            g.peers.set(l.from, v);
            const W = {
              id: Z(g),
              sender: l.from,
              content: l.text
            };
            g.messages.push(W);
            const _e = G(g, W);
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
            for (const W of g.peerSubscribers) W();
          } else if (l.type === "joined") {
            C.info(`joined channel ${_}`), g.neighbors += l.neighbors.length;
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
          const I = /* @__PURE__ */ new Date();
          for (const S of g.peers.values()) {
            if (S.id === u) {
              S.lastSeen = I;
              continue;
            }
            const q = (I.getTime() - S.lastSeen.getTime()) / 1e3;
            q > 20 ? S.status = "offline" : q > 10 ? S.status = "away" : S.status = "online";
          }
          await new Promise((S) => setTimeout(S, 1e3));
        }
      };
      return Promise.race([
        a,
        R(),
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
      const b = {
        sender: this.chatNode.node_id(),
        id: Z(_),
        content: t
      };
      _.messages.push(b);
      const a = G(_, b);
      for (const u of _.subscribers) u(a);
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
      return t.messages.map((o) => G(t, o));
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
  function Z_(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function G(e, n) {
    return {
      ...n,
      nickname: Z_(e, n.sender)
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
