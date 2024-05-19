import { ORDER_API } from "@/config";
import { http } from "@/utils";

export const orderService = {
  getAllOrder: (query = "", signal) => http.get(`${ORDER_API}${query}`, signal),
  getOrderDetail: (id, signal) => http.get(`${ORDER_API}/${id}`, signal),
  count: (query = "") => http.get(`${ORDER_API}/count${query}`),
};
