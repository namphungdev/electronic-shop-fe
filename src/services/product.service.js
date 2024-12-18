import { PRODUCT_API, CATEGORY_API_HHB, PRODUCT_API_HHB, CMS_API_HHB } from '@/config';
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

  productListDiscounted: (listDiscount, signal) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-list-discounted-price`, listDiscount, {
      signal,
    }),

  getBreakcumb: (breakcumb) =>
    http.post(`${CATEGORY_API_HHB}/categorys/get-web-breakcumb-list`, breakcumb),

  webGetProductList: (paramList, signal) =>
    http.post(`${PRODUCT_API_HHB}/web-get-product-list`, paramList, {
      signal,
    }),
}

export const cmsTitles = {
  // email 

  sendEmail: (param) => http.post(`https://nhumaidao.somee.com/api/upload/send-mail-contact`, param),

  // dropdown
  getDropdownBrand: () =>
    http.get(`${CMS_API_HHB}/get-dropdown-brand`),

  getDropdownBrandCategory: () =>
    http.get(`${CMS_API_HHB}/get-dropdown-brand-category`),

  getDropdownProductType: () =>
    http.get(`${CMS_API_HHB}/get-dropdown-product-type`),

  getDropdownProductCategory: (code) =>
    http.get(`${CMS_API_HHB}/get-dropdown-product-category?code=${code}`),

  getDropdownProductCategory2: (code, boolean) =>
    http.get(`${CMS_API_HHB}/get-dropdown-product-category?code=${code}&isPageProduct=${boolean}`),

  getDropdownSubProductCategory: (code, boolean) =>
    http.get(`${CMS_API_HHB}/get-dropdown-sub-product-category?code=${code}`),

  // Branch
  getBranchList: (branch, signal) =>
    http.post(`${CMS_API_HHB}/get-brand-list`, branch, {
      signal,
    }),

  deleteBranch: (id) =>
    http.delete(`${CMS_API_HHB}/delete-brand/${id}`),

  insertBrand: (brandList, signal) =>
    http.post(`${CMS_API_HHB}/insert-brand`, brandList, {
      signal,
    }),

  updateBrand: (brandList, signal) =>
    http.put(`${CMS_API_HHB}/update-brand`, brandList, {
      signal,
    }),

  getBranDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-brand-detail/${slug}`),

  // Danh mục sản phẩm

  getProductCategoryList: (param, signal) =>
    http.post(`${CMS_API_HHB}/get-product-category-list`, param, {
      signal,
    }),

  insertProductCategory: (param, signal) =>
    http.post(`${CMS_API_HHB}/insert-product-category`, param, {
      signal,
    }),

  deleteProductCategory: (id) =>
    http.delete(`${CMS_API_HHB}/delete-product-category/${id}`),

  getProductCategoryDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-product-category-detail/${slug}`),

  updateProductCategory: (param, signal) =>
    http.put(`${CMS_API_HHB}/update-product-category`, param, {
      signal,
    }),

  // Danh mục thương hiệu

  getBrandCategoryList: (param, signal) =>
    http.post(`${CMS_API_HHB}/get-brand-category-list`, param, {
      signal,
    }),

  insertBrandCategory: (param, signal) =>
    http.post(`${CMS_API_HHB}/insert-brand-category`, param, {
      signal,
    }),

  deleteBrandCategory: (id) =>
    http.delete(`${CMS_API_HHB}/delete-brand-category/${id}`),

  getBrandCategoryDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-brand-category-detail/${slug}`),

  updateBrandCategory: (param, signal) =>
    http.put(`${CMS_API_HHB}/update-brand-category`, param, {
      signal,
    }),

  // Loại sản phẩm

  getTypeProductList: (param, signal) =>
    http.post(`${CMS_API_HHB}/get-product-type-list`, param, {
      signal,
    }),

  insertTypeProducts: (param, signal) =>
    http.post(`${CMS_API_HHB}/insert-product-type`, param, {
      signal,
    }),

  deleteTypeProduct: (id) =>
    http.delete(`${CMS_API_HHB}/delete-product-type/${id}`),

  getTypeProductsDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-product-type-detail/${slug}`),

  updateTypeProducts: (param, signal) =>
    http.put(`${CMS_API_HHB}/update-product-type`, param, {
      signal,
    }),

  // Danh mục sản phẩm phụ 

  getSubProductCategoryList: (param, signal) =>
    http.post(`${CMS_API_HHB}/get-sub-product-category-list`, param, {
      signal,
    }),

  insertSubProductCategory: (param, signal) =>
    http.post(`${CMS_API_HHB}/insert-sub-product-category`, param, {
      signal,
    }),

  deleteSubProductCategory: (id) =>
    http.delete(`${CMS_API_HHB}/delete-sub-product-category/${id}`),

  getSubProductCategoryDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-sub-product-category-detail/${slug}`),

  updateSubProductCategory: (param, signal) =>
    http.put(`${CMS_API_HHB}/update-sub-product-category`, param, {
      signal,
    }),

  // Danh sách sản phẩm

  getProductList: (param, signal) =>
    http.post(`${CMS_API_HHB}/get-product-list`, param, {
      signal,
    }),

  insertAddProduct: (param, signal) =>
    http.post(`${CMS_API_HHB}/insert-product`, param, {
      signal,
    }),

  getProductListDetail: (slug) =>
    http.get(`${CMS_API_HHB}/get-product-detail/${slug}`),

  updateProductList: (param, signal) =>
    http.put(`${CMS_API_HHB}/update-product`, param, {
      signal,
    }),

  deleteProductList: (id) =>
    http.delete(`${CMS_API_HHB}/delete-product/${id}`),

}

export const setImageRoom = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await http.post('https://nhumaidao.somee.com/api/upload/upload-imagae', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 204) {
      console.error('File uploaded successfully, but no content returned.');
      return null;
    }

    return response;
  } catch (error) {
    if (error.response) {
      console.error('Error uploading image:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};