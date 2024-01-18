import Background from "./Background";
import "./App.css";
import feather from "./assets/feather.png";

function App() {
  return (
    <>
      <Background></Background>
      <div>
        <img src={feather} className="logo" alt="feather logo" />
        <p className="logo">Welcome!</p>
      </div>
    </>
  );
}

export default App;
