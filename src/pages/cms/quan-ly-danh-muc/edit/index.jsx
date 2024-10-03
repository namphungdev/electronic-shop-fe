import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles, productTiles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditCategories = () => {
    const navigate = useNavigate()
    const [productCategoryId, setProductCategoryId] = useState('');
    const [productCategoryCode, setProductCategoryCode] = useState('');
    const [productCategoryName, setProductCategoryName] = useState('');
    const [productCategoryStatus, setProductCategoryStatus] = useState('');
    const [productType, setProductType] = useState('');
    const [isSub, setIsSub] = useState(true);
    const [nameError, setNameError] = useState('');
    const [productTypeError, setProductTypeError] = useState('');

    useEffect(() => {
        const idFromStorage = localStorage.getItem('product-category-id');
        if (idFromStorage) {
            setProductCategoryId(idFromStorage);
        }
    }, []);

    const {
        data: { data: getProductCategoryDetail = {} } = {},
        loading: loadingProductCategoryDetail,
    } = useQuery({
        queryKey: `product-category-${JSON.stringify(productCategoryId)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            cmsTitles.getProductCategoryDetail(productCategoryId, signal),
    });

    useEffect(() => {
        if (getProductCategoryDetail?.name || getProductCategoryDetail?.code) {
            setProductCategoryCode(getProductCategoryDetail.code);
            setProductCategoryName(getProductCategoryDetail.name);
            setProductCategoryStatus(getProductCategoryDetail.status || 'ACTIVE');
            setProductType(getProductCategoryDetail.productType || '');
            setIsSub(getProductCategoryDetail.isSub || false);
        }
    }, [getProductCategoryDetail]);

    const {
        data: { data: productTypeList = [] } = {}
    } = useQuery({
        queryKey: `get-product-type-list`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: () =>
            productTiles.getProductTypeList(),
    });

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'productCategoryName':
                if (nameError) {
                    setNameError('');
                }
                setProductCategoryName(value);
                break;
            case 'productType':
                if (productTypeError) {
                    setProductTypeError('')
                }
                setProductType(value);
                break;
            case 'isSub':
                setIsSub(value === 'true');
                break;
            case 'productCategoryStatus':
                setProductCategoryStatus(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
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
            id: productCategoryId,
            code: productCategoryCode,
            name: productCategoryName,
            productType: productType,
            isSub: isSub,
            status: productCategoryStatus
        }
        try {
            const res = await cmsTitles.updateProductCategory(params)
            if (res && res.result && res.code == 200) {
                await navigate(PATH.categoriesManagement)
                await toast.success('Chỉnh sửa danh mục sản phẩm thành công')
            } else {
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
                <h3>Chỉnh sửa danh mục sản phẩm</h3>
            </Space>
            {loadingProductCategoryDetail ? (
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
                                                onChange={(e) => setProductCategoryName(e.target.value)}
                                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
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
                                        <label htmlFor="isSub" className="block text-sm font-medium leading-6 text-gray-900">
                                            Danh mục con
                                        </label>
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                                            id="isSub"
                                            value={isSub ? 'true' : 'false'}
                                            onChange={handleInputChange('isSub')}
                                        >
                                            <option value="true">Có</option>
                                            <option value="false">Không</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="productCategoryStatus" className="block text-sm font-medium leading-6 text-gray-900">
                                            Trạng thái
                                        </label>
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
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
            }
        </>
    );
};

export default EditCategories;
