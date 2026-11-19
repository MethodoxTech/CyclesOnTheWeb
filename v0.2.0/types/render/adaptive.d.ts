export interface AdaptiveSampling {
    /** Cycles' kernel threshold: 5x the user's. */
    threshold: number;
    minSamples: number;
    /** Filter every `step` samples (a power of two). */
    step: number;
}
/** Integrator::get_adaptive_sampling: null when adaptive sampling is off. */
export declare function adaptiveSampling(threshold: number, minSamples: number): AdaptiveSampling | null;
/** AdaptiveSampling::need_filter: whether the convergence test runs after 0-based sample `sample`. */
export declare function needFilter(a: AdaptiveSampling, sample: number): boolean;
/** AdaptiveSampling::align_samples: how many of `num` samples from `start` to render before the next filter. */
export declare function alignSamples(a: AdaptiveSampling, start: number, num: number): number;
/** Splits a progressive pass schedule so that every filter sample ends a pass. */
export declare function alignSchedule(a: AdaptiveSampling | null, passes: number[]): number[];
/**
 * film_adaptive_sampling_convergence_check over every pixel, then film_adaptive_sampling_filter_x and _y: a pixel next to an unconverged one keeps sampling. sum is the RGBA film, ext the extra passes (EXT_STRIDE per pixel, aux and sample count used here), converged one flag per pixel, updated in place. Returns the number of pixels still sampling.
 */
export declare function convergenceCheck(a: AdaptiveSampling, width: number, height: number, sum: Float32Array, ext: Float32Array, converged: Uint8Array, reset?: boolean): number;
