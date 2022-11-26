import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layout/AuthLayout";
import AddCategory from "./page/category/AddCategory";
import ListCategory from "./page/category/ListCategory";
import UpdateCategory from "./page/category/UpdateCategory";
import AddProduct from "./page/product/AddProduct";
import ListProduct from "./page/product/ListProduct";
import UpdateProduct from "./page/product/UpdateProduct";
import HomeLayout from "./layout/HomeLayout";
import ProductHome from "./page/home/ProductHome";
import SignIn from "./page/auth/SignIn";
import SignUp from "./page/auth/SignUp";
import { useEffect } from "react";
import { useStore } from "./store/auth";
import axiosClient from "./api/axiosClient";
import DetailProduct from "./page/home/DetailProduct";
import Cart from "./page/home/Cart";
function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        axiosClient
          .post("/me")
          .then((data) => {
            console.log(data);
            setUser(data?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeLayout></HomeLayout>}>
          <Route path="/product" element={<ProductHome></ProductHome>}></Route>
          <Route path="/product/:id" element={<DetailProduct />}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Route>
        <Route path="login" element={<SignIn></SignIn>}></Route>
        <Route path="register" element={<SignUp></SignUp>}></Route>
        <Route path="admin" element={<AuthLayout></AuthLayout>}>
          <Route
            path="category"
            element={<ListCategory></ListCategory>}
          ></Route>
          <Route
            path="category/add"
            element={<AddCategory></AddCategory>}
          ></Route>
          <Route
            path="category/update/:id"
            element={<UpdateCategory></UpdateCategory>}
          ></Route>

          <Route path="product" element={<ListProduct></ListProduct>}></Route>
          <Route path="product/add" element={<AddProduct></AddProduct>}></Route>
          <Route
            path="product/update/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
