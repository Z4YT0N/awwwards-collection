import { RepeatWrapping, ShaderMaterial, TextureLoader, UniformsLib, Vector3, Vector4 } from "three";
import { hexToVector3 } from "../../utils/hexToVector3";

import metalTextureColorUrl from './textures/metal-corroded-heavy-color.jpg';
import metalTextureNormalUrl from './textures/metal-corroded-heavy-normal.jpg';
import metalTextureSpecularUrl from './textures/metal-corroded-heavy-specular.jpg';
import metalTextureBumpUrl from './textures/metal-corroded-heavy-bump.jpg';

const MetalCorroedVertexShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;

uniform sampler2D bumpMap;
uniform float bumpScale;

void main() {
  vUv = uv;
  vNormal = normal;

  vec3 displacedPosition = position + normal * bumpScale * texture2D(bumpMap, uv).r;

  wPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
`;

const MetalCorroedFragmentShader = `

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;
varying vec3 vTangent;

uniform sampler2D albedoMap;
uniform sampler2D normalMap;
uniform sampler2D specularMap;
uniform vec3 lightDirection;
uniform float glossiness;
uniform float normalScale;
uniform vec3 lightColor;

// This function taken directly from the three.js phong fragment shader.
// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html
vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

  vec3 q0 = dFdx( eye_pos.xyz );
  vec3 q1 = dFdy( eye_pos.xyz );
  vec2 st0 = dFdx( vUv.st );
  vec2 st1 = dFdy( vUv.st );

  vec3 S = normalize( q0 * st1.t - q1 * st0.t );
  vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
  vec3 N = normalize( surf_norm );

  vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
  mapN.xy = normalScale * mapN.xy;
  mat3 tsn = mat3( S, T, N );
  return normalize( tsn * mapN );

}

// bump map calc
uniform sampler2D bumpMap;
uniform float bumpScale;

    // Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen
    //	http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html

    // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

vec2 dHdxy_fwd() {

  float scaledBumpScale = bumpScale / 10.0;

  vec2 dSTdx = dFdx( vUv );
  vec2 dSTdy = dFdy( vUv );

  float Hll = scaledBumpScale * texture2D( bumpMap, vUv ).x;
  float dBx = scaledBumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
  float dBy = scaledBumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

  return vec2( dBx, dBy );

}

vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {

  vec3 vSigmaX = dFdx( surf_pos );
  vec3 vSigmaY = dFdy( surf_pos );
  vec3 vN = surf_norm;		// normalized

  vec3 R1 = cross( vSigmaY, vN );
  vec3 R2 = cross( vN, vSigmaX );

  float fDet = dot( vSigmaX, R1 );

  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
  return normalize( abs( fDet ) * surf_norm - vGrad );

}

void main() {

  // setup
  vec3 viewDirection = normalize(cameraPosition - wPos);
  vec3 vLightDirection = normalize(lightDirection);

  // normals
  vec3 normal = normalize(vNormal);
  
  // bump map
  normal = perturbNormalArb( wPos, normal, dHdxy_fwd() );

  // normal map
  normal = perturbNormal2Arb( -viewDirection, normal );
  
  // diffuse light
  vec3 diffuseColor = texture2D(albedoMap, vUv).xyz;
  float lambert = clamp(dot(normal, vLightDirection), 0.0, 1.0);
  vec3 vLambertLight = diffuseColor * lightColor * lambert;

  // specular light
  float specularLevel = texture2D(specularMap, vUv).x;
  float specularExponent = pow(2.0, glossiness * specularLevel * 10.0) + 20.0;
  vec3 halfVector = normalize(vLightDirection + viewDirection);
  float specular = max(dot(halfVector, normal), 0.0);
  specular = pow(specular, specularExponent);
  specular = specular * smoothstep(0.0, 1.0, lambert * 2.0);
  specular = specular * glossiness * specularLevel;
  vec3 vSpecularLight = lightColor * specular;

  // normal map
  vec3 normalMapColor = texture2D(normalMap, vUv).xyz;
  // normalMapColor = normalize(normalMapColor / 2.0 - 1.0);

  // combining the two lights
  vec4 light = vec4(vLambertLight + vSpecularLight, 1.0);
  
  gl_FragColor = light;
  // gl_FragColor = vec4(normalMapColor, 1.0);
}
`;

const metalTextureColor = new TextureLoader().load(metalTextureColorUrl);
metalTextureColor.wrapS = metalTextureColor.wrapT = RepeatWrapping;

const metalTextureNormal = new TextureLoader().load(metalTextureNormalUrl);
metalTextureNormal.wrapS = metalTextureNormal.wrapT = RepeatWrapping;

const metalTextureSpecular = new TextureLoader().load(metalTextureSpecularUrl);
metalTextureSpecular.wrapS = metalTextureSpecular.wrapT = RepeatWrapping;

const metalTextureBump = new TextureLoader().load(metalTextureBumpUrl);
metalTextureBump.wrapS = metalTextureBump.wrapT = RepeatWrapping;

export const MetalCorroedMaterial = new ShaderMaterial({
  uniforms: {
    albedoMap: {
      value: metalTextureColor
    },
    normalMap: {
      value: metalTextureNormal
    },
    specularMap: {
      value: metalTextureSpecular
    },
    bumpMap: {
      value: metalTextureBump
    },
    bumpScale: {
      value: 0.5
    },
    normalScale: { value: 0.2 },
    lightColor: { value: hexToVector3("#ffffff") },
    glossiness: { value: 1.0 },
    lightDirection: { value: new Vector3(3, 3, 0) },
  },
  vertexShader: MetalCorroedVertexShader,
  fragmentShader: MetalCorroedFragmentShader
});

console.log(UniformsLib.normalmap);

