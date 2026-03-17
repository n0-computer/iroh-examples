var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as A, P as V, __tla as __tla_0 } from "./index-BnjlZe3z.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-CVX2x-i-.wasm", import.meta.url).href, ce = async (e = {}, n) => {
    let _;
    if (n.startsWith("data:")) {
      const t = n.replace(/^data:.*?base64,/, "");
      let c;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") c = Buffer.from(t, "base64");
      else if (typeof atob == "function") {
        const a = atob(t);
        c = new Uint8Array(a.length);
        for (let b = 0; b < a.length; b++) c[b] = a.charCodeAt(b);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(c, e);
    } else {
      const t = await fetch(n), c = t.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && c.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(t, e);
      else {
        const a = await t.arrayBuffer();
        _ = await WebAssembly.instantiate(a, e);
      }
    }
    return _.instance.exports;
  };
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(M.prototype);
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
        const a = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(a, this.__wbg_ptr);
        var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
        return n = t, _ = c, m(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    neighbors() {
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(c, this.__wbg_ptr);
        var n = f().getInt32(c + 4 * 0, true), _ = f().getInt32(c + 4 * 1, true), t = B(n, _).slice();
        return o.__wbindgen_export4(n, _ * 4, 4), t;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get receiver() {
      const n = o.channel_receiver(this.__wbg_ptr);
      return w(n);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return N.__wrap(n);
    }
    ticket(n) {
      let _, t;
      try {
        const I = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(I, this.__wbg_ptr, s(n));
        var c = f().getInt32(I + 4 * 0, true), a = f().getInt32(I + 4 * 1, true), b = f().getInt32(I + 4 * 2, true), d = f().getInt32(I + 4 * 3, true), y = c, g = a;
        if (d) throw y = 0, g = 0, w(b);
        return _ = y, t = g, m(y, g);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  class N {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(N.prototype);
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
    broadcast(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = h, c = o.channelsender_broadcast(this.__wbg_ptr, _, t);
      return w(c);
    }
    set_nickame(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = h;
      o.channelsender_set_nickame(this.__wbg_ptr, _, t);
    }
  }
  Symbol.dispose && (N.prototype[Symbol.dispose] = N.prototype.free);
  class F {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(F.prototype);
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
    create(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = h, c = o.chatnode_create(this.__wbg_ptr, _, t);
      return w(c);
    }
    endpoint_id() {
      let n, _;
      try {
        const a = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_endpoint_id(a, this.__wbg_ptr);
        var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
        return n = t, _ = c, m(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    join(n, _) {
      const t = p(n, o.__wbindgen_export, o.__wbindgen_export2), c = h, a = p(_, o.__wbindgen_export, o.__wbindgen_export2), b = h, d = o.chatnode_join(this.__wbg_ptr, t, c, a, b);
      return w(d);
    }
    static spawn() {
      const n = o.chatnode_spawn();
      return w(n);
    }
  }
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  class q {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(q.prototype);
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
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
    pull(n) {
      const _ = o.intounderlyingsource_pull(this.__wbg_ptr, s(n));
      return w(_);
    }
  }
  Symbol.dispose && (q.prototype[Symbol.dispose] = q.prototype.free);
  function oe(e, n) {
    const _ = Error(m(e, n));
    return s(_);
  }
  function se(e, n) {
    const _ = String(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ie(e) {
    const n = r(e), _ = typeof n == "boolean" ? n : void 0;
    return S(_) ? 16777215 : _ ? 1 : 0;
  }
  function ae(e, n) {
    const _ = J(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function be(e, n) {
    return r(e) in r(n);
  }
  function fe(e) {
    return typeof r(e) == "function";
  }
  function ue(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function de(e) {
    return typeof r(e) == "string";
  }
  function ge(e) {
    return r(e) === void 0;
  }
  function we(e, n) {
    return r(e) == r(n);
  }
  function le(e, n) {
    const _ = r(n), t = typeof _ == "number" ? _ : void 0;
    f().setFloat64(e + 8 * 1, S(t) ? 0 : t, true), f().setInt32(e + 4 * 0, !S(t), true);
  }
  function me(e, n) {
    const _ = r(n), t = typeof _ == "string" ? _ : void 0;
    var c = S(t) ? 0 : p(t, o.__wbindgen_export, o.__wbindgen_export2), a = h;
    f().setInt32(e + 4 * 1, a, true), f().setInt32(e + 4 * 0, c, true);
  }
  function he(e, n) {
    throw new Error(m(e, n));
  }
  function pe(e) {
    r(e)._wbg_cb_unref();
  }
  function ye(e) {
    r(e).abort();
  }
  function Se(e, n) {
    r(e).abort(r(n));
  }
  function xe() {
    return u(function(e, n, _, t) {
      r(e).addEventListener(m(n, _), r(t));
    }, arguments);
  }
  function ve() {
    return u(function(e, n, _, t, c) {
      r(e).append(m(n, _), m(t, c));
    }, arguments);
  }
  function ke() {
    return u(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function Ie(e) {
    const n = r(e).body;
    return S(n) ? 0 : s(n);
  }
  function Re(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Te(e) {
    const n = r(e).byobRequest;
    return S(n) ? 0 : s(n);
  }
  function je(e) {
    return r(e).byteLength;
  }
  function Fe(e) {
    return r(e).byteOffset;
  }
  function Ce() {
    return u(function(e, n, _) {
      const t = r(e).call(r(n), r(_));
      return s(t);
    }, arguments);
  }
  function Ae() {
    return u(function(e, n) {
      const _ = r(e).call(r(n));
      return s(_);
    }, arguments);
  }
  function Ee(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function Oe(e, n) {
    const _ = r(e).catch(r(n));
    return s(_);
  }
  function Le(e) {
    const n = M.__wrap(e);
    return s(n);
  }
  function Me(e) {
    const n = F.__wrap(e);
    return s(n);
  }
  function Ne() {
    return u(function(e, n) {
      r(e).clearTimeout(w(n));
    }, arguments);
  }
  function qe(e) {
    const n = clearTimeout(w(e));
    return s(n);
  }
  function Be() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ue() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function $e() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function ze(e) {
    return r(e).code;
  }
  function We(e) {
    return r(e).code;
  }
  function De(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function Pe(e) {
    const n = r(e).data;
    return s(n);
  }
  function Ve(e, n) {
    var _ = B(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.debug(..._);
  }
  function Ge(e) {
    return r(e).done;
  }
  function He() {
    return u(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function Je(e, n) {
    var _ = B(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.error(..._);
  }
  function Xe(e, n) {
    let _, t;
    try {
      _ = e, t = n, console.error(m(e, n));
    } finally {
      o.__wbindgen_export4(_, t, 1);
    }
  }
  function Ye(e, n) {
    const _ = r(e).fetch(r(n));
    return s(_);
  }
  function Ke(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function Qe() {
    return u(function(e, n) {
      globalThis.crypto.getRandomValues(C(e, n));
    }, arguments);
  }
  function Ze() {
    return u(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function en() {
    return u(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function nn() {
    return u(function(e, n) {
      const _ = Reflect.get(r(e), r(n));
      return s(_);
    }, arguments);
  }
  function _n() {
    return u(function(e, n) {
      const _ = Reflect.get(r(e), r(n));
      return s(_);
    }, arguments);
  }
  function tn(e) {
    const n = r(e).done;
    return S(n) ? 16777215 : n ? 1 : 0;
  }
  function rn(e) {
    const n = r(e).value;
    return s(n);
  }
  function cn(e, n) {
    const _ = r(e)[r(n)];
    return s(_);
  }
  function on() {
    return u(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function sn(e) {
    const n = r(e).headers;
    return s(n);
  }
  function an(e) {
    let n;
    try {
      n = r(e) instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function bn(e) {
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
  function un(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function dn() {
    return s(Symbol.iterator);
  }
  function gn(e) {
    return r(e).length;
  }
  function wn(e, n) {
    var _ = B(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.log(..._);
  }
  function ln(e, n) {
    const _ = r(n).message, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function mn(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function hn() {
    return u(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function pn() {
    const e = new Error();
    return s(e);
  }
  function yn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Sn() {
    const e = new Array();
    return s(e);
  }
  function xn() {
    const e = new Object();
    return s(e);
  }
  function vn() {
    return u(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function kn(e, n) {
    const _ = new Error(m(e, n));
    return s(_);
  }
  function In() {
    return u(function(e, n) {
      const _ = new WebSocket(m(e, n));
      return s(_);
    }, arguments);
  }
  function Rn(e, n) {
    const _ = new Uint8Array(C(e, n));
    return s(_);
  }
  function Tn(e, n) {
    try {
      var _ = {
        a: e,
        b: n
      }, t = (a, b) => {
        const d = _.a;
        _.a = 0;
        try {
          return ot(d, _.b, a, b);
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
  function jn(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function Fn(e, n) {
    const _ = new ReadableStream(q.__wrap(e), w(n));
    return s(_);
  }
  function Cn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function An() {
    return u(function(e, n, _) {
      const t = new Request(m(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function En() {
    return u(function(e, n, _) {
      const t = new WebSocket(m(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function On() {
    return u(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function Ln(e) {
    const n = r(e).next;
    return s(n);
  }
  function Mn(e) {
    const n = r(e).node;
    return s(n);
  }
  function Nn() {
    return Date.now();
  }
  function qn(e) {
    return r(e).now();
  }
  function Bn(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Un(e) {
    const n = r(e).process;
    return s(n);
  }
  function $n(e, n, _) {
    Uint8Array.prototype.set.call(C(e, n), r(_));
  }
  function zn(e, n) {
    return r(e).push(r(n));
  }
  function Wn(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function Dn(e) {
    queueMicrotask(r(e));
  }
  function Pn() {
    return u(function(e, n) {
      r(e).randomFillSync(w(n));
    }, arguments);
  }
  function Vn(e) {
    const n = r(e).read();
    return s(n);
  }
  function Gn(e) {
    return r(e).readyState;
  }
  function Hn(e, n) {
    const _ = r(n).reason, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function Jn(e) {
    r(e).releaseLock();
  }
  function Xn() {
    return u(function(e, n, _, t) {
      r(e).removeEventListener(m(n, _), r(t));
    }, arguments);
  }
  function Yn() {
    return u(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function Kn(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function Qn() {
    return u(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function Zn() {
    return u(function(e, n, _) {
      r(e).send(m(n, _));
    }, arguments);
  }
  function e_() {
    return u(function(e, n, _) {
      r(e).send(C(n, _));
    }, arguments);
  }
  function n_() {
    return u(function(e, n, _) {
      const t = r(e).setTimeout(w(n), _);
      return s(t);
    }, arguments);
  }
  function __(e, n) {
    const _ = setTimeout(r(e), n);
    return s(_);
  }
  function t_(e, n, _) {
    r(e)[n >>> 0] = w(_);
  }
  function r_(e, n, _) {
    r(e)[w(n)] = w(_);
  }
  function c_(e, n, _) {
    r(e).set(C(n, _));
  }
  function o_(e, n) {
    r(e).binaryType = st[n];
  }
  function s_(e, n) {
    r(e).body = r(n);
  }
  function i_(e, n) {
    r(e).cache = it[n];
  }
  function a_(e, n) {
    r(e).credentials = at[n];
  }
  function b_(e, n) {
    r(e).handleEvent = r(n);
  }
  function f_(e, n) {
    r(e).headers = r(n);
  }
  function u_(e, n) {
    r(e).highWaterMark = n;
  }
  function d_(e, n, _) {
    r(e).method = m(n, _);
  }
  function g_(e, n) {
    r(e).mode = bt[n];
  }
  function w_(e, n) {
    r(e).onclose = r(n);
  }
  function l_(e, n) {
    r(e).onerror = r(n);
  }
  function m_(e, n) {
    r(e).onmessage = r(n);
  }
  function h_(e, n) {
    r(e).onopen = r(n);
  }
  function p_(e, n) {
    r(e).signal = r(n);
  }
  function y_(e) {
    const n = r(e).signal;
    return s(n);
  }
  function S_(e, n) {
    const _ = r(n).stack, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function x_() {
    const e = typeof global > "u" ? null : global;
    return S(e) ? 0 : s(e);
  }
  function v_() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return S(e) ? 0 : s(e);
  }
  function k_() {
    const e = typeof self > "u" ? null : self;
    return S(e) ? 0 : s(e);
  }
  function I_() {
    const e = typeof window > "u" ? null : window;
    return S(e) ? 0 : s(e);
  }
  function R_(e) {
    return r(e).status;
  }
  function T_() {
    return u(function(e) {
      const n = JSON.stringify(r(e));
      return s(n);
    }, arguments);
  }
  function j_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function F_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function C_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function A_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function E_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = h;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function O_(e) {
    const n = r(e).value;
    return s(n);
  }
  function L_(e) {
    const n = r(e).versions;
    return s(n);
  }
  function M_(e) {
    const n = r(e).view;
    return S(n) ? 0 : s(n);
  }
  function N_(e, n) {
    var _ = B(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.warn(..._);
  }
  function q_(e) {
    return r(e).wasClean;
  }
  function B_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_7558, Q_);
    return s(_);
  }
  function U_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_7709, _t);
    return s(_);
  }
  function $_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_8076, Z_);
    return s(_);
  }
  function z_(e, n) {
    const _ = ut(e, n, o.__wasm_bindgen_func_elem_8111, et);
    return s(_);
  }
  function W_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_8967, tt);
    return s(_);
  }
  function D_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_16781, nt);
    return s(_);
  }
  function P_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_16845, ct);
    return s(_);
  }
  function V_(e, n) {
    const _ = R(e, n, o.__wasm_bindgen_func_elem_3937, rt);
    return s(_);
  }
  function G_(e) {
    return s(e);
  }
  function H_(e, n) {
    const _ = C(e, n);
    return s(_);
  }
  function J_(e, n) {
    const _ = m(e, n);
    return s(_);
  }
  function X_(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function Y_(e) {
    const n = r(e);
    return s(n);
  }
  function K_(e) {
    w(e);
  }
  function Q_(e, n) {
    o.__wasm_bindgen_func_elem_7567(e, n);
  }
  function Z_(e, n) {
    o.__wasm_bindgen_func_elem_8082(e, n);
  }
  function et(e, n) {
    o.__wasm_bindgen_func_elem_8130(e, n);
  }
  function nt(e, n) {
    o.__wasm_bindgen_func_elem_16798(e, n);
  }
  function _t(e, n, _) {
    o.__wasm_bindgen_func_elem_7784(e, n, s(_));
  }
  function tt(e, n, _) {
    o.__wasm_bindgen_func_elem_9012(e, n, s(_));
  }
  function rt(e, n, _) {
    o.__wasm_bindgen_func_elem_4384(e, n, s(_));
  }
  function ct(e, n, _) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wasm_bindgen_func_elem_16974(a, e, n, s(_));
      var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
      if (c) throw w(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ot(e, n, _, t) {
    o.__wasm_bindgen_func_elem_16990(e, n, s(_), s(t));
  }
  const st = [
    "blob",
    "arraybuffer"
  ], it = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], at = [
    "omit",
    "same-origin",
    "include"
  ], bt = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1)), Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1)), K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  function s(e) {
    O === k.length && k.push(k.length + 1);
    const n = O;
    return O = k[n], k[n] = e, n;
  }
  const D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
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
      let a = "[";
      c > 0 && (a += J(e[0]));
      for (let b = 1; b < c; b++) a += ", " + J(e[b]);
      return a += "]", a;
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
  function ft(e) {
    e < 1028 || (k[e] = O, O = e);
  }
  function B(e, n) {
    e = e >>> 0;
    const _ = f(), t = [];
    for (let c = e; c < e + 4 * n; c += 4) t.push(w(_.getUint32(c, true)));
    return t;
  }
  function C(e, n) {
    return e = e >>> 0, E().subarray(e / 1, e / 1 + n);
  }
  let j = null;
  function f() {
    return (j === null || j.buffer.detached === true || j.buffer.detached === void 0 && j.buffer !== o.memory.buffer) && (j = new DataView(o.memory.buffer)), j;
  }
  function m(e, n) {
    return e = e >>> 0, gt(e, n);
  }
  let z = null;
  function E() {
    return (z === null || z.byteLength === 0) && (z = new Uint8Array(o.memory.buffer)), z;
  }
  function r(e) {
    return k[e];
  }
  function u(e, n) {
    try {
      return e.apply(this, n);
    } catch (_) {
      o.__wbindgen_export3(s(_));
    }
  }
  let k = new Array(1024).fill(void 0);
  k.push(void 0, null, true, false);
  let O = k.length;
  function S(e) {
    return e == null;
  }
  function ut(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, a = (...b) => {
      c.cnt++;
      try {
        return t(c.a, c.b, ...b);
      } finally {
        a._wbg_cb_unref();
      }
    };
    return a._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(a, c, c), a;
  }
  function R(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, a = (...b) => {
      c.cnt++;
      const d = c.a;
      c.a = 0;
      try {
        return t(d, c.b, ...b);
      } finally {
        c.a = d, a._wbg_cb_unref();
      }
    };
    return a._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(a, c, c), a;
  }
  function p(e, n, _) {
    if (_ === void 0) {
      const d = L.encode(e), y = n(d.length, 1) >>> 0;
      return E().subarray(y, y + d.length).set(d), h = d.length, y;
    }
    let t = e.length, c = n(t, 1) >>> 0;
    const a = E();
    let b = 0;
    for (; b < t; b++) {
      const d = e.charCodeAt(b);
      if (d > 127) break;
      a[c + b] = d;
    }
    if (b !== t) {
      b !== 0 && (e = e.slice(b)), c = _(c, t, t = b + e.length * 3, 1) >>> 0;
      const d = E().subarray(c + b, c + t), y = L.encodeInto(e, d);
      b += y.written, c = _(c, t, b, 1) >>> 0;
    }
    return h = b, c;
  }
  function w(e) {
    const n = r(e);
    return ft(e), n;
  }
  let W = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  W.decode();
  const dt = 2146435072;
  let G = 0;
  function gt(e, n) {
    return G += n, G >= dt && (W = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), W.decode(), G = n), W.decode(E().subarray(e, e + n));
  }
  const L = new TextEncoder();
  "encodeInto" in L || (L.encodeInto = function(e, n) {
    const _ = L.encode(e);
    return n.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let h = 0, o;
  function wt(e) {
    o = e;
  }
  URL = globalThis.URL;
  const i = await ce({
    "./chat_browser_bg.js": {
      __wbg_channel_new: Le,
      __wbg_chatnode_new: Me,
      __wbindgen_object_clone_ref: Y_,
      __wbindgen_object_drop_ref: K_,
      __wbg_set_282384002438957f: t_,
      __wbg_get_with_ref_key_6412cf3094599694: cn,
      __wbg_set_6be42768c690e380: r_,
      __wbg_String_8564e559799eccda: se,
      __wbg_new_227d7c05414eb861: pn,
      __wbg_stack_3b0d974bbf31e44f: S_,
      __wbg_error_a6fa202b58aa1cd3: Xe,
      __wbg_log_7a0760e115750083: wn,
      __wbg_warn_3a37cdd7216f1479: N_,
      __wbg_debug_eaef3b49d572d680: Ve,
      __wbg_error_71b0e71161a5f3a0: Je,
      __wbg_push_e87b0e732085a946: zn,
      __wbg_next_11b99ee6237339e3: On,
      __wbg_done_08ce71ee07e3bd17: Ge,
      __wbg_value_21fc78aab0322612: O_,
      __wbg_setTimeout_f757f00851f76c42: __,
      __wbg_clearTimeout_6b8d9a38b9263d65: qe,
      __wbg_fetch_9dad4fe911207b37: Ke,
      __wbg_getReader_b4b1868fbca77dbe: en,
      __wbg_new_with_into_underlying_source_b45133df5ff75afa: Fn,
      __wbg_then_9e335f6dd892bc11: C_,
      __wbg_catch_d7ed0375ab6532a5: Oe,
      __wbg_new_typed_aaaeaf29cf802876: Tn,
      __wbg_call_2d781c1f4d5c0ef8: Ce,
      __wbg_new_0837727332ac86ba: hn,
      __wbg_append_608dfb635ee8998f: ve,
      __wbg_new_with_str_and_init_b4b54d1a819bc724: An,
      __wbg_instanceof_Response_9b4d9fd451e051b1: fn,
      __wbg_arrayBuffer_eb8e9ca620af2a19: ke,
      __wbg_url_7fefc1820fba4e0c: E_,
      __wbg_body_ac1dad652946e6da: Ie,
      __wbg_status_318629ab93a22955: R_,
      __wbg_headers_eb2234545f9ff993: sn,
      __wbg_set_onopen_34e3e24cf9337ddd: h_,
      __wbg_readyState_1f1e7f1bdf9f4d42: Gn,
      __wbg_set_onclose_8da801226bdd7a7b: w_,
      __wbg_set_onerror_901ca711f94a5bbb: l_,
      __wbg_send_4a1dc66e8653e5ed: Zn,
      __wbg_set_onmessage_6f80ab771bf151aa: m_,
      __wbg_set_binaryType_3dcf8281ec100a8f: o_,
      __wbg_send_d31a693c975dea74: e_,
      __wbg_new_with_str_sequence_82c04ad794ead10e: En,
      __wbg_new_dd50bcc3f60ba434: In,
      __wbg_url_778f9516ea867e17: A_,
      __wbg_close_af26905c832a88cb: $e,
      __wbg_code_aea376e2d265a64f: ze,
      __wbg_reason_cbcb9911796c4714: Hn,
      __wbg_wasClean_69f68dc4ed2d2cc7: q_,
      __wbg_addEventListener_3f4b57aea6662d2e: xe,
      __wbg_removeEventListener_c15bc311b6a5d11f: Xn,
      __wbg_set_method_8c015e8bcafd7be1: d_,
      __wbg_set_signal_0cebecb698f25d21: p_,
      __wbg_set_headers_3c8fecc693b75327: f_,
      __wbg_set_credentials_ed63183445882c65: a_,
      __wbg_set_body_a3d856b097dfda04: s_,
      __wbg_set_mode_5a87f2c809cf37c2: g_,
      __wbg_set_cache_ec7e430c6056ebda: i_,
      __wbg_code_bc4dde4d67926010: We,
      __wbg_message_e959edc81e4b6cb7: ln,
      __wbg_data_a3d9ff9cdd801002: Pe,
      __wbg_set_handle_event_d54649fda219fb74: b_,
      __wbg_abort_6479c2d794ebf2ee: Se,
      __wbg_new_c518c60af666645b: vn,
      __wbg_abort_5ef96933660780b7: ye,
      __wbg_signal_166e1da31adcac18: y_,
      __wbg_set_high_water_mark_1ac059fa0566c2fc: u_,
      __wbg_fetch_5550a88cf343aaa9: Ye,
      __wbg_get_done_d0ab690f8df5501f: tn,
      __wbg_get_value_548ae6adf5a174e4: rn,
      __wbg_respond_e286ee502e7cf7e4: Qn,
      __wbg_view_f68a712e7315f8b2: M_,
      __wbg_releaseLock_ef7766a5da654ff8: Jn,
      __wbg_read_7f593a961a7f80ed: Vn,
      __wbg_cancel_79b3bea07a1028e7: Ee,
      __wbg_byobRequest_6342e5f2b232c0f9: Te,
      __wbg_close_737b4b1fbc658540: Ue,
      __wbg_enqueue_ec3552838b4b7fbf: He,
      __wbg_close_690d36108c557337: Be,
      __wbg_instanceof_Blob_c91af000f11c2d0b: bn,
      __wbg_crypto_38df2bab126b63dc: De,
      __wbg_process_44c7a14e11e9f69e: Un,
      __wbg_versions_276b2795b1c6a219: L_,
      __wbg_node_84ea875411254db1: Mn,
      __wbg_require_b4edbdcf3e2a1ef0: Yn,
      __wbg_msCrypto_bd5a034af96bcba6: mn,
      __wbg_getRandomValues_c44a50d8cfdaebeb: Ze,
      __wbg_randomFillSync_6c25eac9869eb53c: Pn,
      __wbg_setTimeout_6613a51400c1bf9f: n_,
      __wbg_clearTimeout_47a40e3be01ed7a3: Ne,
      __wbg_queueMicrotask_a082d78ce798393e: Dn,
      __wbg_queueMicrotask_0c399741342fb10f: Wn,
      __wbg_then_098abe61755d12f6: F_,
      __wbg_resolve_ae8d83246e5bcc12: Kn,
      __wbg_performance_3fcf6e32a7e1ed0a: Bn,
      __wbg_now_e7c6795a7f81e10f: qn,
      __wbg_byteLength_607b856aa6c5a508: je,
      __wbg_byteOffset_b26b63681c83856c: Fe,
      __wbg_new_from_slice_22da9388ac046e50: Rn,
      __wbg_new_with_length_825018a1616e9e55: Cn,
      __wbg_new_with_byte_offset_and_length_b2ec5bf7b2f35743: jn,
      __wbg_new_5f486cdf45a04d78: yn,
      __wbg_buffer_60b8043cd926067d: Re,
      __wbg_length_ea16607d7b61445b: gn,
      __wbg_prototypesetcall_d62e5099504357e6: $n,
      __wbg_subarray_a068d24e39478a8a: j_,
      __wbg_set_8c0b3ffcf05d61c2: c_,
      __wbg_call_e133b57c9155d22c: Ae,
      __wbg_instanceof_Uint8Array_740438561a5b956d: un,
      __wbg_instanceof_ArrayBuffer_101e2bf31071a9f6: an,
      __wbg_now_16f0c993d5dd6c27: Nn,
      __wbg_stringify_5ae93966a84901ac: T_,
      __wbg_new_a70fbab9066b301f: Sn,
      __wbg_new_d15cb560a6a0e5f0: kn,
      __wbg_new_ab79df5bd7c26067: xn,
      __wbg_iterator_d8f549ec8fb061b1: dn,
      __wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: v_,
      __wbg_static_accessor_SELF_f207c857566db248: k_,
      __wbg_static_accessor_GLOBAL_8adb955bd33fac2f: x_,
      __wbg_static_accessor_WINDOW_bb9f1ba69d61b386: I_,
      __wbg_get_326e41e095fb2575: nn,
      __wbg_get_3ef1eba1850ade27: _n,
      __wbg_has_926ef2ff40b308cf: on,
      __wbg_next_e01a967809d1aa68: Ln,
      __wbg_getRandomValues_3f44b700395062e5: Qe,
      __wbg___wbindgen_in_41dbb8413020e076: be,
      __wbg___wbindgen_throw_6ddd609b62940d55: he,
      __wbg_Error_83742b46f01ce22d: oe,
      __wbg___wbindgen_is_object_781bc9f159099513: ue,
      __wbg___wbindgen_is_string_7ef6b97b02428fae: de,
      __wbg___wbindgen_number_get_34bb9d9dcfa21373: le,
      __wbg___wbindgen_string_get_395e606bd0ee4427: me,
      __wbg___wbindgen_boolean_get_c0f3f60bac5a78d1: ie,
      __wbg___wbindgen_is_function_3c846841762788c1: fe,
      __wbg___wbindgen_is_undefined_52709e72fb9f179c: ge,
      __wbg___wbindgen_jsval_loose_eq_5bcc3bed3c69e72b: we,
      __wbg__wbg_cb_unref_6b5b6b8576d35cb1: pe,
      __wbg___wbindgen_debug_string_5398f5bb970e0daa: ae,
      __wbindgen_cast_0000000000000001: B_,
      __wbindgen_cast_0000000000000002: U_,
      __wbindgen_cast_0000000000000003: $_,
      __wbindgen_cast_0000000000000004: z_,
      __wbindgen_cast_0000000000000005: W_,
      __wbindgen_cast_0000000000000006: D_,
      __wbindgen_cast_0000000000000007: P_,
      __wbindgen_cast_0000000000000008: V_,
      __wbindgen_cast_0000000000000009: G_,
      __wbindgen_cast_000000000000000a: H_,
      __wbindgen_cast_000000000000000b: J_,
      __wbindgen_cast_000000000000000c: X_
    }
  }, re), lt = i.memory, mt = i.__wbg_channel_free, ht = i.__wbg_channelsender_free, pt = i.__wbg_chatnode_free, yt = i.channel_id, St = i.channel_neighbors, xt = i.channel_receiver, vt = i.channel_sender, kt = i.channel_ticket, It = i.channelsender_broadcast, Rt = i.channelsender_set_nickame, Tt = i.chatnode_create, jt = i.chatnode_endpoint_id, Ft = i.chatnode_join, Ct = i.chatnode_spawn, At = i.start, Et = i.__wbg_intounderlyingbytesource_free, Ot = i.__wbg_intounderlyingsink_free, Lt = i.__wbg_intounderlyingsource_free, Mt = i.intounderlyingbytesource_autoAllocateChunkSize, Nt = i.intounderlyingbytesource_cancel, qt = i.intounderlyingbytesource_pull, Bt = i.intounderlyingbytesource_start, Ut = i.intounderlyingbytesource_type, $t = i.intounderlyingsink_abort, zt = i.intounderlyingsink_close, Wt = i.intounderlyingsink_write, Dt = i.intounderlyingsource_cancel, Pt = i.intounderlyingsource_pull, Vt = i.ring_core_0_17_14__bn_mul_mont, Gt = i.__wasm_bindgen_func_elem_7558, Ht = i.__wasm_bindgen_func_elem_7709, Jt = i.__wasm_bindgen_func_elem_8076, Xt = i.__wasm_bindgen_func_elem_8111, Yt = i.__wasm_bindgen_func_elem_8967, Kt = i.__wasm_bindgen_func_elem_16781, Qt = i.__wasm_bindgen_func_elem_16845, Zt = i.__wasm_bindgen_func_elem_3937, er = i.__wasm_bindgen_func_elem_16974, nr = i.__wasm_bindgen_func_elem_16990, _r = i.__wasm_bindgen_func_elem_7784, tr = i.__wasm_bindgen_func_elem_9012, rr = i.__wasm_bindgen_func_elem_4384, cr = i.__wasm_bindgen_func_elem_7567, or = i.__wasm_bindgen_func_elem_8082, sr = i.__wasm_bindgen_func_elem_8130, ir = i.__wasm_bindgen_func_elem_16798, ar = i.__wbindgen_export, br = i.__wbindgen_export2, fr = i.__wbindgen_export3, ur = i.__wbindgen_export4, dr = i.__wbindgen_add_to_stack_pointer, ee = i.__wbindgen_start, gr = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_16781: Kt,
    __wasm_bindgen_func_elem_16798: ir,
    __wasm_bindgen_func_elem_16845: Qt,
    __wasm_bindgen_func_elem_16974: er,
    __wasm_bindgen_func_elem_16990: nr,
    __wasm_bindgen_func_elem_3937: Zt,
    __wasm_bindgen_func_elem_4384: rr,
    __wasm_bindgen_func_elem_7558: Gt,
    __wasm_bindgen_func_elem_7567: cr,
    __wasm_bindgen_func_elem_7709: Ht,
    __wasm_bindgen_func_elem_7784: _r,
    __wasm_bindgen_func_elem_8076: Jt,
    __wasm_bindgen_func_elem_8082: or,
    __wasm_bindgen_func_elem_8111: Xt,
    __wasm_bindgen_func_elem_8130: sr,
    __wasm_bindgen_func_elem_8967: Yt,
    __wasm_bindgen_func_elem_9012: tr,
    __wbg_channel_free: mt,
    __wbg_channelsender_free: ht,
    __wbg_chatnode_free: pt,
    __wbg_intounderlyingbytesource_free: Et,
    __wbg_intounderlyingsink_free: Ot,
    __wbg_intounderlyingsource_free: Lt,
    __wbindgen_add_to_stack_pointer: dr,
    __wbindgen_export: ar,
    __wbindgen_export2: br,
    __wbindgen_export3: fr,
    __wbindgen_export4: ur,
    __wbindgen_start: ee,
    channel_id: yt,
    channel_neighbors: St,
    channel_receiver: xt,
    channel_sender: vt,
    channel_ticket: kt,
    channelsender_broadcast: It,
    channelsender_set_nickame: Rt,
    chatnode_create: Tt,
    chatnode_endpoint_id: jt,
    chatnode_join: Ft,
    chatnode_spawn: Ct,
    intounderlyingbytesource_autoAllocateChunkSize: Mt,
    intounderlyingbytesource_cancel: Nt,
    intounderlyingbytesource_pull: qt,
    intounderlyingbytesource_start: Bt,
    intounderlyingbytesource_type: Ut,
    intounderlyingsink_abort: $t,
    intounderlyingsink_close: zt,
    intounderlyingsink_write: Wt,
    intounderlyingsource_cancel: Dt,
    intounderlyingsource_pull: Pt,
    memory: lt,
    ring_core_0_17_14__bn_mul_mont: Vt,
    start: At
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  wt(gr);
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
      const _ = await this.chatNode.create(n);
      return this.joinInner(_, n);
    }
    async joinChannel(n, _) {
      const t = await this.chatNode.join(n, _);
      return this.joinInner(t, _);
    }
    joinInner(n, _) {
      const t = n.id();
      A.info(`joining channel ${t}`);
      const c = t.substring(5, 13);
      let a, b = new Promise((T) => {
        a = T;
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
        onClose: a
      };
      g.peers.set(d, y), this.channels.set(t, g);
      const I = async () => {
        const T = n.receiver.getReader();
        for (; ; ) {
          const { done: x, value: U } = await T.read();
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
            const $ = {
              id: Z(g),
              sender: l.from,
              content: l.text
            };
            g.messages.push($);
            const te = H(g, $);
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
            for (const $ of g.peerSubscribers) $();
          } else if (l.type === "joined") {
            A.info(`joined channel ${t}`), g.neighbors += l.neighbors.length;
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
          const T = /* @__PURE__ */ new Date();
          for (const x of g.peers.values()) {
            if (x.id === d) {
              x.lastSeen = T;
              continue;
            }
            const U = (T.getTime() - x.lastSeen.getTime()) / 1e3;
            U > 20 ? x.status = "offline" : U > 10 ? x.status = "away" : x.status = "online";
          }
          await new Promise((x) => setTimeout(x, 1e3));
        }
      };
      return Promise.race([
        b,
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
      const a = {
        sender: this.chatNode.endpoint_id(),
        id: Z(t),
        content: _
      };
      t.messages.push(a);
      const b = H(t, a);
      for (const d of t.subscribers) d(b);
    }
    setNickname(n, _) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      console.log("state", t), A.info(`changing nickname from ${t.myself.name} to ${_}`), t.myself.name = _, t.channel.sender.set_nickame(_);
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
  function wr(e, n) {
    const _ = e.peers.get(n);
    return _ && _.name ? _.name : n.substring(0, 8);
  }
  function H(e, n) {
    return {
      ...n,
      nickname: wr(e, n.sender)
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
