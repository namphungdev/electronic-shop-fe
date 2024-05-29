import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import { toast } from 'react-toastify';
import { userService } from '@/services/user.service';

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

const UserManagement = () => {
    const initialParams = {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        status: ""
    };
    const [dataListUser, setDataListUser] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'roleName',
            key: 'roleName',
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
        // {
        //     title: 'Hành động',
        //     key: 'action',
        //     render: (_, record) => (
        //         <>
        //             <EditOutlined />
        //             <DeleteOutlined />
        //         </>
        //     ),
        // },
    ];

    const usersListParam = useMemo(
        () => ({
            keyword: searchKeyword,
            pageIndex: 1,
            pageSize: 10,
            status: filterStatus,
        }),
        [searchKeyword, filterStatus]
    );

    const params = isFirstLoad ? initialParams : usersListParam;

    const {
        data: { data: getUsersList = [], paginate: { totalRecords } = {}, } = {},
        loading: loadingUsersList,
    } = useQuery({
        queryKey: `user-page-${JSON.stringify(usersListParam)}`,
        keepPreviousData: true,
        keepStorage: false,
        queryFn: ({ signal }) =>
            userService.getUsersList(params, signal),
    });

    useEffect(() => {
        setIsFirstLoad(false);
    }, []);

    useEffect(() => {
        if (getUsersList?.data?.length) {
            const formattedData = getUsersList?.data?.map((user, index) => ({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                userType: user.userType,
                email: user.email,
                roleName: user.roleName,
                status: user.status,
            }));
            setDataListUser(formattedData);
        } else {
            setDataListUser([]);
        }
    }, [getUsersList]);

    const handleFilterStatus = (value) => {
        setFilterStatus(value)
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    return (
        <>
            <ContentContainer>
                <Space className='my-3'>
                    <h3 style={{
                        "color": '#696CFF',
                        "font-weight": "700"
                    }}>Danh sách người dùng</h3>
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
                    </Toolbar>

                    <StyledTable
                        columns={columns}
                        dataSource={dataListUser}
                        loading={loadingUsersList}
                        locale={{ emptyText: 'Không có kết quả hiển thị' }}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </ContentContainer>
        </>
    )
}

export default UserManagement