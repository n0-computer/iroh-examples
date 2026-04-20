var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as C, P as V, __tla as __tla_0 } from "./index-DV9NO7m1.js";
let ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const re = "" + new URL("chat_browser_bg-8AsuY3_F.wasm", import.meta.url).href, ce = async (e = {}, n) => {
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
      return _.__wbg_ptr = n, Y.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Y.unregister(this), n;
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
        var c = f().getInt32(I + 4 * 0, true), a = f().getInt32(I + 4 * 1, true), b = f().getInt32(I + 4 * 2, true), g = f().getInt32(I + 4 * 3, true), y = c, d = a;
        if (g) throw y = 0, d = 0, w(b);
        return _ = y, t = d, h(y, d);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export4(_, t, 1);
      }
    }
  }
  Symbol.dispose && (M.prototype[Symbol.dispose] = M.prototype.free);
  class q {
    static __wrap(n) {
      n = n >>> 0;
      const _ = Object.create(q.prototype);
      return _.__wbg_ptr = n, X.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, X.unregister(this), n;
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
  function ye(e) {
    r(e).abort();
  }
  function xe(e, n) {
    r(e).abort(r(n));
  }
  function Se() {
    return u(function(e, n, _, t) {
      r(e).addEventListener(h(n, _), r(t));
    }, arguments);
  }
  function ve() {
    return u(function(e, n, _, t, c) {
      r(e).append(h(n, _), h(t, c));
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
    return x(n) ? 0 : s(n);
  }
  function Re(e) {
    const n = r(e).buffer;
    return s(n);
  }
  function Ae(e) {
    const n = r(e).byobRequest;
    return x(n) ? 0 : s(n);
  }
  function Fe(e) {
    return r(e).byteLength;
  }
  function Te(e) {
    return r(e).byteOffset;
  }
  function je() {
    return u(function(e, n, _) {
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
    const n = T.__wrap(e);
    return s(n);
  }
  function Me(e) {
    const n = clearTimeout(w(e));
    return s(n);
  }
  function qe() {
    return u(function(e, n) {
      r(e).clearTimeout(w(n));
    }, arguments);
  }
  function Be() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ne() {
    return u(function(e) {
      r(e).close();
    }, arguments);
  }
  function Ue() {
    return u(function(e) {
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
    return u(function(e, n) {
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
  function Ye(e, n) {
    let _, t;
    try {
      _ = e, t = n, console.error(h(e, n));
    } finally {
      o.__wbindgen_export4(_, t, 1);
    }
  }
  function Xe(e, n) {
    const _ = r(e).fetch(r(n));
    return s(_);
  }
  function Ke(e) {
    const n = fetch(r(e));
    return s(n);
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
  function _n(e, n) {
    const _ = r(e)[n >>> 0];
    return s(_);
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
  function dn(e) {
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
  function pn(e) {
    const n = new Uint8Array(r(e));
    return s(n);
  }
  function mn() {
    return u(function() {
      const e = new Headers();
      return s(e);
    }, arguments);
  }
  function yn() {
    const e = new Error();
    return s(e);
  }
  function xn() {
    return u(function(e, n) {
      const _ = new WebSocket(h(e, n));
      return s(_);
    }, arguments);
  }
  function Sn(e, n) {
    const _ = new Error(h(e, n));
    return s(_);
  }
  function vn() {
    const e = new Array();
    return s(e);
  }
  function kn() {
    return u(function() {
      const e = new AbortController();
      return s(e);
    }, arguments);
  }
  function In() {
    const e = new Object();
    return s(e);
  }
  function Rn(e, n) {
    const _ = new Uint8Array(j(e, n));
    return s(_);
  }
  function An(e, n) {
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
  function Fn(e, n, _) {
    const t = new Uint8Array(r(e), n >>> 0, _ >>> 0);
    return s(t);
  }
  function Tn(e, n) {
    const _ = new ReadableStream(B.__wrap(e), w(n));
    return s(_);
  }
  function jn(e) {
    const n = new Uint8Array(e >>> 0);
    return s(n);
  }
  function Cn() {
    return u(function(e, n, _) {
      const t = new Request(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function En() {
    return u(function(e, n, _) {
      const t = new WebSocket(h(e, n), r(_));
      return s(t);
    }, arguments);
  }
  function Ln() {
    return u(function(e) {
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
    Uint8Array.prototype.set.call(j(e, n), r(_));
  }
  function zn(e, n) {
    return r(e).push(r(n));
  }
  function Wn(e) {
    queueMicrotask(r(e));
  }
  function Dn(e) {
    const n = r(e).queueMicrotask;
    return s(n);
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
    const _ = r(n).reason, t = m(_, o.__wbindgen_export, o.__wbindgen_export2), c = p;
    f().setInt32(e + 4 * 1, c, true), f().setInt32(e + 4 * 0, t, true);
  }
  function Jn(e) {
    r(e).releaseLock();
  }
  function Yn() {
    return u(function(e, n, _, t) {
      r(e).removeEventListener(h(n, _), r(t));
    }, arguments);
  }
  function Xn() {
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
      r(e).send(h(n, _));
    }, arguments);
  }
  function e_() {
    return u(function(e, n, _) {
      r(e).send(j(n, _));
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
    r(e).set(j(n, _));
  }
  function c_(e, n, _) {
    r(e)[w(n)] = w(_);
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
  function u_(e, n) {
    r(e).highWaterMark = n;
  }
  function d_(e, n, _) {
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
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : s(e);
  }
  function v_() {
    const e = typeof globalThis > "u" ? null : globalThis;
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
  function A_(e, n, _) {
    const t = r(e).subarray(n >>> 0, _ >>> 0);
    return s(t);
  }
  function F_(e, n, _) {
    const t = r(e).then(r(n), r(_));
    return s(t);
  }
  function T_(e, n) {
    const _ = r(e).then(r(n));
    return s(_);
  }
  function j_(e, n) {
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
    const _ = j(e, n);
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
  function Y_(e) {
    const n = r(e);
    return s(n);
  }
  function X_(e) {
    w(e);
  }
  function K_(e, n) {
    o.__wasm_bindgen_func_elem_7501(e, n);
  }
  function Q_(e, n) {
    o.__wasm_bindgen_func_elem_7913(e, n);
  }
  function Z_(e, n) {
    o.__wasm_bindgen_func_elem_7958(e, n);
  }
  function et(e, n) {
    o.__wasm_bindgen_func_elem_16470(e, n);
  }
  function nt(e, n, _) {
    o.__wasm_bindgen_func_elem_7718(e, n, s(_));
  }
  function _t(e, n, _) {
    o.__wasm_bindgen_func_elem_4291(e, n, s(_));
  }
  function tt(e, n, _) {
    o.__wasm_bindgen_func_elem_8842(e, n, s(_));
  }
  function rt(e, n, _) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wasm_bindgen_func_elem_16599(a, e, n, s(_));
      var t = f().getInt32(a + 4 * 0, true), c = f().getInt32(a + 4 * 1, true);
      if (c) throw w(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ct(e, n, _, t) {
    o.__wasm_bindgen_func_elem_16617(e, n, s(_), s(t));
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
  ], Y = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1)), X = typeof FinalizationRegistry > "u" ? {
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
  function j(e, n) {
    return e = e >>> 0, E().subarray(e / 1, e / 1 + n);
  }
  let F = null;
  function f() {
    return (F === null || F.buffer.detached === true || F.buffer.detached === void 0 && F.buffer !== o.memory.buffer) && (F = new DataView(o.memory.buffer)), F;
  }
  function h(e, n) {
    return e = e >>> 0, dt(e, n);
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
  const ut = 2146435072;
  let G = 0;
  function dt(e, n) {
    return G += n, G >= ut && (W = new TextDecoder("utf-8", {
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
      __wbindgen_object_clone_ref: Y_,
      __wbindgen_object_drop_ref: X_,
      __wbg_set_3bf1de9fab0cd644: t_,
      __wbg_get_with_ref_key_6412cf3094599694: cn,
      __wbg_set_6be42768c690e380: c_,
      __wbg_get_8360291721e2339f: _n,
      __wbg_String_8564e559799eccda: se,
      __wbg_new_227d7c05414eb861: yn,
      __wbg_stack_3b0d974bbf31e44f: x_,
      __wbg_error_a6fa202b58aa1cd3: Ye,
      __wbg_log_7a0760e115750083: wn,
      __wbg_warn_3a37cdd7216f1479: M_,
      __wbg_debug_eaef3b49d572d680: Pe,
      __wbg_error_71b0e71161a5f3a0: Je,
      __wbg_push_471a5b068a5295f6: zn,
      __wbg_next_0340c4ae324393c3: Ln,
      __wbg_done_9158f7cc8751ba32: Ve,
      __wbg_value_ee3a06f4579184fa: E_,
      __wbg_setTimeout_b188b3bcc8977c7d: __,
      __wbg_clearTimeout_2256f1e7b94ef517: Me,
      __wbg_fetch_43b2f110608a59ff: Ke,
      __wbg_getReader_9facd4f899beac89: en,
      __wbg_new_with_into_underlying_source_fd904252f385f59c: Tn,
      __wbg_then_792e0c862b060889: F_,
      __wbg_catch_e9362815fd0b24cf: Ee,
      __wbg_new_typed_323f37fd55ab048d: An,
      __wbg_call_a24592a6f349a97e: je,
      __wbg_new_15a4889b4b90734d: mn,
      __wbg_append_e8fc56ce7c00e874: ve,
      __wbg_entries_bf727fcd7bf35a41: He,
      __wbg_new_with_str_and_init_897be1708e42f39d: Cn,
      __wbg_instanceof_Response_9b2d111407865ff2: fn,
      __wbg_arrayBuffer_848c392b70c67d3d: ke,
      __wbg_url_2bf741820e6563a0: j_,
      __wbg_body_0c3a51aec038a31a: Ie,
      __wbg_status_43e0d2f15b22d69f: R_,
      __wbg_headers_6022deb4e576fb8e: sn,
      __wbg_set_onopen_cd47b8fb1d92dee9: p_,
      __wbg_readyState_c78e609c7de3b381: Gn,
      __wbg_set_onclose_17fa3bbcc4ba3541: w_,
      __wbg_set_onerror_da99c4232662a084: l_,
      __wbg_send_15358dbe221c6258: Zn,
      __wbg_set_onmessage_c1db358b9c38e3f1: h_,
      __wbg_set_binaryType_770e68648ca5e83d: o_,
      __wbg_send_186c85704c7f2d00: e_,
      __wbg_new_with_str_sequence_6453b755acdcc2e7: En,
      __wbg_new_2a6e9133304ae2bf: xn,
      __wbg_url_7e153eff46938d20: C_,
      __wbg_close_88106990eea7f544: Be,
      __wbg_protocol_b901d6b01a8d0d83: Un,
      __wbg_code_c4f315d8dc91de14: $e,
      __wbg_reason_e943590a4ef0d587: Hn,
      __wbg_wasClean_bd109e45fffa711a: q_,
      __wbg_addEventListener_872d6537eadf7bec: Se,
      __wbg_removeEventListener_0634324250b098cc: Yn,
      __wbg_set_method_c9f1f985f6b6c427: d_,
      __wbg_set_signal_1d4e73c2305a0e7c: m_,
      __wbg_set_headers_50fc01786240a440: f_,
      __wbg_set_credentials_6577be90e0e85eb6: a_,
      __wbg_set_body_be11680f34217f75: s_,
      __wbg_set_mode_5e08d503428c06b9: g_,
      __wbg_set_cache_968edea422613d1b: i_,
      __wbg_code_e2d14bb68011f972: ze,
      __wbg_message_ec476bcf269dd7c4: ln,
      __wbg_data_bb9dffdd1e99cf2d: De,
      __wbg_set_handle_event_18c81b21e4853d37: b_,
      __wbg_abort_d53712380a54cc81: xe,
      __wbg_new_98c22165a42231aa: kn,
      __wbg_abort_4ce5b484434ef6fd: ye,
      __wbg_signal_fdc54643b47bf85b: y_,
      __wbg_set_high_water_mark_0ac7cc8f39856bad: u_,
      __wbg_fetch_0d322c0aed196b8b: Xe,
      __wbg_get_done_282bca5d3f90e0a8: tn,
      __wbg_get_value_65a7a2c60b42fd75: rn,
      __wbg_respond_008ca9525ae22847: Qn,
      __wbg_view_701664ffb3b1ce67: O_,
      __wbg_releaseLock_9baaf3ccc5cfad69: Jn,
      __wbg_read_ddc2d178d2e57272: Vn,
      __wbg_cancel_ceb1bda02e29f0a9: Ce,
      __wbg_byobRequest_dc6aed9db01b12c6: Ae,
      __wbg_close_e6c8977a002e9e13: Ne,
      __wbg_enqueue_4767ce322820c94d: Ge,
      __wbg_close_fb954dfaf67b5732: Ue,
      __wbg_instanceof_Blob_10148a11a16aee87: bn,
      __wbg_crypto_38df2bab126b63dc: We,
      __wbg_process_44c7a14e11e9f69e: Nn,
      __wbg_versions_276b2795b1c6a219: L_,
      __wbg_node_84ea875411254db1: On,
      __wbg_require_b4edbdcf3e2a1ef0: Xn,
      __wbg_msCrypto_bd5a034af96bcba6: hn,
      __wbg_getRandomValues_c44a50d8cfdaebeb: Ze,
      __wbg_randomFillSync_6c25eac9869eb53c: Pn,
      __wbg_setTimeout_6613a51400c1bf9f: n_,
      __wbg_clearTimeout_47a40e3be01ed7a3: qe,
      __wbg_performance_3fcf6e32a7e1ed0a: Bn,
      __wbg_now_e7c6795a7f81e10f: qn,
      __wbg_byteLength_3e660e5661f3327e: Fe,
      __wbg_byteOffset_ecd62abe44dd28d4: Te,
      __wbg_new_from_slice_b5ea43e23f6008c0: Rn,
      __wbg_new_with_length_8c854e41ea4dae9b: jn,
      __wbg_new_with_byte_offset_and_length_01848e8d6a3d49ad: Fn,
      __wbg_new_0c7403db6e782f19: pn,
      __wbg_buffer_d0f5ea0926a691fd: Re,
      __wbg_length_9f1775224cf1d815: gn,
      __wbg_prototypesetcall_a6b02eb00b0f4ce2: $n,
      __wbg_subarray_f8ca46a25b1f5e0d: A_,
      __wbg_set_3d484eb794afec82: r_,
      __wbg_then_8e16ee11f05e4827: T_,
      __wbg_instanceof_Uint8Array_152ba1f289edcf3f: un,
      __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3: an,
      __wbg_now_a9b7df1cbee90986: Mn,
      __wbg_new_682678e2f47e32bc: vn,
      __wbg_isArray_c3109d14ffc06469: dn,
      __wbg_new_5e360d2ff7b9e1c3: Sn,
      __wbg_new_aa8d0fa9762c29bd: In,
      __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: v_,
      __wbg_static_accessor_SELF_e445c1c7484aecc3: k_,
      __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: S_,
      __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: I_,
      __wbg_resolve_e6c466bc1052f16c: Kn,
      __wbg_get_6011fa3a58f61074: nn,
      __wbg_has_880f1d472f7cecba: on,
      __wbg_queueMicrotask_5d15a957e6aa920e: Wn,
      __wbg_queueMicrotask_f8819e5ffc402f36: Dn,
      __wbg_getRandomValues_76dfc69825c9c552: Qe,
      __wbg___wbindgen_in_a5d8b22e52b24dd1: be,
      __wbg___wbindgen_throw_6b64449b9b9ed33c: pe,
      __wbg_Error_960c155d3d49e4c2: oe,
      __wbg___wbindgen_is_object_63322ec0cd6ea4ef: ue,
      __wbg___wbindgen_is_string_6df3bf7ef1164ed3: de,
      __wbg___wbindgen_number_get_c7f42aed0525c451: le,
      __wbg___wbindgen_string_get_7ed5322991caaec5: he,
      __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff: ie,
      __wbg___wbindgen_is_function_3baa9db1a987f47d: fe,
      __wbg___wbindgen_is_undefined_29a43b4d42920abd: ge,
      __wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c: we,
      __wbg__wbg_cb_unref_b46c9b5a9f08ec37: me,
      __wbg___wbindgen_debug_string_ab4b34d23d6778bd: ae,
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
  }, re), wt = i.memory, lt = i.__wbg_channel_free, ht = i.__wbg_channelsender_free, pt = i.__wbg_chatnode_free, mt = i.channel_id, yt = i.channel_neighbors, xt = i.channel_receiver, St = i.channel_sender, vt = i.channel_ticket, kt = i.channelsender_broadcast, It = i.channelsender_set_nickame, Rt = i.chatnode_create, At = i.chatnode_endpoint_id, Ft = i.chatnode_join, Tt = i.chatnode_spawn, jt = i.start, Ct = i.__wbg_intounderlyingbytesource_free, Et = i.__wbg_intounderlyingsink_free, Lt = i.__wbg_intounderlyingsource_free, Ot = i.intounderlyingbytesource_autoAllocateChunkSize, Mt = i.intounderlyingbytesource_cancel, qt = i.intounderlyingbytesource_pull, Bt = i.intounderlyingbytesource_start, Nt = i.intounderlyingbytesource_type, Ut = i.intounderlyingsink_abort, $t = i.intounderlyingsink_close, zt = i.intounderlyingsink_write, Wt = i.intounderlyingsource_cancel, Dt = i.intounderlyingsource_pull, Pt = i.ring_core_0_17_14__bn_mul_mont, Vt = i.__wasm_bindgen_func_elem_16599, Gt = i.__wasm_bindgen_func_elem_16617, Ht = i.__wasm_bindgen_func_elem_7718, Jt = i.__wasm_bindgen_func_elem_4291, Yt = i.__wasm_bindgen_func_elem_8842, Xt = i.__wasm_bindgen_func_elem_7501, Kt = i.__wasm_bindgen_func_elem_7913, Qt = i.__wasm_bindgen_func_elem_7958, Zt = i.__wasm_bindgen_func_elem_16470, er = i.__wbindgen_export, nr = i.__wbindgen_export2, _r = i.__wbindgen_export3, tr = i.__wbindgen_export4, rr = i.__wbindgen_export5, cr = i.__wbindgen_add_to_stack_pointer, ee = i.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_16470: Zt,
    __wasm_bindgen_func_elem_16599: Vt,
    __wasm_bindgen_func_elem_16617: Gt,
    __wasm_bindgen_func_elem_4291: Jt,
    __wasm_bindgen_func_elem_7501: Xt,
    __wasm_bindgen_func_elem_7718: Ht,
    __wasm_bindgen_func_elem_7913: Kt,
    __wasm_bindgen_func_elem_7958: Qt,
    __wasm_bindgen_func_elem_8842: Yt,
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
    chatnode_endpoint_id: At,
    chatnode_join: Ft,
    chatnode_spawn: Tt,
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
    start: jt
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
      let a, b = new Promise((A) => {
        a = A;
      });
      const g = this.chatNode.endpoint_id(), y = {
        id: g,
        name: _,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: V.Myself
      }, d = {
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
      d.peers.set(g, y), this.channels.set(t, d);
      const I = async () => {
        const A = n.receiver.getReader();
        for (; ; ) {
          const { done: S, value: U } = await A.read();
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
            d.peers.set(l.from, v);
            const $ = {
              id: Z(d),
              sender: l.from,
              content: l.text
            };
            d.messages.push($);
            const te = H(d, $);
            for (const P of d.subscribers) P(te);
            for (const P of d.peerSubscribers) P();
          } else if (l.type === "presence") {
            const v = {
              id: l.from,
              name: l.nickname,
              lastSeen: new Date(l.sentTimestamp / 1e3),
              status: "online",
              role: V.RemoteNode
            };
            d.peers.set(l.from, v);
            for (const $ of d.peerSubscribers) $();
          } else if (l.type === "joined") {
            C.info(`joined channel ${t}`), d.neighbors += l.neighbors.length;
            for (const v of d.neighborSubscribers) v(d.neighbors);
          } else if (l.type === "neighborUp") {
            d.neighbors += 1;
            for (const v of d.neighborSubscribers) v(d.neighbors);
          } else if (l.type === "neighborDown") {
            d.neighbors -= 1;
            for (const v of d.neighborSubscribers) v(d.neighbors);
          }
        }
      }, _e = async () => {
        for (; ; ) {
          const A = /* @__PURE__ */ new Date();
          for (const S of d.peers.values()) {
            if (S.id === g) {
              S.lastSeen = A;
              continue;
            }
            const U = (A.getTime() - S.lastSeen.getTime()) / 1e3;
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
