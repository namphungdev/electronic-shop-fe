import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth.service';

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
    height: 25vh;
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

const PermissionUsers = () => {

    const [dataListRoles, setDataListRoles] = useState([]);

    const initialParams = {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
    };

    const columns = [
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => { }} />
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '25px' }} onClick={() => { }} />
                </>
            ),
        },
    ];

    const rolesListParam = useMemo(
        () => ({
            keyword: "",
            pageIndex: 1,
            pageSize: 10,
        }),
        []
    );

    const {
        data: { data: getRolesList = [], paginate: { totalRecords } = {}, } = {},
        loading: loadingRolesList,
    } = useQuery({
        queryKey: `product-page-${JSON.stringify(rolesListParam)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            authService.ListRoles(rolesListParam, signal),
    });

    useEffect(() => {
        if (getRolesList?.data?.length) {
            const formattedData = getRolesList?.data?.map((role, index) => ({
                id: role.id,
                code: role.code,
                name: role.name,
                description: role.description,
            }));
            setDataListRoles(formattedData);
        } else {
            setDataListRoles([]);
        }
    }, [getRolesList]);

    return (
        <ContentContainer>
            <Space className='my-3'>
                <h3 style={{
                    color: '#696CFF',
                    fontWeight: "700"
                }}>Quản lý phân quyền người dùng</h3>
            </Space>

            <div className="py-5 px-5 mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
                <Toolbar>
                    <CustomButton onClick={() => { }} type="primary">
                        <span style={{
                            color: '#fff',
                            fontWeight: '500',
                        }}>
                            Thêm
                        </span>
                    </CustomButton>
                </Toolbar>

                <StyledTable
                    columns={columns}
                    dataSource={dataListRoles}
                    locale={{ emptyText: 'Không có kết quả hiển thị' }}
                    pagination={false}
                />

                {/* <div className="flex items-center justify-center mb-4">
                    <h3 className="text-blue-600 font-semibold">Đặt hẹn</h3>
                    <div className="flex space-x-12 ml-auto">
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
                            <span className="text-blue-600">Tạo mới</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
                            <span className="text-blue-600">Cập nhật</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
                            <span className="text-blue-600">Xóa</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
                            <span className="text-blue-600">Xem chi tiết</span>
                        </label>
                    </div>
                </div> */}


                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold text-xl">Quản lý sản phẩm</h3>
                    <div className="flex space-x-12" style={{paddingRight: '50px'}}>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Tạo mới</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Cập nhật</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xóa</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem danh sách</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem chi tiết</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold text-xl">Quản lý danh mục</h3>
                    <div className="flex space-x-12" style={{paddingRight: '50px'}}>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Tạo mới</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Cập nhật</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xóa</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem danh sách</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem chi tiết</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold text-xl">Danh sách người dùng</h3>
                    <div className="flex space-x-12" style={{paddingRight: '50px'}}>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Tạo mới</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Cập nhật</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xóa</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem danh sách</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="form-checkbox h-6 w-6 text-gray-600" />
                            <span className="text-gray-600">Xem chi tiết</span>
                        </label>
                    </div>
                </div>

            </div>
        </ContentContainer>
    )
}

export default PermissionUsers