import { OrthographicCamera, useGLTF, useTexture } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Create a custom gradient material
const GradientMaterial = ({
  colors = ['#4F46E5', '#7C3AED', '#EC4899'],
  intensity = 1,
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    // Create gradient
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );

    // Add color stops
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);

    // Fill with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [colors]);

  return (
    <meshStandardMaterial
      map={texture}
      metalness={0.2}
      roughness={0.7}
      emissive="#000000"
      emissiveIntensity={0.1}
      transparent
      opacity={0.9}
    />
  );
};

export function Planet(props) {
  const { nodes } = useGLTF('/models/cubic.glb');

  // Define different color schemes for each face
  const colorSchemes = useMemo(
    () => [
      ['#4F46E5', '#7C3AED', '#EC4899'], // Front
      ['#3B82F6', '#8B5CF6', '#EC4899'], // Right
      ['#10B981', '#3B82F6', '#8B5CF6'], // Left
      ['#EC4899', '#F59E0B', '#10B981'], // Top
      ['#F59E0B', '#EC4899', '#8B5CF6'], // Bottom
      ['#8B5CF6', '#3B82F6', '#4F46E5'], // Back
    ],
    []
  );

  return (
    <group {...props} dispose={null}>
      <group scale={0.009}>
        <group rotation={[0.768, Math.PI / 4, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            position={[609.312, 0, 0]}
            rotation={[0, 0.323, 0]}
          >
            <GradientMaterial colors={colorSchemes[0]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_4.geometry}
            position={[0, -609.312, 0]}
            rotation={[-0.323, 0, 0]}
          >
            <GradientMaterial colors={colorSchemes[1]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_3.geometry}
            position={[0, 609.312, 0]}
            rotation={[0.323, 0, 0]}
          >
            <GradientMaterial colors={colorSchemes[2]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_6.geometry}
            position={[0, 0, -609.312]}
            rotation={[0, 0, 0.323]}
          >
            <GradientMaterial colors={colorSchemes[3]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_5.geometry}
            position={[0, 0, 609.312]}
            rotation={[0, 0, -0.323]}
          >
            <GradientMaterial colors={colorSchemes[4]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            position={[-609.312, 0, 0]}
            rotation={[0, 0.323, 0]}
          >
            <GradientMaterial colors={colorSchemes[5]} />
          </mesh>
        </group>
        <directionalLight
          intensity={1.2}
          decay={2}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <OrthographicCamera
          makeDefault={false}
          far={100000}
          near={0}
          position={[0, 0, 5]}
          rotation={[0, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/cubic.glb');
