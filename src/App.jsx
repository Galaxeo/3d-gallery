import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Menu from "./Menu";

function App() {
  return (
    <>
      <div>
        <p>Cheok.works</p>
      </div>
      <Menu></Menu>
    </>
  );
}

export default App;
