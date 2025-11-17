var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-C-3v6Ecm.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-BG3uIwL2.wasm", import.meta.url).href, ce = async (e = {}, n) => {
    let _;
    if (n.startsWith("data:")) {
      const t = n.replace(/^data:.*?base64,/, "");
      let c;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") c = Buffer.from(t, "base64");
      else if (typeof atob == "function") {
        const i = atob(t);
        c = new Uint8Array(i.length);
        for (let a = 0; a < i.length; a++) c[a] = i.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(c, e);
    } else {
      const t = await fetch(n), c = t.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && c.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(t, e);
      else {
        const i = await t.arrayBuffer();
        _ = await WebAssembly.instantiate(i, e);
      }
    }
    return _.instance.exports;
  };
  let o;
  function oe(e) {
    o = e;
  }
  let W = null;
  function A() {
    return (W === null || W.byteLength === 0) && (W = new Uint8Array(o.memory.buffer)), W;
  }
  let $ = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  $.decode();
  const se = 2146435072;
  let G = 0;
  function be(e, n) {
    return G += n, G >= se && ($ = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), $.decode(), G = n), $.decode(A().subarray(e, e + n));
  }
  function w(e, n) {
    return e = e >>> 0, be(e, n);
  }
  let k = new Array(128).fill(void 0);
  k.push(void 0, null, true, false);
  let E = k.length;
  function s(e) {
    E === k.length && k.push(k.length + 1);
    const n = E;
    return E = k[n], k[n] = e, n;
  }
  function r(e) {
    return k[e];
  }
  let m = 0;
  const L = new TextEncoder();
  "encodeInto" in L || (L.encodeInto = function(e, n) {
    const _ = L.encode(e);
    return n.set(_), {
      read: e.length,
      written: _.length
    };
  });
  function p(e, n, _) {
    if (_ === void 0) {
      const d = L.encode(e), y = n(d.length, 1) >>> 0;
      return A().subarray(y, y + d.length).set(d), m = d.length, y;
    }
    let t = e.length, c = n(t, 1) >>> 0;
    const i = A();
    let a = 0;
    for (; a < t; a++) {
      const d = e.charCodeAt(a);
      if (d > 127) break;
      i[c + a] = d;
    }
    if (a !== t) {
      a !== 0 && (e = e.slice(a)), c = _(c, t, t = a + e.length * 3, 1) >>> 0;
      const d = A().subarray(c + a, c + t), y = L.encodeInto(e, d);
      a += y.written, c = _(c, t, a, 1) >>> 0;
    }
    return m = a, c;
  }
  let F = null;
  function f() {
    return (F === null || F.buffer.detached === true || F.buffer.detached === void 0 && F.buffer !== o.memory.buffer) && (F = new DataView(o.memory.buffer)), F;
  }
  function S(e) {
    return e == null;
  }
  function J(e) {
    const n = typeof e;
    if (n == "number" || n == "boolean" || e == null) return `${e}`;
    if (n == "string") return `"${e}"`;
    if (n == "symbol") {
      const c = e.description;
      return c == null ? "Symbol" : `Symbol(${c})`;
    }
    if (n == "function") {
      const c = e.name;
      return typeof c == "string" && c.length > 0 ? `Function(${c})` : "Function";
    }
    if (Array.isArray(e)) {
      const c = e.length;
      let i = "[";
      c > 0 && (i += J(e[0]));
      for (let a = 1; a < c; a++) i += ", " + J(e[a]);
      return i += "]", i;
    }
    const _ = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let t;
    if (_ && _.length > 1) t = _[1];
    else return toString.call(e);
    if (t == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : t;
  }
  function u(e, n) {
    try {
      return e.apply(this, n);
    } catch (_) {
      o.__wbindgen_export3(s(_));
    }
  }
  function ie(e) {
    e < 132 || (k[e] = E, E = e);
  }
  function h(e) {
    const n = r(e);
    return ie(e), n;
  }
  function N(e, n) {
    e = e >>> 0;
    const _ = f(), t = [];
    for (let c = e; c < e + 4 * n; c += 4) t.push(h(_.getUint32(c, true)));
    return t;
  }
  function j(e, n) {
    return e = e >>> 0, A().subarray(e / 1, e / 1 + n);
  }
  const D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
  function q(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, i = (...a) => {
      c.cnt++;
      const d = c.a;
      c.a = 0;
      try {
        return t(d, c.b, ...a);
      } finally {
        c.a = d, i._wbg_cb_unref();
      }
    };
    return i._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(i, c, c), i;
  }
  function ae(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, i = (...a) => {
      c.cnt++;
      try {
        return t(c.a, c.b, ...a);
      } finally {
        i._wbg_cb_unref();
      }
    };
    return i._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(i, c, c), i;
  }
  function fe(e, n) {
    o.__wasm_bindgen_func_elem_14909(e, n);
  }
  function ue(e, n, _) {
    o.__wasm_bindgen_func_elem_4280(e, n, s(_));
  }
  function de(e, n) {
    o.__wasm_bindgen_func_elem_7314(e, n);
  }
  function ge(e, n, _) {
    o.__wasm_bindgen_func_elem_14971(e, n, s(_));
  }
  function we(e, n, _) {
    o.__wasm_bindgen_func_elem_8120(e, n, s(_));
  }
  function le(e, n) {
    o.__wasm_bindgen_func_elem_8879(e, n);
  }
  function he(e, n, _, t) {
    o.__wasm_bindgen_func_elem_15100(e, n, s(_), s(t));
  }
  const me = [
    "blob",
    "arraybuffer"
  ], pe = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], ye = [
    "omit",
    "same-origin",
    "include"
  ], Se = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1));
  class O {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(O.prototype);
      return _.__wbg_ptr = n, X.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, X.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channel_free(n, 0);
    }
    id() {
      let n, _;
      try {
        const i = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(i, this.__wbg_ptr);
        var t = f().getInt32(i + 4 * 0, true), c = f().getInt32(i + 4 * 1, true);
        return n = t, _ = c, w(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return M.__wrap(n);
    }
    ticket(n) {
      let _, t;
      try {
        const I = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(I, this.__wbg_ptr, s(n));
        var c = f().getInt32(I + 4 * 0, true), i = f().getInt32(I + 4 * 1, true), a = f().getInt32(I + 4 * 2, true), d = f().getInt32(I + 4 * 3, true), y = c, g = i;
        if (d) throw y = 0, g = 0, h(a);
        return _ = y, t = g, w(y, g);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
    get receiver() {
      const n = o.channel_receiver(this.__wbg_ptr);
      return h(n);
    }
    neighbors() {
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(c, this.__wbg_ptr);
        var n = f().getInt32(c + 4 * 0, true), _ = f().getInt32(c + 4 * 1, true), t = N(n, _).slice();
        return o.__wbindgen_export4(n, _ * 4, 4), t;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  Symbol.dispose && (O.prototype[Symbol.dispose] = O.prototype.free);
  const Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(M.prototype);
      return _.__wbg_ptr = n, Y.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Y.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    set_nickame(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m;
      o.channelsender_set_nickame(this.__wbg_ptr, _, t);
    }
    broadcast(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m, c = o.channelsender_broadcast(this.__wbg_ptr, _, t);
      return h(c);
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  const K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class T {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(T.prototype);
      return _.__wbg_ptr = n, K.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, K.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_chatnode_free(n, 0);
    }
    endpoint_id() {
      let n, _;
      try {
        const i = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_endpoint_id(i, this.__wbg_ptr);
        var t = f().getInt32(i + 4 * 0, true), c = f().getInt32(i + 4 * 1, true);
        return n = t, _ = c, w(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    join(n, _) {
      const t = p(n, o.__wbindgen_export, o.__wbindgen_export2), c = m, i = p(_, o.__wbindgen_export, o.__wbindgen_export2), a = m, d = o.chatnode_join(this.__wbg_ptr, t, c, i, a);
      return h(d);
    }
    static spawn() {
      const n = o.chatnode_spawn();
      return h(n);
    }
    create(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m, c = o.chatnode_create(this.__wbg_ptr, _, t);
      return h(c);
    }
  }
  Symbol.dispose && (T.prototype[Symbol.dispose] = T.prototype.free);
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class B {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(B.prototype);
      return _.__wbg_ptr = n, Q.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Q.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_intounderlyingsource_free(n, 0);
    }
    pull(n) {
      const _ = o.intounderlyingsource_pull(this.__wbg_ptr, s(n));
      return h(_);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
  }
  Symbol.dispose && (B.prototype[Symbol.dispose] = B.prototype.free);
  function xe(e, n) {
    const _ = Error(w(e, n));
    return s(_);
  }
  function ve(e, n) {
    const _ = String(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ke(e) {
    const n = r(e), _ = typeof n == "boolean" ? n : void 0;
    return S(_) ? 16777215 : _ ? 1 : 0;
  }
  function Ie(e, n) {
    const _ = J(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function Re(e, n) {
    return r(e) in r(n);
  }
  function Fe(e) {
    return typeof r(e) == "function";
  }
  function Te(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function je(e) {
    return typeof r(e) == "string";
  }
  function Ce(e) {
    return r(e) === void 0;
  }
  function Ae(e, n) {
    return r(e) == r(n);
  }
  function Ee(e, n) {
    const _ = r(n), t = typeof _ == "number" ? _ : void 0;
    f().setFloat64(e + 8 * 1, S(t) ? 0 : t, true), f().setInt32(e + 4 * 0, !S(t), true);
  }
  function Le(e, n) {
    const _ = r(n), t = typeof _ == "string" ? _ : void 0;
    var c = S(t) ? 0 : p(t, o.__wbindgen_export, o.__wbindgen_export2), i = m;
    f().setInt32(e + 4 * 1, i, true), f().setInt32(e + 4 * 0, c, true);
  }
  function Oe(e, n) {
    throw new Error(w(e, n));
  }
  function Me(e) {
    r(e)._wbg_cb_unref();
  }
  function Be(e, n) {
    r(e).abort(r(n));
  }
  function Ne(e) {
    r(e).abort();
  }
  function qe() {
    return u(function(e, n, _, t) {
      r(e).addEventListener(w(n, _), r(t));
    }, arguments);
  }
  function Ue() {
    return u(function(e, n, _, t, c) {
      r(e).append(w(n, _), w(t, c));
    }, arguments);
  }
  function ze() {
    return u(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function We(e) {
    const n = r(e).body;
    return S(n) ? 0 : s(n);
  }
  function $e(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function De(e) {
    const n = r(e).byobRequest;
    return S(n) ? 0 : s(n);
  }
  function Pe(e) {
    return r(e).byteLength;
  }
  function Ve(e) {
    return r(e).byteOffset;
  }
  function Ge() {
    return u(function(e, n, _) {
      const t = r(e).call(r(n), r(_));
      return s(t);
    }, arguments);
  }
  function He() {
    return u(function(e, n) {
      const _ = r(e).call(r(n));
      return s(_);
    }, arguments);
  }
  function Je(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function Xe(e, n) {
    const _ = r(e).catch(r(n));
    return s(_);
  }
  function Ye(e) {
    const n = O.__wrap(e);
    return s(n);
  }
  function Ke(e) {
    const n = T.__wrap(e);
    return s(n);
  }
  function Qe(e) {
    const n = clearTimeout(h(e));
    return s(n);
  }
  function Ze() {
    return u(function(e, n) {
      r(e).clearTimeout(h(n));
    }, arguments);
  }
  function en() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function nn() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function _n() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function tn(e) {
    return r(e).code;
  }
  function rn(e) {
    return r(e).code;
  }
  function cn(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function on(e) {
    const n = r(e).data;
    return s(n);
  }
  function sn(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.debug(..._);
  }
  function bn(e) {
    return r(e).done;
  }
  function an() {
    return u(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function fn(e, n) {
    let _, t;
    try {
      _ = e, t = n, console.error(w(e, n));
    } finally {
      o.__wbindgen_export4(_, t, 1);
    }
  }
  function un(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.error(..._);
  }
  function dn(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function gn(e, n) {
    const _ = r(e).fetch(r(n));
    return s(_);
  }
  function wn() {
    return u(function(e, n) {
      globalThis.crypto.getRandomValues(j(e, n));
    }, arguments);
  }
  function ln() {
    return u(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function hn() {
    return u(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function mn(e) {
    const n = r(e).done;
    return S(n) ? 16777215 : n ? 1 : 0;
  }
  function pn() {
    return u(function(e, n) {
      const _ = Reflect.get(r(e), r(n));
      return s(_);
    }, arguments);
  }
  function yn(e) {
    const n = r(e).value;
    return s(n);
  }
  function Sn(e, n) {
    const _ = r(e)[r(n)];
    return s(_);
  }
  function xn() {
    return u(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function vn(e) {
    const n = r(e).headers;
    return s(n);
  }
  function kn(e) {
    let n;
    try {
      n = r(e) instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function In(e) {
    let n;
    try {
      n = r(e) instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function Rn(e) {
    let n;
    try {
      n = r(e) instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function Fn(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function Tn() {
    return s(Symbol.iterator);
  }
  function jn(e) {
    return r(e).length;
  }
  function Cn(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.log(..._);
  }
  function An(e, n) {
    const _ = r(n).message, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function En(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function Ln() {
    const e = new Object();
    return s(e);
  }
  function On() {
    return u(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function Mn(e, n) {
    try {
      var _ = {
        a: e,
        b: n
      }, t = (i, a) => {
        const d = _.a;
        _.a = 0;
        try {
          return he(d, _.b, i, a);
        } finally {
          _.a = d;
        }
      };
      const c = new Promise(t);
      return s(c);
    } finally {
      _.a = _.b = 0;
    }
  }
  function Bn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Nn() {
    return u(function(e, n) {
      const _ = new WebSocket(w(e, n));
      return s(_);
    }, arguments);
  }
  function qn() {
    const e = new Error();
    return s(e);
  }
  function Un() {
    return u(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function zn(e, n) {
    const _ = new Error(w(e, n));
    return s(_);
  }
  function Wn() {
    const e = new Array();
    return s(e);
  }
  function $n(e, n) {
    const _ = new Uint8Array(j(e, n));
    return s(_);
  }
  function Dn(e, n) {
    const _ = new Function(w(e, n));
    return s(_);
  }
  function Pn(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function Vn(e, n) {
    const _ = new ReadableStream(B.__wrap(e), h(n));
    return s(_);
  }
  function Gn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Hn() {
    return u(function(e, n, _) {
      const t = new Request(w(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function Jn() {
    return u(function(e, n, _) {
      const t = new WebSocket(w(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function Xn() {
    return u(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function Yn(e) {
    const n = r(e).next;
    return s(n);
  }
  function Kn(e) {
    const n = r(e).node;
    return s(n);
  }
  function Qn(e) {
    return r(e).now();
  }
  function Zn() {
    return Date.now();
  }
  function e_(e) {
    const n = r(e).performance;
    return s(n);
  }
  function n_(e) {
    const n = r(e).process;
    return s(n);
  }
  function __(e, n, _) {
    Uint8Array.prototype.set.call(j(e, n), r(_));
  }
  function t_(e, n) {
    return r(e).push(r(n));
  }
  function r_(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function c_(e) {
    queueMicrotask(r(e));
  }
  function o_() {
    return u(function(e, n) {
      r(e).randomFillSync(h(n));
    }, arguments);
  }
  function s_(e) {
    const n = r(e).read();
    return s(n);
  }
  function b_(e) {
    return r(e).readyState;
  }
  function i_(e, n) {
    const _ = r(n).reason, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function a_(e) {
    r(e).releaseLock();
  }
  function f_() {
    return u(function(e, n, _, t) {
      r(e).removeEventListener(w(n, _), r(t));
    }, arguments);
  }
  function u_() {
    return u(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function d_(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function g_() {
    return u(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function w_() {
    return u(function(e, n, _) {
      r(e).send(w(n, _));
    }, arguments);
  }
  function l_() {
    return u(function(e, n, _) {
      r(e).send(j(n, _));
    }, arguments);
  }
  function h_() {
    return u(function(e, n, _) {
      const t = r(e).setTimeout(h(n), _);
      return s(t);
    }, arguments);
  }
  function m_(e, n) {
    const _ = setTimeout(r(e), n);
    return s(_);
  }
  function p_(e, n, _) {
    r(e)[h(n)] = h(_);
  }
  function y_(e, n, _) {
    r(e).set(j(n, _));
  }
  function S_(e, n) {
    r(e).binaryType = me[n];
  }
  function x_(e, n) {
    r(e).body = r(n);
  }
  function v_(e, n, _) {
    r(e)[n >>> 0] = h(_);
  }
  function k_(e, n) {
    r(e).cache = pe[n];
  }
  function I_(e, n) {
    r(e).credentials = ye[n];
  }
  function R_(e, n) {
    r(e).handleEvent = r(n);
  }
  function F_(e, n) {
    r(e).headers = r(n);
  }
  function T_(e, n) {
    r(e).highWaterMark = n;
  }
  function j_(e, n, _) {
    r(e).method = w(n, _);
  }
  function C_(e, n) {
    r(e).mode = Se[n];
  }
  function A_(e, n) {
    r(e).onclose = r(n);
  }
  function E_(e, n) {
    r(e).onerror = r(n);
  }
  function L_(e, n) {
    r(e).onmessage = r(n);
  }
  function O_(e, n) {
    r(e).onopen = r(n);
  }
  function M_(e, n) {
    r(e).signal = r(n);
  }
  function B_(e) {
    const n = r(e).signal;
    return s(n);
  }
  function N_(e, n) {
    const _ = r(n).stack, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function q_() {
    const e = typeof global > "u" ? null : global;
    return S(e) ? 0 : s(e);
  }
  function U_() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return S(e) ? 0 : s(e);
  }
  function z_() {
    const e = typeof self > "u" ? null : self;
    return S(e) ? 0 : s(e);
  }
  function W_() {
    const e = typeof window > "u" ? null : window;
    return S(e) ? 0 : s(e);
  }
  function $_(e) {
    return r(e).status;
  }
  function D_() {
    return u(function(e) {
      const n = JSON.stringify(r(e));
      return s(n);
    }, arguments);
  }
  function P_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function V_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function G_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function H_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function J_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function X_(e) {
    const n = r(e).value;
    return s(n);
  }
  function Y_(e) {
    const n = r(e).versions;
    return s(n);
  }
  function K_(e) {
    const n = r(e).view;
    return S(n) ? 0 : s(n);
  }
  function Q_(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.warn(..._);
  }
  function Z_(e) {
    return r(e).wasClean;
  }
  function et(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_14955, ge);
    return s(_);
  }
  function nt(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_8075, we);
    return s(_);
  }
  function _t(e, n) {
    const _ = w(e, n);
    return s(_);
  }
  function tt(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_8869, le);
    return s(_);
  }
  function rt(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function ct(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_14891, fe);
    return s(_);
  }
  function ot(e, n) {
    const _ = ae(e, n, o.__wasm_bindgen_func_elem_7293, de);
    return s(_);
  }
  function st(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_3835, ue);
    return s(_);
  }
  function bt(e, n) {
    const _ = j(e, n);
    return s(_);
  }
  function it(e) {
    return s(e);
  }
  function at(e) {
    const n = r(e);
    return s(n);
  }
  function ft(e) {
    h(e);
  }
  URL = globalThis.URL;
  const b = await ce({
    "./chat_browser_bg.js": {
      __wbg_channel_new: Ye,
      __wbg_chatnode_new: Ke,
      __wbindgen_object_drop_ref: ft,
      __wbindgen_object_clone_ref: at,
      __wbg_get_with_ref_key_1dc361bd10053bfe: Sn,
      __wbg_set_3f1d0b984ed272ed: p_,
      __wbg_String_8f0eb39a4a4c2f66: ve,
      __wbg_new_8a6f238a6ece86ea: qn,
      __wbg_stack_0ed75d68575b0f3c: N_,
      __wbg_error_7534b8e9a36f1ab4: fn,
      __wbg_log_e51ef223c244b133: Cn,
      __wbg_warn_479b8bbb8337357b: Q_,
      __wbg_debug_55137df391ebfd29: sn,
      __wbg_error_91947ba14c44e1c9: un,
      __wbg_setTimeout_7bb3429662ab1e70: m_,
      __wbg_clearTimeout_7a42b49784aea641: Qe,
      __wbg_fetch_74a3e84ebd2c9a0e: dn,
      __wbg_getReader_48e00749fe3f6089: hn,
      __wbg_new_with_into_underlying_source_b47f6a6a596a7f24: Vn,
      __wbg_new_9edf9838a2def39c: Un,
      __wbg_append_b577eb3a177bc0fa: Ue,
      __wbg_new_with_str_and_init_0ae7728b6ec367b1: Hn,
      __wbg_instanceof_Response_f4f3e87e07f3135c: Rn,
      __wbg_arrayBuffer_b375eccb84b4ddf3: ze,
      __wbg_url_b36d2a5008eb056f: J_,
      __wbg_body_587542b2fd8e06c0: We,
      __wbg_status_de7eed5a7a5bfd5d: $_,
      __wbg_headers_b87d7eaba61c3278: vn,
      __wbg_set_onopen_efccb9305427b907: O_,
      __wbg_readyState_97984f126080aeda: b_,
      __wbg_set_onclose_c09e4f7422de8dae: A_,
      __wbg_set_onerror_337a3a2db9517378: E_,
      __wbg_send_171576d2f7487517: w_,
      __wbg_set_onmessage_8661558551a89792: L_,
      __wbg_set_binaryType_9d839cea8fcdc5c3: S_,
      __wbg_send_3d2cf376613294f0: l_,
      __wbg_new_with_str_sequence_57a88eb77393f23f: Jn,
      __wbg_new_881c4fe631eee9ad: Nn,
      __wbg_url_9bd0af1cd8643de7: H_,
      __wbg_close_885e277edf06b3fa: _n,
      __wbg_code_20d453b11b200026: tn,
      __wbg_reason_1cced37e3a93763e: i_,
      __wbg_wasClean_3d7c0cf05bd0a123: Z_,
      __wbg_addEventListener_40dc0fc428fc49e1: qe,
      __wbg_removeEventListener_924d9db66a4f775d: f_,
      __wbg_set_method_c02d8cbbe204ac2d: j_,
      __wbg_set_signal_dda2cf7ccb6bee0f: M_,
      __wbg_set_headers_6926da238cd32ee4: F_,
      __wbg_set_credentials_f621cd2d85c0c228: I_,
      __wbg_set_body_3c365989753d61f4: x_,
      __wbg_set_mode_52ef73cfa79639cb: C_,
      __wbg_set_cache_2f9deb19b92b81e3: k_,
      __wbg_code_218f5fdf8c7fcabd: rn,
      __wbg_message_bd42dbe3f2f3ed8e: An,
      __wbg_data_ee4306d069f24f2d: on,
      __wbg_set_handle_event_b2de49ad6c81e3c8: R_,
      __wbg_abort_28ad55c5825b004d: Be,
      __wbg_new_2531773dac38ebb3: On,
      __wbg_abort_e7eb059f72f9ed0c: Ne,
      __wbg_signal_4db5aa055bf9eb9a: B_,
      __wbg_set_high_water_mark_5142ac1d2fb46365: T_,
      __wbg_fetch_f8ba0e29a9d6de0d: gn,
      __wbg_get_done_a0463af43a1fc764: mn,
      __wbg_get_value_5ce96c9f81ce7398: yn,
      __wbg_respond_0f4dbf5386f5c73e: g_,
      __wbg_view_f6c15ac9fed63bbd: K_,
      __wbg_releaseLock_5d0b5a68887b891d: a_,
      __wbg_read_48f1593df542f968: s_,
      __wbg_cancel_48ab6f9dc366e369: Je,
      __wbg_byobRequest_2344e6975f27456e: De,
      __wbg_close_5a6caed3231b68cd: en,
      __wbg_enqueue_7b18a650aec77898: an,
      __wbg_close_6956df845478561a: nn,
      __wbg_instanceof_Blob_23b3322f66e5a83b: In,
      __wbg_crypto_574e78ad8b13b65f: cn,
      __wbg_process_dc0fbacc7c1c06f7: n_,
      __wbg_versions_c01dfd4722a88165: Y_,
      __wbg_node_905d3e251edff8a2: Kn,
      __wbg_require_60cc747a6bc5215a: u_,
      __wbg_msCrypto_a61aeb35a24c1329: En,
      __wbg_getRandomValues_b8f5dbd5f3995a9e: ln,
      __wbg_randomFillSync_ac0988aba3254290: o_,
      __wbg_setTimeout_282db1c50d4a7304: h_,
      __wbg_clearTimeout_cbe3107816206ed5: Ze,
      __wbg_queueMicrotask_9d76cacb20c84d58: c_,
      __wbg_queueMicrotask_34d692c25c47d05b: r_,
      __wbg_performance_7a3ffd0b17f663ad: e_,
      __wbg_now_2c95c9de01293173: Qn,
      __wbg_byteLength_bcd42e4025299788: Pe,
      __wbg_byteOffset_ca3a6cf7944b364b: Ve,
      __wbg_new_from_slice_92f4d78ca282a2d2: $n,
      __wbg_new_with_length_01aa0dc35aa13543: Gn,
      __wbg_new_with_byte_offset_and_length_46e3e6a5e9f9e89b: Pn,
      __wbg_new_5a79be3ab53b8aa5: Bn,
      __wbg_buffer_ccc4520b36d3ccf4: $e,
      __wbg_length_69bca3cb64fc8748: jn,
      __wbg_prototypesetcall_2a6620b6922694b2: __,
      __wbg_subarray_480600f3d6a9f26c: P_,
      __wbg_set_9e6516df7b7d0f19: y_,
      __wbg_done_2042aa2670fb1db1: bn,
      __wbg_value_692627309814bb8c: X_,
      __wbg_instanceof_Uint8Array_20c8e73002f7af98: Fn,
      __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: kn,
      __wbg_now_793306c526e2e3b6: Zn,
      __wbg_stringify_b5fb28f6465d9c3e: D_,
      __wbg_new_e17d9f43105b08be: Wn,
      __wbg_set_c213c871859d6500: v_,
      __wbg_push_df81a39d04db858c: t_,
      __wbg_new_a7442b4b19c1a356: zn,
      __wbg_new_1acc0b6eea89d040: Ln,
      __wbg_iterator_e5822695327a3c39: Tn,
      __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: U_,
      __wbg_static_accessor_SELF_6fdf4b64710cc91b: z_,
      __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: q_,
      __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: W_,
      __wbg_new_3c3d849046688a66: Mn,
      __wbg_then_4f46f6544e6b4a28: V_,
      __wbg_catch_943836faa5d29bfb: Xe,
      __wbg_then_70d05cf780a18d77: G_,
      __wbg_resolve_caf97c30b83f7053: d_,
      __wbg_get_efcb449f58ec27c2: pn,
      __wbg_has_787fafc980c3ccdb: xn,
      __wbg_new_no_args_ee98eee5275000a4: Dn,
      __wbg_call_e762c39fa8ea36bf: He,
      __wbg_call_525440f72fbfc0ea: Ge,
      __wbg_next_2c826fe5dfec6b6a: Yn,
      __wbg_next_020810e0ae8ebcb0: Xn,
      __wbg_getRandomValues_1c61fac11405ffdc: wn,
      __wbg___wbindgen_in_bb933bd9e1b3bc0f: Re,
      __wbg___wbindgen_throw_b855445ff6a94295: Oe,
      __wbg_Error_e83987f665cf5504: xe,
      __wbg___wbindgen_is_object_c818261d21f283a4: Te,
      __wbg___wbindgen_is_string_fbb76cb2940daafd: je,
      __wbg___wbindgen_number_get_a20bf9b85341449d: Ee,
      __wbg___wbindgen_string_get_e4f06c90489ad01b: Le,
      __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: ke,
      __wbg___wbindgen_is_function_ee8a6c5833c90377: Fe,
      __wbg___wbindgen_is_undefined_2d472862bd29a478: Ce,
      __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: Ae,
      __wbg__wbg_cb_unref_2454a539ea5790d9: Me,
      __wbg___wbindgen_debug_string_df47ffb5e35e6763: Ie,
      __wbindgen_cast_584f1ebc021277f2: ct,
      __wbindgen_cast_cb9088102bce6b30: bt,
      __wbindgen_cast_c83edf215778074b: st,
      __wbindgen_cast_6c2ac021e9680fb3: ot,
      __wbindgen_cast_114b45a4374ea6bb: et,
      __wbindgen_cast_171502f0a7d25293: nt,
      __wbindgen_cast_d6cd19b81560fd6e: it,
      __wbindgen_cast_2a715e1565e3e139: tt,
      __wbindgen_cast_2241b6af4c4b2941: _t,
      __wbindgen_cast_4625c577ab2ec9ee: rt
    }
  }, re), ut = b.memory, dt = b.__wbg_channel_free, gt = b.__wbg_channelsender_free, wt = b.__wbg_chatnode_free, lt = b.channel_id, ht = b.channel_neighbors, mt = b.channel_receiver, pt = b.channel_sender, yt = b.channel_ticket, St = b.channelsender_broadcast, xt = b.channelsender_set_nickame, vt = b.chatnode_create, kt = b.chatnode_endpoint_id, It = b.chatnode_join, Rt = b.chatnode_spawn, Ft = b.start, Tt = b.__wbg_intounderlyingbytesource_free, jt = b.__wbg_intounderlyingsink_free, Ct = b.__wbg_intounderlyingsource_free, At = b.intounderlyingbytesource_autoAllocateChunkSize, Et = b.intounderlyingbytesource_cancel, Lt = b.intounderlyingbytesource_pull, Ot = b.intounderlyingbytesource_start, Mt = b.intounderlyingbytesource_type, Bt = b.intounderlyingsink_abort, Nt = b.intounderlyingsink_close, qt = b.intounderlyingsink_write, Ut = b.intounderlyingsource_cancel, zt = b.intounderlyingsource_pull, Wt = b.ring_core_0_17_14__bn_mul_mont, $t = b.__wasm_bindgen_func_elem_14909, Dt = b.__wasm_bindgen_func_elem_14891, Pt = b.__wasm_bindgen_func_elem_4280, Vt = b.__wasm_bindgen_func_elem_3835, Gt = b.__wasm_bindgen_func_elem_7314, Ht = b.__wasm_bindgen_func_elem_7293, Jt = b.__wasm_bindgen_func_elem_14971, Xt = b.__wasm_bindgen_func_elem_14955, Yt = b.__wasm_bindgen_func_elem_8120, Kt = b.__wasm_bindgen_func_elem_8075, Qt = b.__wasm_bindgen_func_elem_8879, Zt = b.__wasm_bindgen_func_elem_8869, er = b.__wasm_bindgen_func_elem_15100, nr = b.__wbindgen_export, _r = b.__wbindgen_export2, tr = b.__wbindgen_export3, rr = b.__wbindgen_export4, cr = b.__wbindgen_add_to_stack_pointer, ee = b.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_14891: Dt,
    __wasm_bindgen_func_elem_14909: $t,
    __wasm_bindgen_func_elem_14955: Xt,
    __wasm_bindgen_func_elem_14971: Jt,
    __wasm_bindgen_func_elem_15100: er,
    __wasm_bindgen_func_elem_3835: Vt,
    __wasm_bindgen_func_elem_4280: Pt,
    __wasm_bindgen_func_elem_7293: Ht,
    __wasm_bindgen_func_elem_7314: Gt,
    __wasm_bindgen_func_elem_8075: Kt,
    __wasm_bindgen_func_elem_8120: Yt,
    __wasm_bindgen_func_elem_8869: Zt,
    __wasm_bindgen_func_elem_8879: Qt,
    __wbg_channel_free: dt,
    __wbg_channelsender_free: gt,
    __wbg_chatnode_free: wt,
    __wbg_intounderlyingbytesource_free: Tt,
    __wbg_intounderlyingsink_free: jt,
    __wbg_intounderlyingsource_free: Ct,
    __wbindgen_add_to_stack_pointer: cr,
    __wbindgen_export: nr,
    __wbindgen_export2: _r,
    __wbindgen_export3: tr,
    __wbindgen_export4: rr,
    __wbindgen_start: ee,
    channel_id: lt,
    channel_neighbors: ht,
    channel_receiver: mt,
    channel_sender: pt,
    channel_ticket: yt,
    channelsender_broadcast: St,
    channelsender_set_nickame: xt,
    chatnode_create: vt,
    chatnode_endpoint_id: kt,
    chatnode_join: It,
    chatnode_spawn: Rt,
    intounderlyingbytesource_autoAllocateChunkSize: At,
    intounderlyingbytesource_cancel: Et,
    intounderlyingbytesource_pull: Lt,
    intounderlyingbytesource_start: Ot,
    intounderlyingbytesource_type: Mt,
    intounderlyingsink_abort: Bt,
    intounderlyingsink_close: Nt,
    intounderlyingsink_write: qt,
    intounderlyingsource_cancel: Ut,
    intounderlyingsource_pull: zt,
    memory: ut,
    ring_core_0_17_14__bn_mul_mont: Wt,
    start: Ft
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  oe(or);
  ee();
  ne = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      C.info("Spawning iroh node");
      const n = await T.spawn();
      return C.info(`Iroh node spawned. our endpoint id: ${n.endpoint_id()}`), new ne(n);
    }
    async createChannel(n) {
      const _ = await this.chatNode.create(n);
      return this.joinInner(_, n);
    }
    async joinChannel(n, _) {
      const t = await this.chatNode.join(n, _);
      return this.joinInner(t, _);
    }
    joinInner(n, _) {
      const t = n.id();
      C.info(`joining channel ${t}`);
      const c = t.substring(5, 13);
      let i, a = new Promise((R) => {
        i = R;
      });
      const d = this.chatNode.endpoint_id(), y = {
        id: d,
        name: _,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: V.Myself
      }, g = {
        label: c,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: y,
        onClose: i
      };
      g.peers.set(d, y), this.channels.set(t, g);
      const I = async () => {
        const R = n.receiver.getReader();
        for (; ; ) {
          const { done: x, value: U } = await R.read();
          if (x) break;
          const l = U;
          if (console.debug("channel event", t.substring(0, 8), l), l.type === "messageReceived") {
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
            const te = H(g, z);
            for (const P of g.subscribers) P(te);
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
            C.info(`joined channel ${t}`), g.neighbors += l.neighbors.length;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          } else if (l.type === "neighborUp") {
            g.neighbors += 1;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          } else if (l.type === "neighborDown") {
            g.neighbors -= 1;
            for (const v of g.neighborSubscribers) v(g.neighbors);
          }
        }
      }, _e = async () => {
        for (; ; ) {
          const R = /* @__PURE__ */ new Date();
          for (const x of g.peers.values()) {
            if (x.id === d) {
              x.lastSeen = R;
              continue;
            }
            const U = (R.getTime() - x.lastSeen.getTime()) / 1e3;
            U > 20 ? x.status = "offline" : U > 10 ? x.status = "away" : x.status = "online";
          }
          await new Promise((x) => setTimeout(x, 1e3));
        }
      };
      return Promise.race([
        a,
        I(),
        _e()
      ]), {
        id: t,
        name: c
      };
    }
    getMyself(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return {
        ..._.myself
      };
    }
    getTicket(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.channel.ticket(_);
    }
    async closeChannel(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      _.onClose(), this.channels.delete(n);
    }
    async sendMessage(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      await t.channel.sender.broadcast(_);
      const i = {
        sender: this.chatNode.endpoint_id(),
        id: Z(t),
        content: _
      };
      t.messages.push(i);
      const a = H(t, i);
      for (const d of t.subscribers) d(a);
    }
    setNickname(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      console.log("state", t), C.info(`changing nickname from ${t.myself.name} to ${_}`), t.myself.name = _, t.channel.sender.set_nickame(_);
      for (const c of t.peerSubscribers) c();
    }
    getMessages(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.messages.map((c) => H(_, c));
    }
    getPeers(n) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return Array.from(_.peers.values());
    }
    subscribeToMessages(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.subscribers.push(_), () => {
        t.subscribers = t.subscribers.filter((c) => c != _);
      };
    }
    subscribeToNeighbors(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return _(t.neighbors), t.neighborSubscribers.push(_), () => {
        t.neighborSubscribers = t.neighborSubscribers.filter((c) => c != _);
      };
    }
    subscribeToPeers(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.peerSubscribers.push(_), () => {
        t.peerSubscribers = t.peerSubscribers.filter((c) => c != _);
      };
    }
  };
  function sr(e, n) {
    const _ = e.peers.get(n);
    return _ && _.name ? _.name : n.substring(0, 8);
  }
  function H(e, n) {
    return {
      ...n,
      nickname: sr(e, n.sender)
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
