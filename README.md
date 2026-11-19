# CyclesOnTheWeb

Built releases of [Cycles on the Web](https://github.com/Methodox-Technologies/DivookaFrontendComponents_CyclesOnTheWeb), a port of Blender's [Cycles](https://github.com/blender/cycles) path tracer to the web: a CPU backend in Web Workers and a WebGPU backend, behind one API. This repository holds only the built files, one folder per version, and is meant to be loaded from a CDN.

## Loading from a CDN

Each release is a git tag and a folder of the same name. With jsDelivr:

```js
import { renderThreeScene } from 'https://cdn.jsdelivr.net/gh/MethodoxTech/CyclesOnTheWeb@v0.2.0/v0.2.0/cycles.min.js';
```

A tag can also be replaced by the commit that published the release, which pins the files just as firmly and works before the tag exists: v0.2.0 is commit `513d4f4eb5179a5f854c0f1e6696db25b10b2c15`, so `https://cdn.jsdelivr.net/gh/MethodoxTech/CyclesOnTheWeb@513d4f4eb5179a5f854c0f1e6696db25b10b2c15/v0.2.0/cycles.min.js` loads this release. The Versions table below names the commit of every release.

jsDelivr sometimes answers a request for a `.min.js` file with its own Terser minification of the `.js` file beside it, and says so in a comment at the top: on the day v0.2.0 was published, the full commit hash above served the published `cycles.min.js` byte for byte, while the short hash `513d4f4`, and every form of the v0.1.0 URL, served jsDelivr's minification of `cycles.js`. Both are the same code. When the exact published bytes matter (for subresource integrity, say), load `cycles.js`, which jsDelivr serves unchanged.

Or, without a CDN in between, `https://raw.githubusercontent.com/MethodoxTech/CyclesOnTheWeb/v0.2.0/v0.2.0/cycles.min.js` (raw.githubusercontent serves JavaScript as text/plain, so browsers will not execute it as a module; use jsDelivr or host the files yourself).

The CPU backend starts its workers from `cycles-worker.js` in the same folder. Browsers only start same-origin workers, so when the bundle comes from a CDN the library starts each worker through a small blob module that imports the CDN script; nothing needs configuring. To host the worker elsewhere, pass `createRenderer({ workerUrl })`.

Since v0.2.0 one call path traces a three.js scene into a canvas, restarting when the camera or the scene changes:

```js
const handle = renderThreeScene({ canvas, scene, camera, samples: 256, onProgress: (p) => console.log(p.samples, p.backend) });
await handle.done; // handle.restart(), handle.stop() and handle.dispose() are there too
```

The lower-level pieces remain:

```js
import { createRenderer, fromThreeScene, filmToRGBA8 } from 'https://cdn.jsdelivr.net/gh/MethodoxTech/CyclesOnTheWeb@v0.2.0/v0.2.0/cycles.min.js';

const renderer = await createRenderer({ backend: 'auto' }); // WebGPU when available, CPU workers otherwise
const { scene, warnings } = fromThreeScene(threeScene, threeCamera); // three.js r160 or later
await renderer.setScene(scene, { width: 640, height: 480, samples: 256 });
await renderer.render((progress, film) => {
  ctx.putImageData(new ImageData(filmToRGBA8(film), film.width, film.height), 0, 0);
});
console.log(renderer.backend, renderer.fallbackReason ?? '');
```

## Files in a release folder

| File | What it is |
| --- | --- |
| `cycles.js`, `cycles.min.js` | The library: an ES module with no dependencies (three.js is only needed to build the scene you pass to `fromThreeScene`). |
| `cycles-worker.js`, `cycles-worker.min.js` | The CPU render worker, started by the library. |
| `types/` | TypeScript declarations; `types/index.d.ts` is the entry. |
| `demo/` | A three.js scene previewed with three.js and path traced side by side. Serve the release folder over http(s) and open `demo/index.html`. |
| `LICENSE`, `NOTICE` | Apache-2.0, with attribution to Cycles and the Blender Foundation. |

## Versions

| Version | Notes |
| --- | --- |
| [v0.2.0](v0.2.0) (commit `513d4f4`) | Principled coat, sheen and anisotropy (three.js clearcoat, sheen and anisotropy map onto them) and Filter Glossy; Cycles' light tree; adaptive sampling, albedo and normal passes and a denoiser hook; nearest-first BVH traversal and a scene shared by the CPU workers through SharedArrayBuffer on cross-origin isolated pages; `renderThreeScene`. Built from the source repository at `c7a9acf`. |
| [v0.1.0](v0.1.0) (commit `82a3fd3`) | First release: Cycles' integrator on the CPU (workers) and WebGPU (wavefront kernels); Principled, Diffuse, Glossy, Glass, Emission and Transparent materials; point, spot, sun, area and mesh lights and an importance-sampled HDR environment; three.js adapter. |

## License

Apache-2.0, as Cycles is. See `LICENSE` and `NOTICE` in each release folder.
