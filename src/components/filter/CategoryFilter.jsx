import React, { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";

const CategoryFilter = ({ filter, onChange = () => {} }) => {
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        // console.log(response);
        setCategories(response?.data);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  useEffect(() => {
    onChange(categoryIds);
  }, [categoryIds]);

  const hanldeChangeCategory = (id) => {
    setCategoryIds((prev) => {
      if (categoryIds.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="mb-8">
      <h6 className="text-xl font-medium mb-5">DANH MỤC</h6>
      <div className="flex flex-col">
        {categories.map((category) => {
          return (
            <label key={category.id} className="checkbox-container">
              <input
                type="checkbox"
                onChange={() => hanldeChangeCategory(category.name)}
                checked={categoryIds.includes(category.name)}
              />
              <span className="checkmark mx-2"></span>
              {category.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
