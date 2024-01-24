import React from "react";
import { Html } from "@react-three/drei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { animated as a } from "react-spring";
function BackArrow({ handleClick, style }) {
  // NOTE: Animate the opacity here as well
  return (
    <Html
      style={{ position: "absolute", transform: "translateY(-500px)" }}
      className="backArrow"
    >
      <a.div style={style}>
        <FontAwesomeIcon
          size="2x"
          icon={faArrowLeft}
          onClick={handleClick}
          style={style}
        />
      </a.div>
    </Html>
  );
}
export default BackArrow;
