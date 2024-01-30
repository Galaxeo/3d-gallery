import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Billboard,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Route, useRoute, useLocation } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";
function Scene() {
  const imagePaths = Array.from(
    { length: 17 },
    (_, i) => `../src/assets/Keyboards/${i + 1}.jpg`
  );
  const ref = useRef();
  const scroll = useScroll();
  const radius = 2;
  const [hoveredImage, setHoveredImage] = useState(null);
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(state.camera.position, [1, 4, 9], 0.3, delta);
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

    setHoveredImage(imageInFront + 1);
  });
  const hoveredImageUrl =
    hoveredImage !== null ? imagePaths[hoveredImage - 1] : null;

  return (
    <group ref={ref} scale={[2, 2, 2]}>
      {imagePaths.map((path, i) => {
        const theta = (i / imagePaths.length) * 2 * Math.PI;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);

        return (
          <Billboard
            key={i + 1}
            position={[x, 0, z]}
            onPointerOver={() => setHoveredImage(i + 1)}
            onPointerOut={() => setHoveredImage(null)}
          >
            <Image url={path} />
          </Billboard>
        );
      })}
      {hoveredImageUrl && ( // Add this block
        <Billboard position={[0, radius, 0]}>
          <Image url={hoveredImageUrl} />
        </Billboard>
      )}
    </group>
  );
}

function Keyboards() {
  return (
    <Canvas>
      <ScrollControls infinite>
        <Scene />
      </ScrollControls>
    </Canvas>
  );
}
export default Keyboards;
