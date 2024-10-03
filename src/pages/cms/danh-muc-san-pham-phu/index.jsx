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
height: calc(100vh - 64px);
overflow: hidden; 
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
    height: 400px;
    overflow: auto;
        .ant-table-header {
        position: sticky;
        top: 0;
        z-index: 1;
        background: #fff;
    }
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


const SubProductCategoryList = () => {
    const navigate = useNavigate()
    const [dataListProductCategory, setDataListProductCategory] = useState([]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedProductCategoryType, setSelectedProductCategoryType] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedSubProductCategorySlug, setSubProductCategorySlug] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    // console.log('selectedId', selectedId)

    const paramProductCategory = {
        keyword: "",
        pageIndex: 1,
        pageSize: 100,
        status: null,
        productType: null
    };

    const {
        data: { data: getProductCategoryList = [] } = {},
        loading: loadingProductCategoryList,
    } = useQuery({
        queryKey: `product-page-${JSON.stringify(paramProductCategory)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            cmsTitles.getProductCategoryList(paramProductCategory, signal),
    });

    console.log('getProductCategoryList', getProductCategoryList)

    const columns = [
        {
            title: 'Tên danh mục sản phẩm phụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'productCategoryName',
            key: 'productCategoryName',
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
            render: (_, record) =>
            (
                <>
                    <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => {
                        localStorage.setItem('product-type-slug', record.id)
                        navigate(`${PATH.subProductCategoryDetail}`)
                    }} />
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
    };

    const SubProductCategoryListParam = useMemo(
        () => ({
            keyword: searchKeyword,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            status: filterStatus,
            productCategoryCode: selectedProductCategoryType,
        }),
        [searchKeyword, filterStatus, pagination.current, pagination.pageSize, selectedProductCategoryType]
    );

    const params = isFirstLoad ? initialParams : SubProductCategoryListParam;

    const {
        data: { data: getSubProductCategory = [], paginate: { totalRecords } = {}, } = {},
        loading: loadingSubProductCategory,
    } = useQuery({
        queryKey: `sub-product-category-${JSON.stringify(SubProductCategoryListParam)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            cmsTitles.getSubProductCategoryList(params, signal),
    });

    useEffect(() => {
        if (getSubProductCategory?.data?.length) {
            const formattedData = getSubProductCategory?.data?.map((item) => ({
                key: item.id,
                id: item.id,
                code: item.code,
                name: item.name,
                productCategoryCode: item.productCategoryCode,
                status: item.status,
            }));
            setDataListProductCategory(formattedData);
            setPagination((prev) => ({
                ...prev,
                total: totalRecords,
            }));
        } else {
            setDataListProductCategory([]);
            setPagination((prev) => ({
                ...prev,
                total: 0,
            }));
        }
    }, [getSubProductCategory, totalRecords]);

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

    const handleDeleteSubProductCategory = async () => {
        setIsModalOpen(false);
        // const res = await cmsTitles.deleteBrandCategory(selectedId)
        // try {
        //     if (res.result && res.code == 200) {
        //         await window.location.reload()
        //         await toast.success('Xóa danh mục thương hiệu thành công')
        //     }
        // } catch (error) {
        //     toast.error(res.message)
        // }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ContentContainer>
                <Space className='my-3'>
                    <h3 style={{
                        "color": '#696CFF',
                        "font-weight": "700"
                    }}>Quản lý danh mục sản phẩm phụ</h3>
                </Space>

                <div className="py-5 px-5 mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
                    <Toolbar>
                        <FilterContainer>
                            <CustomSearch
                                placeholder="Tìm kiếm ..."
                                enterButton
                                style={{ maxWidth: '500px', flex: '1' }}
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
                        </FilterContainer>
                        <CustomButton onClick={() => navigate(PATH.subProductCategoryAddCMS)} type="primary">
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
                        dataSource={dataListProductCategory}
                        loading={loadingSubProductCategory}
                        locale={{ emptyText: 'Không có kết quả hiển thị' }}
                        pagination={false}
                        scroll={{ y: 300 }}  
                        sticky
                    />

                    <Pagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handleTableChange}
                        showSizeChanger
                        onShowSizeChange={handleTableChange}
                        locale={locale} // Thêm thuộc tính locale vào Pagination
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
                        <Button type="primary" danger onClick={handleDeleteSubProductCategory}>
                            Đồng ý
                        </Button>
                        <Button onClick={closeModal} style={{ marginLeft: 8 }}>
                            Hủy
                        </Button>
                    </div>
                </Modal>

            </ContentContainer>
        </>
    )
}

export default SubProductCategoryList