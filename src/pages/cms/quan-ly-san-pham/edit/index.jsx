import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditProducts = () => {
  const navigate = useNavigate()
  const [productId, setProductId] = useState('');
  const [inputProductCode, setInputProductCode] = useState('');
  const [inputProductName, setInputProductName] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    const brandIdFromStorage = localStorage.getItem('product-type-slug');
    if (brandIdFromStorage) {
      setProductId(brandIdFromStorage);
    }
  }, []);

  const {
    data: { data: getProductDetailList = {} } = {},
    loading: loadingProductDetail,
  } = useQuery({
    queryKey: `product-detail-page-${JSON.stringify(productId)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      cmsTitles.getProductsDetail(productId, signal),
  });

  useEffect(() => {
    if (getProductDetailList.name !== undefined || getProductDetailList.code !== undefined) {
      setInputProductCode(getProductDetailList.code);
      setInputProductName(getProductDetailList.name);
      setProductStatus(getProductDetailList.status || '')
    }
  }, [getProductDetailList]);

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'productName':
        if (nameError) {
          setNameError('');
        }
        setInputProductName(value);
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
    if (!inputProductName) {
      setNameError('Tên loại sản phẩm không được để trống');
      return;
    }
    const params = {
      id: productId,
      code: inputProductCode,
      name: inputProductName,
      status: productStatus
    }
    try {
      const res = await cmsTitles.updateProducts(params)
      if (res && res.result && res.code == 200) {
        navigate(PATH.productsManagement)
        toast.success('Chỉnh sửa loại sản phẩm thành công')
      }
    } catch (error) {
      toast.error(res.message)
    }
  };

  return (
    <>
      <Space className='my-3'>
        <h3>Chỉnh sửa loại sản phẩm</h3>
      </Space>

      {loadingProductDetail ? (
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

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Mã loại sản phẩm *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Mã loại sản phẩm'
                        type="text"
                        name="productCode"
                        id="productCode"
                        disabled
                        value={inputProductCode}
                        onChange={handleInputChange('productCode')}
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tên loại sản phẩm *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Tên loại sản phẩm'
                        type="text"
                        name="productName"
                        id="productName"
                        value={inputProductName}
                        onChange={handleInputChange('productName')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                      {nameError && <div className="text-red-500">{nameError}</div>}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
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

                <div className="col-12 d-flex justify-center">
                  <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                  <Button danger htmlType="button" onClick={() => navigate(PATH.productsManagement)}>HỦY</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  )
}

export default EditProducts