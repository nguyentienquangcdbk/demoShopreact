import React from "react";
import { useController } from "react-hook-form";

const Input = ({ type = "text", name = "", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      type={type}
      {...field}
      {...props}
      //   {...register("name")}
      className="w-full px-4 py-3 border border-[#EDEDF2] outline-none focus:border-[#79B3FF] mb-5"
      //   placeholder="nhâp tên danh mục..."
    />
  );
};

export default Input;
