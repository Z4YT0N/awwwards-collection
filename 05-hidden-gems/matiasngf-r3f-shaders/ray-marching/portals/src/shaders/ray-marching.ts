import { booleanFunctions } from "./boolean-functions";
import { shaderObjects } from "./shader-objects";
import { distanceFunctions, getLight, getNormal, structs, transformations } from "./utils";

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
		uniform sampler2D hdriMap;
		uniform float uTime;

		varying vec2 vUv;
		varying vec3 wPos;
		varying vec3 vPosition;

		#define MAX_BOUNCES 5
		#define MAX_STEPS 300
		#define SURFACE_DIST 0.005
		#define MAX_DISTANCE 100.0

		#define REFLECTION_MAX_STEPS 300
		#define REFLECTION_SURFACE_DIST 0.01
		#define REFLECTION_MAX_DISTANCE 50.0

		${structs}
		${transformations}
		${distanceFunctions}
		${booleanFunctions}
		${shaderObjects}

		Portal getPortalHit(vec3 p) {
			return PortalUnion(Portal1(p), Portal2(p));
		}

		RayHit getSceneHit(vec3 p) {
			RayHit PortalWithFrame1 = PortalPlatform(
				Translate(p, portal1Center)
			);
			PortalWithFrame1 = Union(
				PortalWithFrame1, Portal1(p).rayHit
			);
			RayHit PortalWithFrame2 = PortalPlatform(
				Translate(p, portal2Center)
			);
			PortalWithFrame2 = Union(
				PortalWithFrame2, Portal2(p).rayHit
			);

			RayHit Ball1Surf = ExampleBallSurface(Translate(
				p,
				vec3(4.0, 1.0, -6.5) + vec3(0.2, 0.0, 0.0) * sin(uTime * 0.2 + p.y * 3.0)
			));

			return Union(
				Union(FloorSurface(p), Ball1Surf),
				Union(PortalWithFrame1, PortalWithFrame2)
			);
		}

		${getNormal}
		${getLight}

		// ro: ray origin
		// rd: ray direction
		// ds: distrance to surface
		// d0: distance from origin
		RayResult castRay(
			vec3 ro,
			vec3 rd,
			float maxDistance,
			float surfaceDistance,
			int maxSteps
		) {
			float d0 = 0.0;
			RayHit hitPoint = getSceneHit(ro);
			for(int i = 0; i < maxSteps; i++) {
				vec3 p = ro + d0 * rd;
				hitPoint = getSceneHit(p);
				d0 += hitPoint.dist;
				if(hitPoint.dist < surfaceDistance || d0 > maxDistance) {
					break;
				};
			}
			bool isHit = hitPoint.dist < surfaceDistance;
			vec3 p = ro + d0 * rd;
			return RayResult(isHit, p, hitPoint);
		}

		#define PI 3.14159265359

		vec2 normalToUv(vec3 n) {
			float u = atan(n.x, n.z) / (2.0 * PI) + 0.5;
			float v = n.y * 0.5 + 0.5;
			return vec2(u, v);
		}

		vec3 getBackgroundColor(vec3 normal) {
			vec2 uv = normalToUv(normal);
			return texture2D(hdriMap, uv).rgb;
		}

		// returns a color for the given ray
		vec3 rayMarch(vec3 ro, vec3 rd) {
			vec3 rayPosition = ro;
			vec3 rayDirection = rd;
			vec3 result = vec3(0.0);

			RayLightResult lightResults[MAX_BOUNCES];

			bool finishedRay = false;

			for(int i = 0; i < MAX_BOUNCES; i++) {
				if(finishedRay) {
					lightResults[i] = RayLightResult(vec3(1.0), 1.0);
					break;
				}
				RayConfig rayConfig;
				// First ray with max quality, then reflections with lower quality
				if(i == 0) {
					rayConfig = RayConfig(
						MAX_DISTANCE,
						SURFACE_DIST,
						MAX_STEPS
					);
				} else {
					rayConfig = RayConfig(
						REFLECTION_MAX_DISTANCE,
						REFLECTION_SURFACE_DIST,
						REFLECTION_MAX_STEPS
					);
				}
				RayResult hit = castRay(
					rayPosition,
					rayDirection,
					rayConfig.maxDistance,
					rayConfig.surfaceDistance,
					rayConfig.maxSteps
				);
				if(hit.hit) {
					// Portal
					Portal portalHit = getPortalHit(hit.position);

					if(portalHit.rayHit.dist <= rayConfig.surfaceDistance) {
						// Portal hit
						lightResults[i] = RayLightResult(vec3(1.0), 1.0);
						rayDirection = Rotate(rayDirection, portalHit.portalRotation);
						vec3 rayTranslation = portalHit.portalTranslation - portalHit.portalCenter;
						rayPosition = RotateArround(hit.position, portalHit.portalRotation, portalHit.portalCenter) + rayTranslation;
						vec3 offsetDirection = Rotate(vec3(0.0, 0.0, -1.0), portalHit.portalRotation);
						rayPosition += offsetDirection * REFLECTION_SURFACE_DIST * 20.0;
						
					} else {
						// Not a portal, Light surface calculation
						LightResult objectLight = getLight(hit.position, rayDirection, hit.rayHit);
						lightResults[i] = RayLightResult(objectLight.color, objectLight.reflectFactor);
						if(objectLight.reflectFactor < 0.05) {
							finishedRay = true;
						} else {
							rayDirection = reflect(rayDirection, objectLight.normal);
							rayPosition = hit.position + (rayDirection * REFLECTION_SURFACE_DIST * 20.0);
						}
					}

				} else {
					lightResults[i] = RayLightResult(getBackgroundColor(rayDirection), 0.0);
					finishedRay = true;
				}
			}

			// combine all light results
			for(int i = 0; i < MAX_BOUNCES; i++) {
				int index = MAX_BOUNCES - i - 1;
				result = mix(lightResults[index].color, result, lightResults[index].reflectFactor);
			}

			return result;
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