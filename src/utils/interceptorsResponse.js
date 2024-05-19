import { authService } from "@/services/auth.service";
import { getToken, setToken } from "./storage";

let refreshTokenPromise = null;

export function interceptorsResponse(http) {
  http.interceptors.response.use(
    (res) => res?.data || res,
    async (error) => {
      try {
        if (
          error?.response?.status === 403 &&
          error?.response?.data?.error_code === "TOKEN_EXPIRED"
        ) {
          if (refreshTokenPromise) {
            await refreshTokenPromise;
          } else {
            const token = getToken();//refreshToken accessToken
            refreshTokenPromise = authService.refreshToken({
              refreshToken: token?.refreshToken,
            });
            const res = await refreshTokenPromise;
            setToken(res?.data);
            refreshTokenPromise = null;
          }
          return http(error?.config);
        }
      } catch (err) {
        console.log("err :>> ", err);
      }

      throw error;
    }
  );
}
