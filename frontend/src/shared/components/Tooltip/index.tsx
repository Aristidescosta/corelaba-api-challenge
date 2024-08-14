import React, { useState } from "react";

import "./tooltip.scss";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ label, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className="tooltip">{label}</div>}
    </div>
  );
};
