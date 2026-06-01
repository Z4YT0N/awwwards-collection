// Code based on this tutorial https://youtu.be/mL8U8tIiRRg?t=9430

import { CapsuleGeometry, Mesh, RingGeometry, ShaderMaterial, SphereGeometry } from "three";

const phongVS = `
  varying vec3 vNormal;
  varying vec3 vLightDirection;
  varying vec3 vLight;
  varying float vLightDot;
  varying vec3 wPos;

  
  void main() {
    vLightDirection = normalize(vec3(-1.0, 1.0, 0.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vNormal = normal;
    vLightDot = max(dot(normal, vLightDirection), 0.0);
    vLight = vec3(vLightDot);
    wPos = (modelMatrix * vec4(position, 1.0)).xyz;
  }
`;

const phongFS = `
  varying vec3 vNormal;
  varying vec3 vLightDirection;
  varying vec3 vLight;
  varying float vLightDot;
  varying vec3 wPos;
  
  uniform float glossiness;

  vec3 shadowColor = vec3(0.1, 0.1, 0.1);
  vec3 baseColor = vec3(1.0, 1.0, 1.0) * 0.9;

  void main() {
    // diffuse light
    vec3 color = mix(shadowColor, baseColor, vLightDot);

    // smooth the transition between verteces
    vec3 normal = normalize(vNormal);

    // specular light
    vec3 cameraNormal = normalize(cameraPosition - wPos);
    vec3 reflection = reflect(-vLightDirection, normalize(normal));
    float specularLight = clamp(dot(reflection, cameraNormal), 0.0, 1.0);
    specularLight = pow(specularLight, glossiness);

    // combining the two
    color = mix(color, vec3(1.0, 1.0, 1.0), specularLight);
    gl_FragColor = vec4(vec3(color), 1.0);
  }
`;

export const PhongSphere = new Mesh(
  // new SphereGeometry(1, 16, 16),
  new CapsuleGeometry(1, 1, 64, 64),
  new ShaderMaterial({
    uniforms: {
      glossiness: { value: 20 },
    },
    vertexShader: phongVS,
    fragmentShader: phongFS
  })
);