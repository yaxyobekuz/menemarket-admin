import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";

// Data
import mainLayoutTabs from "@/data/mainLayoutTabs";

// Images
import hamburgerMenuIcon from "@/assets/images/icons/hamburger-menu.svg";

const MainLayoutTabs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) return;

    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      const stickyElement = e.target.querySelector(".sticky-element");

      if (scrollLeft > 0) {
        stickyElement.classList.add("!border-neutral-300");
      } else {
        stickyElement.classList.remove("!border-neutral-300");
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 w-full h-14 bg-white border-t border-neutral-200">
      <div
        ref={containerRef}
        className="flex w-full h-full overflow-x-auto scroll-hidden"
      >
        {/* Sticky element */}
        <div className="sticky-element flex items-center justify-center sticky left-0 w-24 h-full bg-white shrink-0 border-r border-transparent transition-colors duration-200">
          <button className="p-2.5 rounded-full transition-colors duration-200 hover:bg-gray-light">
            <Icon src={hamburgerMenuIcon} alt="Hamburger menu" />
          </button>
        </div>

        {/* Nav */}
        <nav className="main-layout-tabs w-full h-full">
          <ul className="flex w-full h-full">
            {mainLayoutTabs.map((tab) => (
              <li className="group min-w-max" key={tab.name}>
                <NavLink
                  to={tab.path}
                  className="flex items-center justify-center px-5 h-full transition-colors duration-200 hover:bg-gray-light/70 group-first:border-l-0"
                >
                  {tab.name}
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
