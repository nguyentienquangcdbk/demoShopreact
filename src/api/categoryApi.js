import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params) {
    const url = "/category";
    return axiosClient.get(url, { params });
  },
  getId(id) {
    return axiosClient.get(`/category/${id}`);
  },
  add(data) {
    return axiosClient.post("/category", data);
  },
  update(id, data) {
    return axiosClient.patch(`/category/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/category/${id}`);
  },
};

export default categoryApi;
