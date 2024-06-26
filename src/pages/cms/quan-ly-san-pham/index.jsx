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
  const [dataListProducts, setDataListProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
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
    {
      title: 'Danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    // {
    //   title: 'Mở bán',
    //   dataIndex: 'isPublished',
    //   key: 'isPublished',
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
      render: (_, record) => 
      (
        <>
          <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => {
            localStorage.setItem('product-slug', record.slug)
            navigate(`${PATH.productsCMSDetail}`)
           }} />
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '25px' }} onClick={() => showDeleteConfirm(record.slug)} />
        </>
      ),
    },
  ];

  const initialParams = {
    keyword: "",
    pageIndex: 1,
    pageSize: 10,
    categoryCode: null,
    status: null
  };

  const productsListParam = useMemo(
    () => ({
      keyword: searchKeyword,
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      categoryCode: null,
      status: filterStatus,
    }),
    [searchKeyword, filterStatus, pagination.current, pagination.pageSize]
  );

  const params = isFirstLoad ? initialParams : productsListParam;

  const {
    data: { data: getProductsList = [], paginate: { totalRecords } = {}, } = {},
    loading: loadingProductsList,
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(productsListParam)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      productServiceHHB.getProductsList(params, signal),
  });

  useEffect(() => {
    if (getProductsList?.data?.length) {
      const formattedData = getProductsList?.data?.map((product, index) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        categoryName: product.categoryName,
        price: product.price,
        slug: product.slug,
        description: product.shortDescription,
        status: product.status,
      }));
      setDataListProducts(formattedData);
      setPagination((prev) => ({
        ...prev,
        total: totalRecords,
      }));
    } else {
      setDataListProducts([]);
      setPagination((prev) => ({
        ...prev,
        total: 0,
      }));
    }
  }, [getProductsList, totalRecords]);

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

  const showDeleteConfirm = (slug) => {
    setSelectedProductSlug(slug);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    setIsModalOpen(false);
    try {
      const res = await productServiceHHB.deleteProducts(selectedProductSlug);

      if (res.result && res.code === 200) {
        toast.success('Xóa sản phẩm thành công');
        window.location.reload();
      } else {
        toast.error(res.message || 'Đã có lỗi xảy ra');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi xóa sản phẩm');
    }
  };

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
          }}>Quản lý sản phẩm</h3>
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
                <Option value="IACTIVE">Không hoạt động</Option>
              </CustomSelect>
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

          <StyledTable
            columns={columns}
            dataSource={dataListProducts}
            loading={loadingProductsList}
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
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Bạn có muốn xóa sản phẩm này không?</h3>
            <Button type="primary" danger onClick={handleDeleteProduct}>
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

export default ProductManagement