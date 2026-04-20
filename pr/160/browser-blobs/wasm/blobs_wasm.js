/* @ts-self-types="./blobs_wasm.d.ts" */

export class BlobsNode {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlobsNode.prototype);
        obj.__wbg_ptr = ptr;
        BlobsNodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlobsNodeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blobsnode_free(ptr, 0);
    }
    /**
     * @param {string} hash
     * @returns {Promise<bigint>}
     */
    complete_size(hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobsnode_complete_size(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} ticket
     * @returns {Promise<string>}
     */
    download(ticket) {
        const ptr0 = passStringToWasm0(ticket, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobsnode_download(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @returns {string}
     */
    endpoint_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.blobsnode_endpoint_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} hash
     * @returns {Promise<Uint8Array>}
     */
    get(hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobsnode_get(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @returns {Promise<string>}
     */
    import(data) {
        const ret = wasm.blobsnode_import(this.__wbg_ptr, data);
        return ret;
    }
    /**
     * @returns {Promise<BlobsNode>}
     */
    static spawn() {
        const ret = wasm.blobsnode_spawn();
        return ret;
    }
}
if (Symbol.dispose) BlobsNode.prototype[Symbol.dispose] = BlobsNode.prototype.free;

export class IntoUnderlyingByteSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;

export class IntoUnderlyingSink {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;

export class IntoUnderlyingSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;

export function start() {
    wasm.start();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_960c155d3d49e4c2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_ab4b34d23d6778bd: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_function_3baa9db1a987f47d: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_63322ec0cd6ea4ef: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_6df3bf7ef1164ed3: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_29a43b4d42920abd: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_string_get_7ed5322991caaec5: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_b46c9b5a9f08ec37: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_abort_4ce5b484434ef6fd: function(arg0) {
            arg0.abort();
        },
        __wbg_abort_d53712380a54cc81: function(arg0, arg1) {
            arg0.abort(arg1);
        },
        __wbg_addEventListener_872d6537eadf7bec: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_append_e8fc56ce7c00e874: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_arrayBuffer_848c392b70c67d3d: function() { return handleError(function (arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        }, arguments); },
        __wbg_blobsnode_new: function(arg0) {
            const ret = BlobsNode.__wrap(arg0);
            return ret;
        },
        __wbg_body_0c3a51aec038a31a: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_buffer_d0f5ea0926a691fd: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_byobRequest_dc6aed9db01b12c6: function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_byteLength_3e660e5661f3327e: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteOffset_ecd62abe44dd28d4: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_call_a24592a6f349a97e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_cancel_ceb1bda02e29f0a9: function(arg0) {
            const ret = arg0.cancel();
            return ret;
        },
        __wbg_catch_e9362815fd0b24cf: function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        },
        __wbg_clearTimeout_2256f1e7b94ef517: function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        },
        __wbg_clearTimeout_47a40e3be01ed7a3: function() { return handleError(function (arg0, arg1) {
            arg0.clearTimeout(arg1);
        }, arguments); },
        __wbg_close_88106990eea7f544: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_e6c8977a002e9e13: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_fb954dfaf67b5732: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_code_c4f315d8dc91de14: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_code_e2d14bb68011f972: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_crypto_38df2bab126b63dc: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_data_bb9dffdd1e99cf2d: function(arg0) {
            const ret = arg0.data;
            return ret;
        },
        __wbg_debug_eaef3b49d572d680: function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            console.debug(...v0);
        },
        __wbg_done_9158f7cc8751ba32: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_enqueue_4767ce322820c94d: function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments); },
        __wbg_entries_bf727fcd7bf35a41: function(arg0) {
            const ret = arg0.entries();
            return ret;
        },
        __wbg_error_71b0e71161a5f3a0: function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            console.error(...v0);
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_fetch_0d322c0aed196b8b: function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        },
        __wbg_fetch_43b2f110608a59ff: function(arg0) {
            const ret = fetch(arg0);
            return ret;
        },
        __wbg_getRandomValues_76dfc69825c9c552: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_getReader_9facd4f899beac89: function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments); },
        __wbg_get_6011fa3a58f61074: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_8360291721e2339f: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_done_282bca5d3f90e0a8: function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_value_65a7a2c60b42fd75: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_has_880f1d472f7cecba: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_headers_6022deb4e576fb8e: function(arg0) {
            const ret = arg0.headers;
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_10148a11a16aee87: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_9b2d111407865ff2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_c3109d14ffc06469: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_length_9f1775224cf1d815: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_log_7a0760e115750083: function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            console.log(...v0);
        },
        __wbg_message_ec476bcf269dd7c4: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_0c7403db6e782f19: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_15a4889b4b90734d: function() { return handleError(function () {
            const ret = new Headers();
            return ret;
        }, arguments); },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_2a6e9133304ae2bf: function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_5e360d2ff7b9e1c3: function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_682678e2f47e32bc: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_98c22165a42231aa: function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments); },
        __wbg_new_aa8d0fa9762c29bd: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_from_slice_b5ea43e23f6008c0: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_323f37fd55ab048d: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen__convert__closures_____invoke__h07306ea4d4e30612(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_01848e8d6a3d49ad: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_length_8c854e41ea4dae9b: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_str_and_init_897be1708e42f39d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_str_sequence_6453b755acdcc2e7: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_next_0340c4ae324393c3: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_node_84ea875411254db1: function(arg0) {
            const ret = arg0.node;
            return ret;
        },
        __wbg_now_a9b7df1cbee90986: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
            const ret = arg0.performance;
            return ret;
        },
        __wbg_process_44c7a14e11e9f69e: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_protocol_b901d6b01a8d0d83: function(arg0, arg1) {
            const ret = arg1.protocol;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_prototypesetcall_a6b02eb00b0f4ce2: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_471a5b068a5295f6: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_queueMicrotask_5d15a957e6aa920e: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_f8819e5ffc402f36: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_read_ddc2d178d2e57272: function(arg0) {
            const ret = arg0.read();
            return ret;
        },
        __wbg_readyState_c78e609c7de3b381: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_reason_e943590a4ef0d587: function(arg0, arg1) {
            const ret = arg1.reason;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_releaseLock_9baaf3ccc5cfad69: function(arg0) {
            arg0.releaseLock();
        },
        __wbg_removeEventListener_0634324250b098cc: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_require_b4edbdcf3e2a1ef0: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_resolve_e6c466bc1052f16c: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_respond_008ca9525ae22847: function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments); },
        __wbg_send_15358dbe221c6258: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_send_186c85704c7f2d00: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_setTimeout_6613a51400c1bf9f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setTimeout_b188b3bcc8977c7d: function(arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        },
        __wbg_set_3d484eb794afec82: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_binaryType_770e68648ca5e83d: function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
        },
        __wbg_set_body_be11680f34217f75: function(arg0, arg1) {
            arg0.body = arg1;
        },
        __wbg_set_cache_968edea422613d1b: function(arg0, arg1) {
            arg0.cache = __wbindgen_enum_RequestCache[arg1];
        },
        __wbg_set_credentials_6577be90e0e85eb6: function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        },
        __wbg_set_handle_event_18c81b21e4853d37: function(arg0, arg1) {
            arg0.handleEvent = arg1;
        },
        __wbg_set_headers_50fc01786240a440: function(arg0, arg1) {
            arg0.headers = arg1;
        },
        __wbg_set_method_c9f1f985f6b6c427: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_mode_5e08d503428c06b9: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_onclose_17fa3bbcc4ba3541: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_onerror_da99c4232662a084: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onmessage_c1db358b9c38e3f1: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onopen_cd47b8fb1d92dee9: function(arg0, arg1) {
            arg0.onopen = arg1;
        },
        __wbg_set_signal_1d4e73c2305a0e7c: function(arg0, arg1) {
            arg0.signal = arg1;
        },
        __wbg_signal_fdc54643b47bf85b: function(arg0) {
            const ret = arg0.signal;
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_e445c1c7484aecc3: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_status_43e0d2f15b22d69f: function(arg0) {
            const ret = arg0.status;
            return ret;
        },
        __wbg_subarray_f8ca46a25b1f5e0d: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_then_792e0c862b060889: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_8e16ee11f05e4827: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_url_2bf741820e6563a0: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_url_7e153eff46938d20: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_ee3a06f4579184fa: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_versions_276b2795b1c6a219: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbg_view_701664ffb3b1ce67: function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_warn_3a37cdd7216f1479: function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            console.warn(...v0);
        },
        __wbg_wasClean_bd109e45fffa711a: function(arg0) {
            const ret = arg0.wasClean;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 3398, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h6b6ad208aea6efb5);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 5277, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h8d55e655ccab2eef);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 2354, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h15f86afbe7bb5d47);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 3898, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__haf952b7ef0e66cb9);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 3376, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h6fe25440685f94c9);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 3478, ret: Unit, inner_ret: Some(Unit) }, mutable: false }) -> Externref`.
            const ret = makeClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h8587f9e07fc735da);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 5254, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h8584675e03ad5bbf);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./blobs_wasm_bg.js": import0,
    };
}

function wasm_bindgen__convert__closures_____invoke__h6fe25440685f94c9(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h6fe25440685f94c9(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h8587f9e07fc735da(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h8587f9e07fc735da(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h8584675e03ad5bbf(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h8584675e03ad5bbf(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h6b6ad208aea6efb5(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h6b6ad208aea6efb5(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h15f86afbe7bb5d47(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h15f86afbe7bb5d47(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__haf952b7ef0e66cb9(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__haf952b7ef0e66cb9(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h8d55e655ccab2eef(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__h8d55e655ccab2eef(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__h07306ea4d4e30612(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h07306ea4d4e30612(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];


const __wbindgen_enum_ReadableStreamType = ["bytes"];


const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];


const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const BlobsNodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blobsnode_free(ptr >>> 0, 1));
const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('blobs_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
