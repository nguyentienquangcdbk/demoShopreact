import React from "react";

const Button = ({ className, children, type = "button", ...rest }) => {
  return (
    <button
      type={type}
      {...rest}
      className={`px-8 mt-10 py-4 bg-green-400 bg-opacity-80 text-white rounded-lg mx-auto block ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
