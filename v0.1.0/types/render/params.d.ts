import type { PerspectiveCamera, RenderSettings } from '../scene/types.js';
export declare const DEFAULT_SETTINGS: {
    samples: number;
    seed: number;
    maxBounces: number;
    maxDiffuseBounces: number;
    maxGlossyBounces: number;
    maxTransmissionBounces: number;
    maxTransparentBounces: number;
    minBounces: number;
    clampDirect: number;
    clampIndirect: number;
    filter: 'blackman-harris';
    filterWidth: number;
};
export type ResolvedSettings = Required<Omit<RenderSettings, 'backgroundMapResolution'>> & {
    backgroundMapResolution: number;
};
export declare function resolveSettings(s: RenderSettings): ResolvedSettings;
/** Camera-to-world as 3x4 rows: columns are right, up, back (camera looks down -Z) and position. */
export declare function cameraToWorld(camera: PerspectiveCamera): number[];
export interface FrameParamsOptions {
    sampleStart?: number;
    sampleCount?: number;
    /** Total samples the frame will receive; sets the Sobol sequence-length mask as Cycles does. */
    totalSamples?: number;
    backgroundCameraVisible?: boolean;
}
export declare function makeParams(camera: PerspectiveCamera, settings: ResolvedSettings, opts?: FrameParamsOptions): Uint32Array;
