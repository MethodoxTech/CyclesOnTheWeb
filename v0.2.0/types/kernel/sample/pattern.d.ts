export declare const PRNG_FILTER = 0;
export declare const PRNG_LENS_TIME = 1;
export declare const PRNG_TERMINATE = 0;
export declare const PRNG_LIGHT = 1;
export declare const PRNG_LIGHT_TERMINATE = 2;
export declare const PRNG_SURFACE_BSDF = 3;
export declare const PRNG_SURFACE_AO = 4;
export declare const PRNG_SURFACE_BEVEL = 5;
export declare const PRNG_BOUNCE_NUM = 16;
/** Per-pixel sequence seed for the white-noise Sobol pattern (Cycles path_rng_pixel_init). */
export declare function pathRngPixelInit(x: number, y: number, seed: number): number;
/** The sampler state carried by a path: the pixel's sequence seed, the dimension offset for the current bounce, and the sample index. */
export interface RngState {
    rngPixel: number;
    rngOffset: number;
    sample: number;
}
export declare class PathRng {
    /** Sequence-length mask; see sobolIndexMask. */
    mask: number;
    rng1D(s: RngState, dimension: number): number;
    rng2D(s: RngState, dimension: number, out: Float64Array, o?: number): void;
    rng3D(s: RngState, dimension: number, out: Float64Array, o?: number): void;
}
