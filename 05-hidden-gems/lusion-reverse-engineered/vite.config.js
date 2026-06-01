import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl';
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [
        wasm(),
        glsl(),
    ],
    assetsInclude: ['**/*.hdr', '**/*.glb'],
    base: "/lusion-reverse-engineered/"
});