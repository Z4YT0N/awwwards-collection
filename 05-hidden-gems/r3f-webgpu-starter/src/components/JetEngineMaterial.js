import { useFrame } from "@react-three/fiber";
import {
  uniform,
  float,
  vec2,
  sin,
  cos,
  uv,
  mod,
  div,
  sub,
  length,
  pow,
  abs,
  vec3,
  add,
  mul,
} from "three/tsl";

export function useJetEngineMaterial() {
  // Create uniform and shader calculations
  const uTime = uniform(float(0.0));
  const TAU = float(6.28318530718);
  const MAX_ITER = float(8);
  const inten = float(0.007);

  // Get UV coordinates and time
  const currentUV = uv();
  const currentTime = mul(uTime, float(2.5));

  // Rotate UV coordinates
  const angle = float(3.147);
  const s = sin(angle);
  const c = cos(angle);

  // Create rotation matrix manually
  const rotatedX = add(mul(currentUV.x, c), mul(currentUV.y, s));
  const rotatedY = sub(mul(currentUV.x, s), mul(currentUV.y, c));
  const uvRotated = add(vec2(rotatedX, rotatedY), mul(uTime, float(2.4)));

  // Calculate base coordinates
  const p = sub(mod(mul(uvRotated, TAU), TAU), float(256.0));

  // Initialize accumulator
  let accumulator = float(0.9);

  // Unroll the loop
  for (let i = 0; i < 8; i++) {
    const t = mul(currentTime, sub(float(1.0), div(float(3.5), float(i + 1))));

    const px = add(cos(sub(t, p.x)), sin(add(t, p.y)));
    const py = add(sin(sub(t, p.y)), cos(add(t, p.x)));

    const iVec = add(p, vec2(px, py));

    const lenVec = vec2(
      div(p.x, div(sin(add(iVec.x, t)), inten)),
      div(p.y, div(cos(add(iVec.y, t)), inten))
    );

    accumulator = add(accumulator, div(float(1.1), length(lenVec)));
  }

  // Final color calculations
  accumulator = div(accumulator, float(MAX_ITER));
  accumulator = sub(float(1.1), pow(accumulator, float(1.5)));

  const engineColor = pow(abs(accumulator), float(30.0));
  const finalColor = add(
    vec3(engineColor).mul(vec3(0, 0.5, 1.0)),
    vec3(0.0, 0.0, 0.0)
  ).mul(float(25.0));

  // Update time in animation frame
  useFrame((state, delta) => {
    uTime.value += delta * 0.5;
  });

  return {
    key: uTime.id,
    colorNode: finalColor,
  };
}
