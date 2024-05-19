const PROFILE = '/ca-nhan';

export const PATH = {
  home: '/',
  products: '/san-pham',
  productDetail: '/:slug',
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
  shipping: '/shipping-and-return',
  faq: 'faq',
  contact: 'lien-he',
  about: 'gioi-thieu',
  auth: '/signin',
  resetPassword: '/reset-password',
};
