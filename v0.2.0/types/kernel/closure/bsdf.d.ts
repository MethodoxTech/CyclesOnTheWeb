import { type Float3 } from '../../util/math.js';
import type { KernelGlobals } from '../globals.js';
export declare const CLOSURE_NONE = 0;
export declare const CLOSURE_BSDF_DIFFUSE = 1;
export declare const CLOSURE_BSDF_MICROFACET_GGX = 2;
export declare const CLOSURE_BSDF_MICROFACET_GGX_REFRACTION = 3;
export declare const CLOSURE_BSDF_MICROFACET_GGX_GLASS = 4;
export declare const CLOSURE_BSDF_TRANSPARENT = 5;
export declare const CLOSURE_BSDF_SHEEN = 6;
export declare function closureIsBsdf(type: number): boolean;
export declare function closureIsMicrofacet(type: number): boolean;
export declare function closureIsGlass(type: number): boolean;
export declare function closureIsRefraction(type: number): boolean;
export declare const LABEL_NONE = 0;
export declare const LABEL_TRANSMIT = 1;
export declare const LABEL_REFLECT = 2;
export declare const LABEL_DIFFUSE = 4;
export declare const LABEL_GLOSSY = 8;
export declare const LABEL_SINGULAR = 16;
export declare const LABEL_TRANSPARENT = 32;
export declare const FRESNEL_NONE = 0;
export declare const FRESNEL_DIELECTRIC = 1;
export declare const FRESNEL_GENERALIZED_SCHLICK = 4;
export declare const FRESNEL_F82_TINT = 5;
export declare const SR_BSDF = 1;
export declare const SR_BSDF_HAS_EVAL = 2;
export declare const SR_BSDF_HAS_TRANSMISSION = 4;
export declare const SR_EMISSION = 8;
export declare const SR_TRANSPARENT = 16;
export declare const SR_BACKFACING = 32;
export declare const CLOSURE_WEIGHT_CUTOFF = 0.00001;
export declare const MAX_CLOSURE = 8;
/** A shader closure: Cycles' ShaderClosure with the MicrofacetBsdf and Fresnel extra data flattened in. */
export declare class Closure {
    type: number;
    wr: number;
    wg: number;
    wb: number;
    sampleWeight: number;
    N: Float3;
    /** GGX alpha_x (along T); for sheen, the LTC transformA. */
    alpha: number;
    /** GGX alpha_y; for sheen, the LTC transformB. Equal to alpha for isotropic GGX. */
    alphaY: number;
    /** Tangent of anisotropic GGX (Cycles MicrofacetBsdf::T), or the sheen frame's T. */
    T: Float3;
    ior: number;
    energyScale: number;
    fresnelType: number;
    f0r: number;
    f0g: number;
    f0b: number;
    f90r: number;
    f90g: number;
    f90b: number;
    exponent: number;
    tintRr: number;
    tintRg: number;
    tintRb: number;
    tintTr: number;
    tintTg: number;
    tintTb: number;
    br: number;
    bg: number;
    bb: number;
}
/** RGB output of an evaluation, plus the pdf. */
export declare class BsdfEvalResult {
    r: number;
    g: number;
    b: number;
    pdf: number;
}
export declare function F0FromIor(ior: number): number;
export declare function iorFromF0(f0: number): number;
/** Unpolarised dielectric Fresnel (Cycles fresnel_dielectric). Stores cos(theta_t) relative to the normal (negative) in the module's last-cos slot. */
export declare function fresnelDielectric(cosThetaI: number, eta: number): number;
export declare function lastCosThetaT(): number;
export declare function fresnelDielectricFss(eta: number): number;
/** Raises a shading normal whose specular reflection would point below the surface (Cycles ensure_valid_specular_reflection). Writes into out. */
export declare function ensureValidSpecularReflection(Ng: Float3, I: Float3, N: Float3, out: Float3): Float3;
/** Cycles bsdf_microfacet_ggx_setup. alpha, alphaY and T must be filled in (alphaY = alpha and a zero T when isotropic). */
export declare function setupGgx(c: Closure): number;
export declare function setupGgxGlass(c: Closure): number;
/** Cycles bsdf_microfacet_setup_fresnel_dielectric (used by the Principled coat). */
export declare function setupFresnelDielectric(kg: KernelGlobals, c: Closure, wi: Float3): void;
/** Cycles bsdf_microfacet_estimate_albedo, exported for layering (reflection only when evalTransmission is false). */
export declare function microfacetAlbedo(kg: KernelGlobals, wi: Float3, c: Closure, evalReflection: boolean, evalTransmission: boolean, out: Float64Array): void;
/**
 * Cycles bsdf_sheen_setup on an allocated closure c (weight already set): looks up the LTC transform and albedo, scales the weight by the albedo and returns the layering albedo max(weight), or 0 when the LTC is invalid (the closure is then disabled).
 */
export declare function setupSheen(kg: KernelGlobals, c: Closure, wi: Float3, roughness: number): number;
/** Cycles bsdf_microfacet_setup_fresnel_generalized_schlick. The Fresnel fields must already be filled in. */
export declare function setupFresnelGeneralizedSchlick(kg: KernelGlobals, c: Closure, wi: Float3, preserveEnergy: boolean): void;
/** Cycles bsdf_microfacet_setup_fresnel_f82_tint. f0 must be filled in. */
export declare function setupFresnelF82Tint(kg: KernelGlobals, c: Closure, wi: Float3, tr: number, tg: number, tb: number, preserveEnergy: boolean): void;
/** Cycles bsdf_microfacet_setup_fresnel_constant: energy preservation with the colour as the multi-bounce Fresnel. */
export declare function setupFresnelConstant(kg: KernelGlobals, c: Closure, wi: Float3, r: number, g: number, b: number): void;
/** The albedo used to attenuate layers below this closure (Cycles closure_layer_albedo): weight * max(albedo). Written into out. */
export declare function closureLayerAlbedo(kg: KernelGlobals, wi: Float3, c: Closure, out: Float64Array): void;
/** Evaluate closure c for incoming wi and outgoing wo. Eval is BSDF * cos, without the closure weight. */
export declare function bsdfEval(c: Closure, wi: Float3, wo: Float3, res: BsdfEvalResult): void;
/** Sample closure c. Returns the label; direction in wo, eval (BSDF * cos) and pdf in res. */
export declare function bsdfSample(c: Closure, Ng: Float3, wi: Float3, rx: number, ry: number, rz: number, res: BsdfEvalResult, wo: Float3): number;
/** Cycles bsdf_blur: raises the roughness of microfacet closures to at least `roughness` (without recomputing their energy compensation, as Cycles). */
export declare function bsdfBlur(c: Closure, roughness: number): void;
/** Squared roughness used for MIS bookkeeping (Cycles bsdf_get_specular_roughness_squared). */
export declare function bsdfRoughnessSquared(c: Closure): number;
