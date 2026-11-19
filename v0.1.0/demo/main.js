// Demo: a three.js lookdev scene, previewed with three.js and path traced with Cycles on the Web. Orbit the preview and the path tracer restarts from the new view.
//
// The library is loaded from ../cycles.js in a release folder (demo/ sits next to the bundles), or from ../dist/cycles.js in the repository.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const lib = await import('../cycles.js').catch(() => import('../dist/cycles.js'));
const { createRenderer, fromThreeScene, filmToRGBA8 } = lib;

const W = 640;
const H = 480;
const $ = (id) => document.getElementById(id);
const status = (s) => ($('status').textContent = s);

// ---- The scene, built with ordinary three.js objects.
function proceduralSky(width = 256, height = 128) {
  const data = new Float32Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v = 1 - (y + 0.5) / height;
      const u = (x + 0.5) / width;
      const up = Math.max(0, v - 0.5) * 2;
      let r = 0.25 + 0.35 * up, g = 0.3 + 0.4 * up, b = 0.4 + 0.7 * up;
      if (v < 0.5) { r = 0.16; g = 0.14; b = 0.12; }
      const du = Math.min(Math.abs(u - 0.3), 1 - Math.abs(u - 0.3));
      const dv = v - 0.8;
      const blob = 60 * Math.exp(-(du * du + dv * dv) / 0.0008);
      const o = (y * width + x) * 4;
      data[o] = r + blob; data[o + 1] = g + blob * 0.92; data[o + 2] = b + blob * 0.8; data[o + 3] = 1;
    }
  }
  const t = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.flipY = true;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

const scene = new THREE.Scene();
const sky = proceduralSky();
scene.environment = sky;
scene.background = sky;
const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.8 }));
scene.add(ground);
const materials = [
  new THREE.MeshStandardMaterial({ color: new THREE.Color(0.9, 0.2, 0.15), roughness: 0.35 }),
  new THREE.MeshStandardMaterial({ color: new THREE.Color(0.95, 0.75, 0.35), metalness: 1, roughness: 0.25 }),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.05, ior: 1.45 }),
  new THREE.MeshStandardMaterial({ color: new THREE.Color(0.9, 0.9, 0.92), metalness: 1, roughness: 0.08 }),
];
materials.forEach((m, i) => {
  const s = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 32), m);
  s.position.set(-1.65 + i * 1.1, 0.5, 0);
  scene.add(s);
});
const sun = new THREE.DirectionalLight(0xffffff, 2.0);
sun.position.set(2, 4, 2.5);
scene.add(sun, sun.target);

const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
camera.position.set(0, 1.6, 4.4);

// ---- three.js preview.
const preview = $('preview');
const gl = new THREE.WebGLRenderer({ canvas: preview, antialias: true });
gl.setSize(W, H, false);
gl.toneMapping = THREE.NoToneMapping;
const controls = new OrbitControls(camera, preview);
controls.target.set(0, 0.45, 0);
controls.update();

// ---- Path tracer.
const trace = $('trace');
const ctx = trace.getContext('2d');
let renderer = null;
let token = 0;

function settings() {
  const scale = Number($('scale').value);
  return { width: Math.round(W * scale), height: Math.round(H * scale), samples: Math.max(1, Number($('samples').value) | 0) };
}

function show(film) {
  if (trace.width !== film.width || trace.height !== film.height) {
    trace.width = film.width;
    trace.height = film.height;
  }
  const img = new ImageData(filmToRGBA8(film, { view: 'standard' }), film.width, film.height);
  ctx.putImageData(img, 0, 0);
}

async function restart(rebuildRenderer = false) {
  const my = ++token;
  if (rebuildRenderer && renderer) {
    renderer.dispose();
    renderer = null;
  }
  if (!renderer) {
    status('Starting');
    renderer = await createRenderer({ backend: $('backend').value });
    $('traceCaption').textContent = `Cycles, ${renderer.info}${renderer.fallbackReason ? ' (GPU unavailable: ' + renderer.fallbackReason + ')' : ''}`;
  }
  if (my !== token) return;
  renderer.stop();
  const { scene: desc, warnings } = fromThreeScene(scene, camera);
  if (warnings.length) console.info('Cycles on the Web:', warnings.join('; '));
  await renderer.setScene(desc, settings());
  if (my !== token) return;
  const t0 = performance.now();
  await renderer.render((p, film) => {
    if (my !== token) return;
    show(film);
    status(`${p.samples} / ${p.totalSamples} spp, ${((performance.now() - t0) / 1000).toFixed(1)} s`);
  });
}

let moveTimer = 0;
controls.addEventListener('change', () => {
  gl.render(scene, camera);
  clearTimeout(moveTimer);
  moveTimer = setTimeout(() => restart(false), 150);
});
$('backend').addEventListener('change', () => restart(true));
$('samples').addEventListener('change', () => restart(false));
$('scale').addEventListener('change', () => restart(false));

gl.render(scene, camera);
restart(false);
