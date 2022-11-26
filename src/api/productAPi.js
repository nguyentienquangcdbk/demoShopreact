import axiosClient from "./axiosClient";

const productAPi = {
  getAll(params) {
    const url = "/product";
    return axiosClient.get(url, { params });
  },
  getId(id) {
    return axiosClient.get(`/product/${id}`);
  },
  add(data) {
    return axiosClient.post("/product", data);
  },
  update(id, data) {
    return axiosClient.patch(`/product/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/product/${id}`);
  },
};

export default productAPi;
