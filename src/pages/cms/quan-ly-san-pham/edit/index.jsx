import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { productServiceHHB } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import { useCategoriesHHB } from '@/hooks/useCategories';

const EditProducts = () => {
  const navigate = useNavigate()
  const [productSlug, setProductSlug] = useState('');
  const [inputProductCode, setInputProductCode] = useState('');
  const [inputProductName, setInputProductName] = useState('');
  const [inputProductDescription, setInputProductDescription] = useState('');
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuanlity, setInputProductQuanlity] = useState("");
  const [inputProductImg, setInputProductImg] = useState("");
  const [categoryCode, setCategoryCode] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('ACTIVE');

  useEffect(() => {

    const productSlugFromStorage = localStorage.getItem('product-slug');
    if (productSlugFromStorage) {
      setProductSlug(productSlugFromStorage);
    }
  }, []);

  const {
    data: { data: getProductsList = {} } = {},
    loading: loadingProductsList,
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(productSlug)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      productServiceHHB.getProductDetailCMS(productSlug, signal),
  });

  console.log('getProductsList', getProductsList)

  useEffect(() => {
    if (getProductsList.name !== undefined || getProductsList.shortDescription !== undefined || getProductsList.price !== undefined || getProductsList.quanlity !== undefined || getProductsList.status !== undefined || getProductsList.categoryCode !== undefined) {
      setInputProductName(getProductsList.name);
      setInputProductDescription(getProductsList.shortDescription)
      setInputProductPrice(getProductsList.price)
      setInputProductQuanlity(getProductsList.quanlity)
      setCategoryStatus(getProductsList.status)
      setCategoryCode(getProductsList.categoryCode)
    }
  }, [getProductsList]);

  // const handleInputChange = (fieldName) => (e) => {
  //     const { value } = e.target;
  //     switch (fieldName) {
  //         case 'categoryName':
  //             setInputCategoryName(value);
  //             break;
  //         case 'categoryCode':
  //             setInputCategoryCode(value);
  //             break;
  //         case 'categoryDescription':
  //             setInputCategoryDescription(value);
  //             break;
  //         case 'categoryStatus':
  //             setCategoryStatus(value);
  //             break;
  //         default:
  //             break;
  //     }
  // };

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
        <h3>Chỉnh sửa sản phẩm</h3>
      </Space>

      {loadingProductsList ? (
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
                      Tên sản phẩm *
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='Tên sản phẩm'
                        type="text"
                        name="name"
                        id="name"
                        disabled
                        value={inputProductName}
                        onChange={handleInputChange('name')}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      />
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
                      // onChange={handleInputChange('categoryCode')}
                    >
                      <option value="">Chọn mã danh mục</option>
                      {/* {categoryListHHB?.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.title}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="categoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                      id="categoryStatus"
                      value={categoryStatus}
                      // onChange={handleInputChange('categoryStatus')}
                    >
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="IACTIVE">Không hoạt động</option>
                    </select>
                  </div>
                </div>



                {/*  */}

                <div className="col-12 d-flex justify-center">
                  <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                  <Button danger htmlType="button" onClick={() => navigate(PATH.categoriesManagement)}>HỦY</Button>
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