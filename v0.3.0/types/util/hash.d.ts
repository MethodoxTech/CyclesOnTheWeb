/** Maps a uint32 to [0, 1). Cycles divides by 4294967808 rather than 2^32 so that float rounding cannot produce 1.0. */
export declare function uintToFloatExcl(n: number): number;
/** Hash Prospector mixing function (Cycles hash_hp_uint). */
export declare function hashHpUint(i: number): number;
/** Seedable variant of hashHpUint (Cycles hash_hp_seeded_uint). */
export declare function hashHpSeededUint(i: number, seed: number): number;
export declare function hashHpFloat(i: number): number;
/** Modified Wang hash (Cycles hash_wang_seeded_uint). */
export declare function hashWangSeededUint(i: number, seed: number): number;
/** Per-pixel hash used to decorrelate pixels (Cycles hash_iqnt2d). */
export declare function hashIqnt2d(x: number, y: number): number;
/** Bob Jenkins' lookup3 final mix of a single uint, used for seeding (Cycles hash_uint). */
export declare function hashUint(kx: number): number;
