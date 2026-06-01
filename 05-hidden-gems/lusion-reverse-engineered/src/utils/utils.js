import * as THREE from 'three';

export function pageToWorldCoords(pageX, pageY, camera) {
    const normalisedScreenCoordsX = (pageX / window.innerWidth) * 2 - 1;
    const normalisedScreenCoordsY = -(pageY / window.innerHeight) * 2 + 1;

    // 1 = far + cam pos, = -1000 + 10 = -990
    // -1 = near + cam pos = 0 + 10 = 10
    // express world 0, as percentage between -990 and 10
    const nearRelativeToCam = camera.near + camera.position.z;
    const farRelativeToCam = -camera.far - camera.position.z;
    const t = THREE.MathUtils.inverseLerp(farRelativeToCam, nearRelativeToCam, -camera.position.z);

    var screenPos = new THREE.Vector3(normalisedScreenCoordsX, normalisedScreenCoordsY, -t);
    screenPos.unproject(camera);

    return screenPos;
}

/**
 * Converts a HTML pixel to world units
 * 
 * @param {THREE.OrthographicCamera} camera 
 */
export function pagePixelsToWorldUnit(pagePixels, camera) {
    const camViewHeight = camera.top - camera.bottom;
    const worldUnitsPerPixel = camViewHeight / window.innerHeight;

    return pagePixels * worldUnitsPerPixel;
}

export function updateCameraIntrisics(cameraRef, frustum) {
    const aspect = window.innerWidth / window.innerHeight;
    const horizontal = frustum * aspect / 2;
    const vertical = frustum / 2;
    cameraRef.left = -horizontal;
    cameraRef.right = horizontal;
    cameraRef.top = vertical;
    cameraRef.bottom = -vertical;
    cameraRef.updateMatrixWorld();
    cameraRef.updateProjectionMatrix();
}

export function createBevelledPlane(width, height, radius) {
    const x = width / 2;
    const y = height / 2;

    const shape = new THREE.Shape();
    shape.moveTo(-x + radius, y);
    shape.lineTo(x - radius, y);
    shape.quadraticCurveTo(x, y, x, y - radius);
    shape.lineTo(x, -y + radius);
    shape.quadraticCurveTo(x, -y, x - radius, -y);
    shape.lineTo(-x + radius, -y);
    shape.quadraticCurveTo(-x, -y, -x, -y + radius);
    shape.lineTo(-x, y - radius);
    shape.quadraticCurveTo(-x, y, -x + radius, y);

    const geometry = new THREE.ShapeGeometry(shape);
    geometry.computeBoundingBox();

    const bbox = geometry.boundingBox;
    const minX = bbox.min.x;
    const maxX = bbox.max.x;
    const minY = bbox.min.y;
    const maxY = bbox.max.y;

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    // Create UVs
    geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 2), 2);

    for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        // Normalize x and y to range [0, 1]
        const u = (x - minX) / rangeX;
        const v = (y - minY) / rangeY;

        geometry.attributes.uv.setXY(i, u, v);
    }

    return geometry;
}

/**
 * Get the (page) coordinates of an html element
 * @param {string} elementId 
 * @param {{x: number, y: number}} anchor, normalised
 * @returns 
 */
export function getElementPageCoords(elementId, anchor = { x: 0.5, y: 0.5 }) {
    const element = document.getElementById(elementId);
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = rect.left /*+ window.scrollX*/ + (width * anchor.x);
    const y = rect.top /*+ window.scrollY*/ + (height * anchor.y);

    return { x, y, width, height };
}

export function elementToWorldRect(elementId, camera, anchor = { x: 0.5, y: 0.5 }) {
    const elementPageCoords = getElementPageCoords(elementId, anchor);

    const position = pageToWorldCoords(elementPageCoords.x, elementPageCoords.y, camera);
    const width = pagePixelsToWorldUnit(elementPageCoords.width, camera);
    const height = pagePixelsToWorldUnit(elementPageCoords.height, camera);

    return { position, width, height }
}

export function elementToLocalRect(elementId, parent, camera) {
    const worldRect = elementToWorldRect(elementId, camera, { x: 0, y: 0 });
    const { position, width, height } = worldRect;

    parent.worldToLocal(position);

    return { position, width, height };
}

export function elementToLocalRectPoints(elementId, parent, camera) {
    const worldRect = elementToWorldRect(elementId, camera, { x: 0, y: 0 });

    const tl = worldRect.position;

    const tr = worldRect.position.clone();
    tr.x += worldRect.width;

    const bl = worldRect.position.clone();
    bl.y -= worldRect.height;

    const br = worldRect.position.clone();
    br.x += worldRect.width;
    br.y -= worldRect.height;

    const center = worldRect.position.clone();
    center.x += worldRect.width * 0.5;
    center.y -= worldRect.height * 0.5;

    parent.worldToLocal(tl);
    parent.worldToLocal(tr);
    parent.worldToLocal(br);
    parent.worldToLocal(bl);

    return { tl, tr, br, bl, center };
}

export function createVideoTexture(src) {
    const video = document.createElement('video');
    video.src = src;
    video.loop = true;
    video.muted = true;
    video.play();

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}