/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

type ReadableStreamType = "bytes";

export class EchoNode {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    connect(endpoint_id: string, payload: string): ReadableStream;
    endpoint_id(): string;
    events(): ReadableStream;
    static spawn(): Promise<EchoNode>;
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
    readonly __wbg_echonode_free: (a: number, b: number) => void;
    readonly echonode_connect: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly echonode_endpoint_id: (a: number, b: number) => void;
    readonly echonode_events: (a: number) => number;
    readonly echonode_spawn: () => number;
    readonly start: () => void;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
    readonly intounderlyingbytesource_start: (a: number, b: number) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly intounderlyingsink_abort: (a: number, b: number) => number;
    readonly intounderlyingsink_close: (a: number) => number;
    readonly intounderlyingsink_write: (a: number, b: number) => number;
    readonly intounderlyingsource_cancel: (a: number) => void;
    readonly intounderlyingsource_pull: (a: number, b: number) => number;
    readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly __wasm_bindgen_func_elem_5133: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_5151: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_5907: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_6718: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_13960: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_14023: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_1561: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_14169: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_5952: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_14039: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_2097: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_5139: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_5170: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_6727: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_13977: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
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
