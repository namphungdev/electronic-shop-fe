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

  getProductsList: (productsListParam, signal) =>
    http.post(`${PRODUCT_API_HHB}/get-product-list`, productsListParam, {
      signal,
    }),

  insertProduct: (productsListInsert, signal) =>
    http.post(`${PRODUCT_API_HHB}/insert-product`, productsListInsert, {
      signal,
    }),

  updateProduct: (productsListUpdate, signal) =>
    http.put(`${PRODUCT_API_HHB}/update-product`, productsListUpdate, {
      signal,
    }),

  getProductDetailCMS: (slug) =>
    http.get(`${PRODUCT_API_HHB}/get-product-detail/${slug}`),

  deleteProducts: (code) =>
    http.put(`${PRODUCT_API_HHB}/delete-product/${code}`),

  // categories

  getCategoriesHHB: (signal) =>
    http.get(`${CATEGORY_API_HHB}/get-web-category-list`, { signal }),

  getCategoriesList: (categoriesListParam, signal) =>
    http.post(`${CATEGORY_API_HHB}/get-category-list`, categoriesListParam, {
      signal,
    }),

  deleteCategories: (code) =>
    http.delete(`${CATEGORY_API_HHB}/delete-category/${code}`),

  getCategoryDetailCMS: (code) =>
    http.get(`${CATEGORY_API_HHB}/get-category-detail/${code}`),

  insertCategory: (categoriesListInsert, signal) =>
    http.post(`${CATEGORY_API_HHB}/insert-category`, categoriesListInsert, {
      signal,
    }),

  updateCategory: (categoriesListUpdate, signal) =>
    http.put(`${CATEGORY_API_HHB}/update-category`, categoriesListUpdate, {
      signal,
    }),

  // product 
};

// Gạch 315

export const productTiles = {
  getProductTypeList: () =>
    http.get(`${CATEGORY_API_HHB}/get-web-product-type-list`),

  getCategoryList: (code, signal) => {
    http.get(`${CATEGORY_API_HHB}/get-web-product-category-list?ProductTypeCode=${code}`, {
      signal,
    })
  },

  productListDiscounted: (listDiscount, signal) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-list-discounted-price`, listDiscount, {
      signal,
    }),
}
