uniform float u_scale;

varying vec2 vUv;

void main() {

    vUv = uv;

    vec3 newPosition = position * u_scale * 2.;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
