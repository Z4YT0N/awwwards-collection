#include "./common.glsl"

#define REFERENCE_ASPECT 1.77777777778

uniform float animateProgress;
uniform float borderRadius;
uniform vec4 startRect;
uniform vec4 endRect;
uniform vec3 tintColour;
uniform sampler2D map;

varying vec2 vUv;

float getAspect() {
    float width = mix(startRect.w, endRect.w, animateProgress);
    float height = mix(startRect.z, endRect.z, animateProgress);
    return width / height;
}

void main() {
    vec2 uv = vUv;

    // if aspect = 16 / 9, take uvs as they are
    // if aspect becomes wider then we want to see less
    // css prevents aspect from being lower than 16/9 (but lets it be wider)
    float aspect = getAspect();
    float aspectScale = (aspect / REFERENCE_ASPECT) - 1.;    // will be 1 where aspect matches, > 1 if wider, < 1 if taller
    aspectScale /= aspect;

    uv.y = mix(aspectScale, 1.0 - aspectScale, vUv.y);

    vec4 albedo = texture2D(map, uv);

    float tintCurve = 1.0 - smoothstep(1., 0.0, animateProgress);

    albedo.a = roundedCornerMask(vUv, borderRadius, aspect);
    albedo.rgb = mix(albedo.rgb * tintColour, albedo.rgb, tintCurve);

    gl_FragColor = albedo;
    // gl_FragColor = vec4(vec3(vUv.x), 1.);
}
