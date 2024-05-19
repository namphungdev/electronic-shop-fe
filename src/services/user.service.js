import { USER_API } from "@/config";
import { http } from "@/utils";
export const userService = {
  getProfile: () => http.get(`${USER_API}`),

  register: (data) => http.post(`${USER_API}/register`, data),

  updateInfo: (data) => http.patch(`${USER_API}`, data),

  resetPassword: (data) => http.post(`${USER_API}/reset-password`, data),

  changePassword: (data) => http.post(`${USER_API}/change-password`, data),

  changePasswordByCode: (data) =>
    http.post(`${USER_API}/change-password-by-code`, data),

  // ==== address ====
  getAddress: (query = "") => http.get(`${USER_API}/address${query}`),

  getAddressDetail: (_id) => http.get(`${USER_API}/address/${_id}`),

  addAddress: (data) => http.post(`${USER_API}/address`, data),

  editAddress: (_id, data) => http.patch(`${USER_API}/address/${_id}`, data),

  deleteAddress: (_id) => http.delete(`${USER_API}/address/${_id}`),

  // =====payment====
  getPayment: (query = "") => http.get(`${USER_API}/payment${query}`),

  getPaymentDetail: (_id) => http.get(`${USER_API}/payment/${_id}`),

  addPayment: (data) => http.post(`${USER_API}/payment`, data),

  editPayment: (_id, data) => http.patch(`${USER_API}/payment/${_id}`, data),

  deletePayment: (_id) => http.delete(`${USER_API}/payment/${_id}`),
};
