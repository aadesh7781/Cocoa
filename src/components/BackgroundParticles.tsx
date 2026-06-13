'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

function ParticleDrifter({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles across coordinate space
      pos[i * 3] = (Math.random() - 0.5) * 8;       // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;   // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;   // Z
      
      // Slow drift speeds
      spd[i] = 0.08 + Math.random() * 0.12;
    }
    return [pos, spd];
  }, [count]);

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || prefersReducedMotion.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Drift upwards
      posArr[i * 3 + 1] += speeds[i] * delta * 0.5;

      // Reset when particle goes above screen
      if (posArr[i * 3 + 1] > 3) {
        posArr[i * 3 + 1] = -3;
        posArr[i * 3] = (Math.random() - 0.5) * 8;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  // Soft circular canvas texture
  const dotTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 248, 240, 0.8)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#C69C6D" // gold
        transparent
        opacity={0.2}
        depthWrite={false}
        map={dotTexture}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BackgroundParticles() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-30 mix-blend-screen opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.5} />
        <ParticleDrifter count={isMobile ? 8 : 20} />
      </Canvas>
    </div>
  );
}
