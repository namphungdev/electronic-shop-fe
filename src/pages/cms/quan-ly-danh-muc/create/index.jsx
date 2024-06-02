import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { productServiceHHB } from '@/services/product.service';
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

const AddCategories = () => {
    const navigate = useNavigate()
    const [inputCategoryCode, setInputCategoryCode] = useState('');
    const [inputCategoryName, setInputCategoryName] = useState('');
    const [inputCategoryDescription, setInputCategoryDescription] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('ACTIVE');
    const [nameError, setNameError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!inputCategoryName) {
            setNameError('Tên danh mục không được để trống');
            return;
        }
        const params = {
            code: inputCategoryCode,
            name: inputCategoryName,
            description: inputCategoryDescription,
            status: categoryStatus
        }
        try {
            const res = await productServiceHHB.insertCategory(params)
            if (res.result && res.code == 200) {
                navigate(PATH.categoriesManagement)
                toast.success('Thêm danh mục thành công')
            }
        } catch (error) {
            toast.error(res.message)
        }
    };

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'categoryName':
                if (nameError) {
                    setNameError('');
                }
                setInputCategoryName(value);
                const codeConvert = convertVietnameseToNonAccented(value);
                setInputCategoryCode(codeConvert);
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

    return (
        <>
            <Space className='my-3'>
                <h3>Thêm danh mục</h3>
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
                                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
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
                                            value={inputCategoryName}
                                            onChange={handleInputChange('categoryName')}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                    </div>
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


