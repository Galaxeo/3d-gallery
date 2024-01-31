import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  Image,
  Text,
  Billboard,
  ScrollControls,
  useScroll,
  Html,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "wouter";
import headshot from "../src/assets/headshot.jpg";

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

export function Scene() {
  const props = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0, 0, 0] },
    config: { mass: 0.7, tension: 70, friction: 20 },
  });
  const ref = useRef();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [, setLocation] = useLocation();
  useFrame((state, delta) => {
    state.events.update();
    easing.damp3(state.camera.position, [0, 0.5, 9], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);
  });

  return (
    <>
      <animated.group
        scale={props.scale}
        position-y={0.7}
        position-z={6}
        ref={ref}
      >
        <Billboard>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[8, 5.5, 0.1]} />
            <meshStandardMaterial color={"grey"} transparent opacity={0.3} />
          </mesh>
          <Text
            onPointerOver={() => {
              setHoveredBack(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredBack(false);
              document.body.style.cursor = "default";
            }}
            onClick={() => {
              setLocation("/");
            }}
            font={hoveredBack ? "./RodinM.woff" : "./RodinL.woff"}
            position={[-3.55, -2.8, 0]}
            anchorX={"left"}
            color={"white"}
            fontSize={0.2}
          >
            Back
          </Text>
          <Image
            url="../src/assets/headshot.jpg"
            scale={1}
            position={[-2.5, 1.5, 0.1]}
          >
            <roundedPlaneGeometry args={[2, 2, 0.5]} />
          </Image>
          <Text
            font={"./RodinM.woff"}
            position={[-2.5, 0.3, 0.1]}
            color={"white"}
            fontSize={0.25}
            anchorX={"center"}
          >
            Justin Cheok
          </Text>
        </Billboard>
      </animated.group>
    </>
  );
}

export function About() {
  return (
    <>
      <Suspense
        fallback={
          <Html>
            <l-helix size="45" speed="2.5" color="white"></l-helix>
          </Html>
        }
      >
        <ScrollControls enabled={false}>
          <Scene />
        </ScrollControls>
      </Suspense>
    </>
  );
}
