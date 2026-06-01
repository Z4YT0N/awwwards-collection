import { booleanFunctions, distanceFunctions, getLight, getNormal, rayHit, transformations } from "./utils";

export const RayMarchingShader = {

	vertexShader: /* glsl */`
	varying vec2 vUv;
	varying vec3 wPos;
	varying vec3 vPosition;

	void main() {
			vUv = uv;
			vPosition = position;
			wPos = (modelMatrix * vec4(position, 1.0)).xyz;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`
		uniform vec2 resolution;

		// custom uniforms
		uniform vec3 cPos;
		uniform vec4 cameraQuaternion;
		uniform float fov;

		varying vec2 vUv;
		varying vec3 wPos;
		varying vec3 vPosition;

		#define MAX_STEPS 300
		#define SURFACE_DIST 0.005
		#define MAX_DISTANCE 100.0

		${rayHit}
		${distanceFunctions}
		${transformations}
		${booleanFunctions}

		RayHit ExampleObject(vec3 p) {
			Material redMat = Material(
				vec3(0.8, 0.0, 0.2),
				0.2
			);
			Material blueMat = Material(
				vec3(0.2, 0.0, 0.8),
				0.9
			);

			RayHit oxigenBall = RayHit(
				sdSphere(p, 0.5),
				redMat
			);
			
			vec3 ball2P = Translate(p, vec3(0.5, 0.4, 0.0));
			RayHit ball2 = RayHit(
				sdSphere(ball2P, 0.3),
				blueMat
			);
			vec3 cube1P = Translate(p, vec3(-0.5, 0.5, 0.0));
			RayHit cube1 = RayHit(
				sdCuboid(cube1P, vec3(0.5)),
				blueMat
			);
			return SmoothMin(
				SmoothMin(oxigenBall, ball2, 0.4),
				cube1,
				0.4
			);
		}

		RayHit getSceneHit(vec3 p) {
			RayHit surface = ExampleObject(
				Translate(p, vec3(0.0, 1.5, -4.0))
			);
			return surface;
		}

		${getNormal}
		${getLight}

		// ro: ray origin
		// rd: ray direction
		// ds: distrance to surface
		// d0: distance from origin
		vec3 rayMarch(vec3 ro, vec3 rd) {
			float d0 = 0.0;
			float minDist = MAX_DISTANCE;
			vec3 backgroundColor = vec3(0.1, 0.1, 0.1);
			RayHit hitPoint = getSceneHit(ro);
			bool hitObject = false;
			for(int i = 0; i < MAX_STEPS; i++) {
				vec3 p = ro + d0 * rd;
				hitPoint = getSceneHit(p);
				float ds = hitPoint.dist;
				d0 += ds;
				if(ds < minDist) {
					minDist = ds;
				}
				if(ds < SURFACE_DIST) {
					hitObject = true;
					break;
				};
				if(d0 > MAX_DISTANCE) {
					break;
				}
			}
			if(hitObject) {
				vec3 p = ro + d0 * rd;
				return getLight(p, rd, hitPoint);
			}
			return backgroundColor;
		}

		// https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
		vec4 quat_from_axis_angle(vec3 axis, float angle) { 
			vec4 qr;
			float half_angle = (angle * 0.5) * 3.14159 / 180.0;
			qr.x = axis.x * sin(half_angle);
			qr.y = axis.y * sin(half_angle);
			qr.z = axis.z * sin(half_angle);
			qr.w = cos(half_angle);
			return qr;
		}

		vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle) { 
			vec4 q = quat_from_axis_angle(axis, angle);
			vec3 v = position.xyz;
			return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
		}

		vec3 quaterion_rotate(vec3 v, vec4 q) {
			return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
		}

		void main() {
			float aspectRatio = resolution.x / resolution.y;
			vec3 cameraOrigin = cPos;

			float fovMult = fov / 90.0;
			
			vec2 screenPos = ( gl_FragCoord.xy * 2.0 - resolution ) / resolution;
			screenPos.x *= aspectRatio;
			screenPos *= fovMult;
			vec3 ray = vec3( screenPos.xy, -1.0 );
			ray = quaterion_rotate(ray, cameraQuaternion);
			ray = normalize( ray );

			vec3 color = rayMarch(cameraOrigin, ray);

			gl_FragColor = vec4(color, 1.0);
		}
    `

};