import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./App.css";

function Resume() {
  const { pointer } = useThree();
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[3, 6]} />
        <meshBasicMaterial transparent opacity={0.85} color="#625d52" />
      </mesh>
    </>
  );
}

export default Resume;
