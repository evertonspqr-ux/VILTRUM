'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function VirusCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.3;
      wireRef.current.rotation.y -= delta * 0.4;
      
      // Efeito de pulsação (como se estivesse respirando/sofrendo mutação)
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
      wireRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Núcleo orgânico sofrendo mutação (MeshDistortMaterial) */}
      <Icosahedron ref={meshRef} args={[1, 4]}>
        <MeshDistortMaterial 
          color="#1A4A22" 
          emissive="#63FF6A"
          emissiveIntensity={0.2}
          distort={0.4} 
          speed={3} 
          roughness={0.2}
        />
      </Icosahedron>
      
      {/* Estrutura externa (espinhos) no estilo wireframe */}
      <Icosahedron ref={wireRef} args={[1.2, 2]}>
        <meshBasicMaterial 
          color="#63FF6A" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </Icosahedron>
    </group>
  );
}

export default function ScourgeVirus3D() {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 2]} intensity={2} color="#63FF6A" />
        <directionalLight position={[-2, -2, -2]} intensity={1} color="#ffffff" />
        <VirusCore />
      </Canvas>
    </div>
  );
}
