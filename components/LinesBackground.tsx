'use client'

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function Lines({ count = 10000, color = "#ffffff", speed = 0.1, size = 0.05, spread = 100 }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }
    return pos
  }, [count, spread])

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    points.current.rotation.x = Math.sin(t / 4)
    points.current.rotation.y = Math.sin(t / 3)
    points.current.rotation.z = Math.sin(t / 2)
    points.current.position.y = Math.sin(t / 1.5) * 2
    points.current.position.x = Math.cos(t / 2) * 2
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={size} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

export function LinesBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <color attach="background" args={["#000"]} />
        <Lines color="#4B0082" speed={0.05} size={0.05} count={15000} spread={150} />
        <Lines color="#8A2BE2" speed={0.1} size={0.04} count={15000} spread={120} />
        <Lines color="#9400D3" speed={0.07} size={0.06} count={10000} spread={180} />
      </Canvas>
    </div>
  )
}

export default LinesBackground;

