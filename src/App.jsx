import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Background from "./Background";
import { Canvas } from "@react-three/fiber";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
]);

function App() {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 10, fov: 60 }}>
        <RouterProvider router={router}></RouterProvider>
        <Background></Background>
      </Canvas>
    </>
  );
}

export default App;
