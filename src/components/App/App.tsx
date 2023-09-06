import React from "react";
import { Canvas } from "../Canvas/Canvas";
import { SideBar } from "../SideBar/SideBar";
import { CanvasProvider } from "../CanvasProvide";
const App: React.FC = () => {
  return (
    <>
      <CanvasProvider>
        <Canvas />
        <SideBar />
      </CanvasProvider>
    </>
  );
};

export default App;
