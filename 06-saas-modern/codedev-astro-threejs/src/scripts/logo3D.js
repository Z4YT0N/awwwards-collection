import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

document.addEventListener('astro:page-load', () => {
	const scene = new THREE.Scene();
	const container = document.getElementById('logo3d');

	const aspectRatio = container.clientWidth / container.clientHeight;
	const frustumSize = 10;

	const camera = new THREE.OrthographicCamera(
		(frustumSize * aspectRatio) / -2,
		(frustumSize * aspectRatio) / 2,
		frustumSize / 2,
		frustumSize / -2,
		0.1,
		1000
	);

	camera.position.set(0, 0, 7);
	camera.lookAt(0, 0, 0);

	window.addEventListener('resize', () => {
		const newAspectRatio = container.clientWidth / container.clientHeight;
		camera.left = (frustumSize * newAspectRatio) / -2;
		camera.right = (frustumSize * newAspectRatio) / 2;
		camera.top = frustumSize / 2;
		camera.bottom = frustumSize / -2;
		camera.updateProjectionMatrix();

		renderer.setSize(container.clientWidth, container.clientHeight);
	});

	let logo;

	const loader = new GLTFLoader();
	loader.load(
		'/logo.glb',
		(gltf) => {
			logo = gltf.scene;

			const metalMaterial = new THREE.MeshStandardMaterial({
				color: 0x4f46e5,
				metalness: 0.4,
				roughness: 0.5,
			});

			logo.traverse((child) => {
				if (child.isMesh) {
					child.material = metalMaterial;
				}
			});

			logo.scale.set(4, 4, 4);
			scene.add(logo);
		},
		(xhr) => {
			// console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			document.querySelector('#logo-loader')?.remove();
		},
		(err) => console.error('An error happened')
	);

	const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.setSize(container.clientWidth - 20, container.clientHeight);
	document.querySelector('#logo3d').appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = false;
	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI / 2;

	const ambientLight = new THREE.AmbientLight(0xffffff, 4);
	scene.add(ambientLight);

	const pointLight = new THREE.PointLight(0xffffff, 10, 70);
	pointLight.position.set(5, 5, 0);
	scene.add(pointLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
	directionalLight.position.set(0, 7, 9);
	scene.add(directionalLight);

	const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
	directionalLight2.position.set(0, 7, -9);
	scene.add(directionalLight2);

	function animate () {
		renderer.render(scene, camera);
		if (logo) logo.rotation.y += 0.01;
		controls.update();
	}
	renderer.setAnimationLoop(animate);
});
