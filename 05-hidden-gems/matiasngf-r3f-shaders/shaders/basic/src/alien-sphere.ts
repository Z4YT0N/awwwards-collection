import { SphereGeometry, Mesh, ShaderMaterial, Vector3 } from "three";
import { hexToVector3 } from "./utils/hexToVector3";

const _VS = `
// Source from noise code: https://www.shadertoy.com/view/4dS3Wd
float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hash(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }
float noise(vec3 x) {
  const vec3 step = vec3(110, 241, 171);
  vec3 i = floor(x);
  vec3 f = fract(x);
  float n = dot(i, step);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
        mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
        mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
        mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

varying vec3 vNormal;
varying float vTimedNoise;
uniform float time;
void main() {
  float scaledTime = time * 0.2;
  vTimedNoise = noise((normal + scaledTime) * 2.5);
  vec3 vNormalNoise = normal * vTimedNoise;
  vec3 vPosition = position + vNormalNoise * 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  vNormal = normal;
}
`;
const _FS = `
// Source from noise code: https://www.shadertoy.com/view/4dS3Wd
float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hash(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }
float noise(vec3 x) {
  const vec3 step = vec3(110, 241, 171);
  vec3 i = floor(x);
  vec3 f = fract(x);
  float n = dot(i, step);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
        mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
        mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
        mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

varying vec3 vNormal;
varying float vTimedNoise;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;

void main() {
  // TODO calculate new normals based on noise on vertex shader and use that to correct vTimedNoiseSmooth
  // smooth the vTimedNoise vector
  vec3 normal = normalize(vNormal);
  float normalDiffLength = 1.0 / length(vNormal);
  float vTimedNoiseSmooth = vTimedNoise * normalDiffLength;
  vTimedNoiseSmooth = clamp(vTimedNoiseSmooth, 0.0, 1.0);

  float n = noise(normal * 5.0 + time * 0.2);
  vec3 color = mix(colorA, colorB, n);
  color = mix(color, colorC, pow(vTimedNoiseSmooth, 2.0));
  color = mix(color, vec3(1.0), pow(vTimedNoiseSmooth, 20.0));
  
  gl_FragColor = vec4(color, 1.0);

  // gl_FragColor = vec4(vec3(vTimedNoiseSmooth), 1.0);
}
`;

const material = new ShaderMaterial({
  uniforms: {
    time: { value: 4 },
    colorA: { value: new Vector3(0.427, 0.133, 0.82) },
    colorB: { value: new Vector3(0.067, 0.047, 0.235) },
    colorC: { value: hexToVector3("#51b7ff") }
  },
  vertexShader: _VS,
  fragmentShader: _FS
});

const size = 3;
const sides = 16 * 2 * 2 * 2;
const geometry = new SphereGeometry( size/2, sides, sides);
export const AlienSphere = new Mesh( geometry, material );
AlienSphere.castShadow = true;

AlienSphere.position.set(0, 0, 0)