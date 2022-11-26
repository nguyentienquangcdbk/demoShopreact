import React, { useEffect, useState } from "react";

const sizesList = ["37", "38", "39", "40", "41", "42", "43", "44"];
const SizeFilter = ({ filter, onchange = () => {} }) => {
  const [sizes, setSizes] = useState([]);
  const hanldeChangesize = (size) => {
    setSizes((prev) => {
      if (sizes.includes(size)) {
        return prev.filter((x) => x !== size);
      } else {
        return [...prev, size];
      }
    });
  };
  useEffect(() => {
    onchange(sizes);
  }, [sizes]);

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mt-3">kich thuoc</h6>
      <div className="flex flex-col">
        {sizesList.map((size) => {
          return (
            <label key={size} className="checkbox-container">
              <input
                type="checkbox"
                onChange={() => hanldeChangesize(size)}
                checked={sizes.includes(size)}
              />
              <span className="checkmark mx-2"></span>
              {`size ${size}`}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
