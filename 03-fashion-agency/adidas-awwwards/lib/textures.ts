export const studioTextures = {
  main: {
    defaultStudio: "/textures/main/Default_Studio_Baked_Texture.webp",
    whiteStudio: "/textures/main/White_Studio_Baked_Texture.webp",
    redStudio: "/textures/main/Red_Studio_Baked_Texture.webp",
    grayStudio: "/textures/main/Gray_Studio_Baked_Texture.webp",
    whiteShirt: "/textures/main/White_Shirt_BakedTexture.webp",
    sportShirt: "/textures/main/Sport_Shirt_Baked_Texture.webp",
    grayShirt: "/textures/main/Gray_Shirt_Baked_Texture.webp",
  },
  shirts: {
    white: {
      first: {
        studio: "/textures/white/first/White_Studio_Baked_Texture.webp",
        speakers: "/textures/white/first/Speakers_Baked_Texture.webp",
        dj: "/textures/white/first/Dj_Baked_Texture.webp",
        shirt: "/textures/white/first/White_Shirt_Baked_Texture.webp",
        tv: "/textures/white/first/TV_Screen.webp",
      },
      second: {
        shirt: "/textures/white/second/White_Studio_Baked_Texture.webp",
        sphere: "/textures/white/second/Sphere_Env_Baked_Texture.webp",
      },
      third: {
        normal: "/textures/FloorNormal.png",
        overlay: "/textures/SmudgesOverlay.jpg",
        icon: "/textures/adidas.png",
      },
    },
    gray: {
      first: {
        shirt: "/textures/gray/first/Gray_Shirt_Baked_Texture.webp",
        assets: "/textures/gray/first/Assets_Baked_Texture.webp",
        wall: "/textures/gray/first/Wall_Baked_Texture.webp",
        floor: "/textures/gray/first/Floor_Baked_Texture.webp",
      },
      second: {
        shirt: "/textures/gray/second/Gray_Shirt_Baked_Texture.webp",
        sphere: "/textures/gray/second/Gray_Sphere_Env_Baked_Texture.webp",
      },
      third: {
        normal: "/textures/FloorNormal.png",
        overlay: "/textures/SmudgesOverlay.jpg",
        icon: "/textures/adidas.png",
      },
    },
    sport: {
      first: {
        shirt: "/textures/sport/first/Sport_Shirt_Baked_Texture.webp",
        env: "/textures/sport/first/Floor_Baked_Texutre.webp",
        skateboard: "/textures/sport/first/Skateboard_Baked_Texture.webp",
        ramp: "/textures/sport/first/Ramp_Baked_Texture.webp",
      },
      second: {
        shirt: "/textures/sport/second/Sport_Shirt_Baked_Texture.webp",
        sphere: "/textures/sport/second/Sport_Sphere_Env_Baked_Texture.webp",
      },
      third: {
        normal: "/textures/FloorNormal.png",
        overlay: "/textures/SmudgesOverlay.jpg",
        icon: "/textures/adidas.png",
      },
    },
  },
};

export const environmentPaths = {
  white: "/textures/white/third/",
  gray: "/textures/gray/third/",
  sport: "/textures/sport/third/",
};

export const videoTextures = {
  white: "/textures/white/third/adidas.mp4",
  gray: "/textures/gray/third/adidas.mp4",
  sport: "/textures/sport/third/adidas.mp4",
};

//Image path => useTexture
//Video paths => useVideoTexture
//cube map paths => useCubeTexture

export type ShirtType = keyof typeof studioTextures.shirts;
export type SectionType = "first" | "second" | "third";

export type TextureKey<
  S extends ShirtType,
  P extends SectionType
> = keyof (typeof studioTextures.shirts)[S][P];
