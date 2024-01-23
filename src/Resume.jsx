import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./App.css";
import { useSpring, a } from "@react-spring/three";

function Resume({ setActive, setComponent }) {
  const { pointer } = useThree();
  const ref = useRef();
  const { scale } = useSpring({ scale: 1, from: { scale: 0 } });

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
    }
  });

  return (
    <>
      <a.mesh scale={scale.to((s) => [s, s, s])} ref={ref}>
        <planeGeometry args={[6.4, 8.8]} />
        <meshBasicMaterial transparent opacity={0.85} color="#625d52" />
      </a.mesh>
    </>
  );
}

export default Resume;
