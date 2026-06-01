import * as THREE from 'three';

export default class TileMeshMaterial extends THREE.MeshBasicMaterial {
    constructor(taperAmount) {
        super({
            onBeforeCompile: (shader) => {
                shader.uniforms.taperAmount = taperAmount;

                shader.uniforms.time = { value: 0 };
                shader.vertexShader = `uniform float taperAmount; 
                                      ${shader.vertexShader}`;
                shader.vertexShader = shader.vertexShader.replace(
                    `#include <begin_vertex>`,
                    `#include <begin_vertex>
                    transformed = position;
                    transformed.x *= 1.0 - mix(0.0,uv.y, taperAmount);
                    `
                );
            }
        });
    }
}