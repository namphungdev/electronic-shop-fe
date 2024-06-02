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
            </div>


        </ContentContainer>


    )
}

export default PermissionUsers