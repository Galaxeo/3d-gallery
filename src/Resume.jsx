import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./App.css";
import { useSpring, a } from "@react-spring/three";
import BackArrow from "./BackArrow";
import { navigate } from "wouter/use-location";

function Resume() {
  const ref = useRef();
  const [active, setActiveState] = useState(true);
  const { fontOpacity } = useSpring({
    opacity: active ? 1 : 0,
  });
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: active ? 1 : 0 },
    onRest: () => {
      if (!active) {
        navigate("/");
      }
    },
  });

  useFrame(() => {
    if (ref.current) {
      // ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
      ref.current.position.set(0, 0, 1);
    }
  });

  const handleBack = () => {
    setActiveState(!active);
  };

  return (
    <>
      <a.mesh scale={scale.to((s) => [s, s, s])} ref={ref}>
        <planeGeometry args={[6.4, 8.8]} />
        <meshBasicMaterial transparent opacity={0.85} color="#625d52" />
        <Html center wrapperClass="fade-in" position={[0, 3.7, 0.1]}>
          <a.div style={{ fontOpacity }} className="resumeCont">
            <p
              className="largeFont"
              style={{ fontSize: "3rem", paddingLeft: "3" }}
            >
              Resume
            </p>
            <p className="largeFont">Education</p>
          </a.div>
        </Html>
        <BackArrow handleClick={handleBack} />
      </a.mesh>
    </>
  );
}

export default Resume;
