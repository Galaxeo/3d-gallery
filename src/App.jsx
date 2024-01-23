import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Screen from "./Screen";
import Background from "./Background";
import { Canvas } from "@react-three/fiber";
import { getPointerPos } from "./Background";
import { useRef } from "react";

function App() {
  const mouse = useRef({ x: 0, y: 0 });
  const fwdRef = useRef();
  return (
    <>
      <Canvas
        gl={{ alpha: false }}
        onMouseMove={(e) => (mouse.current = getPointerPos(e))}
        camera={{ near: 0.01, far: 10, fov: 60 }}
      >
        <Screen mousePos={mouse}></Screen>
        <Background></Background>
      </Canvas>
    </>
  );
}

export default App;
