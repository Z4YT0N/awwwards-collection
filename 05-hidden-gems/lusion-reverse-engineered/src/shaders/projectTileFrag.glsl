#include "./common.glsl"

uniform float aspect;
uniform float maskAmount;
uniform sampler2D map;

varying vec2 vUv;

void main() {
    vec4 albedo = texture2D(map, vUv);

    float maskScaled = maskAmount * cos(vUv.y);
    albedo.a = roundedCornerMask(vUv, 0.1, aspect, maskScaled);
    gl_FragColor = albedo;
}
