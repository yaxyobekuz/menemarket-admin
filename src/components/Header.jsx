import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";

// Images
import logoIcon from "../assets/images/icons/logo.svg";

const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-20 w-full h-14 bg-white border-b border-neutral-200">
      <div className="flex w-full h-full px-5">
        <Link to="/" className="flex items-center h-full">
          <img
            width={75}
            height={40}
            src={logoIcon}
            alt="Mene Market Logo"
            className="w-[75px] h-10"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
