import type { KernelGlobals } from './globals.js';
import type { Float3 } from '../util/math.js';
/** The result of lightTreeSample: the emitter and the probability of having picked it. */
export declare const treeSample: {
    emitter: number;
    pdf: number;
};
/** light_tree_sample (surfaces): picks an emitter for shading point P with normal N. Returns false when nothing can contribute. */
export declare function lightTreeSample(kg: KernelGlobals, rand: number, P: Float3, N: Float3, hasTransmission: boolean): boolean;
/** light_tree_pdf (surfaces): the probability that lightTreeSample picks emitter `target` from P with normal N. */
export declare function lightTreePdf(kg: KernelGlobals, P: Float3, N: Float3, hasTransmission: boolean, target: number): number;
