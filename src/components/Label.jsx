import React from "react";

const Label = ({ children, htmlFor = "" }) => {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-lg mb-5">
      {children}
    </label>
  );
};

export default Label;
