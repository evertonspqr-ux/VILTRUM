'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, MeshDistortMaterial, Environment, Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

function CorePlanet() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#080D12"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.8}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.1, 32, 32]} scale={2.5}>
        <meshBasicMaterial
          color="#1F2933"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

function EmblemShape() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer brutalist ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.2, 16, 64]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Segmented cuts */}
      {[0, 1, 2].map((i) => (
        <Box 
          key={i} 
          args={[0.8, 4, 0.8]} 
          position={[
            Math.cos((i * Math.PI * 2) / 3) * 2, 
            0, 
            Math.sin((i * Math.PI * 2) / 3) * 2
          ]}
          rotation={[0, -(i * Math.PI * 2) / 3, 0]}
        >
          <meshStandardMaterial color="#38BDF8" roughness={0.1} metalness={1} emissive="#38BDF8" emissiveIntensity={0.2} />
        </Box>
      ))}

      {/* Inner sharp crystals */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={`inner-${i}`} 
          rotation={[
            0, 
            (i * Math.PI * 2) / 3 + Math.PI / 6, 
            Math.PI / 4
          ]}
        >
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#1F2933" roughness={0.5} metalness={0.9} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function GridLines() {
  return (
    <gridHelper args={[30, 30, '#1F2933', '#1F2933']} position={[0, -5, 0]} rotation={[0, 0, 0]} />
  );
}

export default function ImperialEmblem3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-background/50">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#38BDF8" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#9BE564" distance={10} />
        
        <EmblemShape />
        <CorePlanet />
        <GridLines />
        
        <Environment preset="night" />
        <Preload all />
      </Canvas>
    </div>
  );
}
