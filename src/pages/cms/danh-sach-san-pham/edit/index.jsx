import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles, productTiles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditProductListCMS = () => {
  const navigate = useNavigate()
  const [productId, setProductId] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [subProductCategory, setSubProductCategory] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [price, setPrice] = useState('');
  const [percentDiscount, setPercentDiscount] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [dropdownProductCategory, setDropdownProductCategory] = useState([]);
  const [dropdownSubProductCategory, setDropdownSubProductCategory] = useState([]);

  const [productStatus, setProductStatus] = useState('ACTIVE');

  const [nameError, setNameError] = useState('');
  const [productTypeError, setProductTypeError] = useState('');
  const [productCategoryError, setProductCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    const idFromStorage = localStorage.getItem('product-edit-slug');
    if (idFromStorage) {
      setProductId(idFromStorage);
    }
  }, []);

  const {
    data: { data: getProductDetail = {} } = {},
    loading: loadingProductDetail,
  } = useQuery({
    queryKey: `product-list-${JSON.stringify(productId)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      cmsTitles.getProductListDetail(productId, signal),
  });

  useEffect(() => {
    if (getProductDetail?.name || getProductDetail?.code) {
      setProductCode(getProductDetail.code);
      setProductName(getProductDetail.name);
      setProductStatus(getProductDetail.status || 'ACTIVE');
    }
  }, [getProductDetail]);

  const {
    data: { data: productTypeList = [] } = {}
  } = useQuery({
    queryKey: `get-product-type-list`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownProductType(),
  });


  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'productName':
        if (nameError) {
          setNameError('');
        }
        setProductName(value);
        break;
      case 'productStatus':
        setProductStatus(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!productCategoryName) {
    //   setNameError('Tên danh mục sản phẩm không được để trống');
    //   return;
    // }
    // if (!productType) {
    //   setProductTypeError('Loại sản phẩm không được để trống');
    //   return;
    // }

    // const params = {
    //   id: productCategoryId,
    //   code: productCategoryCode,
    //   name: productCategoryName,
    //   productType: productType,
    //   isSub: isSub,
    //   status: productCategoryStatus
    // }
    // try {
    //   const res = await cmsTitles.updateProductCategory(params)
    //   if (res && res.result && res.code == 200) {
    //     await navigate(PATH.categoriesManagement)
    //     await toast.success('Chỉnh sửa danh mục sản phẩm thành công')
    //   } else {
    //     throw new Error(res.message);
    //   }
    // } catch (error) {
    //   toast.error('Chỉnh sửa danh mục sản phẩm thất bại');
    //   toast.error(error.message);
    // }
  };

  return (
    <><Space className='my-3'>
      <h3>Chỉnh sửa sản phẩm</h3>
    </Space>
      {loadingProductDetail ?
        (
          <div className="loading-spin">
            <Loading />
          </div>
        ) :
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="select-none"
        >
          <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
            <div className="p-6">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Mã sản phẩm *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Mã sản phẩm'
                        type="text"
                        name="productCode"
                        id="productCode"
                        disabled
                        value={productCode}
                        onChange={handleInputChange('productCode')}
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tên sản phẩm *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Tên sản phẩm'
                        type="text"
                        name="productName"
                        id="productName"
                        value={productName}
                        onChange={handleInputChange('productName')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                      {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="isPublished" className="block text-sm font-medium leading-6 text-gray-900">Xuất bản</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="isPublished"
                      value={isPublished}
                      onChange={handleInputChange('isPublished')}
                    >
                      <option value={true}>Có</option>
                      <option value={false}>Không</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="productType" className="block text-sm font-medium leading-6 text-gray-900">Loại sản phẩm</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="productType"
                      value={productType}
                      onChange={handleInputChange('productType')}
                    >
                      <option value="" disabled>Loại sản phẩm</option>
                      {productTypeList && productTypeList.map((item) => (
                        <option key={item.id} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {productTypeError && <p className="text-red-500 text-sm mt-1">{productTypeError}</p>}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="productCategory" className="block text-sm font-medium leading-6 text-gray-900">Danh mục sản phẩm</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="productCategory"
                      value={productCategory}
                      onChange={handleInputChange('productCategory')}
                    >
                      <option value="">Danh mục sản phẩm</option>
                      {dropdownProductCategory && dropdownProductCategory?.map((item) => (
                        <option key={item.id} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {productCategoryError && <p className="text-red-500 text-sm mt-1">{productCategoryError}</p>}
                  </div>
                </div>
                {/* 
                {dropdownProductCategory && dropdownProductCategory?.find((item) => item.isSub == true) ?
                  (
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="subProductCategory" className="block text-sm font-medium leading-6 text-gray-900">Danh mục sản phẩm phụ</label>
                        <select
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                          id="subProductCategory"
                          value={subProductCategory}
                          onChange={handleInputChange('subProductCategory')}
                        >
                          {dropdownSubProductCategory && dropdownSubProductCategory.length === 0 ? (
                            <option value={null} disabled>Chưa có dữ liệu nào</option>
                          ) : (
                            <>
                              <option value="">Danh mục sản phẩm phụ</option>
                              {dropdownSubProductCategory && dropdownSubProductCategory.map((item) => (
                                <option key={item.id} value={item.code}>
                                  {item.name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  ) : null
                }
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Giá niêm yết
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Giá niêm yết'
                        type="text"
                        name="price"
                        id="price"
                        value={price}
                        onChange={handleInputChange('price')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                      {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Phần trăm giảm giá
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Phần trăm giảm giá'
                        type="text"
                        name="percentDiscount"
                        id="percentDiscount"
                        value={percentDiscount}
                        onChange={handleInputChange('percentDiscount')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Giá sau khi giảm
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Giá sau khi giảm'
                        type="text"
                        disabled
                        name="discountedPrice"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={handleInputChange('discountedPrice')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="productStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="productStatus"
                      value={productStatus}
                      onChange={handleInputChange('productStatus')}
                    >
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="INACTIVE">Không hoạt động</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className="form-group">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Mô tả</label>
                  </div>
                </div> */}
                <div className="col-12 d-flex justify-center">
                  <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                  <Button danger htmlType="button" onClick={() => navigate(PATH.productList)}>HỦY</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }

    </>
  )
}

export default EditProductListCMS