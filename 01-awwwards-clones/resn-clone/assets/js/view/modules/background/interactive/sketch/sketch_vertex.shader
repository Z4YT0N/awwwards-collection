uniform float time;

uniform float sinOffset;

uniform vec2 tPos;
uniform vec2 tSize;
uniform vec2 mouse;
uniform vec2 wSize;
uniform vec2 deltaM;
uniform float rotation;
uniform float progress;
uniform float positionZ;

uniform sampler2D texture;

varying vec2 vUvCoords;

void main() {
	vUvCoords = uv;

	vec3 newPosition = position;

	float posX = position.x/tSize.x+0.5;
	float posY = position.y;
	float distanceX = ((deltaM.x)-posX);


	if (distanceX >= 0.0) {

	  // contraction
	  newPosition.y =  (((position.y) * sin(1.0-(posX)/deltaM.x)) + (tPos.y-mouse.y) * sin((posX)/deltaM.x)) * (1.0-progress) + position.y * progress;
	}
	else if (distanceX < 0.0) {
	  newPosition.y = (tPos.y-mouse.y) * (1.0-progress) + position.y * progress;

	}
	else {
	  newPosition.y = position.y;
	}

	newPosition *= positionZ;


	vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
	gl_Position = projectionMatrix * mvPosition;
}