import React, { useState } from "react";

const FormCheckbox = ({
  className = "",
  onChecked = () => {},
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleChecked = (e) => {
    onChecked(e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <label className={`inline-block ${className}`}>
      {/* Hidden checkbox input */}
      <input
        type="checkbox"
        className="hidden"
        onChange={handleChecked}
        defaultChecked={defaultChecked}
      />

      {/* Virtual checkbox */}
      <span
        className={`flex items-center justify-center size-[22px] bg-gray-light border rounded-[7px] transition-colors ${
          checked
            ? "border-primary-default bg-primary-default"
            : "border-neutral-400"
        }`}
      >
        <svg
          width="24"
          height="24"
          version="1.1"
          viewBox="0 0 24 24"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className={`size-5 transition-transform delay-150 ${
            checked ? "scale-100" : "scale-0"
          }`}
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.707 6.293a1 1 0 0 1 0 1.414l-9.5 9.5a1 1 0 0 1-1.414 0l-4.5-4.5a1 1 0 1 1 1.414-1.414L9.5 15.086l8.793-8.793a1 1 0 0 1 1.414 0z"
          />
        </svg>
      </span>
    </label>
  );
};

export default FormCheckbox;
