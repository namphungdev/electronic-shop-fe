import { AUTH_API, AUTH_API_HHB } from "@/config";
import { http } from "@/utils";

export const authService = {
  // login: (form) => http.post(`${AUTH_API}/login`, form),
  login: (form) => http.post(`${AUTH_API_HHB}/login`, form),

  loginByCode: (code) => http.post(`${AUTH_API}/login-by-code`, code),

  refreshToken: (data) => http.post(`${AUTH_API}/refresh-token`, data),
};
