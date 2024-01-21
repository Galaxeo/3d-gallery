import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import "./App.css";
function HoverWord({ str, position, fontSize, color }) {
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  return (
    <Text
      onPointerOver={over}
      onPointerOut={out}
      position={position}
      fontSize={fontSize}
      color={color}
    >
      {str}
    </Text>
  );
}
export default HoverWord;
