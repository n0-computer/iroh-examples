var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as R, P as z, __tla as __tla_0 } from "./index-DFJWiLpv.js";
let X;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const ee = "" + new URL("chat_browser_bg-Kb7oLOcN.wasm", import.meta.url).href, ne = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let r;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const c = atob(_);
        r = new Uint8Array(c.length);
        for (let i = 0; i < c.length; i++) r[i] = c.charCodeAt(i);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(r, e);
    } else {
      const _ = await fetch(n), r = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && r.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(_, e);
      else {
        const c = await _.arrayBuffer();
        t = await WebAssembly.instantiate(c, e);
      }
    }
    return t.instance.exports;
  };
  let o;
  function te(e) {
    o = e;
  }
  let l = 0, C = null;
  function F() {
    return (C === null || C.byteLength === 0) && (C = new Uint8Array(o.memory.buffer)), C;
  }
  const _e = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let A = new _e("utf-8");
  const re = typeof A.encodeInto == "function" ? function(e, n) {
    return A.encodeInto(e, n);
  } : function(e, n) {
    const t = A.encode(e);
    return n.set(t), {
      read: e.length,
      written: t.length
    };
  };
  function h(e, n, t) {
    if (t === void 0) {
      const b = A.encode(e), w = n(b.length, 1) >>> 0;
      return F().subarray(w, w + b.length).set(b), l = b.length, w;
    }
    let _ = e.length, r = n(_, 1) >>> 0;
    const c = F();
    let i = 0;
    for (; i < _; i++) {
      const b = e.charCodeAt(i);
      if (b > 127) break;
      c[r + i] = b;
    }
    if (i !== _) {
      i !== 0 && (e = e.slice(i)), r = t(r, _, _ = i + e.length * 3, 1) >>> 0;
      const b = F().subarray(r + i, r + _), w = re(e, b);
      i += w.written, r = t(r, _, i, 1) >>> 0;
    }
    return l = i, r;
  }
  let S = null;
  function a() {
    return (S === null || S.buffer.detached === true || S.buffer.detached === void 0 && S.buffer !== o.memory.buffer) && (S = new DataView(o.memory.buffer)), S;
  }
  const oe = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let K = new oe("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  K.decode();
  function f(e, n) {
    return e = e >>> 0, K.decode(F().subarray(e, e + n));
  }
  function v(e) {
    const n = o.__wbindgen_export_3();
    return o.__wbindgen_export_4.set(n, e), n;
  }
  function u(e, n) {
    try {
      return e.apply(this, n);
    } catch (t) {
      const _ = v(t);
      o.__wbindgen_export_2(_);
    }
  }
  function p(e) {
    return e == null;
  }
  function I(e, n) {
    e = e >>> 0;
    const t = a(), _ = [];
    for (let r = e; r < e + 4 * n; r += 4) _.push(o.__wbindgen_export_4.get(t.getUint32(r, true)));
    return o.__wbindgen_export_5(e, n), _;
  }
  function ce(e, n) {
    return e = e >>> 0, F().subarray(e / 1, e / 1 + n);
  }
  const L = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => {
    o.__wbindgen_export_7.get(e.dtor)(e.a, e.b);
  });
  function T(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, c = (...i) => {
      r.cnt++;
      const b = r.a;
      r.a = 0;
      try {
        return _(b, r.b, ...i);
      } finally {
        --r.cnt === 0 ? (o.__wbindgen_export_7.get(r.dtor)(b, r.b), L.unregister(r)) : r.a = b;
      }
    };
    return c.original = r, L.register(c, r, r), c;
  }
  function se(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, c = (...i) => {
      r.cnt++;
      try {
        return _(r.a, r.b, ...i);
      } finally {
        --r.cnt === 0 && (o.__wbindgen_export_7.get(r.dtor)(r.a, r.b), r.a = 0, L.unregister(r));
      }
    };
    return c.original = r, L.register(c, r, r), c;
  }
  function B(e) {
    const n = typeof e;
    if (n == "number" || n == "boolean" || e == null) return `${e}`;
    if (n == "string") return `"${e}"`;
    if (n == "symbol") {
      const r = e.description;
      return r == null ? "Symbol" : `Symbol(${r})`;
    }
    if (n == "function") {
      const r = e.name;
      return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
    }
    if (Array.isArray(e)) {
      const r = e.length;
      let c = "[";
      r > 0 && (c += B(e[0]));
      for (let i = 1; i < r; i++) c += ", " + B(e[i]);
      return c += "]", c;
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
  function W(e) {
    const n = o.__wbindgen_export_4.get(e);
    return o.__wbindgen_export_8(e), n;
  }
  function O(e, n, t) {
    o.closure903_externref_shim(e, n, t);
  }
  function ie(e, n) {
    o.__wbindgen_export_10(e, n);
  }
  function ae(e, n) {
    o.__wbindgen_export_11(e, n);
  }
  function be(e, n, t) {
    o.closure2894_externref_shim(e, n, t);
  }
  function ue(e, n, t, _) {
    o.closure3019_externref_shim(e, n, t, _);
  }
  const de = [
    "blob",
    "arraybuffer"
  ], fe = [
    "omit",
    "same-origin",
    "include"
  ], ge = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], P = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(M.prototype);
      return t.__wbg_ptr = n, P.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, P.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return D.__wrap(n);
    }
    get receiver() {
      return o.channel_receiver(this.__wbg_ptr);
    }
    ticket(n) {
      let t, _;
      try {
        const m = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(m, this.__wbg_ptr, n);
        var r = a().getInt32(m + 4 * 0, true), c = a().getInt32(m + 4 * 1, true), i = a().getInt32(m + 4 * 2, true), b = a().getInt32(m + 4 * 3, true), w = r, d = c;
        if (b) throw w = 0, d = 0, W(i);
        return t = w, _ = d, f(w, d);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(c, this.__wbg_ptr);
        var _ = a().getInt32(c + 4 * 0, true), r = a().getInt32(c + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    neighbors() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_neighbors(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = I(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  const V = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class D {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(D.prototype);
      return t.__wbg_ptr = n, V.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, V.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channelsender_free(n, 0);
    }
    broadcast(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = l;
      return o.channelsender_broadcast(this.__wbg_ptr, t, _);
    }
    set_nickame(n) {
      const t = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), _ = l;
      o.channelsender_set_nickame(this.__wbg_ptr, t, _);
    }
  }
  const G = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class N {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(N.prototype);
      return t.__wbg_ptr = n, G.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, G.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_chatnode_free(n, 0);
    }
    static spawn() {
      return o.chatnode_spawn();
    }
    node_id() {
      let n, t;
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_node_id(c, this.__wbg_ptr);
        var _ = a().getInt32(c + 4 * 0, true), r = a().getInt32(c + 4 * 1, true);
        return n = _, t = r, f(_, r);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(n, t, 1);
      }
    }
    remote_info() {
      try {
        const r = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_remote_info(r, this.__wbg_ptr);
        var n = a().getInt32(r + 4 * 0, true), t = a().getInt32(r + 4 * 1, true), _ = I(n, t).slice();
        return o.__wbindgen_export_6(n, t * 4, 4), _;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    create(n) {
      try {
        const c = o.__wbindgen_add_to_stack_pointer(-16), i = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), b = l;
        o.chatnode_create(c, this.__wbg_ptr, i, b);
        var t = a().getInt32(c + 4 * 0, true), _ = a().getInt32(c + 4 * 1, true), r = a().getInt32(c + 4 * 2, true);
        if (r) throw W(_);
        return M.__wrap(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    join(n, t) {
      try {
        const i = o.__wbindgen_add_to_stack_pointer(-16), b = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), w = l, d = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), m = l;
        o.chatnode_join(i, this.__wbg_ptr, b, w, d, m);
        var _ = a().getInt32(i + 4 * 0, true), r = a().getInt32(i + 4 * 1, true), c = a().getInt32(i + 4 * 2, true);
        if (c) throw W(r);
        return M.__wrap(_);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const H = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class $ {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create($.prototype);
      return t.__wbg_ptr = n, H.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, H.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_intounderlyingsource_free(n, 0);
    }
    pull(n) {
      return o.intounderlyingsource_pull(this.__wbg_ptr, n);
    }
    cancel() {
      const n = this.__destroy_into_raw();
      o.intounderlyingsource_cancel(n);
    }
  }
  function we(e, n) {
    const t = String(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function le(e) {
    e.abort();
  }
  function he() {
    return u(function(e, n, t, _) {
      e.addEventListener(f(n, t), _);
    }, arguments);
  }
  function pe() {
    return u(function(e, n, t, _, r) {
      e.append(f(n, t), f(_, r));
    }, arguments);
  }
  function ye() {
    return u(function(e) {
      return e.arrayBuffer();
    }, arguments);
  }
  function me(e) {
    const n = e.body;
    return p(n) ? 0 : v(n);
  }
  function xe(e) {
    return e.buffer;
  }
  function ve(e) {
    return e.buffer;
  }
  function ke(e) {
    const n = e.byobRequest;
    return p(n) ? 0 : v(n);
  }
  function Se(e) {
    return e.byteLength;
  }
  function Ie(e) {
    return e.byteOffset;
  }
  function Te() {
    return u(function(e, n) {
      return e.call(n);
    }, arguments);
  }
  function Re() {
    return u(function(e, n, t) {
      return e.call(n, t);
    }, arguments);
  }
  function Fe(e) {
    return e.cancel();
  }
  function je(e, n) {
    return e.catch(n);
  }
  function Ee(e) {
    return N.__wrap(e);
  }
  function Ce(e) {
    return clearTimeout(e);
  }
  function Ae() {
    return u(function(e, n) {
      e.clearTimeout(n);
    }, arguments);
  }
  function Le() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function Me() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function Oe() {
    return u(function(e) {
      e.close();
    }, arguments);
  }
  function Ne() {
    return u(function(e, n, t, _) {
      e.close(n, f(t, _));
    }, arguments);
  }
  function qe(e) {
    return e.code;
  }
  function ze(e) {
    return e.crypto;
  }
  function Ue(e) {
    return e.data;
  }
  function Be(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.debug(...t);
  }
  function We(e) {
    return e.done;
  }
  function De() {
    return u(function(e, n) {
      e.enqueue(n);
    }, arguments);
  }
  function $e(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(f(e, n));
    } finally {
      o.__wbindgen_export_6(t, _, 1);
    }
  }
  function Pe(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.error(...t);
  }
  function Ve(e) {
    return fetch(e);
  }
  function Ge(e, n) {
    return e.fetch(n);
  }
  function He() {
    return u(function(e, n) {
      e.getRandomValues(n);
    }, arguments);
  }
  function Je() {
    return u(function(e) {
      return e.getReader();
    }, arguments);
  }
  function Ke(e) {
    return e.getTime();
  }
  function Qe() {
    return u(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }
  function Xe(e) {
    const n = e.done;
    return p(n) ? 16777215 : n ? 1 : 0;
  }
  function Ye(e) {
    return e.value;
  }
  function Ze(e, n) {
    return e[n];
  }
  function en() {
    return u(function(e, n) {
      return Reflect.has(e, n);
    }, arguments);
  }
  function nn(e) {
    return e.headers;
  }
  function tn(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function _n(e) {
    let n;
    try {
      n = e instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function rn(e) {
    let n;
    try {
      n = e instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function on(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function cn() {
    return Symbol.iterator;
  }
  function sn(e) {
    return e.length;
  }
  function an(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.log(...t);
  }
  function bn(e) {
    return e.msCrypto;
  }
  function un() {
    return /* @__PURE__ */ new Date();
  }
  function dn() {
    return u(function() {
      return new Headers();
    }, arguments);
  }
  function fn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (c, i) => {
        const b = t.a;
        t.a = 0;
        try {
          return ue(b, t.b, c, i);
        } finally {
          t.a = b;
        }
      };
      return new Promise(_);
    } finally {
      t.a = t.b = 0;
    }
  }
  function gn() {
    return new Object();
  }
  function wn() {
    return /* @__PURE__ */ new Map();
  }
  function ln() {
    return new Array();
  }
  function hn() {
    return new Error();
  }
  function pn() {
    return u(function(e, n) {
      return new WebSocket(f(e, n));
    }, arguments);
  }
  function yn(e) {
    return new Uint8Array(e);
  }
  function mn(e, n) {
    return new Error(f(e, n));
  }
  function xn() {
    return u(function() {
      return new AbortController();
    }, arguments);
  }
  function vn(e, n) {
    return new Function(f(e, n));
  }
  function kn(e, n, t) {
    return new Uint8Array(e, n >>> 0, t >>> 0);
  }
  function Sn(e, n) {
    return new ReadableStream($.__wrap(e), n);
  }
  function In(e) {
    return new Uint8Array(e >>> 0);
  }
  function Tn() {
    return u(function(e, n, t) {
      return new Request(f(e, n), t);
    }, arguments);
  }
  function Rn(e) {
    return e.next;
  }
  function Fn() {
    return u(function(e) {
      return e.next();
    }, arguments);
  }
  function jn(e) {
    return e.node;
  }
  function En(e) {
    return e.now();
  }
  function Cn() {
    return Date.now();
  }
  function An(e) {
    return e.performance;
  }
  function Ln(e) {
    return e.process;
  }
  function Mn(e) {
    queueMicrotask(e);
  }
  function On(e) {
    return e.queueMicrotask;
  }
  function Nn() {
    return u(function(e, n) {
      e.randomFillSync(n);
    }, arguments);
  }
  function qn(e) {
    return e.read();
  }
  function zn(e) {
    return e.readyState;
  }
  function Un(e, n) {
    const t = n.reason, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Bn(e) {
    e.releaseLock();
  }
  function Wn() {
    return u(function(e, n, t, _) {
      e.removeEventListener(f(n, t), _);
    }, arguments);
  }
  function Dn() {
    return u(function() {
      return module.require;
    }, arguments);
  }
  function $n(e) {
    return Promise.resolve(e);
  }
  function Pn() {
    return u(function(e, n) {
      e.respond(n >>> 0);
    }, arguments);
  }
  function Vn() {
    return u(function(e, n, t) {
      e.send(f(n, t));
    }, arguments);
  }
  function Gn() {
    return u(function(e, n, t) {
      e.send(ce(n, t));
    }, arguments);
  }
  function Hn() {
    return u(function(e, n, t) {
      return e.setTimeout(n, t);
    }, arguments);
  }
  function Jn(e, n, t) {
    e[n >>> 0] = t;
  }
  function Kn(e, n, t) {
    e[n] = t;
  }
  function Qn(e, n, t) {
    e.set(n, t >>> 0);
  }
  function Xn(e, n, t) {
    return e.set(n, t);
  }
  function Yn(e, n) {
    e.binaryType = de[n];
  }
  function Zn(e, n) {
    e.body = n;
  }
  function et(e, n) {
    e.credentials = fe[n];
  }
  function nt(e, n) {
    e.handleEvent = n;
  }
  function tt(e, n) {
    e.headers = n;
  }
  function _t(e, n) {
    e.highWaterMark = n;
  }
  function rt(e, n, t) {
    e.method = f(n, t);
  }
  function ot(e, n) {
    e.mode = ge[n];
  }
  function ct(e, n) {
    e.onclose = n;
  }
  function st(e, n) {
    e.onerror = n;
  }
  function it(e, n) {
    e.onmessage = n;
  }
  function at(e, n) {
    e.onopen = n;
  }
  function bt(e, n) {
    e.signal = n;
  }
  function ut(e) {
    return e.signal;
  }
  function dt(e, n) {
    const t = n.stack, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function ft() {
    const e = typeof global > "u" ? null : global;
    return p(e) ? 0 : v(e);
  }
  function gt() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return p(e) ? 0 : v(e);
  }
  function wt() {
    const e = typeof self > "u" ? null : self;
    return p(e) ? 0 : v(e);
  }
  function lt() {
    const e = typeof window > "u" ? null : window;
    return p(e) ? 0 : v(e);
  }
  function ht(e) {
    return e.status;
  }
  function pt() {
    return u(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function yt(e, n, t) {
    return e.subarray(n >>> 0, t >>> 0);
  }
  function mt(e, n) {
    return e.then(n);
  }
  function xt(e, n, t) {
    return e.then(n, t);
  }
  function vt(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function kt(e) {
    return e.value;
  }
  function St(e) {
    return e.versions;
  }
  function It(e) {
    const n = e.view;
    return p(n) ? 0 : v(n);
  }
  function Tt(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.warn(...t);
  }
  function Rt(e) {
    return +e;
  }
  function Ft(e) {
    return BigInt.asUintN(64, e);
  }
  function jt(e) {
    const n = e;
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function Et(e) {
    const n = e.original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function Ct(e, n, t) {
    return T(e, n, 2885, ae);
  }
  function At(e, n, t) {
    return T(e, n, 2895, be);
  }
  function Lt(e, n, t) {
    return T(e, n, 904, O);
  }
  function Mt(e, n, t) {
    return T(e, n, 904, O);
  }
  function Ot(e, n, t) {
    return T(e, n, 904, O);
  }
  function Nt(e, n, t) {
    return T(e, n, 904, O);
  }
  function qt(e, n, t) {
    return se(e, n, 1447, ie);
  }
  function zt(e, n) {
    const t = B(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Ut(e, n) {
    return new Error(f(e, n));
  }
  function Bt(e, n) {
    return e in n;
  }
  function Wt() {
    const e = o.__wbindgen_export_4, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }
  function Dt(e) {
    return typeof e == "function";
  }
  function $t(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }
  function Pt(e) {
    return typeof e == "string";
  }
  function Vt(e) {
    return e === void 0;
  }
  function Gt(e, n) {
    return e == n;
  }
  function Ht() {
    return o.memory;
  }
  function Jt(e, n) {
    const t = n, _ = typeof t == "number" ? t : void 0;
    a().setFloat64(e + 8 * 1, p(_) ? 0 : _, true), a().setInt32(e + 4 * 0, !p(_), true);
  }
  function Kt(e) {
    return e;
  }
  function Qt(e, n) {
    const t = n, _ = typeof t == "string" ? t : void 0;
    var r = p(_) ? 0 : h(_, o.__wbindgen_export_0, o.__wbindgen_export_1), c = l;
    a().setInt32(e + 4 * 1, c, true), a().setInt32(e + 4 * 0, r, true);
  }
  function Xt(e, n) {
    return f(e, n);
  }
  function Yt(e, n) {
    throw new Error(f(e, n));
  }
  URL = globalThis.URL;
  const s = await ne({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Ut,
      __wbindgen_string_new: Xt,
      __wbindgen_is_undefined: Vt,
      __wbindgen_in: Bt,
      __wbindgen_boolean_get: jt,
      __wbindgen_is_object: $t,
      __wbindgen_as_number: Rt,
      __wbg_chatnode_new: Ee,
      __wbindgen_jsval_loose_eq: Gt,
      __wbindgen_number_get: Jt,
      __wbindgen_string_get: Qt,
      __wbg_String_8f0eb39a4a4c2f66: we,
      __wbindgen_number_new: Kt,
      __wbindgen_bigint_from_u64: Ft,
      __wbg_getwithrefkey_1dc361bd10053bfe: Ze,
      __wbg_set_3f1d0b984ed272ed: Kn,
      __wbg_new_8a6f238a6ece86ea: hn,
      __wbg_stack_0ed75d68575b0f3c: dt,
      __wbg_error_7534b8e9a36f1ab4: $e,
      __wbindgen_cb_drop: Et,
      __wbg_debug_55137df391ebfd29: Be,
      __wbg_error_91947ba14c44e1c9: Pe,
      __wbg_log_e51ef223c244b133: an,
      __wbg_warn_479b8bbb8337357b: Tt,
      __wbg_clearTimeout_5a54f8841c30079a: Ce,
      __wbg_fetch_4465c2b10f21a927: Ve,
      __wbg_getReader_48e00749fe3f6089: Je,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: Sn,
      __wbindgen_is_string: Pt,
      __wbg_signal_aaf9ad74119f20a4: ut,
      __wbg_new_e25e5aab09ff45db: xn,
      __wbg_abort_775ef1d17fc65868: le,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: _n,
      __wbg_code_f4ec1e6e2e1b0417: qe,
      __wbg_reason_49f1cede8bcf23dd: Un,
      __wbg_sethandleevent_8454ae22cde5c602: nt,
      __wbg_addEventListener_834c7f05e9c3b98b: he,
      __wbg_removeEventListener_709135c542708608: Wn,
      __wbg_new_018dcc2d6c8c2f6a: dn,
      __wbg_append_8c7dd8d641a5f01b: pe,
      __wbg_data_432d9c3df2630942: Ue,
      __wbg_sethighwatermark_793c99c89830c8e9: _t,
      __wbg_byobRequest_77d9adf63337edfb: ke,
      __wbg_close_5ce03e29be453811: Oe,
      __wbg_view_fd8a56e8983f448d: It,
      __wbg_respond_1f279fa9f8edcb1c: Pn,
      __wbg_close_304cc1fef3466669: Me,
      __wbg_enqueue_bb16ba72f537dc9e: De,
      __wbg_read_a2434af1186cb56c: qn,
      __wbg_releaseLock_091899af97991d2e: Bn,
      __wbg_cancel_8a308660caa6cadf: Fe,
      __wbg_getdone_d47073731acd3e74: Xe,
      __wbg_getvalue_009dcd63692bee1f: Ye,
      __wbg_newwithstrandinit_06c535e0a867c635: Tn,
      __wbg_setbody_5923b78a95eedf29: Zn,
      __wbg_setcredentials_c3a22f1cd105a2c6: et,
      __wbg_setheaders_834c0bdb6a8949ad: tt,
      __wbg_setmethod_3c5280fe5d890842: rt,
      __wbg_setmode_5dc300b865044b65: ot,
      __wbg_setsignal_75b21ef3a81de905: bt,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: rn,
      __wbg_url_ae10c34ca209681d: vt,
      __wbg_status_f6360336ca686bf0: ht,
      __wbg_headers_9cb51cfd2ac780a4: nn,
      __wbg_body_0b8fd1fe671660df: me,
      __wbg_arrayBuffer_d1b44c4390db422f: ye,
      __wbg_readyState_7ef6e63c349899ed: zn,
      __wbg_setonopen_2da654e1f39745d5: at,
      __wbg_setonerror_8639efe354b947cd: st,
      __wbg_setonclose_14fc475a49d488fc: ct,
      __wbg_setonmessage_6eccab530a8fb4c7: it,
      __wbg_setbinaryType_92fa1ffd873b327c: Yn,
      __wbg_new_92c54fc74574ef55: pn,
      __wbg_close_2893b7d056a0627d: Le,
      __wbg_close_e1253d480ed93ce3: Ne,
      __wbg_send_0293179ba074ffb4: Vn,
      __wbg_send_fc0c204e8a1757f4: Gn,
      __wbg_fetch_509096533071c657: Ge,
      __wbg_setTimeout_592d289a39056aa2: Hn,
      __wbg_clearTimeout_710cb18754e44d88: Ae,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: Mn,
      __wbg_queueMicrotask_d3219def82552485: On,
      __wbindgen_is_function: Dt,
      __wbg_performance_7a3ffd0b17f663ad: An,
      __wbg_now_2c95c9de01293173: En,
      __wbg_crypto_ed58b8e10a292839: ze,
      __wbg_process_5c1d670bc53614b8: Ln,
      __wbg_versions_c71aa1626a93e0a1: St,
      __wbg_node_02999533c4ea02e3: jn,
      __wbg_require_79b1e9274cde3c87: Dn,
      __wbg_msCrypto_0a36e2ec3a343d26: bn,
      __wbg_randomFillSync_ab2cfe79ebbf2740: Nn,
      __wbg_getRandomValues_bcb4912f16000dc4: He,
      __wbg_new_78feb108b6472713: ln,
      __wbg_newnoargs_105ed471475aaf50: vn,
      __wbg_new_5e0be73521bc8c17: wn,
      __wbg_next_25feadfc0913fea9: Rn,
      __wbg_value_cd1ffa7b1ab794f1: kt,
      __wbg_iterator_9a24c88df860dc65: cn,
      __wbg_new_405e22f390576ce2: gn,
      __wbg_set_37837023f3d740e8: Jn,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: tn,
      __wbg_new_c68d7209be747379: mn,
      __wbg_call_672a4d21634d4a24: Te,
      __wbg_call_7cccdd69e0791ae2: Re,
      __wbg_set_8fc6bf8a5b1071d1: Xn,
      __wbg_next_6574e1a8a62d1055: Fn,
      __wbg_done_769e5ede4b31c67b: We,
      __wbg_getTime_46267b1c24877e30: Ke,
      __wbg_new0_f788a2397c7ca929: un,
      __wbg_now_807e54c39636c349: Cn,
      __wbg_get_67b2ba62fc30de12: Qe,
      __wbg_has_a5ea9117f258a0ec: en,
      __wbg_buffer_609cc3eee51ed158: ve,
      __wbg_stringify_f7ed6987935b4a24: pt,
      __wbg_new_23a2665fac83c611: fn,
      __wbg_resolve_4851785c9c5f573d: $n,
      __wbg_catch_a6e601879b2610e9: je,
      __wbg_then_44b73946d2fb3e7d: mt,
      __wbg_then_48b406749878a531: xt,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: gt,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: wt,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: lt,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: ft,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: kn,
      __wbg_new_a12002a7f91c75be: yn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: on,
      __wbg_newwithlength_a381634e90c276d4: In,
      __wbg_buffer_09165b52af8c5237: xe,
      __wbg_subarray_aa9065fa9dc5df96: yt,
      __wbg_length_a446193dc22c12f8: sn,
      __wbg_byteLength_e674b853d9c77e1d: Se,
      __wbg_byteOffset_fd862df290ef848d: Ie,
      __wbg_set_65595bdd868b3009: Qn,
      __wbindgen_debug_string: zt,
      __wbindgen_throw: Yt,
      __wbindgen_memory: Ht,
      __wbindgen_closure_wrapper4122: Lt,
      __wbindgen_closure_wrapper4124: Mt,
      __wbindgen_closure_wrapper4126: Ot,
      __wbindgen_closure_wrapper4128: Nt,
      __wbindgen_closure_wrapper6966: qt,
      __wbindgen_closure_wrapper15227: Ct,
      __wbindgen_closure_wrapper15283: At,
      __wbindgen_init_externref_table: Wt
    }
  }, ee), Zt = s.memory, e_ = s.start, n_ = s.__wbg_chatnode_free, t_ = s.chatnode_spawn, __ = s.chatnode_node_id, r_ = s.chatnode_remote_info, o_ = s.chatnode_create, c_ = s.chatnode_join, s_ = s.__wbg_channel_free, i_ = s.channel_sender, a_ = s.channel_receiver, b_ = s.channel_ticket, u_ = s.channel_id, d_ = s.channel_neighbors, f_ = s.__wbg_channelsender_free, g_ = s.channelsender_broadcast, w_ = s.channelsender_set_nickame, l_ = s.__wbg_intounderlyingbytesource_free, h_ = s.intounderlyingbytesource_type, p_ = s.intounderlyingbytesource_autoAllocateChunkSize, y_ = s.intounderlyingbytesource_start, m_ = s.intounderlyingbytesource_pull, x_ = s.intounderlyingbytesource_cancel, v_ = s.__wbg_intounderlyingsource_free, k_ = s.intounderlyingsource_pull, S_ = s.intounderlyingsource_cancel, I_ = s.__wbg_intounderlyingsink_free, T_ = s.intounderlyingsink_write, R_ = s.intounderlyingsink_close, F_ = s.intounderlyingsink_abort, j_ = s.ring_core_0_17_11__bn_mul_mont, E_ = s.__wbindgen_export_0, C_ = s.__wbindgen_export_1, A_ = s.__wbindgen_export_2, L_ = s.__wbindgen_export_3, M_ = s.__wbindgen_export_4, O_ = s.__wbindgen_export_5, N_ = s.__wbindgen_export_6, q_ = s.__wbindgen_export_7, z_ = s.__wbindgen_add_to_stack_pointer, U_ = s.__wbindgen_export_8, B_ = s.closure903_externref_shim, W_ = s.__wbindgen_export_10, D_ = s.__wbindgen_export_11, $_ = s.closure2894_externref_shim, P_ = s.closure3019_externref_shim, Q = s.__wbindgen_start, V_ = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: s_,
    __wbg_channelsender_free: f_,
    __wbg_chatnode_free: n_,
    __wbg_intounderlyingbytesource_free: l_,
    __wbg_intounderlyingsink_free: I_,
    __wbg_intounderlyingsource_free: v_,
    __wbindgen_add_to_stack_pointer: z_,
    __wbindgen_export_0: E_,
    __wbindgen_export_1: C_,
    __wbindgen_export_10: W_,
    __wbindgen_export_11: D_,
    __wbindgen_export_2: A_,
    __wbindgen_export_3: L_,
    __wbindgen_export_4: M_,
    __wbindgen_export_5: O_,
    __wbindgen_export_6: N_,
    __wbindgen_export_7: q_,
    __wbindgen_export_8: U_,
    __wbindgen_start: Q,
    channel_id: u_,
    channel_neighbors: d_,
    channel_receiver: a_,
    channel_sender: i_,
    channel_ticket: b_,
    channelsender_broadcast: g_,
    channelsender_set_nickame: w_,
    chatnode_create: o_,
    chatnode_join: c_,
    chatnode_node_id: __,
    chatnode_remote_info: r_,
    chatnode_spawn: t_,
    closure2894_externref_shim: $_,
    closure3019_externref_shim: P_,
    closure903_externref_shim: B_,
    intounderlyingbytesource_autoAllocateChunkSize: p_,
    intounderlyingbytesource_cancel: x_,
    intounderlyingbytesource_pull: m_,
    intounderlyingbytesource_start: y_,
    intounderlyingbytesource_type: h_,
    intounderlyingsink_abort: F_,
    intounderlyingsink_close: R_,
    intounderlyingsink_write: T_,
    intounderlyingsource_cancel: S_,
    intounderlyingsource_pull: k_,
    memory: Zt,
    ring_core_0_17_11__bn_mul_mont: j_,
    start: e_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  te(V_);
  Q();
  X = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      R.info("Spawning iroh node");
      const n = await N.spawn();
      return R.info(`Iroh node spawned. our node id: ${n.node_id()}`), new X(n);
    }
    createChannel(n) {
      const t = this.chatNode.create(n);
      return this.joinInner(t, n);
    }
    joinChannel(n, t) {
      const _ = this.chatNode.join(n, t);
      return this.joinInner(_, t);
    }
    joinInner(n, t) {
      const _ = n.id();
      R.info(`joining channel ${_}`);
      const r = _.substring(5, 13);
      let c, i = new Promise((k) => {
        c = k;
      });
      const b = this.chatNode.node_id(), w = {
        id: b,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: z.Myself
      }, d = {
        label: r,
        messages: [],
        channel: n,
        subscribers: [],
        peers: /* @__PURE__ */ new Map(),
        nextId: 0,
        neighbors: 0,
        neighborSubscribers: [],
        peerSubscribers: [],
        myself: w,
        onClose: c
      };
      d.peers.set(b, w), this.channels.set(_, d);
      const m = async () => {
        const k = n.receiver.getReader();
        for (; ; ) {
          const { done: y, value: j } = await k.read();
          if (y) break;
          const g = j;
          if (console.debug("channel event", _.substring(0, 8), g), g.type === "messageReceived") {
            const x = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: z.RemoteNode
            };
            d.peers.set(g.from, x);
            const E = {
              id: J(d),
              sender: g.from,
              content: g.text
            };
            d.messages.push(E);
            const Z = U(d, E);
            for (const q of d.subscribers) q(Z);
            for (const q of d.peerSubscribers) q();
          } else if (g.type === "presence") {
            const x = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: z.RemoteNode
            };
            d.peers.set(g.from, x);
            for (const E of d.peerSubscribers) E();
          } else if (g.type === "joined") {
            R.info(`joined channel ${_}`), d.neighbors += g.neighbors.length;
            for (const x of d.neighborSubscribers) x(d.neighbors);
          } else if (g.type === "neighborUp") {
            d.neighbors += 1;
            for (const x of d.neighborSubscribers) x(d.neighbors);
          } else if (g.type === "neighborDown") {
            d.neighbors -= 1;
            for (const x of d.neighborSubscribers) x(d.neighbors);
          }
        }
      }, Y = async () => {
        for (; ; ) {
          const k = /* @__PURE__ */ new Date();
          for (const y of d.peers.values()) {
            if (y.id === b) {
              y.lastSeen = k;
              continue;
            }
            const j = (k.getTime() - y.lastSeen.getTime()) / 1e3;
            j > 20 ? y.status = "offline" : j > 10 ? y.status = "away" : y.status = "online";
          }
          await new Promise((y) => setTimeout(y, 1e3));
        }
      };
      return Promise.race([
        i,
        m(),
        Y()
      ]), {
        id: _,
        name: r
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
      const c = {
        sender: this.chatNode.node_id(),
        id: J(_),
        content: t
      };
      _.messages.push(c);
      const i = U(_, c);
      for (const b of _.subscribers) b(i);
    }
    setNickname(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      console.log("state", _), R.info(`changing nickname from ${_.myself.name} to ${t}`), _.myself.name = t, _.channel.sender.set_nickame(t);
      for (const r of _.peerSubscribers) r();
    }
    getMessages(n) {
      const t = this.channels.get(n);
      if (!t) throw new Error("Channel not found");
      return t.messages.map((r) => U(t, r));
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
        _.subscribers = _.subscribers.filter((r) => r != t);
      };
    }
    subscribeToNeighbors(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return t(_.neighbors), _.neighborSubscribers.push(t), () => {
        _.neighborSubscribers = _.neighborSubscribers.filter((r) => r != t);
      };
    }
    subscribeToPeers(n, t) {
      const _ = this.channels.get(n);
      if (!_) throw new Error("Channel not found");
      return _.peerSubscribers.push(t), () => {
        _.peerSubscribers = _.peerSubscribers.filter((r) => r != t);
      };
    }
  };
  function G_(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function U(e, n) {
    return {
      ...n,
      nickname: G_(e, n.sender)
    };
  }
  function J(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  X as IrohAPI,
  __tla
};
