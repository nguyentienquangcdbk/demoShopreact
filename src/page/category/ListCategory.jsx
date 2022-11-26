import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";

const ListCategory = () => {
  const [listCategory, setListCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    listCategories();
  }, []);

  const listCategories = async () => {
    setLoading(true);
    await categoryApi
      .getAll()
      .then((res) => {
        setLoading(false);
        setListCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemove = async (id) => {
    await categoryApi
      .delete(id)
      .then((data) => {
        console.log(data);

        toast.success("xóa thành công");
        listCategories();
        // listCategories();
      })
      .catch((error) => {
        toast.error("xóa danh mục không thành công");
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-semibold text-2xl">trang danh sách danh mục</h1>

        <Link
          to={"add"}
          className="px-3 py-5 bg-green-400 text-xl text-white rounded-lg"
        >
          thêm danh mục
        </Link>
      </div>
      {loading ? (
        <div className="w-20 h-20 animate-spin mx-auto mt-5 border-8 border-blue-500 border-t-transparent rounded-full"></div>
      ) : (
        <div className="w-full overflow-x-scroll">
          <table className="w-full  border-[#EFF0F3] border table-fixed">
            <thead className="rounded-lg">
              <tr className="rounded-lg">
                <th className="p-2  bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                  id
                </th>
                <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                  name
                </th>
                <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                  slug
                </th>
                <th className="p-2 bg-[#F9FBFC] text-start font-medium text-lg text-[#9CA4A8]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listCategory &&
                listCategory.map((item, index) => (
                  <tr key={item.id} className="border border-t-[#F7F7F7]">
                    <td className="px-2 py-3 text-sm">{item.id}</td>
                    <td className="px-2 py-3 text-sm">{item.name}</td>
                    <td className="px-2 py-3 text-sm">{item.slug}</td>

                    <td className="px-2 py-3 text-sm">
                      <button
                        onClick={() => handleRemove(item.id)}
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
      )}
    </div>
  );
};

export default ListCategory;
