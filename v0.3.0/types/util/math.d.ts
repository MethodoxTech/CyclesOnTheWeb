export interface Float3 {
    x: number;
    y: number;
    z: number;
}
export declare const M_PI: number;
export declare const M_2PI: number;
export declare const M_1_PI: number;
export declare const M_1_2PI: number;
export declare const M_1_4PI: number;
export declare const M_PI_2: number;
export declare const M_PI_4: number;
export declare const FLT_MAX = 3.4028234663852886e+38;
export declare function f3(x?: number, y?: number, z?: number): Float3;
export declare function set3(o: Float3, x: number, y: number, z: number): Float3;
export declare function copy3(o: Float3, a: Float3): Float3;
export declare function add3(o: Float3, a: Float3, b: Float3): Float3;
export declare function sub3(o: Float3, a: Float3, b: Float3): Float3;
export declare function scale3(o: Float3, a: Float3, s: number): Float3;
export declare function mul3(o: Float3, a: Float3, b: Float3): Float3;
/** o = a + b * s */
export declare function madd3(o: Float3, a: Float3, b: Float3, s: number): Float3;
export declare function dot3(a: Float3, b: Float3): number;
/** o must not alias a or b. */
export declare function cross3(o: Float3, a: Float3, b: Float3): Float3;
export declare function len3(a: Float3): number;
export declare function lenSq3(a: Float3): number;
export declare function normalize3(o: Float3, a: Float3): Float3;
/** Normalizes a, falling back to `fallback` when a has zero length (Cycles safe_normalize_fallback). */
export declare function safeNormalizeFallback3(o: Float3, a: Float3, fallback: Float3): Float3;
export declare function negate3(o: Float3, a: Float3): Float3;
export declare function average3(a: Float3): number;
export declare function maxComponent3(a: Float3): number;
export declare function isZero3(a: Float3): boolean;
export declare function clamp(x: number, lo: number, hi: number): number;
export declare function saturate(x: number): number;
export declare function mix(a: number, b: number, t: number): number;
export declare function sqr(x: number): number;
export declare function safeSqrt(x: number): number;
export declare function safeAcos(x: number): number;
export declare function safeAsin(x: number): number;
export declare function safeDivide(a: number, b: number): number;
export declare function inverseLerp(a: number, b: number, x: number): number;
export declare function sinFromCos(c: number): number;
/** Orthonormal basis around N (Cycles make_orthonormals). a and b must not alias N. */
export declare function makeOrthonormals(N: Float3, a: Float3, b: Float3): void;
/** Basis from N and a tangent T (Cycles make_orthonormals_tangent). */
export declare function makeOrthonormalsTangent(N: Float3, T: Float3, a: Float3, b: Float3): void;
/** o = x*X + y*Y + z*Z. o must not alias X, Y or Z. */
export declare function toGlobal(o: Float3, x: number, y: number, z: number, X: Float3, Y: Float3, Z: Float3): Float3;
/** Column-major 4x4 matrix helpers (three.js layout), used only at scene build time. */
export type Mat4 = Float64Array | number[];
export declare function mat4Identity(): number[];
export declare function mat4Multiply(a: ArrayLike<number>, b: ArrayLike<number>): number[];
export declare function mat4TransformPoint(m: ArrayLike<number>, x: number, y: number, z: number, out: number[] | Float32Array, o: number): void;
export declare function mat4TransformDirection(m: ArrayLike<number>, x: number, y: number, z: number, out: number[] | Float32Array, o: number): void;
export declare function mat4Invert(m: ArrayLike<number>): number[];
export declare function mat4Determinant3x3(m: ArrayLike<number>): number;
