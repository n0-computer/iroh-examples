var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-BFLNJpKV.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-C7vwyhiB.wasm", import.meta.url).href, ce = async (e = {}, n) => {
    let _;
    if (n.startsWith("data:")) {
      const t = n.replace(/^data:.*?base64,/, "");
      let c;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") c = Buffer.from(t, "base64");
      else if (typeof atob == "function") {
        const b = atob(t);
        c = new Uint8Array(b.length);
        for (let a = 0; a < b.length; a++) c[a] = b.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(c, e);
    } else {
      const t = await fetch(n), c = t.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && c.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(t, e);
      else {
        const b = await t.arrayBuffer();
        _ = await WebAssembly.instantiate(b, e);
      }
    }
    return _.instance.exports;
  };
  class L {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(L.prototype);
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
        const b = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(b, this.__wbg_ptr);
        var t = f().getInt32(b + 4 * 0, true), c = f().getInt32(b + 4 * 1, true);
        return n = t, _ = c, w(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
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
    get receiver() {
      const n = o.channel_receiver(this.__wbg_ptr);
      return h(n);
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
        var c = f().getInt32(I + 4 * 0, true), b = f().getInt32(I + 4 * 1, true), a = f().getInt32(I + 4 * 2, true), d = f().getInt32(I + 4 * 3, true), y = c, g = b;
        if (d) throw y = 0, g = 0, h(a);
        return _ = y, t = g, w(y, g);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
  }
  Symbol.dispose && (L.prototype[Symbol.dispose] = L.prototype.free);
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
    broadcast(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m, c = o.channelsender_broadcast(this.__wbg_ptr, _, t);
      return h(c);
    }
    set_nickame(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m;
      o.channelsender_set_nickame(this.__wbg_ptr, _, t);
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
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
    create(n) {
      const _ = p(n, o.__wbindgen_export, o.__wbindgen_export2), t = m, c = o.chatnode_create(this.__wbg_ptr, _, t);
      return h(c);
    }
    endpoint_id() {
      let n, _;
      try {
        const b = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_endpoint_id(b, this.__wbg_ptr);
        var t = f().getInt32(b + 4 * 0, true), c = f().getInt32(b + 4 * 1, true);
        return n = t, _ = c, w(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    join(n, _) {
      const t = p(n, o.__wbindgen_export, o.__wbindgen_export2), c = m, b = p(_, o.__wbindgen_export, o.__wbindgen_export2), a = m, d = o.chatnode_join(this.__wbg_ptr, t, c, b, a);
      return h(d);
    }
    static spawn() {
      const n = o.chatnode_spawn();
      return h(n);
    }
  }
  Symbol.dispose && (T.prototype[Symbol.dispose] = T.prototype.free);
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
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
    pull(n) {
      const _ = o.intounderlyingsource_pull(this.__wbg_ptr, s(n));
      return h(_);
    }
  }
  Symbol.dispose && (B.prototype[Symbol.dispose] = B.prototype.free);
  function oe(e, n) {
    const _ = Error(w(e, n));
    return s(_);
  }
  function se(e, n) {
    const _ = String(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ie(e) {
    const n = r(e), _ = typeof n == "boolean" ? n : void 0;
    return S(_) ? 16777215 : _ ? 1 : 0;
  }
  function be(e, n) {
    const _ = J(r(n)), t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ae(e, n) {
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
  function he(e, n) {
    const _ = r(n), t = typeof _ == "string" ? _ : void 0;
    var c = S(t) ? 0 : p(t, o.__wbindgen_export, o.__wbindgen_export2), b = m;
    f().setInt32(e + 4 * 1, b, true), f().setInt32(e + 4 * 0, c, true);
  }
  function me(e, n) {
    throw new Error(w(e, n));
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
      r(e).addEventListener(w(n, _), r(t));
    }, arguments);
  }
  function ve() {
    return u(function(e, n, _, t, c) {
      r(e).append(w(n, _), w(t, c));
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
  function Fe(e) {
    const n = r(e).byobRequest;
    return S(n) ? 0 : s(n);
  }
  function Te(e) {
    return r(e).byteLength;
  }
  function je(e) {
    return r(e).byteOffset;
  }
  function Ce() {
    return u(function(e, n) {
      const _ = r(e).call(r(n));
      return s(_);
    }, arguments);
  }
  function Ae() {
    return u(function(e, n, _) {
      const t = r(e).call(r(n), r(_));
      return s(t);
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
    const n = L.__wrap(e);
    return s(n);
  }
  function Me(e) {
    const n = T.__wrap(e);
    return s(n);
  }
  function Be(e) {
    const n = clearTimeout(h(e));
    return s(n);
  }
  function Ne() {
    return u(function(e, n) {
      r(e).clearTimeout(h(n));
    }, arguments);
  }
  function qe() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ue() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function ze() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function We(e) {
    return r(e).code;
  }
  function $e(e) {
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
    var _ = N(e, n).slice();
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
    let _, t;
    try {
      _ = e, t = n, console.error(w(e, n));
    } finally {
      o.__wbindgen_export4(_, t, 1);
    }
  }
  function Xe(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.error(..._);
  }
  function Ye(e) {
    const n = fetch(r(e));
    return s(n);
  }
  function Ke(e, n) {
    const _ = r(e).fetch(r(n));
    return s(_);
  }
  function Qe() {
    return u(function(e, n) {
      globalThis.crypto.getRandomValues(j(e, n));
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
  function _n(e) {
    const n = r(e).done;
    return S(n) ? 16777215 : n ? 1 : 0;
  }
  function tn(e) {
    const n = r(e).value;
    return s(n);
  }
  function rn(e, n) {
    const _ = r(e)[r(n)];
    return s(_);
  }
  function cn() {
    return u(function(e, n) {
      return Reflect.has(r(e), r(n));
    }, arguments);
  }
  function on(e) {
    const n = r(e).headers;
    return s(n);
  }
  function sn(e) {
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
  function an(e) {
    let n;
    try {
      n = r(e) instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function fn(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function un() {
    return s(Symbol.iterator);
  }
  function dn(e) {
    return r(e).length;
  }
  function gn(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.log(..._);
  }
  function wn(e, n) {
    const _ = r(n).message, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ln(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function hn() {
    return u(function(e, n) {
      const _ = new WebSocket(w(e, n));
      return s(_);
    }, arguments);
  }
  function mn() {
    const e = new Object();
    return s(e);
  }
  function pn() {
    const e = new Array();
    return s(e);
  }
  function yn() {
    return u(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function Sn(e, n) {
    const _ = new Error(w(e, n));
    return s(_);
  }
  function xn() {
    const e = new Error();
    return s(e);
  }
  function vn(e, n) {
    try {
      var _ = {
        a: e,
        b: n
      }, t = (b, a) => {
        const d = _.a;
        _.a = 0;
        try {
          return _t(d, _.b, b, a);
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
  function kn() {
    return u(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function In(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function Rn(e, n) {
    const _ = new Uint8Array(j(e, n));
    return s(_);
  }
  function Fn(e, n) {
    const _ = new Function(w(e, n));
    return s(_);
  }
  function Tn(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function jn(e, n) {
    const _ = new ReadableStream(B.__wrap(e), h(n));
    return s(_);
  }
  function Cn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function An() {
    return u(function(e, n, _) {
      const t = new Request(w(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function En() {
    return u(function(e, n, _) {
      const t = new WebSocket(w(e, n), r(_));
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
  function Bn(e) {
    return r(e).now();
  }
  function Nn() {
    return Date.now();
  }
  function qn(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Un(e) {
    const n = r(e).process;
    return s(n);
  }
  function zn(e, n, _) {
    Uint8Array.prototype.set.call(j(e, n), r(_));
  }
  function Wn(e, n) {
    return r(e).push(r(n));
  }
  function $n(e) {
    const n = r(e).queueMicrotask;
    return s(n);
  }
  function Dn(e) {
    queueMicrotask(r(e));
  }
  function Pn() {
    return u(function(e, n) {
      r(e).randomFillSync(h(n));
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
    const _ = r(n).reason, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function Jn(e) {
    r(e).releaseLock();
  }
  function Xn() {
    return u(function(e, n, _, t) {
      r(e).removeEventListener(w(n, _), r(t));
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
      r(e).send(j(n, _));
    }, arguments);
  }
  function e_() {
    return u(function(e, n, _) {
      r(e).send(w(n, _));
    }, arguments);
  }
  function n_() {
    return u(function(e, n, _) {
      const t = r(e).setTimeout(h(n), _);
      return s(t);
    }, arguments);
  }
  function __(e, n) {
    const _ = setTimeout(r(e), n);
    return s(_);
  }
  function t_(e, n, _) {
    r(e)[h(n)] = h(_);
  }
  function r_(e, n) {
    r(e).binaryType = tt[n];
  }
  function c_(e, n) {
    r(e).body = r(n);
  }
  function o_(e, n) {
    r(e).cache = rt[n];
  }
  function s_(e, n, _) {
    r(e).set(j(n, _));
  }
  function i_(e, n) {
    r(e).credentials = ct[n];
  }
  function b_(e, n, _) {
    r(e)[n >>> 0] = h(_);
  }
  function a_(e, n) {
    r(e).handleEvent = r(n);
  }
  function f_(e, n) {
    r(e).headers = r(n);
  }
  function u_(e, n) {
    r(e).highWaterMark = n;
  }
  function d_(e, n, _) {
    r(e).method = w(n, _);
  }
  function g_(e, n) {
    r(e).mode = ot[n];
  }
  function w_(e, n) {
    r(e).onclose = r(n);
  }
  function l_(e, n) {
    r(e).onerror = r(n);
  }
  function h_(e, n) {
    r(e).onmessage = r(n);
  }
  function m_(e, n) {
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
    const _ = r(n).stack, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
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
  function F_() {
    return u(function(e) {
      const n = JSON.stringify(r(e));
      return s(n);
    }, arguments);
  }
  function T_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function j_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function C_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function A_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function E_(e, n) {
    const _ = r(n).url, t = p(_, o.__wbindgen_export, o.__wbindgen_export2), c = m;
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
  function B_(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.warn(..._);
  }
  function N_(e) {
    return r(e).wasClean;
  }
  function q_(e, n) {
    const _ = it(e, n, o.__wasm_bindgen_func_elem_7301, Y_);
    return s(_);
  }
  function U_(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_8084, Z_);
    return s(_);
  }
  function z_(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_8881, K_);
    return s(_);
  }
  function W_(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_14881, Q_);
    return s(_);
  }
  function $_(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_14945, et);
    return s(_);
  }
  function D_(e, n) {
    const _ = q(e, n, o.__wasm_bindgen_func_elem_3823, nt);
    return s(_);
  }
  function P_(e) {
    return s(e);
  }
  function V_(e, n) {
    const _ = j(e, n);
    return s(_);
  }
  function G_(e, n) {
    const _ = w(e, n);
    return s(_);
  }
  function H_(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function J_(e) {
    const n = r(e);
    return s(n);
  }
  function X_(e) {
    h(e);
  }
  function Y_(e, n) {
    o.__wasm_bindgen_func_elem_7321(e, n);
  }
  function K_(e, n) {
    o.__wasm_bindgen_func_elem_8891(e, n);
  }
  function Q_(e, n) {
    o.__wasm_bindgen_func_elem_14899(e, n);
  }
  function Z_(e, n, _) {
    o.__wasm_bindgen_func_elem_8129(e, n, s(_));
  }
  function et(e, n, _) {
    o.__wasm_bindgen_func_elem_14961(e, n, s(_));
  }
  function nt(e, n, _) {
    o.__wasm_bindgen_func_elem_4264(e, n, s(_));
  }
  function _t(e, n, _, t) {
    o.__wasm_bindgen_func_elem_15090(e, n, s(_), s(t));
  }
  const tt = [
    "blob",
    "arraybuffer"
  ], rt = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], ct = [
    "omit",
    "same-origin",
    "include"
  ], ot = [
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
    E === k.length && k.push(k.length + 1);
    const n = E;
    return E = k[n], k[n] = e, n;
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
      let b = "[";
      c > 0 && (b += J(e[0]));
      for (let a = 1; a < c; a++) b += ", " + J(e[a]);
      return b += "]", b;
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
  function st(e) {
    e < 132 || (k[e] = E, E = e);
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
  let F = null;
  function f() {
    return (F === null || F.buffer.detached === true || F.buffer.detached === void 0 && F.buffer !== o.memory.buffer) && (F = new DataView(o.memory.buffer)), F;
  }
  function w(e, n) {
    return e = e >>> 0, at(e, n);
  }
  let W = null;
  function A() {
    return (W === null || W.byteLength === 0) && (W = new Uint8Array(o.memory.buffer)), W;
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
  let k = new Array(128).fill(void 0);
  k.push(void 0, null, true, false);
  let E = k.length;
  function S(e) {
    return e == null;
  }
  function it(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, b = (...a) => {
      c.cnt++;
      try {
        return t(c.a, c.b, ...a);
      } finally {
        b._wbg_cb_unref();
      }
    };
    return b._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(b, c, c), b;
  }
  function q(e, n, _, t) {
    const c = {
      a: e,
      b: n,
      cnt: 1,
      dtor: _
    }, b = (...a) => {
      c.cnt++;
      const d = c.a;
      c.a = 0;
      try {
        return t(d, c.b, ...a);
      } finally {
        c.a = d, b._wbg_cb_unref();
      }
    };
    return b._wbg_cb_unref = () => {
      --c.cnt === 0 && (c.dtor(c.a, c.b), c.a = 0, D.unregister(c));
    }, D.register(b, c, c), b;
  }
  function p(e, n, _) {
    if (_ === void 0) {
      const d = O.encode(e), y = n(d.length, 1) >>> 0;
      return A().subarray(y, y + d.length).set(d), m = d.length, y;
    }
    let t = e.length, c = n(t, 1) >>> 0;
    const b = A();
    let a = 0;
    for (; a < t; a++) {
      const d = e.charCodeAt(a);
      if (d > 127) break;
      b[c + a] = d;
    }
    if (a !== t) {
      a !== 0 && (e = e.slice(a)), c = _(c, t, t = a + e.length * 3, 1) >>> 0;
      const d = A().subarray(c + a, c + t), y = O.encodeInto(e, d);
      a += y.written, c = _(c, t, a, 1) >>> 0;
    }
    return m = a, c;
  }
  function h(e) {
    const n = r(e);
    return st(e), n;
  }
  let $ = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  $.decode();
  const bt = 2146435072;
  let G = 0;
  function at(e, n) {
    return G += n, G >= bt && ($ = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), $.decode(), G = n), $.decode(A().subarray(e, e + n));
  }
  const O = new TextEncoder();
  "encodeInto" in O || (O.encodeInto = function(e, n) {
    const _ = O.encode(e);
    return n.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let m = 0, o;
  function ft(e) {
    o = e;
  }
  URL = globalThis.URL;
  const i = await ce({
    "./chat_browser_bg.js": {
      __wbg_channel_new: Le,
      __wbg_chatnode_new: Me,
      __wbindgen_object_clone_ref: J_,
      __wbindgen_object_drop_ref: X_,
      __wbg_get_with_ref_key_1dc361bd10053bfe: rn,
      __wbg_set_3f1d0b984ed272ed: t_,
      __wbg_String_8f0eb39a4a4c2f66: se,
      __wbg_new_8a6f238a6ece86ea: xn,
      __wbg_stack_0ed75d68575b0f3c: S_,
      __wbg_error_7534b8e9a36f1ab4: Je,
      __wbg_log_e51ef223c244b133: gn,
      __wbg_warn_479b8bbb8337357b: B_,
      __wbg_debug_55137df391ebfd29: Ve,
      __wbg_error_91947ba14c44e1c9: Xe,
      __wbg_setTimeout_7bb3429662ab1e70: __,
      __wbg_clearTimeout_7a42b49784aea641: Be,
      __wbg_fetch_74a3e84ebd2c9a0e: Ye,
      __wbg_getReader_48e00749fe3f6089: en,
      __wbg_new_with_into_underlying_source_b47f6a6a596a7f24: jn,
      __wbg_new_64284bd487f9d239: yn,
      __wbg_append_a992ccc37aa62dc4: ve,
      __wbg_new_with_str_and_init_a61cbc6bdef21614: An,
      __wbg_instanceof_Response_ee1d54d79ae41977: an,
      __wbg_arrayBuffer_bb54076166006c39: ke,
      __wbg_url_c484c26b1fbf5126: A_,
      __wbg_body_3a0b4437dadea6bf: Ie,
      __wbg_status_89d7e803db911ee7: R_,
      __wbg_headers_59a2938db9f80985: on,
      __wbg_set_onopen_b7b52d519d6c0f11: m_,
      __wbg_readyState_1bb73ec7b8a54656: Gn,
      __wbg_set_onclose_d382f3e2c2b850eb: w_,
      __wbg_set_onerror_377f18bf4569bf85: l_,
      __wbg_send_bc0336a1b5ce4fb7: e_,
      __wbg_set_onmessage_2114aa5f4f53051e: h_,
      __wbg_set_binaryType_5bbf62e9f705dc1a: r_,
      __wbg_send_542f95dea2df7994: Zn,
      __wbg_new_with_str_sequence_b67b3919b8b11238: En,
      __wbg_new_057993d5b5e07835: hn,
      __wbg_url_cb4d34db86c24df9: E_,
      __wbg_close_1d08eaf57ed325c0: Ue,
      __wbg_code_a552f1e91eda69b7: $e,
      __wbg_reason_35fce8e55dd90f31: Hn,
      __wbg_wasClean_a9c77a7100d8534f: N_,
      __wbg_addEventListener_14e74488d3142fa7: xe,
      __wbg_removeEventListener_34a7e78acf851dd7: Xn,
      __wbg_set_method_c3e20375f5ae7fac: d_,
      __wbg_set_signal_f2d3f8599248896d: p_,
      __wbg_set_headers_cfc5f4b2c1f20549: f_,
      __wbg_set_credentials_c4a58d2e05ef24fb: i_,
      __wbg_set_body_9a7e00afe3cfe244: c_,
      __wbg_set_mode_b13642c312648202: g_,
      __wbg_set_cache_315a3ed773a41543: o_,
      __wbg_code_35e4ec59fbc7d427: We,
      __wbg_message_0b2b0298a231b0d4: wn,
      __wbg_data_5330da50312d0bc1: Pe,
      __wbg_set_handle_event_ea7145e4fd7c71f1: a_,
      __wbg_abort_d549b92d3c665de1: Se,
      __wbg_new_b949e7f56150a5d1: kn,
      __wbg_abort_2f0584e03e8e3950: ye,
      __wbg_signal_d1285ecab4ebc5ad: y_,
      __wbg_set_high_water_mark_a7ede9ba8be01a98: u_,
      __wbg_fetch_afb6a4b6cacf876d: Ke,
      __wbg_get_done_1ad1c16537f444c6: _n,
      __wbg_get_value_6b77a1b7b90c9200: tn,
      __wbg_respond_bf6ab10399ca8722: Qn,
      __wbg_view_6c32e7184b8606ad: M_,
      __wbg_releaseLock_aa5846c2494b3032: Jn,
      __wbg_read_68fd377df67e19b0: Vn,
      __wbg_cancel_2c0a0a251ff6b2b7: Ee,
      __wbg_byobRequest_80e594e6da4e1af7: Fe,
      __wbg_close_06dfa0a815b9d71f: qe,
      __wbg_enqueue_2c63f2044f257c3e: He,
      __wbg_close_a79afee31de55b36: ze,
      __wbg_instanceof_Blob_ce92a9ddd729a84a: bn,
      __wbg_crypto_574e78ad8b13b65f: De,
      __wbg_process_dc0fbacc7c1c06f7: Un,
      __wbg_versions_c01dfd4722a88165: L_,
      __wbg_node_905d3e251edff8a2: Mn,
      __wbg_require_60cc747a6bc5215a: Yn,
      __wbg_msCrypto_a61aeb35a24c1329: ln,
      __wbg_getRandomValues_b8f5dbd5f3995a9e: Ze,
      __wbg_randomFillSync_ac0988aba3254290: Pn,
      __wbg_setTimeout_282db1c50d4a7304: n_,
      __wbg_clearTimeout_cbe3107816206ed5: Ne,
      __wbg_queueMicrotask_5bb536982f78a56f: Dn,
      __wbg_queueMicrotask_0aa0a927f78f5d98: $n,
      __wbg_performance_7a3ffd0b17f663ad: qn,
      __wbg_now_2c95c9de01293173: Bn,
      __wbg_byteLength_3417f266f4bf562a: Te,
      __wbg_byteOffset_f88547ca47c86358: je,
      __wbg_new_from_slice_a3d2629dc1826784: Rn,
      __wbg_new_with_length_a2c39cbe88fd8ff1: Cn,
      __wbg_new_with_byte_offset_and_length_aa261d9c9da49eb1: Tn,
      __wbg_new_dd2b680c8bf6ae29: In,
      __wbg_buffer_26d0910f3a5bc899: Re,
      __wbg_length_32ed9a279acd054c: dn,
      __wbg_prototypesetcall_bdcdcc5842e4d77d: zn,
      __wbg_subarray_a96e1fef17ed23cb: T_,
      __wbg_set_cc56eefd2dd91957: s_,
      __wbg_done_57b39ecd9addfe81: Ge,
      __wbg_value_0546255b415e96c1: O_,
      __wbg_instanceof_Uint8Array_9b9075935c74707c: fn,
      __wbg_instanceof_ArrayBuffer_c367199e2fa2aa04: sn,
      __wbg_now_a3af9a2f4bbaa4d1: Nn,
      __wbg_stringify_8d1cc6ff383e8bae: F_,
      __wbg_new_3eb36ae241fe6f44: pn,
      __wbg_set_f43e577aea94465b: b_,
      __wbg_push_8ffdcb2063340ba5: Wn,
      __wbg_new_72b49615380db768: Sn,
      __wbg_new_361308b2356cecd0: mn,
      __wbg_iterator_6ff6560ca1568e55: un,
      __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: v_,
      __wbg_static_accessor_SELF_a621d3dfbb60d0ce: k_,
      __wbg_static_accessor_GLOBAL_12837167ad935116: x_,
      __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: I_,
      __wbg_new_b5d9e2fb389fef91: vn,
      __wbg_then_b9e7b3b5f1a9e1b5: C_,
      __wbg_catch_c1f8c7623b458214: Oe,
      __wbg_then_0d9fe2c7b1857d32: j_,
      __wbg_resolve_002c4b7d9d8f6b64: Kn,
      __wbg_get_b3ed3ad4be2bc8ac: nn,
      __wbg_has_d4e53238966c12b6: cn,
      __wbg_new_no_args_1c7c842f08d00ebb: Fn,
      __wbg_call_389efe28435a9388: Ce,
      __wbg_call_4708e0c13bdc8e95: Ae,
      __wbg_next_418f80d8f5303233: Ln,
      __wbg_next_3482f54c49e8af19: On,
      __wbg_getRandomValues_1c61fac11405ffdc: Qe,
      __wbg___wbindgen_in_47fa6863be6f2f25: ae,
      __wbg___wbindgen_throw_be289d5034ed271b: me,
      __wbg_Error_8c4e43fe74559d73: oe,
      __wbg___wbindgen_is_object_5ae8e5880f2c1fbd: ue,
      __wbg___wbindgen_is_string_cd444516edc5b180: de,
      __wbg___wbindgen_number_get_8ff4255516ccad3e: le,
      __wbg___wbindgen_string_get_72fb696202c56729: he,
      __wbg___wbindgen_boolean_get_bbbb1c18aa2f5e25: ie,
      __wbg___wbindgen_is_function_0095a73b8b156f76: fe,
      __wbg___wbindgen_is_undefined_9e4d92534c42d778: ge,
      __wbg___wbindgen_jsval_loose_eq_9dd77d8cd6671811: we,
      __wbg__wbg_cb_unref_d9b87ff7982e3b21: pe,
      __wbg___wbindgen_debug_string_0bc8482c6e3508ae: be,
      __wbindgen_cast_0000000000000001: q_,
      __wbindgen_cast_0000000000000002: U_,
      __wbindgen_cast_0000000000000003: z_,
      __wbindgen_cast_0000000000000004: W_,
      __wbindgen_cast_0000000000000005: $_,
      __wbindgen_cast_0000000000000006: D_,
      __wbindgen_cast_0000000000000007: P_,
      __wbindgen_cast_0000000000000008: V_,
      __wbindgen_cast_0000000000000009: G_,
      __wbindgen_cast_000000000000000a: H_
    }
  }, re), ut = i.memory, dt = i.__wbg_channel_free, gt = i.__wbg_channelsender_free, wt = i.__wbg_chatnode_free, lt = i.channel_id, ht = i.channel_neighbors, mt = i.channel_receiver, pt = i.channel_sender, yt = i.channel_ticket, St = i.channelsender_broadcast, xt = i.channelsender_set_nickame, vt = i.chatnode_create, kt = i.chatnode_endpoint_id, It = i.chatnode_join, Rt = i.chatnode_spawn, Ft = i.start, Tt = i.__wbg_intounderlyingbytesource_free, jt = i.__wbg_intounderlyingsink_free, Ct = i.__wbg_intounderlyingsource_free, At = i.intounderlyingbytesource_autoAllocateChunkSize, Et = i.intounderlyingbytesource_cancel, Ot = i.intounderlyingbytesource_pull, Lt = i.intounderlyingbytesource_start, Mt = i.intounderlyingbytesource_type, Bt = i.intounderlyingsink_abort, Nt = i.intounderlyingsink_close, qt = i.intounderlyingsink_write, Ut = i.intounderlyingsource_cancel, zt = i.intounderlyingsource_pull, Wt = i.ring_core_0_17_14__bn_mul_mont, $t = i.__wasm_bindgen_func_elem_7301, Dt = i.__wasm_bindgen_func_elem_8084, Pt = i.__wasm_bindgen_func_elem_8881, Vt = i.__wasm_bindgen_func_elem_14881, Gt = i.__wasm_bindgen_func_elem_14945, Ht = i.__wasm_bindgen_func_elem_3823, Jt = i.__wasm_bindgen_func_elem_15090, Xt = i.__wasm_bindgen_func_elem_8129, Yt = i.__wasm_bindgen_func_elem_14961, Kt = i.__wasm_bindgen_func_elem_4264, Qt = i.__wasm_bindgen_func_elem_7321, Zt = i.__wasm_bindgen_func_elem_8891, er = i.__wasm_bindgen_func_elem_14899, nr = i.__wbindgen_export, _r = i.__wbindgen_export2, tr = i.__wbindgen_export3, rr = i.__wbindgen_export4, cr = i.__wbindgen_add_to_stack_pointer, ee = i.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_14881: Vt,
    __wasm_bindgen_func_elem_14899: er,
    __wasm_bindgen_func_elem_14945: Gt,
    __wasm_bindgen_func_elem_14961: Yt,
    __wasm_bindgen_func_elem_15090: Jt,
    __wasm_bindgen_func_elem_3823: Ht,
    __wasm_bindgen_func_elem_4264: Kt,
    __wasm_bindgen_func_elem_7301: $t,
    __wasm_bindgen_func_elem_7321: Qt,
    __wasm_bindgen_func_elem_8084: Dt,
    __wasm_bindgen_func_elem_8129: Xt,
    __wasm_bindgen_func_elem_8881: Pt,
    __wasm_bindgen_func_elem_8891: Zt,
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
    intounderlyingbytesource_pull: Ot,
    intounderlyingbytesource_start: Lt,
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
  ft(or);
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
      let b, a = new Promise((R) => {
        b = R;
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
        onClose: b
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
      const b = {
        sender: this.chatNode.endpoint_id(),
        id: Z(t),
        content: _
      };
      t.messages.push(b);
      const a = H(t, b);
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
