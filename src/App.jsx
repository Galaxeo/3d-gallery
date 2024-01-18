import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import feather from "./assets/feather.png";
// Want to create a floating particle background that reacts to mouse movement
function Particle({ x, y, z }) {
  const mesh = useRef();
  const { viewport, pointer } = useThree();
  const ref = useRef();
  const [data] = useState({
    x: x,
    y: y,
  });
  useFrame(() => {
    mesh.current.position.x = data.x;
    mesh.current.position.y = data.y;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a target="_blank">
          <img src={feather} className="logo" alt="feather logo" />
        </a>
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Particle x={0} y={0} z={0} />
      </Canvas>
    </>
  );
}

export default App;
