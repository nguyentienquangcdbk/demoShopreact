import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productAPi from "../../api/productAPi";
import { URLS } from "../../unitl/env";
import parse from "html-react-parser";
import { useCart, useStore } from "../../store/cart";
const DetailProduct = () => {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [listSize, setListSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCart((state) => state.addToCart);
  useEffect(() => {
    (async () => {
      const res = await productAPi.getId(param.id);
      setProduct(res?.data?.product);
      setListSize(res?.data?.size);
      console.log(res);
    })();
  }, []);
  const updateQuantity = (type) => {
    if (type === "giam") {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const check = () => {
    if (size === null) {
      alert("vui lòng chọn size");
      return false;
    } else {
      return true;
    }
  };
  const addToCarts = () => {
    const checks = check();
    if (checks) {
      let newItem = {
        id: product?.id,
        img: product?.avatarOne,
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        size: size,
      };
      addToCart(newItem);
    }
  };
  return (
    <div className="flex">
      <div className="w-[30%] p-5">
        <img src={URLS + product?.avatarOne} alt="" />
      </div>
      <div className="w-[70%] p-5">
        <h2>{product?.name}</h2>
        <p>
          price :{" "}
          <strong>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product?.price)}
          </strong>
        </p>

        <h2> size :</h2>
        <div className="flex gap-3 ">
          {listSize?.map((item, index) => (
            <div
              key={index}
              className={`w-10 h-10 bg-orange-200 flex items-center justify-center ${
                size === item.value ? "border-2 border-orange-300" : null
              }`}
              onClick={() => setSize(item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>

        <h2>số lượng</h2>
        <div className="quantity select-none flex gap-x-3 my-5 border border-black rounded-lg w-40 items-center justify-between px-5 py-2">
          <div className="" onClick={() => updateQuantity("giam")}>
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
                d="M19.5 12h-15"
              />
            </svg>
          </div>
          <div>{quantity}</div>
          <div onClick={() => updateQuantity("tang")}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>

        <button onClick={() => addToCarts()}>thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default DetailProduct;
