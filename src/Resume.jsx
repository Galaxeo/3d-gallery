import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Image } from "@react-three/drei";
import "./App.css";
import { useSpring, animated } from "@react-spring/three";
import { animated as a } from "react-spring";
import BackArrow from "./BackArrow";
import { navigate } from "wouter/use-location";

function Resume() {
  const ref = useRef();
  const { pointer } = useThree();
  const [active, setActiveState] = useState(true);
  const { opacity } = useSpring({
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
      ref.current.position.set(pointer.x / 5, pointer.y / 5, 1);
      // ref.current.position.set(0, 0, 1);
    }
  });

  return (
    <>
      <animated.mesh scale={scale.to((s) => [s, s, s])} ref={ref}>
        <planeGeometry args={[6.4, 8.8]} />
        <meshBasicMaterial
          transparent
          opacity={0.95}
          map={new THREE.TextureLoader().load("../src/assets/resume-2.png")}
        />
        {/* <Html center wrapperClass="fade-in" position={[0, 3.7, 0.1]}>
          <div className="resumeCont">
            <a.p
              className="largeFont"
              style={{
                fontSize: "3rem",
                opacity: opacity.to((o) => o),
                transform: scale.to((s) => `scale(${s})`),
              }}
            >
              Resume
            </a.p>
            <a.p
              className="largeFont"
              style={{ opacity: opacity.to((o) => o) }}
            >
              Education
            </a.p>
          </div>
        </Html> */}
      </animated.mesh>
    </>
  );
}

export default Resume;
