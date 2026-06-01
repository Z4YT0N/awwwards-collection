import { onMount, onCleanup } from 'solid-js'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DimensionalGlassBackground(props) {
  let containerRef
  let renderer, scene, camera
  let glassPanels = []
  let particles
  let animationId
  let time = 0
  
  const noise3D = createNoise3D()
  
  onMount(() => {
    initScene()
    createGlassPanels()
    createFloatingParticles()
    setupScrollAnimations()
    animate()
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    onCleanup(() => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    })
  })
  
  function initScene() {
    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0f0f23, 0.015)
    
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30
    
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.appendChild(renderer.domElement)
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060, 0.4)
    scene.add(ambientLight)
    
    // Prismatic point lights
    const colors = [0x8B5CF6, 0x3B82F6, 0x06B6D4, 0x10B981, 0xF59E0B]
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 2, 50)
      const angle = (i / colors.length) * Math.PI * 2
      light.position.set(
        Math.cos(angle) * 20,
        Math.sin(angle) * 15,
        10
      )
      scene.add(light)
    })
  }
  
  function createGlassPanels() {
    const panelCount = 8
    
    // Custom glass shader material
    const glassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      uniform float uTime;
      uniform float uDistortion;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        
        vec4 mvPosition = viewMatrix * worldPosition;
        vViewPosition = -mvPosition.xyz;
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `
    
    const glassFragmentShader = `
      uniform float uTime;
      uniform float uOpacity;
      uniform vec3 uColor;
      uniform float uFresnelPower;
      uniform float uPrismStrength;
      
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      void main() {
        vec3 viewDir = normalize(vViewPosition);
        
        // Fresnel effect for glass edges
        float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);
        
        // Prismatic color shift based on view angle
        float prismOffset = dot(vNormal, viewDir) * uPrismStrength;
        vec3 prismColor = vec3(
          sin(prismOffset * 3.14159 + uTime) * 0.5 + 0.5,
          sin(prismOffset * 3.14159 + uTime + 2.094) * 0.5 + 0.5,
          sin(prismOffset * 3.14159 + uTime + 4.189) * 0.5 + 0.5
        );
        
        // Combine base color with prismatic effect
        vec3 finalColor = mix(uColor, prismColor, fresnel * 0.6);
        
        // Add edge glow
        float edgeGlow = fresnel * 0.8;
        finalColor += prismColor * edgeGlow;
        
        // Glass-like transparency
        float alpha = uOpacity + fresnel * 0.4;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
    
    for (let i = 0; i < panelCount; i++) {
      // Random panel shapes
      const shapeType = Math.floor(Math.random() * 3)
      let geometry
      
      switch (shapeType) {
        case 0: // Hexagon
          geometry = new THREE.CylinderGeometry(3, 3, 0.2, 6)
          break
        case 1: // Diamond
          geometry = new THREE.OctahedronGeometry(2.5, 0)
          break
        case 2: // Rectangle
        default:
          geometry = new THREE.BoxGeometry(4, 5, 0.15)
      }
      
      const material = new THREE.ShaderMaterial({
        vertexShader: glassVertexShader,
        fragmentShader: glassFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.15 + Math.random() * 0.1 },
          uColor: { value: new THREE.Color().setHSL(Math.random(), 0.6, 0.5) },
          uFresnelPower: { value: 2 + Math.random() * 2 },
          uPrismStrength: { value: 2 + Math.random() * 3 },
          uDistortion: { value: 0 }
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
      
      const panel = new THREE.Mesh(geometry, material)
      
      // Distribute panels in 3D space
      const radius = 15 + Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      panel.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) - 10,
        radius * Math.cos(phi) - 20
      )
      
      panel.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      panel.userData = {
        originalPosition: panel.position.clone(),
        originalRotation: panel.rotation.clone(),
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatAmplitude: 0.5 + Math.random() * 1,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      }
      
      scene.add(panel)
      glassPanels.push(panel)
    }
  }
  
  function createFloatingParticles() {
    const particleCount = 500
    const geometry = new THREE.BufferGeometry()
    
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)
    
    const colorPalette = [
      new THREE.Color(0x8B5CF6),
      new THREE.Color(0x3B82F6),
      new THREE.Color(0x06B6D4),
      new THREE.Color(0x10B981),
      new THREE.Color(0xF59E0B)
    ]
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 60 - 20
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      sizes[i] = Math.random() * 3 + 1
      
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.userData.velocities = velocities
    
    const particleVertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `
    
    const particleFragmentShader = `
      varying vec3 vColor;
      
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.6);
      }
    `
    
    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    
    particles = new THREE.Points(geometry, material)
    scene.add(particles)
  }
  
  function setupScrollAnimations() {
    // Scroll-based camera movement
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress
        
        // Rotate camera based on scroll
        camera.position.y = -progress * 30
        camera.position.z = 30 - progress * 15
        camera.lookAt(0, camera.position.y + 5, 0)
        
        // Update glass panel positions
        glassPanels.forEach((panel, i) => {
          const offset = progress * Math.PI * 2
          panel.rotation.y = panel.userData.originalRotation.y + offset * 0.2
        })
      }
    })
  }
  
  function animate() {
    animationId = requestAnimationFrame(animate)
    time += 0.01
    
    const mouse = props.mousePosition()
    
    // Update glass panels
    glassPanels.forEach((panel, i) => {
      // Floating motion
      const floatY = Math.sin(time * panel.userData.floatSpeed + i) * panel.userData.floatAmplitude
      const floatX = Math.cos(time * panel.userData.floatSpeed * 0.7 + i) * panel.userData.floatAmplitude * 0.5
      
      panel.position.y = panel.userData.originalPosition.y + floatY
      panel.position.x = panel.userData.originalPosition.x + floatX
      
      // Subtle rotation
      panel.rotation.x += panel.userData.rotationSpeed.x
      panel.rotation.y += panel.userData.rotationSpeed.y
      panel.rotation.z += panel.userData.rotationSpeed.z
      
      // Mouse interaction
      const mouseInfluence = 5
      panel.position.x += mouse.x * mouseInfluence * (1 / (i + 1))
      panel.position.y += mouse.y * mouseInfluence * (1 / (i + 1))
      
      // Update shader time
      if (panel.material.uniforms) {
        panel.material.uniforms.uTime.value = time
      }
    })
    
    // Update particles
    if (particles) {
      const positions = particles.geometry.attributes.position.array
      const velocities = particles.geometry.userData.velocities
      
      for (let i = 0; i < positions.length; i += 3) {
        // Add noise-based movement
        const noiseX = noise3D(positions[i] * 0.01, time * 0.5, 0) * 0.02
        const noiseY = noise3D(0, positions[i + 1] * 0.01, time * 0.5) * 0.02
        const noiseZ = noise3D(time * 0.5, 0, positions[i + 2] * 0.01) * 0.02
        
        positions[i] += velocities[i] + noiseX + mouse.x * 0.01
        positions[i + 1] += velocities[i + 1] + noiseY + mouse.y * 0.01
        positions[i + 2] += velocities[i + 2] + noiseZ
        
        // Wrap around boundaries
        if (positions[i] > 50) positions[i] = -50
        if (positions[i] < -50) positions[i] = 50
        if (positions[i + 1] > 50) positions[i + 1] = -50
        if (positions[i + 1] < -50) positions[i + 1] = 50
        if (positions[i + 2] > 20) positions[i + 2] = -60
        if (positions[i + 2] < -60) positions[i + 2] = 20
      }
      
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y = time * 0.02
    }
    
    renderer.render(scene, camera)
  }
  
  return (
    <div
      ref={containerRef}
      class="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #0f0f23 100%)' }}
    />
  )
}
