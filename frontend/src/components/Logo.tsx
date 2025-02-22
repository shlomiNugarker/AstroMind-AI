import React from "react";
import logo from "@/assets/logo.png";

interface LogoProps {
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" className={`w-auto ${className}`} />
    </div>
  );
};

export default Logo;
