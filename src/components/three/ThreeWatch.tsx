import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeWatchProps {
  accentColor: string;
}

const WatchModel: React.FC<{ color: string }> = ({ color }) => {
  const handsRef = useRef<{ hour: THREE.Group, minute: THREE.Group, second: THREE.Group }>(null);

  useFrame(() => {
    if (handsRef.current) {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      handsRef.current.second.rotation.z = -THREE.MathUtils.degToRad(seconds * 6);
      handsRef.current.minute.rotation.z = -THREE.MathUtils.degToRad(minutes * 6 + seconds * 0.1);
      handsRef.current.hour.rotation.z = -THREE.MathUtils.degToRad(hours * 30 + minutes * 0.5);
    }
  });

  return (
    <group dispose={null}>
      {/* Case */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 0.5, 64]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Bezel (Fluted) */}
      <mesh position={[0, 0.26, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#E6C879" metalness={1} roughness={0.1} />
      </mesh>

      {/* Dial */}
      <mesh position={[0, 0.25, 0]}>
        <circleGeometry args={[1.9, 64]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Dial Markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI / 6) * 1.6, 
          0.26, 
          Math.cos(i * Math.PI / 6) * 1.6
        ]} rotation={[0, 0, i * Math.PI / 6]}>
          <boxGeometry args={[0.1, 0.02, 0.3]} />
          <meshStandardMaterial color="#C9A24B" metalness={1} />
        </mesh>
      ))}

      {/* Hands */}
      <group ref={handsRef as any}>
        {/* Hour Hand */}
        <group name="hour">
          <mesh position={[0, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#F4EDE0" />
          </mesh>
        </group>
        {/* Minute Hand */}
        <group name="minute">
          <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
            <meshStandardMaterial color="#F4EDE0" />
          </mesh>
        </group>
        {/* Second Hand */}
        <group name="second">
          <mesh position={[0, 0.29, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.7, 8]} />
            <meshStandardMaterial color="#B3263E" />
          </mesh>
        </group>
      </group>

      {/* Glass (Sapphire Crystal) */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 64]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          transmission={1} 
          roughness={0} 
          thickness={0.1} 
          envMapIntensity={1}
        />
      </mesh>

      {/* Strap (Upper) */}
      <mesh position={[0, 0, 2.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.3, 4]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.8} />
      </mesh>
      {/* Strap (Lower) */}
      <mesh position={[0, 0, -2.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.3, 4]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const ThreeWatch: React.FC<ThreeWatchProps> = ({ accentColor }) => {
  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing">
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enablePan={false} 
        minDistance={5} 
        maxDistance={12} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C9A24B" />
      
      <Environment preset="studio" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <WatchModel color={accentColor} />
      </Float>

      <ContactShadows 
        position={[0, -3, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4.5} 
      />
    </div>
  );
};
