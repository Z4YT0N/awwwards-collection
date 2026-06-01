'use client'

import type { ThreeEvent } from '@react-three/fiber'
import { Skateboard } from '@/components/Skateboard'
import { ContactShadows, Environment, Html } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Hotspot } from './Hotspot'
import { WavyPaths } from './WavyPaths'

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const

interface Props {
  deckTextureURL: string
  wheelTextureURL: string
  truckColor: string
  boltColor: string
}

export function InteractiveSkateboard(props: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}
      >
        <Suspense>
          <Scene {...props} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene({ deckTextureURL, wheelTextureURL, truckColor, boltColor }: Props) {
  const containerRef = useRef<THREE.Group>(null)
  const originRef = useRef<THREE.Group>(null)

  // 记录动画是否正在执行，用于在动画执行时隐藏滑板上的(辅助)热点
  const [animating, setAnimating] = useState(false)
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  })

  const { camera } = useThree()

  useEffect(() => {
    if (!containerRef.current || !originRef.current)
      return

    gsap.to(containerRef.current.position, {
      x: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(originRef.current.rotation, {
      y: Math.PI / 64,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  // 动画执行完成后需可反复执行
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0))

    setZoom()

    window.addEventListener('resize', setZoom)

    // 页面尺寸变化调整可操控区域位置
    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1)

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale
    }

    return () => window.removeEventListener('resize', setZoom)
  }, [camera])

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()

    const board = containerRef.current
    const origin = originRef.current

    if (!board || !origin || animating)
      return
    const { name } = event.object

    setShowHotspot(current => ({ ...current, [name]: false }))

    if (name === 'back') {
      ollie(board)
    }
    else if (name === 'middle') {
      kickflip(board)
    }
    else if (name === 'front') {
      frontside360(board, origin)
    }
  }

  function ollie(board: THREE.Group) {
    jumpBoard(board)

    gsap
      .timeline()
      .to(board.rotation, { x: -0.6, duration: 0.26, ease: 'none' })
      .to(board.rotation, { x: 0.4, duration: 0.82, ease: 'power2.in' })
      .to(board.rotation, { x: 0, duration: 0.12, ease: 'none' })
  }

  function kickflip(board: THREE.Group) {
    jumpBoard(board)

    gsap
      .timeline()
      .to(board.rotation, { x: -0.6, duration: 0.26, ease: 'none' })
      .to(board.rotation, { x: 0.4, duration: 0.82, ease: 'power2.in' })
      .to(
        board.rotation,
        { z: `+=${Math.PI * 2}`, duration: 0.78, ease: 'none' },
        // See: https://gsap.com/resources/position-parameter/#multiple-behaviors
        0.3,
      )
      .to(board.rotation, { x: 0, duration: 0.12, ease: 'none' })
  }

  function frontside360(board: THREE.Group, origin: THREE.Group) {
    jumpBoard(board)

    gsap
      .timeline()
      .to(board.rotation, { x: -0.6, duration: 0.26, ease: 'none' })
      .to(board.rotation, { x: 0.4, duration: 0.82, ease: 'power2.in' })
      .to(
        origin.rotation,
        { y: `+=${Math.PI * 2}`, duration: 0.77, ease: 'none' },
        0.3,
      )
      .to(board.rotation, { x: 0, duration: 0.14, ease: 'none' })
  }

  /** 模拟滑板跳到一定高度时自然落下效果 */
  function jumpBoard(board: THREE.Group) {
    setAnimating(true)

    gsap
      .timeline({ onComplete: () => setAnimating(false) })
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: 'power2.out',
        delay: 0.26,
      })
      .to(board.position, { y: 0, duration: 0.43, ease: 'power2.in' })
  }

  return (
    <group>
      <Environment files="/hdr/warehouse-256.hdr" />
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.25, 0, -0.635]}>
          {/* 通常会添加 group 再设置动画，因为它们都有自己的定位相关设置 */}
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              wheelTextureURLs={[wheelTextureURL]}
              wheelTextureURL={wheelTextureURL}
              deckTextureURLs={[deckTextureURL]}
              deckTextureURL={deckTextureURL}
              truckColor={truckColor}
              boltColor={boltColor}
              constantWheelSpin
            />

            <Hotspot
              isVisible={!animating && showHotspot.front}
              position={[0, 0.38, 1]}
              color="#B8FC39"
            />

            {/* 控制器，用于移动操作 */}
            <mesh position={[0, 0.27, 0.9]} name="front" onClick={onClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.middle}
              position={[0, 0.33, 0]}
              color="#FF7A51"
            />
            <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.back}
              position={[0, 0.35, -0.9]}
              color="#46ACFA"
            />
            <mesh position={[0, 0.27, -0.9]} name="back" onClick={onClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        {/* See: https://drei.docs.pmnd.rs/misc/html#html */}
        <Html
          wrapperClass="pointer-events-none"
          transform
          // MARK: 防止两侧线条动画遮住滑板
          zIndexRange={[1, 0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group>
    </group>
  )
}
