uniform sampler2D iChannel0;
uniform vec2 u_resolution;
uniform vec4 u_frame;

varying vec2 vUv;

void main() {

	vec2 uv = vUv;

	vec4 u_frame = u_frame / 2048.0;

	vec2 uvSprite;

	uvSprite.x = u_frame.x + (uv.x * u_frame.z);
	uvSprite.y = (1.0 - u_frame.w) - u_frame.y + (uv.y * u_frame.w);

	// uvSprite = u_frame.xy + (uv.xy * u_frame.zw);

    // vec4 texColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 texColor = texture2D(iChannel0, uvSprite);

    gl_FragColor = texColor;
}
