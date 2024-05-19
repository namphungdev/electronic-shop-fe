import { FILE_API } from "@/config";
import { http } from "@/utils";

export const fileService = {
  uploadFile: (data) => {
    const formData = new FormData();
    formData.set("file", data);
    return http.post(`${FILE_API}`, formData);
  },
};
