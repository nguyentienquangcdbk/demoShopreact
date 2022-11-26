import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";

const UpdateCategory = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    const getCategory = async () => {
      await categoryApi
        .getId(param.id)
        .then((res) => {
          reset({
            name: res.data.name,
          });
        })
        .catch((error) => console.log(error));
    };
    getCategory();
  }, []);
  const updateCategory = async (value) => {
    await categoryApi
      .update(param.id, value)
      .then((res) => {
        toast.success("sửa danh mục thành công");
        navigate("/admin/category");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="text-xl font-medium text-center mb-10">
        thêm nhà sản xuất
      </h1>
      <form
        onSubmit={handleSubmit(updateCategory)}
        className="mx-auto w-[600px]"
      >
        <div className="field flex flex-col w-full">
          <label htmlFor="" className="font-semibold text-lg mb-5">
            name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-3 border border-[#EDEDF2] outline-none focus:border-[#79B3FF] mb-5"
            placeholder="nhâp tên danh mục..."
          />
        </div>

        <button className="px-6 py-3 font-medium block mx-auto bg-orange-300 rounded-lg text-white">
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
