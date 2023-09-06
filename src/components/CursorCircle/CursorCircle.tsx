import React, { useContext } from "react";
import { CanvasContext } from "../CanvasProvide";
import "./CursorCircle.css";

const CursorCircle: React.FC<{ position: { x: number; y: number } }> = ({
  position,
}) => {
  const CanvasValue = useContext(CanvasContext);
  return (
    <div
      className="cursor-circle"
      style={{
        left: position.x,
        top: position.y,
        width: CanvasValue.radius * 2,
        height: CanvasValue.radius * 2,
        zIndex: 1000,
      }}
    ></div>
  );
};

export default CursorCircle;
