import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cmsTitles, productTiles } from '@/services/product.service';
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

const AddCategories = () => {
    const navigate = useNavigate()
    const [productCategoryCode, setProductCategoryCode] = useState('');
    const [productCategoryName, setProductCategoryName] = useState('');
    const [productCategoryStatus, setProductCategoryStatus] = useState('ACTIVE');
    const [productType, setProductType] = useState('');
    const [isSub, setIsSub] = useState(true);
    const [nameError, setNameError] = useState('');
    const [productTypeError, setProductTypeError] = useState('');

    const {
        data: { data: productTypeList = [] } = {}
    } = useQuery({
        queryKey: `get-product-type-list`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: () =>
            productTiles.getProductTypeList(),
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!productCategoryName) {
            setNameError('Tên danh mục sản phẩm không được để trống');
            return;
        }
        if (!productType) {
            setProductTypeError('Loại sản phẩm không được để trống');
            return;
        }
        const params = {
            code: productCategoryCode,
            name: productCategoryName,
            productType: productType,
            isSub: isSub,
            status: productCategoryStatus
        }
        try {
            const res = await cmsTitles.insertProductCategory(params)
            if (res.result && res.code == 200) {
                navigate(PATH.categoriesManagement)
                toast.success('Thêm danh mục sản phẩm thành công')
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            toast.error('Thêm danh mục sản phẩm thất bại');
            toast.error(error.message);
        }
    };

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'productCategoryName':
                if (nameError) {
                    setNameError('');
                }
                setProductCategoryName(value);
                const codeConvert = convertVietnameseToNonAccented(value);
                setProductCategoryCode(codeConvert);
                break;
            case 'productType':
                if (productTypeError) {
                    setProductTypeError('')
                }
                setProductType(value);
                break;
            case 'isSub':
                setIsSub(value === 'true')
                break;
            case 'productCategoryStatus':
                setProductCategoryStatus(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Space className='my-3'>
                <h3>Thêm danh mục sản phẩm</h3>
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
                                        Mã danh mục sản phẩm *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='Mã danh mục sản phẩm'
                                            type="text"
                                            name="productCategoryCode"
                                            id="productCategoryCode"
                                            disabled
                                            value={productCategoryCode}
                                            onChange={handleInputChange('productCategoryCode')}
                                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Tên danh mục sản phẩm *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='Tên danh mục sản phẩm'
                                            type="text"
                                            name="productCategoryName"
                                            id="productCategoryName"
                                            value={productCategoryName}
                                            onChange={handleInputChange('productCategoryName')}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="productType" className="block text-sm font-medium leading-6 text-gray-900">Loại sản phẩm</label>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        id="productType"
                                        value={productType}
                                        onChange={handleInputChange('productType')}
                                    >
                                        <option value="">Loại sản phẩm</option>
                                        {productTypeList.map((item) => (
                                            <option key={item.id} value={item.productTypeCode}>
                                                {item.productTypeName}
                                            </option>
                                        ))}
                                    </select>
                                    {productTypeError && <p className="text-red-500 text-sm mt-1">{productTypeError}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="isSub" className="block text-sm font-medium leading-6 text-gray-900">Danh mục con</label>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        id="isSub"
                                        value={isSub}
                                        onChange={handleInputChange('isSub')}
                                    >
                                        <option value={true}>Có</option>
                                        <option value={false}>Không</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="productCategoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        id="productCategoryStatus"
                                        value={productCategoryStatus}
                                        onChange={handleInputChange('productCategoryStatus')}
                                    >
                                        <option value="ACTIVE">Hoạt động</option>
                                        <option value="INACTIVE">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-center">
                                <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                                <Button danger htmlType="button" onClick={() => navigate(PATH.categoriesManagement)}>HỦY</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddCategories;


