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

const ProductManagement = () => {

  const navigate = useNavigate()

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <EditOutlined />
          <DeleteOutlined />
        </>
      ),
    },
  ];
  return (
    <>
      <ContentContainer>
        <Space className='my-3'>
          <h3 style={{
            "color": '#696CFF',
            "font-weight": "700"
          }}>Quản lý sản phẩm</h3>
        </Space>
        <div className="py-5 px-5 mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
          <Toolbar>
            <FilterContainer>
              <CustomSearch
                placeholder="Tìm kiếm ..."
                enterButton
                style={{ maxWidth: '500px', flex: '1' }}
              />
              <Select
                placeholder="Trạng thái"
                style={{ width: 200 }}
                allowClear
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                <Option value="ACTIVE">Hoạt động</Option>
                <Option value="INACTIVE">Không hoạt động</Option>
              </Select>
            </FilterContainer>
            <CustomButton onClick={() => navigate(PATH.productsAddCMS)} type="primary">
              <span style={{
                'color': '#fff',
                'font-weight': '500'
              }}>
                Thêm
              </span>
            </CustomButton>
          </Toolbar>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </ContentContainer>
    </>

  )
}

export default ProductManagement