uniform sampler2D u_texture;
uniform vec4 u_rands;
uniform float u_strength;
uniform float u_time;
uniform float u_id;

varying vec2 v_uv;

#define NUM_SAMPLES 5

// hash function by Dave_Hoskins from https://www.shadertoy.com/view/4djSRW
vec4 hash43(vec3 p) {
	vec4 p4 = fract(vec4(p.xyzx)  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

void main() {

    // get some white noise
    vec4 noises = hash43(vec3(gl_FragCoord.xy, u_id));

    // get lazy random glitchy uv offset
    vec4 rands = hash43(vec3(floor(sin(v_uv.x * 2. + u_rands.x * 6.283) * mix(3., 40., u_rands.y)) * 30., u_id, u_rands.z));
    vec2 uvOffset = vec2(0., (rands.x - .5) * 0.5 * (rands.y > .7 ? 1. : 0.)) / float(NUM_SAMPLES) * (0.05 + u_strength * 0.3);

    vec2 uv = v_uv + noises.xy * uvOffset;
    vec3 color = vec3(0.);

    // accumulate samples
    for (int i = 0; i < NUM_SAMPLES; i++) {
        color += texture2D(u_texture, uv).rgb;
        uv += uvOffset;
    }

    // normalize and apply strength
    color /= float(NUM_SAMPLES);
    gl_FragColor = vec4(color * (1. + u_strength * 2.), 1.);
}
