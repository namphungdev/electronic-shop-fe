import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cmsTitles, productServiceHHB } from '@/services/product.service';
import { useCategoriesHHB } from '@/hooks/useCategories';
import { PATH } from '@/config';

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

const AddProducts = () => {
  const navigate = useNavigate()
  const [inputProductCode, setInputProductCode] = useState('');
  const [inputProductName, setInputProductName] = useState('');
  const [productStatus, setProductStatus] = useState('ACTIVE');
  const [nameError, setNameError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputProductName) {
      setNameError('Tên loại sản phẩm không được để trống');
      return;
    }
    const params = {
      code: inputProductCode,
      name: inputProductName,
      status: productStatus
    }
    try {
      const res = await cmsTitles.insertProducts(params)
      if (res.result && res.code == 200) {
        navigate(PATH.productsManagement)
        toast.success('Thêm loại sản phẩm thành công')
      }
    } catch (error) {
      toast.error(res.message)
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'productName':
        if (nameError) {
          setNameError('');
        }
        setInputProductName(value);
        const codeConvert = convertVietnameseToNonAccented(value);
        setInputProductCode(codeConvert);
        break;
      case 'productStatus':
        setProductStatus(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Space className='my-3'>
        <h3>Thêm loại sản phẩm</h3>
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
    </>
  )
}

export default AddProducts