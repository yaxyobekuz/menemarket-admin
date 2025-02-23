import { NavLink } from "react-router-dom";

// Data
import navLinks from "@/data/navLinks";

const Tabs = ({ name = "" }) => {
  return (
    <nav className="layout-tabs">
      <ul className="flex gap-1 max-w-max bg-white p-1 rounded-xl">
        {navLinks[name]?.map(({ end, path, label, disabled }, index) => {
          const className =
            "inline-block py-2 px-5 rounded-lg text-[17px] text-neutral-500 transition-colors duration-200";
          return (
            <li key={index}>
              {disabled ? (
                <span
                  className={`${className} opacity-35 cursor-default select-none text-sm xs:text-base`}
                >
                  {label}
                </span>
              ) : (
                <NavLink
                  end={end}
                  to={path}
                  className={`${className} text-sm hover:bg-gray-light/50 xs:text-base`}
                >
                  {label}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Tabs;
