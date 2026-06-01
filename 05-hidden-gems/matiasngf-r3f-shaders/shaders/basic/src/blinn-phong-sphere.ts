// Code based on this tutorial https://youtu.be/mL8U8tIiRRg?t=9430

import { BoxGeometry, CapsuleGeometry, CylinderGeometry, Mesh, RingGeometry, ShaderMaterial, SphereGeometry, TorusKnotBufferGeometry, Vector3 } from "three";
import { hexToVector3 } from "./utils/hexToVector3";

const blinnPhongVS = `
  varying vec3 vNormal;
  varying vec3 vLightDirection;
  varying vec3 wPos;

  
  void main() {
    vLightDirection = normalize(vec3(-1.0, 1.0, 0.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vNormal = normal;
    wPos = (modelMatrix * vec4(position, 1.0)).xyz;
  }
`;

const blinnPhongFS = `
  varying vec3 vNormal;
  varying vec3 vLightDirection;
  varying vec3 wPos;
  
  uniform float glossiness;
  uniform vec3 lightColor;
  uniform vec3 baseColor;

  vec3 shadowColor = vec3(0.0, 0.0, 0.0);

  void main() {
    // https://youtu.be/mL8U8tIiRRg?t=10696
    float specularExponent = pow(2.0, glossiness * 10.0) + 20.0;

    // diffuse light
    float lambert = clamp(dot(vNormal, vLightDirection), 0.0, 1.0);
    vec3 vLambertLight = baseColor * lightColor * lambert;

    // smooth the transition between verteces
    vec3 normal = normalize(vNormal);

    // specular light
    vec3 viewDirection = normalize(cameraPosition - wPos);
    vec3 halfVector = normalize(vLightDirection + viewDirection);
    float specularLight = max(dot(halfVector, normal), 0.0);
    specularLight = pow(specularLight, specularExponent);
    // adjust specularLight to make specular disappear based on lambert
    specularLight = specularLight * smoothstep(0.0, 1.0, lambert * 2.0);
    // approximate light getting weaker as it gets more spread out
    specularLight = specularLight * glossiness;
    vec3 vSpecularLight = lightColor * specularLight;

    // combining the two lights
    vec4 light = vec4(vLambertLight + vSpecularLight, 1.0);

    // fresnel
    float fresnel = (1.0 - dot(normal, viewDirection)) * 0.10;

    // adding lights to color
    gl_FragColor = vec4(vec3(light + fresnel), 1.0);
  }
`;

export const BlinnPhongSphere = new Mesh(
  // new SphereGeometry(1, 16, 16),
  // new CapsuleGeometry(1, 1, 64, 64),
  // new BoxGeometry(1, 1, 1),
  // new CylinderGeometry(1, 1, 1, 64, 64),
  new TorusKnotBufferGeometry(1, 0.3, 64*2),
  new ShaderMaterial({
    uniforms: {
      lightColor: { value: hexToVector3("#51b7ff") },
      baseColor: { value: hexToVector3("#660077") },
      glossiness: { value: 0.8 },
      lightDirection: { value: new Vector3(-1, 1, 0) },
    },
    vertexShader: blinnPhongVS,
    fragmentShader: blinnPhongFS
  })
);

BlinnPhongSphere.material.uniforms.baseColor.value = hexToVector3("#5f5fff");
BlinnPhongSphere.material.uniforms.lightColor.value = hexToVector3("#ffffff");