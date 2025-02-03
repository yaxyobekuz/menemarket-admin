import React from "react";
import { Link } from "react-router-dom";

// Images
import logoIcon from "../assets/images/icons/logo.svg";

const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-20 w-full h-12 bg-white border-b border-neutral-200 xs:h-14">
      <div className="flex w-full h-full px-3.5 xs:px-4 sm:px-5">
        <Link to="/" className="flex items-center h-full">
          <img
            width={75}
            height={40}
            src={logoIcon}
            alt="Mene Market Logo"
            className="w-[75px] h-10 xs:w-[82.5px] xs:h-11 md:w-[90px] md:h-12"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
