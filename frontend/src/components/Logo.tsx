import React from "react";
import logo from "@/assets/logo.png";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" className="w-auto h-[100px]" />
    </div>
  );
};

export default Logo;
