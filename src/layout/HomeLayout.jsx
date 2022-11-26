import axios from "axios";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Button from "../components/Button";
import { useStore } from "../store/auth";
import { useCart } from "../store/cart";

const HomeLayout = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const itemCart = useCart((state) => state.itemCart);
  console.log("itemCart ~", itemCart);
  const handleLogOut = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.message === "Logged out") {
          localStorage.removeItem("token");
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // axiosClient
    //   .post("logout")
    //   .then((res) => {
    //     console.log(res);
    //     if (res?.data?.message === "Logged out") {
    //       localStorage.removeItem("token");
    //       setUser(null);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div>
      <header className="flex px-16 py-10 items-center justify-between">
        <div className="logo">shopshoe</div>
        <div className="menu flex gap-x-3 text-2xl font-semibold">
          <Link to={"/"}>trang chủ</Link>
          <Link to={"/product"}>sản phẩm</Link>
          <Link to={"/"}>trang chủ</Link>
        </div>
        <div className="auth">
          <Link to={"/cart"} className="relative">
            <span className="absolute z-0 inset-0">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
            <span className="absolute top-[-5px] left-4 z-10 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white">
              {itemCart?.length}
            </span>
          </Link>
          {!user ? (
            <>
              <Link to={"login"}>login</Link>
              <Link to={"register"}>register</Link>
            </>
          ) : (
            <>
              <span className="mx-3 text-xl font-semibold"> {user?.name}</span>
              <button
                className="px-3 py-2 rounded-md bg-green-300 text-white"
                onClick={handleLogOut}
              >
                logout
              </button>
              {user?.isAdmin === 1 && (
                <Link
                  to={"admin"}
                  className="px-3 py-2 mx-2 rounded-md bg-green-300 text-white"
                >
                  admin
                </Link>
              )}
            </>
          )}
        </div>
      </header>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
