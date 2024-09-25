const PROFILE = '/ca-nhan';

export const PATH = {
  home: '/',
  admin: '/admin',

  // usersManagement: '/admin/user-cms-management',
  // permissionUsers: '/admin/permission-cms-users',

  // list
  branchManagement: '/admin/branch-cms-management',
  branchCategory: '/admin/branch-category-cms-management',
  categoriesManagement: '/admin/category-cms-management',
  productsManagement: '/admin/product-cms-management',

  // edit
  categoriesCMSDetail: '/admin/detail-categories/edit',
  brandCMSDetail: '/admin/detail-brand/edit',
  productsCMSDetail: '/admin/detail-products/edit',
  brandCategoryCMSDetail: '/admin/detail-brand-category/edit',

  // add
  brandCategoryAddCMS: '/admin/add-brand-category',
  brandAddCMS: '/admin/add-brand',
  categoriesAddCMS: '/admin/add-categories',
  productsAddCMS: '/admin/add-products',

  error: '/404',
  products: '/san-pham',
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
  search: 'search',
  contact: 'lien-he',
  about: 'gioi-thieu',
  auth: '/signin',
  resetPassword: '/reset-password',
  authCMS: '/signin-cms'
};
