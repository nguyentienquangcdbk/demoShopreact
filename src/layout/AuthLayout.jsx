import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../store/auth";

const AuthLayout = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user?.isAdmin === 0) {
      navigate("/product");
    }
  }, [user]);

  return (
    <div>
      <div className="flex">
        <div className="slibar h-screen w-[250px] bg-green-400 transition-all">
          <div className="flex flex-col gap-y-5">
            <Link to={"category"}>nhà sản xuất</Link>
            <Link to={"product"}>sản phẩm</Link>
          </div>
        </div>
        <div className="flex-1 max-h-[100vh] overflow-scroll overflow-x-hidden ">
          <header className="h-20 w-full bg-gray-700">sdbvgs</header>
          <div className=" w-full bg-white   p-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
