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
  // leftX - rightX = 1.25
  const leftY = 0.7;
  const leftX = -2;
  const rightY = 1.8;
  const rightX = -0.75;
  const props = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0, 0, 0] },
    config: { mass: 0.7, tension: 70, friction: 20 },
  });
  const imagePaths1 = Array.from(
    { length: 5 },
    (_, i) => `../src/assets/About/${i + 1}.png`
  );
  const imagePaths2 = Array.from(
    { length: 6 },
    (_, i) => `../src/assets/About/${i + 6}.png`
  );
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
            <planeGeometry args={[7, 4.5]} />
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
            position={[-3.3, -2.3, 0]}
            anchorX={"left"}
            color={"white"}
            fontSize={0.2}
          >
            Back
          </Text>
          <Image
            url="../src/assets/headshot.jpg"
            scale={1}
            position={[leftX, leftY + 0.1, 0.1]}
            anchorY={"top"}
          >
            <roundedPlaneGeometry args={[2, 2, 0.5]} />
          </Image>
          <Text
            font={"./RodinM.woff"}
            position={[leftX, leftY - 1.2, 0.1]}
            color={"white"}
            fontSize={0.3}
            anchorX={"center"}
          >
            Justin Cheok
          </Text>
          <Text
            font={"./RodinM.woff"} // -0.3 to -1.5
            position={[leftX, leftY - 1.5, 0.1]}
            color={"white"}
            fontSize={0.2}
            anchorX={"center"}
          >
            Bay Area, CA
          </Text>
          <Text
            font={"./RodinM.woff"}
            position={[leftX - 0.75, leftY - 1.75, 0.1]}
            color={"white"}
            fontSize={0.1}
            anchorX={"left"}
          >
            Email: hwjustincheok@gmail.com
          </Text>
          <Text
            font={"./RodinM.woff"}
            position={[leftX - 0.75, leftY - 1.9, 0.1]}
            color={"white"}
            fontSize={0.1}
            anchorX={"left"}
          >
            Phone: +1 650-933-6363
          </Text>
          <Text
            font={"./RodinM.woff"}
            position={[rightX, rightY, 0.1]}
            color={"white"}
            maxWidth={4}
            fontSize={0.25}
            anchorX={"left"}
            anchorY={"top"}
            lineHeight={1.5}
          >
            About Me
          </Text>
          <Text
            font={"./RodinM.woff"}
            position={[rightX, rightY - 0.35, 0.1]} // 2.2-1.85=0.35
            color={"white"}
            maxWidth={4}
            fontSize={0.15}
            anchorX={"left"}
            anchorY={"top"}
            lineHeight={1.5}
          >
            Full-stack developer based in the Bay Area, CA. Currently working
            for Reactor8 as a software engineer. Passionate about front-end
            development/design and data-driven projects. Building keyboards and
            weightlifting on the side.
          </Text>
          <Text
            font={"./RodinM.woff"}
            position={[rightX, rightY - 1.75, 0.1]} // 2.2-0.8=1.4
            color={"white"}
            fontSize={0.2}
            anchorX={"left"}
            anchorY={"top"}
          >
            Main languages:
          </Text>
          <group>
            {imagePaths1.map((url, index) => (
              <Image
                key={index}
                url={url}
                scale={0.3}
                position={[rightX + 1.75 + index * 0.33, rightY - 1.95, 0.1]}
                anchorX={"left"}
                anchorY={"top"}
                transparent
              ></Image>
            ))}
          </group>
          <Text
            font={"./RodinM.woff"}
            position={[rightX, rightY - 2.1, 0.1]} // 2.2-0.45 = 1.75
            color={"white"}
            fontSize={0.2}
            anchorX={"left"}
            anchorY={"top"}
          >
            Tools:
          </Text>
          <group>
            {imagePaths2.map((url, index) => (
              <Image
                key={index}
                url={url}
                scale={0.3}
                position={[rightX + 0.8 + index * 0.33, rightY - 2.3, 0.1]}
                anchorX={"left"}
                anchorY={"top"}
                transparent
              ></Image>
            ))}
          </group>
          <Image
            url="../src/assets/About/github.png"
            scale={0.4}
            position={[rightX + 0.75, rightY - 2.9, 0.1]}
            anchorX={"left"}
            anchorY={"top"}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
            onClick={() => {
              window.open("https://github.com/galaxeo");
            }}
            transparent
          ></Image>
          <Image
            url="../src/assets/About/utube.png"
            scale={0.5}
            position={[rightX + 0.25, rightY - 2.92, 0.1]}
            anchorX={"left"}
            anchorY={"top"}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
            onClick={() => {
              window.open("https://www.youtube.com/@galaxeo");
            }}
            transparent
          ></Image>
          <Image
            url="../src/assets/About/linkedin.png"
            scale={0.4}
            position={[rightX + 1.25, rightY - 2.9, 0.1]}
            anchorX={"left"}
            anchorY={"top"}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
            onClick={() => {
              window.open("https://www.linkedin.com/in/jhcheok/");
            }}
            transparent
          ></Image>
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
