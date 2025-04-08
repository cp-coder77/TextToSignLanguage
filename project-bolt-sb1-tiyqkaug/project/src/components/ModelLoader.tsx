import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export function ModelLoader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-purple-600 font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}