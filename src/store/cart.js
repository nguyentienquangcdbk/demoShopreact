import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
export const useCart = create((set) => ({
  itemCart: items,

  addToCart: (item) => {
    set((state) => {
      const isPresent = state.itemCart.find(
        (x) => x.id === item.id && x.size === item.size
      );
      if (!isPresent) {
        const listItemCart = [...state.itemCart, { idCart: uuidv4(), ...item }];
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            listItemCart.sort((a, b) =>
              a.id > b.id ? 1 : a.id < b.id ? -1 : 0
            )
          )
        );
        return {
          itemCart: listItemCart,
        };
      }
      const updateCart = state.itemCart.map((ite) =>
        ite.id === item.id && ite.size === item.size
          ? { ...ite, quantity: ite.quantity + item.quantity }
          : ite
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          updateCart.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
      return {
        itemCart: updateCart,
      };
    });
  },
  decrementAnItem: (cartId) => {
    set((state) => {
      const updateCart = state.itemCart.map((item) =>
        item.idCart === cartId
          ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 }
          : item
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          updateCart.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
      return {
        itemCart: updateCart,
      };
    });
  },
  incrementByAmount: (cartId) => {
    set((state) => {
      const updateCart = state.itemCart.map((item) =>
        item.idCart === cartId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          updateCart.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
      return {
        itemCart: updateCart,
      };
    });
  },
  removeCart: (cartId) => {
    set((state) => {
      console.log(cartId);
      const remove = state.itemCart.filter((x) => x.idCart !== cartId);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          remove.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
      return {
        itemCart: remove,
      };
    });
  },
}));
