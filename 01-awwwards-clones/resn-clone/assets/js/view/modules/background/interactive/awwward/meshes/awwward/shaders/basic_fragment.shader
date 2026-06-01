uniform sampler2D u_diffuse;

varying vec2 vUv;

void main() {

	vec2 uv = vUv;

    vec4 texColor = texture2D(u_diffuse, uv);

    gl_FragColor = texColor;
}
