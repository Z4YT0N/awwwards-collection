uniform float stretchAmount;

varying vec2 vUv;

void main() {
    vec3 newPosition = position;

    float ndcUvY = uv.y * 2.0 - 1.0;

    newPosition.x *= 1. + (ndcUvY * stretchAmount);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}