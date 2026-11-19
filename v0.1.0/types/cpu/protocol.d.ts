export type ToWorker = {
    type: 'scene';
    scene: Uint32Array;
    texels: Uint32Array;
} | {
    type: 'params';
    params: Uint32Array;
    generation: number;
} | {
    type: 'tile';
    id: number;
    generation: number;
    x: number;
    y: number;
    w: number;
    h: number;
    sampleStart: number;
    sampleCount: number;
};
export type FromWorker = {
    type: 'ready';
} | {
    type: 'tile';
    id: number;
    generation: number;
    data: Float32Array;
    ms: number;
} | {
    type: 'error';
    message: string;
};
