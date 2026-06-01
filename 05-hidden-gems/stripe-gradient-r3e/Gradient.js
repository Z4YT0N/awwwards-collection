import * as THREE from 'three';
import fragmentShader from './shader/fragment.glsl';
import vertexShader from './shader/vertex.glsl';

export default class Gradient {
  constructor(options) {
    this.container = options.dom;
    this.computedCanvasStyle = getComputedStyle(this.container);
    this.isStatic = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.cssVarRetries = 0;
    this.maxCssVarRetries = 200;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight; //600;
    this.conf = {
      wireframe: false,
      isPlaying: true,
      density: [1, 1],
      darkenTop: false,
      activeColors: [1, 1, 1, 1],
      noiseFreq: [0.00014, 0.00029],
      angle: 0,
      amp: 320,
      seed: 5
    };
    this.xSegCount = Math.ceil(this.width * this.conf.density[0]);
    this.ySegCount = Math.ceil(this.height * this.conf.density[1]);
    this.t = 1253106;
    this.last = 0;
    this.frame = 0;
    this.scene = void 0;
    this.renderer = void 0;
    this.camera = void 0;
    this.uniforms = void 0;
    this.waitForCssVars();
  }

  waitForCssVars() {
    if (this.computedCanvasStyle && -1 !== this.computedCanvasStyle.getPropertyValue('--gradientColorOne').indexOf('#')) {
      this.init();
      this.container.classList.add('isLoaded');
    } else {
      if (((this.cssVarRetries += 1), this.cssVarRetries > this.maxCssVarRetries)) return (this.sectionColors = [16711680, 16711680, 16711935, 65280, 255]), void this.init();
      this.waitForCssVars();
    }
  }

  init() {
    this.initGradientColors();
    this.initScene();
    this.initMesh();
    this.resize();
    this.animate();
    window.addEventListener('resize', this.resize.bind(this));
  }

  initGradientColors(canvas) {
    this.sectionColors = ['--gradientColorZero', '--gradientColorOne', '--gradientColorTwo', '--gradientColorThree']
      .map((color) => {
        let hex = this.computedCanvasStyle.getPropertyValue(color).trim();
        if (4 === hex.length) {
          const hexTemp = hex
            .substr(1)
            .split('')
            .map((hexTemp) => hexTemp + hexTemp)
            .join('');
          hex = hexTemp;
        }
        return hex;
      })
      .filter(Boolean)
      .map((color) => new THREE.Color(color));
  }

  initScene() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0, 0, 0, 0);
    this.renderer.clearDepth = 1;

    this.camera = new THREE.OrthographicCamera(this.width / 2, this.width / -2, this.height / 2, this.height / -2, -2000, 2000);
    this.camera.zoom = 1;
    this.scene = new THREE.Scene();
  }

  initMaterial() {
    this.uniforms = {
      resolution: { value: [this.width, this.height] },
      u_time: { value: 0 },
      u_shadow_power: { value: this.width < 600 ? 5 : 6 },
      u_darken_top: { value: '' === this.conf.darkenTop ? 1 : 0 },
      u_active_colors: { value: this.conf.activeColors },
      u_global: {
        value: {
          noiseFreq: this.conf.noiseFreq,
          noiseSpeed: 5e-6
        }
      },
      u_vertDeform: {
        value: {
          incline: Math.sin(this.conf.angle) / Math.cos(this.conf.angle),
          offsetTop: -0.5,
          offsetBottom: -0.5,
          noiseFreq: [3, 4],
          noiseAmp: this.conf.amp,
          noiseSpeed: 10,
          noiseFlow: 3,
          noiseSeed: this.conf.seed
        }
      },
      u_baseColor: {
        value: this.sectionColors[0]
      },
      u_waveLayers: {
        value: []
      }
    };
    for (let i = 1; i < this.sectionColors.length; i += 1) {
      this.uniforms.u_waveLayers.value.push({
        color: this.sectionColors[i],
        noiseFreq: new THREE.Vector2(2 + i / this.sectionColors.length, 3 + i / this.sectionColors.length),
        noiseSpeed: 11 + 0.3 * i,
        noiseFlow: 6.5 + 0.3 * i,
        noiseSeed: this.conf.seed + 10 * i,
        noiseFloor: 0.1,
        noiseCeil: 0.63 + 0.07 * i
      });
    }
  }

  initMesh() {
    this.initMaterial();
    this.material = new THREE.ShaderMaterial({
      extensions: { derivatives: '#extension GL_OES_standard_derivatives : enable' },
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      wireframe: this.conf.wireframe,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, this.xSegCount, this.ySegCount);
    this.geometry.rotateX(Math.PI / 2);
    this.uvNorm = new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2);
    this.geometry.setAttribute('uvNorm', this.uvNorm);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.xSegCount = Math.ceil(this.width * this.conf.density[0]);
    this.ySegCount = Math.ceil(this.height * this.conf.density[1]);
    this.mesh.geometry.parameters = {
      width: this.width,
      height: this.height,
      widthSegments: this.xSegCount,
      heightSegments: this.ySegCount
    };
    for (let e = 0; e <= this.ySegCount; e++) {
      for (let t = 0; t <= this.xSegCount; t++) {
        const i = e * (this.xSegCount + 1) + t;
        this.uvNorm.array[2 * i] = (t / this.xSegCount) * 2 - 1;
        this.uvNorm.array[2 * i + 1] = 1 - (e / this.ySegCount) * 2;
      }
    }
    this.mesh.material.uniforms.resolution.value = [this.width, this.height];
    this.mesh.material.uniforms.u_shadow_power.value = this.width < 600 ? 5 : 6;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  shouldSkipFrame() {
    return !!window.document.hidden || !this.conf.isPlaying || this.frame % 2 == 0 || void 0;
  }

  stop() {
    this.conf.isPlaying = false;
  }

  play() {
    if (!this.conf.isPlaying) {
      this.conf.isPlaying = true;
    }
  }

  animate(e) {
    if (!this.shouldSkipFrame()) {
      this.t += Math.min(e - this.last, 1e3 / 15);
      this.last = e;
      this.mesh.material.uniforms.u_time.value = this.t;
      this.renderer.render(this.scene, this.camera);
    }
    if (0 !== this.last && this.isStatic) {
      return this.renderer.render(this.scene, this.camera);
    }
    this.frame += 1;
    if (this.conf.isPlaying && requestAnimationFrame(this.animate.bind(this)));
  }
}

new Gradient({
  dom: document.querySelector(`[data-js-controller~=Gradient]`)
});
