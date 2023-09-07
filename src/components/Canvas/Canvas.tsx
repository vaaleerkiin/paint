import React, { useRef, useState, useEffect, useContext } from "react";
import { CanvasContext } from "../CanvasProvide";
import CursorCircle from "../CursorCircle/CursorCircle";
import ReactDOM from "react-dom";
import { ICoords } from "../../Types/ICoords";
export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState<Array<ICoords | "mouseup">>([]);
  const [init, setInit] = useState(true);
  const CanvasValue = useContext(CanvasContext);
  const canvas = canvasRef.current;
  const ctx = canvas ? canvas.getContext("2d") : null;

  useEffect(() => {
    if (init) setPosition({ x: -100, y: -100 });

    const prevCoords = localStorage.getItem("coords")
      ? (JSON.parse(localStorage.getItem("coords")!) as Array<
          ICoords | "mouseup"
        >)
      : [];

    if (!ctx) return;

    prevCoords?.length > 0 &&
      prevCoords.forEach((el) => {
        if (el === "mouseup") return ctx.beginPath();

        ctx.lineWidth = el.radius * 2;
        ctx.lineTo(el.x, el.y);
        ctx.strokeStyle = el.color;
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
        ctx.fillStyle = el.color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(el.x, el.y);
      });
    setCoords(prevCoords);
    setInit(false);
  }, [ctx, init]);

  useEffect(() => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [canvas]);

  const drawMove = (e: React.MouseEvent): void => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!ctx || !mouseDown) return;

    ctx.lineWidth = CanvasValue.radius * 2;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = CanvasValue.color;
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(e.clientX, e.clientY, CanvasValue.radius, 0, Math.PI * 2);
    ctx.fillStyle = CanvasValue.color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);

    setCoords((prev) => {
      return [
        ...prev,
        {
          x: e.clientX,
          y: e.clientY,
          color: CanvasValue.color,
          radius: CanvasValue.radius,
        },
      ];
    });
  };

  const drawClick = (e: React.MouseEvent): void => {
    if (!ctx) return;

    ctx.arc(e.clientX, e.clientY, CanvasValue.radius, 0, Math.PI * 2);
    ctx.fillStyle = CanvasValue.color;
    ctx.fill();

    ctx?.beginPath();
    setCoords((prev) => {
      return [
        ...prev,
        {
          x: e.clientX,
          y: e.clientY,
          color: CanvasValue.color,
          radius: CanvasValue.radius,
        },
        "mouseup",
      ];
    });
  };

  useEffect(() => {
    if (!CanvasValue.replay) return;
    if (!ctx || !canvas) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    let replayCoords = [...coords];

    if (!ctx) return;
    const timer = setInterval(() => {
      if (!replayCoords.length) {
        clearInterval(timer);
        ctx.beginPath();
        return;
      }

      const el = replayCoords.shift();
      if (!el) return;
      if (el === "mouseup") return ctx.beginPath();

      ctx.lineWidth = el.radius * 2;
      ctx.lineTo(el.x, el.y);
      ctx.strokeStyle = el.color;
      ctx.stroke();

      ctx.beginPath();

      ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
      ctx.fillStyle = el.color;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(el.x, el.y);
    }, 16);
    CanvasValue.setReplay(false);
  }, [coords, ctx, CanvasValue, canvas]);

  useEffect(() => {
    if (!CanvasValue.clear) return;
    if (!ctx || !canvas) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    CanvasValue.setClear(false);
    setCoords([]);
    localStorage.setItem("coords", JSON.stringify([]));
  }, [CanvasValue, canvas, ctx]);

  useEffect(() => {
    if (!CanvasValue.save) return;
    localStorage.setItem("coords", JSON.stringify(coords));
    CanvasValue.setSave(false);
  }, [CanvasValue, canvas, coords, ctx]);

  return (
    <>
      {ReactDOM.createPortal(
        <CursorCircle position={position} />,
        document.querySelector("#cursor")!
      )}
      <canvas
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
          cursor: "cell",
          zIndex: -10,
        }}
        ref={canvasRef}
        onMouseDown={() => setMouseDown(true)}
        onMouseMove={drawMove}
        onMouseUp={() => {
          setMouseDown(false);

          ctx?.beginPath();
          setCoords((prev) => {
            return [...prev, "mouseup"];
          });
        }}
        onClick={drawClick}
        onMouseLeave={() => {
          setMouseDown(false);
          ctx?.beginPath();
          setPosition({ x: -100, y: -100 });
        }}
      ></canvas>
    </>
  );
};
