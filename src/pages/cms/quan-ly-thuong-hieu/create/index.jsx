import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cmsTitles, productServiceHHB } from '@/services/product.service';
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

const AddBrand = () => {
    const navigate = useNavigate()
    const [inputBrandCode, setInputBrandCode] = useState('');
    const [inputBrandName, setInputBrandName] = useState('');
    const [brandStatus, setBrandStatus] = useState('ACTIVE');
    const [nameError, setNameError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!inputBrandName) {
            setNameError('Tên thương hiệu không được để trống');
            return;
        }
        const params = {
            code: inputBrandCode,
            name: inputBrandName,
            status: brandStatus
        }
        try {
            const res = await cmsTitles.insertBrand(params)
            if (res.result && res.code == 200) {
                navigate(PATH.branchManagement)
                toast.success('Thêm thương hiệu thành công')
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            toast.error('Thêm thương hiệu thất bại');
            toast.error(error.message);
        }
    };

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'brandName':
                if (nameError) {
                    setNameError('');
                }
                setInputBrandName(value);
                const codeConvert = convertVietnameseToNonAccented(value);
                setInputBrandCode(codeConvert);
                break;
            case 'brandStatus':
                setBrandStatus(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Space className='my-3'>
                <h3>Thêm thương hiệu</h3>
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
                                        Mã thương hiệu *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='Mã thương hiệu'
                                            type="text"
                                            name="brandCode"
                                            id="brandCode"
                                            disabled
                                            value={inputBrandCode}
                                            onChange={handleInputChange('brandCode')}
                                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Tên thương hiệu *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder='Tên thương hiệu'
                                            type="text"
                                            name="brandName"
                                            id="brandName"
                                            value={inputBrandName}
                                            onChange={handleInputChange('brandName')}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        />
                                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="brandStatus" className="block text-sm font-medium leading-6 text-gray-900">Trạng thái</label>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6 h-12 px-4"
                                        id="brandStatus"
                                        value={brandStatus}
                                        onChange={handleInputChange('brandStatus')}
                                    >
                                        <option value="ACTIVE">Hoạt động</option>
                                        <option value="INACTIVE">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-center">
                                <Button type="primary" htmlType="submit" className="mr-6">LƯU</Button>
                                <Button danger htmlType="button" onClick={() => navigate(PATH.branchManagement)}>HỦY</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddBrand