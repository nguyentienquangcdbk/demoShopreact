import React, { useEffect, useState } from "react";
import productAPi from "../../api/productAPi";
import { URLS } from "../../unitl/env";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ListProduct = () => {
  const [listProduct, setListProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    await productAPi
      .getAll()
      .then((res) => {
        console.log(res);

        setListProduct(res?.data?.data);
      })
      .catch((error) => console.log(error));
  };
  const removeProduct = async (id) => {
    await productAPi
      .delete(id)
      .then((res) => {
        toast.success("xóa sản phẩm thành côg");
        getProduct();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-semibold text-2xl">trang danh sách sản phẩm</h1>

        <Link
          to={"add"}
          className="px-3 py-5 bg-green-600 text-white rounded-lg"
        >
          thêm sản phẩm
        </Link>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="w-[1200px]  border-[#EFF0F3] border table-fixed">
          <thead className="rounded-lg">
            <tr className="rounded-lg">
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                id
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                name
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                nhà sản xuất
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                price
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                avatar one
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                avatar two
              </th>
              <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listProduct?.map((item, index) => (
              <tr key={item.id} className="border border-t-[#F7F7F7]">
                <td className="px-2 py-3 text-sm">{item.id}</td>
                <td className="px-2 py-3 text-sm">{item.name}</td>
                <td className="px-2 py-3 text-sm w-[250px]">
                  {item.categoryName}
                </td>
                <td className="px-2 py-3 text-sm">{item.price}</td>
                <td className="px-2 py-3 text-sm">
                  <img
                    src={URLS + item.avatarOne}
                    alt=""
                    className="w-16 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-2 py-3 text-sm">
                  <img
                    src={URLS + item.avatarTwo}
                    alt=""
                    className="w-16 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-2 py-3 text-sm">
                  <button
                    onClick={() => removeProduct(item.id)}
                    className="p-2 bg-red-400 rounded-lg mx-1 text-white"
                  >
                    delete
                  </button>
                  <button
                    onClick={() => navigate(`update/${item.id}`)}
                    className="p-2 bg-green-400 rounded-lg mx-1 text-white"
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
