import { REVIEW_API } from "@/config";
import { http } from "@/utils";

export const reviewService = {
  getReview: (id, query = "") => http.get(`${REVIEW_API}/${id}${query}`),
  postReview: (id, data) => http.post(`${REVIEW_API}/${id}`, data),
};
