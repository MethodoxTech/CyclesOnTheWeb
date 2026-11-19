/** The library version, injected at build time. */
export declare const VERSION: string;
export type * from './scene/types.js';
export { compileScene, type CompiledScene } from './scene/compile.js';
export { fromThreeScene, fromThreeCamera, type FromThreeOptions, type FromThreeResult } from './three/adapter.js';
export { renderLocal, filmToLinear, filmPass, filmSampleCounts, type Film } from './render/local.js';
export { denoiseFilm, denoiseInput, type DenoiseInput, type Denoiser } from './render/denoise.js';
export { adaptiveSampling, type AdaptiveSampling } from './render/adaptive.js';
export { filmToRGBA8, passSchedule, type DisplayOptions, type RenderProgress, type Renderer } from './render/renderer.js';
export { DEFAULT_SETTINGS } from './render/params.js';
export { CpuRenderer, canShareMemory, type CpuRendererOptions, type SceneTransfer } from './cpu/renderer.js';
export { uvSphere, plane, box, trs } from './scene/primitives.js';
export { createRenderer, type CreateRendererOptions } from './render/create.js';
export { renderThreeScene, type RenderThreeSceneOptions, type ThreeRenderHandle, type ThreeRenderProgress } from './three/render.js';
