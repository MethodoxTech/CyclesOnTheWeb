export type ToWorker = {
    type: 'scene';
    scene: Uint32Array;
    texels: Uint32Array;
} | {
    type: 'params';
    params: Uint32Array;
    generation: number;
}
/** A tile of samples. With ext the worker also returns the extra passes; converged (one byte per tile pixel) marks pixels to skip. */
 | {
    type: 'tile';
    id: number;
    generation: number;
    x: number;
    y: number;
    w: number;
    h: number;
    sampleStart: number;
    sampleCount: number;
    ext?: boolean;
    converged?: Uint8Array;
};
export type FromWorker = {
    type: 'ready';
}
/** Acknowledges a scene, saying whether the worker reads the caller's memory (SharedArrayBuffer) or its own copy. */
 | {
    type: 'scene';
    shared: boolean;
} | {
    type: 'tile';
    id: number;
    generation: number;
    data: Float32Array;
    ext?: Float32Array;
    ms: number;
} | {
    type: 'error';
    message: string;
};
