import { LinearFilter, Scene, TextureLoader, WebGLCubeRenderTarget, WebGLRenderer } from "three";

import skyTextureUrl from './textures/2k_stars_milky_way.jpg'

export const addSky = (renderer: WebGLRenderer, scene: Scene) => {
  const skyTextureTexture = new TextureLoader().load(skyTextureUrl, () => {
    const rt = new WebGLCubeRenderTarget(skyTextureTexture.image.height);
    rt.fromEquirectangularTexture(renderer, skyTextureTexture);
    console.log(rt.texture);
    
    scene.background = rt.texture;
  });
  skyTextureTexture.magFilter = LinearFilter;
}
