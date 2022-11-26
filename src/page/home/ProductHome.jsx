import React, { useEffect, useState } from "react";
import productAPi from "../../api/productAPi";
import CategoryFilter from "../../components/filter/CategoryFilter";
import ColorFilter from "../../components/filter/ColorFilter";
import SizeFilter from "../../components/filter/SizeFilter";
import { useStore } from "../../store/auth";
import imgjs from "../../img/img-upload.png";
import { URLS } from "../../unitl/env";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ProductHome = () => {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    category: [],
    page: 1,
  });
  const [filterProductList, setFilterProductList] = useState([]);
  useEffect(() => {
    setPage(1);
  }, [filters]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // setPage(1);
        const res = await productAPi.getAll({
          category: filters.category,
          color: filters.color,
          size: filters.size,
          page: page,
        });
        console.log(res);

        const arrListProduct = Object.values(res?.data?.data);
        setFilterProductList(arrListProduct);
        setLastPage(res?.data?.last_page);
        setLoading(false);
      } catch {
        console.log("error");
        setLoading(false);
      }
    })();
    console.log(filters);
  }, [filters, page]);

  const handleFilterColor = (colors) => {
    setFilters({
      ...filters,
      color: colors,
      page: 1,
    });
  };
  const handleFilterSize = (size) => {
    setFilters({
      ...filters,
      size: size,
    });
  };
  const handleFilterCategory = (category) => {
    setFilters({
      ...filters,
      category: category,
    });
  };
  console.log("filterProductList ~ ", filterProductList);
  const handlePageClick = (x) => {
    // console.log(x);
    setPage(x.selected + 1);
    // setFilters({
    //   ...filters,
    //   page: x.selected + 1,
    // });
  };

  return (
    <div className="container">
      <div className="flex">
        <div className="filter px-5 w-[30%]">
          <CategoryFilter onChange={handleFilterCategory} />
          <ColorFilter onchange={handleFilterColor} />
          <SizeFilter onchange={handleFilterSize} />
        </div>
        <div className="w-[70%]">
          <div className="px-5">
            {loading && (
              <div className="mx-auto w-14 py-10">
                <div className="w-12 h-12 rounded-full border-8 border-blue-300 border-t-transparent animate-spin"></div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-x-3">
              {!loading &&
                filterProductList.length > 0 &&
                filterProductList?.map((item, index) => (
                  <div key={item.id} className="box">
                    <div className="group relative w-full h-36">
                      <img
                        src={URLS + item.avatarOne}
                        className="w-full h-full object-cover group-hover:scale-0 transition-all absolute inset-0"
                        alt=""
                      />
                      <img
                        src={URLS + item.avatarTwo}
                        className="w-full h-full object-cover scale-0 group-hover:scale-100 absolute inset-0 transition-all"
                        alt=""
                      />
                    </div>
                    <Link to={"/product/" + item.id}>{item.name}</Link>
                    <p>
                      price :{" "}
                      <strong>
                        {" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item?.price)}
                      </strong>
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-10">
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                className="flex gap-x-3 items-center "
                pageRangeDisplayed={2}
                forcePage={page - 1}
                pageCount={lastPage}
                pageClassName="w-10 h-10 flex justify-center items-center hover:bg-slate-200 rounded-full"
                activeClassName="bg-slate-200"
                // onPageActive={1}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHome;
