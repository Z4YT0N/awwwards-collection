uniform sampler2D u_map;
uniform float u_opacity;

varying vec2 vUv;

void main( void ) {

    vec2 uv = vUv;

    vec4 texture = texture2D( u_map, uv);

    vec3 color = texture.rgb;

    float alpha = texture.a * u_opacity;

    gl_FragColor = vec4( color, alpha );
}
