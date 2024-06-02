import { AUTH_API, AUTH_API_HHB } from "@/config";
import { http } from "@/utils";

export const authService = {
  // login: (form) => http.post(`${AUTH_API}/login`, form),
  login: (form) => http.post(`${AUTH_API_HHB}/login`, form),

  ListRoles: (param) => http.get(`${AUTH_API_HHB}/list-roles/${param.pageIndex}/${param.pageSize}?keyword=${param.keyword}`),

  loginByCode: (code) => http.post(`${AUTH_API}/login-by-code`, code),

  refreshToken: (data) => http.post(`${AUTH_API}/refresh-token`, data),
};
