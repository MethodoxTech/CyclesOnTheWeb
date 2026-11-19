import { LABEL_TRANSMIT } from './closure/bsdf.js';
import type { KernelGlobals } from './globals.js';
export declare const PATH_RAY_CAMERA: number;
export declare const PATH_RAY_REFLECT: number;
export declare const PATH_RAY_TRANSMIT: number;
export declare const PATH_RAY_DIFFUSE: number;
export declare const PATH_RAY_GLOSSY: number;
export declare const PATH_RAY_SINGULAR: number;
export declare const PATH_RAY_TRANSPARENT: number;
export declare const PATH_RAY_MIS_SKIP: number;
export declare const PATH_RAY_MIS_HAD_TRANSMISSION: number;
export declare const PATH_RAY_TERMINATE_ON_NEXT_SURFACE: number;
export declare const PATH_RAY_TERMINATE_AFTER_TRANSPARENT: number;
export declare const PATH_RAY_TRANSPARENT_BACKGROUND: number;
export declare const PATH_RAY_DIFFUSE_ANCESTOR: number;
/** The path still writes denoising features (Cycles PATH_RAY_DENOISING_FEATURES). */
export declare const PATH_RAY_DENOISING_FEATURES: number;
/** Floats per pixel of the extra passes a tile can return: adaptive aux RGB and sample count, denoising albedo RGB, denoising normal XYZ. */
export declare const EXT_STRIDE = 12;
export declare const EXT: {
    readonly AUX: 0;
    readonly COUNT: 3;
    readonly ALBEDO: 4;
    readonly FLAG: 7;
    readonly NORMAL: 8;
};
/** Cycles sample_is_class_A for Sobol-Burley: which half of the samples feeds the adaptive sampling aux buffer. */
export declare function sampleIsClassA(sample: number): boolean;
export interface IntegratorParams {
    width: number;
    height: number;
    seed: number;
    sobolMask: number;
    maxBounce: number;
    maxDiffuse: number;
    maxGlossy: number;
    maxTransmission: number;
    maxTransparent: number;
    minBounce: number;
    /** Cycles' kernel values: 3x the user clamp (sum over RGB), or Infinity when off. */
    clampDirect: number;
    clampIndirect: number;
    /** Cycles' kernel filter_glossy (1 / Filter Glossy), 0 when off. */
    filterGlossy: number;
    /** Write the denoising albedo and normal features. */
    denoisingFeatures: boolean;
    /** Camera-to-world rows (3x4). */
    camToWorld: Float64Array;
    tanHalfFov: number;
    aspect: number;
    aperture: number;
    focusDistance: number;
    backgroundCameraVisible: boolean;
}
/** Reads IntegratorParams from the shared params record (see layout P). */
export declare function readParams(params: Uint32Array): IntegratorParams;
/**
 * The CPU integrator. One instance per worker; it owns all scratch state so tracing allocates nothing.
 */
export declare class Integrator {
    readonly kg: KernelGlobals;
    readonly p: IntegratorParams;
    private readonly rng;
    private readonly state;
    private readonly ray;
    private readonly hit;
    private readonly shadowRay;
    private readonly shadowHit;
    private readonly sd;
    private readonly shadowSd;
    private readonly ls;
    private readonly lightHit;
    private readonly evalRes;
    private readonly r2;
    private readonly r3;
    private readonly rgb;
    private readonly rgb2;
    private readonly wo;
    /** Denoising features of the current sample (albedo and camera-space normal) and the feature throughput of the path. */
    readonly featAlbedo: Float64Array<ArrayBuffer>;
    readonly featNormal: Float64Array<ArrayBuffer>;
    private readonly featT;
    private readonly albTmp;
    /** Origin of the current ray, for light tree pdfs. */
    private readonly rayP;
    private readonly tmpV;
    /** Radiance of the current sample. */
    private Lr;
    private Lg;
    private Lb;
    private alpha;
    private er;
    private eg;
    private eb;
    constructor(kg: KernelGlobals, params: IntegratorParams);
    /**
     * Render samples [sampleStart, sampleStart + sampleCount) for the pixels of a tile and add them into `out` (RGBA per pixel, tile-local, row-major).
     */
    /**
     * Renders samples [sampleStart, sampleStart + sampleCount) of a tile, adding linear RGBA sums into out. With ext (EXT_STRIDE floats per pixel) it also adds the adaptive sampling aux buffer (twice the class A samples, as film_write_adaptive_buffer), the number of samples taken, and, when denoising features are on, the albedo and normal passes. Pixels whose converged flag is set are skipped, as film_need_sample_pixel skips them.
     */
    renderTile(x0: number, y0: number, w: number, h: number, sampleStart: number, sampleCount: number, out: Float32Array, ext?: Float32Array, converged?: Uint8Array): void;
    /** film_write_denoising_features_surface with Cycles' default options (follow reflections, albedo roughness weighting). */
    private writeDenoisingFeatures;
    /** Trace one camera sample through pixel (x, y), y = 0 at the top. Writes linear RGBA. */
    tracePixelSample(x: number, y: number, sample: number, out: Float64Array): void;
    /** Perspective camera ray through raster position (rx, ry) in pixels (Cycles camera_sample_perspective). */
    private cameraRay;
    /** Cycles path_state_continuation_probability. */
    private continuationProbability;
    /** Add a light contribution with Cycles' sample clamping (film_clamp_light). */
    private filmWrite;
    /** The probability of having picked lamp `lamp` by next-event estimation from the previous path vertex (the current ray's origin): the light tree's pdf there, or the flat distribution's share. */
    private lampSelectionPdf;
    private shadeLight;
    /** Cycles integrator_shade_background: distant lights with an angle, then the world. */
    private shadeBackground;
    /** Returns false when the path ends. */
    private shadeSurface;
    /** One-sample MIS evaluation over all closures (Cycles _surface_shader_bsdf_eval_mis). Accumulates eval in er/eg/eb and returns the combined pdf. */
    private evalMis;
    private directLight;
    /** Emission of a textured mesh light at the sampled point. */
    private evalEmissionAt;
    /**
     * Shadow ray through transparent surfaces (Cycles intersect_shadow + shade_shadow): returns false when blocked, otherwise the transmitted throughput in out.
     */
    private traceShadow;
    private bsdfBounce;
    /** Cycles path_state_next. */
    private pathStateNext;
    /** Cycles integrate_surface_ray_offset: keep P unless the ray could hit a neighbouring triangle, then nudge along Ng. */
    private integrateSurfaceRayOffset;
    /**
     * Cycles shadow_ray_offset: lift the shadow ray origin off low-poly smooth surfaces (shadow terminator geometry offset 0.1, the object default). Returns whether the ray should skip its own triangle.
     */
    private shadowRayOffset;
}
export { LABEL_TRANSMIT };
