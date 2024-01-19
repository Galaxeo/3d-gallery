import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import "./App.css";
function HoverWord({ str, position, fontSize, color }) {
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  const wordRef = useRef();
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  useFrame(() => {
    wordRef.current.material.color.set(hovered ? "red" : color);
  });
  return (
    <Text
      ref={wordRef}
      onPointerOver={over}
      onPointerOut={out}
      position={position}
      color={color}
      fontSize={fontSize}
      onClick={() => {
        console.log("here");
      }}
    >
      {str}
    </Text>
  );
}

function Menu() {
  const { viewport, camera, pointer } = useThree();
  const ref = useRef();
  useFrame(() => {
    ref.current.position.set(pointer.x / 4, pointer.y / 4, 1);
  });
  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[3, 5]} />
        <meshBasicMaterial transparent opacity={0.75} color="grey" />
        <HoverWord
          str="Hello world"
          position={[0, 1, 0.1]}
          fontSize={0.3}
          color="white"
        />
      </mesh>
    </>
  );
}
export default Menu;
