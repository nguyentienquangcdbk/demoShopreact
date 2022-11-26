import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
// import { set } from "react-hook-form";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import productAPi from "../../api/productAPi";
import { URLS } from "../../unitl/env";
import axios from "axios";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";
import Selects from "../../components/Selects";
import axiosClient from "../../api/axiosClient";
import ImgUpload from "../../components/ImgUpload";

Quill.register("modules/imageUploader", ImageUploader);
const sizeOptions = [
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
];
const UpdateProduct = () => {
  const params = useParams();
  const [image, setImage] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [imgDesc, setImgDesc] = useState(null);
  const [category, setCategory] = useState(null);

  const { setValue, reset, register, handleSubmit, getValues } = useForm();

  useEffect(() => {
    async function getProductId() {
      if (!params.id) return;
      await productAPi
        .getId(params.id)
        .then((res) => {
          console.log(res);
          reset({
            name: res?.data?.product.name,
            price: res?.data?.product.price,
            categoryName: res?.data?.product.categoryName,
          });
          // setDesc(res?.data?.product.description);
          setValue("description", res?.data?.product.description);
          setImage(res?.data?.product.avatarOne);
          setImageTwo(res?.data?.product.avatarTwo);
          setProductImg(res?.data?.img);

          // set color
          setValue(
            "color",
            res?.data?.color.map((item, index) => {
              return {
                value: item.value,
                label: item.value,
              };
            })
          );
          // set size
          setValue(
            "size",
            res?.data?.size?.map((item, index) => {
              return {
                value: item.value,
                label: item.value,
              };
            })
          );
        })
        .catch((error) => console.log(error));
    }
    getProductId();
  }, []);

  const module = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("file", file);
          const response = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/img/upload",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return URLS + response?.data.file_path;
        },
      },
    }),
    []
  );

  // lấy danh mục
  useEffect(() => {
    const getCategory = async () => {
      const listCateogry = await categoryApi.getAll();
      setCategory(
        listCateogry?.data.map((x) => ({
          value: x.name,
          label: x.name,
        }))
      );
    };
    getCategory();
  }, []);

  const onImgChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleColor = (value) => {
    const arr = value.map((item, index) => item.value);
    setValue("color", arr);
  };
  const handleSize = (value) => {
    const arr = value.map((item, index) => item.value);
    setValue("size", arr);
  };
  const onImgChangeTwo = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImageTwo(img);
    }
  };
  const onchangeUpload = (e) => {
    const file = e.target.files;
    setImgDesc(file);
  };

  // xóa ảnh
  const handleRemoveImg = async (id) => {
    await axiosClient
      .post(`img/remove/${id}`)
      .then((res) => {
        console.log(res);
        setProductImg((prev) => prev.filter((item) => item.id !== id));
        toast.success("xóa anh thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("xóa ảnh thất bại");
      });
  };

  const handleUpdateProduct = async (value) => {
    if (typeof value.color === "object") {
      value.color = [];
    }
    if (typeof value.size === "object") {
      value.size = [];
    }

    if (image && typeof image != "string") {
      const data = new FormData();

      data.append("file", image);

      const img = await axios.post(
        "http://127.0.0.1:8000/api/img/upload",
        data
      );
      console.log(img);
      value.avatarOne = img?.data.file_path;
      // setValue("avatarOne", img?.data.file_path);
    }
    if (imageTwo && typeof imageTwo != "string") {
      const datatwo = new FormData();

      datatwo.append("file", imageTwo);

      const img2 = await axios.post(
        "http://127.0.0.1:8000/api/img/upload",
        datatwo
      );
      console.log(img2);
      value.avatarTwo = img2?.data.file_path;
      // setValue("avatarTwo", img2?.data.file_path);
    }
    if (imgDesc) {
      const data = new FormData();

      Array.from(imgDesc).forEach((img) => {
        data.append("filename[]", img);
      });

      const imgDes = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/img/uploads",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log(imgDes.data);
      value.img = imgDes?.data.map((item, index) => {
        return item.file_path;
      });
    }
    await productAPi
      .update(params.id, value)
      .then((res) => {
        console.log(res);
        toast.success("sửa sản phẩm thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("sưa sản phẩm không thành công");
      });
    console.log(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateProduct)} className="w-full">
        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-3 border border-[#EDEDF2] outline-none focus:border-[#79B3FF] mb-5"
              placeholder="nhâp tên danh mục..."
            />
          </div>
          <div className="field flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              price
            </label>
            <input
              type="text"
              {...register("price")}
              className="w-full px-4 py-3 border border-[#EDEDF2] outline-none focus:border-[#79B3FF] mb-5"
              placeholder="nhâp tên danh mục..."
            />
          </div>
        </div>
        <div className="field flex flex-col w-full">
          <label htmlFor="" className="font-semibold text-lg mb-5">
            description
          </label>
          <ReactQuill
            theme="snow"
            modules={module}
            value={getValues("description")}
            onChange={(value) => setValue("description", value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full">
            <h3 className="font-semibold text-lg mb-5">avatar one</h3>
            <ImgUpload
              images={image}
              name="ImageOne"
              setImages={setImage}
              onchange={onImgChange}
            ></ImgUpload>
          </div>

          <div className="field flex flex-col w-full">
            <h3 className="font-semibold text-lg mb-5">avatar two</h3>
            <ImgUpload
              images={imageTwo}
              name="ImageTwo"
              setImages={setImageTwo}
              onchange={onImgChangeTwo}
            ></ImgUpload>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              màu sắc sản phẩm
            </label>
            {getValues("color") && (
              <Selects
                selectedOption={getValues("color")}
                onChange={handleColor}
              ></Selects>
            )}
          </div>

          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              size sản phẩm
            </label>
            {getValues("size") && (
              <Select
                onChange={handleSize}
                placeholder="nhập size sản phẩm"
                defaultValue={getValues("size")}
                isMulti
                options={sizeOptions}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <label htmlFor="" className="font-semibold text-lg mb-5">
              danh mục
            </label>
            {getValues("categoryName") && (
              <Select
                onChange={(x) => setValue("categoryName", x.value)}
                className="mt-5"
                closeMenuOnSelect={false}
                placeholder="nhà sản xuất"
                defaultValue={{
                  value: getValues("categoryName"),
                  label: getValues("categoryName"),
                }}
                options={category}
              />
            )}
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              ảnh mô tả sản phẩm
            </label>
            <input type="file" onChange={onchangeUpload} multiple />

            <div className="grid grid-cols-3 gap-x-5 mt-5">
              {productImg &&
                productImg.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full group h-[120px] relative border border-gray-500"
                  >
                    <span
                      onClick={() => handleRemoveImg(item.id)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-10 h-10 rounded-full text-red-500 bg-yellow-500 flex items-center justify-center "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    <img
                      src={URLS + item.path}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 mt-10 py-4 bg-green-400 bg-opacity-80 text-white rounded-lg mx-auto block"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
