uniform float time;

uniform vec2 tPos;
uniform vec2 tSize;
uniform vec2 mouse;
uniform vec2 wSize;
uniform float amount;
uniform float spawnVal;

uniform float scale;

uniform sampler2D texture;

varying vec2 vUvCoords;

void main() {
	vUvCoords = uv;

	vec3 newPosition = position;

	newPosition.x -= sin(time*0.002+(position.y/amount*0.5))*(0.6+spawnVal);
	newPosition.y -= mouse.y;

	//newPosition *= scale;

	vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
	gl_Position = projectionMatrix * mvPosition;
}