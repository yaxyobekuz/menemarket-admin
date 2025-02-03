import React from "react";
import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";

// Ui components
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Data
import navLinks from "@/data/navLinks";

// Images
import hamburgerMenuIcon from "@/assets/images/icons/hamburger-menu.svg";

const MainLayoutTabs = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 w-full h-14 bg-white border-t border-neutral-200">
      <div className="flex w-full h-full overflow-x-auto scroll-hidden">
        {/* Sticky element */}
        <div className="sticky-element flex items-center justify-center sticky left-0 w-14 h-full bg-white shrink-0 border-r border-neutral-200 transition-colors duration-200 xs:w-20 sm:w-24">
          <HoverCard>
            {/* Trigger */}
            <HoverCardTrigger asChild>
              <button className="p-2.5 rounded-full transition-colors duration-200 hover:bg-gray-light">
                <Icon src={hamburgerMenuIcon} alt="Hamburger menu" />
              </button>
            </HoverCardTrigger>

            {/* Content */}
            <HoverCardContent sideOffset={12} align="right" className="p-2">
              <nav className="main-layout-tabs">
                <ul>
                  {navLinks.main.map(({ path, label }, index) => (
                    <li className="group w-full" key={index}>
                      <NavLink
                        to={path}
                        className="block px-3.5 py-1.5 rounded-md font-normal text-[15px] transition-colors duration-200 hover:bg-gray-light/70 sm:text-base"
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Nav */}
        <nav className="main-layout-tabs w-full h-full">
          <ul className="flex w-full h-full">
            {navLinks.main.map(({ path, label }, index) => (
              <li className="group min-w-max" key={index}>
                <NavLink
                  to={path}
                  className="flex items-center justify-center px-3.5 h-full text-[15px] transition-colors duration-200 hover:bg-gray-light/70 group-first:border-l-0 xs:px-4 sm:px-5 sm:text-base"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainLayoutTabs;
