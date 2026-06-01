// Shader source code
const vertexShaderSource = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShaderSource = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_patternScale;
uniform float u_refraction;
uniform float u_edge;
uniform float u_patternBlur;
uniform float u_liquid;
uniform float u_background;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec2 get_img_uv() {
    vec2 img_uv = vUv;
    img_uv -= 0.5;
    
    // Scale down by 35%
    img_uv *= (1.0/0.65);
    
    if (u_ratio > u_img_ratio) {
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;
    } else {
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;
    }
    img_uv += 0.5;
    return img_uv;
}

vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {
    float ch = c2;
    float border = 0.0;
    float blur = u_patternBlur + extra_blur;

    ch = mix(ch, c1, smoothstep(0.0, blur, stripe_p));

    border = w[0];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

    b = smoothstep(0.2, 0.8, b);
    border = w[0] + 0.4 * (1.0 - b) * w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

    border = w[0] + 0.5 * (1.0 - b) * w[1];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

    border = w[0] + w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
    float gradient = mix(c1, c2, smoothstep(0.0, 1.0, gradient_t));
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));

    return ch;
}

float get_img_frame_alpha(vec2 uv, float img_frame_width) {
    float img_frame_alpha = smoothstep(0.0, img_frame_width, uv.x) * smoothstep(1.0, 1.0 - img_frame_width, uv.x);
    img_frame_alpha *= smoothstep(0.0, img_frame_width, uv.y) * smoothstep(1.0, 1.0 - img_frame_width, uv.y);
    return img_frame_alpha;
}

void main() {
    vec2 uv = vUv;
    uv.x *= u_ratio;

    float diagonal = uv.x - uv.y;
    float t = 0.001 * u_time;

    vec2 img_uv = get_img_uv();
    vec4 img = texture2D(u_image_texture, img_uv);

    vec3 color = vec3(0.0);
    float opacity = 1.0;

    vec3 color1 = vec3(0.98, 0.98, 1.0);
    vec3 color2 = vec3(0.1, 0.1, 0.1 + 0.1 * smoothstep(0.7, 1.3, uv.x + uv.y));

    float edge = img.r;
    
    // Calculate edge with feathering
    float edgeGradient = length(vec2(dFdx(edge), dFdy(edge)));
    float featherWidth = u_edge * 0.3; // Increased from 0.1 to 0.3 for stronger effect
    float smoothEdge = smoothstep(0.9 - featherWidth - 0.5 * u_edge, 1.0 - 0.5 * u_edge, edge + edgeGradient * featherWidth * 3.0); // Added multiplier for gradient
    opacity = 1.0 - smoothEdge;
    opacity *= get_img_frame_alpha(img_uv, 0.01);

    vec2 grad_uv = uv;
    grad_uv -= 0.5;

    float dist = length(grad_uv + vec2(0.0, 0.2 * diagonal));
    grad_uv = rotate(grad_uv, (0.25 - 0.2 * diagonal) * PI);

    float bulge = pow(1.8 * dist, 1.2);
    bulge = 1.0 - bulge;
    bulge *= pow(uv.y, 0.3);

    float cycle_width = u_patternScale;
    float thin_strip_1_ratio = 0.12 / cycle_width * (1.0 - 0.4 * bulge);
    float thin_strip_2_ratio = 0.07 / cycle_width * (1.0 + 0.4 * bulge);
    float wide_strip_ratio = (1.0 - thin_strip_1_ratio - thin_strip_2_ratio);

    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;

    float noise = snoise(uv - t);
    edge += (1.0 - edge) * u_liquid * noise;

    float refr = 0.0;
    refr += (1.0 - bulge);
    refr = clamp(refr, 0.0, 1.0);

    float dir = grad_uv.x;
    dir += diagonal;
    dir -= 2.0 * noise * diagonal * (smoothstep(0.0, 1.0, edge) * smoothstep(1.0, 0.0, edge));

    bulge *= clamp(pow(uv.y, 0.1), 0.3, 1.0);
    dir *= (0.1 + (1.1 - edge) * bulge);
    dir *= smoothstep(1.0, 0.7, edge);

    dir += 0.18 * (smoothstep(0.1, 0.2, uv.y) * smoothstep(0.4, 0.2, uv.y));
    dir += 0.03 * (smoothstep(0.1, 0.2, 1.0 - uv.y) * smoothstep(0.4, 0.2, 1.0 - uv.y));

    dir *= (0.5 + 0.5 * pow(uv.y, 2.0));
    dir *= cycle_width;
    dir -= t;

    float refr_r = refr;
    refr_r += 0.03 * bulge * noise;
    float refr_b = 1.3 * refr;

    refr_r += 5.0 * (smoothstep(-0.1, 0.2, uv.y) * smoothstep(0.5, 0.1, uv.y)) * (smoothstep(0.4, 0.6, bulge) * smoothstep(1.0, 0.4, bulge));
    refr_r -= diagonal;

    refr_b += (smoothstep(0.0, 0.4, uv.y) * smoothstep(0.8, 0.1, uv.y)) * (smoothstep(0.4, 0.6, bulge) * smoothstep(0.8, 0.4, bulge));
    refr_b -= 0.2 * edge;

    refr_r *= u_refraction;
    refr_b *= u_refraction;

    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
    w[1] -= 0.02 * smoothstep(0.0, 1.0, edge + bulge);

    float stripe_r = mod(dir + refr_r, 1.0);
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + 0.03 * u_refraction * bulge, bulge);
    float stripe_g = mod(dir, 1.0);
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1.0 - diagonal), bulge);
    float stripe_b = mod(dir - refr_b, 1.0);
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, 0.01, bulge);

    color = vec3(r, g, b);
    color *= opacity;

    gl_FragColor = vec4(color, opacity);
}
`;

// Three.js setup
let scene, camera, renderer, material, texture, geometry, mesh;
let lastTime = 0;
let timeIncrement = 0.3; // Default speed

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const canvas = document.getElementById('canvas');
    canvas.width = 1024;
    canvas.height = 1024;

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        willReadFrequently: true,
        powerPreference: 'high-performance'
    });

    renderer.setSize(1024, 1024);
    renderer.setClearColor(0x000000, 0);

    // Create geometry (a simple plane)
    geometry = new THREE.PlaneGeometry(2, 2);

    // Create shader material
    material = new THREE.ShaderMaterial({
        uniforms: {
            u_image_texture: { value: null },
            u_time: { value: 0 },
            u_ratio: { value: 1.0 },
            u_img_ratio: { value: 1.0 },
            u_patternScale: { value: 2.0 },
            u_refraction: { value: 0.015 },
            u_edge: { value: 0.4 },
            u_patternBlur: { value: 0.005 },
            u_liquid: { value: 0.07 },
            u_background: { value: 0.0 },
        },
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        transparent: true,
        blending: THREE.NormalBlending
    });

    // Create mesh and add to scene
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Background color handling
    document.querySelectorAll('.background-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.background-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const bg = this.dataset.bg;
            if (bg === 'custom') {
                // Don't do anything on click for custom - color picker will handle it
                return;
            }
            
            const color = this.dataset.color;
            scene.background = new THREE.Color(color);
            renderer.render(scene, camera);
        });
    });

    const bgColorPicker = document.getElementById('bgColorPicker');
    bgColorPicker.addEventListener('input', (e) => {
        document.querySelectorAll('.background-option').forEach(opt => opt.classList.remove('active'));
        bgColorPicker.closest('.background-option').classList.add('active');
        scene.background = new THREE.Color(e.target.value);
        renderer.render(scene, camera);
    });

    const controls = document.querySelectorAll('input[type="range"]');
    controls.forEach(control => {
        control.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (e.target.id === 'speed') {
                timeIncrement = value;
            } else {
                material.uniforms[`u_${e.target.id}`].value = value;
            }
            renderer.render(scene, camera);
        });
    });

    // Update edge range input
    const edgeInput = document.getElementById('edge');
    edgeInput.min = "0";
    edgeInput.max = "1";
    edgeInput.step = "0.01";
    edgeInput.value = "0.5";  // Default value for balanced edge and feather

    // Background color selection
    const backgrounds = document.querySelectorAll('input[name="background"]');
    backgrounds.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            material.uniforms.u_background.value = parseFloat(index);
            renderer.render(scene, camera);
        });
    });
}

function animate(currentTime) {
    requestAnimationFrame(animate);
    
    // Update time uniform
    material.uniforms.u_time.value += timeIncrement;
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    const container = document.querySelector('.canvas-container');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    
    if (isMobile) {
        // On mobile, canvas takes full width
        const width = window.innerWidth;
        container.style.width = width + 'px';
        container.style.height = width + 'px';
        renderer.setSize(1024, 1024); // Keep internal resolution high
        container.style.transform = 'none';
    } else {
        // On desktop, maintain square aspect with max size
        const side = Math.min(window.innerWidth, window.innerHeight) * 0.8;
        container.style.width = side + 'px';
        container.style.height = side + 'px';
        renderer.setSize(1024, 1024); // Keep internal resolution high
        container.style.transform = `scale(${side/1024})`;
        container.style.transformOrigin = 'center center';
    }
    
    renderer.render(scene, camera);
}

// Load image function
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Scale down image by 30%
            const scale = 1.0;
            const width = 1024;
            const height = 1024;
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw white background first
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            // Draw scaled image on top
            ctx.drawImage(img, 0, 0, width, height);
            
            // Create texture
            texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            
            // Update material uniforms
            material.uniforms.u_image_texture.value = texture;
            material.uniforms.u_img_ratio.value = width / height;
            
            resolve();
        };
        img.onerror = reject;
        img.src = src;
    });
}

// UI Controls
function setupControls() {
    const controls = document.querySelectorAll('input[type="range"]');
    controls.forEach(control => {
        control.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (e.target.id === 'speed') {
                timeIncrement = value;
            } else {
                material.uniforms[`u_${e.target.id}`].value = value;
            }
        });
    });

    // Background color selection
    const backgrounds = document.querySelectorAll('input[name="background"]');
    backgrounds.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            material.uniforms.u_background.value = parseFloat(index);
        });
    });
}

// Setup logo samples
function setupLogoSamples() {
    const logoSamples = document.querySelector('.logo-samples');
    logoSamples.innerHTML = ''; // Clear existing samples
    
    // First row: 3 logos
    const firstRow = [
        'punisher',
        'dcshoes',
        'github'
    ];
    
    // Second row: 2 logos
    const secondRow = [
        'linux',
        'huggingface'
    ];

    // Add first row
    firstRow.forEach(logo => {
        const div = document.createElement('div');
        div.className = 'logo-sample';
        div.setAttribute('data-logo', logo);
        const img = document.createElement('img');
        img.src = `/MetalFlow/logos/${logo}.svg`;
        div.appendChild(img);
        logoSamples.appendChild(div);
    });

    // Add second row
    secondRow.forEach(logo => {
        const div = document.createElement('div');
        div.className = 'logo-sample';
        div.setAttribute('data-logo', logo);
        const img = document.createElement('img');
        img.src = `/MetalFlow/logos/${logo}.svg`;
        div.appendChild(img);
        logoSamples.appendChild(div);
    });

    // Add click handlers to logo samples
    document.querySelectorAll('.logo-sample').forEach(sample => {
        const logo = sample.getAttribute('data-logo');
        sample.addEventListener('click', () => loadImage(`/MetalFlow/logos/${logo}.svg`));
    });
}

// Setup file upload
function setupFileUpload() {
    const uploadButton = document.querySelector('.upload-button');
    const fileInput = document.getElementById('file-input');

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => loadImage(e.target.result);
            reader.readAsDataURL(file);
        }
    });
}

// Setup drag and drop with touch support
function setupDragAndDrop() {
    const container = document.getElementById('canvas-container');
    const uploadButton = document.querySelector('.upload-button');
    
    // Touch events for mobile
    let touchTimeout;
    
    container.addEventListener('touchstart', (e) => {
        touchTimeout = setTimeout(() => {
            container.classList.add('drag-over');
        }, 200);
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        clearTimeout(touchTimeout);
        container.classList.remove('drag-over');
    });
    
    container.addEventListener('touchmove', (e) => {
        clearTimeout(touchTimeout);
        container.classList.remove('drag-over');
    }, { passive: true });
    
    // Drag events for desktop
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add('drag-over');
    });
    
    container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove('drag-over');
    });
    
    container.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => loadImage(e.target.result);
            reader.readAsDataURL(file);
        }
    });

    // Handle touch file selection via upload button on mobile
    if ('ontouchstart' in window) {
        uploadButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';
            document.body.appendChild(input);
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => loadImage(e.target.result);
                    reader.readAsDataURL(file);
                }
                document.body.removeChild(input);
            });
            
            input.click();
        });
    }
}

// Download functions
function setupDownloadButtons() {
    const pngButton = document.getElementById('download-png');
    const videoButton = document.getElementById('download-video');

    pngButton.addEventListener('click', downloadPNG);
    videoButton.addEventListener('click', () => startRecording(renderer.domElement));
}

function downloadPNG() {
    const canvas = renderer.domElement;
    const link = document.createElement('a');
    link.download = 'liquid-metal-logo.png';
    link.href = canvas.toDataURL('image/png');
    
    // Convert data URL to blob
    fetch(link.href)
        .then(res => res.blob())
        .then(blob => {
            handleExport(blob, 'image/png', 'png');
        });
}

// Global variables
let isRecording = false;
let mediaRecorder = null;
let recordedChunks = [];

// Start video recording
async function startRecording(canvas) {
    if (isRecording) {
        stopRecording();
        return;
    }
    
    isRecording = true;
    recordedChunks = [];

    const videoButton = document.getElementById('download-video');
    
    // Save original content
    if (!videoButton._originalContent) {
        videoButton._originalContent = videoButton.innerHTML;
    }
    
    // Add recording indicator
    videoButton.classList.add('recording');

    try {
        const stream = canvas.captureStream(30);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=h264',
            videoBitsPerSecond: 8000000
        });
        
        setupMediaRecorder(videoButton);
        
        // Auto-stop after 25 seconds
        setTimeout(() => {
            if (isRecording) {
                stopRecording();
            }
        }, 25000);
        
    } catch (e) {
        console.log('H.264 recording failed, trying WebM:', e);
        try {
            const stream = canvas.captureStream(30);
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm',
                videoBitsPerSecond: 8000000
            });
            
            setupMediaRecorder(videoButton);
            
            // Auto-stop after 25 seconds
            setTimeout(() => {
                if (isRecording) {
                    stopRecording();
                }
            }, 25000);
            
        } catch (e) {
            console.log('WebM recording failed:', e);
            isRecording = false;
            videoButton.classList.remove('recording');
        }
    }
}

// Stop recording and trigger appropriate handlers
function stopRecording() {
    isRecording = false;
    const videoButton = document.getElementById('download-video');
    
    // Stop video recording
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaRecorder = null;
    }
    
    // Reset button state
    videoButton.classList.remove('recording');
}

// Setup MediaRecorder handlers
function setupMediaRecorder(recordButton) {
    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };

    mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        
        handleExport(blob, 'video/webm', 'webm');
        
        // Reset button state
        recordButton.classList.remove('recording');
    };

    // Start recording
    mediaRecorder.start();
}

// Handle export download/preview
function handleExport(blob, type, format) {
    const url = URL.createObjectURL(blob);
    
    // On mobile, just download directly
    if (window.matchMedia('(max-width: 767px)').matches) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `metalflow.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL after download
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    } else {
        addToRecentExports(blob, type);
    }
}

// Recent exports management
const MAX_RECENT_EXPORTS = 4;
let recentExports = [];

// Add to recent exports (desktop only)
function addToRecentExports(blob, type) {
    // Don't create accordion on mobile
    if (window.matchMedia('(max-width: 767px)').matches) return;
    
    // Create container if it doesn't exist
    let container = document.querySelector('.recent-exports');
    if (!container) {
        container = document.createElement('div');
        container.className = 'recent-exports';
        document.body.appendChild(container);
    }
    
    // Create export item
    const item = document.createElement('div');
    item.className = 'export-item';
    item.style.opacity = '0';
    
    // Create media element
    let mediaElement;
    if (type === 'image/png') {
        mediaElement = document.createElement('img');
        mediaElement.src = URL.createObjectURL(blob);
    } else if (type === 'video/webm') {
        mediaElement = document.createElement('video');
        mediaElement.src = URL.createObjectURL(blob);
        mediaElement.loop = true;
        mediaElement.muted = true;
        mediaElement.autoplay = true;
    }
    
    // Add media element to item
    item.appendChild(mediaElement);
    
    // Add click handler for lightbox
    item.addEventListener('click', () => {
        openLightbox(mediaElement.cloneNode(true));
    });
    
    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.innerHTML = '<i class="ph ph-download"></i>';
    downloadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const extension = type.split('/')[1];
        link.download = `metalflow.${extension}`;
        link.click();
    });
    item.appendChild(downloadButton);
    
    // Add to array and DOM
    recentExports.push({
        url: URL.createObjectURL(blob),
        type,
        element: item
    });
    
    // Remove oldest if we exceed max
    if (recentExports.length > MAX_RECENT_EXPORTS) {
        const oldest = recentExports.shift();
        URL.revokeObjectURL(oldest.url);
        if (oldest.element.parentNode) {
            oldest.element.parentNode.removeChild(oldest.element);
        }
    }
    
    // Add new item to container
    container.appendChild(item);
    
    // Show container
    container.style.display = 'flex';
    
    // Fade in new item
    setTimeout(() => {
        item.style.opacity = '1';
    }, 100);
}

// Lightbox functionality
function openLightbox(mediaElement) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = lightbox.querySelector('.lightbox-media');
    
    // Clear previous content
    lightboxMedia.innerHTML = '';
    
    // Add new media
    if (mediaElement instanceof HTMLVideoElement) {
        mediaElement.controls = true;
    }
    lightboxMedia.appendChild(mediaElement);
    
    // Show lightbox
    lightbox.classList.add('active');
    
    // Add close handlers
    const closeButton = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxMedia.innerHTML = '';
        }, 300);
    };
    
    closeButton.onclick = closeLightbox;
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    };
    
    // Add escape key handler
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Initialize everything
function initApp() {
    init();
    setupControls();
    setupLogoSamples();
    setupFileUpload();
    setupDownloadButtons();
    setupDragAndDrop();
    
    // Hide recent exports container initially
    const container = document.querySelector('.recent-exports');
    if (container) {
        container.style.display = 'none';
    }
    
    // Load default logo (github)
    loadImage('/MetalFlow/logos/github.svg').then(() => {
        requestAnimationFrame(animate);
    });
}

// Start the app
initApp();

async function handleLogoClick(logoPath) {
    try {
        const response = await fetch(logoPath);
        if (!response.ok) throw new Error('Network response was not ok');
        const svgText = await response.text();
        loadSVGContent(svgText);
    } catch (error) {
        console.error('Error loading logo:', error);
    }
}
