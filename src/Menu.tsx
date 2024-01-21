import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, Text } from "@react-three/drei";
import "./App.css";
function HoverWord({ str, position, fontSize, color }) {
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  const wordRef = useRef<Text>();
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
      return void 0;
    };
  }, [hovered]);
  useFrame(() => {
    if (wordRef.current) {
      wordRef.current.material.color.set(hovered ? "white" : color);
    }
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
      onClick={() => {
        console.log("here");
      }}
    >
      {str}
    </Text>
  );
}

function Menu() {
  const { pointer } = useThree();
  const ref = useRef();
  const words = ["Works", "Resume", "Keyboards", "About"];
  const wordSpacing = 0.5; // Adjust as needed
  // const circleRef = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
    }
    // circleRef.current.position.set(pointer.x / 5, pointer.y / 5 + 1.8, 1.1);
  });
  return (
    <>
      <mesh ref={ref}>
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
          />
        ))}
      </mesh>
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
