import React, { useState } from "react";
import Select from "react-select";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
  { value: "black", label: "Silver", color: "#000" },
  { value: "white", label: "white", color: "#fff" },
];
const Selects = (props) => {
  const { selectedOption, onChange = () => {} } = props;
  console.log(selectedOption);
  return (
    <Select
      closeMenuOnSelect={false}
      onChange={(value) => onChange(value)}
      defaultValue={selectedOption ? selectedOption : null}
      isMulti
      options={colourOptions}
      isOptionSelected={true}
    />
  );
};

export default Selects;
