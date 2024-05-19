import { PRODUCT_API, CATEGORY_API_HHB, PRODUCT_API_HHB } from '@/config';
import { http } from '@/utils';

export const productService = {
  getProducts: (query = '', signal) =>
    http.get(`${PRODUCT_API}${query}`, { signal }),

  getProductDetail: (id) => http.get(`${PRODUCT_API}/${id}`),

  getCategories: (signal) => http.get(`${PRODUCT_API}/categories`, { signal }),
  getCategoryDetail: (id, signal) =>
    http.get(`${PRODUCT_API}/categories/${id}`, { signal }),

  getWishlist: (query = '', signal) =>
    http.get(`${PRODUCT_API}/wishlist${query}`, { signal }),

  addWishlist: (productID, signal) =>
    http.post(`${PRODUCT_API}/wishlist/${productID}`, { signal }),

  removeWishlist: (productID, signal) =>
    http.delete(`${PRODUCT_API}/wishlist/${productID}`, { signal }),
};

export const productServiceHHB = {
  getListMostProductHHB: (signal) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-list-most-view`, { signal }),

  getProductsHHB: (productParams, signal) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-list`, productParams, {
      signal,
    }),

  getProductDetailHHB: (slug) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-detail/${slug}`),

  getCategoriesHHB: (signal) =>
    http.get(`${CATEGORY_API_HHB}/get-web-category-list`, { signal }),
};
