import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Group } from 'three';
import { cn } from '@/lib/utils';

interface Model3DViewerProps {
  modelPath: string;
  className?: string;
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-muted-foreground">Loading 3D model...</div>
    </div>
  );
}

export const Model3DViewer = ({ modelPath, className }: Model3DViewerProps) => {
  return (
    <div className={cn("w-full h-full relative", className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="rounded-lg"
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model modelPath={modelPath} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingFallback />}>
        <div />
      </Suspense>
    </div>
  );
};

// Preload models
useGLTF.preload('/uploads/Vellvii-G-Vibe.glb');
useGLTF.preload('/uploads/Vellvii-Pulse.glb');