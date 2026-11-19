import { type Float3 } from '../../util/math.js';
/** Concentric (Shirley-Chiu) mapping of the unit square to the unit disk, written into out[o], out[o+1]. */
export declare function sampleUniformDisk(rx: number, ry: number, out: Float64Array | number[], o?: number): void;
/** Cosine-weighted hemisphere sample around N. Returns the pdf; the direction is written to wo. */
export declare function sampleCosHemisphere(N: Float3, rx: number, ry: number, wo: Float3): number;
/** Uniform cone around N with the given 1 - cos(half angle). Writes direction to wo; returns cos(theta) via the second slot of `ret` and the pdf in the first. */
export declare function sampleUniformCone(N: Float3, oneMinusCosAngle: number, rx: number, ry: number, wo: Float3, ret: Float64Array): void;
export declare function sampleUniformSphere(rx: number, ry: number, wo: Float3): void;
/** Power heuristic with beta = 2 (Cycles power_heuristic). */
export declare function powerHeuristic(a: number, b: number): number;
