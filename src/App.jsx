import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Screen from "./Screen";
import Background from "./Background";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 100, fov: 60 }}>
        <Screen></Screen>
        <Background></Background>
      </Canvas>
    </>
  );
}

export default App;
