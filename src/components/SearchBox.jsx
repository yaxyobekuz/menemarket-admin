import React, { useState, useRef, useEffect, useMemo } from "react";

// lodash
import { debounce } from "lodash";

// components
import SpinLoader from "./SpinLoader";

// images
import searchIcon from "../assets/images/icons/search.svg";

const SearchBox = ({
  className = "",
  onChange,
  placeholder = "Qidirish...",
}) => {
  const searchInputRef = useRef(null);
  const [state, setState] = useState({ query: "", loading: false });

  // set input value
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        if (onChange) {
          onChange(value);
        }
        setState((prevState) => ({ ...prevState, loading: false }));
      }, 500),
    [onChange]
  );

  // handle change
  const handleChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setState({ query: e.target.value, loading: true });
    handleSearch(value);
  };

  // handle focus
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === "/") {
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const { query, loading } = state;

  return (
    <label className={`flex items-center grow relative ${className}`}>
      {/* icon */}
      <div className="absolute left-3.5 size-6">
        {loading ? (
          <SpinLoader />
        ) : (
          <img
            width={24}
            height={24}
            src={searchIcon}
            alt="ppmaker search icon"
            aria-label="ppmaker search icon"
          />
        )}
      </div>

      {/* input */}
      <input
        name="search"
        type="search"
        value={query}
        title="search"
        maxLength={240}
        ref={searchInputRef}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-white h-12 pl-12 outline-offset-0"
      />

      {/* bar */}
      <kbd
        className={`${
          query.length > 0 ? "hidden" : ""
        } absolute right-3.5 opacity-70 text-sm font-Inter max-sm:!hidden`}
      >
        <abbr title="Control" className="no-underline">
          Ctrl +
        </abbr>
        <span> /</span>
      </kbd>
    </label>
  );
};

export default SearchBox;
