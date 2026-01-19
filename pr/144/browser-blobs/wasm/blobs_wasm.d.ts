/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

type ReadableStreamType = "bytes";

export class BlobsNode {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    complete_size(hash: string): Promise<bigint>;
    download(ticket: string): Promise<string>;
    endpoint_id(): string;
    get(hash: string): Promise<Uint8Array>;
    import(data: Uint8Array): Promise<string>;
    static spawn(): Promise<BlobsNode>;
}

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_blobsnode_free: (a: number, b: number) => void;
    readonly blobsnode_complete_size: (a: number, b: number, c: number) => any;
    readonly blobsnode_download: (a: number, b: number, c: number) => any;
    readonly blobsnode_endpoint_id: (a: number) => [number, number];
    readonly blobsnode_get: (a: number, b: number, c: number) => any;
    readonly blobsnode_import: (a: number, b: any) => any;
    readonly blobsnode_spawn: () => any;
    readonly start: () => void;
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly intounderlyingsink_abort: (a: number, b: any) => any;
    readonly intounderlyingsink_close: (a: number) => any;
    readonly intounderlyingsink_write: (a: number, b: any) => any;
    readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
    readonly intounderlyingsource_cancel: (a: number) => void;
    readonly intounderlyingsource_pull: (a: number, b: any) => any;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
    readonly intounderlyingbytesource_start: (a: number, b: any) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly wasm_bindgen__closure__destroy__he1b35a6c06e1ddb3: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h12408e4d2144c895: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__he4e46a15b3b6da87: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__heac77dc8d198a3db: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__he06c6f45a38a54fa: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h58efaf5197e5de3a: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h6b1b8bbfee0d3e92: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h441bee516e9b07d4: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h34fbdd8836dfeb85: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h31471e852fb6c802: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hbf41809ff1ccb2fa: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__haa0573f6386476f2: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h821900d8264368d6: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
