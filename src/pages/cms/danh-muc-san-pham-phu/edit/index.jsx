import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditSubProductCategoryList = () => {
  const navigate = useNavigate()
  const [subId, setSubId] = useState('');
  const [subProductCategoryCode, setSubProductCategoryCode] = useState('');
  const [subProductCategoryName, setSubProductCategoryName] = useState('');
  const [subProductCategoryStatus, setSubProductCategoryStatus] = useState('ACTIVE');
  const [productCategory, setProductCategory] = useState('');
  const [nameError, setNameError] = useState('');
  const [productCategoryError, setProductCategoryError] = useState('');

  const {
    data: { data: dropdownProductCategory = [] } = {}
  } = useQuery({
    queryKey: `get-dropdown-product-category`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownProductCategory('gach-op-lat'),
  });

  useEffect(() => {
    const idFromStorage = localStorage.getItem('sub-product-category-slug');
    if (idFromStorage) {
      setSubId(idFromStorage);
    }
  }, []);

  const {
    data: { data: getSubProCategoryDetail = {} } = {},
    loading: loadingSubProCategoryDetail,
  } = useQuery({
    queryKey: `sub-pro-category-${JSON.stringify(subId)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      cmsTitles.getSubProductCategoryDetail(subId, signal),
  });

  useEffect(() => {
    if (getSubProCategoryDetail?.name || getSubProCategoryDetail?.code) {
      setSubProductCategoryCode(getSubProCategoryDetail.code);
      setSubProductCategoryName(getSubProCategoryDetail.name);
      setSubProductCategoryStatus(getSubProCategoryDetail.status || 'ACTIVE');
      setProductCategory(getSubProCategoryDetail.productCategoryCode || 'sen-tam');
    }
  }, [getSubProCategoryDetail]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!subProductCategoryName) {
      setNameError('Tên danh mục sản phẩm phụ không được để trống');
      return;
    }

    if (!productCategory) {
      setProductCategoryError('Danh mục sản phẩm không được để trống');
      return;
    }

    const params = {
      id: subId,
      code: subProductCategoryCode,
      name: subProductCategoryName,
      productCategoryCode: productCategory,
      status: subProductCategoryStatus
    }

    try {
      const res = await cmsTitles.updateSubProductCategory(params);

      if (res.result && res.code === 200) {
        navigate(PATH.subProductCategoryList);
        toast.success('Chỉnh sửa danh mục sản phẩm phụ thành công');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error('Chỉnh sửa danh mục sản phẩm phụ thất bại');
      toast.error(error.message);
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'subProductCategoryName':
        if (nameError) {
          setNameError('');
        }
        setSubProductCategoryName(value);
        break;
      case 'productCategory':
        if (productCategoryError) {
          setProductCategoryError('');
        }
        setProductCategory(value);
        break;
      case 'subProductCategoryStatus':
        setSubProductCategoryStatus(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Space className='my-3'>
        <h3>Chỉnh sửa danh mục sản phẩm phụ</h3>
      </Space>
      {loadingSubProCategoryDetail ?
        (
          <div className="loading-spin">
            <Loading />
          </div>
        ) :
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="select-none"
        >
          <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
            <div className="p-6">
              <div className="row">

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Mã danh mục sản phẩm phụ *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Mã danh mục sản phẩm phụ'
                        type="text"
                        name="subProductCategoryCode"
                        id="subProductCategoryCode"
                        disabled
                        value={subProductCategoryCode}
                        onChange={handleInputChange('subProductCategoryCode')}
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tên danh mục sản phẩm phụ *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Tên danh mục sản phẩm phụ'
                        type="text"
                        name="subProductCategoryName"
                        id="subProductCategoryName"
                        value={subProductCategoryName}
                        onChange={handleInputChange('subProductCategoryName')}
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
                    <label htmlFor="subProductCategoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="subProductCategoryStatus"
                      value={subProductCategoryStatus}
                      onChange={handleInputChange('subProductCategoryStatus')}
                    >
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="INACTIVE">Không hoạt động</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 d-flex justify-center">
                  <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                  <Button danger htmlType="button" onClick={() => navigate(PATH.subProductCategoryList)}>HỦY</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  )
}

export default EditSubProductCategoryList