import { type CpuRendererOptions } from './cpu/renderer.js';
import type { Renderer } from './render/renderer.js';
/** The library version, injected at build time. */
export declare const VERSION: string;
export type * from './scene/types.js';
export { compileScene, type CompiledScene } from './scene/compile.js';
export { fromThreeScene, type FromThreeOptions, type FromThreeResult } from './three/adapter.js';
export { renderLocal, filmToLinear, type Film } from './render/local.js';
export { filmToRGBA8, passSchedule, type DisplayOptions, type RenderProgress, type Renderer } from './render/renderer.js';
export { DEFAULT_SETTINGS } from './render/params.js';
export { CpuRenderer, type CpuRendererOptions } from './cpu/renderer.js';
export { uvSphere, plane, box, trs } from './scene/primitives.js';
export interface CreateRendererOptions extends CpuRendererOptions {
    /** 'auto' uses WebGPU when available and falls back to the CPU; 'gpu' asks for WebGPU but still falls back (with fallbackReason set). */
    backend?: 'auto' | 'cpu' | 'gpu';
}
/** Creates a renderer on the requested backend. */
export declare function createRenderer(opts?: CreateRendererOptions): Promise<Renderer>;
