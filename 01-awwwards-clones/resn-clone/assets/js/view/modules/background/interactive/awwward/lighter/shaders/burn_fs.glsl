uniform sampler2D u_burnMap;
uniform sampler2D u_defaultMap;
uniform sampler2D u_maskMap;

varying vec2 vUv;

// float plot(float st, float pct){
//   return  smoothstep( pct - 0.02, pct, st) - 
//           smoothstep( pct, pct + 0.02, st);
// }


void main( void ) {

    vec2 uv = vUv;

    vec4 texture = texture2D( u_defaultMap, uv);
    vec4 burnTexture = texture2D( u_burnMap, uv);
    vec4 maskTexture = texture2D( u_maskMap, uv );

    vec3 burnStartColor = vec3( 0.4862745098, 0., 0.4941176471 );
    vec3 burnEndColor = vec3( 0.9943137255, 0., 1. );
    // vec3 burnMoreColor = vec3( 0.4862745098, 0.23, 0.4941176471 );

    vec3 color = mix(texture.rgb, mix(burnStartColor, burnEndColor, burnTexture.r), min(1.0, burnTexture.r * 3. ));
    color += color * 4.0 * smoothstep( 0.64, 0.92, burnTexture.r );
    // color += burnMoreColor * 1.2 * plot(0.66, burnTexture.r);

    float alpha = texture.a - smoothstep( 0.68, 1.0, burnTexture.r);

    gl_FragColor = vec4( color, alpha );
}