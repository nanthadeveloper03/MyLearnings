// contexts/HoverContext.js
"use client"; // Required for Next.js app router context in components

import React, { createContext, useState, useContext } from "react";

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
console.log(isHovered,'isHovered');

  return (
    <HoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = () => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
};
