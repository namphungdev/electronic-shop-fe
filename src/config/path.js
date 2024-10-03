const PROFILE = '/ca-nhan';

export const PATH = {
  home: '/',
  admin: '/admin',

  // list
  branchManagement: '/admin/branch-cms-management',
  branchCategory: '/admin/branch-category-cms-management',
  categoriesManagement: '/admin/category-cms-management',
  typeProductsManagement: '/admin/type-product-cms-management',
  subProductCategoryList: '/admin/sub-product-category-cms-management',
  productList: '/admin/product-list-cms-management',

  // edit
  categoriesCMSDetail: '/admin/detail-categories/edit',
  brandCMSDetail: '/admin/detail-brand/edit',
  typeProductsCMSDetail: '/admin/detail-type-products/edit',
  brandCategoryCMSDetail: '/admin/detail-brand-category/edit',
  subProductCategoryDetail: '/admin/sub-product-category-cms-management/edit',
  productListDetail: '/admin/product-list-cms-management/edit',

  // add
  brandCategoryAddCMS: '/admin/add-brand-category',
  brandAddCMS: '/admin/add-brand',
  categoriesAddCMS: '/admin/add-categories',
  typeProductsAddCMS: '/admin/add-type-products',
  subProductCategoryAddCMS: '/admin/add-sub-product-category',
  productListAddCMS: '/admin/add-product-list',

  error: '/404',
  products: '/san-pham',
  sale: '/sale',
  search: '/search',
  productDetail: '/chi-tiet/:slug',
  category: '/:slug/:id',
  viewCart: '/gio-hang',
  checkout: '/checkout',
  orderCompleted: '/dat-hang-thanh-cong',
  profile: {
    index: PROFILE,

    order: PROFILE + '/don-hang',
    orderDetail: PROFILE + '/don-hang/:id',

    wishList: PROFILE + '/san-pham-yeu-thich',

    address: PROFILE + '/so-dia-chi',
    editAddress: PROFILE + '/so-dia-chi/edit/:id',
    newAddress: PROFILE + '/so-dia-chi/new',

    payment: PROFILE + '/so-thanh-toan',
    newPayment: PROFILE + '/so-thanh-toan/new',
    editPayment: PROFILE + '/so-thanh-toan/edit/:id',
  },
  faq: 'faq',
  contact: 'lien-he',
  about: 'gioi-thieu',
  auth: '/signin',
  resetPassword: '/reset-password',
  authCMS: '/signin-cms'
};
