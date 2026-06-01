attribute vec3 a_base;
attribute vec3 a_offset;
attribute vec4 a_orientation;
attribute vec2 a_scale;
attribute float a_life;

varying float vAlpha;
varying vec2 vUv;

// From Inigo Quilez http://www.iquilezles.org/www/articles/functions/functions.htm
float impulse(float k, float x) {
    float h = k * x;
    return h * exp(1.0 - h);
}

float pcurve(float x, float a, float b) {
    float k = pow(a + b, a + b) / (pow(a, a) * pow(b, b));
    return k * pow(x, a) * pow(1.0 - x, b);
}

void main() {
    
    vUv = uv;
    vAlpha = pcurve(a_life, 1.0, 2.0);

    vec3 pos = position;

    pos.xy *= a_scale * (a_life * 0.7 + 0.3);

    vec4 or = a_orientation;
    vec3 vcV = cross(or.xyz, pos);
    pos = vcV * (2.0 * or.w) + (cross(or.xyz, vcV) * 2.0 + pos);

    pos += a_base;
    pos += a_offset * vec3(a_life * 0.7 + 0.3, a_life * 0.9 + 0.1, a_life * 0.7 + 0.3);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


// attribute vec3 a_base;
// attribute vec3 a_offset;
// attribute vec2 a_scale;
// attribute float a_life;

// varying float vAlpha;
// varying vec2 vUv;

// // From Inigo Quilez http://www.iquilezles.org/www/articles/functions/functions.htm
// float impulse(float k, float x) {
//     float h = k * x;
//     return h * exp(1.0 - h);
// }

// float pcurve(float x, float a, float b) {
//     float k = pow(a + b, a + b) / (pow(a, a) * pow(b, b));
//     return k * pow(x, a) * pow(1.0 - x, b);
// }

// void main() {
    
//     vUv = uv;
//     vAlpha = pcurve(a_life, 1.0, 2.0);

//     vec3 pos = position;

//     // pos.xy *= a_scale * (a_life * 0.7 + 0.3);

//     // pos += a_base;
//     // pos += a_offset * vec3(a_life * 0.7 + 0.3, a_life * 0.9 + 0.1, a_life * 0.7 + 0.3);

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }