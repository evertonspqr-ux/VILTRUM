'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Rotação sutil da malha principal
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Esfera central com wireframe */}
      <Sphere ref={meshRef} args={[1.4, 24, 24]}>
        <meshBasicMaterial 
          color="#63FF6A" // scourge-green
          wireframe={true} 
          transparent={true} 
          opacity={0.6} 
        />
      </Sphere>
      
      {/* Camada externa fantasma para dar um brilho extra */}
      <Sphere args={[1.45, 32, 32]}>
        <meshBasicMaterial 
          color="#63FF6A" 
          transparent={true} 
          opacity={0.05} 
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

export default function HologramGlobe() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <Globe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={2.0}
        />
      </Canvas>
      {/* Efeito de Scanline sobre o holograma */}
      <div className="absolute inset-0 pointer-events-none rounded-full" 
           style={{
             background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 50%)',
             backgroundSize: '100% 4px',
             mixBlendMode: 'overlay',
           }}
      />
    </div>
  );
}
