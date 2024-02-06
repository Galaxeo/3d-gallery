import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  Text,
  Billboard,
  ScrollControls,
  useScroll,
  Html,
} from "@react-three/drei";
import { easing } from "maath";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "wouter";
import { helix } from "ldrs";

helix.register();

const keyboardDescriptions = [
  {
    title: "GMMK Pro",
    switches: "Banana Split",
    keycaps: "EnjoyPBT WoB",
  },
  {
    title: "Mode Eighty First Edition",
    switches: "Original Aspiration",
    keycaps: "GMK Honor Dark",
  },
  {
    title: "KBD8X MKII",
    switches: "Boba U4T",
    keycaps: "EnjoyPBT Sky Dolch",
  },
  {
    title: "Mode SixtyFive",
    switches: "NovelKeys Cream",
    keycaps: "EnjoyPBT Blumen",
  },
  {
    title: "Rama M65-B",
    switches: "Boba U4T",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Tofu 65",
    switches: "Hako Clear",
    keycaps: "PG Retro",
  },
  {
    title: "NK65 Entry Edition",
    switches: "Boba U4T",
    keycaps: "XDA Apollo",
  },
  {
    title: "Rama U80-A SEQ2",
    switches: "Boba U4T",
    keycaps: "EnjoyPBT Miami Nights",
  },
  {
    title: "Bakeneko 65",
    switches: "Mauve",
    keycaps: "NicePBT Sugarplum",
  },
  {
    title: "NK87",
    switches: "Boba U4 Silent",
    keycaps: "NovelKeys Cherry Blossom",
  },
  {
    title: "Mode Eighty 2022",
    switches: "Pewter",
    keycaps: "XY Kitty Paw",
  },
  {
    title: "Owlab Spring",
    switches: "Original Aspiration Creamsicle",
    keycaps: "GMK Alter",
  },
  {
    title: "Monokei x TGR Tomo",
    switches: "MX Brown",
    keycaps: "NicePBT Noel",
  },
  {
    title: "Norbauer Heavy Grail",
    switches: "Topre",
    keycaps: "Stock HHKB",
  },
  {
    title: "Wooting 60HE in Mekanisk Fjell",
    switches: "Geon Raptor HE",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Mode Sonnet",
    switches: "Boba U4T",
    keycaps: "NovelKeys Cherry Taro",
  },
  {
    title: "Mode Envoy",
    switches: "NK Dream",
    keycaps: "MW Heresy",
  },
];
export function Scene() {
  const props = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0, 0, 0] },
    config: { mass: 0.7, tension: 70, friction: 20 },
  });
  const imagePaths = Array.from(
    { length: 17 },
    (_, i) => `/assets/Keyboards/${i + 1}.jpg`
  );
  const ref = useRef();
  const scroll = useScroll();
  const radius = 2;
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [, setLocation] = useLocation();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(state.camera.position, [0, 0.5, 9], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);

    let minDistance = Infinity;
    let imageInFront = null;
    ref.current.children.forEach((billboard, i) => {
      const image = billboard.children[0]; // Access the image
      const imageWorldPosition = new THREE.Vector3();
      image.getWorldPosition(imageWorldPosition); // Get the world position of the image
      const distance = imageWorldPosition.distanceTo(state.camera.position);
      if (distance < minDistance) {
        minDistance = distance;
        imageInFront = i;
      }
    });

    setSelectedImage(imageInFront + 1);
  });
  const selectedImageUrl =
    selectedImage !== null ? imagePaths[selectedImage - 1] : null;

  return (
    <>
      <animated.group
        scale={props.scale}
        position-y={0.7}
        position-z={6}
        ref={ref}
      >
        {imagePaths.map((path, i) => {
          const theta = (i / imagePaths.length) * 2 * Math.PI;
          const x = radius * Math.cos(theta);
          const z = radius * Math.sin(theta);

          return (
            <Billboard
              key={i + 1}
              position={[x, -2, z]}
              onPointerOver={() => setSelectedImage(i + 1)}
              onPointerOut={() => setSelectedImage(null)}
            >
              <Image url={path} transparent opacity={0.8} scale={[1.5, 1]} />
            </Billboard>
          );
        })}
        {selectedImageUrl && ( // Add this block
          <Billboard position={[0, radius - 0.8, 0]}>
            <Image
              scale={[7.12, 4]}
              url={selectedImageUrl}
              transparent
              opacity={0.95}
            />
            <Text
              font={"./RodinM.woff"}
              position={[-3.6, 2.2, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.4}
            >
              {keyboardDescriptions[selectedImage - 1].title}
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[-3.58, -2.2, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.2}
            >
              {keyboardDescriptions[selectedImage - 1].keycaps}
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[-3.55, -2.4, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.1}
            >
              Keycaps
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[3.55, -2.4, 0]}
              anchorX={"right"}
              color={"white"}
              fontSize={0.1}
            >
              Switches
            </Text>
            {/* <Text
              font={"./RodinM.woff"}
              position={[3.6, 2.2, 0]}
              anchorX={"right"}
              color={"white"}
              fontSize={0.3}
            >
              ?
            </Text> */}
            <Text
              font={"./RodinM.woff"}
              position={[3.6, -2.2, 0]}
              anchorX={"right"}
              color={"white"}
              fontSize={0.2}
            >
              {keyboardDescriptions[selectedImage - 1].switches}
            </Text>
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
              position={[0, -2.2, 0]}
              anchorX={"center"}
              color={"white"}
              fontSize={0.2}
            >
              Back
            </Text>
          </Billboard>
        )}
      </animated.group>
    </>
  );
}

export function Keyboards() {
  return (
    <>
      <Suspense
        fallback={
          <Html>
            <l-helix size="45" speed="2.5" color="white"></l-helix>
          </Html>
        }
      >
        <ScrollControls infinite>
          <Scene />
        </ScrollControls>
      </Suspense>
    </>
  );
}
