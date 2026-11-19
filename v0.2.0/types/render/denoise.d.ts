import type { Film } from './local.js';
export interface DenoiseInput {
    width: number;
    height: number;
    /** Linear RGB per pixel, averaged over the pixel's samples, row 0 at the top. */
    color: Float32Array;
    /** Denoising albedo (linear RGB), or null when the render did not write passes. */
    albedo: Float32Array | null;
    /** Denoising normal in camera space (x right, y up, z towards the viewer), or null. */
    normal: Float32Array | null;
    /** Samples per pixel so far. */
    samples: number;
}
/** A denoiser: returns linear RGB, three floats per pixel. */
export type Denoiser = (input: DenoiseInput) => Float32Array | Promise<Float32Array>;
/** The inputs a denoiser gets for this film. */
export declare function denoiseInput(film: Film): DenoiseInput;
/** Runs the denoiser on the film and returns a film holding the result (one sample per pixel, alpha kept), ready for filmToRGBA8. */
export declare function denoiseFilm(film: Film, denoiser: Denoiser): Promise<Film>;
