import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { productServiceHHB } from '@/services/product.service';
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
  const [inputProductDescription, setInputProductDescription] = useState('');
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuanlity, setInputProductQuanlity] = useState("");
  const [inputProductImg, setInputProductImg] = useState("");
  const [categoryCode, setCategoryCode] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('ACTIVE');
  const [errors, setErrors] = useState({});

  const { categoryListHHB, loadingCategoryHHB } = useCategoriesHHB();

  const validate = () => {
    const newErrors = {};
    if (!inputProductName) newErrors.name = 'Tên sản phẩm không được để trống';
    if (!inputProductDescription) newErrors.shortDescription = 'Mô tả sản phẩm không được để trống';
    if (!inputProductPrice) newErrors.price = 'Giá sản phẩm không được để trống';
    if (isNaN(inputProductPrice)) newErrors.price = 'Giá sản phẩm phải là số';
    if (!inputProductQuanlity) newErrors.quanlity = 'Số lượng không được để trống';
    if (isNaN(inputProductQuanlity)) newErrors.quanlity = 'Số lượng phải là số';
    if (!categoryCode) newErrors.categoryCode = 'Mã danh mục không được để trống';
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const params = {
      isPublished: true,
      description: null,
      specifications: "[]",
      code: inputProductCode,
      name: inputProductName,
      shortDescription: inputProductDescription,
      price: parseFloat(inputProductPrice),
      quanlity: parseFloat(inputProductQuanlity),
      images: inputProductImg ? [{ base_url: inputProductImg }] : [],
      categoryCode: categoryCode,
      status: categoryStatus
    }

    try {
      const res = await productServiceHHB.insertProduct(params)
      if (res.result && res.code == 200) {
        navigate(PATH.productsManagement)
        toast.success('Thêm sản phẩm thành công')
      }
    } catch (error) {
      toast.error(res.message)
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        setInputProductName(value);
        const codeConvert = convertVietnameseToNonAccented(value);
        setInputProductCode(codeConvert);
        if (!value) {
          newErrors.name = 'Tên sản phẩm không được để trống';
        } else {
          delete newErrors.name;
        }
        break;
      case 'shortDescription':
        setInputProductDescription(value);
        if (!value) {
          newErrors.shortDescription = 'Mô tả sản phẩm không được để trống';
        } else {
          delete newErrors.shortDescription;
        }
        break;
      case 'price':
        setInputProductPrice(value);
        if (!value) {
          newErrors.price = 'Giá sản phẩm không được để trống';
        } else if (isNaN(value)) {
          newErrors.price = 'Giá sản phẩm phải là số';
        } else {
          delete newErrors.price;
        }
        break;
      case 'quanlity':
        setInputProductQuanlity(value);
        if (!value) {
          newErrors.quanlity = 'Số lượng không được để trống';
        } else if (isNaN(value)) {
          newErrors.quanlity = 'Số lượng phải là số';
        } else {
          delete newErrors.quanlity;
        }
        break;
      case 'images':
        setInputProductImg(value);
        break;
      case 'categoryCode':
        setCategoryCode(value);
        if (!value) {
          newErrors.categoryCode = 'Mã danh mục không được để trống';
        } else {
          delete newErrors.categoryCode;
        }
        break;
      case 'categoryStatus':
        setCategoryStatus(value);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  return (
    <>
      <Space className='my-3'>
        <h3>Thêm sản phẩm</h3>
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
                    Mã sản phẩm *
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Mã sản phẩm'
                      type="text"
                      name="code"
                      id="code"
                      disabled
                      value={inputProductCode}
                      onChange={handleInputChange('code')}
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tên sản phẩm *
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Tên sản phẩm'
                      type="text"
                      name="name"
                      id="name"
                      value={inputProductName}
                      onChange={handleInputChange('name')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Mô tả sản phẩm *
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Mô tả sản phẩm'
                      type="text"
                      name="shortDescription"
                      id="shortDescription"
                      value={inputProductDescription}
                      onChange={handleInputChange('shortDescription')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                    {errors.shortDescription && <div className="text-red-500">{errors.shortDescription}</div>}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Giá *
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Giá'
                      type="text"
                      name="price"
                      id="price"
                      value={inputProductPrice}
                      onChange={handleInputChange('price')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Số lượng *
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Số lượng'
                      type="text"
                      name="quanlity"
                      id="quanlity"
                      value={inputProductQuanlity}
                      onChange={handleInputChange('quanlity')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                    {errors.quanlity && <div className="text-red-500">{errors.quanlity}</div>}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Link hình ảnh
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder='Link hình ảnh'
                      type="text"
                      name="images"
                      id="images"
                      value={inputProductImg}
                      onChange={handleInputChange('images')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="categoryCode" className="block text-sm font-medium leading-6 text-gray-900">Mã danh mục</label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    id="categoryCode"
                    value={categoryCode}
                    onChange={handleInputChange('categoryCode')}
                  >
                    <option value="">Chọn mã danh mục</option>
                    {categoryListHHB?.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {errors.categoryCode && <div className="text-red-500">{errors.categoryCode}</div>}

                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="categoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    id="categoryStatus"
                    value={categoryStatus}
                    onChange={handleInputChange('categoryStatus')}
                  >
                    <option value="ACTIVE">Hoạt động</option>
                    <option value="IACTIVE">Không hoạt động</option>
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