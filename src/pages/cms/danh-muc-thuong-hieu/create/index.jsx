import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cmsTitles } from '@/services/product.service';
import { PATH } from '@/config';
import useQuery from '@/hooks/useQuery';

// Character map for converting Vietnamese characters to non-accented equivalents
const characterMap = {
  'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'đ': 'd',
  'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y'
};

// Function to convert Vietnamese characters to non-accented equivalents
const convertVietnameseToNonAccented = (str) => {
  return str
    .split('')
    .map(char => characterMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/ /g, '-');
};

const AddBrandCategory = () => {
  const navigate = useNavigate()
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

  const onSubmit = async (e) => {
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
      code: brandCategoryCode,
      name: brandCategoryName,
      productCategoryCode: productCategory,
      brandCode: brand,
      status: brandCategoryStatus
    }
    try {
      const res = await cmsTitles.insertBrandCategory(params);

      if (res.result && res.code === 200) {
        navigate(PATH.branchCategory);
        toast.success('Thêm danh mục thương hiệu thành công');
      } else {
        throw new Error(res.message); 
      }
    } catch (error) {
      toast.error('Thêm danh mục thương hiệu thất bại');
      toast.error(error.message); 
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'brandCategoryName':
        if (nameError) {
          setNameError('');
        }
        setBrandCategoryName(value);
        const codeConvert = convertVietnameseToNonAccented(value);
        setBrandCategoryCode(codeConvert);
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

  return (
    <>
      <Space className='my-3'>
        <h3>Thêm danh mục thương hiệu</h3>
      </Space>
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
    </>
  )
}

export default AddBrandCategory