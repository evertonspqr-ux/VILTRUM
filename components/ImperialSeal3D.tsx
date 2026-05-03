'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SealGeometry() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const spokesRef = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.z -= delta * 0.22;
      outerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.38;
      innerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.12;
    }
    if (spokesRef.current) {
      spokesRef.current.rotation.z += delta * 0.12;
    }
    if (coreRef.current && coreMat.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.045;
      coreRef.current.scale.setScalar(pulse);
      coreMat.current.emissiveIntensity = 0.55 + Math.sin(state.clock.elapsedTime * 2.2) * 0.35;
    }
  });

  const tickAngles = Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2);
  const spokeAngles = [0, 60, 120, 180, 240, 300].map((d) => (d * Math.PI) / 180);

  return (
    <group>
      {/* Outer ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[2.2, 0.065, 16, 128]} />
        <meshStandardMaterial color="#B00000" emissive="#B00000" emissiveIntensity={0.65} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Tick marks on outer ring */}
      {tickAngles.map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[i % 6 === 0 ? 0.14 : 0.07, 0.022, 0.022]} />
          <meshStandardMaterial
            color={i % 6 === 0 ? '#F5F5F5' : '#B00000'}
            emissive={i % 6 === 0 ? '#F5F5F5' : '#B00000'}
            emissiveIntensity={i % 6 === 0 ? 0.5 : 0.3}
            metalness={0.9} roughness={0.1}
          />
        </mesh>
      ))}

      {/* Inner ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.4, 0.04, 12, 96]} />
        <meshStandardMaterial color="#B8BEC8" emissive="#AAB8CF" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Spokes */}
      <group ref={spokesRef}>
        {spokeAngles.map((rad, i) => (
          <mesh key={i} rotation={[0, 0, rad]}>
            <boxGeometry args={[1.7, 0.028, 0.028]} />
            <meshStandardMaterial color="#B8BEC8" emissive="#B00000" emissiveIntensity={0.25} metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Core disc */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.46, 0.46, 0.13, 32]} />
        <meshStandardMaterial ref={coreMat} color="#050505" emissive="#B00000" emissiveIntensity={0.55} metalness={0.98} roughness={0.02} />
      </mesh>
    </group>
  );
}

export default function ImperialSeal3D() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 38 }}>
        <ambientLight intensity={0.04} />
        <pointLight position={[0, 0, 4]} intensity={4} color="#B00000" distance={12} decay={2} />
        <directionalLight position={[5, 4, 3]} intensity={2} color="#AAB8CF" />
        <directionalLight position={[-4, -3, 2]} intensity={1} color="#B00000" />
        <SealGeometry />
      </Canvas>
    </div>
  );
}
