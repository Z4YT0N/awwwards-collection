// #define M_PI 3.1415926535897932384626433832795

uniform sampler2D u_burnMap;
uniform sampler2D u_defaultMap;
uniform sampler2D u_maskMap;
uniform sampler2D u_maskMapS;

uniform float u_pr_hue;

uniform float u_globalTime;

varying vec2 vUv;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main( void ) {

    vec2 uv = vUv;

    vec4 texture = texture2D( u_defaultMap, uv);
    vec4 burnTexture = texture2D( u_burnMap, uv);
    
    vec4 maskTexture = texture2D( u_maskMap, uv );
    vec4 maskSTexture = texture2D( u_maskMapS, uv );

    float cHueOffset = 0.0;
    cHueOffset += abs(sin(u_globalTime * 0.18)) * -0.92;
    cHueOffset *= uv.y * 0.42;
    cHueOffset *= u_pr_hue;

    vec3 cStartHSL = vec3(0.83, 0.9, 0.49);
    vec3 cEndHSL = vec3(0.83, 1.0, 1.0);

    cStartHSL.x += cHueOffset;
    cEndHSL.x   += cHueOffset;

    vec3 cStartBurn = hsb2rgb( cStartHSL );
    vec3 cEndBurn   = hsb2rgb( cEndHSL );

    vec3 color = mix(texture.rgb, mix(cStartBurn, cEndBurn, burnTexture.r), min(burnTexture.r * 3.0, 1.0));
    color += color * 4.0 * smoothstep( 0.64, 0.92, burnTexture.r ) * (1.0 - maskSTexture.r) * (1.0 - u_pr_hue);

    float alpha = texture.a - smoothstep( 0.68, 1.0, burnTexture.r * (1.0 - maskTexture.r));

    gl_FragColor = vec4( color, alpha );
}






// uniform sampler2D u_burnMap;
// uniform sampler2D u_defaultMap;
// uniform sampler2D u_maskMap;

// uniform float u_globalTime;

// varying vec2 vUv;

// // float plot(float st, float pct){
// //   return  smoothstep( pct - 0.02, pct, st) - 
// //           smoothstep( pct, pct + 0.02, st);
// // }

// vec3 rgb2hsb( in vec3 c ){
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), 
//                  vec4(c.gb, K.xy), 
//                  step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), 
//                  vec4(c.r, p.yzx), 
//                  step(p.x, c.r));
//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), 
//                 d / (q.x + e), 
//                 q.x);
// }

// vec3 hsb2rgb( in vec3 c ){
//     vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
//                              6.0)-3.0)-1.0, 
//                      0.0, 
//                      1.0 );
//     rgb = rgb*rgb*(3.0-2.0*rgb);
//     return c.z * mix(vec3(1.0), rgb, c.y);
// }

// void main( void ) {

//     vec2 uv = vUv;

//     vec4 texture = texture2D( u_defaultMap, uv);
//     vec4 burnTexture = texture2D( u_burnMap, uv);
//     vec4 maskTexture = texture2D( u_maskMap, uv );

//     vec3 burnStartColor = vec3( 0.4862745098, 0., 0.4941176471 );
//     vec3 burnEndColor = vec3( 0.9943137255, 0., 1. );
//     // vec3 burnMoreColor = vec3( 0.4862745098, 0.23, 0.4941176471 );

//     vec3 color = mix(texture.rgb, mix(burnStartColor, burnEndColor, burnTexture.r), min(1.0, burnTexture.r * 3. ));
//     color += color * 4.0 * smoothstep( 0.64, 0.92, burnTexture.r );
//     // color += burnMoreColor * 1.2 * plot(0.66, burnTexture.r);

//     float alpha = texture.a - smoothstep( 0.68, 1.0, burnTexture.r * (1.0 - maskTexture.r));

//     vec3 colorHSL = rgb2hsb(color);
//     colorHSL.x += abs(sin(u_globalTime * 0.2)) * 0.1;

//     vec3 colorRGB = hsb2rgb(colorHSL);

//     gl_FragColor = vec4( colorRGB, alpha );
// }