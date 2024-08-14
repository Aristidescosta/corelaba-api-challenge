import React from "react";

import { ColorPalette } from "./ColorPalette";

export interface IDropdownMenuColorsProps {
  toCreate?: boolean;
  onChangeTaskColor: (color: string) => void;
}

export const DropdownMenuColors: React.FC<IDropdownMenuColorsProps> = ({
  toCreate,
  onChangeTaskColor
}) => {
  const colors = [
    "#F8BBD0",
    "#C8E6C9",
    "#FFF9C4",
    "#FFCCBC",
    "#FFCDD2",
    "#BBDEFB",
    "#E1BEE7",
    "#D1C4E9",
    "#FFECB3",
    "#D7CCC8",
    "#B0BEC5",
    "#CFD8DC",
  ];

  return (
    <div
      id="myDropdown"
      className={`dropdown-content ${toCreate ? "h-8" : ""}`}
    >
      <div className={`color-palette `}>
        {colors.map((color, index) => (
          <ColorPalette
            onChangeTaskColor={onChangeTaskColor}
            color={color}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
