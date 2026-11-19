export declare function reverseIntegerBits(x: number): number;
/** Hash-based base-2 Owen scrambling of a bit-reversed integer (Cycles reversed_bit_owen). */
export declare function reversedBitOwen(n: number, seed: number): number;
export declare function nestedUniformScramble(i: number, seed: number): number;
export declare function sobolBurleySample1D(index: number, dimension: number, seed: number, mask: number): number;
export declare function sobolBurleySample2D(index: number, dimensionSet: number, seed: number, mask: number, out: Float64Array | number[], o?: number): void;
export declare function sobolBurleySample3D(index: number, dimensionSet: number, seed: number, mask: number, out: Float64Array | number[], o?: number): void;
export declare function sobolBurleySample4D(index: number, dimensionSet: number, seed: number, mask: number, out: Float64Array | number[], o?: number): void;
/**
 * The sequence-length mask Cycles derives from the sample count (Integrator::device_update): the next power of two at or above the sample count, as a mask of high bits in the reversed index.
 */
export declare function sobolIndexMask(maxSamples: number): number;
