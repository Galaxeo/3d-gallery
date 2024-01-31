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

const workDescriptions = [
  {
    title: "Keyboard Data Analysis",
    tools: "Python, Pandas, Matplotlib, Seaborn",
    description:
      "A data analysis project conducted to see if marketing tactics within the mechanical keyboard industry in the early 2010s were able to continue to have effects on sales in the 2020s.",
    link: "https://github.com/Galaxeo/keyboard-data-analysis",
  },
  {
    title: "Futoshiki Solver",
    tools: "Python",
    description:
      "A Python program that solves Futoshiki puzzles using a backtracking & forward checking algorithm.",
    link: "https://github.com/Galaxeo/futoshiki",
  },
  {
    title: "15-Puzzle Solver",
    tools: "Python",
    description:
      "A Python program that solves 15-puzzle problems using the A* algorithm with the Manhattan Distance heuristic.",
    link: "https://github.com/Galaxeo/15-puzzle",
  },
  {
    title: "Pokemon Memory Game",
    tools: "JavaScript, React, Vite",
    description:
      "A memory game built using React and Vite focusing on the utilization of useEffect by dealing with external sources like the PokéAPI.",
    link: "https://github.com/Galaxeo/memory-game",
    demo: "https://galaxeo.github.io/memory-game/",
  },
  {
    title: "CV/Resume Maker",
    tools: "JavaScript, React, Vite",
    description: "A CV/Resume maker built using React and Vite",
    link: "https://github.com/Galaxeo/cv-applicationk",
    demo: "https://galaxeo.github.io/cv-application/",
  },
  {
    title: "SAP Script (Artemis Networks)",
    tools: "Python",
    description:
      "A Python script that accepts phone IDs or the IPs of phones and returns their location within the SAP stadium. Reduced the time it took to locate phones from 30 minutes to mere seconds.",
    link: "https://github.com/Galaxeo/SAP-script",
  },
  {
    title: "Website (Version 1.0)",
    tools: "HTML, CSS",
    description:
      "The first version of my personal website, utilizing vanilla HTML and CSS, designed from the ground up to be responsive and mobile-friendly.",
    link: "https://github.com/Galaxeo/webpage",
  },
  {
    title: "Basketball Data Analysis",
    tools: "Python, Pandas, Numpy, Matplotlib",
    description:
      "A data analysis project conducted to test whether or not monikers given to certain basketball players based on their performance in the playoffs were accurate.",
    link: "https://github.com/Galaxeo/basketballproject",
  },
  {
    title: "To-do List Web Application",
    tools: "HTML, CSS, JavaScript, Webpack",
    description:
      "A to-do list web application built using HTML, CSS, and JavaScript. The main focus of this project was to become familiar with the webpack module builder in order to separate and bundle the JS files.",
    link: "https://github.com/Galaxeo/todo-list",
    demo: "https://cheok.works/todo-list/dist/index.html",
  },
  {
    title: "The Odin Project repository",
    tools: "HTML, CSS, JavaScript, React",
    description:
      "A repository of all the projects I've completed from The Odin Project's full stack curriculum.",
    link: "https://github.com/Galaxeo/odin",
  },
];

export function Scene() {
  const props = useSpring({
    scale: [0.4, 0.4, 0.4],
    from: { scale: [0, 0, 0] },
    config: { mass: 0.7, tension: 70, friction: 20 },
  });
  const imagePaths = Array.from(
    { length: 10 },
    (_, i) => `../src/assets/Works/${i + 1}.jpg`
  );
  const ref = useRef();
  const scroll = useScroll();
  const radius = 2;
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredDemo, setHoveredDemo] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(false);
  const [, setLocation] = useLocation();
  useFrame((state, delta) => {
    ref.current.rotation.x = -scroll.offset * (Math.PI * 2);
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
          const y = radius * Math.cos(theta);
          const z = radius * Math.sin(theta);

          return (
            <Billboard
              key={i + 1}
              position={[-3.5, y, z]}
              onPointerOver={() => setSelectedImage(i + 1)}
              onPointerOut={() => setSelectedImage(null)}
            >
              <Image url={path} transparent opacity={0.9} scale={[1.2, 1]} />
            </Billboard>
          );
        })}
        {selectedImageUrl && ( // Add this block
          <Billboard position={[radius - 0.7, 0, 0]}>
            <Image
              scale={[7, 4.5]}
              url={selectedImageUrl}
              transparent
              opacity={0.95}
            />
            <Text
              font={"./RodinM.woff"}
              position={[-3.55, 2.5, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.4}
            >
              {workDescriptions[selectedImage - 1].title}
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[3.6, 2.2, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.1}
            >
              Primary Technologies:
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[3.6, 2.0, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.2}
            >
              {workDescriptions[selectedImage - 1].tools}
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[3.6, 1.8, 0]}
              anchorX={"left"}
              color={"white"}
              fontSize={0.1}
            >
              Description:
            </Text>
            <Text
              font={"./RodinM.woff"}
              position={[3.6, 1.7, 0]}
              anchorX={"left"}
              anchorY={"top"}
              lineHeight={1.5}
              color={"white"}
              fontSize={0.15}
              maxWidth={2.5}
            >
              {workDescriptions[selectedImage - 1].description}
            </Text>
            {workDescriptions[selectedImage - 1].link && (
              <Text
                font={hoveredLink ? "./RodinM.woff" : "./RodinL.woff"}
                position={[3.6, -2.1, 0]}
                anchorX={"left"}
                color={"white"}
                fontSize={0.3}
                onPointerOver={() => {
                  setHoveredLink(true);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  setHoveredLink(false);
                  document.body.style.cursor = "default";
                }}
                onClick={() => {
                  window.open(workDescriptions[selectedImage - 1].link);
                }}
              >
                Repo
              </Text>
            )}
            {workDescriptions[selectedImage - 1].demo && (
              <Text
                font={hoveredDemo ? "./RodinM.woff" : "./RodinL.woff"}
                position={[3.6, -1.7, 0]}
                anchorX={"left"}
                color={"white"}
                fontSize={0.3}
                onPointerOver={() => {
                  setHoveredDemo(true);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  setHoveredDemo(false);
                  document.body.style.cursor = "default";
                }}
                onClick={() => {
                  window.open(workDescriptions[selectedImage - 1].demo);
                }}
              >
                Demo
              </Text>
            )}
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
              position={[-3.55, -2.5, 0]}
              anchorX={"left"}
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

export function Works() {
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
