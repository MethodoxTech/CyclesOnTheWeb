import { type CpuRendererOptions } from '../cpu/renderer.js';
import type { Renderer } from './renderer.js';
export interface CreateRendererOptions extends CpuRendererOptions {
    /** 'auto' uses WebGPU when available and falls back to the CPU; 'gpu' asks for WebGPU but still falls back (with fallbackReason set). */
    backend?: 'auto' | 'cpu' | 'gpu';
}
/** Creates a renderer on the requested backend. */
export declare function createRenderer(opts?: CreateRendererOptions): Promise<Renderer>;
