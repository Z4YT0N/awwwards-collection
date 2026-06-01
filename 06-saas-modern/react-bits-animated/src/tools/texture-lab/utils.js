export const loadImageFromFile = file => {
  return new Promise((resolve, reject) => {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
      reject(new Error('Unsupported file type. Please use PNG, JPG, or WebP.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => resolve({ image: img, url: e.target.result, corsError: false });
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const loadVideoFromFile = file => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('video/')) {
      reject(new Error('Not a video file. Please upload a video.'));
      return;
    }

    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = true;

    video.onloadedmetadata = () => {
      video.currentTime = 0.001;
    };

    video.onseeked = () => {
      resolve({
        video,
        url,
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
        corsError: false
      });
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load video. Format may not be supported by your browser.'));
    };

    video.src = url;
  });
};

export const loadVideoFromURL = url => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.loop = true;

    video.onloadedmetadata = () => {
      video.currentTime = 0.001;
    };

    video.onseeked = () => {
      try {
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 1;
        testCanvas.height = 1;
        const ctx = testCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 1, 1);
        ctx.getImageData(0, 0, 1, 1);
        resolve({
          video,
          url,
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
          corsError: false
        });
      } catch {
        resolve({
          video,
          url,
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
          corsError: true
        });
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video. Check the URL and try again.'));
    };

    video.src = url;
  });
};

export const loadImageFromURL = url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.getImageData(0, 0, 1, 1);
        resolve({ image: img, url, corsError: false });
      } catch {
        resolve({ image: img, url, corsError: true });
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image. Check the URL and try again.'));
    };

    img.src = url;
  });
};

export const SAMPLE_IMAGES = [
  {
    name: 'Abstract Gradient',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80'
  },
  {
    name: 'Portrait',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80'
  },
  {
    name: 'Landscape',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
  }
];

export const isClipboardImageSupported = () => {
  return navigator.clipboard && typeof ClipboardItem !== 'undefined' && navigator.clipboard.write;
};

export const copyCanvasToClipboard = async canvas => {
  if (!isClipboardImageSupported()) {
    throw new Error('Clipboard image copy not supported in this browser');
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(async blob => {
      if (!blob) {
        reject(new Error('Failed to create image blob'));
        return;
      }

      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        resolve();
      } catch (err) {
        reject(new Error(`Clipboard write failed: ${err.message}`));
      }
    }, 'image/png');
  });
};

export const copyDataURLToClipboard = async canvas => {
  const dataUrl = canvas.toDataURL('image/png');
  await navigator.clipboard.writeText(dataUrl);
};

export const exportCanvas = (canvas, options = {}) => {
  const { format = 'png', quality = 0.92, filename = 'texture-lab-export' } = options;

  return new Promise((resolve, reject) => {
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const extension = format === 'jpg' ? 'jpg' : 'png';

    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      mimeType,
      format === 'jpg' ? quality : undefined
    );
  });
};

export const createScaledCanvas = (sourceCanvas, scale, maxDimension = 8192) => {
  const targetWidth = Math.min(sourceCanvas.width * scale, maxDimension);
  const targetHeight = Math.min(sourceCanvas.height * scale, maxDimension);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);

  return canvas;
};

export const estimateFileSize = (width, height, format, quality = 0.92) => {
  const pixels = width * height;
  const bytesPerPixel = format === 'png' ? 3 : 0.5 + quality * 2;
  const bytes = pixels * bytesPerPixel;

  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const generateProceduralTexture = (type, size = 256) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  const seededRandom = seed => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  switch (type) {
    case 'paper': {
      for (let i = 0; i < data.length; i += 4) {
        const px = (i / 4) % size;
        const py = Math.floor(i / 4 / size);
        const noise1 = seededRandom(px * 0.1 + py * 0.1);
        const noise2 = seededRandom(px * 0.05 + py * 0.2 + 1000);
        const value = Math.round((noise1 * 0.7 + noise2 * 0.3) * 60 + 195);
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255;
      }
      break;
    }

    case 'film-grain': {
      for (let i = 0; i < data.length; i += 4) {
        const noise = seededRandom(i);
        const value = Math.round(noise * 255);
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = Math.round(noise * 100);
      }
      break;
    }

    case 'canvas': {
      for (let i = 0; i < data.length; i += 4) {
        const px = (i / 4) % size;
        const py = Math.floor(i / 4 / size);
        const weave = (Math.sin(px * 0.5) * 0.5 + 0.5) * (Math.sin(py * 0.5) * 0.5 + 0.5);
        const noise = seededRandom(i) * 0.2;
        const value = Math.round((weave + noise) * 60 + 180);
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255;
      }
      break;
    }

    case 'dust': {
      for (let i = 0; i < data.length; i += 4) {
        const noise = seededRandom(i);
        if (noise > 0.98) {
          data[i] = data[i + 1] = data[i + 2] = 0;
          data[i + 3] = Math.round(seededRandom(i + 1) * 200);
        } else if (noise > 0.95) {
          data[i] = data[i + 1] = data[i + 2] = 255;
          data[i + 3] = Math.round(seededRandom(i + 2) * 50);
        } else {
          data[i] = data[i + 1] = data[i + 2] = 128;
          data[i + 3] = 0;
        }
      }
      break;
    }

    default:
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = 128;
        data[i + 3] = 255;
      }
  }

  ctx.putImageData(imageData, 0, 0);

  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = canvas.toDataURL();
  });
};
