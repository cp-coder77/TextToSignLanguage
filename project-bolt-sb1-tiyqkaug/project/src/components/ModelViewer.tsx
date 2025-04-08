import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useAnimations, useGLTF } from '@react-three/drei';
import { ModelLoader } from './ModelLoader';
import * as THREE from 'three';

interface ModelViewerProps {
  text: string;
  className?: string;
}

const MODEL_URL = 'https://cp-coder77.github.io/TextToSignLanguage/handsy.glb';

function SignModel({ text }: { text: string }) {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState<THREE.AnimationAction | null>(null);

  useEffect(() => {
    // Default to idle animation if no text or matching animation
    let animationToPlay = 'Idle';

    if (text) {
      // Clean and normalize the input text
      const cleanText = text.trim().toLowerCase();
      
      // Map common phrases to their corresponding animations
      const animationMap: Record<string, string> = {
        'hello': 'Hello',
        'hi': 'Hello',
        'nice to meet you': 'Nice_to_meet_you',
        'all': 'All'
      };

      // Find the matching animation
      animationToPlay = animationMap[cleanText] || 'Idle';
    }

    // Stop current animation with fade out
    if (currentAction) {
      currentAction.fadeOut(0.5);
    }

    // Start new animation with fade in
    const nextAction = actions[animationToPlay];
    if (nextAction) {
      nextAction.reset().fadeIn(0.5).play();
      setCurrentAction(nextAction);
    }

    return () => {
      if (currentAction) {
        currentAction.stop();
      }
    };
  }, [text, actions, currentAction]);

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, -1, 0]}
      />
    </group>
  );
}

export function ModelViewer({ text, className = '' }: ModelViewerProps) {
  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[-5, 5, 5]} intensity={0.5} />
        
        {/* Environment and controls */}
        <Environment preset="city" />
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={7}
          enableZoom={false}
          enableRotate={true}
        />
        
        {/* Model with loading fallback */}
        <Suspense fallback={<ModelLoader />}>
          <SignModel text={text} />
        </Suspense>
      </Canvas>

      {/* Status Indicator */}
      {text && (
        <div className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-violet">
            Currently signing: <span className="font-medium">{text}</span>
          </p>
        </div>
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload(MODEL_URL);