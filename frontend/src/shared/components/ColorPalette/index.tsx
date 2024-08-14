import React from "react";

import "./ColorPalette.scss";

import { IDropdownMenuColorsProps } from "../DropdownMenuColors";

type ColorPaletteProps = {
  color: string;
} & Omit<IDropdownMenuColorsProps, "toCreate">;

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  color,
  onChangeTaskColor,
}) => {
  return (
    <div
      className="color-circle"
      style={{ backgroundColor: color }}
      onClick={() => onChangeTaskColor(color)}
    />
  );
};
