// Heavily inspired by the Image gallery from pmndrs examples
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  MeshPortalMaterial,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import { useSpring, animated } from "@react-spring/three";
import getUuid from "uuid-by-string";

const GOLDENRATIO = 1.61803398875;

const images = [
  // Left
  {
    position: [-1.5, 0, 2.8],
    rotation: [0, Math.PI / 6, 0],
    url: "../src/assets/code.png",
    title: "programming",
  },
  // Middle
  {
    position: [0, 0, 2.5],
    rotation: [0, 0, 0],
    url: "../src/assets/skyline.jpg",
    title: "about",
  },
  // Right
  {
    position: [1.5, 0, 2.8],
    rotation: [0, -Math.PI / 6, 0],
    url: "../src/assets/artisan.jpg",
    title: "keyboards",
  },
];
function Frames({ images, setHoveredTitle }) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(clicked.current === e.object ? "/" : e.object.title)
      )}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map((props) => (
        <Frame
          key={props.url}
          title={props.title}
          setHoveredTitle={setHoveredTitle}
          {...props}
        />
      ))}
    </group>
  );
}

function Frame({
  url,
  title,
  c = new THREE.Color(),
  setHoveredTitle,
  ...props
}) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute(":id");
  const [hovered, hover] = useState(false);
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "white" : "grey",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        title={title}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(true);
          setHoveredTitle(title);
        }}
        onPointerOut={() => {
          hover(false);
          setHoveredTitle(null);
        }}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
    </group>
  );
}

function Menu() {
  const [hoveredTitle, setHoveredTitle] = useState();
  return (
    <>
      <div className="title">
        <p>{hoveredTitle || "cheok.works"}</p>
      </div>
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 0.5, 6] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} setHoveredTitle={setHoveredTitle} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={50}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.4}
            />
          </mesh>
        </group>
        <Environment preset="city" />
      </Canvas>
    </>
  );
}

export default Menu;
