/*! Cycles on the Web v0.2.0 | Apache-2.0 | A port of Blender's Cycles (Copyright Blender Foundation, Apache-2.0) | https://github.com/Methodox-Technologies/DivookaFrontendComponents_CyclesOnTheWeb */
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/scene/layout.ts
var SCENE_MAGIC, SCENE_VERSION, H, NONE, SceneFlags, NODE_SIZE, TRI_VERTS_SIZE, TRI_INFO_SIZE, TI, TriFlags, VERT_NORMAL_SIZE, VERT_UV_SIZE, SHADER_SIZE, SH, ShaderType, ShaderFlags, TEX_SIZE, TX, TexFlags, LIGHT_SIZE, LT, LightType, LightFlags, LIGHT_TREE_NODE_SIZE, LTN, LightTreeNodeType, LIGHT_TREE_EMITTER_SIZE, LTE, DIST_SIZE, FILTER_TABLE_SIZE, PARAMS_SIZE, P;
var init_layout = __esm({
  "src/scene/layout.ts"() {
    "use strict";
    SCENE_MAGIC = 1129923415;
    SCENE_VERSION = 2;
    H = {
      MAGIC: 0,
      VERSION: 1,
      NUM_NODES: 2,
      NODES: 3,
      NUM_TRIS: 4,
      TRI_VERTS: 5,
      TRI_INFO: 6,
      NUM_VERTS: 7,
      VERT_NORMALS: 8,
      VERT_UVS: 9,
      NUM_SHADERS: 10,
      SHADERS: 11,
      NUM_TEXTURES: 12,
      TEXTURES: 13,
      NUM_LIGHTS: 14,
      LIGHTS: 15,
      NUM_DISTRIBUTION: 16,
      DISTRIBUTION: 17,
      /** f32: Cycles' distribution_pdf_triangles. */
      PDF_TRIANGLES: 18,
      /** f32: Cycles' distribution_pdf_lights. */
      PDF_LIGHTS: 19,
      /** Index of the background light in the light list, or NONE. */
      BACKGROUND_LIGHT: 20,
      BG_RES_X: 21,
      BG_RES_Y: 22,
      BG_MARGINAL: 23,
      BG_CONDITIONAL: 24,
      FILTER_TABLE: 25,
      /** The world shader record index. */
      WORLD_SHADER: 26,
      /** Bit flags, see SceneFlags. */
      FLAGS: 27,
      TABLE_GGX_E: 28,
      TABLE_GGX_EAVG: 29,
      TABLE_GGX_GLASS_E: 30,
      TABLE_GGX_GLASS_EAVG: 31,
      TABLE_GGX_GLASS_INV_E: 32,
      TABLE_GGX_GLASS_INV_EAVG: 33,
      TABLE_GGX_GEN_SCHLICK_IOR_S: 34,
      TABLE_GGX_GEN_SCHLICK_S: 35,
      TABLE_SHEEN_LTC: 36,
      /** Cycles' light tree (when SceneFlags.USE_LIGHT_TREE): node count, node records and emitter records. */
      NUM_LIGHT_TREE_NODES: 37,
      LIGHT_TREE_NODES: 38,
      LIGHT_TREE_EMITTERS: 39,
      /** f32 world-space scene bounds, used for the scene radius of distant lights. */
      BOUNDS_MIN: 40,
      BOUNDS_MAX: 43,
      /** Number of lights that can be hit by rays (area, sphere, sun with angle), listed first-light-index-last in LIGHT_HITTABLE. */
      NUM_HITTABLE_LIGHTS: 46,
      HITTABLE_LIGHTS: 47,
      SIZE: 64
    };
    NONE = 4294967295;
    SceneFlags = {
      USE_DIRECT_LIGHT: 1,
      BACKGROUND_MIS: 2,
      /** Lights are picked with the light tree rather than the flat distribution. */
      USE_LIGHT_TREE: 4
    };
    NODE_SIZE = 8;
    TRI_VERTS_SIZE = 12;
    TRI_INFO_SIZE = 8;
    TI = { V0: 0, V1: 1, V2: 2, SHADER: 3, OBJECT: 4, FLAGS: 5, EMITTER: 6, PAD1: 7 };
    TriFlags = {
      SMOOTH: 1,
      HAS_UV: 2,
      CAMERA_INVISIBLE: 4,
      SHADOW_INVISIBLE: 8,
      EMISSIVE: 16
    };
    VERT_NORMAL_SIZE = 4;
    VERT_UV_SIZE = 2;
    SHADER_SIZE = 48;
    SH = {
      TYPE: 0,
      FLAGS: 1,
      BASE_COLOR: 2,
      // 3 floats
      BASE_COLOR_TEX: 5,
      METALLIC: 6,
      ROUGHNESS: 7,
      METALLIC_ROUGHNESS_TEX: 8,
      IOR: 9,
      TRANSMISSION: 10,
      TRANSMISSION_TEX: 11,
      SPECULAR_IOR_LEVEL: 12,
      SPECULAR_TINT: 13,
      // 3 floats
      EMISSION: 16,
      // 3 floats, colour already multiplied by strength
      EMISSION_TEX: 19,
      NORMAL_TEX: 20,
      NORMAL_SCALE: 21,
      ALPHA: 22,
      ALPHA_TEX: 23,
      /** For the world shader: environment texture and rotation. */
      ENV_TEX: 24,
      ENV_ROTATION: 25,
      /** Cycles' SD_MIS_FRONT/BACK-like flags for emission. */
      RESERVED: 26,
      // Principled coat (Cycles' coat_* sockets). The weight texture scales the weight by its R channel and the roughness texture the roughness by G, as glTF's clearcoat textures do.
      COAT_WEIGHT: 27,
      COAT_ROUGHNESS: 28,
      COAT_IOR: 29,
      COAT_TINT: 30,
      // 3 floats
      COAT_WEIGHT_TEX: 33,
      COAT_ROUGHNESS_TEX: 34,
      COAT_NORMAL_TEX: 35,
      COAT_NORMAL_SCALE: 36,
      // Principled sheen. The tint texture multiplies the tint (RGB), the roughness texture the roughness (A), as glTF's sheen textures do.
      SHEEN_WEIGHT: 37,
      SHEEN_TINT: 38,
      // 3 floats
      SHEEN_TINT_TEX: 41,
      SHEEN_ROUGHNESS: 42,
      SHEEN_ROUGHNESS_TEX: 43,
      // Principled anisotropy: Cycles' anisotropic in [0, 1] and anisotropic_rotation in turns (multiples of 2 pi) about the normal, from the UV tangent.
      ANISOTROPIC: 44,
      ANISOTROPIC_ROTATION: 45
    };
    ShaderType = {
      PRINCIPLED: 0,
      DIFFUSE: 1,
      GLOSSY: 2,
      GLASS: 3,
      EMISSION: 4,
      TRANSPARENT: 5,
      BACKGROUND: 6
    };
    ShaderFlags = {
      /** Has any emission (Cycles SD_HAS_EMISSION). */
      HAS_EMISSION: 1,
      /** Emission is sampled by NEE (Cycles' emission sampling != NONE), so forward hits need MIS. */
      USE_MIS: 2,
      HAS_ALPHA: 4,
      /** Emission does not depend on textures, so it can be evaluated from the record alone. */
      CONSTANT_EMISSION: 8,
      /** The coat (and sheen) normal is the interpolated normal before the base normal map, as three.js shades clearcoat without a clearcoat normal map; otherwise it is the base normal, Cycles' default. */
      COAT_GEOMETRY_NORMAL: 16
    };
    TEX_SIZE = 12;
    TX = { OFFSET: 0, WIDTH: 1, HEIGHT: 2, FLAGS: 3, M: 4 };
    TexFlags = {
      /** RGBA half floats in two words per texel; otherwise RGBA8 in one word. */
      HALF: 1,
      SRGB: 2,
      NEAREST: 4,
      FLIP_Y: 8,
      /** Wrap mode for S in bits 8-9 and T in bits 10-11: 0 repeat, 1 clamp, 2 mirror. */
      WRAP_S_SHIFT: 8,
      WRAP_T_SHIFT: 10
    };
    LIGHT_SIZE = 32;
    LT = {
      TYPE: 0,
      FLAGS: 1,
      /** Position (point, spot, area) or direction of travel (sun). */
      CO: 4,
      RADIUS: 7,
      STRENGTH: 8,
      // rgb
      EVAL_FAC: 11,
      // Spot
      SPOT_DIR: 12,
      COS_HALF_SPOT_ANGLE: 15,
      SPOT_SMOOTH: 16,
      COS_HALF_LARGER_SPREAD: 17,
      // Area
      AXIS_U: 12,
      LEN_U: 15,
      AXIS_V: 16,
      LEN_V: 19,
      AREA_DIR: 20,
      INVAREA: 23,
      // Sun
      SUN_ANGLE: 12,
      SUN_ONE_MINUS_COSANGLE: 13,
      SUN_PDF: 14,
      /** Index of the light's emitter in the light tree, or NONE. */
      TREE_EMITTER: 24
    };
    LightType = {
      POINT: 0,
      SPOT: 1,
      SUN: 2,
      AREA: 3,
      BACKGROUND: 4
    };
    LightFlags = {
      USE_MIS: 1,
      CAMERA_VISIBLE: 2,
      CAST_SHADOW: 4,
      IS_SPHERE: 8
    };
    LIGHT_TREE_NODE_SIZE = 16;
    LTN = { BMIN: 0, ENERGY: 3, BMAX: 4, TYPE: 7, AXIS: 8, THETA_O: 11, THETA_E: 12, NUM_EMITTERS: 13, CHILD0: 14, CHILD1: 15 };
    LightTreeNodeType = { INNER: 2, LEAF: 4, DISTANT: 8 };
    LIGHT_TREE_EMITTER_SIZE = 8;
    LTE = { ENERGY: 0, THETA_O: 1, THETA_E: 2, ID: 3, BIT_TRAIL: 4 };
    DIST_SIZE = 2;
    FILTER_TABLE_SIZE = 1024;
    PARAMS_SIZE = 64;
    P = {
      WIDTH: 0,
      HEIGHT: 1,
      SAMPLE_START: 2,
      SAMPLE_COUNT: 3,
      SEED: 4,
      SOBOL_MASK: 5,
      MAX_BOUNCE: 6,
      MAX_DIFFUSE: 7,
      MAX_GLOSSY: 8,
      MAX_TRANSMISSION: 9,
      MAX_TRANSPARENT: 10,
      MIN_BOUNCE: 11,
      /** f32 */
      CLAMP_DIRECT: 12,
      CLAMP_INDIRECT: 13,
      /** Camera-to-world 3x4, rows (f32 x 12). */
      CAM_TO_WORLD: 16,
      /** tan(fov_y / 2) and aspect (f32). */
      CAM_TAN_HALF_FOV: 28,
      CAM_ASPECT: 29,
      CAM_APERTURE: 30,
      CAM_FOCUS: 31,
      /** Tile origin and size for the current dispatch. */
      TILE_X: 32,
      TILE_Y: 33,
      TILE_W: 34,
      TILE_H: 35,
      /** Background visible to camera (1/0). */
      BG_CAMERA_VISIBLE: 36,
      /** f32: Cycles' kernel filter_glossy, 1 / Filter Glossy, or 0 when glossy filtering is off. */
      FILTER_GLOSSY: 37,
      /** 1 when the albedo and normal denoising features are written. */
      DENOISING_FEATURES: 38,
      /** GPU film floats per pixel: 4 (RGBA) or 16 (RGBA then the extra passes in the CPU's EXT layout, with the converged flag at EXT.FLAG). */
      FILM_STRIDE: 39,
      /** 1 when adaptive sampling may skip converged pixels. */
      ADAPTIVE: 40
    };
  }
});

// src/scene/light_tree.ts
function emptyCone() {
  return { ax: 0, ay: 0, az: 0, thetaO: FLT_MIN, thetaE: FLT_MIN };
}
function coneIsEmpty(c) {
  return c.ax === 0 && c.ay === 0 && c.az === 0;
}
function emptyMeasure() {
  return { bmin: [FLT_MAX, FLT_MAX, FLT_MAX], bmax: [-FLT_MAX, -FLT_MAX, -FLT_MAX], cone: emptyCone(), energy: 0 };
}
function coneMeasure(c) {
  if (coneIsEmpty(c)) return 0;
  const thetaW = Math.min(M_PI, c.thetaO + c.thetaE);
  const cosO = Math.cos(c.thetaO);
  const sinO = Math.sin(c.thetaO);
  return 2 * M_PI * (1 - cosO) + M_PI / 2 * (2 * thetaW * sinO - Math.cos(c.thetaO - 2 * thetaW) - 2 * c.thetaO * sinO + cosO);
}
function safeAcos(x) {
  return Math.acos(Math.min(Math.max(x, -1), 1));
}
function mergeCones(ca, cb) {
  if (coneIsEmpty(ca)) return { ...cb };
  if (coneIsEmpty(cb)) return { ...ca };
  let a = ca;
  let b = cb;
  if (cb.thetaO > ca.thetaO) {
    a = cb;
    b = ca;
  }
  const cosAB = a.ax * b.ax + a.ay * b.ay + a.az * b.az;
  const thetaD = safeAcos(cosAB);
  const thetaE = Math.max(a.thetaE, b.thetaE);
  if (a.thetaO + 5e-4 >= Math.min(M_PI, thetaD + b.thetaO)) return { ax: a.ax, ay: a.ay, az: a.az, thetaO: a.thetaO, thetaE };
  const thetaO = (thetaD + a.thetaO + b.thetaO) * 0.5;
  if (thetaO >= M_PI) return { ax: a.ax, ay: a.ay, az: a.az, thetaO: M_PI, thetaE };
  let nx, ny, nz;
  if (cosAB < -0.9995) {
    if (a.ax !== a.ay || a.ax !== a.az) {
      nx = a.az - a.ay;
      ny = a.ax - a.az;
      nz = a.ay - a.ax;
    } else {
      nx = a.az - a.ay;
      ny = a.ax + a.az;
      nz = -a.ay - a.ax;
    }
    const l = Math.hypot(nx, ny, nz);
    nx /= l;
    ny /= l;
    nz /= l;
  } else {
    const thetaR = thetaO - a.thetaO;
    let ox = b.ax - a.ax * cosAB, oy = b.ay - a.ay * cosAB, oz = b.az - a.az * cosAB;
    const ol = Math.hypot(ox, oy, oz);
    if (ol > 0) {
      ox /= ol;
      oy /= ol;
      oz /= ol;
    } else {
      ox = oy = oz = 0;
    }
    const c = Math.cos(thetaR), s = Math.sin(thetaR);
    nx = a.ax * c + ox * s;
    ny = a.ay * c + oy * s;
    nz = a.az * c + oz * s;
  }
  return { ax: nx, ay: ny, az: nz, thetaO, thetaE };
}
function addMeasure(m, o) {
  if (o.energy === 0) return;
  for (let k = 0; k < 3; k++) {
    m.bmin[k] = Math.min(m.bmin[k], o.bmin[k]);
    m.bmax[k] = Math.max(m.bmax[k], o.bmax[k]);
  }
  m.cone = mergeCones(m.cone, o.cone);
  m.energy += o.energy;
}
function cloneMeasure(m) {
  return { bmin: [...m.bmin], bmax: [...m.bmax], cone: { ...m.cone }, energy: m.energy };
}
function measureCost(m) {
  if (m.energy === 0) return 0;
  const dx = m.bmax[0] - m.bmin[0], dy = m.bmax[1] - m.bmin[1], dz = m.bmax[2] - m.bmin[2];
  const valid = dx >= 0 && dy >= 0 && dz >= 0;
  const area2 = valid ? (dx * dz + dy * dz + dx * dy) * 2 : 0;
  const areaMeasure = area2 === 0 ? Math.hypot(valid ? dx : 0, valid ? dy : 0, valid ? dz : 0) : area2;
  return m.energy * areaMeasure * coneMeasure(m.cone);
}
function buildLightTree(local, distant, maxLightsInLeaf = 8) {
  if (local.length === 0 && distant.length === 0) return null;
  const emitters = local.slice();
  const shouldSplit = (start, end, node) => {
    const n = end - start;
    if (n < 2) {
      if (n) node.measure = cloneMeasure(emitters[start].measure);
      return { split: false, middle: start, dim: -1 };
    }
    let middle = start + end >> 1;
    const cmin = [FLT_MAX, FLT_MAX, FLT_MAX], cmax = [-FLT_MAX, -FLT_MAX, -FLT_MAX];
    for (let i = start; i < end; i++) {
      for (let k = 0; k < 3; k++) {
        cmin[k] = Math.min(cmin[k], emitters[i].centroid[k]);
        cmax[k] = Math.max(cmax[k], emitters[i].centroid[k]);
      }
    }
    const size = [cmax[0] - cmin[0], cmax[1] - cmin[1], cmax[2] - cmin[2]];
    const maxExtent = Math.max(size[0], size[1], size[2], 0);
    let totalCost = 0;
    let minCost = FLT_MAX;
    let splitDim = -1;
    for (let dim = 0; dim < 3; dim++) {
      const buckets = Array.from({ length: NUM_BUCKETS }, () => ({ m: emptyMeasure(), count: 0 }));
      let invExtent;
      if (size[dim] === 0) {
        if (dim !== 0) continue;
        invExtent = FLT_MAX;
        for (let i = start; i < end; i++) {
          addMeasure(buckets[0].m, emitters[i].measure);
          buckets[0].count++;
        }
      } else {
        invExtent = 1 / size[dim];
        for (let i = start; i < end; i++) {
          let b = Math.trunc(NUM_BUCKETS * (emitters[i].centroid[dim] - cmin[dim]) * invExtent);
          b = Math.min(Math.max(b, 0), NUM_BUCKETS - 1);
          addMeasure(buckets[b].m, emitters[i].measure);
          buckets[b].count++;
        }
      }
      const left = [];
      left.push({ m: cloneMeasure(buckets[0].m), count: buckets[0].count });
      for (let i = 1; i < NUM_BUCKETS - 1; i++) {
        const m = cloneMeasure(left[i - 1].m);
        addMeasure(m, buckets[i].m);
        left.push({ m, count: left[i - 1].count + buckets[i].count });
      }
      if (dim === 0) {
        const m = cloneMeasure(left[NUM_BUCKETS - 2].m);
        addMeasure(m, buckets[NUM_BUCKETS - 1].m);
        node.measure = m;
        if (size[0] === 0 && size[1] === 0 && size[2] === 0) break;
        if (size[dim] === 0) continue;
        totalCost = measureCost(m);
        if (totalCost === 0) break;
      }
      const right = new Array(NUM_BUCKETS - 1);
      right[NUM_BUCKETS - 2] = { m: cloneMeasure(buckets[NUM_BUCKETS - 1].m), count: buckets[NUM_BUCKETS - 1].count };
      for (let i = NUM_BUCKETS - 3; i >= 0; i--) {
        const m = cloneMeasure(right[i + 1].m);
        addMeasure(m, buckets[i + 1].m);
        right[i] = { m, count: right[i + 1].count + buckets[i + 1].count };
      }
      const regularization = maxExtent * invExtent;
      for (let split = 0; split < NUM_BUCKETS - 1; split++) {
        const cost = regularization * (measureCost(left[split].m) + measureCost(right[split].m));
        if (cost < totalCost && cost < minCost) {
          minCost = cost;
          splitDim = dim;
          middle = start + left[split].count;
        }
      }
    }
    return { split: minCost < totalCost || n > maxLightsInLeaf, middle, dim: splitDim };
  };
  const build = (start, end, bitTrail, depth) => {
    const node = { measure: emptyMeasure(), bitTrail, type: LightTreeNodeType.LEAF, first: start, count: end - start };
    const s = shouldSplit(start, end, node);
    if (s.split) {
      if (s.dim !== -1) {
        const d = s.dim;
        const part = emitters.slice(start, end).sort((a, b) => a.centroid[d] - b.centroid[d]);
        for (let i = 0; i < part.length; i++) emitters[start + i] = part[i];
      }
      node.type = LightTreeNodeType.INNER;
      node.left = build(start, s.middle, bitTrail, depth + 1);
      node.right = build(s.middle, end, bitTrail | 1 << depth, depth + 1);
    } else {
      for (let i = start; i < end; i++) emitters[i].bitTrail = bitTrail;
    }
    return node;
  };
  const localRoot = build(0, emitters.length, 0, 1);
  const distantNode = { measure: emptyMeasure(), bitTrail: 1, type: LightTreeNodeType.DISTANT, first: emitters.length, count: distant.length };
  for (const d of distant) {
    addMeasure(distantNode.measure, d.measure);
    d.bitTrail = 1;
    emitters.push(d);
  }
  const rootMeasure = cloneMeasure(localRoot.measure);
  addMeasure(rootMeasure, distantNode.measure);
  const root = { measure: rootMeasure, bitTrail: 0, type: LightTreeNodeType.INNER, first: 0, count: 0, left: localRoot, right: distantNode };
  const nodes = [];
  const flatten = (n) => {
    const index = nodes.length;
    const flat = { measure: n.measure, type: n.type, numEmitters: 0, child0: 0, child1: 0 };
    nodes.push(flat);
    if (n.type === LightTreeNodeType.INNER) {
      flat.numEmitters = -1;
      flat.child0 = flatten(n.left);
      flat.child1 = flatten(n.right);
    } else {
      flat.numEmitters = n.count;
      flat.child0 = n.first;
    }
    return index;
  };
  flatten(root);
  return { nodes, emitters };
}
var FLT_MIN, FLT_MAX, M_PI, NUM_BUCKETS;
var init_light_tree = __esm({
  "src/scene/light_tree.ts"() {
    "use strict";
    init_layout();
    FLT_MIN = 117549435e-46;
    FLT_MAX = 340282347e30;
    M_PI = Math.PI;
    NUM_BUCKETS = 12;
  }
});

// src/scene/bvh_build.ts
function area(minx, miny, minz, maxx, maxy, maxz) {
  const dx = maxx - minx;
  const dy = maxy - miny;
  const dz = maxz - minz;
  if (dx < 0 || dy < 0 || dz < 0) return 0;
  return 2 * (dx * dy + dy * dz + dz * dx);
}
function buildBvh(triVerts, triCount) {
  const bmin = new Float32Array(triCount * 3);
  const bmax = new Float32Array(triCount * 3);
  const cent = new Float32Array(triCount * 3);
  for (let i = 0; i < triCount; i++) {
    for (let a = 0; a < 3; a++) {
      const p0 = triVerts[i * 9 + a];
      const p1 = triVerts[i * 9 + 3 + a];
      const p2 = triVerts[i * 9 + 6 + a];
      const lo = Math.min(p0, p1, p2);
      const hi = Math.max(p0, p1, p2);
      bmin[i * 3 + a] = lo;
      bmax[i * 3 + a] = hi;
      cent[i * 3 + a] = 0.5 * (lo + hi);
    }
  }
  const order = new Uint32Array(triCount);
  for (let i = 0; i < triCount; i++) order[i] = i;
  const capacity = Math.max(1, 2 * triCount - 1);
  const buffer = new ArrayBuffer(capacity * NODE_SIZE * 4);
  const nodesU = new Uint32Array(buffer);
  const nodesF = new Float32Array(buffer);
  let nodeCount = 0;
  const binCount = new Int32Array(BINS);
  const binBounds = new Float64Array(BINS * 6);
  const rightArea = new Float64Array(BINS);
  const rightCount = new Int32Array(BINS);
  const stack = [];
  const root = nodeCount++;
  stack.push(root, 0, triCount, 0);
  while (stack.length) {
    const depth = stack.pop();
    const end = stack.pop();
    const start = stack.pop();
    let node = stack.pop();
    if (node < 0) {
      const parent = -node - 1;
      node = nodeCount++;
      nodesU[parent * NODE_SIZE + 3] = node;
    }
    const count = end - start;
    let minx = Infinity, miny = Infinity, minz = Infinity, maxx = -Infinity, maxy = -Infinity, maxz = -Infinity;
    let cminx = Infinity, cminy = Infinity, cminz = Infinity, cmaxx = -Infinity, cmaxy = -Infinity, cmaxz = -Infinity;
    for (let k = start; k < end; k++) {
      const p = order[k] * 3;
      if (bmin[p] < minx) minx = bmin[p];
      if (bmin[p + 1] < miny) miny = bmin[p + 1];
      if (bmin[p + 2] < minz) minz = bmin[p + 2];
      if (bmax[p] > maxx) maxx = bmax[p];
      if (bmax[p + 1] > maxy) maxy = bmax[p + 1];
      if (bmax[p + 2] > maxz) maxz = bmax[p + 2];
      const cx = cent[p], cy = cent[p + 1], cz = cent[p + 2];
      if (cx < cminx) cminx = cx;
      if (cy < cminy) cminy = cy;
      if (cz < cminz) cminz = cz;
      if (cx > cmaxx) cmaxx = cx;
      if (cy > cmaxy) cmaxy = cy;
      if (cz > cmaxz) cmaxz = cz;
    }
    const o = node * NODE_SIZE;
    if (count === 0) {
      nodesF[o] = nodesF[o + 1] = nodesF[o + 2] = 1;
      nodesF[o + 4] = nodesF[o + 5] = nodesF[o + 6] = -1;
      nodesU[o + 3] = 0;
      nodesU[o + 7] = 0;
      continue;
    }
    nodesF[o] = minx;
    nodesF[o + 1] = miny;
    nodesF[o + 2] = minz;
    nodesF[o + 4] = maxx;
    nodesF[o + 5] = maxy;
    nodesF[o + 6] = maxz;
    if (count <= 1 || depth >= MAX_DEPTH) {
      nodesU[o + 3] = start;
      nodesU[o + 7] = count;
      continue;
    }
    const parentArea = area(minx, miny, minz, maxx, maxy, maxz);
    let bestCost = Infinity;
    let bestAxis = -1;
    let bestSplit = 0;
    const cmin = [cminx, cminy, cminz];
    const cext = [cmaxx - cminx, cmaxy - cminy, cmaxz - cminz];
    for (let axis = 0; axis < 3; axis++) {
      if (!(cext[axis] > 0)) continue;
      const scale = BINS / cext[axis];
      binCount.fill(0);
      for (let b = 0; b < BINS; b++) {
        binBounds[b * 6] = binBounds[b * 6 + 1] = binBounds[b * 6 + 2] = Infinity;
        binBounds[b * 6 + 3] = binBounds[b * 6 + 4] = binBounds[b * 6 + 5] = -Infinity;
      }
      for (let k = start; k < end; k++) {
        const p = order[k] * 3;
        let b = Math.floor((cent[p + axis] - cmin[axis]) * scale);
        if (b >= BINS) b = BINS - 1;
        if (b < 0) b = 0;
        binCount[b]++;
        const bb = b * 6;
        for (let a = 0; a < 3; a++) {
          if (bmin[p + a] < binBounds[bb + a]) binBounds[bb + a] = bmin[p + a];
          if (bmax[p + a] > binBounds[bb + 3 + a]) binBounds[bb + 3 + a] = bmax[p + a];
        }
      }
      let rx0 = Infinity, ry0 = Infinity, rz0 = Infinity, rx1 = -Infinity, ry1 = -Infinity, rz1 = -Infinity;
      let rc = 0;
      for (let b = BINS - 1; b > 0; b--) {
        const bb = b * 6;
        rc += binCount[b];
        if (binCount[b]) {
          rx0 = Math.min(rx0, binBounds[bb]);
          ry0 = Math.min(ry0, binBounds[bb + 1]);
          rz0 = Math.min(rz0, binBounds[bb + 2]);
          rx1 = Math.max(rx1, binBounds[bb + 3]);
          ry1 = Math.max(ry1, binBounds[bb + 4]);
          rz1 = Math.max(rz1, binBounds[bb + 5]);
        }
        rightCount[b] = rc;
        rightArea[b] = rc ? area(rx0, ry0, rz0, rx1, ry1, rz1) : 0;
      }
      let lx0 = Infinity, ly0 = Infinity, lz0 = Infinity, lx1 = -Infinity, ly1 = -Infinity, lz1 = -Infinity;
      let lc = 0;
      for (let b = 0; b < BINS - 1; b++) {
        const bb = b * 6;
        lc += binCount[b];
        if (binCount[b]) {
          lx0 = Math.min(lx0, binBounds[bb]);
          ly0 = Math.min(ly0, binBounds[bb + 1]);
          lz0 = Math.min(lz0, binBounds[bb + 2]);
          lx1 = Math.max(lx1, binBounds[bb + 3]);
          ly1 = Math.max(ly1, binBounds[bb + 4]);
          lz1 = Math.max(lz1, binBounds[bb + 5]);
        }
        const rcount = rightCount[b + 1];
        if (lc === 0 || rcount === 0) continue;
        const cost = TRAVERSAL_COST + INTERSECT_COST * (lc * area(lx0, ly0, lz0, lx1, ly1, lz1) + rcount * rightArea[b + 1]) / parentArea;
        if (cost < bestCost) {
          bestCost = cost;
          bestAxis = axis;
          bestSplit = b;
        }
      }
    }
    const leafCost = INTERSECT_COST * count;
    if (count <= MAX_LEAF && (bestAxis < 0 || bestCost >= leafCost)) {
      nodesU[o + 3] = start;
      nodesU[o + 7] = count;
      continue;
    }
    let mid;
    if (bestAxis >= 0) {
      const scale = BINS / cext[bestAxis];
      let i = start;
      let j = end - 1;
      while (i <= j) {
        let b = Math.floor((cent[order[i] * 3 + bestAxis] - cmin[bestAxis]) * scale);
        if (b >= BINS) b = BINS - 1;
        if (b <= bestSplit) i++;
        else {
          const t = order[i];
          order[i] = order[j];
          order[j] = t;
          j--;
        }
      }
      mid = i;
      if (mid === start || mid === end) mid = start + end >> 1;
    } else {
      mid = start + end >> 1;
    }
    const left = nodeCount++;
    nodesU[o + 7] = 0;
    stack.push(-(node + 1), mid, end, depth + 1);
    stack.push(left, start, mid, depth + 1);
  }
  return { nodes: nodesU.subarray(0, nodeCount * NODE_SIZE), nodeCount, order };
}
var BINS, MAX_LEAF, MAX_DEPTH, TRAVERSAL_COST, INTERSECT_COST;
var init_bvh_build = __esm({
  "src/scene/bvh_build.ts"() {
    "use strict";
    init_layout();
    BINS = 16;
    MAX_LEAF = 4;
    MAX_DEPTH = 60;
    TRAVERSAL_COST = 1;
    INTERSECT_COST = 1;
  }
});

// src/kernel/tables.generated.ts
var TABLE_LAYOUT, TABLES_HALF_BASE64;
var init_tables_generated = __esm({
  "src/kernel/tables.generated.ts"() {
    "use strict";
    TABLE_LAYOUT = { "ggx_E": [0, 1024], "ggx_Eavg": [1024, 32], "ggx_glass_E": [1056, 32768], "ggx_glass_Eavg": [33824, 1024], "ggx_glass_inv_E": [34848, 32768], "ggx_glass_inv_Eavg": [67616, 1024], "ggx_gen_schlick_ior_s": [68640, 32768], "ggx_gen_schlick_s": [101408, 32768], "sheen_ltc": [134176, 3072] };
    TABLES_HALF_BASE64 = "ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+OwA8IzufO9I75TvvO/Q79zv5O/o7+jv7O/s7+zv7O/s7+zv6O/o7+jv5O/k7+Dv3O/c79jv1O/U79DvzO/I78TsAPLc7IztmO587vjvRO9w74zvoO+s77TvvO+877zvvO+477jvsO+s76jvoO+Y75DviO+A73jvcO9k71zvUO9E7ADzxO2E7IztNO3w7nTu0O8M7zTvUO9g72zvdO9473TvdO9s72TvXO9Q70TvOO8o7xzvDO747uju1O7A7qzumOwA8/Du3Oz87Ijs/O2U7gzuaO6o7tju+O8M7xjvHO8g7xzvFO8I7vzu7O7Y7sTusO6Y7nzuZO5I7izuDO3w7dDsAPP474TuCOzE7Ijs3O1Q7bjuDO5M7njumO6s7rjuuO607qzuoO6M7njuYO5E7iTuBO3g7bztmO1w7UjtHOzw7ADz/O/E7tztgOyo7IDswO0c7XTtvO307hzuNO5E7kzuSO487izuFO387dztuO2Q7WjtPO0M7NzsqOx07DzsBOwA8ADz4O9c7kTtLOyU7HjsqOzs7TDtbO2c7bztzO3U7dDtxO207ZjteO1Q7STs+OzE7IzsVOwY79jrmOtU6xDoAPAA8/DvoO7c7dDs9OyE7GzsjOy87PDtIO1A7VTtXO1Y7UztNO0Y7PDsxOyQ7FjsHO/c65jrUOsE6rjqaOoY6ADwAPP078TvQO5k7XjsyOxw7FjsbOyM7LDszOzg7OTs4OzQ7LjslOxo7DTv+Ou463TrKOrY6oTqMOnU6XjpHOgA8ADz+O/Y74Du2O4A7TTspOxY7EDsROxU7GjsdOx07GzsWOw87BTv4Ouk62TrGOrI6nTqGOm86Vjo9OiM6CToAPAA8/zv6O+o7yzueO2s7PzshOw87BzsFOwU7BTsEOwA7+jrxOuU61zrGOrQ6nzqJOnE6Vzo9OiI6BTroOcs5ADwAPP87+zvxO9o7tTuHO1k7MjsXOwY7/Dr2OvI67TrnOt861DrHOrc6pDqPOnk6YDpFOik6DDruOc85rzmPOQA8ADz/O/079TvkO8c7nztyO0g7JTsMO/o67TrkOts60jrHOro6qjqYOoQ6bTpTOjg6Gzr8Odw5uzmZOXc5VDkAPAA8ADz+O/g76zvVO7M7ijtfOzg7GDv+Ous62zrOOsE6sjqiOpA6fDplOks6LzoSOvI50TmuOYo5ZTlAORo5ADwAPAA8/jv6O/A73zvDO587djtNOyg7CDvuOtg6xTqzOqE6jjp5OmI6SDosOg067TnKOaY5gTlaOTM5CznjOAA8ADwAPP87+zv0O+Y70DuwO4s7Yjs6OxY79jraOsI6qzqUOn06ZDpKOi06DjrtOco5pTl+OVY5LTkDOdg4rTgAPAA8ADz/O/w79jvrO9k7vzudO3Y7TTsmOwI74DrCOqY6izpvOlM6NToVOvM5zzmpOYE5VzksOQA51DinOHo4ADwAPAA8/zv9O/g77zvgO8o7rDuIO2A7ODsQO+o6xzqmOoY6ZjpFOiM6ADraObM5ijlfOTI5BTnWOKc4eDhJOAA8ADwAPP87/jv6O/I75jvTO7k7mDtyO0o7IDv3Os86qTqEOl86OjoUOu05xDmZOW05PzkPOd84rjh8OEs4GTgAPAA8ADz/O/47+zv1O+s72zvEO6Y7gztbOzE7BTvaOrA6hjpdOjM6CDrdObA5gjlSOSE57ji7OIc4UzggONg3ADwAPAA8/zv+O/w79zvuO+A7zTuyO5I7aztBOxU75zq5Oos6XTovOgA60DmfOW05OTkFOc84mThjOCw47TeCNwA8ADwAPAA8/zv8O/g78TvlO9Q7vDufO3o7UTskO/U6xDqTOmA6Ljr6OcY5kTlaOSM56ziyOHk4QDgHOJ43MDcAPAA8ADwAPP87/Tv5O/M76TvaO8U7qjuIO2A7NDsEO9E6nDpmOi869zm/OYU5SjkPOdM4lzhbOB84yDdTN+E2ADwAPAA8ADz/O/07+jv0O+w73zvMO7M7lDtuO0M7EzvfOqg6bjozOvc5ujl8OT05/ji+OH44PzgAOIQ3DDeWNgA8ADwAPAA8/zv+O/s79jvuO+I70ju8O587eztROyI77Tq0Ong6Ojr5Obg5dTkyOe44qjhnOCQ4xTdFN8g2TzYAPAA8ADwAPP87/jv7O/c78DvmO9c7wzuoO4c7XjswO/s6wTqDOkI6/jm4OXE5KTnhOJk4UjgLOI43CDeHNgw2ADwAPAA8ADz/O/47/Dv4O/I76DvbO8k7sDuRO2s7PTsJO886jzpLOgQ6ujlvOSI51jiJOD446TdZN882SjbLNQA8ADwAPAA8/zv+O/w7+TvzO+s73jvOO7c7mjt2O0o7FzvcOpw6VjoMOr45bzkeOcw4fDgsOL43KDeZNhA2jjUAPAA8ADwAPP87/jv8O/k79DvtO+E70ju9O6I7fztVOyQ76jqpOmI6FTrEOXE5GznFOHA4HTiXN/s2ZjbZNVQ1ADwAPAA8ADz/O/47/Tv6O/U77jvkO9Y7wjupO4g7YDswO/c6tjpuOh86zDl0ORs5wDhmOA44czfQNjU2pDUdNQA8ADwAPAA8/zv/O/07+jv2O+875jvZO8c7rzuQO2o7OzsEO8M6ezorOtQ5eTkcOb04XjgCOFE3qDYINnM16TQAPAA8ADz/O/07+jv1O+474zvVO8M7rTuSO3M7TjslO/g6xTqPOlU6FzrXOZU5UTkMOcg4gzhAOP03fTcCN4w2ADz0O/87ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8+zv/OwA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPNk79jv5O/c78zvuO+k74jvcO9U7zjvGO787tzuvO6c7nzuXO447hjt9O3U7bDtkO1s7UjtKO0E7OTswOyg7ADwuO6c7zjvMO7o7oDuDO2Q7RjsoOws78DrVOrs6oTqJOnI6XDpHOjI6HjoLOvk56DnYOcg5uDmqOZw5jzmCOQA8wztJO307iztuOzo7/zrEOo06WzouOgY64TnAOaE5hjltOVY5QTkuORw5DDn9OPA44zjXOMw4wji4OK84pzgAPPY7kTtkO2Y7RjsGO7k6bjopOu05uTmNOWY5RTkoOQ45+DjkONM4wzi1OKg4nTiTOIk4gTh5OHI4azhlOGA4ADz+O9g7kzttO0U7ATutOlc6CTrGOY05XTk1ORM59zjeOMk4tzinOJk4jDiBOHc4bzhnOGA4WjhUOE84SjhFOAA8/zvyO8c7lDtgOxw7xzptOhk6zzmROVw5MTkNOe441Di/OKw4nDiOOIE4djhtOGU4XThWOFA4SzhGOEI4PTgAPAA8+zvlO7w7iDtHO/Y6nTpGOvg5szl6OUk5ITn/OOM4yji2OKQ4lTiHOHw4cThoOGA4WThTOE04SDhDOD84ADwAPP078jvXO607czsrO9k6hDozOuo5qzl1OUg5ITkBOeU4zji5OKg4mTiLOIA4dThsOGQ4XThWOFA4SzhGOAA8ADz+O/g75zvIO5o7XTsVO8U6djosOuk5rjl7OVA5KzkLOfA42DjEOLI4oziVOIk4fjh1OGw4ZTheOFg4UjgAPAA8/zv7O/A72ju3O4c7SjsEO7o6cTosOu45tzmHOV05OTkaOf445zjSOMA4sDiiOJU4ijiAOHc4bzhoOGE4ADwAPP87/Dv1O+Y7zDumO3U7Ojv4OrM6cDoxOvc5wzmVOW05STkqOQ859zjiONA4vzixOKM4mDiNOIQ4ezhzOAA8ADwAPP47+DvtO9s7vjuXO2Y7LTvwOrA6cjo4OgI60TmlOX45Wzk8OSE5CTn0OOE40DjAOLM4pjibOJE4iDgAPAA8ADz+O/o78zvlO887sTuJO1o7JDvqOrA6dzpAOg063zm1OY85bTlOOTM5GzkFOfI44DjROMI4tTiqOJ84ADwAPAA8/zv8O/Y77DvbO8Q7pDt9O1A7HTvnOrE6fDpJOhk67TnEOaA5fjlgOUU5LTkXOQM58TjhONI4xTi5OAA8ADwAPP87/Tv5O/E75DvSO7k7mTtzO0g7GDvmOrQ6gjpSOiU6+znUObA5kDlyOVc5PzkpORU5AjnyOOM41TgAPAA8ADz/O/47+jv0O+s73TvJO687kDtrO0E7FTvmOrc6iDpcOjE6CTrjOcE5oTmEOWk5UTk7OSY5FDkDOfM4ADwAPAA8/zv+O/w79zvwO+Q71TvAO6c7iDtkOz07EzvnOrs6kDplOj06FjryOdE5sjmVOXs5YjlMOTg5JTkUOQA8ADwAPAA8/zv9O/k78zvrO947zju5O587gTtfOzo7EzvqOsA6lzpvOkk6JDoBOuE5wzmmOYw5dDleOUk5NjkAPAA8ADwAPP87/Tv7O/Y77zvlO9g7xzuyO5k7fDtcOzk7FDvtOsY6oDp6OlU6MjoROvE51Dm4OZ45hjlwOVs5ADwAPAA8ADz/O/47/Dv4O/M76zvgO9M7wjutO5Q7eTtaOzk7FjvyOs06qTqFOmI6QDogOgI65TnKObA5mDmCOQA8ADwAPAA8/zv+O/07+jv1O+875zvcO847vTuoO5E7dztaOzs7Gjv4OtU6szqROnA6TzowOhM69zncOcM5qzkAPAA8ADwAPP87/zv9O/s7+DvzO+w74zvYO8o7uTumO487djtbOz47Hzv/Ot86vjqeOn46YDpCOiU6CjrwOdc5ADwAPAA8ADwAPP87/jv8O/k79jvwO+k74DvVO8c7tzukO487dzteO0M7JjsIO+o6yzqtOo86cTpUOjk6HjoEOgA8ADwAPAA8ADz/O/47/Tv7O/g79DvuO+c73jvTO8U7tjukO5A7ejtjO0k7LzsTO/c62jq9OqE6hDppOk46NDoAPAA8ADwAPAA8/zv/O/47/Dv6O/Y78jvsO+U73DvSO8U7tzumO5Q7gDtqO1I7OjsgOwY76zrQOrU6mjqAOmY6ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78TvrO+Q73DvSO8Y7uTuqO5k7hztzO147RzswOxg7/zrmOsw6szqaOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv4O/Q78DvrO+U73TvUO8k7vjuwO6E7kTt/O2w7WDtDOy07Fjv/Oug60DoAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/U78TvsO+Y74DvYO887xDu5O6w7njuPO347bDtaO0c7MjseOwk7ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/U78jvuO+k75DveO9Y7zjvEO7o7rjuiO5Q7hjt2O2Y7VTtDOwA8ADwAPAA8ADwAPAA8ADz/O/87/jv+O/w7+zv6O/g79TvyO+876zvmO+A72jvUO8w7wzu6O7A7pTuZO407gDsAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/47/Tv8O/s7+jv4O/Y79DvxO+476zvnO+M73jvZO9M7zTvGO747ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/zv/O/87/zv/OwA82Dv2O/s7/Dv8O/s7+Tv3O/U78jvwO+076jvnO+Q74TveO9s71zvUO9A7zTvJO8U7wju+O7o7tjuyO647qjsAPCk7pDvUO+I74zveO9U7yTu8O687oDuSO4M7dTtmO1g7STs7Oy07HzsROwM79TroOts6zjrBOrQ6qDqcOpA6ADy9Ozg7eTulO7I7qzuYO347YTtCOyI7BDvmOso6rzqVOnw6ZDpOOjg6JDoQOv056znaOco5ujmrOZ05jzmCOQA89Dt9O007bjuEO4A7aDtEOxk77TrBOpg6cDpMOio6CzruOdM5uzmkOY45ejloOVY5Rjk3OSk5GzkPOQM5+DgAPP07zDt2O2A7aTtlO0w7IjvvOro6hTpUOiY6/TnYObY5lzl7OWI5TDk3OSQ5EjkDOfQ45jjaOM44xDi6OLE4ADz/O+07szt/O2w7XjtDOxc74DqlOmo6MzoBOtQ5rDmIOWg5TDkyORw5Bzn1OOQ41TjIOLs4sDimOJw4kziLOAA8ADz4O9s7rDuHO2w7TDsfO+Y6qDpqOi86+TnIOZ05dzlVOTg5HjkGOfI43zjPOMA4szinOJw4kjiJOIE4eTgAPAA8/TvuO887qTuGO2E7Mzv8Or06fTo/OgY60jmkOXs5Vzk4ORw5BDnuONs4yji7OK04oTiWOIw4gzh7OHM4ADwAPP479zvkO8Y7ozt9O1A7GjvdOp06XjojOuw5uzmPOWk5RzkpOQ85+DjjONE4wTiyOKU4mjiPOIY4fTh1OAA8ADz/O/s77zvaO707mTtvOzw7AzvFOoc6SjoROt45rzmGOWE5QTklOQs59TjhONA4wDiyOKU4mTiPOIY4fTgAPAA8/zv9O/U75zvQO7I7jDteOyo78Dq0Ong6PjoJOtg5rDmFOWE5QjknOQ45+DjlONM4xDi2OKk4njiTOIo4ADwAPAA8/jv5O+873jvFO6U7fTtOOxo74TqoOm86OToGOtg5rjmIOWc5SDktORU5ADntONs4yzi9OLE4pTiaOAA8ADwAPP47+zv0O+c71Du6O5g7bztAOw071zqgOms6ODoIOtw5tDmQOW85Ujk3OR85Cjn3OOU41jjHOLo4rjgAPAA8ADz/O/w79zvtO987yjuuO4s7Yzs1OwM70DqcOmo6OjoNOuM5vDmaOXo5XTlDOSs5FjkDOfE44TjTOMU4ADwAPAA8/zv9O/k78jvmO9Y7vzujO4A7WDssO/w6zDqbOmw6PjoTOuw5xzmlOYY5ajlQOTk5IzkQOf447jjfOAA8ADwAPP87/jv7O/U77DvfO807tTuYO3Y7TzslO/g6yjqcOnA6RTocOvY50jmxOZM5dzleOUc5MTkeOQw5/DgAPAA8ADz/O/47/Dv4O/E75jvYO8Q7rDuPO247SDsgO/Y6yjqfOnU6TDolOgE63jm/OaE5hjltOVY5QDktORs5ADwAPAA8ADz/O/07+Tv0O+w74DvQO707pDuIO2c7RDsdO/U6zDqkOnw6VTowOg066znNObA5lTl8OWU5UDk8OQA8ADwAPAA8/zv9O/s79jvwO+c72jvKO7Y7njuCO2M7QDscO/Y60DqpOoM6Xjo7Ohk6+TnbOb85pTmMOXU5YDkAPAA8ADwAPP87/jv8O/g78zvsO+I71DvEO7A7mDt9O187PzsdO/k61TqwOow6aTpHOic6CDrrOc85tTmdOYY5ADwAPAA8ADz/O/47/Tv6O/Y78DvoO907zzu/O6s7lDt6O147PzsfO/062zq5Opc6dTpVOjY6GDr7OeA5xzmvOQA8ADwAPAA8/zv/O/07+zv4O/M77TvkO9k7yzu7O6g7kjt5O147QTsjOwM74zrDOqI6gzpkOkU6KToNOvI52TkAPAA8ADwAPAA8/zv+O/w7+jv2O/E76jvhO9Y7yDu4O6Y7kTt6O2E7RTspOws77TrPOrA6kjp0Olc6OzogOgY6ADwAPAA8ADwAPP87/jv9O/s7+Dv0O+475zveO9M7xju3O6Y7kjt8O2U7TDsxOxU7+TrcOr86ozqGOms6UDo1OgA8ADwAPAA8ADz/O/87/jv8O/o79jvyO+w75TvdO9I7xju3O6c7lTuBO2s7VDs7OyI7BzvsOtE6tjqbOoE6ZzoAPAA8ADwAPAA8ADz/O/47/Tv7O/k79TvxO+s75TvcO9I7xzu6O6s7mjuIO3Q7XztIOzE7GDsAO+Y6zTqzOpo6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/g79TvwO+s75TvdO9Q7yju+O7A7ojuRO4A7bTtYO0M7LTsWO/866DrQOgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvxO+w75jvgO9g7zzvEO7k7rDueO447fjtsO1o7RjsyOx07CDsAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvyO+476TvkO9071jvOO8Q7ujuuO6E7lDuFO3U7ZTtUO0I7ADwAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv7O/k79zv1O/I77jvqO+Y74DvaO9M7yzvDO7k7rzukO5g7izt+OwA8ADwAPAA8ADwAPAA8ADwAPP87/zv/O/47/jv9O/w7+zv5O/g79jvzO/E77jvqO+Y74jvdO9c70TvLO8Q7vDsAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/zv/O/87/jv+O/47/Tv9O/w7/Dv7O/o7ADzYO/Y7+zv9O/07/Tv8O/s7+jv5O/g79jv1O/M78jvwO+477DvrO+k75zvlO+M74DveO9w72jvYO9U70zvROwA8JzujO9Q75TvrO+s76DvjO9071TvNO8Q7vDuyO6k7oDuWO407gzt6O3A7ZztdO1Q7SjtBOzc7LjskOxs7EjsAPLs7Mjt0O6c7vjvFO8A7tjumO5Q7gDtsO1c7QjstOxk7BTvyOt86zTq7Oqk6mDqIOng6aDpZOko6PDouOiA6ADzzO3Q7QTtoO4w7mzuZO4s7dTtaOzw7HTv+OuA6wzqnOow6cjpaOkM6LToYOgQ68TnfOc45vTmtOZ85kDmDOQA8/DvGO2c7UztoO3k7ejtrO1E7MDsKO+M6vTqXOnQ6UzozOhY6+znhOck5szmfOYs5eTloOVg5STk7OS05ITkAPP876junO247YjtnO2Y7WDs8OxY77Dq/OpM6aTpAOhs6+TnZObw5oTmIOXI5XTlKOTg5JzkYOQo5/DjwOOQ4ADz/O/c70zucO3k7aztiO1E7NDsNO986rzp/OlA6JTr8Odc5tTmXOXs5YTlKOTU5IjkQOQA58TjjONc4yzjAOAA8ADz8O+o7xDucO4A7bTtXOzk7ETviOq86fDpLOhw68TnKOaY5hTloOU45NjkhOQ05+zjrONw4zzjCOLc4rDgAPAA8/jv1O947vTudO4I7ZztHOx878Dq8Oog6VDojOvY5zDmmOYQ5ZTlKOTE5GjkGOfQ44zjUOMY4ujiuOKQ4ADwAPP87+jvsO9U7uDuaO307WzszOwU70jqeOmk6NjoHOts5szmPOW45UTk3OR85Cjn3OOU41TjHOLo4rjijOAA8ADz/O/w79DvkO807sjuUO3M7TDsgO+46ujqGOlI6ITr0Oco5pDmBOWI5RjktORY5AjnvON44zzjBOLU4qTgAPAA8ADz+O/k77jvdO8Y7qjuLO2Y7PDsOO9s6qDp1OkM6FDrpOcE5nDl7OV05QjkqORQ5ADnuON04zjjBOLQ4ADwAPAA8/jv7O/Q75zvVO707oTt/O1k7LTv+Osw6mjppOjk6DTrjOb05mjl6OV05QzkrORY5AjnwOOA40jjEOAA8ADwAPP87/Dv3O+474DvMO7Q7ljtzO0w7IDvxOsE6kTpiOjU6CjriOb45nDl9OWE5SDkwORs5CDn2OOY42DgAPAA8ADz/O/07+jvzO+g72DvDO6o7iztoO0A7FTvoOro6jDpfOjQ6CzrlOcI5oTmDOWg5Tzk4OSM5EDn+OO44ADwAPAA8/zv+O/s79jvtO+E70Du6O6A7gTteOzc7DTvhOrU6iTpeOjU6DjrqOcg5qTmLOXE5WDlCOS05GjkIOQA8ADwAPAA8/jv8O/g78TvoO9o7yDuyO5c7eDtVOy87BzvdOrM6iTphOjo6FDrxOdA5sjmWOXs5YzlNOTg5JTkAPAA8ADwAPP87/Tv6O/U77TviO9M7wDuqO487cDtPOyo7AzvcOrQ6jDplOkA6HDr6Ods5vTmhOYc5cDlZOUU5ADwAPAA8ADz/O/47+zv3O/E76DvcO8w7uTujO4g7ajtKOyc7AjvcOrY6kDprOkg6JToFOuY5yTmuOZU5fTlnOQA8ADwAPAA8/zv+O/w7+Tv0O+074zvWO8Y7szudO4M7ZjtHOyU7AjvfOro6lzpzOlE6MDoROvM51zm8OaM5jDkAPAA8ADwAPP87/jv9O/o79jvwO+k73jvRO8E7rjuYO387YztGOyY7BTvjOsE6nzp9Olw6PToeOgE65jnMObM5ADwAPAA8ADwAPP87/jv7O/g79DvtO+U72jvNO707qjuVO307YztGOyg7CTvpOsk6qDqIOmk6SzotOhE69jndOQA8ADwAPAA8ADz/O/47/Dv6O/Y78TvqO+E71zvKO7o7qDuUO307ZDtJOy07EDvxOtM6tDqWOng6Wzo+OiM6CToAPAA8ADwAPAA8/zv+O/07+zv4O/Q77zvoO9871DvHO7g7pzuUO387ZztOOzQ7GDv8Ot86wjqlOok6bTpROjc6ADwAPAA8ADwAPP87/zv+O/w7+jv3O/I77TvmO9070zvHO7g7qDuWO4I7bTtWOz07JDsJO+460zq4Opw6gjpnOgA8ADwAPAA8ADwAPP87/jv9O/s7+Tv1O/E77DvlO9070zvHO7o7qzubO4k7dTtgO0k7MjsZOwA75zrNOrM6mjoAPAA8ADwAPAA8ADz/O/87/jv8O/o7+Dv1O/A76zvlO9071DvKO747sTuiO5I7gDttO1k7QzstOxY7/zrnOs86ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o7+Dv1O/E77DvmO+A72DvPO8Q7uTusO547jjt9O2w7WTtFOzE7HDsGOwA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o7+Dv1O/I77jvpO+Q73TvWO807xDu5O607oDuTO4Q7dDtjO1I7PzsAPAA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/s7+Tv3O/U78jvuO+o75TvfO9k70jvKO8E7uDutO6I7ljuIO3s7ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/jv+O/07/Dv6O/k79zv1O/I78DvsO+k75TvgO9s71TvPO8g7wDu4OwA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv/O/87/jv+O/07/Tv8O/w7+zv6O/k7+Dv3O/U79DsAPNg79jv7O/07/jv+O/47/Tv9O/w7+zv6O/k7+Dv3O/Y79Tv0O/M78TvwO+877TvsO+s76TvoO+Y75TvjO+I7ADwmO6I71DvmO+078DvvO+076TvlO+A72jvUO847yDvBO7s7tDutO6Y7nzuYO5E7ijuDO3w7dDttO2Y7XztYOwA8ujsuO3I7pzvCO807zzvMO8Q7uTusO547jzuAO3A7YDtRO0E7MjsjOxQ7BTv3Oug62zrNOr86sjqlOpg6jDoAPPM7cDs7O2Q7jDujO6s7qDueO447ejtkO007NTsdOwU77jrYOsI6rTqZOoU6cjpgOk46PTotOh06Djr/OfE5ADz8O8M7XztKO2M7fTuKO4k7fjtqO1E7NTsXO/g62jq8Op86hDpqOlE6OTojOg06+TnlOdM5wjmxOaE5kjmEOQA8/zvoO587YztYO2U7cTtyO2Y7UTs1OxQ78DrMOqk6hjplOkY6KToNOvM52znEOa85mzmIOXc5ZjlWOUg5OjkAPP879jvOO5I7bTtkO2Y7ZDtZO0I7JDsAO9k6sTqKOmM6PzodOv053znEOao5kzl9OWg5VTlEOTM5JDkWOQg5ADwAPPs75zu8O5A7dztrO2M7VTs+Ox47+TrPOqU6ejpROio6BTrjOcQ5pzmMOXQ5XTlIOTU5JDkTOQQ59jjpOAA8ADz+O/M72Tu0O5M7fTttO1s7QjsiO/w60TqlOng6TDojOvw52Dm3OZk5fTlkOUw5NzkjORE5ATnxOOM41jgAPAA8/zv5O+k7zzuwO5U7fjtoO047LjsHO9w6rzqBOlM6KDoAOto5tzmXOXo5XzlHOTE5HTkKOfk46TjbOM44ADwAPP87/DvzO+E7yDutO5Q7eztfOz47GDvuOsA6kjpkOjc6DTrmOcE5oDmBOWU5TDk0OR85DDn6OOo42zjNOAA8ADwAPP47+DvsO9k7wjuqO5A7cztTOy47BDvYOqk6ezpOOiI6+TnTObA5kDlzOVg5PzkpORQ5AjnxOOE40zgAPAA8ADz+O/s78zvlO9M7vTukO4g7aTtFOx478jrFOpc6ajo+OhQ67DnIOaY5hzlrOVE5OTkjORA5/TjtON44ADwAPAA8/zv8O/c77TvfO8w7tjucO387XTs4Ow874zq3Ooo6XTozOgs65TnCOaE5gzloOU85ODkiOQ85/TjtOAA8ADwAPP87/Tv5O/I75zvYO8U7rjuTO3Q7UjssOwI72DqsOoA6VjotOgY64jnAOaA5gzlpOVA5OjklORI5ADkAPAA8ADz/O/47+zv2O+074TvRO707pjuKO2o7RzshO/k6zzqkOno6UToqOgU64jnBOaM5hzltOVU5PzkqORg5ADwAPAA8ADz/O/w7+DvyO+g72zvKO7Y7nTuBO2E7PjsZO/E6yTqgOng6UDorOgc65TnGOag5jTlzOVw5RjkyOQA8ADwAPAA8/zv9O/o79TvtO+M71TvDO647lTt5O1k7NzsSO+w6xTqeOng6UjouOgw66znMObA5lTl8OWU5TzkAPAA8ADwAPP87/jv7O/c78TvoO907zju8O6c7jjtyO1M7MjsOO+o6xDqfOno6VjozOhI68znVObk5nzmGOW85ADwAPAA8ADz/O/47/Dv5O/Q77TvkO9g7yDu2O6E7iDttO087LzsNO+o6xjqiOn86XDo7Ohs6/TngOcQ5qzmSOQA8ADwAPAA8/zv/O/07+jv3O/E76TvfO9M7wzuxO5w7hDtpO0w7LTsNO+w6yjqoOoY6ZTpFOiY6CDrsOdE5uDkAPAA8ADwAPAA8/zv+O/w7+Dv0O+475TvbO847vzutO5g7gTtnO0w7LjsQO/A60DqvOo86bzpQOjM6Fjr6OeA5ADwAPAA8ADwAPP87/jv8O/o79jvxO+s74jvYO8s7vDuqO5Y7gDtoO007MjsUO/Y62Dq5Opo6fDpeOkI6JjoLOgA8ADwAPAA8ADz/O/47/Tv7O/g79DvvO+g73zvVO8g7ujupO5Y7gTtqO1E7NzscO/864jrFOqg6izpvOlM6ODoAPAA8ADwAPAA8/zv/O/47/Dv6O/c78jvtO+Y73jvTO8c7uTuqO5g7hDtvO1g7PzsmOws78DrUOrk6nTqCOmc6ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78TvsO+U73TvTO8g7uzusO5w7iTt2O2E7SjsyOxo7ATvnOs06szqZOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv4O/U78DvrO+U73TvUO8o7vjuxO6I7kjuAO207WDtDOyw7FTv9OuU6zToAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/Q78TvsO+Y73zvXO847xDu4O6s7nTuNO3w7ajtXO0M7LzsZOwM7ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/U78jvuO+k74zvcO9U7zDvCO7g7rDufO5E7gTtxO2A7Tjs7OwA8ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+zv5O/c79DvxO+076TvkO9472DvQO8g7vzu1O6o7njuSO4Q7djsAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/07/Dv7O/o7+Dv2O/Q78TvuO+s75zviO9071zvRO8o7wzu7O7I7ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/47/Tv9O/w7+zv6O/k7+Dv3O/U78zvyO/A77TvrOwA82Dv2O/s7/Tv+O/47/jv+O/47/Tv9O/w7+zv7O/o7+Tv4O/g79zv2O/U79DvzO/I78TvwO+877jvtO+w76jsAPCU7oTvUO+Y77jvyO/I78jvwO+076jvmO+E73TvYO9M7zjvJO8Q7vzu6O7Q7rzupO6Q7njuYO5M7jTuHO4I7ADy6Oyw7cDumO8M70TvWO9Y70jvMO8M7uTuuO6M7lzuKO347cTtlO1g7TDtAOzM7JzsbOw87BDv4Ou064TrWOgA88jttOzc7YTuLO6Y7szu2O7I7qTucO4w7eztoO1U7QjsuOxs7CDv2OuM60jrAOrA6nzqPOoA6cDpiOlM6RToAPPw7wTtZO0Q7Xzt9O5A7lzuUO4o7ejtlO087NjsdOwM76jrSOro6ojqMOnY6YjpOOjs6KDoXOgY69TnmOdc5ADz/O+c7mztbO1E7Yjt0O307fDtxO187RzssOw878TrTOrU6mDp8OmE6SDowOhk6AzruOdo5yDm2OaU5lTmGOQA8/zv1O8o7iztkO107ZTtsO2o7YDtNOzM7FTv0OtI6sDqOOm46TzoyOhY6/DnjOcw5tjmhOY45fDlrOVs5TDkAPAA8+zvkO7Y7iDtuO2c7ZjtiO1Y7QzsoOwg75TrAOps6djpTOjE6Ejr0Odg5vjmmOY85ejlmOVQ5QzkzOSM5ADwAPP078jvUO6w7ijt2O2w7YztVO0E7JTsEO986uDqROmo6RTohOv854DnCOac5jjl2OWE5TTk6OSg5GDkJOQA8ADz/O/g75zvJO6g7jjt7O2w7WztGOyo7CDvjOrs6kjppOkI6HDr5Odg5uTmcOYI5ajlTOT45KzkZOQk5+TgAPAA8/zv7O/E73TvCO6c7kDt8O2g7UTs0OxM77TrEOps6cTpIOiE6/DnZObk5mzmAOWY5Tzk5OSU5EzkCOfM4ADwAPP87/Tv3O+o71ju+O6Y7jzt5O2A7QzsiO/061DqqOoA6VjouOgg65DnCOaM5hjlrOVM5PDkoORU5AznzOAA8ADwAPP47+jvxO+M70Du6O6M7iztyO1U7NTsQO+k6vzqVOmo6QToaOvU50jmxOZM5dzleOUY5MDkcOQo5+TgAPAA8ADz/O/w79jvsO907yju1O547hTtpO0k7JjsAO9c6rTqDOlo6MjoMOug5xjmmOYk5bjlWOT85KjkWOQQ5ADwAPAA8/zv9O/k78jvmO9c7xTuvO5c7fTtfOz07GTvyOsk6oDp2Ok46JzoCOt85vzmgOYQ5ajlSOTw5JzkUOQA8ADwAPP87/jv7O/Y77TvhO9E7vjupO5A7dDtVOzI7DTvmOr46lTptOkY6ITr9Ods5vDmeOYM5aTlSOTw5KDkAPAA8ADwAPP87/Dv4O/I76DvbO8s7uDuhO4g7aztLOyg7AzvdOrY6jjpoOkI6Hjr7Ods5vDmfOYU5bDlVOUA5ADwAPAA8ADz/O/07+jv1O+074zvVO8U7sTuaO4A7YztDOyA7/DrXOrA6ijplOkE6Hjr8Od05vzmjOYk5cTlaOQA8ADwAPAA8/zv+O/s79zvxO+k73jvPO747qjuTO3k7XDs8Oxo79zrTOq46iTplOkI6IToBOuI5xTmqOZA5eDkAPAA8ADwAPP87/jv8O/k79DvtO+Q72DvKO7g7pDuNO3M7Vjs3Oxc79TrSOq46izpoOkc6JjoHOuk5zTmzOZk5ADwAPAA8ADz/O/87/Tv7O/c78TvqO+A71DvFO7M7nzuIO287Uzs1OxU79DrTOrE6jzpuOk06LjoQOvM51zm9OQA8ADwAPAA8ADz/O/47/Dv5O/Q77jvmO9w7zzvAO687mzuFO2w7UTs0OxY79zrWOrY6ljp2Olc6ODobOv855DkAPAA8ADwAPAA8/zv+O/w7+jv2O/E76zvjO9g7zDu9O6w7mTuDO2s7UTs2Oxk7+zrdOr46nzqAOmI6RTooOg06ADwAPAA8ADwAPP87/jv9O/s7+Dv0O+876DvgO9Y7yTu7O6o7mDuDO2w7VDs6Ox87AjvmOsg6qzqNOnA6VDo4OgA8ADwAPAA8ADz/O/87/jv8O/o79zvzO+075jveO9Q7yDu6O6o7mTuFO3A7WTtBOyc7DTvxOtY6ujqeOoI6ZjoAPAA8ADwAPAA8ADz/O/47/Tv7O/k79TvxO+w75TvdO9M7yDu7O6w7nDuKO3Y7YTtKOzM7GjsAO+Y6zDqxOpc6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/g79TvwO+s75TvdO9Q7yju+O7E7ojuRO387bDtXO0I7KzsTO/s64zrKOgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/c79DvwO+w75jvfO9c7zjvDO7c7qjucO4w7eztoO1U7QTsrOxU7/zoAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvxO+076DviO9w71DvLO8E7tjuqO5w7jjt+O207XDtJOzY7ADwAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv7O/k79jv0O/A77DvoO+M73DvWO847xTu8O7E7pjuaO4w7fjtvOwA8ADwAPAA8ADwAPAA8ADwAPP87/zv+O/47/Tv8O/s7+Tv3O/U78zvwO+w76DvkO9872TvTO8w7xTu8O7M7qjsAPAA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/zv+O/47/Tv8O/s7+jv5O/c79jv0O/I77zvtO+o75zvjO987ADzYO/Y7+zv9O/47/jv/O/47/jv+O/47/Tv9O/w7/Dv7O/o7+jv5O/g7+Dv3O/Y79jv1O/Q78zvyO/E78TvwOwA8JTuhO9Q75zvvO/M79Dv0O/M78TvvO+w76TvmO+I73jvbO9c70jvOO8o7xjvBO707uDu0O687qzumO6E7nTsAPLo7KztvO6U7wzvSO9o73DvaO9Y70TvKO8I7uTuvO6U7mzuRO4Y7fDtxO2c7XTtSO0g7PTszOyk7HzsVOws7ADzyO2s7NDteO4o7pzu3O707vju5O7A7pTuYO4k7ejtqO1o7STs5Oyk7GDsJO/k66jrbOsw6vTqvOqE6lDqHOgA8/Du/O1Y7PztbO3w7kjueO6E7nDuSO4Q7cjtfO0o7NTsfOwk79DrfOso6tjqiOo86fTprOlo6STo5Oio6GzoAPP875juXO1U7SzteO3Q7gjuHO4M7eTtoO1Q7PDsjOwk77zrVOrs6ojqKOnI6XDpGOjI6HjoLOvk56DnXOcc5ADz/O/U7yDuFO107VztiO247cztwO2U7VDs9OyM7BjvoOso6rTqPOnM6WDo+OiY6Djr4OeM5zzm8Oak5mDmIOQA8ADz7O+M7sjuBO2c7YjtlO2g7ZDtZO0Y7LjsSO/M60jqxOpA6cDpSOjQ6GDr+OeU5zTm3OaI5jjl8OWo5WjkAPAA8/TvwO9E7pjuDO3A7aTtlO187UztAOyc7CTvpOsY6ojp/Ol06PDodOv854znJObA5mTmDOW85XDlKOTk5ADwAPP479zvkO8U7ojuHO3c7bDtiO1Q7QDsnOwg75jrCOp06eDpUOjE6EDrxOdM5uDmeOYY5bzlaOUc5NTkkOQA8ADz/O/s78DvaO707oTuLO3o7aztbO0Y7LDsOO+s6xjqgOno6VDowOg067DnNObA5ljl9OWU5UDk8OSk5FzkAPAA8/zv9O/Y76DvSO7k7oTuNO3o7ZztROzc7GDv2OtA6qjqCOlw6NjoSOvA50DmyOZY5fDljOU05ODklORM5ADwAPAA8/jv6O/A74DvMO7Y7oDuLO3Y7XztFOyY7BDvgOrk6kTpqOkM6Hjr7Odk5ujmdOYI5aDlROTs5JzkVOQA8ADwAPP87/Dv1O+o72jvHO7M7nTuIO3A7Vjs4OxY78jrMOqU6fTpWOjA6CzrpOck5qjmOOXQ5WzlEOS85HDkAPAA8ADz/O/07+TvxO+U71TvDO687mTuCO2g7SzsrOwg74jq7OpQ6bTpGOiE6/jncOb05oDmEOWo5Uzk9OSg5ADwAPAA8/zv+O/s79TvsO+A70Du+O6o7kzt6O187QDseO/o61TquOoc6YTo7Ohc69TnUObY5mTl+OWY5Tjk5OQA8ADwAPAA8/zv8O/g78TvnO9o7yzu4O6Q7jDtyO1U7NjsUO+86yjqkOn46WDo0OhE68DnQObI5lzl8OWQ5TjkAPAA8ADwAPP87/Tv6O/U77TviO9U7xTuyO507hTtqO007LTsKO+c6wjqdOng6UzowOg467jnPObI5lzl+OWY5ADwAPAA8ADz/O/47+zv3O/E76TveO9A7vzusO5c7fjtjO0U7JTsEO+A6vDqYOnQ6UTovOg467znRObU5mjmCOQA8ADwAPAA8/zv+O/w7+Tv0O+475DvZO8s7ujunO5E7eDtdO0A7IDv/Ot06ujqXOnQ6UjoxOhE68znWObo5oDkAPAA8ADwAPP87/zv9O/s79zvxO+o74DvUO8Y7tTuiO4w7cztYOzw7HTv9Otw6ujqYOnc6Vjo2Ohc6+TndOcI5ADwAPAA8ADwAPP87/jv8O/k79DvuO+Y73DvQO8E7sTudO4g7cDtWOzo7HDv9Ot06vTqcOnw6XDo9Oh86AzrnOQA8ADwAPAA8ADz/O/47/Tv6O/c78jvrO+M72TvMO747rTuaO4U7bjtVOzo7HTsAO+E6wjqjOoQ6ZTpIOio6DjoAPAA8ADwAPAA8/zv/O/07+zv4O/Q77zvoO+A71jvKO7w7qzuZO4U7bjtWOz07ITsFO+g6yzqtOo86cjpVOjg6ADwAPAA8ADwAPP87/zv+O/w7+jv3O/M77TvmO9471DvIO7o7qzuZO4Y7cTtaO0I7KDsOO/I61jq6Op06gTplOgA8ADwAPAA8ADwAPP87/jv9O/s7+Tv1O/E77DvlO9070zvIO7s7rDucO4o7djthO0o7MjsZO/865TrKOq86lDoAPAA8ADwAPAA8ADz/O/87/jv8O/o7+Dv0O/A76zvkO9071DvJO707sDuhO5A7fjtrO1Y7QDspOxE7+DrfOsU6ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o79zv0O/A76zvlO9471jvNO8I7tjuoO5o7ijt4O2U7Ujs9Oyc7EDv5OgA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o79zv0O/E77DvnO+E72jvSO8k7vzuzO6c7mTuKO3o7aDtWO0M7LjsAPAA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o7+Dv2O/M77zvrO+Y74TvaO9M7yzvCO7g7rTugO5M7hTt2O2Y7ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/47/jv9O/s7+jv4O/Y79DvxO+076jvlO+A72zvUO807xju9O7Q7qjufOwA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/jv+O/07/Dv8O/o7+Tv3O/Y79DvxO+877DvoO+U74TvcO9c70jsAPNg79jv7O/07/jv/O/87/zv/O/47/jv+O/07/Tv9O/w7/Dv7O/s7+jv6O/k7+Dv4O/c79zv2O/U79Tv0O/M7ADwlO6E70zvnO+878zv1O/Y79Tv0O/I78DvuO+s76TvmO+M73zvcO9k71TvRO847yjvGO8M7vzu7O7c7szuvOwA8uTsqO247pTvDO9M73DvfO9873TvZO9Q7zjvHO787tzuvO6Y7njuVO4w7gzt6O3E7ZzteO1U7TDtEOzs7MjsAPPI7ajsyO1w7iTunO7k7wjvEO8I7vTu1O6s7oDuTO4Y7eDtqO1w7TTs/OzE7IzsVOwc7+jrsOt860jrGOrk6ADz8O747Uzs8O1k7ezuTO6I7qDunO6E7lzuKO3s7ajtYO0U7MjsfOww7+TrmOtQ6wzqxOqA6kDqAOnA6YTpSOgA8/zvlO5U7UTtHO1s7czuFO447jzuJO347bjtcO0c7MTsaOwM76zrUOr46pzqSOn06aTpWOkM6MTogOg86/zkAPP879DvGO4E7WDtTO187bjt4O3o7dTtpO1g7QzssOxI7+DrdOsI6qDqOOnU6XTpGOi86GjoGOvI54DnOOb05ADwAPPo74juvO3s7YTtdO2M7ajtsO2Y7WjtJOzI7GDv8Ot86wTqjOoY6aTpOOjQ6GzoDOuw51znCOa85nDmLOQA8ADz9O/A7zzuiO307ajtlO2U7ZDteO1I7PzsoOww77jrPOq46jjpvOlA6MzoXOvw54znLObQ5nzmLOXg5ZjkAPAA8/jv3O+M7wTucO4E7cjtqO2Q7XDtPOzw7JDsHO+g6xzqlOoM6YTpBOiE6BDroOc05tDmcOYY5cTleOUw5ADwAPP87+zvuO9c7uTucO4Y7dztsO2A7Ujs+OyU7CDvoOsY6ozp/Olw6OjoZOvo53TnBOac5jjl3OWI5Tjk7OQA8ADz/O/079TvmO847tDucO4k7eTtqO1k7RTssOw877jrMOqc6gzpeOjs6GTr5Odo5vTmiOYg5cDlaOUU5MjkAPAA8ADz+O/k77zveO8g7sjucO4o7eDtlO1A7NzsaO/k61jqyOo06ZzpDOiA6/jneOcA5pDmJOXA5WTlEOTA5ADwAPAA8/zv8O/U76TvYO8Q7rzucO4g7dDteO0Q7KDsIO+U6wTqbOnY6UDosOgo66TnJOaw5kDl3OV45SDkzOQA8ADwAPP87/Tv4O/A74zvTO8A7rTuZO4Q7bjtVOzg7GTv3OtM6rjqIOmM6PjobOvk52Dm6OZ05gjlpOVI5PDkAPAA8ADz/O/47+zv1O+s73jvOO7w7qTuVO347ZjtLOyw7CzvoOsQ6njp5OlQ6MDoNOuw5zTmvOZM5eTlgOUo5ADwAPAA8ADz+O/w7+DvxO+Y72TvJO7g7pDuPO3g7XTtAOyE7/zrcOrc6kjptOkk6JjoEOuM5xTmoOY05czlbOQA8ADwAPAA8/zv9O/o79DvsO+I71DvFO7M7nzuJO3A7VTs3Oxc79TrROq06iTplOkE6Hzr+Od85wTmlOYo5cTkAPAA8ADwAPP87/jv7O/c78TvoO9070DvAO647mTuCO2k7TTsvOw877TrKOqY6gzpfOj06HDr8Od05wDmkOYo5ADwAPAA8ADz/O/47/Dv5O/Q77TvkO9k7yzu7O6g7lDt8O2M7RzsoOwg75zrFOqI6fzpdOjw6Gzr8Od45wjmnOQA8ADwAPAA8/zv/O/07+zv3O/E76jvgO9Q7xju2O6M7jjt3O107QjskOwQ75DrCOqE6fzpeOj46HjoAOuI5xzkAPAA8ADwAPAA8/zv+O/w7+Tv0O+475jvcO9A7wjuyO587ijtzO1o7PjshOwM74zrDOqI6gjpiOkI6IzoGOuk5ADwAPAA8ADwAPP87/jv9O/o79zvyO+s74zvZO807vjuuO5w7hztxO1g7PTshOwQ75TrGOqc6hzpoOko6LDoPOgA8ADwAPAA8ADz/O/87/Tv7O/g79DvvO+g74DvWO8o7vDusO5o7hjtwO1g7PzskOwc76jrMOq46kDpyOlQ6NzoAPAA8ADwAPAA8/zv/O/47/Dv6O/c78zvtO+Y73jvUO8g7ujurO5o7hztyO1s7QzspOw478jrWOrk6nDp/OmI6ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78TvrO+U73DvTO8c7ujusO5s7iTt2O2A7STsxOxg7/jrjOsc6qzqPOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv4O/Q78DvqO+Q73DvTO8g7vDuvO6A7jzt8O2k7VDs9OyU7DTvzOto6vzoAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv3O/Q78DvqO+Q73TvVO8s7wDu0O6Y7lzuHO3U7YTtNOzc7ITsJO/E6ADwAPAA8ADwAPAA8ADz/O/87/jv9O/s7+Tv3O/Q78DvsO+Y74DvYO9A7xzu8O7A7ozuUO4U7dDtiO087OzslOwA8ADwAPAA8ADwAPAA8/zv/O/87/jv9O/w7+jv4O/U78jvuO+o75DveO9c70DvHO707sjunO5o7jDt9O207XDsAPAA8ADwAPAA8ADwAPAA8/zv/O/87/jv9O/w7+zv5O/c79TvyO+876zvmO+E73DvVO847xju+O7Q7qjufO5M7ADwAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/07/Dv7O/o7+Dv3O/Q78jvvO+w76TvlO+A72zvWO9A7yjvDOwA82Dv2O/s7/Tv+O/87/zv/O/87/zv+O/47/jv+O/07/Tv8O/w7/Dv7O/s7+jv6O/k7+Tv4O/g79zv3O/Y79jsAPCU7oTvTO+c77zv0O/Y79zv2O/Y79TvzO/E77zvtO+s76DvlO+M74DvdO9o71zvUO9A7zTvKO8c7wzvAO707ADy5Oyk7bTukO8M71DvdO+E74jvhO9872zvWO9E7yzvEO707tjuuO6Y7nzuXO487hzt/O3c7bztnO187VztPOwA88jtpOzA7WzuIO6c7ujvEO8k7yTvGO8A7uDuvO6U7mjuOO4I7dTtpO1w7TztDOzY7KTsdOxE7BTv5Ou064ToAPPw7vjtROzk7Vzt5O5Q7pDutO687rDulO5s7jzuBO3I7YTtRO0A7LjsdOww7+zrrOts6yzq7Oqw6nTqOOoA6ADz+O+U7kztOO0Q7WDtyO4Y7kTuWO5Q7jTuBO3I7YTtOOzo7JjsRO/s65jrSOr06qjqWOoM6cTpgOk46PjouOgA8/zv0O8U7fjtUO087XTtuO3o7gDt/O3g7bDtbO0g7MjsaOwI76jrROrk6oTqKOnQ6XjpJOjU6IToOOvw56zkAPAA8+jvhO6w7dztcO1k7YTtrO3A7bztoO1s7Sjs0Oxw7AjvnOsw6sDqVOns6YTpJOjE6GjoEOu853DnJObY5ADwAPP077zvNO547eDtlO2I7ZDtnO2U7XTtQOz47JzsNO/E61Dq2Opg6ezpfOkM6KDoPOvc54DnKObU5oTmOOQA8ADz+O/Y74Tu+O5g7fDttO2g7ZTthO1g7Szs4OyA7BTvoOsk6qTqJOmo6SzouOhI69zndOcU5rjmYOYQ5cDkAPAA8/zv6O+071Tu1O5c7gTt0O2s7YztZO0o7NzsfOwM75DrEOqM6gjphOkE6IjoEOug5zTmzOZs5hTlwOVw5ADwAPP87/Tv1O+Q7yzuwO5g7hTt3O2s7XjtOOzo7IjsGO+c6xjqkOoE6Xzo9Oh06/jngOcQ5qjmROXo5ZDlPOQA8ADwAPP47+TvuO9w7xTuuO5k7hzt4O2g7VztCOyo7DjvuOs06qjqHOmM6QTofOv854DnDOac5jjl1OV45STkAPAA8ADz/O/s79DvnO9U7wTusO5k7hzt2O2M7Tjs1Oxk7+jrYOrU6kTptOko6JzoGOuY5yDmrOZA5dzlgOUk5ADwAPAA8/zv9O/g77zvhO9A7vTuqO5g7hTtxO1s7QzsnOwg75zrEOqA6fDpYOjU6EjryOdI5tTmZOX85ZjlPOQA8ADwAPP87/jv6O/Q76jvcO8w7ujuoO5U7gTtrO1I7NzsZO/k61jqzOo86ajpGOiQ6AjriOcM5pjmLOXI5WjkAPAA8ADwAPP47/Dv3O/A75TvYO8g7tzukO5A7eztjO0k7LDsMO+s6yDqkOoA6XDo5Ohc69jnWObg5nDmCOWk5ADwAPAA8ADz/O/07+jv0O+w74TvTO8Q7szugO4s7dDtbOz87ITsBO986vDqYOnU6UTovOg067TnOObE5ljl8OQA8ADwAPAA8/zv+O/s79zvxO+g73DvPO787rjubO4U7bTtTOzc7GDv4OtY6szqQOmw6SjooOgc66DnKOa05kjkAPAA8ADwAPP87/jv8O/k79DvtO+Q72DvLO7s7qTuVO387ZztMOy87ETvwOs86rDqKOmc6RjolOgU65jnJOa05ADwAPAA8ADz/O/87/Tv7O/c78TvpO+A71DvGO7Y7pDuQO3o7YTtGOyo7CzvrOso6qDqHOmU6RDokOgU65znKOQA8ADwAPAA8ADz/O/47/Dv5O/Q77jvmO9w70DvCO7I7oDuMO3U7XTtCOyY7CDvoOsg6qDqHOmY6RjonOgg66zkAPAA8ADwAPAA8/zv+O/07+jv2O/E76zvjO9k7zTu/O687nTuJO3I7WjtAOyQ7BzvoOsk6qjqKOmo6SzosOg86ADwAPAA8ADwAPP87/zv9O/s7+Dv0O+876DvgO9Y7yju8O6w7mjuHO3E7WTtAOyU7CTvrOs06rzqQOnE6Uzo1OgA8ADwAPAA8ADz/O/87/jv8O/o79zvyO+075jvdO9M7yDu6O6s7mTuGO3E7WztCOyk7DTvxOtQ6tzqZOns6XjoAPAA8ADwAPAA8ADz/O/47/Tv7O/k79TvxO+s75DvcO9I7xzu6O6s7mjuIO3Q7XztIOy87FTv7Ot86wzqmOoo6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/c79DvvO+o74zvbO9I7xzu7O607njuNO3o7ZjtQOzk7ITsIO+460zq4OgA8ADwAPAA8ADwAPP87/zv+O/07/Dv5O/c78zvvO+o74zvcO9M7yTu+O7E7ozuUO4M7cDtcO0c7MTsaOwE76DoAPAA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/c78zvvO+o75TveO9Y7zjvEO7g7rDueO487fzttO1o7RjsxOxs7ADwAPAA8ADwAPAA8ADz/O/87/jv+O/07+zv5O/c79DvxO+w76DviO9s71DvMO8I7uDusO6A7kjuDO3M7YTtPOwA8ADwAPAA8ADwAPAA8ADz/O/87/jv+O/07/Dv6O/g79jvzO/A77DvoO+M73TvXO887xzu+O7U7qjueO5I7hDsAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/07/Dv7O/o7+Dv2O/Q78TvuO+o75jviO9071zvRO8o7wju6O7E7ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/jv+O/47/jv9O/07/Tv8O/w7/Dv7O/s7+jv6O/o7+Tv5O/g7+Dv3OwA8JDugO9M75zvvO/Q79jv3O/c79zv2O/U79DvyO/A77jvsO+o75zvlO+I74DvdO9o72DvVO9I7zzvMO8k7xjsAPLk7KTtsO6Q7wzvUO9074jvkO+Q74zvgO9w72DvTO807xzvBO7o7tDutO6Y7nzuYO5E7ijuCO3s7dDttO2Y7ADzyO2g7LztaO4g7pzu7O8Y7zDvNO8s7xzvCO7o7sjuoO547lDuJO307cjtnO1s7UDtEOzk7LTsiOxc7DDsBOwA8/Du9O087ODtVO3g7lDulO7A7tDuzO647pzudO5I7hTt3O2g7WTtJOzo7KjsaOws7/DrtOt46zzrBOrM6pToAPP475DuSO0w7QTtWO3E7hjuUO5s7mzuXO487gzt1O2U7UztBOy47GjsHO/Q64TrOOrs6qTqYOoY6djplOlU6ADz/O/Q7xDt8O1A7TDtaO207fDuEO4Y7gjt5O207XDtKOzU7IDsJO/M63DrGOq86mjqFOnA6XDpJOjY6JDoTOgA8ADz6O+A7qjt0O1g7VjtfO2o7czt1O3I7aTtbO0k7NTseOwU77DrTOrk6oDqIOm86WDpCOiw6FzoDOu853TkAPAA8/TvuO8s7mzt0O2E7XjtjO2g7aTtmO1w7Tjs7OyU7DTvyOtc6uzqfOoQ6aTpOOjU6HToGOu852jnGObI5ADwAPP479jvgO7s7lDt4O2o7ZTtlO2Q7XztVO0Y7MzscOwI75jrIOqo6jTpvOlI6NjobOgI66TnRObs5pjmSOQA8ADz/O/o77TvTO7I7kzt9O3A7ajtkO107UztDOy87GDv9Ot86wTqhOoI6YjpEOiY6CjrvOdU5vDmlOY85ejkAPAA8/zv8O/Q74zvJO6w7kzuBO3U7azthO1U7RTsxOxg7/TrfOr86njp9Ol06PToeOgA65DnJOa85lzmAOWo5ADwAPAA8/jv4O+072jvCO6o7lTuEO3c7ajtcO0s7NjsdOwE74zrDOqE6fzpdOjw6HDr9Od85wzmpOY85dzlhOQA8ADwAPP87+zvzO+Y70zu+O6k7ljuGO3Y7ZjtUOz87JjsKO+s6yzqpOoY6ZDpBOiA6ADrhOcQ5qDmOOXU5XjkAPAA8ADz/O/079zvuO+A7zju7O6g7ljuFO3M7YDtKOzI7Fjv4Otc6tTqSOm86TDoqOgk66TnLOa45kzl5OWE5ADwAPAA8/zv+O/o78zvpO9o7yju4O6Y7lDuCO247WDtAOyQ7BjvmOsQ6oTp+Ols6ODoWOvU51jm4OZw5gjlpOQA8ADwAPP87/jv8O/c77zvkO9Y7xju1O6M7kTt9O2c7Tzs1Oxc7+DrXOrQ6kTptOko6KDoGOuY5yDmqOY85dTkAPAA8ADwAPP87/Tv5O/M76zvgO9I7wjuyO6A7jDt3O2A7RjsqOws76zrJOqY6gzpgOj06Gzr6Ods5vTmgOYU5ADwAPAA8ADz/O/47+zv3O/A75zvbO847vjuuO5s7hztxO1g7PTsgOwE74Dq+Ops6eDpVOjM6EjryOdM5tjmaOQA8ADwAPAA8/zv+O/w7+Tv0O+w74zvXO8o7ujupO5Y7gTtqO1E7NTsXO/g61zq1OpM6cDpOOi06DDrtOc45sjkAPAA8ADwAPP87/zv9O/o79jvxO+k73zvTO8Y7tjulO5E7fDtkO0o7LjsRO/E60TqvOo06bDpKOik6CTrrOc05ADwAPAA8ADwAPP87/jv8O/g79DvuO+U72zvQO8I7sjuhO407dztfO0U7KTsMO+06zTqsOos6ajpJOik6CjrrOQA8ADwAPAA8ADz/O/47/Tv6O/Y78TvrO+I72DvMO747rzudO4k7cztcO0I7JjsJO+s6yzqrOos6azpLOiw6DToAPAA8ADwAPAA8/zv/O/07+zv4O/Q77zvoO9871TvJO7s7rDuaO4c7cTtaO0E7JjsJO+w6zTquOo86bzpQOjE6ADwAPAA8ADwAPP87/zv+O/w7+jv3O/I77DvlO9070zvHO7k7qjuZO4Y7cTtaO0E7JzsMO+860jq0OpU6dzpZOgA8ADwAPAA8ADwAPP87/jv9O/s7+Dv1O/A76zvjO9s70TvFO7g7qTuZO4c7cjtdO0U7LDsSO/c62jq9OqA6gjoAPAA8ADwAPAA8ADz/O/87/jv8O/o79zv0O+876TviO9o70TvFO7k7qzubO4o7dztiO0w7NDsbOwI75zrLOq86ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/k79jvzO+476TviO9o70TvHO7s7rjugO5A7fjtrO1Y7QDspOxE79zrdOgA8ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/k79jvyO+476TvjO9w71DvKO8A7tDunO5g7iTt3O2U7UTs8OyU7DjsAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv7O/k79jvzO+876zvlO9872DvQO8c7vTuxO6U7lzuIO3g7ZztUO0E7ADwAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv7O/k79zv0O/E77jvpO+Q73jvYO9A7yDu/O7U7qjueO5E7gztzOwA8ADwAPAA8ADwAPAA8ADwAPP87/zv+O/47/Tv8O/o7+Dv2O/Q78TvtO+k75TvfO9o70zvMO8U7vDuzO6k7njsAPNg79jv7O/07/jv/O/87/zv/O/87/zv/O/47/jv+O/47/jv9O/07/Tv8O/w7/Dv7O/s7+zv6O/o7+Tv5O/k7ADwkO6A70zvmO+879Dv2O/g7+Dv4O/c79jv1O/Q78jvxO+877TvrO+k75jvkO+I74DvdO9s72DvWO9M70TvOOwA8uTsoO2w7pDvDO9Q73jvjO+Y75zvmO+Q74TvdO9k71DvPO8k7xDu+O7g7sjurO6U7nzuYO5I7izuEO347dzsAPPI7aDsuO1k7hzunO7s7xzvOO9A70DvNO8g7wju7O7M7qzuhO5g7jjuDO3k7bztkO1k7TztEOzo7MDslOxs7ADz8O707Tjs2O1Q7dzuTO6Y7sju3O7g7tTuwO6g7njuTO4c7ejtsO147UDtCOzM7JTsXOwg7+jrtOt860TrEOgA8/jvkO5E7Sjs/O1U7cDuGO5U7njuhO547mDuPO4M7djtmO1Y7RTszOyE7Dzv9Ouw62jrJOrg6pzqXOoc6dzoAPP878zvDO3o7TjtJO1g7bDt8O4c7izuKO4Q7ejtsO1w7Sjs3OyM7Djv5OuQ6zzq6OqU6kTp+Oms6WTpHOjU6ADwAPPo73zuoO3E7VTtTO107ajt0O3k7eDtyO2g7WTtIOzM7HjsHO+861zq/Oqg6kDp6OmM6Tjo5OiU6ETr/OQA8ADz9O+47yjuZO3E7XjtbO2E7aDtsO2s7ZTtaO0s7ODsiOwo78TrXOr06ozqJOm86Vjo+Oic6ETr7OeY50jkAPAA8/jv2O987uTuRO3Q7ZjtjO2Q7ZTtjO1w7UTtBOy07Fjv9OuI6xjqqOo46cjpWOjs6IjoJOvE52jnEObA5ADwAPP87+jvsO9E7rzuPO3k7bTtoO2U7YDtZO007PDsoOxA79TrZOrw6nTp/OmI6RTooOg068znaOcI5qzmVOQA8ADz/O/w78zvhO8c7qTuQO347cjtqO2M7WTtNOzw7JzsOO/M61jq3Opc6eDpZOjo6HDoAOuQ5yjmxOZk5gzkAPAA8ADz+O/g77DvYO8A7pzuSO4I7dTtqO187UTs/Oyo7ETv1Otc6tzqXOnY6Vjo2Ohc6+TncOcE5pzmOOXc5ADwAPAA8/jv7O/M75TvRO7s7pjuTO4Q7djtoO1g7RjswOxc7+zrdOr06nDp6Olk6ODoXOvg52zm+OaM5iTlxOQA8ADwAPP87/Dv3O+073jvMO7g7pTuUO4Q7dDtjO1A7OjshOwU75zrGOqU6gzpgOj46HTr9Od45wTmlOYo5cTkAPAA8ADz/O/47+jvzO+g72TvIO7Y7pDuTO4I7cDtcO0Y7LTsSO/M60zqyOo86bDpKOig6BzrnOck5rDmQOXY5ADwAPAA8/zv+O/w79jvuO+M71DvEO7M7ojuQO347ajtUOzw7IDsDO+M6wjqfOnw6WTo3OhU69TnVObc5mzmAOQA8ADwAPAA8/zv9O/k78zvqO9470DvBO7A7nzuNO3k7YztLOzE7FDv1OtQ6sjqPOmw6SjooOgY65jnHOao5jjkAPAA8ADwAPP87/jv7O/Y77zvmO9o7zTu9O607mzuIO3M7XDtCOyY7CDvpOsc6pTqCOl86PTobOvs52zm9OaA5ADwAPAA8ADz/O/47/Dv5O/M77DviO9Y7yTu6O6k7lzuDO207VDs6Ox07/jreOr06mjp4OlY6NDoSOvI50zm1OQA8ADwAPAA8/zv/O/07+jv2O/A76DveO9M7xTu2O6U7kjt9O2Y7TTsyOxU79jrWOrU6kzpxOk86LToNOu05zjkAPAA8ADwAPAA8/zv+O/w7+Dv0O+075TvbO887wTuyO6A7jTt4O2E7RzssOw878DrQOq86jjpsOks6KjoKOus5ADwAPAA8ADwAPP87/jv8O/o79jvxO+o74jvXO8s7vjuuO507iTt0O1w7QzsoOws77DrMOqw6izprOko6KjoKOgA8ADwAPAA8ADz/O/87/Tv7O/g79DvuO+c73zvUO8g7ujurO5o7hjtxO1k7QDslOwk76zrMOqw6jDpsOkw6LToAPAA8ADwAPAA8/zv/O/47/Dv6O/Y78jvsO+U73DvSO8Y7uDupO5c7hDtvO1g7QDslOwo77DrOOrA6kDpxOlI6ADwAPAA8ADwAPAA8/zv+O/07+zv4O/U78DvqO+M72jvQO8Q7tzuoO5c7hDtwO1o7QjsoOw078TrUOrY6mDp6OgA8ADwAPAA8ADwAPP87/zv+O/w7+jv3O/M77jvoO+E72TvPO8M7tzuoO5g7hjtzO107RzsuOxU7+jreOsE6pDoAPAA8ADwAPAA8ADz/O/87/jv9O/s7+Tv2O/I77TvoO+E72DvPO8Q7uDuqO5s7izt4O2Q7Tzs4OyA7BzvsOtE6ADwAPAA8ADwAPAA8ADz/O/87/jv8O/s7+Dv1O/I77TvoO+E72TvRO8c7vDuvO6E7kjuBO287WztGOzA7GDsAOwA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o7+Dv1O/I77jvpO+M73DvUO8s7wTu2O6o7nTuOO347bDtZO0U7MDsAPAA8ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/o7+Dv2O/M77zvrO+Y74DvZO9I7yjvAO7Y7qzueO5A7gjtyO2E7ADwAPAA8ADwAPAA8ADwAPP87/zv/O/47/Tv8O/o7+Tv2O/Q78TvtO+k75DveO9g70TvJO8E7uDutO6I7ljuJOwA82Dv2O/s7/Tv+O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/Tv9O/07/Tv8O/w7/Dv7O/s7+zv6O/o7+TsAPCQ7oDvTO+Y77zv0O/c7+Dv5O/k7+Dv3O/c79Tv0O/M78TvvO+477DvqO+g75jvkO+E73zvdO9s72DvWO9Q7ADy5Oyg7bDujO8M71DveO+Q75zvoO+g75jvkO+E73TvZO9U70DvLO8Y7wDu7O7U7rzupO6Q7njuYO5I7jDuGOwA88jtnOy47WDuGO6c7uzvIO8870jvTO9E7zjvJO8M7vDu0O6w7ozuaO5E7iDt+O3Q7azthO1c7TTtEOzo7MDsAPPw7vDtNOzU7Uzt3O5M7pzuzO7o7vDu6O7Y7sDuoO547lDuIO3w7bztiO1U7SDs6Oy07HzsSOwU7+DrrOt46ADz+O+Q7kDtJOz47UztvO4Y7ljugO6Q7pDugO5k7jzuDO3U7ZztXO0c7NzsmOxU7BDvzOuM60zrDOrM6ozqUOgA8/zvzO8I7eDtMO0c7VztrO3w7iDuOO487izuDO3g7aztbO0o7NzskOxA7/DroOtU6wTquOps6iDp2OmU6UzoAPAA8+jvfO6c7bztTO1A7WztpO3U7fDt9O3o7cjtmO1Y7RTsxOxw7BjvwOtk6wzqsOpY6gDprOlc6QzovOhw6ADwAPP077jvJO5c7bjtbO1k7YDtoO247bztsO2M7VztHOzM7HjsHO+861jq9OqQ6izpzOls6RDouOhg6AzrvOQA8ADz+O/Y73ju4O487cTtjO2A7YztmO2Y7YjtZO0w7OzsnOxA79zrdOsM6pzqMOnI6Vzo+OiU6DTr2OeA5yjkAPAA8/zv6O+s70DutO4w7djtqO2Y7ZDtiO107VDtGOzQ7HzsHO+060jq1Opg6ezpfOkM6KDoNOvQ53DnEOa45ADwAPP87/DvzO+A7xTunO407eztwO2k7ZDtcO1I7RDsyOxw7AzvoOss6rjqPOnE6Uzo1Ohk6/TniOck5sDmZOQA8ADwAPP47+DvrO9c7vTukO487fzt0O2o7YTtVO0Y7MzsdOwQ76DrKOqs6jDpsOk06LjoQOvM51zm8OaM5izkAPAA8ADz+O/s78jvkO887uTujO5A7gjt1O2k7WztLOzg7IjsIO+w6zjquOo06bTpMOiw6DTrvOdI5tjmcOYM5ADwAPAA8/zv8O/c77DvdO8o7tTuiO5E7gjt0O2U7VDtAOyo7EDvzOtU6tTqUOnI6UTowOg868DnSObU5mjmAOQA8ADwAPP87/Tv5O/I75zvXO8Y7szuiO5E7gTtxO187Szs0Oxo7/jrgOr86njp8Olo6ODoXOvc52Dm6OZ05gjkAPAA8ADz/O/47+zv2O+474jvTO8I7sTugO487fjtsO1c7QTsnOws77TrNOqw6iTpnOkQ6IzoCOuI5wzmmOYk5ADwAPAA8ADz/O/07+TvyO+k73TvPO787rzueO4w7ejtlO087NjsbO/063Tq8Opo6dzpVOjI6ETrwOdA5sjmVOQA8ADwAPAA8/zv+O/s79jvvO+U72TvLO7w7rDubO4g7dDteO0Y7KzsPO/A6zzqtOos6aDpFOiM6AjriOcI5pDkAPAA8ADwAPP87/jv8O/g78zvrO+E71TvIO7g7qDuWO4M7bjtXOz07ITsDO+Q6wzqhOn46XDo5Ohc69jnWObg5ADwAPAA8ADz/O/87/Tv6O/Y78DvoO9070TvEO7U7pDuSO347aDtPOzU7GDv6Oto6uTqXOnQ6UjowOg867jnPOQA8ADwAPAA8ADz/O/47+zv4O/M77TvkO9o7zjvAO7E7oDuNO3g7YjtJOy47ETvyOtI6sTqPOm06SzoqOgk66TkAPAA8ADwAPAA8/zv+O/w7+jv2O/E76jvhO9Y7yju9O607nDuJO3Q7XDtDOyg7CzvsOsw6rDqKOmk6RzomOgY6ADwAPAA8ADwAPP87/jv9O/s7+Dv0O+475zveO9M7xzu5O6o7mDuFO3A7WDs/OyQ7BzvpOso6qTqJOmg6RzomOgA8ADwAPAA8ADz/O/87/jv8O/o79jvxO+s75DvbO9A7xDu3O6c7ljuCO207Vjs9OyI7BjvoOso6qjqKOmo6SToAPAA8ADwAPAA8ADz/O/47/Tv7O/g79DvvO+k74jvZO847wju1O6U7lDuBO2w7Vjs9OyM7CDvrOs06rjqPOm86ADwAPAA8ADwAPAA8/zv/O/07/Dv6O/c78zvuO+c74DvXO807wTu0O6U7lDuCO247WDtAOyc7DTvxOtQ6tjqXOgA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/U78TvsO+Y73zvWO8w7wTu0O6Y7ljuFO3I7XTtGOy47FTv7Ot86wjoAPAA8ADwAPAA8ADwAPP87/jv9O/w7+jv4O/U78TvsO+Y73zvXO807wzu3O6k7mzuKO3g7ZTtQOzo7IjsJO+86ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv3O/Q78DvsO+Y74DvYO9A7xju7O687ojuTO4M7cTteO0o7NDsdOwA8ADwAPAA8ADwAPAA8/zv/O/87/jv9O/s7+jv3O/Q78TvtO+g74jvbO9Q7yzvCO7c7qzufO5E7gTtxO187TDsAPAA8ADwAPAA8ADwAPAA8/zv/O/47/jv8O/s7+Tv3O/Q78TvtO+k75DveO9c70DvHO747tDupO507kDuCO3I7ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/07/Tv9O/07/Dv8O/w7/Dv7O/s7+zv6OwA8JDugO9M75jvwO/Q79zv4O/k7+Tv5O/g79zv3O/U79DvzO/E78DvuO+w76jvpO+c75TvjO+E73zvdO9s72DsAPLk7KDtrO6M7wzvUO9875TvoO+k76TvoO+Y75DvhO9072TvVO9E7zDvHO8I7vTu4O7I7rTunO6I7nDuXO5E7ADzyO2c7LTtYO4Y7pju7O8g70DvUO9U71DvSO847yTvDO7w7tTutO6U7nDuUO4s7gjt5O3A7ZjtdO1Q7SztCOwA8/Du8O007NDtSO3Y7kzunO7Q7uzu/O747uzu2O7A7pzueO5Q7iDt9O3E7ZTtYO0w7PzsyOyY7GTsNOwA79DoAPP475DuPO0c7PDtSO247hjuXO6I7pzuoO6Y7oDuYO407gjt0O2Y7WDtIOzk7KTsZOwk7+TrpOto6yzq8Oq06ADz/O/M7wjt3O0o7RTtVO2o7fTuKO5E7kzuRO4s7gjt2O2g7WTtIOzY7JDsRO/466zrYOsY6szqhOpA6fjptOgA8ADz6O947pjtuO1E7TztaO2k7dTt+O4E7fzt5O287YjtTO0E7LjsaOwU77zraOsQ6rzqZOoU6cDpdOkk6NjoAPAA8/TvtO8g7lTtsO1k7VzteO2g7bztyO3E7aztgO1I7QTsuOxk7AjvrOtM6uzqjOow6dDpdOkc6MjodOgg6ADwAPP479TveO7Y7jTtvO2E7XztiO2Y7aDtmO2A7VTtGOzQ7IDsJO/E61zq9OqM6iTpvOlY6PjomOg46+DniOQA8ADz/O/o76zvPO6s7ijtzO2g7ZDtkO2M7YDtZO047PzssOxY7/jrkOsk6rTqROnY6Wjo/OiU6CzrzOds5xDkAPAA8/zv8O/M74DvDO6U7ijt4O247aDtkO187VjtKOzs7JzsRO/g63TrAOqM6hjpoOks6LjoTOvg53jnFOa05ADwAPAA8/Tv3O+s71ju8O6I7jDt9O3I7ajtiO1g7Szs7Oyc7EDv2Oto6vTqeOn86YDpCOiQ6BzrrOdA5tjmdOQA8ADwAPP47+jvyO+M7zju2O6A7jjuAO3Q7aTtdO087PjsqOxM7+DrcOr06njp+Ol46PjofOgE64znHOaw5kjkAPAA8ADz/O/w79jvsO9w7yDuzO6A7jzuBO3Q7ZjtXO0U7MDsZO/464TrCOqI6gjphOkA6HzoAOuE5xDmoOY05ADwAPAA8/zv9O/k78jvmO9Y7xDuxO6A7kDuAO3E7YTtOOzk7IjsHO+o6yzqrOok6ZzpGOiU6BDrlOcY5qTmNOQA8ADwAPP87/jv7O/Y77TvgO9E7wDuvO587jjt+O207WjtFOy07Ejv2Otc6tjqVOnI6UDouOg067DnNOa85kjkAPAA8ADwAPP87/Tv5O/I76DvcO807vTutO507jDt6O2c7Ujs6OyA7BDvlOsU6ozqBOl46OzoZOvg52Dm5OZs5ADwAPAA8ADz/O/07+zv2O+475DvYO8o7ujuqO5o7iDt1O2A7STsvOxM79TrWOrQ6kjpvOkw6KjoIOuc5xzmoOQA8ADwAPAA8/zv+O/w7+DvyO+o74DvUO8Y7tzunO5Y7gztvO1g7QDslOwc76DrIOqY6gzpgOj06Gzr5Odg5uTkAPAA8ADwAPP87/zv9O/o79jvvO+c73DvQO8M7tDujO5E7fjtoO1A7NzsbO/w63Tq8Opk6dzpUOjE6DzruOc05ADwAPAA8ADwAPP87/jv7O/g78zvsO+M72TvNO787sDufO4w7eDtiO0k7LjsSO/M60zqyOo86bTpKOig6BjrlOQA8ADwAPAA8ADz/O/47/Dv6O/Y78DvpO+A71TvJO7s7rDubO4g7cztcO0I7JzsKO+s6yzqqOog6ZjpEOiI6ADoAPAA8ADwAPAA8/zv+O/07+zv4O/M77TvmO9070jvGO7g7qDuXO4M7bjtXOz07IjsFO+Y6xjqlOoM6YjpAOh46ADwAPAA8ADwAPP87/zv+O/w7+Tv2O/E76zvjO9o7zzvDO7U7pTuTO4A7ajtTOzk7HjsBO+M6wzqjOoI6YTo/OgA8ADwAPAA8ADwAPP87/jv9O/s7+Dv0O+876DvhO9c7zDvAO7I7ojuRO307aDtROzg7HTsBO+M6xDqkOoQ6YzoAPAA8ADwAPAA8ADz/O/47/Tv8O/k79jvyO+075jveO9U7yju+O7A7oTuQO307aDtROzk7HzsDO+Y6yDqpOok6ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/g79TvxO+s75TvdO9Q7yTu9O7A7oTuQO347ajtUOzw7IzsJO+060DqyOgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/c79DvvO+o75DvcO9M7yTu+O7E7ozuTO4I7bztaO0Q7LDsTO/g63DoAPAA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/Y78zvvO+o75DvcO9Q7yzvAO7Q7pzuYO4g7djtjO087OTshOwk7ADwAPAA8ADwAPAA8ADz/O/87/jv+O/w7+zv5O/Y78zvvO+o75DveO9Y7zTvEO7k7rTugO5E7gTtwO147Sjs1OwA8ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/U78jvuO+o75DveO9c7zzvGO7w7sjumO5k7izt8O2s7WjsAPNg79jv7O/07/jv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+O/07/Tv9O/07/Dv8O/w7+zv7O/s7ADwkO6A70zvmO/A79Dv3O/g7+Tv5O/k7+Tv4O/c79jv1O/Q78zvxO/A77jvtO+s76TvoO+Y75DviO+A73jvcOwA8uTsnO2s7ozvCO9Q73zvlO+k76jvrO+o76DvmO+Q74TvdO9k71TvRO807yDvDO747uju1O687qjulO6A7mzsAPPI7ZzstO1c7hjumO7s7yTvRO9U71zvXO9U70TvNO8g7wju7O7Q7rTulO507lTuNO4Q7fDtzO2s7YjtZO1E7ADz8O7w7TDszO1E7djuTO6c7tTu9O8E7wTu/O7s7tjuuO6Y7nTuTO4g7fTtyO2Y7WjtOO0I7NjsqOx87EzsHOwA8/jvkO487Rzs7O1E7bTuGO5c7ozuqO6w7qjumO587ljuLO387cztlO1c7SDs5Oyo7GzsMO/067jrfOtA6wjoAPP878zvBO3Y7STtEO1Q7ajt9O4o7kzuXO5Y7kTuKO387cztlO1Y7RTs0OyM7ETv/Ouw62jrJOrc6pjqVOoQ6ADwAPPo73julO2w7TztNO1k7aDt2O387hDuEO387dztsO147Tjs8Oyo7FjsCO+062DrEOq86mzqHOnM6YDpNOgA8ADz9O+07xzuUO2s7VztVO107ZztwO3Q7dDtwO2g7XDtNOzs7KDsTO/065jrPOrg6oTqKOnQ6XjpIOjM6HzoAPAA8/jv1O907tTuLO207XztdO2E7ZjtqO2k7ZTtcO087PzstOxg7ATvpOtA6tzqeOoU6bDpTOjs6JDoOOvg5ADwAPP87+TvqO847qjuIO3E7ZjtjO2M7ZDtiO107VDtHOzY7IjsMO/Q62jrAOqQ6iTpuOlQ6OTogOgc67znYOQA8ADz/O/w78jvfO8I7ozuIO3Y7bDtnO2Q7YDtZO1A7QjsxOxw7BTvrOtA6tDqYOns6XjpCOiY6CzrxOdg5vzkAPAA8ADz9O/c76jvVO7o7oDuKO3s7cDtpO2I7WjtPO0E7LzsaOwI75zrLOq46kDpyOlM6NjoYOvw54TnGOa05ADwAPAA8/jv6O/E74jvNO7U7njuMO347cztpO187UjtDOzE7GzsCO+c6yzqsOo06bjpOOi86ETrzOdY5ujmgOQA8ADwAPP87/Dv2O+s72zvHO7E7njuNO387cztnO1k7STs2OyA7BzvrOs46rzqPOm46TjotOg467znRObQ5mDkAPAA8ADz/O/07+TvxO+U71TvCO687njuOO387cTtiO1E7PTsnOw478jrVOrU6lDpzOlI6MDoQOvA50TmzOZY5ADwAPAA8/zv+O/s79TvsO9870Du/O607nTuNO307bTtbO0g7MTsYO/w63zq/Op46fDpaOjg6Fjr1OdU5tjmYOQA8ADwAPAA8/zv8O/g78jvoO9s7zDu8O6s7mzuLO3o7aDtTOz07JDsJO+s6yzqqOog6ZjpDOiE6/zneOb45nzkAPAA8ADwAPP87/Tv6O/U77jvjO9c7yDu5O6k7mDuHO3U7YTtKOzI7Fzv6Oto6ujqXOnU6UjovOgw66jnKOao5ADwAPAA8ADz/O/47/Dv4O/I76jvfO9M7xTu2O6Y7lTuDO287WTtBOyc7CjvrOss6qTqHOmM6QDodOvs52Tm4OQA8ADwAPAA8/zv+O/07+jv1O+875jvbO887wTuyO6I7kDt9O2g7UTs3Oxw7/jreOr06mzp4OlQ6MToOOuw5yzkAPAA8ADwAPAA8/zv9O/s7+DvyO+s74zvYO8s7vjuuO547izt3O2E7STsuOxE78zrTOrE6jjprOkg6JToCOuA5ADwAPAA8ADwAPP87/jv8O/k79TvwO+g73zvUO8g7ujuqO5k7hjtxO1o7QTsmOwg76TrJOqc6hDphOj46Gzr5OQA8ADwAPAA8ADz/O/47/Tv7O/c78zvtO+U73DvRO8Q7tjumO5Q7gTtrO1Q7OjseOwE74jrBOp86fTpaOjc6FToAPAA8ADwAPAA8/zv/O/47/Dv5O/U78DvqO+I72DvNO8E7sjuiO5A7fDtnO087NTsZO/s63Dq8Opo6eDpWOjM6ADwAPAA8ADwAPAA8/zv+O/07+jv3O/M77jvnO9871jvKO747rzufO407eTtjO0s7MTsWO/g62Tq5Opg6dzpVOgA8ADwAPAA8ADwAPP87/jv9O/w7+Tv2O/E77DvlO9070zvIO7s7rDucO4o7dzthO0k7MDsVO/g62jq6Opo6eToAPAA8ADwAPAA8ADz/O/87/jv8O/o7+Dv0O/A76jvjO9s70TvGO7k7qzubO4k7djthO0o7MTsXO/s63Tq/Op86ADwAPAA8ADwAPAA8/zv/O/47/Tv8O/k79jvzO+476DvhO9k70DvFO7k7qzubO4o7eDtjO007NjscOwE75TrIOgA8ADwAPAA8ADwAPAA8/zv/O/47/Dv7O/g79TvyO+075zvgO9k7zzvFO7k7rDudO407fDtpO1Q7PjsmOww78joAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvxO+w75zvgO9k70DvGO7s7rzuhO5I7gjtxO147STszOxw7ADwAPAA8ADwAPAA8ADz/O/87/zv+O/07+zv5O/c79DvwO+s75jvfO9g70DvGO7w7sDukO5Y7hzt3O2U7Uzs/OwA82Dv2O/s7/Tv+O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv9O/07/Tv9O/w7/Dv8O/w7+zsAPCQ7oDvTO+Y78Dv0O/c7+Tv5O/o7+jv5O/k7+Dv3O/Y79Tv0O/M78TvwO+877TvrO+o76DvmO+U74zvhO987ADy5Oyc7azujO8I71DvfO+U76TvrO+w76zvqO+g75jvjO+A73TvZO9U70TvNO8k7xDvAO7s7tjuxO607qDujOwA88jtmOyw7VzuGO6Y7vDvJO9I71jvZO9k71zvVO9E7zDvHO8E7uzu0O607pTueO5Y7jjuGO347djtuO2U7XTsAPPw7vDtMOzM7UTt1O5M7qDu1O747wzvEO8M7vzu6O7Q7rTukO5s7kTuHO307cjtnO1s7UDtFOzk7LjsiOxc7ADz+O+M7jjtGOzs7UTttO4Y7mDukO6s7rjuuO6o7pDudO5M7iTt9O3A7YztVO0c7OTsqOxw7Djv/OvE64zrUOgA8/zvzO8E7djtIO0M7VDtpO307izuVO5k7mTuWO5A7hzt8O287YTtSO0I7MTsgOw87/jrsOts6yjq5Oqg6mDoAPAA8+jveO6U7aztOO0w7WDtoO3Y7gDuGO4c7hDt9O3Q7ZztZO0k7NzslOxE7/jrqOtY6wjquOpo6hzp0OmI6ADwAPP077TvHO5M7aTtWO1Q7XDtnO3A7djt4O3U7bjtjO1Y7Rjs0OyE7DDv2OuA6yjqzOp06hzpxOlw6RzozOgA8ADz+O/U73Tu1O4o7aztdO1w7YDtmO2s7bDtpO2E7VztIOzc7JDsOO/g64DrIOq86lzp+OmY6Tzo3OiE6CzoAPAA8/zv5O+o7zjupO4c7cDtlO2I7YztkO2Q7YDtZO007PjssOxg7ATvoOs86tTqaOoA6ZjpMOjI6GToBOuo5ADwAPP87/DvyO987wTuhO4c7dDtrO2Y7ZDthO1w7VDtIOzg7JTsPO/c63jrDOqc6izpvOlM6NzocOgI66DnPOQA8ADwAPP079zvqO9Q7uTueO4g7eTtvO2k7YztcO1I7RTs1OyI7CzvyOtg6uzqeOoA6YzpFOig6CzrwOdU5uzkAPAA8ADz+O/o78TvhO8w7szudO4o7fDtyO2k7YDtVO0c7NjsiOws78TrWOrg6mjp7Olw6PToeOgA64znHOaw5ADwAPAA8/zv8O/Y76jvaO8U7sDucO4w7fjtyO2c7WjtLOzo7JTsOO/Q61zq5Opo6ejpaOjk6Gjr6Odw5vzmiOQA8ADwAPP87/Tv5O/E75DvUO8E7rjucO4w7fjtxO2M7UztBOyw7FDv5Ot06vjqeOn06XDo7Oho6+TnaObs5njkAPAA8ADz/O/47+zv1O+w73zvPO707rDubO4w7fTttO1w7Sjs0Oxw7AjvlOsY6pTqEOmI6QDoeOv053Dm8OZ45ADwAPAA8ADz/O/w7+DvxO+c72jvLO7o7qjuaO4o7eTtoO1U7PzsnOw078DrROrA6jjpsOkk6JjoEOuI5wjmiOQA8ADwAPAA8/zv9O/o79TvtO+I71TvHO7c7pzuXO4Y7dDthO0s7NDsZO/063jq9Opw6eTpVOjI6DzrtOcs5qjkAPAA8ADwAPP87/jv8O/g78jvpO9470jvDO7Q7pDuTO4I7bjtZO0E7KDsMO+06zTqrOok6ZTpBOh46+znYObc5ADwAPAA8ADz/O/47/Tv6O/U77jvlO9o7zjvAO7E7oDuPO3w7ZztQOzc7HDv+Ot86vTqbOnc6VDowOgw66TnGOQA8ADwAPAA8ADz/O/07+zv3O/I76zviO9c7yju8O607nDuKO3U7XztHOy07EDvxOtE6rzqMOmg6RDogOv052jkAPAA8ADwAPAA8/zv+O/w7+Tv1O+875zveO9M7xju4O6g7lzuEO287WDs+OyM7BTvmOsU6ozp/Ols6NzoTOvA5ADwAPAA8ADwAPP87/jv9O/s79zvyO+w75DvaO887wju0O6Q7kjt+O2g7UDs2Oxo7/DrcOrs6mDp1OlE6LToJOgA8ADwAPAA8ADz/O/87/Tv8O/k79TvwO+k74TvXO8s7vjuwO587jTt4O2I7SjsvOxM79DrUOrM6kDptOkk6JjoAPAA8ADwAPAA8/zv/O/47/Dv6O/c78zvtO+Y73jvUO8g7uzusO5s7iDtzO107RDspOw077jrOOq06izpoOkU6ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78TvrO+M72zvQO8U7tzuoO5c7hDtwO1k7QDsmOwk76zrLOqs6iTpmOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv3O/M77jvoO+E72DvOO8I7tDulO5Q7gjttO1c7PjskOwg76zrMOqw6ijoAPAA8ADwAPAA8ADz/O/87/jv9O/s7+Tv2O/I77TvmO9871jvMO8A7sjukO5M7gTtsO1c7PzsmOws77jrQOrE6ADwAPAA8ADwAPAA8ADz/O/47/Tv8O/o7+Dv0O/A76zvlO9071DvKO787sjujO5M7gTtuO1k7QjsqOxA79TrYOgA8ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/k79zvzO+876TvjO9w70zvJO747sjukO5Q7hDtyO147STsyOxo7ADsAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvxO+076DvhO9o70TvHO7w7sDujO5Q7hDtzO2E7TTs4OyE7ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+O/47/Tv9O/07/Tv8O/w7/Dv8OwA8JDugO9M75jvwO/Q79zv5O/o7+jv6O/o7+Tv5O/g79zv2O/U79DvzO/E78DvvO+077DvqO+k75zvlO+Q74jsAPLk7JztrO6M7wjvUO9875jvpO+w77DvsO+s76jvoO+U74zvgO9w72TvVO9E7zTvJO8U7wDu8O7c7szuuO6o7ADzyO2Y7LDtXO4U7pju8O8k70jvXO9o72jvZO9c71DvQO8s7xjvAO7o7szusO6U7njuWO487hzt/O3g7cDtoOwA8/Du8O0w7MztQO3U7kzuoO7Y7vzvEO8Y7xTvDO747uTuyO6s7ojuZO5A7hjt7O3E7ZjtcO1E7Rjs7OzA7JTsAPP474zuOO0Y7OjtQO207hjuYO6U7rTuwO7E7rjupO6I7mjuQO4U7ejttO2A7UztGOzg7KjscOw47ADvyOuU6ADz/O/M7wTt1O0g7QztTO2k7fTuMO5Y7mzucO5o7lTuNO4M7eDtrO1w7TTs+Oy47HTsMO/w66zraOso6uTqpOgA8ADz6O947pDtrO007SztXO2g7djuBO4g7ijuIO4M7ejtvO2I7UztCOzE7HzsMO/k65TrSOr86rDqZOoY6czoAPAA8/TvtO8c7kjtoO1U7UztcO2c7cTt4O3o7eDtzO2o7XjtPOz47LDsZOwQ77zrZOsM6rjqYOoM6bTpZOkQ6ADwAPP479TvdO7Q7iTtqO1w7WztgO2c7bDtuO2w7ZjtcO1A7QDsuOxo7BDvuOtY6vzqnOo86dzpfOkg6MjocOgA8ADz/O/k76jvNO6g7hjtuO2M7YTtjO2U7ZTtjO107UztFOzQ7ITsMO/U63DrDOqk6jzp1Olw6QjopOhE6+TkAPAA8/zv8O/I73jvBO6A7hTtzO2o7ZjtkO2I7XjtXO0w7PjstOxg7AjvpOs86tDqZOn06YTpGOis6EDr2Od05ADwAPAA8/Tv3O+k70zu4O507hzt4O247aDtjO107VTtJOzo7KDsTO/w64jrHOqo6jTpwOlI6NToZOv054TnHOQA8ADwAPP47+jvxO+E7yzuyO5s7iTt7O3E7aTtgO1Y7Sjs6Oyc7Ejv5Ot86wjqlOoY6aDpJOio6DDrvOdI5tjkAPAA8ADz/O/w79jvqO9k7xDuvO5s7ijt9O3I7ZztbO007PTsqOxM7+jrfOsI6ozqEOmQ6RDokOgQ65TnHOao5ADwAPAA8/zv9O/k78DvkO9M7wDusO5s7izt9O3A7YztUO0M7LzsYO/864zrFOqY6hTpkOkM6IjoBOuE5wjmkOQA8ADwAPP87/jv7O/U76zveO847vDuqO5o7izt8O207XTtLOzc7IDsGO+o6yzqrOoo6aDpGOiQ6AjrhOcE5oTkAPAA8ADwAPP87/Dv4O/E75jvZO8k7uTuoO5g7iTt5O2g7VTtAOyk7DzvzOtU6tDqTOnA6TToqOgc65TnEOaM5ADwAPAA8ADz/O/07+jv1O+074jvUO8Y7tjumO5Y7hTt0O2E7TDs0Oxs7/zrgOsA6njp7Olg6NDoQOu05yzmpOQA8ADwAPAA8/zv+O/w79zvxO+g73TvQO8I7szujO5I7gDttO1g7QTsoOww77jrOOqw6iTplOkE6HTr5OdY5szkAPAA8ADwAPP87/jv9O/k79TvuO+U72TvMO747rzufO407ejtmO087NjsbO/063jq8Opk6djpROiw6CDrkOcA5ADwAPAA8ADwAPP87/Tv7O/c78jvqO+E71TvJO7o7qzuaO4c7cztdO0U7KzsOO+86zjqsOog6ZDo/Oho69TnROQA8ADwAPAA8ADz/O/47/Dv5O/U77jvnO9070TvEO7Y7pjuUO4E7bDtVOzs7HzsBO+E6wDqdOnk6VDovOgo65TkAPAA8ADwAPAA8/zv+O/07+jv3O/I76zvjO9k7zTvAO7E7oTuOO3o7ZDtMOzE7FTv2OtU6szqPOms6RjohOvw5ADwAPAA8ADwAPP87/zv9O/s7+Tv1O+876DvfO9U7yTu8O6w7mzuIO3Q7XTtDOyg7CzvrOso6qDqEOmA6OzoWOgA8ADwAPAA8ADz/O/87/jv8O/o79zvyO+w75TvcO9E7xTu3O6g7ljuDO207Vjs8OyA7AjvjOsI6nzp8Olc6MzoAPAA8ADwAPAA8ADz/O/47/Tv7O/g79TvwO+k74jvYO847wTuzO6M7kTt9O2c7UDs2Oxo7/DrdOrw6mTp2OlI6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/c78jvtO+c73zvVO8o7vTuvO587jTt5O2M7SzsxOxY7+DrZOrg6ljpzOgA8ADwAPAA8ADwAPP87/zv+O/07+zv4O/U78DvrO+Q73DvSO8c7ujusO5s7iTt2O2A7SDsvOxQ79zrYOrg6lzoAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv3O/M77jvpO+I72TvPO8Q7tzupO5k7hzt0O187SDsvOxU7+TrcOr06ADwAPAA8ADwAPAA8ADz/O/87/jv8O/s7+Dv1O/E77DvmO9871zvNO8I7tTunO5c7hjtzO187STsyOxk7/jriOgA8ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/k79zvzO+876jvkO9w70zvJO747sTujO5Q7gztxO147STszOxs7AjsAPNg79jv7O/07/jv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+O/07/Tv9O/07/Tv8O/w7ADwkO6A70zvmO/A79Dv3O/k7+jv6O/o7+jv6O/k7+Tv4O/c79jv1O/Q78zvxO/A77zvtO+w76jvpO+c75jvkOwA8uTsnO2s7ozvCO9U73zvmO+o77DvtO+077DvrO+k75zvlO+I73zvcO9g71DvRO807yTvFO8E7vDu4O7Q7rzsAPPI7ZjssO1c7hTumO7w7yjvTO9g72zvcO9s72TvWO9M7zjvKO8Q7vju4O7I7qzukO507ljuPO4g7gDt5O3E7ADz8O7w7SzszO1A7dTuTO6g7tzvAO8U7yDvHO8U7wju9O7c7sDuoO6A7lzuOO4Q7ejtwO2U7WztRO0Y7PDsxOwA8/jvjO447RTs6O1A7bTuGO5k7pjuuO7I7szuxO607pzugO5c7jTuCO3Y7ajtdO1A7Qzs2Oyg7GzsNOwA78zoAPP878zvBO3U7RztCO1M7aTt9O4w7lzudO587njuZO5I7iTt/O3M7ZjtXO0g7OTspOxk7CTv5Oug62DrIOrg6ADwAPPo73jukO2s7TTtLO1c7aDt3O4I7iTuMO4s7hzt/O3U7aTtbO0w7PDsqOxg7BjvzOuA6zTq7Oqg6lTqDOgA8ADz9O+07xjuSO2g7VDtTO1w7ZztyO3k7fDt7O3c7bztkO1c7Rzs2OyM7EDv7Ouc60Tq8Oqc6kjp9Omg6VDoAPAA8/jv1O907tDuJO2o7XDtaO2A7ZztsO287bjtqO2E7VjtHOzc7JDsPO/o64zrMOrU6nTqGOm46VzpBOio6ADwAPP87+TvqO807pzuFO247YzthO2M7ZTtnO2U7YDtXO0s7OzspOxU7/zroOs86tjqdOoM6aTpQOjc6HzoHOgA8ADz/O/w78jveO8A7oDuEO3I7aTtlO2Q7YztfO1k7UDtDOzM7IDsKO/M62jrAOqU6iTpuOlM6ODodOgM66jkAPAA8/zv9O/c76TvTO7c7nDuGO3c7bTtoO2M7XjtXO0w7PzsuOxo7AzvrOtA6tTqYOns6XjpBOiQ6CDrsOdI5ADwAPAA8/jv6O/E74DvKO7E7mjuIO3o7cDtoO2E7WDtMOz47LDsXOwA75jrLOq46kDpxOlM6NDoWOvg52zm/OQA8ADwAPP87/Dv1O+o72TvDO647mjuJO3w7cTtnO1w7TztAOy07GDsAO+Y6yTqrOow6bDpMOiw6DDrtOc85sTkAPAA8ADz/O/07+TvwO+M70ju/O6s7mTuKO3w7cDtjO1U7RDsxOxw7AzvoOss6rDqMOms6SjooOgc65znHOag5ADwAPAA8/zv+O/s79TvrO907zTu7O6k7mTuJO3s7bDtdO0w7ODsiOwk77TrQOrA6jzptOks6KToGOuU5xDmkOQA8ADwAPAA8/jv8O/g78DvmO9g7yDu4O6c7lzuHO3g7ZztVO0E7KjsRO/U61zq3OpY6czpQOi06CTrnOcQ5ozkAPAA8ADwAPP87/Tv6O/Q77DvhO9M7xDu0O6Q7lDuEO3I7YDtLOzQ7Gzv/OuE6wTqfOnw6WTo0OhA67DnJOac5ADwAPAA8ADz/O/47+zv3O/E76DvdO887wTuxO6E7kDt/O2w7VztAOyc7CzvtOs06rDqIOmQ6PzoaOvY50TmuOQA8ADwAPAA8/zv+O/w7+Tv0O+075DvYO8s7vTutO507izt4O2Q7TTs0Oxk7+zrbOro6lzpyOk06KDoCOt05uTkAPAA8ADwAPP87/zv9O/s79zvxO+k74DvUO8c7uDupO5c7hTtxO1o7QjsnOwo76zrKOqc6gzpeOjg6EjrsOcc5ADwAPAA8ADwAPP87/jv8O/k79DvuO+Y73DvQO8I7tDujO5E7fjtoO1E7NzsbO/w63Dq5OpU6cDpLOiQ6/jnYOQA8ADwAPAA8ADz/O/47/Tv6O/Y78TvqO+I71zvLO747rjudO4s7djtfO0Y7KzsOO+46zTqqOoU6YDo5OhM67TkAPAA8ADwAPAA8/zv/O/07+zv4O/Q77jvnO9470zvHO7k7qTuXO4Q7bjtWOzw7IDsCO+E6vzqbOnc6UTorOgQ6ADwAPAA8ADwAPP87/zv+O/w7+jv2O/E76zvjO9o7zzvCO7M7ozuRO3w7ZjtNOzM7Fjv3OtY6szqPOmo6RDoeOgA8ADwAPAA8ADwAPP87/jv9O/s7+Dv0O+876DvgO9Y7yju9O647nTuKO3U7XjtFOyo7DTvtOsw6qjqGOmE6OzoAPAA8ADwAPAA8ADz/O/47/Tv8O/k79jvxO+w75TvcO9I7xju4O6k7lzuEO287Vzs+OyM7BTvmOsU6ojp/Olo6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/g79DvvO+k74TvYO847wTuzO6Q7kjt+O2k7Ujs4Ox07ADvhOsA6nzp7OgA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/Y78jvsO+Y73jvVO8o7vTuvO587jTt6O2U7TTs0Oxo7/TrfOr86njoAPAA8ADwAPAA8ADwAPP87/jv9O/w7+jv3O/Q77zvqO+M72zvRO8Y7uTurO5s7iTt2O2E7SzszOxk7/TrgOsI6ADwAPAA8ADwAPAA8ADz/O/87/jv9O/s7+Dv1O/I77TvmO9871jvMO8E7tDulO5U7gztwO1w7RjsvOxY7/DrgOgA82Dv2O/s7/Tv+O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/47/jv9O/07/Tv9O/07/DsAPCQ7oDvTO+Y78Dv1O/c7+Tv6O/o7+jv6O/o7+jv5O/g7+Dv3O/Y79TvzO/I78TvwO+877TvsO+s76TvoO+Y7ADy5Oyc7azujO8I71TvfO+Y76jvsO+477jvtO+w76zvpO+Y75DvhO9472zvXO9Q70DvMO8k7xTvBO707uTu0OwA88jtmOyw7VzuGO6Y7vDvKO9M72TvcO9073DvbO9k71TvRO807yDvDO707tzuxO6o7ozudO5Y7jzuIO4A7eTsAPPw7vDtMOzM7UDt1O5M7qDu3O8E7xjvJO8k7yDvFO8A7uzu0O607pTudO5Q7izuCO3g7bjtkO1o7UDtGOzw7ADz+O+M7jjtFOzo7UDttO4Y7mTunO687tDu1O7Q7sDurO6Q7nDuTO4k7fjtyO2Y7WjtNO0A7MzsmOxk7DDv/OgA8/zvzO8E7dTtHO0I7UztpO307jTuYO587oTugO507lzuPO4U7ejttO2A7UjtDOzQ7JDsVOwU79TrlOtU6xjoAPAA8+jveO6Q7aztNO0s7VztoO3c7gzuLO447jjuLO4Q7eztwO2M7VDtFOzQ7IzsRO/867TraOsg6tTqjOpE6ADwAPP077TvGO5I7aDtUO1M7XDtoO3I7ejt+O347ejtzO2o7XTtPOz87LTsaOwY78jreOsk6tDqfOoo6djphOgA8ADz+O/U73Du0O4g7ajtcO1o7YDtnO207cTtxO207ZjtbO047PjssOxg7BDvuOtc6wTqpOpI6ezpkOk46ODoAPAA8/zv5O+o7zTunO4U7bTtiO2A7YztmO2g7ZztjO1s7UDtBOzA7HTsIO/E62jrBOqg6jzp2Olw6RDorOhM6ADwAPP87/DvyO947wDufO4Q7cjtoO2U7ZDtjO2E7XDtTO0c7ODsmOxI7+zrjOsk6rzqUOnk6XjpDOig6Djr0OQA8ADz/O/079zvpO9M7tzubO4U7djttO2g7ZDtfO1g7TztCOzI7HzsKO/I62Dq9OqE6hTpoOks6LjoSOvY52zkAPAA8ADz+O/o78DvgO8o7sTuaO4c7eTtwO2g7YTtZO047QDswOxw7BTvtOtI6tTqYOno6Wzo9Oh46ADrjOcY5ADwAPAA8/zv8O/U76jvYO8M7rTuZO4g7eztxO2c7XDtQO0E7MDscOwQ76zrPOrE6kzpzOlM6MzoTOvM51Dm2OQA8ADwAPP87/Tv5O/A74zvRO747qjuYO4k7fDtvO2M7VTtFOzM7HjsGO+w6zzqxOpE6cDpPOi06DDrrOcs5qzkAPAA8ADz/O/47+zv0O+s73TvMO7o7qDuXO4g7ejtsO107TDs5OyM7CzvwOtM6szqTOnE6TjosOgk65znFOaQ5ADwAPAA8ADz+O/w7+DvwO+U71zvHO7Y7pjuWO4Y7djtmO1Q7QTsrOxI79jrZOrk6lzp1OlE6LjoKOuY5wzmhOQA8ADwAPAA8/zv9O/o79DvsO+A70zvDO7M7ozuTO4I7cTtfO0o7NDsbO/864TrBOp86fDpYOjM6DjrqOcY5ojkAPAA8ADwAPP87/jv7O/c78DvnO9w7zju/O687nzuOO307ajtVOz87JTsKO+w6zDqqOoY6YTo8OhY68TnMOac5ADwAPAA8ADz/O/47/Dv5O/Q77TvjO9c7yju7O6s7mjuJO3Y7YTtKOzE7Fjv4Otg6tjqSOm06SDohOvs51TmwOQA8ADwAPAA8/zv/O/07+zv3O/E76TvfO9M7xTu2O6Y7lTuCO207Vzs+OyM7BjvmOsQ6oTp8OlY6LzoIOuE5uzkAPAA8ADwAPAA8/zv+O/w7+Dv0O+075TvaO847wDuxO6A7jjt6O2Q7TDsxOxU79TrUOrE6jDpmOj86GDrxOco5ADwAPAA8ADwAPP87/jv9O/o79jvxO+o74TvWO8k7uzurO5o7hjtxO1o7QDskOwY75TrDOp46eTpSOis6AzrcOQA8ADwAPAA8ADz/O/87/Tv7O/g78zvtO+Y73DvRO8Q7tTulO5I7fjtnO087NDsXO/c61jqyOo06ZzpAOhg68DkAPAA8ADwAPAA8/zv/O/47/Dv5O/Y78TvqO+I72DvMO747rzueO4o7dTteO0Q7KDsKO+k6xzqjOn06VzovOgg6ADwAPAA8ADwAPAA8/zv+O/07+jv3O/M77TvmO9070zvHO7g7qDuWO4I7bDtUOzk7HDv9Ot06ujqVOnA6SToiOgA8ADwAPAA8ADwAPP87/jv9O/s7+Tv1O/A76jviO9k7zjvBO7I7ojuPO3o7YztKOy87EjvzOtE6rzqKOmU6PjoAPAA8ADwAPAA8ADz/O/87/jv8O/o79zvzO+075zveO9U7yTu7O6w7mzuHO3I7WztCOyY7CTvqOsk6pjqCOl06ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/g79TvwO+o74zvaO9A7xDu2O6Y7lDuAO2s7Uzs6Ox87AjvjOsM6oTp9OgA8ADwAPAA8ADwAPP87/zv+O/07/Dv5O/Y78jvtO+c73zvWO8s7vjuwO587jTt6O2Q7TTs0Oxk7/TrfOr86nzoAPAA8ADwAPAA8ADwAPP87/jv9O/w7+jv3O/Q77zvqO+M72jvQO8Q7tzuoO5c7hTtxO1w7RTssOxI79jrZOrs6ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+O/47/Tv9O/07/Tv9OwA8JDugO9M75jvwO/U79zv5O/o7+zv7O/s7+jv6O/k7+Tv4O/c79jv1O/Q78zvyO/E78DvvO+077DvrO+k76DsAPLk7JztrO6M7wzvVO+A75jvqO+077jvuO+477TvsO+o76DvmO+M74DvdO9o71zvTO9A7zDvIO8Q7wTu9O7k7ADzyO2Y7LDtXO4Y7pzu8O8o71DvZO9w73jveO9072jvXO9Q70DvLO8Y7wTu7O7U7rzupO6I7nDuVO447hzuAOwA8/Du8O0w7MztRO3U7kzupO7g7wTvHO8o7yzvKO8c7wzu+O7g7sjuqO6I7mjuRO4g7fzt2O2w7YjtZO087RTsAPP474zuOO0Y7OjtQO207hjuaO6c7sDu1O7c7tjuzO687qDuhO5g7jjuEO3k7bjtiO1Y7STs9OzA7IzsXOwo7ADz/O/M7wTt1O0g7QztTO2o7fjuOO5k7oDujO6M7oDubO5M7ijuAO3Q7ZztaO0w7PTsuOx87DzsAO/E64TrSOgA8ADz6O947pDtrO007SztYO2g7eDuEO4w7kDuRO447iDuAO3U7aTtbO007PTssOxs7CTv3OuU60zrBOq86nToAPAA8/TvtO8c7kjtoO1Q7UztcO2g7czt7O4A7gDt9O3c7bjtjO1U7Rjs1OyM7EDv8Oug61Dq/Oqs6ljqCOm46ADwAPP479TvdO7Q7iTtqO1w7WztgO2g7bjtyO3M7cDtpO187UztEOzM7IDsMO/c64TrLOrQ6nTqHOnA6WTpDOgA8ADz/O/k76jvNO6c7hTtuO2M7YTtjO2c7aTtpO2U7XjtUO0Y7NjskOw87+jrjOss6sjqZOoA6ZzpOOjY6HjoAPAA8/zv8O/I73jvAO587hDtyO2k7ZTtlO2Q7YjteO1Y7Szs8Oys7GDsCO+s60jq4Op06gzpnOkw6MjoXOv05ADwAPP87/Tv3O+k70zu3O5s7hTt2O207aDtkO2A7WjtRO0U7NjskOw87+DrfOsU6qTqNOnA6Uzo2Oho6/jniOQA8ADwAPP47+jvwO+A7yjuxO5k7hzt5O3A7aDthO1k7TztCOzI7IDsKO/I62Dq8Op86gTpiOkQ6JToHOuk5zDkAPAA8ADz/O/w79TvpO9g7wzusO5g7iDt7O3A7ZztdO1E7QzsyOx47CDvvOtM6tjqYOng6WDo4Ohg6+DnZObo5ADwAPAA8/zv9O/g78DvjO9E7vTuqO5g7iDt7O287YztVO0Y7NDsgOwg77jrSOrQ6lDp0OlI6MToPOu45zTmsOQA8ADwAPP87/jv7O/Q76jvcO8s7uTunO5Y7hzt5O2s7XDtMOzk7JDsMO/E61Dq1OpU6czpQOi06CjrnOcU5ozkAPAA8ADwAPP47/Dv3O/A75TvXO8c7tTulO5Q7hTt1O2U7VDtAOyo7Ejv2Otk6uTqYOnU6UTotOgk65TnBOZ45ADwAPAA8ADz/O/07+jv0O+s74DvSO8I7sjuhO5E7gTtvO107STsyOxk7/jrgOsA6njp6OlY6MToLOuY5wTmdOQA8ADwAPAA8/zv+O/s79zvwO+c72zvNO747rjudO4w7eztoO1M7PDsjOwc76TrJOqY6gjpdOjc6ETrqOcQ5nzkAPAA8ADwAPP87/jv8O/k79DvsO+I71jvIO7k7qTuYO4Y7czteO0c7LjsSO/Q60zqxOo06ZzpAOhk68jnLOaQ5ADwAPAA8ADz/O/87/Tv6O/Y78DvoO9470TvDO7Q7ozuSO347aTtTOzo7HjsAO+A6vTqZOnM6TDolOv051TmtOQA8ADwAPAA8ADz/O/47/Dv4O/M77DvkO9k7zDu+O647nTuKO3U7XztGOys7DTvuOss6pzqCOls6MzoKOuI5uTkAPAA8ADwAPAA8/zv+O/w7+jv2O/A76TvfO9Q7xzu4O6c7lTuBO2s7Uzs4Oxw7/DrbOrc6kjprOkM6GjrxOcg5ADwAPAA8ADwAPP87/jv9O/s79zvzO+w75DvaO847wTuxO6A7jTt3O2A7RjsqOww76zrIOqM6fTpVOi06AzraOQA8ADwAPAA8ADz/O/87/jv8O/k79TvwO+k74DvVO8k7ujuqO5g7gzttO1Q7OTscO/w62jq2OpA6aTpBOhg67zkAPAA8ADwAPAA8/zv/O/47/Dv6O/c78jvsO+Q72zvQO8I7szuiO487eTtiO0g7LDsNO+w6yjqlOn86VzovOgY6ADwAPAA8ADwAPAA8/zv+O/07+zv4O/Q77zvoO+A71jvKO7w7rDuZO4U7bztWOzw7Hjv/Ot46uzqWOm86SDofOgA8ADwAPAA8ADwAPP87/zv9O/w7+Tv2O/E77DvkO9s70DvDO7Q7pDuRO3w7ZDtLOzA7EjvzOtE6rjqJOmM6OzoAPAA8ADwAPAA8ADz/O/87/jv8O/o79zvzO+476DvgO9Y7yju8O607mzuIO3I7WjtAOyU7BzvnOsY6ozp/Olk6ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/g79TvxO+s75DvbO9A7xDu1O6U7kzt+O2g7UDs2Oxs7/TreOr46nDp4OgA8ADwAPAA8ADwAPP87/zv+O/07/Dv5O/Y78jvtO+Y73jvVO8k7vDusO5s7iDtzO1w7RDsqOw878jrUOrQ6kzoAPNg79jv7O/07/jv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+O/07/Tv9O/07ADwkO6A70zvnO/A79Tv3O/k7+jv7O/s7+zv7O/o7+jv5O/k7+Dv3O/Y79Tv0O/M78jvxO/A77jvtO+w76zvpOwA8uTsnO2s7ozvDO9U74DvnO+s77TvvO+877zvuO+076zvpO+c75TviO9873DvZO9Y70jvPO8s7yDvEO8A7vTsAPPI7ZzstO1c7hjunO707yzvUO9o73TvfO9873jvcO9k71jvSO847yTvEO787uTuzO607pzuhO5o7lDuNO4c7ADz8O7w7TDszO1E7djuUO6k7uDvCO8g7yzvMO8w7yTvGO8E7vDu1O647pzufO5c7jjuFO3w7cztqO2A7VztNOwA8/jvkO447Rjs7O1E7bjuHO5o7qDuxO7c7uTu4O7Y7sjusO6U7nTuUO4o7fzt0O2k7XTtRO0U7OTssOyA7FDsAPP878zvBO3Y7SDtDO1Q7ajt/O487mjuhO6U7pTujO547lzuPO4U7ejtuO2E7UztFOzc7KDsZOwo7+zrrOtw6ADwAPPo73julO2s7TjtMO1g7aTt5O4U7jjuSO5M7kDuLO4Q7ejtvO2I7UztEOzQ7JDsSOwE77zreOsw6ujqoOgA8ADz9O+07xzuTO2k7VTtUO107aTt0O3w7gTuCO4A7eztyO2g7WztMOzw7KjsYOwU78TreOsk6tTqhOow6eDoAPAA8/jv1O907tDuJO2o7XDtbO2E7aTtvO3Q7dTtyO2w7YztYO0k7OTsnOxQ7/zrqOtQ6vjqnOpE6ejpjOk06ADwAPP87+TvqO807pzuFO247YzthO2Q7aDtqO2o7ZzthO1c7Sjs7Oyk7FjsBO+o60zq7OqI6iTpwOlg6PzonOgA8ADz/O/w78jveO8A7oDuEO3I7aTtmO2U7ZTtjO187WDtOO0A7MDsdOwg78TrZOr86pTqLOnA6VTo6Oh86BToAPAA8/zv9O/c76TvTO7c7mzuFO3Y7bTtoO2U7YTtbO1M7Rzs5Oyg7FDv9OuU6yzqwOpQ6dzpaOj06IToEOug5ADwAPAA8/jv6O/A74DvKO7E7mTuHO3k7cDtpO2I7WjtQO0Q7NTsiOw079jrcOsE6pDqGOmg6SToqOgw67TnQOQA8ADwAPP87/Dv1O+k72DvDO6w7mDuIO3s7cDtnO107UTtEOzM7IDsKO/E61zq6Opw6fDpcOjw6Gzr7Ods5vDkAPAA8ADz/O/07+DvwO+I70Tu9O6k7lzuIO3o7bjtiO1U7Rjs1OyE7CjvwOtQ6tjqXOnY6VTozOhE67znNOaw5ADwAPAA8/zv+O/s79DvqO9w7yzu5O6Y7ljuGO3g7ajtbO0s7OTskOww78jrVOrY6lTpzOlA6LToKOuY5wzmhOQA8ADwAPAA8/jv8O/c78DvlO9Y7xju1O6M7kzuDO3Q7ZDtSOz87KTsRO/Y62Dq4Opc6dDpQOis6BjrhOb05mTkAPAA8ADwAPP87/Tv6O/Q76zvfO9E7wTuxO6A7jzt/O207WztHOzA7Fzv8Ot46vTqbOnc6UjosOgY64Dm6OZU5ADwAPAA8ADz/O/47+zv3O/A75jvaO8w7vDusO5s7ijt4O2U7UDs5Ox87BDvlOsQ6ojp9Olc6MDoJOuI5uzmUOQA8ADwAPAA8/zv+O/w7+TvzO+s74TvVO8c7tzunO5U7gztvO1o7QzspOw077jrNOqo6hTpfOjc6DzrnOb85lzkAPAA8ADwAPP87/zv9O/o79jvwO+c73DvQO8E7sTugO447ejtlO047NDsYO/k62Dq1OpA6aTpBOhg67znGOZ05ADwAPAA8ADwAPP87/jv7O/g78zvsO+I71zvKO7s7qzuZO4U7cDtZOz87IzsFO+Q6wTqcOnU6TTokOvo50DmnOQA8ADwAPAA8ADz/O/47/Dv5O/U77zvnO9070jvEO7Q7ozuQO3s7ZDtLOzA7EjvxOs86qjqDOls6MToHOt05szkAPAA8ADwAPAA8/zv+O/07+zv3O/I76zvjO9g7zDu9O607mjuGO3A7Vzs8Ox87/zrdOrk6kjpqOkE6FzrsOcE5ADwAPAA8ADwAPP87/zv9O/s7+Dv0O+475zveO9I7xTu1O6Q7kTt7O2M7STstOw477DrJOqM6fDpTOik6/jnTOQA8ADwAPAA8ADz/O/87/jv8O/o79jvxO+s74jvYO8w7vTutO5s7hjtvO1Y7OjscO/w62Tq1Oo46Zjo8OhI65zkAPAA8ADwAPAA8ADz/O/47/Tv7O/c78zvuO+Y73TvSO8U7tTukO5A7ejtiO0g7KzsMO+o6xzqiOno6UjooOv45ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78DvpO+E71zvLO707rTuaO4U7bjtVOzk7HDv8Oto6tjqQOmk6QDoXOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv2O/I77DvlO9w70TvEO7Q7ozuPO3o7YjtHOys7DTvsOso6pjqBOlo6MjoAPAA8ADwAPAA8ADz/O/87/jv8O/o7+Dv0O+876DvgO9Y7yju7O6s7mTuEO207VTs6Ox07/zreOr06mTp0Ok46ADwAPAA8ADwAPAA8/zv/O/47/Tv7O/g79TvwO+o74zvZO847wTuxO6A7jDt3O187RjsqOw477zrPOq46jDpoOgA82Dv2O/w7/Tv+O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+O/47/jv9O/07/TsAPCQ7oDvTO+c78Dv1O/g7+Tv6O/s7+zv7O/s7+zv6O/o7+Tv4O/c79zv2O/U79DvzO/I78TvvO+477TvsO+s7ADy5Oyg7azujO8M71TvgO+c76zvuO+877zvvO+877jvsO+o76DvmO+Q74TveO9s72DvVO9I7zjvLO8c7xDvAOwA88jtnOy07WDuGO6c7vTvLO9Q72jveO+A74DvfO9072zvYO9Q70DvMO8c7wju9O7c7sTurO6U7nzuZO5I7jDsAPPw7vDtMOzQ7Ujt2O5Q7qju5O8M7yTvNO847zTvLO8g7xDu/O7k7sjurO6Q7nDuTO4s7gjt5O3A7ZzteO1Q7ADz+O+Q7jztHOzw7UjtuO4g7mzupO7I7uDu6O7o7uDu0O687qDuhO5g7jzuFO3o7bztkO1g7TTtBOzU7KDscOwA8/zvzO8E7djtJO0Q7VTtrO4A7kDubO6M7pzunO6U7oTuaO5M7iTt/O3M7ZztaO0w7PjswOyE7EjsDO/Q65ToAPAA8+jveO6U7bDtPO007WTtqO3o7hjuPO5Q7lTuTO447hzt+O3M7ZztZO0s7OzsrOxo7CTv4Ouc61TrDOrI6ADwAPP077TvHO5M7ajtWO1U7XjtqO3U7fjuDO4Q7gzt+O3Y7bDtfO1E7QjsxOx87DTv6OuY60jq+Oqo6ljqCOgA8ADz+O/U73Tu1O4o7bDteO1w7YjtqO3E7dTt2O3Q7bztnO1s7Tjs+Oy07GjsGO/I63DrGOrA6mTqDOmw6VjoAPAA8/zv5O+o7zTuoO4Y7bztkO2I7ZTtpO2s7bDtpO2M7WjtOOz87LjsbOwc78TraOsI6qjqROng6XzpHOi46ADwAPP87/DvyO947wTugO4U7cztqO2c7ZjtmO2U7YTtaO1A7QzszOyE7DTv2Ot46xTqsOpE6djpbOkA6JjoLOgA8ADz/O/079zvpO9M7tzucO4Y7dztuO2k7ZTtiO1w7VDtJOzs7KjsXOwE76TrQOrU6mTp9OmA6QzomOgk67TkAPAA8ADz+O/o78DvgO8o7sTuaO4c7ejtwO2k7YjtbO1E7RTs2OyQ7EDv5Ot86xDqoOoo6bDpNOi46DzrxOdI5ADwAPAA8/zv8O/U76TvYO8M7rDuYO4g7eztwO2c7XTtSO0Q7NDshOww78zrZOrw6njp/Ol86PjodOv053Dm8OQA8ADwAPP87/Tv4O/A74jvRO707qTuXO4c7ejtuO2I7VTtGOzU7ITsKO/E61Tq3Opg6dzpVOjM6ETruOcw5qjkAPAA8ADz/O/47+zv0O+o73DvLO7g7pjuVO4Y7dztpO1o7Sjs4OyM7CzvxOtQ6tTqVOnI6TzosOgc64znAOZw5ADwAPAA8ADz+O/w79zvwO+Q71jvFO7Q7ojuSO4I7cjtiO1A7PTsnOw879DrWOrY6lDpxOk06JzoCOtw5tzmSOQA8ADwAPAA8/zv9O/k79DvrO9870DvAO687njuNO307aztYO0Q7LTsUO/g62jq5Opc6cjpNOiY6/znYObI5izkAPAA8ADwAPP87/jv7O/Y77zvmO9k7yzu7O6o7mTuHO3U7YTtMOzU7Gzv/OuA6vzqbOnY6UDooOgA62DmwOYg5ADwAPAA8ADz/O/47/Dv4O/M76zvgO9Q7xTu1O6Q7kjt/O2s7Vjs+OyQ7BzvoOsY6ojp8OlU6LToEOto5sTmIOQA8ADwAPAA8/zv/O/07+jv2O+875jvbO847vzuvO507ijt2O2A7RzstOxA78TrPOqs6hTpdOjQ6CjrgObU5izkAPAA8ADwAPAA8/zv9O/s7+DvyO+s74TvVO8g7uDunO5Q7gDtqO1I7NzsbO/s62Tq1Oo86Zzo9OhM66Dm8OZE5ADwAPAA8ADwAPP87/jv8O/k79TvuO+Y73DvPO8E7sDueO4o7dDtcO0I7JjsGO+U6wTqaOnI6SToeOvI5xjmaOQA8ADwAPAA8ADz/O/47/Tv6O/Y78TvqO+E71jvIO7k7qDuUO387ZztNOzE7EjvxOs06pzp/OlY6Kzr/OdM5pjkAPAA8ADwAPAA8/zv/O/07+zv4O/M77TvlO9s7zzvBO7A7nTuJO3I7WDs9Ox47/jrbOrU6jjpkOjo6DjrhObU5ADwAPAA8ADwAPP87/zv+O/w7+Tv1O/A76TvgO9U7xzu4O6Y7kjt8O2M7SDsrOws76DrEOp06dDpKOh868jnGOQA8ADwAPAA8ADz/O/87/jv8O/o79zvyO+w75DvaO807vzuuO5s7hjtuO1Q7NzsYO/c60zqtOoU6XDoxOgY62TkAPAA8ADwAPAA8ADz/O/47/Tv7O/g79DvuO+c73jvTO8U7tjukO487eDtfO0M7JTsFO+I6vjqXOm86RjobOu85ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78DvqO+I71zvLO7w7qzuYO4I7ajtPOzI7EzvyOs86qjqDOls6MjoHOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv2O/I77DvlO9s70DvCO7I7oDuLO3Q7Wjs+OyE7ATvfOrw6lzpxOko6IToAPAA8ADwAPAA8ADz/O/87/jv8O/o79zvzO+475zvfO9Q7xzu4O6Y7kjt8O2M7STssOw477TrMOqk6hTpfOjk6ADzYO/Y7/Dv9O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+O/47/Tv9OwA8JDugO9M75zvwO/U7+Dv5O/o7+zv7O/s7+zv7O/o7+jv5O/k7+Dv3O/Y79Tv0O/M78jvxO/A77zvuO+077DsAPLk7KDtsO6Q7wzvVO+A75zvrO+477zvwO/A77zvuO+076zvpO+c75TviO+A73TvaO9c71DvRO807yjvGO8M7ADzyO2c7LTtYO4c7qDu9O8w71TvbO9474DvhO+A73zvcO9o71jvSO847yjvFO8A7uju1O687qTujO507lzuROwA8/Du8O007NTtSO3c7lTurO7o7xDvKO847zzvPO807yjvGO8E7vDu1O687pzugO5g7kDuHO387djttO2Q7WzsAPP475DuPO0g7PTtTO3A7iTucO6o7szu5O7w7vDu6O7c7sjurO6Q7nDuTO4o7fzt1O2o7XztTO0g7PDswOyQ7ADz/O/M7wjt3O0s7RjtWO2w7gTuRO507pDuoO6k7pzujO507ljuNO4M7eDtsO2A7UjtFOzc7KDsaOws7/TruOgA8ADz6O947pjtuO1E7TztbO2w7ezuIO5E7lTuXO5U7kTuKO4I7dztsO187UDtBOzI7ITsROwA77jrdOsw6ujoAPAA8/TvtO8g7lTtrO1g7VztgO2w7dzt/O4U7hjuFO4A7eTtvO2Q7VjtHOzc7JTsTOwE77TraOsY6sjqeOoo6ADwAPP479TvdO7Y7izttO187XjtkO2s7cjt3O3g7djtxO2o7XztSO0M7MjsgOww7+DrjOs06tzqgOoo6dDpdOgA8ADz/O/k76jvOO6k7hztxO2Y7ZDtmO2o7bTttO2s7ZTtdO1E7QzsyOyA7DDv2OuA6yDqwOpg6fzpmOk06NToAPAA8/zv8O/I73zvBO6E7hzt1O2s7aDtnO2c7ZjtiO1w7UjtGOzY7JTsRO/s64zrLOrE6lzp8OmE6RjorOhA6ADwAPAA8/Tv3O+k71Du4O507hzt4O287ajtmO2M7XTtVO0s7PTstOxo7BDvtOtM6uTqdOoE6ZDpHOio6DTrwOQA8ADwAPP47+jvxO+E7yjuyO5o7iDt6O3E7ajtjO1s7UjtGOzg7JjsSO/s64jrHOqs6jTpvOlA6MToROvI51DkAPAA8ADz/O/w79TvqO9g7wzutO5k7iDt7O3A7ZztdO1I7RDs1OyI7DDv0Oto6vTqfOoA6YDo/Oh46/TncObs5ADwAPAA8/zv9O/g78DviO9E7vTupO5c7hzt6O207YTtUO0U7NDsgOwo78TrVOrc6mDp3OlU6MjoPOuw5yTmnOQA8ADwAPP87/jv6O/Q76jvcO8s7uDulO5Q7hTt2O2g7WTtJOzY7ITsKO+860zq0OpM6cDpNOig6BDrfObs5lzkAPAA8ADwAPP47/Dv3O+875DvVO8U7szuhO5E7gDtwO2A7Tjs6OyQ7DDvxOtM6szqQOm06SDoiOvw51TmvOYo5ADwAPAA8ADz/O/07+TvzO+o73jvQO787rjudO4s7ejtoO1U7QDspOxA79DrVOrQ6kTpsOkY6Hzr3Oc85pzmAOQA8ADwAPAA8/zv+O/s79jvvO+U72DvKO7k7qDuWO4Q7cTtdO0g7MDsWO/k62Tq4OpQ6bjpGOh469TnMOaM5ejkAPAA8ADwAPP87/jv8O/g78jvqO9870jvDO7M7oTuPO3s7ZztQOzg7HTv/OuA6vTqYOnI6STogOvY5yzmhOXc5ADwAPAA8ADz/O/47/Tv6O/U77jvlO9o7zDu8O6s7mTuFO3A7WTtAOyU7BzvnOsQ6nzp4Ok86JTr5Oc45ojl3OQA8ADwAPAA8ADz/O/07+zv3O/E76jvgO9M7xTu1O6M7jzt6O2M7SjsuOxA78DrNOqc6gDpWOis6/znTOaY5ejkAPAA8ADwAPAA8/zv+O/w7+Tv0O+075TvaO8w7vTusO5k7gztsO1M7ODsaO/k61jqxOok6Xzo0Ogc62jmtOYA5ADwAPAA8ADwAPP87/jv8O/o79jvwO+k73zvTO8Q7tDuiO407djtdO0I7JDsDO+E6uzqTOmo6PjoSOuQ5tjmIOQA8ADwAPAA8ADz/O/47/Tv7O/c78jvsO+M72DvLO7w7qjuWO4A7ZztMOy47DjvsOsY6nzp2Oko6HjrwOcI5kzkAPAA8ADwAPAA8/zv/O/07+zv5O/Q77jvnO9070TvCO7I7njuJO3A7Vjs5Oxk79zrSOqw6gzpYOis6/jnQOaE5ADwAPAA8ADwAPP87/zv+O/w7+jv2O/E76jvhO9Y7yDu5O6Y7kTt6O2A7QzskOwM73zq5OpA6Zjo6Og064DmxOQA8ADwAPAA8ADwAPP87/jv9O/o79zvyO+w75DvaO847vzutO5k7gztpO047LzsPO+w6xjqfOnY6SzofOvI5xDkAPAA8ADwAPAA8ADz/O/47/Tv7O/g79DvuO+c73jvSO8U7tDuhO4s7cztYOzo7Gjv4OtQ6rjqGOlw6MToFOtk5ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78DvqO+E71zvKO7o7qDuTO3s7YTtFOyY7BTviOr06ljpuOkU6GzrvOQA8ADwAPAA8ADwAPP87/zv9O/w7+Tv2O/I76zvkO9o7zju/O607mTuDO2k7TTsvOw877TrKOqU6fzpXOi86BToAPNg79jv8O/47/jv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/47/jv+O/07ADwkO6A70zvnO/A79Tv4O/k7+jv7O/s7+zv7O/s7+zv6O/o7+Tv4O/g79zv2O/U79DvzO/I78TvwO+877jvtOwA8uTsoO2w7pDvDO9Y74TvnO+w77jvwO/A78DvwO+877jvsO+o76DvmO+Q74TvfO9w72TvWO9M70DvMO8k7xjsAPPI7aDsuO1k7hzuoO747zDvWO9w73zvhO+I74TvgO9472zvYO9Q70DvMO8c7wzu9O7g7szutO6c7oTubO5U7ADz8O707Tjs2O1Q7eDuWO6s7ujvEO8s7zzvQO9A7zjvMO8g7wzu+O7g7sjurO6Q7nDuUO4w7hDt7O3I7ajthOwA8/jvkO5A7STs/O1Q7cTuKO507qzu1O7o7vTu+O7w7uTu0O647pzufO5c7jjuEO3o7bztkO1k7TjtCOzY7KzsAPP878zvCO3k7TDtIO1g7bjuCO5M7njumO6o7qzupO6Y7oDuZO5E7hzt8O3E7ZTtYO0s7PTsvOyE7EjsEO/U6ADwAPPo73zunO287UztRO107bTt9O4o7kjuXO5k7lzuTO407hTt7O3A7YztVO0c7NzsoOxc7Bjv1OuQ60zrCOgA8ADz9O+47yTuWO207WjtZO2I7bjt5O4E7hjuIO4c7gzt8O3I7ZztaO0w7PDsrOxk7Bzv0OuA6zTq5OqU6kToAPAA8/jv1O947tzuNO287YjtgO2Y7bTt0O3k7ejt4O3Q7bDtiO1U7Rzs2OyQ7ETv9Oug60zq9Oqc6kDp6OmM6ADwAPP87+jvrO887qzuJO3M7aDtmO2g7bDtvO287bTtnO187VDtGOzY7JDsQO/s65DrNOrU6nTqEOms6Ujo6OgA8ADz/O/w78jvfO8I7ozuIO3c7bTtqO2k7aTtnO2Q7XTtUO0g7OTsnOxQ7/jrnOs46tTqbOoA6ZTpKOi86FDoAPAA8ADz9O/c76jvUO7k7njuJO3o7cDtrO2g7ZDteO1c7TDs/Oy47HDsGO+861jq8OqA6hDpnOko6LDoPOvI5ADwAPAA8/jv6O/E74TvLO7I7nDuJO3s7cjtqO2Q7XDtTO0c7ODsnOxM7/DrjOsg6rDqPOnA6UToyOhI68znTOQA8ADwAPP87/Dv1O+o72TvDO607mTuJO3s7cTtnO107UjtEOzQ7IjsMO/Q62jq+OqA6gDpgOj86HTr8Odo5uTkAPAA8ADz/O/07+DvwO+M70Tu9O6k7lzuHO3k7bTthO1M7RDszOx87CTvvOtQ6tjqWOnU6UzowOgw66TnFOaI5ADwAPAA8/zv+O/o79DvqO9w7yju4O6U7lDuEO3U7ZztXO0c7NDsfOwc77TrQOrA6jzpsOkk6JDr/Odk5tDmPOQA8ADwAPAA8/jv8O/c77zvkO9U7xDuyO6A7jzt/O247XTtLOzc7ITsIO+w6zjquOos6ZzpBOhs69DnNOaY5fzkAPAA8ADwAPP87/Tv5O/M76jveO887vjusO5s7iTt3O2U7UTs8OyU7CzvuOs86rTqKOmQ6PToVOu05xDmbOXM5ADwAPAA8ADz/O/47+zv2O+875DvXO8g7tzumO5M7gTttO1k7QjsqOw878jrROq86ijpjOjs6EjroOb45kzlqOQA8ADwAPAA8/zv+O/w7+DvyO+o73jvRO8E7sDueO4s7djthO0o7MDsVO/c61jqyOo06ZTo8OhE65jm6OY85YzkAPAA8ADwAPP87/jv9O/o79TvuO+Q72DvKO7k7pzuUO4A7ajtSOzg7HDv9Ots6tzqROmk6PzoTOuc5ujmNOWA5ADwAPAA8ADz/O/87/Tv7O/c78TvoO9470TvCO7A7njuJO3M7WjtAOyM7BDviOr46lzpuOkM6FzrqObw5jjlgOQA8ADwAPAA8ADz/O/47/Dv4O/M77DvjO9c7yTu5O6Y7kjt8O2M7STssOww76jrFOp46dTpKOh067znAOZE5YjkAPAA8ADwAPAA8/zv+O/w7+Tv1O+875zvcO887wDuuO5s7hDtsO1E7NDsVO/M6zjqnOn06UTokOvY5xjmXOWc5ADwAPAA8ADwAPP87/jv9O/o79zvxO+o74TvVO8c7tjujO407dTtaOz07Hjv8Otc6sDqGOls6LTr/Oc85nzlvOQA8ADwAPAA8ADz/O/87/Tv7O/g78zvtO+Q72jvMO707qjuVO307YztHOyc7BTvhOro6kDplOjg6CTraOak5eTkAPAA8ADwAPAA8/zv/O/47/Dv5O/U77zvnO9470TvDO7E7nTuGO2w7UDsxOw876zrEOps6cDpEOhU65jm2OYU5ADwAPAA8ADwAPP87/zv+O/w7+jv2O/E76jvhO9Y7yDu3O6Q7jjt0O1k7OjsZO/U6zzqnOnw6UDojOvQ5xDmUOQA8ADwAPAA8ADwAPP87/jv9O/o79zvyO+w75DvaO807vTuqO5U7fTthO0M7IzsAO9o6szqJOl46MToEOtU5pjkAPAA8ADwAPAA8ADz/O/47/Tv7O/g79DvuO+c73TvRO8I7sTucO4Q7ajtMOyw7CjvlOr86ljpsOkE6FTrnObo5ADwAPAA8ADwAPAA8/zv+O/07+zv5O/U78DvpO+A71DvGO7Y7ojuLO3E7VDs1OxM77zrJOqI6eTpQOiU6+jnOOQA82Dv2O/w7/jv+O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+O/47/jsAPCQ7oDvTO+c78Dv1O/g7+jv7O/s7+zv8O/s7+zv7O/o7+jv5O/k7+Dv3O/Y79jv1O/Q78zvyO/E78DvvO+47ADy5Oyk7bTukO8Q71jvhO+g77DvvO/A78TvxO/A78DvuO+076zvpO+c75TvjO+A73TvbO9g71TvSO887yzvIOwA88jtoOy87WjuIO6k7vzvNO9Y73DvgO+I74jviO+E73zvcO9k71jvSO847yjvFO8A7uzu2O7A7qzulO587mTsAPPw7vTtPOzc7VTt6O5c7rTu7O8Y7zDvQO9E70TvQO807yjvFO8A7uzu1O647pzugO5g7kDuIO4A7dztvO2Y7ADz+O+Q7kTtLO0E7VztzO4w7nzutO7Y7vDu/O787vju7O7Y7sTuqO6I7mjuRO4g7fjt0O2k7XjtTO0g7PDsxOwA8/zv0O8M7eztPO0o7WztwO4Q7lDugO6c7qzutO6s7qDujO5w7lDuKO4A7dTtpO107UDtCOzU7JzsYOwo7/DoAPAA8+jvfO6g7cjtWO1Q7YDtwO387izuUO5k7mzuZO5Y7kDuIO347cztnO1o7Szs8Oy07HTsMO/s66jrZOsg6ADwAPP077jvKO5g7cDtdO1w7ZTtwO3s7gzuIO4o7iTuFO347dTtqO147TztAOy87HjsMO/k65jrSOr86qzqXOgA8ADz+O/Y73zu4O487cjtlO2M7aDtwO3Y7ezt8O3o7djtuO2Q7WDtKOzo7KDsWOwI77TrYOsI6rDqWOn86aToAPAA8/zv6O+s70DusO4w7djtrO2k7aztuO3E7cTtuO2k7YTtWO0g7ODsnOxM7/jroOtE6uTqhOog6bzpWOj06ADwAPP87/DvzO+A7xDulO4s7eTtwO2w7aztrO2k7ZTtfO1U7STs7Oyk7FjsBO+o60Tq4Op46gzpoOk06MToWOgA8ADwAPP079zvqO9U7ujugO4s7fDtyO207aTtlO187VztNO0A7LzsdOwg78TrYOr06ojqFOmg6SzotOhA68jkAPAA8ADz+O/o78TvhO8w7tDudO4o7fTtzO2s7ZDtcO1M7Rzs4Oyc7Ezv8OuM6yTqsOo86cDpROjE6ETrxOdI5ADwAPAA8/zv8O/U76jvZO8Q7rjuaO4k7fDtxO2c7XTtRO0Q7NDshOws78zrZOrw6njp/Ol46PTobOvk51zm1OQA8ADwAPP87/Tv4O/A74zvRO707qTuXO4c7eTtsO2A7UjtDOzE7HTsGO+060TqzOpM6cjpPOis6CDrjOb85mzkAPAA8ADz/O/47+jv0O+o73DvKO7c7pTuTO4M7dDtlO1U7RDsxOxw7BDvpOsw6rDqKOmc6QzodOvc50TmrOYU5ADwAPAA8ADz+O/w79zvvO+Q71TvDO7E7nzuOO307bDtaO0g7MzscOwM75zrIOqc6hDpfOjk6EjrqOcI5mjlzOQA8ADwAPAA8/zv9O/k78zvqO907zju9O6s7mDuGO3Q7YTtNOzc7HzsEO+c6xzqlOoA6WjoyOgo64Dm2OY05YzkAPAA8ADwAPP87/Tv7O/Y77jvkO9Y7xju1O6M7kDt9O2g7Uzs8OyM7BzvpOsg6pDp/Olc6LjoEOtk5rTmCOVc5ADwAPAA8ADz/O/47/Dv4O/E76TvdO887vzutO5o7hjtxO1o7QjsoOws77DrKOqY6fzpWOiw6ADrUOac5ejlNOQA8ADwAPAA8/zv+O/w7+Tv0O+074zvWO8c7tjujO487eTtiO0k7LjsQO/A6zjqpOoE6VzosOv850TmjOXU5RjkAPAA8ADwAPP87/zv9O/o79jvwO+c73DvOO747rDuYO4I7ajtROzU7Fzv2OtM6rTqEOlo6LjoAOtE5oTlyOUM5ADwAPAA8ADwAPP87/jv7O/g78jvrO+E71DvFO7Q7oDuKO3I7WDs8Ox47/DrZOrI6iTpeOjE6AjrTOaI5cjlBOQA8ADwAPAA8ADz/O/47/Dv5O/Q77jvlO9k7yzu7O6g7kjt7O2E7RDslOwQ73zq5Oo86ZDo2Ogc61zmlOXQ5QjkAPAA8ADwAPAA8/zv+O/w7+jv2O/A76DveO9E7wTuvO5o7gztpO0w7LTsLO+c6wDqWOmo6PDoNOtw5qjl4OUY5ADwAPAA8ADwAPP87/jv9O/s79zvyO+s74jvWO8c7tjuhO4o7cTtUOzU7EzvvOsc6njpyOkQ6FDrjObE5fzlNOQA8ADwAPAA8ADz/O/87/Tv7O/g79DvtO+U72jvMO7w7qDuSO3k7XDs9Oxs79zrQOqY6ejpNOh067Dm6OYg5VTkAPAA8ADwAPAA8/zv/O/47/Dv5O/U77zvnO9070TvBO687mTuAO2Q7RTskO/862DqvOoM6VjonOvY5xTmTOWE5ADwAPAA8ADwAPP87/zv+O/w7+jv2O/E76jvhO9U7xju0O6A7hztsO047LDsIO+E6uDqNOmA6MjoCOtE5oDluOQA8ADwAPAA8ADwAPP87/jv8O/o79zvyO+w74zvYO8s7ujumO447dDtWOzU7ETvqOsI6lzprOj06DzrfOa85fzkAPAA8ADwAPAA8ADz/O/47/Tv7O/g78zvtO+U72zvOO747qzuUO3o7XTs8Oxk78zrLOqE6dTpJOhw67jm/OZA5ADzYO/Y7/Dv+O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/47/jv+OwA8JTuhO9M75zvwO/U7+Dv6O/s7+zv8O/w7/Dv7O/s7+zv6O/o7+Tv4O/g79zv2O/U79DvzO/I78TvwO+877jsAPLk7KTttO6U7xDvWO+E76DvsO+878TvxO/E78TvwO+877jvsO+o76DvmO+Q74TvfO9w72TvXO9Q70TvNO8o7ADzyO2k7MTtbO4o7qjvAO8471zvdO+E74zvjO+M74jvgO9472zvYO9Q70DvMO8c7wju+O7g7szuuO6g7ozudOwA8/Du+O1E7OjtXO3w7mTuuO707xzvNO9E70jvSO9E7zzvLO8c7wju9O7c7sTuqO6M7mzuUO4w7hDt7O3M7ajsAPP475TuTO047RDtZO3U7jjuhO647tzu9O8A7wTu/O7w7uDuzO6w7pTudO5U7jDuCO3g7bTtjO1g7TTtBOzY7ADz/O/Q7xDt9O1I7TjteO3M7hzuWO6I7qTutO647rTuqO6U7njuWO407gzt5O207YTtUO0c7OjssOx47EDsBOwA8ADz6O+A7qjt1O1k7VztjO3M7gjuOO5Y7mzudO5s7mDuSO4o7gTt2O2o7XTtPO0E7MTshOxE7ATvwOt86zToAPAA8/TvuO8s7mzt0O2E7YDtoO3M7fjuGO4o7jDuLO4c7gDt3O207YDtTO0M7MzsiOxA7/jrrOtc6xDqwOpw6ADwAPP479jvfO7o7kjt2O2g7ZztsO3M7eTt9O347fDt4O3A7ZjtaO0w7PTsrOxk7BTvxOtw6xjqwOpo6gzpsOgA8ADz/O/o77DvRO687jzt5O247bDtuO3E7cztzO3A7aztiO1c7Sjs6Oyk7FTsBO+s61Dq8OqQ6izpyOlk6QDoAPAA8/zv8O/M74TvFO6c7jTt8O3M7bzttO2w7aztnO2A7VztKOzw7KzsXOwI76zrTOro6oDqFOmo6TjozOhc6ADwAPAA8/Tv3O+s71ju8O6I7jTt+O3U7bztqO2Y7YDtYO007QDswOx07CDvxOtg6vjqiOoY6aTpLOi06DzrxOQA8ADwAPP47+jvxO+I7zTu1O587jDt+O3Q7bDtlO107UztHOzg7JjsSO/s64zrIOqs6jjpvOk86LzoPOu85zjkAPAA8ADz/O/w79jvqO9k7xTuvO5s7ijt9O3E7ZztcO1A7QjsyOx87CTvxOtc6ujqcOnw6Wzo5Ohc69DnROa85ADwAPAA8/zv9O/g78DvjO9I7vjuqO5c7hzt5O2s7XjtQO0A7LzsaOwM76TrNOq86jjptOko6JjoBOtw5tzmTOQA8ADwAPP87/jv6O/Q76jvbO8o7tzukO5I7gTtyO2I7UjtBOy07Fzv/OuQ6xjqmOoQ6YDo7OhU67jnHOaE5ejkAPAA8ADz/O/47/Dv3O+874zvUO8M7sDudO4s7ejtoO1Y7QzsuOxY7/DrgOsE6nzp7OlY6LzoHOt45tjmNOWQ5ADwAPAA8ADz/O/07+TvzO+k73DvMO7s7qDuVO4I7bztcO0c7MDsXO/w63jq9Opo6dTpOOiU6/DnROac5fDlROQA8ADwAPAA8/zv9O/o79TvtO+I71TvEO7I7nzuMO3c7YjtMOzQ7Gjv9Ot46vDqYOnE6SDoeOvM5xzmaOW45QTkAPAA8ADwAPP87/jv7O/c78TvoO9s7zDu7O6k7lTuAO2k7Ujs5Ox07ADvfOrw6lzpvOkU6GTrsOb85kDliOTQ5ADwAPAA8ADz/O/47/Dv5O/M77DvhO9M7wzuxO507iDtxO1k7PjsiOwM74jq+Opc6bjpDOhY66Dm5OYk5WTkqOQA8ADwAPAA8/zv/O/07+jv1O+875TvZO8s7uTumO5A7eTtgO0U7KDsIO+Y6wTqZOm86QzoVOuY5tTmEOVM5IjkAPAA8ADwAPAA8/zv9O/s79zvxO+k73jvRO8A7rTuYO4E7ZztMOy47DTvqOsQ6nDpxOkQ6FTrlObM5gTlPOR05ADwAPAA8ADwAPP87/jv8O/g78zvsO+I71jvHO7U7oDuJO287Uzs0OxM78DrJOqA6dTpHOhc65jm0OYE5TTkaOQA8ADwAPAA8ADz/O/47/Dv5O/U77jvmO9o7zDu7O6c7kDt3O1o7OzsaO/U6zzqlOnk6SzobOuk5tjmCOU45GjkAPAA8ADwAPAA8/zv+O/07+jv2O/A76TveO9E7wTuuO5c7fjtiO0M7ITv8OtU6qzp+OlA6HzrtObk5hTlRORw5ADwAPAA8ADwAPP87/jv9O/s79zvyO+s74jvVO8Y7tDueO4U7aTtKOyg7AzvbOrE6hDpVOiQ68jm/OYo5VjkhOQA8ADwAPAA8ADz/O/87/Tv7O/g78zvtO+Q72TvLO7k7pTuMO3E7UjsvOwo74jq4Oos6XDorOvk5xTmROV05KDkAPAA8ADwAPAA8/zv/O/47/Dv5O/U77zvnO9w7zzu/O6s7kzt4O1k7NzsSO+o6vzqSOmM6MjoBOs05mjlmOTI5ADwAPAA8ADwAPP87/zv+O/w7+Tv2O/A76TvfO9M7wzuwO5k7fzthOz87GjvyOsc6mjprOjs6CTrXOaQ5cTk+OQA8ADwAPAA8ADz/O/87/jv8O/o79jvxO+s74jvWO8c7tTufO4U7aDtGOyE7+TrPOqI6czpEOhM64jmwOX85TTkAPNg79jv8O/47/jv/O/87/zv/O/87ADwAPP87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+O/47ADwlO6E71DvnO/A79Tv4O/o7+zv7O/w7/Dv8O/w7+zv7O/o7+jv5O/k7+Dv3O/Y79jv1O/Q78zvyO/E78DvvOwA8uTsqO247pjvFO9c74jvpO+077zvxO/I78jvxO/E78DvuO+076zvpO+c75TvjO+A73jvbO9g71TvSO887zDsAPPI7ajsyO107izusO8E7zzvYO9474TvjO+Q75DvjO+E73zvcO9k71TvSO807yTvFO8A7uzu2O7A7qzumO6A7ADz8O787Uzs8O1o7fjubO7A7vjvIO8470jvUO9Q70jvQO807yTvEO787uTuzO607pjueO5c7jzuHO387dztvOwA8/zvlO5U7UTtHO107eDuQO6M7sDu5O787wjvCO8E7vju6O7U7rzuoO6A7lzuPO4U7eztxO2c7XDtRO0Y7OzsAPP879DvGO4A7VjtSO2I7dzuKO5k7pDurO687sDuvO6w7pzugO5k7kDuGO3w7cDtkO1g7Szs+OzA7IjsUOwY7ADwAPPo74TutO3k7XjtcO2c7dzuFO5E7mDudO547nTuaO5Q7jDuDO3k7bTtgO1M7RDs1OyU7FTsFO/Q64zrSOgA8ADz9O+87zTueO3g7ZjtlO2w7dzuBO4g7jTuOO407iTuCO3k7bztjO1U7Rjs2OyU7EzsBO+462zrHOrQ6oDoAPAA8/jv2O+E7vDuWO3o7bTtrO3A7djt8O387gDt+O3k7cjtoO1w7Tjs/Oy47GzsIO/Q63zrJOrM6nTqGOm86ADwAPP87+jvsO9M7sTuSO307cjtwO3E7czt1O3Q7cTtsO2M7WDtLOzw7KjsXOwI77TrWOr46pjqNOnQ6WzpBOgA8ADz/O/w78zviO8c7qjuRO4A7djtyO3A7bjtsO2g7YTtXO0s7PDsrOxg7AjvsOtQ6ujqgOoU6ajpOOjI6FjoAPAA8ADz+O/g76zvXO747pDuQO4E7dztxO2w7ZzthO1g7TTs/Oy87HDsHO/A61zq9OqE6hTpnOkk6KzoNOu45ADwAPAA8/jv6O/I74zvOO7Y7oDuOO4A7dTttO2U7XDtSO0U7NjslOxA7+TrgOsU6qTqLOmw6TDosOgs66jnJOQA8ADwAPP87/Dv2O+s72jvFO7A7nDuLO307cTtmO1s7TjtAOy87HDsGO+460zq2Opc6dzpWOjQ6ETruOco5pzkAPAA8ADz/O/07+DvwO+M70ju+O6o7lzuGO3c7ajtcO007PTsrOxY7/jrkOsc6qTqIOmY6QjoeOvk50zmtOYg5ADwAPAA8/zv+O/o79DvqO9s7yTu2O6M7kDt/O287XztOOzw7KDsRO/g63Dq+Op46ezpXOjE6CjrjObs5lDlsOQA8ADwAPP87/jv8O/c77jvjO9M7wTuuO5s7iDt2O2Q7UTs9Oyc7Dzv0Otc6tzqVOnA6SjoiOvo50DmmOXw5UzkAPAA8ADwAPP87/Tv5O/I76DvbO8s7uDulO5E7fjtqO1U7PzsoOw478jrTOrI6jjpoOkA6FjrrOcA5lDloOT05ADwAPAA8ADz/O/07+jv1O+074TvTO8I7rzubO4Y7cTtaO0M7KjsPO/E60TquOog6YTo3Ogw63zmyOYQ5VjkpOQA8ADwAPAA8/zv+O/s79zvwO+Y72TvJO7c7ozuOO3g7YTtIOy07ETvyOtA6rDqFOlw6MToEOtU5pjl3OUc5GDkAPAA8ADwAPP87/jv8O/g78zvqO9870Du/O6w7lzuAO2c7TTsyOxQ78zrQOqs6gzpYOiw6/TnOOZ05bDk7OQo5ADwAPAA8ADz/O/47/Tv6O/U77TvjO9Y7xju0O587hztvO1Q7NzsYO/Y60jqrOoI6VjooOvk5yDmWOWM5MDn+OAA8ADwAPAA8/zv/O/07+jv2O/A75zvbO8w7uzumO487djtaOz07HDv6OtU6rTqDOlY6Jzr2OcQ5kDlcOSg59TgAPAA8ADwAPAA8/zv9O/s79zvyO+o73zvSO8E7rTuXO307YTtDOyI7/jrYOq86hDpWOiY69DnBOY05WDkjOe44ADwAPAA8ADwAPP87/jv8O/g79DvtO+M71jvHO7Q7njuEO2g7SjsoOwQ73DqzOoc6WDonOvQ5wDmLOVU5HznpOAA8ADwAPAA8ADz/O/47/Dv5O/U77zvmO9o7zDu6O6Q7jDtwO1A7LjsJO+E6tzqKOlo6KTr1OcA5izlUOR455zgAPAA8ADwAPAA8/zv+O/07+jv2O/A76DveO9A7vzurO5I7dztYOzU7EDvnOrw6jjpeOiw6+DnCOYw5VTkeOec4ADwAPAA8ADwAPP87/jv9O/s79zvyO+s74TvUO8Q7sDuZO347Xzs8OxY77TrBOpM6YjovOvs5xTmPOVg5ITnqOAA8ADwAPAA8ADz/O/87/Tv7O/g78zvsO+M72DvIO7Y7nzuEO2Y7QzsdO/Q6xzqYOmc6NDr/Oco5kzldOSY57zgAPAA8ADwAPAA8/zv/O/07+zv4O/Q77jvmO9s7zDu7O6U7izttO0s7JTv7Os46nzptOjo6BTrQOZk5YzktOfg4ADwAPAA8ADwAPP87/zv+O/w7+Tv1O+876DvdO9A7vzuqO5E7dDtSOyw7AzvWOqY6dDpAOgw61zmhOWw5NzkDOQA82Dv2O/w7/jv+O/87/zv/O/87ADwAPAA8ADz/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/47/jsAPCU7oTvUO+c78Tv1O/g7+jv7O/w7/Dv8O/w7/Dv7O/s7+zv6O/o7+Tv4O/g79zv2O/U79Dv0O/M78jvxO/A7ADy6Oyw7bzunO8Y72DvjO+k77TvwO/E78jvyO/I78TvwO+877jvsO+o76DvmO+Q74TvfO9w72jvXO9Q70TvOOwA88jtsOzU7YDuNO607wjvQO9k73zviO+Q75TvlO+Q74jvgO9072jvXO9M7zzvLO8Y7wju9O7g7szuuO6g7ozsAPPw7wDtWO0A7XjuBO547sjvAO8o70DvTO9U71TvUO9E7zjvKO8Y7wTu7O7U7rzuoO6E7mjuSO4o7gjt6O3I7ADz/O+Y7lztWO0w7YTt8O5Q7pjuzO7s7wDvDO8Q7wju/O7s7tjuwO6o7ojuaO5E7iDt+O3Q7ajtgO1U7Sjs/OwA8/zv0O8c7hDtcO1g7Zzt7O447nDunO607sTuyO7A7rTuoO6I7mzuSO4g7fjtzO2c7WztOO0E7NDsmOxg7CjsAPAA8+jviO7A7fjtkO2I7bTt7O4k7lDubO587oDufO5s7lTuOO4U7eztvO2M7VTtHOzg7KTsZOwg7+DrnOtY6ADwAPP078DvPO6I7fTtsO2o7cTt7O4Q7izuPO5A7jjuKO4Q7eztwO2Q7VztIOzg7JzsWOwQ78TreOso6tjqiOgA8ADz+O/c74ju/O5o7gDtzO3E7dDt6O387gjuCO4A7ejtzO2k7XTtPO0A7LzsdOwk79TrgOss6tTqeOoc6cToAPAA8/zv6O+071Du0O5c7gjt3O3Q7dTt2O3c7djtzO207ZDtZO0s7PDsqOxc7AzvtOtY6vzqmOo06dDpbOkE6ADwAPP87/Dv0O+M7yTutO5Q7gzt6O3U7cjtwO207aDthO1c7Sjs7Oyo7FzsCO+s60zq5Op86hDppOk06MDoUOgA8ADwAPP47+DvsO9g7wDunO5I7gzt5O3M7bTtnO2A7VztMOz47LTsaOwU77jrVOrs6nzqCOmQ6RjonOgg66TkAPAA8ADz+O/o78jvjO887uDuiO487gTt2O207ZTtbO1A7Qzs0OyE7DTv2Ot06wTqlOoY6ZzpHOiY6BTrjOcI5ADwAPAA8/zv8O/Y76zvaO8Y7sDucO4s7fDtwO2Q7WTtMOz07KzsXOwE76DrNOrA6kTpwOk46LDoIOuU5wTmdOQA8ADwAPP87/Tv4O/A74zvRO707qTuWO4U7dTtnO1g7STs4OyU7Dzv3Ot06wDqgOn86XDo4OhM67TnHOaE5ezkAPAA8ADz/O/47+jv0O+k72jvIO7U7oTuOO3w7aztaO0g7NjshOwk78DrTOrQ6kzpwOks6JDr9OdU5rDmEOVs5ADwAPAA8/zv+O/w79jvuO+I70ju/O6s7lzuEO3E7XTtKOzU7HjsFO+k6yzqrOog6Yjo7OhM66Tm/OZQ5aTk/OQA8ADwAPAA8/zv8O/g78TvnO9k7yDu1O6E7jDt3O2I7TDs2Ox07AjvlOsU6ozp+Olc6LjoDOtg5qzl+OVE5JTkAPAA8ADwAPP87/Tv6O/Q76zvfO9A7vjuqO5Q7fjtoO1A7ODsdOwE74jrBOpw6djpNOiI69jnIOZo5azk8OQ05ADwAPAA8ADz/O/47+zv2O+875DvWO8Y7sjudO4Y7bjtVOzs7HzsBO+A6vTqYOnA6RToZOuo5uzmKOVo5KTn4OAA8ADwAPAA8/zv+O/w7+DvxO+g73DvMO7o7pTuOO3U7Wzs/OyI7AjvgOrw6lDprOj86EDrhOa85fTlLORg55jgAPAA8ADwAPP87/jv8O/k78zvsO+E70jvBO6w7ljt9O2I7RTsmOwU74Tq7OpI6Zzo6Ogo62DmmOXI5PjkKOdY4ADwAPAA8ADz/O/87/Tv6O/U77jvkO9c7xzu0O507hDtoO0o7KjsIO+M6uzqROmU6NjoFOtI5njlpOTM5/TjIOAA8ADwAPAA8/zv/O/07+zv3O/A76DvcO807ujukO4s7bztROzA7DDvmOr06kTpkOjM6ATrNOZc5YTkqOfM4vTgAPAA8ADwAPAA8/zv+O/s7+DvyO+o73zvRO8A7qzuSO3Y7WDs2OxE76jq/OpM6YzoyOv45yTmSOVs5IznrOLQ4ADwAPAA8ADwAPP87/jv8O/k79DvsO+M71jvFO7E7mTt+O147PDsXO+46wzqVOmQ6MTr9OcY5jzlWOR455TitOAA8ADwAPAA8ADz/O/47/Dv5O/U77jvlO9k7yju3O6A7hDtmO0M7HTvzOsc6mDpmOjI6/DnFOY05VDkaOeE4qDgAPAA8ADwAPAA8/zv+O/07+jv2O/A76DvdO847vDumO4s7bTtKOyM7+TrMOpw6aTo0Ov05xTmMOVI5GDnfOKY4ADwAPAA8ADwAPP87/jv9O/o79zvxO+o73zvSO8E7qzuSO3Q7UTsqOwA70jqgOm06Nzr/OcY5jTlTORk53zinOAA8ADwAPAA8ADz/O/47/Tv7O/c78jvrO+I71TvFO7E7mDt7O1k7MjsHO9g6pjpyOjs6AjrJOY85VTkbOeI4qjgAPAA8ADwAPAA8/zv/O/07+zv4O/M77TvkO9g7yTu2O547gTtgOzo7DzvgOq06eDpAOgc6zTmTOVo5ITnpOLI4ADzYO/Y7/Dv+O/87/zv/O/87/zsAPAA8ADwAPP87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jv+OwA8JjuiO9U76DvxO/Y7+Dv6O/s7/Dv8O/w7/Dv8O/w7+zv7O/o7+jv5O/k7+Dv3O/Y79jv1O/Q78zvyO/E78DsAPLo7LTtxO6k7xzvZO+Q76jvuO/E78jvzO/M78jvyO/E78DvuO+w76zvpO+c75TviO+A73TvbO9g71TvTO9A7ADzyO247OTtjO5E7sDvFO9I72jvgO+M75TvmO+U75DvjO+E73jvbO9g71DvQO8w7yDvDO787uju1O7A7qzulOwA8/DvBO1s7RjtjO4Y7oTu1O8M7zDvRO9U71jvWO9U70jvPO8s7xzvCO707tzuxO6o7ozucO5U7jTuFO307dTsAPP875zubO1w7UztoO4I7mDupO7U7vjvCO8U7xTvDO8E7vTu4O7I7qzukO5w7kzuKO4E7dzttO2I7WDtNO0I7ADz/O/U7yjuKO2M7XztuO4E7kjugO6o7sDuzO7M7sjuuO6o7ozucO5M7ijuAO3U7aTtdO1E7RDs3Oyk7GzsNOwA8ADz7O+Q7tDuEO2w7ajt0O4E7jjuXO547ojuiO6A7nDuXO487hjt8O3A7ZDtXO0k7OjsrOxs7Cjv6Ouk62DoAPAA8/TvwO9E7pzuEO3M7cjt4O4A7iDuOO5I7kjuQO4s7hDt8O3E7ZTtYO0k7OTspOxc7BTvyOt86yzq4OqM6ADwAPP479zvjO8M7oDuGO3k7dzt5O347gjuEO4M7gTt7O3M7aTtdO087QDsvOx07CTv1OuA6yzq1Op46hzpwOgA8ADz/O/s77jvXO7g7mzuHO307eTt4O3k7eTt3O3M7bTtjO1g7Sjs7Oyk7FjsCO+w61Tq9OqU6jDpzOlk6PzoAPAA8/zv9O/Q75DvLO7A7mDuHO307eDt0O3E7bjtoO2A7VTtJOzk7KDsUO/866DrQOrc6nDqBOmU6STosOhA6ADwAPAA8/jv4O+w72TvBO6k7lTuFO3s7czttO2c7XztVO0k7OzsqOxc7ATvqOtE6tjqaOn06XzpAOiE6AjriOQA8ADwAPP47+jvyO+Q7zzu5O6M7kDuBO3Y7bDtjO1g7TTs/Oy87HDsHO/A61jq7Op46fzpgOj86Hjr8Odo5uDkAPAA8ADz/O/w79jvrO9o7xjuwO5s7ijt7O207YTtUO0c7NzslOxE7+jrgOsU6pzqIOmc6RDohOv052Tm0OZA5ADwAPAA8/zv9O/g78DviO9A7vDunO5M7gTtxO2I7UjtCOzE7HTsHO+460zq1OpU6czpQOis6BjrfObg5kTlqOQA8ADwAPP87/jv6O/M76DvZO8Y7sjudO4k7djtkO1I7QDssOxY7/jrkOsc6pzqFOmE6PDoVOuw5xDmaOXE5RzkAPAA8ADz/O/47+zv2O+074DvPO7w7pzuSO307aTtUOz87KTsSO/g62zq8Ops6dzpROik6ADrVOao5fjlSOSc5ADwAPAA8ADz/O/w7+DvwO+U71zvEO7A7mjuEO247WDtBOyg7DzvzOtQ6szqQOmo6QjoYOu05wDmTOWU5NzkJOQA8ADwAPAA8/zv9O/k78zvqO907zDu4O6M7jDt0O1w7QzspOw077zrPOqw6hzpfOjU6CTrcOa05fTlNOR057TgAPAA8ADwAPP87/Tv6O/U77TviO9M7wDurO5Q7eztiO0c7KzsNO+06yzqmOn86VjoqOvw5zDmcOWo5ODkGOdQ4ADwAPAA8ADz/O/47+zv3O/A75jvYO8c7szucO4M7aDtMOy47DjvsOsg6ojp5Ok46IDrwOb85jDlZOSU58Ti9OAA8ADwAPAA8/zv+O/w7+DvyO+k73TvNO7o7ozuKO287UTsyOxE77TrHOp86dDpHOhc65jmzOX45STkTOd44qTgAPAA8ADwAPP87/jv8O/k79DvsO+E70zvAO6s7kjt2O1g7NzsUO+86xzqdOnE6QjoQOt05qDlyOTs5BDnNOJY4ADwAPAA8ADz/O/87/Tv6O/U77jvlO9c7xjuxO5k7fTteOz07GTvyOsg6nTpuOj46CzrWOZ85aDkvOfc4vjiGOAA8ADwAPAA8/zv/O/07+zv3O/A75zvbO8s7uDugO4U7ZjtDOx479jrLOp06bTo7OgY60DmYOV45JTnrOLE4eDgAPAA8ADwAPAA8/zv9O/s79zvyO+o73zvQO707pzuMO207SjskO/s6zjqfOm06OToDOss5kTlXORw54TimOGw4ADwAPAA8ADwAPP87/jv8O/g78zvsO+I71DvDO607kzt0O1E7KzsAO9M6ojpuOjg6ADrHOYw5UDkUOdk4nThjOAA8ADwAPAA8ADz/O/47/Dv5O/Q77jvkO9g7xzuzO5k7eztZOzI7BzvYOqY6cTo5Ov85xDmIOUw5DznSOJY4WzgAPAA8ADwAPAA8/zv+O/w7+jv1O+875zvbO8s7uDufO4I7YDs5Ow473jqrOnQ6OzoAOsM5hjlIOQs5zTiROFc4ADwAPAA8ADwAPP87/jv9O/o79jvwO+g73jvPO707pTuJO2g7QTsVO+U6sTp5Oj46AjrEOYU5RzkIOcs4jzhVOAA8ADwAPAA8ADz/O/47/Tv6O/c78jvqO+A70zvBO6s7kDtvO0k7HjvtOrg6fzpDOgU6xjmHOUg5CTnMOJE4WDgAPNg79jv8O/47/zv/O/87/zsAPAA8ADwAPAA8ADz/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+O/47ADwnO6M71TvpO/E79jv5O/o7+zv8O/w7/Dv8O/w7/Dv7O/s7+zv6O/k7+Tv4O/g79zv2O/U79Dv0O/M78jvxOwA8uzsxO3U7qzvKO9s75TvrO+878TvyO/M78zvzO/I78TvwO+877TvrO+k75zvlO+M74TveO9w72TvXO9Q70TsAPPM7cjs/O2k7lTu0O8c71DvcO+E75DvmO+Y75jvlO+M74TvfO9w72TvVO9E7zTvJO8U7wDu8O7c7sjusO6c7ADz8O8Q7YjtOO2s7jDumO7k7xjvOO9M71jvXO9c71TvTO9A7zDvIO8M7vju4O7I7rDulO547lzuPO4c7fzt3OwA8/zvoO6E7ZTtdO3E7iTueO647uTvAO8Q7xjvGO8Q7wju9O7g7szusO6U7nTuVO4w7gjt5O287ZDtaO087RDsAPP879jvOO5I7bTtqO3c7iTuYO6Q7rTuyO7U7tTuzO687qjukO507lDuLO4E7djtrO187UjtFOzg7KzsdOw87ADwAPPs75ju5O407djtzO3w7iDuTO5s7oTujO6M7oTudO5c7jzuGO3w7cTtkO1c7STs7Oys7HDsLO/s66jrZOgA8ADz9O/I71TutO407fDt6O387hjuNO5E7kzuTO5A7izuEO3s7cDtkO1c7SDs5Oyg7FzsFO/I63zrLOrc6ozoAPAA8/jv4O+U7xzulO407gDt9O347gjuEO4U7hDuAO3o7cjtoO1s7Tjs+Oy07GzsIO/Q63zrJOrM6nDqFOm46ADwAPP87+zvvO9k7vDugO4w7gTt9O3s7ezt6O3c7cjtrO2E7VTtHOzg7JjsTO/466TrSOro6oTqIOm86VTo6OgA8ADz/O/079TvlO807sjubO4o7fzt5O3U7cTtsO2U7XTtSO0Q7NTsjOw87+jrjOss6sTqXOns6XzpDOiY6CDoAPAA8ADz+O/g77TvaO8I7qjuVO4Y7ejtyO2s7YztbO1A7RDs1OyQ7EDv6OuM6yTquOpI6dTpXOjg6GDr4Odg5ADwAPAA8/jv6O/I74zvPO7g7oTuOO387cjtoO107UztGOzg7JzsUO/465zrNOrE6lDp1OlU6NDoSOvA5zTmrOQA8ADwAPP87/Dv1O+o72TvEO607mDuFO3U7ZztaO0w7PjstOxs7BjvuOtU6uTqaOns6WTo3OhM67znKOaQ5fzkAPAA8ADz/O/07+DvvO+E7zju4O6I7jTt6O2k7WTtIOzc7JTsQO/k64DrEOqY6hjpjOkA6Gjr0Oc05pjl+OVY5ADwAPAA8/zv+O/o78jvnO9Y7wjusO5Y7gTttO1k7RjszOx47BzvuOtM6tTqVOnI6TjooOgA61zmuOYQ5WTkvOQA8ADwAPP87/jv7O/U76zvdO8s7tjufO4g7cjtcO0Y7MDsZOwA75TrIOqg6hTphOjo6ETrnObw5kDlkOTc5CjkAPAA8ADwAPP47/Dv3O+874zvTO787qDuRO3g7YDtIOzA7Fjv7Ot46vjqcOng6UTooOv050TmjOXU5RjkXOeg4ADwAPAA8ADz/O/07+TvyO+c72TvGO7E7mTuAO2Y7TDsxOxU79zrYOrY6kjprOkI6FzrqObw5jDlbOSo5+TjIOAA8ADwAPAA8/zv9O/o79DvrO947zTu5O6E7iDttO1A7MzsVO/U60zqwOok6YTo1Ogg62TmoOXY5QzkQOd04qjgAPAA8ADwAPP87/jv7O/Y77jvjO9M7wDupO5A7dDtWOzc7Fzv1OtE6qzqCOlc6Kjr7Ock5ljliOS45+DjDOI84ADwAPAA8ADz/O/47+zv3O/A75jvYO8c7sTuYO3w7XTs9Oxo79jrQOqc6fTpQOiA67zm7OYY5UDkZOeI4rDh1OAA8ADwAPAA8/zv+O/w7+DvyO+k73TvMO7g7nzuDO2Q7QzsfO/k60DqlOng6SToYOuQ5rzl4OUA5BznOOJY4XjgAPAA8ADwAPP87/jv8O/k79DvsO+E70ju+O6c7iztsO0o7JDv8OtI6pTp2OkQ6ETrbOaM5ajkxOfY4vDiCOEk4ADwAPAA8ADz/O/87/Tv6O/U77jvkO9Y7xDuuO5M7dDtROys7ATvVOqY6dTpBOgs60zmZOV85IznnOKs4cDg2OAA8ADwAPAA8/zv/O/07+jv2O/A75zvaO8k7tDuaO3w7WTsyOwc72TqpOnU6PzoGOsw5kTlUORc52TicOGA4JTgAPAA8ADwAPAA8/zv9O/s79zvxO+k73TvOO7o7oTuDO2E7OjsOO986rDp2Oj46BDrHOYo5SzkMOc04jzhSOBU4ADwAPAA8ADwAPP87/jv7O/g78zvrO+A70ju/O6c7iztpO0I7FjvlOrE6eTo/OgI6xDmEOUM5AznDOIM4RTgJOAA8ADwAPAA8ADz/O/47/Dv5O/Q77TvjO9U7xDutO5E7cDtKOx477Dq3On46QToCOsE5gDk9Ofs4ujh6ODs4/DcAPAA8ADwAPAA8/zv+O/w7+Tv1O+475TvYO8g7szuYO3g7UjsmO/Q6vjqDOkU6BDrBOX05OTn1OLM4cjgzOOw3ADwAPAA8ADwAPP87/jv8O/o79TvvO+c72zvMO7g7njt/O1o7Lzv9OsY6izpLOgg6wzl9OTg58zivOG44LzjmNwA82Dv2O/w7/jv/O/87/zv/OwA8ADwAPAA8ADwAPP87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/jv+O/47/jsAPCg7pDvXO+o78jv3O/k7+zv8O/w7/Dv8O/w7/Dv8O/w7+zv7O/o7+jv5O/g7+Dv3O/Y79jv1O/Q78zvyO/E7ADy9Ozc7ejuwO8073TvnO+w78DvyO/M78zvzO/M78jvxO/A77zvtO+w76jvoO+Y75DvhO9873TvaO9c71TvSOwA88zt5O0k7cjudO7k7yzvXO9474zvlO+c75zvmO+U75DviO9873DvZO9Y70jvOO8o7xjvBO707uDuzO647qTsAPP07yTtuO1w7dzuVO607vjvJO9A71TvXO9g71zvWO9M70DvNO8g7wzu+O7k7szusO6Y7nzuYO5A7iTuBO3k7ADz/O+o7qjtzO2w7fTuTO6U7szu9O8M7xjvHO8c7xTvCO707uDuzO6w7pTudO5U7jDuDO3k7bztlO1s7UDtFOwA8/zv3O9M7nTt8O3c7gzuRO587qTuwO7Q7tju1O7M7rzuqO6M7nDuTO4o7gDt2O2o7XjtSO0U7ODsrOx07DzsAPAA8/DvoO8A7mDuCO387hTuPO5g7njuiO6Q7ozugO5w7lTuOO4U7ejtvO2M7VjtIOzk7KjsaOwo7+jrpOtg6ADwAPP478zvYO7Q7lTuGO4I7hTuKO487kjuTO5I7jjuJO4E7eDtuO2E7VDtFOzY7JTsUOwI77zrcOsg6tDqgOgA8ADz/O/g75zvKO6s7kzuGO4E7gTuDO4Q7hDuBO307djtuO2M7VztJOzk7KDsWOwM77zraOsQ6rjqXOoA6aToAPAA8/zv7O+872ju9O6I7jzuDO307ejt4O3Y7cjttO2U7WztPO0E7MTsfOww79zriOss6szqaOoE6ZzpNOjI6ADwAPP87/Tv1O+U7zTuyO5o7iTt9O3U7cDtrO2U7XjtVO0k7PDssOxo7BjvxOto6wTqoOo06cTpVOjg6Gzr9OQA8ADwAPP47+DvsO9k7wDunO5E7gDt0O2s7YjtaO1E7Rjs5Oyo7GDsEO+461jq9OqI6hjpoOko6KzoLOus5yjkAPAA8ADz+O/o78TvhO8w7szubO4c7djtoO107UjtGOzk7KjsZOwU78DrYOr46ojqEOmU6RTokOgI63zm8OZk5ADwAPAA8/zv8O/U76DvWO787pjuPO3s7aTtaO0s7PTsuOx07Cjv0Otw6wjqmOog6aDpGOiM6/znaObU5jzlpOQA8ADwAPP87/Tv3O+073TvJO7E7mDuBO2w7WTtIOzY7JDsRO/w65DrLOq46kDpvOk06KToDOtw5tTmNOWQ5PDkAPAA8ADz/O/07+TvxO+Q70Tu7O6I7iTtyO1w7RzsyOx47CDvwOtY6ujqcOns6WDozOg065Dm7OZE5Zjk7ORA5ADwAPAA8/zv+O/o79DvpO9k7xDusO5M7eTtgO0g7MTsZOwA75jrKOqw6izpoOkM6HDryOcg5nDlvOUI5FTnnOAA8ADwAPP87/jv7O/Y77TvfO8w7tTucO4E7ZjtMOzE7Fjv7Ot46wDqfOnw6VzovOgU62jmtOX45TzkgOfA4wDgAPAA8ADwAPP47/Dv3O/A75DvTO747pTuKO247UTs0OxY7+DrZOrc6lDpvOkc6HTrxOcM5kzljOTE5/zjNOJw4ADwAPAA8ADz/O/07+TvyO+g72TvGO647kzt2O1g7ODsYO/c61TqxOos6Yzo5Ogw63jmtOXs5SDkVOeE4rTh5OAA8ADwAPAA8/zv9O/o79DvrO947zDu2O5w7fztfOz47HDv4OtM6rDqEOlk6LDr9Ocw5mTllOTA5+jjEOI44WDgAPAA8ADwAPP87/jv7O/Y77jviO9I7vjulO4g7aDtGOyE7+zrTOqo6fzpROiI68Dm8OYc5UTkZOeE4qThxODo4ADwAPAA8ADz/O/47+zv3O/A75jvXO8Q7rTuRO3E7TjsoOwA71TqpOns6SzoZOuQ5rjl2OT45BDnKOJA4VjgdOAA8ADwAPAA8/zv+O/w7+DvyO+k73DvKO7Q7mTt6O1Y7LzsGO9k6qjp5OkY6ETraOaE5ZzksOfA4tDh4OD04AzgAPAA8ADwAPP87/jv8O/k78zvrO987zzu7O6E7gjtfOzg7DTveOq06ejpEOgw60jmWOVo5HDneOKA4YjgmONQ3ADwAPAA8ADz/O/47/Tv6O/U77TvjO9Q7wTuoO4s7aDtAOxU75TqyOns6QzoIOss5jTlNOQ05zTiNOE44EDinNwA8ADwAPAA8/zv/O/07+jv2O+875TvYO8Y7rzuTO3E7STsdO+w6tzp/OkM6BjrGOYU5QzkAOb44fDg7OPg3fTcAPAA8ADwAPP87/zv9O/s79zvxO+g72zvLO7U7mjt5O1I7Jjv0Or46hDpGOgU6wzl/OTo59TiwOG04KjjUN1g3ADwAPAA8ADwAPP87/Tv7O/c78jvqO947zzu6O6E7gTtbOy87/TrGOoo6SjoGOsE5ejkyOes4pDhfOBs4tDc2NwA8ADwAPAA8ADz/O/47+zv4O/M76zvhO9I7vzunO4k7ZDs4OwY7zjqROk86CTrBOXc5LTnjOJo4UzgOOJg3GjcAPAA8ADwAPAA8/zv+O/w7+Tv0O+074zvWO8Q7rTuQO2w7QjsQO9g6mjpWOg86xDl3OSo53jiTOEo4BDiENwY3ADzZO/c7/Dv+O/87/zv/O/87ADwAPAA8ADwAPAA8/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv+O/47/jv+OwA8LjupO9o77Dv0O/g7+jv7O/w7/Dv8O/w7/Dv8O/w7/Dv7O/s7+jv6O/k7+Dv4O/c79jv2O/U79DvzO/I78jsAPMI7RjuHO7k70zvhO+k77jvxO/I78zv0O/M78zvyO/E78DvvO+077DvqO+g75jvkO+I73zvdO9o72DvVO9I7ADz1O4o7YTuFO6o7wjvRO9s74DvkO+Y75zvnO+Y75TvjO+E73zvcO9k71TvSO847yjvGO8E7vTu4O7M7rjupOwA8/TvRO4U7dTuKO6M7tjvEO8w70jvVO9c71zvWO9U70jvPO8s7xzvCO707uDuyO6w7pTueO5c7kDuIO4E7eTsAPP877ju4O4k7gTuOO547rDu3O747wzvFO8U7xTvCO787uzu2O7A7qjujO5s7kzuKO4E7eDtuO2Q7WTtPO0Q7ADwAPPg72TuqO4w7hjuNO5g7ojuqO687sjuyO7E7rzurO6Y7nzuYO5A7hzt9O3I7ZztbO087Qzs1Oyg7GjsMOwA8ADz8O+o7xjuhO4s7hjuJO5A7ljubO547nzudO5o7ljuPO4g7fzt1O2k7XTtQO0M7NDslOxY7BTv1OuQ60zoAPAA8/jvzO9k7tjuYO4c7gTuCO4U7iTuLO4s7iTuGO4A7eTtwO2U7WTtMOz07LjseOw07+zroOtU6wTqtOpg6ADwAPP47+DvmO8g7pzuOO387eTt4O3g7eTt4O3U7cTtqO2I7VztLOz07LjseOww7+TrlOtA6ujqkOo06djpeOgA8ADz/O/s77jvWO7c7mjuEO3Y7bztrO2k7ZjtiO107VTtLO0A7MjsiOxE7/jrqOtQ6vTqlOo06dDpaOj86JToAPAA8/zv8O/M74TvGO6c7jDt4O2s7YjtcO1c7UTtKO0E7NjsoOxk7Bzv0Ot86yDqwOpY6fDpgOkQ6JzoKOuw5ADwAPP87/Tv3O+k70ju1O5g7fztrO107UztKO0I7OTsuOyE7EjsBO+462DrBOqc6jTpxOlM6NToWOvY51Tm1OQA8ADwAPP47+TvuO9w7wjukO4g7cDtdO047QTs2Oyo7HTsOO/066jrVOr06pDqIOms6TDosOgo66DnGOaI5fzkAPAA8ADz+O/s78jvjO807sTuUO3g7YDtNOzw7LDsdOw47/TrqOtU6vTqkOog6ajpKOig6BTrhOb05lzlxOUs5ADwAPAA8/zv8O/U76TvWO707oDuDO2c7Tzs6Oyc7FDsCO+462TrBOqg6jDptOk06KjoGOuE5ujmSOWo5QjkZOQA8ADwAPP87/Tv3O+073jvHO6w7jjtxO1U7PDskOw47+DriOso6sDqUOnU6VDoxOgw65jm+OZQ5ajk/ORQ56TgAPAA8ADz/O/07+TvxO+Q70Du3O5o7fDtdO0E7JTsLO/I62Dq9OqA6gTpgOj06GDrwOcc5nDlwOUM5FjnoOLo4ADwAPAA8/zv+O/o79DvoO9g7wTumO4c7aDtIOyk7DDvuOtE6szqTOnE6TjooOgA61TmqOXw5TjkeOe44vjiOOAA8ADwAPP87/jv7O/Y77DveO8o7sDuTO3M7UTswOw877jrNOqs6iDpkOj06FDrpObw5jjleOS05+zjJOJc4ZTgAPAA8ADwAPP47/Dv3O+874zvRO7o7njt+O1w7ODsUO/A6zDqmOoA6WDouOgM61TmlOXQ5QTkOOdo4pThxOD04ADwAPAA8ADz/O/07+TvyO+c71zvCO6g7iTtnO0I7HDv1Os06pDp6Ok86IjrzOcI5kDlcOSc58Ti6OIM4TTgXOAA8ADwAPAA8/zv9O/o79DvqO907yjuxO5Q7cjtNOyU7/DrROqU6dzpIOhg65jmyOXw5RTkOOdU4nDhjOCs45jcAPAA8ADwAPP87/Tv6O/U77TvhO9A7ujueO307WDsvOwQ71jqnOnY6RDoQOto5ozlrOTE59ji7OIA4RTgKOKI3ADwAPAA8ADz/O/47+zv3O+875TvVO8E7pzuHO2M7OjsNO946rDp4OkI6CjrROZc5WzkeOeA4ozhlOCg41zdiNwA8ADwAPAA8/zv+O/w7+DvxO+g72jvHO687kTttO0U7GDvnOrI6ezpCOgc6yjmMOU05DTnMOIw4TDgNOJ43JTcAPAA8ADwAPP87/jv8O/g78zvqO947zDu2O5o7dztQOyI78Dq6OoE6RDoGOsU5gzlBOf04ujh3ODQ45jdnN+02ADwAPAA8ADz/O/47/Dv5O/Q77DvhO9E7vDuiO4E7WjstO/o6wzqHOkg6BjrCOX05NjnvOKk4YzgeOLc3NTe3NgA8ADwAPAA8/zv+O/07+jv1O+475DvVO8I7qTuKO2Q7ODsFO806jzpOOgk6wTl4OS455DiaOFE4CjiKNwU3hjYAPAA8ADwAPP87/zv9O/o79jvvO+Y72TvHO687kjttO0I7EDvXOpg6VToNOsI5dTknOdk4jDhAOO43YDfYNlc2ADwAPAA8ADz/O/87/Tv7O/c78TvoO9w7yzu1O5k7djtMOxs74jqiOl06EzrFOXQ5IznROIA4MjjMNzo3sDYtNgA8ADwAPAA8ADz/O/07+zv3O/I76jveO887ujugO387VjslO+06rTpnOho6yTl2OSE5yzh3OCY4rjcZN4w2CTYAPNs7+Dv9O/47/zv/O/87/zsAPAA8ADwAPAA8ADz/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47ADxBO7Y74TvvO/U7+Dv6O/s7/Dv8O/w7/Dv8O/w7/Dv7O/s7+jv6O/o7+Tv4O/g79zv2O/Y79Tv0O/M78jvyOwA8zztuO6E7xjvZO+Q76jvuO/A78TvyO/I78jvyO/E78DvvO+477DvrO+k75zvlO+M74TvfO9w72jvXO9U70jsAPPg7pzuFO5w7tTvGO9I72TveO+E74zvkO+Q74zviO+E73zvdO9o71zvUO9A7zTvJO8Q7wDu8O7c7sjutO6g7ADz+O9o7mjuIO5U7pju0O787xzvMO8870TvSO9E70DvOO8s7yDvEO787uju1O687qTujO5w7lTuOO4Y7fjt2OwA8/zvvO7s7jTuBO4k7ljuiO6w7tDu4O7s7vTu8O7s7uDu0O7A7qzukO547ljuOO4Y7fTt0O2o7YDtWO0s7QDsAPAA89zvVO6I7fzt2O3w7hjuQO5k7nzujO6U7pTujO6A7nDuWO487iDt/O3Y7azthO1U7STs9OzA7IjsVOwY7ADwAPPs75ju6O4w7cjtqO247djt+O4U7iTuMO4w7izuHO4I7eztzO2o7XztTO0c7OjssOx07DTv9Ou063DrLOgA8ADz9O+87zjugO3o7ZDteO2A7ZTtrO3A7cjtzO3E7bTtnO187VjtLOz47MDsiOxI7ATvvOt06yjq3OqI6jjoAPAA8/jv1O907tjuLO2o7WDtRO1E7VDtXO1k7WTtXO1I7TDtDOzg7KzsdOw07/DrqOtY6wjqsOpY6gDppOlE6ADwAPP87+TvoO8g7nzt4O1w7SztEO0I7QjtCO0E7Pjs4OzA7JjsaOww7/DrqOtY6wTqrOpQ6fDpjOkk6LzoUOgA8ADz/O/s77zvXO7I7ijtnO047Pjs2OzE7LjsrOyY7HzsWOws7/TrtOts6xzqxOpo6gTpnOkw6MDoTOvY52DkAPAA8/zv8O/Q74TvDO547eDtYO0A7MDsmOx87GDsROwg7/jrwOuE6zzq7OqU6jTpzOlc6OzodOv453jm+OZ45ADwAPP87/Tv3O+k70TuvO4o7ZjtIOzI7ITsUOwk7/zr0Ouc62DrGOrI6nDqEOmk6TTovOg867znNOas5iDlkOQA8ADwAPP47+TvuO9s7vzucO3c7VTs4OyE7Dzv/OvE64jrTOsE6rjqXOn86ZDpHOig6CDrmOcI5njl5OVM5LTkAPAA8ADz+O/s78jvjO8s7rDuIO2Q7QzsnOw87+jrnOtU6wjqtOpc6fjpjOkY6JzoFOuI5vTmXOXA5SDkgOfc4ADwAPAA8/zv8O/U76TvVO7o7mTt0O1E7MDsTO/k64TrLOrQ6nDqDOmc6SjoqOgg65Dm+OZY5bjlEORk57jjDOAA8ADwAPP87/Tv3O+473TvGO6c7hTtgOzw7Gzv8OuA6xTqqOo46cjpTOjM6EDrrOcQ5mzlxOUY5GTnsOL84kjgAPAA8ADz/O/07+TvxO+Q7zzu0O5Q7cDtKOyY7AzviOsI6ozqEOmM6QToeOvg50DmmOXs5TjkgOfE4wTiROGI4ADwAPAA8/zv+O/o79DvoO9c7wDuiO387WTszOw076DrEOqA6fDpYOjI6CzriObc5ijlcOSw5+zjKOJg4Zjg0OAA8ADwAPP87/jv7O/Y77DveO8k7rjuNO2g7QTsYO/A6yDqgOng6UDomOvs5zzmgOXA5PzkMOdk4pThxODw4CTgAPAA8ADwAPP47/Dv3O+874zvRO7g7mjt2O087JTv7Os86ozp3Oko6HTruOb45jDlZOSQ57zi4OII4SzgVOL43ADwAPAA8ADz/O/07+TvyO+c71zvBO6U7hDtdOzM7BjvYOqk6eTpIOhY64zmvOXo5QzkLOdM4mThgOCc43jdvNwA8ADwAPAA8/zv9O/o79DvqO9w7yTuvO5A7aztBOxM74zqxOn06SToTOts5ozlqOS859Di4OHw4QTgFOJY3IzcAPAA8ADwAPP87/Tv6O/U77TvhO887uDubO3c7TjshO+86uzqEOks6ETrWOZo5XDkeOd84oDhhOCM4yjdRN9w2ADwAPAA8ADz/O/47+zv2O+875DvVO8A7pDuDO1s7Ljv8OsY6jDpQOhM60zmTOVE5DznMOIo4SDgGOI03ETeYNgA8ADwAPAA8/zv+O/w79zvxO+c72TvGO607jTtnOzs7CDvROpY6VzoWOtM5jjlIOQE5uzh1ODA42DdTN9M2VzYAPAA8ADwAPP87/jv8O/g78zvqO907yzu0O5c7cjtHOxU73jqhOmA6GzrUOYs5QTn2OKw4YjgaOKY3HTeZNho2ADwAPAA8ADz/O/47/Dv5O/Q77DvgO9A7uzufO3w7UzsiO+o6rDppOiI61zmKOTw57TieOFE4BTh3N+k2YTbhNQA8ADwAPAA8/zv+O/07+jv1O+074zvUO8A7pjuGO107Ljv3Org6dDoqOtw5jDk5OeY4kzhCOOQ3Sze4Ni02qjUAPAA8ADwAPP87/zv9O/o79jvvO+U72DvFO607jjtnOzk7AzvFOn86NDrjOY85ODnhOIk4NDjCNyI3izb8NXY1ADwAPAA8ADz/O/87/Tv7O/Y78DvnO9s7yTuzO5U7cTtEOw870TqLOj466zmUOTk53TiCOCg4ozf9NmE2zjVGNQA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPP87/jv8O/o79jvyO+w75DvcO9I7xzu7O647oDuRO4E7cTtgO047PTsrOxg7Bjv0OuE6zzq9Oqs6ADwAPAA8ADz/O/47/Tv7O/c78zvuO+c73zvWO8s7vzuyO6Q7lTuFO3U7ZDtSO0A7LjsbOwk79jrjOtE6vzqsOgA8ADwAPAA8/zv+O/07+zv4O/Q77zvpO+I72TvPO8M7tzupO5o7ijt6O2g7VztEOzI7HzsMO/k65jrTOsA6rToAPAA8ADwAPP87/jv9O/s7+Dv1O/A76zvkO9w70jvHO7s7rTufO487fzttO1s7STs2OyM7Dzv8Oug61TrBOq46ADwAPAA8ADz/O/47/Tv7O/g79TvxO+s75TvdO9Q7yju+O7E7ozuTO4M7cjtgO007OjsmOxI7/jrqOtY6wTqtOgA8ADwAPAA8/zv+O/w7+jv4O/U78TvsO+Y73jvWO8w7wTu0O6Y7lzuHO3U7YztQOz07KTsUOwA76zrVOsA6qzoAPAA8ADwAPP87/jv8O/o7+Dv0O/E77DvmO9871zvNO8M7tjupO5o7ijt4O2Y7Uzs/Oyo7FTsAO+o61Dq+Oqg6ADwAPAA8ADz/O/47/Dv6O/c79DvwO+w75jvfO9c7zjvEO7g7qjucO4s7ejtoO1Q7QDsrOxU7/zrpOtI6uzqjOgA8ADwAPAA8/zv+O/w7+jv3O/Q78DvrO+Y73zvXO847xDu4O6s7nDuMO3s7aTtVO0A7KjsUO/065jrOOrU6nToAPAA8ADwAPP87/jv8O/o79zvzO+876zvlO9871zvOO8Q7uDurO507jTt7O2g7VDs/Oyk7ETv6OuE6yDqvOpU6ADwAPAA8/zv/O/07/Dv5O/Y78zvvO+o75DveO9Y7zTvDO7g7qzucO4w7ejtnO1I7PDslOw079TrbOsE6pjqLOgA8ADwAPP87/zv9O/w7+Tv2O/M77jvpO+Q73TvVO8w7wju3O6k7mzuKO3g7ZDtPOzk7ITsIO+460zq4Opw6gDoAPAA8ADz/O/87/Tv7O/k79jvyO+476TvjO9w71DvLO8E7tTunO5g7iDt1O2E7Szs0Oxs7ATvmOso6rTqQOnI6ADwAPAA8/zv/O/07+zv5O/Y78jvtO+g74jvbO9M7yju/O7M7pTuVO4Q7cTtcO0Y7LTsUO/k63Dq/OqE6gjpjOgA8ADwAPP87/zv9O/s7+Tv1O/E77TvnO+E72jvRO8g7vTuwO6I7kjuAO2w7Vjs/OyY7CzvuOtE6sjqSOnI6UToAPAA8ADz/O/87/Tv7O/k79TvxO+w75zvgO9g70DvGO7o7rTueO407eztmO087NzscOwA74jrDOqM6gjpgOj06ADwAPAA8/zv/O/07+zv4O/U78TvsO+Y73zvXO847wzu3O6k7mjuIO3Q7XztHOy07ETv0OtQ6tDqSOm86SzonOgA8ADwAPP87/zv9O/s7+Dv1O/A76zvlO9471TvMO8A7tDulO5U7gjttO1Y7PTsiOwU75TrFOqI6fzpaOjU6DzoAPAA8ADz/O/87/Tv7O/g79DvwO+o75DvcO9M7yTu9O7A7oDuOO3s7ZTtMOzI7FTv2OtU6sjqOOmk6QjobOvM5ADwAPAA8/zv/O/07+zv4O/Q77zvqO+M72zvRO8Y7ujurO5o7hztyO1s7QTslOwY75TrCOp46eDpQOig6/znVOQA8ADwAPP87/zv9O/s7+Dv0O+876TviO9k7zzvDO7U7pjuUO387aTtQOzQ7Fjv1OtI6rTqGOl46NToKOt85tDkAPAA8ADz/O/87/Tv7O/g79DvuO+g74DvXO8w7vzuwO587jDt2O147QjslOwQ74Tq8OpU6bDpCOhY66jm9OZA5ADwAPAA8/zv/O/07+zv3O/M77jvnO9871TvJO7s7qzuYO4M7aztROzM7EzvwOss6pDp6Ok86Ijr0OcU5ljlnOQA8ADwAPP87/zv9O/s79zvzO+075jvdO9I7xTu2O6Q7kDt4O147QjsiO/862jqyOoc6WzotOv45zjmdOWw5OzkAPAA8ADz/O/87/Tv7O/c78jvsO+Q72jvPO8A7rzucO4U7bDtQOzA7DTvoOr86lDpnOjg6CDrWOaM5cDk9OQo5ADwAPAA8/zv/O/07+jv3O/I76zviO9g7yju7O6g7kjt5O107PjsbO/U6zTqhOnM6QzoQOt05qDlzOT45CTnUOAA8ADwAPP87/jv9O/o79jvxO+k74DvUO8U7tDufO4Y7aztMOyk7AzvZOq06fjpMOhg64zmsOXU5PTkFOc44mDgAPAA8ADz/O/47/Tv6O/Y77zvnO907zzu+O6o7kzt4O1k7NjsPO+U6uDqHOlQ6HjrnOa45dDk6Of84xjiNOFU4ADwAPAA8/zv+O/w7+Tv1O+475DvYO8g7tTufO4Q7ZTtCOxs78DrBOo86WjoiOug5rTlwOTM59ji5OH04QjgJOAA8ADwAPP87/jv8O/g78zvqO9870Tu+O6g7jjtvO0s7JDv4Osc6kzpcOiI65TmnOWc5JjnlOKU4ZTgnONY3YTcAPAA8ADz/O/47+zv3O/A75jvZO8k7tDubO307WzszOwg71zqjOms6MDrxObE5bzksOeg4pThjOCE4xDdKN9Q2ADz0O/87ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8+zv/OwA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPLs7fDvnOho6JzkpOHY24jRHM2kxDTAlLr4sdiv+Ke0oJSgjJ0smrSU6JesktiSVJIUkgySMJJ4kuSTaJAElADwWOzw71joYOiw5MTiMNgA1mDPTMZEwaC8/Ln4tCC3JLLMsuyzaLA0tTS2aLfAtTy61LiEvki8EMEAwfjC+MAA8tDvuOqs6FDo6OUo41DZkNVI0LTNCMr4xhzGGMasx7DE/Mp8yBzNzM+EzJzRcNJA0wjTyNB81STVxNZc1ujUAPO87RjuoOho6VDlzOEo3BzYrNak0bDRfNHE0lzTINP40NjVsNZ810DX8NSU2SjZsNos2pzbANtc26zb+Ng83ADz7O6g78Do+Ons5rDjsN+Y2Rzb6NeQ17zULNjA2VzZ+NqI2wjbgNvs2EjcnNzo3SjdZN2Y3cjd8N4Y3jjeWNwA8/jvWO0k7gzq2Ofc4YDj6N4o3VjdEN0U3TzddN2w3ezeIN5Q3nzeoN7E3uDe+N8Q3yTfON9I31TfYN9s33TcAPP876TuIO9A6BTpdOec4mjhrOE04OjguOCY4IDgcOBg4FjgUOBI4EDgPOA44DTgMOAs4CjgKOAk4CTgIOAg4ADz/O+87pzsWO3E66TmFOTw5BjndOL04pDiPOH44bzhjOFk4UDhJOEI4PTg4ODM4LzgsOCg4JjgjOCE4HzgdOAA8/zvvO8M7bTv3OoI6HzrROZE5XTkyOQ057TjTOLw4qDiXOIk4fDhxOGc4XzhXOFA4SjhFOEA4PDg4ODQ4MTgAPAA8/DvpO7k7ZzsFO6c6VToPOtM5nzlxOUk5JjkHOe041jjBOLA4oDiTOIc4fDhyOGo4YjhbOFU4UDhKOEY4ADwAPP479DvbO6o7ZDsXO8o6gzpDOgg61DmkOXo5VDkzORY5/TjmONI4wDixOKM4ljiLOIE4eDhwOGk4YjhcOAA8ADz/O/k76zvOO6M7azssO+s6qzpuOjU6ADrPOaQ5fTlaOTs5HzkHOfE43jjMOL04rzijOJc4jTiEOHw4dDgAPAA8/zv8O/Q75DvKO6Q7dTs+OwQ7yTqPOlg6JDrzOcc5nzl8OVs5PjklOQ45+TjmONY4xji5OK04oTiXOI44ADwAPAA8/jv5O+873jvFO6M7eDtIOxM73DqmOnE6PzoQOuQ5vDmYOXg5Wjk/OSc5Ejn+OOw43DjOOME4tTiqOAA8ADwAPP87+zv1O+o72Du/O587eDtMOxs76Tq2OoQ6VDonOvw51TmxOZE5czlYOT85KTkUOQI58TjiONQ4xzgAPAA8ADz/O/07+DvxO+Q70ju5O5s7djtNOyA78TrCOpM6ZTo6OhE66znIOac5iTluOVU5PjkqORc5BTn1OOc4ADwAPAA8/zv+O/s79TvsO947zDu0O5Y7dDtNOyM7+DrLOp86dDpLOiM6/jncObw5nzmDOWo5Uzk+OSs5GTkIOQA8ADwAPP87/jv8O/g78TvnO9g7xjuuO5I7cTtNOyY7/TrUOqo6gTpaOjQ6ETrvOdA5szmYOX85ZzlSOT45LDkAPAA8ADwAPP87/Tv6O/U77TviO9M7wDupO447bztNOyk7AjvcOrQ6jjpoOkQ6IjoBOuM5xjmrOZI5ezlmOVI5ADwAPAA8ADz/O/47+zv3O/E76TvdO847uzulO4s7bjtOOyw7CDvjOr86mjp3OlQ6MzoUOvY52Tm/OaY5jzl5OQA8ADwAPAA8/zv+O/w7+Tv0O+475TvZO8o7tzuiO4k7bjtQOzA7DjvsOsk6pzqFOmQ6RDomOgk67TnTObo5ozkAPAA8ADwAPP87/zv9O/s79zvyO+s74TvVO8Y7tDugO4k7bztSOzU7FTv1OtU6tDqUOnU6Vjo4Ohw6ATrnOc85ADwAPAA8ADwAPP87/jv8O/k79TvvO+g73jvSO8Q7szufO4k7cTtXOzs7HjsAO+E6wjqkOoY6aTpMOjE6Fjr9OQA8ADwAPAA8ADz/O/47/Tv7O/c78zvtO+U73DvQO8I7sjugO4s7dTtdO0M7KDsMO+860jq2Opk6fTpiOkc6LToAPAA8ADwAPAA8/zv/O/47/Dv5O/Y78TvrO+Q72jvPO8I7szuiO487eztkO007NDsaO/865DrJOq46kzp5OmA6ADwAPAA8ADwAPAA8/zv+O/07+zv4O/U78DvqO+M72jvQO8Q7tjunO5U7gztuO1k7QjsqOxI7+TrgOsY6rTqUOgA8ADwAPAA8ADwAPP87/zv+O/w7+jv3O/Q78DvqO+M72zvSO8c7uzutO547jTt7O2g7Uzs+Oyg7ETv6OuI6yzoAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv3O/Q78DvrO+U73jvWO807wju2O6k7mjuLO3o7aDtVO0I7LTsYOwM7ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+jv4O/U78jvtO+g74zvcO9Q7zDvCO7c7qzueO5A7gjtyO2E7UDs+OwA8ADwAPAA8ADwAPAA8ADz/O/87/jv9O/w7+zv5O/c79DvxO+476TvkO9872DvRO8k7wTu3O6w7oTuVO4g7ezsAPAA8ADwAPAA8ADwAPAA8ADz/O/87/zv+O/47/Tv8O/o7+Tv3O/U78zvwO+076TvlO+A72zvWO887yTvBO7o7ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/zv/O/47/jv9O/07/Dv8O/s7+jv5O/g79zv2OwA8yju5O3I7CTuEOuc5OzmIOLE3bDZLNVQ0EDPEMbowzC99LnMtoCzvK+EqCCpZKcsoVyjxJ1Yn1yZvJhkm0yUAPB07bjtVO/06gDrnOT05izi6N3c2WDVlNDoz9jH2MCwwHS8pLmwt2yxtLBssvCtmKy0rCiv7KvwqCyslK0krADy2Owk7CzvbOnQ65zlDOZY41jebNoY1njTFM54yvDETMZcwQDAHMMkvqi+oL78v6S8SMDYwXzCNML8w9DArMQA88DtUO+g6uDpmOug5TjmnOAI41jbRNfw0VjSzMwEzijJCMh4yGTIpMkwyfDK3MvkyQDOLM9kzFDQ7NGI0iDQAPPs7sDsaO7g6YjrvOV45vzgiOCg3OjZ+NfQ0lDRYNDg0LzQ1NEg0YzSENKk00DT3NB81RjVsNZA1sjXTNfI1ADz+O9w7ajvlOnY6ADp1Od44SziRN782Ija2NXM1UDVGNU01XzV6NZg1uTXbNfw1HTY7Nlg2czaNNqQ2ujbONgA8/zvuO6Y7JzujOiA6lTkFOX04CThfN+E2kDZjNk82TjZYNmk2fjaVNqw2wzbYNu02ADcSNyI3MTc/N0s3VzcAPP879jvJO2U73TpPOr85NDm5OFY4DTi2N3g3VDdDNz43QTdIN1E3XDdnN3E3ezeFN403lTedN6M3qTevN7Q3ADwAPPk73DuROxY7hDrzOXA5BTmyOHY4TDgwOB04ETgJOAQ4ATj/N/03/Df7N/s3+zf7N/s3+zf7N/s3+zf7NwA8ADz7O+c7rDtDO7s6Mjq+OWE5GznmOL44oDiJOHY4aDhcOFI4SjhDOD04ODgzOC84KzgoOCU4IzggOB44HDgAPAA8/DvrO7o7ZDv0OoM6HzrNOYs5VzksOQk56zjSOL04qzibOI04gTh2OGw4ZDhcOFU4TzhKOEU4QDg8ODg4ADwAPPo76DvFO4s7OzvhOok6Ozr4OcE5kjlpOUY5JzkMOfQ43zjMOLs4rDifOJM4iDh+OHU4bThmOF84WThTOAA8ADz+O/c74zu9O4I7OTvrOqA6XTojOvA5wzmbOXg5WDk7OSE5Cjn1OOI40TjBOLM4pzibOJE4hzh/OHc4cDgAPAA8/zv7O/E72juzO3w7PDv5Org6fjpJOhk67jnHOaM5gjlkOUg5LzkZOQQ58jjhONE4wzi2OKo4oDiWOI04ADwAPP87/Tv2O+g7zjuoO3g7QDsIO9A6nDpsOj46FDrtOck5pzmIOWw5Ujk6OSQ5EDn9OO043TjPOMM4tzisOAA8ADwAPP47+TvwO987xTuiO3g7SjsZO+k6uTqMOmA6NzoQOus5yTmqOYw5cTlYOUE5LDkZOQc59zjnONo4zTgAPAA8ADz/O/w79TvrO9o7wjujO387VzssOwA71DqpOn86VjowOgs66TnIOao5jjl1OV05RzkyOSA5Djn/OPA4ADwAPAA8/zv9O/k78jvnO9Y7wTulO4U7YTs7OxI76TrAOpg6cDpKOiY6BDrkOcU5qTmPOXY5YDlLOTc5JTkVOQA8ADwAPP87/jv7O/c77zvjO9M7vzumO4k7aDtFOyA7+TrSOqw6hjphOj46HDr8Od45wjmnOY45dzliOU45OzkAPAA8ADwAPP87/Tv5O/Q76zvgO9E7vTumO4s7bTtMOyo7BjvhOr06mTp1OlM6MjoTOvU52Tm+OaU5jjl4OWQ5ADwAPAA8ADz/O/47+zv3O/E76DvdO847uzumO407cTtSOzI7ETvuOsw6qTqIOmc6RzooOgs67znVObw5pTmPOQA8ADwAPAA8/zv+O/w7+Tv1O+475TvaO8s7ujulO447dDtYOzo7Gzv7Oto6ujqZOno6Wzo9OiE6BTrrOdM5uzkAPAA8ADwAPP87/zv9O/s7+DvzO+w74zvXO8o7uTumO5A7eDteO0I7JTsHO+g6yjqrOo06bzpSOjc6HDoCOuo5ADwAPAA8ADwAPP87/jv8O/o79jvwO+o74TvWO8k7uTunO5M7fTtlO0s7MDsUO/c62jq9OqE6hDppOk46NDobOgA8ADwAPAA8ADz/O/47/Tv7O/g79DvvO+g73zvVO8g7ujupO5c7gjtsO1U7PDsiOwc77DrROrY6mzqBOmc6TToAPAA8ADwAPAA8/zv/O/47/Dv6O/c78zvuO+c73zvVO8o7vDutO5w7ijt2O2A7SjsyOxk7ADvnOs46tDqbOoI6ADwAPAA8ADwAPAA8/zv+O/07/Dv5O/Y78jvtO+c74DvXO8w7wDuzO6Q7kzuBO247WjtEOy47FzsAO+g60Tq5OgA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/Y78jvuO+g74jvaO9E7xju7O647nzuQO387bTtaO0Y7MjsdOwg78joAPAA8ADwAPAA8ADwAPP87/zv+O/07+zv5O/c78zvvO+s75TvfO9c7zjvFO7o7rjuhO5M7hDt0O2M7Ujs/Oy07ADwAPAA8ADwAPAA8ADz/O/87/zv+O/07/Dv6O/g79TvyO+876jvlO+A72TvSO8o7wDu2O6w7oDuTO4Y7eDtpOwA8ADwAPAA8ADwAPAA8ADwAPP87/zv+O/47/Tv8O/o7+Tv3O/Q78jvvO+s75zviO9071zvRO8o7wju6O7E7qDsAPAA8ADwAPAA8ADwAPAA8ADwAPAA8/zv/O/87/jv+O/07/Dv7O/o7+Tv4O/Y79DvyO+877DvpO+Y74jvdO9k7ADzPO847oTtdOwQ7mDoeOpc5CTl5ONg3zjbbNQM1SDROMz8yXTGhMAUwBy8yLoAt7SxyLAssaSvYKl0q9SmcKQA8Hzt/O4A7TTv8OpU6HTqYOQo5ezjdN9U24zUNNVM0aTNfMoExyjA0MHAvpi4BLnotDC2zLGosMCwBLLkrgCsAPLY7EjsrOx875TqLOho6mjkPOYI47zfqNv01LTV5NMMzyDL7MVUx0TBoMBYwry9SLw4v4S7GLrouvC7JLt4uADzxO1g7/TrsOsY6fToXOp05FzmNOAY4DjcpNmI1uTQtNHkzxzI9MtUxijFXMTcxKDEnMTExRDFfMYAxpzHSMQA8+zuyOyc73jqwOnE6FTqjOSM5nTgaOEA3ZzasNRI1lzQ3NN8zeDM1Mw4z/jIBMxQzMjNbM4szwDP6Mxw0OzQAPP473TtyOwE7tTpvOhg6rDkyObE4NDiAN7U2DDaENRs1zzSbNHo0ajRnNG40fTSSNKs0xzTkNAM1IzVCNWE1ADz/O+87rDs9O9Y6fzolOrs5RTnKOFM4zjcVN382Cza3NX41WzVKNUc1TjVdNXE1iTWiNb012TX0NQ42KDZANgA8/zv3O847dzsKO6I6PTrSOV456Dh4OBU4hjcFN6Y2ZDY6NiQ2HDYeNig2NzZJNlw2cTaFNpo2rTbANtI24jYAPAA8+jvhO6I7PzvROmE68Dl9OQw5pThMOAU4nTdPNxs3+zbqNuM25DbqNvQ2/zYLNxg3JDcxNzw3RzdRN1s3ADwAPPw77Du/O207ATuMOhY6ojk3Odk4jDhPOCE4ATjVN7g3pTebN5Y3lTeWN5k3nTehN6U3qjeuN7I3tTe5NwA8ADz9O/I70TuPOy07uDpBOtA5bDkYOdU4oTh6OFw4Rjg2OCo4ITgbOBY4EjgPOAw4CzgJOAg4BjgFOAQ4BDgAPAA8/jv1O9s7pTtPO+I6cToHOq05ZDkpOfo41Di3OJ84izh7OG44YzhZOFE4SjhEOD44OTg0ODA4LTgpOCY4ADwAPP479zvhO7M7aDsLO6g6TDr8Obk5gjlUOS45DjnzONs4xzi1OKU4lziLOIA4djhtOGU4XjhYOFE4TDhHOAA8ADz+O/Y74Tu6O4I7OzvrOpw6UzoTOtw5rDmEOWA5QTkmOQ05+DjkONI4wzi0OKc4mziQOIc4fjh1OG44ZzgAPAA8/jv4O+o70DuoO3I7MTvsOqc6aDowOv851DmuOYw5bTlROTg5ITkMOfk45zjXOMk4uzivOKQ4mTiQOIc4ADwAPP87/Tv2O+Y7yzujO287Mzv0Org6gDpOOiE6+DnUObI5lDl3OV05RTkvORs5CDn3OOc42TjLOL84szipOAA8ADwAPP47+jvwO947wjubO2s7Njv/Oso6mDprOkE6Gjr3OdY5tzmaOYA5ZzlQOTs5JzkVOQQ59DjmONg4zDgAPAA8ADz/O/w79TvpO9U7uTuUO2o7OzsLO906sTqHOl86OjoYOvc52Dm7OaA5hzlvOVk5RTkxOSA5DzkAOfE4ADwAPAA8/zv9O/g77zviO807sjuRO2w7RDsaO/E6yTqiOn06WTo3Ohc6+DnbOcA5pjmNOXY5YTlNOTo5KTkZOQA8ADwAPP87/jv6O/Q76zvcO8k7sTuUO3Q7UTssOwc74jq9Opo6dzpWOjU6Fzr5Od05wzmqOZM5fTloOVQ5QjkAPAA8ADwAPP47/Dv4O/I76DvaO8k7szuaO307Xjs9Oxs7+DrWOrQ6kjpxOlE6MzoWOvo53znGOa45lzmCOW45ADwAPAA8ADz/O/07+zv2O+875jvZO8k7tTueO4Q7aDtKOys7CzvqOso6qTqKOms6TTowOhQ6+TngOcg5sTmbOQA8ADwAPAA8/zv+O/w7+Tv0O+075DvYO8k7tzuiO4s7cTtVOzk7Gzv8Ot06vzqgOoI6ZTpJOi06Ezr6OeI5yzkAPAA8ADwAPP87/zv9O/s79zvyO+s74jvXO8k7uDulO5A7eTtgO0U7KTsNO/A60zq2Opk6fTpiOkc6LToUOvw5ADwAPAA8ADwAPP87/jv8O/o79jvxO+o74TvWO8k7ujupO5Y7gDtqO1E7ODsdOwI75zrMOrE6ljp7OmE6SDovOgA8ADwAPAA8ADz/O/87/Tv7O/g79TvvO+k74TvXO8s7vTuuO5w7iTt0O147RzsuOxY7/DrjOsk6rzqWOn06ZToAPAA8ADwAPAA8/zv/O/47/Tv6O/g79DvvO+k74TvYO807wTuzO6M7kjuAO2w7VztBOyo7Ezv7OuM6yzqzOpw6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/c79DvvO+k74zvbO9E7xju6O607njuNO3w7aTtWO0E7LDsXOwE76zrVOgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/c79DvwO+s75TvfO9c7zTvDO7g7qzudO447fztuO1w7Sjs3OyM7DzsAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvyO+476jvkO9471jvOO8U7uzuwO6Q7lzuKO3s7bDtcO0w7ADwAPAA8ADwAPAA8ADwAPP87/zv+O/47/Tv7O/o7+Dv1O/M77zvrO+c74jvcO9U7zjvGO747tDuqO587lDuIOwA8ADwAPAA8ADwAPAA8ADwAPP87/zv/O/47/Tv8O/s7+jv4O/Y78zvwO+076TvlO+A72jvUO807xTu9O7M7qTsAPNE72Tu5O4c7Rjv2Opo6MjrBOUo5zzhWOL834DYTNlg1szQhNEYzbTK0MRYxjzAdMHgv0i5GLs4tZy0PLcMsADwgO4g7ljt2Oz078TqXOjE6wTlKOdA4VzjDN+U2GDZeNbo0KjRaM4QyzTEzMa8wQTDGLygvoy4zLtQthC1BLQA8tjsXOzs7QTsfO+I6kDouOsE5TTnUOFw4zzfzNik2czXTNEc0njPRMiUylTEeMbswaTAnMOMvjS9KLxcv8C4APPE7WjsHOwc7+DrLOoQ6KjrCOVA52jhkOOM3DDdHNpc1/TR5NAg0VTO7Mj0y2DGIMUsxHTH9MOcw2zDYMNswADz7O7Q7LjvxOtg6szp3OiY6xDlWOeM4cDgAOC83cjbKNTk1vzRaNAc0izMmM9oypDKAMmsyZDJoMnYyizKnMgA8/jveO3c7DjvTOqc6bzojOsc5XznvOH84EzhdN6k2DDaHNRk1wTR9NEk0JDQMNPwz8jP3MwQ0ETQiNDY0TDQAPP878DuvO0c77jqtOnA6JjrOOWo5/jiSOCo4lTfsNlw25TWGNT01BzXhNMo0vjS8NME0zDTcNO80BTUdNTU1ADz/O/c70Tt/Ox07yTp/OjE62jl4ORA5qDhGONg3PTe7NlM2AzbINaA1hzV6NXc1ezWGNZU1pzW6NdA15TX8NQA8ADz7O+M7qDtQO/I6mzpGOuw5izkmOcM4ZjgTOJo3KDfPNo42XzZBNjA2KTYqNjE2PDZJNlk2aTZ6Nos2nDYAPAA8/TvtO8Q7fDsgO8E6ZDoEOqM5QDniOIw4QTgCOKI3VzchN/w25DbXNtE20jbWNt425zbxNvw2BzcSNxw3ADwAPP478zvWO507SzvrOoc6IzrAOWA5Bzm4OHU4PjgUOOg3ujeZN4M3dTduN2o3ajdsN283czd3N3w3gTeFNwA8ADz+O/c74ju1O247EzuuOkY64jmFOTI56ziwOIE4XDg/OCo4GjgOOAU4/jf1N+436TfmN+M34TfgN9833zcAPAA8/zv5O+k7xjuJOzU70zptOgs6szlnOSc58zjIOKc4jDh2OGU4VjhLOEE4OTgzOC04KDgkOCA4HDgZOBc4ADwAPP87+jvtO9A7nDtRO/Y6ljo7Ouo5pTlrOTw5FDnzONc4wDisOJs4jDh/OHQ4ajhhOFk4UjhLOEU4QDg7OAA8ADz/O/s77zvVO6g7ZzsYO8U6dDosOuw5tjmIOWA5PjkgOQc58DjcOMo4ujirOJ44kjiHOH44dThsOGU4XjgAPAA8/zv7O+471juxO387QTv9Orc6dDo4OgI61DmrOYY5ZzlKOTE5GTkFOfI44DjQOMI4tTipOJ04kziKOIE4ADwAPP87+zvxO+A7xjuhO3A7Nzv6Orw6gjpMOhw68jnMOao5izlvOVU5PjkpORU5AznyOOI41DjGOLo4rzikOAA8ADwAPP47+TvvO947wjucO207Nzv/Osc6kzpiOjc6DzrrOco5rTmROXc5YDlKOTU5IjkROQA58TjjONU4yTgAPAA8ADz/O/w79jvqO9c7uzuWO2o7OTsGO9Q6pTp5OlE6LDoKOuo5zTmxOZg5gDlpOVQ5QTkuOR05DTn+OPA4ADwAPAA8/zv9O/k78TvjO887szuQO2g7PDsPO+M6uTqROms6SDooOgk67DnRObc5nzmIOXM5XjlLOTk5KDkYOQA8ADwAPP87/jv7O/U76zvcO8c7rTuNO2k7QjsbO/Q6zjqpOoc6ZTpGOig6CzrwOdY5vjmnOZA5fDloOVU5QzkAPAA8ADz/O/47/Dv4O/A75TvWO8I7qjuOO247TTsqOwg75TrDOqM6gzpkOkc6KzoPOvU53TnFOa45mTmEOXE5ADwAPAA8ADz/O/07+jv1O+074jvUO8I7rTuUO3k7Wzs8Ox07/TreOr46oDqCOmU6STouOhQ6+znjOcw5tjmhOQA8ADwAPAA8/zv+O/w7+DvzO+s74TvUO8Q7sTubO4M7aTtNOzE7Ezv2Otg6uzqeOoI6ZjpLOjE6GDoAOuk50zkAPAA8ADwAPP87/zv9O/s79zvxO+o74TvVO8Y7tTuiO4w7dTtcO0I7JzsLO/A61Dq4Op06gjpoOk46NjoeOgY6ADwAPAA8ADwAPP87/jv8O/k79jvwO+k74DvWO8k7uTuoO5U7gDtpO1I7OTsgOwY77DrSOrg6njqFOmw6VDo8OgA8ADwAPAA8ADz/O/87/Tv7O/k79TvwO+k74TvXO8s7vjuvO547izt3O2E7Szs0Oxw7BDvsOtM6uzqjOos6czoAPAA8ADwAPAA8/zv/O/47/Tv7O/g79DvvO+o74jvZO887wzu2O6c7ljuFO3I7XjtJOzM7HTsHO/A62TrDOqw6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/g79DvwO+s75DvdO9Q7yju+O7E7ozuUO4Q7cjtgO007OTslOxA7+zrmOgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvxO+076DvhO9o70jvIO747sjulO5c7iTt5O2g7VztFOzM7IDsAPAA8ADwAPAA8ADwAPP87/zv+O/47/Dv7O/k79zv0O/A77DvnO+E72zvTO8s7wju3O6w7oDuTO4U7dztnO1c7ADwAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv7O/k79zv0O/E77TvpO+Q73jvXO887xzu9O7I7pjuYO4o7ejtoOwA80zvfO8g7ojtvOzE76DqVOjo62DlxOQc5nDgzOJ033jYuNo01/DR7NAk0SzOdMgYygjERMa8wWjARMKIvMy8APCE7jTujO487ZDsrO+U6lDo5Otg5cTkHOZ04NDifN+E2MTaRNQE1gTQQNFkzrTIYMpcxKDHIMHYwLzDjL3ovADy3Oxk7RTtWO0M7FzvZOo06NjrXOXI5CTmfODc4pzfrNj02nzUSNZQ0JzSOM+kyWzLhMXoxIjHYMJowZTA6MAA88TtcOw07FzsWO/o6yDqEOjI61jlzOQw5pDg9OLY3/TZTNrk1MDW3NE806TNQM88yYjIIMr8xgjFSMS0xEDEAPPs7tTsyO/w68DrcOrQ6eTotOtY5djkROas4RjjLNxc3cjbeNVs16jSJNDc05TN1Mxoz0jKbMnEyVDJCMjkyADz+O987eTsWO+U6yDqjOm46KTrWOXo5GDm0OFI46Dc5N5s2DjaUNSw11DSMNFI0JDQCNNAzrjOZM5EzkjOdMwA8/zvwO7E7TTv8Osk6nTppOig62TmAOSE5wDhhOAY4ZDfONks22zV9NTA18zTFNKI0ijR7NHQ0czR4NIE0jTQAPAA89zvSO4M7KDvfOqU6bDorOt85iTktOc44cjgbOJg3CzeTNi423DWbNWo1RjUuNR81GTUaNR81KjU3NUc1ADwAPPs75DusO1k7BTu9Ono6NTrpOZQ5OzngOIc4NTjVN1M35jaNNkc2EjbrNdA1wDW5Nbg1vTXGNdI14DXvNQA8ADz9O+47xzuEOzE73zqTOkc6+DmkOUw59DigOFI4DTimN0U3+Da8NpE2cjZeNlM2TzZRNlY2XjZpNnU2gTYAPAA8/jv0O9k7pDtaOwY7szpgOg06tzlhOQw5vDh0ODY4ATiuN2s3OTcUN/s26zbiNt423jbiNuc27jb2Nv42ADwAPP47+DvkO7w7fTstO9c6fzonOtA5ejkoOd44nDhjODU4EDjmN7o3mjeDN3M3aTdjN2A3XzdgN2I3ZTdoNwA8ADz/O/o76zvMO5g7UDv7OqA6RTrsOZg5SjkFOck4lzhuOE04MzgfOA84Azj1N+c33TfWN9A3zDfJN8Y3xTcAPAA8/zv7O/A72DusO2w7GzvCOmY6DTq7OXI5Mzn9ONA4qziNOHQ4YDhQOEM4ODgvOCc4ITgbOBc4EzgPOAw4ADwAPP87/DvzO987ujuCOzc74TqIOjM65jmiOWg5NzkOOes4zji1OKA4jzh/OHI4ZjhcOFM4SzhEOD44ODgyOAA8ADz/O/079TvkO8Q7kTtOOwA7rjpgOhk62zmlOXc5TzktOQ859TjfOMs4uTipOJs4jziDOHk4bzhmOF44VzgAPAA8/zv9O/Y75TvIO5w7YzshO9s6ljpVOho65zm5OZE5bjlPOTQ5GzkFOfE43zjOOL84sTilOJk4jjiFOHs4ADwAPP87/DvzO+M7yzuqO347STsOO9E6lTpdOik6/DnTOa45jTlwOVU5PTknORM5ADnvON840TjDOLY4qzigOAA8ADz/O/07+DvtO9s7wjugO3Q7QjsLO9M6nTprOjw6EjrsOco5qzmPOXU5XTlHOTI5HzkOOf047jjfONI4xjgAPAA8ADz/O/w79jvrO9k7vjucO3E7QTsOO9s6qjp7OlE6KjoGOuY5yDmsOZM5ezllOVA5PTkrORo5Cjn7OO04ADwAPAA8/zv9O/k78jvlO9I7uDuWO247QTsTO+U6uDqOOmY6QjohOgI65TnKObE5mTmDOW45WzlIOTY5JjkWOQA8ADwAPP87/jv7O/Y77TvfO8s7sTuRO2w7QzsaO/A6yDqiOn46XDo8Oh46AzroOc85uDmhOYw5eDllOVM5QjkAPAA8ADwAPP87/Dv4O/I75zvYO8Q7qzuNO2w7STskO/862zq4Opc6dzpZOjw6IToHOu451znAOas5ljmDOXA5ADwAPAA8ADz/O/07+jv1O+074jvTO8A7qTuPO3E7UjsyOxE78TrROrI6lDp3Ols6QTonOg469zngOco5tTmhOQA8ADwAPAA8/zv+O/w7+DvyO+o73zvSO8A7rDuVO3w7YTtEOyc7CTvsOs86sjqWOns6YTpHOi86FzoAOuk51DkAPAA8ADwAPP87/zv9O/o79jvxO+k73zvTO8Q7sjueO4g7cDtWOzw7ITsGO+o6zzq0Opo6gDpnOk86NzogOgk6ADwAPAA8ADwAPP87/jv8O/k79TvwO+k74DvVO8c7uDumO5M7fjtnO087NzseOwQ76zrROrg6nzqGOm46VzpAOgA8ADwAPAA8ADz/O/87/Tv7O/k79TvwO+k74TvXO8s7vjuvO547izt3O2I7Szs1Ox07BTvtOtY6vjqmOo86eDoAPAA8ADwAPAA8ADz/O/47/Tv7O/g79TvwO+o74zvaO9A7xDu3O6g7mDuHO3Q7YDtLOzY7IDsKO/Q63TrHOrE6ADwAPAA8ADwAPAA8/zv/O/47/Dv7O/g79TvxO+w75TveO9U7zDvAO7Q7pjuXO4Y7dTtiO087OzsnOxI7/TroOgA8ADwAPAA8ADwAPAA8/zv+O/47/Dv7O/g79TvyO+476DviO9s70jvJO747sjulO5Y7hzt2O2Q7Ujs+Oyo7FTsAPAA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/g79TvyO+476TvjO9w71DvKO8A7szumO5c7hjt0O187SjsyOxg7ADzUO+Q70ju0O4s7WTseO9s6kDo/Oug5jTkvOdE4czgYOII33zZHNrs1PDXLNGU0CzR2M+kybTIBMqIxTzEGMQA8ITuQO607oDuAO1I7GjvYOo86PjrnOYw5LznROHM4GTiEN+A2SDa9NT81zjRpNA80fzP0MnoyDzKxMWAxGDEAPLc7GztLO2U7XDs8Oww70DqKOjs65jmMOS850jh1OBs4iTfmNlA2xjVKNds0eDQgNKczITOsMkYy7jGiMWExADzxO107EjsiOyo7Gzv3OsI6gjo3OuQ5jDkxOdQ4eDgeOJI38jZfNtg1XzXzNJQ0QDTwM3IzBzOrMl0yGzLjMQA8+zu1OzU7BDsAO/c63jqyOng6MjriOY05MznXOH04JTiiNwU3dTbzNX41GDW+NHA0LjTrM40zPjP9MskyoDIAPP473zt7Oxw78jrfOsc6ojpuOi064TmOOTY53TiEOC04tzcfN5Q2FzapNUk19jSwNHU0RTQeNP0zzTOqM5EzADz/O/A7sjtROwY72zq7OpY6ZjopOuE5kTk7OeQ4jTg4ONI3Pze7NkU23zWHNT01/zTNNKY0hzRxNGI0WDRUNAA8ADz4O9M7hjswO+46vzqUOmM6KDrjOZU5QjntOJg4Rjj0N2g36zZ9Nh820TWQNVw1MzUVNf808TTpNOc06TQAPAA8+zvlO647XzsRO9I6nTpnOis65zmcOUs5+DimOFc4DjiYNyM3vzZrNiY27jXDNaM1jTV/NXc1dTV4NX41ADwAPP077zvJO4g7OzvyOrE6dDo1OvA5pTlWOQU5tjhrOCY40DdlNws3wDaENlY2MzYaNgo2ATb9Nf41AzYKNgA8ADz+O/U72zuoO2M7FzvOOok6RTr+ObI5ZDkWOco4gjhBOAg4sDdfNx436jbDNqc2kzaHNoA2fjZ/NoQ2ijYAPAA8/zv4O+Y7wDuFOzw78DqlOls6EDrDOXU5KTngOJ04YTgtOAI4vDeDN1Y3NTccNws3ADf5Nvc29jb4Nvw2ADwAPP87+jvtO9A7oDteOxM7xDp1OiY62DmKOUA5+zi8OIU4VzgwOBA47TfGN6c3kDeAN3Q3azdmN2M3YTdhNwA8ADz/O/w78jvbO7Q7ezszO+Q6kjpAOvA5ozlcORo54TivOIQ4YThFOC44GzgNOAE48DfhN9Y3zTfGN8A3uzcAPAA8/zv9O/U74zvDO5E7UDsDO7A6XToMOsE5fDk/OQo53Ti3OJc4fDhmOFQ4RTg4OC04JDgdOBY4EDgMOAc4ADwAPP87/Tv3O+k7zjujO2c7HjvNOns6LDrkOaM5azk6ORA57TjPOLU4nziMOHs4bThgOFU4TDhDODs4NDguOAA8ADwAPP47+DvsO9U7rzt5OzU76jqcOlI6DjrSOZ05cDlIOSY5CDntONY4wjiwOKA4kTiEOHk4bjhkOFs4UzgAPAA8ADz+O/k77jvYO7Y7hjtKOwc7wjp/OkA6CDrWOak5gjlgOUE5JjkNOfc45DjSOME4sjikOJg4jDiCOHg4ADwAPAA8/jv5O+072Tu7O5M7YjsqO+46sjp4OkI6ETrlOb05mjl6OV05QzkrORY5AjnwON840DjCOLQ4qDidOAA8ADz/O/s79TvrO9w7xjunO4E7UjsfO+g6sjp+Ok06IDr3OdM5sTmTOXg5XzlIOTI5HzkNOfw47DjdOM84wjgAPAA8ADz/O/w79jvrO9o7wjuiO3s7TjsdO+o6uDqIOls6MToMOuk5yjmtOZI5ejljOU45OzkoORc5Bzn4OOk4ADwAPAA8/zv+O/o78zvoO9Y7vjueO3g7TTsfO+86wTqVOms6RTohOgE64znHOa05ljl/OWo5VzlEOTM5IjkSOQA8ADwAPP87/jv8O/c77zviO9A7tzuZO3U7TDsiO/c6zDqkOn06Wjo5Oho6/TnjOco5sjmcOYc5czlhOU85PjkAPAA8ADwAPP87/Tv5O/M76jvcO8k7sTuUO3I7TjsnOwE72jq2OpM6cTpSOjU6GjoAOuc50Dm6OaU5kTl+OWw5ADwAPAA8ADz/O/07+zv2O+875DvWO8M7rDuRO3M7UzsxOw477DrLOqs6jDpuOlI6ODoeOgY67znZOcQ5rzmcOQA8ADwAPAA8/zv+O/w7+DvzO+s74DvSO8E7rDuUO3o7XTs/OyE7AjvkOsY6qTqNOnI6WDo/Oic6Dzr5OeQ5zzkAPAA8ADwAPP87/zv9O/o79jvxO+k73zvSO8M7sTucO4U7bDtSOzc7Gzv/OuM6yDqtOpI6eTpgOkg6MDoaOgQ6ADwAPAA8ADwAPP87/jv8O/k79TvwO+k74DvVO8c7tzumO5I7fDtlO0w7MzsZO/865TrLOrI6mTqAOmg6UTo6OgA8ADwAPAA8ADz/O/87/Tv7O/k79TvwO+k74TvYO8w7vjuvO507ijt2O2A7STsyOxk7ATvoOs86tzqfOoc6cDoAPAA8ADwAPAA8ADz/O/47/Tv7O/g79TvwO+s74zvbO9E7xTu4O6g7mDuGO3I7XTtIOzE7GjsCO+o60Tq5OqE6ADwAPAA8ADwAPAA8/zv/O/47/Dv7O/g79TvwO+s75TvdO9Q7yju+O7A7oTuQO307aTtUOz07JTsMO/I61zq7OgA8ADwAPAA8ADwAPP87/zv+O/07/Dv6O/c79DvwO+s75TveO9U7yzu/O7I7ojuRO347aTtROzg7HDv+Ot46vDoAPNQ75zvaO8E7oDt3O0c7DzvROo06Qzr1OaQ5UDn8OKk4VzgIOHg36zZnNu41fzUbNcA0bzQnNM0zWzP1MpsyADwhO5M7szusO5Q7bztCOww7zzqLOkI69DmjOVA5/DioOFY4Bzh4N+s2ZzbuNYA1HDXCNHE0KTTSM2Ez/DKjMgA8tzsdO1A7bzttO1c7MjsBO8g6hzo/OvI5ojlPOfw4qDhXOAg4ejftNms28zWGNSM1yjR7NDU07TN/Mx4zyTIAPPE7XTsVOyk7OTsyOxk78Tq9On86OzrwOaE5Tzn8OKk4WDgKOH839DZzNv01kzUyNd00kDRNNBI0vTNjMxUzADz7O7Y7NjsJOws7Czv8Otw6rzp3OjU67TmgOU85/TirOFs4DTiJNwA3gjYQNqg1TDX6NLI0dDQ9NA40zTOJMwA8/jvfO3w7IDv7Ou864TrIOqA6bTowOuo5nzlQOf84rjhfOBM4lzcSN5g2KjbHNXA1IzXhNKg0eDRQNC40EzQAPP878DuzO1Q7DDvoOtE6tzqUOmQ6KjroOZ85UjkCObM4ZTgbOKs3Kje1Nkw27zWeNVk1HTXsNMM0oTSHNHM0ADwAPPg71DuIOzU7+DrROrA6jDpeOic65zmgOVU5Bzm5OG44JTjEN0k32TZ3NiE22DWZNWY1PDUaNQA17TTgNAA8ADz7O+U7sDtjOxo74Tq1Oos6XTomOug5ozlZOQ05wjh4ODI45DduNwY3qzZdNhs25TW5NZY1fDVpNVw1VTUAPAA8/TvvO8s7jDtCO/86xjqUOmI6KjrsOag5YDkWOcw4hThCOAU4mzc7N+c2oTZnNjk2FDb4NeQ11zXPNcs1ADwAPP479TvcO6s7aTsiO+E6pjptOjM69DmwOWk5IDnZOJU4VTgbONA3dzcsN+42uzaUNnU2XzZPNkU2QDY+NgA8ADz/O/g75zvCO4o7RjsBO786gDpBOv85uzl0OS456DinOGs4NTgGOLs3eDdBNxU38zbZNsY2uTaxNqw2qzYAPAA8/zv7O+470julO2g7IzvdOpg6VDoPOsk5gzk9Ofs4vTiFOFM4KDgDOMs3mjdzN1U3PjctNyA3GDcSNw83ADwAPP87/DvyO907uTuEO0M7/DqzOms6IjrbOZQ5UTkROdY4ojh0OE04LTgSOPc31De4N6E3kDeDN3k3cTdrNwA8ADz/O/079jvlO8g7mjtfOxo70DqEOjk68DmqOWg5Kzn0OMQ4mjh3OFk4QDgsOBs4DTgBOPA34DfUN8k3wDcAPAA8ADz+O/g76zvTO6w7dzs1O+s6nzpSOgg6wzmDOUo5FznrOMQ4pDiIOHA4XDhLOD04MTgmOB04FTgOOAg4ADwAPAA8/jv5O+872ju5O4k7TDsFO7k6bTolOuE5pTlvOT85FjnyONM4uTihOI04ezhsOF44UjhIOD44NTguOAA8ADwAPP47+jvxO+A7wzuXO187HDvUOos6RjoGOsw5mTltOUU5IzkFOeo40zi+OKs4mjiLOH04cThmOFs4UjgAPAA8ADz+O/s78zvjO8g7oTtuOzI78DqtOm06MTr7Oco5nzl4OVY5ODkcOQQ57jjaOMc4tzinOJo4jTiBOHY4ADwAPAA8/zv7O/M74zvLO6g7fDtJOxA71TqbOmM6Ljr/OdQ5rTmKOWs5Tjk1OR05CDn0OOI40TjCOLQ4pjiaOAA8ADwAPP47+TvwO+E7zTuyO5A7Zjs2OwI7zDqXOmU6NToKOuI5vjmeOYA5ZTlMOTU5ITkNOfs46zjbOMw4vzgAPAA8ADz/O/s79TvrO9w7xzurO4g7XjswO/46zDqbOmw6QDoYOvM50TmyOZY5fDlkOU45OTkmORQ5BDn0OOU4ADwAPAA8/zv+O/o79DvqO9o7xDunO4Q7WzsvOwA70TqjOnc6TjooOgU65TnIOa05lDl8OWc5UzlAOS45HTkNOQA8ADwAPAA8/jv8O/g78TvlO9U7vzuiO4A7WTsvOwM71zqtOoQ6Xjo6Oho6+znfOcU5rTmWOYE5bTlaOUg5NzkAPAA8ADwAPP87/Tv6O/U77DvgO887uDudO3w7WDsxOwk74Tq6OpU6cTpQOjE6FDr5OeA5yDmyOZw5iDl1OWM5ADwAPAA8ADz/O/47+zv3O/E75zvaO8g7szuYO3o7WTs2OxI77jrLOqk6iDppOks6LzoVOvw55TnOObk5pTmROQA8ADwAPAA8/zv+O/w7+Tv0O+074jvVO8Q7sDuYO307YDtBOyE7ADvgOsE6ojqEOmg6TTozOho6AzrsOdY5wjkAPAA8ADwAPP87/zv9O/s79zvxO+o74DvTO8Q7sjudO4U7bDtROzQ7Fzv5Otw6vzqiOoc6bDpSOjk6IToKOvM5ADwAPAA8ADwAPP87/jv8O/o79jvxO+o74TvWO8g7uDumO5I7eztjO0o7LzsUO/g63DrAOqQ6iTpvOlU6PDokOgA8ADwAPAA8ADz/O/87/Tv8O/k79TvwO+o74jvYO807vzuvO507iTtzO1w7QzspOw478zrXOrs6nzqDOmc6TDoAPAA8ADwAPAA8ADz/O/47/Tv7O/g79TvwO+o74zvaO887wju0O6M7kDt8O2U7TDsyOxU7+DrZOrk6mDp2OlQ6ADwAPAA8ADwAPAA8/zv/O/47/Dv6O/c79DvvO+o74zvaO9A7xDu2O6Y7lDt/O2g7TjsyOxM78jrOOqg6fzpUOgA81TvpO987yzuwO447Zjs3OwM7yjqLOkk6Azq6OW85JDnZOI84RzgCOII3BzeUNio2yjVxNSE12TSXNF00KTQAPCI7lTu4O7Y7ozuGO2A7MzsAO8g6ijpIOgI6uTluOSM52DiOOEY4ATiANwU3kzYpNsg1cDUgNdg0lzRdNCk0ADy3Ox47VDt3O3s7aztOOyc7+DrCOoY6RDr/Obc5bTkhOdY4jThFOAA4fjcEN5I2KTbJNXI1IzXbNJs0YjQvNAA88TteOxc7MDtEO0U7MzsUO+s6uDp/OkA6/Dm0OWs5IDnVOIw4RDgAOH43BTeVNi02zzV5NSw15zSpNHI0QjQAPPs7tjs4Ow47FDsbOxM7/TraOqw6dzo6Ovg5sTlpOR451DiLOEU4ATiCNws3nDY3Nts1iDU+Nfw0wjSPNGI0ADz+O+A7fTsjOwE7+zr1OuU6yDqfOm06MzrzOa85ZzkeOdQ4jDhGOAQ4ijcVN6k2RzbvNaE1WzUdNec0uTSRNAA8/zvwO7Q7VjsRO/I64jrROrc6kjpkOi067zmsOWY5HjnWOI44SjgIOJY3JDe9Nl82DDbCNYE1STUZNfA0zjQAPAA8+DvUO4o7OTsAO986xjqrOog6XDooOuw5qzlmOR852DiSOE84DzinNzo31zZ/NjE27TWyNYA1VjU0NRg1ADwAPPs75juxO2Y7IDvtOsg6pzqCOlc6JDrrOas5ZzkiOdw4mDhWOBg4vjdWN/k2pzZfNiE27TXCNZ41gjVsNQA8ADz9O/A7zDuOO0c7CDvWOqw6gzpXOiQ66zmtOWo5JjniOJ84XzgkONs3eTciN9Y2lTZeNjA2CzbuNdc1xzUAPAA8/jv1O907rTttOyo77zq7Oow6XDonOu45sDlvOSw56TipOGs4Mzj+N6I3UjcNN9I2ojZ7Nls2QzYxNiQ2ADwAPP87+TvnO8Q7jjtOOw070jqcOmY6Lzr0ObY5djk0OfM4tTh6OEQ4FDjTN4k3SzcXN+w2yjavNps2jDaBNgA8ADz/O/s77jvUO6g7bjsuO+46sTp2Ojs6/jm/OX85Pjn/OMM4jDhZOCw4BTjHN483YDc7Nxw3BTfzNuU23DYAPAA8/zv8O/M73zu8O4o7TTsMO8s6izpMOgw6yzmLOUs5DjnVOKE4cThIOCQ4BjjYN643jDdxN1s3STc8NzI3ADwAPP87/Tv2O+c7yzugO2k7KTvmOqM6XzodOts5mjlcOSE56ji5OI04ZzhGOCs4Ezj/N983xTevN503jzeDNwA8ADwAPP47+DvsO9Y7sjuBO0Q7Aju8OnY6MDrtOaw5bzk3OQM51TitOIo4azhSODw4KTgZOAw4ATjvN9430DcAPAA8ADz+O/o78DvdO787lDtcOxs71TqOOkc6AjrCOYc5UTkhOfY40DiwOJM4ezhlOFM4Qzg1OCk4HzgVOA04ADwAPAA8/jv7O/M74zvJO6M7cDsyO+06pjpfOhw63TmkOXE5QzkbOfc42Di9OKU4kDh9OG04XjhQOEU4OjgwOAA8ADwAPP87/Dv1O+c70DuuO387RTsEO786ezo5Ov05xzmWOWo5RDkiOQM56DjQOLo4pziVOIY4dzhqOF44UzgAPAA8ADz/O/w79jvqO9U7tjuLO1Y7GjvaOpo6XTokOu85wDmWOXA5TjkwORQ5/DjlONE4vjitOJ04jziBOHU4ADwAPAA8/zv8O/Y76jvXO7o7lDtmOzE7+Tq/OoY6UDoeOu85xTmfOX05XTlBOSc5EDn6OOY41DjDOLM4pTiYOAA8ADwAPP87+zv0O+g71ju+O6A7ejtOOx076Tq0OoA6TzohOvY5zzmsOYs5bjlTOTo5JDkPOfs46TjZOMk4uzgAPAA8ADz+O/s79TvsO987zDu0O5U7bztEOxU75DqyOoI6VDooOgE63Dm6OZw5fzlmOU45ODkkORE5/zjuON84ADwAPAA8/zv+O/s79TvsO947yjuxO5E7aztBOxM75Dq1Ooc6XDozOg066znLOa05kjl6OWM5TTk5OSc5FTkEOQA8ADwAPAA8/zv9O/k78jvoO9o7xjusO4w7aDs/OxM75zq7OpA6ZzpAOh06/DndOcE5pzmPOXk5YzlQOT05LDkAPAA8ADwAPP87/Tv7O/Y77zvkO9Q7wDumO4g7ZTs+OxY77DrDOps6dTpROi86EDryOdc5vjmmOZA5ezlnOVQ5ADwAPAA8ADz/O/47/Dv4O/I76jveO847ujuhO4Q7YztAOxs79TrPOqo6hzplOkU6JjoKOu851jm+Oac5kjl+OQA8ADwAPAA8/zv+O/07+jv1O+875TvZO8k7tTueO4Q7ZjtGOyU7AzvgOr46nDp8Ol06PzoiOgc67jnVOb45pzkAPAA8ADwAPP87/zv9O/s7+DvyO+s74jvWO8c7tTuhO4k7bztSOzQ7FTv1OtU6tDqVOnU6Vzo6Oh06AjrnOc45ADwAPAA8ADwAPP87/jv8O/o79jvxO+o74jvXO8o7ujunO5I7ezthO0U7KDsJO+k6yDqnOoY6ZTpFOiQ6BTrlOQA8ADwAPAA8ADz/O/87/Tv8O/k79TvwO+o74jvYO8w7vTutO5k7gztrO1A7MjsTO/I6zjqqOoQ6XTo2Og465TkAPAA8ADwAPAA8ADz/O/47/Tv7O/g79TvwO+o74jvZO847wDuwO547iTtxO1Y7ODsXO/M6zTqjOnc6SDoYOuU5ADzVO+s75DvTO707oDt+O1c7LDv7OsY6jTpROhI60DmNOUo5BjnEOIM4RDgIOJ43NDfQNnQ2HzbRNYo1STUPNQA8IjuXO707vjuvO5g7eDtTOyk7+TrEOow6TzoQOs85jDlJOQU5wziBOEM4BzibNzA3zTZwNhw2zjWHNUY1DDUAPLc7HztXO347hjt8O2Y7RjsfO/E6vzqHOkw6DTrMOYk5RjkCOcA4fzhAOAQ4ljcrN8g2azYXNso1gzVDNQk1ADzxO147GTs0O047UztIOzE7DzvmOrY6gTpHOgk6yDmGOUI5/zi8OHw4PTgBOJE3JzfENmk2FTbJNYQ1RTUNNQA8+zu2Ozk7ETsbOyc7JjsXO/w62DqrOng6QDoEOsQ5gjk/Ofw4uTh5ODo4/jeONyU3xDZqNhk2zjWLNU81GTUAPP474Dt+OyU7BzsFOwU7+zrnOsc6nzpvOjk6/jm/OX45PDn5OLc4dzg5OP03jjcnN8g2cTYiNts1mzViNTA1ADz/O/E7tDtYOxY7+jrvOuQ60jq3OpI6ZToyOvg5uzl7OTk59zi2OHY4OTj/N5M3LjfSNn82NDbwNbU1gDVSNQA8ADz4O9U7izs8OwY76jrXOsM6qTqHOlw6KzrzObc5eDk3OfY4tTh3ODs4AjicNzs34zaTNk02DjbXNag1fzUAPAA8+zvmO7I7aDslO/Y61jq8OqA6fjpVOiU67zm0OXY5Njn2OLY4eTg/OAg4qjdNN/o2rzZuNjQ2AzbZNbU1ADwAPP078DvMO5A7SzsQO+M6vzqeOno6UToiOu05szl2OTc59zi5OH04RDgQOL43ZjcYN9M2ljZjNjc2Ejb0NQA8ADz+O/U73TuvO3A7MTv5Osw6pDp8OlE6ITrsObM5djk5Ofo4vjiDOE04GjjYN4U3PDf9NsY2mDZyNlI2OTYAPAA8/zv5O+g7xTuRO1M7FzvhOrE6gzpVOiQ67jm1OXk5PDkAOcQ4jDhXOCc4+DerN2g3Ljf9NtQ2sjaXNoE2ADwAPP87+zvvO9U7qjtzOzY7+zrFOpE6XjoqOvM5ujl+OUI5BznNOJc4ZTg4OA841zeaN2U3OTcUN/Y23jbLNgA8ADz/O/w78zvgO747jjtUOxg73TqkOmw6NDr7OcE5hTlKORA52TilOHY4SzglOAU40TehN3k3WDc9Nyc3FTcAPAA8/zv9O/Y76DvNO6Q7cDs1O/c6ujp+OkI6BzrLOY85VDkcOec4tjiJOGI4PzghOAc44Te8N543hDduN103ADwAPAA8/jv5O+072Du2O4c7TzsSO9M6kzpUOhU62DmcOWI5Kzn4OMo4oDh8OFs4PzgnOBI4ATjkN8s3tTejNwA8ADwAPP47+jvxO987wzubO2c7KzvrOqk6ZzomOuc5qzlzOT45DjniOLs4mTh6OGA4STg1OCQ4FTgIOPo35zcAPAA8ADz/O/s79DvlO807qjt7O0I7AzvAOnw6Ojr7Ob85hzlVOSc5/jjZOLk4nDiDOG04WThIODk4KzgfOBQ4ADwAPAA8/zv8O/Y76jvVO7Y7iztWOxk71jqTOlA6ETrXOaE5cDlEOR05+jjbOMA4pziROH04bDhcOE04QDg1OAA8ADwAPP87/Tv3O+072zu/O5g7ZjssO+w6qjpqOiw68znAOZE5ZzlBOR85ATnlOMw4tjiiOI84fzhvOGE4VDgAPAA8ADz/O/07+DvuO947xTuhO3M7PTsCO8Q6hzpNOhY65Dm2OY05aDlGOSc5DDnyONs4xjizOKE4kTiCOHQ4ADwAPAA8/zv9O/g77zvfO8c7pzt+O087GjviOqo6czo/Og464Dm3OZE5bzlQOTM5GTkBOes41zjEOLM4oziUOAA8ADwAPP87/Tv3O+073jvJO647jDtkOzc7BTvSOp46azo7Og064zm9OZk5eTlbOUA5JzkQOfs45zjVOMQ4tDgAPAA8ADz+O/s79jvuO+I70ju9O6E7gDtYOyw7/DrLOpo6ajo8OhE66TnFOaM5hDlnOU05NTkfOQs59zjmONU4ADwAPAA8/zv+O/s79jvuO+I70Tu6O507eztTOyg7+TrKOps6bTpBOhg68jnPOa85kTl1OVw5RTkvORs5CDn3OAA8ADwAPAA8/zv9O/o79DvrO987zTu2O5k7dztQOyU7+TrLOp46czpJOiI6/TncObw5nzmFOWw5VTlAOSs5GTkAPAA8ADwAPP87/jv7O/c78TvnO9k7xzuwO5M7cjtNOyQ7+jrPOqU6ezpUOi46CzrqOcw5rzmVOXw5ZTlPOTo5ADwAPAA8ADz/O/47/Dv5O/Q77DviO9M7wTuqO447bjtLOyY7/jrWOq46hzphOj06Gjr6Ods5vjmjOYk5cTlaOQA8ADwAPAA8/zv/O/07+jv2O/A76DvcO847uzulO4s7bjtNOys7BjvhOrs6lTpwOkw6KDoHOuY5xzmpOY05cjkAPAA8ADwAPAA8/zv+O/s7+DvzO+075DvYO8o7uTukO4w7cTtTOzI7EDvsOsY6oDp5OlI6KzoFOuA5uzmWOXM5ADwAPAA8ADwAPP87/jv9O/o79zvyO+s74zvYO8s7uzuoO5M7ejteOz87HTv5OtI6qTp/OlQ6KDr6Oc05nzlxOQA8ADwAPAA8ADz/O/87/jv8O/k79jvxO+s74zvZO807vjutO5k7gTtmO0g7JjsBO9k6rTp+Okw6GDriOao5cTkAPNY77TvoO9o7xzuvO5M7cjtNOyQ79zrGOpI6XDojOug5rDlwOTM59zi9OIQ4TTgZOM83cjcbN8o2gDY7Nvw1ADwiO5g7wDvEO7k7pjuMO207STshO/U6xDqROlo6ITrnOas5bjkxOfY4uziCOEs4FjjKN203FjfFNno2NTb3NQA8tzsfO1o7gzuPO4o7eDtfOz87GTvuOr86jDpWOh064zmnOWo5LTnxOLY4fThGOBI4wDdiNws3uzZwNis27DUAPPE7XzsbOzg7VTtfO1o7SDsuOww75Dq3OoU6UDoYOt45ojllOSg57DixOHg4QDgMOLU3WDcBN7A2ZjYiNuQ1ADz7O7Y7OjsUOyE7MTs1Oyw7GDv7Otc6rDp9Okk6EjrYOZw5XzkjOeY4qzhyODs4BzirN083+TapNmE2HjbhNQA8/jvgO387JzsLOw07EjsOOwA76DrIOqE6czpBOgo60TmWOVo5HTnhOKY4bTg2OAM4pDdJN/Q2pzZgNh825TUAPP878Tu1O1k7GTsAO/o69TrpOtU6uDqUOmk6ODoDOss5kDlUORg53DihOGk4Mzj/N6A3Rzf1Nqo2ZjYoNvE1ADwAPPg71TuMOz47CzvyOuU61zrEOqo6iDpfOjA6/DnFOYs5TzkTOdg4njhmODE4/TegN0o3+zazNnM2OTYGNgA8ADz7O+Y7sztqOyk7/TriOs06uDqeOn06VjooOvY5vzmGOUs5EDnVOJw4ZTgxOAA4pTdSNwc3wzaHNlI2IzYAPAA8/TvwO807kjtOOxU77DrOOrM6lzp2Ok86IjrxObs5gjlIOQ050zibOGU4MzgDOLA3YTcaN9s2ozZyNkg2ADwAPP479jveO7A7czs2OwI72Tq2OpY6cjpLOh467Tm4OYA5RjkMOdM4nDhoODc4CjjAN3Y3Mzf5NsY2mjZ1NgA8ADz/O/k76DvGO5M7VzseO+w6wjqbOnQ6SjodOus5tjl/OUY5DTnVOKA4bTg+OBI41zeRN1M3HjfvNsg2pzYAPAA8/zv7O+871jusO3Y7PDsFO9Q6pjp7Ok46HzrsObc5gDlHORA52TilOHQ4RzgeOPM3sjd5N0g3Hjf7Nt02ADwAPP87/Dv0O+E7wDuRO1o7ITvrOrc6hjpWOiQ68Dm6OYM5SzkUOd84rTh+OFQ4LTgLONk3pTd4N1I3MTcWNwA8ADz/O/079zvoO847pzt1Oz07BDvMOpc6YTosOvY5vzmIOVE5GznoOLg4izhjOD84HzgDONU3qzeIN2o3UTcAPAA8ADz+O/k77jvZO7g7jDtXOx475DqqOnE6ODoAOsc5jzlZOSQ58zjFOJs4dThTODU4GzgFOOI3wTekN4s3ADwAPAA8/jv6O/E74TvGO587bzs3O/w6vzqDOkc6DDrSOZo5ZDkxOQE51jiuOIo4ajhOODY4IDgOOPs33jfGNwA8ADwAPP87+zv0O+c70DuvO4M7TjsTO9U6ljpYOhs64DmnOXI5QTkTOek4xDiiOIQ4ajhSOD44KzgbOA04ADgAPAA8ADz/O/w79jvrO9g7uzuUO2I7KTvrOqs6azosOvE5uDmEOVQ5KDkBOd04vTihOIc4cDhcOEk4OTgqOBw4ADwAPAA8/zv9O/g77jveO8Q7oTtzOzw7ADvAOn86QToFOs45mzlsOUI5HDn6ONs4vzimOI84ejhnOFY4Rzg5OAA8ADwAPP87/Tv5O/A74jvLO6s7gDtNOxI71DqVOlg6HjroObY5iTlgOTs5GTn6ON44xTiuOJk4hjh0OGQ4VTgAPAA8ADz/O/07+jvyO+Q70DuyO4o7WzskO+o6rzp0Ojw6BzrXOao5gjlcOTs5HDkAOeY4zji4OKQ4kjiBOHE4ADwAPAA8/zv+O/o78jvlO9E7tjuSO2g7NzsDO8w6lTpgOi06/DnQOac5gTleOT45ITkHOe442DjDOK84njiNOAA8ADwAPP87/Tv5O/A74zvRO7o7nDt4O087IDvvOrs6iDpWOiY6+TnOOac5gzliOUQ5KDkPOfc44TjNOLo4qTgAPAA8ADz/O/w79zvwO+Y72DvFO607jztrO0I7FTvlOrM6gjpSOiQ6+DnQOao5iDloOUs5MDkXOQA56zjXOMU4ADwAPAA8ADz+O/w7+DvxO+Y71zvDO6o7ijtmOzw7DzvgOq86gDpROiQ6+jnTOa85jTluOVI5NzkfOQg58zjfOAA8ADwAPAA8/zv9O/s79jvuO+M71Du/O6U7hjthOzg7CzvdOq46gDpTOic6/jnYObQ5kzl0OVg5PTklOQ45+DgAPAA8ADwAPP87/jv8O/g78zvqO947zju5O587fztbOzM7CTvcOq86gjpWOiw6AzrdObk5lzl4OVo5PjkkOQs5ADwAPAA8ADz/O/47/Tv6O/U77jvlO9g7xzuxO5c7eDtWOy87BjvcOrA6hDpYOi06BDrcObU5kTluOU05LTkPOQA8ADwAPAA8/zv/O/07+zv3O/E76jvfO9E7wDuqO5E7cztSOy47BjvcOrE6hTpYOis6/jnSOac5fDlTOSs5AzkAPAA8ADwAPAA8/zv+O/w7+Tv0O+475jvbO807vDuoO5A7dTtWOzM7DTvkOrg6izpbOio6+TnGOZM5YTkuOfw4ADwAPAA8ADwAPP87/jv9O/s79zvzO+075TvbO887vzutO5c7fTtgOz87GjvxOsQ6kzpfOik67zm0OXc5OTn6OAA81jvuO+s74DvQO7w7pDuIO2k7RjsgO/Y6yjqbOmo6NzoCOs05lzlgOSs59jjCOJE4YTgzOAg4wDd0Ny437DYAPCI7mTvDO8k7wjuyO507gztlO0M7HTv0Osg6mTpoOjU6ADrLOZQ5XjkoOfM4wDiOOF44MDgFOLk3bTcmN+Q2ADy3OyA7XDuHO5c7lTuIO3Q7WTs6OxY77jrDOpQ6YzowOvw5xjmPOVk5IjntOLk4hzhXOCk4+zepN103FjfUNgA88TtfOxw7PDtbO2k7aDtcO0c7KzsKO+Q6ujqNOlw6Kjr1Ob85iDlRORs55TixOH84TjggOOo3mDdLNwQ3wjYAPPw7tjs7OxY7Jjs5O0E7PTsvOxk7+zrYOrA6hDpUOiI67Tm3OYA5STkTOd04qTh2OEY4FzjYN4Y3Ojf0NrI2ADz+O+A7fzspOw87FDscOx47FTsEO+o6yjqkOnk6SzoZOuU5rzl4OUE5CjnUOKA4bTg9OA84yDd3Nyw35zanNgA8/zvxO7U7WjscOwU7AjsCO/w67jrYOrs6lzpuOkE6EDrcOac5cDk5OQI5zDiYOGU4NjgIOLs3bDciN942oDYAPAA8+DvVO407QDsQO/o68DrnOto6xzqsOos6Yzo3Ogc61DmeOWg5MTn6OMU4kThfOC84AziyN2Q3HTfcNqE2ADwAPPs75zu0O2w7LDsDO+s63DrMOrg6nzp/Olk6Ljr+Ocw5lzlhOSo58zi+OIs4WTgrOP43rTdjNx834TapNgA8ADz9O/A7zjuTO1E7Gjv0Oto6xTquOpQ6dTpQOiU69znEOZA5WjkkOe44uTiGOFY4KTj9N643ZzcmN+w2uDYAPAA8/jv2O947sTt1Ozo7CTvjOsY6qzqOOm46SDoeOvA5vjmKOVU5HznqOLY4hDhVOCk4ADi1N3E3NDf+Ns42ADwAPP87+TvpO8c7lTtbOyQ79TrPOq46jTpqOkQ6GjrrObo5hjlRORw55zi0OIM4VjgrOAQ4wTeBN0k3FzfrNgA8ADz/O/s77zvXO647eTtBOw074Dq4OpI6azpDOhc66Dm3OYM5TjkaOeY4tDiFOFk4MDgLONM3mDdjNzU3DTcAPAA8/zv8O/Q74TvBO5Q7XzsoO/Y6xzqcOnE6RToYOug5tjmCOU45GjnnOLc4iThfODg4FTjrN7Q3gzdYNzM3ADwAPP87/Tv3O+k70DupO3k7RDsOO9s6qjp7Okw6HDrqObc5gzlPORw56zi8OJA4aDhDOCI4BDjVN6c3gDddNwA8ADwAPP47+TvuO9o7uzuQO147KDvxOrw6iTpVOiI67zm7OYY5UzkhOfE4wziaOHM4UDgxOBY4+jfQN6o3ijcAPAA8ADz+O/o78jviO8g7ozt1O0A7CTvROpk6YjosOvY5wTmMOVk5KDn5OM44pjiBOGE4QzgpOBI4+zfXN7g3ADwAPAA8/zv8O/U76DvSO7I7iTtXOyA75jqsOnI6ODoAOsk5lDliOTE5BDnbOLU4kjhzOFc4PjgoOBU4AzjnNwA8ADwAPP87/Dv3O+w72ju/O5k7azs1O/w6vzqDOkc6DTrVOaA5bTk+ORM56zjHOKY4iDhtOFU4QDgsOBs4CzgAPAA8ADz/O/07+DvvO+A7yDunO3w7STsQO9M6lTpYOhw65DmvOX05TzklOf843Di8OJ84hThuOFg4RTgzOCM4ADwAPAA8/zv9O/k78jvkO887sjuKO1o7IjvmOqg6azovOvY5wTmROWQ5OzkWOfM41Di4OJ44hzhxOF44TDg7OAA8ADwAPP87/jv6O/M75zvVO7o7lTtoOzM7+Tq8OoA6RToNOtk5qTl9OVU5MDkOOe840ji4OKE4izh2OGQ4UzgAPAA8ADz/O/47+zv0O+k72Du/O507cztBOws70jqYOmA6KTr2OcY5mjlyOUw5KjkLOe440zi7OKQ4jzh8OGo4ADwAPAA8/zv+O/s79DvqO9k7wTuiO307UTsgO+s6tTp/Oks6GDroObw5kjlsOUg5KDkKOe441Ti9OKc4kziAOAA8ADwAPP87/jv6O/I75zvYO8M7qTuKO2Q7OTsKO9g6pDpxOj46DjrgObU5jTloOUY5JjkJOe441ji/OKk4ljgAPAA8ADz/O/07+TvzO+o73jvOO7g7njt9O1c7LDv9Osw6mTpnOjY6BzraObA5iTllOUM5JDkHOe041Ti+OKk4ADwAPAA8ADz/O/07+TvzO+s73jvMO7U7mTt3O1A7JDv1OsQ6kjpgOjA6ATrVOas5hDlgOT45HzkCOeg4zji3OAA8ADwAPAA8/zv+O/s79zvxO+c72jvHO7A7kztwO0k7HTvuOr06jDpaOio6+znOOaQ5fDlWOTM5EjnzONY4uzgAPAA8ADwAPP87/jv8O/k79DvsO+I70zvAO6g7ijtnO0A7FDvmOrU6gzpROiA67znAOZM5aDk/ORc58TjNOKs4ADwAPAA8ADz/O/87/Tv6O/Y78DvnO9s7yzu3O547gTteOzc7DTvfOq46fDpJOhY64zmwOX85TjkfOfE4xTiaOAA8ADwAPAA8/zv/O/07+zv4O/I76zvhO9Q7xDuvO5c7ejtYOzM7CTvcOqw6eTpEOg461jmeOWY5Ljn3OMA4izgAPAA8ADwAPAA8/zv+O/w7+Tv1O/A76DveO9I7wjuvO5g7fTteOzo7EjvmOrU6gDpHOgw6zTmNOUs5CTnGOIM4ADzWO/A77TvkO9c7xjuyO5s7gDtjO0M7Hzv6OtI6pzp7Ok46HzrvOb45jjleOS85ATnUOKg4fzhXODI4DjjbNwA8IjuaO8U7zjvJO707qzuWO3w7YDtAOx07+DrQOqU6eTpLOhw67Dm8OYs5WzksOf040DikOHs4UzgtOAo40TcAPLc7IDtdO4s7nTueO5U7hTtwO1Y7ODsWO/E6yjqgOnQ6RjoWOuY5tTmEOVQ5JDn1OMc4mzhxOEk4Izj+N7s3ADzxO187HTs+O2A7cTt0O2w7XDtGOys7CzvoOsE6mDpsOj46DjreOa05ezlKORo56ji8OJA4ZTg9OBc45TehNwA8/Du3Ozw7GDsqO0A7TDtMO0M7MjsaO/063Dq2Oo46Yjo0OgU61DmiOXE5PzkOOd84sDiDOFk4MDgJOMo3hzcAPP474DuAOyo7EjsaOyU7KzsnOxs7BzvtOs46qjqCOlc6Kjr6Ock5mDlmOTQ5AjnSOKQ4dzhMOCM4+TexN243ADz/O/E7tjtbOx47CjsKOw07DDsDO/M63Dq/Op06djpMOh867zm+OY05WjkoOfc4xjiYOGs4QDgXOOI3mzdZNwA8ADz4O9U7jjtCOxM7ADv5OvU67TrfOso6sDqPOmo6QDoUOuQ5tDmBOU85HTnrOLs4jDhfODU4DTjPN4k3STcAPAA8+zvnO7Q7bTsvOwg78zrnOt06zjq7OqE6gjpeOjU6CTraOak5dzlEORI54TiwOII4VjgsOAU4wDd8Nz43ADwAPP078DvOO5Q7UzseO/s65DrTOsI6rjqUOnY6UjoqOv850DmfOW05OzkIOdc4pzh6OE44JTj9N7c3dTc6NwA8ADz+O/Y73juyO3c7PTsOO+w60zq8OqU6izpsOkk6ITr1Occ5ljlkOTI5ADnPOKA4czhIOCA49zezN3Q3PDcAPAA8/zv5O+k7yDuWO107KDv9Ots6vTqiOoU6ZTpBOhk67Tm/OY45XTkrOfk4yTiaOG44RTgeOPU3tDd6N0U3ADwAPP87+zvwO9c7rzt8O0Y7FDvqOsY6pTqEOmE6PDoTOuc5uTmIOVc5JTn0OMQ4lzhsOEQ4Hzj6N7w3hTdUNwA8ADz/O/w79DviO8I7ljtiOy47/jrUOq06hzpiOjo6EDrjObQ5gzlSOSE58TjCOJY4bDhGOCI4AjjKN5Y3aDcAPAA8/zv9O/c76TvQO6s7fDtJOxY75jq6OpA6Zjo7Og864TmxOYE5TzkfOe84wjiXOG84SjgoOAo43DesN4A3ADwAPAA8/jv5O+872zu8O5M7YjsvO/w6yzqcOm46QDoROuI5sTmAOU85HznwOMQ4mzh0OFE4MTgUOPQ3xjedNwA8ADwAPP47+zvyO+M7yTumO3k7RzsTO986qzp5Okg6FjrkObM5gTlQOSE58zjJOKE4fDhaODw4IDgIOOQ3vTcAPAA8ADz/O/w79TvoO9Q7tTuNO107KTvzOr06hzpSOh466jm3OYQ5VDklOfk40DipOIY4ZjhJOC84FzgCON83ADwAPAA8/zv8O/c77TvbO8E7njtyOz87CDvQOpc6XzooOvI5vTmLOVo5LTkCOdo4tTiTOHQ4WTg/OCk4FDgBOAA8ADwAPP87/Tv5O/A74TvLO6s7gztTOx074zqpOm46NDr9Occ5lDlkOTc5DTnmOMM4ojiFOGo4UTg7OCY4FDgAPAA8ADz/O/47+jvyO+Y70ju2O5E7ZDsvO/Y6uzp+OkM6CjrUOaE5cTlFORw59jjUOLQ4lzh8OGQ4Tjg5OCY4ADwAPAA8/zv+O/s79DvpO9g7vzudO3I7QDsIO8w6kDpUOhs65DmxOYI5VjkuOQk55jjHOKo4kDh3OGE4TDg5OAA8ADwAPP87/jv7O/U77DvcO8U7pTt9O047GDveOqM6aDovOvk5xzmXOWs5QzkeOfs43Di/OKQ4izh0OF44SzgAPAA8ADz/O/47+zv2O+073jvJO6s7hjtaOyc78Tq5OoA6SToTOuE5sTmFOVs5NTkSOfE40zi3OJ44hjhwOFs4ADwAPAA8/zv+O/s79jvtO947yjuvO407Zjs5Owc70zqdOmc6Mjr/Oc85oTl2OU85KjkHOeg4yziwOJY4fzhqOAA8ADwAPP87/jv6O/M76jvcO8s7tDuYO3Y7TzsiO/E6vjqKOlU6ITrwOcA5kzlpOUI5HTn7ONw4vzikOIs4dDgAPAA8ADz/O/47+zv2O+875DvWO8M7qzuNO2o7QTsUO+M6rzp7OkY6EzrhObE5hDlZOTI5DTnqOMo4rDiQOHY4ADwAPAA8ADz/O/07+zv2O+474zvUO8A7pjuHO2E7NzsIO9Y6ojpsOjY6ATrOOZ05bjlBORc58DjKOKc4hjhmOAA8ADwAPAA8/zv+O/w7+DvzO+o73jvOO7k7njt+O1c7LDv8Osk6kzpdOiU67zm5OYU5UzkiOfQ4yDieOHY4TzgAPAA8ADwAPP87/jv9O/o79TvuO+U71zvGO687kztyO0w7IDvwOrw6hTpNOhQ62zmiOWo5Mzn+OMo4mDhnODk4ADwAPAA8ADz/O/87/Tv7O/c78TvpO907zzu8O6Q7iDtmO0A7FDvkOrA6eTo/OgM6xjmIOUo5DTnROJU4WzgiOAA8ADwAPAA8/zv/O/07+zv4O/M77DvjO9c7yDu1O507gjthOzs7ETvhOq06dDo3Ovc5szluOSg54TiaOFQ4EDgAPNc78TvwO+g73TvPO747qzuVO3w7YDtDOyM7ATvdOrc6jzpnOj06EzroOb05kjloOT45FjnvOMk4pTiDOGI4ADwiO5s7xzvSO887xTu3O6U7kDt4O147QDsgO/462jq0Oo06ZDo6OhA65Tm5OY85ZDk6ORI56jjEOKA4fjhdOAA8tzshO187jjuiO6Y7oTuUO4M7bjtVOzg7GTv4OtQ6rjqGOl06MzoIOt05sTmGOVo5MDkHOd84uTiUOHE4TzgAPPE7YDseO0E7ZTt4O347ejtuO107RzssOw877jrLOqU6fTpUOio6/jnSOaY5ejlOOSM5+TjROKo4hDhhOD84ADz8O7c7PDsaOy47RjtVO1k7VDtHOzU7HTsBO+I6vzqaOnI6SToeOvI5xjmZOWw5QDkUOeo4wTiZOHM4TzgtOAA8/jvgO4A7KzsUOx47LTs2OzY7LjsgOws78jrUOrI6jTpmOj06ETrlObg5izldOTA5BDnZOLA4iDhiOD04GzgAPP878Tu2O1w7IDsNOxA7FzsZOxU7Cjv4OuE6xDqkOoA6WTowOgQ61zmqOXw5TjkhOfQ4yTifOHc4UTgsOAo4ADwAPPg71juOO0Q7FjsFOwE7ATv9OvQ65DrPOrU6lTpyOks6Ijr3Oco5nDltOT85ETnlOLk4jzhnOEE4HTj1NwA8ADz7O+c7tTtuOzE7DDv6OvE66zrhOtI6vjqlOoc6ZDo+OhU66Tm8OY45XzkxOQM51jiqOIA4WDgyOA842zcAPAA8/TvwO847lTtVOyI7ATvtOuA60zrDOq86lzp5Olc6MToIOtw5rzmBOVI5Izn1OMg4nThzOEw4JjgDOMY3ADwAPP479jvfO7M7eTtAOxM78zrdOss6uTqkOoo6bTpLOiU6/DnQOaM5dDlFORc56Ti8OJE4aDhBOB049je3NwA8ADz/O/k76TvJO5g7YDssOwM75DrLOrM6nDqBOmM6QDobOvE5xjmYOWk5OjkLOd44sTiHOF84OTgVOOo3rjcAPAA8/zv7O/A72DuwO347STsZO/I60Tq0Opg6ezpbOjg6EjroObw5jjlfOTA5AjnVOKk4fzhYODM4ETjkN6s3ADwAPP87/Dv0O+I7wzuYO2U7MzsGO946uzqaOnk6VzoyOgs64Dm0OYY5VzkoOfo4zTiiOHo4VDgwOA844zetNwA8ADwAPP079zvqO9E7rTt/O007HTvwOsc6oTp8OlY6LzoGOts5rjl/OVA5Ijn0OMg4njh3OFI4MDgROOg3tTcAPAA8ADz+O/k77zvcO747lTtmOzU7BDvXOqw6gjpZOi86BDrXOak5ejlMOR058TjFOJ04djhTODI4FDjyN8E3ADwAPAA8/jv7O/M74zvLO6g7fTtNOxs76jq6Oow6XzoyOgQ61jmnOXc5STkbOe84xTidOHg4Vjg3OBo4ADjSNwA8ADwAPP87/Dv1O+k71Tu3O5A7YzsxO/46yzqZOmg6ODoHOtc5pjl3OUg5GznvOMY4oDh8OFw4PjgiOAk45jcAPAA8ADz/O/079zvtO907wzuhO3c7RjsTO946qTp0OkA6DTraOak5eDlKOR058jjLOKU4gzhjOEc4LDgUOP03ADwAPAA8/zv9O/k78TviO807rzuIO1o7JzvxOrk6gjpLOhU64DmtOXw5TjkhOfg40TitOIw4bThRODc4IDgLOAA8ADwAPP87/jv6O/M75zvUO7o7ljtrOzk7AzvKOpE6VzofOuk5tTmDOVU5KTkAOdo4tziXOHk4XThEOC04FzgAPAA8ADz/O/47+zv1O+o72jvCO6I7ejtKOxQ72zqgOmU6LDr0Ob85jjlfOTM5CznmOMM4oziFOGo4UTg5OCQ4ADwAPAA8/zv+O/s79jvtO947yTusO4Y7WDskO+w6sTp1Ojs6AzrOOZw5bTlBORk58zjQOLA4kjh3OF04RTgvOAA8ADwAPAA8/jv8O/c77zvhO847sjuPO2Q7Mjv7OsI6iDpOOhY64DmuOX45UjkpOQM53zi+OJ84gzhpOFA4OTgAPAA8ADwAPP47/Dv4O/A74zvQO7Y7lTttOz87DDvVOp06ZTotOvg5xDmUOWY5OzkTOe44yzirOI04cjhYOEA4ADwAPAA8ADz+O/w79zvvO+I70Du4O5s7dztOOx877Dq3OoA6SToTOt45rDl8OU45JDn8ONc4tDiUOHY4WjhAOAA8ADwAPP87/Tv5O/M76zvgO9E7vTukO4Y7YTs3Owg71TqfOmg6MTr6OcU5kTlgOTI5BjndOLY4kjhwOFA4MjgAPAA8ADwAPP87/Tv5O/M76jvdO8w7tzucO3s7VDsnO/Y6wjqKOlE6GDrgOag5czk/OQ453zizOIk4YTg7OBg4ADwAPAA8ADz/O/47+zv3O/E76DvaO8k7sTuUO3E7SDsaO+c6sDp2Ojs6ADrEOYo5UTkaOeU4sziCOFQ4Jzj6NwA8ADwAPAA8/zv+O/w7+Tv0O+074jvUO8E7qDuKO2U7OzsLO9Y6nTpiOiQ65jmnOWk5LDnwOLY4fjhIOBQ4wzcAPAA8ADwAPP87/zv9O/o79jvwO+c72jvKO7U7mzt8O1Y7Kzv6OsQ6iTpLOgs6yTmFOUI5/zi9OHw4PTgAOIo3ADwAPAA8ADz/O/87/Tv6O/Y78TvpO947zzu9O6Y7iztqO0M7FzvlOq46cjoxOuw5pTlbORA5xTh6ODE40jdHNwA81zvxO/I77DvjO9c7yTu5O6Y7kTt6O2E7RjsqOws76zrJOqY6gjpeOjg6EjrsOcc5oTl8OVg5NTkTOfM40zgAPCM7mzvJO9U71DvNO8I7szuiO447dzteO0Q7JzsJO+g6xzqkOn86Wjo1Og866DnCOZ05dzlTOTA5DjntOM04ADy3OyE7YDuRO6c7rTurO6E7lDuCO247Vjs8OyA7ATvhOr86nDp3OlI6LDoFOt45uDmROWs5RjkiOf843ji+OAA88TtgOx87QztpO387hzuGO347cDtfO0k7MDsVO/c61zq1OpI6bTpHOiA6+DnROak5gjlbOTY5ETntOMs4qjgAPPw7tzs9Oxs7MTtLO107ZDtiO1o7Szs4OyI7BzvqOss6qTqFOmA6OToSOuk5wTmZOXE5STkjOf042Di1OJQ4ADz+O+A7gTssOxc7IjszOz87Qzs/OzU7JTsQO/g63Dq8Ops6dzpROio6AjrZObA5hzleOTY5DjnoOMM4nzh9OAA8/zvxO7Y7XTshOxE7FTsfOyQ7JDsdOxA7/jrnOsw6rTqMOmg6QjoaOvI5yDmeOXQ5SzkiOfo40zitOIk4ZjgAPAA8+DvWO487RTsZOwk7CDsLOws7BTv7Ouo61Tq7Op06fDpYOjI6CjrhObc5jDlhOTc5DjnlOL44mDhzOFE4ADwAPPs75zu1O287MzsPOwA7+jr2OvE65zrXOsM6qjqNOmw6SToiOvo50DmlOXo5TzkkOfo40TiqOIQ4Xzg9OAA8ADz9O/E7zzuWO1c7JTsFO/Q66jrhOtY6xjqzOpo6fjpdOjk6EzrqOcA5lTlpOT05EjnoOL84lzhxOE04KzgAPAA8/jv2O987szt6O0I7Fzv6OuY62DrJOrk6pDqMOm86TzorOgQ62zmwOYU5WTktOQE51ziuOIc4YTg9OBw4ADwAPP87+TvpO8k7mTtiOzA7CTvsOtY6wjqvOpk6gDpiOkI6HTr2Oc05ojl2OUo5HTnyOMg4nzh4OFM4MDgPOAA8ADz/O/s78DvYO7E7fztMOx47+TrbOsI6qjqROnY6WDo2OhE66jnAOZU5aDk8ORA55Di6OJI4azhHOCU4BjgAPAA8/zv9O/Q74zvEO5k7aDs3Oww75zrHOqo6jTpwOlA6LToHOt85tTmJOVw5MDkEOdg4rziHOGE4PjgdOP43ADwAPAA8/Tv3O+o70juuO4E7UTsiO/g60jqvOo46bTpLOiY6/znWOas5fjlSOSU5+TjPOKY4fzhaODg4GDj2NwA8ADwAPP47+TvvO9w7vzuXO2k7OjsMO+E6uTqTOm46SDohOvk5zjmiOXY5STkcOfE4xzifOHk4VTg0OBU48zcAPAA8ADz+O/s78zvkO8w7qjuAO1E7ITvzOsc6nDpzOko6IDr1Ock5nDlvOUI5FjnrOME4mjh1OFI4MjgVOPQ3ADwAPAA8/zv8O/Y76jvWO7k7kztnOzc7BzvXOqg6ezpOOiE68znGOZg5ajk9ORE55ji+OJc4czhSODM4Fzj6NwA8ADwAPP87/Tv4O+473TvFO6M7ejtMOxs76Tq3OoU6VTokOvQ5xTmVOWc5OjkOOeQ4vDiXOHQ4VDg2OBo4ATgAPAA8ADz/O/07+TvxO+M7zjuxO4w7XzsvO/s6xzqSOl46Kjr4OcY5lTlmOTk5DTnkOL04mTh3OFc4OjgfOAc4ADwAPAA8/zv+O/o78zvoO9Y7vDuaO3E7QTsNO9c6oDppOjM6/TnKOZg5aDk6OQ855jjAOJw4ezhcOD84JTgNOAA8ADwAPP87/jv7O/U76zvcO8U7pjuAO1I7HzvoOq86djo9OgY60DmdOWw5PjkTOeo4xDihOIA4YjhFOCs4EzgAPAA8ADz/O/47/Dv3O+474DvMO7A7jDtgOy47+Dq+OoQ6SToQOtk5pTl0OUU5GjnxOMs4pziGOGc4SzgwOBg4ADwAPAA8ADz+O/w7+DvwO+Q70Tu3O5Y7bDs8Owc7zTqSOlc6HjrmObE5fjlPOSI5+TjSOK04jDhsOE84MzgaOAA8ADwAPAA8/zv8O/g78TvmO9Q7vDudO3Y7SDsUO906ozpoOi469jnAOYw5WzktOQI52TizOI84bjhPODI4FzgAPAA8ADwAPP87/Tv5O/E75jvWO787oTt9O1I7IjvtOrY6fDpDOgo60jmcOWk5ODkKOd44tTiOOGo4SDgoOAs4ADwAPAA8ADz/O/w7+DvwO+Q71Du/O6U7hTteOzM7AjvNOpU6WzohOuc5rjl3OUI5DznfOLE4hjhdODY4EjjeNwA8ADwAPP87/Tv6O/U77jvkO9c7xjuvO5M7cTtKOxw76TqyOng6PToBOsQ5iTlQORg54zivOH84UDgkOPQ3pDcAPAA8ADwAPP87/Tv7O/Y77zvkO9U7wjupO4s7Zjs7Owo71DqbOl46IDrgOaE5YjklOeo4sTh6OEU4EzjFN2g3ADwAPAA8ADz/O/47/Dv5O/M76zvgO9A7uzuhO4A7WTssO/g6wDqDOkM6ATq+OXo5Nzn2OLY4eDg8OAI4lTcrNwA8ADwAPAA8/zv+O/07+jv1O+875TvYO8Y7sDuTO3E7SDsYO+M6qDpoOiQ63jmWOU45BTm9OHc4MzjiN2I36DYAPAA8ADwAPP87/zv9O/o79jvwO+c73DvMO7g7njt/O1o7Lzv9OsU6hzpEOvw5sDliORM5wzh0OCY4tDciN5c2ADzXO/I78zvvO+c73jvSO8Q7tTukO5E7fDtlO007NDsYO/w63jrAOqA6gDpfOj46HTr8Ods5ujmaOXs5XTk/OQA8IzucO8o72DvZO9Q7yzu/O7A7oDuNO3k7YjtKOzE7Fjv5Ots6vDqdOnw6Wzo6Ohg69jnVObQ5lDl0OVY5ODkAPLc7ITthO5M7qzuzO7M7rTuiO5Q7gztwO1o7QjspOw478TrTOrQ6kzpyOlE6LzoMOuo5yDmmOYU5ZTlFOSc5ADzxO2A7HztFO2w7hDuPO5A7izuBO3M7YjtOOzc7HjsDO+Y6xzqoOoc6ZTpCOiA6/DnZObY5kzlxOVA5LzkQOQA8/Du3Oz07HDszO087YzttO247aTtfO1A7PjsoOxA79TrYOro6mTp4OlU6MjoOOuo5xTmhOX45Wzk4ORc59jgAPP474DuBOy07GTsmOzk7RztOO047Rzs7Oys7FzsAO+U6yTqqOok6ZzpEOiA6+znVObA5izlmOUI5Hzn9ONs4ADz/O/E7tjtdOyM7EzsaOyY7LjsxOy47JTsXOwQ77jrUOrg6mTp4OlU6MToMOuY5wDmaOXQ5TjkpOQU54jjAOAA8ADz4O9Y7jztGOxs7DTsOOxM7FjsVOw47AjvxOts6wzqmOoc6ZjpDOh46+DnSOas5gzlcOTY5EDnrOMc4pTgAPAA8+zvnO7U7cDs1OxM7BTsBOwE7/jr4Ou063TrJOrE6lTp2OlQ6MToLOuQ5vTmVOW05RTkeOfc40jiuOIs4ADwAPP078TvPO5Y7WDsnOwk7+jrzOu065TraOss6tzqfOoM6ZDpCOh46+DnROak5gDlXOS85BzngOLo4ljhzOAA8ADz+O/Y73zu0O3s7RDsaO/867jriOtc6yjq6OqY6jjpzOlM6MToNOuY5vjmVOWw5QjkZOfE4yjikOIA4XTgAPAA8/zv5O+o7yTuaO2M7MzsNO/I63zrPOr86rTqYOoA6YzpEOiE6/DnVOaw5gjlZOS85BTndOLY4kDhsOEo4ADwAPP87+zvwO9k7sjuBO047Ijv/OuM6zTq4OqQ6jTpzOlY6NToSOuw5xDmbOXE5RzkdOfM4yzijOH44Wjg5OAA8ADz/O/079TvjO8U7mjtqOzo7ETvuOtE6tzqeOoU6aTpKOik6BTreObY5jDlhOTY5DDnjOLo4kzhuOEs4KjgAPAA8ADz9O/c76jvSO687gztUOyY7/jrbOrs6njqAOmI6QToeOvk50TmoOX45UzkoOf041DisOIY4YTg/OB84ADwAPAA8/jv5O+873TvAO5k7bDs+OxE76TrEOqE6gDpeOjs6FjrvOcY5nDlxOUY5GznwOMc4oDh6OFc4NTgWOAA8ADwAPP47+zvzO+Q7zTurO4I7VTsnO/o60TqpOoM6Xjo3OhA65zm9OZI5Zjk7ORA55ji9OJY4cThOOC44EDgAPAA8ADz/O/w79jvqO9Y7ujuVO2o7PDsNO+A6tDqKOmA6NzoMOuE5tjmKOV05MTkGOdw4tDiOOGo4SDgoOAs4ADwAPAA8/zv9O/g77jveO8Y7pTt+O1E7ITvxOsI6lDpmOjk6CzreObA5gzlWOSo5/zjVOK44iDhlOEQ4JTgIOAA8ADwAPP87/Tv5O/E75DvPO7M7jztkOzU7BDvROqA6bjo9Og063TmtOX45UTkkOfk40DipOIQ4YThBOCM4BzgAPAA8ADz/O/47+jv0O+g71zu+O507dTtHOxY74jqtOng6RDoQOt45rDl8OU05IDn1OMw4pjiBOF84PzgiOAY4ADwAPAA8/zv+O/s79jvsO907xzupO4Q7WDsnO/I6uzqEOk06FjrhOa05fDlMOR458zjKOKQ4fzheOD44IDgFOAA8ADwAPP87/jv8O/c77zvhO847szuRO2c7NzsCO8o6kTpXOh465jmxOX45TTkeOfI4yTiiOH44XDg8OB44AjgAPAA8ADwAPP87/Dv4O/E75TvTO7s7mztzO0U7EDvYOp46YjooOu45tzmCOVA5IDnzOMk4oTh7OFg4ODgZOPk3ADwAPAA8ADz/O/07+TvyO+c71zvBO6M7fTtQOx075TqrOm86Mzr4Ob85iTlUOSM59DjHOJ04djhROC44DTjdNwA8ADwAPAA8/zv9O/k78zvpO9k7xDunO4Q7WTsoO/I6uTp9OkE6BTrKOZE5WTkkOfI4wjiUOGk4QDgaOOs3pjcAPAA8ADwAPP87/Tv5O/M76DvZO8U7qjuJO2E7NDsBO8o6kDpUOhc62jmdOWM5KjnzOL84jThdODA4BDi3N2k3ADwAPAA8ADz+O/w79zvwO+U71zvFO607kTttO0Q7FTvhOqg6bDouOu85sDlxOTQ5+Di/OIc4UjggON83gzcrNwA8ADwAPAA8/zv8O/k78zvqO987zzu7O6E7gjtcOzA7/jrGOoo6SzoJOsc5hDlCOQE5wjiFOEo4ETi2N0436zYAPAA8ADwAPP87/jv8O/g78jvpO907zDu2O5o7dztOOx476DqtOm06KTrjOZw5VTkOOcg4hDhDOAM4jDcYN6g2ADwAPAA8ADz/O/47/Tv6O/U77jvkO9Y7wzurO407aDs8Owk7zzqQOks6Azq4OWw5HznSOIY4PDjqN2E33TZgNgA8ADwAPAA8/zv/O/07+jv2O/A75zvbO8o7tTuaO3k7UTsiO+w6rzprOiI61TmEOTA53DiIODU4yjcvN5w2ETYAPNc78zv1O/E76zvkO9o7zzvCO7Q7pDuTO4A7bDtXO0A7KDsQO/Y62zrAOqQ6hzpqOk06MDoUOvc52znAOaU5ADwjO507zDvaO9w72TvSO8k7vTuwO6A7jzt9O2k7VDs9OyU7DDvyOtc6vDqfOoI6ZTpIOis6DTrxOdQ5uDmdOQA8tzsiO2I7lTuuO7k7uju2O647ozuWO4Y7dDthO0s7NTsdOwM76TrNOrE6lDp2Olg6OjocOv454DnDOaY5ijkAPPE7YDsgO0Y7bzuIO5U7mTuXO5A7hTt3O2c7VDs/Oyk7EDv3Otw6wDqiOoU6ZjpHOig6CTrpOco5rDmOOXE5ADz8O7c7PjseOzU7UztpO3U7eTt3O3A7ZTtWO0Q7MDsaOwI76DrMOq86kTpyOlM6MzoSOvI50TmxOZE5cjlUOQA8/jvgO4E7LjsaOyk7PjtOO1g7WjtXO087QjsyOx87CTvxOtY6ujqdOn46Xjo+Ohw6+znZObc5ljl1OVQ5NTkAPP878Tu2O147JDsWOx47LDs3Ozw7PDs2Oyw7HjsMO/Y63jrEOqg6iTpqOkk6JzoFOuI5vzmcOXk5Vzk2ORU5ADwAPPg71juQO0c7HDsQOxM7GzsgOyI7HjsVOwk79zrjOss6sTqUOnU6VTozOhA67DnIOaQ5gDlcOTk5Fzn1OAA8ADz7O+c7tjtxOzY7FTsJOwc7CTsKOwc7/zrzOuM6zzq4Op06gDpgOj86HDr5OdQ5rzmKOWU5QDkcOfg41jgAPAA8/TvxO887lztZOyk7DTsAO/o69zrzOus63zrPOrw6pDqKOmw6TDoqOgY64jm8OZY5cDlKOSQ5/zjbOLg4ADwAPP479jvfO7Q7fDtGOx07Azv0Ous64zraOs06vTqpOpI6dzpZOjg6FTrxOcs5pTl+OVc5MDkJOeQ4wDidOAA8ADz/O/k76jvKO5o7ZTs1OxE7+DrnOtk6zTq+Oq06mDqAOmU6RjolOgE63Dm2OY45Zjk/ORc58DjLOKY4gzgAPAA8/zv7O/A72TuzO4I7UDslOwM76jrWOsU6szqgOoo6cTpUOjU6EzrvOck5oTl5OVA5KDkAOdk4sziPOGw4ADwAPP87/Tv1O+M7xTubO2w7PTsVO/Q62TrCOq06ljp+OmM6RjolOgI63Tm2OY45ZTk8ORM56zjEOJ44ejhXOAA8ADwAPP07+DvqO9M7sDuEO1Y7KjsDO+I6xTqrOpA6dTpYOjk6FzrzOc05pTl8OVM5KTkAOdg4sTiLOGc4RTgAPAA8ADz+O/o78DvdO8A7mjtuO0E7FjvwOs06rTqPOnA6UDovOgs65jm+OZY5bDlCORg57zjGOJ84ejhXODU4ADwAPAA8/jv7O/M75TvNO6w7hDtXOys7ADvZOrQ6kTpuOks6JzoBOto5sTmIOV05MzkIOd84tziQOGs4STgoOAA8ADwAPP87/Dv2O+o71zu7O5c7bTtAOxM76Dq+Opc6cDpJOiI6+jnQOaY5ezlQOSU5+zjROKk4gzhfOD04HDgAPAA8ADz/O/07+DvuO987xzunO4A7VDsnO/g6yzqfOnQ6SjofOvQ5yTmdOXA5RDkZOe44xTieOHg4VDgyOBM4ADwAPAA8/zv9O/k78jvkO9A7tDuRO2c7OjsKO9o6qzp8Ok06HzrxOcM5lTlnOTo5DjnkOLs4kzhuOEs4KjgLOAA8ADwAPP87/jv6O/Q76TvYO787nzt4O0w7HDvqOrg6hTpTOiE68Dm/OY85YDkyOQU52jixOIo4ZThCOCE4AzgAPAA8ADz/O/47+zv2O+w73jvIO6w7hztdOy07+jrGOpA6WjolOvE5vTmLOVo5Kzn9ONI4qTiBOFw4OTgZOPQ3ADwAPAA8ADz+O/w79zvvO+I7zzu2O5Q7bDs9Owo71DqcOmM6KzrzOb05iTlWOSU59zjKOKA4eDhTOC84DjjeNwA8ADwAPAA8/zv8O/g78TvmO9U7vTufO3g7SzsYO+E6qDptOjI69zm/OYg5UzkgOfA4wjiWOG04RjgiOP83vjcAPAA8ADwAPP87/Tv5O/M76DvZO8M7pzuCO1c7JDvtOrM6djo5Ovw5wTmHOVA5GjnnOLY4iDhcODM4CzjMN4U3ADwAPAA8ADz/O/07+jv0O+o73DvIO6w7ijtgOy87+Tq/OoI6QzoFOsc5izlQORc54TisOHo4SzgeOOU3kzdFNwA8ADwAPAA8/zv9O/o79DvrO907yTuwO487Zzs5OwU7zDqQOlE6EjrSOZM5VTkZOd44pjhwODw4Cji1N1s3BTcAPAA8ADwAPP87/Tv5O/M76TvcO8k7sTuTO287RDsTO906ozplOiQ64zmhOV85HjnfOKI4ZzguOO83hzcjN8Q2ADwAPAA8/zv9O/o79jvvO+c72zvLO7Y7nDt8O1Y7KDv1Orw6fjo9Ovk5tDluOSg55DihOGE4IjjMN1k36jaBNgA8ADwAPAA8/zv+O/s79zvwO+c72TvHO7A7kztvO0Q7EzvbOp06WzoVOsw5gTk3Oe04ozhcOBc4qTcqN7A2PDYAPAA8ADwAPP87/jv8O/k79DvtO+I71DvAO6c7hztgOzE7/Dq/Onw6NTrpOZo5STn5OKg4WjgNOIY3+TZyNvM1ADwAPAA8ADz/O/87/Tv6O/Y78DvnO9o7yTuzO5c7dTtLOxk74DqfOlc6Cjq4OWI5CzmzOFs4BjhoN8s2NzarNQA81zvzO/Y79DvvO+k74TvYO807wju1O6c7lzuHO3U7YztPOzo7JTsPO/g64DrIOrA6lzp+OmU6TDozOhs6AzoAPCM7nTvNO9w74DveO9k70jvIO707sTujO5Q7hDtyO187TDs3OyE7CzvzOtw6wzqqOpE6eDpeOkU6LDoTOvs5ADy3OyI7YzuXO7E7vTvBO787uTuxO6Y7mTuLO3s7aTtWO0I7LTsXOwA76DrPOrY6nDqCOmg6TjozOhk6/znmOQA88TtgOyE7RztxO4w7mzuhO6E7nTuVO4o7fTttO1w7Sjs1OyA7CTvxOtk6vzqlOoo6bzpTOjc6HDoAOuU5yjkAPPw7tzs+Ox47NztWO247fDuCO4M7fjt2O2s7XTtMOzo7JjsQO/g64DrGOqs6kDp0Olc6OjodOgA64znHOao5ADz+O+A7gTsuOxw7KztCO1Q7YDtlO2Q7XztWO0k7OjsoOxM7/TrlOsw6sTqWOnk6Wzo+Oh86ATriOcQ5pjmIOQA8/zvxO7c7XjslOxg7ITsxOz47RjtIO0Y7Pzs0OyU7FDsAO+k60Tq3Ops6fjpgOkI6IjoDOuM5wzmjOYM5ZDkAPAA8+DvWO5A7SDseOxM7FzshOyk7LTssOyc7HTsQO/866zrUOrw6oTqEOmY6RzonOgY65TnEOaM5gTlhOUA5ADwAPPs75zu2O3E7ODsXOww7DTsROxQ7EzsPOwY7+jrpOtY6vzqmOoo6bTpOOi46DDrqOcg5pTmCOWA5PjkdOQA8ADz9O/E7zzuXO1o7KzsQOwQ7ATsAO/46+TrxOuQ61DrBOqo6kDp0OlY6NjoUOvI5zjmrOYc5Yzk/ORw5+jgAPAA8/jv2O+A7tTt9O0c7IDsHO/o68zrtOuc63TrROsA6rDqVOns6Xjo/Oh46+znXObM5jjlpOUQ5IDn8ONk4ADwAPP87+TvqO8o7mztmOzc7FDv9Ou064jrYOs06vzquOpk6gTpmOkk6KToHOuM5vjmZOXM5TTknOQI53Ti6OAA8ADz/O/s78DvZO7M7gztSOyg7BzvwOt46zzrAOrA6nTqIOm86Uzo1OhM68DnMOaY5fzlZOTI5CznmOME4nTgAPAA8/zv9O/U74zvGO5w7bTs/Oxg7+TrgOsw6uDqlOpA6eTpeOkE6IjoAOts5tjmPOWg5QDkYOfE4yzimOII4ADwAPAA8/Tv4O+s70zuxO4Y7WDstOwg76DrNOrU6njqGOmw6UDoxOhA67TnIOaE5eTlROSk5ATnZOLM4jjhqOAA8ADwAPP47+jvwO907wTubO3A7RDsaO/U61Dq3Ops6fzpjOkQ6JDoBOtw5tjmOOWU5PDkTOes4wzidOHg4VDgAPAA8ADz/O/s78zvlO847rTuFO1o7LjsFO+A6vTqcOnw6XDo7Ohg68znNOaU5fDlSOSk5/zjXOK84iThkOEE4ADwAPAA8/zv8O/Y76zvYO7w7mDtvO0M7GDvuOsY6oTp9Olg6NDoOOuc5vzmWOWw5QTkXOe04xDicOHY4UjgvOAA8ADwAPP87/Tv4O+873zvIO6g7gjtXOys7/jrTOqk6gDpYOjA6BzrdObM5iDldOTE5BjncOLM4izhlOEE4HzgAPAA8ADz/O/07+TvyO+U70Tu2O5M7ajs+OxA74Tq0Ooc6WjouOgI61TmpOXw5TzkjOfc4zDijOHs4VjgyOBA4ADwAPAA8/zv+O/s79DvpO9k7wTuhO3s7UDshO/E6wDqPOl86Lzr/Oc85oDlxOUM5FTnoOL04lDhsOEY4IzgBOAA8ADwAPP87/jv7O/Y77TveO8k7rTuKO2A7MjsBO846mTplOjE6/jnLOZk5Zzk3OQg52jivOIQ4XDg2OBI44TcAPAA8ADwAPP47/Dv3O+874zvRO7c7lztvO0I7EDvbOqU6bTo2Ov45yDmTOV85LDn7OMw4nzh0OEs4JDj+N7g3ADwAPAA8ADz/O/w7+DvyO+Y71ju/O6E7fDtQOx476DqvOnU6Ojr/OcU5jTlWOSA57Ti7OIw4XjgzOAo4xjd9NwA8ADwAPAA8/zv9O/k78zvpO9o7xTupO4Y7XDsrO/Q6ujp+OkA6AjrFOYk5TjkWOd84qjh4OEg4GjjcN4g3OTcAPAA8ADwAPP87/Tv6O/Q76zvdO8o7sDuOO2U7NjsAO8U6iDpIOgg6yDmJOUs5DznVOJ04Zzg0OAI4pjdLN/U2ADwAPAA8ADz/O/07+jv1O+w73zvNO7Q7lDttOz87CjvROpM6UzoROs85jTlMOQ05zziTOFk4ITjYN3I3EDezNgA8ADwAPAA8/zv9O/o79TvsO987zTu2O5g7cztHOxY73jqiOmI6IDrcOZc5UzkPOc04jDhNOBE4rjc/N9U2cDYAPAA8ADwAPP87/Tv5O/I76TvcO8w7tzucO3s7UzslO/E6tjp3OjQ67jmmOV05FTnOOIg4RDgCOIY3DTeZNis2ADwAPAA8ADz/O/07+jv1O+474zvVO8I7qjuNO2g7PTsKO9E6kjpNOgU6ujltOSA50ziHODw46TdfN9s2XTbmNQA8ADwAPAA8/zv+O/w7+Tv0O+w74TvSO707ozuCO1k7KTvyOrM6bjokOtU5gzkwOd04ijg4ONM3OzerNiI2oTUAPAA8ADwAPP87/zv9O/o79jvwO+c72jvJO7I7lTtyO0Y7EzvXOpM6SDr3OaI5STnuOJQ4OjjHNyA3gTbsNWE1ADzXO/Q79zv1O/I77TvnO9871zvNO8M7uDurO547kDuBO3E7YDtOOzw7KTsWOwI77TrYOsM6rjqZOoQ6bjpZOgA8IzudO8473jvjO+I73zvZO9I7yTu/O7Q7qDubO4w7fTttO1w7Sjs4OyQ7ETv8Ouc60jq9Oqc6kTp8OmY6UDoAPLc7IjtkO5g7tDvBO8Y7xjvCO7w7tDuqO547kTuDO3Q7YztSO0A7LDsYOwQ77jrZOsM6rDqVOn46aDpROjo6ADzxO2A7ITtIO3M7kDugO6g7qjunO6I7mjuPO4M7dTtmO1Y7RDsxOx07CDvyOtw6xTqtOpY6fTplOk06NTocOgA8/Du3Oz47Hzs5O1k7cjuCO4o7jTuLO4U7fTtyO2Q7VTtFOzI7HzsKO/Q63TrGOq06lDp7OmE6SDouOhQ6+jkAPP474DuCOy87HTsuO0Y7WTtnO247cDttO2c7XTtRO0I7MTsfOws79TreOsY6rTqTOnk6XjpDOic6DDrwOdU5ADz/O/E7tztfOyY7GTskOzU7RDtOO1M7UztPO0Y7OzstOxw7Cjv1Ot46xjqtOpM6eDpcOj86IjoFOug5yjmtOQA8ADz4O9Y7kDtIOx87FTsbOyY7MDs2Ozg7NTsvOyQ7FzsGO/M63jrHOq46kzp4Ols6PTofOgE64jnDOaQ5hjkAPAA8+zvnO7Y7cjs5Oxk7DzsROxc7HDseOxw7FzsNOwA77zrcOsY6rjqUOnk6XDo+Oh86/znfOb45njl+OV45ADwAPP078TvPO5g7WzssOxI7CDsGOwc7CDsFOwA79jrpOtk6xTqvOpY6ezpfOkA6IToAOt85vTmcOXo5WDk3OQA8ADz+O/Y74Du1O307SDsiOwo7/zr5OvY68TrrOuE61DrDOq86mDp+OmM6RTolOgQ64jnAOZ05eTlWOTQ5ETkAPAA8/zv5O+o7yjubO2c7OTsXOwE78zrqOuI62TrOOsA6rjqaOoI6ZzpKOis6CjroOcU5oTl9OVg5NDkQOe04ADwAPP87+zvwO9k7tDuEO1M7KjsLO/U65TrYOss6vjquOps6hjptOlE6MzoTOvE5zTmpOYQ5Xjk5ORQ57zjLOAA8ADz/O/079TvkO8Y7nTtuO0E7Gzv9OuY60zrCOrE6nzqLOnM6WTo8Oh06/DnYObQ5jjloOUE5Gzn1ONA4qzgAPAA8ADz+O/g76zvUO7E7hztaOzA7CzvtOtQ6vjqpOpQ6fTpjOkg6KToJOuY5wTmbOXU5TTkmOf842DiyOI44ADwAPAA8/jv6O/A73jvCO5w7cTtGOx07+jrbOr86pTqMOnI6Vjo4Ohg69TnROas5hDlcOTQ5DDnkOL04lzhyOAA8ADwAPP87+zvzO+U7zjuuO4c7XDsxOwk75TrEOqU6iDpqOks6KjoIOuQ5vjmXOW85RjkdOfQ4yzikOH44WTgAPAA8ADz/O/w79jvrO9g7vTuZO3E7RjsbO/M6zTqpOoc6ZTpDOh86+jnUOaw5hDlaOTA5BjndOLQ4jDhmOEI4ADwAPAA8/zv9O/g77zvfO8g7qTuEO1o7LjsDO9k6sTqKOmQ6PToXOu85xjmcOXI5RzkcOfE4xzieOHY4UDgrOAA8ADwAPP87/Tv5O/I75TvSO7Y7lDtsO0E7FDvnOrs6jzplOjs6EDrlObo5jTlhOTQ5CDndOLI4iDhgODo4FjgAPAA8ADz/O/47+zv0O+o72TvBO6I7fTtTOyU79jrHOpc6aTo6Ogw63TmuOYA5UTkjOfU4yDidOHM4SzgkOP83ADwAPAA8/zv+O/s79jvtO987yjuuO4w7Yzs2OwY71DqhOm46OzoJOtc5pTlzOUI5ETniOLQ4hzhcODM4DDjNNwA8ADwAPAA8/jv8O/g78DvjO9E7uDuYO3I7RTsUO+E6qzp1Oj46BzrROZs5ZTkxOf44zDicOG04QDgWONo3jDcAPAA8ADwAPP87/Tv5O/I75zvXO8A7ozt+O1M7IzvuOrY6fDpBOgc6zDmSOVk5ITnrOLY4gzhSOCM46zeVN0I3ADwAPAA8ADz/O/07+TvzO+o72zvHO6w7iTtgOzA7+jrBOoU6RzoJOso5jTlQORU52zijOG04OTgHOK43Ujf7NgA8ADwAPAA8/zv9O/o79TvsO987zDuzO5I7ajs7OwY7zDqOOk46DTrLOYo5SjkMOc44kzhaOCI42jd0NxI3tTYAPAA8ADwAPP87/Tv6O/U77TvhO887uDuZO3I7RTsRO9c6mTpXOhQ60DmMOUk5BjnFOIY4STgOOKo3PTfUNnA2ADwAPAA8ADz/O/47+zv2O+474jvRO7o7nTt4O007GjviOqU6YzofOtk5kjlLOQU5wDh8ODs49jd8Nwc3lzYsNgA8ADwAPAA8/zv9O/o79TvtO+A70Du6O587fTtVOyY78Dq0OnQ6LzrnOZ05UzkIOb44dTgvONU3UTfTNlo26DUAPAA8ADz/O/47+zv3O/I76jvgO9E7vzunO4k7ZDs4OwU7yzqLOkU6+zmuOV85EDnAOHI4Jji3Nyg3oDYfNqU1ADwAPAA8ADz/O/47/Dv5O/M76zvgO9A7uzugO347VDsjO+s6qzpkOhg6yDl0OR85yTh0OCE4oTcGN3M26TVmNQA8ADwAPAA8/zv/O/07+jv2O/A75jvZO8g7sTuUO287QjsNO9A6ijo9Ouk5kTk2Odk4fTgiOJQ36zZMNrY1LDUAPNg79Dv4O/c79DvwO+w75jvfO9g7zzvGO7w7sjumO5o7jjuAO3I7YztUO0Q7NDsjOxI7ATvvOt06yzq5Oqc6ADwjO547zzvfO+U75jvkO+A72jvTO8s7wzu5O647ozuXO4o7fDtuO187Tzs/Oy47HTsLO/o65zrVOsM6sDqeOgA8tzsiO2Q7mju2O8Q7yjvMO8o7xjvAO7g7rzulO5k7jTuAO3E7YjtTO0I7MTsgOw07+zroOtU6wTquOpo6hjoAPPE7YDshO0k7dTuSO6Q7rTuxO7E7rTunO6A7ljuLO387cTtiO1M7QjsxOx87DDv4OuQ60Dq7OqY6kTp8Omc6ADz8O7c7PjsgOzo7XDt2O4c7kTuVO5U7kjuMO4Q7eTttO187UDtAOy47HDsJO/Q64DrKOrQ6njqHOnA6WTpCOgA8/jvgO4I7LzseOzA7STteO207djt6O3k7dTtuO2U7WTtLOzw7KzsYOwU78DraOsQ6rTqVOn06ZDpLOjM6GToAPP878Tu3O187JzsbOyc7OTtJO1U7XDteO1w7VjtOO0I7NTslOxM7ADvrOtY6vjqmOo46dDpaOkA6JToKOu85ADwAPPg71juQO0k7ITsXOx47Kzs2Oz47QjtCOz47NjsrOx07DTv7Ouc60Tq6OqE6iDptOlI6NjoaOv054TnEOQA8ADz8O+c7tjtyOzo7GzsSOxU7HDsjOyc7KDskOx07EzsFO/U64jrNOrY6njqEOmk6TTowOhI69DnVObc5mTkAPAA8/TvxO9A7mDtcOy47FDsLOws7DTsQOxA7DDsFO/s67TrdOsk6tDqcOoI6ZjpKOiw6DTruOc45rjmOOW45ADwAPP479jvgO7U7fjtKOyM7DTsDO/86/Tr7OvY67zrkOtY6xTqxOpo6gTpmOkk6KzoLOus5yjmpOYc5ZTlEOQA8ADz/O/k76jvLO5w7aDs6Oxk7BDv4OvA66jrjOto6zzrAOq46mTqBOmc6SzotOg067DnKOac5hDlhOT85HDkAPAA8/zv7O/E72Tu0O4U7VTssOw47+TrqOt861TrJOrw6rDqYOoI6ajpOOjA6ETrwOc05qjmGOWE5PTkZOfY4ADwAPP87/Tv1O+Q7xjudO287QzseOwE76zraOss6vDqsOpo6hTptOlM6NjoXOvY51DmwOYs5ZjlAORs59jjROAA8ADwAPP47+DvrO9Q7sjuIO1s7MjsOO/I62jrGOrI6nzqKOnM6Wjo+OiA6/zndObk5kzltOUc5IDn6ONQ4rzgAPAA8ADz+O/o78DveO8I7nTtyO0g7IDv9OuA6xTquOpY6fjpkOkk6KzoLOuk5xTmfOXg5UTkpOQI52zi0OI44ADwAPAA8/zv7O/Q75TvPO687iDtdOzM7DTvpOso6rTqROnU6WDo6Oho69znTOa45hzlfOTY5DTnlOL04ljhwOAA8ADwAPP87/Dv2O+s72Du9O5o7cjtIOx479zrSOrA6jzpvOk86LToKOuY5wDmYOW85RjkcOfI4yTihOHk4UzgAPAA8ADz/O/07+DvvO+A7yTuqO4U7WzsxOwY73jq3OpE6bTpIOiM6/TnWOa05gzlZOS45AznYOK44hThdODY4ADwAPAA8/zv9O/o78jvlO9I7tzuVO247QzsXO+s6wDqWOm06RDobOvI5xzmcOXA5QzkXOeo4vziUOGo4QTgaOAA8ADwAPP87/jv7O/Q76jvZO8I7ozt+O1U7KDv6Osw6njpwOkM6FTroObo5izldOS45/zjROKQ4eDhNOCQ4+TcAPAA8ADz/O/47+zv2O+073zvLO687jTtlOzg7CTvYOqY6dDpDOhE63zmtOXs5STkXOeY4tjiHOFk4LDgCOLE3ADwAPAA8ADz+O/w7+DvwO+Q70ju5O5o7cztIOxg75TqwOno6RDoOOtc5oTlrOTU5ADnMOJk4Zzg3OAk4uDdiNwA8ADwAPAA8/zv9O/k78jvnO9c7wTukO4A7VjsmO/I6uzqCOkg6DTrSOZg5XjkkOew4tTh/OEo4FzjNN283FTcAPAA8ADwAPP87/Tv6O/Q76jvcO8g7rTuMO2M7NDv/OsY6izpNOg860DmROVM5FjnaOKA4ZzgvOPQ3jTcqN8s2ADwAPAA8ADz/O/07+jv1O+w73zvNO7U7lTtuO0A7CzvSOpU6VToTOtA5jjlMOQs5zDiNOFE4Fzi8N1A35zaDNgA8ADwAPAA8/zv9O/s79jvuO+I70Tu6O5w7dztKOxY73TqfOl06GTrUOY45SDkEOcA4fjg+OAA4iDcVN6c2PjYAPAA8ADwAPP87/jv7O/Y77zvkO9Q7vjuhO307UjsgO+c6qTpnOiI62jmROUg5ADm4OHI4LjjXN1g33jZpNvk1ADwAPAA8ADz/O/47+zv2O+875DvUO787pDuCO1k7KTvzOrY6dDouOuU5mTlNOQA5tDhpOCA4szcrN6k2LTa3NQA8ADwAPAA8/zv9O/k78zvrO+A70ju/O6c7iTtkOzc7BDvJOog6Qjr3Oag5WDkHObU4ZTgXOJY3BDd5NvU1eTUAPAA8ADwAPP87/jv8O/g78jvqO947zTu4O5w7ejtQOx875jqlOl46ETq/OWo5Ezm8OGY4ETh/N+I2TjbBNT41ADwAPAA8ADz/O/87/Tv6O/Y78DvmO9k7yDuwO5I7bTs/Owk7yjqCOjQ63zmFOSg5yjhtOBE4cDfHNic2kjUHNQA82Dv0O/k7+Dv3O/Q78DvrO+Y74DvaO9M7yzvDO7o7sDumO5w7kDuFO3k7bDtfO1I7RDs2Oyg7GTsKO/w67ToAPCM7njvPO+E75zvpO+g75TvhO9w71jvPO8c7vzu2O607ojuXO4w7gDt0O2c7WTtLOz07LzsgOxE7AjvyOuM6ADy3OyI7ZTubO7g7xzvOO9E70TvOO8o7xDu9O7U7rDuiO5g7jDuAO3Q7ZjtYO0o7OzssOxw7DDv8Ous62zrKOgA88TtgOyI7Sjt3O5U7pzuyO7c7uDu3O7M7rTumO507kzuJO307cDtiO1Q7RTs1OyU7FDsDO/E64DrNOrs6qDoAPPw7tzs/OyA7OzteO3k7izuXO507njudO5k7kzuLO4E7djtqO1w7Tjs+Oy47HTsLO/g65jrSOr46qjqWOoE6ADz+O+A7gjswOx87MTtLO2I7cjt9O4I7gzuBO307dTtsO2E7VDtGOzY7JjsUOwE77jraOsU6rzqaOoQ6bTpXOgA8/zvxO7c7XzsnOxw7KTs8O047WztjO2c7ZztkO147VTtKOzw7LTsdOws7+DrkOs86uTqiOos6czpbOkI6KjoAPAA8+DvWO5E7STsiOxk7ITsuOzs7RTtLO0w7SjtFOzw7MTskOxQ7AzvwOts6xTquOpc6fjplOks6MToWOvs5ADwAPPw76Du2O3M7OjscOxQ7GDshOyk7LzsxOzA7KzsjOxg7Cjv6Oug60zq9OqY6jjp0Olk6PjoiOgY66TnNOQA8ADz9O/E70DuYO1w7LzsWOw47DzsTOxY7GDsXOxI7Cjv/OvA64DrMOrc6oDqHOm06UTo1Ohc6+jnbOb05nzkAPAA8/jv2O+A7tjt+O0o7JTsPOwY7AzsDOwI7ADv6OvI65jrXOsY6sTqbOoI6aDpMOi86EDrxOdI5sjmROXE5ADwAPP87+TvqO8s7nDtpOzs7GzsHO/w69TrxOuw65TrbOs86vzqsOpc6fzplOkk6LDoNOu05zDmrOYk5ZzlFOQA8ADz/O/s78TvaO7Q7hTtWOy47EDv8Ou865TrcOtM6xzq5Oqg6lDp+OmU6STosOgw67DnKOag5hTlhOT45GzkAPAA8/zv9O/U75DvHO547cDtEOyA7BDvvOt860TrEOrY6pjqTOn46ZjpLOi46DzruOcw5qTmFOWA5OzkXOfI4ADwAPAA8/jv4O+s71DuyO4g7XDszOxE79TrfOsw6ujqoOpU6gDppOk86MzoUOvQ50TmtOYg5Yzk9ORc58TjMOAA8ADwAPP47+jvwO947wjudO3M7STsiOwA75DrLOrQ6njqIOnA6Vzo7Ohw6/DnZObU5kDlpOUI5Gzn0OM04pzgAPAA8ADz/O/s79DvmO887rzuIO187NTsPO+06zzqzOpg6fjpjOkY6KDoHOuU5wDmaOXM5SzkjOfs40jiqOIM4ADwAPAA8/zv8O/Y76zvYO747mztzO0k7IDv6OtY6tTqWOnc6WDo4Ohc69DnPOak5gTlYOS45BTnbOLI4iThhOAA8ADwAPP87/Tv4O+874DvJO6s7hjtdOzM7CTvhOrs6lzp0OlE6LToIOuI5uzmSOWg5PTkSOec4vDiROGg4PzgAPAA8ADz/O/07+jvyO+Y70ju4O5Y7bztFOxk77jrEOps6czpMOiQ6+znSOac5ezlPOSI59TjIOJw4cDhGOB04ADwAPAA8/zv+O/s79TvqO9o7wjukO387VjsqO/w6zzqiOnU6STocOu85wjmTOWU5NTkGOdY4pzh5OEw4IDjrNwA8ADwAPP87/jv7O/Y77TvfO8s7sDuOO2Y7OjsLO9s6qjp5Okg6FjrlObM5gTlOORs56Ti2OIU4VDglOO43lTcAPAA8ADwAPP47/Dv4O/A75DvSO7o7mzt1O0o7GjvoOrQ6fzpJOhQ63TmnOXA5OjkEOc44mThkODE4/zefN0M3ADwAPAA8ADz/O/07+TvyO+g72DvCO6U7gjtYOyk79jq/Ooc6TjoTOtg5njljOSg57ji1OH04RjgQOLk3VTf0NgA8ADwAPAA8/zv9O/o79DvqO9w7yTuvO407ZTs3OwM7yzqQOlM6FTrWOZc5WDkZOdw4nzhkOCo44zd2Nw03qDYAPAA8ADwAPP87/Tv6O/U77TvgO847tjuXO3E7QzsQO9c6mjpbOhk61jmTOVA5DTnMOIs4TTgQOKk3NzfJNl82ADwAPAA8ADz/O/47+zv2O+474zvTO7w7nzt6O047HDvjOqU6YzofOtg5kjlLOQQ5vzh7ODg47zdzN/o2hzYZNgA8ADwAPAA8/zv+O/s79zvwO+U71jvAO6U7gjtXOyY77TqvOmw6JjreOZQ5STn/OLU4bTgnOMU3QTfCNkk21jUAPAA8ADwAPP87/jv7O/c78DvmO9c7wzuoO4c7XzsvO/g6uzp4OjE65zmaOUw5/jiwOGM4GTigNxU3jzYQNpc1ADwAPAA8ADz/O/47+zv2O+475DvVO8I7qjuLO2Y7OTsGO8s6iTpCOvY5pjlVOQI5sDheOA44gjfuNmA22jVcNQA8ADwAPAA8/zv+O/s79zvxO+g72zvLO7U7mjt3O047HDvjOqI6WjoMOro5ZDkNObQ4XTgIOGo3zDY1Nqg1JDUAPAA8ADwAPP87/zv9O/o79jvvO+Y72TvHO687kTtrOzw7BTvFOn06LTrXOXw5HjnAOGE4BThYN642DjZ5NfA0ADzYO/U7+Tv6O/g79jvzO/A77DvoO+M73TvXO9E7yjvDO7s7szuqO6E7mDuOO4Q7ejtvO2Q7WDtNO0E7NTspOwA8IzueO9A74jvpO+s76zvqO+c74zvfO9k71DvNO8Y7vzu3O687pjucO5M7iDt+O3M7aDtcO1A7RDs4Oyw7HzsAPLc7IztlO5w7uTvJO9I71TvWO9U70jvOO8k7wzu8O7Q7rDujO5k7jzuFO3o7bjtiO1Y7STs8Oy47ITsTOwU7ADzxO2A7IjtLO3g7lzuqO7Y7vDu/O787vTu5O7M7rTulO5w7kzuJO307cjtlO1g7Szs9Oy87IDsROwE78jriOgA8/Du3Oz87ITs8O187ezuPO5s7ozumO6Y7pDugO5k7kjuJO387dDtoO1s7TTs/OzA7IDsQO/867jrdOss6uToAPP474DuCOzA7HzsyO007ZTt2O4I7iTuMO4w7iTuDO3w7cztoO107TztBOzI7IjsROwA77jrbOsg6tDqgOow6ADz/O/E7tztfOyg7HTsrOz87UTtgO2o7bztxO287aztkO1s7UDtDOzU7JjsVOwM78TrdOsk6tDqfOok6czpcOgA8ADz4O9Y7kTtKOyI7GjsjOzI7QDtLO1I7VTtVO1E7SjtBOzY7KTsaOwk79zrjOs86ujqjOow6dTpdOkQ6KzoAPAA8/DvoO7c7czs7Ox07FjsbOyU7Ljs1Ozk7Ojs2OzA7JzsbOw07/TrrOtg6wzqsOpU6fTpkOko6MDoVOvo5ADwAPP078TvQO5k7XTswOxg7EDsSOxc7HDsfOx87HDsWOw07ATvyOuE6zjq5OqI6ijpwOlY6OzofOgM65jnJOQA8ADz+O/Y74Du2O387SzsmOxE7CDsHOwg7CTsHOwQ7/TrzOuY61zrFOrA6mjqBOmc6TDowOhM69TnWObc5mDkAPAA8/zv5O+o7yzudO2k7PDscOwk7/zr6OvY68zrtOuU62zrNOrw6qTqTOns6YTpFOig6CjrrOcs5qzmKOWk5ADwAPP87+zvxO9o7tTuGO1Y7LzsSO/868jrqOuI62jrQOsQ6tTqjOo46dzpdOkI6JDoFOuU5xDmiOYA5Xjk7OQA8ADz/O/079TvkO8c7njtxO0U7ITsGO/I64zrXOss6vjqwOp86izp1Olw6QTojOgQ64znCOZ85ezlXOTM5DzkAPAA8ADz+O/g76zvUO7M7iTtdOzU7Ezv4OuI60DrAOrA6njqLOnU6XTpCOiU6BjrlOcM5nzl6OVU5LzkKOeQ4ADwAPAA8/jv6O/A73jvDO547dDtKOyQ7AzvnOs86uTqlOpA6ejphOkc6KjoLOuo5xzmjOX05VzkwOQk54ji7OAA8ADwAPP87+zv0O+Y7zzuwO4k7YDs3OxE78DrSOrc6njqFOms6UDozOhQ68jnPOao5hDldOTU5DDnkOLs4lDgAPAA8ADz/O/w79jvrO9k7vjubO3Q7SzsiO/w62Tq5Ops6fjpgOkE6ITr/Ods5tTmOOWY5PTkTOek4vziVOG04ADwAPAA8/zv9O/g77zvgO8k7qzuGO147NDsLO+Q6vzqcOnk6Vzo0OhA66znEOZw5czlIOR058TjFOJo4bzhFOAA8ADwAPP87/Tv6O/I75jvTO7g7lztwO0Y7GzvwOsc6nzp4OlE6KToBOtg5rjmDOVY5KTn7OM04nzhyOEU4GjgAPAA8ADz/O/47+zv1O+o72jvDO6U7gDtXOys7/jrROqU6eTpNOiE69DnHOZk5ajk6OQk52DioOHg4SDgaONk3ADwAPAA8/zv+O/w79jvtO+A7yzuwO487Zzs8Ow073TqtOn06TDobOuo5uDmGOVM5HznsOLg4hThSOCA44DeCNwA8ADwAPAA8/jv8O/g78DvkO9M7ujubO3Y7SzscO+s6tzqDOk46GTrjOaw5djk/OQc50DiaOGQ4Ljj1N5A3LjcAPAA8ADwAPP87/Tv5O/I76DvYO8M7pjuDO1o7Kzv5OsM6izpSOhg63jmjOWg5LTnyOLc4fThEOA04rTdDN942ADwAPAA8ADz/O/07+jv0O+s73TvKO7A7jztnOzk7BjvPOpU6WTobOtw5nDldOR453zihOGM4JzjaN2g3+zaRNgA8ADwAPAA8/zv9O/o79TvtO+E7zzu3O5k7cztGOxQ73DqgOmA6HzrcOZg5VTkROc44jDhMOAw4njcoN7U2RzYAPAA8ADwAPP87/jv7O/Y77zvkO9Q7vjuhO307UjsgO+g6qjppOiU63jmXOU85BznAOHs4NjjoN2c36zZ0NgI2ADwAPAA8ADz/O/47+zv3O/A75jvXO8M7qDuGO1w7KzvzOrY6czosOuM5mDlNOQE5tjhtOCQ4vTc2N7Q2NzbBNQA8ADwAPAA8/zv+O/w7+DvxO+c72TvGO6w7jDtkOzU7/jrBOn46NjrrOZ45Tzn/OLA4YjgWOJg3CTeBNv81hDUAPAA8ADwAPP87/jv7O/c78TvnO9k7xjuuO487ajs9Owk7zjqMOkQ6+DmoOVU5AjmuOFs4Cjh4N+I2UjbLNUs1ADwAPAA8ADz+O/07+Tv1O+475TvZO8k7szuYO3Y7TTsbO+I6oTpZOgs6uDliOQk5sThYOAI4Xje/Nig2mjUVNQA8ADwAPAA8/zv/O/07+jv2O+875jvZO8Y7rzuQO2k7OjsCO8E6eDooOtE5djkYObk4Wjj7N0k3nzYANms14jQAPNg79Tv6O/s7+jv4O/Y79DvxO+476jvmO+I73TvYO9I7zTvGO8A7uTuyO6s7ozubO5M7izuCO3k7cDtnO147ADwjO5470DvjO+o77jvuO+477DvpO+Y74jveO9k71DvOO8g7wju7O7Q7rTulO507lDuMO4M7eTtwO2Y7XTtTOwA8tzsjO2U7nDu7O8s71DvZO9s72zvZO9Y70zvOO8k7wzu9O7Y7rzunO547lTuMO4M7eTtvO2Q7WTtOO0M7NzsAPPE7YTsiO0s7eTuZO607uTvBO8Q7xjvFO8I7vju5O7M7rTulO507lDuLO4A7djtrO187UztHOzs7LjsgOxM7ADz8O7c7PzshOz07YTt9O5I7nzuoO6w7rjutO6o7pjugO5k7kTuIO347cztnO1s7TjtBOzM7JTsWOwc7+DroOgA8/jvgO4I7MDsgOzQ7TztnO3o7hzuPO5M7lDuTO487iTuCO3k7bztkO1g7Szs9Oy87IDsQO/867jrdOss6uToAPP878Tu3O2A7KDseOyw7QTtUO2Q7bzt2O3k7eDt2O3A7aTtgO1U7STs8Oy07HjsNO/w66jrXOsQ6sDqcOoc6ADwAPPg71juRO0o7IzsbOyU7NDtDO087VztcO107WztWO087RTs6Oyw7HjsOO/w66jrXOsI6rTqYOoI6azpUOgA8ADz8O+g7tztzOzw7HjsXOx07KDsyOzo7QDtBO0A7Ozs0Oyo7HTsPO/867TraOsY6sTqaOoM6azpSOjk6IDoAPAA8/TvxO9A7mTtdOzA7GTsSOxQ7GjshOyU7JjslOyA7GDsOOwE78TrgOs06uDqiOoo6cjpYOj46IzoIOuw5ADwAPP479jvgO7Y7fztMOyc7EzsLOwo7DDsOOw47CzsGO/468jrkOtQ6wTqsOpY6fjpkOko6LjoROvQ51zm5OQA8ADz/O/k76jvLO507ajs9Ox47CzsBO/06+zr4OvQ67jrkOtg6yTq3OqM6jTp0Olo6PzoiOgQ65TnGOac5hzkAPAA8/zv7O/E72ju1O4Y7VzswOxM7ATv1Ou465zrgOtg6zTq/Oq46mzqGOm46Uzo4Oho6+znbObs5mTl4OVY5ADwAPP87/Tv1O+Q7xzufO3E7RjsjOwg79DrmOts60DrFOrc6qDqWOoE6aTpQOjQ6Fjr2OdU5szmROW45SjkmOQA8ADwAPP47+DvrO9Q7szuJO147NjsUO/o65TrUOsU6tTqlOpM6fzpoOk46MzoVOvU50zmxOY05aDlDOR45+DgAPAA8ADz+O/o78DveO8M7njt1O0s7JTsEO+k60jq9Oqo6ljqBOmo6UDo1Ohc69znVObI5jTlnOUA5GjnzOMw4ADwAPAA8/zv7O/Q75jvPO7A7ijtgOzg7EzvyOtU6uzqiOoo6cTpXOjs6HTr9Odo5tjmQOWo5QjkZOfE4yDigOAA8ADwAPP87/Dv2O+s72Tu+O5w7dTtLOyM7/jrcOrw6nzqCOmU6RzooOgY64zm+OZg5cDlHOR058jjIOJ44dDgAPAA8ADz/O/07+DvvO+A7yjurO4c7Xjs1Oww75jrBOp46fTpbOjk6FjrxOco5ojl5OU45Ijn2OMk4nThxOEU4ADwAPAA8/zv9O/o78jvmO9M7uDuXO3A7RzscO/I6yTqhOno6VDotOgY63TmzOYc5WjksOf44zzigOHE4QzgVOAA8ADwAPP87/jv7O/U76jvaO8M7pTuBO1g7LDsAO9M6pzp8OlA6JTr5Ocs5nTluOT45DTnbOKk4eDhHOBY4zjcAPAA8ADz/O/47/Dv2O+474DvMO7E7jztoOz07DzvfOrA6gDpQOh867zm9OYs5WDkkOe84uziGOFI4HjjYN3U3ADwAPAA8ADz+O/w7+DvwO+Q70zu7O5w7dztNOx477Tq6OoY6UjodOuc5sTl7OUM5DDnUOJw4ZTguOPA3hzchNwA8ADwAPAA8/zv9O/k78jvoO9k7wzunO4Q7WzstO/s6xjqPOlc6HTrjOag5bTkyOfY4uzh/OEU4DDinNzo30DYAPAA8ADwAPP87/Tv6O/Q76zvdO8o7sDuQO2k7PDsJO9M6mTpdOiA64TmiOWI5IjnjOKQ4ZTgoONc3YjfwNoM2ADwAPAA8ADz/O/07+jv1O+074TvQO7g7mjt1O0k7FzvgOqQ6ZTokOuI5njlaORY50jiPOE04DTibNyE3rDY6NgA8ADwAPAA8/zv+O/s79jvvO+Q71Tu/O6M7gDtVOyQ77TqwOm86KzrlOZ05VTkMOcU4fjg4OOk3ZTfmNms29zUAPAA8ADwAPP87/jv7O/c78TvnO9g7xDuqO4k7YDswO/k6vDp5OjM66jmfOVI5Bjm6OG84Jji9NzM3rzYwNrc1ADwAPAA8ADz/O/47/Dv4O/I76DvbO8g7rzuQO2k7OjsEO8c6hDo8OvE5ozlTOQM5szhkOBY4lzcGN3w2+DV7NQA8ADwAPAA8/zv+O/w7+DvyO+k73DvKO7I7lDtvO0I7DjvTOpE6SDr7Oas5WDkDOa84XDgKOHU33TZNNsQ1QzUAPAA8ADwAPP87/Tv6O/U77jvlO9k7yTu0O5k7dztOOxw74zqiOlo6Czq4OWE5CTmvOFc4ADhZN7k2ITaSNQ01ADwAPAA8ADz/O/87/Tv6O/Y77zvmO9g7xjuuO487aDs4OwA7vzp1OiQ6zTlyORQ5tThWOPM3QTeYNvg1ZDXaNAA82Dv1O/o7+zv7O/o7+Tv3O/U78zvwO+076jvnO+M73zvbO9Y70jvNO8g7wju9O7c7sTurO6Q7njuXO5A7iTsAPCM7njvRO+Q77DvvO/E78TvwO+477DvpO+Y74zvfO9s71jvSO807xzvCO7w7tjuwO6k7ojucO5Q7jTuGO347ADy3OyM7ZjudO7w7zTvXO9w73zvfO9873TvbO9g71DvQO8s7xTvAO7o7szusO6U7njuWO447hTt9O3Q7aztiOwA88TthOyI7TDt6O5o7rzu8O8Q7yTvLO8s7yjvHO8Q7vzu6O7Q7rjumO587lzuOO4U7eztyO2g7XTtSO0c7PDsAPPw7tzs/OyI7PjtiO387lDuiO6w7sTu0O7Q7szuwO6s7pjufO5g7jzuGO307cjtoO1w7UDtEOzg7KzsdOxA7ADz+O+A7gjsxOyE7NDtQO2k7fTuKO5M7mTubO5s7mDuUO447hzt/O3U7aztgO1Q7Rzs6Oyw7HTsOO/867zrfOgA8/zvxO7c7YDspOx87LTtDO1c7ZztzO3s7fzuAO347ejt0O207ZDtZO007QTszOyQ7FTsEO/M64jrQOr46qzoAPAA8+DvXO5E7SjskOxw7Jjs2O0Y7UztcO2I7ZDtjO187WTtRO0c7PDsvOyA7EDsAO+462zrIOrQ6oDqLOnY6ADwAPPw76Du3O3Q7PDsfOxg7HzsqOzU7PztFO0c7RztEOz07NTsqOx07Dzv/Ou062jrHOrI6nDqGOm86Vzo/OgA8ADz9O/E70DuZO107MTsaOxM7FjsdOyQ7KTssOys7KDshOxg7DTv/Ou863TrKOrU6nzqIOnA6Vzo9OiM6CToAPAA8/jv2O+A7tjt/O0w7KDsUOww7DDsPOxI7EzsROw07Bjv8Ou864DrPOrs6pjqQOnc6XjpEOig6DTrwOdM5ADwAPP87+TvqO8s7nTtqOz47HzsMOwM7ADv+Ov06+Tr0Ouw64TrTOsI6rzqaOoM6azpQOjU6GDr7Odw5vjmfOQA8ADz/O/s78TvaO7U7hjtYOzE7FTsDO/g68TrrOuU63TrTOsc6tzqlOpE6ejphOkY6KjoMOu05zjmtOYw5azkAPAA8/zv9O/U75DvHO587cjtHOyQ7CTv2Ouk63jrUOso6vTqvOp46ijpzOls6QDojOgU65TnEOaI5fzlcOTk5ADwAPAA8/jv4O+s71TuzO4o7Xjs3OxY7+zrnOtc6yDq6Oqo6mTqGOnA6Vzo8OiA6ATrgOb45mzl3OVI5LTkIOQA8ADwAPP47+jvwO947wzufO3U7TDsmOwY76zrUOsA6rTqaOoY6cDpXOj06IDoAOt85vDmYOXI5TDkmOf841zgAPAA8ADz/O/s79DvmO887sDuKO2E7OTsUO/M61zq9OqU6jjp2Olw6QTojOgQ64jm+OZk5cjlLOSI5+TjQOKg4ADwAPAA8/zv8O/Y76zvZO747nDt1O0w7JDv/Ot06vjqhOoQ6aDpLOiw6CzroOcM5nTl1OUw5ITn2OMs4oDh1OAA8ADwAPP87/Tv4O+874DvKO6w7hztfOzU7DTvnOsI6oDp/Ol06PDoZOvQ5zjmmOXw5UTklOfg4yzidOHA4QzgAPAA8ADz/O/47+jvyO+Y70zu4O5c7cTtHOx078zrKOqM6fTpXOjA6CTrgObY5izleOTA5ATnROKE4cThBOBI4ADwAPAA8/zv+O/s79TvqO9o7wzulO4E7WTstOwE71TqpOn46UzooOvw5zzmhOXI5QjkQOd44rDh5OEc4FTjINwA8ADwAPP87/jv8O/Y77jvgO8w7sTuQO2k7PjsQO+E6sjqCOlM6IzryOcE5jzlcOSg58zi+OIg4UzgeONU3bzcAPAA8ADwAPP47/Dv4O/A75DvTO7s7nTt4O047IDvvOr06iTpVOiE67Dm2OX85SDkQOdg4nzhnOC848DeENxo3ADwAPAA8ADz/O/07+TvyO+g72TvEO6g7hTtdOy87/TrJOpI6WjohOug5rTlyOTc5+zi/OIM4RzgNOKc3NzfKNgA8ADwAPAA8/zv9O/o79DvrO947yzuxO5E7ajs+Oww71jqdOmE6JDrmOac5aDkoOeg4qDhpOCo42jdiN+42fjYAPAA8ADwAPP87/Tv7O/Y77jviO9A7uTucO3c7SzsaO+M6qDpqOio66DmkOWA5HDnYOJQ4UTgQOJ83IzeqNjY2ADwAPAA8ADz/O/47+zv3O+875TvVO8A7pDuCO1g7JzvxOrU6dDoxOus5ozlbORI5yjiCODw47jdoN+c2azbzNQA8ADwAPAA8/zv+O/w79zvxO+c72TvGO6w7iztjOzQ7/TrBOn86OTrwOaU5WDkMOb84czgpOMI3NjewNi82tDUAPAA8ADwAPP87/jv8O/g78jvpO9w7yjuyO5M7bDs+Owk7zTqKOkI69zmpOVg5CDm3OGc4GTiaNwg3fDb3NXk1ADwAPAA8ADz/O/47/Dv4O/M76jveO8w7tTuYO3M7RzsTO9g6ljpNOgA6rzlcOQc5sjheOAs4dzfeNkw2wjVANQA8ADwAPAA8/zv+O/s79zvxO+g72zvLO7Y7mzt5O1A7HzvlOqQ6XDoNOro5YzkKObA4VzgBOFk3uDYgNpA1CzUAPAA8ADwAPP87/zv9O/o79jvvO+Y72DvFO607jjtmOzc7/jq9OnM6IjrMOXA5EjmzOFU48Tc/N5U29jVhNdg0ADzYO/U7+zv8O/w7/Dv7O/o7+Dv3O/U78zvxO+477DvpO+Y74zvgO9w72TvVO9E7zTvJO8U7wDu7O7c7sjutOwA8IzufO9E75DvtO/E78zvzO/M78jvxO+877TvqO+g75TviO9472zvXO9M7zzvKO8Y7wTu8O7c7sjusO6c7oTsAPLc7IztmO547vTvOO9g73jviO+M74zvjO+E73zvcO9k71jvSO807yTvEO787uTuzO607pzugO5o7kzuLO4Q7ADzxO2E7IztMO3o7mzuwO747xzvMO8870DvQO847zDvJO8U7wDu7O7U7rzuoO6E7mjuSO4o7gTt5O3A7ZztdOwA8/Du3Oz87Ijs+O2M7gDuWO6U7rzu1O7k7uju5O7c7tDuwO6o7pDudO5Y7jjuFO3w7cjtoO107UjtHOzs7LzsAPP474TuCOzE7ITs1O1I7azt/O407lzudO6A7oTufO5w7mDuSO4s7gzt6O3A7ZTtaO047Qjs1Oyc7GjsLO/06ADz/O/E7tztgOyk7HzsuO0Q7WTtqO3Y7fzuEO4Y7hTuCO307dztvO2Y7WztQO0M7NjsoOxk7Cjv6Ouo62TrHOgA8ADz4O9c7kTtLOyQ7HTsnOzg7SDtWO2A7ZjtpO2k7ZztiO1s7UjtHOzw7LjsgOxE7ADvvOt06yzq4OqQ6kDoAPAA8/DvoO7c7dDs8Ox87GTsgOyw7ODtCO0k7TDtNO0o7RTs+OzQ7KDsbOww7/DrqOtg6xDqwOps6hTpvOlg6ADwAPP078TvQO5k7XjsyOxs7FDsYOx87JzstOzA7MTsuOyg7IDsWOwk7+jrpOtc6xDqvOpk6gjpqOlI6OTogOgA8ADz+O/Y74Du2O4A7TTsoOxU7DjsOOxE7FTsWOxY7EjsMOwM79zrpOtk6xzqzOp06hjpuOlQ6OjofOgQ66DkAPAA8/zv5O+o7yzudO2o7PjsfOw07BTsCOwE7ADv9Ovk68TrnOto6yzq5OqU6jzp3Ol46QzonOgs67TnPObE5ADwAPP87+zvxO9o7tTuHO1g7MTsWOwQ7+TrzOu466DrhOtg6zDq+Oq06mTqDOms6UTo2Ohk6+zncObw5nDl7OQA8ADz/O/079TvkO8c7nztyO0c7JDsKO/g66zrgOtc6zTrBOrQ6ozqQOns6YzpJOi06DzrwOc85rjmMOWk5RjkAPAA8ADz+O/g76zvVO7M7ijtfOzc7Fjv9Ouk62TrKOr06rjqdOoo6dTpdOkM6JzoJOuk5xzmkOYE5XDk3ORI5ADwAPAA8/jv6O/A73zvDO587dTtMOyc7BzvsOtY6wjqwOp06iTp0Olw6QjolOgY65TnDOZ85ejlUOS05BjneOAA8ADwAPP87+zv0O+Y7zzuwO4o7YTs5OxQ79DrYOr46pzqQOng6XzpEOiY6BzrlOcI5nTl2OU45JTn8ONM4qTgAPAA8ADz/O/w79jvrO9k7vjucO3U7TDskO/863jq/OqI6hjpqOk06LjoNOus5xjmgOXg5TjkjOfg4zDigOHQ4ADwAPAA8/zv9O/g77zvgO8o7rDuHO187NjsOO+g6xDqhOoA6Xzo+Ohs69znROak5fzlUOSg5+zjNOJ44cDhCOAA8ADwAPP87/jv6O/I75jvTO7k7mDtxO0g7Hjv0Osw6pDp+Olk6MzoMOuM5ujmOOWE5MzkEOdM4ozhyOEE4ETgAPAA8ADz/O/47+zv1O+o72jvDO6Y7gjtZOy47AjvWOqs6gDpVOis6/znTOaU5djlFORQ54TiuOHs4SDgVOMY3ADwAPAA8/zv+O/w79jvuO+A7zDuxO5A7ajs/OxE74zq0OoQ6VTomOvY5xTmTOWA5LDn3OME4izhVOCA41TdtNwA8ADwAPAA8/jv8O/g78DvlO9M7vDudO3k7TzshO/E6vzqMOlg6JDrvObo5gzlMORQ53DijOGo4MTjzN4U3GTcAPAA8ADwAPP87/Tv5O/M76DvZO8Q7qDuGO147MDv/Oss6lTpeOiU67DmyOXc5OzkAOcM4hzhLOBA4qzc5N8o2ADwAPAA8ADz/O/07+jv0O+s73jvLO7I7kjtsOz87DjvYOqA6ZTopOus5rDltOS057TitOG04LjjhN2c38TZ/NgA8ADwAPAA8/zv9O/s79jvuO+I70Tu6O507eDtNOxw75jqsOm46LjrtOao5ZjkiOd04mThWOBQ4pjcoN642ODYAPAA8ADwAPP87/jv7O/c78DvlO9Y7wTumO4M7WjsqO/Q6uDp5OjY68DmpOWE5GDnQOIg4QTj3N2837DZuNvU1ADwAPAA8ADz/O/47/Dv4O/E76DvaO8c7rTuNO2Y7NzsBO8U6hDo+OvY5qzleORE5xDh4OC44yjc8N7Q2Mja2NQA8ADwAPAA8/zv+O/w7+DvyO+o73TvLO7Q7lTtvO0I7DTvROo86SDr9Oa45XjkNObw4azgdOKE3DTeANvk1ejUAPAA8ADwAPP87/jv8O/k78zvrO987zju4O5s7dztLOxg73TqbOlI6BTq0OWA5Czm2OGE4Djh8N+I2TzbENUI1ADwAPAA8ADz/O/47/Dv4O/M76jveO847uTueO3w7UzsiO+g6pzpfOhA6vTlmOQw5szhZOAI4XDe6NiE2kjUMNQA8ADwAPAA8/zv/O/07+jv2O+875TvYO8U7rDuNO2U7Njv9Orw6czoiOss5cDkSObM4VTjxNz83ljb3NWI12TQAPNg79Tv7O/w7/Tv9O/w7/Dv7O/o7+Tv3O/Y79DvzO/E77zvtO+s76TvmO+Q74TveO9w72TvWO9M70DvMO8k7ADwjO5870TvlO+078jv0O/U79Tv1O/Q78zvyO/A77zvtO+o76DvmO+M74DvdO9o71zvUO9A7zTvJO8U7wTu9OwA8tzsjO2Y7nju9O8872jvgO+Q75jvnO+c75jvlO+M74TveO9s72DvUO9E7zTvIO8Q7vzu6O7U7sDuqO6U7nzsAPPE7YTsjO007ezucO7I7wDvJO8870zvUO9U71DvSO9A7zTvJO8U7wDu7O7Y7sDuqO6M7nTuWO447hzt/O3c7ADz8O7c7PzsiOz87YzuBO5c7pzuxO7g7vDu+O787vTu7O7c7szuuO6g7ojubO5M7izuDO3o7cDtnO107UztIOwA8/jvhO4I7MTshOzY7UjtsO4A7jzuaO6A7pDumO6U7ozufO5o7lDuNO4U7fDtzO2k7XjtTO0c7OzsuOyE7FDsAPP878Tu3O2A7KTsgOy87RTtaO2w7eTuCO4c7ijuKO4g7hDt/O3g7bztmO1s7UDtEOzc7KTsbOww7/TrtOt06ADwAPPg71zuRO0s7JDsdOyg7OTtKO1g7YjtpO207bjtsO2g7YjtaO1A7RTs5Oyw7HTsOO/467TrcOso6tzqkOgA8ADz8O+g7tzt0Ozw7IDsaOyE7LTs6O0Q7TDtQO1E7TztLO0Q7OzswOyQ7FjsHO/Y65DrSOr86qjqWOoA6azoAPAA8/TvxO9A7mTteOzI7GzsVOxk7ITspOy87Mzs0OzI7LTsmOxw7EDsCO/I64TrOOro6pTqPOnk6YTpJOjA6ADwAPP479jvgO7Y7gDtNOyk7FTsPOw87EzsXOxk7GTsWOxE7CDv9OvA64DrPOrw6pzqQOnk6YDpHOi06Ejr3OQA8ADz/O/k76jvLO507ajs/OyA7DjsGOwM7AzsCOwA7/Dr1Ouw63zrQOr86rDqWOn86ZzpNOjI6Fjr5Odw5vjkAPAA8/zv7O/E72ju1O4c7WDsyOxY7BTv6OvQ68DrrOuQ62zrQOsI6sjqfOok6cjpZOj46IToEOuU5xjmmOYY5ADwAPP87/Tv1O+Q7xzufO3I7SDslOws7+TrsOuI62TrPOsQ6tzqnOpQ6fzpoOk46MzoVOvc51zm2OZQ5cTlOOQA8ADwAPP47+DvrO9U7szuKO187ODsXO/066jraOsw6vjqwOqA6jTp4OmE6RzorOg067jnMOao5hjliOT05GDkAPAA8ADz+O/o78DvfO8M7nzt2O0w7JzsHO+061zrDOrE6njqLOnU6XjpEOic6CTroOcU5oTl8OVY5LzkHOeA4ADwAPAA8/zv7O/Q75jvPO7A7ijthOzk7FTv0Otg6vzqoOpE6eTpgOkU6KDoJOug5xDmfOXg5UDknOf040zipOAA8ADwAPP87/Dv2O+s72Tu+O5w7dTtNOyU7ADvfOsA6ozqHOms6TjowOhA67TnJOaI5ejlQOSU5+jjOOKE4dTgAPAA8ADz/O/07+DvvO+A7yjusO4g7YDs2Ow476DrFOqM6gjphOkA6HTr5OdM5rDmCOVc5Kjn9OM44oDhxOEI4ADwAPAA8/zv+O/o78jvmO9M7uTuYO3I7SDseO/U6zTqmOoA6Wzo1Og465jm8OZE5ZDk2OQY51jilOHQ4QzgSOAA8ADwAPP87/jv7O/U76jvaO8Q7pjuCO1o7LzsDO9c6rDqCOlc6LToCOtY5qDl5OUk5FznkOLE4fjhKOBY4xzcAPAA8ADz/O/47/Dv3O+474DvMO7I7kTtqOz87EjvkOrU6hjpYOig6+TnIOZY5YzkvOfo4xTiOOFg4IjjZN3A3ADwAPAA8ADz/O/w7+DvwO+U70zu8O547eTtQOyI78jrAOo46WzonOvM5vjmIOVE5GTngOKc4bjg1OPk3ijcdNwA8ADwAPAA8/zv9O/k78zvoO9k7xDupO4c7XzsyOwE7zTqXOmA6KDrwObY5ezlAOQQ5yDiMOE84FDiyNz43zjYAPAA8ADwAPP87/Tv6O/Q76zveO8s7sjuTO207QTsQO9s6ozpoOiw67zmxOXI5MjnyOLI4cjgzOOk3bjf3NoM2ADwAPAA8ADz/O/07+zv2O+474jvRO7s7nTt5O087HjvoOq86cjoyOvE5rjlrOSc54jieOFs4GDiuNy83tDY9NgA8ADwAPAA8/zv+O/s79zvwO+U71jvCO6Y7hTtcOyw79jq8Onw6Ojr1Oa45ZjkdOdU4jThGOP83dzfzNnQ2+jUAPAA8ADwAPP87/jv8O/g78TvoO9o7xzuuO447Zzs5OwQ7yDqIOkM6+jmwOWM5FjnKOH04MjjSN0Q3ujY3Nro1ADwAPAA8ADz/O/47/Dv4O/M76jvdO8w7tTuXO3I7RTsQO9U6kzpNOgE6szljORI5wDhwOCE4qDcUN4U2/jV+NQA8ADwAPAA8/zv+O/w7+Tv0O+w74DvQO7o7njt6O087HDvhOp86VzoKOrk5ZTkPObo4ZTgSOII35zZUNsg1RTUAPAA8ADwAPP87/jv8O/k79DvsO+A70Tu8O6E7gDtXOyU77DqrOmM6FDrAOWk5EDm2OFw4BThgN742JTaVNQ81ADwAPAA8ADz/O/87/Tv6O/Y77zvlO9c7xDusO4w7ZTs1O/06vDpzOiI6zDlxORM5tDhWOPQ3QjeZNvo1ZTXcNAA82Dv2O/s7/Tv9O/47/Tv9O/07/Dv7O/s7+jv5O/g79zv2O/Q78zvyO/A77zvtO+s76jvoO+Y75DviO+A73jsAPCM7nzvSO+U77jvzO/U79jv3O/c79zv2O/Y79Tv0O/I78TvvO+477DvqO+g75jvkO+E73zvdO9o71zvVO9I7ADy3OyM7ZjueO7470DvbO+I75jvoO+o76jvqO+k76DvmO+Q74jvgO9072jvXO9Q70DvNO8k7xTvBO7w7uDuzOwA88TthOyM7TTt7O5w7sjvBO8s70TvVO9c72DvYO9c71TvTO9A7zDvJO8Q7wDu7O7Y7sDuqO6Q7njuYO5E7ijsAPPw7tzs/OyI7PztkO4I7mTuoO7M7uzu/O8I7wjvCO8A7vTu5O7U7sDuqO6Q7nTuWO487hzt+O3Y7bTtkO1o7ADz+O+E7gjsxOyE7NjtTO207gjuRO5w7ozunO6k7qTunO6Q7oDuaO5Q7jTuFO3w7cztpO187VDtJOz07MjslOwA8/zvxO7c7YDsqOyA7LztGO1s7bTt7O4Q7ijuNO447jDuJO4Q7fjt2O207ZDtZO047QTs1Oyc7GTsLO/w67ToAPAA8+DvXO5E7SzslOx47KTs6O0s7WTtkO2w7cDtxO3A7bDtnO187VjtMO0E7NDsmOxg7CTv5Oug61zrFOrM6ADwAPPw76Du3O3Q7PTsgOxo7IjsuOzs7RjtOO1I7VDtTO087SDtAOzY7KjsdOw47/jrtOts6yTq1OqE6jTp4OgA8ADz9O/E70DuZO147MjsbOxY7GjsiOyo7MTs1Ozc7NTsxOyo7ITsVOwg7+DroOtY6wjquOpk6gjpsOlQ6PDoAPAA8/jv2O+A7tjuAO007KTsWOw87EDsUOxg7GzsbOxk7FDsMOwE79DrlOtQ6wTqtOpc6gDpoOk86NjocOgE6ADwAPP87+jvqO8s7nTtrOz87IDsPOwY7BDsEOwQ7Ajv+Ovg67jrjOtQ6wzqwOps6hTptOlM6OTodOgE65DnGOQA8ADz/O/s78TvaO7U7hztYOzI7FzsFO/s69TrxOuw65jreOtM6xTq1OqI6jTp2Ol06QzonOgk66znMOaw5jDkAPAA8/zv9O/U75DvHO587cjtIOyU7Czv5Ou064zraOtE6xjq4Oqk6lzqCOms6UTo2Ohk6+jnaObk5lzl1OVI5ADwAPAA8/jv4O+s71TuzO4o7Xzs4Oxc7/jrqOto6zDq/OrE6oTqOOno6YjpJOi06DzrvOc45qzmHOWM5PjkYOQA8ADwAPP47+jvwO987wzufO3Y7TDsnOwc77TrXOsQ6sjqfOow6djpfOkU6KToKOuk5xzmjOX05VzkwOQg54DgAPAA8ADz/O/s79DvmO887sDuKO2E7OjsVO/U62TrAOqk6kjp6OmI6RzoqOgs66TnGOaA5ejlROSg5/jjUOKo4ADwAPAA8/zv8O/Y76zvZO787nTt2O007JTsBO986wTqkOog6bTpQOjI6ETrvOco5pDl8OVI5Jzn7OM84ojh1OAA8ADwAPP87/Tv4O+874DvKO6w7iDtgOzc7DzvpOsU6pDqDOmM6QTofOvs51jmuOYQ5WTktOf840DihOHI4QzgAPAA8ADz/O/47+jvyO+Y70zu5O5g7cjtJOx879TrNOqc6gTpcOjc6EDroOb85lDlnOTk5CTnZOKc4djhFOBM4ADwAPAA8/zv+O/s79TvqO9o7xDumO4I7WjsvOwQ72DqtOoM6WTovOgQ62DmrOXw5TDkaOeg4tDiBOE04GTjMNwA8ADwAPP87/jv8O/c77jvgO8w7sjuRO2s7QDsTO+U6tzqIOlo6Kzr7Ocs5mjlnOTM5/jjIOJI4XDglON83dTcAPAA8ADwAPP87/Dv4O/E75TvUO7w7njt6O1A7IzvzOsI6kDpdOio69jnBOYs5VDkcOeQ4qzhyODk4ADiQNyI3ADwAPAA8ADz/O/07+TvzO+k72jvFO6k7hztfOzM7AjvPOpk6YzorOvM5uTl/OUQ5CDnMOJA4UzgXOLk3RTfUNgA8ADwAPAA8/zv9O/o79DvsO947zDuzO5M7bTtCOxE73DqlOms6LzryObQ5djk2OfY4tjh2ODc48Td2N/02iTYAPAA8ADwAPP87/Tv7O/Y77jviO9I7uzueO3o7UDsfO+o6sTp0OjU69DmyOW85KznnOKM4XzgcOLY3Nje6NkI2ADwAPAA8ADz/O/47+zv3O/A75TvWO8I7pzuFO107Ljv4Or46fzo9Ovg5sjlqOSI52TiROEo4BDh+N/o2ejb/NQA8ADwAPAA8/zv+O/w7+DvyO+g72zvIO687jztpOzs7BjvLOos6Rjr+ObQ5aDkbOc44gTg2ONk3SzfBNj02vzUAPAA8ADwAPP87/jv8O/k78zvqO947zTu2O5g7cztHOxM72DqXOlA6BTq3OWc5FjnFOHQ4JTivNxo3izYDNoM1ADwAPAA8ADz/O/47/Dv5O/Q77DvgO9E7uzufO3w7UTsfO+Q6ozpbOg46vTlpORM5vThoOBU4iTftNlk2zTVJNQA8ADwAPAA8/zv+O/w7+Tv0O+074jvTO747pDuDO1o7KTvwOq86ZjoXOsQ5bDkTObk4XzgIOGU3wzYqNpk1EzUAPAA8ADwAPP87/zv9O/o79jvvO+U71zvEO6s7jDtlOzY7/jq9OnQ6JDrOOXM5FTm2OFg4+DdGN502/TVpNeA0ADzYO/Y7+zv9O/47/jv+O/47/jv+O/07/Tv8O/w7+zv7O/o7+Tv5O/g79zv2O/U79DvzO/I78TvwO+877jvtOwA8IzufO9I75TvuO/M79jv3O/g7+Tv5O/k7+Dv4O/c79jv1O/Q78zvyO/E78DvuO+076zvqO+g75jvkO+M74TsAPLc7IztmO547vjvQO9s74jvnO+o76zvsO+w77DvrO+o76TvnO+U74zvhO9473DvZO9Y70zvQO8w7yTvFO8E7ADzxO2E7IztNO3w7nTuzO8I7zDvSO9c72TvaO9s72jvZO9c71DvSO847yzvHO8I7vju5O7Q7rzupO6Q7njuYOwA8/Du3Oz87Ijs/O2Q7gzuZO6k7tTu8O8E7xDvFO8U7wzvBO747uju1O7A7qjukO547lzuQO4g7gDt4O3A7ZzsAPP474TuCOzE7Ijs2O1M7bjuDO5I7nTulO6k7qzusO6o7qDukO587mTuSO4s7gzt6O3E7ZztdO1M7SDs8OzE7ADz/O/E7tztgOyo7IDswO0Y7XDtuO3w7hjuMO487kDuPO4w7iDuCO3o7cjtpO187VDtIOzw7LzsiOxQ7Bjv4OgA8ADz4O9c7kTtLOyU7HjspOzo7TDtaO2Y7bTtyO3M7cjtvO2o7YztaO1E7Rjs5Oyw7HjsPOwA78DrfOs46vDoAPAA8/DvoO7c7dDs9OyA7GzsiOy87PDtHO087VDtWO1U7UTtLO0M7OTsuOyE7EzsDO/M64TrPOrw6qTqVOoA6ADwAPP078TvQO5k7XjsyOxw7FjsaOyM7KzsyOzc7ODs3OzM7LDsjOxg7Czv8Ouw62jrHOrM6njqIOnI6WzpDOgA8ADz+O/Y74Du2O4A7TTspOxY7EDsROxU7GTscOxw7GjsVOw47Azv3Oug61zrFOrE6mzqFOm06VDo7OiE6BzoAPAA8/zv6O+o7yzudO2s7PzsgOw87BzsFOwQ7BDsDO/86+TrwOuQ61jrGOrM6njqIOnA6Vjo8OiE6BDroOco5ADwAPP87+zvxO9o7tTuHO1g7MjsXOwU7+zr2OvE67TrnOt461DrGOrY6ozqPOng6XzpEOig6CzrtOc45rjmOOQA8ADz/O/079TvkO8c7nztyO0g7JTsLO/k67TrjOto60TrGOrk6qTqXOoI6azpSOjc6GTr7Ods5ujmYOXU5UjkAPAA8ADz+O/g76zvVO7M7ijtfOzg7Fzv+Ouo62zrNOsA6sTqhOo86ejpjOko6LjoQOvA5zzmsOYg5Yzk+ORk5ADwAPAA8/jv6O/A73zvDO587djtNOyc7CDvtOtc6xDqyOqA6jTp3OmA6RjoqOgs66znIOaQ5fzlYOTE5CTnhOAA8ADwAPP87+zv0O+Y70DuwO4o7Yjs6OxU79TrZOsE6qTqTOns6YzpIOis6DDrrOcc5ojl7OVM5KjkAOdU4qzgAPAA8ADz/O/w79jvrO9k7vzudO3Y7TTsmOwE74DrBOqU6iTpuOlE6MzoTOvA5zDmmOX45VDkpOf040TikOHc4ADwAPAA8/zv9O/g77zvgO8o7rDuIO2A7NzsPO+o6xjqlOoQ6ZDpDOiE6/TnXObA5hjlbOS85ATnTOKQ4dDhFOAA8ADwAPP87/jv6O/I75jvTO7k7mDtyO0k7Hzv2Os46qDqDOl06ODoSOuo5wTmWOWk5OzkMOds4qjh4OEc4FjgAPAA8ADz/O/47+zv1O+o72jvEO6Y7gztbOzA7BDvZOq46hDpbOjE6BjraOa05fzlOOR056ji3OIM4TzgcONA3ADwAPAA8/zv+O/w79zvuO+A7zTuyO5E7aztBOxQ75jq4Ook6WzotOv05zTmcOWo5NjkBOcs4lThfOCg45Dd6NwA8ADwAPAA8/zv8O/g78TvlO9Q7vDueO3o7UTskO/Q6wzqROl46Kzr4OcM5jjlXOR855ziuOHU4PDgDOJY3JzcAPAA8ADwAPP87/Tv5O/M76TvaO8U7qTuIO2A7MzsDO9A6mzpkOi069Tm8OYI5RzkLOc84kzhXOBs4vzdLN9k2ADwAPAA8ADz/O/07+jv0O+w73jvMO7M7lDtuO0I7EjvdOqY6bDoxOvQ5tzl4OTk5+ji6OHo4Ojj3N3w3AzeONgA8ADwAPAA8/zv+O/s79jvuO+I70ju7O547eztQOyA76zqyOnY6Nzr3ObU5cjkuOeo4pjhiOCA4vDc8N782RzYAPAA8ADwAPP87/jv7O/c78DvmO9c7wjuoO4Y7XjsvO/o6vzqBOj86+zm1OW05JTndOJQ4TTgHOIU3ADd/NgQ2ADwAPAA8ADz/O/47/Dv4O/I76DvbO8g7rzuQO2o7PDsHO806jTpJOgE6tzlrOR450TiFODo44DdRN8c2QjbENQA8ADwAPAA8/zv+O/w7+TvzO+o73jvNO7Y7mTt0O0g7FTvaOpk6UzoIOro5ajkZOcg4dzgoOLU3IDeRNgg2hzUAPAA8ADwAPP87/jv8O/k79DvsO+E70Tu8O6A7fjtTOyE75zqmOl46ETrAOWw5FznBOGw4GDiON/I2XjbRNU41ADwAPAA8ADz/O/47/Tv6O/U77TvjO9Q7wDumO4U7XTssO/M6sjppOhs6xzlvORY5uzhiOAo4ajfINi42njUXNQA8ADwAPAA8/zv/O/07+jv1O+875TvXO8Q7rDuMO2Y7Nzv/Or46djomOtA5dTkXObg4Wjj8N0o3oTYBNmw14zQAPNg79jv7O/07/jv/O/87/zv/O/87/jv+O/47/jv+O/07/Tv9O/w7/Dv8O/s7+zv6O/o7+Tv5O/g7+Dv3O/Y7ADwjO5870jvlO+878zv2O/g7+Tv6O/o7+jv6O/o7+Tv5O/g7+Dv3O/Y79Tv0O/M78jvxO/A77zvuO+076zvqOwA8tzsjO2Y7nju+O9E73DvjO+g76zvsO+077jvuO+077TvrO+o76TvnO+U74zvhO9473DvZO9Y71DvRO847yjsAPPE7YTsjO007fDudO7M7wjvNO9M72DvaO9w73DvcO9s72TvXO9U70jvPO8s7xzvDO787uju1O7A7qzumO6A7ADz8O7c7PzsiOz87ZDuDO5o7qju1O707wjvFO8Y7xjvFO8M7wDu9O7g7tDuuO6k7ojucO5U7jjuGO387dztvOwA8/jvhO4I7MTsiOzc7VDtuO4M7kzueO6Y7qjutO607rDuqO6Y7oTucO5Y7jjuHO347djtsO2I7WDtOO0M7ODsAPP878Tu3O2A7KjsgOzA7RjtcO247fDuGO407kTuSO5E7jjuKO4Q7fTt1O2w7YjtYO007QTs0Oyc7GjsMO/46ADwAPPg71zuRO0s7JTseOyk7OztMO1s7ZjtuO3M7dTt0O3E7bDtlO107UztIOzw7LzsiOxM7BDv0OuQ60zrCOgA8ADz8O+g7tzt0Oz07IDsbOyM7Lzs8O0c7UDtVO1c7VjtSO007RTs7OzA7IzsVOwY79jrlOtM6wDqtOpk6hDoAPAA8/TvxO9A7mTteOzI7HDsWOxs7IzssOzM7Nzs5Ozg7NDsuOyU7GjsNO/467jrcOsk6tjqhOos6dTpeOkc6ADwAPP479jvgO7Y7gDtNOyk7FjsQOxE7FTsZOxw7HTsbOxY7DzsEO/g66TrZOsY6sjqdOoY6bzpWOj06IzoJOgA8ADz/O/o76jvLO547azs/OyA7DzsHOwU7BTsFOwM7ADv5OvA65TrXOsY6szqfOog6cDpXOj06IToFOug5yzkAPAA8/zv7O/E72ju1O4c7WTsyOxc7Bjv8OvY68TrtOuc63zrUOsY6tjqkOo86eDpfOkU6KToLOu05zjmuOY45ADwAPP87/Tv1O+Q7xzufO3I7SDslOww7+jrtOuM62zrROsc6uTqqOpg6gzpsOlI6NzoaOvs52zm6OZg5djlTOQA8ADwAPP47+DvrO9U7szuKO187ODsXO/466zrbOs06wDqyOqI6kDp7OmQ6SjouOhE68TnPOa05iTlkOT85GTkAPAA8ADz+O/o78DvfO8M7nzt2O007JzsIO+462DrFOrM6oTqNOng6YTpHOis6DDrsOck5pTmAOVk5MjkKOeE4ADwAPAA8/zv7O/Q75jvQO7A7iztiOzo7Fjv2Oto6wTqqOpM6fDpjOkk6LDoNOuw5yDmjOXw5VDkrOQE51zisOAA8ADwAPP87/Dv2O+s72Tu/O507djtNOyY7ATvgOsI6pjqKOm86Ujo0OhQ68jnOOac5fzlWOSs5/zjSOKU4eDgAPAA8ADz/O/07+DvvO+A7yjusO4g7YDs3OxA76jrHOqU6hTplOkQ6Ijr+Odk5sTmIOV05MTkDOdQ4pTh2OEc4ADwAPAA8/zv+O/o78jvmO9M7uTuYO3I7STsgO/c6zzqpOoM6Xjo5OhM67DnDOZg5azk9OQ453TisOHo4STgXOAA8ADwAPP87/jv7O/U76zvbO8Q7pjuDO1s7MDsFO9o6rzqFOlw6MjoHOtw5rzmAOVA5HzntOLk4hThROB441DcAPAA8ADz/O/47/Dv3O+474DvNO7I7kTtrO0E7FDvmOrg6ijpcOi46/znPOZ45azk4OQM5zTiXOGE4KjjpN343ADwAPAA8ADz/O/w7+DvxO+U71Du8O547ejtROyQ79TrEOpI6XzotOvk5xTmPOVk5ITnpOLA4dzg+OAU4mjcsNwA8ADwAPAA8/zv9O/k78zvpO9o7xTuqO4g7YDs0OwM70DqcOmU6Ljr2Ob05gzlJOQ050TiVOFk4HTjDN0833TYAPAA8ADwAPP87/Tv6O/Q77DvfO8w7szuUO247QzsSO946pzptOjI69jm5OXo5Ozn8OLw4fDg9OPw3gDcIN5I2ADwAPAA8ADz/O/47+zv2O+474jvSO7s7nzt7O1E7ITvsOrM6dzo5Ovg5tjl0OTA57DioOGU4IjjBN0A3xDZLNgA8ADwAPAA8/zv+O/s79zvwO+Y71zvCO6g7hjteOy87+jrAOoI6QTr8ObY5bzknOd84lzhPOAk4iTcEN4M2CDYAPAA8ADwAPP87/jv8O/g78jvoO9s7yDuwO5E7ajs9Owg7zjqOOko6Azq5OW05IDnUOIc4PDjkN1U3yzZGNsg1ADwAPAA8ADz/O/47/Dv5O/M76zveO807tzuZO3U7STsWO9s6mzpVOgo6vTltORw5yjh6OCo4ujckN5U2DDaLNQA8ADwAPAA8/zv+O/w7+Tv0O+w74TvSO707oTt/O1Q7IjvpOqc6YDoTOsI5bjkZOcM4bjgaOJI39jZiNtU1UTUAPAA8ADwAPP87/jv9O/o79TvuO+M71TvBO6g7hzteOy479Tq0Omw6HTrJOXI5GDm+OGQ4DDhuN8w2MjahNRo1ADwAPAA8ADz/O/87/Tv6O/U77jvkO9c7xDusO407Zzs4OwE7wDp4Oig60jl3ORk5ujhcOAA4TjekNgQ2bzXmNAA82Dv2O/s7/Tv+O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+O/07/Tv9O/07/Dv8O/w7/DsAPCM7nzvSO+U77zv0O/c7+Dv6O/o7+zv7O/s7+zv6O/o7+jv5O/k7+Dv4O/c79jv1O/U79DvzO/I78TvwO+87ADy3OyM7ZjufO7470TvcO+M76DvrO+077jvvO+877jvuO+077DvqO+k75zvlO+M74TvfO9w72jvXO9U70jvPOwA88TthOyM7TTt8O507tDvDO8071DvYO9s73TvdO9073DvbO9k71jvUO9E7zTvJO8Y7wTu9O7g7tDuvO6o7pTsAPPw7tzs/OyI7PztlO4M7mjuqO7Y7vjvDO8Y7xzvHO8Y7xDvCO747uju1O7A7qzulO587mDuRO4o7gjt6O3I7ADz+O+E7gjsxOyI7NztUO247gzuTO547pjurO607rjutO6s7pzujO507lzuQO4k7gDt4O287ZTtbO1E7Rjs7OwA8/zvxO7c7YDsqOyA7MDtHO107bzt9O4c7jTuRO5I7kjuPO4s7hTt+O3Y7bjtkO1k7TjtDOzY7KTscOw87ATsAPAA8+DvXO5E7SzslOx47KTs7O0w7WztnO287czt1O3Q7cTtsO2Y7XjtUO0k7PjsxOyM7FTsGO/Y65jrVOsQ6ADwAPPw76Du3O3Q7PTshOxs7IzsvOzw7SDtQO1U7VztWO1M7TTtGOzw7MTskOxY7Bzv3OuY61DrBOq46mjqGOgA8ADz9O/E70DuZO147MjscOxY7GzsjOyw7Mzs4Ozk7ODs0Oy47JTsaOw07/jruOt06yjq2OqE6jDp1Ol46RzoAPAA8/jv2O+A7tjuAO007KTsWOxA7ETsVOxk7HDsdOxs7FjsPOwQ7+DrpOtk6xjqyOp06hjpvOlY6PTojOgk6ADwAPP87+jvqO8s7njtrOz87IDsPOwc7BTsFOwU7AzsAO/o68TrlOtc6xjqzOp86iDpwOlc6PTohOgU66DnLOQA8ADz/O/s78TvaO7U7hztZOzI7FzsGO/w69jryOu065zrfOtQ6xzq3OqQ6jzp4Ol86RTopOgw67TnOOa85jjkAPAA8/zv9O/U75DvHO587cjtIOyU7DDv6Ou065DrbOtI6xzq6Oqo6mDqDOmw6Uzo4Oho6/DncObs5mTl2OVM5ADwAPAA8/jv4O+s71TuzO4o7Xzs4Oxg7/jrrOts6zjrAOrI6ojqQOnw6ZDpLOi86ETrxOdA5rTmKOWU5QDkaOQA8ADwAPP47+jvwO987wzufO3Y7TTsoOwg77jrYOsU6szqhOo46eTphOkc6KzoNOuw5yjmmOYA5WjkzOQs54jgAPAA8ADz/O/s79DvmO9A7sDuLO2I7OjsWO/Y62jrBOqo6lDp9OmQ6SjotOg467TnJOaQ5fTlVOSw5AjnYOK04ADwAPAA8/zv8O/Y76zvZO787nTt2O007JjsBO+A6wjqmOos6bzpTOjU6FTrzOc45qDmAOVc5LDkAOdM4pjh5OAA8ADwAPP87/Tv4O+874DvKO6w7iDtgOzg7EDvqOsc6pjqFOmU6RTojOv852jmyOYk5XjkyOQQ51jinOHc4SDgAPAA8ADz/O/47+jvyO+Y70zu5O5g7cjtKOyA79zrPOqk6hDpfOjo6FDrsOcM5mTlsOT45DzneOK04fDhKOBk4ADwAPAA8/zv+O/s79TvrO9s7xDumO4M7WzswOwU72jqwOoY6XDozOgg63TmwOYE5UTkgOe44uziHOFM4HzjXNwA8ADwAPP87/jv8O/c77jvgO807sjuSO2s7QTsVO+c6uTqLOl06Ljr/OdA5nzlsOTk5BDnPOJk4YjgsOOs3gTcAPAA8ADwAPP87/Dv4O/E75TvUO7w7njt6O1E7JDv1OsQ6kjpgOi06+jnGOZA5WjkjOeo4sjh4OD84BjidNy43ADwAPAA8ADz/O/07+TvzO+k72jvFO6o7iDtgOzQ7BDvROpw6ZjovOvc5vjmEOUo5DznTOJc4WjgeOMY3UjfgNgA8ADwAPAA8/zv9O/o79DvsO987zDuzO5Q7bjtDOxM73jqnOm46Mzr3Obk5ezk8Of04vTh9OD44/jeDNwo3lTYAPAA8ADwAPP87/jv7O/Y77jviO9I7vDufO3s7UTshO+06tDp4Ojk6+Tm3OXU5MTntOKo4ZjgjOMQ3QzfGNk42ADwAPAA8ADz/O/47+zv3O/A75jvXO8M7qDuHO147MDv7OsE6gzpBOv05tzlwOSg54DiYOFE4CziMNwc3hjYKNgA8ADwAPAA8/zv+O/w7+DvyO+g72zvIO7A7kTtqOz07CTvPOo86SzoEOro5bjkiOdU4iTg9OOc3WDfONkk2yjUAPAA8ADwAPP87/jv8O/k78zvrO947zTu3O5o7dTtKOxY73DqcOlY6Czq+OW45HTnMOHs4LDi9Nyc3lzYPNo01ADwAPAA8ADz/O/47/Dv5O/Q77DvhO9I7vTuiO387VTsjO+k6qTphOhQ6xDlwORo5xThvOBw4lTf5NmQ21zVTNQA8ADwAPAA8/zv+O/07+jv1O+475DvVO8I7qDuIO2A7Lzv2OrU6bTofOss5czkaOb84ZjgOOHE3zjY0NqM1HDUAPAA8ADwAPP87/zv9O/o79TvuO+U71zvFO607jztoOzo7AjvCOnk6KTrTOXg5Gzm8OF04AThQN6Y2BzZyNeg0ADzYO/Y7+zv9O/47/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47/jv+OwA8IzufO9I75TvvO/Q79zv5O/o7+jv7O/s7+zv7O/s7+zv6O/o7+jv5O/k7+Dv3O/c79jv1O/Q79DvzO/I78TsAPLc7IztmO587vjvRO9w74zvoO+s77TvuO+877zvvO+477TvsO+s76jvoO+Y75DviO+A73jvbO9k71jvUO9E7ADzxO2E7IztNO3w7nTu0O8M7zTvUO9g72zvdO9473TvdO9s72TvXO9Q70TvOO8o7xjvCO747uju1O7A7qzumOwA8/Du3Oz87Ijs/O2U7gzuaO6o7tju+O8M7xjvHO8g7xzvFO8I7vzu7O7Y7sTusO6Y7nzuZO5I7izuDO3w7dDsAPP474TuCOzE7Ijs3O1Q7bjuDO5M7njumO6s7rjuuO607qzuoO6M7njuYO5E7iTuBO3g7bztmO1w7UjtHOzw7ADz/O/E7tztgOyo7IDswO0c7XTtvO307hzuNO5E7kzuSO487izuFO387dztuO2Q7WjtPO0M7NzsqOx07DzsBOwA8ADz4O9c7kTtLOyU7HjspOzs7TDtbO2c7bztzO3U7dDtxO207ZjteO1Q7STs+OzE7IzsVOwY79jrmOtU6xDoAPAA8/DvoO7c7dDs9OyE7GzsjOy87PDtIO1A7VTtXO1Y7UztNO0Y7PDsxOyQ7FjsHO/c65jrUOsE6rjqaOoY6ADwAPP078TvQO5k7XjsyOxw7FjsbOyM7LDszOzg7OTs4OzQ7LjslOxo7DTv+Ou463TrKOrY6oTqMOnU6XjpHOgA8ADz+O/Y74Du2O4A7TTspOxY7EDsROxU7GjsdOx07GzsWOw87BTv4Ouk62TrGOrI6nTqGOm86Vjo9OiM6CToAPAA8/zv6O+o7yzueO2s7PzshOw87BzsFOwU7BTsEOwA7+jrxOuU61zrGOrQ6nzqJOnE6Vzo9OiI6BTroOcs5ADwAPP87+zvxO9o7tTuHO1k7MjsXOwY7/Dr2OvI67TrnOt861DrHOrc6pDqPOnk6YDpFOik6DDruOc85rzmPOQA8ADz/O/079TvkO8c7nztyO0g7JTsMO/o67TrkOts60jrHOro6qjqYOoQ6bTpTOjg6Gzr8Odw5uzmZOXc5VDkAPAA8ADz+O/g76zvVO7M7ijtfOzg7GDv+Ous62zrOOsA6sjqiOpA6fDplOks6LzoSOvI50DmuOYo5ZTlAORo5ADwAPAA8/jv6O/A73zvDO587djtNOyg7CDvuOtg6xTqzOqE6jjp5OmE6SDosOg067TnKOaY5gTlaOTM5CznjOAA8ADwAPP87+zv0O+Y70DuwO4s7Yjs6OxY79jraOsE6qzqUOn06ZDpKOi06DjrtOco5pTl+OVY5LTkDOdg4rTgAPAA8ADz/O/w79jvrO9k7vzudO3Y7TTsmOwI74DrCOqY6izpvOlM6NToVOvM5zzmpOYE5VzksOQA51DinOHo4ADwAPAA8/zv9O/g77zvgO8o7rDuIO2A7ODsQO+o6xzqmOoY6ZTpFOiM6/znaObM5ijlfOTI5BTnWOKc4eDhJOAA8ADwAPP87/jv6O/I75jvTO7k7mDtyO0o7IDv3Os86qTqEOl86OjoUOu05xDmZOW05PzkPOd84rjh8OEs4GTgAPAA8ADz/O/47+zv1O+s72zvEO6Y7gztbOzE7BTvaOrA6hjpcOjM6CDrdObA5gjlSOSE57ji7OIc4UzgfONg3ADwAPAA8/zv+O/w79zvuO+A7zTuyO5I7aztBOxU75zq5Oos6XTovOgA60DmfOW05OTkFOc84mThjOCw47DeCNwA8ADwAPAA8/zv8O/g78TvlO9Q7vDufO3o7UTskO/U6xDqSOmA6Ljr6OcY5kTlaOSM56ziyOHk4QDgHOJ43LzcAPAA8ADwAPP87/Tv5O/M76TvaO8U7qjuIO2A7NDsEO9E6nDpmOi869zm/OYU5SjkPOdM4lzhbOB84xzdTN+E2ADwAPAA8ADz/O/07+jv0O+w73zvMO7M7lDtuO0M7EzvfOqc6bjozOvc5ujl8OT05/Ti+OH44PzgAOIQ3CzeWNgA8ADwAPAA8/zv+O/s79jvuO+I70ju8O587eztROyE77Tq0Ong6Ojr5Obg5dTkyOe44qjhnOCQ4xTdEN8g2TzYAPAA8ADwAPP87/jv7O/c78DvmO9c7wzuoO4c7XjswO/s6wTqDOkI6/jm4OXE5KTnhOJk4UTgLOI03CDeHNgw2ADwAPAA8ADz/O/47/Dv4O/I76DvbO8k7sDuRO2s7PTsJO886jzpLOgQ6ujlvOSI51TiJOD446TdZN882SjbLNQA8ADwAPAA8/zv+O/w7+TvzO+s73jvOO7c7mjt2O0o7FzvcOpw6VjoMOr45bzkeOcw4fDgsOL43KDeZNhA2jjUAPAA8ADwAPP87/jv8O/k79DvsO+E70ju9O6I7fztVOyQ76jqpOmI6FTrEOXA5GznFOHA4HDiXN/o2ZTbZNVQ1ADwAPAA8ADz/O/47/Tv6O/U77jvkO9U7wjupO4g7YDswO/c6tjpuOh86zDl0ORo5wDhmOA44cjfPNjU2pDUdNQA8ADwAPAA8/zv+O/07+jv2O+875jvYO8Y7rjuQO2o7OzsDO8M6ejoqOtQ5eTkbObw4XjgCOFE3pzYINnI16TQAPNg79jv7O/07/jv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/87/zv/O/47/jv+O/47ADwjO5870jvlO+879Dv3O/k7+jv6O/s7+zv7O/s7+zv7O/o7+jv6O/k7+Tv4O/c79zv2O/U79Tv0O/M78jvxOwA8tzsjO2Y7nzu+O9E73DvjO+g76zvtO+877zvvO+877jvuO+w76zvqO+g75jvkO+I74DveO9w72TvXO9Q70TsAPPE7YTsjO007fDudO7Q7wzvNO9Q72DvbO9073jvdO9072zvZO9c71DvRO847yjvHO8M7vju6O7U7sDurO6Y7ADz8O7c7PzsiOz87ZTuDO5o7qju2O747wzvGO8c7yDvHO8U7wju/O7s7tjuxO6w7pjufO5k7kjuLO4M7fDt0OwA8/jvhO4I7MTsiOzc7VDtuO4M7kzueO6Y7qzuuO647rTurO6g7ozueO5g7kTuJO4E7eDtvO2Y7XDtSO0c7PDsAPP878Tu3O2A7KjsgOzA7RztdO287fTuHO407kTuTO5I7jzuLO4U7fzt3O247ZDtaO087Qzs3Oyo7HTsPOwE7ADwAPPg71zuRO0s7JTseOyo7OztMO1s7ZztvO3M7dTt0O3E7bTtmO147VDtJOz47MTsjOxU7Bjv2OuY61TrEOgA8ADz8O+g7tzt0Oz07ITsbOyM7Lzs8O0g7UDtVO1c7VjtTO007Rjs8OzE7JDsWOwc79zrmOtQ6wTquOpo6hjoAPAA8/TvxO9A7mTteOzI7HDsWOxs7IzssOzM7ODs5Ozg7NDsuOyU7GjsNO/467jrdOso6tjqhOow6dTpeOkc6ADwAPP479jvgO7Y7gDtNOyk7FjsQOxE7FTsaOx07HTsbOxY7DzsFO/g66TrZOsY6sjqdOoY6bzpWOj06IzoJOgA8ADz/O/o76jvLO547azs/OyE7DzsHOwU7BTsFOwQ7ADv6OvE65TrXOsY6tDqfOok6cTpXOj06IjoFOug5yzkAPAA8/zv7O/E72ju1O4c7WTsyOxc7Bjv8OvY68jrtOuc63zrUOsc6tzqkOo86eTpgOkU6KToMOu45zzmvOY85ADwAPP87/Tv1O+Q7xzufO3I7SDslOww7+jrtOuQ62zrSOsc6ujqqOpg6hDptOlM6ODobOvw53Dm7OZk5dzlUOQA8ADwAPP47+DvrO9U7szuKO187ODsYO/466zrbOs46wTqyOqI6kDp8OmU6SzovOhI68jnROa45ijllOUA5GjkAPAA8ADz+O/o78DvfO8M7nzt2O007KDsIO+462DrFOrM6oTqOOnk6YjpIOiw6DTrtOco5pjmBOVo5MzkLOeM4ADwAPAA8/zv7O/Q75jvQO7A7iztiOzo7Fjv2Oto6wjqrOpQ6fTpkOko6LToOOu05yjmlOX45VjktOQM52DitOAA8ADwAPP87/Dv2O+s72Tu/O507djtNOyY7AjvgOsI6pjqLOm86Uzo1OhU68znPOak5gTlXOSw5ADnUOKc4ejgAPAA8ADz/O/07+DvvO+A7yjusO4g7YDs4OxA76jrHOqY6hjpmOkU6IzoAOto5szmKOV85MjkFOdY4pzh4OEk4ADwAPAA8/zv+O/o78jvmO9M7uTuYO3I7SjsgO/c6zzqpOoQ6Xzo6OhQ67TnEOZk5bTk/OQ853ziuOHw4SzgZOAA8ADwAPP87/jv7O/U76zvbO8Q7pjuDO1s7MTsFO9o6sDqGOl06MzoIOt05sDmCOVI5ITnuOLs4hzhTOCA42DcAPAA8ADz/O/47/Dv3O+474DvNO7I7kjtrO0E7FTvnOrk6izpdOi86ADrQOZ85bTk5OQU5zziZOGM4LDjtN4I3ADwAPAA8ADz/O/w7+DvxO+U71Du8O587ejtROyQ79TrEOpM6YDouOvo5xjmROVo5IznrOLI4eThAOAc4njcwNwA8ADwAPAA8/zv9O/k78zvpO9o7xTuqO4g7YDs0OwQ70TqcOmY6Lzr3Ob85hTlKOQ850ziXOFs4HzjIN1M34TYAPAA8ADwAPP87/Tv6O/Q77DvfO8w7szuUO247QzsTO986qDpuOjM69zm6OXw5PTn+OL44fjg/OAA4hDcMN5Y2ADwAPAA8ADz/O/47+zv2O+474jvSO7w7nzt7O1E7ITvtOrQ6eDo6Ovk5uDl1OTI57jiqOGc4JDjFN0U3yDZPNgA8ADwAPAA8/zv+O/s79zvwO+Y71zvDO6g7hzteOzA7+zrBOoM6Qjr+Obg5cTkpOeE4mThSOAs4jjcIN4c2DDYAPAA8ADwAPP87/jv8O/g78jvoO9s7yTuwO5E7azs9Owk7zzqPOks6BDq6OW85IjnWOIk4PjjpN1k3zzZKNss1ADwAPAA8ADz/O/47/Dv5O/M76zveO847tzuaO3Y7SjsXO9w6nDpWOgw6vjlvOR45zDh8OCw4vjcoN5k2EDaONQA8ADwAPAA8/zv+O/w7+Tv0O+074TvSO707ojt/O1U7JDvqOqk6YjoVOsQ5cTkbOcU4cDgdOJc3+zZmNtk1VDUAPAA8ADwAPP87/jv9O/o79TvuO+Q71jvCO6k7iDtgOzA79zq2Om46HzrMOXQ5GznAOGY4DjhzN9A2NTakNR01ADwAPAA8ADz/O/87/Tv6O/Y77zvmO9k7xzuvO5A7ajs7OwQ7wzp7Ois61Dl5ORw5vTheOAI4UTeoNgg2czXpNAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADz/O/47+zv4O/U78DvrO+Q73TvUO8o7vzuzO6Y7mDuJO3k7aTtYO0c7NTsjOxE7/zrsOto6yDq2OqQ6ADwAPAA8/zv9O/o79TvwO+k74TvZO887xTu6O687ojuVO4Y7dztnO1c7Rjs0OyI7EDv+Ous62TrHOrQ6ojqQOgA8ADwAPP87/Tv5O/Q77TvkO9k7zTvBO7Q7pzuZO4o7eztrO1s7Szs6Oyg7FjsEO/E63zrMOrk6pzqUOoI6cDoAPAA8ADz/O/07+TvzO+s74DvTO8U7tTukO5M7gjtwO147TDs6Oyc7FTsCO+863DrJOrU6ojqPOnw6aTpWOkM6ADwAPAA8/zv9O/k78zvqO9470Du/O6w7mDuDO207VztBOyw7FjsBO+w61zrCOq06mDqEOnA6WzpHOjM6IDoNOgA8ADwAPP87/Tv5O/M76TvdO807uzulO447dTtbO0E7JzsNO/M62jrCOqo6kjp7OmQ6TTo3OiI6DDr3OeM5zjkAPAA8ADz/O/07+TvyO+k73DvMO7g7oTuHO2s7TTsvOxA78jrTOrY6mTp9OmI6RzouOhQ6/DnkOc05tjmgOYs5ADwAPAA8/zv9O/k78jvpO9w7yzu2O507gTtjO0I7IDv9Oto6tzqVOnQ6Uzo0OhU6+DncOcA5pjmMOXM5WzlEOQA8ADwAPP87/Tv5O/I76TvcO8o7tTubO347Xjs6OxU77jrHOqA6eTpTOi46CjrnOcY5pTmHOWk5TDkxORc5/TgAPAA8ADz/O/07+TvzO+k73DvKO7U7mjt8O1o7NTsNO+M6uDqNOmE6NzoNOuQ5vTmXOXM5UDkvOQ858TjUOLg4ADwAPAA8/zv9O/k78zvpO9w7yzu1O5o7eztYOzE7BzvbOq06fjpPOiA68jnFOZk5bzlGOR85+jjXOLU4lTh2OAA8ADwAPP87/Tv5O/M76TvcO8s7tTubO3s7WDswOwQ71jqmOnQ6QToOOtw5qjl6OUw5Hzn0OMs4pDh/OFs4OjgAPAA8ADz/O/07+TvzO+o73TvMO7Y7mzt8O1g7LzsDO9M6oTpsOjc6ATrLOZY5YjkvOf44zziiOHc4TjgoOAM4ADwAPAA8/zv9O/k78zvqO907zDu3O5w7fTtZOzA7AzvSOp86aDoxOvg5vzmGOU85GDnjOLE4gDhROCU49jenNwA8ADwAPP87/Tv5O/M76jveO807uDueO387WzsyOwQ70zqeOmc6LTryObc5ezlBOQc5zziZOGQ4MjgDOKw3VjcAPAA8ADz/O/07+Tv0O+s73jvOO7k7nzuAO107NDsGO9U6oDpnOiw68DmyOXU5Nzn7OMA4hjhPOBo4zzdvNxQ3ADwAPAA8/zv9O/o79DvrO987zzu6O6E7gjtfOzY7CTvYOqI6aTotOvA5sTlxOTI58zi1OHk4PzgHOKQ3PzffNgA8ADwAPP87/Tv6O/Q76zvfO9A7uzuiO4Q7YTs5Oww72zqlOmw6MDrxObE5cDkvOe84rzhxODQ49TeFNxs3tjYAPAA8ADz/O/07+jv0O+w74DvQO7w7pDuGO2Q7PDsQO946qTpwOjM69Tm0OXI5MDntOKw4bDguOOQ3cDcCN5k2ADwAPAA8/zv9O/o79DvsO+A70Tu9O6U7iDtmOz87EzviOq06dDo4Ovk5tzl1OTI57zisOGs4KzjaN2M38jaGNgA8ADwAPP87/Tv6O/Q77DvhO9I7vjunO4o7aDtCOxY75jqxOng6PDr9Obw5eTk1OfE4rjhrOCo41zddN+k2ejYAPAA8ADz/O/07+jv1O+074TvSO787qDuMO2o7RDsZO+k6tTp9OkE6AjrAOX05OTn1OLE4bjgsONg3XTfmNnU2ADwAPAA8/zv9O/o79TvtO+I70zvAO6k7jTtsO0c7HDvtOrk6gTpFOgY6xTmCOT45+Ti1OHE4LzjcN1835zZ1NgA8ADwAPP87/Tv6O/U77TviO9M7wTuqO447bjtJOx477zq8OoQ6SToLOso5hzlCOf44uTh1ODI44jdkN+s2dzYAPAA8ADz/O/07+jv1O+074jvUO8E7qzuPO287SjsgO/I6vzqIOk06DjrOOYs5RzkCOb04eTg2OOk3ajfwNns2ADwAPAA8/zv9O/o79TvtO+I71DvCO6s7kDtwO0w7Ijv0OsE6ijpPOhI60TmOOUo5BjnBOHw4OTjvN3A39TaANgA8ADwAPP87/Tv6O/U77TvjO9Q7wjusO5E7cTtNOyQ79TrDOow6UjoUOtQ5kTlNOQg5xDh/ODw49Td1N/o2hTYAPAA8ADz/O/07+jv1O+074zvVO8M7rDuSO3I7TjskO/c6xDqOOlM6FjrVOZM5TzkLOcY4gTg+OPk3eTf+Nog2ADwAPAA8/zv9O/o79TvuO+M71TvDO607kjtyO047JTv3OsU6jjpUOhc61jmUOVA5DDnHOIM4Pzj7N3w3ATeLNgA8ADwAPP87/Tv6O/U77jvjO9U7wzutO5I7cztOOyU79zrFOo86VToXOtc5lTlROQw5yDiDOEA4/Dd9NwI3jDYAPAA8ADz/O/07+jv1O+474zvVO8M7rTuSO3M7TjslO/g6xTqPOlU6FzrXOZU5UTkMOcg4gzhAOP03fTcCN4w2ADwFIykTmgmKA3EByQBlACIAEQARABEAEQAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAqAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzyOlI5nzc3NeoygzDiLcMrOik0JxglYiN6IScgbB4QHQ8cnBp3GZYYyxe1FtcVJBWTFBwUchPPEkYS0xFzEbY79Dp0OcU3RzX1MoUw4S29KzQpLCcSJVojdCEjIGYeCh0KHJUacRmQGMEXqxbOFRkVhxQRFFkTthIrEroRVxHkOqE6YDnXN1M19zJ9MM0tnCscKQkn+iQ3I1shECBJHvQc8Rt3GlYZdxiVF4AWoxXwFGIUzxMJE2QS1xFgEfsQrjmWOds4VTcSNakyRzCDLTgr2SivJrwk4CIcIcMfAx69HJgbLBoZGUEYMxcnFlAVpBQTFD4TdRLTEUIRzxBkEEA4Nji3NyM2XTTQMYcv4CxrKlQoASZFJDsipSASH30dVBzxGqEZohi7F4MWjBXBFB8UMxNbEp8RAxF7EAYQVw+SNYk1NjVeNHcybDDZLbcrKykTJ/UkHyM8IdkfAB6qHGAb6hnNGN8XixZ+FaYU7hPTEuwRHxGEEP8PDA9GDpYNszGsMW0xwTB7L20tjys2KTonFiVII1Eh5h/6HZccMRuuGZAYZxcOFgYVMRQME/URGBFiEIUPjg60DfMMYAy8CzQoOyifKEApUCmrKG8nnSUmJBsihSDBHhsd0RsRGsMYkBcQFuoUAxScEn8RmRC4D4UOgQ24DAgM8gr3CSUJfQgAAO8DRhNYG2kf3SDwIFcgFR+THVEcqhooGQQYRxb3FOwTWRIdESsQ1Q6aDacMswtsCmgJhgirB30GgQW4BP8DAABDAEME+wyDEqcVSRejFwwXCBbyFPATSxL9EOYPPg77DO4LUwolCSkIrwZxBXUErAMEA34CGQLFAXEBPwEMAQAAAAARAFQA6wDFAZ8CNgNHAwQDnwIqArQBUAEMAckAlwB1AGUAQwAyADIAIgAiABEAEQARABEAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPGw6QDgMNZ4xIy7YKvgn3yQ8Iikgwh0dHAsajBgBF4AVZhQnE+YR8xA0EDoPSw6KDeoMbAz/C08LwApCCt4Jgzt+OmI4IzWlMR0uyyrlJ9MkLiIgILcdFRwCGoYY+RZ3FV0UGBPbEeYQKxApDzoOdQ3RDFMMzAscC4UKEAqjCSk60jkzOAQ1czHWLXQqgSeYJOYh5h99HdwbyBldGLYWQxU2FNUSmhGwEO4PxA7VDRQNgQz2CxwLbArVCVcJ6gg9OB84kTYaNIgw5Sx5KW8m9yMpIfUe3Bz8GigZxxf9FbYUgRMQEvsQIRD3DuYNDA1cDJILpwrVCT4JpwgpCIkHNTQhNAUzwDCbLW0qiCeWJNMhrx9BHWUbXBnzFwIWpBRGE88RpRCaD0YOOg1kDGgLUwpxCcAIGQglBzoGYAXqBP4gEiQvKOkoBCiPJU0jyCBdHlYcDRpTGFMWuBQpE4URVRDiDoUNaAw+C/cJ8wghCPIG5gXaBEMErAMlA7ACSwIAAN4D6hL1GZkcihxHG1sZqhd6Fd8TxBE+EGAOzQyBC8QJjgg1B6MFpwS8AwQDbQIIArQBYAEuAfwAyQC5AJcAAAAAADIAuQCjASoCKgLWAXEBDAHJAIYAZQBDADIAIgAiABEAEQARABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8SzncNJsvECpkJV8h5B34GmEYxhXwE6URIxA2DskMgQv/CdoI/wfABsQF6gRDBLwDWAMEA7ACfgJLAioC9wH1OmI58jR8L+QpOyU6IcAd0BpLGK8VzBOOERYQIQ68DF8L3gnJCN0HjgajBckEIQSsAzYD0QKOAksCKgL3AcUBMTh3N5kz1C2vKEQkWSDbHM8ZXxfnFMsS1xAUD2ANFAxkChQJIQieBpIFpwTvA1gD4gKOAjoC5wG0AYIBYAE/AXgsjCzvK1koPSRIIKIcWhmSFjwUrRHqD6sNKQw6CrgIeQfmBacEvAMEA44CKgLFAXEBPwEMAesAyQCoAIYAhgAAADoGQxSKFxIWuhO0EMkNaAvRCI4GhgRHA20CxQFgAfwAyQCXAHUAZQBDAEMAMgAyACIAIgARABEAEQARABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADypNGQpsCALGvgUzxAyDSEKmgcMBXkDfgLFAVABDAHJAKgAdQB1AFQAQwBDADIAMgAiACIAIgARACIAIgAiAB048jIGKGgf7xgiFAYQZAwlCX0GUwTiAggCowEuAfwAlwB1AGUAVABDAEMAMgAyACIAMgAiACIAEQARABEAEQAAAGgL0Q2WCJsDowHaAIYAQwAyACIAEQARABEAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPHQejg4tBZMBqABUADIAEQARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA86CIHE4EJeQNxAbkAZQAiABEAEQARABEAAAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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EQARABEAEQARABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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0DaqNvI76zu1O5E7gDthOzY7AzvNOpU6XTolOu45uTmFOVM5Izn2OMo4oTh6OFY4MzgTOOg3rzd5N0c3GDfsNsM2nTbnO+Q7yDuTO3E7VTswOwM7zzqYOmA6KDrxObo5hjlTOSM59DjIOJ44dzhROC44DTjcN6I3azc4Nwg33DayNos22DvXO8k7nztvO0o7Jzv9Os06mTpiOio68jm7OYY5UzkhOfI4xTiaOHI4TDgoOAY4zTeSN1o3JTf0NsY2mzZzNsc7xju+O6I7dDtGOx079TrHOpY6YDopOvI5uzmFOVE5HznuOME4lThsOEU4IDj7N7s3fTdENw833DatNoE2VzayO7I7rDuaO3U7RjsYO+w6vzqPOls6JjrvObg5gjlNORo56ji7OI44ZDg8OBc45zelN2Y3Kzf0NsA2kDZiNjc2mjuaO5Y7iTttO0M7FDvlOrY6hjpTOh866TmzOX05SDkUOeM4sziGOFs4MjgMONA3izdLNw831jahNm42PzYTNn87fjt8O3M7XTs6Ow473TqsOns6SToVOuA5qjl1OUA5DDnaOKo4fDhQOCc4/ze1N283LTfvNrU2fjZKNhk26zVgO2A7XjtXO0Y7KjsCO9Q6ojpwOj06CTrVOaA5ajk1OQI5zzifOHA4RDgZOOM3lzdPNww3zDaQNlc2IjbwNcA1Pjs+Ozw7NzsqOxI78DrGOpU6YzowOvw5xzmSOV05KDn1OMI4kThiODU4CjjDN3Y3LDfnNqY2aTYvNvg1xDWTNRg7GDsXOxI7CDv1Otg6sjqFOlM6IDrsObc5gjlNORk55TizOII4UjglOPM3oDdRNwc3wDZ+Nj42AzbLNZY1YzXvOu867jrqOuI60jq5Opg6bjo/Og062TmlOXA5OzkHOdQ4oThwOEA4EjjNN3k3KjfeNpY2UjYSNtU1mzVlNTE1wjrCOsE6vjq3Oqo6lTp4OlI6Jzr2OcQ5kDlbOSc58zi/OI04XDgsOPw3pDdQN/82sjZqNiU24zWlNWs1MzX+NJE6kTqQOo46iDp9Oms6UTowOgg62zmqOXc5RDkQOdw4qTh3OEY4FjjQN3c3IzfRNoQ2Ozb1NbM1dDU4NQA1yjRcOlw6WzpZOlQ6Szo8OiY6CDrkObo5jDlbOSk59TjCOJA4XjgtOPs3oDdHN/I2oTZTNgk2wzWANUE1BDXLNJU0IzojOiM6ITodOhU6CDr0Ods5ujmUOWk5OzkKOdg4pjh0OEM4EjjHN2s3Eze/Nm02IDbWNY81TDUMNdA0ljRgNOY55jnmOeQ54TnaOc45vjmnOYs5aDlBORU55zi3OIY4VTglOOo3jTczN9w2iDY3Nuo1oDVaNRc11zSaNGE0KjSlOaU5pDmjOaA5mjmQOYI5bjlVOTY5EjnqOL84kThiODM4BDiqN0839zahNk42/jWyNWk1IzXgNKE0ZTQrNOozXzlfOV45XTlaOVU5TTlBOTA5Gjn+ON44ujiROGc4OjgNOL83ZTcMN7Y2YjYQNsI1dzUvNeo0qTRqNC407DOAMxM5EzkTORI5EDkMOQU5+jjrONg4wDikOIM4Xzg3OA44xjdwNxk3xDZwNh820DWDNTo19DSwNHA0MzTxM4IzGDPDOMM4wzjCOMA4vDi2OK44oTiROHw4YzhGOCY4Aji4N2k3GDfGNnU2JTbXNYs1QTX7NLY0dTQ3NPYzhDMYM7EybThtOG04bDhqOGc4YjhbOFE4QzgxOBw4AzjNN443SjcCN7c2bDYgNtU1izVCNfw0uDR3NDk0+TOGMxgzsDJNMhA4EDgQOA84DjgMOAg4AjjzN9w3wDecN3I3QTcLN882jzZNNgg2wzV9NTk19TSzNHQ0NjT1M4MzFjOtMkky6jFZN1k3WDdYN1Y3UjdMN0M3NjckNw038TbPNqc2ejZHNhE21zWbNV01HzXhNKM0ZzQsNOUzdjMMM6UyQzLkMYoxgTaBNoE2gDZ/Nnw2eDZyNmg2XDZLNjY2HDb9Ndk1sTWFNVU1IzXuNLg0gjRLNBY0wTNZM/QykzI0MtkxgTEtMZU1lTWVNZU1lDWTNZE1jTWINYA1dTVoNVY1QTUnNQo16TTFNJ00dDRINBs02jN+MyMzyDJvMhgywzFwMSAx0zCSNJI0kjSSNJI0kjSSNJE0jzSNNIk0gzR7NG80YTRQNDw0JDQKNNgzmTNVMw8zxjJ8MjEy5jGbMVExCDHBMHww2jLaMtsy2zLdMuAy5DLpMu8y9jL9MgIzBjMHMwQz/jLxMuAyyDKrMocyXzIxMgAyyjGSMVgxHDHfMKEwZDAnMCcwJzAnMCkwLTAzMD4wSzBdMHMwjDCoMMUw4zAAMRoxMTFDMVAxVjFVMU4xPjEpMQ0x6zDEMJkwbDA7MAkwrC8AAJYESRDMFpQb9x6nITUk4CXOJ/soJSpgK1Es8yyRLSYusS4tL5cv7y8ZMDAwPTBAMDkwKjAUMO8vrC9gLw8vADz3O+Q7yTupO4Q7XTszOwg73TqxOoU6WTouOgQ63Dm0OY45ajlHOSY5BznpOMw4sTiYOIA4aThUOEA4LTgcOP87vTvcO8o7qzuGO187NTsKO946sjqFOlo6LzoFOtw5tDmOOWo5RzkmOQY56DjLOLA4lzh/OGg4Uzg/OCw4Gjj7O+E7sTu4O6g7iDtiOzk7DTvhOrQ6hzpbOjA6BTrcObQ5jjlpOUY5JDkEOeY4yTiuOJQ4fDhlOE84OzgoOBY49jvvO7w7njuWO4I7Yjs7OxE75Dq3Ooo6XToxOgY63DmzOYw5ZzlDOSE5ATniOMU4qTiPOHY4XzhJODQ4IDgOOO476zvQO6A7hTt0O1s7OTsRO+Y6uTqMOl86MjoGOts5sjmKOWQ5QDkdOfw43Di/OKI4iDhuOFY4QDgrOBc4BDjjO+I71DuuO4Q7aDtPOzI7DjvlOro6jTpfOjI6BjraObA5iDlhOTs5GDn2ONY4tziaOH44ZDhMODU4HzgKOO031zvWO847tDuLO2U7RjsoOwY74Dq3Oos6XjoxOgQ62DmtOYQ5XDk1ORE57jjNOK04kDhzOFk4PzgnOBA49jfNN8c7xzvCO7E7kDtnO0E7Hzv9Otk6sTqGOlo6LToAOtQ5qDl+OVU5LjkJOeU4wziiOIQ4ZjhLODA4FzgAONM3qDe2O7Y7sjunO407aTtAOxo79TrQOqk6fzpUOic6+jnOOaI5dzlNOSU5/zjaOLc4ljh2OFg4OzggOAY42jesN383ojuhO587lzuEO2U7PjsVO+46xzqfOnY6SzofOvI5xjmZOW45RDkbOfQ4zjiqOIc4ZzhHOCk4DTjlN7E3gTdSN4s7izuJO4M7dDtbOzg7EDvnOr46lTprOkA6FDroObs5jzljOTg5DznnOMA4mzh3OFU4NTgWOPI3ujeFN1I3ITdyO3E7cDtrO2A7TDsuOwg73zq1Ooo6Xzo0Ogg63DmvOYI5VjkrOQE52DiwOIo4ZjhDOCI4AjjHN403VTcgN+42VTtVO1Q7UTtHOzc7HTv8OtQ6qjp/OlM6Jzr6Oc45oTl0OUc5HDnxOMc4nzh4OFM4LzgMONc3mDdcNyM37Da3NjY7Njs2OzI7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MDsUO/k63Dq+Op46fTpbOjk6Fzr2OdU5tTmVOXc5Wjk9OSI5BznuONU4vjinOJE4tDu0O7I7rTuhO4s7bTtNOyw7DTvwOtI6szqUOnM6UTovOgw66jnIOac5hzlnOUg5KzkOOfI42Di+OKU4jTh1OKM7ozuiO547lDuDO2k7SjspOwg76DrIOqk6iDpnOkU6Ijr/Odw5ujmYOXY5Vjk2ORc5+TjcOMA4pTiKOHE4WDiRO5A7kDuMO4U7dzthO0U7JDsCO+A6vzqeOnw6Wjo3OhQ68TnNOao5hzllOUM5IjkCOeI4xDinOIo4bjhTODk4fDt8O3s7eTtyO2c7VDs7Ox07+zrYOrU6kjpwOk06KToFOuE5vTmZOXU5UjkvOQ056zjLOKs4jDhuOFE4NTgZOGU7ZTtkO2I7XTtUO0Q7LjsSO/I6zzqrOoc6Yzo+Oho69TnQOas5hjliOT05GTn2ONQ4sjiROHE4UTgzOBU48TdMO0w7TDtKO0U7PTswOx07AzvlOsM6nzp6OlU6LzoKOuQ5vjmYOXM5TTkoOQM53ji7OJg4dThUODQ4FDjqN643MTswOzA7LzsrOyQ7GDsIO/E61Tq1OpI6bDpGOiA6+TnSOas5hDleOTc5ETnrOMY4oTh9OFk4NzgVOOg3qDdqNxI7EjsSOxE7DTsHO/067zraOsE6ozqBOlw6NjoPOuc5vzmXOW85SDkgOfk40jisOIY4YTg9OBk47DeoN2Y3JTfxOvE68TrwOu066DrfOtI6wDqpOow6bDpJOiM6+znTOas5gjlZOTE5CDngOLg4kThqOEQ4Hzj1N603ZzcjN+A2zTrNOs06zDrJOsU6vTqxOqE6jDpyOlQ6MjoNOuY5vjmVOWs5QjkYOe84xjieOHU4TjgnOAE4tzduNyY34DacNqU6pTqlOqQ6ojqeOpc6jDp+Oms6Uzo3Ohc68znNOaU5fDlTOSg5/jjVOKs4gjhZODE4CTjFN3g3LjflNp42WDZ5Onk6eTp4OnY6czpsOmM6VjpFOjA6Fjr3OdY5sTmKOWE5NzkNOeM4uTiPOGU4OzgTONU3hjc5N+42pDZcNhU2STpJOkg6SDpGOkM6PTo1Oio6GjoHOu850zmzOZA5ajlDORk58DjFOJs4cDhGOB045zeXN0c3+TatNmM2GjbUNRM6EjoSOhI6EDoNOgk6ATr3Oek52DnCOag5izlqOUY5IDn4OM84pTh7OFA4Jjj6N6g3VzcHN7k2bTYiNto1kzXWOdY51jnVOdQ50TnNOcc5vjmyOaI5jjl3OVw5PjkcOfg40jiqOIE4WDguOAU4tzdlNxU3xjZ5Ni024zWaNVQ1kTmROZE5kTmQOY45ijmEOXw5cjlkOVM5PjkmOQo56zjKOKY4gDhZODE4CTjBN3A3IDfRNoQ2NzbsNaM1XDUXNUM5QzlDOUI5QTlAOTw5ODkxOSg5HDkNOfs45jjOOLI4lDhzOFA4LDgGOL83cjclN9g2izZANvU1rDVlNR812zTnOOc45jjmOOU45DjhON442DjROMc4uzisOJo4hjhuOFQ4NzgYOO43qjdjNxw30zaKNkI2+TWyNWw1JzXjNKE0dzh3OHc4dzh2OHU4czhxOG04ZzhgOFc4TDg+OC44GzgGON03qjdzNzg3+ja7Nnk2Nzb0NbE1bjUrNek0qTRpNM83zzfPN883zjfON8w3yjfGN8E3uTevN6M3kzd/N2c3SzcrNwY33TawNoA2TDYVNtw1oTVlNSg16jStNG80MzQvNi82LzYvNjA2MjY0Njc2OjY+NkM2RzZLNk42TzZNNkk2QDYyNiA2CDbrNck1ojV3NUc1FTXgNKk0cDQ3NP0zAABGIKEl6ihGK+ssRS6rL4wwQjH2MaQySjPmMzo0ejSwNN40ATUaNSk1LjUoNRk1AjXkNL80lDRmNDQ0ATSYMwA8/Tv2O+074TvUO8Y7tjumO5U7gztyO2A7Tzs9Oyw7GzsKO/o66jrbOsw6vjqwOqM6ljqKOn46czpoOl46VDoAPME77DvrO+I71TvGO7c7pjuVO4Q7cjtgO087PTsrOxo7Cjv5Ouk62jrLOr06rzqhOpU6iDp9OnE6ZzpcOlI6/zvlO7w71DvZO9I7xju3O6c7ljuEO3I7YDtOOzw7KzsZOwg7+DrnOtg6yDq6Oqw6njqROoQ6eDpsOmE6VzpNOv079zvIO7Y7wjvGO8A7tDumO5U7hDtyO2A7Tjs7Oyk7FzsGO/U65DrUOsQ6tTqmOpg6ijp9OnE6ZTpZOk46Qzr6O/g74Du4O647sjuzO6w7oTuTO4I7cTteO0w7OTsnOxQ7AjvxOt86zzq+Oq46nzqQOoI6dDpmOlo6TTpBOjY69zv2O+o7yjutO6M7ojugO5g7jDt+O207WztJOzY7IzsQO/466zrZOsg6tjqmOpY6hjp3Omg6WTpMOj46MTolOvM78zvsO9c7uDuhO5c7kjuMO4M7djtnO1Y7RDsxOx47Czv4OuQ60jq/Oq06mzqKOnk6aTpZOko6OzosOh46ETruO+476jvdO8M7pzuUO4g7gDt4O207XztPOz47KzsYOwQ78DrcOsk6tTqiOo86fTprOlo6STo4Oig6GDoIOvk56TvoO+Y73TvKO7A7lzuFO3g7bTtiO1U7Rjs1OyM7Dzv7Ouc60zq+Oqo6ljqCOm46WzpIOjY6JDoSOgE68DnfOeI74jvhO9o7zDu2O507hjtzO2U7WDtKOzs7KzsZOwY78TrdOsc6sjqdOoc6cjpeOkk6NTohOg06+jnnOdU5wznbO9s72jvVO8s7uTuiO4k7cztgO1A7QDsxOyA7Djv6OuY60Tq7OqU6jjp4OmI6Szo2OiA6Cjr1OeA5zDm4OaQ50zvTO9I7zzvHO7g7pDuMO3Q7XjtKOzg7JzsVOwI77jrZOsM6rTqWOn86ZzpPOjg6IToJOvI53DnFOa85mTmDOck7yTvJO8Y7wDu1O6M7jTt1O107RjsxOx47Cjv2OuE6zDq1Op46hjpuOlU6PDojOgo68TnZOcA5qDmQOXg5YDm/O787vzu9O7g7rzugO4w7dTtcO0Q7LDsWOwA76zrVOr46pjqOOnU6XDpCOig6DTrzOdk5vjmkOYo5cDlWOT05tDu0O7M7sjuuO6Y7mjuJO3M7WztBOyg7Dzv3OuA6yDqwOpc6fjpkOkk6LjoSOvc52zm+OaI5hjlrOU85MzkYOac7pzunO6U7ojucO5E7gjtvO1c7PjsjOwk77zrVOrw6ojqIOm06Ujo2Ohk6/DnfOcE5pDmGOWg5SjktOQ858jiZO5k7mTuYO5U7jzuHO3k7aDtSOzk7HjsDO+c6zDqwOpQ6eDpcOj86IjoEOuU5xzmoOYg5aTlJOSo5CjnrOMw4iTuJO4k7iDuGO4E7ejtuO147SjsyOxg7/DrfOsI6pDqHOmk6SzotOg467jnOOa45jTlsOUs5KjkJOeg4xjimOHg7eDt4O3c7dTtxO2o7YDtSO0A7KTsQO/Q61jq4Opk6ejpaOjo6Gjr5Odg5tzmVOXI5UDktOQo55zjEOKI4fzhlO2U7ZTtkO2M7XztZO1A7QzsyOx07BTvqOsw6rTqNOmw6SzopOgc65TnCOZ85ezlXOTM5DznqOMY4oTh9OFk4UDtQO1A7TztOO0s7RTs9OzI7IjsPO/g63TrAOqA6fzpdOjs6GDr0OdA5qzmHOWE5PDkWOfA4yjikOH44WDgzODk7OTs5Ozg7Nzs0Oy87KDsdOw87/TrnOs46sTqSOnE6TjoqOgU64Dm7OZU5bjlHOSA5+TjROKo4gzhbODQ4DTgeOx47HjseOxw7GjsVOw87BTv4Oug60zq7OqA6gTpgOj06GDryOcw5pTl9OVU5LTkEOdw4sziKOGE4OTgQONA3ADsAOwA7ADv/Ovw6+DryOuo63jrPOrw6pTqKOm06TDopOgQ63jm2OY45ZTk8ORI56Di+OJQ4ajhAOBY42jeHN9463jreOt463TrbOtc60jrKOr86sTqfOoo6cTpUOjU6EjrtOcc5nzl2OUw5Ijn3OMw4oTh1OEo4HzjpN5Q3QDe3Orc6tzq2OrU6tDqwOqs6pDqaOo06fTppOlI6NzoZOvc50zmtOYU5XDkxOQY52zivOIM4VzgrOP03pjdQN/s2iDqIOog6iDqHOoU6gzp+Ong6bzpjOlQ6QjosOhM69jnXObQ5jzlnOT45FDnpOL04kThkODc4Czi9N2U3Dje3NlA6UDpQOlA6TzpNOks6RzpBOjk6LzoiOhE6/jnnOcw5rzmOOWs5RTkdOfQ4yTieOHE4RTgYONY3fTckN8w2djYJOgk6CToIOgg6BzoEOgE6/Dn2Oe054TnTOcI5rjmXOXw5Xzk+ORs59jjOOKY4ezhQOCQ48DeXNz435TaNNjY2qDmoOag5qDmnOaY5pTmiOZ85mjmTOYo5fzlyOWI5Tzk6OSE5BTnnOMY4ojh8OFU4LDgCOK03Vjf+NqY2Tzb5NQ05DTkNOQ05DTkNOQ05DDkLOQk5BzkDOf44+DjwOOY42TjJOLY4oDiHOGs4SzgpOAQ4ujdoNxQ3vzZpNhM2vTUAAOEtzDBKMpwzaDT2NHo19DVlNss2KDd6N8E3/TcWOCg4Mzg3ODY4LTgfOAs45TeqN2g3HzfRNoA2LDbYNYQ1ADz/O/07+jv2O/I77TvoO+M73TvYO9I7zDvGO8A7uju0O687qTujO547mTuUO487ijuGO4E7fTt5O3U7cTtuOwA8wjvxO/g79jvyO+076DvjO9072DvSO8w7xjvAO7o7tDuuO6g7ozudO5g7kzuOO4k7hDuAO3s7dztzO287azsAPOc7wTveO+w77jvrO+c74jvdO9c70TvLO8U7vzu4O7I7rDumO6A7mzuVO5A7ijuFO4A7ezt3O3I7bjtpO2U7/zv5O8w7vzvSO9874zviO9872zvVO887yTvDO707tjuwO6k7ozudO5Y7kDuKO4U7fzt5O3Q7bztqO2U7YDtbO/47/DvlO8E7vDvIO9M72DvYO9Y70TvMO8Y7wDu5O7M7rDulO547lzuRO4o7gzt9O3Y7cDtqO2Q7XjtYO1I7TTv9O/w78TvTO7o7uDvBO8g7zTvNO8s7xzvBO7s7tTuuO6c7nzuYO5A7iTuCO3o7cztsO2Q7XTtWO087SDtCOzs7/Dv8O/Y74jvGO7U7tDu5O747wTvBO787uju1O647pzugO5g7kDuIO4A7dztvO2c7XztWO047Rjs+OzU7LTslO/s7+jv3O+s71Du9O7A7rjuxO7Q7tTu0O7E7rDumO587mDuQO4c7fjt1O2w7YjtZO1A7Rjs8OzM7KTsgOxY7DDv5O/k79zvvO947yDu1O6o7pzuoO6k7qDumO6I7nTuWO447hTt8O3M7aTteO1Q7STs/OzQ7KTseOxI7Bzv8OvA69zv3O/Y78DvkO9E7vTutO6Q7nzueO507mjuXO5E7izuDO3o7cDtmO1s7UDtEOzg7LDsfOxM7Bjv5Ouw63zrSOvU79Tv0O/A75zvYO8U7szukO5s7ljuSO487izuFO387djttO2M7WDtMOz87MzslOxg7Cjv7Ou063jrPOsA6sTryO/I78TvvO+g73TvMO7k7qDubO5E7ijuFO387eTtyO2k7XztVO0k7PDsuOyA7ETsCO/I64jrSOsE6sDqfOo467zvvO+877TvoO9870TvAO607nTuQO4U7fTt1O247ZTtcO1E7RTs5Oys7HDsMO/w66zraOsg6tjqjOpA6fTppOuw77DvsO+o75jvfO9Q7xDuyO6E7kTuDO3c7bTtjO1k7TztDOzY7KDsZOwk7+DrmOtM6wDqsOpg6gzpuOlk6QzrpO+k76DvnO+Q73jvVO8c7tzulO5M7gjt0O2c7WjtOO0I7NTsmOxc7Bzv1OuM6zzq7OqY6kDp6OmM6SzozOhs65TvlO+Q74zvhO9w71DvIO7k7qDuWO4M7cjtiO1M7RTs2Oyc7FzsGO/U64TrNOrg6ojqLOnM6WjpBOig6DTrzOeA74DvgO9873TvZO9I7yDu7O6o7mDuFO3I7XztOOz07LDsbOwk79jriOs46uDqhOog6bzpVOjs6HzoDOuc5yjnbO9s72zvbO9k71TvQO8c7uzurO5o7hjtyO147Sjs2OyM7Dzv7OuY60Tq6OqI6iTpvOlQ6ODobOv053znAOaA51jvWO9Y71TvUO9E7zDvEO7k7qzuaO4c7cjtcO0c7MTsbOwU77jrXOr86pzqNOnE6VTo4Oho6+znbObo5mTl3OdA70DvQO887zjvLO8c7wDu2O6k7mTuHO3I7WztEOyw7FDv8OuM6yTqvOpQ6eDpaOjw6HDr8Ods5uDmVOXI5TTnJO8k7yTvJO8c7xTvBO7s7sjumO5c7hTtxO1o7QjsoOw478zrYOrw6nzqCOmM6RDojOgE63jm7OZY5cTlLOSQ5wTvBO8E7wTvAO747uju1O607ojuUO4M7bjtYOz87JDsIO+w6zjqwOpE6cTpPOi06CjrmOcE5mzl0OUw5JDn7OLk7uTu5O7g7tzu2O7I7rTumO5w7jzt+O2s7VDs7OyA7AzvkOsU6pDqDOmA6PDoYOvI5zDmkOXw5UjkpOf440zivO687rzuvO647rDupO6U7njuUO4g7eTtmO1A7NzsbO/063Tq8Opk6dTpQOio6AzrbObI5iDldOTE5BTnZOKw4pDukO6M7ozuiO6E7njuaO5Q7izt/O3E7XztJOzA7FTv2OtU6szqOOmg6QToYOu85xDmYOWw5PzkROeM4tDiFOJY7ljuWO5Y7lTuUO5E7jTuHO387dDtnO1U7QTsoOw077jrNOqk6gzpbOjI6BzrbOa45gDlROSE58TjBOJA4XziGO4Y7hjuGO4U7hDuCO347eDtxO2c7WjtJOzU7HjsDO+Q6wjqeOnc6TjoiOvY5xzmYOWc5NjkEOdI4nzhtODo4cjtyO3I7cjtxO3A7bjtrO2Y7XjtVO0k7OTsmOw879TrXOrY6kTppOj86EzrkObQ5gjlQORw56Di0OH84SjgWOFg7WDtYO1g7VztWO1Q7UTtNO0Y7PTsyOyM7ETv8OuM6xjqlOoE6WTovOgE60jmgOW05ODkDOc04ljhfOCk45jc0OzQ7NDszOzM7MjswOy07KTskOxw7ETsEO/Q64DrJOq06jjprOkU6GzruOb45izlXOSE56TixOHk4QTgIOKI39jr2OvY69jr1OvQ68zrxOu466TrjOts60DrDOrI6nzqHOmw6TDooOgE61TmmOXQ5QDkJOdA4lzhdOCM40jdgNwAAZzdzONY4IDlcOY45uDncOfo5EzonOjY6PzpCOkA6ODopOhU6+jnaObQ5iTlZOSY58Di3OHw4QTgFOJU3ITc/IwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+CR1JOcpoy7+K6gzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8k2iSvJwIpUiq1KrQrLCxILcAyFzAXMuIwTzEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlJ9EoDyk9Ka0payohK/UrQywPLXcu6C7OLgowdTDqMCgxqzB2ND0zDzJ4Mtg0JDY/Nmk3JTcAAAAAAAAAAAAARSmYKlQrgSueK98rICx8LPoshi0qLscu3C7QL0swYjDlMNcwpjFAMqoyUzK/M0c18DRWNiM2zTaoNs024DVxN4MqJyztLFUtii26Le4tNy55Lvwuai/0LygwVDDQMNowEzFVMccxxDFeMsAy/zKjMxA0YjSSNKo0sDRaNdg1MzbAK+8sIC79Lo8v+y8mMEowazCVMLww6jAaMVcxnjG/MdkxLDJtMqky7jJRM6cz6jNANEs0mjTlNP80pjWxNe81hyy+LTwvPTC1MAsxTzGGMbEx1jH8MR0ySjJ0MqIyxTLxMjYzbzOXM8YzBjQxNE40fTShNN80DTVUNZ019TUTNkMtpy4sMOowhTH1MUsykDLJMvQyHjNEM2ozizOrM84z9jMWNCs0TDRiNH40pDTBNOQ0CzU8NWo1qzXmNSw2WjYkLqkvvDCNMTwywzIoM3cztzPvMw80JDQ2NEs0XjRzNIM0mTStNME01zTwNBA1MTVUNXE1nTXNNf81PTZ3Nq02Jy9iMGAxMjLnMn8z+DMpNE00bTSINKE0tjTKNN808zQHNRk1LDVDNVs1dDWONag1xjXmNQA2LTZWNpM2xjYJNx4wAjEIMtkykDMbNF00kjS7NN40/DQXNTA1RTVbNW41gzWVNas1vTXVNeo1CDYfNj82XDZ4Npc2vjbkNiU3XTe0MLQxuDKGMyE0dTS7NPY0JDVKNWs1hzWiNbs10jXnNf01ETYkNjk2TDZkNnw2lTaxNtA27zYONy83VTeJN7w3XTFyMmwzIDR/NNI0GjVXNYs1tTXZNfc1EzYsNkQ2XDZyNoc2nDaxNsY23Db0Ngs3JDdAN183fjeiN8Y39TcQOB0yMTMXNII04TQ1NX41vDXyNR82RjZnNoQ2nza4NtA25zb9NhM3KDc+N1M3ajeBN5o3tTfQN+03BzgYOCw4QTjqMvkzfjTqNEk1njXnNSc2XDaMNrU22Tb4NhU3LzdHN183dDeLN6E3tzfMN+I3+TcIOBU4IjgwOD44TjheOHE4uzNlNOs0WDW2NQs2VTaWNs42/zYoN003bzeNN6g3wTfZN/E3AzgOOBk4IzguODo4RDhROFw4aTh2OIQ4lDikOEk01DReNcw1KzZ+Nsg2CTdCN3U3oDfHN+k3BDgSOB84Kzg3OEI4TThYOGI4bTh4OII4jDiYOKM4sDi9OMo42Ti6NEk11jVENqM29TY+N4A3uTftNw04ITgzOEM4UjhfOGs4dziCOI04mDiiOKw4tjjAOMo41DjeOOk49Dj/OA05MzXENVI2wTYfN3E3uTf5Nxk4MzhKOF44cTiBOJA4njirOLc4wjjMONc44TjrOPU4/jgHOQ85GjkjOSs5NTlBObI1RDbUNkU3ojfyNxw4OzhXOG84hjiaOK04vTjMONo46Dj0OP84CTkUOR45JzkxOTo5QjlLOVQ5XDljOWo5dDk4Nss2XTfNNxU4PDheOHw4ljitOMM41TjnOPc4BjkUOSE5LTk4OUM5TTlXOWA5aDlxOXk5gTmJOZE5mTmfOaU5xDZYN+k3LDhaOIE4oji+ONc47TgBORI5IzkxOT85SzlYOWM5bTl3OYE5ijmTOZw5pDmsObQ5uznCOck50DnWOVc36Tc8OHM4oDjFOOU4ADkYOS05PzlPOV45bDl4OYQ5jjmZOaI5qzm0Obw5xDnMOdM52jnhOeg57zn1Ofs5AjruNz44hTi6OOU4CTknOUE5VzlqOXw5izmYOaU5sDm7OcQ5zTnWOd455jntOfQ5+zkBOgg6DjoUOho6HzolOis6QziHOMs4/jgoOUk5Zjl/OZQ5pjm2OcM50DnbOeY57zn4OQA6BzoPOhY6HDoiOig6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";
  }
});

// src/kernel/tables.ts
function halfToFloat(h) {
  const sign = h & 32768 ? -1 : 1;
  const exp = h >> 10 & 31;
  const mant = h & 1023;
  if (exp === 0) return sign * mant * 2 ** -24;
  if (exp === 31) return mant ? NaN : sign * Infinity;
  return sign * (1 + mant / 1024) * 2 ** (exp - 15);
}
function base64ToBytes(b64) {
  const g = globalThis;
  if (g.Buffer) return new Uint8Array(g.Buffer.from(b64, "base64"));
  const bin = g.atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bsdfTables() {
  if (cached) return cached;
  const bytes = base64ToBytes(TABLES_HALF_BASE64);
  const halves = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 1);
  const data = new Float32Array(halves.length);
  for (let i = 0; i < halves.length; i++) data[i] = halfToFloat(halves[i]);
  const off = (name) => {
    const e = TABLE_LAYOUT[name];
    if (!e) throw new Error(`BSDF table ${name} missing from the generated tables`);
    return e[0];
  };
  cached = {
    data,
    ggx_E: off("ggx_E"),
    ggx_Eavg: off("ggx_Eavg"),
    ggx_glass_E: off("ggx_glass_E"),
    ggx_glass_Eavg: off("ggx_glass_Eavg"),
    ggx_glass_inv_E: off("ggx_glass_inv_E"),
    ggx_glass_inv_Eavg: off("ggx_glass_inv_Eavg"),
    ggx_gen_schlick_ior_s: off("ggx_gen_schlick_ior_s"),
    ggx_gen_schlick_s: off("ggx_gen_schlick_s"),
    sheen_ltc: off("sheen_ltc")
  };
  return cached;
}
function lookupTableRead(t, x, offset, size) {
  x = (x < 0 ? 0 : x > 1 ? 1 : x) * (size - 1);
  const index = Math.min(Math.trunc(x), size - 1);
  const nindex = Math.min(index + 1, size - 1);
  const f = x - index;
  const d0 = t[index + offset];
  if (f === 0) return d0;
  return (1 - f) * d0 + f * t[nindex + offset];
}
function lookupTableRead2D(t, x, y, offset, xsize, ysize) {
  y = (y < 0 ? 0 : y > 1 ? 1 : y) * (ysize - 1);
  const index = Math.min(Math.trunc(y), ysize - 1);
  const nindex = Math.min(index + 1, ysize - 1);
  const f = y - index;
  const d0 = lookupTableRead(t, x, offset + xsize * index, xsize);
  if (f === 0) return d0;
  return (1 - f) * d0 + f * lookupTableRead(t, x, offset + xsize * nindex, xsize);
}
function lookupTableRead3D(t, x, y, z, offset, xsize, ysize, zsize) {
  z = (z < 0 ? 0 : z > 1 ? 1 : z) * (zsize - 1);
  const index = Math.min(Math.trunc(z), zsize - 1);
  const nindex = Math.min(index + 1, zsize - 1);
  const f = z - index;
  const d0 = lookupTableRead2D(t, x, y, offset + xsize * ysize * index, xsize, ysize);
  if (f === 0) return d0;
  return (1 - f) * d0 + f * lookupTableRead2D(t, x, y, offset + xsize * ysize * nindex, xsize, ysize);
}
var cached;
var init_tables = __esm({
  "src/kernel/tables.ts"() {
    "use strict";
    init_tables_generated();
    cached = null;
  }
});

// src/util/math.ts
function f3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}
function set3(o, x, y, z) {
  o.x = x;
  o.y = y;
  o.z = z;
  return o;
}
function cross3(o, a, b) {
  const x = a.y * b.z - a.z * b.y;
  const y = a.z * b.x - a.x * b.z;
  const z = a.x * b.y - a.y * b.x;
  o.x = x;
  o.y = y;
  o.z = z;
  return o;
}
function normalize3(o, a) {
  const l = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  const inv = l > 0 ? 1 / l : 0;
  o.x = a.x * inv;
  o.y = a.y * inv;
  o.z = a.z * inv;
  return o;
}
function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}
function saturate(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
function mix(a, b, t) {
  return a + (b - a) * t;
}
function sqr(x) {
  return x * x;
}
function safeSqrt(x) {
  return Math.sqrt(Math.max(x, 0));
}
function safeAsin(x) {
  return Math.asin(clamp(x, -1, 1));
}
function inverseLerp(a, b, x) {
  return (x - a) / (b - a);
}
function sinFromCos(c) {
  return safeSqrt(1 - c * c);
}
function makeOrthonormals(N, a, b) {
  if (N.x !== N.y || N.x !== N.z) set3(a, N.z - N.y, N.x - N.z, N.y - N.x);
  else set3(a, N.z - N.y, N.x + N.z, -N.y - N.x);
  normalize3(a, a);
  cross3(b, N, a);
}
function makeOrthonormalsTangent(N, T, a, b) {
  cross3(b, N, T);
  normalize3(b, b);
  cross3(a, b, N);
}
function mat4Multiply(a, b) {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  }
  return o;
}
function mat4Invert(m) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = Array.from(m);
  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;
  const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  const id = det !== 0 ? 1 / det : 0;
  return [
    (a11 * b11 - a12 * b10 + a13 * b09) * id,
    (a02 * b10 - a01 * b11 - a03 * b09) * id,
    (a31 * b05 - a32 * b04 + a33 * b03) * id,
    (a22 * b04 - a21 * b05 - a23 * b03) * id,
    (a12 * b08 - a10 * b11 - a13 * b07) * id,
    (a00 * b11 - a02 * b08 + a03 * b07) * id,
    (a32 * b02 - a30 * b05 - a33 * b01) * id,
    (a20 * b05 - a22 * b02 + a23 * b01) * id,
    (a10 * b10 - a11 * b08 + a13 * b06) * id,
    (a01 * b08 - a00 * b10 - a03 * b06) * id,
    (a30 * b04 - a31 * b02 + a33 * b00) * id,
    (a21 * b02 - a20 * b04 - a23 * b00) * id,
    (a11 * b07 - a10 * b09 - a12 * b06) * id,
    (a00 * b09 - a01 * b07 + a02 * b06) * id,
    (a31 * b01 - a30 * b03 - a32 * b00) * id,
    (a20 * b03 - a21 * b01 + a22 * b00) * id
  ];
}
function mat4Determinant3x3(m) {
  return m[0] * (m[5] * m[10] - m[9] * m[6]) - m[4] * (m[1] * m[10] - m[9] * m[2]) + m[8] * (m[1] * m[6] - m[5] * m[2]);
}
var M_2PI, M_1_PI, M_1_2PI, M_1_4PI, M_PI_2, M_PI_4;
var init_math = __esm({
  "src/util/math.ts"() {
    "use strict";
    M_2PI = 2 * Math.PI;
    M_1_PI = 1 / Math.PI;
    M_1_2PI = 1 / (2 * Math.PI);
    M_1_4PI = 1 / (4 * Math.PI);
    M_PI_2 = Math.PI / 2;
    M_PI_4 = Math.PI / 4;
  }
});

// src/kernel/globals.ts
var KernelGlobals;
var init_globals = __esm({
  "src/kernel/globals.ts"() {
    "use strict";
    init_layout();
    KernelGlobals = class {
      u32;
      f32;
      i32;
      texels;
      nodes;
      numTris;
      triVerts;
      triInfo;
      vertNormals;
      vertUVs;
      shaders;
      numShaders;
      textures;
      numLights;
      lights;
      numDistribution;
      distribution;
      pdfTriangles;
      pdfLights;
      /** Cycles' light tree, when the scene was compiled with it. */
      useLightTree;
      lightTreeNodes;
      lightTreeEmitters;
      backgroundLight;
      bgResX;
      bgResY;
      bgMarginal;
      bgConditional;
      filterTable;
      worldShader;
      flags;
      numHittableLights;
      hittableLights;
      tGgxE;
      tGgxEavg;
      tGgxGlassE;
      tGgxGlassEavg;
      tGgxGlassInvE;
      tGgxGlassInvEavg;
      tGenSchlickIorS;
      tGenSchlickS;
      tSheenLtc;
      sceneRadius;
      constructor(buffers) {
        const s = buffers.scene;
        this.u32 = s;
        this.f32 = new Float32Array(s.buffer, s.byteOffset, s.length);
        this.i32 = new Int32Array(s.buffer, s.byteOffset, s.length);
        this.texels = buffers.texels;
        this.nodes = s[H.NODES];
        this.numTris = s[H.NUM_TRIS];
        this.triVerts = s[H.TRI_VERTS];
        this.triInfo = s[H.TRI_INFO];
        this.vertNormals = s[H.VERT_NORMALS];
        this.vertUVs = s[H.VERT_UVS];
        this.shaders = s[H.SHADERS];
        this.numShaders = s[H.NUM_SHADERS];
        this.textures = s[H.TEXTURES];
        this.numLights = s[H.NUM_LIGHTS];
        this.lights = s[H.LIGHTS];
        this.numDistribution = s[H.NUM_DISTRIBUTION];
        this.distribution = s[H.DISTRIBUTION];
        this.pdfTriangles = this.f32[H.PDF_TRIANGLES];
        this.pdfLights = this.f32[H.PDF_LIGHTS];
        this.useLightTree = (s[H.FLAGS] & SceneFlags.USE_LIGHT_TREE) !== 0 && s[H.NUM_LIGHT_TREE_NODES] > 0;
        this.lightTreeNodes = s[H.LIGHT_TREE_NODES];
        this.lightTreeEmitters = s[H.LIGHT_TREE_EMITTERS];
        this.backgroundLight = s[H.BACKGROUND_LIGHT] === NONE ? -1 : s[H.BACKGROUND_LIGHT];
        this.bgResX = s[H.BG_RES_X];
        this.bgResY = s[H.BG_RES_Y];
        this.bgMarginal = s[H.BG_MARGINAL];
        this.bgConditional = s[H.BG_CONDITIONAL];
        this.filterTable = s[H.FILTER_TABLE];
        this.worldShader = s[H.WORLD_SHADER];
        this.flags = s[H.FLAGS];
        this.numHittableLights = s[H.NUM_HITTABLE_LIGHTS];
        this.hittableLights = s[H.HITTABLE_LIGHTS];
        this.tGgxE = s[H.TABLE_GGX_E];
        this.tGgxEavg = s[H.TABLE_GGX_EAVG];
        this.tGgxGlassE = s[H.TABLE_GGX_GLASS_E];
        this.tGgxGlassEavg = s[H.TABLE_GGX_GLASS_EAVG];
        this.tGgxGlassInvE = s[H.TABLE_GGX_GLASS_INV_E];
        this.tGgxGlassInvEavg = s[H.TABLE_GGX_GLASS_INV_EAVG];
        this.tGenSchlickIorS = s[H.TABLE_GGX_GEN_SCHLICK_IOR_S];
        this.tGenSchlickS = s[H.TABLE_GGX_GEN_SCHLICK_S];
        this.tSheenLtc = s[H.TABLE_SHEEN_LTC];
        const f = this.f32;
        const dx = f[H.BOUNDS_MAX] - f[H.BOUNDS_MIN];
        const dy = f[H.BOUNDS_MAX + 1] - f[H.BOUNDS_MIN + 1];
        const dz = f[H.BOUNDS_MAX + 2] - f[H.BOUNDS_MIN + 2];
        this.sceneRadius = Number.isFinite(dx) && dx >= 0 ? 0.5 * Math.sqrt(dx * dx + dy * dy + dz * dz) : 1;
      }
    };
  }
});

// src/kernel/texture.ts
function halfTable() {
  if (HALF_TO_FLOAT) return HALF_TO_FLOAT;
  const t = new Float32Array(65536);
  for (let h = 0; h < 65536; h++) {
    const sign = h & 32768 ? -1 : 1;
    const exp = h >> 10 & 31;
    const mant = h & 1023;
    t[h] = exp === 0 ? sign * mant * 2 ** -24 : exp === 31 ? mant ? NaN : sign * Infinity : sign * (1 + mant / 1024) * 2 ** (exp - 15);
  }
  HALF_TO_FLOAT = t;
  return t;
}
function wrap(i, n, mode) {
  if (mode === 0) {
    i %= n;
    return i < 0 ? i + n : i;
  }
  if (mode === 1) return i < 0 ? 0 : i >= n ? n - 1 : i;
  const period = 2 * n;
  let m = i % period;
  if (m < 0) m += period;
  return m < n ? m : period - 1 - m;
}
function fetchTexel(kg, offset, width, flags, x, y, out, o, w) {
  const t = kg.texels;
  if (flags & TexFlags.HALF) {
    const h = halfTable();
    const base = offset + (y * width + x) * 2;
    const a = t[base];
    const b = t[base + 1];
    out[o] += w * h[a & 65535];
    out[o + 1] += w * h[a >>> 16];
    out[o + 2] += w * h[b & 65535];
    out[o + 3] += w * h[b >>> 16];
  } else {
    const p = t[offset + y * width + x];
    const lut = flags & TexFlags.SRGB ? SRGB_TO_LINEAR : LINEAR_8;
    out[o] += w * lut[p & 255];
    out[o + 1] += w * lut[p >>> 8 & 255];
    out[o + 2] += w * lut[p >>> 16 & 255];
    out[o + 3] += w * LINEAR_8[p >>> 24];
  }
}
function textureLookup(kg, tex, u, v, out, o = 0) {
  const d = kg.textures + tex * TEX_SIZE;
  const U = kg.u32;
  const F = kg.f32;
  const offset = U[d + TX.OFFSET];
  const width = U[d + TX.WIDTH];
  const height = U[d + TX.HEIGHT];
  const flags = U[d + TX.FLAGS];
  const m = d + TX.M;
  const tu = F[m] * u + F[m + 1] * v + F[m + 2];
  const tv = F[m + 3] * u + F[m + 4] * v + F[m + 5];
  const wrapS = flags >>> TexFlags.WRAP_S_SHIFT & 3;
  const wrapT = flags >>> TexFlags.WRAP_T_SHIFT & 3;
  const fy = flags & TexFlags.FLIP_Y ? tv : 1 - tv;
  out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
  const x = tu * width - 0.5;
  const y = fy * height - 0.5;
  if (flags & TexFlags.NEAREST) {
    const ix = wrap(Math.floor(x + 0.5), width, wrapS);
    const iy = wrap(Math.floor(y + 0.5), height, wrapT);
    fetchTexel(kg, offset, width, flags, ix, iy, out, o, 1);
    return;
  }
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const ax = x - x0;
  const ay = y - y0;
  const ix0 = wrap(x0, width, wrapS);
  const ix1 = wrap(x0 + 1, width, wrapS);
  const iy0 = wrap(y0, height, wrapT);
  const iy1 = wrap(y0 + 1, height, wrapT);
  fetchTexel(kg, offset, width, flags, ix0, iy0, out, o, (1 - ax) * (1 - ay));
  fetchTexel(kg, offset, width, flags, ix1, iy0, out, o, ax * (1 - ay));
  fetchTexel(kg, offset, width, flags, ix0, iy1, out, o, (1 - ax) * ay);
  fetchTexel(kg, offset, width, flags, ix1, iy1, out, o, ax * ay);
}
function directionToEquirect(dx, dy, dz, rotation, out, o = 0) {
  let x = dx;
  let z = dz;
  if (rotation !== 0) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    x = c * dx + s * dz;
    z = -s * dx + c * dz;
  }
  const len = Math.sqrt(x * x + dy * dy + z * z);
  out[o] = Math.atan2(z, x) * (0.5 / Math.PI) + 0.5;
  out[o + 1] = Math.asin(Math.max(-1, Math.min(1, dy / (len || 1)))) / Math.PI + 0.5;
}
function equirectToDirection(u, v, rotation, out, o = 0) {
  const phi = (u - 0.5) * 2 * Math.PI;
  const lat = (v - 0.5) * Math.PI;
  const r = Math.cos(lat);
  let x = r * Math.cos(phi);
  const y = Math.sin(lat);
  let z = r * Math.sin(phi);
  if (rotation !== 0) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    const rx = c * x - s * z;
    const rz = s * x + c * z;
    x = rx;
    z = rz;
  }
  out[o] = x;
  out[o + 1] = y;
  out[o + 2] = z;
}
var SRGB_TO_LINEAR, LINEAR_8, HALF_TO_FLOAT;
var init_texture = __esm({
  "src/kernel/texture.ts"() {
    "use strict";
    init_layout();
    SRGB_TO_LINEAR = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const c = i / 255;
      SRGB_TO_LINEAR[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    LINEAR_8 = new Float32Array(256);
    for (let i = 0; i < 256; i++) LINEAR_8[i] = i / 255;
    HALF_TO_FLOAT = null;
  }
});

// src/scene/compile.ts
function toHalf(value) {
  const f32 = new Float32Array([value]);
  const u = new Uint32Array(f32.buffer)[0];
  const sign = u >>> 16 & 32768;
  const exp = (u >>> 23 & 255) - 127 + 15;
  const mant = u & 8388607;
  if ((u >>> 23 & 255) === 255) return sign | 31744 | (mant ? 512 : 0);
  if (exp >= 31) return sign | 31743;
  if (exp <= 0) {
    if (exp < -10) return sign;
    const m = mant | 8388608;
    const shift = 14 - exp;
    let half2 = m >>> shift;
    const rem2 = m & (1 << shift) - 1;
    const halfway = 1 << shift - 1;
    if (rem2 > halfway || rem2 === halfway && half2 & 1) half2++;
    return sign | half2;
  }
  let half = sign | exp << 10 | mant >>> 13;
  const rem = mant & 8191;
  if (rem > 4096 || rem === 4096 && half & 1) half++;
  return half;
}
function filterFunc(type, v, width) {
  if (type === "box") return 1;
  if (type === "gaussian") {
    v *= 6 / width;
    return Math.exp(-2 * v * v);
  }
  v = 2 * Math.PI * (v / width + 0.5);
  return 0.35875 - 0.48829 * Math.cos(v) + 0.14128 * Math.cos(2 * v) - 0.01168 * Math.cos(3 * v);
}
function buildFilterTable(type, width) {
  if (type === "gaussian") width *= 3;
  else if (type === "blackman-harris") width *= 2;
  const resolution = FILTER_TABLE_SIZE;
  const from = 0;
  const to = width * 0.5;
  const res = resolution - 1;
  const cdf = new Float64Array(res + 1);
  const range = to - from;
  cdf[0] = 0;
  for (let i = 0; i < res; i++) {
    const x = from + range * i / (res - 1);
    cdf[i + 1] = cdf[i] + Math.abs(filterFunc(type, x, width));
  }
  const fac = cdf[res] === 0 ? 0 : 1 / cdf[res];
  for (let i = 0; i <= res; i++) cdf[i] *= fac;
  cdf[res] = 1;
  const inv = new Float32Array(resolution);
  const halfSize = resolution - 1 >> 1;
  const cdfSize = cdf.length;
  for (let i = 0; i <= halfSize; i++) {
    const x = i / halfSize;
    let lo = 0;
    let hi = cdfSize;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      if (cdf[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    let index = lo;
    let t;
    if (index < cdfSize - 1) t = (x - cdf[index]) / (cdf[index + 1] - cdf[index]);
    else {
      t = 0;
      index = cdfSize - 1;
    }
    const y = (index + t) / (resolution - 1) * (2 * range);
    inv[halfSize + i] = 0.5 * (1 + y);
    inv[halfSize - i] = 0.5 * (1 - y);
  }
  return inv;
}
function rgb(c, def) {
  return c ?? def;
}
function compileScene(desc, settings = {}) {
  const textures = desc.textures ?? [];
  const lights = desc.lights ?? [];
  const world = desc.world ?? {};
  const texelChunks = [];
  let texelWords = 0;
  const imageOffsets = [];
  for (const tex of textures) {
    imageOffsets.push(texelWords);
    const n = tex.width * tex.height;
    if (tex.data instanceof Float32Array) {
      const words = new Uint32Array(n * 2);
      for (let i = 0; i < n; i++) {
        const r = toHalf(tex.data[i * 4]);
        const g = toHalf(tex.data[i * 4 + 1]);
        const b = toHalf(tex.data[i * 4 + 2]);
        const a = toHalf(tex.data[i * 4 + 3]);
        words[i * 2] = (r | g << 16) >>> 0;
        words[i * 2 + 1] = (b | a << 16) >>> 0;
      }
      texelChunks.push(words);
      texelWords += words.length;
    } else {
      const words = new Uint32Array(n);
      const d = tex.data;
      for (let i = 0; i < n; i++) words[i] = (d[i * 4] | d[i * 4 + 1] << 8 | d[i * 4 + 2] << 16 | d[i * 4 + 3] << 24) >>> 0;
      texelChunks.push(words);
      texelWords += words.length;
    }
  }
  const texels = new Uint32Array(Math.max(texelWords, 4));
  {
    let o = 0;
    for (const c of texelChunks) {
      texels.set(c, o);
      o += c.length;
    }
  }
  const descKeys = [];
  const descIndex = /* @__PURE__ */ new Map();
  const slot = (ref) => {
    if (!ref) return NONE;
    if (!(ref.texture >= 0 && ref.texture < textures.length)) throw new Error(`Texture reference ${ref.texture} is out of range (${textures.length} textures)`);
    const transform = JSON.stringify(ref.transform ?? [1, 0, 0, 0, 1, 0]);
    const key = `${ref.texture}|${transform}`;
    let i = descIndex.get(key);
    if (i === void 0) {
      i = descKeys.length;
      descKeys.push({ texture: ref.texture, transform });
      descIndex.set(key, i);
    }
    return i;
  };
  const shaderRecs = [];
  const emissive = [];
  const opaqueShadow = [];
  const addShader = (m) => {
    const u = /* @__PURE__ */ new Map();
    const f = /* @__PURE__ */ new Map();
    for (const k of [SH.BASE_COLOR_TEX, SH.METALLIC_ROUGHNESS_TEX, SH.TRANSMISSION_TEX, SH.EMISSION_TEX, SH.NORMAL_TEX, SH.ALPHA_TEX, SH.ENV_TEX, SH.COAT_WEIGHT_TEX, SH.COAT_ROUGHNESS_TEX, SH.COAT_NORMAL_TEX, SH.SHEEN_TINT_TEX, SH.SHEEN_ROUGHNESS_TEX]) u.set(k, NONE);
    let flags2 = 0;
    const setColor = (at, c) => {
      f.set(at, c[0]);
      f.set(at + 1, c[1]);
      f.set(at + 2, c[2]);
    };
    let em = [0, 0, 0];
    let alphaLike = false;
    switch (m.type) {
      case "principled": {
        u.set(SH.TYPE, ShaderType.PRINCIPLED);
        setColor(SH.BASE_COLOR, rgb(m.baseColor, [0.8, 0.8, 0.8]));
        u.set(SH.BASE_COLOR_TEX, slot(m.baseColorTexture));
        f.set(SH.METALLIC, m.metallic ?? 0);
        f.set(SH.ROUGHNESS, m.roughness ?? 0.5);
        u.set(SH.METALLIC_ROUGHNESS_TEX, slot(m.metallicRoughnessTexture));
        f.set(SH.IOR, m.ior ?? 1.5);
        f.set(SH.TRANSMISSION, m.transmission ?? 0);
        u.set(SH.TRANSMISSION_TEX, slot(m.transmissionTexture));
        f.set(SH.SPECULAR_IOR_LEVEL, m.specularIorLevel ?? 0.5);
        setColor(SH.SPECULAR_TINT, rgb(m.specularTint, [1, 1, 1]));
        const s = m.emissionStrength ?? (m.emissionColor ? 1 : 0);
        const ec = rgb(m.emissionColor, [1, 1, 1]);
        em = [ec[0] * s, ec[1] * s, ec[2] * s];
        setColor(SH.EMISSION, em);
        u.set(SH.EMISSION_TEX, slot(m.emissionTexture));
        u.set(SH.NORMAL_TEX, slot(m.normalTexture));
        f.set(SH.NORMAL_SCALE, m.normalScale ?? 1);
        f.set(SH.ALPHA, m.alpha ?? 1);
        u.set(SH.ALPHA_TEX, slot(m.alphaTexture));
        alphaLike = (m.alpha ?? 1) < 1 || !!m.alphaTexture;
        const coat = Math.max(m.coatWeight ?? 0, 0);
        f.set(SH.COAT_WEIGHT, coat);
        f.set(SH.COAT_ROUGHNESS, m.coatRoughness ?? 0.03);
        f.set(SH.COAT_IOR, m.coatIor ?? 1.5);
        setColor(SH.COAT_TINT, rgb(m.coatTint, [1, 1, 1]));
        u.set(SH.COAT_WEIGHT_TEX, slot(m.coatWeightTexture));
        u.set(SH.COAT_ROUGHNESS_TEX, slot(m.coatRoughnessTexture));
        u.set(SH.COAT_NORMAL_TEX, slot(m.coatNormalTexture));
        f.set(SH.COAT_NORMAL_SCALE, m.coatNormalScale ?? 1);
        if (m.coatNormal === "geometry") flags2 |= ShaderFlags.COAT_GEOMETRY_NORMAL;
        const sheen = Math.max(m.sheenWeight ?? 0, 0);
        f.set(SH.SHEEN_WEIGHT, sheen);
        setColor(SH.SHEEN_TINT, rgb(m.sheenTint, [1, 1, 1]));
        u.set(SH.SHEEN_TINT_TEX, slot(m.sheenTintTexture));
        f.set(SH.SHEEN_ROUGHNESS, m.sheenRoughness ?? 0.5);
        u.set(SH.SHEEN_ROUGHNESS_TEX, slot(m.sheenRoughnessTexture));
        f.set(SH.ANISOTROPIC, m.anisotropic ?? 0);
        f.set(SH.ANISOTROPIC_ROTATION, m.anisotropicRotation ?? 0);
        if (u.get(SH.EMISSION_TEX) === NONE && u.get(SH.BASE_COLOR_TEX) === NONE && u.get(SH.ALPHA_TEX) === NONE && coat === 0 && sheen === 0) flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      }
      case "diffuse":
        u.set(SH.TYPE, ShaderType.DIFFUSE);
        setColor(SH.BASE_COLOR, rgb(m.color, [0.8, 0.8, 0.8]));
        u.set(SH.BASE_COLOR_TEX, slot(m.colorTexture));
        flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      case "glossy":
        u.set(SH.TYPE, ShaderType.GLOSSY);
        setColor(SH.BASE_COLOR, rgb(m.color, [0.8, 0.8, 0.8]));
        f.set(SH.ROUGHNESS, m.roughness ?? 0.5);
        flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      case "glass":
        u.set(SH.TYPE, ShaderType.GLASS);
        setColor(SH.BASE_COLOR, rgb(m.color, [1, 1, 1]));
        f.set(SH.ROUGHNESS, m.roughness ?? 0);
        f.set(SH.IOR, m.ior ?? 1.5);
        flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      case "emission": {
        u.set(SH.TYPE, ShaderType.EMISSION);
        const s = m.strength ?? 1;
        const c = rgb(m.color, [1, 1, 1]);
        em = [c[0] * s, c[1] * s, c[2] * s];
        setColor(SH.EMISSION, em);
        flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      }
      case "transparent":
        u.set(SH.TYPE, ShaderType.TRANSPARENT);
        setColor(SH.BASE_COLOR, rgb(m.color, [1, 1, 1]));
        alphaLike = true;
        flags2 |= ShaderFlags.CONSTANT_EMISSION;
        break;
      default:
        throw new Error(`Unknown material type ${m.type}`);
    }
    const hasEmission = em[0] > 0 || em[1] > 0 || em[2] > 0;
    if (hasEmission) flags2 |= ShaderFlags.HAS_EMISSION | ShaderFlags.USE_MIS;
    if (alphaLike) flags2 |= ShaderFlags.HAS_ALPHA;
    u.set(SH.FLAGS, flags2);
    shaderRecs.push({ u, f });
    emissive.push(hasEmission);
    opaqueShadow.push(!alphaLike);
  };
  for (const m of desc.materials) addShader(m);
  if (desc.materials.length === 0) addShader({ type: "diffuse" });
  const worldIndex = shaderRecs.length;
  {
    const u = /* @__PURE__ */ new Map();
    const f = /* @__PURE__ */ new Map();
    for (const k of [SH.BASE_COLOR_TEX, SH.METALLIC_ROUGHNESS_TEX, SH.TRANSMISSION_TEX, SH.EMISSION_TEX, SH.NORMAL_TEX, SH.ALPHA_TEX, SH.ENV_TEX, SH.COAT_WEIGHT_TEX, SH.COAT_ROUGHNESS_TEX, SH.COAT_NORMAL_TEX, SH.SHEEN_TINT_TEX, SH.SHEEN_ROUGHNESS_TEX]) u.set(k, NONE);
    u.set(SH.TYPE, ShaderType.BACKGROUND);
    const s = world.strength ?? 1;
    const c = rgb(world.color, world.map !== void 0 ? [1, 1, 1] : [0.05, 0.05, 0.05]);
    f.set(SH.EMISSION, c[0] * s);
    f.set(SH.EMISSION + 1, c[1] * s);
    f.set(SH.EMISSION + 2, c[2] * s);
    if (world.map !== void 0) {
      u.set(SH.ENV_TEX, slot({ texture: world.map }));
    }
    f.set(SH.ENV_ROTATION, world.rotation ?? 0);
    u.set(SH.FLAGS, 0);
    shaderRecs.push({ u, f });
  }
  let triCount = 0;
  let vertCount = 0;
  for (const inst of desc.meshes) {
    const g = inst.geometry;
    const nv = g.positions.length / 3;
    const nt = g.indices ? g.indices.length / 3 : nv / 3;
    triCount += Math.floor(nt);
    vertCount += nv;
  }
  const vPos = new Float32Array(vertCount * 3);
  const vNrm = new Float32Array(vertCount * 3);
  const vUV = new Float32Array(vertCount * 2);
  const tVerts = new Float32Array(triCount * 9);
  const tIdx = new Uint32Array(triCount * 3);
  const tShader = new Uint32Array(triCount);
  const tObject = new Uint32Array(triCount);
  const tFlags = new Uint32Array(triCount);
  let vBase = 0;
  let tBase = 0;
  const bmin = [Infinity, Infinity, Infinity];
  const bmax = [-Infinity, -Infinity, -Infinity];
  desc.meshes.forEach((inst, objectIndex) => {
    const g = inst.geometry;
    const m = inst.matrix ? Array.from(inst.matrix) : [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const negative = mat4Determinant3x3(m) < 0;
    const inv = mat4Invert(m);
    const nv = g.positions.length / 3;
    const p = g.positions;
    for (let i = 0; i < nv; i++) {
      const x = p[i * 3], y = p[i * 3 + 1], z = p[i * 3 + 2];
      const w2 = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
      const wx = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w2;
      const wy = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w2;
      const wz = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w2;
      const o = (vBase + i) * 3;
      vPos[o] = wx;
      vPos[o + 1] = wy;
      vPos[o + 2] = wz;
      if (wx < bmin[0]) bmin[0] = wx;
      if (wy < bmin[1]) bmin[1] = wy;
      if (wz < bmin[2]) bmin[2] = wz;
      if (wx > bmax[0]) bmax[0] = wx;
      if (wy > bmax[1]) bmax[1] = wy;
      if (wz > bmax[2]) bmax[2] = wz;
    }
    const hasN = !!g.normals && g.normals.length >= nv * 3;
    if (hasN) {
      const n = g.normals;
      for (let i = 0; i < nv; i++) {
        const x = n[i * 3], y = n[i * 3 + 1], z = n[i * 3 + 2];
        let nx = inv[0] * x + inv[1] * y + inv[2] * z;
        let ny = inv[4] * x + inv[5] * y + inv[6] * z;
        let nz = inv[8] * x + inv[9] * y + inv[10] * z;
        const l = Math.hypot(nx, ny, nz) || 1;
        nx /= l;
        ny /= l;
        nz /= l;
        const o = (vBase + i) * 3;
        vNrm[o] = nx;
        vNrm[o + 1] = ny;
        vNrm[o + 2] = nz;
      }
    }
    const hasUV = !!g.uvs && g.uvs.length >= nv * 2;
    if (hasUV) {
      const uv = g.uvs;
      for (let i = 0; i < nv * 2; i++) vUV[vBase * 2 + i] = uv[i];
    }
    const nt = Math.floor(g.indices ? g.indices.length / 3 : nv / 3);
    const materials = Array.isArray(inst.material) ? inst.material : [inst.material];
    const triMaterial = new Int32Array(nt).fill(materials[0] ?? 0);
    if (g.groups && Array.isArray(inst.material)) {
      for (const grp of g.groups) {
        const t0 = Math.floor(grp.start / 3);
        const t1 = Math.min(nt, Math.floor((grp.start + grp.count) / 3));
        const mat = materials[grp.materialIndex] ?? materials[0] ?? 0;
        for (let t = t0; t < t1; t++) triMaterial[t] = mat;
      }
    }
    let flags2 = 0;
    if (hasN) flags2 |= TriFlags.SMOOTH;
    if (hasUV) flags2 |= TriFlags.HAS_UV;
    if (inst.visibleToCamera === false) flags2 |= TriFlags.CAMERA_INVISIBLE;
    if (inst.castShadow === false) flags2 |= TriFlags.SHADOW_INVISIBLE;
    for (let t = 0; t < nt; t++) {
      let a = g.indices ? g.indices[t * 3] : t * 3;
      let b = g.indices ? g.indices[t * 3 + 1] : t * 3 + 1;
      let c = g.indices ? g.indices[t * 3 + 2] : t * 3 + 2;
      if (negative) {
        const s = b;
        b = c;
        c = s;
      }
      const T = tBase + t;
      tIdx[T * 3] = vBase + a;
      tIdx[T * 3 + 1] = vBase + b;
      tIdx[T * 3 + 2] = vBase + c;
      for (let k = 0; k < 3; k++) {
        const vi = k === 0 ? a : k === 1 ? b : c;
        tVerts[T * 9 + k * 3] = vPos[(vBase + vi) * 3];
        tVerts[T * 9 + k * 3 + 1] = vPos[(vBase + vi) * 3 + 1];
        tVerts[T * 9 + k * 3 + 2] = vPos[(vBase + vi) * 3 + 2];
      }
      let mat = triMaterial[t];
      if (!(mat >= 0 && mat < desc.materials.length)) mat = 0;
      tShader[T] = mat;
      tObject[T] = objectIndex;
      tFlags[T] = flags2 | (emissive[mat] ? TriFlags.EMISSIVE : 0);
    }
    vBase += nv;
    tBase += nt;
  });
  const bvh = buildBvh(tVerts, triCount);
  const lightRecs = [];
  const lightPos = (r, at, v) => {
    r.f.set(at, v[0]);
    r.f.set(at + 1, v[1]);
    r.f.set(at + 2, v[2]);
  };
  const norm = (v) => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  const hittable = [];
  const lampEmitters = [];
  const avg3 = (v) => (Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2])) / 3;
  for (const L of lights) {
    const r = { u: /* @__PURE__ */ new Map(), f: /* @__PURE__ */ new Map() };
    const c = L.color ?? [1, 1, 1];
    const strength = [c[0] * L.strength, c[1] * L.strength, c[2] * L.strength];
    if (!(strength[0] > 0 || strength[1] > 0 || strength[2] > 0)) continue;
    lightPos(r, LT.STRENGTH, strength);
    let flags2 = 0;
    if (L.useMis !== false) flags2 |= LightFlags.USE_MIS;
    if (L.visibleToCamera !== false) flags2 |= LightFlags.CAMERA_VISIBLE;
    if (L.castShadow !== false) flags2 |= LightFlags.CAST_SHADOW;
    let canHit = false;
    switch (L.type) {
      case "point":
      case "spot": {
        const radius = Math.max(0, L.radius ?? 0);
        r.u.set(LT.TYPE, L.type === "point" ? LightType.POINT : LightType.SPOT);
        lightPos(r, LT.CO, L.position);
        r.f.set(LT.RADIUS, radius);
        const area2 = radius > 0 ? 4 * Math.PI * radius * radius : 4;
        const invarea = L.normalize === false ? 1 : 1 / area2;
        r.f.set(LT.EVAL_FAC, invarea / Math.PI);
        if (radius > 0) {
          flags2 |= LightFlags.IS_SPHERE;
          canHit = true;
        } else flags2 &= ~LightFlags.USE_MIS;
        if (L.type === "spot") {
          const angle = L.angle ?? Math.PI / 4;
          const cosHalf = Math.cos(angle * 0.5);
          const smooth = L.blend ?? 0;
          const spotSmooth = 1 / ((1 - cosHalf) * smooth);
          lightPos(r, LT.SPOT_DIR, norm(L.direction));
          r.f.set(LT.COS_HALF_SPOT_ANGLE, cosHalf);
          r.f.set(LT.SPOT_SMOOTH, Number.isFinite(spotSmooth) ? spotSmooth : 3e38);
          const tanHalf = Math.tan(angle * 0.5);
          r.f.set(LT.COS_HALF_LARGER_SPREAD, 1 / Math.sqrt(1 + tanHalf * tanHalf));
        }
        break;
      }
      case "sun": {
        r.u.set(LT.TYPE, LightType.SUN);
        lightPos(r, LT.CO, norm(L.direction));
        const angle = Math.max(0, L.angle ?? 0);
        const half = angle / 2;
        const oneMinusCos = 2 * Math.sin(0.5 * half) ** 2;
        r.f.set(LT.SUN_ANGLE, half);
        r.f.set(LT.SUN_ONE_MINUS_COSANGLE, oneMinusCos);
        r.f.set(LT.SUN_PDF, half > 0 ? 1 / (2 * Math.PI) / oneMinusCos : 1);
        const area2 = angle > 0 ? Math.PI * Math.sin(angle * 0.5) ** 2 : 1;
        r.f.set(LT.EVAL_FAC, 1 / area2);
        if (half > 0) canHit = true;
        else flags2 &= ~LightFlags.USE_MIS;
        break;
      }
      case "area": {
        r.u.set(LT.TYPE, LightType.AREA);
        lightPos(r, LT.CO, L.position);
        const n = norm(L.normal);
        let t = norm(L.tangent);
        const d = t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
        t = norm([t[0] - d * n[0], t[1] - d * n[1], t[2] - d * n[2]]);
        const v = [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]];
        lightPos(r, LT.AXIS_U, t);
        r.f.set(LT.LEN_U, L.width);
        lightPos(r, LT.AXIS_V, v);
        r.f.set(LT.LEN_V, L.height);
        lightPos(r, LT.AREA_DIR, n);
        const ellipse = L.shape === "ellipse";
        const area2 = L.width * L.height * (ellipse ? Math.PI / 4 : 1);
        const invarea = L.normalize !== false && area2 > 0 ? 1 / area2 : 1;
        r.f.set(LT.INVAREA, ellipse ? -invarea : invarea);
        r.f.set(LT.EVAL_FAC, invarea / Math.PI);
        canHit = area2 > 0;
        break;
      }
    }
    r.u.set(LT.FLAGS, flags2);
    {
      const m = emptyMeasure();
      const id = ~lightRecs.length;
      let centroid = [0, 0, 0];
      let distant = false;
      if (L.type === "point" || L.type === "spot") {
        const radius = Math.max(0, L.radius ?? 0);
        const area2 = radius > 0 ? 4 * Math.PI * radius * radius : 4;
        centroid = [L.position[0], L.position[1], L.position[2]];
        m.energy = avg3(strength) * (L.normalize === false ? area2 : 1) * 0.25 / Math.PI;
        if (L.type === "point") {
          m.cone = { ax: 0, ay: 0, az: 1, thetaO: Math.PI, thetaE: Math.PI / 2 };
        } else {
          const d = norm(L.direction);
          m.cone = { ax: d[0], ay: d[1], az: d[2], thetaO: 0, thetaE: Math.min((L.angle ?? Math.PI / 4) * 0.5, Math.PI / 2) };
        }
        m.bmin = [centroid[0] - radius, centroid[1] - radius, centroid[2] - radius];
        m.bmax = [centroid[0] + radius, centroid[1] + radius, centroid[2] + radius];
      } else if (L.type === "area") {
        centroid = [L.position[0], L.position[1], L.position[2]];
        const n = [r.f.get(LT.AREA_DIR), r.f.get(LT.AREA_DIR + 1), r.f.get(LT.AREA_DIR + 2)];
        const u = [r.f.get(LT.AXIS_U), r.f.get(LT.AXIS_U + 1), r.f.get(LT.AXIS_U + 2)];
        const v = [r.f.get(LT.AXIS_V), r.f.get(LT.AXIS_V + 1), r.f.get(LT.AXIS_V + 2)];
        const area2 = L.width * L.height * (L.shape === "ellipse" ? Math.PI / 4 : 1);
        m.energy = avg3(strength) * (L.normalize === false ? area2 : 1) / Math.PI;
        m.cone = { ax: n[0], ay: n[1], az: n[2], thetaO: 0, thetaE: Math.PI / 2 };
        for (const su of [-0.5, 0.5]) {
          for (const sv of [-0.5, 0.5]) {
            for (let k = 0; k < 3; k++) {
              const c2 = centroid[k] + su * L.width * u[k] + sv * L.height * v[k];
              m.bmin[k] = Math.min(m.bmin[k], c2);
              m.bmax[k] = Math.max(m.bmax[k], c2);
            }
          }
        }
      } else {
        const d = norm(L.direction);
        distant = true;
        m.energy = avg3(strength);
        m.cone = { ax: d[0], ay: d[1], az: d[2], thetaO: 0, thetaE: 0.5 * Math.max(0, L.angle ?? 0) };
      }
      lampEmitters.push({ id, centroid, measure: m, bitTrail: 0, distant });
    }
    if (canHit) hittable.push(lightRecs.length);
    lightRecs.push(r);
  }
  let backgroundLight = NONE;
  const worldRec = shaderRecs[worldIndex];
  const worldEm = [worldRec.f.get(SH.EMISSION), worldRec.f.get(SH.EMISSION + 1), worldRec.f.get(SH.EMISSION + 2)];
  const worldEmits = worldEm[0] > 0 || worldEm[1] > 0 || worldEm[2] > 0;
  if (worldEmits) {
    const r = { u: /* @__PURE__ */ new Map(), f: /* @__PURE__ */ new Map() };
    r.u.set(LT.TYPE, LightType.BACKGROUND);
    r.u.set(LT.FLAGS, LightFlags.USE_MIS | LightFlags.CAST_SHADOW | (world.visibleToCamera === false ? 0 : LightFlags.CAMERA_VISIBLE));
    r.f.set(LT.EVAL_FAC, 1);
    backgroundLight = lightRecs.length;
    const m = emptyMeasure();
    m.energy = avg3(worldEm) * Math.PI;
    m.cone = { ax: 0, ay: 0, az: 1, thetaO: Math.PI, thetaE: 0 };
    lampEmitters.push({ id: ~lightRecs.length, centroid: [0, 0, 1], measure: m, bitTrail: 0, distant: true });
    lightRecs.push(r);
  }
  const bvhPos = new Uint32Array(triCount);
  for (let i = 0; i < triCount; i++) bvhPos[bvh.order[i]] = i;
  const distPrim = [];
  const distCdf = [];
  let totarea = 0;
  let emissiveTris = 0;
  for (let k = 0; k < triCount; k++) {
    const t = bvh.order[k];
    if (!emissive[tShader[t]]) continue;
    distCdf.push(totarea);
    distPrim.push(k);
    emissiveTris++;
    const o = t * 9;
    const e1 = [tVerts[o + 3] - tVerts[o], tVerts[o + 4] - tVerts[o + 1], tVerts[o + 5] - tVerts[o + 2]];
    const e2 = [tVerts[o + 6] - tVerts[o], tVerts[o + 7] - tVerts[o + 1], tVerts[o + 8] - tVerts[o + 2]];
    const cx = e1[1] * e2[2] - e1[2] * e2[1];
    const cy = e1[2] * e2[0] - e1[0] * e2[2];
    const cz = e1[0] * e2[1] - e1[1] * e2[0];
    totarea += 0.5 * Math.hypot(cx, cy, cz);
  }
  const trianglearea = totarea;
  const numLamps = lightRecs.length;
  if (numLamps > 0) {
    const lightarea = totarea > 0 ? totarea / numLamps : 1;
    for (let i = 0; i < numLamps; i++) {
      distCdf.push(totarea);
      distPrim.push(~i);
      totarea += lightarea;
    }
  }
  const numDistribution = distPrim.length;
  if (totarea > 0) for (let i = 0; i < numDistribution; i++) distCdf[i] /= totarea;
  let pdfTriangles = 0;
  let pdfLights = 0;
  if (trianglearea > 0) pdfTriangles = 1 / trianglearea * (numLamps ? 0.5 : 1);
  if (numLamps) pdfLights = 1 / numLamps * (trianglearea > 0 ? 0.5 : 1);
  const useLightTree = settings.lightTree !== false && numDistribution > 0;
  let tree = null;
  const triEmitter = new Uint32Array(triCount).fill(NONE);
  const lampEmitter = new Uint32Array(lightRecs.length).fill(NONE);
  if (useLightTree) {
    const local = [];
    for (let k = 0; k < triCount; k++) {
      const t = bvh.order[k];
      const sh = tShader[t];
      if (!emissive[sh]) continue;
      const o = t * 9;
      const v0 = [tVerts[o], tVerts[o + 1], tVerts[o + 2]], v1 = [tVerts[o + 3], tVerts[o + 4], tVerts[o + 5]], v2 = [tVerts[o + 6], tVerts[o + 7], tVerts[o + 8]];
      const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]], e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
      const area2 = 0.5 * Math.hypot(e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]);
      const rec = shaderRecs[sh];
      const m = emptyMeasure();
      m.energy = area2 * avg3([rec.f.get(SH.EMISSION) ?? 0, rec.f.get(SH.EMISSION + 1) ?? 0, rec.f.get(SH.EMISSION + 2) ?? 0]);
      let ax = v0[0] - v1[0], ay = v0[1] - v1[1], az = v0[2] - v1[2];
      const al = Math.hypot(ax, ay, az);
      if (al > 0) {
        ax /= al;
        ay /= al;
        az /= al;
      }
      m.cone = { ax, ay, az, thetaO: Math.PI / 2, thetaE: Math.PI / 2 };
      for (const v of [v0, v1, v2]) {
        for (let j = 0; j < 3; j++) {
          m.bmin[j] = Math.min(m.bmin[j], v[j]);
          m.bmax[j] = Math.max(m.bmax[j], v[j]);
        }
      }
      local.push({ id: k, centroid: [(v0[0] + v1[0] + v2[0]) / 3, (v0[1] + v1[1] + v2[1]) / 3, (v0[2] + v1[2] + v2[2]) / 3], measure: m, bitTrail: 0, distant: false });
    }
    for (const e of lampEmitters) if (!e.distant) local.push(e);
    tree = buildLightTree(local, lampEmitters.filter((e) => e.distant));
    if (tree) {
      tree.emitters.forEach((e, i) => {
        if (e.id >= 0) triEmitter[e.id] = i;
        else lampEmitter[~e.id] = i;
      });
      lightRecs.forEach((r, i) => r.u.set(LT.TREE_EMITTER, lampEmitter[i]));
    }
  }
  const w = new WordWriter();
  w.reserve(H.SIZE);
  w.setU(H.MAGIC, SCENE_MAGIC);
  w.setU(H.VERSION, SCENE_VERSION);
  w.align4();
  const nodesOff = w.reserve(bvh.nodeCount * NODE_SIZE);
  for (let i = 0; i < bvh.nodeCount * NODE_SIZE; i++) w.setU(nodesOff + i, bvh.nodes[i]);
  w.setU(H.NUM_NODES, bvh.nodeCount);
  w.setU(H.NODES, nodesOff);
  w.align4();
  const tvOff = w.reserve(triCount * TRI_VERTS_SIZE);
  const tiOff = w.reserve(triCount * TRI_INFO_SIZE);
  for (let k = 0; k < triCount; k++) {
    const t = bvh.order[k];
    for (let j = 0; j < 3; j++) {
      w.setF(tvOff + k * TRI_VERTS_SIZE + j * 4, tVerts[t * 9 + j * 3]);
      w.setF(tvOff + k * TRI_VERTS_SIZE + j * 4 + 1, tVerts[t * 9 + j * 3 + 1]);
      w.setF(tvOff + k * TRI_VERTS_SIZE + j * 4 + 2, tVerts[t * 9 + j * 3 + 2]);
    }
    const b = tiOff + k * TRI_INFO_SIZE;
    w.setU(b + TI.V0, tIdx[t * 3]);
    w.setU(b + TI.V1, tIdx[t * 3 + 1]);
    w.setU(b + TI.V2, tIdx[t * 3 + 2]);
    w.setU(b + TI.SHADER, tShader[t]);
    w.setU(b + TI.OBJECT, tObject[t]);
    w.setU(b + TI.FLAGS, tFlags[t]);
    w.setU(b + TI.EMITTER, triEmitter[k]);
  }
  w.setU(H.NUM_TRIS, triCount);
  w.setU(H.TRI_VERTS, tvOff);
  w.setU(H.TRI_INFO, tiOff);
  w.align4();
  const vnOff = w.reserve(vertCount * VERT_NORMAL_SIZE);
  for (let i = 0; i < vertCount; i++) {
    w.setF(vnOff + i * 4, vNrm[i * 3]);
    w.setF(vnOff + i * 4 + 1, vNrm[i * 3 + 1]);
    w.setF(vnOff + i * 4 + 2, vNrm[i * 3 + 2]);
  }
  const uvOff = w.reserve(vertCount * VERT_UV_SIZE);
  for (let i = 0; i < vertCount * 2; i++) w.setF(uvOff + i, vUV[i]);
  w.setU(H.NUM_VERTS, vertCount);
  w.setU(H.VERT_NORMALS, vnOff);
  w.setU(H.VERT_UVS, uvOff);
  w.align4();
  const shOff = w.reserve(shaderRecs.length * SHADER_SIZE);
  shaderRecs.forEach((r, i) => {
    for (const [k, v] of r.u) w.setU(shOff + i * SHADER_SIZE + k, v);
    for (const [k, v] of r.f) w.setF(shOff + i * SHADER_SIZE + k, v);
  });
  w.setU(H.NUM_SHADERS, shaderRecs.length);
  w.setU(H.SHADERS, shOff);
  w.setU(H.WORLD_SHADER, worldIndex);
  w.align4();
  const txOff = w.reserve(Math.max(1, descKeys.length) * TEX_SIZE);
  descKeys.forEach((k, i) => {
    const tex = textures[k.texture];
    const b = txOff + i * TEX_SIZE;
    w.setU(b + TX.OFFSET, imageOffsets[k.texture]);
    w.setU(b + TX.WIDTH, tex.width);
    w.setU(b + TX.HEIGHT, tex.height);
    let fl = 0;
    if (tex.data instanceof Float32Array) fl |= TexFlags.HALF;
    else if ((tex.colorSpace ?? "srgb") === "srgb") fl |= TexFlags.SRGB;
    if (tex.filter === "nearest") fl |= TexFlags.NEAREST;
    if (tex.flipY) fl |= TexFlags.FLIP_Y;
    fl |= WRAP_CODE[tex.wrapS ?? "repeat"] << TexFlags.WRAP_S_SHIFT;
    fl |= WRAP_CODE[tex.wrapT ?? "repeat"] << TexFlags.WRAP_T_SHIFT;
    w.setU(b + TX.FLAGS, fl);
    const m = JSON.parse(k.transform);
    for (let j = 0; j < 6; j++) w.setF(b + TX.M + j, m[j]);
  });
  w.setU(H.NUM_TEXTURES, descKeys.length);
  w.setU(H.TEXTURES, txOff);
  w.align4();
  const ltOff = w.reserve(Math.max(1, lightRecs.length) * LIGHT_SIZE);
  lightRecs.forEach((r, i) => {
    for (const [k, v] of r.u) w.setU(ltOff + i * LIGHT_SIZE + k, v);
    for (const [k, v] of r.f) w.setF(ltOff + i * LIGHT_SIZE + k, v);
  });
  w.setU(H.NUM_LIGHTS, lightRecs.length);
  w.setU(H.LIGHTS, ltOff);
  w.setU(H.BACKGROUND_LIGHT, backgroundLight);
  const hlOff = w.reserve(Math.max(1, hittable.length));
  hittable.forEach((l, i) => w.setU(hlOff + i, l));
  w.setU(H.NUM_HITTABLE_LIGHTS, hittable.length);
  w.setU(H.HITTABLE_LIGHTS, hlOff);
  w.align4();
  const dOff = w.reserve((numDistribution + 1) * DIST_SIZE);
  for (let i = 0; i < numDistribution; i++) {
    w.setF(dOff + i * DIST_SIZE, distCdf[i]);
    w.setU(dOff + i * DIST_SIZE + 1, distPrim[i]);
  }
  w.setF(dOff + numDistribution * DIST_SIZE, 1);
  w.setU(dOff + numDistribution * DIST_SIZE + 1, 0);
  w.setU(H.NUM_DISTRIBUTION, numDistribution);
  w.setU(H.DISTRIBUTION, dOff);
  w.setF(H.PDF_TRIANGLES, pdfTriangles);
  w.setF(H.PDF_LIGHTS, pdfLights);
  let flags = 0;
  if (totarea > 0) flags |= SceneFlags.USE_DIRECT_LIGHT;
  w.align4();
  let ltnOff = 0;
  let lteOff = 0;
  if (tree) {
    flags |= SceneFlags.USE_LIGHT_TREE;
    ltnOff = w.reserve(tree.nodes.length * LIGHT_TREE_NODE_SIZE);
    tree.nodes.forEach((n, i) => {
      const b = ltnOff + i * LIGHT_TREE_NODE_SIZE;
      for (let k = 0; k < 3; k++) {
        w.setF(b + LTN.BMIN + k, n.measure.bmin[k]);
        w.setF(b + LTN.BMAX + k, n.measure.bmax[k]);
      }
      w.setF(b + LTN.ENERGY, n.measure.energy);
      w.setU(b + LTN.TYPE, n.type);
      w.setF(b + LTN.AXIS, n.measure.cone.ax);
      w.setF(b + LTN.AXIS + 1, n.measure.cone.ay);
      w.setF(b + LTN.AXIS + 2, n.measure.cone.az);
      w.setF(b + LTN.THETA_O, n.measure.cone.thetaO);
      w.setF(b + LTN.THETA_E, n.measure.cone.thetaE);
      w.setU(b + LTN.NUM_EMITTERS, n.numEmitters >>> 0);
      w.setU(b + LTN.CHILD0, n.child0);
      w.setU(b + LTN.CHILD1, n.child1);
    });
    lteOff = w.reserve(Math.max(1, tree.emitters.length) * LIGHT_TREE_EMITTER_SIZE);
    tree.emitters.forEach((e, i) => {
      const b = lteOff + i * LIGHT_TREE_EMITTER_SIZE;
      w.setF(b + LTE.ENERGY, e.measure.energy);
      w.setF(b + LTE.THETA_O, e.measure.cone.thetaO);
      w.setF(b + LTE.THETA_E, e.measure.cone.thetaE);
      w.setU(b + LTE.ID, e.id >>> 0);
      w.setU(b + LTE.BIT_TRAIL, e.bitTrail);
    });
  }
  w.setU(H.NUM_LIGHT_TREE_NODES, tree ? tree.nodes.length : 0);
  w.setU(H.LIGHT_TREE_NODES, ltnOff);
  w.setU(H.LIGHT_TREE_EMITTERS, lteOff);
  w.align4();
  const filter = buildFilterTable(settings.filter ?? "blackman-harris", settings.filterWidth ?? 1.5);
  const ftOff = w.reserve(FILTER_TABLE_SIZE);
  for (let i = 0; i < FILTER_TABLE_SIZE; i++) w.setF(ftOff + i, filter[i]);
  w.setU(H.FILTER_TABLE, ftOff);
  w.align4();
  const tables = bsdfTables();
  const tbOff = w.reserve(tables.data.length);
  for (let i = 0; i < tables.data.length; i++) w.setF(tbOff + i, tables.data[i]);
  w.setU(H.TABLE_GGX_E, tbOff + tables.ggx_E);
  w.setU(H.TABLE_GGX_EAVG, tbOff + tables.ggx_Eavg);
  w.setU(H.TABLE_GGX_GLASS_E, tbOff + tables.ggx_glass_E);
  w.setU(H.TABLE_GGX_GLASS_EAVG, tbOff + tables.ggx_glass_Eavg);
  w.setU(H.TABLE_GGX_GLASS_INV_E, tbOff + tables.ggx_glass_inv_E);
  w.setU(H.TABLE_GGX_GLASS_INV_EAVG, tbOff + tables.ggx_glass_inv_Eavg);
  w.setU(H.TABLE_GGX_GEN_SCHLICK_IOR_S, tbOff + tables.ggx_gen_schlick_ior_s);
  w.setU(H.TABLE_GGX_GEN_SCHLICK_S, tbOff + tables.ggx_gen_schlick_s);
  w.setU(H.TABLE_SHEEN_LTC, tbOff + tables.sheen_ltc);
  for (let a = 0; a < 3; a++) {
    w.setF(H.BOUNDS_MIN + a, triCount ? bmin[a] : 0);
    w.setF(H.BOUNDS_MAX + a, triCount ? bmax[a] : 0);
  }
  let resX = 0;
  let resY = 0;
  if (backgroundLight !== NONE) {
    const envTex = worldRec.u.get(SH.ENV_TEX);
    const requested = settings.backgroundMapResolution ?? 0;
    if (requested > 0) {
      resX = requested;
      resY = Math.max(1, requested >> 1);
    } else if (envTex !== NONE) {
      const img = textures[descKeys[envTex].texture];
      resX = Math.min(img.width, 4096);
      resY = Math.max(1, Math.min(img.height, 2048));
    } else {
      resX = 64;
      resY = 32;
    }
    flags |= SceneFlags.BACKGROUND_MIS;
  }
  w.setU(H.FLAGS, flags);
  w.setU(H.BG_RES_X, resX);
  w.setU(H.BG_RES_Y, resY);
  w.align4();
  const margOff = w.reserve((resY + 1) * 2);
  const condOff = w.reserve(Math.max(1, (resX + 1) * resY) * 2);
  w.setU(H.BG_MARGINAL, margOff);
  w.setU(H.BG_CONDITIONAL, condOff);
  let sceneWords = w.finish();
  if (resX > 0) {
    const kg = new KernelGlobals({ scene: sceneWords, texels });
    const f = kg.f32;
    const envTex = worldRec.u.get(SH.ENV_TEX);
    const rot = worldRec.f.get(SH.ENV_ROTATION) ?? 0;
    const rgba = new Float64Array(4);
    const dir = new Float64Array(3);
    const uv = new Float64Array(2);
    const cdfWidth = resX + 1;
    for (let i = 0; i < resY; i++) {
      const sinTheta = Math.sin(Math.PI * (i + 0.5) / resY);
      const rowBase = condOff + i * cdfWidth * 2;
      let prevF2 = 0;
      let prevCdf2 = 0;
      for (let j = 0; j < resX; j++) {
        let L = (worldEm[0] + worldEm[1] + worldEm[2]) / 3;
        if (envTex !== NONE) {
          const u = (j + 0.5) / resX;
          const v = 1 - (i + 0.5) / resY;
          equirectToDirection(u, v, 0, dir);
          directionToEquirect(dir[0], dir[1], dir[2], 0, uv);
          textureLookup(kg, envTex, uv[0], uv[1], rgba);
          L = (Math.abs(rgba[0] * worldEm[0]) + Math.abs(rgba[1] * worldEm[1]) + Math.abs(rgba[2] * worldEm[2])) / 3;
        }
        const fx = L * sinTheta;
        const cdf = j === 0 ? 0 : prevCdf2 + prevF2 / resX;
        f[rowBase + j * 2] = fx;
        f[rowBase + j * 2 + 1] = cdf;
        prevF2 = fx;
        prevCdf2 = cdf;
      }
      const total2 = prevCdf2 + prevF2 / resX;
      f[rowBase + resX * 2] = total2;
      if (total2 > 0) for (let j = 1; j < resX; j++) f[rowBase + j * 2 + 1] /= total2;
      f[rowBase + resX * 2 + 1] = 1;
    }
    let prevF = 0;
    let prevCdf = 0;
    for (let i = 0; i < resY; i++) {
      const fx = f[condOff + (i * cdfWidth + resX) * 2];
      const cdf = i === 0 ? 0 : prevCdf + prevF / resY;
      f[margOff + i * 2] = fx;
      f[margOff + i * 2 + 1] = cdf;
      prevF = fx;
      prevCdf = cdf;
    }
    const total = prevCdf + prevF / resY;
    f[margOff + resY * 2] = total;
    if (total > 0) for (let i = 1; i < resY; i++) f[margOff + i * 2 + 1] /= total;
    f[margOff + resY * 2 + 1] = 1;
    void rot;
    if (tree) {
      const bgEmitter = lampEmitter[backgroundLight];
      if (bgEmitter !== NONE) {
        f[lteOff + bgEmitter * LIGHT_TREE_EMITTER_SIZE + LTE.ENERGY] = total * (Math.PI / 2) * Math.PI;
        tree.nodes.forEach((n, i) => {
          if (n.numEmitters < 0 || n.type !== 8) return;
          let e = 0;
          for (let j = 0; j < n.numEmitters; j++) e += f[lteOff + (n.child0 + j) * LIGHT_TREE_EMITTER_SIZE + LTE.ENERGY];
          f[ltnOff + i * LIGHT_TREE_NODE_SIZE + LTN.ENERGY] = e;
        });
      }
    }
  }
  return {
    scene: sceneWords,
    texels,
    stats: {
      triangles: triCount,
      vertices: vertCount,
      bvhNodes: bvh.nodeCount,
      lights: lightRecs.length,
      emissiveTriangles: emissiveTris,
      textures: textures.length,
      sceneWords: sceneWords.length,
      texelWords: texels.length
    }
  };
}
var WordWriter, WRAP_CODE;
var init_compile = __esm({
  "src/scene/compile.ts"() {
    "use strict";
    init_light_tree();
    init_bvh_build();
    init_layout();
    init_tables();
    init_math();
    init_globals();
    init_texture();
    WordWriter = class {
      buf = new ArrayBuffer(1 << 16);
      u = new Uint32Array(this.buf);
      f = new Float32Array(this.buf);
      length = 0;
      reserve(words) {
        const start = this.length;
        const need = this.length + words;
        if (need > this.u.length) {
          let cap = this.u.length;
          while (cap < need) cap *= 2;
          const nb = new ArrayBuffer(cap * 4);
          new Uint32Array(nb).set(this.u.subarray(0, this.length));
          this.buf = nb;
          this.u = new Uint32Array(nb);
          this.f = new Float32Array(nb);
        }
        this.length = need;
        return start;
      }
      /** Pads to a multiple of 4 words so vec4 reads on the GPU stay aligned. */
      align4() {
        while (this.length & 3) this.reserve(1);
      }
      setU(i, v) {
        this.u[i] = v >>> 0;
      }
      setF(i, v) {
        this.f[i] = v;
      }
      getF(i) {
        return this.f[i];
      }
      finish() {
        const out = new Uint32Array(this.length);
        out.set(this.u.subarray(0, this.length));
        return out;
      }
    };
    WRAP_CODE = { repeat: 0, clamp: 1, mirror: 2 };
  }
});

// src/kernel/light_tree.ts
function sinFromCos2(c) {
  return Math.sqrt(Math.max(1 - c * c, 0));
}
function cosFromSin(s) {
  return Math.sqrt(Math.max(1 - s * s, 0));
}
function smoothstep01(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return (3 - 2 * x) * x * x;
}
function importance(N, hasTransmission, energy) {
  impMax = 0;
  impMin = 0;
  const sinThetaU = sinFromCos2(cosThetaU);
  const dotPN = ptcX * N.x + ptcY * N.y + ptcZ * N.z;
  const cosThetaI = hasTransmission ? Math.abs(dotPN) : dotPN;
  const sinThetaI = sinFromCos2(cosThetaI);
  const cosMinIncidence = cosThetaI >= cosThetaU ? 1 : cosThetaI * cosThetaU + sinThetaI * sinThetaU;
  if (!hasTransmission && cosMinIncidence < 0) return;
  const cosMaxIncidence = Math.max(cosThetaI * cosThetaU - sinThetaI * sinThetaU, 0);
  let cosTheta, sinTheta;
  if (coneAx === -ptcX && coneAy === -ptcY && coneAz === -ptcZ) {
    cosTheta = 1;
    sinTheta = 0;
  } else {
    cosTheta = -(coneAx * ptcX + coneAy * ptcY + coneAz * ptcZ);
    sinTheta = sinFromCos2(cosTheta);
  }
  const cosThetaMinusThetaU = cosTheta * cosThetaU + sinTheta * sinThetaU;
  const cosThetaO = Math.cos(coneThetaO);
  const sinThetaO = Math.sin(coneThetaO);
  let cosMinOutgoing;
  if (cosTheta >= cosThetaU || cosThetaMinusThetaU >= cosThetaO) {
    cosMinOutgoing = 1;
  } else if (coneThetaO + coneThetaE > Math.PI || cosThetaMinusThetaU > Math.cos(coneThetaO + coneThetaE)) {
    const sinThetaMinusThetaU = sinFromCos2(cosThetaMinusThetaU);
    cosMinOutgoing = cosThetaMinusThetaU * cosThetaO + sinThetaMinusThetaU * sinThetaO;
  } else {
    return;
  }
  impMax = Math.abs(cosMinIncidence * energy * cosMinOutgoing / (distMin * distMin));
  const cosThetaPlusThetaU = cosTheta * cosThetaU - sinTheta * sinThetaU;
  if (coneThetaE - coneThetaO < 0 || cosTheta < 0 || cosThetaU < 0 || cosThetaPlusThetaU < Math.cos(coneThetaE - coneThetaO)) {
    impMin = 0;
  } else {
    const sinThetaPlusThetaU = sinFromCos2(cosThetaPlusThetaU);
    const cosMaxOutgoing = cosThetaPlusThetaU * cosThetaO - sinThetaPlusThetaU * sinThetaO;
    impMin = Math.abs(cosMaxIncidence * energy * cosMaxOutgoing / (distMax * distMax));
  }
}
function nodeImportance(kg, P2, N, hasTransmission, n) {
  const f = kg.f32;
  const b = kg.lightTreeNodes + n * LIGHT_TREE_NODE_SIZE;
  coneAx = f[b + LTN.AXIS];
  coneAy = f[b + LTN.AXIS + 1];
  coneAz = f[b + LTN.AXIS + 2];
  coneThetaO = f[b + LTN.THETA_O];
  coneThetaE = f[b + LTN.THETA_E];
  let distance;
  if (kg.u32[b + LTN.TYPE] === LightTreeNodeType.DISTANT) {
    ptcX = -coneAx;
    ptcY = -coneAy;
    ptcZ = -coneAz;
    cosThetaU = Math.cos(coneThetaO + coneThetaE);
    distance = 1;
  } else {
    const minX = f[b + LTN.BMIN], minY = f[b + LTN.BMIN + 1], minZ = f[b + LTN.BMIN + 2];
    const maxX = f[b + LTN.BMAX], maxY = f[b + LTN.BMAX + 1], maxZ = f[b + LTN.BMAX + 2];
    const cx = 0.5 * (minX + maxX), cy = 0.5 * (minY + maxY), cz = 0.5 * (minZ + maxZ);
    const ex = maxX - cx, ey = maxY - cy, ez = maxZ - cz;
    const visible = hasTransmission || N.x * (cx - P2.x) + N.y * (cy - P2.y) + N.z * (cz - P2.z) + (Math.abs(N.x) * Math.abs(ex) + Math.abs(N.y) * Math.abs(ey) + Math.abs(N.z) * Math.abs(ez)) > 0;
    if (!visible) {
      impMax = impMin = 0;
      return;
    }
    let dx = cx - P2.x, dy = cy - P2.y, dz = cz - P2.z;
    distance = Math.hypot(dx, dy, dz);
    if (distance > 0) {
      dx /= distance;
      dy /= distance;
      dz /= distance;
    } else {
      dx = dy = dz = 0;
    }
    ptcX = dx;
    ptcY = dy;
    ptcZ = dz;
    const d2 = distance * distance;
    const r2 = ex * ex + ey * ey + ez * ez;
    cosThetaU = d2 <= r2 ? -1 : Math.sqrt(Math.max(1 - r2 / d2, 0));
    distance = Math.max(0.5 * Math.sqrt(r2), distance);
  }
  distMax = distMin = distance;
  importance(N, hasTransmission, f[b + LTN.ENERGY]);
}
function emitterImportance(kg, P2, N, hasTransmission, e) {
  const f = kg.f32;
  const u = kg.u32;
  const b = kg.lightTreeEmitters + e * LIGHT_TREE_EMITTER_SIZE;
  coneThetaO = f[b + LTE.THETA_O];
  coneThetaE = f[b + LTE.THETA_E];
  let energy = f[b + LTE.ENERGY];
  const id = kg.i32[b + LTE.ID];
  let visible;
  if (id >= 0) {
    const t = kg.triVerts + id * TRI_VERTS_SIZE;
    const ax = f[t], ay = f[t + 1], az = f[t + 2];
    const bx = f[t + 4], by = f[t + 5], bz = f[t + 6];
    const qx = f[t + 8], qy = f[t + 9], qz = f[t + 10];
    const cx = (ax + bx + qx) / 3, cy = (ay + by + qy) / 3, cz = (az + bz + qz) / 3;
    let dx = ax - bx, dy = ay - by, dz = az - bz;
    const dl = Math.hypot(dx, dy, dz);
    if (dl > 0) {
      dx /= dl;
      dy /= dl;
      dz /= dl;
    } else {
      dx = dy = dz = 0;
    }
    coneAx = dx;
    coneAy = dy;
    coneAz = dz;
    let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
    const minDistance = Math.hypot(px, py, pz);
    if (minDistance > 0) {
      px /= minDistance;
      py /= minDistance;
      pz /= minDistance;
    } else {
      px = py = pz = 0;
    }
    ptcX = px;
    ptcY = py;
    ptcZ = pz;
    distMax = distMin = minDistance;
    cosThetaU = FLT_MAX2;
    let aboveSurface = false;
    for (let i = 0; i < 3; i++) {
      const vx = f[t + i * 4] - P2.x, vy = f[t + i * 4 + 1] - P2.y, vz = f[t + i * 4 + 2] - P2.z;
      const vl = Math.hypot(vx, vy, vz);
      const inv = vl > 0 ? 1 / vl : 0;
      cosThetaU = Math.min(cosThetaU, (px * vx + py * vy + pz * vz) * inv);
      aboveSurface = aboveSurface || (vx * N.x + vy * N.y + vz * N.z) * inv > 0;
      distMax = Math.max(distMax, vl);
    }
    const frontFacing = coneThetaO !== 0 || coneAx * px + coneAy * py + coneAz * pz < 0;
    visible = frontFacing && aboveSurface;
  } else {
    const L = kg.lights + ~id * LIGHT_SIZE;
    const type = u[L + LT.TYPE];
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    if (type === LightType.POINT || type === LightType.SPOT) {
      let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
      const minDistance = Math.hypot(px, py, pz);
      if (minDistance > 0) {
        px /= minDistance;
        py /= minDistance;
        pz /= minDistance;
      } else {
        px = py = pz = 0;
      }
      ptcX = px;
      ptcY = py;
      ptcZ = pz;
      distMax = distMin = minDistance;
      const radius = f[L + LT.RADIUS];
      const isSphere = (u[L + LT.FLAGS] & LightFlags.IS_SPHERE) !== 0;
      if (type === LightType.POINT) {
        coneAx = -px;
        coneAy = -py;
        coneAz = -pz;
        if (isSphere) {
          if (minDistance > radius) {
            cosThetaU = cosFromSin(radius / minDistance);
            distMax = minDistance / cosThetaU;
          } else {
            cosThetaU = -1;
            distMax = distMin = radius / M_SQRT2;
          }
        } else {
          const hyp = Math.sqrt(radius * radius + minDistance * minDistance);
          cosThetaU = minDistance / hyp;
          distMax = hyp;
        }
        coneThetaO = 0;
      } else {
        coneAx = f[L + LT.SPOT_DIR];
        coneAy = f[L + LT.SPOT_DIR + 1];
        coneAz = f[L + LT.SPOT_DIR + 2];
        if (isSphere) {
          cosThetaU = minDistance > radius ? cosFromSin(radius / minDistance) : -1;
          if (minDistance > radius) {
            distMax = minDistance / cosThetaU;
            distMin = minDistance;
          } else {
            distMax = distMin = radius / M_SQRT2;
          }
        } else {
          const hyp = Math.sqrt(radius * radius + minDistance * minDistance);
          cosThetaU = minDistance / hyp;
          distMax = hyp;
        }
        const cosMinOutgoing = Math.cos(Math.max(0, Math.acos(Math.min(Math.max(-(coneAx * px + coneAy * py + coneAz * pz), -1), 1)) - Math.acos(Math.min(Math.max(cosThetaU, -1), 1))));
        energy *= smoothstep01((cosMinOutgoing - Math.cos(coneThetaE)) * f[L + LT.SPOT_SMOOTH]);
      }
      visible = true;
    } else if (type === LightType.AREA) {
      coneAx = f[L + LT.AREA_DIR];
      coneAy = f[L + LT.AREA_DIR + 1];
      coneAz = f[L + LT.AREA_DIR + 2];
      let px = cx - P2.x, py = cy - P2.y, pz = cz - P2.z;
      const minDistance = Math.hypot(px, py, pz);
      if (minDistance > 0) {
        px /= minDistance;
        py /= minDistance;
        pz /= minDistance;
      } else {
        px = py = pz = 0;
      }
      ptcX = px;
      ptcY = py;
      ptcZ = pz;
      distMax = distMin = minDistance;
      cosThetaU = FLT_MAX2;
      const lu = f[L + LT.LEN_U], lv = f[L + LT.LEN_V];
      const eux = f[L + LT.AXIS_U] * lu, euy = f[L + LT.AXIS_U + 1] * lu, euz = f[L + LT.AXIS_U + 2] * lu;
      const evx = f[L + LT.AXIS_V] * lv, evy = f[L + LT.AXIS_V + 1] * lv, evz = f[L + LT.AXIS_V + 2] * lv;
      for (let i = 0; i < 4; i++) {
        const su = (i & 1) - 0.5;
        const sv = 0.5 * ((i & 2) - 1);
        const vx = su * eux + sv * evx + cx - P2.x, vy = su * euy + sv * evy + cy - P2.y, vz = su * euz + sv * evz + cz - P2.z;
        const vl = Math.hypot(vx, vy, vz);
        const inv = vl > 0 ? 1 / vl : 0;
        cosThetaU = Math.min(cosThetaU, (px * vx + py * vy + pz * vz) * inv);
        distMax = Math.max(distMax, vl);
      }
      const frontFacing = coneAx * px + coneAy * py + coneAz * pz < 0;
      const above = N.x * (cx - P2.x) + N.y * (cy - P2.y) + N.z * (cz - P2.z) + Math.abs(N.x * eux + N.y * euy + N.z * euz) + Math.abs(N.x * evx + N.y * evy + N.z * evz) > 0;
      visible = frontFacing && above;
    } else if (type === LightType.SUN) {
      coneAx = cx;
      coneAy = cy;
      coneAz = cz;
      cosThetaU = Math.cos(coneThetaE);
      distMax = 1 / cosThetaU;
      distMin = 1;
      ptcX = -cx;
      ptcY = -cy;
      ptcZ = -cz;
      visible = true;
    } else if (type === LightType.BACKGROUND) {
      coneAx = 0;
      coneAy = 0;
      coneAz = -1;
      cosThetaU = -1;
      distMax = distMin = 1;
      ptcX = 0;
      ptcY = 0;
      ptcZ = -1;
      visible = true;
    } else {
      impMax = impMin = 0;
      return;
    }
  }
  if (!(visible || hasTransmission)) {
    impMax = impMin = 0;
    return;
  }
  importance(N, hasTransmission, energy);
}
function childImportance(kg, P2, N, hasTransmission, n) {
  const b = kg.lightTreeNodes + n * LIGHT_TREE_NODE_SIZE;
  const num = kg.i32[b + LTN.NUM_EMITTERS];
  if (num === 1) emitterImportance(kg, P2, N, hasTransmission, kg.u32[b + LTN.CHILD0]);
  else if (num !== 0) nodeImportance(kg, P2, N, hasTransmission, n);
  else impMax = impMin = 0;
}
function getLeftProbability(kg, P2, N, hasTransmission, left, right) {
  childImportance(kg, P2, N, hasTransmission, left);
  const maxL = impMax, minL = impMin;
  childImportance(kg, P2, N, hasTransmission, right);
  const maxR = impMax, minR = impMin;
  const totalMax = maxL + maxR;
  if (totalMax === 0) return false;
  const totalMin = minL + minR;
  const pMax = maxL / totalMax;
  const pMin = totalMin > 0 ? minL / totalMin : 0.5 * ((maxL > 0 ? 1 : 0) + (maxR === 0 ? 1 : 0));
  leftProbability = 0.5 * (pMax + pMin);
  return true;
}
function sampleReservoir(index, weight) {
  if (!(weight > 0)) return;
  resTotal += weight;
  if (resSelected === -1) {
    resSelected = index;
    resWeight = weight;
    return;
  }
  const thresh = weight / resTotal;
  if (resRand <= thresh) {
    resSelected = index;
    resWeight = weight;
    resRand = resRand / thresh;
  } else {
    resRand = (resRand - thresh) / (1 - thresh);
  }
  resRand = Math.min(Math.max(resRand, 0), 1);
}
function lightTreeSample(kg, rand, P2, N, hasTransmission) {
  const f = kg.f32;
  const u = kg.u32;
  const i32 = kg.i32;
  let pdfLeaf = 1;
  let node = 0;
  let r = rand;
  for (; ; ) {
    const b = kg.lightTreeNodes + node * LIGHT_TREE_NODE_SIZE;
    if (u[b + LTN.TYPE] >= LightTreeNodeType.LEAF) {
      const num = i32[b + LTN.NUM_EMITTERS];
      const first = u[b + LTN.CHILD0];
      const sampleMax = r > 0.5;
      if (num > 1) r = r * 2 - (sampleMax ? 1 : 0);
      const selImp = [0, 0];
      const totImp = [0, 0];
      resSelected = -1;
      resWeight = 0;
      resTotal = 0;
      resRand = r;
      let hasImportance = 0;
      const a = sampleMax ? 0 : 1;
      for (let i = 0; i < num; i++) {
        const e = first + i;
        emitterImportance(kg, P2, N, hasTransmission, e);
        const imp0 = impMax, imp1 = impMin;
        const w2 = a === 0 ? imp0 : imp1;
        sampleReservoir(e, w2);
        if (resSelected === e) selImp[1 - a] = a === 0 ? imp1 : imp0;
        totImp[1 - a] += a === 0 ? imp1 : imp0;
        if (imp0 > 0) hasImportance |= 1 << i;
      }
      selImp[a] = resWeight;
      totImp[a] = resTotal;
      r = resRand;
      if (!hasImportance) return false;
      let selected = resSelected;
      if (totImp[1] === 0) {
        if (sampleMax) {
          selImp[1] = 1;
          let c = 0;
          for (let i = 0; i < num; i++) if (hasImportance & 1 << i) c++;
          totImp[1] = c;
        } else {
          resSelected = -1;
          resWeight = 0;
          resTotal = 0;
          resRand = r;
          let bits = hasImportance;
          for (let i = 0; i < num; i++) {
            sampleReservoir(first + i, bits & 1);
            bits >>>= 1;
          }
          selected = resSelected;
          selImp[1] = resWeight;
          totImp[1] = resTotal;
          emitterImportance(kg, P2, N, hasTransmission, selected);
          selImp[0] = impMax;
        }
      }
      treeSample.emitter = selected;
      treeSample.pdf = pdfLeaf * 0.5 * (selImp[0] / totImp[0] + selImp[1] / totImp[1]);
      void f;
      return true;
    }
    const left = u[b + LTN.CHILD0];
    const right = u[b + LTN.CHILD1];
    if (!getLeftProbability(kg, P2, N, hasTransmission, left, right)) return false;
    const lp = leftProbability;
    let goRight = false;
    const w = 1 - lp;
    if (w > 0) {
      const total = lp + w;
      const thresh = w / total;
      if (r <= thresh) {
        goRight = true;
        r = r / thresh;
      } else {
        r = (r - thresh) / (1 - thresh);
      }
      r = Math.min(Math.max(r, 0), 1);
    }
    node = goRight ? right : left;
    pdfLeaf *= goRight ? 1 - lp : lp;
  }
}
function lightTreePdf(kg, P2, N, hasTransmission, target) {
  const u = kg.u32;
  const i32 = kg.i32;
  let bitTrail = u[kg.lightTreeEmitters + target * LIGHT_TREE_EMITTER_SIZE + LTE.BIT_TRAIL];
  let pdf = 1;
  let node = 0;
  for (; ; ) {
    const b = kg.lightTreeNodes + node * LIGHT_TREE_NODE_SIZE;
    if (u[b + LTN.TYPE] >= LightTreeNodeType.LEAF) {
      const num = i32[b + LTN.NUM_EMITTERS];
      const first = u[b + LTN.CHILD0];
      let tMax = 0, tMin = 0, totMax = 0, totMin = 0, numHas = 0;
      for (let i = 0; i < num; i++) {
        const e = first + i;
        emitterImportance(kg, P2, N, hasTransmission, e);
        if (impMax > 0) numHas++;
        if (e === target) {
          tMax = impMax;
          tMin = impMin;
        }
        totMax += impMax;
        totMin += impMin;
      }
      if (!(tMax > 0)) return 0;
      return pdf * 0.5 * (tMax / totMax + (totMin > 0 ? tMin / totMin : 1 / numHas));
    }
    const left = u[b + LTN.CHILD0];
    const right = u[b + LTN.CHILD1];
    if (!getLeftProbability(kg, P2, N, hasTransmission, left, right)) return 0;
    const goLeft = (bitTrail & 1) === 0;
    bitTrail >>>= 1;
    node = goLeft ? left : right;
    pdf *= goLeft ? leftProbability : 1 - leftProbability;
    if (pdf === 0) return 0;
  }
}
var FLT_MAX2, M_SQRT2, ptcX, ptcY, ptcZ, cosThetaU, distMax, distMin, coneAx, coneAy, coneAz, coneThetaO, coneThetaE, impMax, impMin, leftProbability, resSelected, resWeight, resTotal, resRand, treeSample;
var init_light_tree2 = __esm({
  "src/kernel/light_tree.ts"() {
    "use strict";
    init_layout();
    FLT_MAX2 = 340282347e30;
    M_SQRT2 = Math.SQRT2;
    ptcX = 0;
    ptcY = 0;
    ptcZ = 0;
    cosThetaU = 0;
    distMax = 0;
    distMin = 0;
    coneAx = 0;
    coneAy = 0;
    coneAz = 0;
    coneThetaO = 0;
    coneThetaE = 0;
    impMax = 0;
    impMin = 0;
    leftProbability = 0;
    resSelected = -1;
    resWeight = 0;
    resTotal = 0;
    resRand = 0;
    treeSample = { emitter: -1, pdf: 0 };
  }
});

// src/kernel/bvh.ts
function makeRay() {
  return { Px: 0, Py: 0, Pz: 0, Dx: 0, Dy: 0, Dz: 1, tmin: 0, tmax: Infinity, selfPrim: -1 };
}
function makeHit() {
  return { t: Infinity, u: 0, v: 0, prim: -1 };
}
function rayTriangleIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, ax, ay, az, bx, by, bz, cx, cy, cz, out) {
  const v0x = ax - Px, v0y = ay - Py, v0z = az - Pz;
  const v1x = bx - Px, v1y = by - Py, v1z = bz - Pz;
  const v2x = cx - Px, v2y = cy - Py, v2z = cz - Pz;
  const e0x = v2x - v0x, e0y = v2y - v0y, e0z = v2z - v0z;
  const e1x = v0x - v1x, e1y = v0y - v1y, e1z = v0z - v1z;
  const e2x = v1x - v2x, e2y = v1y - v2y, e2z = v1z - v2z;
  let sx = v2x + v0x, sy = v2y + v0y, sz = v2z + v0z;
  const U = (e0y * sz - e0z * sy) * Dx + (e0z * sx - e0x * sz) * Dy + (e0x * sy - e0y * sx) * Dz;
  sx = v0x + v1x;
  sy = v0y + v1y;
  sz = v0z + v1z;
  const V = (e1y * sz - e1z * sy) * Dx + (e1z * sx - e1x * sz) * Dy + (e1x * sy - e1y * sx) * Dz;
  sx = v1x + v2x;
  sy = v1y + v2y;
  sz = v1z + v2z;
  const W = (e2y * sz - e2z * sy) * Dx + (e2z * sx - e2x * sz) * Dy + (e2x * sy - e2y * sx) * Dz;
  const UVW = U + V + W;
  const eps = FLT_EPSILON * Math.abs(UVW);
  const minUVW = Math.min(U, V, W);
  const maxUVW = Math.max(U, V, W);
  if (!(minUVW >= -eps || maxUVW <= eps)) return false;
  const ngx = 2 * (e1y * e0z - e1z * e0y);
  const ngy = 2 * (e1z * e0x - e1x * e0z);
  const ngz = 2 * (e1x * e0y - e1y * e0x);
  const den = ngx * Dx + ngy * Dy + ngz * Dz;
  if (den === 0) return false;
  const T = v0x * ngx + v0y * ngy + v0z * ngz;
  const t = T / den;
  if (!(t >= tmin && t <= tmax)) return false;
  const rcp = Math.abs(UVW) < 1e-18 ? 0 : 1 / UVW;
  out[0] = Math.min(U * rcp, 1);
  out[1] = Math.min(V * rcp, 1);
  out[2] = t;
  return true;
}
function nodeEntry(f, o, Px, Py, Pz, idx, idy, idz, tmin, tmax) {
  let t0 = (f[o] - Px) * idx, t1 = (f[o + 4] - Px) * idx;
  let lo = t0 < t1 ? t0 : t1, hi = t0 < t1 ? t1 : t0;
  t0 = (f[o + 1] - Py) * idy;
  t1 = (f[o + 5] - Py) * idy;
  lo = Math.max(lo, t0 < t1 ? t0 : t1);
  hi = Math.min(hi, t0 < t1 ? t1 : t0);
  t0 = (f[o + 2] - Pz) * idz;
  t1 = (f[o + 6] - Pz) * idz;
  lo = Math.max(lo, t0 < t1 ? t0 : t1, tmin);
  hi = Math.min(hi, t0 < t1 ? t1 : t0, tmax);
  if (lo > hi) return Infinity;
  return lo === lo ? lo : -Infinity;
}
function intersectClosest(kg, ray, hit, ignoreFlags) {
  const f = kg.f32;
  const u = kg.u32;
  const nodes = kg.nodes;
  const tv = kg.triVerts;
  const ti = kg.triInfo;
  hit.prim = -1;
  hit.t = ray.tmax;
  if (kg.numTris === 0) return false;
  traversalStats.rays++;
  const Px = ray.Px, Py = ray.Py, Pz = ray.Pz;
  const Dx = ray.Dx, Dy = ray.Dy, Dz = ray.Dz;
  const idx = 1 / Dx, idy = 1 / Dy, idz = 1 / Dz;
  const tmin = ray.tmin;
  const self = ray.selfPrim;
  traversalStats.nodes++;
  if (nodeEntry(f, nodes, Px, Py, Pz, idx, idy, idz, tmin, hit.t) === Infinity) return false;
  let sp = 0;
  let node = 0;
  for (; ; ) {
    const o = nodes + node * NODE_SIZE;
    const count = u[o + 7];
    if (count > 0) {
      const first = u[o + 3];
      for (let k = first; k < first + count; k++) {
        if (k === self) continue;
        if (ignoreFlags && u[ti + k * TRI_INFO_SIZE + TI.FLAGS] & ignoreFlags) continue;
        const b = tv + k * TRI_VERTS_SIZE;
        traversalStats.tris++;
        if (rayTriangleIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, hit.t, f[b], f[b + 1], f[b + 2], f[b + 4], f[b + 5], f[b + 6], f[b + 8], f[b + 9], f[b + 10], _uvt) && (hit.prim < 0 || _uvt[2] < hit.t || k < hit.prim)) {
          hit.u = _uvt[0];
          hit.v = _uvt[1];
          hit.t = _uvt[2];
          hit.prim = k;
        }
      }
    } else {
      const left = node + 1;
      const right = u[o + 3];
      traversalStats.nodes += 2;
      const tl = nodeEntry(f, nodes + left * NODE_SIZE, Px, Py, Pz, idx, idy, idz, tmin, hit.t);
      const tr = nodeEntry(f, nodes + right * NODE_SIZE, Px, Py, Pz, idx, idy, idz, tmin, hit.t);
      if (tl !== Infinity) {
        if (tr !== Infinity) {
          if (tl <= tr) {
            _stack[sp] = right;
            _stackT[sp++] = tr;
            node = left;
          } else {
            _stack[sp] = left;
            _stackT[sp++] = tl;
            node = right;
          }
        } else node = left;
        continue;
      }
      if (tr !== Infinity) {
        node = right;
        continue;
      }
    }
    let found = false;
    while (sp > 0) {
      sp--;
      if (_stackT[sp] <= hit.t) {
        node = _stack[sp];
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  return hit.prim >= 0;
}
var FLT_EPSILON, _uvt, _stack, _stackT, traversalStats, IGNORE_FOR_CAMERA, IGNORE_FOR_SHADOW;
var init_bvh = __esm({
  "src/kernel/bvh.ts"() {
    "use strict";
    init_layout();
    FLT_EPSILON = 11920929e-14;
    _uvt = new Float64Array(3);
    _stack = new Int32Array(128);
    _stackT = new Float64Array(128);
    traversalStats = { rays: 0, nodes: 0, tris: 0 };
    IGNORE_FOR_CAMERA = TriFlags.CAMERA_INVISIBLE;
    IGNORE_FOR_SHADOW = TriFlags.SHADOW_INVISIBLE;
  }
});

// src/kernel/sample/mapping.ts
function sampleUniformDisk(rx, ry, out, o = 0) {
  const a = 2 * rx - 1;
  const b = 2 * ry - 1;
  if (a === 0 && b === 0) {
    out[o] = 0;
    out[o + 1] = 0;
    return;
  }
  let r;
  let phi;
  if (a * a > b * b) {
    r = a;
    phi = M_PI_4 * (b / a);
  } else {
    r = b;
    phi = M_PI_2 - M_PI_4 * (a / b);
  }
  out[o] = r * Math.cos(phi);
  out[o + 1] = r * Math.sin(phi);
}
function sampleCosHemisphere(N, rx, ry, wo) {
  sampleUniformDisk(rx, ry, _disk);
  const dx = _disk[0];
  const dy = _disk[1];
  const cosTheta = safeSqrt(1 - dx * dx - dy * dy);
  makeOrthonormals(N, _T, _B);
  wo.x = dx * _T.x + dy * _B.x + cosTheta * N.x;
  wo.y = dx * _T.y + dy * _B.y + cosTheta * N.y;
  wo.z = dx * _T.z + dy * _B.z + cosTheta * N.z;
  return cosTheta * M_1_PI;
}
function sampleUniformCone(N, oneMinusCosAngle, rx, ry, wo, ret) {
  if (oneMinusCosAngle > 0) {
    sampleUniformDisk(rx, ry, _disk);
    const r2 = _disk[0] * _disk[0] + _disk[1] * _disk[1];
    const cosTheta = 1 - r2 * oneMinusCosAngle;
    const s = safeSqrt(oneMinusCosAngle * (2 - oneMinusCosAngle * r2));
    const x = _disk[0] * s;
    const y = _disk[1] * s;
    makeOrthonormals(N, _T, _B);
    wo.x = x * _T.x + y * _B.x + cosTheta * N.x;
    wo.y = x * _T.y + y * _B.y + cosTheta * N.y;
    wo.z = x * _T.z + y * _B.z + cosTheta * N.z;
    ret[0] = 1 / (M_2PI * oneMinusCosAngle);
    ret[1] = cosTheta;
  } else {
    wo.x = N.x;
    wo.y = N.y;
    wo.z = N.z;
    ret[0] = 1;
    ret[1] = 1;
  }
}
function sampleUniformSphere(rx, ry, wo) {
  const z = 1 - 2 * rx;
  const r = sinFromCos(z);
  const phi = M_2PI * ry;
  wo.x = r * Math.cos(phi);
  wo.y = r * Math.sin(phi);
  wo.z = z;
}
function powerHeuristic(a, b) {
  return a * a / (a * a + b * b);
}
var _disk, _T, _B;
var init_mapping = __esm({
  "src/kernel/sample/mapping.ts"() {
    "use strict";
    init_math();
    _disk = new Float64Array(2);
    _T = f3();
    _B = f3();
  }
});

// src/kernel/closure/bsdf.ts
function closureIsBsdf(type) {
  return type >= CLOSURE_BSDF_DIFFUSE && type <= CLOSURE_BSDF_SHEEN;
}
function closureIsMicrofacet(type) {
  return type >= CLOSURE_BSDF_MICROFACET_GGX && type <= CLOSURE_BSDF_MICROFACET_GGX_GLASS;
}
function closureIsGlass(type) {
  return type === CLOSURE_BSDF_MICROFACET_GGX_GLASS;
}
function closureIsRefraction(type) {
  return type === CLOSURE_BSDF_MICROFACET_GGX_REFRACTION;
}
function F0FromIor(ior) {
  return sqr((ior - 1) / (ior + 1));
}
function iorFromF0(f0) {
  const s = Math.sqrt(Math.min(Math.max(f0, 0), 0.99));
  return (1 + s) / (1 - s);
}
function fresnelDielectric(cosThetaI, eta) {
  const etaCosThetaTSq = eta * eta - (1 - cosThetaI * cosThetaI);
  if (etaCosThetaTSq <= 0) {
    _cosThetaT = 0;
    return 1;
  }
  cosThetaI = Math.abs(cosThetaI);
  const cosThetaT = -safeSqrt(etaCosThetaTSq) / eta;
  _cosThetaT = cosThetaT;
  const rs = (cosThetaI + eta * cosThetaT) / (cosThetaI - eta * cosThetaT);
  const rp = (cosThetaT + eta * cosThetaI) / (eta * cosThetaI - cosThetaT);
  return 0.5 * (rs * rs + rp * rp);
}
function fresnelDielectricFss(eta) {
  if (eta < 1) return 0.997118 + eta * (0.1014 - eta * (0.965241 + eta * 0.130607));
  return (eta - 1) / (4.08567 + 1.00071 * eta);
}
function fresnelF82(cosi, F0, B) {
  const s = saturate(1 - cosi);
  const s5 = sqr(sqr(s)) * s;
  const fs = mix(F0, 1, s5);
  return Math.min(Math.max(fs - B * cosi * s5 * s, 0), 1);
}
function fresnelF82TintB(F0, tint) {
  const f = 6 / 7;
  const f5 = sqr(sqr(f)) * f;
  const fs = mix(F0, 1, f5);
  return fs * (7 / (f5 * f)) * (1 - tint);
}
function fresnelF82Fss(F0, B) {
  return mix(F0, 1, 1 / 21) - B * (1 / 126);
}
function ensureValidSpecularReflection(Ng, I, N, out) {
  const dNI = N.x * I.x + N.y * I.y + N.z * I.z;
  _R.x = 2 * dNI * N.x - I.x;
  _R.y = 2 * dNI * N.y - I.y;
  _R.z = 2 * dNI * N.z - I.z;
  const Iz = I.x * Ng.x + I.y * Ng.y + I.z * Ng.z;
  const threshold = Math.min(0.9 * Iz, 0.01);
  if (_R.x * Ng.x + _R.y * Ng.y + _R.z * Ng.z >= threshold) {
    out.x = N.x;
    out.y = N.y;
    out.z = N.z;
    return out;
  }
  const dNNg = N.x * Ng.x + N.y * Ng.y + N.z * Ng.z;
  _X.x = N.x - dNNg * Ng.x;
  _X.y = N.y - dNNg * Ng.y;
  _X.z = N.z - dNNg * Ng.z;
  const l = Math.hypot(_X.x, _X.y, _X.z);
  if (l > 0) {
    _X.x /= l;
    _X.y /= l;
    _X.z /= l;
  } else {
    _X.x = N.x;
    _X.y = N.y;
    _X.z = N.z;
  }
  const Ix = I.x * _X.x + I.y * _X.y + I.z * _X.z;
  const a = sqr(Ix) + sqr(Iz);
  const b = 2 * (a + Iz * threshold);
  const c = sqr(threshold + Iz);
  const Nz2 = Ix < 0 ? 0.25 * (b + safeSqrt(sqr(b) - 4 * a * c)) / a : 0.25 * (b - safeSqrt(sqr(b) - 4 * a * c)) / a;
  const Nx = safeSqrt(1 - Nz2);
  const Nz = safeSqrt(Nz2);
  out.x = Nx * _X.x + Nz * Ng.x;
  out.y = Nx * _X.y + Nz * Ng.y;
  out.z = Nx * _X.z + Nz * Ng.z;
  return out;
}
function microfacetFresnel(c, cosThetaI) {
  const hasReflection = !closureIsRefraction(c.type);
  const hasTransmission = closureIsGlass(c.type) || !hasReflection;
  let rr = hasReflection ? 1 : 0, rg = rr, rb = rr;
  let tr = hasTransmission ? 1 : 0, tg = tr, tb = tr;
  fCosT = 0;
  if (c.fresnelType === FRESNEL_F82_TINT) {
    if (!hasReflection) {
      fRr = fRg = fRb = fTr = fTg = fTb = 0;
      return;
    }
    rr = fresnelF82(cosThetaI, c.f0r, c.br);
    rg = fresnelF82(cosThetaI, c.f0g, c.bg);
    rb = fresnelF82(cosThetaI, c.f0b, c.bb);
  } else if (c.fresnelType === FRESNEL_GENERALIZED_SCHLICK) {
    let Fr, Fg, Fb;
    let TIR = false;
    if (c.exponent < 0) {
      const Freal = fresnelDielectric(cosThetaI, c.ior);
      fCosT = _cosThetaT;
      const F0real = F0FromIor(c.ior);
      const s = saturate(inverseLerp(F0real, 1, Freal));
      Fr = mix(c.f0r, c.f90r, s);
      Fg = mix(c.f0g, c.f90g, s);
      Fb = mix(c.f0b, c.f90b, s);
    } else {
      const cosTSq = 1 - (1 - sqr(cosThetaI)) / sqr(c.ior);
      if (cosTSq <= 0) {
        TIR = true;
        Fr = Fg = Fb = 1;
      } else {
        const cosT = Math.sqrt(cosTSq);
        fCosT = cosT;
        const angle = c.ior < 1 ? cosT : cosThetaI;
        const s = Math.pow(1 - angle, c.exponent);
        Fr = mix(c.f0r, c.f90r, s);
        Fg = mix(c.f0g, c.f90g, s);
        Fb = mix(c.f0b, c.f90b, s);
      }
    }
    if (TIR) {
      fRr = rr * c.tintRr;
      fRg = rg * c.tintRg;
      fRb = rb * c.tintRb;
      fTr = fTg = fTb = 0;
      return;
    }
    const tRr = c.tintRr * Fr, tRg = c.tintRg * Fg, tRb = c.tintRb * Fb;
    const tTr = c.tintTr * (1 - Fr), tTg = c.tintTg * (1 - Fg), tTb = c.tintTb * (1 - Fb);
    rr *= tRr;
    rg *= tRg;
    rb *= tRb;
    tr *= tTr;
    tg *= tTg;
    tb *= tTb;
  } else if (c.fresnelType === FRESNEL_NONE) {
    if (hasTransmission && fresnelDielectric(cosThetaI, c.ior) === 1) {
      tr = tg = tb = 0;
    }
    fCosT = _cosThetaT;
  } else {
    const F = fresnelDielectric(cosThetaI, c.ior);
    fCosT = _cosThetaT;
    rr *= F;
    rg *= F;
    rb *= F;
    tr *= 1 - F;
    tg *= 1 - F;
    tb *= 1 - F;
  }
  fRr = rr;
  fRg = rg;
  fRb = rb;
  fTr = tr;
  fTg = tg;
  fTb = tb;
}
function ggxLambda(alpha2, cosN) {
  const sqrAlphaTanN = alpha2 * Math.max(1 / sqr(cosN) - 1, 0);
  return 0.5 * (Math.sqrt(1 + sqrAlphaTanN) - 1);
}
function ggxD(alpha2, cosNH) {
  const cosNH2 = Math.min(sqr(cosNH), 1);
  const one = 1 - cosNH2;
  return alpha2 / (Math.PI * sqr(one + alpha2 * cosNH2));
}
function alphaIsAlmostSpecular(ax, ay) {
  return ax * ay <= 2e-10;
}
function ggxAnisoD(ax, ay, hx, hy, hz) {
  hx /= ax;
  hy /= ay;
  const len2 = hx * hx + hy * hy + hz * hz;
  return M_1_PI / (ax * ay * sqr(len2));
}
function ggxAnisoLambda(ax, ay, vx, vy, vz) {
  const sqrAlphaTanN = (sqr(ax * vx) + sqr(ay * vy)) / sqr(vz);
  return 0.5 * (Math.sqrt(1 + sqrAlphaTanN) - 1);
}
function ggxSampleVndf(wix, wiy, wiz, ax, ay, rx, ry) {
  let sx = ax * wix, sy = ay * wiy, sz = wiz;
  const sl = Math.hypot(sx, sy, sz);
  sx /= sl;
  sy /= sl;
  sz /= sl;
  const lensq = sx * sx + sy * sy;
  let T1x, T1y, T1z, T2x, T2y, T2z;
  if (lensq > 1e-7) {
    const inv = 1 / Math.sqrt(lensq);
    T1x = -sy * inv;
    T1y = sx * inv;
    T1z = 0;
    T2x = sy * T1z - sz * T1y;
    T2y = sz * T1x - sx * T1z;
    T2z = sx * T1y - sy * T1x;
  } else {
    T1x = 1;
    T1y = 0;
    T1z = 0;
    T2x = 0;
    T2y = 1;
    T2z = 0;
  }
  sampleUniformDisk(rx, ry, _disk2);
  const tx = _disk2[0];
  let ty = _disk2[1];
  ty = mix(safeSqrt(1 - sqr(tx)), ty, 0.5 * (1 + sz));
  const tz = safeSqrt(1 - tx * tx - ty * ty);
  const hx = tx * T1x + ty * T2x + tz * sx;
  const hy = tx * T1y + ty * T2y + tz * sy;
  const hz = tx * T1z + ty * T2z + tz * sz;
  let ux = ax * hx, uy = ay * hy;
  const uz = Math.max(0, hz);
  const ul = Math.hypot(ux, uy, uz);
  ux /= ul;
  uy /= ul;
  _lH.x = ux;
  _lH.y = uy;
  _lH.z = uz / ul;
}
function aToRoughIndex(c) {
  return c.alpha === c.alphaY ? Math.sqrt(c.alpha) : Math.sqrt(Math.sqrt(c.alpha * c.alphaY));
}
function iorToZIndex(ior) {
  return Math.sqrt(Math.abs((ior - 1) / (ior + 1)));
}
function muToYIndex(mu) {
  return safeSqrt(mu);
}
function microfacetGgxPreserveEnergy(kg, c, wi, Fssr, Fssg, Fssb) {
  const t = kg.f32;
  const mu = wi.x * c.N.x + wi.y * c.N.y + wi.z * c.N.z;
  const y = muToYIndex(mu);
  const rough = aToRoughIndex(c);
  let E;
  let Eavg;
  if (c.type === CLOSURE_BSDF_MICROFACET_GGX) {
    E = lookupTableRead2D(t, rough, y, kg.tGgxE, 32, 32);
    Eavg = lookupTableRead(t, rough, kg.tGgxEavg, 32);
  } else if (c.type === CLOSURE_BSDF_MICROFACET_GGX_GLASS) {
    let ofs = kg.tGgxGlassE;
    let avg = kg.tGgxGlassEavg;
    let ior = c.ior;
    if (ior < 1) {
      ior = 1 / ior;
      ofs = kg.tGgxGlassInvE;
      avg = kg.tGgxGlassInvEavg;
    }
    const z = iorToZIndex(ior);
    E = lookupTableRead3D(t, rough, y, z, ofs, 32, 32, 32);
    Eavg = lookupTableRead2D(t, rough, z, avg, 32, 32);
  } else {
    E = 1;
    Eavg = 1;
  }
  const missing = (1 - E) / E;
  c.energyScale = 1 + missing;
  if (!(Fssr === 1 && Fssg === 1 && Fssb === 1)) {
    const fms = (F) => F * Eavg / (1 - F * (1 - Eavg));
    const dr = (1 + fms(Fssr) * missing) / c.energyScale;
    const dg = (1 + fms(Fssg) * missing) / c.energyScale;
    const db = (1 + fms(Fssb) * missing) / c.energyScale;
    c.wr *= dr;
    c.wg *= dg;
    c.wb *= db;
    c.sampleWeight *= (dr + dg + db) / 3;
  }
}
function microfacetEstimateAlbedo(kg, wi, c, evalReflection, evalTransmission, out) {
  const t = kg.f32;
  const cosNI = wi.x * c.N.x + wi.y * c.N.y + wi.z * c.N.z;
  let rr = evalReflection ? 1 : 0, rg = rr, rb = rr;
  let tr = evalTransmission ? 1 : 0, tg = tr, tb = tr;
  if (c.fresnelType === FRESNEL_GENERALIZED_SCHLICK) {
    const rough = aToRoughIndex(c);
    let s;
    if (c.exponent < 0) {
      const z = iorToZIndex(c.ior);
      const y = muToYIndex(cosNI);
      s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickIorS, 32, 32, 32);
    } else {
      const z = 1 / (0.2 * c.exponent + 1);
      const y = muToYIndex(cosNI);
      s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickS, 32, 32, 32);
    }
    const Fr = mix(c.f0r, c.f90r, s), Fg = mix(c.f0g, c.f90g, s), Fb = mix(c.f0b, c.f90b, s);
    rr *= c.tintRr * Fr;
    rg *= c.tintRg * Fg;
    rb *= c.tintRb * Fb;
    tr *= c.tintTr * (1 - Fr);
    tg *= c.tintTg * (1 - Fg);
    tb *= c.tintTb * (1 - Fb);
    out[0] = rr + tr;
    out[1] = rg + tg;
    out[2] = rb + tb;
    return;
  }
  if (c.fresnelType === FRESNEL_F82_TINT) {
    const rough = aToRoughIndex(c);
    const y = muToYIndex(cosNI);
    const s = lookupTableRead3D(t, rough, y, 0.5, kg.tGenSchlickS, 32, 32, 32);
    const e = evalReflection ? 1 : 0;
    out[0] = mix(c.f0r, 1, s) * e;
    out[1] = mix(c.f0g, 1, s) * e;
    out[2] = mix(c.f0b, 1, s) * e;
    return;
  }
  if (c.fresnelType === FRESNEL_DIELECTRIC && c.ior > 1) {
    const rough = aToRoughIndex(c);
    const z = iorToZIndex(c.ior);
    const y = muToYIndex(cosNI);
    const s = lookupTableRead3D(t, rough, y, z, kg.tGenSchlickIorS, 32, 32, 32);
    const F = mix(F0FromIor(c.ior), 1, s);
    rr *= F;
    rg *= F;
    rb *= F;
    tr *= 1 - F;
    tg *= 1 - F;
    tb *= 1 - F;
    if (closureIsGlass(c.type)) {
      out[0] = rr + tr;
      out[1] = rg + tg;
      out[2] = rb + tb;
    } else {
      out[0] = rr;
      out[1] = rg;
      out[2] = rb;
    }
    return;
  }
  microfacetFresnel(c, cosNI);
  out[0] = rr * fRr + tr * fTr;
  out[1] = rg * fRg + tg * fTg;
  out[2] = rb * fRb + tb * fTb;
}
function setupGgx(c) {
  c.alpha = saturate(c.alpha);
  c.alphaY = saturate(c.alphaY);
  c.fresnelType = FRESNEL_NONE;
  c.energyScale = 1;
  c.type = CLOSURE_BSDF_MICROFACET_GGX;
  return SR_BSDF | (alphaIsAlmostSpecular(c.alpha, c.alphaY) ? 0 : SR_BSDF_HAS_EVAL);
}
function setupGgxGlass(c) {
  c.alpha = saturate(c.alpha);
  c.alphaY = saturate(c.alphaY);
  c.fresnelType = FRESNEL_DIELECTRIC;
  c.energyScale = 1;
  c.type = CLOSURE_BSDF_MICROFACET_GGX_GLASS;
  return SR_BSDF | SR_BSDF_HAS_TRANSMISSION | (alphaIsAlmostSpecular(c.alpha, c.alphaY) ? 0 : SR_BSDF_HAS_EVAL);
}
function setupFresnelDielectric(kg, c, wi) {
  c.fresnelType = FRESNEL_DIELECTRIC;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  const Fss = fresnelDielectricFss(c.ior);
  microfacetGgxPreserveEnergy(kg, c, wi, Fss, Fss, Fss);
}
function microfacetAlbedo(kg, wi, c, evalReflection, evalTransmission, out) {
  microfacetEstimateAlbedo(kg, wi, c, evalReflection, evalTransmission, out);
}
function setupSheen(kg, c, wi, roughness) {
  c.type = CLOSURE_BSDF_SHEEN;
  const r = Math.min(Math.max(roughness, 1e-3), 1);
  const N = c.N;
  let bx = N.y * wi.z - N.z * wi.y, by = N.z * wi.x - N.x * wi.z, bz = N.x * wi.y - N.y * wi.x;
  const bl = Math.hypot(bx, by, bz);
  if (bl > 0) {
    bx /= bl;
    by /= bl;
    bz /= bl;
  } else {
    bx = by = bz = 0;
  }
  if (bx * bx + by * by + bz * bz < 0.99) {
    makeOrthonormals(N, c.T, _B2);
  } else {
    c.T.x = by * N.z - bz * N.y;
    c.T.y = bz * N.x - bx * N.z;
    c.T.z = bx * N.y - by * N.x;
  }
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  const t = kg.f32;
  const ofs = kg.tSheenLtc;
  const a = lookupTableRead2D(t, cosNI, r, ofs, SHEEN_RES, SHEEN_RES);
  const b = lookupTableRead2D(t, cosNI, r, ofs + SHEEN_RES * SHEEN_RES, SHEEN_RES, SHEEN_RES);
  const albedo = lookupTableRead2D(t, cosNI, r, ofs + 2 * SHEEN_RES * SHEEN_RES, SHEEN_RES, SHEEN_RES);
  if (Math.abs(a) < 1e-5 || albedo < 1e-5) {
    c.type = CLOSURE_NONE;
    c.sampleWeight = 0;
    return 0;
  }
  c.alpha = a;
  c.alphaY = b;
  c.wr *= albedo;
  c.wg *= albedo;
  c.wb *= albedo;
  c.sampleWeight *= albedo;
  return Math.max(c.wr, c.wg, c.wb);
}
function sheenEval(c, wo, res) {
  const N = c.N, T = c.T;
  _Bs.x = N.y * T.z - N.z * T.y;
  _Bs.y = N.z * T.x - N.x * T.z;
  _Bs.z = N.x * T.y - N.y * T.x;
  const a = c.alpha, b = c.alphaY;
  const lx = wo.x * T.x + wo.y * T.y + wo.z * T.z;
  const ly = wo.x * _Bs.x + wo.y * _Bs.y + wo.z * _Bs.z;
  const lz = wo.x * N.x + wo.y * N.y + wo.z * N.z;
  const lenSqr = sqr(a * lx + b * lz) + sqr(a * ly) + sqr(lz);
  const val = M_1_PI * Math.max(lz, 0) * sqr(a / lenSqr);
  res.r = res.g = res.b = val;
  res.pdf = val;
}
function sheenSample(c, Ng, rx, ry, res, wo) {
  const N = c.N, T = c.T;
  _Bs.x = N.y * T.z - N.z * T.y;
  _Bs.y = N.z * T.x - N.x * T.z;
  _Bs.z = N.x * T.y - N.y * T.x;
  const a = c.alpha, b = c.alphaY;
  sampleUniformDisk(rx, ry, _disk2);
  const dx = _disk2[0], dy = _disk2[1];
  const diskZ = safeSqrt(1 - dx * dx - dy * dy);
  let lx = dx - diskZ * b, ly = dy, lz = diskZ * a;
  const ll = Math.hypot(lx, ly, lz);
  lx /= ll;
  ly /= ll;
  lz /= ll;
  wo.x = lx * T.x + ly * _Bs.x + lz * N.x;
  wo.y = lx * T.y + ly * _Bs.y + lz * N.y;
  wo.z = lx * T.z + ly * _Bs.z + lz * N.z;
  if (Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z <= 0) {
    res.r = res.g = res.b = 0;
    res.pdf = 0;
    return LABEL_REFLECT | LABEL_DIFFUSE;
  }
  const lenSqr = sqr(a * lx + b * lz) + sqr(a * ly) + sqr(lz);
  const val = M_1_PI * lz * sqr(a / lenSqr);
  res.r = res.g = res.b = val;
  res.pdf = val;
  return LABEL_REFLECT | LABEL_DIFFUSE;
}
function setupFresnelGeneralizedSchlick(kg, c, wi, preserveEnergy) {
  c.f0r = saturate(c.f0r);
  c.f0g = saturate(c.f0g);
  c.f0b = saturate(c.f0b);
  c.fresnelType = FRESNEL_GENERALIZED_SCHLICK;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  if (preserveEnergy) {
    let Fr, Fg, Fb;
    if (c.tintTr === 0 && c.tintTg === 0 && c.tintTb === 0) {
      let s;
      if (c.exponent < 0) {
        const F0 = F0FromIor(c.ior);
        const Fss = fresnelDielectricFss(c.ior);
        s = saturate(inverseLerp(F0, 1, Fss));
      } else {
        s = 2 / ((c.exponent + 3) * c.exponent + 2);
      }
      Fr = c.tintRr * mix(c.f0r, c.f90r, s);
      Fg = c.tintRg * mix(c.f0g, c.f90g, s);
      Fb = c.tintRb * mix(c.f0b, c.f90b, s);
    } else {
      Fr = c.tintTr;
      Fg = c.tintTg;
      Fb = c.tintTb;
    }
    microfacetGgxPreserveEnergy(kg, c, wi, Fr, Fg, Fb);
  }
}
function setupFresnelF82Tint(kg, c, wi, tr, tg, tb, preserveEnergy) {
  if (tr === 1 && tg === 1 && tb === 1) {
    c.br = c.bg = c.bb = 0;
  } else {
    c.br = fresnelF82TintB(c.f0r, tr);
    c.bg = fresnelF82TintB(c.f0g, tg);
    c.bb = fresnelF82TintB(c.f0b, tb);
  }
  c.fresnelType = FRESNEL_F82_TINT;
  microfacetEstimateAlbedo(kg, wi, c, true, true, _alb);
  c.sampleWeight *= (_alb[0] + _alb[1] + _alb[2]) / 3;
  if (preserveEnergy) {
    microfacetGgxPreserveEnergy(kg, c, wi, fresnelF82Fss(c.f0r, c.br), fresnelF82Fss(c.f0g, c.bg), fresnelF82Fss(c.f0b, c.bb));
  }
}
function setupFresnelConstant(kg, c, wi, r, g, b) {
  microfacetGgxPreserveEnergy(kg, c, wi, r, g, b);
}
function closureLayerAlbedo(kg, wi, c, out) {
  let m = 1;
  if (closureIsMicrofacet(c.type)) {
    microfacetEstimateAlbedo(kg, wi, c, true, false, _alb);
    m = Math.max(_alb[0], _alb[1], _alb[2]);
  }
  out[0] = c.wr * m;
  out[1] = c.wg * m;
  out[2] = c.wb * m;
}
function microfacetEval(c, wi, wo, res) {
  const hasReflection = !closureIsRefraction(c.type);
  const hasTransmission = closureIsGlass(c.type) || !hasReflection;
  const N = c.N;
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  const cosNO = N.x * wo.x + N.y * wo.y + N.z * wo.z;
  const isTransmission = cosNO < 0;
  res.r = res.g = res.b = 0;
  res.pdf = 0;
  if (cosNI <= 0 || alphaIsAlmostSpecular(c.alpha, c.alphaY) || isTransmission && !hasTransmission || !isTransmission && !hasReflection) return;
  let Hx, Hy, Hz;
  if (isTransmission) {
    Hx = -(c.ior * wo.x + wi.x);
    Hy = -(c.ior * wo.y + wi.y);
    Hz = -(c.ior * wo.z + wi.z);
  } else {
    Hx = wi.x + wo.x;
    Hy = wi.y + wo.y;
    Hz = wi.z + wo.z;
  }
  const lenH = Math.hypot(Hx, Hy, Hz);
  const invLenH = lenH !== 0 ? 1 / lenH : 0;
  Hx *= invLenH;
  Hy *= invLenH;
  Hz *= invLenH;
  const cosHI = Hx * wi.x + Hy * wi.y + Hz * wi.z;
  microfacetFresnel(c, cosHI);
  if (fRr === 0 && fRg === 0 && fRb === 0 && fTr === 0 && fTg === 0 && fTb === 0) return;
  const cosNH = N.x * Hx + N.y * Hy + N.z * Hz;
  let D, lambdaI, lambdaO;
  if (c.alpha === c.alphaY) {
    const alpha2 = c.alpha * c.alphaY;
    D = ggxD(alpha2, cosNH);
    lambdaI = ggxLambda(alpha2, cosNI);
    lambdaO = ggxLambda(alpha2, cosNO);
  } else {
    makeOrthonormalsTangent(N, c.T, _T2, _B2);
    D = ggxAnisoD(c.alpha, c.alphaY, _T2.x * Hx + _T2.y * Hy + _T2.z * Hz, _B2.x * Hx + _B2.y * Hy + _B2.z * Hz, cosNH);
    lambdaI = ggxAnisoLambda(c.alpha, c.alphaY, _T2.x * wi.x + _T2.y * wi.y + _T2.z * wi.z, _B2.x * wi.x + _B2.y * wi.y + _B2.z * wi.z, cosNI);
    lambdaO = ggxAnisoLambda(c.alpha, c.alphaY, _T2.x * wo.x + _T2.y * wo.y + _T2.z * wo.z, _B2.x * wo.x + _B2.y * wo.y + _B2.z * wo.z, cosNO);
  }
  const cosHO = Hx * wo.x + Hy * wo.y + Hz * wo.z;
  const common = D / cosNI * (isTransmission ? sqr(c.ior * invLenH) * Math.abs(cosHI * cosHO) : 0.25);
  const avgR = (fRr + fRg + fRb) / 3;
  const avgSum = (fRr + fRg + fRb + fTr + fTg + fTb) / 3;
  const pdfReflect = avgR / avgSum;
  const lobePdf = isTransmission ? 1 - pdfReflect : pdfReflect;
  res.pdf = common * lobePdf / (1 + lambdaI);
  const f = common / (1 + lambdaO + lambdaI);
  if (isTransmission) {
    res.r = fTr * f;
    res.g = fTg * f;
    res.b = fTb * f;
  } else {
    res.r = fRr * f;
    res.g = fRg * f;
    res.b = fRb * f;
  }
}
function microfacetSample(c, Ng, wi, rx, ry, rz, res, wo) {
  const N = c.N;
  const cosNI = N.x * wi.x + N.y * wi.y + N.z * wi.z;
  if (cosNI <= 0) return LABEL_NONE;
  const mEta = c.ior;
  const mInvEta = c.ior !== 0 ? 1 / c.ior : 0;
  const ax = c.alpha, ay = c.alphaY;
  const iso = ax === ay;
  let singular = alphaIsAlmostSpecular(ax, ay);
  let Hx, Hy, Hz;
  let localHx = 0, localHy = 0, localHz = 1, lix = 0, liy = 0;
  if (singular) {
    Hx = N.x;
    Hy = N.y;
    Hz = N.z;
  } else {
    if (iso) makeOrthonormals(N, _T2, _B2);
    else makeOrthonormalsTangent(N, c.T, _T2, _B2);
    lix = _T2.x * wi.x + _T2.y * wi.y + _T2.z * wi.z;
    liy = _B2.x * wi.x + _B2.y * wi.y + _B2.z * wi.z;
    ggxSampleVndf(lix, liy, cosNI, ax, ay, rx, ry);
    localHx = _lH.x;
    localHy = _lH.y;
    localHz = _lH.z;
    Hx = _lH.x * _T2.x + _lH.y * _B2.x + _lH.z * N.x;
    Hy = _lH.x * _T2.y + _lH.y * _B2.y + _lH.z * N.y;
    Hz = _lH.x * _T2.z + _lH.y * _B2.z + _lH.z * N.z;
  }
  const cosHI = Hx * wi.x + Hy * wi.y + Hz * wi.z;
  microfacetFresnel(c, cosHI);
  const cosHO = fCosT;
  if (fRr === 0 && fRg === 0 && fRb === 0 && fTr === 0 && fTg === 0 && fTb === 0) return LABEL_NONE;
  const avgR = (fRr + fRg + fRb) / 3;
  const avgSum = (fRr + fRg + fRb + fTr + fTg + fTb) / 3;
  const pdfReflect = avgR / avgSum;
  const doRefract = rz >= pdfReflect;
  if (doRefract) {
    const k = mInvEta * cosHI + cosHO;
    wo.x = k * Hx - mInvEta * wi.x;
    wo.y = k * Hy - mInvEta * wi.y;
    wo.z = k * Hz - mInvEta * wi.z;
  } else {
    wo.x = 2 * cosHI * Hx - wi.x;
    wo.y = 2 * cosHI * Hy - wi.y;
    wo.z = 2 * cosHI * Hz - wi.z;
  }
  const cosNO = N.x * wo.x + N.y * wo.y + N.z * wo.z;
  const cosNgO = Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z;
  if (cosNgO < 0 !== doRefract || cosNO < 0 !== doRefract) return LABEL_NONE;
  let er, eg, eb, pdf;
  if (doRefract) {
    er = fTr;
    eg = fTg;
    eb = fTb;
    pdf = 1 - pdfReflect;
    singular = singular || Math.abs(mEta - 1) < 1e-4;
  } else {
    er = fRr;
    eg = fRg;
    eb = fRb;
    pdf = pdfReflect;
  }
  if (singular) {
    pdf *= 1e6;
    er *= 1e6;
    eg *= 1e6;
    eb *= 1e6;
  } else {
    let D, lambdaO, lambdaI;
    if (iso) {
      const alpha2 = ax * ay;
      D = ggxD(alpha2, localHz);
      lambdaO = ggxLambda(alpha2, cosNO);
      lambdaI = ggxLambda(alpha2, cosNI);
    } else {
      D = ggxAnisoD(ax, ay, localHx, localHy, localHz);
      lambdaO = ggxAnisoLambda(ax, ay, _T2.x * wo.x + _T2.y * wo.y + _T2.z * wo.z, _B2.x * wo.x + _B2.y * wo.y + _B2.z * wo.z, cosNO);
      lambdaI = ggxAnisoLambda(ax, ay, lix, liy, cosNI);
    }
    const common = D / cosNI * (doRefract ? Math.abs(cosHI * cosHO) / sqr(cosHO + cosHI * mInvEta) : 0.25);
    pdf *= common / (1 + lambdaI);
    const f = common / (1 + lambdaI + lambdaO);
    er *= f;
    eg *= f;
    eb *= f;
  }
  const s = c.energyScale;
  res.r = er * s;
  res.g = eg * s;
  res.b = eb * s;
  res.pdf = pdf;
  return (doRefract ? LABEL_TRANSMIT : LABEL_REFLECT) | (singular ? LABEL_SINGULAR : LABEL_GLOSSY);
}
function bsdfEval(c, wi, wo, res) {
  switch (c.type) {
    case CLOSURE_BSDF_DIFFUSE: {
      const cosNO = Math.max(c.N.x * wo.x + c.N.y * wo.y + c.N.z * wo.z, 0) * M_1_PI;
      res.r = res.g = res.b = cosNO;
      res.pdf = cosNO;
      return;
    }
    case CLOSURE_BSDF_MICROFACET_GGX:
    case CLOSURE_BSDF_MICROFACET_GGX_REFRACTION:
    case CLOSURE_BSDF_MICROFACET_GGX_GLASS: {
      microfacetEval(c, wi, wo, res);
      const s = c.energyScale;
      res.r *= s;
      res.g *= s;
      res.b *= s;
      return;
    }
    case CLOSURE_BSDF_SHEEN:
      sheenEval(c, wo, res);
      return;
    default:
      res.r = res.g = res.b = 0;
      res.pdf = 0;
  }
}
function bsdfSample(c, Ng, wi, rx, ry, rz, res, wo) {
  res.r = res.g = res.b = 0;
  res.pdf = 0;
  switch (c.type) {
    case CLOSURE_BSDF_DIFFUSE: {
      const pdf = sampleCosHemisphere(c.N, rx, ry, wo);
      if (Ng.x * wo.x + Ng.y * wo.y + Ng.z * wo.z > 0) {
        res.r = res.g = res.b = pdf;
        res.pdf = pdf;
      }
      return LABEL_REFLECT | LABEL_DIFFUSE;
    }
    case CLOSURE_BSDF_MICROFACET_GGX:
    case CLOSURE_BSDF_MICROFACET_GGX_REFRACTION:
    case CLOSURE_BSDF_MICROFACET_GGX_GLASS:
      return microfacetSample(c, Ng, wi, rx, ry, rz, res, wo);
    case CLOSURE_BSDF_SHEEN:
      return sheenSample(c, Ng, rx, ry, res, wo);
    case CLOSURE_BSDF_TRANSPARENT: {
      wo.x = -wi.x;
      wo.y = -wi.y;
      wo.z = -wi.z;
      res.pdf = 1;
      res.r = res.g = res.b = 1;
      return LABEL_TRANSMIT | LABEL_TRANSPARENT;
    }
  }
  return LABEL_NONE;
}
function bsdfBlur(c, roughness) {
  if (closureIsMicrofacet(c.type)) {
    c.alpha = Math.max(roughness, c.alpha);
    c.alphaY = Math.max(roughness, c.alphaY);
  }
}
function bsdfRoughnessSquared(c) {
  if (closureIsMicrofacet(c.type)) return c.alpha * c.alphaY;
  return 1;
}
var CLOSURE_NONE, CLOSURE_BSDF_DIFFUSE, CLOSURE_BSDF_MICROFACET_GGX, CLOSURE_BSDF_MICROFACET_GGX_REFRACTION, CLOSURE_BSDF_MICROFACET_GGX_GLASS, CLOSURE_BSDF_TRANSPARENT, CLOSURE_BSDF_SHEEN, LABEL_NONE, LABEL_TRANSMIT, LABEL_REFLECT, LABEL_DIFFUSE, LABEL_GLOSSY, LABEL_SINGULAR, LABEL_TRANSPARENT, FRESNEL_NONE, FRESNEL_DIELECTRIC, FRESNEL_GENERALIZED_SCHLICK, FRESNEL_F82_TINT, SR_BSDF, SR_BSDF_HAS_EVAL, SR_BSDF_HAS_TRANSMISSION, SR_EMISSION, SR_TRANSPARENT, SR_BACKFACING, CLOSURE_WEIGHT_CUTOFF, MAX_CLOSURE, Closure, BsdfEvalResult, _cosThetaT, _R, _X, fRr, fRg, fRb, fTr, fTg, fTb, fCosT, _disk2, _lH, _alb, SHEEN_RES, _Bs, _T2, _B2;
var init_bsdf = __esm({
  "src/kernel/closure/bsdf.ts"() {
    "use strict";
    init_math();
    init_mapping();
    init_tables();
    CLOSURE_NONE = 0;
    CLOSURE_BSDF_DIFFUSE = 1;
    CLOSURE_BSDF_MICROFACET_GGX = 2;
    CLOSURE_BSDF_MICROFACET_GGX_REFRACTION = 3;
    CLOSURE_BSDF_MICROFACET_GGX_GLASS = 4;
    CLOSURE_BSDF_TRANSPARENT = 5;
    CLOSURE_BSDF_SHEEN = 6;
    LABEL_NONE = 0;
    LABEL_TRANSMIT = 1;
    LABEL_REFLECT = 2;
    LABEL_DIFFUSE = 4;
    LABEL_GLOSSY = 8;
    LABEL_SINGULAR = 16;
    LABEL_TRANSPARENT = 32;
    FRESNEL_NONE = 0;
    FRESNEL_DIELECTRIC = 1;
    FRESNEL_GENERALIZED_SCHLICK = 4;
    FRESNEL_F82_TINT = 5;
    SR_BSDF = 1;
    SR_BSDF_HAS_EVAL = 2;
    SR_BSDF_HAS_TRANSMISSION = 4;
    SR_EMISSION = 8;
    SR_TRANSPARENT = 16;
    SR_BACKFACING = 32;
    CLOSURE_WEIGHT_CUTOFF = 1e-5;
    MAX_CLOSURE = 8;
    Closure = class {
      type = CLOSURE_NONE;
      wr = 0;
      wg = 0;
      wb = 0;
      sampleWeight = 0;
      N = f3();
      /** GGX alpha_x (along T); for sheen, the LTC transformA. */
      alpha = 0;
      /** GGX alpha_y; for sheen, the LTC transformB. Equal to alpha for isotropic GGX. */
      alphaY = 0;
      /** Tangent of anisotropic GGX (Cycles MicrofacetBsdf::T), or the sheen frame's T. */
      T = f3();
      ior = 1;
      energyScale = 1;
      fresnelType = FRESNEL_NONE;
      // Generalized Schlick / F82
      f0r = 0;
      f0g = 0;
      f0b = 0;
      f90r = 1;
      f90g = 1;
      f90b = 1;
      exponent = -1;
      tintRr = 1;
      tintRg = 1;
      tintRb = 1;
      tintTr = 0;
      tintTg = 0;
      tintTb = 0;
      br = 0;
      bg = 0;
      bb = 0;
    };
    BsdfEvalResult = class {
      r = 0;
      g = 0;
      b = 0;
      pdf = 0;
    };
    _cosThetaT = 0;
    _R = f3();
    _X = f3();
    fRr = 0;
    fRg = 0;
    fRb = 0;
    fTr = 0;
    fTg = 0;
    fTb = 0;
    fCosT = 0;
    _disk2 = new Float64Array(2);
    _lH = f3();
    _alb = new Float64Array(3);
    SHEEN_RES = 32;
    _Bs = f3();
    _T2 = f3();
    _B2 = f3();
  }
});

// src/kernel/light.ts
function sinSqrToOneMinusCos(sSq) {
  return sSq > 4e-4 ? 1 - safeSqrt(1 - sSq) : 0.5 * sSq;
}
function smoothstep012(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return (3 - 2 * x) * x * x;
}
function raySphereIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, cx, cy, cz, r) {
  const dx = cx - Px, dy = cy - Py, dz = cz - Pz;
  const dSq = dx * dx + dy * dy + dz * dz;
  const rSq = r * r;
  const dCosTheta = dx * Dx + dy * Dy + dz * Dz;
  const hSq = dSq - dCosTheta * dCosTheta;
  if (dSq > rSq && (dCosTheta < 0 || hSq > rSq)) return -1;
  const tOffset = Math.sqrt(Math.max(rSq - hSq, 0));
  const t = dCosTheta - (dSq < rSq ? -tOffset : tOffset);
  if (t > tmin && t < tmax) return t;
  return -1;
}
function backgroundEval(kg, Dx, Dy, Dz, out) {
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  const f = kg.f32;
  let r = f[sh + SH.EMISSION], g = f[sh + SH.EMISSION + 1], b = f[sh + SH.EMISSION + 2];
  const tex = kg.u32[sh + SH.ENV_TEX];
  if (tex !== NONE) {
    directionToEquirect(Dx, Dy, Dz, f[sh + SH.ENV_ROTATION], _uv);
    textureLookup(kg, tex, _uv[0], _uv[1], _rgba);
    r *= _rgba[0];
    g *= _rgba[1];
    b *= _rgba[2];
  }
  out[0] = r;
  out[1] = g;
  out[2] = b;
}
function shaderBackgroundEval(kg, D, out) {
  backgroundEval(kg, D.x, D.y, D.z, out);
}
function backgroundMapSample(kg, rx, ry, D) {
  const f = kg.f32;
  const resX = kg.bgResX;
  const resY = kg.bgResY;
  const cdfWidth = resX + 1;
  const marg = kg.bgMarginal;
  const cond = kg.bgConditional;
  let first = 0;
  let count = resY;
  while (count > 0) {
    const step = count >> 1;
    const middle = first + step;
    if (f[marg + middle * 2 + 1] < ry) {
      first = middle + 1;
      count -= step + 1;
    } else count = step;
  }
  const indexV = Math.max(0, first - 1);
  const cdfVx = f[marg + indexV * 2], cdfVy = f[marg + indexV * 2 + 1];
  const cdfNextVy = f[marg + (indexV + 1) * 2 + 1];
  const cdfLastVx = f[marg + resY * 2];
  const dv = inverseLerp(cdfVy, cdfNextVy, ry);
  const v = (indexV + dv) / resY;
  first = 0;
  count = resX;
  const row = cond + indexV * cdfWidth * 2;
  while (count > 0) {
    const step = count >> 1;
    const middle = first + step;
    if (f[row + middle * 2 + 1] < rx) {
      first = middle + 1;
      count -= step + 1;
    } else count = step;
  }
  const indexU = Math.max(0, first - 1);
  const cdfUx = f[row + indexU * 2], cdfUy = f[row + indexU * 2 + 1];
  const cdfNextUy = f[row + (indexU + 1) * 2 + 1];
  const cdfLastUx = f[row + resX * 2];
  const du = inverseLerp(cdfUy, cdfNextUy, rx);
  const u = (indexU + du) / resX;
  const sinTheta = Math.sin(Math.PI * v);
  const denom = 2 * Math.PI * Math.PI * sinTheta * cdfLastUx * cdfLastVx;
  const pdf = sinTheta === 0 || denom === 0 ? 0 : cdfUx * cdfVx / denom;
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  equirectToDirection(u, 1 - v, kg.f32[sh + SH.ENV_ROTATION], _dir);
  D.x = _dir[0];
  D.y = _dir[1];
  D.z = _dir[2];
  return pdf;
}
function backgroundLightPdf(kg, Dx, Dy, Dz) {
  const f = kg.f32;
  const resX = kg.bgResX;
  const resY = kg.bgResY;
  if (resX === 0) return 1 / (4 * Math.PI);
  const sh = kg.shaders + kg.worldShader * SHADER_SIZE;
  directionToEquirect(Dx, Dy, Dz, f[sh + SH.ENV_ROTATION], _uv);
  const u = _uv[0];
  const v = 1 - _uv[1];
  const sinTheta = Math.sin(v * Math.PI);
  if (sinTheta === 0) return 0;
  const cdfWidth = resX + 1;
  const indexU = clamp(Math.trunc(u * resX), 0, resX - 1);
  const indexV = clamp(Math.trunc(v * resY), 0, resY - 1);
  const row = kg.bgConditional + indexV * cdfWidth * 2;
  const cdfLastUx = f[row + resX * 2];
  const cdfLastVx = f[kg.bgMarginal + resY * 2];
  const denom = 2 * Math.PI * Math.PI * sinTheta * cdfLastUx * cdfLastVx;
  if (denom === 0) return 0;
  return f[row + indexU * 2] * f[kg.bgMarginal + indexV * 2] / denom;
}
function areaLightRectSample(Px, Py, Pz, ls, ux, uy, uz, lenU, vx, vy, vz, lenV, rx, ry, sampleCoord) {
  let zx = uy * vz - uz * vy, zy = uz * vx - ux * vz, zz = ux * vy - uy * vx;
  const dirx = ls.P.x - Px, diry = ls.P.y - Py, dirz = ls.P.z - Pz;
  let z0 = dirx * zx + diry * zy + dirz * zz;
  if (z0 > 0) {
    zx = -zx;
    zy = -zy;
    zz = -zz;
    z0 = -z0;
  }
  const xc = dirx * ux + diry * uy + dirz * uz;
  const yc = dirx * vx + diry * vy + dirz * vz;
  const x0 = xc - 0.5 * lenU;
  const x1 = xc + 0.5 * lenU;
  const y0 = yc - 0.5 * lenV;
  const y1 = yc + 0.5 * lenV;
  let n0 = -y0, n1 = x1, n2 = y1, n3 = -x0;
  n0 /= Math.sqrt(n0 * n0 + z0 * z0);
  n1 /= Math.sqrt(n1 * n1 + z0 * z0);
  n2 /= Math.sqrt(n2 * n2 + z0 * z0);
  n3 /= Math.sqrt(n3 * n3 + z0 * z0);
  const g0 = safeAsin(-n0 * n1);
  const g1 = safeAsin(-n1 * n2);
  const g2 = safeAsin(-n2 * n3);
  const g3 = safeAsin(-n3 * n0);
  const S = -(g0 + g1 + g2 + g3);
  if (sampleCoord) {
    const b0 = n0;
    const b1 = n2;
    const b0sq = b0 * b0;
    const au = rx * S + g2 + g3;
    const sau = Math.sin(au);
    const fu = sau !== 0 ? (Math.cos(au) * b0 + b1) / sau : 0;
    let cu = (fu >= 0 ? 1 : -1) / Math.sqrt(fu * fu + b0sq);
    cu = clamp(cu, -1, 1);
    let xu = -(cu * z0) / Math.max(Math.sqrt(1 - cu * cu), 1e-7);
    xu = clamp(xu, x0, x1);
    const d2 = sqr(xu) + sqr(z0);
    const h0 = y0 / Math.sqrt(d2 + sqr(y0));
    const h1 = y1 / Math.sqrt(d2 + sqr(y1));
    const hv = h0 + ry * (h1 - h0);
    const hv2 = hv * hv;
    const yv = hv2 < 1 - 1e-6 ? hv * Math.sqrt(d2 / (1 - hv2)) : y1;
    ls.P.x = Px + xu * ux + yv * vx + z0 * zx;
    ls.P.y = Py + xu * uy + yv * vy + z0 * zy;
    ls.P.z = Pz + xu * uz + yv * vz + z0 * zz;
  }
  if (S < 1e-5 || Math.min(n0 * n0, n1 * n1, n2 * n2, n3 * n3) > 0.99999) {
    const t = Math.hypot(dirx, diry, dirz);
    const den = z0 * lenU * lenV;
    return den !== 0 ? -t * t * t / den : 0;
  }
  return 1 / S;
}
function ellipseSample(ls, ux, uy, uz, hu, vx, vy, vz, hv, rx, ry) {
  const a = 2 * rx - 1;
  const b = 2 * ry - 1;
  let dx = 0, dy = 0;
  if (a !== 0 || b !== 0) {
    let r, phi;
    if (a * a > b * b) {
      r = a;
      phi = Math.PI / 4 * (b / a);
    } else {
      r = b;
      phi = Math.PI / 2 - Math.PI / 4 * (a / b);
    }
    dx = r * Math.cos(phi);
    dy = r * Math.sin(phi);
  }
  ls.P.x += ux * hu * dx + vx * hv * dy;
  ls.P.y += uy * hu * dx + vy * hv * dy;
  ls.P.z += uz * hu * dx + vz * hv * dy;
}
function lightSampleFromPosition(kg, rx, ry, rz, P2, N, hasTransmission, ls) {
  if (kg.numDistribution === 0) return false;
  if (kg.useLightTree) {
    if (!lightTreeSample(kg, rz, P2, N, hasTransmission)) return false;
    const id = kg.i32[kg.lightTreeEmitters + treeSample.emitter * LIGHT_TREE_EMITTER_SIZE + LTE.ID];
    const selection = treeSample.pdf;
    if (id >= 0) {
      if (!triangleLightSample(kg, id, rx, ry, P2, ls)) return false;
    } else if (!lampSample(kg, ~id, rx, ry, P2, N, hasTransmission, ls)) return false;
    ls.pdf *= selection;
    return ls.pdf > 0;
  }
  const f = kg.f32;
  const u = kg.u32;
  let first = 0;
  let len = kg.numDistribution + 1;
  const dist = kg.distribution;
  do {
    const half = len >> 1;
    const middle = first + half;
    if (rz < f[dist + middle * DIST_SIZE]) len = half;
    else {
      first = middle + 1;
      len = len - half - 1;
    }
  } while (len > 0);
  const index = clamp(first - 1, 0, kg.numDistribution - 1);
  const prim = kg.i32[dist + index * DIST_SIZE + 1];
  if (prim >= 0) {
    return triangleLightSample(kg, prim, rx, ry, P2, ls);
  }
  const lamp = ~prim;
  if (!lampSample(kg, lamp, rx, ry, P2, N, hasTransmission, ls)) return false;
  ls.pdf *= kg.pdfLights;
  void u;
  return ls.pdf > 0;
}
function lampSample(kg, lamp, rx, ry, P2, N, hasTransmission, ls) {
  const f = kg.f32;
  const u = kg.u32;
  const L = kg.lights + lamp * LIGHT_SIZE;
  const type = u[L + LT.TYPE];
  const flags = u[L + LT.FLAGS];
  ls.type = type;
  ls.lamp = lamp;
  ls.prim = -1;
  ls.castShadow = (flags & LightFlags.CAST_SHADOW) !== 0;
  ls.er = f[L + LT.STRENGTH];
  ls.eg = f[L + LT.STRENGTH + 1];
  ls.eb = f[L + LT.STRENGTH + 2];
  if (type === LightType.SUN) {
    _tmp.x = f[L + LT.CO];
    _tmp.y = f[L + LT.CO + 1];
    _tmp.z = f[L + LT.CO + 2];
    sampleUniformCone(_tmp, f[L + LT.SUN_ONE_MINUS_COSANGLE], rx, ry, ls.Ng, _cone);
    ls.pdf = _cone[0];
    ls.P.x = ls.Ng.x;
    ls.P.y = ls.Ng.y;
    ls.P.z = ls.Ng.z;
    ls.D.x = -ls.Ng.x;
    ls.D.y = -ls.Ng.y;
    ls.D.z = -ls.Ng.z;
    ls.t = Infinity;
    ls.evalFac = f[L + LT.EVAL_FAC];
    return true;
  }
  if (type === LightType.BACKGROUND) {
    const pdf = backgroundMapSample(kg, rx, ry, ls.D);
    ls.pdf = pdf;
    ls.P.x = -ls.D.x;
    ls.P.y = -ls.D.y;
    ls.P.z = -ls.D.z;
    ls.Ng.x = ls.P.x;
    ls.Ng.y = ls.P.y;
    ls.Ng.z = ls.P.z;
    ls.t = Infinity;
    ls.evalFac = 1;
    backgroundEval(kg, ls.D.x, ls.D.y, ls.D.z, _rgba);
    ls.er = _rgba[0];
    ls.eg = _rgba[1];
    ls.eb = _rgba[2];
    return pdf > 0;
  }
  if (type === LightType.POINT || type === LightType.SPOT) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const radius = f[L + LT.RADIUS];
    const rSq = radius * radius;
    let lnx = P2.x - cx, lny = P2.y - cy, lnz = P2.z - cz;
    const dSq = lnx * lnx + lny * lny + lnz * lnz;
    const d = Math.sqrt(dSq);
    lnx /= d;
    lny /= d;
    lnz /= d;
    ls.evalFac = f[L + LT.EVAL_FAC];
    if (flags & LightFlags.IS_SPHERE) {
      let cosTheta;
      let tSet = false;
      if (dSq > rSq) {
        const oneMinusCos = sinSqrToOneMinusCos(rSq / dSq);
        let sampled = false;
        if (type === LightType.SPOT) {
          const oneMinusSpread = 1 - f[L + LT.COS_HALF_LARGER_SPREAD];
          if (!(oneMinusCos < oneMinusSpread)) {
            _tmp.x = -f[L + LT.SPOT_DIR];
            _tmp.y = -f[L + LT.SPOT_DIR + 1];
            _tmp.z = -f[L + LT.SPOT_DIR + 2];
            sampleUniformCone(_tmp, oneMinusSpread, rx, ry, ls.D, _cone);
            ls.pdf = _cone[0];
            const t2 = raySphereIntersect(P2.x, P2.y, P2.z, ls.D.x, ls.D.y, ls.D.z, 0, Infinity, cx, cy, cz, radius);
            if (t2 < 0) return false;
            ls.t = t2;
            ls.P.x = P2.x + ls.D.x * t2;
            ls.P.y = P2.y + ls.D.y * t2;
            ls.P.z = P2.z + ls.D.z * t2;
            tSet = true;
            sampled = true;
          }
        }
        if (!sampled) {
          _tmp.x = -lnx;
          _tmp.y = -lny;
          _tmp.z = -lnz;
          sampleUniformCone(_tmp, oneMinusCos, rx, ry, ls.D, _cone);
          ls.pdf = _cone[0];
        }
        cosTheta = _cone[1];
      } else {
        if (hasTransmission) {
          sampleUniformSphere(rx, ry, ls.D);
          ls.pdf = M_1_2PI * 0.5;
        } else {
          ls.pdf = sampleCosHemisphere(N, rx, ry, ls.D);
        }
        cosTheta = -(ls.D.x * lnx + ls.D.y * lny + ls.D.z * lnz);
      }
      if (type === LightType.SPOT && dSq > rSq) {
        const localZ = -(ls.D.x * f[L + LT.SPOT_DIR] + ls.D.y * f[L + LT.SPOT_DIR + 1] + ls.D.z * f[L + LT.SPOT_DIR + 2]);
        ls.evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
        if (ls.evalFac === 0) return false;
      }
      if (!tSet) {
        const sgn = dSq - rSq >= 0 ? 1 : -1;
        ls.t = d * cosTheta - sgn * safeSqrt(rSq - dSq + dSq * cosTheta * cosTheta);
        ls.P.x = P2.x + ls.D.x * ls.t;
        ls.P.y = P2.y + ls.D.y * ls.t;
        ls.P.z = P2.z + ls.D.z * ls.t;
      }
      let ngx = ls.P.x - cx, ngy = ls.P.y - cy, ngz = ls.P.z - cz;
      const ngl = Math.hypot(ngx, ngy, ngz) || 1;
      ngx /= ngl;
      ngy /= ngl;
      ngz /= ngl;
      ls.Ng.x = ngx;
      ls.Ng.y = ngy;
      ls.Ng.z = ngz;
      ls.P.x = cx + ngx * radius;
      ls.P.y = cy + ngy * radius;
      ls.P.z = cz + ngz * radius;
      return true;
    }
    ls.P.x = cx;
    ls.P.y = cy;
    ls.P.z = cz;
    let dx = cx - P2.x, dy = cy - P2.y, dz = cz - P2.z;
    const t = Math.hypot(dx, dy, dz);
    dx /= t;
    dy /= t;
    dz /= t;
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = t;
    ls.Ng.x = -dx;
    ls.Ng.y = -dy;
    ls.Ng.z = -dz;
    if (type === LightType.SPOT) {
      const localZ = -(dx * f[L + LT.SPOT_DIR] + dy * f[L + LT.SPOT_DIR + 1] + dz * f[L + LT.SPOT_DIR + 2]);
      ls.evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
      if (ls.evalFac === 0) return false;
    }
    ls.pdf = t * t;
    return true;
  }
  if (type === LightType.AREA) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
    ls.P.x = cx;
    ls.P.y = cy;
    ls.P.z = cz;
    ls.Ng.x = nx;
    ls.Ng.y = ny;
    ls.Ng.z = nz;
    if ((cx - P2.x) * nx + (cy - P2.y) * ny + (cz - P2.z) * nz > 0) return false;
    const ux = f[L + LT.AXIS_U], uy = f[L + LT.AXIS_U + 1], uz = f[L + LT.AXIS_U + 2];
    const vx = f[L + LT.AXIS_V], vy = f[L + LT.AXIS_V + 1], vz = f[L + LT.AXIS_V + 2];
    const lenU = f[L + LT.LEN_U], lenV = f[L + LT.LEN_V];
    const invareaSigned = f[L + LT.INVAREA];
    if (invareaSigned > 0) {
      ls.pdf = areaLightRectSample(P2.x, P2.y, P2.z, ls, ux, uy, uz, lenU, vx, vy, vz, lenV, rx, ry, true);
    } else {
      ellipseSample(ls, ux, uy, uz, lenU * 0.5, vx, vy, vz, lenV * 0.5, rx, ry);
      ls.pdf = 4 / Math.PI / (lenU * lenV);
    }
    let dx = ls.P.x - P2.x, dy = ls.P.y - P2.y, dz = ls.P.z - P2.z;
    const t = Math.hypot(dx, dy, dz);
    if (t > 0) {
      dx /= t;
      dy /= t;
      dz /= t;
    }
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = t;
    ls.evalFac = f[L + LT.EVAL_FAC];
    if (invareaSigned < 0) {
      const cosPi = -(nx * dx + ny * dy + nz * dz);
      if (cosPi <= 0) return false;
      ls.pdf *= t * t / cosPi;
    }
    return ls.evalFac > 0 && ls.pdf > 0;
  }
  return false;
}
function triangleLightSample(kg, prim, rx, ry, P2, ls) {
  const f = kg.f32;
  const b = kg.triVerts + prim * TRI_VERTS_SIZE;
  const v0x = f[b], v0y = f[b + 1], v0z = f[b + 2];
  const v1x = f[b + 4], v1y = f[b + 5], v1z = f[b + 6];
  const v2x = f[b + 8], v2y = f[b + 9], v2z = f[b + 10];
  const e0x = v1x - v0x, e0y = v1y - v0y, e0z = v1z - v0z;
  const e1x = v2x - v0x, e1y = v2y - v0y, e1z = v2z - v0z;
  const e2x = v2x - v1x, e2y = v2y - v1y, e2z = v2z - v1z;
  const longestEdgeSq = Math.max(e0x * e0x + e0y * e0y + e0z * e0z, e1x * e1x + e1y * e1y + e1z * e1z, e2x * e2x + e2y * e2y + e2z * e2z);
  const N0x = e0y * e1z - e0z * e1y, N0y = e0z * e1x - e0x * e1z, N0z = e0x * e1y - e0y * e1x;
  const nn = N0x * N0x + N0y * N0y + N0z * N0z;
  const distanceToPlane = (N0x * (v0x - P2.x) + N0y * (v0y - P2.y) + N0z * (v0z - P2.z)) / nn;
  const Nl = Math.sqrt(nn);
  ls.Ng.x = N0x / Nl;
  ls.Ng.y = N0y / Nl;
  ls.Ng.z = N0z / Nl;
  const area2 = 0.5 * Nl;
  ls.evalFac = 1;
  ls.type = LIGHT_TRIANGLE;
  ls.prim = prim;
  ls.lamp = -1;
  ls.castShadow = true;
  if (longestEdgeSq > distanceToPlane * distanceToPlane) {
    let Ax = v0x - P2.x, Ay = v0y - P2.y, Az = v0z - P2.z;
    let l = Math.hypot(Ax, Ay, Az) || 1;
    Ax /= l;
    Ay /= l;
    Az /= l;
    let Bx = v1x - P2.x, By = v1y - P2.y, Bz = v1z - P2.z;
    l = Math.hypot(Bx, By, Bz) || 1;
    Bx /= l;
    By /= l;
    Bz /= l;
    let Cx = v2x - P2.x, Cy = v2y - P2.y, Cz = v2z - P2.z;
    l = Math.hypot(Cx, Cy, Cz) || 1;
    Cx /= l;
    Cy /= l;
    Cz /= l;
    const cosA = Bx * Cx + By * Cy + Bz * Cz;
    const cosB = Ax * Cx + Ay * Cy + Az * Cz;
    const cosC = Ax * Bx + Ay * By + Az * Bz;
    const bcx = By * Cz - Bz * Cy, bcy = Bz * Cx - Bx * Cz, bcz = Bx * Cy - By * Cx;
    const mixed = Math.abs(Ax * bcx + Ay * bcy + Az * bcz);
    const solidAngle = 2 * Math.atan2(mixed, 1 + cosA + cosB + cosC);
    let abx = Ay * Bz - Az * By, aby = Az * Bx - Ax * Bz, abz = Ax * By - Ay * Bx;
    l = Math.hypot(abx, aby, abz) || 1;
    abx /= l;
    aby /= l;
    abz /= l;
    let acx = Ay * Cz - Az * Cy, acy = Az * Cx - Ax * Cz, acz = Ax * Cy - Ay * Cx;
    l = Math.hypot(acx, acy, acz) || 1;
    acx /= l;
    acy /= l;
    acz /= l;
    const cosAlpha = abx * acx + aby * acy + abz * acz;
    const sinAlpha = safeSqrt(1 - cosAlpha * cosAlpha);
    const alpha = Math.acos(clamp(cosAlpha, -1, 1));
    const Ahat = rx * solidAngle;
    const sinPhi = Math.sin(Ahat - alpha);
    const cosPhi = Math.cos(Ahat - alpha);
    const uu = cosPhi - cosAlpha;
    const vv = sinPhi + sinAlpha * cosC;
    const num = (vv * cosPhi - uu * sinPhi) * cosAlpha - vv;
    const den = (vv * sinPhi + uu * cosPhi) * sinAlpha;
    const q = den === 0 ? 1 : num / den;
    let Ux = Cx - cosB * Ax, Uy = Cy - cosB * Ay, Uz = Cz - cosB * Az;
    l = Math.hypot(Ux, Uy, Uz);
    if (l > 0) {
      Ux /= l;
      Uy /= l;
      Uz /= l;
    } else {
      Ux = Uy = Uz = 0;
    }
    const sq = safeSqrt(1 - q * q);
    let C_x = q * Ax + sq * Ux, C_y = q * Ay + sq * Uy, C_z = q * Az + sq * Uz;
    l = Math.hypot(C_x, C_y, C_z) || 1;
    C_x /= l;
    C_y /= l;
    C_z /= l;
    const z = 1 - ry * (1 - (C_x * Bx + C_y * By + C_z * Bz));
    const dcb = C_x * Bx + C_y * By + C_z * Bz;
    let wx = C_x - dcb * Bx, wy = C_y - dcb * By, wz = C_z - dcb * Bz;
    l = Math.hypot(wx, wy, wz);
    if (l > 0) {
      wx /= l;
      wy /= l;
      wz /= l;
    } else {
      wx = wy = wz = 0;
    }
    const sz = safeSqrt(1 - z * z);
    ls.D.x = z * Bx + sz * wx;
    ls.D.y = z * By + sz * wy;
    ls.D.z = z * Bz + sz * wz;
    if (!rayTriangleIntersect(P2.x, P2.y, P2.z, ls.D.x, ls.D.y, ls.D.z, 0, 34e37, v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z, _uvt2)) return false;
    ls.t = _uvt2[2];
    ls.P.x = P2.x + ls.D.x * ls.t;
    ls.P.y = P2.y + ls.D.y * ls.t;
    ls.P.z = P2.z + ls.D.z * ls.t;
    if (solidAngle === 0) return false;
    ls.pdf = 1 / solidAngle;
  } else {
    if (area2 === 0) return false;
    let u = rx;
    let v = ry;
    if (v > u) {
      u *= 0.5;
      v -= u;
    } else {
      v *= 0.5;
      u -= v;
    }
    const t = 1 - u - v;
    ls.P.x = t * v0x + u * v1x + v * v2x;
    ls.P.y = t * v0y + u * v1y + v * v2y;
    ls.P.z = t * v0z + u * v1z + v * v2z;
    let dx = ls.P.x - P2.x, dy = ls.P.y - P2.y, dz = ls.P.z - P2.z;
    const len = Math.hypot(dx, dy, dz);
    dx /= len;
    dy /= len;
    dz /= len;
    ls.D.x = dx;
    ls.D.y = dy;
    ls.D.z = dz;
    ls.t = len;
    const cosPi = Math.abs(ls.Ng.x * dx + ls.Ng.y * dy + ls.Ng.z * dz);
    if (cosPi === 0) return false;
    ls.pdf = len * len / cosPi / area2;
  }
  if (!kg.useLightTree) ls.pdf *= area2 * kg.pdfTriangles;
  const shader = kg.u32[kg.triInfo + prim * TRI_INFO_SIZE + TI.SHADER];
  const sh = kg.shaders + shader * SHADER_SIZE;
  ls.er = f[sh + SH.EMISSION];
  ls.eg = f[sh + SH.EMISSION + 1];
  ls.eb = f[sh + SH.EMISSION + 2];
  return ls.pdf > 0;
}
function triangleLightPdf(kg, prim, Ng, wi, P2, t) {
  const f = kg.f32;
  const b = kg.triVerts + prim * TRI_VERTS_SIZE;
  const v0x = f[b], v0y = f[b + 1], v0z = f[b + 2];
  const v1x = f[b + 4], v1y = f[b + 5], v1z = f[b + 6];
  const v2x = f[b + 8], v2y = f[b + 9], v2z = f[b + 10];
  const e0x = v1x - v0x, e0y = v1y - v0y, e0z = v1z - v0z;
  const e1x = v2x - v0x, e1y = v2y - v0y, e1z = v2z - v0z;
  const e2x = v2x - v1x, e2y = v2y - v1y, e2z = v2z - v1z;
  const longestEdgeSq = Math.max(e0x * e0x + e0y * e0y + e0z * e0z, e1x * e1x + e1y * e1y + e1z * e1z, e2x * e2x + e2y * e2y + e2z * e2z);
  const Nx = e0y * e1z - e0z * e1y, Ny = e0z * e1x - e0x * e1z, Nz = e0x * e1y - e0y * e1x;
  const nn = Nx * Nx + Ny * Ny + Nz * Nz;
  const distanceToPlane = Math.abs(Nx * wi.x * t + Ny * wi.y * t + Nz * wi.z * t) / nn;
  const area2 = 0.5 * Math.sqrt(nn);
  let pdf;
  if (longestEdgeSq > distanceToPlane * distanceToPlane) {
    const Px = P2.x + wi.x * t, Py = P2.y + wi.y * t, Pz = P2.z + wi.z * t;
    let Ax = v0x - Px, Ay = v0y - Py, Az = v0z - Pz;
    let l = Math.hypot(Ax, Ay, Az) || 1;
    Ax /= l;
    Ay /= l;
    Az /= l;
    let Bx = v1x - Px, By = v1y - Py, Bz = v1z - Pz;
    l = Math.hypot(Bx, By, Bz) || 1;
    Bx /= l;
    By /= l;
    Bz /= l;
    let Cx = v2x - Px, Cy = v2y - Py, Cz = v2z - Pz;
    l = Math.hypot(Cx, Cy, Cz) || 1;
    Cx /= l;
    Cy /= l;
    Cz /= l;
    const bcx = By * Cz - Bz * Cy, bcy = Bz * Cx - Bx * Cz, bcz = Bx * Cy - By * Cx;
    const solidAngle = 2 * Math.atan2(Math.abs(Ax * bcx + Ay * bcy + Az * bcz), 1 + (Bx * Cx + By * Cy + Bz * Cz) + (Ax * Cx + Ay * Cy + Az * Cz) + (Ax * Bx + Ay * By + Az * Bz));
    if (solidAngle === 0) return 0;
    pdf = 1 / solidAngle;
  } else {
    if (area2 === 0) return 0;
    const cosPi = Math.abs(Ng.x * wi.x + Ng.y * wi.y + Ng.z * wi.z);
    if (cosPi === 0) return 0;
    pdf = t * t / cosPi / area2;
  }
  return kg.useLightTree ? pdf : pdf * area2 * kg.pdfTriangles;
}
function lightsIntersect(kg, Px, Py, Pz, Dx, Dy, Dz, tmin, tmax, cameraRay, hit) {
  const f = kg.f32;
  const u = kg.u32;
  hit.lamp = -1;
  hit.t = tmax;
  for (let i = 0; i < kg.numHittableLights; i++) {
    const lamp = u[kg.hittableLights + i];
    const L = kg.lights + lamp * LIGHT_SIZE;
    const type = u[L + LT.TYPE];
    const flags = u[L + LT.FLAGS];
    if (cameraRay && !(flags & LightFlags.CAMERA_VISIBLE)) continue;
    if (!(flags & LightFlags.USE_MIS) && !cameraRay) continue;
    if (type === LightType.POINT || type === LightType.SPOT) {
      const t = raySphereIntersect(Px, Py, Pz, Dx, Dy, Dz, tmin, hit.t, f[L + LT.CO], f[L + LT.CO + 1], f[L + LT.CO + 2], f[L + LT.RADIUS]);
      if (t > 0) {
        hit.t = t;
        hit.lamp = lamp;
      }
    } else if (type === LightType.AREA) {
      const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
      const dn = Dx * nx + Dy * ny + Dz * nz;
      if (dn >= 0) continue;
      const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
      const t = ((cx - Px) * nx + (cy - Py) * ny + (cz - Pz) * nz) / dn;
      if (!(t > tmin && t < hit.t)) continue;
      const hx = Px + Dx * t - cx, hy = Py + Dy * t - cy, hz = Pz + Dz * t - cz;
      const uu = (hx * f[L + LT.AXIS_U] + hy * f[L + LT.AXIS_U + 1] + hz * f[L + LT.AXIS_U + 2]) / f[L + LT.LEN_U];
      const vv = (hx * f[L + LT.AXIS_V] + hy * f[L + LT.AXIS_V + 1] + hz * f[L + LT.AXIS_V + 2]) / f[L + LT.LEN_V];
      const ellipse = f[L + LT.INVAREA] < 0;
      const inside = ellipse ? uu * uu + vv * vv <= 0.25 : Math.abs(uu) <= 0.5 && Math.abs(vv) <= 0.5;
      if (inside) {
        hit.t = t;
        hit.lamp = lamp;
      }
    }
  }
  return hit.lamp >= 0;
}
function lampEvalFromIntersection(kg, lamp, Px, Py, Pz, Dx, Dy, Dz, t, N, hadTransmission, out) {
  const f = kg.f32;
  const u = kg.u32;
  const L = kg.lights + lamp * LIGHT_SIZE;
  const type = u[L + LT.TYPE];
  let evalFac = f[L + LT.EVAL_FAC];
  let pdf = 0;
  if (type === LightType.POINT || type === LightType.SPOT) {
    const cx = f[L + LT.CO], cy = f[L + LT.CO + 1], cz = f[L + LT.CO + 2];
    const r = f[L + LT.RADIUS];
    const dSq = (Px - cx) ** 2 + (Py - cy) ** 2 + (Pz - cz) ** 2;
    const rSq = r * r;
    if (dSq > rSq) pdf = M_1_2PI / sinSqrToOneMinusCos(rSq / dSq);
    else pdf = hadTransmission ? M_1_2PI * 0.5 : Math.max(N.x * Dx + N.y * Dy + N.z * Dz, 0) / Math.PI;
    if (type === LightType.SPOT && dSq > rSq) {
      const hx = Px + Dx * t - cx, hy = Py + Dy * t - cy, hz = Pz + Dz * t - cz;
      void hx;
      void hy;
      void hz;
      const localZ = -(Dx * f[L + LT.SPOT_DIR] + Dy * f[L + LT.SPOT_DIR + 1] + Dz * f[L + LT.SPOT_DIR + 2]);
      evalFac *= smoothstep012((localZ - f[L + LT.COS_HALF_SPOT_ANGLE]) * f[L + LT.SPOT_SMOOTH]);
    }
  } else if (type === LightType.AREA) {
    const invareaSigned = f[L + LT.INVAREA];
    const nx = f[L + LT.AREA_DIR], ny = f[L + LT.AREA_DIR + 1], nz = f[L + LT.AREA_DIR + 2];
    if (invareaSigned > 0) {
      const ls = _lsScratch;
      ls.P.x = f[L + LT.CO];
      ls.P.y = f[L + LT.CO + 1];
      ls.P.z = f[L + LT.CO + 2];
      pdf = areaLightRectSample(Px, Py, Pz, ls, f[L + LT.AXIS_U], f[L + LT.AXIS_U + 1], f[L + LT.AXIS_U + 2], f[L + LT.LEN_U], f[L + LT.AXIS_V], f[L + LT.AXIS_V + 1], f[L + LT.AXIS_V + 2], f[L + LT.LEN_V], 0, 0, false);
    } else {
      const cosPi = -(nx * Dx + ny * Dy + nz * Dz);
      pdf = cosPi > 0 ? 4 / Math.PI / (f[L + LT.LEN_U] * f[L + LT.LEN_V]) * (t * t / cosPi) : 0;
    }
  } else if (type === LightType.SUN) {
    const angle = f[L + LT.SUN_ANGLE];
    if (angle === 0) return 0;
    const c = -(Dx * f[L + LT.CO] + Dy * f[L + LT.CO + 1] + Dz * f[L + LT.CO + 2]);
    if (Math.acos(clamp(c, -1, 1)) > angle) {
      out[0] = out[1] = out[2] = 0;
      return 0;
    }
    pdf = f[L + LT.SUN_PDF];
  }
  out[0] = f[L + LT.STRENGTH] * evalFac;
  out[1] = f[L + LT.STRENGTH + 1] * evalFac;
  out[2] = f[L + LT.STRENGTH + 2] * evalFac;
  return pdf;
}
var LIGHT_TRIANGLE, LightSample, _cone, _tmp, _tmp2, _uvt2, _rgba, _uv, _dir, LightHit, _lsScratch;
var init_light = __esm({
  "src/kernel/light.ts"() {
    "use strict";
    init_layout();
    init_light_tree2();
    init_math();
    init_mapping();
    init_texture();
    init_bvh();
    init_layout();
    LIGHT_TRIANGLE = 5;
    LightSample = class {
      P = f3();
      Ng = f3();
      D = f3();
      t = 0;
      pdf = 0;
      evalFac = 0;
      /** Emitted radiance before eval_fac (light strength, or the background/emission shader value). */
      er = 0;
      eg = 0;
      eb = 0;
      type = 0;
      /** Light index for lamps, triangle index for mesh lights. */
      lamp = -1;
      prim = -1;
      castShadow = true;
    };
    _cone = new Float64Array(2);
    _tmp = f3();
    _tmp2 = f3();
    _uvt2 = new Float64Array(3);
    _rgba = new Float64Array(4);
    _uv = new Float64Array(2);
    _dir = new Float64Array(3);
    LightHit = class {
      t = Infinity;
      lamp = -1;
    };
    _lsScratch = new LightSample();
  }
});

// src/util/hash.ts
function uintToFloatExcl(n) {
  return Math.fround((n >>> 0) * (1 / 4294967808));
}
function hashHpUint(i) {
  i >>>= 0;
  i ^= i >>> 16;
  i = Math.imul(i, 569420461);
  i ^= i >>> 15;
  i = Math.imul(i, 3545902487);
  i ^= i >>> 15;
  return (i ^ 3875421163) >>> 0;
}
function hashIqnt2d(x, y) {
  const qx = Math.imul(1103515245, (x >>> 1 ^ y) >>> 0);
  const qy = Math.imul(1103515245, (y >>> 1 ^ x) >>> 0);
  return Math.imul(1103515245, (qx ^ qy >>> 3) >>> 0) >>> 0;
}
var init_hash = __esm({
  "src/util/hash.ts"() {
    "use strict";
  }
});

// src/kernel/sample/sobol_burley.ts
function reverseIntegerBits(x) {
  x >>>= 0;
  x = (x & 1431655765) << 1 | x >>> 1 & 1431655765;
  x = (x & 858993459) << 2 | x >>> 2 & 858993459;
  x = (x & 252645135) << 4 | x >>> 4 & 252645135;
  x = (x & 16711935) << 8 | x >>> 8 & 16711935;
  return (x << 16 | x >>> 16) >>> 0;
}
function reversedBitOwen(n, seed) {
  n >>>= 0;
  n = (n ^ Math.imul(n, 1025551850)) >>> 0;
  n = n + seed >>> 0;
  n = Math.imul(n, (seed >>> 16 | 1) >>> 0) >>> 0;
  n = (n ^ Math.imul(n, 89287766)) >>> 0;
  n = (n ^ Math.imul(n, 1403136100)) >>> 0;
  return n;
}
function sobolBurley(revBitIndex, dimension, scrambleSeed) {
  let result = 0;
  revBitIndex >>>= 0;
  if (dimension === 0) {
    result = reverseIntegerBits(revBitIndex);
  } else {
    let i = 0;
    const base = dimension * 32;
    while (revBitIndex !== 0) {
      const j = Math.clz32(revBitIndex);
      result = (result ^ SOBOL_BURLEY_TABLE[base + i + j]) >>> 0;
      i += j + 1;
      revBitIndex = revBitIndex << j >>> 0;
      revBitIndex = revBitIndex << 1 >>> 0;
    }
  }
  result = reverseIntegerBits(reversedBitOwen(result, scrambleSeed));
  return uintToFloatExcl(result);
}
function sobolBurleySample1D(index, dimension, seed, mask) {
  seed = (seed ^ hashHpUint(dimension)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 3220790270) >>> 0);
  index = (index & mask) >>> 0;
  return sobolBurley(index, 0, (seed ^ 1667004349) >>> 0);
}
function sobolBurleySample2D(index, dimensionSet, seed, mask, out, o = 0) {
  seed = (seed ^ hashHpUint(dimensionSet)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 4172147098) >>> 0);
  index = (index & mask) >>> 0;
  out[o] = sobolBurley(index, 0, (seed ^ 3769282422) >>> 0);
  out[o + 1] = sobolBurley(index, 1, (seed ^ 2492878158) >>> 0);
}
function sobolBurleySample3D(index, dimensionSet, seed, mask, out, o = 0) {
  seed = (seed ^ hashHpUint(dimensionSet)) >>> 0;
  index = reversedBitOwen(reverseIntegerBits(index), (seed ^ 3399952044) >>> 0);
  index = (index & mask) >>> 0;
  out[o] = sobolBurley(index, 0, (seed ^ 2658722705) >>> 0);
  out[o + 1] = sobolBurley(index, 1, (seed ^ 1740845633) >>> 0);
  out[o + 2] = sobolBurley(index, 2, (seed ^ 2026083781) >>> 0);
}
function sobolIndexMask(maxSamples) {
  let bits = 0;
  while (1 << bits < maxSamples && bits < 31) bits++;
  if (bits >= 31) return 4294967295;
  return reverseIntegerBits((1 << bits) - 1 >>> 0);
}
var SOBOL_BURLEY_TABLE;
var init_sobol_burley = __esm({
  "src/kernel/sample/sobol_burley.ts"() {
    "use strict";
    init_hash();
    SOBOL_BURLEY_TABLE = new Uint32Array([
      // dimension 0
      1,
      2,
      4,
      8,
      16,
      32,
      64,
      128,
      256,
      512,
      1024,
      2048,
      4096,
      8192,
      16384,
      32768,
      65536,
      131072,
      262144,
      524288,
      1048576,
      2097152,
      4194304,
      8388608,
      16777216,
      33554432,
      67108864,
      134217728,
      268435456,
      536870912,
      1073741824,
      2147483648,
      // dimension 1
      1,
      3,
      5,
      15,
      17,
      51,
      85,
      255,
      257,
      771,
      1285,
      3855,
      4369,
      13107,
      21845,
      65535,
      65537,
      196611,
      327685,
      983055,
      1114129,
      3342387,
      5570645,
      16711935,
      16843009,
      50529027,
      84215045,
      252645135,
      286331153,
      858993459,
      1431655765,
      4294967295,
      // dimension 2
      1,
      3,
      6,
      9,
      23,
      58,
      113,
      163,
      278,
      825,
      1655,
      2474,
      5633,
      14595,
      30470,
      43529,
      65815,
      197434,
      394865,
      592291,
      1512982,
      3815737,
      7436151,
      10726058,
      18284545,
      54132739,
      108068870,
      161677321,
      370540567,
      960036922,
      2004287601,
      2863268003,
      // dimension 3
      1,
      3,
      4,
      10,
      31,
      46,
      69,
      201,
      283,
      676,
      1946,
      2919,
      4126,
      12333,
      16449,
      41155,
      127236,
      189066,
      284639,
      826286,
      1155333,
      2781833,
      7989211,
      11983780,
      16777498,
      50332327,
      67110814,
      167775085,
      520097793,
      771764227,
      1157644292,
      3372261386
    ]);
  }
});

// src/kernel/sample/pattern.ts
function pathRngPixelInit(x, y, seed) {
  return (hashIqnt2d(x, y) ^ seed) >>> 0;
}
var PRNG_FILTER, PRNG_LENS_TIME, PRNG_TERMINATE, PRNG_LIGHT, PRNG_SURFACE_BSDF, PRNG_BOUNCE_NUM, PathRng;
var init_pattern = __esm({
  "src/kernel/sample/pattern.ts"() {
    "use strict";
    init_hash();
    init_sobol_burley();
    PRNG_FILTER = 0;
    PRNG_LENS_TIME = 1;
    PRNG_TERMINATE = 0;
    PRNG_LIGHT = 1;
    PRNG_SURFACE_BSDF = 3;
    PRNG_BOUNCE_NUM = 16;
    PathRng = class {
      /** Sequence-length mask; see sobolIndexMask. */
      mask = 4294967295;
      rng1D(s, dimension) {
        return sobolBurleySample1D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask);
      }
      rng2D(s, dimension, out, o = 0) {
        sobolBurleySample2D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask, out, o);
      }
      rng3D(s, dimension, out, o = 0) {
        sobolBurleySample3D(s.sample, s.rngOffset + dimension, s.rngPixel, this.mask, out, o);
      }
    };
  }
});

// src/kernel/shader.ts
function shaderSetupFromRay(kg, sd, ray, hit) {
  const f = kg.f32;
  const u32 = kg.u32;
  const prim = hit.prim;
  const tb = kg.triVerts + prim * TRI_VERTS_SIZE;
  const ti = kg.triInfo + prim * TRI_INFO_SIZE;
  sd.prim = prim;
  sd.u = hit.u;
  sd.v = hit.v;
  sd.shader = u32[ti + TI.SHADER];
  sd.object = u32[ti + TI.OBJECT];
  sd.triFlags = u32[ti + TI.FLAGS];
  sd.runtimeFlag = 0;
  sd.rayLength = hit.t;
  const w = 1 - hit.u - hit.v;
  const v0x = f[tb], v0y = f[tb + 1], v0z = f[tb + 2];
  const v1x = f[tb + 4], v1y = f[tb + 5], v1z = f[tb + 6];
  const v2x = f[tb + 8], v2y = f[tb + 9], v2z = f[tb + 10];
  sd.P.x = w * v0x + hit.u * v1x + hit.v * v2x;
  sd.P.y = w * v0y + hit.u * v1y + hit.v * v2y;
  sd.P.z = w * v0z + hit.u * v1z + hit.v * v2z;
  const e1x = v1x - v0x, e1y = v1y - v0y, e1z = v1z - v0z;
  const e2x = v2x - v0x, e2y = v2y - v0y, e2z = v2z - v0z;
  let ngx = e1y * e2z - e1z * e2y, ngy = e1z * e2x - e1x * e2z, ngz = e1x * e2y - e1y * e2x;
  const ngl = Math.hypot(ngx, ngy, ngz) || 1;
  ngx /= ngl;
  ngy /= ngl;
  ngz /= ngl;
  sd.Ng.x = ngx;
  sd.Ng.y = ngy;
  sd.Ng.z = ngz;
  const i0 = u32[ti + TI.V0], i1 = u32[ti + TI.V1], i2 = u32[ti + TI.V2];
  if (sd.triFlags & TriFlags.SMOOTH) {
    const vn = kg.vertNormals;
    let nx = w * f[vn + i0 * 4] + hit.u * f[vn + i1 * 4] + hit.v * f[vn + i2 * 4];
    let ny = w * f[vn + i0 * 4 + 1] + hit.u * f[vn + i1 * 4 + 1] + hit.v * f[vn + i2 * 4 + 1];
    let nz = w * f[vn + i0 * 4 + 2] + hit.u * f[vn + i1 * 4 + 2] + hit.v * f[vn + i2 * 4 + 2];
    const nl = Math.hypot(nx, ny, nz);
    if (nl > 0) {
      nx /= nl;
      ny /= nl;
      nz /= nl;
    } else {
      nx = ngx;
      ny = ngy;
      nz = ngz;
    }
    sd.N.x = nx;
    sd.N.y = ny;
    sd.N.z = nz;
  } else {
    sd.N.x = ngx;
    sd.N.y = ngy;
    sd.N.z = ngz;
  }
  if (sd.triFlags & TriFlags.HAS_UV) {
    const uv = kg.vertUVs;
    sd.tu = w * f[uv + i0 * 2] + hit.u * f[uv + i1 * 2] + hit.v * f[uv + i2 * 2];
    sd.tv = w * f[uv + i0 * 2 + 1] + hit.u * f[uv + i1 * 2 + 1] + hit.v * f[uv + i2 * 2 + 1];
  } else {
    sd.tu = 0;
    sd.tv = 0;
  }
  sd.wi.x = -ray.Dx;
  sd.wi.y = -ray.Dy;
  sd.wi.z = -ray.Dz;
  if (sd.Ng.x * sd.wi.x + sd.Ng.y * sd.wi.y + sd.Ng.z * sd.wi.z < 0) {
    sd.runtimeFlag |= SR_BACKFACING;
    sd.Ng.x = -sd.Ng.x;
    sd.Ng.y = -sd.Ng.y;
    sd.Ng.z = -sd.Ng.z;
    sd.N.x = -sd.N.x;
    sd.N.y = -sd.N.y;
    sd.N.z = -sd.N.z;
  }
  sd.Nsmooth.x = sd.N.x;
  sd.Nsmooth.y = sd.N.y;
  sd.Nsmooth.z = sd.N.z;
}
function bsdfAlloc(sd, wr, wg, wb) {
  wr = Math.max(wr, 0);
  wg = Math.max(wg, 0);
  wb = Math.max(wb, 0);
  const sampleWeight = Math.abs((wr + wg + wb) / 3);
  if (!(sampleWeight >= CLOSURE_WEIGHT_CUTOFF)) return null;
  if (sd.numClosure >= MAX_CLOSURE) return null;
  const c = sd.closures[sd.numClosure++];
  c.type = CLOSURE_NONE;
  c.wr = wr;
  c.wg = wg;
  c.wb = wb;
  c.sampleWeight = sampleWeight;
  c.energyScale = 1;
  c.ior = 1;
  c.alpha = c.alphaY = 0;
  c.T.x = c.T.y = c.T.z = 0;
  c.f0r = c.f0g = c.f0b = 0;
  c.f90r = c.f90g = c.f90b = 1;
  c.exponent = -1;
  c.tintRr = c.tintRg = c.tintRb = 1;
  c.tintTr = c.tintTg = c.tintTb = 0;
  c.br = c.bg = c.bb = 0;
  return c;
}
function diffuseSetup(sd, N, wr, wg, wb) {
  const c = bsdfAlloc(sd, wr, wg, wb);
  if (!c) return;
  c.N.x = N.x;
  c.N.y = N.y;
  c.N.z = N.z;
  c.type = CLOSURE_BSDF_DIFFUSE;
  sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL;
}
function transparentSetup(sd, wr, wg, wb) {
  const sampleWeight = Math.abs((wr + wg + wb) / 3);
  if (!(sampleWeight >= CLOSURE_WEIGHT_CUTOFF)) return;
  sd.tr += wr;
  sd.tg += wg;
  sd.tb += wb;
  if (sd.runtimeFlag & SR_TRANSPARENT) {
    for (let i = 0; i < sd.numClosure; i++) {
      const c2 = sd.closures[i];
      if (c2.type === CLOSURE_BSDF_TRANSPARENT) {
        c2.wr += wr;
        c2.wg += wg;
        c2.wb += wb;
        c2.sampleWeight += sampleWeight;
        return;
      }
    }
    return;
  }
  sd.runtimeFlag |= SR_BSDF | SR_TRANSPARENT;
  if (sd.numClosure >= MAX_CLOSURE) return;
  const c = sd.closures[sd.numClosure++];
  c.type = CLOSURE_BSDF_TRANSPARENT;
  c.wr = wr;
  c.wg = wg;
  c.wb = wb;
  c.sampleWeight = sampleWeight;
  c.N.x = sd.N.x;
  c.N.y = sd.N.y;
  c.N.z = sd.N.z;
}
function emissionSetup(sd, r, g, b) {
  if (sd.runtimeFlag & SR_EMISSION) {
    sd.er += r;
    sd.eg += g;
    sd.eb += b;
  } else {
    sd.runtimeFlag |= SR_EMISSION;
    sd.er = r;
    sd.eg = g;
    sd.eb = b;
  }
}
function validReflectionN(sd, N, out) {
  if (N.x === sd.Ng.x && N.y === sd.Ng.y && N.z === sd.Ng.z) {
    out.x = N.x;
    out.y = N.y;
    out.z = N.z;
    return out;
  }
  return ensureValidSpecularReflection(sd.Ng, sd.wi, N, out);
}
function uvTangentFrame(kg, sd, N, T, B) {
  if (!(sd.triFlags & TriFlags.HAS_UV)) return false;
  const f = kg.f32;
  const u32 = kg.u32;
  const prim = sd.prim;
  const ti = kg.triInfo + prim * TRI_INFO_SIZE;
  const tb = kg.triVerts + prim * TRI_VERTS_SIZE;
  const uv = kg.vertUVs;
  const i0 = u32[ti + TI.V0], i1 = u32[ti + TI.V1], i2 = u32[ti + TI.V2];
  const du1 = f[uv + i1 * 2] - f[uv + i0 * 2], dv1 = f[uv + i1 * 2 + 1] - f[uv + i0 * 2 + 1];
  const du2 = f[uv + i2 * 2] - f[uv + i0 * 2], dv2 = f[uv + i2 * 2 + 1] - f[uv + i0 * 2 + 1];
  const det = du1 * dv2 - du2 * dv1;
  if (det === 0) return false;
  const r = 1 / det;
  const p1x = f[tb + 4] - f[tb], p1y = f[tb + 5] - f[tb + 1], p1z = f[tb + 6] - f[tb + 2];
  const p2x = f[tb + 8] - f[tb], p2y = f[tb + 9] - f[tb + 1], p2z = f[tb + 10] - f[tb + 2];
  let tx = (p1x * dv2 - p2x * dv1) * r, ty = (p1y * dv2 - p2y * dv1) * r, tz = (p1z * dv2 - p2z * dv1) * r;
  const bx = (p2x * du1 - p1x * du2) * r, by = (p2y * du1 - p1y * du2) * r, bz = (p2z * du1 - p1z * du2) * r;
  const dTN = tx * N.x + ty * N.y + tz * N.z;
  tx -= dTN * N.x;
  ty -= dTN * N.y;
  tz -= dTN * N.z;
  const tl = Math.hypot(tx, ty, tz);
  if (tl === 0) return false;
  T.x = tx / tl;
  T.y = ty / tl;
  T.z = tz / tl;
  B.x = N.y * T.z - N.z * T.y;
  B.y = N.z * T.x - N.x * T.z;
  B.z = N.x * T.y - N.y * T.x;
  if (B.x * bx + B.y * by + B.z * bz < 0) {
    B.x = -B.x;
    B.y = -B.y;
    B.z = -B.z;
  }
  return true;
}
function normalMap(kg, sd, tex, scale, base, out) {
  if (!uvTangentFrame(kg, sd, base, _T3, _Bt)) return false;
  textureLookup(kg, tex, sd.tu, sd.tv, _rgba2);
  const mx = (_rgba2[0] * 2 - 1) * scale;
  const my = (_rgba2[1] * 2 - 1) * scale;
  const mz = _rgba2[2] * 2 - 1;
  let nx = mx * _T3.x + my * _Bt.x + mz * base.x;
  let ny = mx * _T3.y + my * _Bt.y + mz * base.y;
  let nz = mx * _T3.z + my * _Bt.z + mz * base.z;
  const nl = Math.hypot(nx, ny, nz);
  if (nl === 0) return false;
  out.x = nx / nl;
  out.y = ny / nl;
  out.z = nz / nl;
  return true;
}
function rotateAroundAxis(p, axis, angle) {
  const c = Math.cos(angle), s = Math.sin(angle), k = 1 - c;
  const ax = axis.x, ay = axis.y, az = axis.z;
  const px = p.x, py = p.y, pz = p.z;
  p.x = (c + k * ax * ax) * px + (k * ax * ay - az * s) * py + (k * ax * az + ay * s) * pz;
  p.y = (k * ax * ay + az * s) * px + (c + k * ay * ay) * py + (k * ay * az - ax * s) * pz;
  p.z = (k * ax * az - ay * s) * px + (k * ay * az + ax * s) * py + (c + k * az * az) * pz;
}
function evalSurfaceShader(kg, sd) {
  const f = kg.f32;
  const u32 = kg.u32;
  const sh = kg.shaders + sd.shader * SHADER_SIZE;
  sd.numClosure = 0;
  sd.er = sd.eg = sd.eb = 0;
  sd.tr = sd.tg = sd.tb = 0;
  const type = u32[sh + SH.TYPE];
  const backfacing = (sd.runtimeFlag & SR_BACKFACING) !== 0;
  switch (type) {
    case ShaderType.PRINCIPLED: {
      let br = f[sh + SH.BASE_COLOR], bg = f[sh + SH.BASE_COLOR + 1], bb = f[sh + SH.BASE_COLOR + 2];
      let alpha = f[sh + SH.ALPHA];
      const bct = u32[sh + SH.BASE_COLOR_TEX];
      if (bct !== NONE) {
        textureLookup(kg, bct, sd.tu, sd.tv, _rgba2);
        br *= _rgba2[0];
        bg *= _rgba2[1];
        bb *= _rgba2[2];
        alpha *= _rgba2[3];
      }
      const at = u32[sh + SH.ALPHA_TEX];
      if (at !== NONE) {
        textureLookup(kg, at, sd.tu, sd.tv, _rgba2);
        alpha *= _rgba2[3];
      }
      let metallic = f[sh + SH.METALLIC];
      let roughness = f[sh + SH.ROUGHNESS];
      const mrt = u32[sh + SH.METALLIC_ROUGHNESS_TEX];
      if (mrt !== NONE) {
        textureLookup(kg, mrt, sd.tu, sd.tv, _rgba2);
        roughness *= _rgba2[1];
        metallic *= _rgba2[2];
      }
      let transmission = f[sh + SH.TRANSMISSION];
      const tt = u32[sh + SH.TRANSMISSION_TEX];
      if (tt !== NONE) {
        textureLookup(kg, tt, sd.tu, sd.tv, _rgba2);
        transmission *= _rgba2[0];
      }
      const nt = u32[sh + SH.NORMAL_TEX];
      if (nt !== NONE) normalMap(kg, sd, nt, f[sh + SH.NORMAL_SCALE], sd.Nsmooth, sd.N);
      const N = sd.N;
      let wr = 1, wg = 1, wb = 1;
      alpha = Math.min(Math.max(alpha, 0), 1);
      if (alpha < 1) {
        transparentSetup(sd, 1 - alpha, 1 - alpha, 1 - alpha);
        wr *= alpha;
        wg *= alpha;
        wb *= alpha;
      }
      let coatWeight = Math.max(f[sh + SH.COAT_WEIGHT], 0);
      const sheenWeight = Math.max(f[sh + SH.SHEEN_WEIGHT], 0);
      if (coatWeight > 0) {
        const cwt = u32[sh + SH.COAT_WEIGHT_TEX];
        if (cwt !== NONE) {
          textureLookup(kg, cwt, sd.tu, sd.tv, _rgba2);
          coatWeight *= _rgba2[0];
        }
      }
      if (sheenWeight > CLOSURE_WEIGHT_CUTOFF || coatWeight > CLOSURE_WEIGHT_CUTOFF) {
        const cnt = u32[sh + SH.COAT_NORMAL_TEX];
        const geometric = (u32[sh + SH.FLAGS] & ShaderFlags.COAT_GEOMETRY_NORMAL) !== 0;
        const cbase = geometric ? sd.Nsmooth : N;
        _coatN.x = cbase.x;
        _coatN.y = cbase.y;
        _coatN.z = cbase.z;
        if (cnt !== NONE) normalMap(kg, sd, cnt, f[sh + SH.COAT_NORMAL_SCALE], sd.Nsmooth, _coatN);
      }
      if (sheenWeight > CLOSURE_WEIGHT_CUTOFF) {
        let tr = Math.max(f[sh + SH.SHEEN_TINT], 0), tg = Math.max(f[sh + SH.SHEEN_TINT + 1], 0), tbl = Math.max(f[sh + SH.SHEEN_TINT + 2], 0);
        const stt = u32[sh + SH.SHEEN_TINT_TEX];
        if (stt !== NONE) {
          textureLookup(kg, stt, sd.tu, sd.tv, _rgba2);
          tr *= _rgba2[0];
          tg *= _rgba2[1];
          tbl *= _rgba2[2];
        }
        let sheenRough = f[sh + SH.SHEEN_ROUGHNESS];
        const srt = u32[sh + SH.SHEEN_ROUGHNESS_TEX];
        if (srt !== NONE) {
          textureLookup(kg, srt, sd.tu, sd.tv, _rgba2);
          sheenRough *= _rgba2[3];
        }
        sheenRough = Math.min(Math.max(sheenRough, 0), 1);
        const m = Math.min(Math.max(coatWeight, 0), 1);
        let snx = N.x + (_coatN.x - N.x) * m, sny = N.y + (_coatN.y - N.y) * m, snz = N.z + (_coatN.z - N.z) * m;
        const snl = Math.hypot(snx, sny, snz);
        if (snl > 0) {
          snx /= snl;
          sny /= snl;
          snz /= snl;
        } else {
          snx = sny = snz = 0;
        }
        _sheenN.x = snx;
        _sheenN.y = sny;
        _sheenN.z = snz;
        const c = bsdfAlloc(sd, sheenWeight * tr * wr, sheenWeight * tg * wg, sheenWeight * tbl * wb);
        if (c) {
          c.N.x = snx;
          c.N.y = sny;
          c.N.z = snz;
          const albedo = setupSheen(kg, c, sd.wi, sheenRough);
          if (c.type !== CLOSURE_NONE) sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL;
          wr = Math.min(Math.max(wr - albedo, 0), wr);
          wg = Math.min(Math.max(wg - albedo, 0), wg);
          wb = Math.min(Math.max(wb - albedo, 0), wb);
        }
      }
      if (coatWeight > CLOSURE_WEIGHT_CUTOFF) {
        let ctr = Math.max(f[sh + SH.COAT_TINT], 0), ctg = Math.max(f[sh + SH.COAT_TINT + 1], 0), ctb = Math.max(f[sh + SH.COAT_TINT + 2], 0);
        const coatIor = Math.max(f[sh + SH.COAT_IOR], 1);
        let coatRough = f[sh + SH.COAT_ROUGHNESS];
        const crt = u32[sh + SH.COAT_ROUGHNESS_TEX];
        if (crt !== NONE) {
          textureLookup(kg, crt, sd.tu, sd.tv, _rgba2);
          coatRough *= _rgba2[1];
        }
        coatRough = Math.min(Math.max(coatRough, 0), 1);
        const cN = validReflectionN(sd, _coatN, _Nr);
        if (!(ctr === 1 && ctg === 1 && ctb === 1)) {
          const cosNI = sd.wi.x * cN.x + sd.wi.y * cN.y + sd.wi.z * cN.z;
          const depth = coatIor / Math.sqrt(coatIor * coatIor - (1 - cosNI * cosNI));
          ctr = Math.pow(ctr, depth);
          ctg = Math.pow(ctg, depth);
          ctb = Math.pow(ctb, depth);
        }
        const cwr = coatWeight * wr, cwg = coatWeight * wg, cwb = coatWeight * wb;
        _alb2[0] = _alb2[1] = _alb2[2] = 0;
        const c = bsdfAlloc(sd, cwr, cwg, cwb);
        if (c) {
          c.N.x = cN.x;
          c.N.y = cN.y;
          c.N.z = cN.z;
          c.ior = coatIor;
          c.alpha = c.alphaY = coatRough * coatRough;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelDielectric(kg, c, sd.wi);
          microfacetAlbedo(kg, sd.wi, c, true, false, _alb2);
        }
        const lr = (1 - ctr * (1 - _alb2[0])) * cwr, lg = (1 - ctg * (1 - _alb2[1])) * cwg, lb = (1 - ctb * (1 - _alb2[2])) * cwb;
        wr = Math.min(Math.max(wr - lr, 0), wr);
        wg = Math.min(Math.max(wg - lg, 0), wg);
        wb = Math.min(Math.max(wb - lb, 0), wb);
      }
      let emr = f[sh + SH.EMISSION], emg = f[sh + SH.EMISSION + 1], emb = f[sh + SH.EMISSION + 2];
      const et = u32[sh + SH.EMISSION_TEX];
      if (et !== NONE && (emr > 0 || emg > 0 || emb > 0)) {
        textureLookup(kg, et, sd.tu, sd.tv, _rgba2);
        emr *= _rgba2[0];
        emg *= _rgba2[1];
        emb *= _rgba2[2];
      }
      if (emr !== 0 || emg !== 0 || emb !== 0) emissionSetup(sd, emr * wr, emg * wg, emb * wb);
      br = Math.max(br, 0);
      bg = Math.max(bg, 0);
      bb = Math.max(bb, 0);
      const cbr = Math.min(br, 1), cbg = Math.min(bg, 1), cbb = Math.min(bb, 1);
      const ior = Math.max(f[sh + SH.IOR], 1e-5);
      roughness = Math.min(Math.max(roughness, 0), 1);
      const alphaR = roughness * roughness;
      const str = Math.max(f[sh + SH.SPECULAR_TINT], 0), stg = Math.max(f[sh + SH.SPECULAR_TINT + 1], 0), stb = Math.max(f[sh + SH.SPECULAR_TINT + 2], 0);
      const vN = validReflectionN(sd, N, _Nr);
      const anisotropic = Math.min(Math.max(f[sh + SH.ANISOTROPIC], 0), 1);
      let alphaX = alphaR, alphaY = alphaR;
      _tan.x = _tan.y = _tan.z = 0;
      if (anisotropic > 0 && uvTangentFrame(kg, sd, sd.Nsmooth, _tan, _tanB)) {
        const aspect = Math.sqrt(1 - anisotropic * 0.9);
        alphaX /= aspect;
        alphaY *= aspect;
        const rot = f[sh + SH.ANISOTROPIC_ROTATION];
        if (rot !== 0) rotateAroundAxis(_tan, N, rot * M_2PI);
      }
      metallic = Math.min(Math.max(metallic, 0), 1);
      if (metallic > CLOSURE_WEIGHT_CUTOFF) {
        const c = bsdfAlloc(sd, metallic * wr, metallic * wg, metallic * wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.ior = 1;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.f0r = cbr;
          c.f0g = cbg;
          c.f0b = cbb;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelF82Tint(kg, c, sd.wi, Math.min(str, 1), Math.min(stg, 1), Math.min(stb, 1), true);
        }
        wr *= 1 - metallic;
        wg *= 1 - metallic;
        wb *= 1 - metallic;
      }
      transmission = Math.min(Math.max(transmission, 0), 1);
      if (transmission > CLOSURE_WEIGHT_CUTOFF) {
        const c = bsdfAlloc(sd, transmission * wr, transmission * wg, transmission * wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.ior = backfacing ? 1 / ior : ior;
          c.tintRr = c.tintRg = c.tintRb = 1;
          c.tintTr = Math.sqrt(cbr);
          c.tintTg = Math.sqrt(cbg);
          c.tintTb = Math.sqrt(cbb);
          const F0 = F0FromIor(ior);
          c.f0r = F0 * str;
          c.f0g = F0 * stg;
          c.f0b = F0 * stb;
          c.f90r = c.f90g = c.f90b = 1;
          c.exponent = -ior;
          sd.runtimeFlag |= setupGgxGlass(c);
          setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
        }
        wr *= 1 - transmission;
        wg *= 1 - transmission;
        wb *= 1 - transmission;
      }
      const level = Math.max(f[sh + SH.SPECULAR_IOR_LEVEL], 0);
      let eta = ior;
      let f0 = F0FromIor(eta);
      if (level !== 0.5) {
        f0 *= 2 * level;
        eta = iorFromF0(f0);
        if (ior < 1) eta = 1 / eta;
      }
      if (eta !== 1) {
        const c = bsdfAlloc(sd, wr, wg, wb);
        if (c) {
          c.N.x = vN.x;
          c.N.y = vN.y;
          c.N.z = vN.z;
          c.ior = eta;
          c.alpha = alphaX;
          c.alphaY = alphaY;
          c.T.x = _tan.x;
          c.T.y = _tan.y;
          c.T.z = _tan.z;
          c.f0r = f0 * str;
          c.f0g = f0 * stg;
          c.f0b = f0 * stb;
          c.f90r = c.f90g = c.f90b = 1;
          c.exponent = -eta;
          c.tintRr = c.tintRg = c.tintRb = 1;
          c.tintTr = c.tintTg = c.tintTb = 0;
          sd.runtimeFlag |= setupGgx(c);
          setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
          closureLayerAlbedo(kg, sd.wi, c, _alb2);
          wr = Math.min(Math.max(wr - _alb2[0], 0), wr);
          wg = Math.min(Math.max(wg - _alb2[1], 0), wg);
          wb = Math.min(Math.max(wb - _alb2[2], 0), wb);
        }
      }
      diffuseSetup(sd, N, br * wr, bg * wg, bb * wb);
      break;
    }
    case ShaderType.DIFFUSE: {
      let r = f[sh + SH.BASE_COLOR], g = f[sh + SH.BASE_COLOR + 1], b = f[sh + SH.BASE_COLOR + 2];
      const t = u32[sh + SH.BASE_COLOR_TEX];
      if (t !== NONE) {
        textureLookup(kg, t, sd.tu, sd.tv, _rgba2);
        r *= _rgba2[0];
        g *= _rgba2[1];
        b *= _rgba2[2];
      }
      diffuseSetup(sd, sd.N, r, g, b);
      break;
    }
    case ShaderType.GLOSSY: {
      const r = f[sh + SH.BASE_COLOR], g = f[sh + SH.BASE_COLOR + 1], b = f[sh + SH.BASE_COLOR + 2];
      const c = bsdfAlloc(sd, r, g, b);
      if (c) {
        const rough = Math.min(Math.max(f[sh + SH.ROUGHNESS], 0), 1);
        const vN = validReflectionN(sd, sd.N, _Nr);
        c.N.x = vN.x;
        c.N.y = vN.y;
        c.N.z = vN.z;
        c.ior = 1;
        c.alpha = c.alphaY = rough * rough;
        sd.runtimeFlag |= setupGgx(c);
        setupFresnelConstant(kg, c, sd.wi, Math.max(r, 0), Math.max(g, 0), Math.max(b, 0));
      }
      break;
    }
    case ShaderType.GLASS: {
      const c = bsdfAlloc(sd, 1, 1, 1);
      if (c) {
        const vN = validReflectionN(sd, sd.N, _Nr);
        c.N.x = vN.x;
        c.N.y = vN.y;
        c.N.z = vN.z;
        const rough = Math.min(Math.max(f[sh + SH.ROUGHNESS], 0), 1);
        c.alpha = c.alphaY = rough * rough;
        const ior = Math.max(f[sh + SH.IOR], 1e-5);
        c.ior = backfacing ? 1 / ior : ior;
        const F0 = F0FromIor(ior);
        c.f0r = c.f0g = c.f0b = F0;
        c.f90r = c.f90g = c.f90b = 1;
        c.exponent = -ior;
        const r = Math.max(f[sh + SH.BASE_COLOR], 0), g = Math.max(f[sh + SH.BASE_COLOR + 1], 0), b = Math.max(f[sh + SH.BASE_COLOR + 2], 0);
        c.tintRr = r;
        c.tintRg = g;
        c.tintRb = b;
        c.tintTr = r;
        c.tintTg = g;
        c.tintTb = b;
        sd.runtimeFlag |= setupGgxGlass(c);
        setupFresnelGeneralizedSchlick(kg, c, sd.wi, true);
      }
      break;
    }
    case ShaderType.EMISSION:
      emissionSetup(sd, f[sh + SH.EMISSION], f[sh + SH.EMISSION + 1], f[sh + SH.EMISSION + 2]);
      break;
    case ShaderType.TRANSPARENT:
      transparentSetup(sd, f[sh + SH.BASE_COLOR], f[sh + SH.BASE_COLOR + 1], f[sh + SH.BASE_COLOR + 2]);
      break;
  }
}
function surfaceShaderEmission(sd, out) {
  if (sd.runtimeFlag & SR_EMISSION) {
    const cosNI = Math.abs(sd.Ng.x * sd.wi.x + sd.Ng.y * sd.wi.y + sd.Ng.z * sd.wi.z);
    const k = cosNI > 0 ? 1 : 0;
    out[0] = sd.er * k;
    out[1] = sd.eg * k;
    out[2] = sd.eb * k;
  } else {
    out[0] = out[1] = out[2] = 0;
  }
}
function shaderTransparency(sd, out) {
  if (sd.runtimeFlag & SR_TRANSPARENT) {
    out[0] = sd.tr;
    out[1] = sd.tg;
    out[2] = sd.tb;
  } else {
    out[0] = out[1] = out[2] = 0;
  }
}
function shaderHasTransparency(kg, shader) {
  const sh = kg.shaders + shader * SHADER_SIZE;
  const t = kg.u32[sh + SH.TYPE];
  if (t === ShaderType.TRANSPARENT) return true;
  if (t === ShaderType.PRINCIPLED) return (kg.u32[sh + SH.FLAGS] & 4) !== 0;
  return false;
}
var ShaderData, _rgba2, _alb2, _vN, _T3, _Bt, _coatN, _sheenN, _tan, _tanB, _Nr;
var init_shader = __esm({
  "src/kernel/shader.ts"() {
    "use strict";
    init_layout();
    init_math();
    init_bsdf();
    init_texture();
    ShaderData = class {
      P = f3();
      N = f3();
      Ng = f3();
      wi = f3();
      u = 0;
      v = 0;
      prim = -1;
      object = -1;
      shader = 0;
      triFlags = 0;
      runtimeFlag = 0;
      rayLength = 0;
      /** Texture coordinates. */
      tu = 0;
      tv = 0;
      numClosure = 0;
      closures = Array.from({ length: MAX_CLOSURE }, () => new Closure());
      /** Accumulated emission (Cycles closure_emission_background). */
      er = 0;
      eg = 0;
      eb = 0;
      /** Accumulated transparency (Cycles closure_transparent_extinction). */
      tr = 0;
      tg = 0;
      tb = 0;
      /** Shading normal before any normal map, used by the shadow terminator offset. */
      Nsmooth = f3();
    };
    _rgba2 = new Float64Array(4);
    _alb2 = new Float64Array(3);
    _vN = f3();
    _T3 = f3();
    _Bt = f3();
    _coatN = f3();
    _sheenN = f3();
    _tan = f3();
    _tanB = f3();
    _Nr = f3();
  }
});

// src/kernel/integrator.ts
function sampleIsClassA(sample) {
  let v = (sample & 2863311530) >>> 0;
  v = v - (v >>> 1 & 1431655765);
  v = (v & 858993459) + (v >>> 2 & 858993459);
  return ((v + (v >>> 4) & 252645135) * 16843009 >>> 24) % 2 === 1;
}
function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}
function readParams(params) {
  const f = new Float32Array(params.buffer, params.byteOffset, params.length);
  const cam = new Float64Array(12);
  for (let i = 0; i < 12; i++) cam[i] = f[P.CAM_TO_WORLD + i];
  const clamp2 = (v) => v > 0 ? v : Infinity;
  return {
    width: params[P.WIDTH],
    height: params[P.HEIGHT],
    seed: params[P.SEED],
    sobolMask: params[P.SOBOL_MASK],
    maxBounce: params[P.MAX_BOUNCE],
    maxDiffuse: params[P.MAX_DIFFUSE],
    maxGlossy: params[P.MAX_GLOSSY],
    maxTransmission: params[P.MAX_TRANSMISSION],
    maxTransparent: params[P.MAX_TRANSPARENT],
    minBounce: params[P.MIN_BOUNCE],
    clampDirect: clamp2(f[P.CLAMP_DIRECT]),
    clampIndirect: clamp2(f[P.CLAMP_INDIRECT]),
    filterGlossy: f[P.FILTER_GLOSSY],
    denoisingFeatures: params[P.DENOISING_FEATURES] !== 0,
    camToWorld: cam,
    tanHalfFov: f[P.CAM_TAN_HALF_FOV],
    aspect: f[P.CAM_ASPECT],
    aperture: f[P.CAM_APERTURE],
    focusDistance: f[P.CAM_FOCUS],
    backgroundCameraVisible: params[P.BG_CAMERA_VISIBLE] !== 0
  };
}
function offsetComponent(p, n) {
  if (Math.abs(p) < 1 / 32) return p + n / 65536;
  _f32[0] = p;
  const ofi = Math.trunc(256 * n);
  _i32[0] += p < 0 ? -ofi : ofi;
  return _f32[0];
}
function nextFloatUp(t) {
  if (!Number.isFinite(t) || t <= 0) return t;
  _f32[0] = t;
  _i32[0] += _f32[0] <= t ? 1 : 0;
  if (_f32[0] <= t) _i32[0] += 1;
  return _f32[0];
}
var PATH_RAY_CAMERA, PATH_RAY_REFLECT, PATH_RAY_TRANSMIT, PATH_RAY_DIFFUSE, PATH_RAY_GLOSSY, PATH_RAY_SINGULAR, PATH_RAY_TRANSPARENT, PATH_RAY_MIS_SKIP, PATH_RAY_MIS_HAD_TRANSMISSION, PATH_RAY_TERMINATE_ON_NEXT_SURFACE, PATH_RAY_TERMINATE_AFTER_TRANSPARENT, PATH_RAY_TRANSPARENT_BACKGROUND, PATH_RAY_DIFFUSE_ANCESTOR, PATH_RAY_DENOISING_FEATURES, EXT_STRIDE, EXT, PATH_RAY_TERMINATE, PathState, _f32, _i32, Integrator;
var init_integrator = __esm({
  "src/kernel/integrator.ts"() {
    "use strict";
    init_layout();
    init_light_tree2();
    init_math();
    init_bvh();
    init_bsdf();
    init_light();
    init_pattern();
    init_mapping();
    init_tables();
    init_shader();
    PATH_RAY_CAMERA = 1 << 0;
    PATH_RAY_REFLECT = 1 << 1;
    PATH_RAY_TRANSMIT = 1 << 2;
    PATH_RAY_DIFFUSE = 1 << 3;
    PATH_RAY_GLOSSY = 1 << 4;
    PATH_RAY_SINGULAR = 1 << 5;
    PATH_RAY_TRANSPARENT = 1 << 6;
    PATH_RAY_MIS_SKIP = 1 << 7;
    PATH_RAY_MIS_HAD_TRANSMISSION = 1 << 8;
    PATH_RAY_TERMINATE_ON_NEXT_SURFACE = 1 << 9;
    PATH_RAY_TERMINATE_AFTER_TRANSPARENT = 1 << 10;
    PATH_RAY_TRANSPARENT_BACKGROUND = 1 << 11;
    PATH_RAY_DIFFUSE_ANCESTOR = 1 << 12;
    PATH_RAY_DENOISING_FEATURES = 1 << 13;
    EXT_STRIDE = 12;
    EXT = { AUX: 0, COUNT: 3, ALBEDO: 4, FLAG: 7, NORMAL: 8 };
    PATH_RAY_TERMINATE = PATH_RAY_TERMINATE_ON_NEXT_SURFACE | PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
    PathState = class {
      rngPixel = 0;
      rngOffset = 0;
      sample = 0;
      flag = 0;
      bounce = 0;
      diffuseBounce = 0;
      glossyBounce = 0;
      transmissionBounce = 0;
      transparentBounce = 0;
      tr = 1;
      tg = 1;
      tb = 1;
      misRayPdf = 0;
      minRayPdf = Infinity;
      misOriginN = f3();
      continuationProbability = 1;
      /** Whether the path is still a camera ray (Cycles PATH_RAY_VISIBILITY_CAMERA). */
      cameraVisible = true;
    };
    _f32 = new Float32Array(1);
    _i32 = new Int32Array(_f32.buffer);
    Integrator = class {
      kg;
      p;
      rng = new PathRng();
      state = new PathState();
      ray = makeRay();
      hit = makeHit();
      shadowRay = makeRay();
      shadowHit = makeHit();
      sd = new ShaderData();
      shadowSd = new ShaderData();
      ls = new LightSample();
      lightHit = new LightHit();
      evalRes = new BsdfEvalResult();
      r2 = new Float64Array(2);
      r3 = new Float64Array(3);
      rgb = new Float64Array(3);
      rgb2 = new Float64Array(3);
      wo = f3();
      /** Denoising features of the current sample (albedo and camera-space normal) and the feature throughput of the path. */
      featAlbedo = new Float64Array(3);
      featNormal = new Float64Array(3);
      featT = new Float64Array(3);
      albTmp = new Float64Array(3);
      /** Origin of the current ray, for light tree pdfs. */
      rayP = f3();
      tmpV = f3();
      /** Radiance of the current sample. */
      Lr = 0;
      Lg = 0;
      Lb = 0;
      alpha = 0;
      // BsdfEval accumulator for MIS over closures.
      er = 0;
      eg = 0;
      eb = 0;
      constructor(kg, params) {
        this.kg = kg;
        this.p = params;
        this.rng.mask = params.sobolMask;
      }
      /**
       * Render samples [sampleStart, sampleStart + sampleCount) for the pixels of a tile and add them into `out` (RGBA per pixel, tile-local, row-major).
       */
      /**
       * Renders samples [sampleStart, sampleStart + sampleCount) of a tile, adding linear RGBA sums into out. With ext (EXT_STRIDE floats per pixel) it also adds the adaptive sampling aux buffer (twice the class A samples, as film_write_adaptive_buffer), the number of samples taken, and, when denoising features are on, the albedo and normal passes. Pixels whose converged flag is set are skipped, as film_need_sample_pixel skips them.
       */
      renderTile(x0, y0, w, h, sampleStart, sampleCount, out, ext, converged) {
        const rgba = new Float64Array(4);
        for (let ty = 0; ty < h; ty++) {
          for (let tx = 0; tx < w; tx++) {
            const i = ty * w + tx;
            if (converged && converged[i]) continue;
            let r = 0, g = 0, b = 0, a = 0;
            let ar = 0, ag = 0, ab = 0;
            let alr = 0, alg = 0, alb = 0, nx = 0, ny = 0, nz = 0;
            for (let s = sampleStart; s < sampleStart + sampleCount; s++) {
              this.tracePixelSample(x0 + tx, y0 + ty, s, rgba);
              r += rgba[0];
              g += rgba[1];
              b += rgba[2];
              a += rgba[3];
              if (ext) {
                if (sampleIsClassA(s)) {
                  ar += 2 * rgba[0];
                  ag += 2 * rgba[1];
                  ab += 2 * rgba[2];
                }
                alr += this.featAlbedo[0];
                alg += this.featAlbedo[1];
                alb += this.featAlbedo[2];
                nx += this.featNormal[0];
                ny += this.featNormal[1];
                nz += this.featNormal[2];
              }
            }
            const o = i * 4;
            out[o] += r;
            out[o + 1] += g;
            out[o + 2] += b;
            out[o + 3] += a;
            if (ext) {
              const e = i * EXT_STRIDE;
              ext[e + EXT.AUX] += ar;
              ext[e + EXT.AUX + 1] += ag;
              ext[e + EXT.AUX + 2] += ab;
              ext[e + EXT.COUNT] += sampleCount;
              ext[e + EXT.ALBEDO] += alr;
              ext[e + EXT.ALBEDO + 1] += alg;
              ext[e + EXT.ALBEDO + 2] += alb;
              ext[e + EXT.NORMAL] += nx;
              ext[e + EXT.NORMAL + 1] += ny;
              ext[e + EXT.NORMAL + 2] += nz;
            }
          }
        }
      }
      /** film_write_denoising_features_surface with Cycles' default options (follow reflections, albedo roughness weighting). */
      writeDenoisingFeatures() {
        const st = this.state;
        const sd = this.sd;
        const kg = this.kg;
        let nx = 0, ny = 0, nz = 0;
        let dr = 0, dg = 0, db = 0;
        let sr = 0, sg = 0, sb = 0;
        let tr = 0, tg = 0, tb = 0;
        let sumWeight = 0, sumNonSpecular = 0;
        const alb = this.albTmp;
        for (let i = 0; i < sd.numClosure; i++) {
          const c = sd.closures[i];
          if (!closureIsBsdf(c.type)) continue;
          if (c.type === CLOSURE_BSDF_TRANSPARENT) {
            tr += c.wr;
            tg += c.wg;
            tb += c.wb;
            continue;
          }
          if (closureIsMicrofacet(c.type)) microfacetAlbedo(kg, sd.wi, c, true, true, alb);
          else alb[0] = alb[1] = alb[2] = 1;
          const ar = c.wr * alb[0], ag = c.wg * alb[1], ab = c.wb * alb[2];
          const w = (ar + ag + ab) / 3;
          nx += c.N.x * w;
          ny += c.N.y * w;
          nz += c.N.z * w;
          const roughness = Math.sqrt(bsdfRoughnessSquared(c));
          const dw = smoothstep(0, 0.15, roughness);
          dr += ar * dw;
          dg += ag * dw;
          db += ab * dw;
          sr += ar * (1 - dw);
          sg += ag * (1 - dw);
          sb += ab * (1 - dw);
          sumWeight += w;
          sumNonSpecular += w * dw;
        }
        const totalWeight = sumWeight + (tr + tg + tb) / 3;
        let featureWeight = 0;
        if (sumWeight > 0) {
          nx /= sumWeight;
          ny /= sumWeight;
          nz /= sumWeight;
          featureWeight = smoothstep(0, 0.5, sumNonSpecular / sumWeight);
        }
        const deferred = 1 - featureWeight;
        const ft = this.featT;
        if (featureWeight > 0) {
          const m = this.p.camToWorld;
          const opaque = totalWeight > 0 ? sumWeight / totalWeight : 1;
          const k = opaque * featureWeight * ((ft[0] + ft[1] + ft[2]) / 3);
          const cx = (m[0] * nx + m[4] * ny + m[8] * nz) * k;
          const cy = (m[1] * nx + m[5] * ny + m[9] * nz) * k;
          const cz = (m[2] * nx + m[6] * ny + m[10] * nz) * k;
          if (Number.isFinite(cx + cy + cz)) {
            this.featNormal[0] += cx;
            this.featNormal[1] += cy;
            this.featNormal[2] += cz;
          }
          const ar = dr * featureWeight * ft[0], ag = dg * featureWeight * ft[1], ab = db * featureWeight * ft[2];
          if (Number.isFinite(ar + ag + ab)) {
            this.featAlbedo[0] += ar;
            this.featAlbedo[1] += ag;
            this.featAlbedo[2] += ab;
          }
        }
        const qr = sr * deferred + tr, qg = sg * deferred + tg, qb = sb * deferred + tb;
        if (Math.max(Math.abs(qr), Math.abs(qg), Math.abs(qb)) > 1e-4) {
          ft[0] *= qr;
          ft[1] *= qg;
          ft[2] *= qb;
        } else {
          st.flag &= ~PATH_RAY_DENOISING_FEATURES;
        }
      }
      /** Trace one camera sample through pixel (x, y), y = 0 at the top. Writes linear RGBA. */
      tracePixelSample(x, y, sample, out) {
        const kg = this.kg;
        const st = this.state;
        const ray = this.ray;
        this.Lr = this.Lg = this.Lb = 0;
        this.alpha = 0;
        st.rngPixel = pathRngPixelInit(x, y, this.p.seed);
        st.sample = sample;
        st.rngOffset = 0;
        this.rng.rng2D(st, PRNG_FILTER, this.r2);
        const fx = lookupTableRead(kg.f32, this.r2[0], kg.filterTable, FILTER_TABLE_SIZE);
        const fy = lookupTableRead(kg.f32, this.r2[1], kg.filterTable, FILTER_TABLE_SIZE);
        this.cameraRay(x + fx, y + fy, st, ray);
        st.rngOffset = PRNG_BOUNCE_NUM;
        st.flag = PATH_RAY_CAMERA | PATH_RAY_MIS_SKIP | PATH_RAY_TRANSPARENT_BACKGROUND | (this.p.denoisingFeatures ? PATH_RAY_DENOISING_FEATURES : 0);
        st.cameraVisible = true;
        this.featAlbedo[0] = this.featAlbedo[1] = this.featAlbedo[2] = 0;
        this.featNormal[0] = this.featNormal[1] = this.featNormal[2] = 0;
        this.featT[0] = this.featT[1] = this.featT[2] = 1;
        st.bounce = st.diffuseBounce = st.glossyBounce = st.transmissionBounce = st.transparentBounce = 0;
        st.tr = st.tg = st.tb = 1;
        st.misRayPdf = 0;
        st.minRayPdf = Infinity;
        st.continuationProbability = 1;
        for (let guard = 0; guard < 1024; guard++) {
          const ignore = st.cameraVisible ? IGNORE_FOR_CAMERA : 0;
          const hitSurface = intersectClosest(kg, ray, this.hit, ignore);
          const tSurface = hitSurface ? this.hit.t : ray.tmax;
          if (kg.numHittableLights > 0 && lightsIntersect(kg, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, ray.tmin, tSurface, st.cameraVisible, this.lightHit)) {
            this.shadeLight(this.lightHit.lamp, this.lightHit.t);
            st.transparentBounce++;
            if (st.transparentBounce >= this.p.maxTransparent) break;
            ray.tmin = nextFloatUp(this.lightHit.t);
            continue;
          }
          if (!hitSurface) {
            this.shadeBackground();
            break;
          }
          const shader = kg.u32[kg.triInfo + this.hit.prim * TRI_INFO_SIZE + TI.SHADER];
          const shaderFlags = kg.u32[kg.shaders + shader * SHADER_SIZE + SH.FLAGS];
          st.continuationProbability = this.continuationProbability();
          if (st.continuationProbability !== 1) {
            const terminate = this.rng.rng1D(st, PRNG_TERMINATE);
            if (st.continuationProbability === 0 || terminate >= st.continuationProbability) {
              if (shaderFlags & ShaderFlags.HAS_EMISSION) st.flag |= PATH_RAY_TERMINATE_ON_NEXT_SURFACE;
              else break;
            }
          }
          if (!this.shadeSurface()) break;
        }
        out[0] = Number.isFinite(this.Lr) ? this.Lr : 0;
        out[1] = Number.isFinite(this.Lg) ? this.Lg : 0;
        out[2] = Number.isFinite(this.Lb) ? this.Lb : 0;
        out[3] = this.alpha;
      }
      /** Perspective camera ray through raster position (rx, ry) in pixels (Cycles camera_sample_perspective). */
      cameraRay(rx, ry, st, ray) {
        const p = this.p;
        const sx = rx / p.width * 2 - 1;
        const sy = 1 - ry / p.height * 2;
        let dx = sx * p.tanHalfFov * p.aspect;
        let dy = sy * p.tanHalfFov;
        let dz = -1;
        let px = 0, py = 0, pz = 0;
        if (p.aperture > 0) {
          this.rng.rng2D(st, PRNG_LENS_TIME, this.r2);
          sampleUniformDisk(this.r2[0], this.r2[1], this.r2);
          const lx = this.r2[0] * p.aperture;
          const ly = this.r2[1] * p.aperture;
          const ft = p.focusDistance / -dz;
          const fxp = dx * ft, fyp = dy * ft, fzp = dz * ft;
          px = lx;
          py = ly;
          pz = 0;
          dx = fxp - px;
          dy = fyp - py;
          dz = fzp - pz;
        }
        const m = p.camToWorld;
        let wx = m[0] * dx + m[1] * dy + m[2] * dz;
        let wy = m[4] * dx + m[5] * dy + m[6] * dz;
        let wz = m[8] * dx + m[9] * dy + m[10] * dz;
        const l = Math.hypot(wx, wy, wz);
        wx /= l;
        wy /= l;
        wz /= l;
        ray.Px = m[0] * px + m[1] * py + m[2] * pz + m[3];
        ray.Py = m[4] * px + m[5] * py + m[6] * pz + m[7];
        ray.Pz = m[8] * px + m[9] * py + m[10] * pz + m[11];
        ray.Dx = wx;
        ray.Dy = wy;
        ray.Dz = wz;
        ray.tmin = 0;
        ray.tmax = Infinity;
        ray.selfPrim = -1;
      }
      /** Cycles path_state_continuation_probability. */
      continuationProbability() {
        const st = this.state;
        if (st.flag & PATH_RAY_TRANSPARENT) {
          if (st.transparentBounce <= 0) return 1;
        } else if (st.bounce <= this.p.minBounce) return 1;
        return Math.min(Math.sqrt(Math.max(Math.abs(st.tr), Math.abs(st.tg), Math.abs(st.tb))), 1);
      }
      /** Add a light contribution with Cycles' sample clamping (film_clamp_light). */
      filmWrite(r, g, b, bounce, direct = false) {
        if (!direct && this.state.flag & PATH_RAY_DENOISING_FEATURES) {
          const ft = this.featT;
          if (Number.isFinite(r + g + b)) {
            this.featAlbedo[0] += ft[0] * r;
            this.featAlbedo[1] += ft[1] * g;
            this.featAlbedo[2] += ft[2] * b;
          }
        }
        if (!Number.isFinite(r)) r = 0;
        if (!Number.isFinite(g)) g = 0;
        if (!Number.isFinite(b)) b = 0;
        const limit = bounce > 0 ? this.p.clampIndirect : this.p.clampDirect;
        const sum = Math.abs(r) + Math.abs(g) + Math.abs(b);
        if (sum > limit) {
          const k = limit / sum;
          r *= k;
          g *= k;
          b *= k;
        }
        this.Lr += r;
        this.Lg += g;
        this.Lb += b;
      }
      /** The probability of having picked lamp `lamp` by next-event estimation from the previous path vertex (the current ray's origin): the light tree's pdf there, or the flat distribution's share. */
      lampSelectionPdf(lamp) {
        const kg = this.kg;
        if (!kg.useLightTree) return kg.pdfLights;
        const st = this.state;
        const ray = this.ray;
        const e = kg.u32[kg.lights + lamp * LIGHT_SIZE + LT.TREE_EMITTER];
        if (e === NONE) return 0;
        this.rayP.x = ray.Px;
        this.rayP.y = ray.Py;
        this.rayP.z = ray.Pz;
        return lightTreePdf(kg, this.rayP, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, e);
      }
      shadeLight(lamp, t) {
        const kg = this.kg;
        const st = this.state;
        const ray = this.ray;
        const pdf = lampEvalFromIntersection(kg, lamp, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, t, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, this.rgb);
        if (this.rgb[0] === 0 && this.rgb[1] === 0 && this.rgb[2] === 0) return;
        let mis = 1;
        if (!(st.flag & PATH_RAY_MIS_SKIP)) mis = powerHeuristic(st.misRayPdf, pdf * this.lampSelectionPdf(lamp));
        this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
        if (st.cameraVisible) this.alpha = 1;
      }
      /** Cycles integrator_shade_background: distant lights with an angle, then the world. */
      shadeBackground() {
        const kg = this.kg;
        const st = this.state;
        const ray = this.ray;
        if (!(st.flag & PATH_RAY_MIS_SKIP) || st.cameraVisible) {
          for (let i = 0; i < kg.numHittableLights; i++) {
            const lamp = kg.u32[kg.hittableLights + i];
            const L = kg.lights + lamp * LIGHT_SIZE;
            if (kg.u32[L + LT.TYPE] !== LightType.SUN) continue;
            const flags = kg.u32[L + LT.FLAGS];
            if (st.cameraVisible ? !(flags & LightFlags.CAMERA_VISIBLE) : !(flags & LightFlags.USE_MIS)) continue;
            const pdf = lampEvalFromIntersection(kg, lamp, ray.Px, ray.Py, ray.Pz, ray.Dx, ray.Dy, ray.Dz, Infinity, st.misOriginN, false, this.rgb);
            if (pdf === 0) continue;
            let mis2 = 1;
            if (!(st.flag & PATH_RAY_MIS_SKIP)) mis2 = powerHeuristic(st.misRayPdf, pdf * this.lampSelectionPdf(lamp));
            this.filmWrite(st.tr * this.rgb[0] * mis2, st.tg * this.rgb[1] * mis2, st.tb * this.rgb[2] * mis2, st.bounce);
          }
        }
        if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND && !this.p.backgroundCameraVisible) return;
        this.tmpV.x = ray.Dx;
        this.tmpV.y = ray.Dy;
        this.tmpV.z = ray.Dz;
        shaderBackgroundEval(kg, this.tmpV, this.rgb);
        if (this.rgb[0] === 0 && this.rgb[1] === 0 && this.rgb[2] === 0) {
          if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND) this.alpha = 1;
          return;
        }
        let mis = 1;
        if (kg.backgroundLight >= 0 && kg.flags & SceneFlags.BACKGROUND_MIS && !(st.flag & PATH_RAY_MIS_SKIP)) {
          const pdf = backgroundLightPdf(kg, ray.Dx, ray.Dy, ray.Dz) * this.lampSelectionPdf(kg.backgroundLight);
          mis = powerHeuristic(st.misRayPdf, pdf);
        }
        this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
        if (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND) this.alpha = 1;
      }
      /** Returns false when the path ends. */
      shadeSurface() {
        const kg = this.kg;
        const st = this.state;
        const sd = this.sd;
        const ray = this.ray;
        shaderSetupFromRay(kg, sd, ray, this.hit);
        if (st.flag & PATH_RAY_TERMINATE) {
          evalSurfaceShader(kg, sd);
          let keep = 0;
          for (let i = 0; i < sd.numClosure; i++) {
            if (sd.closures[i].type !== CLOSURE_BSDF_TRANSPARENT) continue;
            if (i !== keep) {
              const t = sd.closures[keep];
              sd.closures[keep] = sd.closures[i];
              sd.closures[i] = t;
            }
            keep++;
          }
          sd.numClosure = keep;
          if (!keep) sd.runtimeFlag &= ~(SR_BSDF | SR_BSDF_HAS_EVAL);
          else sd.runtimeFlag &= ~SR_BSDF_HAS_EVAL;
        } else {
          evalSurfaceShader(kg, sd);
        }
        if (this.p.filterGlossy > 0) {
          const blurPdf = this.p.filterGlossy * st.minRayPdf;
          if (blurPdf < 1) {
            const blurRoughness = Math.sqrt(1 - blurPdf) * 0.5;
            for (let i = 0; i < sd.numClosure; i++) bsdfBlur(sd.closures[i], blurRoughness);
            if (!(blurRoughness * blurRoughness <= 2e-10)) sd.runtimeFlag |= SR_BSDF_HAS_EVAL;
          }
        }
        if (st.cameraVisible && !(sd.runtimeFlag & 16)) this.alpha = 1;
        else if (st.cameraVisible) {
          const t = (sd.tr + sd.tg + sd.tb) / 3;
          this.alpha = 1 - (1 - this.alpha) * Math.min(Math.max(t, 0), 1);
        }
        if (sd.runtimeFlag & SR_EMISSION) {
          surfaceShaderEmission(sd, this.rgb);
          const shaderFlags = kg.u32[kg.shaders + sd.shader * SHADER_SIZE + SH.FLAGS];
          let mis = 1;
          if (!(st.flag & PATH_RAY_MIS_SKIP) && shaderFlags & ShaderFlags.USE_MIS) {
            let lightPdf = triangleLightPdf(kg, sd.prim, sd.Ng, sd.wi, sd.P, sd.rayLength);
            if (kg.useLightTree) {
              const e = kg.u32[kg.triInfo + sd.prim * TRI_INFO_SIZE + TI.EMITTER];
              this.rayP.x = ray.Px;
              this.rayP.y = ray.Py;
              this.rayP.z = ray.Pz;
              lightPdf = e === NONE ? 0 : lightPdf * lightTreePdf(kg, this.rayP, st.misOriginN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) !== 0, e);
            }
            mis = powerHeuristic(st.misRayPdf, lightPdf);
          }
          this.filmWrite(st.tr * this.rgb[0] * mis, st.tg * this.rgb[1] * mis, st.tb * this.rgb[2] * mis, st.bounce);
        }
        const cp = st.flag & PATH_RAY_TERMINATE_ON_NEXT_SURFACE ? 0 : st.continuationProbability;
        if (cp === 0) return false;
        if (cp !== 1) {
          st.tr /= cp;
          st.tg /= cp;
          st.tb /= cp;
        }
        if (st.flag & PATH_RAY_DENOISING_FEATURES) this.writeDenoisingFeatures();
        if (kg.flags & SceneFlags.USE_DIRECT_LIGHT && sd.runtimeFlag & SR_BSDF_HAS_EVAL) this.directLight();
        return this.bsdfBounce();
      }
      /** One-sample MIS evaluation over all closures (Cycles _surface_shader_bsdf_eval_mis). Accumulates eval in er/eg/eb and returns the combined pdf. */
      evalMis(wo, skip, sumPdf, sumSampleWeight) {
        const sd = this.sd;
        const res = this.evalRes;
        for (let i = 0; i < sd.numClosure; i++) {
          if (i === skip) continue;
          const c = sd.closures[i];
          if (!closureIsBsdf(c.type)) continue;
          bsdfEval(c, sd.wi, wo, res);
          if (res.pdf !== 0) {
            this.er += res.r * c.wr;
            this.eg += res.g * c.wg;
            this.eb += res.b * c.wb;
            sumPdf += res.pdf * c.sampleWeight;
          }
          sumSampleWeight += c.sampleWeight;
        }
        return sumSampleWeight > 0 ? sumPdf / sumSampleWeight : 0;
      }
      directLight() {
        const kg = this.kg;
        const st = this.state;
        const sd = this.sd;
        const ls = this.ls;
        this.rng.rng3D(st, PRNG_LIGHT, this.r3);
        const hasTransmission = (sd.runtimeFlag & SR_BSDF_HAS_TRANSMISSION) !== 0;
        if (!lightSampleFromPosition(kg, this.r3[0], this.r3[1], this.r3[2], sd.P, sd.N, hasTransmission, ls)) return;
        const isTransmission = ls.D.x * sd.N.x + ls.D.y * sd.N.y + ls.D.z * sd.N.z < 0;
        if (ls.prim >= 0 && ls.prim === sd.prim) {
          const s = isTransmission ? -1 : 1;
          if ((ls.D.x * sd.Ng.x + ls.D.y * sd.Ng.y + ls.D.z * sd.Ng.z) * s > 0) return;
        }
        let lr = ls.er, lg = ls.eg, lb = ls.eb;
        if (ls.prim >= 0) {
          const sh = kg.shaders + kg.u32[kg.triInfo + ls.prim * TRI_INFO_SIZE + TI.SHADER] * SHADER_SIZE;
          if (!(kg.u32[sh + SH.FLAGS] & ShaderFlags.CONSTANT_EMISSION)) {
            this.evalEmissionAt(ls, this.rgb2);
            lr = this.rgb2[0];
            lg = this.rgb2[1];
            lb = this.rgb2[2];
          }
        }
        this.er = this.eg = this.eb = 0;
        const lightUsesMis = ls.prim >= 0 || (kg.u32[kg.lights + ls.lamp * LIGHT_SIZE + LT.FLAGS] & LightFlags.USE_MIS) !== 0;
        let bsdfPdf = this.evalMis(ls.D, -1, 0, 0);
        if (!lightUsesMis) bsdfPdf = 0;
        const mis = powerHeuristic(ls.pdf, bsdfPdf);
        const k = ls.evalFac / ls.pdf * mis;
        const cr = this.er * lr * k, cg = this.eg * lg * k, cb = this.eb * lb * k;
        if (cr === 0 && cg === 0 && cb === 0) return;
        const sray = this.shadowRay;
        const skipSelf = this.shadowRayOffset(ls.D, this.tmpV);
        let Px = this.tmpV.x, Py = this.tmpV.y, Pz = this.tmpV.z;
        sray.tmin = 0;
        if (ls.t === Infinity) {
          sray.Dx = ls.D.x;
          sray.Dy = ls.D.y;
          sray.Dz = ls.D.z;
          sray.tmax = Infinity;
        } else {
          let dx = ls.P.x - Px, dy = ls.P.y - Py, dz = ls.P.z - Pz;
          const l = Math.hypot(dx, dy, dz);
          if (l > 0) {
            dx /= l;
            dy /= l;
            dz /= l;
          }
          sray.Dx = dx;
          sray.Dy = dy;
          sray.Dz = dz;
          sray.tmax = l;
        }
        if (skipSelf) {
          this.integrateSurfaceRayOffset(Px, Py, Pz, sray.Dx, sray.Dy, sray.Dz, this.tmpV);
          Px = this.tmpV.x;
          Py = this.tmpV.y;
          Pz = this.tmpV.z;
        }
        sray.Px = Px;
        sray.Py = Py;
        sray.Pz = Pz;
        sray.selfPrim = skipSelf ? sd.prim : -1;
        let tr = st.tr * cr, tg = st.tg * cg, tb = st.tb * cb;
        if (ls.castShadow) {
          const vis = this.traceShadow(sray, ls.prim, this.rgb);
          if (!vis) return;
          tr *= this.rgb[0];
          tg *= this.rgb[1];
          tb *= this.rgb[2];
        }
        this.filmWrite(tr, tg, tb, st.bounce, true);
      }
      /** Emission of a textured mesh light at the sampled point. */
      evalEmissionAt(ls, out) {
        const kg = this.kg;
        const sd = this.shadowSd;
        const r = this.shadowRay;
        r.Px = ls.P.x - ls.D.x;
        r.Py = ls.P.y - ls.D.y;
        r.Pz = ls.P.z - ls.D.z;
        r.Dx = ls.D.x;
        r.Dy = ls.D.y;
        r.Dz = ls.D.z;
        const f = kg.f32;
        const b = kg.triVerts + ls.prim * TRI_VERTS_SIZE;
        const e1x = f[b + 4] - f[b], e1y = f[b + 5] - f[b + 1], e1z = f[b + 6] - f[b + 2];
        const e2x = f[b + 8] - f[b], e2y = f[b + 9] - f[b + 1], e2z = f[b + 10] - f[b + 2];
        const px = ls.P.x - f[b], py = ls.P.y - f[b + 1], pz = ls.P.z - f[b + 2];
        const d00 = e1x * e1x + e1y * e1y + e1z * e1z, d01 = e1x * e2x + e1y * e2y + e1z * e2z, d11 = e2x * e2x + e2y * e2y + e2z * e2z;
        const d20 = px * e1x + py * e1y + pz * e1z, d21 = px * e2x + py * e2y + pz * e2z;
        const den = d00 * d11 - d01 * d01 || 1;
        const hit = this.shadowHit;
        hit.u = (d11 * d20 - d01 * d21) / den;
        hit.v = (d00 * d21 - d01 * d20) / den;
        hit.t = 1;
        hit.prim = ls.prim;
        shaderSetupFromRay(kg, sd, r, hit);
        evalSurfaceShader(kg, sd);
        surfaceShaderEmission(sd, out);
      }
      /**
       * Shadow ray through transparent surfaces (Cycles intersect_shadow + shade_shadow): returns false when blocked, otherwise the transmitted throughput in out.
       */
      traceShadow(sray, lightPrim, out) {
        const kg = this.kg;
        const hit = this.shadowHit;
        out[0] = out[1] = out[2] = 1;
        let transparentBounces = this.state.transparentBounce;
        for (let guard = 0; guard < 256; guard++) {
          if (!intersectClosest(kg, sray, hit, IGNORE_FOR_SHADOW)) return true;
          if (hit.prim === lightPrim) {
            sray.tmin = nextFloatUp(hit.t);
            continue;
          }
          const shader = kg.u32[kg.triInfo + hit.prim * TRI_INFO_SIZE + TI.SHADER];
          if (!shaderHasTransparency(kg, shader)) return false;
          transparentBounces++;
          if (transparentBounces >= this.p.maxTransparent) return false;
          const sd = this.shadowSd;
          shaderSetupFromRay(kg, sd, sray, hit);
          evalSurfaceShader(kg, sd);
          shaderTransparency(sd, this.rgb2);
          out[0] *= this.rgb2[0];
          out[1] *= this.rgb2[1];
          out[2] *= this.rgb2[2];
          if (out[0] === 0 && out[1] === 0 && out[2] === 0) return false;
          sray.selfPrim = hit.prim;
          sray.tmin = hit.t;
        }
        return false;
      }
      bsdfBounce() {
        const kg = this.kg;
        const st = this.state;
        const sd = this.sd;
        const ray = this.ray;
        if (!(sd.runtimeFlag & SR_BSDF) || sd.numClosure === 0) return false;
        this.rng.rng3D(st, PRNG_SURFACE_BSDF, this.r3);
        let sampled = 0;
        let rz = this.r3[2];
        if (sd.numClosure > 1) {
          let sum = 0;
          for (let i = 0; i < sd.numClosure; i++) sum += sd.closures[i].sampleWeight;
          const r = rz * sum;
          let partial = 0;
          for (let i = 0; i < sd.numClosure; i++) {
            const next = partial + sd.closures[i].sampleWeight;
            if (r < next) {
              sampled = i;
              rz = (r - partial) / sd.closures[i].sampleWeight;
              break;
            }
            partial = next;
          }
        }
        const c = sd.closures[sampled];
        const res = this.evalRes;
        const wo = this.wo;
        const label = bsdfSample(c, sd.Ng, sd.wi, this.r3[0], this.r3[1], rz, res, wo);
        if (res.pdf === 0) return false;
        this.er = res.r * c.wr;
        this.eg = res.g * c.wg;
        this.eb = res.b * c.wb;
        let pdf = res.pdf;
        if (sd.numClosure > 1) pdf = this.evalMis(wo, sampled, res.pdf * c.sampleWeight, c.sampleWeight);
        if (pdf === 0 || this.er === 0 && this.eg === 0 && this.eb === 0) return false;
        if (label === LABEL_NONE) return false;
        const wl = Math.hypot(wo.x, wo.y, wo.z);
        const dx = wo.x / wl, dy = wo.y / wl, dz = wo.z / wl;
        this.integrateSurfaceRayOffset(sd.P.x, sd.P.y, sd.P.z, dx, dy, dz, this.tmpV);
        ray.Px = this.tmpV.x;
        ray.Py = this.tmpV.y;
        ray.Pz = this.tmpV.z;
        ray.Dx = dx;
        ray.Dy = dy;
        ray.Dz = dz;
        ray.tmin = 0;
        ray.tmax = Infinity;
        ray.selfPrim = sd.prim;
        st.tr *= this.er / pdf;
        st.tg *= this.eg / pdf;
        st.tb *= this.eb / pdf;
        if (!(label & LABEL_TRANSPARENT)) {
          st.misRayPdf = pdf;
          st.misOriginN.x = sd.N.x;
          st.misOriginN.y = sd.N.y;
          st.misOriginN.z = sd.N.z;
          st.minRayPdf = Math.min(pdf, st.minRayPdf);
        }
        this.pathStateNext(label, sd.runtimeFlag);
        return true;
      }
      /** Cycles path_state_next. */
      pathStateNext(label, runtimeFlag) {
        const st = this.state;
        const p = this.p;
        let flag = st.flag;
        if (label & LABEL_TRANSPARENT) {
          st.transparentBounce++;
          flag |= PATH_RAY_TRANSPARENT;
          if (st.transparentBounce >= p.maxTransparent) flag |= PATH_RAY_TERMINATE_ON_NEXT_SURFACE;
          st.flag = flag;
          st.rngOffset += PRNG_BOUNCE_NUM;
          return;
        }
        const bounce = st.bounce + 1;
        if (bounce >= p.maxBounce) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
        flag &= ~(PATH_RAY_REFLECT | PATH_RAY_SINGULAR | PATH_RAY_TRANSPARENT | PATH_RAY_MIS_SKIP | PATH_RAY_MIS_HAD_TRANSMISSION | PATH_RAY_CAMERA);
        st.cameraVisible = false;
        if (label & LABEL_REFLECT) {
          flag |= PATH_RAY_REFLECT;
          flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
          if (label & LABEL_DIFFUSE) {
            st.diffuseBounce++;
            if (st.diffuseBounce >= p.maxDiffuse) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
          } else {
            st.glossyBounce++;
            if (st.glossyBounce >= p.maxGlossy) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
          }
        } else {
          flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
          st.transmissionBounce++;
          if (st.transmissionBounce >= p.maxTransmission) flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT;
        }
        if (label & LABEL_DIFFUSE) flag |= PATH_RAY_DIFFUSE | PATH_RAY_DIFFUSE_ANCESTOR;
        else if (label & LABEL_GLOSSY) flag |= PATH_RAY_GLOSSY;
        else if (label & LABEL_SINGULAR) flag |= PATH_RAY_GLOSSY | PATH_RAY_SINGULAR | PATH_RAY_MIS_SKIP;
        if (runtimeFlag & SR_BSDF_HAS_TRANSMISSION) flag |= PATH_RAY_MIS_HAD_TRANSMISSION;
        if (label & LABEL_TRANSMIT) flag |= PATH_RAY_TRANSMIT;
        st.flag = flag;
        st.bounce = bounce;
        st.rngOffset += PRNG_BOUNCE_NUM;
      }
      /** Cycles integrate_surface_ray_offset: keep P unless the ray could hit a neighbouring triangle, then nudge along Ng. */
      integrateSurfaceRayOffset(Px, Py, Pz, Dx, Dy, Dz, out) {
        const kg = this.kg;
        const sd = this.sd;
        const f = kg.f32;
        const b = kg.triVerts + sd.prim * TRI_VERTS_SIZE;
        const v0x = f[b] - Px, v0y = f[b + 1] - Py, v0z = f[b + 2] - Pz;
        const v1x = f[b + 4] - Px, v1y = f[b + 5] - Py, v1z = f[b + 6] - Pz;
        const v2x = f[b + 8] - Px, v2y = f[b + 9] - Py, v2z = f[b + 10] - Pz;
        const e0x = v2x - v0x, e0y = v2y - v0y, e0z = v2z - v0z;
        const e1x = v0x - v1x, e1y = v0y - v1y, e1z = v0z - v1z;
        const e2x = v1x - v2x, e2y = v1y - v2y, e2z = v1z - v2z;
        let sx = v2x + v0x, sy = v2y + v0y, sz = v2z + v0z;
        const U = (sy * e0z - sz * e0y) * Dx + (sz * e0x - sx * e0z) * Dy + (sx * e0y - sy * e0x) * Dz;
        sx = v0x + v1x;
        sy = v0y + v1y;
        sz = v0z + v1z;
        const V = (sy * e1z - sz * e1y) * Dx + (sz * e1x - sx * e1z) * Dy + (sx * e1y - sy * e1x) * Dz;
        sx = v1x + v2x;
        sy = v1y + v2y;
        sz = v1z + v2z;
        const W = (sy * e2z - sz * e2y) * Dx + (sz * e2x - sx * e2z) * Dy + (sx * e2y - sy * e2x) * Dz;
        const eps = 11920929e-14 * Math.abs(U + V + W);
        const minUVW = Math.min(U, V, W);
        const maxUVW = Math.max(U, V, W);
        if (minUVW >= eps || maxUVW <= -eps) {
          out.x = Px;
          out.y = Py;
          out.z = Pz;
          return;
        }
        out.x = offsetComponent(Px, sd.Ng.x);
        out.y = offsetComponent(Py, sd.Ng.y);
        out.z = offsetComponent(Pz, sd.Ng.z);
      }
      /**
       * Cycles shadow_ray_offset: lift the shadow ray origin off low-poly smooth surfaces (shadow terminator geometry offset 0.1, the object default). Returns whether the ray should skip its own triangle.
       */
      shadowRayOffset(L, out) {
        const kg = this.kg;
        const sd = this.sd;
        out.x = sd.P.x;
        out.y = sd.P.y;
        out.z = sd.P.z;
        if (!(sd.triFlags & TriFlags.SMOOTH)) return true;
        const offsetCutoff = 0.1;
        let NL = sd.N.x * L.x + sd.N.y * L.y + sd.N.z * L.z;
        const transmit = NL < 0;
        if (NL < 0) NL = -NL;
        const s = transmit ? -1 : 1;
        const Ngx = sd.Ng.x * s, Ngy = sd.Ng.y * s, Ngz = sd.Ng.z * s;
        const NgL = Ngx * L.x + Ngy * L.y + Ngz * L.z;
        const amount = NL < offsetCutoff ? Math.min(Math.max(2 - (NgL + NL) / offsetCutoff, 0), 1) : Math.min(Math.max(1 - NgL / offsetCutoff, 0), 1);
        if (!(amount > 0)) return true;
        const f = kg.f32;
        const ti = kg.triInfo + sd.prim * TRI_INFO_SIZE;
        const tb = kg.triVerts + sd.prim * TRI_VERTS_SIZE;
        const vn = kg.vertNormals;
        const i0 = kg.u32[ti + TI.V0], i1 = kg.u32[ti + TI.V1], i2 = kg.u32[ti + TI.V2];
        const V0x = f[tb], V0y = f[tb + 1], V0z = f[tb + 2];
        const V1x = f[tb + 4], V1y = f[tb + 5], V1z = f[tb + 6];
        const V2x = f[tb + 8], V2y = f[tb + 9], V2z = f[tb + 10];
        const N0x = f[vn + i0 * 4], N0y = f[vn + i0 * 4 + 1], N0z = f[vn + i0 * 4 + 2];
        const N1x = f[vn + i1 * 4], N1y = f[vn + i1 * 4 + 1], N1z = f[vn + i1 * 4 + 2];
        const N2x = f[vn + i2 * 4], N2y = f[vn + i2 * 4 + 1], N2z = f[vn + i2 * 4 + 2];
        const u = 1 - sd.u - sd.v;
        const v = sd.u;
        const w = sd.v;
        const Px = V0x * u + V1x * v + V2x * w, Py = V0y * u + V1y * v + V2y * w, Pz = V0z * u + V1z * v + V2z * w;
        const nx = N0x * u + N1x * v + N2x * w, ny = N0y * u + N1y * v + N2y * w, nz = N0z * u + N1z * v + N2z * w;
        const dot = (ax, ay, az, bx, by, bz) => ax * bx + ay * by + az * bz;
        const a = dot(N2x - N0x, N2y - N0y, N2z - N0z, V0x - V2x, V0y - V2y, V0z - V2z);
        const bq = dot(N2x - N1x, N2y - N1y, N2z - N1z, V1x - V2x, V1y - V2y, V1z - V2z);
        const c = dot(N1x - N0x, N1y - N0y, N1z - N0z, V1x - V0x, V1y - V0y, V1z - V0z);
        let h = a * u * (u - 1) + (a + bq + c) * u * v + bq * v * (v - 1);
        if (dot(nx, ny, nz, Ngx, Ngy, Ngz) > 0) {
          let h0 = Math.max(dot(V1x - V0x, V1y - V0y, V1z - V0z, N0x, N0y, N0z), dot(V2x - V0x, V2y - V0y, V2z - V0z, N0x, N0y, N0z), 0);
          let h1 = Math.max(dot(V0x - V1x, V0y - V1y, V0z - V1z, N1x, N1y, N1z), dot(V2x - V1x, V2y - V1y, V2z - V1z, N1x, N1y, N1z), 0);
          let h2 = Math.max(dot(V0x - V2x, V0y - V2y, V0z - V2z, N2x, N2y, N2z), dot(V1x - V2x, V1y - V2y, V1z - V2z, N2x, N2y, N2z), 0);
          h0 = Math.max(dot(V0x - Px, V0y - Py, V0z - Pz, N0x, N0y, N0z) + h0, 0);
          h1 = Math.max(dot(V1x - Px, V1y - Py, V1z - Pz, N1x, N1y, N1z) + h1, 0);
          h2 = Math.max(dot(V2x - Px, V2y - Py, V2z - Pz, N2x, N2y, N2z) + h2, 0);
          h = Math.max(Math.min(h0, h1, h2), h * 0.5);
        } else {
          let h0 = Math.max(dot(V0x - V1x, V0y - V1y, V0z - V1z, N0x, N0y, N0z), dot(V0x - V2x, V0y - V2y, V0z - V2z, N0x, N0y, N0z), 0);
          let h1 = Math.max(dot(V1x - V0x, V1y - V0y, V1z - V0z, N1x, N1y, N1z), dot(V1x - V2x, V1y - V2y, V1z - V2z, N1x, N1y, N1z), 0);
          let h2 = Math.max(dot(V2x - V0x, V2y - V0y, V2z - V0z, N2x, N2y, N2z), dot(V2x - V1x, V2y - V1y, V2z - V1z, N2x, N2y, N2z), 0);
          h0 = Math.max(dot(Px - V0x, Py - V0y, Pz - V0z, N0x, N0y, N0z) + h0, 0);
          h1 = Math.max(dot(Px - V1x, Py - V1y, Pz - V1z, N1x, N1y, N1z) + h1, 0);
          h2 = Math.max(dot(Px - V2x, Py - V2y, Pz - V2z, N2x, N2y, N2z) + h2, 0);
          h = Math.min(-Math.min(h0, h1, h2), h * 0.5);
        }
        out.x += nx * h * amount;
        out.y += ny * h * amount;
        out.z += nz * h * amount;
        return NgL > 0;
      }
    };
  }
});

// src/render/adaptive.ts
function adaptiveSampling(threshold, minSamples) {
  if (!(threshold > 0)) return null;
  const min = minSamples > 0 ? Math.max(4, minSamples) : Math.max(4, Math.ceil(16 / Math.pow(threshold, 0.3)));
  return { threshold: threshold * 5, minSamples: min, step: 16 };
}
function needFilter(a, sample) {
  if (sample <= a.minSamples) return false;
  return (sample & a.step - 1) === a.step - 1;
}
function alignSamples(a, start, num) {
  const firstFilter = a.minSamples + 1 | a.step - 1;
  if (start + num <= firstFilter) return num;
  const nextFilter = Math.max(firstFilter, start | a.step - 1);
  return Math.min(nextFilter - start + 1, num);
}
function alignSchedule(a, passes) {
  if (!a) return passes;
  const out = [];
  let start = 0;
  for (let n of passes) {
    while (n > 0) {
      const k = alignSamples(a, start, n);
      out.push(k);
      start += k;
      n -= k;
    }
  }
  return out;
}
function convergenceCheck(a, width, height, sum, ext, converged, reset = false) {
  const n = width * height;
  for (let i = 0; i < n; i++) {
    if (!reset && converged[i]) continue;
    const o = i * 4;
    const e = i * EXT_STRIDE;
    const sample = ext[e + EXT.COUNT];
    if (!(sample > 0)) {
      converged[i] = 0;
      continue;
    }
    const scale = 1 / sample;
    const diff = (Math.abs(sum[o] - ext[e + EXT.AUX]) + Math.abs(sum[o + 1] - ext[e + EXT.AUX + 1]) + Math.abs(sum[o + 2] - ext[e + EXT.AUX + 2])) * scale;
    const intensity = (sum[o] + sum[o + 1] + sum[o + 2]) * scale;
    const normalize = intensity < 1 ? Math.sqrt(intensity) : intensity;
    const error = diff / (1e-4 + normalize);
    converged[i] = error < a.threshold ? 1 : 0;
  }
  for (let y = 0; y < height; y++) {
    let prev = false;
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (converged[i] === 0) {
        if (x > 0 && !prev) converged[i - 1] = 0;
        prev = true;
      } else {
        if (prev) converged[i] = 0;
        prev = false;
      }
    }
  }
  for (let x = 0; x < width; x++) {
    let prev = false;
    for (let y = 0; y < height; y++) {
      const i = y * width + x;
      if (converged[i] === 0) {
        if (y > 0 && !prev) converged[i - width] = 0;
        prev = true;
      } else {
        if (prev) converged[i] = 0;
        prev = false;
      }
    }
  }
  let active = 0;
  for (let i = 0; i < n; i++) if (!converged[i]) active++;
  return active;
}
var init_adaptive = __esm({
  "src/render/adaptive.ts"() {
    "use strict";
    init_integrator();
  }
});

// src/render/params.ts
function resolveSettings(s) {
  return {
    width: s.width,
    height: s.height,
    samples: s.samples ?? DEFAULT_SETTINGS.samples,
    seed: s.seed ?? DEFAULT_SETTINGS.seed,
    maxBounces: s.maxBounces ?? DEFAULT_SETTINGS.maxBounces,
    maxDiffuseBounces: s.maxDiffuseBounces ?? DEFAULT_SETTINGS.maxDiffuseBounces,
    maxGlossyBounces: s.maxGlossyBounces ?? DEFAULT_SETTINGS.maxGlossyBounces,
    maxTransmissionBounces: s.maxTransmissionBounces ?? DEFAULT_SETTINGS.maxTransmissionBounces,
    maxTransparentBounces: s.maxTransparentBounces ?? DEFAULT_SETTINGS.maxTransparentBounces,
    minBounces: s.minBounces ?? DEFAULT_SETTINGS.minBounces,
    clampDirect: s.clampDirect ?? DEFAULT_SETTINGS.clampDirect,
    clampIndirect: s.clampIndirect ?? DEFAULT_SETTINGS.clampIndirect,
    filterGlossy: s.filterGlossy ?? DEFAULT_SETTINGS.filterGlossy,
    lightTree: s.lightTree ?? DEFAULT_SETTINGS.lightTree,
    denoisingPasses: s.denoisingPasses ?? DEFAULT_SETTINGS.denoisingPasses,
    adaptiveThreshold: s.adaptiveThreshold ?? DEFAULT_SETTINGS.adaptiveThreshold,
    adaptiveMinSamples: s.adaptiveMinSamples ?? DEFAULT_SETTINGS.adaptiveMinSamples,
    filter: s.filter ?? DEFAULT_SETTINGS.filter,
    filterWidth: s.filterWidth ?? DEFAULT_SETTINGS.filterWidth,
    backgroundMapResolution: s.backgroundMapResolution ?? 0
  };
}
function cameraToWorld(camera) {
  if (camera.matrix) {
    const m = camera.matrix;
    const cols = [0, 1, 2].map((c) => {
      const x = m[c * 4], y = m[c * 4 + 1], z = m[c * 4 + 2];
      const l2 = Math.hypot(x, y, z) || 1;
      return [x / l2, y / l2, z / l2];
    });
    const pos = [m[12], m[13], m[14]];
    return [cols[0][0], cols[1][0], cols[2][0], pos[0], cols[0][1], cols[1][1], cols[2][1], pos[1], cols[0][2], cols[1][2], cols[2][2], pos[2]];
  }
  const p = camera.position;
  const t = camera.target ?? [p[0], p[1], p[2] - 1];
  const up = camera.up ?? [0, 1, 0];
  let bx = p[0] - t[0], by = p[1] - t[1], bz = p[2] - t[2];
  let l = Math.hypot(bx, by, bz) || 1;
  bx /= l;
  by /= l;
  bz /= l;
  let rx = up[1] * bz - up[2] * by, ry = up[2] * bx - up[0] * bz, rz = up[0] * by - up[1] * bx;
  l = Math.hypot(rx, ry, rz);
  if (l < 1e-8) {
    const alt = Math.abs(by) > 0.9 ? [0, 0, 1] : [0, 1, 0];
    rx = alt[1] * bz - alt[2] * by;
    ry = alt[2] * bx - alt[0] * bz;
    rz = alt[0] * by - alt[1] * bx;
    l = Math.hypot(rx, ry, rz);
  }
  rx /= l;
  ry /= l;
  rz /= l;
  const ux = by * rz - bz * ry, uy = bz * rx - bx * rz, uz = bx * ry - by * rx;
  return [rx, ux, bx, p[0], ry, uy, by, p[1], rz, uz, bz, p[2]];
}
function makeParams(camera, settings, opts = {}) {
  const u = new Uint32Array(PARAMS_SIZE);
  const f = new Float32Array(u.buffer);
  u[P.WIDTH] = settings.width;
  u[P.HEIGHT] = settings.height;
  u[P.SAMPLE_START] = opts.sampleStart ?? 0;
  u[P.SAMPLE_COUNT] = opts.sampleCount ?? settings.samples;
  u[P.SEED] = settings.seed >>> 0;
  u[P.SOBOL_MASK] = sobolIndexMask(opts.totalSamples ?? settings.samples);
  u[P.MAX_BOUNCE] = settings.maxBounces;
  u[P.MAX_DIFFUSE] = settings.maxDiffuseBounces;
  u[P.MAX_GLOSSY] = settings.maxGlossyBounces;
  u[P.MAX_TRANSMISSION] = settings.maxTransmissionBounces;
  u[P.MAX_TRANSPARENT] = settings.maxTransparentBounces;
  u[P.MIN_BOUNCE] = settings.minBounces;
  f[P.CLAMP_DIRECT] = settings.clampDirect > 0 ? settings.clampDirect * 3 : 0;
  f[P.CLAMP_INDIRECT] = settings.clampIndirect > 0 ? settings.clampIndirect * 3 : 0;
  f[P.FILTER_GLOSSY] = settings.filterGlossy > 0 ? 1 / settings.filterGlossy : 0;
  u[P.DENOISING_FEATURES] = settings.denoisingPasses ? 1 : 0;
  u[P.ADAPTIVE] = settings.adaptiveThreshold > 0 ? 1 : 0;
  u[P.FILM_STRIDE] = settings.adaptiveThreshold > 0 || settings.denoisingPasses ? 16 : 4;
  const m = cameraToWorld(camera);
  for (let i = 0; i < 12; i++) f[P.CAM_TO_WORLD + i] = m[i];
  f[P.CAM_TAN_HALF_FOV] = Math.tan(camera.fov / 2);
  f[P.CAM_ASPECT] = settings.width / settings.height;
  f[P.CAM_APERTURE] = camera.apertureRadius ?? 0;
  f[P.CAM_FOCUS] = camera.focusDistance ?? 1;
  u[P.BG_CAMERA_VISIBLE] = opts.backgroundCameraVisible === false ? 0 : 1;
  return u;
}
var DEFAULT_SETTINGS;
var init_params = __esm({
  "src/render/params.ts"() {
    "use strict";
    init_layout();
    init_sobol_burley();
    DEFAULT_SETTINGS = {
      samples: 128,
      seed: 0,
      maxBounces: 12,
      maxDiffuseBounces: 4,
      maxGlossyBounces: 4,
      maxTransmissionBounces: 12,
      maxTransparentBounces: 8,
      minBounces: 0,
      clampDirect: 0,
      clampIndirect: 10,
      filterGlossy: 1,
      lightTree: true,
      denoisingPasses: false,
      adaptiveThreshold: 0,
      adaptiveMinSamples: 0,
      filter: "blackman-harris",
      filterWidth: 1.5
    };
  }
});

// src/render/renderer.ts
function srgbOetf(x) {
  if (x <= 31308e-7) return 12.92 * x;
  return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}
function filmToRGBA8(film, opts = {}, out) {
  const n = film.width * film.height;
  const o = out ?? new Uint8ClampedArray(n * 4);
  const exposure = Math.pow(2, opts.exposure ?? 0);
  const linear = opts.view === "linear";
  const bg = opts.background;
  const ext = film.ext;
  for (let i = 0; i < n; i++) {
    const x = i % film.width;
    const y = i / film.width | 0;
    const dither = ((x * 7 + y * 13 & 15) / 16 - 0.5) / 255;
    const count = ext ? ext[i * EXT_STRIDE + EXT.COUNT] : film.samples;
    const inv = count > 0 ? 1 / count : 0;
    const k = inv * exposure;
    let a = film.sum[i * 4 + 3] * inv;
    for (let c = 0; c < 3; c++) {
      let v = film.sum[i * 4 + c] * k;
      if (bg) v += (1 - a) * bg[c];
      v = linear ? v : srgbOetf(Math.max(v, 0));
      o[i * 4 + c] = Math.round(Math.min(Math.max(v + dither, 0), 1) * 255);
    }
    if (bg) a = 1;
    o[i * 4 + 3] = Math.round(Math.min(Math.max(a, 0), 1) * 255);
  }
  return o;
}
function passSchedule(totalSamples) {
  const passes = [];
  let done = 0;
  let next = 1;
  while (done < totalSamples) {
    const n = Math.min(next, totalSamples - done);
    passes.push(n);
    done += n;
    next = Math.min(next * 2, 16);
  }
  return passes;
}
var init_renderer = __esm({
  "src/render/renderer.ts"() {
    "use strict";
    init_integrator();
  }
});

// src/gpu/wgsl/layout.ts
function block(prefix, table) {
  return Object.entries(table).map(([k, v]) => `const ${prefix}${k}: u32 = ${v >>> 0}u;`).join("\n");
}
function wgslLayout() {
  return [
    block("H_", H),
    block("SH_", SH),
    block("ST_", ShaderType),
    block("SF_", ShaderFlags),
    block("TI_", TI),
    block("TF_", TriFlags),
    block("TX_", TX),
    block("TXF_", TexFlags),
    block("LT_", LT),
    block("LTY_", LightType),
    block("LF_", LightFlags),
    block("SCF_", SceneFlags),
    block("P_", P),
    block("LTN_", LTN),
    block("LTE_", LTE),
    block("LTNT_", LightTreeNodeType),
    `const LIGHT_TREE_NODE_SIZE: u32 = ${LIGHT_TREE_NODE_SIZE}u;`,
    `const LIGHT_TREE_EMITTER_SIZE: u32 = ${LIGHT_TREE_EMITTER_SIZE}u;`,
    `const NONE: u32 = ${NONE}u;`,
    `const NODE_SIZE: u32 = ${NODE_SIZE}u;`,
    `const TRI_VERTS_SIZE: u32 = ${TRI_VERTS_SIZE}u;`,
    `const TRI_INFO_SIZE: u32 = ${TRI_INFO_SIZE}u;`,
    `const SHADER_SIZE: u32 = ${SHADER_SIZE}u;`,
    `const TEX_SIZE: u32 = ${TEX_SIZE}u;`,
    `const LIGHT_SIZE: u32 = ${LIGHT_SIZE}u;`,
    `const DIST_SIZE: u32 = ${DIST_SIZE}u;`,
    `const FILTER_TABLE_SIZE: u32 = ${FILTER_TABLE_SIZE}u;`
  ].join("\n");
}
var init_layout2 = __esm({
  "src/gpu/wgsl/layout.ts"() {
    "use strict";
    init_layout();
  }
});

// src/gpu/wgsl/common.ts
var WGSL_COMMON;
var init_common = __esm({
  "src/gpu/wgsl/common.ts"() {
    "use strict";
    WGSL_COMMON = /* wgsl */
    `
const PI: f32 = 3.14159265358979;
const INV_PI: f32 = 0.318309886183791;
const INV_2PI: f32 = 0.159154943091895;
const FLT_MAX: f32 = 3.40282346e38;
const MAX_CLOSURE: u32 = 8u;

struct PathState {
  P: vec3<f32>, tmin: f32,
  D: vec3<f32>, tmax: f32,
  T: vec3<f32>, misRayPdf: f32,
  L: vec3<f32>, alpha: f32,
  misN: vec3<f32>, contProb: f32,
  flag: u32, bounce: u32, diffuseB: u32, glossyB: u32,
  transB: u32, transpB: u32, rngPixel: u32, rngOffset: u32,
  sample: u32, pixel: u32, selfPrim: u32, cameraVisible: u32,
  hitPrim: u32, hitT: f32, hitU: f32, hitV: f32,
  lamp: u32, lampT: f32, minRayPdf: f32, pad1: u32,
  featT: vec3<f32>, pad2: f32,
};

struct ShadowState {
  P: vec3<f32>, tmax: f32,
  D: vec3<f32>, bounce: u32,
  C: vec3<f32>, pad1: f32,
  path: u32, selfPrim: u32, lightPrim: u32, transpB: u32,
};

@group(0) @binding(0) var<storage, read> scene: array<u32>;
@group(0) @binding(1) var<storage, read> texels: array<u32>;
@group(0) @binding(2) var<uniform> params: array<vec4<u32>, 16>;
@group(0) @binding(3) var<storage, read_write> paths: array<PathState>;
@group(0) @binding(4) var<storage, read_write> shadows: array<ShadowState>;
@group(0) @binding(5) var<storage, read_write> ctr: array<atomic<u32>>;
@group(0) @binding(6) var<storage, read_write> qidx: array<u32>;
@group(0) @binding(7) var<storage, read_write> film: array<f32>;

// Queue ids and control words in ctr.
const Q_INTERSECT: u32 = 0u;
const Q_LIGHT: u32 = 1u;
const Q_BACKGROUND: u32 = 2u;
const Q_SURFACE: u32 = 3u;
const Q_SHADOW: u32 = 4u;
const NUM_QUEUES: u32 = 5u;
const CTR_ACTIVE: u32 = 8u;
const CTR_SAMPLE: u32 = 16u;
const CTR_ARGS: u32 = 32u;

fn param(i: u32) -> u32 { return params[i >> 2u][i & 3u]; }
fn paramf(i: u32) -> f32 { return bitcast<f32>(param(i)); }
fn su(i: u32) -> u32 { return scene[i]; }
fn sf(i: u32) -> f32 { return bitcast<f32>(scene[i]); }
fn sv3(i: u32) -> vec3<f32> { return vec3<f32>(sf(i), sf(i + 1u), sf(i + 2u)); }
fn hdr(i: u32) -> u32 { return scene[i]; }
fn numPaths() -> u32 { return param(P_TILE_W) * param(P_TILE_H); }

fn safe_sqrt(x: f32) -> f32 { return sqrt(max(x, 0.0)); }
fn sqr(x: f32) -> f32 { return x * x; }
fn saturate1(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn avg3(v: vec3<f32>) -> f32 { return (v.x + v.y + v.z) * (1.0 / 3.0); }
fn max3(v: vec3<f32>) -> f32 { return max(v.x, max(v.y, v.z)); }
fn is_zero3(v: vec3<f32>) -> bool { return v.x == 0.0 && v.y == 0.0 && v.z == 0.0; }
fn safe_normalize(v: vec3<f32>) -> vec3<f32> { let l = length(v); return select(vec3<f32>(0.0), v / l, l > 0.0); }
fn inverse_lerp(a: f32, b: f32, x: f32) -> f32 { return (x - a) / (b - a); }

fn make_orthonormals(N: vec3<f32>) -> mat2x3<f32> {
  var a: vec3<f32>;
  if (N.x != N.y || N.x != N.z) { a = vec3<f32>(N.z - N.y, N.x - N.z, N.y - N.x); }
  else { a = vec3<f32>(N.z - N.y, N.x + N.z, -N.y - N.x); }
  a = normalize(a);
  return mat2x3<f32>(a, cross(N, a));
}

// ---- Hashes (Cycles util/hash.h)
fn uint_to_float_excl(n: u32) -> f32 { return f32(n) * (1.0 / 4294967808.0); }
fn hash_hp_uint(iin: u32) -> u32 {
  var i = iin;
  i ^= i >> 16u; i *= 0x21f0aaadu; i ^= i >> 15u; i *= 0xd35a2d97u; i ^= i >> 15u;
  return i ^ 0xe6fe3bebu;
}
fn hash_iqnt2d(x: u32, y: u32) -> u32 {
  let qx = 1103515245u * ((x >> 1u) ^ y);
  let qy = 1103515245u * ((y >> 1u) ^ x);
  return 1103515245u * (qx ^ (qy >> 3u));
}

// ---- Sobol-Burley (Cycles kernel/sample/sobol_burley.h)
const SOBOL: array<u32, 128> = array<u32, 128>(
  0x00000001u, 0x00000002u, 0x00000004u, 0x00000008u, 0x00000010u, 0x00000020u, 0x00000040u, 0x00000080u,
  0x00000100u, 0x00000200u, 0x00000400u, 0x00000800u, 0x00001000u, 0x00002000u, 0x00004000u, 0x00008000u,
  0x00010000u, 0x00020000u, 0x00040000u, 0x00080000u, 0x00100000u, 0x00200000u, 0x00400000u, 0x00800000u,
  0x01000000u, 0x02000000u, 0x04000000u, 0x08000000u, 0x10000000u, 0x20000000u, 0x40000000u, 0x80000000u,
  0x00000001u, 0x00000003u, 0x00000005u, 0x0000000fu, 0x00000011u, 0x00000033u, 0x00000055u, 0x000000ffu,
  0x00000101u, 0x00000303u, 0x00000505u, 0x00000f0fu, 0x00001111u, 0x00003333u, 0x00005555u, 0x0000ffffu,
  0x00010001u, 0x00030003u, 0x00050005u, 0x000f000fu, 0x00110011u, 0x00330033u, 0x00550055u, 0x00ff00ffu,
  0x01010101u, 0x03030303u, 0x05050505u, 0x0f0f0f0fu, 0x11111111u, 0x33333333u, 0x55555555u, 0xffffffffu,
  0x00000001u, 0x00000003u, 0x00000006u, 0x00000009u, 0x00000017u, 0x0000003au, 0x00000071u, 0x000000a3u,
  0x00000116u, 0x00000339u, 0x00000677u, 0x000009aau, 0x00001601u, 0x00003903u, 0x00007706u, 0x0000aa09u,
  0x00010117u, 0x0003033au, 0x00060671u, 0x000909a3u, 0x00171616u, 0x003a3939u, 0x00717777u, 0x00a3aaaau,
  0x01170001u, 0x033a0003u, 0x06710006u, 0x09a30009u, 0x16160017u, 0x3939003au, 0x77770071u, 0xaaaa00a3u,
  0x00000001u, 0x00000003u, 0x00000004u, 0x0000000au, 0x0000001fu, 0x0000002eu, 0x00000045u, 0x000000c9u,
  0x0000011bu, 0x000002a4u, 0x0000079au, 0x00000b67u, 0x0000101eu, 0x0000302du, 0x00004041u, 0x0000a0c3u,
  0x0001f104u, 0x0002e28au, 0x000457dfu, 0x000c9baeu, 0x0011a105u, 0x002a7289u, 0x0079e7dbu, 0x00b6dba4u,
  0x0100011au, 0x030002a7u, 0x0400079eu, 0x0a000b6du, 0x1f001001u, 0x2e003003u, 0x45004004u, 0xc900a00au
);

fn reversed_bit_owen(nin: u32, seed: u32) -> u32 {
  var n = nin;
  n ^= n * 0x3d20adeau;
  n += seed;
  n *= (seed >> 16u) | 1u;
  n ^= n * 0x05526c56u;
  n ^= n * 0x53a22864u;
  return n;
}

fn sobol_burley(rev_in: u32, dimension: u32, scramble: u32) -> f32 {
  var rev = rev_in;
  var result = 0u;
  if (dimension == 0u) {
    result = reverseBits(rev);
  } else {
    var i = 0u;
    let base = dimension * 32u;
    loop {
      if (rev == 0u) { break; }
      let j = countLeadingZeros(rev);
      result ^= SOBOL[base + i + j];
      i += j + 1u;
      rev = rev << j;
      rev = rev << 1u;
    }
  }
  result = reverseBits(reversed_bit_owen(result, scramble));
  return uint_to_float_excl(result);
}

fn sobol_1d(index: u32, dimension: u32, seed_in: u32, mask: u32) -> f32 {
  let seed = seed_in ^ hash_hp_uint(dimension);
  let idx = reversed_bit_owen(reverseBits(index), seed ^ 0xbff95bfeu) & mask;
  return sobol_burley(idx, 0u, seed ^ 0x635c77bdu);
}
fn sobol_2d(index: u32, dimension: u32, seed_in: u32, mask: u32) -> vec2<f32> {
  let seed = seed_in ^ hash_hp_uint(dimension);
  let idx = reversed_bit_owen(reverseBits(index), seed ^ 0xf8ade99au) & mask;
  return vec2<f32>(sobol_burley(idx, 0u, seed ^ 0xe0aaaf76u), sobol_burley(idx, 1u, seed ^ 0x94964d4eu));
}
fn sobol_3d(index: u32, dimension: u32, seed_in: u32, mask: u32) -> vec3<f32> {
  let seed = seed_in ^ hash_hp_uint(dimension);
  let idx = reversed_bit_owen(reverseBits(index), seed ^ 0xcaa726acu) & mask;
  return vec3<f32>(sobol_burley(idx, 0u, seed ^ 0x9e78e391u), sobol_burley(idx, 1u, seed ^ 0x67c33241u), sobol_burley(idx, 2u, seed ^ 0x78c395c5u));
}

const PRNG_FILTER: u32 = 0u;
const PRNG_LENS_TIME: u32 = 1u;
const PRNG_TERMINATE: u32 = 0u;
const PRNG_LIGHT: u32 = 1u;
const PRNG_SURFACE_BSDF: u32 = 3u;
const PRNG_BOUNCE_NUM: u32 = 16u;

fn path_rng_1d(p: u32, dim: u32) -> f32 { return sobol_1d(paths[p].sample, paths[p].rngOffset + dim, paths[p].rngPixel, param(P_SOBOL_MASK)); }
fn path_rng_2d(p: u32, dim: u32) -> vec2<f32> { return sobol_2d(paths[p].sample, paths[p].rngOffset + dim, paths[p].rngPixel, param(P_SOBOL_MASK)); }
fn path_rng_3d(p: u32, dim: u32) -> vec3<f32> { return sobol_3d(paths[p].sample, paths[p].rngOffset + dim, paths[p].rngPixel, param(P_SOBOL_MASK)); }

// ---- Lookup tables (Cycles kernel/util/lookup_table.h), reading floats from the scene buffer.
fn lut1(x_in: f32, offset: u32, size: u32) -> f32 {
  let x = saturate1(x_in) * f32(size - 1u);
  let index = min(u32(x), size - 1u);
  let nindex = min(index + 1u, size - 1u);
  let t = x - f32(index);
  let d0 = sf(index + offset);
  if (t == 0.0) { return d0; }
  return (1.0 - t) * d0 + t * sf(nindex + offset);
}
fn lut2(x: f32, y_in: f32, offset: u32, xsize: u32, ysize: u32) -> f32 {
  let y = saturate1(y_in) * f32(ysize - 1u);
  let index = min(u32(y), ysize - 1u);
  let nindex = min(index + 1u, ysize - 1u);
  let t = y - f32(index);
  let d0 = lut1(x, offset + xsize * index, xsize);
  if (t == 0.0) { return d0; }
  return (1.0 - t) * d0 + t * lut1(x, offset + xsize * nindex, xsize);
}
fn lut3(x: f32, y: f32, z_in: f32, offset: u32, xs: u32, ys: u32, zs: u32) -> f32 {
  let z = saturate1(z_in) * f32(zs - 1u);
  let index = min(u32(z), zs - 1u);
  let nindex = min(index + 1u, zs - 1u);
  let t = z - f32(index);
  let d0 = lut2(x, y, offset + xs * ys * index, xs, ys);
  if (t == 0.0) { return d0; }
  return (1.0 - t) * d0 + t * lut2(x, y, offset + xs * ys * nindex, xs, ys);
}

// ---- Textures
fn srgb_to_linear(c: f32) -> f32 {
  return select(pow((c + 0.055) / 1.055, 2.4), c / 12.92, c <= 0.04045);
}
fn wrap_index(i: i32, n: i32, mode: u32) -> i32 {
  if (mode == 0u) { let m = i % n; return select(m, m + n, m < 0); }
  if (mode == 1u) { return clamp(i, 0, n - 1); }
  let period = 2 * n;
  var m = i % period;
  if (m < 0) { m += period; }
  return select(period - 1 - m, m, m < n);
}
fn fetch_texel(offset: u32, width: u32, flags: u32, x: i32, y: i32) -> vec4<f32> {
  let idx = u32(y) * width + u32(x);
  if ((flags & TXF_HALF) != 0u) {
    let a = unpack2x16float(texels[offset + idx * 2u]);
    let b = unpack2x16float(texels[offset + idx * 2u + 1u]);
    return vec4<f32>(a.x, a.y, b.x, b.y);
  }
  let p = unpack4x8unorm(texels[offset + idx]);
  if ((flags & TXF_SRGB) != 0u) { return vec4<f32>(srgb_to_linear(p.x), srgb_to_linear(p.y), srgb_to_linear(p.z), p.w); }
  return p;
}
fn texture_lookup(tex: u32, u: f32, v: f32) -> vec4<f32> {
  let d = hdr(H_TEXTURES) + tex * TEX_SIZE;
  let offset = su(d + TX_OFFSET);
  let width = su(d + TX_WIDTH);
  let height = su(d + TX_HEIGHT);
  let flags = su(d + TX_FLAGS);
  let m = d + TX_M;
  let tu = sf(m) * u + sf(m + 1u) * v + sf(m + 2u);
  let tv = sf(m + 3u) * u + sf(m + 4u) * v + sf(m + 5u);
  let wrapS = (flags >> TXF_WRAP_S_SHIFT) & 3u;
  let wrapT = (flags >> TXF_WRAP_T_SHIFT) & 3u;
  let fy = select(1.0 - tv, tv, (flags & TXF_FLIP_Y) != 0u);
  let x = tu * f32(width) - 0.5;
  let y = fy * f32(height) - 0.5;
  let w = i32(width);
  let h = i32(height);
  if ((flags & TXF_NEAREST) != 0u) {
    return fetch_texel(offset, width, flags, wrap_index(i32(floor(x + 0.5)), w, wrapS), wrap_index(i32(floor(y + 0.5)), h, wrapT));
  }
  let x0 = floor(x);
  let y0 = floor(y);
  let ax = x - x0;
  let ay = y - y0;
  let ix0 = wrap_index(i32(x0), w, wrapS);
  let ix1 = wrap_index(i32(x0) + 1, w, wrapS);
  let iy0 = wrap_index(i32(y0), h, wrapT);
  let iy1 = wrap_index(i32(y0) + 1, h, wrapT);
  return fetch_texel(offset, width, flags, ix0, iy0) * ((1.0 - ax) * (1.0 - ay))
       + fetch_texel(offset, width, flags, ix1, iy0) * (ax * (1.0 - ay))
       + fetch_texel(offset, width, flags, ix0, iy1) * ((1.0 - ax) * ay)
       + fetch_texel(offset, width, flags, ix1, iy1) * (ax * ay);
}
fn direction_to_equirect(d: vec3<f32>, rotation: f32) -> vec2<f32> {
  var x = d.x;
  var z = d.z;
  if (rotation != 0.0) {
    let c = cos(rotation);
    let s = sin(rotation);
    x = c * d.x + s * d.z;
    z = -s * d.x + c * d.z;
  }
  let len = length(vec3<f32>(x, d.y, z));
  return vec2<f32>(atan2(z, x) * INV_2PI + 0.5, asin(clamp(d.y / max(len, 1e-30), -1.0, 1.0)) * INV_PI + 0.5);
}
fn equirect_to_direction(u: f32, v: f32, rotation: f32) -> vec3<f32> {
  let phi = (u - 0.5) * 2.0 * PI;
  let lat = (v - 0.5) * PI;
  let r = cos(lat);
  var x = r * cos(phi);
  let y = sin(lat);
  var z = r * sin(phi);
  if (rotation != 0.0) {
    let c = cos(rotation);
    let s = sin(rotation);
    let rx = c * x - s * z;
    let rz = s * x + c * z;
    x = rx;
    z = rz;
  }
  return vec3<f32>(x, y, z);
}

fn sample_uniform_disk(r: vec2<f32>) -> vec2<f32> {
  let a = 2.0 * r.x - 1.0;
  let b = 2.0 * r.y - 1.0;
  if (a == 0.0 && b == 0.0) { return vec2<f32>(0.0); }
  var rr: f32;
  var phi: f32;
  if (a * a > b * b) { rr = a; phi = (PI / 4.0) * (b / a); }
  else { rr = b; phi = PI / 2.0 - (PI / 4.0) * (a / b); }
  return vec2<f32>(rr * cos(phi), rr * sin(phi));
}
fn power_heuristic(a: f32, b: f32) -> f32 { return (a * a) / (a * a + b * b); }
`;
  }
});

// src/gpu/wgsl/bsdf.ts
var WGSL_BSDF;
var init_bsdf2 = __esm({
  "src/gpu/wgsl/bsdf.ts"() {
    "use strict";
    WGSL_BSDF = /* wgsl */
    `
const CLOSURE_NONE: u32 = 0u;
const CLOSURE_DIFFUSE: u32 = 1u;
const CLOSURE_GGX: u32 = 2u;
const CLOSURE_GGX_REFRACTION: u32 = 3u;
const CLOSURE_GGX_GLASS: u32 = 4u;
const CLOSURE_TRANSPARENT: u32 = 5u;
const CLOSURE_SHEEN: u32 = 6u;

const LABEL_NONE: u32 = 0u;
const LABEL_TRANSMIT: u32 = 1u;
const LABEL_REFLECT: u32 = 2u;
const LABEL_DIFFUSE: u32 = 4u;
const LABEL_GLOSSY: u32 = 8u;
const LABEL_SINGULAR: u32 = 16u;
const LABEL_TRANSPARENT: u32 = 32u;

const FRESNEL_NONE: u32 = 0u;
const FRESNEL_DIELECTRIC: u32 = 1u;
const FRESNEL_GENERALIZED_SCHLICK: u32 = 4u;
const FRESNEL_F82_TINT: u32 = 5u;

const SR_BSDF: u32 = 1u;
const SR_BSDF_HAS_EVAL: u32 = 2u;
const SR_BSDF_HAS_TRANSMISSION: u32 = 4u;
const SR_EMISSION: u32 = 8u;
const SR_TRANSPARENT: u32 = 16u;
const SR_BACKFACING: u32 = 32u;
const CLOSURE_WEIGHT_CUTOFF: f32 = 1e-5;

struct Closure {
  ctype: u32, fresnel: u32, pad0: u32, pad1: u32,
  w: vec3<f32>, sampleWeight: f32,
  N: vec3<f32>, alpha: f32,
  f0: vec3<f32>, ior: f32,
  f90: vec3<f32>, exponent: f32,
  tintR: vec3<f32>, energyScale: f32,
  tintT: vec3<f32>, pad2: f32,
  b: vec3<f32>, pad3: f32,
  // Tangent of anisotropic GGX, or the sheen frame's T; alpha is alpha_x (sheen: LTC A) and alphaY alpha_y (sheen: LTC B).
  T: vec3<f32>, alphaY: f32,
};

var<private> cls: array<Closure, 8>;
var<private> numClosure: u32;

fn closure_is_bsdf(t: u32) -> bool { return t >= CLOSURE_DIFFUSE && t <= CLOSURE_SHEEN; }
fn closure_is_microfacet(t: u32) -> bool { return t >= CLOSURE_GGX && t <= CLOSURE_GGX_GLASS; }

fn F0_from_ior(ior: f32) -> f32 { return sqr((ior - 1.0) / (ior + 1.0)); }
fn ior_from_F0(f0: f32) -> f32 { let s = sqrt(clamp(f0, 0.0, 0.99)); return (1.0 + s) / (1.0 - s); }

struct Fres { F: f32, cosT: f32 };
fn fresnel_dielectric(cos_i_in: f32, eta: f32) -> Fres {
  let eta_cos_t_sq = eta * eta - (1.0 - cos_i_in * cos_i_in);
  if (eta_cos_t_sq <= 0.0) { return Fres(1.0, 0.0); }
  let cos_i = abs(cos_i_in);
  let cos_t = -safe_sqrt(eta_cos_t_sq) / eta;
  let rs = (cos_i + eta * cos_t) / (cos_i - eta * cos_t);
  let rp = (cos_t + eta * cos_i) / (eta * cos_i - cos_t);
  return Fres(0.5 * (rs * rs + rp * rp), cos_t);
}
fn fresnel_dielectric_Fss(eta: f32) -> f32 {
  if (eta < 1.0) { return 0.997118 + eta * (0.1014 - eta * (0.965241 + eta * 0.130607)); }
  return (eta - 1.0) / (4.08567 + 1.00071 * eta);
}
fn fresnel_f82(cosi: f32, F0: vec3<f32>, B: vec3<f32>) -> vec3<f32> {
  let s = saturate1(1.0 - cosi);
  let s5 = sqr(sqr(s)) * s;
  let fs = mix(F0, vec3<f32>(1.0), s5);
  return clamp(fs - B * cosi * s5 * s, vec3<f32>(0.0), vec3<f32>(1.0));
}
fn fresnel_f82tint_B(F0: vec3<f32>, tint: vec3<f32>) -> vec3<f32> {
  let f = 6.0 / 7.0;
  let f5 = sqr(sqr(f)) * f;
  let fs = mix(F0, vec3<f32>(1.0), f5);
  return fs * (7.0 / (f5 * f)) * (vec3<f32>(1.0) - tint);
}
fn fresnel_f82_Fss(F0: vec3<f32>, B: vec3<f32>) -> vec3<f32> {
  return mix(F0, vec3<f32>(1.0), 1.0 / 21.0) - B * (1.0 / 126.0);
}

fn ensure_valid_specular_reflection(Ng: vec3<f32>, I: vec3<f32>, N: vec3<f32>) -> vec3<f32> {
  let R = 2.0 * dot(N, I) * N - I;
  let Iz = dot(I, Ng);
  let threshold = min(0.9 * Iz, 0.01);
  if (dot(Ng, R) >= threshold) { return N; }
  var X = N - dot(N, Ng) * Ng;
  let l = length(X);
  X = select(N, X / l, l > 0.0);
  let Ix = dot(I, X);
  let a = sqr(Ix) + sqr(Iz);
  let b = 2.0 * (a + Iz * threshold);
  let c = sqr(threshold + Iz);
  let Nz2 = select(0.25 * (b - safe_sqrt(sqr(b) - 4.0 * a * c)) / a, 0.25 * (b + safe_sqrt(sqr(b) - 4.0 * a * c)) / a, Ix < 0.0);
  return safe_sqrt(1.0 - Nz2) * X + safe_sqrt(Nz2) * Ng;
}

struct Coeff { R: vec3<f32>, T: vec3<f32>, cosT: f32 };

fn microfacet_fresnel(i: u32, cos_i: f32) -> Coeff {
  let c = cls[i];
  let has_reflection = c.ctype != CLOSURE_GGX_REFRACTION;
  let has_transmission = c.ctype == CLOSURE_GGX_GLASS || !has_reflection;
  var R = select(vec3<f32>(0.0), vec3<f32>(1.0), has_reflection);
  var T = select(vec3<f32>(0.0), vec3<f32>(1.0), has_transmission);
  var cosT = 0.0;
  if (c.fresnel == FRESNEL_F82_TINT) {
    if (!has_reflection) { return Coeff(vec3<f32>(0.0), vec3<f32>(0.0), 0.0); }
    R = fresnel_f82(cos_i, c.f0, c.b);
  } else if (c.fresnel == FRESNEL_GENERALIZED_SCHLICK) {
    var F: vec3<f32>;
    if (c.exponent < 0.0) {
      let fr = fresnel_dielectric(cos_i, c.ior);
      cosT = fr.cosT;
      let s = saturate1(inverse_lerp(F0_from_ior(c.ior), 1.0, fr.F));
      F = mix(c.f0, c.f90, s);
    } else {
      let cos_t_sq = 1.0 - (1.0 - sqr(cos_i)) / sqr(c.ior);
      if (cos_t_sq <= 0.0) { return Coeff(R * c.tintR, vec3<f32>(0.0), 0.0); }
      cosT = sqrt(cos_t_sq);
      let angle = select(cos_i, cosT, c.ior < 1.0);
      F = mix(c.f0, c.f90, pow(1.0 - angle, c.exponent));
    }
    R = R * c.tintR * F;
    T = T * c.tintT * (vec3<f32>(1.0) - F);
  } else if (c.fresnel == FRESNEL_NONE) {
    if (has_transmission) {
      let fr = fresnel_dielectric(cos_i, c.ior);
      cosT = fr.cosT;
      if (fr.F == 1.0) { T = vec3<f32>(0.0); }
    }
  } else {
    let fr = fresnel_dielectric(cos_i, c.ior);
    cosT = fr.cosT;
    R = R * fr.F;
    T = T * (1.0 - fr.F);
  }
  return Coeff(R, T, cosT);
}

fn ggx_lambda(alpha2: f32, cosN: f32) -> f32 {
  return 0.5 * (sqrt(1.0 + alpha2 * max(1.0 / sqr(cosN) - 1.0, 0.0)) - 1.0);
}
fn ggx_D(alpha2: f32, cosNH: f32) -> f32 {
  let c2 = min(sqr(cosNH), 1.0);
  return alpha2 / (PI * sqr(1.0 - c2 + alpha2 * c2));
}
fn almost_specular(ax: f32, ay: f32) -> bool { return ax * ay <= 2e-10; }
fn ggx_aniso_D(ax: f32, ay: f32, h: vec3<f32>) -> f32 {
  let H = vec3<f32>(h.x / ax, h.y / ay, h.z);
  return INV_PI / (ax * ay * sqr(dot(H, H)));
}
fn ggx_aniso_lambda(ax: f32, ay: f32, v: vec3<f32>) -> f32 {
  return 0.5 * (sqrt(1.0 + (sqr(ax * v.x) + sqr(ay * v.y)) / sqr(v.z)) - 1.0);
}
// make_orthonormals_tangent(N, T): (X, Y) with Y = normalize(cross(N, T)), X = cross(Y, N).
fn make_orthonormals_tangent(N: vec3<f32>, T: vec3<f32>) -> mat2x3<f32> {
  let Y = normalize(cross(N, T));
  return mat2x3<f32>(cross(Y, N), Y);
}

fn ggx_sample_vndf(wi: vec3<f32>, ax: f32, ay: f32, r: vec2<f32>) -> vec3<f32> {
  let wi_ = normalize(vec3<f32>(ax * wi.x, ay * wi.y, wi.z));
  let lensq = wi_.x * wi_.x + wi_.y * wi_.y;
  var T1: vec3<f32>;
  var T2: vec3<f32>;
  if (lensq > 1e-7) {
    T1 = vec3<f32>(-wi_.y, wi_.x, 0.0) * inverseSqrt(lensq);
    T2 = cross(wi_, T1);
  } else {
    T1 = vec3<f32>(1.0, 0.0, 0.0);
    T2 = vec3<f32>(0.0, 1.0, 0.0);
  }
  var t = sample_uniform_disk(r);
  t.y = mix(safe_sqrt(1.0 - sqr(t.x)), t.y, 0.5 * (1.0 + wi_.z));
  let H_ = t.x * T1 + t.y * T2 + safe_sqrt(1.0 - dot(t, t)) * wi_;
  return normalize(vec3<f32>(ax * H_.x, ay * H_.y, max(0.0, H_.z)));
}

fn rough_index(i: u32) -> f32 {
  let ax = cls[i].alpha;
  let ay = cls[i].alphaY;
  if (ax == ay) { return sqrt(ax); }
  return sqrt(sqrt(ax * ay));
}
fn ior_z_index(ior: f32) -> f32 { return sqrt(abs((ior - 1.0) / (ior + 1.0))); }

fn microfacet_preserve_energy(i: u32, wi: vec3<f32>, Fss: vec3<f32>) {
  let c = cls[i];
  let y = safe_sqrt(dot(wi, c.N));
  let rough = rough_index(i);
  var E = 1.0;
  var Eavg = 1.0;
  if (c.ctype == CLOSURE_GGX) {
    E = lut2(rough, y, hdr(H_TABLE_GGX_E), 32u, 32u);
    Eavg = lut1(rough, hdr(H_TABLE_GGX_EAVG), 32u);
  } else if (c.ctype == CLOSURE_GGX_GLASS) {
    var ofs = hdr(H_TABLE_GGX_GLASS_E);
    var avg = hdr(H_TABLE_GGX_GLASS_EAVG);
    var ior = c.ior;
    if (ior < 1.0) { ior = 1.0 / ior; ofs = hdr(H_TABLE_GGX_GLASS_INV_E); avg = hdr(H_TABLE_GGX_GLASS_INV_EAVG); }
    let z = ior_z_index(ior);
    E = lut3(rough, y, z, ofs, 32u, 32u, 32u);
    Eavg = lut2(rough, z, avg, 32u, 32u);
  }
  let missing = (1.0 - E) / E;
  cls[i].energyScale = 1.0 + missing;
  if (!(Fss.x == 1.0 && Fss.y == 1.0 && Fss.z == 1.0)) {
    let Fms = Fss * Eavg / (vec3<f32>(1.0) - Fss * (1.0 - Eavg));
    let darkening = (vec3<f32>(1.0) + Fms * missing) / cls[i].energyScale;
    cls[i].w = cls[i].w * darkening;
    cls[i].sampleWeight = cls[i].sampleWeight * avg3(darkening);
  }
}

fn microfacet_estimate_albedo(i: u32, wi: vec3<f32>, eval_r: bool, eval_t: bool) -> vec3<f32> {
  let c = cls[i];
  let cosNI = dot(wi, c.N);
  var R = select(vec3<f32>(0.0), vec3<f32>(1.0), eval_r);
  var T = select(vec3<f32>(0.0), vec3<f32>(1.0), eval_t);
  if (c.fresnel == FRESNEL_GENERALIZED_SCHLICK) {
    let rough = rough_index(i);
    var s: f32;
    if (c.exponent < 0.0) {
      s = lut3(rough, safe_sqrt(cosNI), ior_z_index(c.ior), hdr(H_TABLE_GGX_GEN_SCHLICK_IOR_S), 32u, 32u, 32u);
    } else {
      s = lut3(rough, safe_sqrt(cosNI), 1.0 / (0.2 * c.exponent + 1.0), hdr(H_TABLE_GGX_GEN_SCHLICK_S), 32u, 32u, 32u);
    }
    let F = mix(c.f0, c.f90, s);
    return R * c.tintR * F + T * c.tintT * (vec3<f32>(1.0) - F);
  }
  if (c.fresnel == FRESNEL_F82_TINT) {
    let s = lut3(rough_index(i), safe_sqrt(cosNI), 0.5, hdr(H_TABLE_GGX_GEN_SCHLICK_S), 32u, 32u, 32u);
    return mix(c.f0, vec3<f32>(1.0), s) * select(0.0, 1.0, eval_r);
  }
  if (c.fresnel == FRESNEL_DIELECTRIC && c.ior > 1.0) {
    let s = lut3(rough_index(i), safe_sqrt(cosNI), ior_z_index(c.ior), hdr(H_TABLE_GGX_GEN_SCHLICK_IOR_S), 32u, 32u, 32u);
    let F = mix(F0_from_ior(c.ior), 1.0, s);
    R = R * F;
    T = T * (1.0 - F);
    if (c.ctype == CLOSURE_GGX_GLASS) { return R + T; }
    return R;
  }
  let co = microfacet_fresnel(i, cosNI);
  return R * co.R + T * co.T;
}

fn setup_fresnel_generalized_schlick(i: u32, wi: vec3<f32>, preserve: bool) {
  cls[i].f0 = clamp(cls[i].f0, vec3<f32>(0.0), vec3<f32>(1.0));
  cls[i].fresnel = FRESNEL_GENERALIZED_SCHLICK;
  let alb = microfacet_estimate_albedo(i, wi, true, true);
  cls[i].sampleWeight = cls[i].sampleWeight * avg3(alb);
  if (preserve) {
    let c = cls[i];
    var Fss: vec3<f32>;
    if (is_zero3(c.tintT)) {
      var s: f32;
      if (c.exponent < 0.0) { s = saturate1(inverse_lerp(F0_from_ior(c.ior), 1.0, fresnel_dielectric_Fss(c.ior))); }
      else { s = 2.0 / ((c.exponent + 3.0) * c.exponent + 2.0); }
      Fss = c.tintR * mix(c.f0, c.f90, s);
    } else {
      Fss = c.tintT;
    }
    microfacet_preserve_energy(i, wi, Fss);
  }
}

fn setup_fresnel_f82_tint(i: u32, wi: vec3<f32>, tint: vec3<f32>) {
  if (tint.x == 1.0 && tint.y == 1.0 && tint.z == 1.0) { cls[i].b = vec3<f32>(0.0); }
  else { cls[i].b = fresnel_f82tint_B(cls[i].f0, tint); }
  cls[i].fresnel = FRESNEL_F82_TINT;
  let alb = microfacet_estimate_albedo(i, wi, true, true);
  cls[i].sampleWeight = cls[i].sampleWeight * avg3(alb);
  microfacet_preserve_energy(i, wi, fresnel_f82_Fss(cls[i].f0, cls[i].b));
}

fn setup_fresnel_dielectric(i: u32, wi: vec3<f32>) {
  cls[i].fresnel = FRESNEL_DIELECTRIC;
  let alb = microfacet_estimate_albedo(i, wi, true, true);
  cls[i].sampleWeight = cls[i].sampleWeight * avg3(alb);
  microfacet_preserve_energy(i, wi, vec3<f32>(fresnel_dielectric_Fss(cls[i].ior)));
}

// Cycles bsdf_sheen_setup on an allocated closure; returns the layering albedo (0 when the LTC is invalid and the closure is disabled).
fn setup_sheen(i: u32, wi: vec3<f32>, roughness: f32) -> f32 {
  cls[i].ctype = CLOSURE_SHEEN;
  let r = clamp(roughness, 1e-3, 1.0);
  let N = cls[i].N;
  let b = safe_normalize(cross(N, wi));
  if (dot(b, b) < 0.99) { cls[i].T = make_orthonormals(N)[0]; }
  else { cls[i].T = cross(b, N); }
  let cosNI = dot(N, wi);
  let ofs = hdr(H_TABLE_SHEEN_LTC);
  let a = lut2(cosNI, r, ofs, 32u, 32u);
  let bb = lut2(cosNI, r, ofs + 1024u, 32u, 32u);
  let albedo = lut2(cosNI, r, ofs + 2048u, 32u, 32u);
  if (abs(a) < 1e-5 || albedo < 1e-5) {
    cls[i].ctype = CLOSURE_NONE;
    cls[i].sampleWeight = 0.0;
    return 0.0;
  }
  cls[i].alpha = a;
  cls[i].alphaY = bb;
  cls[i].w = cls[i].w * albedo;
  cls[i].sampleWeight = cls[i].sampleWeight * albedo;
  return max3(cls[i].w);
}

fn sheen_value(i: u32, lo: vec3<f32>) -> f32 {
  let a = cls[i].alpha;
  let b = cls[i].alphaY;
  let lenSqr = sqr(a * lo.x + b * lo.z) + sqr(a * lo.y) + sqr(lo.z);
  return INV_PI * max(lo.z, 0.0) * sqr(a / lenSqr);
}

fn closure_layer_albedo(i: u32, wi: vec3<f32>) -> vec3<f32> {
  var m = 1.0;
  if (closure_is_microfacet(cls[i].ctype)) { m = max3(microfacet_estimate_albedo(i, wi, true, false)); }
  return cls[i].w * m;
}

struct Eval { f: vec3<f32>, pdf: f32 };

fn microfacet_eval(i: u32, wi: vec3<f32>, wo: vec3<f32>) -> Eval {
  let c = cls[i];
  let has_reflection = c.ctype != CLOSURE_GGX_REFRACTION;
  let has_transmission = c.ctype == CLOSURE_GGX_GLASS || !has_reflection;
  let cosNI = dot(c.N, wi);
  let cosNO = dot(c.N, wo);
  let is_t = cosNO < 0.0;
  if (cosNI <= 0.0 || almost_specular(c.alpha, c.alphaY) || (is_t && !has_transmission) || (!is_t && !has_reflection)) { return Eval(vec3<f32>(0.0), 0.0); }
  var H = select(wi + wo, -(c.ior * wo + wi), is_t);
  let lenH = length(H);
  let invLenH = select(0.0, 1.0 / lenH, lenH != 0.0);
  H = H * invLenH;
  let cosHI = dot(H, wi);
  let co = microfacet_fresnel(i, cosHI);
  if (is_zero3(co.R) && is_zero3(co.T)) { return Eval(vec3<f32>(0.0), 0.0); }
  var D: f32;
  var lI: f32;
  var lO: f32;
  if (c.alpha == c.alphaY) {
    let alpha2 = c.alpha * c.alphaY;
    D = ggx_D(alpha2, dot(c.N, H));
    lI = ggx_lambda(alpha2, cosNI);
    lO = ggx_lambda(alpha2, cosNO);
  } else {
    let tb = make_orthonormals_tangent(c.N, c.T);
    D = ggx_aniso_D(c.alpha, c.alphaY, vec3<f32>(dot(tb[0], H), dot(tb[1], H), dot(c.N, H)));
    lI = ggx_aniso_lambda(c.alpha, c.alphaY, vec3<f32>(dot(tb[0], wi), dot(tb[1], wi), cosNI));
    lO = ggx_aniso_lambda(c.alpha, c.alphaY, vec3<f32>(dot(tb[0], wo), dot(tb[1], wo), cosNO));
  }
  let cmn = D / cosNI * select(0.25, sqr(c.ior * invLenH) * abs(cosHI * dot(H, wo)), is_t);
  let pdf_reflect = avg3(co.R) / avg3(co.R + co.T);
  let lobe = select(pdf_reflect, 1.0 - pdf_reflect, is_t);
  let f = cmn / (1.0 + lO + lI);
  return Eval(select(co.R, co.T, is_t) * f * c.energyScale, cmn * lobe / (1.0 + lI));
}

struct Sample { f: vec3<f32>, pdf: f32, wo: vec3<f32>, label: u32 };

fn microfacet_sample(i: u32, Ng: vec3<f32>, wi: vec3<f32>, r: vec3<f32>) -> Sample {
  let c = cls[i];
  let N = c.N;
  let none = Sample(vec3<f32>(0.0), 0.0, vec3<f32>(0.0), LABEL_NONE);
  let cosNI = dot(N, wi);
  if (cosNI <= 0.0) { return none; }
  let inv_eta = select(0.0, 1.0 / c.ior, c.ior != 0.0);
  let iso = c.alpha == c.alphaY;
  var singular = almost_specular(c.alpha, c.alphaY);
  var H = N;
  var lH = vec3<f32>(0.0, 0.0, 1.0);
  var lI = vec3<f32>(0.0, 0.0, cosNI);
  var tb = mat2x3<f32>(vec3<f32>(0.0), vec3<f32>(0.0));
  if (!singular) {
    if (iso) { tb = make_orthonormals(N); } else { tb = make_orthonormals_tangent(N, c.T); }
    lI = vec3<f32>(dot(tb[0], wi), dot(tb[1], wi), cosNI);
    lH = ggx_sample_vndf(lI, c.alpha, c.alphaY, r.xy);
    H = lH.x * tb[0] + lH.y * tb[1] + lH.z * N;
  }
  let cosHI = dot(H, wi);
  let co = microfacet_fresnel(i, cosHI);
  let cosHO = co.cosT;
  if (is_zero3(co.R) && is_zero3(co.T)) { return none; }
  let pdf_reflect = avg3(co.R) / avg3(co.R + co.T);
  let refract = r.z >= pdf_reflect;
  var wo: vec3<f32>;
  if (refract) { wo = (inv_eta * cosHI + cosHO) * H - inv_eta * wi; }
  else { wo = 2.0 * cosHI * H - wi; }
  let cosNO = dot(N, wo);
  if ((dot(Ng, wo) < 0.0) != refract || (cosNO < 0.0) != refract) { return none; }
  var f: vec3<f32>;
  var pdf: f32;
  if (refract) { f = co.T; pdf = 1.0 - pdf_reflect; singular = singular || abs(c.ior - 1.0) < 1e-4; }
  else { f = co.R; pdf = pdf_reflect; }
  if (singular) {
    pdf = pdf * 1e6;
    f = f * 1e6;
  } else {
    var D: f32;
    var lamO: f32;
    var lamI: f32;
    if (iso) {
      let alpha2 = c.alpha * c.alphaY;
      D = ggx_D(alpha2, lH.z);
      lamO = ggx_lambda(alpha2, cosNO);
      lamI = ggx_lambda(alpha2, cosNI);
    } else {
      D = ggx_aniso_D(c.alpha, c.alphaY, lH);
      lamO = ggx_aniso_lambda(c.alpha, c.alphaY, vec3<f32>(dot(tb[0], wo), dot(tb[1], wo), cosNO));
      lamI = ggx_aniso_lambda(c.alpha, c.alphaY, lI);
    }
    let cmn = D / cosNI * select(0.25, abs(cosHI * cosHO) / sqr(cosHO + cosHI * inv_eta), refract);
    pdf = pdf * cmn / (1.0 + lamI);
    f = f * cmn / (1.0 + lamI + lamO);
  }
  var label = select(LABEL_REFLECT, LABEL_TRANSMIT, refract);
  label = label | select(LABEL_GLOSSY, LABEL_SINGULAR, singular);
  return Sample(f * c.energyScale, pdf, wo, label);
}

fn bsdf_eval(i: u32, wi: vec3<f32>, wo: vec3<f32>) -> Eval {
  let t = cls[i].ctype;
  if (t == CLOSURE_DIFFUSE) {
    let cosNO = max(dot(cls[i].N, wo), 0.0) * INV_PI;
    return Eval(vec3<f32>(cosNO), cosNO);
  }
  if (closure_is_microfacet(t)) { return microfacet_eval(i, wi, wo); }
  if (t == CLOSURE_SHEEN) {
    let N = cls[i].N;
    let T = cls[i].T;
    let v = sheen_value(i, vec3<f32>(dot(wo, T), dot(wo, cross(N, T)), dot(wo, N)));
    return Eval(vec3<f32>(v), v);
  }
  return Eval(vec3<f32>(0.0), 0.0);
}

fn bsdf_sample(i: u32, Ng: vec3<f32>, wi: vec3<f32>, r: vec3<f32>) -> Sample {
  let t = cls[i].ctype;
  if (t == CLOSURE_DIFFUSE) {
    let N = cls[i].N;
    let d = sample_uniform_disk(r.xy);
    let cosT = safe_sqrt(1.0 - dot(d, d));
    let tb = make_orthonormals(N);
    let wo = d.x * tb[0] + d.y * tb[1] + cosT * N;
    let pdf = cosT * INV_PI;
    if (dot(Ng, wo) > 0.0) { return Sample(vec3<f32>(pdf), pdf, wo, LABEL_REFLECT | LABEL_DIFFUSE); }
    return Sample(vec3<f32>(0.0), 0.0, wo, LABEL_REFLECT | LABEL_DIFFUSE);
  }
  if (closure_is_microfacet(t)) { return microfacet_sample(i, Ng, wi, r); }
  if (t == CLOSURE_SHEEN) {
    let N = cls[i].N;
    let T = cls[i].T;
    let B = cross(N, T);
    let a = cls[i].alpha;
    let b = cls[i].alphaY;
    let d = sample_uniform_disk(r.xy);
    let dz = safe_sqrt(1.0 - dot(d, d));
    let lo = normalize(vec3<f32>(d.x - dz * b, d.y, dz * a));
    let wo = lo.x * T + lo.y * B + lo.z * N;
    if (dot(Ng, wo) <= 0.0) { return Sample(vec3<f32>(0.0), 0.0, wo, LABEL_REFLECT | LABEL_DIFFUSE); }
    let v = sheen_value(i, lo);
    return Sample(vec3<f32>(v), v, wo, LABEL_REFLECT | LABEL_DIFFUSE);
  }
  if (t == CLOSURE_TRANSPARENT) { return Sample(vec3<f32>(1.0), 1.0, -wi, LABEL_TRANSMIT | LABEL_TRANSPARENT); }
  return Sample(vec3<f32>(0.0), 0.0, vec3<f32>(0.0), LABEL_NONE);
}
`;
  }
});

// src/gpu/wgsl/light.ts
var WGSL_LIGHT;
var init_light2 = __esm({
  "src/gpu/wgsl/light.ts"() {
    "use strict";
    WGSL_LIGHT = /* wgsl */
    `
const LIGHT_TRIANGLE: u32 = 5u;

struct LightSample {
  P: vec3<f32>, t: f32,
  Ng: vec3<f32>, pdf: f32,
  D: vec3<f32>, evalFac: f32,
  E: vec3<f32>, ltype: u32,
  lamp: u32, prim: u32, castShadow: u32, ok: u32,
};

fn ls_none() -> LightSample {
  return LightSample(vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0u, NONE, NONE, 1u, 0u);
}

fn sin_sqr_to_one_minus_cos(s_sq: f32) -> f32 { return select(0.5 * s_sq, 1.0 - safe_sqrt(1.0 - s_sq), s_sq > 0.0004); }
fn smoothstep01(x: f32) -> f32 { if (x <= 0.0) { return 0.0; } if (x >= 1.0) { return 1.0; } return (3.0 - 2.0 * x) * x * x; }

struct Cone { D: vec3<f32>, pdf: f32, cosT: f32 };
fn sample_uniform_cone(N: vec3<f32>, omc: f32, r: vec2<f32>) -> Cone {
  if (omc > 0.0) {
    let d = sample_uniform_disk(r);
    let r2 = dot(d, d);
    let cosT = 1.0 - r2 * omc;
    let xy = d * safe_sqrt(omc * (2.0 - omc * r2));
    let tb = make_orthonormals(N);
    return Cone(xy.x * tb[0] + xy.y * tb[1] + cosT * N, 1.0 / (2.0 * PI * omc), cosT);
  }
  return Cone(N, 1.0, 1.0);
}

fn ray_sphere_intersect(P: vec3<f32>, D: vec3<f32>, tmin: f32, tmax: f32, c: vec3<f32>, r: f32) -> f32 {
  let d = c - P;
  let d_sq = dot(d, d);
  let r_sq = r * r;
  let dct = dot(d, D);
  let h_sq = d_sq - dct * dct;
  if (d_sq > r_sq && (dct < 0.0 || h_sq > r_sq)) { return -1.0; }
  let toff = sqrt(max(r_sq - h_sq, 0.0));
  let t = dct - select(toff, -toff, d_sq < r_sq);
  if (t > tmin && t < tmax) { return t; }
  return -1.0;
}

fn world_shader() -> u32 { return hdr(H_SHADERS) + hdr(H_WORLD_SHADER) * SHADER_SIZE; }

fn background_eval(D: vec3<f32>) -> vec3<f32> {
  let sh = world_shader();
  var e = sv3(sh + SH_EMISSION);
  let tex = su(sh + SH_ENV_TEX);
  if (tex != NONE) {
    let uv = direction_to_equirect(D, sf(sh + SH_ENV_ROTATION));
    e = e * texture_lookup(tex, uv.x, uv.y).xyz;
  }
  return e;
}

fn background_map_sample(r: vec2<f32>) -> LightSample {
  var ls = ls_none();
  let resX = hdr(H_BG_RES_X);
  let resY = hdr(H_BG_RES_Y);
  let cdfWidth = resX + 1u;
  let marg = hdr(H_BG_MARGINAL);
  let cond = hdr(H_BG_CONDITIONAL);
  var first = 0u;
  var count = resY;
  loop {
    if (count == 0u) { break; }
    let step = count >> 1u;
    let middle = first + step;
    if (sf(marg + middle * 2u + 1u) < r.y) { first = middle + 1u; count -= step + 1u; } else { count = step; }
  }
  let iv = select(0u, first - 1u, first > 0u);
  let cdfVx = sf(marg + iv * 2u);
  let dv = inverse_lerp(sf(marg + iv * 2u + 1u), sf(marg + (iv + 1u) * 2u + 1u), r.y);
  let v = (f32(iv) + dv) / f32(resY);
  first = 0u;
  count = resX;
  let row = cond + iv * cdfWidth * 2u;
  loop {
    if (count == 0u) { break; }
    let step = count >> 1u;
    let middle = first + step;
    if (sf(row + middle * 2u + 1u) < r.x) { first = middle + 1u; count -= step + 1u; } else { count = step; }
  }
  let iu = select(0u, first - 1u, first > 0u);
  let cdfUx = sf(row + iu * 2u);
  let du = inverse_lerp(sf(row + iu * 2u + 1u), sf(row + (iu + 1u) * 2u + 1u), r.x);
  let u = (f32(iu) + du) / f32(resX);
  let sinT = sin(PI * v);
  let denom = 2.0 * PI * PI * sinT * sf(row + resX * 2u) * sf(marg + resY * 2u);
  ls.pdf = select((cdfUx * cdfVx) / denom, 0.0, sinT == 0.0 || denom == 0.0);
  ls.D = equirect_to_direction(u, 1.0 - v, sf(world_shader() + SH_ENV_ROTATION));
  return ls;
}

fn background_light_pdf(D: vec3<f32>) -> f32 {
  let resX = hdr(H_BG_RES_X);
  let resY = hdr(H_BG_RES_Y);
  if (resX == 0u) { return 1.0 / (4.0 * PI); }
  let uv = direction_to_equirect(D, sf(world_shader() + SH_ENV_ROTATION));
  let v = 1.0 - uv.y;
  let sinT = sin(v * PI);
  if (sinT == 0.0) { return 0.0; }
  let iu = u32(clamp(i32(uv.x * f32(resX)), 0, i32(resX) - 1));
  let iv = u32(clamp(i32(v * f32(resY)), 0, i32(resY) - 1));
  let row = hdr(H_BG_CONDITIONAL) + iv * (resX + 1u) * 2u;
  let denom = 2.0 * PI * PI * sinT * sf(row + resX * 2u) * sf(hdr(H_BG_MARGINAL) + resY * 2u);
  if (denom == 0.0) { return 0.0; }
  return sf(row + iu * 2u) * sf(hdr(H_BG_MARGINAL) + iv * 2u) / denom;
}

struct RectSample { P: vec3<f32>, pdf: f32 };
fn area_light_rect_sample(P: vec3<f32>, lightP: vec3<f32>, x: vec3<f32>, lenU: f32, y: vec3<f32>, lenV: f32, r: vec2<f32>, sample_coord: bool) -> RectSample {
  var z = cross(x, y);
  let dir = lightP - P;
  var z0 = dot(dir, z);
  if (z0 > 0.0) { z = -z; z0 = -z0; }
  let xc = dot(dir, x);
  let yc = dot(dir, y);
  let x0 = xc - 0.5 * lenU;
  let x1 = xc + 0.5 * lenU;
  let y0 = yc - 0.5 * lenV;
  let y1 = yc + 0.5 * lenV;
  var nz = vec4<f32>(-y0, x1, y1, -x0);
  nz = nz / sqrt(nz * nz + vec4<f32>(z0 * z0));
  let g0 = asin(clamp(-nz.x * nz.y, -1.0, 1.0));
  let g1 = asin(clamp(-nz.y * nz.z, -1.0, 1.0));
  let g2 = asin(clamp(-nz.z * nz.w, -1.0, 1.0));
  let g3 = asin(clamp(-nz.w * nz.x, -1.0, 1.0));
  let S = -(g0 + g1 + g2 + g3);
  var outP = lightP;
  if (sample_coord) {
    let b0 = nz.x;
    let b1 = nz.z;
    let au = r.x * S + g2 + g3;
    let sau = sin(au);
    let fu = select(0.0, (cos(au) * b0 + b1) / sau, sau != 0.0);
    var cu = select(-1.0, 1.0, fu >= 0.0) / sqrt(fu * fu + b0 * b0);
    cu = clamp(cu, -1.0, 1.0);
    var xu = -(cu * z0) / max(sqrt(1.0 - cu * cu), 1e-7);
    xu = clamp(xu, x0, x1);
    let d2 = sqr(xu) + sqr(z0);
    let h0 = y0 / sqrt(d2 + sqr(y0));
    let h1 = y1 / sqrt(d2 + sqr(y1));
    let hv = h0 + r.y * (h1 - h0);
    let hv2 = hv * hv;
    let yv = select(y1, hv * sqrt(d2 / (1.0 - hv2)), hv2 < 1.0 - 1e-6);
    outP = P + xu * x + yv * y + z0 * z;
  }
  let nz2 = nz * nz;
  if (S < 1e-5 || min(min(nz2.x, nz2.y), min(nz2.z, nz2.w)) > 0.99999) {
    let t = length(dir);
    let den = z0 * lenU * lenV;
    return RectSample(outP, select(0.0, -t * t * t / den, den != 0.0));
  }
  return RectSample(outP, 1.0 / S);
}

fn lamp_base(lamp: u32) -> u32 { return hdr(H_LIGHTS) + lamp * LIGHT_SIZE; }

fn lamp_sample(lamp: u32, r: vec2<f32>, P: vec3<f32>, N: vec3<f32>, has_transmission: bool) -> LightSample {
  var ls = ls_none();
  let L = lamp_base(lamp);
  let ltype = su(L + LT_TYPE);
  let flags = su(L + LT_FLAGS);
  ls.ltype = ltype;
  ls.lamp = lamp;
  ls.prim = NONE;
  ls.castShadow = select(0u, 1u, (flags & LF_CAST_SHADOW) != 0u);
  ls.E = sv3(L + LT_STRENGTH);
  if (ltype == LTY_SUN) {
    let c = sample_uniform_cone(sv3(L + LT_CO), sf(L + LT_SUN_ONE_MINUS_COSANGLE), r);
    ls.Ng = c.D;
    ls.pdf = c.pdf;
    ls.P = c.D;
    ls.D = -c.D;
    ls.t = FLT_MAX;
    ls.evalFac = sf(L + LT_EVAL_FAC);
    ls.ok = 1u;
    return ls;
  }
  if (ltype == LTY_BACKGROUND) {
    var b = background_map_sample(r);
    b.ltype = ltype; b.lamp = lamp; b.prim = NONE; b.castShadow = ls.castShadow;
    b.P = -b.D; b.Ng = b.P; b.t = FLT_MAX; b.evalFac = 1.0;
    b.E = background_eval(b.D);
    b.ok = select(0u, 1u, b.pdf > 0.0);
    return b;
  }
  if (ltype == LTY_POINT || ltype == LTY_SPOT) {
    let co = sv3(L + LT_CO);
    let radius = sf(L + LT_RADIUS);
    let r_sq = radius * radius;
    var ln = P - co;
    let d_sq = dot(ln, ln);
    let d = sqrt(d_sq);
    ln = ln / d;
    ls.evalFac = sf(L + LT_EVAL_FAC);
    let spotDir = sv3(L + LT_SPOT_DIR);
    if ((flags & LF_IS_SPHERE) != 0u) {
      var cosT: f32;
      var tSet = false;
      if (d_sq > r_sq) {
        let omc = sin_sqr_to_one_minus_cos(r_sq / d_sq);
        var sampled = false;
        if (ltype == LTY_SPOT) {
          let oms = 1.0 - sf(L + LT_COS_HALF_LARGER_SPREAD);
          if (!(omc < oms)) {
            let c = sample_uniform_cone(-spotDir, oms, r);
            ls.D = c.D;
            ls.pdf = c.pdf;
            cosT = c.cosT;
            let t = ray_sphere_intersect(P, ls.D, 0.0, FLT_MAX, co, radius);
            if (t < 0.0) { return ls; }
            ls.t = t;
            ls.P = P + ls.D * t;
            tSet = true;
            sampled = true;
          }
        }
        if (!sampled) {
          let c = sample_uniform_cone(-ln, omc, r);
          ls.D = c.D;
          ls.pdf = c.pdf;
          cosT = c.cosT;
        }
      } else {
        if (has_transmission) {
          let z = 1.0 - 2.0 * r.x;
          let rr = safe_sqrt(1.0 - z * z);
          let phi = 2.0 * PI * r.y;
          ls.D = vec3<f32>(rr * cos(phi), rr * sin(phi), z);
          ls.pdf = INV_2PI * 0.5;
        } else {
          let dd = sample_uniform_disk(r);
          let ct = safe_sqrt(1.0 - dot(dd, dd));
          let tb = make_orthonormals(N);
          ls.D = dd.x * tb[0] + dd.y * tb[1] + ct * N;
          ls.pdf = ct * INV_PI;
        }
        cosT = -dot(ls.D, ln);
      }
      if (ltype == LTY_SPOT && d_sq > r_sq) {
        ls.evalFac = ls.evalFac * smoothstep01((-dot(ls.D, spotDir) - sf(L + LT_COS_HALF_SPOT_ANGLE)) * sf(L + LT_SPOT_SMOOTH));
        if (ls.evalFac == 0.0) { return ls; }
      }
      if (!tSet) {
        let sgn = select(-1.0, 1.0, d_sq - r_sq >= 0.0);
        ls.t = d * cosT - sgn * safe_sqrt(r_sq - d_sq + d_sq * cosT * cosT);
        ls.P = P + ls.D * ls.t;
      }
      let ng = safe_normalize(ls.P - co);
      ls.Ng = ng;
      ls.P = co + ng * radius;
      ls.ok = 1u;
      return ls;
    }
    ls.P = co;
    let toL = co - P;
    let t = length(toL);
    ls.D = toL / t;
    ls.t = t;
    ls.Ng = -ls.D;
    if (ltype == LTY_SPOT) {
      ls.evalFac = ls.evalFac * smoothstep01((-dot(ls.D, spotDir) - sf(L + LT_COS_HALF_SPOT_ANGLE)) * sf(L + LT_SPOT_SMOOTH));
      if (ls.evalFac == 0.0) { return ls; }
    }
    ls.pdf = t * t;
    ls.ok = 1u;
    return ls;
  }
  if (ltype == LTY_AREA) {
    let co = sv3(L + LT_CO);
    let n = sv3(L + LT_AREA_DIR);
    ls.P = co;
    ls.Ng = n;
    if (dot(co - P, n) > 0.0) { return ls; }
    let ax = sv3(L + LT_AXIS_U);
    let ay = sv3(L + LT_AXIS_V);
    let lenU = sf(L + LT_LEN_U);
    let lenV = sf(L + LT_LEN_V);
    let inv = sf(L + LT_INVAREA);
    if (inv > 0.0) {
      let rs = area_light_rect_sample(P, co, ax, lenU, ay, lenV, r, true);
      ls.P = rs.P;
      ls.pdf = rs.pdf;
    } else {
      let d = sample_uniform_disk(r);
      ls.P = co + ax * (0.5 * lenU * d.x) + ay * (0.5 * lenV * d.y);
      ls.pdf = (4.0 / PI) / (lenU * lenV);
    }
    let toL = ls.P - P;
    let t = length(toL);
    ls.D = select(toL, toL / t, t > 0.0);
    ls.t = t;
    ls.evalFac = sf(L + LT_EVAL_FAC);
    if (inv < 0.0) {
      let cosPi = -dot(n, ls.D);
      if (cosPi <= 0.0) { return ls; }
      ls.pdf = ls.pdf * t * t / cosPi;
    }
    ls.ok = select(0u, 1u, ls.evalFac > 0.0 && ls.pdf > 0.0);
    return ls;
  }
  return ls;
}

fn tri_vert(prim: u32, k: u32) -> vec3<f32> { return sv3(hdr(H_TRI_VERTS) + prim * TRI_VERTS_SIZE + k * 4u); }

struct TriHit { ok: bool, u: f32, v: f32, t: f32 };
fn ray_triangle_intersect(P: vec3<f32>, D: vec3<f32>, tmin: f32, tmax: f32, a: vec3<f32>, b: vec3<f32>, c: vec3<f32>) -> TriHit {
  let v0 = a - P;
  let v1 = b - P;
  let v2 = c - P;
  let e0 = v2 - v0;
  let e1 = v0 - v1;
  let e2 = v1 - v2;
  let U = dot(cross(e0, v2 + v0), D);
  let V = dot(cross(e1, v0 + v1), D);
  let W = dot(cross(e2, v1 + v2), D);
  let UVW = U + V + W;
  let eps = 1.1920929e-7 * abs(UVW);
  let minUVW = min(U, min(V, W));
  let maxUVW = max(U, max(V, W));
  let miss = TriHit(false, 0.0, 0.0, 0.0);
  if (!(minUVW >= -eps || maxUVW <= eps)) { return miss; }
  let Ng = 2.0 * cross(e1, e0);
  let den = dot(Ng, D);
  if (den == 0.0) { return miss; }
  let t = dot(v0, Ng) / den;
  if (!(t >= tmin && t <= tmax)) { return miss; }
  let rcp = select(1.0 / UVW, 0.0, abs(UVW) < 1e-18);
  return TriHit(true, min(U * rcp, 1.0), min(V * rcp, 1.0), t);
}

fn triangle_light_sample(prim: u32, r: vec2<f32>, P: vec3<f32>) -> LightSample {
  var ls = ls_none();
  let V0 = tri_vert(prim, 0u);
  let V1 = tri_vert(prim, 1u);
  let V2 = tri_vert(prim, 2u);
  let e0 = V1 - V0;
  let e1 = V2 - V0;
  let e2 = V2 - V1;
  let longest = max(dot(e0, e0), max(dot(e1, e1), dot(e2, e2)));
  let N0 = cross(e0, e1);
  let nn = dot(N0, N0);
  let dist = dot(N0, V0 - P) / nn;
  let Nl = sqrt(nn);
  ls.Ng = N0 / Nl;
  let area = 0.5 * Nl;
  ls.evalFac = 1.0;
  ls.ltype = LIGHT_TRIANGLE;
  ls.prim = prim;
  ls.lamp = NONE;
  ls.castShadow = 1u;
  if (longest > dist * dist) {
    let A = safe_normalize(V0 - P);
    let B = safe_normalize(V1 - P);
    let C = safe_normalize(V2 - P);
    let cos_a = dot(B, C);
    let cos_b = dot(A, C);
    let cos_c = dot(A, B);
    let mixed = abs(dot(A, cross(B, C)));
    let solid = 2.0 * atan2(mixed, 1.0 + cos_a + cos_b + cos_c);
    let cos_alpha = dot(safe_normalize(cross(A, B)), safe_normalize(cross(A, C)));
    let sin_alpha = safe_sqrt(1.0 - cos_alpha * cos_alpha);
    let alpha = acos(clamp(cos_alpha, -1.0, 1.0));
    let Ahat = r.x * solid;
    let sp = sin(Ahat - alpha);
    let cp = cos(Ahat - alpha);
    let uu = cp - cos_alpha;
    let vv = sp + sin_alpha * cos_c;
    let num = (vv * cp - uu * sp) * cos_alpha - vv;
    let den = (vv * sp + uu * cp) * sin_alpha;
    let q = select(num / den, 1.0, den == 0.0);
    let Uv = safe_normalize(C - cos_b * A);
    let C_ = safe_normalize(q * A + safe_sqrt(1.0 - q * q) * Uv);
    let z = 1.0 - r.y * (1.0 - dot(C_, B));
    ls.D = z * B + safe_sqrt(1.0 - z * z) * safe_normalize(C_ - dot(C_, B) * B);
    let h = ray_triangle_intersect(P, ls.D, 0.0, FLT_MAX, V0, V1, V2);
    if (!h.ok || solid == 0.0) { return ls; }
    ls.t = h.t;
    ls.P = P + ls.D * h.t;
    ls.pdf = 1.0 / solid;
  } else {
    if (area == 0.0) { return ls; }
    var u = r.x;
    var v = r.y;
    if (v > u) { u = u * 0.5; v = v - u; } else { v = v * 0.5; u = u - v; }
    ls.P = (1.0 - u - v) * V0 + u * V1 + v * V2;
    let toL = ls.P - P;
    let len = length(toL);
    ls.D = toL / len;
    ls.t = len;
    let cosPi = abs(dot(ls.Ng, ls.D));
    if (cosPi == 0.0) { return ls; }
    ls.pdf = len * len / cosPi / area;
  }
  // The flat distribution's selection pdf; with the light tree the caller applies the tree's.
  if ((hdr(H_FLAGS) & SCF_USE_LIGHT_TREE) == 0u) { ls.pdf = ls.pdf * area * sf(H_PDF_TRIANGLES); }
  let sh = hdr(H_SHADERS) + su(hdr(H_TRI_INFO) + prim * TRI_INFO_SIZE + TI_SHADER) * SHADER_SIZE;
  ls.E = sv3(sh + SH_EMISSION);
  ls.ok = select(0u, 1u, ls.pdf > 0.0);
  return ls;
}

fn triangle_light_pdf(prim: u32, Ng: vec3<f32>, wi: vec3<f32>, P: vec3<f32>, t: f32) -> f32 {
  let V0 = tri_vert(prim, 0u);
  let V1 = tri_vert(prim, 1u);
  let V2 = tri_vert(prim, 2u);
  let e0 = V1 - V0;
  let e1 = V2 - V0;
  let e2 = V2 - V1;
  let longest = max(dot(e0, e0), max(dot(e1, e1), dot(e2, e2)));
  let N = cross(e0, e1);
  let nn = dot(N, N);
  let dist = abs(dot(N, wi * t)) / nn;
  let area = 0.5 * sqrt(nn);
  var pdf: f32;
  if (longest > dist * dist) {
    let Px = P + wi * t;
    let A = safe_normalize(V0 - Px);
    let B = safe_normalize(V1 - Px);
    let C = safe_normalize(V2 - Px);
    let solid = 2.0 * atan2(abs(dot(A, cross(B, C))), 1.0 + dot(B, C) + dot(A, C) + dot(A, B));
    if (solid == 0.0) { return 0.0; }
    pdf = 1.0 / solid;
  } else {
    if (area == 0.0) { return 0.0; }
    let cosPi = abs(dot(Ng, wi));
    if (cosPi == 0.0) { return 0.0; }
    pdf = t * t / cosPi / area;
  }
  if ((hdr(H_FLAGS) & SCF_USE_LIGHT_TREE) != 0u) { return pdf; }
  return pdf * area * sf(H_PDF_TRIANGLES);
}

fn light_sample_from_position(r: vec3<f32>, P: vec3<f32>, N: vec3<f32>, has_transmission: bool) -> LightSample {
  let n = hdr(H_NUM_DISTRIBUTION);
  if (n == 0u) { return ls_none(); }
  if (use_light_tree()) {
    let ts = light_tree_sample(r.z, P, N, has_transmission);
    if (!ts.ok) { return ls_none(); }
    let id = bitcast<i32>(su(lt_emitter(ts.emitter) + LTE_ID));
    var tls: LightSample;
    if (id >= 0) { tls = triangle_light_sample(u32(id), r.xy, P); }
    else { tls = lamp_sample(u32(~id), r.xy, P, N, has_transmission); }
    tls.pdf = tls.pdf * ts.pdf;
    if (!(tls.pdf > 0.0)) { tls.ok = 0u; }
    return tls;
  }
  let dist = hdr(H_DISTRIBUTION);
  var first = 0u;
  var len = n + 1u;
  loop {
    let half = len >> 1u;
    let middle = first + half;
    if (r.z < sf(dist + middle * DIST_SIZE)) { len = half; } else { first = middle + 1u; len = len - half - 1u; }
    if (len == 0u) { break; }
  }
  let index = u32(clamp(i32(first) - 1, 0, i32(n) - 1));
  let prim = bitcast<i32>(su(dist + index * DIST_SIZE + 1u));
  if (prim >= 0) { return triangle_light_sample(u32(prim), r.xy, P); }
  var ls = lamp_sample(u32(~prim), r.xy, P, N, has_transmission);
  ls.pdf = ls.pdf * sf(H_PDF_LIGHTS);
  if (!(ls.pdf > 0.0)) { ls.ok = 0u; }
  return ls;
}

struct LampHit { lamp: u32, t: f32 };
fn lights_intersect(P: vec3<f32>, D: vec3<f32>, tmin: f32, tmax: f32, camera_ray: bool) -> LampHit {
  var best = LampHit(NONE, tmax);
  let n = hdr(H_NUM_HITTABLE_LIGHTS);
  for (var i = 0u; i < n; i++) {
    let lamp = su(hdr(H_HITTABLE_LIGHTS) + i);
    let L = lamp_base(lamp);
    let ltype = su(L + LT_TYPE);
    let flags = su(L + LT_FLAGS);
    if (camera_ray && (flags & LF_CAMERA_VISIBLE) == 0u) { continue; }
    if (!camera_ray && (flags & LF_USE_MIS) == 0u) { continue; }
    if (ltype == LTY_POINT || ltype == LTY_SPOT) {
      let t = ray_sphere_intersect(P, D, tmin, best.t, sv3(L + LT_CO), sf(L + LT_RADIUS));
      if (t > 0.0) { best = LampHit(lamp, t); }
    } else if (ltype == LTY_AREA) {
      let n3 = sv3(L + LT_AREA_DIR);
      let dn = dot(D, n3);
      if (dn >= 0.0) { continue; }
      let co = sv3(L + LT_CO);
      let t = dot(co - P, n3) / dn;
      if (!(t > tmin && t < best.t)) { continue; }
      let h = P + D * t - co;
      let uu = dot(h, sv3(L + LT_AXIS_U)) / sf(L + LT_LEN_U);
      let vv = dot(h, sv3(L + LT_AXIS_V)) / sf(L + LT_LEN_V);
      let ellipse = sf(L + LT_INVAREA) < 0.0;
      let inside = select(abs(uu) <= 0.5 && abs(vv) <= 0.5, uu * uu + vv * vv <= 0.25, ellipse);
      if (inside) { best = LampHit(lamp, t); }
    }
  }
  return best;
}

struct LampEval { E: vec3<f32>, pdf: f32 };
fn lamp_eval_from_intersection(lamp: u32, P: vec3<f32>, D: vec3<f32>, t: f32, N: vec3<f32>, had_transmission: bool) -> LampEval {
  let L = lamp_base(lamp);
  let ltype = su(L + LT_TYPE);
  var evalFac = sf(L + LT_EVAL_FAC);
  var pdf = 0.0;
  if (ltype == LTY_POINT || ltype == LTY_SPOT) {
    let co = sv3(L + LT_CO);
    let r = sf(L + LT_RADIUS);
    let dd = P - co;
    let d_sq = dot(dd, dd);
    let r_sq = r * r;
    if (d_sq > r_sq) { pdf = INV_2PI / sin_sqr_to_one_minus_cos(r_sq / d_sq); }
    else { pdf = select(max(dot(N, D), 0.0) * INV_PI, INV_2PI * 0.5, had_transmission); }
    if (ltype == LTY_SPOT && d_sq > r_sq) {
      evalFac = evalFac * smoothstep01((-dot(D, sv3(L + LT_SPOT_DIR)) - sf(L + LT_COS_HALF_SPOT_ANGLE)) * sf(L + LT_SPOT_SMOOTH));
    }
  } else if (ltype == LTY_AREA) {
    if (sf(L + LT_INVAREA) > 0.0) {
      pdf = area_light_rect_sample(P, sv3(L + LT_CO), sv3(L + LT_AXIS_U), sf(L + LT_LEN_U), sv3(L + LT_AXIS_V), sf(L + LT_LEN_V), vec2<f32>(0.0), false).pdf;
    } else {
      let cosPi = -dot(sv3(L + LT_AREA_DIR), D);
      pdf = select(0.0, (4.0 / PI) / (sf(L + LT_LEN_U) * sf(L + LT_LEN_V)) * (t * t / cosPi), cosPi > 0.0);
    }
  } else if (ltype == LTY_SUN) {
    let angle = sf(L + LT_SUN_ANGLE);
    if (angle == 0.0) { return LampEval(vec3<f32>(0.0), 0.0); }
    let c = -dot(D, sv3(L + LT_CO));
    if (acos(clamp(c, -1.0, 1.0)) > angle) { return LampEval(vec3<f32>(0.0), 0.0); }
    pdf = sf(L + LT_SUN_PDF);
  }
  return LampEval(sv3(L + LT_STRENGTH) * evalFac, pdf);
}
`;
  }
});

// src/gpu/wgsl/light_tree.ts
var WGSL_LIGHT_TREE;
var init_light_tree3 = __esm({
  "src/gpu/wgsl/light_tree.ts"() {
    "use strict";
    WGSL_LIGHT_TREE = /* wgsl */
    `
const SQRT2: f32 = 1.41421356237;
fn use_light_tree() -> bool { return (hdr(H_FLAGS) & SCF_USE_LIGHT_TREE) != 0u && hdr(H_NUM_LIGHT_TREE_NODES) > 0u; }
fn lt_node(n: u32) -> u32 { return hdr(H_LIGHT_TREE_NODES) + n * LIGHT_TREE_NODE_SIZE; }
fn lt_emitter(e: u32) -> u32 { return hdr(H_LIGHT_TREE_EMITTERS) + e * LIGHT_TREE_EMITTER_SIZE; }
fn sin_from_cos(c: f32) -> f32 { return sqrt(max(1.0 - c * c, 0.0)); }

// Scratch shared by the importance functions.
var<private> lt_ptc: vec3<f32>;
var<private> lt_cos_u: f32;
var<private> lt_dmax: f32;
var<private> lt_dmin: f32;
var<private> lt_axis: vec3<f32>;
var<private> lt_theta_o: f32;
var<private> lt_theta_e: f32;
var<private> lt_imp: vec2<f32>; // x: max importance, y: min importance

fn lt_importance(N: vec3<f32>, has_t: bool, energy: f32) {
  lt_imp = vec2<f32>(0.0);
  let sin_u = sin_from_cos(lt_cos_u);
  let dpn = dot(lt_ptc, N);
  let cos_i = select(dpn, abs(dpn), has_t);
  let sin_i = sin_from_cos(cos_i);
  let cos_min_inc = select(cos_i * lt_cos_u + sin_i * sin_u, 1.0, cos_i >= lt_cos_u);
  if (!has_t && cos_min_inc < 0.0) { return; }
  let cos_max_inc = max(cos_i * lt_cos_u - sin_i * sin_u, 0.0);
  var cos_t = 1.0;
  var sin_t = 0.0;
  if (!all(lt_axis == -lt_ptc)) {
    cos_t = -dot(lt_axis, lt_ptc);
    sin_t = sin_from_cos(cos_t);
  }
  let cos_t_minus_u = cos_t * lt_cos_u + sin_t * sin_u;
  let cos_o = cos(lt_theta_o);
  let sin_o = sin(lt_theta_o);
  var cos_min_out: f32;
  if (cos_t >= lt_cos_u || cos_t_minus_u >= cos_o) {
    cos_min_out = 1.0;
  } else if (lt_theta_o + lt_theta_e > PI || cos_t_minus_u > cos(lt_theta_o + lt_theta_e)) {
    cos_min_out = cos_t_minus_u * cos_o + sin_from_cos(cos_t_minus_u) * sin_o;
  } else {
    return;
  }
  lt_imp.x = abs(cos_min_inc * energy * cos_min_out / (lt_dmin * lt_dmin));
  let cos_t_plus_u = cos_t * lt_cos_u - sin_t * sin_u;
  if (!(lt_theta_e - lt_theta_o < 0.0 || cos_t < 0.0 || lt_cos_u < 0.0 || cos_t_plus_u < cos(lt_theta_e - lt_theta_o))) {
    let cos_max_out = cos_t_plus_u * cos_o - sin_from_cos(cos_t_plus_u) * sin_o;
    lt_imp.y = abs(cos_max_inc * energy * cos_max_out / (lt_dmax * lt_dmax));
  }
}

fn lt_node_importance(P: vec3<f32>, N: vec3<f32>, has_t: bool, n: u32) {
  let b = lt_node(n);
  lt_axis = sv3(b + LTN_AXIS);
  lt_theta_o = sf(b + LTN_THETA_O);
  lt_theta_e = sf(b + LTN_THETA_E);
  var distance = 1.0;
  if (su(b + LTN_TYPE) == LTNT_DISTANT) {
    lt_ptc = -lt_axis;
    lt_cos_u = cos(lt_theta_o + lt_theta_e);
  } else {
    let bmin = sv3(b + LTN_BMIN);
    let bmax = sv3(b + LTN_BMAX);
    let c = 0.5 * (bmin + bmax);
    let ext = bmax - c;
    if (!(has_t || dot(N, c - P) + dot(abs(N), abs(ext)) > 0.0)) { lt_imp = vec2<f32>(0.0); return; }
    distance = length(c - P);
    lt_ptc = select(vec3<f32>(0.0), (c - P) / distance, distance > 0.0);
    let d2 = distance * distance;
    let r2 = dot(ext, ext);
    lt_cos_u = select(sqrt(max(1.0 - r2 / d2, 0.0)), -1.0, d2 <= r2);
    distance = max(0.5 * sqrt(r2), distance);
  }
  lt_dmax = distance;
  lt_dmin = distance;
  lt_importance(N, has_t, sf(b + LTN_ENERGY));
}

fn lt_emitter_importance(P: vec3<f32>, N: vec3<f32>, has_t: bool, e: u32) {
  let b = lt_emitter(e);
  lt_theta_o = sf(b + LTE_THETA_O);
  lt_theta_e = sf(b + LTE_THETA_E);
  var energy = sf(b + LTE_ENERGY);
  let id = bitcast<i32>(su(b + LTE_ID));
  var visible = true;
  if (id >= 0) {
    let prim = u32(id);
    let v0 = tri_vert(prim, 0u);
    let v1 = tri_vert(prim, 1u);
    let v2 = tri_vert(prim, 2u);
    let c = (v0 + v1 + v2) / 3.0;
    lt_axis = safe_normalize(v0 - v1);
    let md = length(c - P);
    lt_ptc = select(vec3<f32>(0.0), (c - P) / md, md > 0.0);
    lt_dmin = md;
    lt_dmax = md;
    lt_cos_u = FLT_MAX;
    var above = false;
    for (var i = 0u; i < 3u; i++) {
      let v = tri_vert(prim, i) - P;
      let vl = length(v);
      let inv = select(0.0, 1.0 / vl, vl > 0.0);
      lt_cos_u = min(lt_cos_u, dot(lt_ptc, v) * inv);
      above = above || dot(v, N) * inv > 0.0;
      lt_dmax = max(lt_dmax, vl);
    }
    visible = (lt_theta_o != 0.0 || dot(lt_axis, lt_ptc) < 0.0) && above;
  } else {
    let L = lamp_base(u32(~id));
    let ltype = su(L + LT_TYPE);
    let co = sv3(L + LT_CO);
    if (ltype == LTY_POINT || ltype == LTY_SPOT) {
      let md = length(co - P);
      lt_ptc = select(vec3<f32>(0.0), (co - P) / md, md > 0.0);
      lt_dmin = md;
      lt_dmax = md;
      let radius = sf(L + LT_RADIUS);
      let sphere = (su(L + LT_FLAGS) & LF_IS_SPHERE) != 0u;
      if (ltype == LTY_POINT) {
        lt_axis = -lt_ptc;
        if (sphere) {
          if (md > radius) { lt_cos_u = sqrt(max(1.0 - sqr(radius / md), 0.0)); lt_dmax = md / lt_cos_u; }
          else { lt_cos_u = -1.0; lt_dmax = radius / SQRT2; lt_dmin = lt_dmax; }
        } else {
          let hyp = sqrt(radius * radius + md * md);
          lt_cos_u = md / hyp;
          lt_dmax = hyp;
        }
        lt_theta_o = 0.0;
      } else {
        lt_axis = sv3(L + LT_SPOT_DIR);
        if (sphere) {
          lt_cos_u = select(-1.0, sqrt(max(1.0 - sqr(radius / md), 0.0)), md > radius);
          if (md > radius) { lt_dmax = md / lt_cos_u; } else { lt_dmax = radius / SQRT2; lt_dmin = lt_dmax; }
        } else {
          let hyp = sqrt(radius * radius + md * md);
          lt_cos_u = md / hyp;
          lt_dmax = hyp;
        }
        let cos_min_out = cos(max(0.0, acos(clamp(-dot(lt_axis, lt_ptc), -1.0, 1.0)) - acos(clamp(lt_cos_u, -1.0, 1.0))));
        energy = energy * smoothstep01((cos_min_out - cos(lt_theta_e)) * sf(L + LT_SPOT_SMOOTH));
      }
    } else if (ltype == LTY_AREA) {
      lt_axis = sv3(L + LT_AREA_DIR);
      let md = length(co - P);
      lt_ptc = select(vec3<f32>(0.0), (co - P) / md, md > 0.0);
      lt_dmin = md;
      lt_dmax = md;
      lt_cos_u = FLT_MAX;
      let eu = sv3(L + LT_AXIS_U) * sf(L + LT_LEN_U);
      let ev = sv3(L + LT_AXIS_V) * sf(L + LT_LEN_V);
      for (var i = 0u; i < 4u; i++) {
        let su_ = f32(i & 1u) - 0.5;
        let sv_ = 0.5 * (f32(i & 2u) - 1.0);
        let v = su_ * eu + sv_ * ev + co - P;
        let vl = length(v);
        let inv = select(0.0, 1.0 / vl, vl > 0.0);
        lt_cos_u = min(lt_cos_u, dot(lt_ptc, v) * inv);
        lt_dmax = max(lt_dmax, vl);
      }
      visible = dot(lt_axis, lt_ptc) < 0.0 && dot(N, co - P) + abs(dot(N, eu)) + abs(dot(N, ev)) > 0.0;
    } else if (ltype == LTY_SUN) {
      lt_axis = co;
      lt_cos_u = cos(lt_theta_e);
      lt_dmax = 1.0 / lt_cos_u;
      lt_dmin = 1.0;
      lt_ptc = -co;
    } else if (ltype == LTY_BACKGROUND) {
      lt_axis = vec3<f32>(0.0, 0.0, -1.0);
      lt_cos_u = -1.0;
      lt_dmax = 1.0;
      lt_dmin = 1.0;
      lt_ptc = vec3<f32>(0.0, 0.0, -1.0);
    } else {
      lt_imp = vec2<f32>(0.0);
      return;
    }
  }
  if (!(visible || has_t)) { lt_imp = vec2<f32>(0.0); return; }
  lt_importance(N, has_t, energy);
}

fn lt_child_importance(P: vec3<f32>, N: vec3<f32>, has_t: bool, n: u32) {
  let b = lt_node(n);
  let num = bitcast<i32>(su(b + LTN_NUM_EMITTERS));
  if (num == 1) { lt_emitter_importance(P, N, has_t, su(b + LTN_CHILD0)); }
  else if (num != 0) { lt_node_importance(P, N, has_t, n); }
  else { lt_imp = vec2<f32>(0.0); }
}

// get_left_probability: negative when both children have zero importance.
fn lt_left_probability(P: vec3<f32>, N: vec3<f32>, has_t: bool, left: u32, right: u32) -> f32 {
  lt_child_importance(P, N, has_t, left);
  let l = lt_imp;
  lt_child_importance(P, N, has_t, right);
  let r = lt_imp;
  let tmax = l.x + r.x;
  if (tmax == 0.0) { return -1.0; }
  let tmin = l.y + r.y;
  let pmax = l.x / tmax;
  var pmin: f32;
  if (tmin > 0.0) { pmin = l.y / tmin; }
  else { pmin = 0.5 * (select(0.0, 1.0, l.x > 0.0) + select(0.0, 1.0, r.x == 0.0)); }
  return 0.5 * (pmax + pmin);
}

// sample_reservoir state.
var<private> res_sel: i32;
var<private> res_w: f32;
var<private> res_tot: f32;
var<private> res_rand: f32;

fn sample_reservoir(index: i32, weight: f32) {
  if (!(weight > 0.0)) { return; }
  res_tot += weight;
  if (res_sel == -1) { res_sel = index; res_w = weight; return; }
  let thresh = weight / res_tot;
  if (res_rand <= thresh) { res_sel = index; res_w = weight; res_rand = res_rand / thresh; }
  else { res_rand = (res_rand - thresh) / (1.0 - thresh); }
  res_rand = clamp(res_rand, 0.0, 1.0);
}

struct TreeSample { ok: bool, emitter: u32, pdf: f32 };

fn light_tree_sample(rand: f32, P: vec3<f32>, N: vec3<f32>, has_t: bool) -> TreeSample {
  var pdf_leaf = 1.0;
  var node = 0u;
  var r = rand;
  for (var guard = 0u; guard < 64u; guard++) {
    let b = lt_node(node);
    if (su(b + LTN_TYPE) >= LTNT_LEAF) {
      let num = bitcast<i32>(su(b + LTN_NUM_EMITTERS));
      let first = su(b + LTN_CHILD0);
      let sample_max = r > 0.5;
      if (num > 1) { r = r * 2.0 - select(0.0, 1.0, sample_max); }
      var sel_imp = vec2<f32>(0.0);
      var tot_imp = vec2<f32>(0.0);
      res_sel = -1;
      res_w = 0.0;
      res_tot = 0.0;
      res_rand = r;
      var has_imp = 0u;
      for (var i = 0; i < num; i++) {
        let e = first + u32(i);
        lt_emitter_importance(P, N, has_t, e);
        let imp = lt_imp;
        if (sample_max) {
          sample_reservoir(i32(e), imp.x);
          if (res_sel == i32(e)) { sel_imp.y = imp.y; }
          tot_imp.y += imp.y;
        } else {
          sample_reservoir(i32(e), imp.y);
          if (res_sel == i32(e)) { sel_imp.x = imp.x; }
          tot_imp.x += imp.x;
        }
        if (imp.x > 0.0) { has_imp |= 1u << u32(i); }
      }
      if (sample_max) { sel_imp.x = res_w; tot_imp.x = res_tot; } else { sel_imp.y = res_w; tot_imp.y = res_tot; }
      r = res_rand;
      if (has_imp == 0u) { return TreeSample(false, 0u, 0.0); }
      var selected = res_sel;
      if (tot_imp.y == 0.0) {
        if (sample_max) {
          sel_imp.y = 1.0;
          tot_imp.y = f32(countOneBits(has_imp));
        } else {
          res_sel = -1;
          res_w = 0.0;
          res_tot = 0.0;
          res_rand = r;
          var bits = has_imp;
          for (var i = 0; i < num; i++) {
            sample_reservoir(i32(first) + i, f32(bits & 1u));
            bits = bits >> 1u;
          }
          selected = res_sel;
          sel_imp.y = res_w;
          tot_imp.y = res_tot;
          lt_emitter_importance(P, N, has_t, u32(selected));
          sel_imp.x = lt_imp.x;
        }
      }
      return TreeSample(true, u32(selected), pdf_leaf * 0.5 * (sel_imp.x / tot_imp.x + sel_imp.y / tot_imp.y));
    }
    let left = su(b + LTN_CHILD0);
    let right = su(b + LTN_CHILD1);
    let lp = lt_left_probability(P, N, has_t, left, right);
    if (lp < 0.0) { return TreeSample(false, 0u, 0.0); }
    var go_right = false;
    let w = 1.0 - lp;
    if (w > 0.0) {
      let thresh = w / (lp + w);
      if (r <= thresh) { go_right = true; r = r / thresh; }
      else { r = (r - thresh) / (1.0 - thresh); }
      r = clamp(r, 0.0, 1.0);
    }
    node = select(left, right, go_right);
    pdf_leaf = pdf_leaf * select(lp, 1.0 - lp, go_right);
  }
  return TreeSample(false, 0u, 0.0);
}

fn light_tree_pdf(P: vec3<f32>, N: vec3<f32>, has_t: bool, tgt: u32) -> f32 {
  var bit_trail = su(lt_emitter(tgt) + LTE_BIT_TRAIL);
  var pdf = 1.0;
  var node = 0u;
  for (var guard = 0u; guard < 64u; guard++) {
    let b = lt_node(node);
    if (su(b + LTN_TYPE) >= LTNT_LEAF) {
      let num = bitcast<i32>(su(b + LTN_NUM_EMITTERS));
      let first = su(b + LTN_CHILD0);
      var t = vec2<f32>(0.0);
      var tot = vec2<f32>(0.0);
      var num_has = 0.0;
      for (var i = 0; i < num; i++) {
        let e = first + u32(i);
        lt_emitter_importance(P, N, has_t, e);
        if (lt_imp.x > 0.0) { num_has += 1.0; }
        if (e == tgt) { t = lt_imp; }
        tot += lt_imp;
      }
      if (!(t.x > 0.0)) { return 0.0; }
      return pdf * 0.5 * (t.x / tot.x + select(1.0 / num_has, t.y / tot.y, tot.y > 0.0));
    }
    let left = su(b + LTN_CHILD0);
    let right = su(b + LTN_CHILD1);
    let lp = lt_left_probability(P, N, has_t, left, right);
    if (lp < 0.0) { return 0.0; }
    let go_left = (bit_trail & 1u) == 0u;
    bit_trail = bit_trail >> 1u;
    node = select(right, left, go_left);
    pdf = pdf * select(1.0 - lp, lp, go_left);
    if (pdf == 0.0) { return 0.0; }
  }
  return 0.0;
}
`;
  }
});

// src/gpu/wgsl/shade.ts
var WGSL_SHADE;
var init_shade = __esm({
  "src/gpu/wgsl/shade.ts"() {
    "use strict";
    WGSL_SHADE = /* wgsl */
    `
struct ShaderData {
  P: vec3<f32>, u: f32,
  N: vec3<f32>, v: f32,
  Ng: vec3<f32>, rayLength: f32,
  wi: vec3<f32>, tu: f32,
  E: vec3<f32>, tv: f32,
  Tr: vec3<f32>, pad0: f32,
  // Shading normal before any normal map.
  Ns: vec3<f32>, pad1: f32,
  prim: u32, shader: u32, triFlags: u32, runtimeFlag: u32,
};
var<private> sd: ShaderData;

fn shader_setup(prim: u32, u: f32, v: f32, t: f32, D: vec3<f32>) {
  let ti = hdr(H_TRI_INFO) + prim * TRI_INFO_SIZE;
  sd.prim = prim;
  sd.u = u;
  sd.v = v;
  sd.shader = su(ti + TI_SHADER);
  sd.triFlags = su(ti + TI_FLAGS);
  sd.runtimeFlag = 0u;
  sd.rayLength = t;
  let w = 1.0 - u - v;
  let V0 = tri_vert(prim, 0u);
  let V1 = tri_vert(prim, 1u);
  let V2 = tri_vert(prim, 2u);
  sd.P = w * V0 + u * V1 + v * V2;
  let Ng = safe_normalize(cross(V1 - V0, V2 - V0));
  sd.Ng = Ng;
  let i0 = su(ti + TI_V0);
  let i1 = su(ti + TI_V1);
  let i2 = su(ti + TI_V2);
  if ((sd.triFlags & TF_SMOOTH) != 0u) {
    let vn = hdr(H_VERT_NORMALS);
    let n = w * sv3(vn + i0 * 4u) + u * sv3(vn + i1 * 4u) + v * sv3(vn + i2 * 4u);
    let nl = length(n);
    sd.N = select(Ng, n / nl, nl > 0.0);
  } else {
    sd.N = Ng;
  }
  if ((sd.triFlags & TF_HAS_UV) != 0u) {
    let uv = hdr(H_VERT_UVS);
    sd.tu = w * sf(uv + i0 * 2u) + u * sf(uv + i1 * 2u) + v * sf(uv + i2 * 2u);
    sd.tv = w * sf(uv + i0 * 2u + 1u) + u * sf(uv + i1 * 2u + 1u) + v * sf(uv + i2 * 2u + 1u);
  } else {
    sd.tu = 0.0;
    sd.tv = 0.0;
  }
  sd.wi = -D;
  if (dot(sd.Ng, sd.wi) < 0.0) {
    sd.runtimeFlag |= SR_BACKFACING;
    sd.Ng = -sd.Ng;
    sd.N = -sd.N;
  }
  sd.Ns = sd.N;
}

fn bsdf_alloc(w_in: vec3<f32>) -> u32 {
  let w = max(w_in, vec3<f32>(0.0));
  let sw = abs(avg3(w));
  if (!(sw >= CLOSURE_WEIGHT_CUTOFF) || numClosure >= MAX_CLOSURE) { return NONE; }
  let i = numClosure;
  numClosure += 1u;
  cls[i] = Closure(CLOSURE_NONE, FRESNEL_NONE, 0u, 0u, w, sw, sd.N, 0.0, vec3<f32>(0.0), 1.0, vec3<f32>(1.0), -1.0, vec3<f32>(1.0), 1.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0);
  return i;
}

fn diffuse_setup(N: vec3<f32>, w: vec3<f32>) {
  let i = bsdf_alloc(w);
  if (i == NONE) { return; }
  cls[i].N = N;
  cls[i].ctype = CLOSURE_DIFFUSE;
  sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL;
}

fn transparent_setup(w: vec3<f32>) {
  let sw = abs(avg3(w));
  if (!(sw >= CLOSURE_WEIGHT_CUTOFF)) { return; }
  sd.Tr = sd.Tr + w;
  if ((sd.runtimeFlag & SR_TRANSPARENT) != 0u) {
    for (var i = 0u; i < numClosure; i++) {
      if (cls[i].ctype == CLOSURE_TRANSPARENT) {
        cls[i].w = cls[i].w + w;
        cls[i].sampleWeight = cls[i].sampleWeight + sw;
        return;
      }
    }
    return;
  }
  sd.runtimeFlag |= SR_BSDF | SR_TRANSPARENT;
  if (numClosure >= MAX_CLOSURE) { return; }
  let i = numClosure;
  numClosure += 1u;
  cls[i] = Closure(CLOSURE_TRANSPARENT, FRESNEL_NONE, 0u, 0u, w, sw, sd.N, 0.0, vec3<f32>(0.0), 1.0, vec3<f32>(1.0), -1.0, vec3<f32>(1.0), 1.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0, vec3<f32>(0.0), 0.0);
}

fn emission_setup(e: vec3<f32>) {
  if ((sd.runtimeFlag & SR_EMISSION) != 0u) { sd.E = sd.E + e; }
  else { sd.runtimeFlag |= SR_EMISSION; sd.E = e; }
}

fn valid_reflection_N(N: vec3<f32>) -> vec3<f32> {
  if (all(N == sd.Ng)) { return N; }
  return ensure_valid_specular_reflection(sd.Ng, sd.wi, N);
}

struct TangentFrame { ok: bool, T: vec3<f32>, B: vec3<f32> };

// UV tangent frame of the hit triangle, orthogonalised against N, with B = N x T following the UV handedness.
fn uv_tangent_frame(N: vec3<f32>) -> TangentFrame {
  let none = TangentFrame(false, vec3<f32>(0.0), vec3<f32>(0.0));
  if ((sd.triFlags & TF_HAS_UV) == 0u) { return none; }
  let ti = hdr(H_TRI_INFO) + sd.prim * TRI_INFO_SIZE;
  let uv = hdr(H_VERT_UVS);
  let i0 = su(ti + TI_V0);
  let i1 = su(ti + TI_V1);
  let i2 = su(ti + TI_V2);
  let du1 = sf(uv + i1 * 2u) - sf(uv + i0 * 2u);
  let dv1 = sf(uv + i1 * 2u + 1u) - sf(uv + i0 * 2u + 1u);
  let du2 = sf(uv + i2 * 2u) - sf(uv + i0 * 2u);
  let dv2 = sf(uv + i2 * 2u + 1u) - sf(uv + i0 * 2u + 1u);
  let det = du1 * dv2 - du2 * dv1;
  if (det == 0.0) { return none; }
  let r = 1.0 / det;
  let p1 = tri_vert(sd.prim, 1u) - tri_vert(sd.prim, 0u);
  let p2 = tri_vert(sd.prim, 2u) - tri_vert(sd.prim, 0u);
  var T = (p1 * dv2 - p2 * dv1) * r;
  let Bv = (p2 * du1 - p1 * du2) * r;
  T = T - dot(T, N) * N;
  let tl = length(T);
  if (tl == 0.0) { return none; }
  T = T / tl;
  var B = cross(N, T);
  if (dot(B, Bv) < 0.0) { B = -B; }
  return TangentFrame(true, T, B);
}

// Tangent-space normal map on the normal base; returns fallback when there is no usable frame.
fn normal_map(tex: u32, scale: f32, base: vec3<f32>, fallback: vec3<f32>) -> vec3<f32> {
  let tf = uv_tangent_frame(base);
  if (!tf.ok) { return fallback; }
  let c = texture_lookup(tex, sd.tu, sd.tv);
  let m = vec3<f32>((c.x * 2.0 - 1.0) * scale, (c.y * 2.0 - 1.0) * scale, c.z * 2.0 - 1.0);
  let n = m.x * tf.T + m.y * tf.B + m.z * base;
  let nl = length(n);
  if (nl == 0.0) { return fallback; }
  return n / nl;
}

fn rotate_around_axis(p: vec3<f32>, a: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  let k = 1.0 - c;
  return vec3<f32>(
    (c + k * a.x * a.x) * p.x + (k * a.x * a.y - a.z * s) * p.y + (k * a.x * a.z + a.y * s) * p.z,
    (k * a.x * a.y + a.z * s) * p.x + (c + k * a.y * a.y) * p.y + (k * a.y * a.z - a.x * s) * p.z,
    (k * a.x * a.z - a.y * s) * p.x + (k * a.y * a.z + a.x * s) * p.y + (c + k * a.z * a.z) * p.z);
}

fn eval_surface_shader() {
  let sh = hdr(H_SHADERS) + sd.shader * SHADER_SIZE;
  numClosure = 0u;
  sd.E = vec3<f32>(0.0);
  sd.Tr = vec3<f32>(0.0);
  let stype = su(sh + SH_TYPE);
  let backfacing = (sd.runtimeFlag & SR_BACKFACING) != 0u;
  if (stype == ST_PRINCIPLED) {
    var base = sv3(sh + SH_BASE_COLOR);
    var alpha = sf(sh + SH_ALPHA);
    let bct = su(sh + SH_BASE_COLOR_TEX);
    if (bct != NONE) { let t = texture_lookup(bct, sd.tu, sd.tv); base = base * t.xyz; alpha = alpha * t.w; }
    let at = su(sh + SH_ALPHA_TEX);
    if (at != NONE) { alpha = alpha * texture_lookup(at, sd.tu, sd.tv).w; }
    var metallic = sf(sh + SH_METALLIC);
    var roughness = sf(sh + SH_ROUGHNESS);
    let mrt = su(sh + SH_METALLIC_ROUGHNESS_TEX);
    if (mrt != NONE) { let t = texture_lookup(mrt, sd.tu, sd.tv); roughness = roughness * t.y; metallic = metallic * t.z; }
    var transmission = sf(sh + SH_TRANSMISSION);
    let tt = su(sh + SH_TRANSMISSION_TEX);
    if (tt != NONE) { transmission = transmission * texture_lookup(tt, sd.tu, sd.tv).x; }
    let nt = su(sh + SH_NORMAL_TEX);
    if (nt != NONE) { sd.N = normal_map(nt, sf(sh + SH_NORMAL_SCALE), sd.Ns, sd.N); }
    let N = sd.N;
    var w = vec3<f32>(1.0);
    alpha = clamp(alpha, 0.0, 1.0);
    if (alpha < 1.0) { transparent_setup(vec3<f32>(1.0 - alpha)); w = w * alpha; }
    var coatWeight = max(sf(sh + SH_COAT_WEIGHT), 0.0);
    let sheenWeight = max(sf(sh + SH_SHEEN_WEIGHT), 0.0);
    if (coatWeight > 0.0) {
      let cwt = su(sh + SH_COAT_WEIGHT_TEX);
      if (cwt != NONE) { coatWeight = coatWeight * texture_lookup(cwt, sd.tu, sd.tv).x; }
    }
    var coatN = N;
    if (sheenWeight > CLOSURE_WEIGHT_CUTOFF || coatWeight > CLOSURE_WEIGHT_CUTOFF) {
      if ((su(sh + SH_FLAGS) & SF_COAT_GEOMETRY_NORMAL) != 0u) { coatN = sd.Ns; }
      let cnt = su(sh + SH_COAT_NORMAL_TEX);
      if (cnt != NONE) { coatN = normal_map(cnt, sf(sh + SH_COAT_NORMAL_SCALE), sd.Ns, coatN); }
    }
    if (sheenWeight > CLOSURE_WEIGHT_CUTOFF) {
      var tint = max(sv3(sh + SH_SHEEN_TINT), vec3<f32>(0.0));
      let stt = su(sh + SH_SHEEN_TINT_TEX);
      if (stt != NONE) { tint = tint * texture_lookup(stt, sd.tu, sd.tv).xyz; }
      var srough = sf(sh + SH_SHEEN_ROUGHNESS);
      let srt = su(sh + SH_SHEEN_ROUGHNESS_TEX);
      if (srt != NONE) { srough = srough * texture_lookup(srt, sd.tu, sd.tv).w; }
      srough = clamp(srough, 0.0, 1.0);
      let sheenN = safe_normalize(mix(N, coatN, saturate1(coatWeight)));
      let i = bsdf_alloc(sheenWeight * tint * w);
      if (i != NONE) {
        cls[i].N = sheenN;
        let albedo = setup_sheen(i, sd.wi, srough);
        if (cls[i].ctype != CLOSURE_NONE) { sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_EVAL; }
        w = min(max(w - vec3<f32>(albedo), vec3<f32>(0.0)), w);
      }
    }
    if (coatWeight > CLOSURE_WEIGHT_CUTOFF) {
      var ctint = max(sv3(sh + SH_COAT_TINT), vec3<f32>(0.0));
      let cior = max(sf(sh + SH_COAT_IOR), 1.0);
      var crough = sf(sh + SH_COAT_ROUGHNESS);
      let crt = su(sh + SH_COAT_ROUGHNESS_TEX);
      if (crt != NONE) { crough = crough * texture_lookup(crt, sd.tu, sd.tv).y; }
      crough = clamp(crough, 0.0, 1.0);
      let cN = valid_reflection_N(coatN);
      if (!(ctint.x == 1.0 && ctint.y == 1.0 && ctint.z == 1.0)) {
        let cosNI = dot(sd.wi, cN);
        ctint = pow(ctint, vec3<f32>(cior / sqrt(cior * cior - (1.0 - cosNI * cosNI))));
      }
      let cw = coatWeight * w;
      var alb = vec3<f32>(0.0);
      let i = bsdf_alloc(cw);
      if (i != NONE) {
        cls[i].N = cN;
        cls[i].ior = cior;
        cls[i].alpha = saturate1(crough * crough);
        cls[i].alphaY = cls[i].alpha;
        cls[i].ctype = CLOSURE_GGX;
        sd.runtimeFlag |= SR_BSDF | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
        setup_fresnel_dielectric(i, sd.wi);
        alb = microfacet_estimate_albedo(i, sd.wi, true, false);
      }
      let layer = (vec3<f32>(1.0) - ctint * (vec3<f32>(1.0) - alb)) * cw;
      w = min(max(w - layer, vec3<f32>(0.0)), w);
    }
    var em = sv3(sh + SH_EMISSION);
    let et = su(sh + SH_EMISSION_TEX);
    if (et != NONE && !is_zero3(em)) { em = em * texture_lookup(et, sd.tu, sd.tv).xyz; }
    if (!is_zero3(em)) { emission_setup(em * w); }
    base = max(base, vec3<f32>(0.0));
    let cbase = min(base, vec3<f32>(1.0));
    let ior = max(sf(sh + SH_IOR), 1e-5);
    roughness = clamp(roughness, 0.0, 1.0);
    let alphaR = roughness * roughness;
    let tint = max(sv3(sh + SH_SPECULAR_TINT), vec3<f32>(0.0));
    let vN = valid_reflection_N(N);
    let anisotropic = clamp(sf(sh + SH_ANISOTROPIC), 0.0, 1.0);
    var alphaX = alphaR;
    var alphaY = alphaR;
    var tng = vec3<f32>(0.0);
    if (anisotropic > 0.0) {
      let tf = uv_tangent_frame(sd.Ns);
      if (tf.ok) {
        let aspect = sqrt(1.0 - anisotropic * 0.9);
        alphaX = alphaX / aspect;
        alphaY = alphaY * aspect;
        tng = tf.T;
        let rot = sf(sh + SH_ANISOTROPIC_ROTATION);
        if (rot != 0.0) { tng = rotate_around_axis(tng, N, rot * 2.0 * PI); }
      }
    }
    metallic = clamp(metallic, 0.0, 1.0);
    if (metallic > CLOSURE_WEIGHT_CUTOFF) {
      let i = bsdf_alloc(metallic * w);
      if (i != NONE) {
        cls[i].N = vN;
        cls[i].ior = 1.0;
        cls[i].alpha = saturate1(alphaX);
        cls[i].alphaY = saturate1(alphaY);
        cls[i].T = tng;
        cls[i].f0 = cbase;
        cls[i].ctype = CLOSURE_GGX;
        sd.runtimeFlag |= SR_BSDF | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
        setup_fresnel_f82_tint(i, sd.wi, min(tint, vec3<f32>(1.0)));
      }
      w = w * (1.0 - metallic);
    }
    transmission = clamp(transmission, 0.0, 1.0);
    if (transmission > CLOSURE_WEIGHT_CUTOFF) {
      let i = bsdf_alloc(transmission * w);
      if (i != NONE) {
        cls[i].N = vN;
        cls[i].alpha = saturate1(alphaX);
        cls[i].alphaY = saturate1(alphaY);
        cls[i].T = tng;
        cls[i].ior = select(ior, 1.0 / ior, backfacing);
        cls[i].tintR = vec3<f32>(1.0);
        cls[i].tintT = sqrt(cbase);
        cls[i].f0 = F0_from_ior(ior) * tint;
        cls[i].f90 = vec3<f32>(1.0);
        cls[i].exponent = -ior;
        cls[i].ctype = CLOSURE_GGX_GLASS;
        sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_TRANSMISSION | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
        setup_fresnel_generalized_schlick(i, sd.wi, true);
      }
      w = w * (1.0 - transmission);
    }
    let level = max(sf(sh + SH_SPECULAR_IOR_LEVEL), 0.0);
    var eta = ior;
    var f0 = F0_from_ior(eta);
    if (level != 0.5) {
      f0 = f0 * 2.0 * level;
      eta = ior_from_F0(f0);
      if (ior < 1.0) { eta = 1.0 / eta; }
    }
    if (eta != 1.0) {
      let i = bsdf_alloc(w);
      if (i != NONE) {
        cls[i].N = vN;
        cls[i].ior = eta;
        cls[i].alpha = saturate1(alphaX);
        cls[i].alphaY = saturate1(alphaY);
        cls[i].T = tng;
        cls[i].f0 = f0 * tint;
        cls[i].f90 = vec3<f32>(1.0);
        cls[i].exponent = -eta;
        cls[i].tintR = vec3<f32>(1.0);
        cls[i].tintT = vec3<f32>(0.0);
        cls[i].ctype = CLOSURE_GGX;
        sd.runtimeFlag |= SR_BSDF | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
        setup_fresnel_generalized_schlick(i, sd.wi, true);
        let alb = closure_layer_albedo(i, sd.wi);
        w = min(max(w - alb, vec3<f32>(0.0)), w);
      }
    }
    diffuse_setup(N, base * w);
  } else if (stype == ST_DIFFUSE) {
    var c = sv3(sh + SH_BASE_COLOR);
    let t = su(sh + SH_BASE_COLOR_TEX);
    if (t != NONE) { c = c * texture_lookup(t, sd.tu, sd.tv).xyz; }
    diffuse_setup(sd.N, c);
  } else if (stype == ST_GLOSSY) {
    let c = sv3(sh + SH_BASE_COLOR);
    let i = bsdf_alloc(c);
    if (i != NONE) {
      let r = clamp(sf(sh + SH_ROUGHNESS), 0.0, 1.0);
      cls[i].N = valid_reflection_N(sd.N);
      cls[i].ior = 1.0;
      cls[i].alpha = r * r;
      cls[i].alphaY = cls[i].alpha;
      cls[i].ctype = CLOSURE_GGX;
      sd.runtimeFlag |= SR_BSDF | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
      microfacet_preserve_energy(i, sd.wi, max(c, vec3<f32>(0.0)));
    }
  } else if (stype == ST_GLASS) {
    let i = bsdf_alloc(vec3<f32>(1.0));
    if (i != NONE) {
      cls[i].N = valid_reflection_N(sd.N);
      let r = clamp(sf(sh + SH_ROUGHNESS), 0.0, 1.0);
      cls[i].alpha = r * r;
      cls[i].alphaY = cls[i].alpha;
      let ior = max(sf(sh + SH_IOR), 1e-5);
      cls[i].ior = select(ior, 1.0 / ior, backfacing);
      cls[i].f0 = vec3<f32>(F0_from_ior(ior));
      cls[i].f90 = vec3<f32>(1.0);
      cls[i].exponent = -ior;
      let c = max(sv3(sh + SH_BASE_COLOR), vec3<f32>(0.0));
      cls[i].tintR = c;
      cls[i].tintT = c;
      cls[i].ctype = CLOSURE_GGX_GLASS;
      sd.runtimeFlag |= SR_BSDF | SR_BSDF_HAS_TRANSMISSION | select(SR_BSDF_HAS_EVAL, 0u, almost_specular(cls[i].alpha, cls[i].alphaY));
      setup_fresnel_generalized_schlick(i, sd.wi, true);
    }
  } else if (stype == ST_EMISSION) {
    emission_setup(sv3(sh + SH_EMISSION));
  } else if (stype == ST_TRANSPARENT) {
    transparent_setup(sv3(sh + SH_BASE_COLOR));
  }
}

fn shader_has_transparency(shader: u32) -> bool {
  let sh = hdr(H_SHADERS) + shader * SHADER_SIZE;
  let t = su(sh + SH_TYPE);
  if (t == ST_TRANSPARENT) { return true; }
  if (t == ST_PRINCIPLED) { return (su(sh + SH_FLAGS) & SF_HAS_ALPHA) != 0u; }
  return false;
}
`;
  }
});

// src/gpu/wgsl/kernels.ts
var WGSL_KERNELS, WGSL_PREP;
var init_kernels = __esm({
  "src/gpu/wgsl/kernels.ts"() {
    "use strict";
    WGSL_KERNELS = /* wgsl */
    `
const PATH_RAY_CAMERA: u32 = 1u;
const PATH_RAY_REFLECT: u32 = 2u;
const PATH_RAY_TRANSMIT: u32 = 4u;
const PATH_RAY_DIFFUSE: u32 = 8u;
const PATH_RAY_GLOSSY: u32 = 16u;
const PATH_RAY_SINGULAR: u32 = 32u;
const PATH_RAY_TRANSPARENT: u32 = 64u;
const PATH_RAY_MIS_SKIP: u32 = 128u;
const PATH_RAY_MIS_HAD_TRANSMISSION: u32 = 256u;
const PATH_RAY_TERMINATE_ON_NEXT_SURFACE: u32 = 512u;
const PATH_RAY_TERMINATE_AFTER_TRANSPARENT: u32 = 1024u;
const PATH_RAY_TRANSPARENT_BACKGROUND: u32 = 2048u;
const PATH_RAY_DIFFUSE_ANCESTOR: u32 = 4096u;
const PATH_RAY_TERMINATE: u32 = 1536u;

fn queue_push(q: u32, p: u32) {
  let slot = atomicAdd(&ctr[q], 1u);
  qidx[q * numPaths() + slot] = p;
}
fn queue_count(q: u32) -> u32 { return atomicLoad(&ctr[CTR_ACTIVE + q]); }
fn queue_get(q: u32, i: u32) -> u32 { return qidx[q * numPaths() + i]; }

const PATH_RAY_DENOISING_FEATURES: u32 = 8192u;
fn film_stride() -> u32 { return param(P_FILM_STRIDE); }
fn sample_is_class_A(sample: u32) -> bool { return (countOneBits(sample & 0xaaaaaaaau) & 1u) == 1u; }

// Film write of light reaching the camera, clamped as Cycles clamps per sample. With the extra passes the class A samples also go to the adaptive aux buffer, twice over (film_write_adaptive_buffer), and emission or background seen while the path writes features goes to the albedo pass (film_write_emission_or_background_pass); direct light from shadow rays does not.
fn film_write(p: u32, c: vec3<f32>, bounce: u32, direct: bool) {
  var L = select(c, vec3<f32>(0.0), any(c != c) || any(abs(c) > vec3<f32>(FLT_MAX)));
  let limit = select(paramf(P_CLAMP_DIRECT), paramf(P_CLAMP_INDIRECT), bounce > 0u);
  if (limit > 0.0) {
    let sum = abs(L.x) + abs(L.y) + abs(L.z);
    if (sum > limit) { L = L * (limit / sum); }
  }
  let stride = film_stride();
  let o = paths[p].pixel * stride;
  film[o] += L.x;
  film[o + 1u] += L.y;
  film[o + 2u] += L.z;
  if (stride == 16u) {
    if (sample_is_class_A(paths[p].sample)) {
      film[o + 4u] += 2.0 * L.x;
      film[o + 5u] += 2.0 * L.y;
      film[o + 6u] += 2.0 * L.z;
    }
    if (!direct && (paths[p].flag & PATH_RAY_DENOISING_FEATURES) != 0u) {
      let a = paths[p].featT * c;
      if (all(a == a) && all(abs(a) <= vec3<f32>(FLT_MAX))) {
        film[o + 8u] += a.x;
        film[o + 9u] += a.y;
        film[o + 10u] += a.z;
      }
    }
  }
}
fn film_add(p: u32, c: vec3<f32>, bounce: u32) { film_write(p, c, bounce, false); }

fn smoothstep_e(e0: f32, e1: f32, x: f32) -> f32 {
  let t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// film_write_denoising_features_surface with Cycles' default options (follow reflections, albedo roughness weighting), as the CPU kernel's writeDenoisingFeatures.
struct DenoiseFeatures { featT: vec3<f32>, keep: bool };
fn write_denoising_features(pixel: u32, featT: vec3<f32>) -> DenoiseFeatures {
  var n = vec3<f32>(0.0);
  var dif = vec3<f32>(0.0);
  var spec = vec3<f32>(0.0);
  var transp = vec3<f32>(0.0);
  var sum_w = 0.0;
  var sum_ns = 0.0;
  for (var i = 0u; i < numClosure; i++) {
    let t = cls[i].ctype;
    if (!closure_is_bsdf(t)) { continue; }
    if (t == CLOSURE_TRANSPARENT) { transp += cls[i].w; continue; }
    var alb = vec3<f32>(1.0);
    if (closure_is_microfacet(t)) { alb = microfacet_estimate_albedo(i, sd.wi, true, true); }
    let a = cls[i].w * alb;
    let w = avg3(a);
    n += cls[i].N * w;
    var rough = 1.0;
    if (closure_is_microfacet(t)) { rough = sqrt(cls[i].alpha * cls[i].alphaY); }
    let dw = smoothstep_e(0.0, 0.15, rough);
    dif += a * dw;
    spec += a * (1.0 - dw);
    sum_w += w;
    sum_ns += w * dw;
  }
  let total_w = sum_w + avg3(transp);
  var fw = 0.0;
  if (sum_w > 0.0) {
    n = n / sum_w;
    fw = smoothstep_e(0.0, 0.5, sum_ns / sum_w);
  }
  let deferred = 1.0 - fw;
  if (fw > 0.0) {
    let o = pixel * 16u;
    let opaque = select(1.0, sum_w / total_w, total_w > 0.0);
    let k = opaque * fw * avg3(featT);
    let c = vec3<f32>(
      paramf(P_CAM_TO_WORLD) * n.x + paramf(P_CAM_TO_WORLD + 4u) * n.y + paramf(P_CAM_TO_WORLD + 8u) * n.z,
      paramf(P_CAM_TO_WORLD + 1u) * n.x + paramf(P_CAM_TO_WORLD + 5u) * n.y + paramf(P_CAM_TO_WORLD + 9u) * n.z,
      paramf(P_CAM_TO_WORLD + 2u) * n.x + paramf(P_CAM_TO_WORLD + 6u) * n.y + paramf(P_CAM_TO_WORLD + 10u) * n.z) * k;
    if (all(c == c) && all(abs(c) <= vec3<f32>(FLT_MAX))) {
      film[o + 12u] += c.x;
      film[o + 13u] += c.y;
      film[o + 14u] += c.z;
    }
    let al = dif * fw * featT;
    if (all(al == al) && all(abs(al) <= vec3<f32>(FLT_MAX))) {
      film[o + 8u] += al.x;
      film[o + 9u] += al.y;
      film[o + 10u] += al.z;
    }
  }
  let q = spec * deferred + transp;
  if (max(abs(q.x), max(abs(q.y), abs(q.z))) > 1e-4) { return DenoiseFeatures(featT * q, true); }
  return DenoiseFeatures(featT, false);
}
fn film_add_direct(p: u32, c: vec3<f32>, bounce: u32) { film_write(p, c, bounce, true); }
fn path_finish(p: u32) {
  film[paths[p].pixel * film_stride() + 3u] += paths[p].alpha;
}

@compute @workgroup_size(1)
fn k_next_sample() {
  atomicAdd(&ctr[CTR_SAMPLE], 1u);
}

// ---- init_from_camera
@compute @workgroup_size(64)
fn k_init(@builtin(global_invocation_id) gid: vec3<u32>) {
  let p = gid.x;
  if (p >= numPaths()) { return; }
  let tw = param(P_TILE_W);
  let x = param(P_TILE_X) + p % tw;
  let y = param(P_TILE_Y) + p / tw;
  let width = param(P_WIDTH);
  let height = param(P_HEIGHT);
  let sample = param(P_SAMPLE_START) + atomicLoad(&ctr[CTR_SAMPLE]);
  let stride = film_stride();
  // film_need_sample_pixel: adaptive sampling skips pixels whose converged flag is set.
  if (stride == 16u) {
    let fo = (y * width + x) * 16u;
    if (param(P_ADAPTIVE) != 0u && film[fo + 11u] != 0.0) { return; }
    film[fo + 7u] += 1.0;
  }
  var st: PathState;
  st.pixel = y * width + x;
  st.rngPixel = hash_iqnt2d(x, y) ^ param(P_SEED);
  st.sample = sample;
  st.rngOffset = 0u;
  paths[p] = st;
  let f = path_rng_2d(p, PRNG_FILTER);
  let fx = lut1(f.x, hdr(H_FILTER_TABLE), FILTER_TABLE_SIZE);
  let fy = lut1(f.y, hdr(H_FILTER_TABLE), FILTER_TABLE_SIZE);
  let sx = ((f32(x) + fx) / f32(width)) * 2.0 - 1.0;
  let sy = 1.0 - ((f32(y) + fy) / f32(height)) * 2.0;
  let tanH = paramf(P_CAM_TAN_HALF_FOV);
  var D = vec3<f32>(sx * tanH * paramf(P_CAM_ASPECT), sy * tanH, -1.0);
  var Pc = vec3<f32>(0.0);
  let aperture = paramf(P_CAM_APERTURE);
  if (aperture > 0.0) {
    let lens = sample_uniform_disk(path_rng_2d(p, PRNG_LENS_TIME)) * aperture;
    let focus = D * (paramf(P_CAM_FOCUS) / -D.z);
    Pc = vec3<f32>(lens, 0.0);
    D = focus - Pc;
  }
  let m0 = vec4<f32>(paramf(P_CAM_TO_WORLD), paramf(P_CAM_TO_WORLD + 1u), paramf(P_CAM_TO_WORLD + 2u), paramf(P_CAM_TO_WORLD + 3u));
  let m1 = vec4<f32>(paramf(P_CAM_TO_WORLD + 4u), paramf(P_CAM_TO_WORLD + 5u), paramf(P_CAM_TO_WORLD + 6u), paramf(P_CAM_TO_WORLD + 7u));
  let m2 = vec4<f32>(paramf(P_CAM_TO_WORLD + 8u), paramf(P_CAM_TO_WORLD + 9u), paramf(P_CAM_TO_WORLD + 10u), paramf(P_CAM_TO_WORLD + 11u));
  let Dw = normalize(vec3<f32>(dot(m0.xyz, D), dot(m1.xyz, D), dot(m2.xyz, D)));
  let Pw = vec3<f32>(dot(m0.xyz, Pc) + m0.w, dot(m1.xyz, Pc) + m1.w, dot(m2.xyz, Pc) + m2.w);
  paths[p].P = Pw;
  paths[p].D = Dw;
  paths[p].tmin = 0.0;
  paths[p].tmax = FLT_MAX;
  paths[p].selfPrim = NONE;
  paths[p].T = vec3<f32>(1.0);
  paths[p].misRayPdf = 0.0;
  paths[p].minRayPdf = FLT_MAX;
  paths[p].misN = vec3<f32>(0.0);
  paths[p].contProb = 1.0;
  paths[p].flag = PATH_RAY_CAMERA | PATH_RAY_MIS_SKIP | PATH_RAY_TRANSPARENT_BACKGROUND | select(0u, PATH_RAY_DENOISING_FEATURES, param(P_DENOISING_FEATURES) != 0u && stride == 16u);
  paths[p].featT = vec3<f32>(1.0);
  paths[p].cameraVisible = 1u;
  paths[p].rngOffset = PRNG_BOUNCE_NUM;
  paths[p].alpha = 0.0;
  queue_push(Q_INTERSECT, p);
}

// ---- BVH traversal (closest and any hit)
struct Hit { prim: u32, t: f32, u: f32, v: f32 };
fn node_entry(o: u32, P: vec3<f32>, idir: vec3<f32>, tmin: f32, tmax: f32) -> f32 {
  let t0 = (sv3(o) - P) * idir;
  let t1 = (sv3(o + 4u) - P) * idir;
  let lo3 = min(t0, t1);
  let hi3 = max(t0, t1);
  let lo = max(max(lo3.x, lo3.y), max(lo3.z, tmin));
  let hi = min(min(hi3.x, hi3.y), min(hi3.z, tmax));
  if (lo > hi) { return FLT_MAX; }
  return lo;
}

// Ordered traversal, as the CPU kernel's: the nearer child first, the farther pushed with its entry distance and skipped when popped behind the closest hit; ties at equal t go to the lower triangle index.
fn intersect_closest(P: vec3<f32>, D: vec3<f32>, tmin: f32, tmax: f32, self_prim: u32, ignore: u32) -> Hit {
  var hit = Hit(NONE, tmax, 0.0, 0.0);
  if (hdr(H_NUM_TRIS) == 0u) { return hit; }
  let nodes = hdr(H_NODES);
  let ti = hdr(H_TRI_INFO);
  let idir = 1.0 / D;
  if (node_entry(nodes, P, idir, tmin, hit.t) == FLT_MAX) { return hit; }
  var stack: array<u32, 64>;
  var stackT: array<f32, 64>;
  var sp = 0u;
  var node = 0u;
  loop {
    let o = nodes + node * NODE_SIZE;
    let count = su(o + 7u);
    var next = false;
    if (count > 0u) {
      let first = su(o + 3u);
      for (var k = first; k < first + count; k++) {
        if (k == self_prim) { continue; }
        if (ignore != 0u && (su(ti + k * TRI_INFO_SIZE + TI_FLAGS) & ignore) != 0u) { continue; }
        let h = ray_triangle_intersect(P, D, tmin, hit.t, tri_vert(k, 0u), tri_vert(k, 1u), tri_vert(k, 2u));
        if (h.ok && (hit.prim == NONE || h.t < hit.t || k < hit.prim)) { hit = Hit(k, h.t, h.u, h.v); }
      }
    } else {
      let left = node + 1u;
      let right = su(o + 3u);
      let tl = node_entry(nodes + left * NODE_SIZE, P, idir, tmin, hit.t);
      let tr = node_entry(nodes + right * NODE_SIZE, P, idir, tmin, hit.t);
      if (tl != FLT_MAX && tr != FLT_MAX && sp < 64u) {
        if (tl <= tr) { stack[sp] = right; stackT[sp] = tr; node = left; }
        else { stack[sp] = left; stackT[sp] = tl; node = right; }
        sp += 1u;
        next = true;
      } else if (tl != FLT_MAX) { node = left; next = true; }
      else if (tr != FLT_MAX) { node = right; next = true; }
    }
    if (!next) {
      var found = false;
      loop {
        if (sp == 0u) { break; }
        sp -= 1u;
        if (stackT[sp] <= hit.t) { node = stack[sp]; found = true; break; }
      }
      if (!found) { break; }
    }
  }
  return hit;
}

fn continuation_probability(p: u32) -> f32 {
  let st = paths[p];
  if ((st.flag & PATH_RAY_TRANSPARENT) != 0u) {
    if (st.transpB <= 0u) { return 1.0; }
  } else if (st.bounce <= param(P_MIN_BOUNCE)) { return 1.0; }
  return min(sqrt(max3(abs(st.T))), 1.0);
}

fn next_float_up(t: f32) -> f32 {
  if (!(t > 0.0) || t >= FLT_MAX) { return t; }
  return bitcast<f32>(bitcast<u32>(t) + 1u);
}

// ---- intersect_closest
@compute @workgroup_size(64)
fn k_intersect(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_INTERSECT)) { return; }
  let p = queue_get(Q_INTERSECT, gid.x);
  let st = paths[p];
  let ignore = select(0u, TF_CAMERA_INVISIBLE, st.cameraVisible != 0u);
  let hit = intersect_closest(st.P, st.D, st.tmin, st.tmax, st.selfPrim, ignore);
  paths[p].hitPrim = hit.prim;
  paths[p].hitT = hit.t;
  paths[p].hitU = hit.u;
  paths[p].hitV = hit.v;
  let tSurface = select(st.tmax, hit.t, hit.prim != NONE);
  if (hdr(H_NUM_HITTABLE_LIGHTS) > 0u) {
    let lh = lights_intersect(st.P, st.D, st.tmin, tSurface, st.cameraVisible != 0u);
    if (lh.lamp != NONE) {
      paths[p].lamp = lh.lamp;
      paths[p].lampT = lh.t;
      queue_push(Q_LIGHT, p);
      return;
    }
  }
  if (hit.prim == NONE) {
    queue_push(Q_BACKGROUND, p);
    return;
  }
  let shader = su(hdr(H_TRI_INFO) + hit.prim * TRI_INFO_SIZE + TI_SHADER);
  let sflags = su(hdr(H_SHADERS) + shader * SHADER_SIZE + SH_FLAGS);
  let cp = continuation_probability(p);
  paths[p].contProb = cp;
  if (cp != 1.0) {
    let terminate = path_rng_1d(p, PRNG_TERMINATE);
    if (cp == 0.0 || terminate >= cp) {
      if ((sflags & SF_HAS_EMISSION) != 0u) {
        paths[p].flag = paths[p].flag | PATH_RAY_TERMINATE_ON_NEXT_SURFACE;
      } else {
        path_finish(p);
        return;
      }
    }
  }
  queue_push(Q_SURFACE, p);
}

// ---- shade_light (lamps hit by rays are transparent to the path)
// The probability of having picked lamp 'lamp' by next-event estimation from the path's previous vertex: the light tree's pdf there, or the flat distribution's share.
fn lamp_selection_pdf(lamp: u32, P: vec3<f32>, misN: vec3<f32>, flag: u32) -> f32 {
  if (!use_light_tree()) { return sf(H_PDF_LIGHTS); }
  let e = su(lamp_base(lamp) + LT_TREE_EMITTER);
  if (e == NONE) { return 0.0; }
  return light_tree_pdf(P, misN, (flag & PATH_RAY_MIS_HAD_TRANSMISSION) != 0u, e);
}

@compute @workgroup_size(64)
fn k_shade_light(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_LIGHT)) { return; }
  let p = queue_get(Q_LIGHT, gid.x);
  let st = paths[p];
  let le = lamp_eval_from_intersection(st.lamp, st.P, st.D, st.lampT, st.misN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) != 0u);
  if (!is_zero3(le.E)) {
    var mis = 1.0;
    if ((st.flag & PATH_RAY_MIS_SKIP) == 0u) { mis = power_heuristic(st.misRayPdf, le.pdf * lamp_selection_pdf(st.lamp, st.P, st.misN, st.flag)); }
    film_add(p, st.T * le.E * mis, st.bounce);
    if (st.cameraVisible != 0u) { paths[p].alpha = 1.0; }
  }
  let tb = st.transpB + 1u;
  paths[p].transpB = tb;
  if (tb >= param(P_MAX_TRANSPARENT)) { path_finish(p); return; }
  paths[p].tmin = next_float_up(st.lampT);
  queue_push(Q_INTERSECT, p);
}

// ---- shade_background
@compute @workgroup_size(64)
fn k_shade_background(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_BACKGROUND)) { return; }
  let p = queue_get(Q_BACKGROUND, gid.x);
  let st = paths[p];
  if ((st.flag & PATH_RAY_MIS_SKIP) == 0u || st.cameraVisible != 0u) {
    let n = hdr(H_NUM_HITTABLE_LIGHTS);
    for (var i = 0u; i < n; i++) {
      let lamp = su(hdr(H_HITTABLE_LIGHTS) + i);
      let L = lamp_base(lamp);
      if (su(L + LT_TYPE) != LTY_SUN) { continue; }
      let flags = su(L + LT_FLAGS);
      if (st.cameraVisible != 0u) { if ((flags & LF_CAMERA_VISIBLE) == 0u) { continue; } }
      else if ((flags & LF_USE_MIS) == 0u) { continue; }
      let le = lamp_eval_from_intersection(lamp, st.P, st.D, FLT_MAX, st.misN, false);
      if (le.pdf == 0.0) { continue; }
      var mis = 1.0;
      if ((st.flag & PATH_RAY_MIS_SKIP) == 0u) { mis = power_heuristic(st.misRayPdf, le.pdf * lamp_selection_pdf(lamp, st.P, st.misN, st.flag)); }
      film_add(p, st.T * le.E * mis, st.bounce);
    }
  }
  let transparentBg = (st.flag & PATH_RAY_TRANSPARENT_BACKGROUND) != 0u;
  if (!(transparentBg && param(P_BG_CAMERA_VISIBLE) == 0u)) {
    let E = background_eval(st.D);
    if (!is_zero3(E)) {
      var mis = 1.0;
      if (hdr(H_BACKGROUND_LIGHT) != NONE && (hdr(H_FLAGS) & SCF_BACKGROUND_MIS) != 0u && (st.flag & PATH_RAY_MIS_SKIP) == 0u) {
        mis = power_heuristic(st.misRayPdf, background_light_pdf(st.D) * lamp_selection_pdf(hdr(H_BACKGROUND_LIGHT), st.P, st.misN, st.flag));
      }
      film_add(p, st.T * E * mis, st.bounce);
    }
    if (transparentBg) { paths[p].alpha = 1.0; }
  }
  path_finish(p);
}

// MIS over all closures (Cycles _surface_shader_bsdf_eval_mis).
struct MisEval { E: vec3<f32>, pdf: f32 };
fn eval_mis(wo: vec3<f32>, skip: u32, sum_pdf_in: f32, sum_sw_in: f32, E_in: vec3<f32>) -> MisEval {
  var E = E_in;
  var sum_pdf = sum_pdf_in;
  var sum_sw = sum_sw_in;
  for (var i = 0u; i < numClosure; i++) {
    if (i == skip) { continue; }
    if (!closure_is_bsdf(cls[i].ctype)) { continue; }
    let e = bsdf_eval(i, sd.wi, wo);
    if (e.pdf != 0.0) {
      E = E + e.f * cls[i].w;
      sum_pdf += e.pdf * cls[i].sampleWeight;
    }
    sum_sw += cls[i].sampleWeight;
  }
  return MisEval(E, select(0.0, sum_pdf / sum_sw, sum_sw > 0.0));
}

fn offset_component(p: f32, n: f32) -> f32 {
  if (abs(p) < 1.0 / 32.0) { return p + n / 65536.0; }
  let ofi = i32(256.0 * n);
  return bitcast<f32>(bitcast<i32>(p) + select(ofi, -ofi, p < 0.0));
}

fn surface_ray_offset(P: vec3<f32>, D: vec3<f32>) -> vec3<f32> {
  let v0 = tri_vert(sd.prim, 0u) - P;
  let v1 = tri_vert(sd.prim, 1u) - P;
  let v2 = tri_vert(sd.prim, 2u) - P;
  let e0 = v2 - v0;
  let e1 = v0 - v1;
  let e2 = v1 - v2;
  let U = dot(cross(v2 + v0, e0), D);
  let V = dot(cross(v0 + v1, e1), D);
  let W = dot(cross(v1 + v2, e2), D);
  let eps = 1.1920929e-7 * abs(U + V + W);
  if (min(U, min(V, W)) >= eps || max(U, max(V, W)) <= -eps) { return P; }
  return vec3<f32>(offset_component(P.x, sd.Ng.x), offset_component(P.y, sd.Ng.y), offset_component(P.z, sd.Ng.z));
}

struct ShadowOrigin { P: vec3<f32>, skipSelf: bool };
fn shadow_ray_offset(L: vec3<f32>) -> ShadowOrigin {
  var P = sd.P;
  if ((sd.triFlags & TF_SMOOTH) == 0u) { return ShadowOrigin(P, true); }
  let cutoff = 0.1;
  var NL = dot(sd.N, L);
  let transmit = NL < 0.0;
  NL = abs(NL);
  let Ng = select(sd.Ng, -sd.Ng, transmit);
  let NgL = dot(Ng, L);
  let amount = select(clamp(1.0 - NgL / cutoff, 0.0, 1.0), clamp(2.0 - (NgL + NL) / cutoff, 0.0, 1.0), NL < cutoff);
  if (!(amount > 0.0)) { return ShadowOrigin(P, true); }
  let ti = hdr(H_TRI_INFO) + sd.prim * TRI_INFO_SIZE;
  let vn = hdr(H_VERT_NORMALS);
  let V0 = tri_vert(sd.prim, 0u);
  let V1 = tri_vert(sd.prim, 1u);
  let V2 = tri_vert(sd.prim, 2u);
  let N0 = sv3(vn + su(ti + TI_V0) * 4u);
  let N1 = sv3(vn + su(ti + TI_V1) * 4u);
  let N2 = sv3(vn + su(ti + TI_V2) * 4u);
  let u = 1.0 - sd.u - sd.v;
  let v = sd.u;
  let w = sd.v;
  let Pl = V0 * u + V1 * v + V2 * w;
  let n = N0 * u + N1 * v + N2 * w;
  let a = dot(N2 - N0, V0 - V2);
  let b = dot(N2 - N1, V1 - V2);
  let c = dot(N1 - N0, V1 - V0);
  var h = a * u * (u - 1.0) + (a + b + c) * u * v + b * v * (v - 1.0);
  if (dot(n, Ng) > 0.0) {
    var h0 = max(max(dot(V1 - V0, N0), dot(V2 - V0, N0)), 0.0);
    var h1 = max(max(dot(V0 - V1, N1), dot(V2 - V1, N1)), 0.0);
    var h2 = max(max(dot(V0 - V2, N2), dot(V1 - V2, N2)), 0.0);
    h0 = max(dot(V0 - Pl, N0) + h0, 0.0);
    h1 = max(dot(V1 - Pl, N1) + h1, 0.0);
    h2 = max(dot(V2 - Pl, N2) + h2, 0.0);
    h = max(min(min(h0, h1), h2), h * 0.5);
  } else {
    var h0 = max(max(dot(V0 - V1, N0), dot(V0 - V2, N0)), 0.0);
    var h1 = max(max(dot(V1 - V0, N1), dot(V1 - V2, N1)), 0.0);
    var h2 = max(max(dot(V2 - V0, N2), dot(V2 - V1, N2)), 0.0);
    h0 = max(dot(Pl - V0, N0) + h0, 0.0);
    h1 = max(dot(Pl - V1, N1) + h1, 0.0);
    h2 = max(dot(Pl - V2, N2) + h2, 0.0);
    h = min(-min(min(h0, h1), h2), h * 0.5);
  }
  P = P + n * h * amount;
  return ShadowOrigin(P, NgL > 0.0);
}

// ---- shade_surface
@compute @workgroup_size(64)
fn k_shade_surface(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_SURFACE)) { return; }
  let p = queue_get(Q_SURFACE, gid.x);
  var st = paths[p];
  shader_setup(st.hitPrim, st.hitU, st.hitV, st.hitT, st.D);
  eval_surface_shader();
  if ((st.flag & PATH_RAY_TERMINATE) != 0u) {
    var keep = 0u;
    for (var i = 0u; i < numClosure; i++) {
      if (cls[i].ctype != CLOSURE_TRANSPARENT) { continue; }
      cls[keep] = cls[i];
      keep += 1u;
    }
    numClosure = keep;
    if (keep == 0u) { sd.runtimeFlag &= ~(SR_BSDF | SR_BSDF_HAS_EVAL); }
    else { sd.runtimeFlag &= ~SR_BSDF_HAS_EVAL; }
  }
  // surface_shader_prepare_closures: filter glossy.
  let fg = paramf(P_FILTER_GLOSSY);
  if (fg > 0.0) {
    let blurPdf = fg * st.minRayPdf;
    if (blurPdf < 1.0) {
      let blurRough = sqrt(1.0 - blurPdf) * 0.5;
      for (var i = 0u; i < numClosure; i++) {
        if (closure_is_microfacet(cls[i].ctype)) {
          cls[i].alpha = max(blurRough, cls[i].alpha);
          cls[i].alphaY = max(blurRough, cls[i].alphaY);
        }
      }
      if (!almost_specular(blurRough, blurRough)) { sd.runtimeFlag |= SR_BSDF_HAS_EVAL; }
    }
  }
  if (st.cameraVisible != 0u) {
    if ((sd.runtimeFlag & SR_TRANSPARENT) == 0u) { st.alpha = 1.0; }
    else { st.alpha = 1.0 - (1.0 - st.alpha) * clamp(avg3(sd.Tr), 0.0, 1.0); }
  }
  // Emission.
  if ((sd.runtimeFlag & SR_EMISSION) != 0u) {
    let E = select(vec3<f32>(0.0), sd.E, abs(dot(sd.Ng, sd.wi)) > 0.0);
    let sflags = su(hdr(H_SHADERS) + sd.shader * SHADER_SIZE + SH_FLAGS);
    var mis = 1.0;
    if ((st.flag & PATH_RAY_MIS_SKIP) == 0u && (sflags & SF_USE_MIS) != 0u) {
      var lpdf = triangle_light_pdf(sd.prim, sd.Ng, sd.wi, sd.P, sd.rayLength);
      if (use_light_tree()) {
        let e = su(hdr(H_TRI_INFO) + sd.prim * TRI_INFO_SIZE + TI_EMITTER);
        lpdf = select(lpdf * light_tree_pdf(st.P, st.misN, (st.flag & PATH_RAY_MIS_HAD_TRANSMISSION) != 0u, e), 0.0, e == NONE);
      }
      mis = power_heuristic(st.misRayPdf, lpdf);
    }
    film_add(p, st.T * E * mis, st.bounce);
  }
  let cp = select(st.contProb, 0.0, (st.flag & PATH_RAY_TERMINATE_ON_NEXT_SURFACE) != 0u);
  if (cp == 0.0) { paths[p].alpha = st.alpha; path_finish(p); return; }
  if (cp != 1.0) { st.T = st.T / cp; }
  if ((st.flag & PATH_RAY_DENOISING_FEATURES) != 0u) {
    let df = write_denoising_features(st.pixel, st.featT);
    st.featT = df.featT;
    if (!df.keep) { st.flag &= ~PATH_RAY_DENOISING_FEATURES; }
  }
  // Direct light.
  if ((hdr(H_FLAGS) & SCF_USE_DIRECT_LIGHT) != 0u && (sd.runtimeFlag & SR_BSDF_HAS_EVAL) != 0u) {
    let rl = path_rng_3d(p, PRNG_LIGHT);
    let ls = light_sample_from_position(rl, sd.P, sd.N, (sd.runtimeFlag & SR_BSDF_HAS_TRANSMISSION) != 0u);
    var ok = ls.ok != 0u;
    let is_t = dot(ls.D, sd.N) < 0.0;
    if (ok && ls.prim != NONE && ls.prim == sd.prim) {
      if (dot(ls.D, select(sd.Ng, -sd.Ng, is_t)) > 0.0) { ok = false; }
    }
    if (ok) {
      let usesMis = ls.prim != NONE || (su(lamp_base(ls.lamp) + LT_FLAGS) & LF_USE_MIS) != 0u;
      let me = eval_mis(ls.D, NONE, 0.0, 0.0, vec3<f32>(0.0));
      let bsdf_pdf = select(0.0, me.pdf, usesMis);
      let mis = power_heuristic(ls.pdf, bsdf_pdf);
      let C = me.E * ls.E * (ls.evalFac / ls.pdf * mis);
      if (!is_zero3(C)) {
        let so = shadow_ray_offset(ls.D);
        var P = so.P;
        var D = ls.D;
        var tmax = FLT_MAX;
        if (ls.t < FLT_MAX) {
          let toL = ls.P - P;
          tmax = length(toL);
          D = select(toL, toL / tmax, tmax > 0.0);
        }
        if (so.skipSelf) { P = surface_ray_offset(P, D); }
        let slot = p;
        shadows[slot].P = P;
        shadows[slot].D = D;
        shadows[slot].tmax = tmax;
        shadows[slot].C = st.T * C;
        shadows[slot].path = p;
        shadows[slot].selfPrim = select(NONE, sd.prim, so.skipSelf);
        shadows[slot].lightPrim = ls.prim;
        shadows[slot].transpB = st.transpB;
        shadows[slot].bounce = st.bounce;
        if (ls.castShadow != 0u) { queue_push(Q_SHADOW, slot); }
        else { film_add_direct(p, st.T * C, st.bounce); }
      }
    }
  }
  // BSDF bounce.
  if ((sd.runtimeFlag & SR_BSDF) == 0u || numClosure == 0u) { paths[p].alpha = st.alpha; path_finish(p); return; }
  var r = path_rng_3d(p, PRNG_SURFACE_BSDF);
  var sampled = 0u;
  if (numClosure > 1u) {
    var sum = 0.0;
    for (var i = 0u; i < numClosure; i++) { sum += cls[i].sampleWeight; }
    let rr = r.z * sum;
    var partial = 0.0;
    for (var i = 0u; i < numClosure; i++) {
      let next = partial + cls[i].sampleWeight;
      if (rr < next) {
        sampled = i;
        r.z = (rr - partial) / cls[i].sampleWeight;
        break;
      }
      partial = next;
    }
  }
  let s = bsdf_sample(sampled, sd.Ng, sd.wi, r);
  if (s.pdf == 0.0) { paths[p].alpha = st.alpha; path_finish(p); return; }
  var E = s.f * cls[sampled].w;
  var pdf = s.pdf;
  if (numClosure > 1u) {
    let me = eval_mis(s.wo, sampled, s.pdf * cls[sampled].sampleWeight, cls[sampled].sampleWeight, E);
    E = me.E;
    pdf = me.pdf;
  }
  if (pdf == 0.0 || is_zero3(E) || s.label == LABEL_NONE) { paths[p].alpha = st.alpha; path_finish(p); return; }
  let D = normalize(s.wo);
  st.P = surface_ray_offset(sd.P, D);
  st.D = D;
  st.tmin = 0.0;
  st.tmax = FLT_MAX;
  st.selfPrim = sd.prim;
  st.T = st.T * E / pdf;
  if ((s.label & LABEL_TRANSPARENT) == 0u) {
    st.misRayPdf = pdf;
    st.misN = sd.N;
    st.minRayPdf = min(pdf, st.minRayPdf);
  }
  // path_state_next
  var flag = st.flag;
  if ((s.label & LABEL_TRANSPARENT) != 0u) {
    st.transpB += 1u;
    flag |= PATH_RAY_TRANSPARENT;
    if (st.transpB >= param(P_MAX_TRANSPARENT)) { flag |= PATH_RAY_TERMINATE_ON_NEXT_SURFACE; }
  } else {
    let bounce = st.bounce + 1u;
    if (bounce >= param(P_MAX_BOUNCE)) { flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT; }
    flag &= ~(PATH_RAY_REFLECT | PATH_RAY_SINGULAR | PATH_RAY_TRANSPARENT | PATH_RAY_MIS_SKIP | PATH_RAY_MIS_HAD_TRANSMISSION | PATH_RAY_CAMERA);
    st.cameraVisible = 0u;
    if ((s.label & LABEL_REFLECT) != 0u) {
      flag |= PATH_RAY_REFLECT;
      flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
      if ((s.label & LABEL_DIFFUSE) != 0u) {
        st.diffuseB += 1u;
        if (st.diffuseB >= param(P_MAX_DIFFUSE)) { flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT; }
      } else {
        st.glossyB += 1u;
        if (st.glossyB >= param(P_MAX_GLOSSY)) { flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT; }
      }
    } else {
      flag &= ~PATH_RAY_TRANSPARENT_BACKGROUND;
      st.transB += 1u;
      if (st.transB >= param(P_MAX_TRANSMISSION)) { flag |= PATH_RAY_TERMINATE_AFTER_TRANSPARENT; }
    }
    if ((s.label & LABEL_DIFFUSE) != 0u) { flag |= PATH_RAY_DIFFUSE | PATH_RAY_DIFFUSE_ANCESTOR; }
    else if ((s.label & LABEL_GLOSSY) != 0u) { flag |= PATH_RAY_GLOSSY; }
    else if ((s.label & LABEL_SINGULAR) != 0u) { flag |= PATH_RAY_GLOSSY | PATH_RAY_SINGULAR | PATH_RAY_MIS_SKIP; }
    if ((sd.runtimeFlag & SR_BSDF_HAS_TRANSMISSION) != 0u) { flag |= PATH_RAY_MIS_HAD_TRANSMISSION; }
    if ((s.label & LABEL_TRANSMIT) != 0u) { flag |= PATH_RAY_TRANSMIT; }
    st.bounce = bounce;
  }
  st.flag = flag;
  st.rngOffset += PRNG_BOUNCE_NUM;
  paths[p] = st;
  queue_push(Q_INTERSECT, p);
}

// ---- intersect_shadow + shade_shadow
@compute @workgroup_size(64)
fn k_shadow(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_SHADOW)) { return; }
  let s = queue_get(Q_SHADOW, gid.x);
  let sh = shadows[s];
  var T = vec3<f32>(1.0);
  var tmin = 0.0;
  var self_prim = sh.selfPrim;
  var transp = sh.transpB;
  for (var guard = 0u; guard < 256u; guard++) {
    let hit = intersect_closest(sh.P, sh.D, tmin, sh.tmax, self_prim, TF_SHADOW_INVISIBLE);
    if (hit.prim == NONE) {
      film_add_direct(sh.path, sh.C * T, sh.bounce);
      return;
    }
    if (hit.prim == sh.lightPrim) {
      tmin = next_float_up(hit.t);
      continue;
    }
    let shader = su(hdr(H_TRI_INFO) + hit.prim * TRI_INFO_SIZE + TI_SHADER);
    if (!shader_has_transparency(shader)) { return; }
    transp += 1u;
    if (transp >= param(P_MAX_TRANSPARENT)) { return; }
    shader_setup(hit.prim, hit.u, hit.v, hit.t, sh.D);
    eval_surface_shader();
    T = T * select(vec3<f32>(0.0), sd.Tr, (sd.runtimeFlag & SR_TRANSPARENT) != 0u);
    if (is_zero3(T)) { return; }
    self_prim = hit.prim;
    tmin = hit.t;
  }
}

// Paths still alive after the last wave of a sample are written out as they are.
@compute @workgroup_size(64)
fn k_flush(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= queue_count(Q_INTERSECT)) { return; }
  path_finish(queue_get(Q_INTERSECT, gid.x));
}
`;
    WGSL_PREP = /* wgsl */
    `
const CTR_ACTIVE: u32 = 8u;
@group(0) @binding(0) var<storage, read_write> ctr: array<atomic<u32>>;
@group(0) @binding(1) var<storage, read_write> args: array<u32>;
override QUEUE: u32 = 0u;

// Snapshot the queue's count for its consumer, reset it for producers, and size the consumer's dispatch.
@compute @workgroup_size(1)
fn k_prep() {
  let n = atomicExchange(&ctr[QUEUE], 0u);
  atomicStore(&ctr[CTR_ACTIVE + QUEUE], n);
  args[QUEUE * 4u] = (n + 63u) / 64u;
  args[QUEUE * 4u + 1u] = 1u;
  args[QUEUE * 4u + 2u] = 1u;
}
`;
  }
});

// src/gpu/renderer.ts
var renderer_exports = {};
__export(renderer_exports, {
  GpuRenderer: () => GpuRenderer,
  kernelSource: () => kernelSource,
  probeWebGpu: () => probeWebGpu
});
function kernelSource() {
  return [wgslLayout(), WGSL_COMMON, WGSL_BSDF, WGSL_LIGHT, WGSL_LIGHT_TREE, WGSL_SHADE, WGSL_KERNELS].join("\n");
}
async function probeWebGpu() {
  const gpu = globalThis.navigator?.gpu;
  if (!gpu) return { ok: false, reason: "navigator.gpu is not available (WebGPU is disabled, unsupported, or the page is not a secure context)" };
  let adapter = null;
  try {
    adapter = await gpu.requestAdapter({ powerPreference: "high-performance" });
  } catch (e) {
    return { ok: false, reason: `requestAdapter failed: ${e instanceof Error ? e.message : String(e)}` };
  }
  if (!adapter) return { ok: false, reason: "no WebGPU adapter is available" };
  const lim = adapter.limits;
  try {
    const device = await adapter.requestDevice({
      requiredLimits: {
        maxStorageBufferBindingSize: lim.maxStorageBufferBindingSize,
        maxBufferSize: lim.maxBufferSize,
        maxStorageBuffersPerShaderStage: Math.min(8, lim.maxStorageBuffersPerShaderStage)
      }
    });
    const info = adapter.info;
    const name = info ? [info.vendor, info.architecture, info.description].filter(Boolean).join(" ") : "adapter";
    return { ok: true, device, info: `gpu: ${name || "WebGPU"}` };
  } catch (e) {
    return { ok: false, reason: `requestDevice failed: ${e instanceof Error ? e.message : String(e)}` };
  }
}
var PATH_STATE_BYTES, SHADOW_STATE_BYTES, NUM_QUEUES, CTR_WORDS, MAX_PATHS, GpuRenderer;
var init_renderer2 = __esm({
  "src/gpu/renderer.ts"() {
    "use strict";
    init_compile();
    init_layout();
    init_params();
    init_renderer();
    init_adaptive();
    init_integrator();
    init_layout2();
    init_common();
    init_bsdf2();
    init_light2();
    init_light_tree3();
    init_shade();
    init_kernels();
    PATH_STATE_BYTES = 176;
    SHADOW_STATE_BYTES = 64;
    NUM_QUEUES = 5;
    CTR_WORDS = 64;
    MAX_PATHS = 256 * 1024;
    GpuRenderer = class _GpuRenderer {
      backend = "gpu";
      info;
      fallbackReason;
      film = { width: 0, height: 0, sum: new Float32Array(0), samples: 0 };
      device;
      pipelines;
      layout;
      compiled = null;
      desc = null;
      settings = null;
      camera = null;
      buffers = null;
      bindGroup = null;
      prepGroup = null;
      maxPaths = 0;
      generation = 0;
      stopped = false;
      lost = null;
      gpuError = null;
      constructor(device, info, pipelines, layout) {
        this.device = device;
        this.info = info;
        this.pipelines = pipelines;
        this.layout = layout;
        void device.lost.then((l) => this.lost = l.message || "device lost");
        device.addEventListener("uncapturederror", (e) => {
          this.gpuError ??= e.error.message;
        });
      }
      static async create(device, info) {
        device.pushErrorScope("validation");
        const module = device.createShaderModule({ code: kernelSource(), label: "cycles-wavefront" });
        const ci = await module.getCompilationInfo();
        const errors = ci.messages.filter((m) => m.type === "error");
        if (errors.length) throw new Error(`WGSL compilation failed: ${errors.map((m) => `${m.lineNum}:${m.linePos} ${m.message}`).join("; ")}`);
        const entries = [
          { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
          { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
          { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: "uniform" } },
          { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 6, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
          { binding: 7, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } }
        ];
        const layout = device.createBindGroupLayout({ entries });
        const pl = device.createPipelineLayout({ bindGroupLayouts: [layout] });
        const make = (entryPoint, constants) => device.createComputePipelineAsync({ layout: pl, compute: { module, entryPoint, constants }, label: entryPoint });
        const prepModule = device.createShaderModule({ code: WGSL_PREP, label: "cycles-prep" });
        const prepLayout = device.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
            { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } }
          ]
        });
        const prepPl = device.createPipelineLayout({ bindGroupLayouts: [prepLayout] });
        const [init, intersect, light, background, surface, shadow, flush, nextSample, ...prep] = await Promise.all([
          make("k_init"),
          make("k_intersect"),
          make("k_shade_light"),
          make("k_shade_background"),
          make("k_shade_surface"),
          make("k_shadow"),
          make("k_flush"),
          make("k_next_sample"),
          ...Array.from({ length: NUM_QUEUES }, (_, q) => device.createComputePipelineAsync({ layout: prepPl, compute: { module: prepModule, entryPoint: "k_prep", constants: { QUEUE: q } }, label: `k_prep_${q}` }))
        ]);
        const err = await device.popErrorScope();
        if (err) throw new Error(`WebGPU validation: ${err.message}`);
        return new _GpuRenderer(device, info, { init, intersect, light, background, surface, shadow, flush, nextSample, prep, prepLayout }, layout);
      }
      async setScene(scene, settings) {
        this.stop();
        const s = resolveSettings(settings);
        this.settings = s;
        this.desc = scene;
        this.camera = scene.camera;
        this.compiled = compileScene(scene, s);
        this.destroyBuffers();
        const d = this.device;
        const c = this.compiled;
        const maxBinding = d.limits.maxStorageBufferBindingSize;
        const maxPaths = Math.min(MAX_PATHS, s.width * s.height, Math.floor(maxBinding / PATH_STATE_BYTES));
        this.maxPaths = maxPaths;
        if (c.scene.byteLength > maxBinding) throw new Error(`scene buffer of ${c.scene.byteLength} bytes exceeds this device's storage binding limit of ${maxBinding}`);
        const buf = (size, usage, label) => d.createBuffer({ size: Math.max(16, Math.ceil(size / 16) * 16), usage, label });
        const S = GPUBufferUsage;
        const scenebuf = buf(c.scene.byteLength, S.STORAGE | S.COPY_DST, "scene");
        d.queue.writeBuffer(scenebuf, 0, c.scene);
        const texels = buf(c.texels.byteLength, S.STORAGE | S.COPY_DST, "texels");
        d.queue.writeBuffer(texels, 0, c.texels);
        const filmBytes = s.width * s.height * this.filmStride() * 4;
        this.buffers = {
          scene: scenebuf,
          texels,
          params: buf(PARAMS_SIZE * 4, S.UNIFORM | S.COPY_DST, "params"),
          paths: buf(maxPaths * PATH_STATE_BYTES, S.STORAGE, "paths"),
          shadows: buf(maxPaths * SHADOW_STATE_BYTES, S.STORAGE, "shadows"),
          ctr: buf(CTR_WORDS * 4, S.STORAGE | S.COPY_DST, "counters"),
          args: buf(NUM_QUEUES * 4 * 4, S.STORAGE | S.INDIRECT, "dispatch-args"),
          qidx: buf(NUM_QUEUES * maxPaths * 4, S.STORAGE, "queues"),
          film: buf(filmBytes, S.STORAGE | S.COPY_SRC | S.COPY_DST, "film"),
          readback: buf(filmBytes, S.MAP_READ | S.COPY_DST, "readback")
        };
        const b = this.buffers;
        this.bindGroup = d.createBindGroup({
          layout: this.layout,
          entries: [b.scene, b.texels, b.params, b.paths, b.shadows, b.ctr, b.qidx, b.film].map((buffer, binding) => ({ binding, resource: { buffer } }))
        });
        this.prepGroup = d.createBindGroup({ layout: this.pipelines.prepLayout, entries: [b.ctr, b.args].map((buffer, binding) => ({ binding, resource: { buffer } })) });
        this.resetFilm();
      }
      setCamera(camera) {
        this.camera = camera;
        this.stop();
        this.resetFilm();
      }
      adaptive = null;
      allConverged = false;
      /** Film floats per pixel on the GPU: RGBA alone, or RGBA and the extra passes (P.FILM_STRIDE). */
      filmStride() {
        const s = this.settings;
        return s.adaptiveThreshold > 0 || s.denoisingPasses ? 16 : 4;
      }
      resetFilm() {
        const s = this.settings;
        const n = s.width * s.height;
        this.generation++;
        this.film = { width: s.width, height: s.height, sum: new Float32Array(n * 4), samples: 0 };
        this.adaptive = adaptiveSampling(s.adaptiveThreshold, s.adaptiveMinSamples);
        this.allConverged = false;
        if (this.filmStride() === 16) {
          this.film.ext = new Float32Array(n * EXT_STRIDE);
          this.film.converged = new Uint8Array(n);
        }
        if (this.buffers) this.device.queue.writeBuffer(this.buffers.film, 0, new Float32Array(n * this.filmStride()));
      }
      stop() {
        this.stopped = true;
      }
      /** Waves per sample: every non-transparent bounce, every transparent bounce (lamps count as one) and the final hit. */
      waves() {
        const s = this.settings;
        return s.maxBounces + s.maxTransparentBounces + 2;
      }
      encodeSamples(enc, n, tilePixels) {
        const p = this.pipelines;
        const pass = enc.beginComputePass();
        const main = this.bindGroup;
        const prepGroup = this.prepGroup;
        const args = this.buffers.args;
        pass.setBindGroup(0, main);
        const stage = (q, pipeline) => {
          pass.setPipeline(p.prep[q]);
          pass.setBindGroup(0, prepGroup);
          pass.dispatchWorkgroups(1);
          pass.setPipeline(pipeline);
          pass.setBindGroup(0, main);
          pass.dispatchWorkgroupsIndirect(args, q * 4 * 4);
        };
        const W = this.waves();
        for (let s = 0; s < n; s++) {
          pass.setPipeline(p.init);
          pass.dispatchWorkgroups(Math.ceil(tilePixels / 64));
          for (let w = 0; w < W; w++) {
            stage(0, p.intersect);
            stage(1, p.light);
            stage(2, p.background);
            stage(3, p.surface);
            stage(4, p.shadow);
          }
          stage(0, p.flush);
          pass.setPipeline(p.nextSample);
          pass.dispatchWorkgroups(1);
        }
        pass.end();
      }
      async render(onProgress) {
        if (!this.settings || !this.buffers) throw new Error("setScene() first");
        this.stopped = false;
        const s = this.settings;
        const gen = this.generation;
        const d = this.device;
        const b = this.buffers;
        const t0 = performance.now();
        const passes = alignSchedule(this.adaptive, passSchedule(s.samples));
        const stride = this.filmStride();
        let progress = { samples: this.film.samples, totalSamples: s.samples, elapsedMs: 0, done: this.film.samples >= s.samples || this.allConverged };
        const rowsPerTile = Math.max(1, Math.floor(this.maxPaths / s.width));
        let acc = 0;
        for (const n of passes) {
          const sampleStart = acc;
          acc += n;
          if (acc <= this.film.samples) continue;
          if (this.stopped || gen !== this.generation || this.allConverged) break;
          if (this.lost) throw new Error(`WebGPU device lost: ${this.lost}`);
          for (let y = 0; y < s.height; y += rowsPerTile) {
            const th = Math.min(rowsPerTile, s.height - y);
            const params = makeParams(this.camera, s, { sampleStart, sampleCount: n, totalSamples: s.samples, backgroundCameraVisible: this.desc?.world?.visibleToCamera });
            params[P.TILE_X] = 0;
            params[P.TILE_Y] = y;
            params[P.TILE_W] = s.width;
            params[P.TILE_H] = th;
            d.queue.writeBuffer(b.params, 0, params);
            d.queue.writeBuffer(b.ctr, 0, new Uint32Array(CTR_WORDS));
            const enc2 = d.createCommandEncoder();
            this.encodeSamples(enc2, n, s.width * th);
            d.queue.submit([enc2.finish()]);
          }
          const enc = d.createCommandEncoder();
          enc.copyBufferToBuffer(b.film, 0, b.readback, 0, s.width * s.height * stride * 4);
          d.queue.submit([enc.finish()]);
          await b.readback.mapAsync(GPUMapMode.READ);
          if (this.gpuError) {
            b.readback.unmap();
            throw new Error(`WebGPU error: ${this.gpuError}`);
          }
          if (gen !== this.generation) {
            b.readback.unmap();
            break;
          }
          const npx = s.width * s.height;
          const mapped = new Float32Array(b.readback.getMappedRange());
          let raw = null;
          if (stride === 4) this.film.sum.set(mapped.subarray(0, npx * 4));
          else {
            raw = mapped.slice(0, npx * 16);
            const sum = this.film.sum;
            const ext = this.film.ext;
            for (let i = 0; i < npx; i++) {
              for (let c = 0; c < 4; c++) sum[i * 4 + c] = raw[i * 16 + c];
              for (let c = 0; c < EXT_STRIDE; c++) ext[i * EXT_STRIDE + c] = raw[i * 16 + 4 + c];
            }
          }
          b.readback.unmap();
          this.film.samples += n;
          if (this.adaptive && raw && needFilter(this.adaptive, acc - 1)) {
            const conv = this.film.converged;
            this.allConverged = convergenceCheck(this.adaptive, s.width, s.height, this.film.sum, this.film.ext, conv) === 0;
            for (let i = 0; i < npx; i++) raw[i * 16 + 4 + EXT.FLAG] = conv[i];
            d.queue.writeBuffer(b.film, 0, raw);
          }
          progress = { samples: this.film.samples, totalSamples: s.samples, elapsedMs: performance.now() - t0, done: this.film.samples >= s.samples || this.allConverged };
          onProgress?.(progress, this.film);
          if (this.allConverged) break;
        }
        return progress;
      }
      destroyBuffers() {
        if (!this.buffers) return;
        for (const b of Object.values(this.buffers)) b.destroy();
        this.buffers = null;
      }
      dispose() {
        this.stop();
        this.destroyBuffers();
        this.device.destroy();
      }
    };
  }
});

// src/index.ts
init_compile();

// src/three/adapter.ts
init_math();
var RepeatWrapping = 1e3;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var HalfFloatType = 1016;
function halfToFloat2(h) {
  const s = h & 32768 ? -1 : 1;
  const e = h >> 10 & 31;
  const m = h & 1023;
  if (e === 0) return s * m * 2 ** -24;
  if (e === 31) return m ? NaN : s * Infinity;
  return s * (1 + m / 1024) * 2 ** (e - 15);
}
function readImage(tex) {
  const img = tex.image;
  if (!img || !img.width || !img.height) return null;
  const w = img.width;
  const h = img.height;
  if (img.data) {
    const src = img.data;
    const channels = Math.round(src.length / (w * h));
    const isHalf = tex.type === HalfFloatType || src instanceof Uint16Array;
    const isFloat = isHalf || src instanceof Float32Array;
    if (isFloat) {
      const out2 = new Float32Array(w * h * 4);
      for (let i = 0; i < w * h; i++) {
        for (let c = 0; c < 4; c++) {
          let v = c < channels ? src[i * channels + c] : c === 3 ? 1 : 0;
          if (isHalf && c < channels) v = halfToFloat2(v);
          out2[i * 4 + c] = v;
        }
      }
      return { width: w, height: h, data: out2 };
    }
    const out = new Uint8ClampedArray(w * h * 4);
    for (let i = 0; i < w * h; i++) for (let c = 0; c < 4; c++) out[i * 4 + c] = c < channels ? src[i * channels + c] : c === 3 ? 255 : 0;
    return { width: w, height: h, data: out };
  }
  const g = globalThis;
  let ctx = null;
  if (g.OffscreenCanvas) ctx = new g.OffscreenCanvas(w, h).getContext("2d");
  else if (g.document) {
    const c = g.document.createElement("canvas");
    c.width = w;
    c.height = h;
    ctx = c.getContext("2d");
  }
  if (!ctx) return null;
  try {
    ctx.drawImage(img, 0, 0);
    return { width: w, height: h, data: ctx.getImageData(0, 0, w, h).data };
  } catch {
    return null;
  }
}
function linearColor(c, def) {
  return c ? [c.r, c.g, c.b] : def;
}
function anisotropyToCycles(roughness, anisotropy, rotation, warnings) {
  const r2 = Math.max(roughness, 1e-4) ** 2;
  const at = r2 + (1 - r2) * anisotropy * anisotropy;
  const ratio = r2 / at;
  let anisotropic = (1 - ratio) / 0.9;
  if (anisotropic > 1) {
    anisotropic = 1;
    warnings.add("anisotropy beyond what Cycles can represent (alpha ratio over 10) is clamped");
  }
  return { roughness: Math.sqrt(Math.sqrt(at * r2)), anisotropic, anisotropicRotation: rotation / (2 * Math.PI) };
}
function fromThreeCamera(threeCamera) {
  threeCamera.updateMatrixWorld?.(true);
  const fovV = threeCamera.fov * Math.PI / 180;
  const zoom = threeCamera.zoom ?? 1;
  return {
    position: [threeCamera.matrixWorld.elements[12], threeCamera.matrixWorld.elements[13], threeCamera.matrixWorld.elements[14]],
    matrix: Array.from(threeCamera.matrixWorld.elements),
    fov: 2 * Math.atan(Math.tan(fovV / 2) / zoom)
  };
}
function fromThreeScene(threeScene, threeCamera, opts = {}) {
  const warnings = /* @__PURE__ */ new Set();
  const textures = [];
  const texIndex = /* @__PURE__ */ new Map();
  const materials = [];
  const matIndex = /* @__PURE__ */ new Map();
  const meshes = [];
  const lights = [];
  const lightScale = opts.lightScale ?? 1;
  threeScene.updateMatrixWorld?.(true);
  threeCamera.updateMatrixWorld?.(true);
  const texRef = (t, srgbDefault) => {
    if (!t) return void 0;
    let i = texIndex.get(t.uuid);
    if (i === void 0) {
      const px = readImage(t);
      if (!px) {
        warnings.add("a texture whose image could not be read (not loaded yet, or cross-origin) was ignored");
        return void 0;
      }
      const wrap2 = (m) => m === RepeatWrapping ? "repeat" : m === MirroredRepeatWrapping ? "mirror" : "clamp";
      const cs = t.colorSpace === "srgb" ? "srgb" : t.colorSpace === void 0 || t.colorSpace === "" ? srgbDefault ? "srgb" : "linear" : "linear";
      textures.push({ width: px.width, height: px.height, data: px.data, colorSpace: cs, wrapS: wrap2(t.wrapS), wrapT: wrap2(t.wrapT), filter: t.magFilter === NearestFilter ? "nearest" : "linear", flipY: !t.flipY });
      i = textures.length - 1;
      texIndex.set(t.uuid, i);
    }
    let transform;
    if (t.matrix) {
      if (t.matrixAutoUpdate !== false) t.updateMatrix?.();
      const e = t.matrix.elements;
      const tr = [e[0], e[3], e[6], e[1], e[4], e[7]];
      if (!(tr[0] === 1 && tr[1] === 0 && tr[2] === 0 && tr[3] === 0 && tr[4] === 1 && tr[5] === 0)) transform = tr;
    }
    return { texture: i, transform };
  };
  const material = (m) => {
    let i = matIndex.get(m);
    if (i !== void 0) return i;
    let out;
    const t = m.type;
    if (t === "MeshStandardMaterial" || t === "MeshPhysicalMaterial") {
      const emissiveIntensity = m.emissiveIntensity ?? 1;
      const em = linearColor(m.emissive, [0, 0, 0]);
      const hasEm = em[0] > 0 || em[1] > 0 || em[2] > 0;
      let mr = m.metalnessMap ?? m.roughnessMap ?? null;
      if (m.metalnessMap && m.roughnessMap && m.metalnessMap !== m.roughnessMap) {
        warnings.add("separate metalness and roughness maps: only the metalness map is used");
        mr = m.metalnessMap;
      }
      out = {
        type: "principled",
        name: m.name,
        baseColor: linearColor(m.color, [1, 1, 1]),
        baseColorTexture: texRef(m.map, true),
        metallic: m.metalness ?? 0,
        roughness: m.roughness ?? 1,
        metallicRoughnessTexture: texRef(mr, false),
        emissionColor: em,
        emissionStrength: hasEm ? emissiveIntensity : 0,
        emissionTexture: hasEm ? texRef(m.emissiveMap, true) : void 0,
        normalTexture: texRef(m.normalMap, false),
        normalScale: m.normalScale ? m.normalScale.x : 1,
        alpha: m.transparent ? m.opacity ?? 1 : 1
      };
      if (t === "MeshPhysicalMaterial") {
        out.transmission = m.transmission ?? 0;
        out.transmissionTexture = texRef(m.transmissionMap, false);
        out.ior = m.ior ?? 1.5;
        out.specularIorLevel = 0.5 * (m.specularIntensity ?? 1);
        out.specularTint = linearColor(m.specularColor, [1, 1, 1]);
        if ((m.clearcoat ?? 0) > 0) {
          out.coatWeight = m.clearcoat;
          out.coatWeightTexture = texRef(m.clearcoatMap, false);
          out.coatRoughness = m.clearcoatRoughness ?? 0;
          out.coatRoughnessTexture = texRef(m.clearcoatRoughnessMap, false);
          out.coatIor = 1.5;
          out.coatNormalTexture = texRef(m.clearcoatNormalMap, false);
          out.coatNormalScale = m.clearcoatNormalScale ? m.clearcoatNormalScale.x : 1;
          out.coatNormal = "geometry";
        }
        if ((m.sheen ?? 0) > 0) {
          out.sheenWeight = m.sheen;
          out.sheenTint = linearColor(m.sheenColor, [0, 0, 0]);
          out.sheenTintTexture = texRef(m.sheenColorMap, true);
          out.sheenRoughness = m.sheenRoughness ?? 1;
          out.sheenRoughnessTexture = texRef(m.sheenRoughnessMap, false);
        }
        const aniso = Math.min(Math.max(m.anisotropy ?? 0, 0), 1);
        if (aniso > 0) Object.assign(out, anisotropyToCycles(out.roughness ?? 1, aniso, m.anisotropyRotation ?? 0, warnings));
        if (m.anisotropyMap && aniso > 0) warnings.add("anisotropyMap is ignored: anisotropy is uniform over the surface");
        if ((m.iridescence ?? 0) > 0) warnings.add("iridescence is not rendered yet");
      } else {
        out.ior = 1.5;
      }
    } else if (t === "MeshBasicMaterial" && opts.basicAsEmission !== false) {
      out = { type: "emission", name: m.name, color: linearColor(m.color, [1, 1, 1]), strength: 1 };
    } else if (t === "MeshLambertMaterial" || t === "MeshPhongMaterial" || t === "MeshToonMaterial" || t === "MeshMatcapMaterial") {
      out = { type: "diffuse", name: m.name, color: linearColor(m.color, [1, 1, 1]), colorTexture: texRef(m.map, true) };
      warnings.add(`${t} is rendered as diffuse`);
    } else {
      out = { type: "principled", name: m.name, baseColor: linearColor(m.color, [0.8, 0.8, 0.8]), roughness: 0.5 };
      warnings.add(`${t} is rendered as a default Principled BSDF`);
    }
    i = materials.length;
    materials.push(out);
    matIndex.set(m, i);
    return i;
  };
  const geometryOf = (g) => {
    const pos = g.attributes.position;
    if (!pos) return null;
    const read = (a, size) => {
      if (!a) return void 0;
      if (!a.isInterleavedBufferAttribute && a.itemSize === size && a.array instanceof Float32Array) return a.array;
      const out = new Float32Array(a.count * size);
      for (let i = 0; i < a.count; i++) {
        out[i * size] = a.getX(i);
        out[i * size + 1] = a.getY(i);
        if (size > 2) out[i * size + 2] = a.getZ(i);
      }
      return out;
    };
    return {
      positions: read(pos, 3),
      normals: read(g.attributes.normal, 3),
      uvs: read(g.attributes.uv, 2),
      indices: g.index ? Array.from(g.index.array) : void 0,
      groups: g.groups.length ? g.groups.map((x) => ({ start: x.start, count: x.count, materialIndex: x.materialIndex ?? 0 })) : void 0
    };
  };
  const geoCache = /* @__PURE__ */ new Map();
  const visit = (o) => {
    if (o.isMesh && o.geometry && o.material) {
      let geo = geoCache.get(o.geometry);
      if (geo === void 0) {
        geo = geometryOf(o.geometry);
        geoCache.set(o.geometry, geo);
      }
      if (!geo) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      if (mats.every((m) => m.visible === false)) return;
      const matIds = mats.map(material);
      const base = Array.from(o.matrixWorld.elements);
      const add = (matrix) => meshes.push({ name: o.name, geometry: geo, matrix, material: Array.isArray(o.material) ? matIds : matIds[0] });
      if (o.isInstancedMesh && o.instanceMatrix && o.count) {
        const im = o.instanceMatrix.array;
        for (let i = 0; i < o.count; i++) add(mat4Multiply(base, Array.from({ length: 16 }, (_, k) => im[i * 16 + k])));
      } else add(base);
      return;
    }
    if (o.isLight) {
      const e = o.matrixWorld.elements;
      const pos = [e[12], e[13], e[14]];
      const color = linearColor(o.color, [1, 1, 1]);
      const I = (o.intensity ?? 1) * lightScale;
      switch (o.type) {
        case "PointLight":
          lights.push({ type: "point", name: o.name, position: pos, color, strength: 4 * Math.PI * I, radius: 0 });
          break;
        case "SpotLight": {
          const te = o.target?.matrixWorld.elements;
          const dir = te ? [te[12] - pos[0], te[13] - pos[1], te[14] - pos[2]] : [0, -1, 0];
          lights.push({ type: "spot", name: o.name, position: pos, direction: dir, angle: 2 * (o.angle ?? Math.PI / 3), blend: o.penumbra ?? 0, color, strength: 4 * Math.PI * I });
          break;
        }
        case "DirectionalLight": {
          const te = o.target?.matrixWorld.elements;
          const dir = te ? [te[12] - pos[0], te[13] - pos[1], te[14] - pos[2]] : [0, -1, 0];
          lights.push({ type: "sun", name: o.name, direction: dir, color, strength: I, angle: 0 });
          break;
        }
        case "RectAreaLight": {
          const w = o.width ?? 10;
          const h = o.height ?? 10;
          const normal = [-e[8], -e[9], -e[10]];
          const tangent = [e[0], e[1], e[2]];
          const sx = Math.hypot(e[0], e[1], e[2]);
          const sy = Math.hypot(e[4], e[5], e[6]);
          lights.push({ type: "area", name: o.name, position: pos, normal, tangent, width: w * sx, height: h * sy, color, strength: I * w * sx * h * sy * Math.PI });
          break;
        }
        case "AmbientLight":
        case "HemisphereLight":
          warnings.add(`${o.type} has no physical counterpart and is ignored; use an environment map`);
          break;
        default:
          warnings.add(`${o.type} is not supported`);
      }
    }
  };
  if (threeScene.traverseVisible) threeScene.traverseVisible(visit);
  else {
    const walk = (o) => {
      if (!o.visible) return;
      visit(o);
      for (const c of o.children) walk(c);
    };
    walk(threeScene);
  }
  const world = {};
  let backgroundColor;
  const bg = threeScene.background;
  const env = threeScene.environment ?? (bg?.isTexture ? bg : null);
  if (env) {
    const r = texRef(env, false);
    if (r) {
      world.map = r.texture;
      world.strength = threeScene.environmentIntensity ?? 1;
      world.rotation = -(threeScene.environmentRotation?.y ?? 0);
    }
    if (!bg) world.visibleToCamera = false;
    else if (bg.isColor) {
      world.visibleToCamera = false;
      backgroundColor = linearColor(bg, [0, 0, 0]);
    }
  } else if (bg && bg.isColor) {
    world.color = linearColor(bg, [0, 0, 0]);
    world.strength = 1;
  } else {
    world.color = [0, 0, 0];
    world.strength = 0;
    world.visibleToCamera = false;
  }
  const camera = fromThreeCamera(threeCamera);
  if (!threeCamera.isPerspectiveCamera) warnings.add("only perspective cameras are supported; the camera was treated as perspective");
  return { scene: { meshes, materials, textures, lights, camera, world }, warnings: [...warnings], backgroundColor };
}

// src/render/local.ts
init_globals();
init_integrator();
init_adaptive();
init_compile();
init_params();
function filmToLinear(film) {
  const out = new Float32Array(film.sum.length);
  const ext = film.ext;
  if (ext) {
    for (let i = 0; i < film.width * film.height; i++) {
      const c = ext[i * EXT_STRIDE + EXT.COUNT];
      const k2 = c > 0 ? 1 / c : 0;
      for (let j = 0; j < 4; j++) out[i * 4 + j] = film.sum[i * 4 + j] * k2;
    }
    return out;
  }
  const k = film.samples > 0 ? 1 / film.samples : 0;
  for (let i = 0; i < out.length; i++) out[i] = film.sum[i] * k;
  return out;
}
function filmPass(film, pass) {
  const ext = film.ext;
  if (!ext) return null;
  const n = film.width * film.height;
  const out = new Float32Array(n * 3);
  const at = pass === "albedo" ? EXT.ALBEDO : EXT.NORMAL;
  for (let i = 0; i < n; i++) {
    const c = ext[i * EXT_STRIDE + EXT.COUNT];
    const k = c > 0 ? 1 / c : 0;
    for (let j = 0; j < 3; j++) out[i * 3 + j] = ext[i * EXT_STRIDE + at + j] * k;
  }
  return out;
}
function filmSampleCounts(film) {
  const ext = film.ext;
  if (!ext) return null;
  const n = film.width * film.height;
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = ext[i * EXT_STRIDE + EXT.COUNT];
  return out;
}
function createIntegrator(buffers, params) {
  return new Integrator(new KernelGlobals(buffers), readParams(params));
}
function renderLocal(scene, settingsIn, opts = {}) {
  const settings = resolveSettings(settingsIn);
  const compiled = "scene" in scene && scene.scene instanceof Uint32Array ? scene : compileScene(scene, settings);
  const desc = scene;
  if (!("camera" in scene)) throw new Error("renderLocal needs the scene description for its camera");
  const params = makeParams(desc.camera, settings, { totalSamples: settings.samples, backgroundCameraVisible: opts.backgroundCameraVisible ?? desc.world?.visibleToCamera });
  const integrator = createIntegrator(compiled, params);
  const n = settings.width * settings.height;
  const film = { width: settings.width, height: settings.height, sum: new Float32Array(n * 4), samples: settings.samples };
  const adaptive = adaptiveSampling(settings.adaptiveThreshold, settings.adaptiveMinSamples);
  if (!adaptive && !settings.denoisingPasses) {
    integrator.renderTile(0, 0, settings.width, settings.height, opts.sampleStart ?? 0, settings.samples, film.sum);
    return film;
  }
  film.ext = new Float32Array(n * EXT_STRIDE);
  film.converged = new Uint8Array(n);
  let start = opts.sampleStart ?? 0;
  for (const k of alignSchedule(adaptive, [settings.samples])) {
    integrator.renderTile(0, 0, settings.width, settings.height, start, k, film.sum, film.ext, film.converged);
    start += k;
    if (adaptive && needFilter(adaptive, start - 1) && convergenceCheck(adaptive, settings.width, settings.height, film.sum, film.ext, film.converged) === 0) break;
  }
  return film;
}

// src/render/denoise.ts
function denoiseInput(film) {
  const n = film.width * film.height;
  const lin = filmToLinear(film);
  const color = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) color[i * 3 + c] = lin[i * 4 + c];
  return { width: film.width, height: film.height, color, albedo: filmPass(film, "albedo"), normal: filmPass(film, "normal"), samples: film.samples };
}
async function denoiseFilm(film, denoiser) {
  const input = denoiseInput(film);
  const out = await denoiser(input);
  const n = film.width * film.height;
  if (out.length < n * 3) throw new Error(`denoiser returned ${out.length} floats, expected ${n * 3}`);
  const lin = filmToLinear(film);
  const sum = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 3; c++) sum[i * 4 + c] = out[i * 3 + c];
    sum[i * 4 + 3] = lin[i * 4 + 3];
  }
  return { width: film.width, height: film.height, sum, samples: 1 };
}

// src/index.ts
init_adaptive();
init_renderer();
init_params();

// src/cpu/renderer.ts
init_compile();
init_params();
init_renderer();
init_adaptive();
init_integrator();
var isNode = typeof process !== "undefined" && !!process.versions?.node && typeof globalThis.window === "undefined";
function defaultWorkerUrl() {
  return new URL("./cycles-worker.js", import.meta.url);
}
async function spawn(url) {
  if (isNode) {
    const wt = await import(
      /* @vite-ignore */
      "node:worker_threads"
    );
    const u = typeof url === "string" ? new URL(url) : url;
    const w = new wt.Worker(u);
    return {
      post: (m, t) => w.postMessage(m, t ?? []),
      onMessage: (h) => w.on("message", (m) => h(m)),
      terminate: () => w.terminate()
    };
  }
  const href = typeof url === "string" ? url : url.href;
  let worker;
  const sameOrigin = (() => {
    try {
      return new URL(href, location.href).origin === location.origin;
    } catch {
      return false;
    }
  })();
  if (sameOrigin) worker = new Worker(href, { type: "module" });
  else {
    const blob = new Blob([`import ${JSON.stringify(href)};`], { type: "text/javascript" });
    worker = new Worker(URL.createObjectURL(blob), { type: "module" });
  }
  return {
    post: (m, t) => worker.postMessage(m, t ?? []),
    onMessage: (h) => worker.addEventListener("message", (e) => h(e.data)),
    terminate: () => worker.terminate()
  };
}
function canShareMemory() {
  if (typeof SharedArrayBuffer === "undefined") return false;
  if (isNode) return true;
  return globalThis.crossOriginIsolated === true;
}
function toShared(a) {
  const s = new Uint32Array(new SharedArrayBuffer(a.byteLength));
  s.set(a);
  return s;
}
function defaultWorkerCount() {
  const g = globalThis;
  if (isNode) return Math.max(1, Math.min(8, globalThis.__cyclesNodeCores ?? 2));
  return Math.max(1, Math.min(16, (g.navigator?.hardwareConcurrency ?? 4) - 1));
}
var CpuRenderer = class _CpuRenderer {
  backend = "cpu";
  info = "cpu";
  fallbackReason;
  film = { width: 0, height: 0, sum: new Float32Array(0), samples: 0 };
  workers = [];
  compiled = null;
  desc = null;
  settings = null;
  camera = null;
  generation = 0;
  stopped = false;
  tileSize;
  pending = /* @__PURE__ */ new Map();
  nextId = 1;
  error = null;
  shareMemory;
  sceneAcks = [];
  sceneTransfer = { mode: "copied", bytesCopied: 0 };
  constructor(tileSize, shareMemory) {
    this.tileSize = tileSize;
    this.shareMemory = shareMemory;
  }
  static async create(opts = {}) {
    const r = new _CpuRenderer(opts.tileSize ?? 32, opts.shareMemory !== false && canShareMemory());
    let count = opts.workers ?? defaultWorkerCount();
    if (isNode && opts.workers === void 0) {
      const os = await import(
        /* @vite-ignore */
        "node:os"
      );
      count = Math.max(1, os.availableParallelism?.() ?? os.cpus().length);
    }
    const url = opts.workerUrl ?? defaultWorkerUrl();
    const ready = [];
    for (let i = 0; i < count; i++) {
      const w = await spawn(url);
      ready.push(
        new Promise((resolve) => {
          w.onMessage((m) => {
            if (m.type === "ready") resolve();
            else if (m.type === "tile") r.pendingResolve(r, m);
            else if (m.type === "scene") r.sceneAcks.shift()?.(m.shared);
            else if (m.type === "error") r.error = m.message;
          });
        })
      );
      r.workers.push(w);
    }
    await Promise.all(ready);
    r.info = `cpu: ${count} worker${count === 1 ? "" : "s"}`;
    return r;
  }
  pendingResolve(r, m) {
    const cb = r.pending.get(m.id);
    if (cb) {
      r.pending.delete(m.id);
      cb(m);
    }
  }
  async setScene(scene, settings) {
    this.stop();
    const s = resolveSettings(settings);
    this.settings = s;
    this.desc = scene;
    this.camera = scene.camera;
    this.compiled = compileScene(scene, s);
    let sceneBuf = this.compiled.scene;
    let texelBuf = this.compiled.texels;
    const bytes = sceneBuf.byteLength + texelBuf.byteLength;
    if (this.shareMemory) {
      sceneBuf = toShared(sceneBuf);
      texelBuf = toShared(texelBuf);
    }
    const acks = this.workers.map(() => new Promise((resolve) => this.sceneAcks.push(resolve)));
    for (const w of this.workers) w.post({ type: "scene", scene: sceneBuf, texels: texelBuf });
    const shared = await Promise.all(acks);
    const allShared = shared.length > 0 && shared.every((x) => x);
    this.sceneTransfer = { mode: allShared ? "shared" : "copied", bytesCopied: allShared ? bytes : bytes * this.workers.length };
    this.resetFilm();
  }
  setCamera(camera) {
    this.camera = camera;
    this.stop();
    this.resetFilm();
  }
  adaptive = null;
  allConverged = false;
  resetFilm() {
    const s = this.settings;
    const n = s.width * s.height;
    this.film = { width: s.width, height: s.height, sum: new Float32Array(n * 4), samples: 0 };
    this.adaptive = adaptiveSampling(s.adaptiveThreshold, s.adaptiveMinSamples);
    this.allConverged = false;
    if (this.adaptive || s.denoisingPasses) {
      this.film.ext = new Float32Array(n * EXT_STRIDE);
      this.film.converged = new Uint8Array(n);
    }
    this.generation++;
    const params = makeParams(this.camera, s, { totalSamples: s.samples, backgroundCameraVisible: this.desc?.world?.visibleToCamera });
    for (const w of this.workers) w.post({ type: "params", params, generation: this.generation });
  }
  stop() {
    this.stopped = true;
  }
  async render(onProgress) {
    if (!this.settings || !this.compiled) throw new Error("setScene() first");
    this.stopped = false;
    const s = this.settings;
    const gen = this.generation;
    const t0 = performance.now();
    const passes = alignSchedule(this.adaptive, passSchedule(s.samples));
    const tiles = [];
    for (let y = 0; y < s.height; y += this.tileSize)
      for (let x = 0; x < s.width; x += this.tileSize) tiles.push([x, y, Math.min(this.tileSize, s.width - x), Math.min(this.tileSize, s.height - y)]);
    let progress = { samples: this.film.samples, totalSamples: s.samples, elapsedMs: 0, done: this.film.samples >= s.samples || this.allConverged };
    const film = this.film;
    const ext = film.ext;
    const converged = film.converged;
    let acc = 0;
    for (const n of passes) {
      const sampleStart = acc;
      acc += n;
      if (acc <= film.samples) continue;
      if (this.stopped || gen !== this.generation || this.allConverged) break;
      const passSum = new Float32Array(film.sum.length);
      const passExt = ext ? new Float32Array(ext.length) : null;
      let next = 0;
      const runWorker = async (w) => {
        while (next < tiles.length && !this.stopped && gen === this.generation) {
          const [x, y, tw, th] = tiles[next++];
          let mask;
          if (converged && this.adaptive) {
            mask = new Uint8Array(tw * th);
            let any = false;
            for (let j = 0; j < th; j++) {
              for (let i = 0; i < tw; i++) {
                const c = converged[(y + j) * s.width + x + i];
                mask[j * tw + i] = c;
                if (c) any = true;
              }
            }
            if (!any) mask = void 0;
          }
          const id = this.nextId++;
          const res = await new Promise((resolve) => {
            this.pending.set(id, resolve);
            w.post({ type: "tile", id, generation: gen, x, y, w: tw, h: th, sampleStart, sampleCount: n, ext: !!passExt, converged: mask });
          });
          if (this.error) throw new Error(`CPU worker failed: ${this.error}`);
          for (let j = 0; j < th; j++) {
            const dst = ((y + j) * s.width + x) * 4;
            passSum.set(res.data.subarray(j * tw * 4, (j + 1) * tw * 4), dst);
            if (passExt && res.ext) passExt.set(res.ext.subarray(j * tw * EXT_STRIDE, (j + 1) * tw * EXT_STRIDE), ((y + j) * s.width + x) * EXT_STRIDE);
          }
        }
      };
      await Promise.all(this.workers.map(runWorker));
      if (this.stopped || gen !== this.generation) break;
      const sum = film.sum;
      for (let i = 0; i < sum.length; i++) sum[i] += passSum[i];
      if (ext && passExt) for (let i = 0; i < ext.length; i++) ext[i] += passExt[i];
      film.samples += n;
      if (this.adaptive && ext && converged && needFilter(this.adaptive, acc - 1)) {
        this.allConverged = convergenceCheck(this.adaptive, s.width, s.height, sum, ext, converged) === 0;
      }
      progress = { samples: film.samples, totalSamples: s.samples, elapsedMs: performance.now() - t0, done: film.samples >= s.samples || this.allConverged };
      onProgress?.(progress, film);
      if (this.allConverged) break;
    }
    return progress;
  }
  dispose() {
    this.stop();
    for (const w of this.workers) w.terminate();
    this.workers = [];
  }
};

// src/scene/primitives.ts
function uvSphere(radius = 1, widthSegments = 48, heightSegments = 24) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  for (let iy = 0; iy <= heightSegments; iy++) {
    const v = iy / heightSegments;
    const theta = v * Math.PI;
    for (let ix = 0; ix <= widthSegments; ix++) {
      const u = ix / widthSegments;
      const phi = u * 2 * Math.PI;
      const x = -Math.cos(phi) * Math.sin(theta);
      const y = Math.cos(theta);
      const z = Math.sin(phi) * Math.sin(theta);
      positions.push(radius * x, radius * y, radius * z);
      normals.push(x, y, z);
      uvs.push(u, 1 - v);
    }
  }
  const row = widthSegments + 1;
  for (let iy = 0; iy < heightSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      const a = iy * row + ix + 1;
      const b = iy * row + ix;
      const c = (iy + 1) * row + ix;
      const d = (iy + 1) * row + ix + 1;
      if (iy !== 0) indices.push(a, b, d);
      if (iy !== heightSegments - 1) indices.push(b, c, d);
    }
  }
  return { positions: new Float32Array(positions), normals: new Float32Array(normals), uvs: new Float32Array(uvs), indices: new Uint32Array(indices) };
}
function plane(width = 1, depth = 1) {
  const w = width / 2;
  const d = depth / 2;
  return {
    positions: new Float32Array([-w, 0, d, w, 0, d, w, 0, -d, -w, 0, -d]),
    normals: new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]),
    uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    indices: new Uint32Array([0, 1, 2, 0, 2, 3])
  };
}
function box(sx = 1, sy = 1, sz = 1, opts = {}) {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  const faces = [
    { key: "+x", o: [hx, -hy, hz], a: [0, 0, -sz], b: [0, sy, 0] },
    { key: "-x", o: [-hx, -hy, -hz], a: [0, 0, sz], b: [0, sy, 0] },
    { key: "+y", o: [-hx, hy, hz], a: [sx, 0, 0], b: [0, 0, -sz] },
    { key: "-y", o: [-hx, -hy, -hz], a: [sx, 0, 0], b: [0, 0, sz] },
    { key: "+z", o: [-hx, -hy, hz], a: [sx, 0, 0], b: [0, sy, 0] },
    { key: "-z", o: [hx, -hy, -hz], a: [-sx, 0, 0], b: [0, sy, 0] }
  ];
  const positions = [];
  const indices = [];
  const groups = [];
  let slot = 0;
  for (const f of faces) {
    if (opts.omit?.includes(f.key)) continue;
    const base = positions.length / 3;
    const p = (s, t) => [f.o[0] + s * f.a[0] + t * f.b[0], f.o[1] + s * f.a[1] + t * f.b[1], f.o[2] + s * f.a[2] + t * f.b[2]];
    positions.push(...p(0, 0), ...p(1, 0), ...p(1, 1), ...p(0, 1));
    const start = indices.length;
    if (opts.inward) indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
    else indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    groups.push({ start, count: 6, materialIndex: slot++ });
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices), groups };
}
function trs(t, r = [0, 0, 0], s = [1, 1, 1]) {
  const [a, b, c] = r;
  const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
  const ae = ca * cc, af = ca * sc, be = sa * cc, bf = sa * sc;
  const m00 = cb * cc, m01 = -cb * sc, m02 = sb;
  const m10 = af + be * sb, m11 = ae - bf * sb, m12 = -sa * cb;
  const m20 = bf - ae * sb, m21 = be + af * sb, m22 = ca * cb;
  return [m00 * s[0], m10 * s[0], m20 * s[0], 0, m01 * s[1], m11 * s[1], m21 * s[1], 0, m02 * s[2], m12 * s[2], m22 * s[2], 0, t[0], t[1], t[2], 1];
}

// src/render/create.ts
async function createRenderer(opts = {}) {
  const backend = opts.backend ?? "auto";
  let reason;
  if (backend !== "cpu") {
    const { GpuRenderer: GpuRenderer2, probeWebGpu: probeWebGpu2 } = await Promise.resolve().then(() => (init_renderer2(), renderer_exports));
    const probe = await probeWebGpu2();
    if (probe.ok) {
      try {
        return await GpuRenderer2.create(probe.device, probe.info);
      } catch (e) {
        reason = `WebGPU pipeline creation failed: ${e instanceof Error ? e.message : String(e)}`;
      }
    } else reason = probe.reason;
  }
  const cpu = await CpuRenderer.create(opts);
  if (reason) cpu.fallbackReason = reason;
  return cpu;
}

// src/three/render.ts
init_renderer();
var raf = typeof requestAnimationFrame === "function" ? (cb) => requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
var cancelRaf = typeof cancelAnimationFrame === "function" ? (id) => cancelAnimationFrame(id) : (id) => clearTimeout(id);
var MATERIAL_KEYS = ["version", "roughness", "metalness", "transmission", "ior", "opacity", "transparent", "clearcoat", "clearcoatRoughness", "sheen", "sheenRoughness", "anisotropy", "anisotropyRotation", "emissiveIntensity", "specularIntensity", "visible"];
var COLOR_KEYS = ["color", "emissive", "sheenColor", "specularColor"];
var MAP_KEYS = ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "clearcoatNormalMap", "alphaMap"];
function sceneSignature(scene) {
  const parts = [];
  const seen = /* @__PURE__ */ new Set();
  const visit = (o) => {
    if (o.isCamera) return;
    parts.push(o.uuid ?? "");
    const m = o.matrixWorld?.elements;
    if (m) for (let i = 0; i < 16; i++) parts.push(m[i]);
    if (o.intensity !== void 0) parts.push(o.intensity);
    if (o.color && typeof o.color.r === "number") parts.push(o.color.r, o.color.g, o.color.b);
    const g = o.geometry;
    if (g) {
      parts.push(g.uuid ?? "");
      if (g.attributes) for (const k of Object.keys(g.attributes)) parts.push(k, g.attributes[k]?.version ?? 0);
      parts.push(g.index?.version ?? -1);
    }
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const mat of mats) {
      if (seen.has(mat)) {
        parts.push(mat.uuid ?? "");
        continue;
      }
      seen.add(mat);
      parts.push(mat.uuid ?? "", mat.type ?? "");
      for (const k of MATERIAL_KEYS) if (k in mat) parts.push(k, String(mat[k]));
      for (const k of COLOR_KEYS) {
        const c = mat[k];
        if (c && typeof c.r === "number") parts.push(c.r, c.g, c.b);
      }
      for (const k of MAP_KEYS) {
        const t = mat[k];
        parts.push(t ? `${t.uuid}:${t.version ?? 0}` : "-");
      }
    }
  };
  scene.updateMatrixWorld?.(false);
  if (scene.traverseVisible) scene.traverseVisible(visit);
  else visit(scene);
  const tex = (t) => t && typeof t === "object" && "uuid" in t ? `${t.uuid}:${t.version ?? 0}` : JSON.stringify(t ?? null);
  parts.push(tex(scene.background), tex(scene.environment), scene.environmentIntensity ?? 1, scene.backgroundIntensity ?? 1);
  return parts.join(",");
}
function cameraSignature(camera) {
  camera.updateMatrixWorld?.(false);
  return [...Array.from(camera.matrixWorld.elements), camera.fov, camera.zoom ?? 1].join(",");
}
function renderThreeScene(opts) {
  const ctx = opts.canvas.getContext("2d");
  if (!ctx) throw new Error("renderThreeScene needs a canvas with a 2D context");
  const watch = opts.watch !== false;
  let renderer = null;
  let warnings = [];
  let shownSamples = 0;
  let disposed = false;
  let stopped = false;
  let sceneDirty = true;
  let cameraDirty = false;
  let lastSceneSig = "";
  let lastCameraSig = "";
  let rafId = null;
  let wake = null;
  let resolveDone = () => {
  };
  let rejectDone = () => {
  };
  let done = new Promise((res, rej) => {
    resolveDone = res;
    rejectDone = rej;
  });
  const newDone = () => {
    done = new Promise((res, rej) => {
      resolveDone = res;
      rejectDone = rej;
    });
  };
  const size = () => {
    const k = opts.resolutionScale ?? 1;
    return { width: Math.max(1, Math.round(opts.canvas.width * k)), height: Math.max(1, Math.round(opts.canvas.height * k)) };
  };
  let scratch = null;
  const draw = (film) => {
    const rgba = filmToRGBA8(film, opts.display);
    const img = ctx.createImageData(film.width, film.height);
    img.data.set(rgba);
    if (film.width === opts.canvas.width && film.height === opts.canvas.height) {
      ctx.putImageData(img, 0, 0);
      return;
    }
    const g = globalThis;
    if (!scratch || scratch.width !== film.width || scratch.height !== film.height) {
      scratch = g.OffscreenCanvas ? new g.OffscreenCanvas(film.width, film.height) : g.document ? g.document.createElement("canvas") : null;
      if (scratch) {
        scratch.width = film.width;
        scratch.height = film.height;
      }
    }
    const sctx = scratch?.getContext("2d");
    if (!scratch || !sctx || !ctx.drawImage) {
      ctx.putImageData(img, 0, 0);
      return;
    }
    sctx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(scratch, 0, 0, opts.canvas.width, opts.canvas.height);
  };
  const settings = () => ({
    ...opts.settings,
    ...size(),
    samples: opts.samples ?? opts.settings?.samples ?? 256,
    denoisingPasses: opts.denoise ? true : opts.settings?.denoisingPasses
  });
  const report = (p, denoised) => {
    if (!renderer) return;
    opts.onProgress?.({ ...p, backend: renderer.backend, fallbackReason: renderer.fallbackReason, denoised });
  };
  const tick = () => {
    rafId = null;
    if (disposed || stopped) return;
    const cs = cameraSignature(opts.camera);
    const ss = sceneSignature(opts.scene);
    if (ss !== lastSceneSig) sceneDirty = true;
    else if (cs !== lastCameraSig) cameraDirty = true;
    if ((sceneDirty || cameraDirty) && renderer) renderer.stop();
    if (sceneDirty || cameraDirty) wake?.();
    rafId = raf(tick);
  };
  const loop = async () => {
    try {
      if (!renderer) renderer = await createRenderer({ backend: "auto", ...opts.renderer });
      if (disposed) {
        renderer.dispose();
        return;
      }
      while (!disposed && !stopped) {
        if (sceneDirty) {
          sceneDirty = cameraDirty = false;
          lastSceneSig = sceneSignature(opts.scene);
          lastCameraSig = cameraSignature(opts.camera);
          const converted = fromThreeScene(opts.scene, opts.camera, opts.fromThree);
          warnings = converted.warnings;
          opts.onWarnings?.(warnings);
          const display = opts.display ?? {};
          if (converted.backgroundColor && display.background === void 0) opts.display = { ...display, background: converted.backgroundColor };
          await renderer.setScene(converted.scene, settings());
        } else if (cameraDirty) {
          cameraDirty = false;
          lastCameraSig = cameraSignature(opts.camera);
          renderer.setCamera(fromThreeCamera(opts.camera));
        }
        const p = await renderer.render((pr, film) => {
          shownSamples = pr.samples;
          draw(film);
          report(pr, false);
        });
        if (disposed || stopped) break;
        if (p.done && !sceneDirty && !cameraDirty) {
          if (opts.denoise) {
            const out = await denoiseFilm(renderer.film, opts.denoise);
            if (!sceneDirty && !cameraDirty && !disposed) {
              draw(out);
              report(p, true);
            }
          }
          resolveDone();
          if (!watch) break;
          await new Promise((r) => {
            wake = r;
            if (sceneDirty || cameraDirty || stopped || disposed) r();
          });
          wake = null;
          if (disposed || stopped) break;
          newDone();
        }
      }
      resolveDone();
    } catch (e) {
      if (opts.onError) {
        opts.onError(e);
        resolveDone();
      } else rejectDone(e);
    }
  };
  if (watch) rafId = raf(tick);
  void loop();
  const handle = {
    get renderer() {
      return renderer;
    },
    get warnings() {
      return warnings;
    },
    get samples() {
      return shownSamples;
    },
    get done() {
      return done;
    },
    restart() {
      if (disposed) return;
      sceneDirty = true;
      if (stopped) {
        stopped = false;
        newDone();
        if (watch) rafId = raf(tick);
        void loop();
        return;
      }
      renderer?.stop();
      wake?.();
    },
    stop() {
      stopped = true;
      if (rafId !== null) cancelRaf(rafId);
      rafId = null;
      renderer?.stop();
      wake?.();
      if (opts.denoise && renderer && renderer.film.samples > 0) {
        void denoiseFilm(renderer.film, opts.denoise).then((out) => draw(out));
      }
    },
    dispose() {
      handle.stop();
      disposed = true;
      renderer?.dispose();
    }
  };
  return handle;
}

// src/index.ts
var VERSION = true ? "0.2.0" : "dev";
export {
  CpuRenderer,
  DEFAULT_SETTINGS,
  VERSION,
  adaptiveSampling,
  box,
  canShareMemory,
  compileScene,
  createRenderer,
  denoiseFilm,
  denoiseInput,
  filmPass,
  filmSampleCounts,
  filmToLinear,
  filmToRGBA8,
  fromThreeCamera,
  fromThreeScene,
  passSchedule,
  plane,
  renderLocal,
  renderThreeScene,
  trs,
  uvSphere
};
