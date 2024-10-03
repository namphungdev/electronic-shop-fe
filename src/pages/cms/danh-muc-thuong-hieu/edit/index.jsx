import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditBrandCategory = () => {
  const navigate = useNavigate()
  const [brandCategoryId, setBrandCategoryId] = useState('');
  const [brandCategoryCode, setBrandCategoryCode] = useState('');
  const [brandCategoryName, setBrandCategoryName] = useState('');
  const [brandCategoryStatus, setBrandCategoryStatus] = useState('ACTIVE');
  const [productCategory, setProductCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [nameError, setNameError] = useState('');
  const [productCategoryError, setProductCategoryError] = useState('');
  const [brandError, setBrandError] = useState('');

  const {
    data: { data: dropdownBrand = [] } = {}
  } = useQuery({
    queryKey: `get-dropdown-brand`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownBrand(),
  });

  const {
    data: { data: dropdownProductCategory = [] } = {}
  } = useQuery({
    queryKey: `get-dropdown-product-category`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownProductCategory('thiet-bi-ve-sinh'),
  });

  useEffect(() => {
    const idFromStorage = localStorage.getItem('brand-category-id');
    if (idFromStorage) {
      setBrandCategoryId(idFromStorage);
    }
  }, []);

  const {
    data: { data: getBrandCategoryDetail = {} } = {},
    loading: loadingBrandCategoryDetail,
  } = useQuery({
    queryKey: `brand-category-${JSON.stringify(brandCategoryId)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      cmsTitles.getBrandCategoryDetail(brandCategoryId, signal),
  });

  useEffect(() => {
    if (getBrandCategoryDetail?.name || getBrandCategoryDetail?.code) {
      setBrandCategoryCode(getBrandCategoryDetail.code);
      setBrandCategoryName(getBrandCategoryDetail.name);
      setBrandCategoryStatus(getBrandCategoryDetail.status || 'ACTIVE');
      setProductCategory(getBrandCategoryDetail.productCategoryCode || 'voi-chau');
      setBrand(getBrandCategoryDetail.brandCode || caesar);
    }
  }, [getBrandCategoryDetail]);

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'brandCategoryName':
        if (nameError) {
          setNameError('');
        }
        setBrandCategoryName(value);
        break;
      case 'productCategory':
        if (productCategoryError) {
          setProductCategoryError('');
        }
        setProductCategory(value);
        break;
      case 'brand':
        if (brandError) {
          setBrandError('');
        }
        setBrand(value)
        break;
      case 'brandCategoryStatus':
        setBrandCategoryStatus(value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandCategoryName) {
      setNameError('Tên danh mục thương hiệu không được để trống');
      return;
    }

    if (!productCategory) {
      setProductCategoryError('Danh mục thương hiệu không được để trống');
      return;
    }

    if (!brand) {
      setBrandError('Thương hiệu không được để trống');
      return;
    }

    const params = {
      id: brandCategoryId,
      code: brandCategoryCode,
      name: brandCategoryName,
      productCategoryCode: productCategory,
      brandCode: brand,
      status: brandCategoryStatus
    }
    try {
      const res = await cmsTitles.updateBrandCategory(params)
      if (res && res.result && res.code == 200) {
        navigate(PATH.branchCategory)
        toast.success('Chỉnh sửa danh mục sản phẩm thành công')
      }else {
        throw new Error(res.message); 
      }
    } catch (error) {
      toast.error('Chỉnh sửa danh mục sản phẩm thất bại');
      toast.error(error.message); 
    }
  };

  return (
    <>
      <Space className='my-3'>
        <h3>Chỉnh sửa danh mục thương hiệu</h3>
      </Space>
      {loadingBrandCategoryDetail ? (
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
                      Mã danh mục thương hiệu *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Mã danh mục thương hiệu'
                        type="text"
                        name="brandCategoryCode"
                        id="brandCategoryCode"
                        disabled
                        value={brandCategoryCode}
                        onChange={handleInputChange('brandCategoryCode')}
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tên danh mục thương hiệu *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Tên danh mục sản phẩm'
                        type="text"
                        name="brandCategoryName"
                        id="brandCategoryName"
                        value={brandCategoryName}
                        onChange={handleInputChange('brandCategoryName')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                      {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="productCategory" className="block text-sm font-medium leading-6 text-gray-900">Danh mục sản phẩm</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="productCategory"
                      value={productCategory}
                      onChange={handleInputChange('productCategory')}
                    >
                      <option value="">Danh mục sản phẩm</option>
                      {dropdownProductCategory.map((item) => (
                        <option key={item.id} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {productCategoryError && <p className="text-red-500 text-sm mt-1">{productCategoryError}</p>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">Thương hiệu</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="brand"
                      value={brand}
                      onChange={handleInputChange('brand')}
                    >
                      <option value="">Thương hiệu</option>
                      {dropdownBrand.map((item) => (
                        <option key={item.id} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {brandError && <p className="text-red-500 text-sm mt-1">{brandError}</p>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="brandCategoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="brandCategoryStatus"
                      value={brandCategoryStatus}
                      onChange={handleInputChange('brandCategoryStatus')}
                    >
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="INACTIVE">Không hoạt động</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 d-flex justify-center">
                  <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                  <Button danger htmlType="button" onClick={() => navigate(PATH.branchCategory)}>HỦY</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  )
}

export default EditBrandCategory