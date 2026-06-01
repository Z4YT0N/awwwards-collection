import * as THREE from 'three';
import vertexShader from '../shaders/img.vert?raw';
import fragmentShader from '../shaders/img.frag?raw';

// DOM elements
const domWrapper = document.getElementById('wrapper');
let canvas;

// Three.js core objects
let scene;
let camera;
let renderer;
let geometry;

// State variables
let time = 0;
let padding = 0;
let isNoFix = false;
let isFixedWithPadding = false;
let viewportWidth;
let viewportHeight;
let prevScrollY = 0;
let strength = 0;

// Environment variables
const dpr = window.devicePixelRatio;
let colorBackground;

// Uniform variables for shaders
const resolution = new THREE.Vector2(1, 1);
const scrollOffset = new THREE.Vector2(0, 0);
const sharedUniforms = {
	u_resolution: { value: resolution },
	u_scrollOffset: { value: scrollOffset },
	u_time: { value: 0 },
	u_strength: { value: 0 },
};

// Items tracking
const itemList = [];

/**
 * Initialize the application
 */
function init() {
	colorBackground = getComputedStyle(document.documentElement).getPropertyValue('--color-background');

	// Set up Three.js scene
	setupThreeJS();

	// Create meshes for all images
	createImageMeshes();

	// Set up event listeners
	setupEventListeners();

	// Initialize state
	time = performance.now() / 1000;
	prevScrollY = window.scrollY;

	// Start animation loop
	animate();

	console.log(
		// credit
		'%c Created by Lusion: https://lusion.co/',
		'border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;',
	);
}

/**
 * Set up Three.js scene, camera and renderer
 */
function setupThreeJS() {
	canvas = document.querySelector('#canvas');
	scene = new THREE.Scene();
	camera = new THREE.Camera();
	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(colorBackground);
	geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
}

/**
 * Create meshes for all image containers
 */
function createImageMeshes() {
	const domImageContainerList = document.querySelectorAll('.image');
	const textureLoader = new THREE.TextureLoader();

	for (let i = 0; i < domImageContainerList.length; i++) {
		const domContainer = domImageContainerList[i];
		const mesh = new THREE.Mesh(
			geometry,
			new THREE.ShaderMaterial({
				uniforms: {
					u_texture: { value: textureLoader.load(`/images/${i}.webp`) },
					u_domXY: { value: new THREE.Vector2(0, 0) },
					u_domWH: { value: new THREE.Vector2(1, 1) },
					u_resolution: sharedUniforms.u_resolution,
					u_scrollOffset: sharedUniforms.u_scrollOffset,
					u_time: sharedUniforms.u_time,
					u_strength: sharedUniforms.u_strength,
					u_rands: { value: new THREE.Vector4(0, 0, 0, 0) },
					u_id: { value: i },
				},
				vertexShader,
				fragmentShader,
				side: THREE.DoubleSide,
			}),
		);

		itemList.push({
			domContainer,
			mesh,
			width: 1,
			height: 1,
			x: 0,
			top: 0,
		});

		scene.add(mesh);
		mesh.frustumCulled = false;
	}
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
	// Resize events
	window.addEventListener('resize', onResize);
	if (window.ResizeObserver) {
		new ResizeObserver(onResize).observe(domWrapper);
	}

	// Overlay toggle
	setupOverlayEvents();

	// Settings panel
	setupSettingsEvents();
}

/**
 * Set up overlay toggle events
 */
function setupOverlayEvents() {
	let aboutToggle = false;

	document.getElementById('overlay-open').addEventListener('click', () => {
		aboutToggle = !aboutToggle;
		document.documentElement.classList.toggle('is-overlay-active', aboutToggle);
	});

	document.getElementById('overlay-close').addEventListener('click', () => {
		aboutToggle = false;
		document.documentElement.classList.toggle('is-overlay-active', aboutToggle);
	});
}

/**
 * Set up settings panel events
 */
function setupSettingsEvents() {
	document.querySelector('#settings__button').addEventListener('click', () => {
		document.querySelector('#settings').classList.toggle('is-active');
	});

	document.querySelectorAll('#settings__items li').forEach((li) => {
		li.addEventListener('click', () => {
			document.querySelectorAll('#settings__items li').forEach((item) => {
				item.classList.remove('is-active');
			});

			li.classList.add('is-active');

			isNoFix = li.dataset.noFix === '1';
			isFixedWithPadding = li.dataset.fixedWithPadding === '1';
			document.documentElement.classList.toggle('no-fix', isNoFix);
			onResize();

			document.querySelector('#settings').classList.toggle('is-active', false);
		});
	});
	document.querySelectorAll('#settings__items li')[0].click();
}

/**
 * Handle resize events
 */
function onResize() {
	padding = isFixedWithPadding && !isNoFix ? 0.25 : 0;

	viewportWidth = domWrapper.clientWidth;
	viewportHeight = window.innerHeight;

	const canvasHeight = viewportHeight * (1 + padding * 2);

	resolution.set(viewportWidth, canvasHeight);

	renderer.setSize(viewportWidth * dpr, canvasHeight * dpr);
	canvas.style.width = `${viewportWidth}px`;
	canvas.style.height = `${canvasHeight}px`;

	scrollOffset.set(window.scrollX, window.scrollY);

	updateItemPositions();
}

/**
 * Update item positions and dimensions
 */
function updateItemPositions() {
	for (let i = 0; i < itemList.length; i++) {
		const item = itemList[i];
		const rect = item.domContainer.getBoundingClientRect();

		item.width = rect.width;
		item.height = rect.height;
		item.x = rect.left + scrollOffset.x;
		item.y = rect.top + scrollOffset.y;

		item.mesh.material.uniforms.u_domWH.value.set(item.width, item.height);
	}
}

/**
 * Animation loop
 */
function animate() {
	requestAnimationFrame(animate);

	const scrollY = window.scrollY;
	const scrollDelta = scrollY - prevScrollY;

	// Calculate time delta
	const newTime = performance.now() / 1000;
	const dt = newTime - time;
	time = newTime;

	// Update animation strength based on scroll speed
	updateStrength(scrollDelta, dt);

	// Update uniform values
	updateUniforms(dt, scrollY);

	// Position canvas based on scroll
	updateCanvasPosition();

	// Update and optimize mesh visibility
	updateMeshes(dt);

	// Render the scene
	renderer.render(scene, camera);

	prevScrollY = scrollY;
}

/**
 * Update animation strength based on scroll speed
 */
function updateStrength(scrollDelta, dt) {
	const targetStrength = (Math.abs(scrollDelta) * 10) / viewportHeight;

	strength *= Math.exp(-dt * 10);
	strength += Math.min(targetStrength, 5);
}

/**
 * Update uniform values for shaders
 */
function updateUniforms(dt, scrollY) {
	sharedUniforms.u_time.value += dt;
	sharedUniforms.u_strength.value = Math.min(1, strength);
	scrollOffset.set(window.scrollX, scrollY - viewportHeight * padding);
}

/**
 * Update canvas position based on settings
 */
function updateCanvasPosition() {
	if (!isNoFix) {
		canvas.style.transform = `translate(${scrollOffset.x}px, ${scrollOffset.y}px)`;
	} else {
		canvas.style.transform = `translateZ(0)`;
	}
}

/**
 * Update meshes and optimize visibility
 */
function updateMeshes(dt) {
	const canvasTop = scrollOffset.y;
	const canvasBottom = canvasTop + resolution.y;

	for (let i = 0; i < itemList.length; i++) {
		const item = itemList[i];

		// Update position
		item.mesh.material.uniforms.u_domXY.value.set(item.x, item.y);

		// Randomly update random values
		if (Math.random() > Math.exp(-dt * 25 * (1 + strength))) {
			item.mesh.material.uniforms.u_rands.value = new THREE.Vector4(Math.random(), Math.random(), Math.random(), Math.random());
		}

		// Optimize by hiding items that are not visible
		item.mesh.visible = item.y < canvasBottom && item.y + item.height > canvasTop;
	}
}

// wait one frame before initializing to ensure the css properties are set
requestAnimationFrame(init);
