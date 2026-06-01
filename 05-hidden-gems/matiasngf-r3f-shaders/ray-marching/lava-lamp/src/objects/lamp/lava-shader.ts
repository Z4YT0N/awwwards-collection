import { ShaderMaterial } from "three";

const LavaVertexShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;
varying vec3 viewDirection;

void main() {
  vUv = uv;
  vNormal = normal;

  wPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  viewDirection = normalize(cameraPosition - wPos);
}
`;

const LavaFragmentShader = `

// UNIFORMS
uniform float uTime;

// RAYMARCHING STRUCTS
struct Material {
  vec3 color;
  float glossiness;
  float reflectivity;
};
struct RayHit {
  float dist;
  Material material;
};
struct RayResult {
  bool hit;
  vec3 position;
  RayHit rayHit;
  // TODO: delete, this is only needed for soft shadows
  RayHit lowerHitPoint;
};

struct LightResult {
  vec3 color;
  vec3 normal;
};

// RAYMARCHING VARIABLES
#define MAX_BOUNCES 5
#define MAX_STEPS 300
#define SURFACE_DIST 0.005
#define MAX_DISTANCE 5.0

// VARYING VARIABLES
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;
varying vec3 viewDirection;

// RAYMARCHING DIST FUNCTIONS
float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

// TRASNFORMATIONS
vec3 Translate(in vec3 p, in vec3 t) {
  return p - t;
}

// BOOLEAN FUNCTIONS
RayHit SmoothMin (RayHit hit1, RayHit hit2, float k) {
  // distance mix
  float d1 = hit1.dist;
  float d2 = hit2.dist;
  float h = max(k - abs(d1-d2), 0.0) / k;
  float d = min(d1, d2) - h*h*h*k*1.0/6.0;

  // color mix
  float d3 = d1 + d2;
  float cMix = d1 / d3;
  vec3 mixedColor = mix(hit1.material.color, hit2.material.color, cMix);
  float mixedGlossiness = mix(hit1.material.glossiness, hit2.material.glossiness, cMix);
  float mixedReflectivity = mix(hit1.material.reflectivity, hit2.material.reflectivity, cMix);
  Material mat = Material(mixedColor, mixedGlossiness, mixedReflectivity);
  return RayHit(d, mat);
}

// SCENE

RayHit BallSurface(vec3 p, float radius) {
  Material BallMaterial = Material(
    vec3(0.5, 0.9, 0.5),
    0.9, 0.6
  );
  return RayHit(
    sdSphere(p, radius),
    BallMaterial
  );
}

float MIX_FACTOR = 0.2;

float getBounce(float fact) {
  return (cos(uTime / fact) - 0.5) * 2.0;
}

// This function will return the closest point in the scene for any given point p
RayHit getSceneHit(vec3 p) {

  // Timings
  float cT1 = getBounce(5003.0);
  float cT2  = getBounce(9052.0);
  float cT3  = getBounce(15062.0);

  // Glboal deformation
  p = p + vec3(1.0, 0.0, 1.0) * cos((p.y + uTime / 30000.0) * 30.0) * 0.007;
  p = p + vec3(1.0, 0.0, 1.0) * cos(p.y * 20.0) * 0.01;
  p = p + vec3(0.0, 0.0, 1.0) * cos(p.x * 20.0) * 0.03;

  RayHit Scene;
  p = Translate(p, vec3(-0.1, 1.0, 0.7));
  RayHit BallObject_1 = BallSurface(Translate(p, vec3(cT1 / 60.0, cT2 / -5.0, 0.0)), 0.15);
  RayHit BallObject_2 = BallSurface(Translate(p, vec3(.1,.2 + cT1 / 5.0,.0)), 0.15);
  Scene = SmoothMin(BallObject_1, BallObject_2, MIX_FACTOR);
  
  RayHit BallObject_3 = BallSurface(Translate(p, vec3(.1,.5,.0)), 0.12);
  Scene = SmoothMin(Scene, BallObject_3, MIX_FACTOR);
  
  RayHit BallObject_4 = BallSurface(Translate(p, vec3(-.2,-.23 + cT2 / 20.0,.0)), 0.17);
  Scene = SmoothMin(Scene, BallObject_4, MIX_FACTOR);
  
  RayHit BaseBallObject = BallSurface(Translate(p, vec3(0.0, -0.75, 0.0)), 0.5);
  Scene = SmoothMin(Scene, BaseBallObject, MIX_FACTOR);
  return Scene;
}

// Runs after rayMarch
// The main rayMarching function, it will get the closest point in the scene
// then move the ray origin to that point and repeat until it hits something
// or it reaches the max distance
RayResult castRay(
  vec3 ro,
  vec3 rd,
  float maxDistance,
  float surfaceDistance,
  int maxSteps
) {
  float d0 = 0.0;
  RayHit hitPoint = getSceneHit(ro);
  RayHit lowerHitPoint = hitPoint;
  for(int i = 0; i < maxSteps; i++) {
    vec3 p = ro + d0 * rd;
    hitPoint = getSceneHit(p);
    d0 += hitPoint.dist;
    if(hitPoint.dist < lowerHitPoint.dist) {
      lowerHitPoint = hitPoint;
    }
    if(hitPoint.dist < surfaceDistance || d0 > maxDistance) {
      break;
    };
  }
  bool isHit = hitPoint.dist < surfaceDistance;
  vec3 p = ro + d0 * rd;
  return RayResult(isHit, p, hitPoint, lowerHitPoint);
}

// This function will return the normal of a surface
const vec3 GRADIENT_STEP = vec3(0.001, 0.0, 0.0);
vec3 getNormal(in vec3 p) {
  float gradientX = getSceneHit(p + GRADIENT_STEP.xyy).dist - getSceneHit(p - GRADIENT_STEP.xyy).dist;
  float gradientY = getSceneHit(p + GRADIENT_STEP.yxy).dist - getSceneHit(p - GRADIENT_STEP.yxy).dist;
  float gradientZ = getSceneHit(p + GRADIENT_STEP.yyx).dist - getSceneHit(p - GRADIENT_STEP.yyx).dist;
  return normalize(vec3(gradientX, gradientY, gradientZ));
}

// Calculate color of a material
LightResult getLight(vec3 p, vec3 rd, RayHit hit) {
  vec3 normal = getNormal(p);
  vec3 baseColor = vec3(.3, .0, .3);
  vec3 topColor = vec3(1.0, 0.3, 0.3);
  float vFactor = dot(normal, vec3(.0, -1.0, .0)) / 2.0 + .5;
  vec3 color = mix(topColor, baseColor, clamp(vFactor, 0.0, 1.0));
  float floorFactor = 1.0 - pow((p.y - 0.5) * 2.0, 2.0);
  floorFactor = clamp(floorFactor, 0.0, 1.0);
  color = mix(color, vec3(1.0, 0.3, 0.9), floorFactor);
  return LightResult(color, normal);
}

// Runs after main
// This function will use castRay to get a point in the scene where the ray hits
vec4 rayMarch() {
  vec3 rayPosition = wPos;
  vec3 rayDirection = -viewDirection;
  vec4 result = vec4(0.2);

  RayResult hit = castRay(
    rayPosition,
    rayDirection,
    MAX_DISTANCE,
    SURFACE_DIST,
    MAX_STEPS
  );

  if(hit.hit) {
    LightResult light = getLight(hit.position, rayDirection, hit.rayHit);
    result = vec4(light.color, 1.0);
  }

  return result;
}

// RUNS FIRST
void main() {
  vec4 color = rayMarch();
  gl_FragColor = vec4(color.xyz, 1.0);
  gl_FragColor.a = color.a;
}
`;

export const LavaMaterial = new ShaderMaterial({
  uniforms: {
    uTime: {value: 0}
  },
  vertexShader: LavaVertexShader,
  fragmentShader: LavaFragmentShader,
  transparent: true,
});