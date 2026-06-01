// src/utils/media.ts

// Glob import all images and videos
const images: Record<string, { default: string }> = import.meta.glob(
    "../assets/images/*.{webp,svg,png,jpg,jpeg}",
    { eager: true }
);

const videos: Record<string, { default: string }> = import.meta.glob(
    "../assets/videos/*.{mp4}",
    { eager: true }
);

/**
 * Get image path dynamically by file name
 * @param fileName - file name with extension (e.g., 'blue-drink.webp')
 */
export const getImage = (fileName: string): string => {
    const key = `../assets/images/${fileName}`;
    return images[key]?.default || "";
};

/**
 * Get video path dynamically by file name
 * @param fileName - file name with extension (e.g., 'smoke_final.mp4')
 */
export const getVideo = (fileName: string): string => {
    const key = `../assets/videos/${fileName}`;
    return videos[key]?.default || "";
};