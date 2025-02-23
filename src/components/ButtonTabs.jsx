import { useState } from "react";

const ButtonTabs = ({
  defaultValue = null,
  onChange = () => {},
  disabled: tabsDisabled,
  data = [{ value: "1", label: "Button 1" }],
}) => {
  const [activeButton, setActiveButton] = useState(defaultValue);

  const handleButtonClick = (value, disabled) => {
    if (tabsDisabled || disabled) return;

    if (value === activeButton) {
      onChange(null);
      return setActiveButton(null);
    }

    onChange(value);
    setActiveButton(value);
  };

  return (
    <div className="flex gap-1 max-w-max overflow-x-auto scroll-hidden bg-white p-1 rounded-xl">
      {data?.map(({ label, value, disabled }, index) => {
        return (
          <button
            key={index}
            children={label}
            disabled={disabled || tabsDisabled}
            onClick={() => handleButtonClick(value, disabled)}
            className={`${
              activeButton === value
                ? "!bg-gray-light text-primary-default"
                : "text-neutral-500"
            } inline-block py-2 px-5 rounded-lg text-[17px] transition-colors duration-200 text-sm hover:bg-gray-light/50 xs:text-base`}
          />
        );
      })}
    </div>
  );
};

export default ButtonTabs;
