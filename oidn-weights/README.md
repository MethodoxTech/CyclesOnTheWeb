# Open Image Denoise weights

Two of Intel's trained weight sets for [Open Image Denoise](https://github.com/RenderKit/oidn)'s ray tracing filter, for denoising path traced pictures in the browser (for example with [oidn-web](https://github.com/pissang/oidn-web)). Both take an HDR colour picture with albedo and normal guides, as Cycles on the Web writes them with `denoisingPasses`.

| File | Size | What it is |
| --- | --- | --- |
| `rt_hdr_alb_nrm.tza` | 1,841,160 bytes | The default model: best quality. |
| `rt_hdr_alb_nrm_small.tza` | 641,480 bytes | The small model: about half the work, a little softer. |

They are byte for byte the files of [RenderKit/oidn-weights](https://github.com/RenderKit/oidn-weights) at commit `28883d1769d5930e13cf7f1676dd852bd81ed9e7` (2024-04-28), whose SHA-256 hashes are `e586ef2f…` and `980ea307…` as that repository's Git LFS pointers record them, and are distributed under its Apache License 2.0 (`LICENSE.txt`, copied from there). They are here so that pages can load them from a CDN pinned to a commit of this repository, since jsDelivr does not serve Git LFS files.
