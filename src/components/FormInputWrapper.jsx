import React, { useState, useCallback } from "react";

// UUID (Id generator)
import { v4 as uuidv4 } from "uuid";

// Input mask
import { InputMask } from "@react-input/mask";

const FormInputWrapper = ({
  id,
  min = 0,
  label = "",
  as = "input",
  type = "text",
  name = "input",
  className = "",
  disabled = false,
  placeholder = "",
  maxLength = 2048,
  required = false,
  defaultValue = "",
  autoFocus = false,
  onChange = () => {},
  autoComplete = "off",
}) => {
  const [inputId] = useState(id || uuidv4());
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  // Render input based on type and element type
  const renderInput = () => {
    if (as === "textarea") {
      return (
        <textarea
          name={name}
          id={inputId}
          value={value}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="px-3.5 scroll-hidden"
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    }

    if (as === "input" && type === "tel") {
      return (
        <InputMask
          type="tel"
          name={name}
          id={inputId}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className="h-11 px-3.5"
          placeholder={placeholder}
          mask="+998 (__) ___-__-__"
          replacement={{ _: /\d/ }}
          autoComplete={autoComplete}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    }

    if (as === "input" && type === "otp") {
      return (
        <InputMask
          name={name}
          id={inputId}
          value={value}
          disabled={disabled}
          mask="_ _ _ _"
          autoFocus={autoFocus}
          maxLength={maxLength}
          className="h-11 px-3.5"
          placeholder={placeholder}
          replacement={{ _: /\d/ }}
          autoComplete={autoComplete}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    }

    if (as === "input" && type === "card") {
      return (
        <InputMask
          type="tel"
          name={name}
          id={inputId}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className="h-11 px-3.5"
          placeholder={placeholder}
          mask="____ ____ ____ ____"
          replacement={{ _: /\d/ }}
          autoComplete={autoComplete}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    }

    return (
      <input
        min={min}
        type={type}
        name={name}
        id={inputId}
        value={value}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className="h-11 px-3.5"
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => handleChange(e.target.value)}
      />
    );
  };

  return (
    <div
      className={`group flex flex-col items-center justify-center gap-2 relative overflow-hidden w-full rounded-b-lg ${className}`}
    >
      {/* Label */}
      {label && (
        <div className="w-full">
          <label htmlFor={inputId} className="pl-1.5">
            {label}
          </label>
        </div>
      )}

      {/* Render Input */}
      {renderInput()}

      {/* Active Line */}
      <div className="absolute bottom-0 w-0 h-0.5 bg-transparent transition-[width,background-color] duration-300 group-focus-within:w-full group-focus-within:bg-primary-default" />
    </div>
  );
};

export default FormInputWrapper;
