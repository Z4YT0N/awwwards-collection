
varying vec2 vUv;

uniform vec2 u_vecDistort;

void main() {

	vUv = uv;

	vec3 pos = position;

	float adjustedPosY = (pos.y + 51.2) / 2.0;

	pos.x += 0.000004 * (1.0 - pow(abs(adjustedPosY), 4.5)) * u_vecDistort.x;
	pos.y += 0.000004 * (1.0 - pow(abs(adjustedPosY), 4.5)) * u_vecDistort.y;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
