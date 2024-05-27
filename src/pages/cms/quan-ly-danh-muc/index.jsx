import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

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

const CategoryManagement = () => {
    const navigate = useNavigate()
    const [dataListCategories, setDataListCategories] = useState([]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
                    {status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => navigate(PATH.categoriesAddCMS)} />
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
            pageIndex: 1,
            pageSize: 10,
            status: filterStatus
        }),
        [searchKeyword, filterStatus]
    );

    const params = isFirstLoad ? initialParams : categoriesListParam;

    const {
        data: { data: getCategoriesList = [], paginate: { totalPageCategoriesList } = {} } = {},
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
        } else {
            setDataListCategories([]);
        }
    }, [getCategoriesList]);

    useEffect(() => {
        setIsFirstLoad(false);
    }, []);

    const handleFilterStatus = (value) => {
        setFilterStatus(value);
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const showDeleteConfirm = (code) => {
        Modal.confirm({
            title: 'Bạn có muốn xóa danh mục sản phẩm này không?',
            content: 'Hành động không thể hoàn tác',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleConfirmDelete(code);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleConfirmDelete = (code) => {
        // Add your delete logic here
        console.log('Deleting category with code:', code);
        // Example: Call your delete service
        // productServiceHHB.deleteCategory(code).then(() => {
        //     // Refresh the list or handle post-delete actions
        // });
    };

    return (
        <>
            <Space className='my-3'>
                <h3>Quản lý danh mục</h3>
            </Space>
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
                    >
                        <Option value="ACTIVE">Hoạt động</Option>
                        <Option value="INACTIVE">Không hoạt động</Option>
                    </Select>
                </FilterContainer>
                <CustomButton type="primary" icon={<PlusOutlined />}>
                    THÊM
                </CustomButton>
            </Toolbar>
            <Table columns={columns} dataSource={dataListCategories} loading={loadingCategoriesList} locale={{ emptyText: 'Không có kết quả hiển thị' }} pagination={false} />
        </>
    );
};

export default CategoryManagement;
