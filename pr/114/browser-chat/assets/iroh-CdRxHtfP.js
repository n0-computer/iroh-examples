var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as R, P as N, __tla as __tla_0 } from "./index-DNy4YQFc.js";
let Q;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const ee = "" + new URL("chat_browser_bg-BSZiKFJe.wasm", import.meta.url).href, ne = async (e = {}, n) => {
    let t;
    if (n.startsWith("data:")) {
      const _ = n.replace(/^data:.*?base64,/, "");
      let r;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const s = atob(_);
        r = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) r[i] = s.charCodeAt(i);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(r, e);
    } else {
      const _ = await fetch(n), r = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && r.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(_, e);
      else {
        const s = await _.arrayBuffer();
        t = await WebAssembly.instantiate(s, e);
      }
    }
    return t.instance.exports;
  };
  let o;
  function te(e) {
    o = e;
  }
  let l = 0, E = null;
  function F() {
    return (E === null || E.byteLength === 0) && (E = new Uint8Array(o.memory.buffer)), E;
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
      const u = A.encode(e), w = n(u.length, 1) >>> 0;
      return F().subarray(w, w + u.length).set(u), l = u.length, w;
    }
    let _ = e.length, r = n(_, 1) >>> 0;
    const s = F();
    let i = 0;
    for (; i < _; i++) {
      const u = e.charCodeAt(i);
      if (u > 127) break;
      s[r + i] = u;
    }
    if (i !== _) {
      i !== 0 && (e = e.slice(i)), r = t(r, _, _ = i + e.length * 3, 1) >>> 0;
      const u = F().subarray(r + i, r + _), w = re(e, u);
      i += w.written, r = t(r, _, i, 1) >>> 0;
    }
    return l = i, r;
  }
  let S = null;
  function a() {
    return (S === null || S.buffer.detached === true || S.buffer.detached === void 0 && S.buffer !== o.memory.buffer) && (S = new DataView(o.memory.buffer)), S;
  }
  const oe = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let H = new oe("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  H.decode();
  function f(e, n) {
    return e = e >>> 0, H.decode(F().subarray(e, e + n));
  }
  function v(e) {
    const n = o.__wbindgen_export_3();
    return o.__wbindgen_export_4.set(n, e), n;
  }
  function b(e, n) {
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
  function K(e, n) {
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
    }, s = (...i) => {
      r.cnt++;
      const u = r.a;
      r.a = 0;
      try {
        return _(u, r.b, ...i);
      } finally {
        --r.cnt === 0 ? (o.__wbindgen_export_7.get(r.dtor)(u, r.b), L.unregister(r)) : r.a = u;
      }
    };
    return s.original = r, L.register(s, r, r), s;
  }
  function ce(e, n, t, _) {
    const r = {
      a: e,
      b: n,
      cnt: 1,
      dtor: t
    }, s = (...i) => {
      r.cnt++;
      try {
        return _(r.a, r.b, ...i);
      } finally {
        --r.cnt === 0 && (o.__wbindgen_export_7.get(r.dtor)(r.a, r.b), r.a = 0, L.unregister(r));
      }
    };
    return s.original = r, L.register(s, r, r), s;
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
      let s = "[";
      r > 0 && (s += B(e[0]));
      for (let i = 1; i < r; i++) s += ", " + B(e[i]);
      return s += "]", s;
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
  function U(e) {
    const n = o.__wbindgen_export_4.get(e);
    return o.__wbindgen_export_8(e), n;
  }
  function se(e, n, t) {
    o.closure919_externref_shim(e, n, t);
  }
  function ie(e, n) {
    o.__wbindgen_export_10(e, n);
  }
  function ae(e, n) {
    o.__wbindgen_export_11(e, n);
  }
  function be(e, n) {
    o.__wbindgen_export_12(e, n);
  }
  function ue(e, n, t) {
    o.closure2755_externref_shim(e, n, t);
  }
  function de(e, n) {
    o.__wbindgen_export_14(e, n);
  }
  function fe(e, n, t) {
    o.closure2872_externref_shim(e, n, t);
  }
  function ge(e, n, t, _) {
    o.closure3004_externref_shim(e, n, t, _);
  }
  const we = [
    "blob",
    "arraybuffer"
  ], le = [
    "omit",
    "same-origin",
    "include"
  ], he = [
    "same-origin",
    "no-cors",
    "cors",
    "navigate"
  ], $ = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channel_free(e >>> 0, 1));
  class M {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(M.prototype);
      return t.__wbg_ptr = n, $.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $.unregister(this), n;
    }
    free() {
      const n = this.__destroy_into_raw();
      o.__wbg_channel_free(n, 0);
    }
    get sender() {
      const n = o.channel_sender(this.__wbg_ptr);
      return W.__wrap(n);
    }
    get receiver() {
      return o.channel_receiver(this.__wbg_ptr);
    }
    ticket(n) {
      let t, _;
      try {
        const m = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_ticket(m, this.__wbg_ptr, n);
        var r = a().getInt32(m + 4 * 0, true), s = a().getInt32(m + 4 * 1, true), i = a().getInt32(m + 4 * 2, true), u = a().getInt32(m + 4 * 3, true), w = r, d = s;
        if (u) throw w = 0, d = 0, U(i);
        return t = w, _ = d, f(w, d);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(t, _, 1);
      }
    }
    id() {
      let n, t;
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16);
        o.channel_id(s, this.__wbg_ptr);
        var _ = a().getInt32(s + 4 * 0, true), r = a().getInt32(s + 4 * 1, true);
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
  const P = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_channelsender_free(e >>> 0, 1));
  class W {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(W.prototype);
      return t.__wbg_ptr = n, P.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, P.unregister(this), n;
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
  const V = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_chatnode_free(e >>> 0, 1));
  class O {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(O.prototype);
      return t.__wbg_ptr = n, V.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, V.unregister(this), n;
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
        const s = o.__wbindgen_add_to_stack_pointer(-16);
        o.chatnode_node_id(s, this.__wbg_ptr);
        var _ = a().getInt32(s + 4 * 0, true), r = a().getInt32(s + 4 * 1, true);
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
        const s = o.__wbindgen_add_to_stack_pointer(-16), i = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), u = l;
        o.chatnode_create(s, this.__wbg_ptr, i, u);
        var t = a().getInt32(s + 4 * 0, true), _ = a().getInt32(s + 4 * 1, true), r = a().getInt32(s + 4 * 2, true);
        if (r) throw U(_);
        return M.__wrap(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    join(n, t) {
      try {
        const i = o.__wbindgen_add_to_stack_pointer(-16), u = h(n, o.__wbindgen_export_0, o.__wbindgen_export_1), w = l, d = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), m = l;
        o.chatnode_join(i, this.__wbg_ptr, u, w, d, m);
        var _ = a().getInt32(i + 4 * 0, true), r = a().getInt32(i + 4 * 1, true), s = a().getInt32(i + 4 * 2, true);
        if (s) throw U(r);
        return M.__wrap(_);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => o.__wbg_intounderlyingsink_free(e >>> 0, 1));
  const G = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => o.__wbg_intounderlyingsource_free(e >>> 0, 1));
  class D {
    static __wrap(n) {
      n = n >>> 0;
      const t = Object.create(D.prototype);
      return t.__wbg_ptr = n, G.register(t, t.__wbg_ptr, t), t;
    }
    __destroy_into_raw() {
      const n = this.__wbg_ptr;
      return this.__wbg_ptr = 0, G.unregister(this), n;
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
  function pe(e, n) {
    const t = String(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function ye(e, n) {
    e.abort(n);
  }
  function me(e) {
    e.abort();
  }
  function xe() {
    return b(function(e, n, t, _) {
      e.addEventListener(f(n, t), _);
    }, arguments);
  }
  function ve() {
    return b(function(e, n, t, _, r) {
      e.append(f(n, t), f(_, r));
    }, arguments);
  }
  function ke() {
    return b(function(e) {
      return e.arrayBuffer();
    }, arguments);
  }
  function Se(e) {
    const n = e.body;
    return p(n) ? 0 : v(n);
  }
  function Ie(e) {
    return e.buffer;
  }
  function Te(e) {
    return e.buffer;
  }
  function Re(e) {
    const n = e.byobRequest;
    return p(n) ? 0 : v(n);
  }
  function Fe(e) {
    return e.byteLength;
  }
  function Ce(e) {
    return e.byteOffset;
  }
  function je() {
    return b(function(e, n) {
      return e.call(n);
    }, arguments);
  }
  function Ee() {
    return b(function(e, n, t) {
      return e.call(n, t);
    }, arguments);
  }
  function Ae(e) {
    return e.cancel();
  }
  function Le(e, n) {
    return e.catch(n);
  }
  function Me(e) {
    return O.__wrap(e);
  }
  function Oe() {
    return b(function(e, n) {
      e.clearTimeout(n);
    }, arguments);
  }
  function qe(e) {
    return clearTimeout(e);
  }
  function Ne() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function ze() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function Be() {
    return b(function(e) {
      e.close();
    }, arguments);
  }
  function Ue(e) {
    return e.code;
  }
  function We(e) {
    return e.code;
  }
  function De(e) {
    return e.crypto;
  }
  function $e(e) {
    return e.data;
  }
  function Pe(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.debug(...t);
  }
  function Ve(e) {
    return e.done;
  }
  function Ge() {
    return b(function(e, n) {
      e.enqueue(n);
    }, arguments);
  }
  function Je(e, n) {
    let t, _;
    try {
      t = e, _ = n, console.error(f(e, n));
    } finally {
      o.__wbindgen_export_6(t, _, 1);
    }
  }
  function He(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.error(...t);
  }
  function Ke(e, n) {
    return e.fetch(n);
  }
  function Ze(e) {
    return fetch(e);
  }
  function Qe() {
    return b(function(e, n) {
      globalThis.crypto.getRandomValues(K(e, n));
    }, arguments);
  }
  function Xe() {
    return b(function(e, n) {
      e.getRandomValues(n);
    }, arguments);
  }
  function Ye() {
    return b(function(e) {
      return e.getReader();
    }, arguments);
  }
  function en(e) {
    return e.getTime();
  }
  function nn() {
    return b(function(e, n) {
      return Reflect.get(e, n);
    }, arguments);
  }
  function tn(e) {
    const n = e.done;
    return p(n) ? 16777215 : n ? 1 : 0;
  }
  function _n(e) {
    return e.value;
  }
  function rn(e, n) {
    return e[n];
  }
  function on() {
    return b(function(e, n) {
      return Reflect.has(e, n);
    }, arguments);
  }
  function cn(e) {
    return e.headers;
  }
  function sn(e) {
    let n;
    try {
      n = e instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }
  function an(e) {
    let n;
    try {
      n = e instanceof Blob;
    } catch {
      n = false;
    }
    return n;
  }
  function bn(e) {
    let n;
    try {
      n = e instanceof Response;
    } catch {
      n = false;
    }
    return n;
  }
  function un(e) {
    let n;
    try {
      n = e instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }
  function dn() {
    return Symbol.iterator;
  }
  function fn(e) {
    return e.length;
  }
  function gn(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.log(...t);
  }
  function wn(e) {
    return e.msCrypto;
  }
  function ln() {
    return /* @__PURE__ */ new Date();
  }
  function hn() {
    return b(function() {
      return new Headers();
    }, arguments);
  }
  function pn(e, n) {
    try {
      var t = {
        a: e,
        b: n
      }, _ = (s, i) => {
        const u = t.a;
        t.a = 0;
        try {
          return ge(u, t.b, s, i);
        } finally {
          t.a = u;
        }
      };
      return new Promise(_);
    } finally {
      t.a = t.b = 0;
    }
  }
  function yn() {
    return new Object();
  }
  function mn() {
    return /* @__PURE__ */ new Map();
  }
  function xn() {
    return new Array();
  }
  function vn() {
    return new Error();
  }
  function kn() {
    return b(function(e, n) {
      return new WebSocket(f(e, n));
    }, arguments);
  }
  function Sn(e) {
    return new Uint8Array(e);
  }
  function In(e, n) {
    return new Error(f(e, n));
  }
  function Tn() {
    return b(function() {
      return new AbortController();
    }, arguments);
  }
  function Rn(e, n) {
    return new Function(f(e, n));
  }
  function Fn(e, n, t) {
    return new Uint8Array(e, n >>> 0, t >>> 0);
  }
  function Cn(e, n) {
    return new ReadableStream(D.__wrap(e), n);
  }
  function jn(e) {
    return new Uint8Array(e >>> 0);
  }
  function En() {
    return b(function(e, n, t) {
      return new Request(f(e, n), t);
    }, arguments);
  }
  function An() {
    return b(function(e, n, t) {
      return new WebSocket(f(e, n), t);
    }, arguments);
  }
  function Ln(e) {
    return e.next;
  }
  function Mn() {
    return b(function(e) {
      return e.next();
    }, arguments);
  }
  function On(e) {
    return e.node;
  }
  function qn(e) {
    return e.now();
  }
  function Nn() {
    return Date.now();
  }
  function zn(e) {
    return e.performance;
  }
  function Bn(e) {
    return e.process;
  }
  function Un(e, n) {
    return e.push(n);
  }
  function Wn(e) {
    queueMicrotask(e);
  }
  function Dn(e) {
    return e.queueMicrotask;
  }
  function $n() {
    return b(function(e, n) {
      e.randomFillSync(n);
    }, arguments);
  }
  function Pn(e) {
    return e.read();
  }
  function Vn(e) {
    return e.readyState;
  }
  function Gn(e, n) {
    const t = n.reason, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Jn(e) {
    e.releaseLock();
  }
  function Hn() {
    return b(function(e, n, t, _) {
      e.removeEventListener(f(n, t), _);
    }, arguments);
  }
  function Kn() {
    return b(function() {
      return module.require;
    }, arguments);
  }
  function Zn(e) {
    return Promise.resolve(e);
  }
  function Qn() {
    return b(function(e, n) {
      e.respond(n >>> 0);
    }, arguments);
  }
  function Xn() {
    return b(function(e, n, t) {
      e.send(f(n, t));
    }, arguments);
  }
  function Yn() {
    return b(function(e, n, t) {
      e.send(K(n, t));
    }, arguments);
  }
  function et(e, n) {
    return setTimeout(e, n);
  }
  function nt() {
    return b(function(e, n, t) {
      return e.setTimeout(n, t);
    }, arguments);
  }
  function tt(e, n, t) {
    e[n >>> 0] = t;
  }
  function _t(e, n, t) {
    e[n] = t;
  }
  function rt(e, n, t) {
    e.set(n, t >>> 0);
  }
  function ot(e, n, t) {
    return e.set(n, t);
  }
  function ct(e, n) {
    e.binaryType = we[n];
  }
  function st(e, n) {
    e.body = n;
  }
  function it(e, n) {
    e.credentials = le[n];
  }
  function at(e, n) {
    e.handleEvent = n;
  }
  function bt(e, n) {
    e.headers = n;
  }
  function ut(e, n) {
    e.highWaterMark = n;
  }
  function dt(e, n, t) {
    e.method = f(n, t);
  }
  function ft(e, n) {
    e.mode = he[n];
  }
  function gt(e, n) {
    e.onclose = n;
  }
  function wt(e, n) {
    e.onerror = n;
  }
  function lt(e, n) {
    e.onmessage = n;
  }
  function ht(e, n) {
    e.onopen = n;
  }
  function pt(e, n) {
    e.signal = n;
  }
  function yt(e) {
    return e.signal;
  }
  function mt(e, n) {
    const t = n.stack, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function xt() {
    const e = typeof global > "u" ? null : global;
    return p(e) ? 0 : v(e);
  }
  function vt() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return p(e) ? 0 : v(e);
  }
  function kt() {
    const e = typeof self > "u" ? null : self;
    return p(e) ? 0 : v(e);
  }
  function St() {
    const e = typeof window > "u" ? null : window;
    return p(e) ? 0 : v(e);
  }
  function It(e) {
    return e.status;
  }
  function Tt() {
    return b(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function Rt(e, n, t) {
    return e.subarray(n >>> 0, t >>> 0);
  }
  function Ft() {
    return b(function(e) {
      return e.text();
    }, arguments);
  }
  function Ct(e, n) {
    return e.then(n);
  }
  function jt(e, n, t) {
    return e.then(n, t);
  }
  function Et(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function At(e, n) {
    const t = n.url, _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Lt(e) {
    return e.value;
  }
  function Mt(e) {
    return e.versions;
  }
  function Ot(e) {
    const n = e.view;
    return p(n) ? 0 : v(n);
  }
  function qt(e, n) {
    var t = I(e, n).slice();
    o.__wbindgen_export_6(e, n * 4, 4), console.warn(...t);
  }
  function Nt(e) {
    return e.wasClean;
  }
  function zt(e) {
    return +e;
  }
  function Bt(e) {
    return BigInt.asUintN(64, e);
  }
  function Ut(e) {
    const n = e;
    return typeof n == "boolean" ? n ? 1 : 0 : 2;
  }
  function Wt(e) {
    const n = e.original;
    return n.cnt-- == 1 ? (n.a = 0, true) : false;
  }
  function Dt(e, n, t) {
    return T(e, n, 2756, ue);
  }
  function $t(e, n, t) {
    return T(e, n, 2864, de);
  }
  function Pt(e, n, t) {
    return T(e, n, 2873, fe);
  }
  function Vt(e, n, t) {
    return T(e, n, 920, se);
  }
  function Gt(e, n, t) {
    return T(e, n, 1623, ie);
  }
  function Jt(e, n, t) {
    return ce(e, n, 1631, ae);
  }
  function Ht(e, n, t) {
    return T(e, n, 1784, be);
  }
  function Kt(e, n) {
    const t = B(n), _ = h(t, o.__wbindgen_export_0, o.__wbindgen_export_1), r = l;
    a().setInt32(e + 4 * 1, r, true), a().setInt32(e + 4 * 0, _, true);
  }
  function Zt(e, n) {
    return new Error(f(e, n));
  }
  function Qt(e, n) {
    return e in n;
  }
  function Xt() {
    const e = o.__wbindgen_export_4, n = e.grow(4);
    e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, true), e.set(n + 3, false);
  }
  function Yt(e) {
    return typeof e == "function";
  }
  function e_(e) {
    const n = e;
    return typeof n == "object" && n !== null;
  }
  function n_(e) {
    return typeof e == "string";
  }
  function t_(e) {
    return e === void 0;
  }
  function __(e, n) {
    return e == n;
  }
  function r_() {
    return o.memory;
  }
  function o_(e, n) {
    const t = n, _ = typeof t == "number" ? t : void 0;
    a().setFloat64(e + 8 * 1, p(_) ? 0 : _, true), a().setInt32(e + 4 * 0, !p(_), true);
  }
  function c_(e) {
    return e;
  }
  function s_(e, n) {
    const t = n, _ = typeof t == "string" ? t : void 0;
    var r = p(_) ? 0 : h(_, o.__wbindgen_export_0, o.__wbindgen_export_1), s = l;
    a().setInt32(e + 4 * 1, s, true), a().setInt32(e + 4 * 0, r, true);
  }
  function i_(e, n) {
    return f(e, n);
  }
  function a_(e, n) {
    throw new Error(f(e, n));
  }
  URL = globalThis.URL;
  const c = await ne({
    "./chat_browser_bg.js": {
      __wbindgen_error_new: Zt,
      __wbindgen_string_new: i_,
      __wbindgen_is_undefined: t_,
      __wbindgen_in: Qt,
      __wbindgen_boolean_get: Ut,
      __wbindgen_is_object: e_,
      __wbindgen_as_number: zt,
      __wbg_chatnode_new: Me,
      __wbindgen_jsval_loose_eq: __,
      __wbindgen_number_get: o_,
      __wbindgen_string_get: s_,
      __wbg_String_8f0eb39a4a4c2f66: pe,
      __wbindgen_number_new: c_,
      __wbindgen_bigint_from_u64: Bt,
      __wbg_getwithrefkey_1dc361bd10053bfe: rn,
      __wbg_set_3f1d0b984ed272ed: _t,
      __wbg_new_8a6f238a6ece86ea: vn,
      __wbg_stack_0ed75d68575b0f3c: mt,
      __wbg_error_7534b8e9a36f1ab4: Je,
      __wbindgen_cb_drop: Wt,
      __wbindgen_is_string: n_,
      __wbg_debug_55137df391ebfd29: Pe,
      __wbg_error_91947ba14c44e1c9: He,
      __wbg_log_e51ef223c244b133: gn,
      __wbg_warn_479b8bbb8337357b: qt,
      __wbg_fetch_d36a73832f0a45e8: Ze,
      __wbg_setTimeout_2e707715f8cc9497: et,
      __wbg_clearTimeout_86721db0036bea98: qe,
      __wbg_getReader_48e00749fe3f6089: Ye,
      __wbg_newwithintounderlyingsource_b47f6a6a596a7f24: Cn,
      __wbg_getRandomValues_3c9c0d586e575a16: Qe,
      __wbg_signal_aaf9ad74119f20a4: yt,
      __wbg_new_e25e5aab09ff45db: Tn,
      __wbg_abort_775ef1d17fc65868: me,
      __wbg_abort_410ec47a64ac6117: ye,
      __wbg_instanceof_Blob_ca721ef3bdab15d1: an,
      __wbg_wasClean_605b4fd66d44354a: Nt,
      __wbg_code_f4ec1e6e2e1b0417: We,
      __wbg_reason_49f1cede8bcf23dd: Gn,
      __wbg_code_cfd8f6868bdaed9b: Ue,
      __wbg_sethandleevent_8454ae22cde5c602: at,
      __wbg_addEventListener_834c7f05e9c3b98b: xe,
      __wbg_removeEventListener_709135c542708608: Hn,
      __wbg_new_018dcc2d6c8c2f6a: hn,
      __wbg_append_8c7dd8d641a5f01b: ve,
      __wbg_data_432d9c3df2630942: $e,
      __wbg_sethighwatermark_793c99c89830c8e9: ut,
      __wbg_byobRequest_77d9adf63337edfb: Re,
      __wbg_close_5ce03e29be453811: Be,
      __wbg_view_fd8a56e8983f448d: Ot,
      __wbg_respond_1f279fa9f8edcb1c: Qn,
      __wbg_close_304cc1fef3466669: ze,
      __wbg_enqueue_bb16ba72f537dc9e: Ge,
      __wbg_read_a2434af1186cb56c: Pn,
      __wbg_releaseLock_091899af97991d2e: Jn,
      __wbg_cancel_8a308660caa6cadf: Ae,
      __wbg_getdone_d47073731acd3e74: tn,
      __wbg_getvalue_009dcd63692bee1f: _n,
      __wbg_newwithstrandinit_06c535e0a867c635: En,
      __wbg_setbody_5923b78a95eedf29: st,
      __wbg_setcredentials_c3a22f1cd105a2c6: it,
      __wbg_setheaders_834c0bdb6a8949ad: bt,
      __wbg_setmethod_3c5280fe5d890842: dt,
      __wbg_setmode_5dc300b865044b65: ft,
      __wbg_setsignal_75b21ef3a81de905: pt,
      __wbg_instanceof_Response_f2cc20d9f7dfd644: bn,
      __wbg_url_ae10c34ca209681d: Et,
      __wbg_status_f6360336ca686bf0: It,
      __wbg_headers_9cb51cfd2ac780a4: cn,
      __wbg_body_0b8fd1fe671660df: Se,
      __wbg_arrayBuffer_d1b44c4390db422f: ke,
      __wbg_text_7805bea50de2af49: Ft,
      __wbg_url_ce9ab75bf9627ae4: At,
      __wbg_readyState_7ef6e63c349899ed: Vn,
      __wbg_setonopen_2da654e1f39745d5: ht,
      __wbg_setonerror_8639efe354b947cd: wt,
      __wbg_setonclose_14fc475a49d488fc: gt,
      __wbg_setonmessage_6eccab530a8fb4c7: lt,
      __wbg_setbinaryType_92fa1ffd873b327c: ct,
      __wbg_new_92c54fc74574ef55: kn,
      __wbg_newwithstrsequence_6e9d6479e1cf978d: An,
      __wbg_close_2893b7d056a0627d: Ne,
      __wbg_send_0293179ba074ffb4: Xn,
      __wbg_send_fc0c204e8a1757f4: Yn,
      __wbg_fetch_509096533071c657: Ke,
      __wbg_setTimeout_4eb823e8b72fbe79: nt,
      __wbg_clearTimeout_15dfc3d1dcb635c6: Oe,
      __wbg_queueMicrotask_97d92b4fcc8a61c5: Wn,
      __wbg_queueMicrotask_d3219def82552485: Dn,
      __wbindgen_is_function: Yt,
      __wbg_performance_7a3ffd0b17f663ad: zn,
      __wbg_now_2c95c9de01293173: qn,
      __wbg_crypto_ed58b8e10a292839: De,
      __wbg_process_5c1d670bc53614b8: Bn,
      __wbg_versions_c71aa1626a93e0a1: Mt,
      __wbg_node_02999533c4ea02e3: On,
      __wbg_require_79b1e9274cde3c87: Kn,
      __wbg_msCrypto_0a36e2ec3a343d26: wn,
      __wbg_randomFillSync_ab2cfe79ebbf2740: $n,
      __wbg_getRandomValues_bcb4912f16000dc4: Xe,
      __wbg_new_78feb108b6472713: xn,
      __wbg_newnoargs_105ed471475aaf50: Rn,
      __wbg_new_5e0be73521bc8c17: mn,
      __wbg_next_25feadfc0913fea9: Ln,
      __wbg_value_cd1ffa7b1ab794f1: Lt,
      __wbg_iterator_9a24c88df860dc65: dn,
      __wbg_new_405e22f390576ce2: yn,
      __wbg_set_37837023f3d740e8: tt,
      __wbg_push_737cfc8c1432c2c6: Un,
      __wbg_instanceof_ArrayBuffer_e14585432e3737fc: sn,
      __wbg_new_c68d7209be747379: In,
      __wbg_call_672a4d21634d4a24: je,
      __wbg_call_7cccdd69e0791ae2: Ee,
      __wbg_set_8fc6bf8a5b1071d1: ot,
      __wbg_next_6574e1a8a62d1055: Mn,
      __wbg_done_769e5ede4b31c67b: Ve,
      __wbg_getTime_46267b1c24877e30: en,
      __wbg_new0_f788a2397c7ca929: ln,
      __wbg_now_807e54c39636c349: Nn,
      __wbg_get_67b2ba62fc30de12: nn,
      __wbg_has_a5ea9117f258a0ec: on,
      __wbg_buffer_609cc3eee51ed158: Te,
      __wbg_stringify_f7ed6987935b4a24: Tt,
      __wbg_new_23a2665fac83c611: pn,
      __wbg_resolve_4851785c9c5f573d: Zn,
      __wbg_catch_a6e601879b2610e9: Le,
      __wbg_then_44b73946d2fb3e7d: Ct,
      __wbg_then_48b406749878a531: jt,
      __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: vt,
      __wbg_static_accessor_SELF_37c5d418e4bf5819: kt,
      __wbg_static_accessor_WINDOW_5de37043a91a9c40: St,
      __wbg_static_accessor_GLOBAL_88a902d13a557d07: xt,
      __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: Fn,
      __wbg_new_a12002a7f91c75be: Sn,
      __wbg_instanceof_Uint8Array_17156bcf118086a9: un,
      __wbg_newwithlength_a381634e90c276d4: jn,
      __wbg_buffer_09165b52af8c5237: Ie,
      __wbg_subarray_aa9065fa9dc5df96: Rt,
      __wbg_length_a446193dc22c12f8: fn,
      __wbg_byteLength_e674b853d9c77e1d: Fe,
      __wbg_byteOffset_fd862df290ef848d: Ce,
      __wbg_set_65595bdd868b3009: rt,
      __wbindgen_debug_string: Kt,
      __wbindgen_throw: a_,
      __wbindgen_memory: r_,
      __wbindgen_closure_wrapper4159: Vt,
      __wbindgen_closure_wrapper7653: Gt,
      __wbindgen_closure_wrapper7735: Jt,
      __wbindgen_closure_wrapper8824: Ht,
      __wbindgen_closure_wrapper14298: Dt,
      __wbindgen_closure_wrapper15523: $t,
      __wbindgen_closure_wrapper15579: Pt,
      __wbindgen_init_externref_table: Xt
    }
  }, ee), b_ = c.memory, u_ = c.start, d_ = c.__wbg_chatnode_free, f_ = c.chatnode_spawn, g_ = c.chatnode_node_id, w_ = c.chatnode_remote_info, l_ = c.chatnode_create, h_ = c.chatnode_join, p_ = c.__wbg_channel_free, y_ = c.channel_sender, m_ = c.channel_receiver, x_ = c.channel_ticket, v_ = c.channel_id, k_ = c.channel_neighbors, S_ = c.__wbg_channelsender_free, I_ = c.channelsender_broadcast, T_ = c.channelsender_set_nickame, R_ = c.__wbg_intounderlyingbytesource_free, F_ = c.intounderlyingbytesource_type, C_ = c.intounderlyingbytesource_autoAllocateChunkSize, j_ = c.intounderlyingbytesource_start, E_ = c.intounderlyingbytesource_pull, A_ = c.intounderlyingbytesource_cancel, L_ = c.__wbg_intounderlyingsource_free, M_ = c.intounderlyingsource_pull, O_ = c.intounderlyingsource_cancel, q_ = c.__wbg_intounderlyingsink_free, N_ = c.intounderlyingsink_write, z_ = c.intounderlyingsink_close, B_ = c.intounderlyingsink_abort, U_ = c.ring_core_0_17_11__bn_mul_mont, W_ = c.__wbindgen_export_0, D_ = c.__wbindgen_export_1, $_ = c.__wbindgen_export_2, P_ = c.__wbindgen_export_3, V_ = c.__wbindgen_export_4, G_ = c.__wbindgen_export_5, J_ = c.__wbindgen_export_6, H_ = c.__wbindgen_export_7, K_ = c.__wbindgen_add_to_stack_pointer, Z_ = c.__wbindgen_export_8, Q_ = c.closure919_externref_shim, X_ = c.__wbindgen_export_10, Y_ = c.__wbindgen_export_11, er = c.__wbindgen_export_12, nr = c.closure2755_externref_shim, tr = c.__wbindgen_export_14, _r = c.closure2872_externref_shim, rr = c.closure3004_externref_shim, Z = c.__wbindgen_start, or = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_channel_free: p_,
    __wbg_channelsender_free: S_,
    __wbg_chatnode_free: d_,
    __wbg_intounderlyingbytesource_free: R_,
    __wbg_intounderlyingsink_free: q_,
    __wbg_intounderlyingsource_free: L_,
    __wbindgen_add_to_stack_pointer: K_,
    __wbindgen_export_0: W_,
    __wbindgen_export_1: D_,
    __wbindgen_export_10: X_,
    __wbindgen_export_11: Y_,
    __wbindgen_export_12: er,
    __wbindgen_export_14: tr,
    __wbindgen_export_2: $_,
    __wbindgen_export_3: P_,
    __wbindgen_export_4: V_,
    __wbindgen_export_5: G_,
    __wbindgen_export_6: J_,
    __wbindgen_export_7: H_,
    __wbindgen_export_8: Z_,
    __wbindgen_start: Z,
    channel_id: v_,
    channel_neighbors: k_,
    channel_receiver: m_,
    channel_sender: y_,
    channel_ticket: x_,
    channelsender_broadcast: I_,
    channelsender_set_nickame: T_,
    chatnode_create: l_,
    chatnode_join: h_,
    chatnode_node_id: g_,
    chatnode_remote_info: w_,
    chatnode_spawn: f_,
    closure2755_externref_shim: nr,
    closure2872_externref_shim: _r,
    closure3004_externref_shim: rr,
    closure919_externref_shim: Q_,
    intounderlyingbytesource_autoAllocateChunkSize: C_,
    intounderlyingbytesource_cancel: A_,
    intounderlyingbytesource_pull: E_,
    intounderlyingbytesource_start: j_,
    intounderlyingbytesource_type: F_,
    intounderlyingsink_abort: B_,
    intounderlyingsink_close: z_,
    intounderlyingsink_write: N_,
    intounderlyingsource_cancel: O_,
    intounderlyingsource_pull: M_,
    memory: b_,
    ring_core_0_17_11__bn_mul_mont: U_,
    start: u_
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  te(or);
  Z();
  Q = class {
    constructor(n) {
      __publicField(this, "chatNode");
      __publicField(this, "channels", /* @__PURE__ */ new Map());
      this.chatNode = n;
    }
    static async create() {
      R.info("Spawning iroh node");
      const n = await O.spawn();
      return R.info(`Iroh node spawned. our node id: ${n.node_id()}`), new Q(n);
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
      let s, i = new Promise((k) => {
        s = k;
      });
      const u = this.chatNode.node_id(), w = {
        id: u,
        name: t,
        lastSeen: /* @__PURE__ */ new Date(),
        status: "online",
        role: N.Myself
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
        onClose: s
      };
      d.peers.set(u, w), this.channels.set(_, d);
      const m = async () => {
        const k = n.receiver.getReader();
        for (; ; ) {
          const { done: y, value: C } = await k.read();
          if (y) break;
          const g = C;
          if (console.debug("channel event", _.substring(0, 8), g), g.type === "messageReceived") {
            const x = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: N.RemoteNode
            };
            d.peers.set(g.from, x);
            const j = {
              id: J(d),
              sender: g.from,
              content: g.text
            };
            d.messages.push(j);
            const Y = z(d, j);
            for (const q of d.subscribers) q(Y);
            for (const q of d.peerSubscribers) q();
          } else if (g.type === "presence") {
            const x = {
              id: g.from,
              name: g.nickname,
              lastSeen: new Date(g.sentTimestamp / 1e3),
              status: "online",
              role: N.RemoteNode
            };
            d.peers.set(g.from, x);
            for (const j of d.peerSubscribers) j();
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
      }, X = async () => {
        for (; ; ) {
          const k = /* @__PURE__ */ new Date();
          for (const y of d.peers.values()) {
            if (y.id === u) {
              y.lastSeen = k;
              continue;
            }
            const C = (k.getTime() - y.lastSeen.getTime()) / 1e3;
            C > 20 ? y.status = "offline" : C > 10 ? y.status = "away" : y.status = "online";
          }
          await new Promise((y) => setTimeout(y, 1e3));
        }
      };
      return Promise.race([
        i,
        m(),
        X()
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
      const s = {
        sender: this.chatNode.node_id(),
        id: J(_),
        content: t
      };
      _.messages.push(s);
      const i = z(_, s);
      for (const u of _.subscribers) u(i);
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
      return t.messages.map((r) => z(t, r));
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
  function cr(e, n) {
    const t = e.peers.get(n);
    return t && t.name ? t.name : n.substring(0, 8);
  }
  function z(e, n) {
    return {
      ...n,
      nickname: cr(e, n.sender)
    };
  }
  function J(e) {
    const n = "" + e.nextId;
    return e.nextId = e.nextId + 1, n;
  }
});
export {
  Q as IrohAPI,
  __tla
};
