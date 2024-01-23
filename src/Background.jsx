import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
// Want to create a floating particle background that reacts to mouse movement
function Dot({ x, y, z }) {
  const { viewport, pointer } = useThree();
  const [width, setWidth] = useState(viewport.width);
  const ref = useRef();
  useFrame(() => {
    ref.current.position.set(x * width - pointer.x, y * width - pointer.y, z);
  });
  useEffect(() => {
    const handleResize = () => {
      setWidth(viewport.width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport.width]);
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02]} />
      <meshBasicMaterial color="grey" />
    </mesh>
  );
}
export function getPointerPos(e) {
  return { x: e.clientX, y: e.clientY };
}
function Background({ count = 1024 }) {
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
          target={[0, 0, 1]}
          focalLength={0.2}
          bokehScale={2}
          height={700}
        ></DepthOfField>
      </EffectComposer>
    </>
  );
}

export default Background;
