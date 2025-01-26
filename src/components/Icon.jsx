import React from "react";

const Icon = ({
  src,
  size = 24,
  style = {},
  alt = "icon",
  className = "size-6",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={style}
      className={className}
    />
  );
};

export default Icon;
