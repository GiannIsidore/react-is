// TooltipProvider.jsx
import React from "react";
import { TooltipContext } from "./TooltipContext"; // Assuming you have a TooltipContext

const TooltipProvider = ({ children }) => {
  // Your context logic goes here, if any

  return (
    <TooltipContext.Provider value={children}>
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
