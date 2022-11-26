import React, { useEffect, useMemo, useState } from "react";
// import imgUpload from "../../img/img-upload.png";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import Select from "react-select";
import { useForm } from "react-hook-form";
import categoryApi from "../../api/categoryApi";
// import axiosClient from "../../api/axiosClient";
import axios from "axios";
import productAPi from "../../api/productAPi";
import { URLS } from "../../unitl/env";
import Label from "../../components/Label";
import Input from "../../components/Input";
import ImgUpload from "../../components/ImgUpload";
import Button from "../../components/Button";
import { toast } from "react-toastify";

Quill.register("modules/imageUploader", ImageUploader);
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
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imgDesc, setImgDesc] = useState(null);
  const [category, setCategory] = useState(null);

  const { control, handleSubmit, setValue, getValues, reset } = useForm();

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
    // console.log(value);
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
    console.log("e", e.target.files);
    const file = e.target.files;
    setImgDesc(file);
  };

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

  const addProduct = async (value) => {
    value.price = Number(value.price);

    if (image) {
      const data = new FormData();
      data.append("file", image);
      const img = await axios.post(
        "http://127.0.0.1:8000/api/img/upload",
        data
      );
      console.log(img);
      value.avatarOne = img?.data.file_path;
    }
    if (imageTwo) {
      const datatwo = new FormData();

      datatwo.append("file", imageTwo);

      const img2 = await axios.post(
        "http://127.0.0.1:8000/api/img/upload",
        datatwo
      );
      console.log(img2);
      value.avatarTwo = img2?.data.file_path;
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
      .add(value)
      .then((res) => {
        toast.success("thêm sản phẩm thành công");
        reset({
          name: "",
          price: "",
          description: "",
        });
        setImage(null);
        setImageTwo(null);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(addProduct)} className="w-full">
        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full">
            <Label>name</Label>
            <Input
              control={control}
              name="name"
              placeholder="nhập tên sản phẩm"
            />
          </div>
          <div className="field flex flex-col w-full">
            <Label htmlFor="price">giá sản phẩm</Label>
            <Input
              control={control}
              name="price"
              placeholder="nhập giá sản phẩm"
            />
          </div>
        </div>

        <div className="field flex flex-col w-full">
          <Label>mô tả sản phẩm</Label>
          <ReactQuill
            theme="snow"
            modules={module}
            // value={getValues("description")}
            onChange={(value) => setValue("description", value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          <div className="field flex flex-col w-full p-5">
            <h3 className="font-semibold text-lg mb-5">avatar one</h3>
            <ImgUpload
              images={image}
              name="ImageOne"
              setImages={setImage}
              onchange={onImgChange}
            ></ImgUpload>
          </div>

          <div className="field flex flex-col w-full p-5">
            <h3 className="font-semibold text-lg mb-5">avatar two</h3>
            <ImgUpload
              images={imageTwo}
              name="imageTwo"
              setImages={setImageTwo}
              onchange={onImgChangeTwo}
            ></ImgUpload>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <Label>màu sắc sản phẩm</Label>

            <Select
              closeMenuOnSelect={false}
              onChange={handleColor}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={colourOptions}
            />
          </div>
          <div>
            <Label>kích thước sản phẩm</Label>
            <Select
              onChange={handleSize}
              closeMenuOnSelect={false}
              isMulti
              options={sizeOptions}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 mt-10">
          <div>
            <Label>nhà sản xuất</Label>
            <Select
              onChange={(x) => setValue("categoryName", x.value)}
              className="mt-5"
              closeMenuOnSelect={false}
              placeholder="nhà sản xuất"
              options={category}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="" className="font-semibold text-lg mb-5">
              ảnh mô tả sản phẩm
            </label>
            <input type="file" onChange={onchangeUpload} multiple />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddProduct;
