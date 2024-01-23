import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "wouter";

import "./App.css";
function HoverWord({ str, position, fontSize, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  const wordRef = useRef();
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  useFrame(() => {
    wordRef.current.material.color.set(hovered ? "white" : color);
  });
  return (
    <Text
      anchorX="left"
      ref={wordRef}
      onPointerOver={over}
      onPointerOut={out}
      position={position}
      color={color}
      font="/RodinM.woff"
      fontSize={fontSize}
      onClick={onClick}
    >
      {str}
    </Text>
  );
}

function Menu({ setActive, setComponent }) {
  const { pointer } = useThree();
  const [active, setActiveState] = useState(true);
  const [selected, setSelected] = useState(null);
  const [, navigate] = useLocation();
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: active ? 1 : 0 },
    onRest: () => {
      if (!active) {
        // setActive(false);
        // setComponent(selected);
        navigate(`/${selected.toLowerCase()}`);
      }
    },
  });
  const ref = useRef();
  const words = ["Works", "Resume", "Keyboards", "About"];
  const wordSpacing = 0.5; // Adjust as needed
  // const circleRef = useRef();
  useFrame(() => {
    ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
    // circleRef.current.position.set(pointer.x / 5, pointer.y / 5 + 1.8, 1.1);
  });
  const handleWordClick = (word) => {
    setSelected(word);
    setActiveState(!active);
  };
  return (
    <>
      <animated.mesh scale={scale.to((s) => [s, s, s])} ref={ref}>
        <planeGeometry args={[3, 6]} />
        <meshBasicMaterial transparent opacity={0.85} color="#625d52" />
        <HoverWord
          str="cheok.works"
          position={[-1.2, 2.5, 0.1]}
          fontSize={0.4}
          color="#e1e1e1"
        />
        {words.map((word, index) => (
          <HoverWord
            key={word}
            str={word}
            position={[-1.3, -1.0 + index * wordSpacing, 0.1]} // Adjust the position based on the index
            fontSize={0.25}
            color="#e1e1e1"
            onClick={() => handleWordClick(word)}
          />
        ))}
      </animated.mesh>
      {/* <mesh ref={circleRef}>
        <circleGeometry args={[0.8, 64]} />
        <meshBasicMaterial
          transparent
          opacity={0.85}
          map={new THREE.TextureLoader().load(feather)}
        />
      </mesh> */}
    </>
  );
}
export default Menu;
