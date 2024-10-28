import React, { useEffect, useState } from 'react';
import { Space, Button, Modal, Table } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cmsTitles, setImageRoom } from '@/services/product.service';
import { PATH } from '@/config';
import useQuery from '@/hooks/useQuery';
import CustomQuillEditor from '@/components/ReactQuill';
import { createGlobalStyle } from 'styled-components';
import ImageUploaderComponent from '@/components/ImageUpload';

const GlobalStyle = createGlobalStyle`
.form-container {
    max-height: 75vh;
    overflow-x: hidden !important;
    overflow: auto !important;
}

.image-upload-container {
}
`

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

const AddProductListCMS = () => {
  const navigate = useNavigate()
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [subProductCategory, setSubProductCategory] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [percentDiscount, setPercentDiscount] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [dropdownProductCategory, setDropdownProductCategory] = useState([]);
  const [dropdownSubProductCategory, setDropdownSubProductCategory] = useState([]);

  const [productStatus, setProductStatus] = useState('ACTIVE');
  const [dataImg, setDataImg] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);

  const [nameError, setNameError] = useState('');
  const [productTypeError, setProductTypeError] = useState('');
  const [productCategoryError, setProductCategoryError] = useState('');
  // const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');

  const {
    data: { data: productTypeList = [] } = {}
  } = useQuery({
    queryKey: `get-product-type-list`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownProductType(),
  });

  useEffect(() => {
    if (productType) {
      cmsTitles.getDropdownProductCategory2(productType, true).then((response) => {
        setDropdownProductCategory(response?.data || []);
      }).catch((error) => {
        console.error("Failed to fetch product categories:", error);
      });
    } else {
      setDropdownProductCategory([]);
    }
  }, [productType]);

  useEffect(() => {
    if (productCategory) {
      cmsTitles.getDropdownSubProductCategory(productCategory).then((response) => {
        setDropdownSubProductCategory(response?.data || []);
      }).catch((error) => {
        console.error("Failed to fetch product categories:", error);
      });
    } else {
      setDropdownSubProductCategory([]);
    }
  }, [productCategory]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!productName) {
      setNameError('Tên sản phẩm không được để trống');
      return;
    }

    if (!productType) {
      setProductTypeError('Loại sản phẩm không được để trống');
      return;
    }

    if (!productCategory) {
      setProductCategoryError('Danh mục sản phẩm không được để trống');
      return;
    }


    // Kiểm tra hình ảnh
    if (dataImg.length === 0) {
      setImageError('Bạn phải thêm ít nhất một hình ảnh');
      return;
    }

    const params = {
      code: productCode,
      name: productName,
      productCategoryCode: productCategory,
      subProductCategoryCode: subProductCategory,
      status: productStatus,
      isPublished: isPublished,
      description: description,
      price: price,
      discountedPrice: Math.round(discountedPrice),
      percentDiscount: percentDiscount,
      images: transformedDataImg
    }

    try {
      const res = await cmsTitles.insertAddProduct(params);

      if (res.result && res.code === 200) {
        navigate(PATH.productList);
        toast.success('Thêm sản phẩm thành công');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại');
      toast.error(error.message);
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    switch (fieldName) {
      case 'productName':
        if (nameError) {
          setNameError('');
        }
        setProductName(value);
        const codeConvert = convertVietnameseToNonAccented(value);
        setProductCode(codeConvert);
        break;
      case 'price':
        const priceValue = value === "" ? null : parseFloat(value); // Set null if empty
        setPrice(priceValue);

        // Update discountedPrice when price changes
        if (percentDiscount && priceValue !== null) {
          const discountedPriceValue = priceValue - (priceValue * (percentDiscount / 100));
          setDiscountedPrice(discountedPriceValue);
        } else {
          setDiscountedPrice(null); // Reset discountedPrice if price is null
        }
        break;

      case 'percentDiscount':
        const percentValue = value === "" ? null : parseInt(value, 10);
        setPercentDiscount(percentValue);

        // Đặt discountedPrice là null nếu percentDiscount là rỗng hoặc null
        if (percentValue === null) {
          setDiscountedPrice(null); // Xóa giá sau khi giảm
        } else if (!isNaN(percentValue) && percentValue >= 0 && percentValue <= 100) {
          // Tính toán giá trị discountedPrice dựa trên percentDiscount và giá hiện tại
          if (price) {
            const discountedPriceValue = price - (price * (percentValue / 100));
            setDiscountedPrice(discountedPriceValue);
          }
        } else {
          setPercentDiscount('');
          toast.error('Giảm giá phải là số nguyên từ 0 đến 100');
        }
        break;
      case 'discountedPrice':
        setDiscountedPrice(value);
        break;
      case 'isPublished':
        setIsPublished(value === true)
        break;
      case 'productType':
        if (productTypeError) {
          setProductTypeError('');
        }
        setProductType(value);
        break;
      case 'productCategory':
        if (productCategoryError) {
          setProductCategoryError('');
        }
        setProductCategory(value);
        break;
      case 'subProductCategory':
        setSubProductCategory(value);
        break;
      case 'productStatus':
        setProductStatus(value);
        break;
      default:
        break;
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleUploadComplete = (response) => {
    if (response?.url) {
      if (editingUrl) {
        setDataImg((prevData) =>
          prevData.map((url) => (url === editingUrl ? response.url : url))
        );
      } else {
        setDataImg((prevData) => [...prevData, response.url]);
      }
    }
    handleCloseModal();
  };

  const showModal = (url) => {
    setIsModalVisible(true);
    setEditingUrl(url);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingUrl(null);
  };

  const handleDeleteImage = (urlToDelete) => {
    setDataImg((prevData) => prevData.filter((url) => url !== urlToDelete));
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <img src={url} alt="Uploaded" width="100" />, // Render the image
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record.url)} style={{ marginRight: '10px' }}>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleDeleteImage(record.url)} danger>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const tableData = dataImg && dataImg.length > 0 && dataImg?.map((url) => ({ key: url, url }));

  const transformedDataImg = dataImg.map(url => ({
    base_url: url
  }));

  const [showSubCategory, setShowSubCategory] = useState(false);

  useEffect(() => {
    const selectedCategory = dropdownProductCategory?.find(
      (item) => item.code === productCategory
    );
    if (selectedCategory && selectedCategory.isSub) {
      setShowSubCategory(true);
    } else {
      setShowSubCategory(false);
    }
  }, [productCategory, dropdownProductCategory]);


  return (
    <>
      <GlobalStyle />
      <Space className='my-3'>
        <h3>Thêm sản phẩm</h3>
      </Space>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className="select-none"
      >
        <div className="form-container mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
          <div className="p-6">
            <div className="row">
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="productCategory" className="block text-sm font-medium leading-6 text-gray-900">Danh mục sản phẩm</label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    id="productCategory"
                    value={productCategory}
                    onChange={handleInputChange('productCategory')}
                  >
                    {dropdownProductCategory && dropdownProductCategory.length === 0 ? (
                      <option value={null} disabled>Chưa có dữ liệu nào</option>
                    ) : (
                      <>
                        <option value="">Danh mục sản phẩm</option>
                        {dropdownProductCategory && dropdownProductCategory?.map((item) => (
                          <option key={item.id} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  {productCategoryError && <p className="text-red-500 text-sm mt-1">{productCategoryError}</p>}
                </div>
              </div>

              {showSubCategory && (
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="subProductCategory" className="block text-sm font-medium leading-6 text-gray-900">
                      Danh mục sản phẩm phụ
                    </label>
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
              )}
              <div className="col-md-3">
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
                    {/* {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>} */}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
                      // value={discountedPrice}
                      value={discountedPrice !== null ? discountedPrice : ''}
                      onChange={handleInputChange('discountedPrice')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
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
                  <CustomQuillEditor value={description} onChange={handleDescriptionChange} />
                </div>
              </div>
              <div className='col-md-12'>
                <div className="form-group">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Upload hình ảnh</label>
                  <Button style={{ marginBottom: '10px ' }} onClick={() => showModal()}>+ Thêm</Button>
                  {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                  <Table dataSource={tableData} columns={columns} pagination={false} />
                </div>
              </div>
              <div className="col-12 d-flex justify-center">
                <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                <Button danger htmlType="button" onClick={() => navigate(PATH.productList)}>HỦY</Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal
        title={editingUrl ? "Chỉnh sửa hình ảnh" : "Upload hình ảnh "}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ImageUploaderComponent
          onUploadComplete={handleUploadComplete}
          initialImage={editingUrl}
        />
      </Modal>
    </>
  )
}

export default AddProductListCMS