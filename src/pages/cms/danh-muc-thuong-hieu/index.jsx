import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { cmsTitles } from '@/services/product.service';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import { toast } from 'react-toastify';

const { Search } = Input;
const { Option } = Select;

const ContentContainer = styled.div`
    overflow: hidden; 
    height: calc(100vh - 64px);
`;


const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

const CustomSearch = styled(Search)`
  .ant-input-search-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CustomSelect = styled(Select)`
  .ant-select-clear {
    display: none
  }
`;

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled(Table)`
    height: 55vh;
    overflow: auto;
`;

const locale = {
    items_per_page: '/ Trang',
    jump_to: 'Đi đến',
    jump_to_confirm: 'xác nhận',
    page: '',
    prev_page: 'Trang trước',
    next_page: 'Trang sau',
    prev_5: '5 trang trước',
    next_5: '5 trang sau',
    prev_3: '3 trang trước',
    next_3: '3 trang sau',
};

const BrandCategoryManagement = () => {
    const navigate = useNavigate()
    const [dataBrandCategory, setDataBrandCategory] = useState([]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedProductCategoryType, setSelectedProductCategoryType] = useState(null);
    const [selectedBrandType, setSelectedBrandType] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [total, setTotal] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const {
        data: { data: dropdownBrand = [] } = {}
    } = useQuery({
        queryKey: `get-dropdown-brand`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: () =>
            cmsTitles.getDropdownBrand(),
    });

    const {
        data: { data: dropdownProductCategory = [] } = {}
    } = useQuery({
        queryKey: `get-dropdown-product-category`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: () =>
            cmsTitles.getDropdownProductCategory('thiet-bi-ve-sinh'),
    });

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'productCategoryName',
            key: 'productCategoryName',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brandName',
            key: 'brandName',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 'ACTIVE' ? 'green' : 'red'}
                    style={{ width: 130, textAlign: 'center', fontSize: 13, padding: '5px 0px' }}
                >
                    {status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => {
                        localStorage.setItem('brand-category-id', record.id)
                        navigate(`${PATH.brandCategoryCMSDetail}`)
                    }
                    }
                    />
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '25px' }} onClick={() => showDeleteConfirm(record.id)} />
                </>
            ),
        },
    ];

    const initialParams = {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        status: null,
        productCategoryCode: null,
        brandCode: null
    };

    const brandCategoryListParam = useMemo(
        () => ({
            keyword: searchKeyword,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            status: filterStatus,
            productCategoryCode: selectedProductCategoryType,
            brandCode: selectedBrandType
        }),
        [searchKeyword, filterStatus, pagination.current, pagination.pageSize, selectedProductCategoryType, selectedBrandType]
    );

    const params = isFirstLoad ? initialParams : brandCategoryListParam;

    const {
        data: { data: getBrandCategoryList = [], paginate: { totalRecords } = {}, } = {},
        loading: loadingBrandCategoryList,
    } = useQuery({
        queryKey: `brand-category-page-${JSON.stringify(brandCategoryListParam)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            cmsTitles.getBrandCategoryList(params, signal),
    });

    useEffect(() => {
        if (getBrandCategoryList?.data?.length) {
            const formattedData = getBrandCategoryList?.data?.map((item, index) => ({
                id: item.id,
                code: item.code,
                name: item.name,
                brandName: item.brandName,
                productCategoryName: item.productCategoryName,
                status: item.status,
            }));
            setTotal(getBrandCategoryList?.totalRecords)
            setDataBrandCategory(formattedData);
            setPagination((prev) => ({
                ...prev,
                total: totalRecords,
            }));
        } else {
            setDataBrandCategory([]);
            setPagination((prev) => ({
                ...prev,
                total: 0,
            }));
        }
    }, [getBrandCategoryList, totalRecords]);

    useEffect(() => {
        setIsFirstLoad(false);
    }, []);

    const handleFilterStatus = (value) => {
        setFilterStatus(value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    };

    const handleProductCategoryTypeChange = (value) => {
        setSelectedProductCategoryType(value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    };

    const handleBrandTypeChange = (value) => {
        setSelectedBrandType(value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    };

    const handleTableChange = (page, pageSize) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize,
        }));
    };

    const showDeleteConfirm = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDeleteBrandCategory = async () => {
        setIsModalOpen(false);
        const res = await cmsTitles.deleteBrandCategory(selectedId)
        try {
            if (res.result && res.code == 200) {
                await window.location.reload()
                await toast.success('Xóa danh mục thương hiệu thành công')
            }
        } catch (error) {
            toast.error(res.message)
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ContentContainer>
            <Space className='my-3'>
                <h3 style={{
                    "color": '#696CFF',
                    "font-weight": "700"
                }}>Quản lý danh mục thương hiệu</h3>
            </Space>
            <div className="py-5 px-5 mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
                <Toolbar>
                    <FilterContainer>
                        <CustomSearch
                            placeholder="Tìm kiếm ..."
                            enterButton
                            style={{ maxWidth: '400px', flex: '1' }}
                            onSearch={handleSearch}
                        />
                        <CustomSelect
                            placeholder="Trạng thái"
                            style={{ width: 200 }}
                            onChange={handleFilterStatus}
                            allowClear
                            defaultValue={null}
                        >
                            <Option value={null}>Tất cả</Option>
                            <Option value="ACTIVE">Hoạt động</Option>
                            <Option value="INACTIVE">Không hoạt động</Option>
                        </CustomSelect>

                        <CustomSelect
                            placeholder="Danh mục sản phẩm"
                            style={{ width: 200 }}
                            onChange={handleProductCategoryTypeChange}
                            allowClear
                        >
                            <Option value={null}>Tất cả</Option>
                            {dropdownProductCategory.map((item) => (
                                <Option key={item.id} value={item.code}>
                                    {item.name}
                                </Option>
                            ))}
                        </CustomSelect>

                        <CustomSelect
                            placeholder="Thương hiệu"
                            style={{ width: 200 }}
                            onChange={handleBrandTypeChange}
                            allowClear
                        >
                            <Option value={null}>Tất cả</Option>
                            {dropdownBrand.map((item) => (
                                <Option key={item.id} value={item.code}>
                                    {item.name}
                                </Option>
                            ))}
                        </CustomSelect>
                    </FilterContainer>
                    <CustomButton onClick={() => navigate(PATH.brandCategoryAddCMS)} type="primary">
                        <span style={{
                            'color': '#fff',
                            'font-weight': '500'
                        }}>
                            Thêm
                        </span>
                    </CustomButton>
                </Toolbar>

                <StyledTable
                    columns={columns}
                    dataSource={dataBrandCategory}
                    loading={loadingBrandCategoryList}
                    locale={{ emptyText: 'Không có kết quả hiển thị' }}
                    pagination={false}
                />

                <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={total}
                    showTotal={(total) => `Tổng ${total} danh mục thương hiệu`}
                    onChange={handleTableChange}
                    showSizeChanger
                    onShowSizeChange={handleTableChange}
                    locale={locale} 
                />
            </div>

            <Modal
                visible={isModalOpen}
                onCancel={closeModal}
                footer={null}
                centered
            >
                <div className="text-center">
                    <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Bạn có muốn xóa danh mục thương hiệu này không?</h3>
                    <Button type="primary" danger onClick={handleDeleteBrandCategory}>
                        Đồng ý
                    </Button>
                    <Button onClick={closeModal} style={{ marginLeft: 8 }}>
                        Hủy
                    </Button>
                </div>
            </Modal>
        </ContentContainer >
    )
}

export default BrandCategoryManagement