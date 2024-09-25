import React, { useState, useEffect } from 'react';
import { Space, Button } from 'antd';
import { cmsTitles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const EditBrand = () => {
    const navigate = useNavigate()
    const [brandId, setBrandId] = useState('');
    const [inputBrandCode, setInputBrandCode] = useState('');
    const [inputBrandName, setInputBrandName] = useState('');
    const [brandStatus, setBrandStatus] = useState('');
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        const brandIdFromStorage = localStorage.getItem('brand-slug');
        if (brandIdFromStorage) {
            setBrandId(brandIdFromStorage);
        }
    }, []);

    const {
        data: { data: getBranDetailList = {} } = {},
        loading: loadingBrandDetail,
    } = useQuery({
        queryKey: `product-page-${JSON.stringify(brandId)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            cmsTitles.getBranDetail(brandId, signal),
    });

    useEffect(() => {
        if (getBranDetailList.name !== undefined || getBranDetailList.code !== undefined) {
            setInputBrandCode(getBranDetailList.code);
            setInputBrandName(getBranDetailList.name);
            setBrandStatus(getBranDetailList.status || '')
        }
    }, [getBranDetailList]);

    const handleInputChange = (fieldName) => (e) => {
        const { value } = e.target;
        switch (fieldName) {
            case 'brandName':
                if (nameError) {
                    setNameError('');
                }
                setInputBrandName(value);
                break;
            case 'brandCode':
                setInputBrandCode(value);
                break;
            case 'brandStatus':
                setBrandStatus(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputBrandName) {
            setNameError('Tên thương hiệu không được để trống');
            return;
        }
        const params = {
            id: brandId,
            code: inputBrandCode,
            name: inputBrandName,
            status: brandStatus
        }
        try {
            const res = await cmsTitles.updateBrand(params)
            if (res && res.result && res.code == 200) {
                navigate(PATH.branchManagement)
                toast.success('Chỉnh sửa thương hiệu thành công')
            }
        } catch (error) {
            toast.error(res.message)
        }
    };

    return (
        <>
            <Space className='my-3'>
                <h3>Chỉnh sửa thương hiệu</h3>
            </Space>
            {loadingBrandDetail ? (
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
            }
        </>
    )
}

export default EditBrand