import React, { createContext, useState } from "react";
import { ICanvas } from "../Types/ICanvas";

export const CanvasContext = createContext<ICanvas>({
  radius: 10,
  color: "#000000",
  clear: false,
  save: false,
  replay: false,
  setColor: (color) => {},
  setRadius: (radius) => {},
  setClear: (bool) => {},
  setSave: (bool) => {},
  setReplay: (bool) => {},
});

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [color, setColor] = useState("#000000");
  const [radius, setRadius] = useState(10);
  const [clear, setClear] = useState(false);
  const [save, setSave] = useState(false);
  const [replay, setReplay] = useState(false);
  return (
    <CanvasContext.Provider
      value={{
        radius,
        color,
        setColor,
        setRadius,
        setClear,
        clear,
        save,
        setSave,
        replay,
        setReplay,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
