import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
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

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled(Table)`
    height: 400px;
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

const CategoryManagement = () => {
    const navigate = useNavigate()
    const [dataListCategories, setDataListCategories] = useState([]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryCode, setSelectedCategoryCode] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Mô tả',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
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
                        localStorage.setItem('category-code', record.code)
                        navigate(`${PATH.categoriesCMSDetail}`)
                    }
                    }
                    />
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '25px' }} onClick={() => showDeleteConfirm(record.code)} />
                </>
            ),
        },
    ];

    const initialParams = {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        status: null
    };

    const categoriesListParam = useMemo(
        () => ({
            keyword: searchKeyword,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            status: filterStatus,
        }),
        [searchKeyword, filterStatus, pagination.current, pagination.pageSize]
    );

    const params = isFirstLoad ? initialParams : categoriesListParam;

    const {
        data: { data: getCategoriesList = [], paginate: { totalRecords } = {}, } = {},
        loading: loadingCategoriesList,
    } = useQuery({
        queryKey: `product-page-${JSON.stringify(categoriesListParam)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            productServiceHHB.getCategoriesList(params, signal),
    });

    useEffect(() => {
        if (getCategoriesList?.data?.length) {
            const formattedData = getCategoriesList?.data?.map((category, index) => ({
                id: category.id,
                code: category.code,
                name: category.name,
                description: category.description,
                status: category.status,
            }));
            setDataListCategories(formattedData);
            setPagination((prev) => ({
                ...prev,
                total: totalRecords,
            }));
        } else {
            setDataListCategories([]);
            setPagination((prev) => ({
                ...prev,
                total: 0,
            }));
        }
    }, [getCategoriesList, totalRecords]);

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

    const handleTableChange = (page, pageSize) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize,
        }));
    };

    const showDeleteConfirm = (code) => {
        setSelectedCategoryCode(code);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = async () => {
        setIsModalOpen(false);
        const res = await productServiceHHB.deleteCategories(selectedCategoryCode)
        try {
            if (res.result && res.code == 200) {
                toast.success('Xóa danh mục thành công')
                window.location.reload()
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
                <h3>Quản lý danh mục</h3>
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
                        <Select
                            placeholder="Trạng thái"
                            style={{ width: 200 }}
                            onChange={handleFilterStatus}
                            allowClear
                            defaultValue=""
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="ACTIVE">Hoạt động</Option>
                            <Option value="INACTIVE">Không hoạt động</Option>
                        </Select>
                    </FilterContainer>
                    <CustomButton onClick={() => navigate(PATH.categoriesAddCMS)} type="primary">
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
                    dataSource={dataListCategories}
                    loading={loadingCategoriesList}
                    locale={{ emptyText: 'Không có kết quả hiển thị' }}
                    pagination={false}
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
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Bạn có muốn xóa danh mục này không?</h3>
                    <Button type="primary" danger onClick={handleDeleteCategory}>
                        Đồng ý
                    </Button>
                    <Button onClick={closeModal} style={{ marginLeft: 8 }}>
                        Hủy
                    </Button>
                </div>
            </Modal>
        </ContentContainer >
    );

}

export default CategoryManagement 