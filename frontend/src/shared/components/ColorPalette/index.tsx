import React from "react";
import "./ColorPalette.scss";

type ColorPaletteProps = {
  color: string;
};

export const ColorPalette: React.FC<ColorPaletteProps> = ({ color }) => {
  return <div className="color-circle" style={{ backgroundColor: color }} />;
};
