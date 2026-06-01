uniform sampler2D uMap;
uniform sampler2D uMask;

uniform vec2 uResolution;

varying float vAlpha;
varying vec2 vUv;

void main() {
    
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec2 mask = texture2D(uMask, vUv).ra - vec2(0.5);
    uv -= mask * 0.1;
    vec4 tex = texture2D(uMap, uv);

    gl_FragColor.rgb = tex.rgb;
    gl_FragColor.a = vAlpha * 0.5;
}