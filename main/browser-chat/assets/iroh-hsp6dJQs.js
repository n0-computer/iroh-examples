var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-B1pqz9bd.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg--2dljFAa.wasm", import.meta.url).href, ce = async (e = {}, n) => {
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
        return n = t, _ = c, h(t, c);
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
      return w(n);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return q.__wrap(n);
    }
    ticket(n) {
      let _, t;
      try {
        const I = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(I, this.__wbg_ptr, s(n));
        var c = f().getInt32(I + 4 * 0, true), a = f().getInt32(I + 4 * 1, true), b = f().getInt32(I + 4 * 2, true), g = f().getInt32(I + 4 * 3, true), y = c, u = a;
        if (g) throw y = 0, u = 0, w(b);
        return _ = y, t = u, h(y, u);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  class q {
    static __wrap(n) {
      const _ = Object.create(q.prototype);
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
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p, c = o.channelsender_broadcast(this.__wbg_ptr, _, t);
      return w(c);
    }
    set_nickame(n) {
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p;
      o.channelsender_set_nickame(this.__wbg_ptr, _, t);
    }
  }
  Symbol.dispose && (q.prototype[Symbol.dispose] = q.prototype.free);
  class F {
    static __wrap(n) {
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
      const _ = m(n, o.__wbindgen_export, o.__wbindgen_export2), t = p, c = o.chatnode_create(this.__wbg_ptr, _, t);
      return w(c);
    }
    endpoint_id() {
      let n, _;
      try {
        const a = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_endpoint_id(a, this.__wbg_ptr);
        var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
        return n = t, _ = c, h(t, c);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(n, _, 1);
      }
    }
    join(n, _) {
      const t = m(n, o.__wbindgen_export, o.__wbindgen_export2), c = p, a = m(_, o.__wbindgen_export, o.__wbindgen_export2), b = p, g = o.chatnode_join(this.__wbg_ptr, t, c, a, b);
      return w(g);
    }
    static spawn() {
      const n = o.chatnode_spawn();
      return w(n);
    }
  }
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  class B {
    static __wrap(n) {
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
      return w(_);
    }
  }
  Symbol.dispose && (B.prototype[Symbol.dispose] = B.prototype.free);
  function oe(e, n) {
    const _ = Error(h(e, n));
    return s(_);
  }
  function se(e, n) {
    const _ = String(r(n)), t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function ie(e) {
    const n = r(e), _ = typeof n == "boolean" ? n : void 0;
    return x(_) ? 16777215 : _ ? 1 : 0;
  }
  function ae(e, n) {
    const _ = J(r(n)), t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function be(e, n) {
    return r(e) in r(n);
  }
  function fe(e) {
    return typeof r(e) == "function";
  }
  function de(e) {
    const n = r(e);
    return typeof n == "object" && n !== null;
  }
  function ue(e) {
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
    f().setFloat64(e + 8 * 1, x(t) ? 0 : t, true), f().setInt32(e + 4 * 0, !x(t), true);
  }
  function he(e, n) {
    const _ = r(n), t = typeof _ == "string" ? _ : void 0;
    var c = x(t) ? 0 : m(t, o.__wbindgen_export, o.__wbindgen_export2), a = p;
    f().setInt32(e + 4 * 1, a, true), f().setInt32(e + 4 * 0, c, true);
  }
  function pe(e, n) {
    throw new Error(h(e, n));
  }
  function me(e) {
    r(e)._wbg_cb_unref();
  }
  function ye(e, n) {
    r(e).abort(r(n));
  }
  function xe(e) {
    r(e).abort();
  }
  function Se() {
    return d(function(e, n, _, t) {
      r(e).addEventListener(h(n, _), r(t));
    }, arguments);
  }
  function ve() {
    return d(function(e, n, _, t, c) {
      r(e).append(h(n, _), h(t, c));
    }, arguments);
  }
  function ke() {
    return d(function(e) {
      const n = r(e).arrayBuffer();
      return s(n);
    }, arguments);
  }
  function Ie(e) {
    const n = r(e).body;
    return x(n) ? 0 : s(n);
  }
  function Re(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function je(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : s(n);
  }
  function Ae(e) {
    return r(e).byteLength;
  }
  function Fe(e) {
    return r(e).byteOffset;
  }
  function Te() {
    return d(function(e, n, _) {
      const t = r(e).call(r(n), r(_));
      return s(t);
    }, arguments);
  }
  function Ce(e) {
    const n = r(e).cancel();
    return s(n);
  }
  function Ee(e, n) {
    const _ = r(e).catch(r(n));
    return s(_);
  }
  function Le(e) {
    const n = M.__wrap(e);
    return s(n);
  }
  function Oe(e) {
    const n = F.__wrap(e);
    return s(n);
  }
  function Me(e) {
    const n = clearTimeout(w(e));
    return s(n);
  }
  function qe() {
    return d(function(e, n) {
      r(e).clearTimeout(w(n));
    }, arguments);
  }
  function Be() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ne() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ue() {
    return d(function(e) {
      r(e).close();
    }, arguments);
  }
  function $e(e) {
    return r(e).code;
  }
  function ze(e) {
    return r(e).code;
  }
  function We(e) {
    const n = r(e).crypto;
    return s(n);
  }
  function De(e) {
    const n = r(e).data;
    return s(n);
  }
  function Pe(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.debug(..._);
  }
  function Ve(e) {
    return r(e).done;
  }
  function Ge() {
    return d(function(e, n) {
      r(e).enqueue(r(n));
    }, arguments);
  }
  function He(e) {
    const n = r(e).entries();
    return s(n);
  }
  function Je(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.error(..._);
  }
  function Xe(e, n) {
    let _, t;
    try {
      _ = e, t = n, console.error(h(e, n));
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
    return d(function(e, n) {
      globalThis.crypto.getRandomValues(T(e, n));
    }, arguments);
  }
  function Ze() {
    return d(function(e, n) {
      r(e).getRandomValues(r(n));
    }, arguments);
  }
  function en() {
    return d(function(e) {
      const n = r(e).getReader();
      return s(n);
    }, arguments);
  }
  function nn(e, n) {
    const _ = r(e)[n >>> 0];
    return s(_);
  }
  function _n() {
    return d(function(e, n) {
      const _ = Reflect.get(r(e), r(n));
      return s(_);
    }, arguments);
  }
  function tn(e) {
    const n = r(e).done;
    return x(n) ? 16777215 : n ? 1 : 0;
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
    return d(function(e, n) {
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
  function dn(e) {
    let n;
    try {
      n = r(e) instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function un(e) {
    return Array.isArray(r(e));
  }
  function gn(e) {
    return r(e).length;
  }
  function wn(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.log(..._);
  }
  function ln(e, n) {
    const _ = r(n).message, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function hn(e) {
    const n = r(e).msCrypto;
    return s(n);
  }
  function pn() {
    const e = new Object();
    return s(e);
  }
  function mn(e, n) {
    const _ = new Error(h(e, n));
    return s(_);
  }
  function yn() {
    const e = new Error();
    return s(e);
  }
  function xn() {
    const e = new Array();
    return s(e);
  }
  function Sn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function vn() {
    return d(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function kn() {
    return d(function(e, n) {
      const _ = new WebSocket(h(e, n));
      return s(_);
    }, arguments);
  }
  function In() {
    return d(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function Rn(e, n) {
    const _ = new Uint8Array(T(e, n));
    return s(_);
  }
  function jn(e, n) {
    try {
      var _ = {
        a: e,
        b: n
      }, t = (a, b) => {
        const g = _.a;
        _.a = 0;
        try {
          return ct(g, _.b, a, b);
        } finally {
          _.a = g;
        }
      };
      const c = new Promise(t);
      return s(c);
    } finally {
      _.a = 0;
    }
  }
  function An(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function Fn(e, n) {
    const _ = new ReadableStream(B.__wrap(e), w(n));
    return s(_);
  }
  function Tn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Cn() {
    return d(function(e, n, _) {
      const t = new Request(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function En() {
    return d(function(e, n, _) {
      const t = new WebSocket(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function Ln() {
    return d(function(e) {
      const n = r(e).next();
      return s(n);
    }, arguments);
  }
  function On(e) {
    const n = r(e).node;
    return s(n);
  }
  function Mn() {
    return Date.now();
  }
  function qn(e) {
    return r(e).now();
  }
  function Bn(e) {
    const n = r(e).performance;
    return s(n);
  }
  function Nn(e) {
    const n = r(e).process;
    return s(n);
  }
  function Un(e, n) {
    const _ = r(n).protocol, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function $n(e, n, _) {
    Uint8Array.prototype.set.call(T(e, n), r(_));
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
    return d(function(e, n) {
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
    const _ = r(n).reason, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function Jn(e) {
    r(e).releaseLock();
  }
  function Xn() {
    return d(function(e, n, _, t) {
      r(e).removeEventListener(h(n, _), r(t));
    }, arguments);
  }
  function Yn() {
    return d(function() {
      const e = module.require;
      return s(e);
    }, arguments);
  }
  function Kn(e) {
    const n = Promise.resolve(r(e));
    return s(n);
  }
  function Qn() {
    return d(function(e, n) {
      r(e).respond(n >>> 0);
    }, arguments);
  }
  function Zn() {
    return d(function(e, n, _) {
      r(e).send(T(n, _));
    }, arguments);
  }
  function e_() {
    return d(function(e, n, _) {
      r(e).send(h(n, _));
    }, arguments);
  }
  function n_(e, n) {
    const _ = setTimeout(r(e), n);
    return s(_);
  }
  function __() {
    return d(function(e, n, _) {
      const t = r(e).setTimeout(w(n), _);
      return s(t);
    }, arguments);
  }
  function t_(e, n, _) {
    r(e).set(T(n, _));
  }
  function r_(e, n, _) {
    r(e)[w(n)] = w(_);
  }
  function c_(e, n, _) {
    r(e)[n >>> 0] = w(_);
  }
  function o_(e, n) {
    r(e).binaryType = ot[n];
  }
  function s_(e, n) {
    r(e).body = r(n);
  }
  function i_(e, n) {
    r(e).cache = st[n];
  }
  function a_(e, n) {
    r(e).credentials = it[n];
  }
  function b_(e, n) {
    r(e).handleEvent = r(n);
  }
  function f_(e, n) {
    r(e).headers = r(n);
  }
  function d_(e, n) {
    r(e).highWaterMark = n;
  }
  function u_(e, n, _) {
    r(e).method = h(n, _);
  }
  function g_(e, n) {
    r(e).mode = at[n];
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
  function p_(e, n) {
    r(e).onopen = r(n);
  }
  function m_(e, n) {
    r(e).signal = r(n);
  }
  function y_(e) {
    const n = r(e).signal;
    return s(n);
  }
  function x_(e, n) {
    const _ = r(n).stack, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function S_() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : s(e);
  }
  function v_() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : s(e);
  }
  function k_() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : s(e);
  }
  function I_() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : s(e);
  }
  function R_(e) {
    return r(e).status;
  }
  function j_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function A_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function F_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function T_(e, n) {
    const _ = r(n).url, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function C_(e, n) {
    const _ = r(n).url, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function E_(e) {
    const n = r(e).value;
    return s(n);
  }
  function L_(e) {
    const n = r(e).versions;
    return s(n);
  }
  function O_(e) {
    const n = r(e).view;
    return x(n) ? 0 : s(n);
  }
  function M_(e, n) {
    var _ = N(e, n).slice();
    o.__wbindgen_export4(e, n * 4, 4), console.warn(..._);
  }
  function q_(e) {
    return r(e).wasClean;
  }
  function B_(e, n) {
    const _ = R(e, n, nt);
    return s(_);
  }
  function N_(e, n) {
    const _ = R(e, n, rt);
    return s(_);
  }
  function U_(e, n) {
    const _ = R(e, n, _t);
    return s(_);
  }
  function $_(e, n) {
    const _ = R(e, n, tt);
    return s(_);
  }
  function z_(e, n) {
    const _ = R(e, n, K_);
    return s(_);
  }
  function W_(e, n) {
    const _ = R(e, n, Q_);
    return s(_);
  }
  function D_(e, n) {
    const _ = ft(e, n, Z_);
    return s(_);
  }
  function P_(e, n) {
    const _ = R(e, n, et);
    return s(_);
  }
  function V_(e) {
    return s(e);
  }
  function G_(e, n) {
    const _ = T(e, n);
    return s(_);
  }
  function H_(e, n) {
    const _ = h(e, n);
    return s(_);
  }
  function J_(e) {
    const n = BigInt.asUintN(64, e);
    return s(n);
  }
  function X_(e) {
    const n = r(e);
    return s(n);
  }
  function Y_(e) {
    w(e);
  }
  function K_(e, n) {
    o.__wasm_bindgen_func_elem_7523(e, n);
  }
  function Q_(e, n) {
    o.__wasm_bindgen_func_elem_8670(e, n);
  }
  function Z_(e, n) {
    o.__wasm_bindgen_func_elem_8704(e, n);
  }
  function et(e, n) {
    o.__wasm_bindgen_func_elem_16580(e, n);
  }
  function nt(e, n, _) {
    o.__wasm_bindgen_func_elem_7743(e, n, s(_));
  }
  function _t(e, n, _) {
    o.__wasm_bindgen_func_elem_4305(e, n, s(_));
  }
  function tt(e, n, _) {
    o.__wasm_bindgen_func_elem_9402(e, n, s(_));
  }
  function rt(e, n, _) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wasm_bindgen_func_elem_16707(a, e, n, s(_));
      var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
      if (c) throw w(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ct(e, n, _, t) {
    o.__wasm_bindgen_func_elem_16726(e, n, s(_), s(t));
  }
  const ot = [
    "blob",
    "arraybuffer"
  ], st = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ], it = [
    "omit",
    "same-origin",
    "include"
  ], at = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], X = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e, 1)), Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e, 1)), K = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e, 1));
  const Q = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e, 1));
  function s(e) {
    L === k.length && k.push(k.length + 1);
    const n = L;
    return L = k[n], k[n] = e, n;
  }
  const D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbindgen_export5(e.a, e.b));
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
  function bt(e) {
    e < 1028 || (k[e] = L, L = e);
  }
  function N(e, n) {
    e = e >>> 0;
    const _ = f(), t = [];
    for (let c = e; c < e + 4 * n; c += 4) t.push(w(_.getUint32(c, true)));
    return t;
  }
  function T(e, n) {
    return e = e >>> 0, E().subarray(e / 1, e / 1 + n);
  }
  let A = null;
  function f() {
    return (A === null || A.buffer.detached === true || A.buffer.detached === void 0 && A.buffer !== o.memory.buffer) && (A = new DataView(o.memory.buffer)), A;
  }
  function h(e, n) {
    return ut(e >>> 0, n);
  }
  let z = null;
  function E() {
    return (z === null || z.byteLength === 0) && (z = new Uint8Array(o.memory.buffer)), z;
  }
  function r(e) {
    return k[e];
  }
  function d(e, n) {
    try {
      return e.apply(this, n);
    } catch (_) {
      o.__wbindgen_export3(s(_));
    }
  }
  let k = new Array(1024).fill(void 0);
  k.push(void 0, null, true, false);
  let L = k.length;
  function x(e) {
    return e == null;
  }
  function ft(e, n, _) {
    const t = {
      a: e,
      b: n,
      cnt: 1
    }, c = (...a) => {
      t.cnt++;
      try {
        return _(t.a, t.b, ...a);
      } finally {
        c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --t.cnt === 0 && (o.__wbindgen_export5(t.a, t.b), t.a = 0, D.unregister(t));
    }, D.register(c, t, t), c;
  }
  function R(e, n, _) {
    const t = {
      a: e,
      b: n,
      cnt: 1
    }, c = (...a) => {
      t.cnt++;
      const b = t.a;
      t.a = 0;
      try {
        return _(b, t.b, ...a);
      } finally {
        t.a = b, c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --t.cnt === 0 && (o.__wbindgen_export5(t.a, t.b), t.a = 0, D.unregister(t));
    }, D.register(c, t, t), c;
  }
  function m(e, n, _) {
    if (_ === void 0) {
      const g = O.encode(e), y = n(g.length, 1) >>> 0;
      return E().subarray(y, y + g.length).set(g), p = g.length, y;
    }
    let t = e.length, c = n(t, 1) >>> 0;
    const a = E();
    let b = 0;
    for (; b < t; b++) {
      const g = e.charCodeAt(b);
      if (g > 127) break;
      a[c + b] = g;
    }
    if (b !== t) {
      b !== 0 && (e = e.slice(b)), c = _(c, t, t = b + e.length * 3, 1) >>> 0;
      const g = E().subarray(c + b, c + t), y = O.encodeInto(e, g);
      b += y.written, c = _(c, t, b, 1) >>> 0;
    }
    return p = b, c;
  }
  function w(e) {
    const n = r(e);
    return bt(e), n;
  }
  let W = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  W.decode();
  const dt = 2146435072;
  let G = 0;
  function ut(e, n) {
    return G += n, G >= dt && (W = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), W.decode(), G = n), W.decode(E().subarray(e, e + n));
  }
  const O = new TextEncoder();
  "encodeInto" in O || (O.encodeInto = function(e, n) {
    const _ = O.encode(e);
    return n.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let p = 0, o;
  function gt(e) {
    o = e;
  }
  URL = globalThis.URL;
  const i = await ce({
    "./chat_browser_bg.js": {
      __wbg_channel_new: Le,
      __wbg_chatnode_new: Oe,
      __wbindgen_object_clone_ref: X_,
      __wbindgen_object_drop_ref: Y_,
      __wbg_set_78ea6a19f4818587: c_,
      __wbg_get_with_ref_key_6412cf3094599694: cn,
      __wbg_set_6be42768c690e380: r_,
      __wbg_get_98fdf51d029a75eb: nn,
      __wbg_String_8564e559799eccda: se,
      __wbg_new_227d7c05414eb861: yn,
      __wbg_stack_3b0d974bbf31e44f: x_,
      __wbg_error_a6fa202b58aa1cd3: Xe,
      __wbg_log_7a0760e115750083: wn,
      __wbg_warn_3a37cdd7216f1479: M_,
      __wbg_debug_eaef3b49d572d680: Pe,
      __wbg_error_71b0e71161a5f3a0: Je,
      __wbg_next_6429a146bf756f93: Ln,
      __wbg_done_54b8da57023b7ed2: Ve,
      __wbg_value_9cc0518af87a489c: E_,
      __wbg_push_b77c476b01548d0a: zn,
      __wbg_setTimeout_30be5552e4410378: n_,
      __wbg_clearTimeout_1ccca1faf41fc6f8: Me,
      __wbg_fetch_c6486a0142348bc8: Ke,
      __wbg_getReader_9facd4f899beac89: en,
      __wbg_new_with_into_underlying_source_fd904252f385f59c: Fn,
      __wbg_then_bd927500e8905df2: F_,
      __wbg_catch_ec5061a695c26496: Ee,
      __wbg_call_dfde26266607c996: Te,
      __wbg_new_typed_c072c4ce9a2a0cdf: jn,
      __wbg_new_ee0be486d8f01282: In,
      __wbg_append_263958599fd198c1: ve,
      __wbg_entries_8c373da97ea5ada5: He,
      __wbg_new_with_str_and_init_ffe9977c986ea039: Cn,
      __wbg_instanceof_Response_ecfc823e8fb354e2: fn,
      __wbg_arrayBuffer_cb5d4748b5f3cad5: ke,
      __wbg_url_1a5ea6a8a7f22ff8: C_,
      __wbg_body_acbb5ec9cd18657f: Ie,
      __wbg_status_0853c9f5752c7ee2: R_,
      __wbg_headers_18f39f24d3837dc1: sn,
      __wbg_set_onopen_6f3fc5e2ad3144f1: p_,
      __wbg_readyState_a1a00cc8898812ac: Gn,
      __wbg_set_onclose_3121e15055418a37: w_,
      __wbg_set_onerror_1dd52df6279c8dd2: l_,
      __wbg_send_e1d2f71ce4473d1e: e_,
      __wbg_set_onmessage_9eb2cf76e70783ad: h_,
      __wbg_set_binaryType_5c0002dfcf194934: o_,
      __wbg_send_b9d998a91cbc8429: Zn,
      __wbg_new_with_str_sequence_dfd6f579eac5ed31: En,
      __wbg_new_b1280f836646084c: kn,
      __wbg_url_0556640de0fe231b: T_,
      __wbg_close_e323e9eee669c291: Ue,
      __wbg_protocol_069bb430882c6686: Un,
      __wbg_code_98ceeaa5ff83fb0b: $e,
      __wbg_reason_48e6f2ed86d09534: Hn,
      __wbg_wasClean_aa6a78fa841a6301: q_,
      __wbg_addEventListener_6f3a037944400810: Se,
      __wbg_removeEventListener_74e3ac8e219bcdc7: Xn,
      __wbg_set_method_4d69a1a7e34c0aca: u_,
      __wbg_set_signal_2a5bd3615938edbc: m_,
      __wbg_set_headers_97ed66619adb1e3e: f_,
      __wbg_set_credentials_55b92faec8dcc6a4: a_,
      __wbg_set_body_7f56457720e81672: s_,
      __wbg_set_mode_dfc59bbbe25b1d14: g_,
      __wbg_set_cache_9ed01a3813d96de2: i_,
      __wbg_code_b725fad05a5aceb3: ze,
      __wbg_message_e88a8d3ba2b91c2a: ln,
      __wbg_data_5fc79a19e47d1531: De,
      __wbg_set_handle_event_6471b5e5fe16e12f: b_,
      __wbg_abort_89f7368e16055f5f: ye,
      __wbg_new_af86d8f14640f1f3: vn,
      __wbg_abort_b363e6285472a358: xe,
      __wbg_signal_304beac95c8c5ea0: y_,
      __wbg_set_high_water_mark_6b567b5c596d9cc7: d_,
      __wbg_fetch_2998af8c54e0997c: Ye,
      __wbg_get_done_06210bfbda89c407: tn,
      __wbg_get_value_31eb9abef97d98cb: rn,
      __wbg_respond_0196e052b003e1db: Qn,
      __wbg_view_1b637c097280508c: O_,
      __wbg_releaseLock_65f356509fef84ac: Jn,
      __wbg_read_254bf22401498310: Vn,
      __wbg_cancel_bee68d5707c614fb: Ce,
      __wbg_byobRequest_9d8c3b7b2f692560: je,
      __wbg_close_807d553ef8405788: Ne,
      __wbg_enqueue_c3ce0a986a355a8c: Ge,
      __wbg_close_53179a3d37ed525d: Be,
      __wbg_instanceof_Blob_ef93d187bbde5360: bn,
      __wbg_crypto_38df2bab126b63dc: We,
      __wbg_process_44c7a14e11e9f69e: Nn,
      __wbg_versions_276b2795b1c6a219: L_,
      __wbg_node_84ea875411254db1: On,
      __wbg_require_b4edbdcf3e2a1ef0: Yn,
      __wbg_msCrypto_bd5a034af96bcba6: hn,
      __wbg_getRandomValues_c44a50d8cfdaebeb: Ze,
      __wbg_randomFillSync_6c25eac9869eb53c: Pn,
      __wbg_setTimeout_6613a51400c1bf9f: __,
      __wbg_clearTimeout_47a40e3be01ed7a3: qe,
      __wbg_performance_3fcf6e32a7e1ed0a: Bn,
      __wbg_now_e7c6795a7f81e10f: qn,
      __wbg_byteLength_c0cecdd68fab1693: Ae,
      __wbg_byteOffset_3791b0030cc3b490: Fe,
      __wbg_new_from_slice_269e35316ed2d061: Rn,
      __wbg_new_with_length_99887c91eae4abab: Tn,
      __wbg_new_with_byte_offset_and_length_a87e79143162d67f: An,
      __wbg_new_7ddec6de44ff8f5d: Sn,
      __wbg_buffer_8d6798e32d1afd34: Re,
      __wbg_length_56fcd3e2b7e0299d: gn,
      __wbg_prototypesetcall_5f9bdc8d75e07276: $n,
      __wbg_subarray_7c6a0da8f3b4a1ba: j_,
      __wbg_set_24d0fa9e104112f9: t_,
      __wbg_then_837494e384b37459: A_,
      __wbg_instanceof_Uint8Array_abd07d4bd221d50b: dn,
      __wbg_instanceof_ArrayBuffer_53db37b06f6b9afe: an,
      __wbg_now_81363d44c96dd239: Mn,
      __wbg_new_310879b66b6e95e1: xn,
      __wbg_isArray_94898ed3aad6947b: un,
      __wbg_new_1f236d63ba0c4784: mn,
      __wbg_new_02d162bc6cf02f60: pn,
      __wbg_static_accessor_GLOBAL_THIS_02344c9b09eb08a9: S_,
      __wbg_static_accessor_SELF_9b2406c23aeb2023: k_,
      __wbg_static_accessor_GLOBAL_ac6d4ac874d5cd54: v_,
      __wbg_static_accessor_WINDOW_b34d2126934e16ba: I_,
      __wbg_resolve_d17db9352f5a220e: Kn,
      __wbg_get_dcf82ab8aad1a593: _n,
      __wbg_has_ef192b1f278770eb: on,
      __wbg_queueMicrotask_b39ea83c7f01971a: Dn,
      __wbg_queueMicrotask_78d584b53af520f5: Wn,
      __wbg_getRandomValues_76dfc69825c9c552: Qe,
      __wbg___wbindgen_in_07056af4f902c445: be,
      __wbg___wbindgen_throw_9c31b086c2b26051: pe,
      __wbg_Error_bce6d499ff0a4aff: oe,
      __wbg___wbindgen_is_object_b4593df85baada48: de,
      __wbg___wbindgen_is_string_dde0fd9020db4434: ue,
      __wbg___wbindgen_number_get_f73a1244370fcc2c: le,
      __wbg___wbindgen_string_get_d109740c0d18f4d7: he,
      __wbg___wbindgen_boolean_get_2304fb8c853028c8: ie,
      __wbg___wbindgen_is_function_5cd60d5cf78b4eef: fe,
      __wbg___wbindgen_is_undefined_35bb9f4c7fd651d5: ge,
      __wbg___wbindgen_jsval_loose_eq_0ad77b7717db155c: we,
      __wbg__wbg_cb_unref_3fa391f3fcdb55f8: me,
      __wbg___wbindgen_debug_string_edece8177ad01481: ae,
      __wbindgen_cast_0000000000000001: B_,
      __wbindgen_cast_0000000000000002: N_,
      __wbindgen_cast_0000000000000003: U_,
      __wbindgen_cast_0000000000000004: $_,
      __wbindgen_cast_0000000000000005: z_,
      __wbindgen_cast_0000000000000006: W_,
      __wbindgen_cast_0000000000000007: D_,
      __wbindgen_cast_0000000000000008: P_,
      __wbindgen_cast_0000000000000009: V_,
      __wbindgen_cast_000000000000000a: G_,
      __wbindgen_cast_000000000000000b: H_,
      __wbindgen_cast_000000000000000c: J_
    }
  }, re), wt = i.memory, lt = i.__wbg_channel_free, ht = i.__wbg_channelsender_free, pt = i.__wbg_chatnode_free, mt = i.channel_id, yt = i.channel_neighbors, xt = i.channel_receiver, St = i.channel_sender, vt = i.channel_ticket, kt = i.channelsender_broadcast, It = i.channelsender_set_nickame, Rt = i.chatnode_create, jt = i.chatnode_endpoint_id, At = i.chatnode_join, Ft = i.chatnode_spawn, Tt = i.start, Ct = i.__wbg_intounderlyingbytesource_free, Et = i.__wbg_intounderlyingsink_free, Lt = i.__wbg_intounderlyingsource_free, Ot = i.intounderlyingbytesource_autoAllocateChunkSize, Mt = i.intounderlyingbytesource_cancel, qt = i.intounderlyingbytesource_pull, Bt = i.intounderlyingbytesource_start, Nt = i.intounderlyingbytesource_type, Ut = i.intounderlyingsink_abort, $t = i.intounderlyingsink_close, zt = i.intounderlyingsink_write, Wt = i.intounderlyingsource_cancel, Dt = i.intounderlyingsource_pull, Pt = i.ring_core_0_17_14__bn_mul_mont, Vt = i.__wasm_bindgen_func_elem_16707, Gt = i.__wasm_bindgen_func_elem_16726, Ht = i.__wasm_bindgen_func_elem_7743, Jt = i.__wasm_bindgen_func_elem_4305, Xt = i.__wasm_bindgen_func_elem_9402, Yt = i.__wasm_bindgen_func_elem_7523, Kt = i.__wasm_bindgen_func_elem_8670, Qt = i.__wasm_bindgen_func_elem_8704, Zt = i.__wasm_bindgen_func_elem_16580, er = i.__wbindgen_export, nr = i.__wbindgen_export2, _r = i.__wbindgen_export3, tr = i.__wbindgen_export4, rr = i.__wbindgen_export5, cr = i.__wbindgen_add_to_stack_pointer, ee = i.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_16580: Zt,
    __wasm_bindgen_func_elem_16707: Vt,
    __wasm_bindgen_func_elem_16726: Gt,
    __wasm_bindgen_func_elem_4305: Jt,
    __wasm_bindgen_func_elem_7523: Yt,
    __wasm_bindgen_func_elem_7743: Ht,
    __wasm_bindgen_func_elem_8670: Kt,
    __wasm_bindgen_func_elem_8704: Qt,
    __wasm_bindgen_func_elem_9402: Xt,
    __wbg_channel_free: lt,
    __wbg_channelsender_free: ht,
    __wbg_chatnode_free: pt,
    __wbg_intounderlyingbytesource_free: Ct,
    __wbg_intounderlyingsink_free: Et,
    __wbg_intounderlyingsource_free: Lt,
    __wbindgen_add_to_stack_pointer: cr,
    __wbindgen_export: er,
    __wbindgen_export2: nr,
    __wbindgen_export3: _r,
    __wbindgen_export4: tr,
    __wbindgen_export5: rr,
    __wbindgen_start: ee,
    channel_id: mt,
    channel_neighbors: yt,
    channel_receiver: xt,
    channel_sender: St,
    channel_ticket: vt,
    channelsender_broadcast: kt,
    channelsender_set_nickame: It,
    chatnode_create: Rt,
    chatnode_endpoint_id: jt,
    chatnode_join: At,
    chatnode_spawn: Ft,
    intounderlyingbytesource_autoAllocateChunkSize: Ot,
    intounderlyingbytesource_cancel: Mt,
    intounderlyingbytesource_pull: qt,
    intounderlyingbytesource_start: Bt,
    intounderlyingbytesource_type: Nt,
    intounderlyingsink_abort: Ut,
    intounderlyingsink_close: $t,
    intounderlyingsink_write: zt,
    intounderlyingsource_cancel: Wt,
    intounderlyingsource_pull: Dt,
    memory: wt,
    ring_core_0_17_14__bn_mul_mont: Pt,
    start: Tt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  gt(or);
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
      let a, b = new Promise((j) => {
        a = j;
      });
      const g = this.chatNode.endpoint_id(), y = {
        id: g,
        name: _,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: V.Myself
      }, u = {
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
      u.peers.set(g, y), this.channels.set(t, u);
      const I = async () => {
        const j = n.receiver.getReader();
        for (; ; ) {
          const { done: S, value: U } = await j.read();
          if (S) break;
          const l = U;
          if (console.debug("channel event", t.substring(0, 8), l), l.type === "messageReceived") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            u.peers.set(l.from, v);
            const $ = {
              id: Z(u),
              sender: l.from,
              content: l.text
            };
            u.messages.push($);
            const te = H(u, $);
            for (const P of u.subscribers) P(te);
            for (const P of u.peerSubscribers) P();
          } else if (l.type === "presence") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            u.peers.set(l.from, v);
            for (const $ of u.peerSubscribers) $();
          } else if (l.type === "joined") {
            C.info(`joined channel ${t}`), u.neighbors += l.neighbors.length;
            for (const v of u.neighborSubscribers) v(u.neighbors);
          } else if (l.type === "neighborUp") {
            u.neighbors += 1;
            for (const v of u.neighborSubscribers) v(u.neighbors);
          } else if (l.type === "neighborDown") {
            u.neighbors -= 1;
            for (const v of u.neighborSubscribers) v(u.neighbors);
          }
        }
      }, _e = async () => {
        for (; ; ) {
          const j = /* @__PURE__ */ new Date();
          for (const S of u.peers.values()) {
            if (S.id === g) {
              S.lastSeen = j;
              continue;
            }
            const U = (j.getTime() - S.lastSeen.getTime()) / 1e3;
            U > 20 ? S.status = "offline" : U > 10 ? S.status = "away" : S.status = "online";
          }
          await new Promise((S) => setTimeout(S, 1e3));
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
      for (const g of t.subscribers) g(b);
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
