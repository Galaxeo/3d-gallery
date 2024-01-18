import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
// Want to create a floating particle background that reacts to mouse movement
function Dot({ x, y, z }) {
  const { viewport, camera, pointer } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
  const ref = useRef();
  useFrame(() => {
    ref.current.position.set(x * height + pointer.x, y * height + pointer.y, z);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02]} />
      <meshBasicMaterial color="grey" />
    </mesh>
  );
}
function Effect({ count = 1024 }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);
  const particles = [];
  const gridSize = Math.sqrt(count);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      particles.push(
        <Dot
          key={`${i}-${j}`}
          x={(i / gridSize) * 2 - 1}
          y={(j / gridSize) * 2 - 1}
          z={0}
        />
      );
    }
  }
  return (
    <>
      <color attach="background" args={["#d4d7db"]} />
      {particles}
      <EffectComposer>
        <DepthOfField
          target={[0, 0, 90]}
          focalLength={0.2}
          bokehScale={5}
          height={700}
        ></DepthOfField>
      </EffectComposer>
    </>
  );
}

function Background() {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 10, fov: 60 }}>
        <Effect></Effect>
      </Canvas>
    </>
  );
}

export default Background;
