import { ORGANIZATION_API } from "@/config";
import { http } from "@/utils";

export const organizationService = {
  postContact: (data) => http.post(`${ORGANIZATION_API}/contact`, data),
};
