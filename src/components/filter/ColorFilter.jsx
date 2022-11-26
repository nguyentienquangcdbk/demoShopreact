import React, { useEffect, useState } from "react";

const colorsList = [
  "ocean",
  "blue",
  "purple",
  "red",
  "orange",
  "yellow",
  "green",
  "black",
  "white",
];
const ColorFilter = ({ filter, onchange = () => {} }) => {
  const [colors, setColors] = useState([]);
  const hanldeChangeColor = (color) => {
    setColors((prev) => {
      if (colors.includes(color)) {
        return prev.filter((x) => x !== color);
      } else {
        return [...prev, color];
      }
    });
  };
  useEffect(() => {
    onchange(colors);
  }, [colors]);

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">MÀU SẮC</h6>
      <div className="flex flex-col">
        {colorsList.map((color) => {
          return (
            <label key={color} className="checkbox-container">
              <input
                type="checkbox"
                onChange={() => hanldeChangeColor(color)}
                checked={colors.includes(color)}
              />
              <span className="checkmark mx-2"></span>
              {`Màu ${color}`}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
