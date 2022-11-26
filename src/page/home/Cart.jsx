import React from "react";
import { useCart } from "../../store/cart";
import { URLS } from "../../unitl/env";

const Cart = () => {
  const itemCart = useCart((state) => state.itemCart);
  const decrementAnItem = useCart((state) => state.decrementAnItem);
  const incrementByAmount = useCart((state) => state.incrementByAmount);
  const removeCart = useCart((state) => state.removeCart);
  const quantity = itemCart.reduce((result, prod) => {
    return result + prod.quantity;
  }, 0);
  const total = itemCart.reduce((result, prod) => {
    return result + Number(prod.price) * prod.quantity;
  }, 0);

  const handleDe = (id) => {
    decrementAnItem(id);
  };
  const handleIn = (id) => {
    incrementByAmount(id);
  };
  const handleRemove = (id) => {
    removeCart(id);
  };
  return (
    <div className=" items-start gap-x-5">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] uiTable">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-start py-3 font-semibold">img</th>
              <th className="text-start py-3 font-semibold">name</th>
              <th className="text-start py-3 font-semibold">price</th>
              <th className="text-start py-3 font-semibold">số lượng</th>
              <th className="text-start py-3 font-semibold">xóa</th>
            </tr>
          </thead>
          <tbody>
            {itemCart.map((item, index) => (
              <tr className="border-b border-b-gray-100 p-3">
                <td>
                  <img
                    src={URLS + item.img}
                    className="w-10 h-10 object-cover rounded-lg"
                    alt=""
                  />
                </td>
                <td>
                  <h1 className="truncate text-lg font-medium">{item.name}</h1>
                </td>
                <td>
                  <p>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item?.price)}
                  </p>
                </td>
                <td>
                  <div className="flex select-none gap-x-4 border mx-3 border-gray-200 rounded-lg items-center justify-between p-2 text-xl font-semibold ">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDe(item.idCart)}
                    >
                      -
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleIn(item.idCart)}
                    >
                      +
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    onClick={() => handleRemove(item.idCart)}
                    className="w-10 h-10 bg-red-400 text-white cursor-pointer flex items-center justify-center rounded-lg bg-opacity-50"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[300px]">
        <h1>tổng sản phẩm : {quantity}</h1>
        <h2>
          tổng giá :{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
