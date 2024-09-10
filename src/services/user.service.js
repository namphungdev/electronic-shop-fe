import { AUTH_API_HHB, USER_API, USER_API_HHB } from "@/config";
import { http } from "@/utils";
export const userService = {

  // user cms
  // getProfile: () => http.get(`${USER_API_HHB}`),

  getUsersList: (param) => http.get(`${AUTH_API_HHB}/list-users/${param.pageIndex}/${param.pageSize}?keyword=${param.keyword}&status=${param.status}`),

  // user cms
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
