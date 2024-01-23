import React from "react";
import { Html } from "@react-three/drei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "wouter";
function BackArrow({ handleClick }) {
  const [, navigate] = useLocation();

  // NOTE: Animate the opacity here as well
  return (
    <Html position={[0, -3, 0]} className="backArrow">
      <FontAwesomeIcon size="2x" icon={faArrowLeft} onClick={handleClick} />
    </Html>
  );
}
export default BackArrow;
