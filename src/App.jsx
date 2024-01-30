import "./App.css";
import { Route } from "wouter";
import { Canvas } from "@react-three/fiber";
import Menu from "./Menu";
import Keyboards from "./Keyboards";

function App() {
  return (
    <>
      <Route path="/" component={Menu} />
      <Route path="/Keyboards" component={Keyboards} />
    </>
  );
}

export default App;
