import { CART_API } from "@/config";
import { http } from "@/utils";

export const cartService = {
  getCart: (query = "") => http.get(`${CART_API}${query}`),
  updateQuantity: (id, data) => http.patch(`${CART_API}/${id}`, data),
  removeItem: (id) => http.delete(`${CART_API}/${id}`),
  preCheckout: (data) => http.post(`${CART_API}/pre-checkout`, data),
  getPromotion: (code) => http.get(`${CART_API}/promotion/${code}`),
  getShippingMethod: () => http.get(`${CART_API}/shipping-method`),
  checkout: (data) => http.post(`${CART_API}/checkout`, data),
};
