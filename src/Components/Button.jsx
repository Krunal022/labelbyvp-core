import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className = "", navigate, onClick, ...rest }) => {
  const navi = useNavigate();

  // Handle click: navigate if 'navigate' prop is given, otherwise call onClick
  const handleClick = (e) => {
    if (navigate) {
      navi(navigate);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group h-fit w-fit overflow-hidden p-1 cursor-pointer border backdrop-blur-lg drop-shadow-lg ${className}`}
      {...rest}
    >
      {/* Hover expanding background */}
      <div className="absolute inset-0 w-0 group-hover:w-full h-full transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] z-0 bg-white/15 backdrop-blur-2xl drop-shadow-2xl" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default Button;
