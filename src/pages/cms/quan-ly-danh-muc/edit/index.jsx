import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { productServiceHHB } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditCategories = () => {
    const navigate = useNavigate()
    const [categoryCode, setCategoryCode] = useState('');
    const [inputCategoryCode, setInputCategoryCode] = useState('');
    const [inputCategoryName, setInputCategoryName] = useState('');
    const [inputCategoryDescription, setInputCategoryDescription] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('');

    useEffect(() => {
        const categoryCodeFromStorage = localStorage.getItem('category-code');
        if (categoryCodeFromStorage) {
            setCategoryCode(categoryCodeFromStorage);
        }
    }, []);

    const {
        data: { data: getCategoriesList = {} } = {},
        loading: loadingCategoriesList,
    } = useQuery({
        queryKey: `product-page-${JSON.stringify(categoryCode)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            productServiceHHB.getCategoryDetailCMS(categoryCode, signal),
    });

    useEffect(() => {
        if (getCategoriesList.name !== undefined || getCategoriesList.code !== undefined || getCategoriesList.description !== undefined) {
            setInputCategoryCode(getCategoriesList.code);
            setInputCategoryName(getCategoriesList.name);
            setInputCategoryDescription(getCategoriesList.description)
        }
    }, [getCategoriesList]);

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'categoryName':
                setInputCategoryName(value);
                break;
            case 'categoryCode':
                setInputCategoryCode(value);
                break;
            case 'categoryDescription':
                setInputCategoryDescription(value);
                break;
            case 'categoryStatus':
                setCategoryStatus(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            code: inputCategoryCode,
            name: inputCategoryName,
            description: inputCategoryDescription,
            status: categoryStatus
        }
        try {
            const res = await productServiceHHB.updateCategory(params)
            if (res && res.result && res.code == 200) {
                toast.success('Chỉnh sửa danh mục thành công')
                navigate(PATH.categoriesManagement)
            }
        } catch (error) {
            toast.error(res.message)
        }
    };

    return (
        <>
            <Space className='my-3'>
                <h3>Chỉnh sửa danh mục</h3>
            </Space>
            {loadingCategoriesList ? (
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
                                            Mã danh mục *
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Mã danh mục'
                                                type="text"
                                                name="categoryCode"
                                                id="categoryCode"
                                                disabled
                                                value={inputCategoryCode}
                                                onChange={handleInputChange('categoryCode')}
                                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Tên danh mục *
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Tên danh mục'
                                                type="text"
                                                name="categoryName"
                                                id="categoryName"
                                                disabled
                                                value={inputCategoryName}
                                                onChange={handleInputChange('categoryName')}
                                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Mô tả danh mục *
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder='Mô tả danh mục'
                                                type="text"
                                                name="categoryDescription"
                                                id="categoryDescription"
                                                value={inputCategoryDescription}
                                                onChange={handleInputChange('categoryDescription')}
                                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="categoryStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                                        <select
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 h-12"
                                            id="categoryStatus"
                                            value={categoryStatus}
                                            onChange={handleInputChange('categoryStatus')}
                                        >
                                            <option value="ACTIVE">Hoạt động</option>
                                            <option value="INACTIVE">Không hoạt động</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 d-flex justify-center">
                                    <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                                    <Button danger htmlType="button">HỦY</Button>
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
