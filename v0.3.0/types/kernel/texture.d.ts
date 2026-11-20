import type { KernelGlobals } from './globals.js';
/**
 * Samples texture descriptor `tex` at (u, v), writing linear RGBA into out[o..o+3]. v = 0 is the bottom of the image, as in glTF/three.js UV space after flipY.
 */
export declare function textureLookup(kg: KernelGlobals, tex: number, u: number, v: number, out: Float64Array, o?: number): void;
/** Equirectangular direction to UV, matching three.js equirectUv: u = atan2(z, x) / 2pi + 0.5, v = asin(y) / pi + 0.5, after rotating about +Y. */
export declare function directionToEquirect(dx: number, dy: number, dz: number, rotation: number, out: Float64Array, o?: number): void;
/** Inverse of directionToEquirect. */
export declare function equirectToDirection(u: number, v: number, rotation: number, out: Float64Array, o?: number): void;
